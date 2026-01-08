import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { City } from '../../models/city.model';
import { Category } from '../../models/category.model';
import { CityService } from '../../services/city.service';
import { CategoryService } from '../../services/category.service';
import { AppEvent } from '../../models/event.model';
import { SearchService } from '../../services/search.service';
import { EventService } from '../../services/event';
import { SearchModal } from '../../components/search-modal/search-modal';

@Component({
  selector: 'app-explore-events',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchModal],
  templateUrl: './explore-events.html',
  styleUrls: ['./explore-events.css'],
})
export class ExploreEvents implements OnInit {
  activeContinent: string = 'Europe';
  cities: City[] = [];
  isLoadingCities = false;
  citiesError?: string;

  categories: Category[] = [];
  isLoadingCategories = false;
  categoriesError?: string;
  
 cityColors: string[] = [
  'bg-rose-500',
  'bg-pink-500',
  'bg-violet-500',
  'bg-indigo-500',
  'bg-blue-500',
  'bg-sky-500',
  'bg-cyan-500',
  'bg-teal-500',
  'bg-emerald-500',
  'bg-green-500',
  'bg-lime-500',
  'bg-yellow-500',
  'bg-amber-500',
  'bg-orange-500',
  'bg-red-500',
  'bg-stone-500',
  'bg-neutral-500',
  'bg-slate-500',
];

  allEvents: AppEvent[] = [];
  filteredResults: AppEvent[] = [];



  constructor(
    private cityService: CityService,
    private categoryService: CategoryService,
    private eventService: EventService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadCitiesForContinent(this.activeContinent);
    this.loadAllEvents();
        
    this.searchService.currentSearchTerm$.subscribe(term => {
      this.performFiltering(term);
    });

  }

  setActiveContinent(continent: string): void {
    if (this.activeContinent === continent) {
      return;
    }
    this.activeContinent = continent;
    this.loadCitiesForContinent(continent);
  }

  private loadCitiesForContinent(continent: string): void {
    this.isLoadingCities = true;
    this.citiesError = undefined;

    this.cityService.getCitiesByContinent(continent).subscribe({
      next: (cities) => {
        this.cities = cities;
        this.isLoadingCities = false;
        console.log(cities);
      },
      error: () => {
        this.cities = [];
        this.isLoadingCities = false;
        this.citiesError = 'Failed to load cities.';
      },
    });
  }

  private loadCategories(): void {
    this.isLoadingCategories = true;
    this.categoriesError = undefined;

    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories ?? [];
        this.isLoadingCategories = false;
      },
      error: () => {
        this.categories = [];
        this.isLoadingCategories = false;
        this.categoriesError = 'Failed to load categories.';
      },
    });
  }

  formattedCategoryName(categoryName: string): string {
    if (!categoryName) return '';
    const name = categoryName.trim();
    if (name.toLowerCase() === 'ai') return name.toUpperCase();
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  performFiltering(term: string) {
    if (!term.trim()) {
      this.filteredResults = [];
      return;
    }
    this.filteredResults = this.allEvents.filter(e => 
      e.title.toLowerCase().includes(term.toLowerCase())
    );
  }


  loadAllEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.allEvents = events;
      },
      error: (err) => {
        console.error('Failed to load all events for search filtering:', err);
      }
    });
    
  }

}
