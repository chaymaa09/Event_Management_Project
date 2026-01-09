import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  // Use BehaviorSubject so new subscribers get the latest search term
  private searchSource = new BehaviorSubject<string>('');
  currentSearchTerm$ = this.searchSource.asObservable();

  updateSearchTerm(term: string) {
    this.searchSource.next(term);
  }
}