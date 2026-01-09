import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  // Using Angular Signals for modern, easy state management
  isOpen = signal(false);
  activeEvent = signal<any>(null);

  open(event: any) {
    this.activeEvent.set(event);
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
    this.activeEvent.set(null);
  }
}