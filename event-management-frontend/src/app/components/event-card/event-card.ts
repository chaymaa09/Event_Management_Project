import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppEvent } from '../../models/event.model';
import { MOCK_EVENTS } from '../../mocks/mock-events';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, DatePipe, MatIconModule, RouterLink],
  templateUrl: './event-card.html',
  styleUrls: ['./event-card.css'],
})
export class EventCard {

  @Input({ required: true }) event!: AppEvent | typeof MOCK_EVENTS[0];

  get categoryBadge() {
    const colorByCategory: Record<AppEvent['category'], string> = {
      Party: 'bg-gradient-to-r from-pink-500 to-purple-500',
      Learn: 'bg-gradient-to-r from-indigo-500 to-blue-500',
      Chill: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      Active: 'bg-gradient-to-r from-amber-500 to-orange-500',
      Create: 'bg-gradient-to-r from-purple-500 to-pink-500',
      Connect: 'bg-gradient-to-r from-yellow-500 to-amber-500'
    };
    return colorByCategory[this.event.category] ?? 'bg-gradient-to-r from-slate-500 to-slate-700';
  }

  onImageError(event: Event) {
    console.error('Image failed to load:', this.event.posterUrl);
    (event.target as HTMLImageElement).src = 'https://placehold.co/800x600/e2e8f0/64748b?text=No+Image';
  }

}
