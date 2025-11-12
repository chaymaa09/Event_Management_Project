import {Component, OnInit} from '@angular/core';
import {AppEvent} from '../../models/event.model';
import {EventService} from '../../services/event';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {DatePipe, SlicePipe} from '@angular/common';

@Component({
  selector: 'app-event-list',
  imports: [
    RouterLink,
    FormsModule,
    SlicePipe,
    DatePipe
  ],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList implements OnInit {
  events: AppEvent[] = [];
  loading = true;
  error = '';

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.loading = true;
    this.error = '';
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.loading = false;
        console.log('Events loaded', data.length);
      },
      error: (error) => {
        this.error = 'Failed to load events';
        this.loading = false;
        console.log('Error: ',error);
      }
    })
  }


  deleteEvent(id: number | undefined) {
    if (!id) {
      console.warn('No event ID provided');
      return;
    }


    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }


    this.eventService.deleteEvent(id).subscribe({
      next: (result) => {
        console.log('Event deleted successfully:', id);

        this.loadEvents();

        // Option 2: Remove from local array (faster, no server call)
        // this.events = this.events.filter(e => e.id !== id);
      },
      error: (err) => {
        console.error('Error deleting event:', err);
        alert('Failed to delete event. Please try again.');
      }
    });
  }
}
