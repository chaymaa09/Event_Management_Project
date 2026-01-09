import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppEvent } from '../../models/event.model';

@Component({
  selector: 'app-city-event-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './city-event-card.html',
  styleUrls: ['./city-event-card.css']
})
export class CityEventCardComponent {
  @Input() event!: AppEvent;

  get isLive(): boolean {
    const now = new Date();
    const start = new Date(this.event.startDate);
    const end = this.event.endDate 
      ? new Date(this.event.endDate) 
      : new Date(start.getTime() + 2 * 60 * 60 * 1000); // Default 2h duration
    return now >= start && now <= end;
  }

  get locationDisplay(): string {
    if (this.event.isVirtual) {
      return 'En ligne';
    }
    if (this.event.location) {
      return this.event.location.name || this.event.location.city || 'TBD';
    }
    return '';
  }
}