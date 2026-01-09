import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user';
import { ParticipationService } from '../../services/participation.service';
import { EventService } from '../../services/event';
import { SidebarService } from '../../services/sidebar.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { AppEvent, ParticipationStatus } from '../../models/event.model';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],  
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private sidebarService: SidebarService,
    private participationService: ParticipationService,
    private eventService: EventService,
  ) {
    this.getCurrentUser();
  }
  
    currentUser: User | null = null;
    public hostedEvents: AppEvent[] = [];
    public attendedEvents: AppEvent[] = [];
    public createdEventParticipants: Map<number, any[]> = new Map(); // eventId -> participants array
    public hasEvents: boolean = false;
    activeTab = signal<'hosted' | 'attended'>('hosted');
    

    getCurrentUser(): void {
      this.userService.syncUserToDb().subscribe({
        next: (user) => {
          this.currentUser = user;
          console.log('Current user loaded:', user);
          this.getHostedEvents();
          this.loadAttendedEvents();
        },
        error: (err) => {
          console.error('Error fetching current user:', err);
        }
      }); 
    }

    loadCreatedEventParticipants(): void {
      if (!this.hostedEvents.length) return;
      
      this.hostedEvents.forEach(event => {
        this.participationService.getEventParticipantsActive(event.id!).subscribe({
          next: (participants) => {
            this.createdEventParticipants.set(event.id!, participants);
            console.log(`Loaded ${participants.length} participants for event ${event.id}`, participants);
            try { this.cd.detectChanges(); } catch (e) {}
          },
          error: (err) => {
            console.error(`Error fetching participants for event ${event.id}:`, err);
            this.createdEventParticipants.set(event.id!, []);
          }
        });
      });
    }

    loadAttendedEvents(): void {
      if (!this.currentUser) return;
      this.participationService.getUserParticipations(this.currentUser.id!).subscribe({
        next: (parts) => {
          const promises: Promise<void>[] = [];
          const events: AppEvent[] = [];
          (parts || []).forEach((p: any) => {
            if (p.event) {
              const ev = p.event as AppEvent;
              // attach participation metadata
              (ev as any).participationId = p.id;
              (ev as any).participationStatus = p.status;
              events.push(ev);
            } else if (p.eventId) {
              // fetch event detail
              const pr = this.eventService.getEventById(p.eventId).toPromise().then(ev => {
                (ev as any).participationId = p.id;
                (ev as any).participationStatus = p.status;
                events.push(ev as AppEvent);
              }).catch(err => console.warn('Failed to load event for participation', p.eventId, err));
              promises.push(pr);
            }
          });
          Promise.all(promises).then(() => {
            // sort by startDate desc
            events.sort((a,b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
            this.attendedEvents = events;
            this.hasEvents = this.attendedEvents.length > 0 || this.hostedEvents.length > 0;
            try { this.cd.detectChanges(); } catch (e) {}
          });
        },
        error: (err) => {
          console.error('Error fetching user participations:', err);
        }
      });
    }

    cancelJoin(participationId: number, eventIndex?: number): void {
      if (!participationId) return;
      this.participationService.updateStatus(participationId, ParticipationStatus.CANCELLED).subscribe({
        next: () => {
          this.loadAttendedEvents();
        },
        error: (err) => {
          console.error('Failed to cancel participation:', err);
        }
      });
    }

    rejoinEvent(participationId: number, eventIndex?: number): void {
      if (!participationId) return;
      const event = this.attendedEvents[eventIndex || 0];
      // If event requires approval, set status to PENDING; otherwise CONFIRMED
      const targetStatus = event?.requiresApproval ? ParticipationStatus.PENDING : ParticipationStatus.CONFIRMED;
      this.participationService.updateStatus(participationId, targetStatus).subscribe({
        next: () => {
          this.loadAttendedEvents();
        },
        error: (err) => {
          console.error('Failed to rejoin event:', err);
        }
      });
    }

    confirmParticipant(participationId: number, eventId?: number): void {
      if (!participationId || !eventId) return;
      this.participationService.updateStatus(participationId, ParticipationStatus.CONFIRMED).subscribe({
        next: () => {
          this.loadCreatedEventParticipants();
        },
        error: (err) => {
          console.error('Failed to confirm participant:', err);
        }
      });
    }

    refuseParticipant(participationId: number, eventId?: number): void {
      if (!participationId || !eventId) return;
      this.participationService.updateStatus(participationId, ParticipationStatus.BLOCKED).subscribe({
        next: () => {
          this.loadCreatedEventParticipants();
        },
        error: (err) => {
          console.error('Failed to refuse participant:', err);
        }
      });
    }

    deblockParticipant(participationId: number, eventId?: number): void {
      if (!participationId || !eventId) return;
      this.participationService.updateStatus(participationId, ParticipationStatus.CONFIRMED).subscribe({
        next: () => {
          this.loadCreatedEventParticipants();
        },
        error: (err) => {
          console.error('Failed to deblock participant:', err);
        }
      });
    }


    getHostedEvents(): void {
      if (!this.currentUser) return;
      this.userService.getHostedEvents(this.currentUser.id!).subscribe({
        next: (events) => {
          this.hostedEvents = events;
          console.log('Hosted events loaded:', events);
          this.hasEvents = Array.isArray(events) && events.length > 0;
          // load participants for each hosted event so they appear under hosted cards
          this.loadCreatedEventParticipants();
          try { this.cd.detectChanges(); } catch (e) {}
        },
        error: (err) => {
          console.error('Error fetching hosted events:', err);
        }
      });
    }

  isPastEvent(date: string | Date): boolean {
      return new Date(date) < new Date();
  }

  setTab(tab: 'hosted' | 'attended') {
    this.activeTab.set(tab);
  }

  get hostedCount(): number {
    return this.hostedEvents.length;
  } 
  get attendedCount(): number {
    return this.attendedEvents.length;
  }

  getParticipantsForEvent(eventId?: number): any[] {
    if (!eventId) return [];
    return this.createdEventParticipants.get(eventId) || [];
  }

  onEventClick(event: AppEvent) {
    try {
      this.sidebarService.open(event);
    } catch (e) {
      console.error('Failed to open sidebar for event', e);
    }
  }
  

 }

