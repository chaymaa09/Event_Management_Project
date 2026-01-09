import { Component } from '@angular/core';
import { UserService } from '../../services/user';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],  
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  constructor(
    private userService: UserService,

  ) {
    this.getCurrentUser();
  }
  
    currentUser: User | null = null;
    hostedEvents: Event[] = [];
    attendedEvents: Event[] = [];
    hasEvents: boolean = false;

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
          if (events.length > 0) {
            this.hasEvents = true;
          }
        },
        error: (err) => {
          console.error('Error fetching hosted events:', err);
        }
      });
    }
  

 }

