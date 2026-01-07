import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppEvent, Subscriber } from '../../models/event.model';
import { CategoryService } from '../../services/category.service';
import { ParticipationService } from '../../services/participation.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [],
  templateUrl: './category-page.html',
  styleUrls: ['./category-page.css'],
})
export class CategoryPage implements OnInit{
  events: AppEvent[] = [];
  subscribers: Subscriber[] = [];
  isLoadingEvents = false;
  isLoadingSubscribers = false;
  isLoadingCategory = false;
  category: Category | null = null;

  constructor(
      private participationService: ParticipationService,
      private categoryService: CategoryService,
      private route: ActivatedRoute
    ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      if (category) {
        this.loadCategoryDetails(category);
        this.countEvents();
        this.countSubscribers();
        this.loadEvents(category);

      }
    });
  }

  private loadEvents(category: string): void {
    this.isLoadingEvents = true;
    this.events = [];

    this.categoryService.getEventsByCategory(category).subscribe({
      next: (events) => {
        this.events = events;
        this.isLoadingEvents = false;
        console.log('events : ', events);
      },
      error: () => {
      this.isLoadingEvents = false;
      console.error('Failed to load events for category:');
    }
    });
  }

  loadSubscribers(eventId: number): void {
    this.participationService.getEventSubscribers(eventId).subscribe({
      next: (subscribers) => {
        this.subscribers = subscribers;
        this.isLoadingSubscribers = false;
        console.log('subscribers : ', subscribers);
      },
      error: () => {
      this.isLoadingSubscribers = false;
      console.error('Failed to load subscribers for event:', eventId);
    }
    });
  }


  countEvents(): string {
    this.loadEvents;
    if (this.events.length >= 1000) {
      return (this.events.length / 1000).toFixed(1) + 'k Events';
    }
    return this.events.length + ' Events';
  }

  countSubscribers(): string {
    if (this.subscribers.length >= 1000) {
      return (this.subscribers.length / 1000).toFixed(1) + 'k Subscribers';
    }
    return this.subscribers.length + ' Subscribers';
  }

  loadCategoryDetails(categoryName: string): void {
    this.isLoadingCategory = true;
    this.categoryService.getCategoryByName(categoryName).subscribe({
      next: (category: Category) => {
        console.log('Category details:', category);
        this.isLoadingCategory = false;
        this.category = category;
      },
      error: (error) => {
        console.error('Failed to load category details:', error);
      }
    }); 
  }

  formattedCategoryName(): string {
    if (!this.category || !this.category.name) return '';
    const name = this.category.name.trim();
    if (name.toLowerCase() === 'ai') return name.toUpperCase();
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  subscribe(): void {
    console.log('Subscribe button clicked for category:', this.category);
  }

}

