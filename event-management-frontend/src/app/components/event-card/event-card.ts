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
      TECH: 'bg-gradient-to-r from-amber-500 to-yellow-400',
      AI: 'bg-gradient-to-r from-pink-500 to-rose-500',
      ART_CULTURE: 'bg-gradient-to-r from-green-500 to-emerald-500',
      CLIMATE: 'bg-gradient-to-r from-lime-500 to-green-400',
      WELLNESS: 'bg-gradient-to-r from-teal-500 to-cyan-500',
      CYBER_SECURITY: 'bg-gradient-to-r from-sky-500 to-blue-600',
      FITNESS: 'bg-gradient-to-r from-orange-500 to-red-500',
      PARTY: 'bg-gradient-to-r from-purple-500 to-pink-500',
      CRYPTO: 'bg-gradient-to-r from-violet-500 to-indigo-500'
    };
    return colorByCategory[this.event.category] ?? 'bg-gradient-to-r from-slate-500 to-slate-700';
  }

  onImageError(event: Event) {
    console.error('Image failed to load:', this.event.posterUrl);
    (event.target as HTMLImageElement).src = 'https://placehold.co/800x600/e2e8f0/64748b?text=No+Image';
  }

}
