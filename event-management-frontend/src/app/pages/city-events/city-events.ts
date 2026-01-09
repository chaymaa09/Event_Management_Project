import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../services/event';
import { CityService } from '../../services/city.service';
import { AppEvent } from '../../models/event.model';
import { City } from '../../models/city.model';
import { EventCard } from '../../components/event-card/event-card';

@Component({
  selector: 'app-city-events',
  standalone: true,
  imports: [CommonModule, RouterLink, EventCard],
  templateUrl: './city-events.html',
  styleUrls: ['./city-events.css']
})
export class CityEventsComponent implements OnInit {
  cityName: string = '';
  city: City | null = null;
  events: AppEvent[] = [];
  isLoading = false;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private cityService: CityService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cityName = params['cityName'];
      this.loadCityData();
    });
  }

  private loadCityData(): void {
    this.isLoading = true;
    this.error = undefined;

    // Load city details (image_url, etc.)
    this.cityService.getCityByName(this.cityName).subscribe({
      next: (city) => {
        this.city = city;
        this.loadCityEvents();
      },
      error: () => {
        this.error = `Failed to load city details for ${this.cityName}`;
        this.isLoading = false;
      }
    });
  }

  private loadCityEvents(): void {
    this.eventService.getEventsByCity(this.cityName).subscribe({
      next: (events) => {
        this.events = events;
        this.isLoading = false;
      },
      error: () => {
        this.error = `Failed to load events for ${this.cityName}`;
        this.isLoading = false;
      }
    });
  }

  get formattedCityName(): string {
    return this.cityName.charAt(0).toUpperCase() + this.cityName.slice(1);
  }
}
