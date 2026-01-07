import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AppEvent, Subscriber } from '../../models/event.model';
import { CategoryService } from '../../services/category.service';
import { ParticipationService } from '../../services/participation.service';
import { Category } from '../../models/category.model';
import { User } from '../../models/user.model';
import { truncate } from 'fs';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule],
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
  isSubscribed = false;
  isEventExists = false;

  private cdr = inject(ChangeDetectorRef);

  constructor(
      private participationService: ParticipationService,
      private categoryService: CategoryService,
      private route: ActivatedRoute,
      @Inject(PLATFORM_ID) private platformId: object
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
        if (events.length > 0) {
          this.isEventExists = true;
           this.events = events;
        }
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
      next: (category) => {
        console.log('Category details:', category);
        this.isLoadingCategory = false;
        this.category = category;
        this.checkSubscription();
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

  checkSubscription(): void {
    const categoryId = this.category?.id;
    const userId = this.getCurrentUser()?.id;
    if (!categoryId || !userId) {
      this.isSubscribed = false;
      return;
    }
    this.categoryService.isSubscribedToCategory(categoryId, userId).subscribe({
      next: (result) => {
        console.log('Subscription status:', result);
        this.isSubscribed = result;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isSubscribed = false;
        this.cdr.detectChanges();
      }
    });
  }

  subscribe(): void {
    const categoryId = this.category?.id;
    const userId = this.getCurrentUser()?.id;
    if (!categoryId || !userId) {
      console.error('Category or user not available for subscription');
      return;
    }
    this.categoryService.subscribeToCategory(categoryId, userId).subscribe({
      next: (check: Boolean) => {
        this.isSubscribed = true;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to subscribe to category:', error);
      }
    }); 
  

  }

  getCurrentUser(): User | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      return null;
    }
    try {
      return JSON.parse(userData) as User;
    } catch {
      return null;
    }
  }

  unsubscribe(): void {
    const categoryId = this.category?.id;
    const userId = this.getCurrentUser()?.id;
    if (!categoryId || !userId) {
      console.error('Category or user not available for unsubscription');
      return;
    }
    this.categoryService.unsubscribeFromCategory(categoryId, userId).subscribe({
      next: (check: Boolean) => {
        console.log('the user is unsubscribed successfully:');
        this.isSubscribed = false;
        this.cdr.detectChanges();
      }, 
      error: (error) => {
        console.error('Failed to unsubscribe from category:', error);
      }
    });
  }
}
