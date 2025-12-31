import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppEvent, ParticipationDTO } from '../../models/event.model';
import { EventService } from '../../services/event';
import { ParticipationService } from '../../services/participation';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './event-details.html',
  styleUrls: ['./event-details.css'],
})
export class EventDetails implements OnInit {
      // Gradient logic removed; now using blobs only
    /**
     * Returns Tailwind color classes for blobs based on event category and blob index (0-5).
     * @param category Event category string
     * @param idx Blob index (0-5)
     */
    getCategoryBlobClass(category: string | undefined, idx: number = 0): string {
      // Use all category palette colors, cycle if needed
      const colorByCategory: Record<string, string[]> = {
        Party:   ['bg-purple-400/40', 'bg-yellow-400/40', 'bg-pink-400/40', 'bg-purple-300/40', 'bg-yellow-300/40', 'bg-pink-300/40'],
        Learn:   ['bg-blue-400/40',   'bg-green-400/40',  'bg-purple-400/40', 'bg-blue-300/40', 'bg-green-300/40', 'bg-purple-300/40'],
        Chill:   ['bg-green-400/40',  'bg-blue-400/40',   'bg-yellow-400/40', 'bg-green-300/40', 'bg-blue-300/40', 'bg-yellow-300/40'],
        Active:  ['bg-yellow-400/40', 'bg-pink-400/40',   'bg-purple-400/40', 'bg-yellow-300/40', 'bg-pink-300/40', 'bg-purple-300/40'],
        Create:  ['bg-pink-400/40',   'bg-purple-400/40', 'bg-blue-400/40', 'bg-pink-300/40', 'bg-purple-300/40', 'bg-blue-300/40'],
        Connect: ['bg-amber-400/40',  'bg-green-400/40',  'bg-pink-400/40', 'bg-amber-300/40', 'bg-green-300/40', 'bg-pink-300/40'],
      };
      const fallback = ['bg-purple-400/40', 'bg-yellow-400/40', 'bg-pink-400/40', 'bg-purple-300/40', 'bg-yellow-300/40', 'bg-pink-300/40'];
      const colors = colorByCategory[category ?? ''] ?? fallback;
      return colors[idx % colors.length];
    }
  event: AppEvent | null = null;
  loading = true;
  error: string | null = null;

  participantsCount = 0;
  spotsLeft = 0;
  capacityPercentage = 0;
  mapUrl: SafeResourceUrl | null = null;
  isSaved = false;
  isSharing = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private participationService: ParticipationService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ngOnInit - ID:', id);
    
    if (id) {
      this.fetchEvent(+id);
    } else {
      this.error = 'No event ID provided';
      this.loading = false;
    }
  }

  fetchEvent(id: number): void {
    this.loading = true;
    this.error = null;

    console.log('Fetching event:', id);

    this.eventService.getEventById(id).subscribe(
      (event) => {
        console.log('Success:', event);
        this.event = event;
        this.spotsLeft = event.capacity || 0;
        this.capacityPercentage = 0;
        this.loading = false;
        
        this.setupMap(event);
        this.checkIfSaved(id);
        this.fetchParticipationCount(id);
      },
      (err) => {
        console.error('Error:', err);
        this.error = 'Failed to load event';
        this.loading = false;
      }
    );
  }

  setupMap(event: AppEvent): void {
    if (event.location?.latitude && event.location?.longitude && !event.isVirtual) {
      const url = `https://maps.google.com/maps?q=${event.location.latitude},${event.location.longitude}&z=15&output=embed`;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  getGoogleMapsLink(): string {
    if (this.event?.location?.latitude && this.event?.location?.longitude) {
      return `https://www.google.com/maps?q=${this.event.location.latitude},${this.event.location.longitude}`;
    }
    return '#';
  }

  fetchParticipationCount(eventId: number): void {
    this.participationService.getParticipationCount(eventId).subscribe(
      (participations) => {
        this.participantsCount = participations.filter(
          (p: ParticipationDTO) => p.status === 'CONFIRMED' || p.status === 'ATTENDED'
        ).length;

        if (this.event && typeof this.event.capacity === 'number') {
          this.spotsLeft = this.event.capacity - this.participantsCount;
          this.capacityPercentage = this.event.capacity > 0 
            ? Math.round((this.participantsCount / this.event.capacity) * 100) 
            : 0;
        }
      },
      (err) => {
        console.warn('Participations error:', err?.status);
        this.participantsCount = 0;
        this.spotsLeft = this.event?.capacity || 0;
        this.capacityPercentage = 0;
      }
    );
  }

  checkIfSaved(eventId: number): void {
     // Saving events is disabled for now (CHECK THAT LATER)
     this.isSaved = false;
  }

  toggleSave(): void {
     // Saving events is disabled for now (CHECK THAT LATER)
     this.isSaved = !this.isSaved;
  }

  shareEvent(): void {
    this.isSharing = true;
    
    if (navigator.share) {
      navigator.share({
        title: this.event?.title || 'Check out this event!',
        text: `Join me at ${this.event?.title}`,
        url: window.location.href
      }).finally(() => {
        this.isSharing = false;
      });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied to clipboard!');
        this.isSharing = false;
      });
    }
  }


  get isSellingFast(): boolean {
    const total = this.event?.capacity ?? 0;
    return total > 0 && this.spotsLeft > 0 && this.spotsLeft <= total * 0.1;
  }

  get isSoldOut(): boolean {
    return (this.event?.capacity ?? 0) > 0 && this.spotsLeft <= 0;
  }
}
