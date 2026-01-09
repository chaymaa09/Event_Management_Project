import { Component, Input, Output, EventEmitter, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppEvent, Participation, ParticipationStatus } from '../../models/event.model';
import { ParticipationService } from '../../services/participation.service';
import { Router } from '@angular/router';
import { EventService } from '../../services/event';

@Component({
  selector: 'app-event-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-sidebar.html',
  styleUrl: './event-sidebar.css',
})
export class EventSidebar {

  constructor(
    private sidebarService: SidebarService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private participationService: ParticipationService
    , private router: Router
    , private eventService: EventService

  ) {
    this.getCurrentUser();
    // Recompute map whenever the active event signal changes
    effect(() => {
      const ev = this.sidebarService.activeEvent();
      this.setupMap(ev);
    });

    // When the active event changes, refresh attendees and participation (if user loaded)
    effect(() => {
      const ev = this.sidebarService.activeEvent();
      if (ev) {
        this.getJoinedAttendees();
        this.getCurrentUser();
         this.getParticipation();
      }
      console.log('Active event changed in sidebar:', ev, 'isHost:', this.isHost());
    });
  }

  
  currentUser: User | null = null;
  mapUrl: SafeResourceUrl | null = null;
  joinedList: User[] | null = null;
  joinedCount: number = 0;
  participation: Participation | null = null;
  participationStatus: ParticipationStatus | null = null;

  // Expose enum to template to avoid string mismatches
  ParticipationStatusEnum = ParticipationStatus;

  // Toast / notification for actions like delete
  showToast = false;
  toastMessage = '';
  private toastTimer: any = null;
  


  // Computed properties for cleaner template access
  get event() { return this.sidebarService.activeEvent(); }
  get isOpen() { return this.sidebarService.isOpen(); }

  close() {
    this.sidebarService.close();
  }

  isHost(): boolean {
    try {
      if (!this.currentUser || !this.event || !this.event.creator) return false;
      return Number(this.currentUser.id) === Number(this.event.creator.id);
    } catch {
      return false;
    }
  }

  getMapsLink(location: any): string {
    if (!location) return '';
    const query = encodeURIComponent(`${location.name} ${location.address || ''}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }

  getCurrentUser(): void {
    this.userService.syncUserToDb().subscribe({
      next: (user) => {
        this.currentUser = user;
        console.log('Current user loaded:', user);
      },
      error: (err) => {
        console.error('Error fetching current user:', err);
      }
    }); 
}

  setupMap(event: AppEvent | null): void {
    if (!event) return;
    if (event.location?.latitude && event.location?.longitude && !event.isVirtual) {
      const url = `https://maps.google.com/maps?q=${event.location.latitude},${event.location.longitude}&z=15&output=embed`;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  getJoinedAttendees(): void {
    if (!this.event) return;
    this.participationService.getEventParticipations(this.event.id!).subscribe({
      next: (participations) => {
        try {
          const confirmedUsers = (participations || [])
            .filter(p => p && (p.status === 'CONFIRMED' || p.status === 'WAITING' || p.status === 'PENDING'))
            .map(p => ({ id: p.userId, name: p.userName, email: p.userEmail, avatarUrl: p.userAvatarUrl, status: p.status }));
          this.joinedList = confirmedUsers;
          this.joinedCount = confirmedUsers.length;
          console.log('Joined attendees count:', this.joinedCount);
        } catch (e) {
          console.error('Error processing participations:', e);
        }
      },
      error: (err) => {
        console.error('Error fetching event participations:', err);
      }
    });
  }

  onEdit(): void {
    const ev = this.event;
    if (!ev?.id) return;
    // Navigate to create-event in edit mode with id param
    this.sidebarService.close();
    this.router.navigate(['/create-event'], { queryParams: { edit: 'true', id: ev.id } });
  }

  onDelete(): void {
    const ev = this.event;
    if (!ev?.id) return;
    const confirmed = window.confirm('Are you sure you want to delete this event? This action cannot be undone.');
    if (!confirmed) return;

    this.eventService.deleteEvent(ev.id!).subscribe({
      next: () => {
        this.sidebarService.close();
        this.showToastMessage('Your event has been deleted successfully.');
        // Optionally navigate somewhere safe
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error('Failed to delete event:', err);
        this.showToastMessage('Failed to delete event. Please try again.');
      }
    });
  }

  showToastMessage(msg: string, timeout = 4000): void {
    this.toastMessage = msg;
    this.showToast = true;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.showToast = false;
      this.toastTimer = null;
    }, timeout);
  }

  closeToast(): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.showToast = false;
    this.toastTimer = null;
  }

  requestToJoin(): void {
    const ev = this.event;
    const user = this.currentUser;
    if (!ev?.id || !user?.id) return;
    if (ev.requiresApproval) {
      this.participationService.requestToJoinEvent(ev.id, user.id).subscribe({
        next: () => {
          this.showToastMessage('Your request to join the event has been sent.');
          this.getJoinedAttendees();
          this.getParticipation();
          
        },
        error: (err) => {
          console.error('Failed to send join request:', err);
          this.showToastMessage('Failed to send join request. Please try again.');
        }
      });
    } else {
      this.participationService.joinEvent(ev.id, user.id).subscribe({
        next: () => {
          this.showToastMessage('You have successfully joined the event.'); 
          this.getJoinedAttendees(); 
          this.getParticipation();
        
        },  
        error: (err) => {
          console.error('Failed to join event:', err);
          this.showToastMessage('Failed to join event. Please try again.');
        }
      });
    }
  }

  getParticipation(): void {
    const ev = this.event;
    const user = this.currentUser;
    if (!ev?.id || !user?.id) return;
    this.participationService.getParticipation(ev.id, user.id).subscribe({
      next: (participation) => {
        this.participation = participation;
        if (participation) {
          this.participationStatus = participation.status;
        } else {
          this.participationStatus = null;
        }
        console.log('Participation status:', this.participationStatus, 'participation:', participation);
      },
      error: (err) => {
        console.error('Failed to get participation :', err);
      }
    });
  }


  unjoin(): void {
    if (!this.participation || !this.participation.id) {
      this.showToastMessage('No participation found to cancel.');
      return;
    }

    const participationId = this.participation.id;
    this.participationService.updateStatus(participationId, 'CANCELLED').subscribe({
      next: () => {
        // update local state
        this.participationStatus = ParticipationStatus.CANCELLED;
        if (this.participation) this.participation.status = ParticipationStatus.CANCELLED as any;
        this.showToastMessage('Your registration has been cancelled.');
        this.getJoinedAttendees();
        this.getParticipation();
      },
      error: (err) => {
        console.error('Failed to cancel participation:', err);
        this.showToastMessage('Failed to cancel registration. Please try again.');
      }
    });
  }

}

