import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngIf and *ngFor
import { SearchService } from '../../services/search.service';
import { SidebarService } from '../../services/sidebar.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-modal.html',
  styleUrl: './search-modal.css',
})
export class SearchModal {
  @Input() events: any[] = []; // Receive all events from the Page
  isOpen = false;
  filteredResults: any[] = [];
  private typingSubject = new Subject<string>();

  constructor(private searchService: SearchService, private sidebar: SidebarService) {
    this.typingSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.filterLocalEvents(term);
      this.searchService.updateSearchTerm(term);
    });
  }

  openEvent(event: any) {
    // open the sidebar with the event and close the modal
    try { this.sidebar.open(event); } catch (e) { console.error('Failed to open sidebar from search modal', e); }
    this.close();
  }

  // Called by the Page Component button
  open() {
    this.isOpen = true;
    this.filteredResults = []; // Reset results on open
  }

  close() {
    this.isOpen = false;
  }

  onTyping(value: string) {
    this.typingSubject.next(value);
  }

  private filterLocalEvents(term: string) {
    if (!term.trim()) {
      this.filteredResults = [];
      return;
    }
    this.filteredResults = this.events.filter(event =>
      event.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}