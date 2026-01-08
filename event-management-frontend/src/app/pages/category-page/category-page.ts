import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AppEvent, Subscriber } from '../../models/event.model';
import { CategoryService } from '../../services/category.service';
import { ParticipationService } from '../../services/participation.service';
import { Category } from '../../models/category.model';
import { User } from '../../models/user.model';

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
  // Toast notification
  showToast = false;
  toastMessage = '';
  private toastTimer: any = null;

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
        this.getCurrentPositionAsync();


      }
    });
  }

  private async loadEvents(category: string): Promise<void> {
    this.isLoadingEvents = true;
    this.events = [];

    // Get user location first (city/country) and try category+location endpoint.
    let userLocation: { city?: string; country?: string } = {};

    try {
      const position = await this.getCurrentPositionAsync();
      if (position) {
        try {
          const resp = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          );
          const data = await resp.json();
          const addr = data?.address ?? {};
          userLocation = {
            city: addr.city || addr.town || addr.village,
            country: addr.country,
          };
          console.log('User location:', userLocation);
        } catch (geoErr) {
          console.warn('Reverse geocode failed, will load by category only.', geoErr);
        }
      }
    } catch (err) {
      console.warn('Could not get user position, loading by category only.', err);
    }

    const tryCategoryOnly = () => {
      this.categoryService.getEventsByCategory(category).subscribe({
        next: (events) => {
          this.isEventExists = events.length > 0;
          this.events = events;
          this.isLoadingEvents = false;
          console.log('Loaded events (category fallback):', events);
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.isLoadingEvents = false;
          console.error('Failed to load events by category:', err);
        }
      });
    };

    // If we have both city and country, try the location-aware endpoint first
    if (userLocation.city && userLocation.country) {
      this.categoryService.getEventsByCategoryAndLocation(category, userLocation.city, userLocation.country)
        .subscribe({
          next: (events) => {
            if (events && events.length > 0) {
              this.isEventExists = true;
              this.events = events;
              this.isLoadingEvents = false;
              console.log('Loaded events (by location):', events);
              this.cdr.detectChanges();
            } else {
              // no events in same city/country -> fallback to category-wide
              tryCategoryOnly();
            }
          },
          error: (err) => {
            console.warn('Category+location request failed, falling back to category-only.', err);
            tryCategoryOnly();
          }
        });
    } else {
      // No usable location: load by category only
      tryCategoryOnly();
    }
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
    const n = this.events ? this.events.length : 0;
    if (n >= 1000) {
      return (n / 1000).toFixed(1) + 'k Events';
    }
    return n + ' Events';
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
    // Optimistically update UI and show toast immediately
    this.isSubscribed = true;
    this.toastMessage = `You've subscribed to ${this.formattedCategoryName()}! We'll keep you updated for new events.`;
    this.showToast = true;
    this.cdr.detectChanges();
    console.log('Toast shown:', this.toastMessage);
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.showToast = false;
      this.cdr.detectChanges();
    }, 4500);

    this.categoryService.subscribeToCategory(categoryId, userId).subscribe({
      next: (_check: Boolean) => {
        // server confirmed subscription; nothing else to do
      },
      error: (error) => {
        console.error('Failed to subscribe to category:', error);
        // revert optimistic UI and show error toast
        this.isSubscribed = false;
        this.toastMessage = `Subscription failed. Please try again.`;
        this.showToast = true;
        this.cdr.detectChanges();
        if (this.toastTimer) clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
          this.showToast = false;
          this.cdr.detectChanges();
        }, 4500);
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
    // Optimistically update UI and show toast immediately
    this.isSubscribed = false;
    this.toastMessage = `You've unsubscribed from ${this.formattedCategoryName()}. You won't receive updates anymore.`;
    this.showToast = true;
    this.cdr.detectChanges();
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.showToast = false;
      this.cdr.detectChanges();
    }, 4500);

    this.categoryService.unsubscribeFromCategory(categoryId, userId).subscribe({
      next: (_check: Boolean) => {
        // server confirmed unsubscription
      },
      error: (error) => {
        console.error('Failed to unsubscribe from category:', error);
        // revert optimistic UI and show error toast
        this.isSubscribed = true;
        this.toastMessage = `Unsubscribe failed. Please try again.`;
        this.showToast = true;
        this.cdr.detectChanges();
        if (this.toastTimer) clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
          this.showToast = false;
          this.cdr.detectChanges();
        }, 4500);
      }
    });
  }

  // Close toast notification (called from template)
  closeToast(): void {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
      this.toastTimer = null;
    }
    this.showToast = false;
    this.cdr.detectChanges();
    console.log('Toast closed');
  }


  async getCurrentPositionAsync(options?: PositionOptions): Promise<GeolocationPosition | null> {
  if (!isPlatformBrowser(this.platformId)) {
    console.warn('Geolocation skipped: not running in browser');
    return null;
  }

  if (!navigator.geolocation) {
    console.warn('Geolocation not supported by this browser');
    return null;
  }

  console.log('Getting current position...');
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

async showPosition(): Promise<void> {
  const position = await this.getCurrentPositionAsync();
  if (!position) return;

  console.log('Latitude:', position.coords.latitude);
  console.log('Longitude:', position.coords.longitude);
}


}