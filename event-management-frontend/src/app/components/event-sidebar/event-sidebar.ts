import { Component, Input, Output, EventEmitter, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppEvent } from '../../models/event.model';

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
    private sanitizer: DomSanitizer

  ) {
    this.getCurrentUser();
    // Recompute map whenever the active event signal changes
    effect(() => {
      const ev = this.sidebarService.activeEvent();
      this.setupMap(ev);
    });
  }

  
  currentUser: User | null = null;
  mapUrl: SafeResourceUrl | null = null;
  


  // Computed properties for cleaner template access
  get event() { return this.sidebarService.activeEvent(); }
  get isOpen() { return this.sidebarService.isOpen(); }

  close() {
    this.sidebarService.close();
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

}