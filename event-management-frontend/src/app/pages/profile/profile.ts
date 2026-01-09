import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user';
import { SidebarService } from '../../services/sidebar.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { AppEvent } from '../../models/event.model';

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
  ) {
    this.getCurrentUser();
  }
  
    currentUser: User | null = null;
    public hostedEvents: AppEvent[] = [];
    public attendedEvents: AppEvent[] = [];
    public hasEvents: boolean = false;
    activeTab = signal<'hosted' | 'attended'>('hosted');
    

    getCurrentUser(): void {
      this.userService.syncUserToDb().subscribe({
        next: (user) => {
          this.currentUser = user;
          console.log('Current user loaded:', user);
          this.getHostedEvents();
        },
        error: (err) => {
          console.error('Error fetching current user:', err);
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

  onEventClick(event: AppEvent) {
    try {
      this.sidebarService.open(event);
    } catch (e) {
      console.error('Failed to open sidebar for event', e);
    }
  }
  

 }

