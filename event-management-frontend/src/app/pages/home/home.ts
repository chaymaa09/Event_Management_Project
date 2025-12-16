import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HeroSection } from '../../components/hero-section/hero-section';
import { Footer } from '../../components/footer/footer';
import { EventService } from '../../services/event';
import { AppEvent } from '../../models/event.model';
import { EventCard } from '../../components/event-card/event-card';
import { MOCK_EVENTS } from '../../mocks/mock-events';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, MatIconModule, HeroSection, EventCard, Footer],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  constructor(private router: Router, private eventService: EventService) {}
  hashtags = ['#LiveMusic', '#TechTalks', '#Nightlife', '#Gaming', '#Fitness', '#FoodFestival', '#ArtExhibition', '#Workshop', '#Networking', '#Travel', '#Comedy', '#Sports', '#BookClub', '#FilmScreening', '#Dance', '#Meditation', '#StartupMeet', '#Photography', '#Tech'];
  trendingEvents: AppEvent[] = [];
  trendingError = '';
  loadingTrending = false;
  featuredEvent: AppEvent | null = null;
  collections = [
    { title: "Weekend Warriors", desc: "Events this weekend", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop" },
    { title: "Free & Fun", desc: "No cost events", img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop" },
    { title: "New in Town", desc: "First-time events", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop" },
    { title: "After Dark", desc: "Evening/night events", img: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=300&fit=crop" },
    { title: "Virtual Vibes", desc: "Online events", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop" },
  ];
  categories = [
    {
      name: 'Party',
      paths: [
        'M5.8 11.3 2 22l10.7-3.79',
        'M4 3h.01',
        'M22 8h.01',
        'M15 2h.01',
        'M22 20h.01',
        'm22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10',
        'm22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17',
        'm11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7',
        'M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z'
      ],
      gradient: 'from-pink-500 to-purple-600',
      relatedTags: ['workshop', 'conference', 'tech', 'education', 'seminar', 'course'],
      description: 'Turn up the night'
    },
    {
      name: 'Learn',
      paths: [
        'M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z',
        'M22 10v6',
        'M6 12.5V16a6 3 0 0 0 12 0v-3.5'
      ],
      gradient: 'from-indigo-500 to-blue-600',
      relatedTags: ['music', 'nightlife', 'party', 'concert', 'festival', 'club'],
      description: 'Feed your curiosity'
    },
    {
      name: 'Chill',
      paths: [
        'M10 2v2',
        'M14 2v2',
        'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1',
        'M6 2v2'
      ],
      gradient: 'from-emerald-500 to-teal-600',
      relatedTags: ['coffee', 'bookclub', 'yoga', 'meditation', 'relax'],
      description: 'Take it easy'
    },
    {
      name: 'Active',
      paths: [
        'M13 10V3L4 14h7v7l9-11h-7z'
      ],
      gradient: 'from-amber-500 to-orange-600',
      relatedTags: ['sports', 'fitness', 'running', 'hiking', 'gym', 'marathon'],
      description: 'Get moving'
    },
    {
      name: 'Create',
      paths: ['M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z'],
      circles: [
        { cx: 13.5, cy: 6.5, r: 1.5 },
        { cx: 17.5, cy: 10.5, r: 1.5 },
        { cx: 8.5, cy: 7.5, r: 1.5 },
        { cx: 6.5, cy: 12.5, r: 1.5 }
      ],
      gradient: 'from-purple-500 to-pink-600',
      relatedTags: ['art', 'photography', 'writing', 'crafts', 'design'],
      description: 'Express yourself'
    },
    {
      name: 'Connect',
      paths: [
        'm11 17 2 2a1 1 0 1 0 3-3',
        'm14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4',
        'm21 3 1 11h-2',
        'M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3',
        'M3 4h8'
      ],
      gradient: 'from-yellow-500 to-amber-600',
      relatedTags: ['networking', 'meetup', 'social', 'community', 'dating'],
      description: 'Meet your people'
    }
  ];


  onCategoryClick(category: any) {
    const tagString = category.relatedTags.join(', ');
    this.router.navigate(['/events'], {
      queryParams: {
        filter: 'tags',
        tags: tagString,
        vibe: category.name
      }
    })
  }

  onCollectionClick(collection: any) {
    this.router.navigate(['/events'], {
      queryParams: {
        collection: collection.title
      }
    })
  }

  ngOnInit() {
    this.loadTrending();
    this.loadFeaturedEvent();
  }

  private loadTrending() {
    this.loadingTrending = true;
    this.trendingError = '';
    this.trendingEvents = [];

    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.trendingEvents = events.slice(0, 3);
        this.loadingTrending = false;
      },
      error: (err) => {
        this.trendingError = 'Unable to load events. Please try again later.';
        this.loadingTrending = false;
      }
    })
  }

  private loadFeaturedEvent() {
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        if (events && events.length > 0) {
          this.featuredEvent = events[0];
        }
      },
      error: (err) => {
        console.error('Failed to load featured event', err);
      }
    });
  }



  getTimeLeft() {
    if (!this.featuredEvent) return { days: 0, hours: 0, minutes: 0 };
    const now = Date.now();
    const start = new Date(this.featuredEvent.startDate).getTime();
    const diff = start - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes };
  }

  onSubscribeClick() {
    if (!this.featuredEvent) return;
    this.router.navigate(['/events', this.featuredEvent.id]);
  }

  onSubscribe(event: Event) {
    event.preventDefault();
    // Implement subscription logic here
    alert('Thank you for subscribing!');
  }
}