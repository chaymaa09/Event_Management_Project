import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { EventService } from '../../services/event';
import { CityService } from '../../services/city.service';
import { AppEvent } from '../../models/event.model';
import { City } from '../../models/city.model';
import { CityEventCardComponent } from '../../components/city-event-card/city-event-card';

// Register French locale
registerLocaleData(localeFr);


@Component({
  selector: 'app-city-events',
  standalone: true,
  imports: [CommonModule, RouterLink, CityEventCardComponent],
  templateUrl: './city-events.html',
  styleUrls: ['./city-events.css']
})
export class CityEventsComponent implements OnInit {
  cityName: string = '';
  city: City | null = null;
  events: AppEvent[] = [];
  isLoading = false;
  error?: string;
  now = new Date();
  mapUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private cityService: CityService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cityName = params['cityName'];
      
      // ⬇️ TEMPORARY TEST - Remove after testing
      this.testWithFakeData();
      // ⬇️ Comment out real loading
      // this.loadCityData();
    });
  }

  private loadCityData(): void {
    this.isLoading = true;
    this.error = undefined;

    // Load city details (image_url, etc.)
    this.cityService.getCityByName(this.cityName).subscribe({
      next: (city) => {
        console.log('City loaded:', city);
        this.city = city;
        if (city) {
          this.setupMap(city);
        }
        this.loadCityEvents();
      },
      error: (err) => {
        console.error('City load error:', err);
        this.error = `Failed to load city details for ${this.cityName}`;
        this.isLoading = false;
      }
    });
  }

  private setupMap(city: City): void {
    // Create map URL based on city name
    const query = encodeURIComponent(city.name);
    const url = `https://maps.google.com/maps?q=${query}&z=12&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private loadCityEvents(): void {
    this.eventService.getEventsByCity(this.cityName).subscribe({
      next: (events) => {
        console.log(`Events loaded for ${this.cityName}:`, events);
        this.events = events;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(`Events load error for ${this.cityName}:`, err);
        this.error = `Failed to load events for ${this.cityName}`;
        this.isLoading = false;
      }
    });
  }

  // ⬇️ ADD THIS METHOD
  private testWithFakeData(): void {
    // Fake city
    this.city = {
      id: 1,
      name: this.cityName,
      imageUrl: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1200',
      logoUrl: 'https://images.lumacdn.com/discovery/lagos-icon.png'
    } as any;
    
    this.setupMap(this.city!);
    
    // Fake events
    this.events = [
      {
        id: 1,
        title: 'Angular Meetup: Building Modern Apps',
        description: 'Join us for an evening of Angular development',
        startDate: new Date().toISOString() as any,
        endDate: new Date(Date.now() + 7200000).toISOString() as any,
        posterUrl: 'https://picsum.photos/400/300?random=1',
        creator: {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          avatarUrl: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
        },
        location: {
          id: 1,
          name: 'Tech Hub',
          street: '123 Main St',
          city: this.cityName,
          country: 'Netherlands',
          postalCode: '1000'
        } as any,
        isVirtual: false,
        category: 'TECH',
        price: 0,
        capacity: 100,
        attendees: 45
      },
      {
        id: 2,
        title: 'Online Workshop: CSS Masterclass',
        description: 'Learn advanced CSS techniques',
        startDate: new Date(Date.now() + 3600000).toISOString() as any,
        endDate: new Date(Date.now() + 7200000).toISOString() as any,
        posterUrl: 'https://picsum.photos/400/300?random=2',
        creator: {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          avatarUrl: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random'
        },
        location: undefined,
        isVirtual: true,
        virtualLink: 'https://zoom.us/j/123456',
        category: 'TECH',
        price: 15,
        capacity: 50,
        attendees: 32
      },
      {
        id: 3,
        title: 'AI & Machine Learning Conference',
        description: 'Explore the future of AI',
        startDate: new Date(Date.now() - 1800000).toISOString() as any, // Started 30 min ago (LIVE)
        endDate: new Date(Date.now() + 5400000).toISOString() as any,
        posterUrl: 'https://picsum.photos/400/300?random=3',
        creator: {
          id: 3,
          name: 'Tech Community',
          email: 'tech@example.com',
          avatarUrl: 'https://ui-avatars.com/api/?name=Tech+Community&background=random'
        },
        location: {
          id: 2,
          name: 'Convention Center',
          street: '456 Event Ave',
          city: this.cityName,
          country: 'Netherlands',
          postalCode: '1001'
        } as any,
        isVirtual: false,
        category: 'AI',
        price: 50,
        capacity: 200,
        attendees: 180
      }
    ] as AppEvent[];
    
    this.isLoading = false;
    
    console.log('Test events loaded:', this.events);
  }

  get formattedCityName(): string {
    return this.cityName.charAt(0).toUpperCase() + this.cityName.slice(1);
  }

  get heroStyle(): { [key: string]: string } {
    if (this.city?.imageUrl) {
      return {
        backgroundImage: `url(${this.city.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }
    // Fallback gradient when no city image available
    return {
      backgroundImage: 'linear-gradient(120deg, #0f172a, #1e293b)'
    };
  }

  get cityLogo(): string {
    return this.city?.logoUrl || 'https://images.lumacdn.com/discovery/lagos-icon.png';
  }
}
