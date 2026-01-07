import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';
import { AppEvent } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/all`);
  }

  getEventsByCategory(categoryName: string): Observable<AppEvent[]> {
    return this.http.get<AppEvent[]>(`${this.baseUrl}/events/${categoryName}`);
  }

  getCategoryByName(categoryName: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${categoryName}`);

  }

  subscribeToCategory(categoryId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${categoryId}/subscribe/${userId}`, {});
}

  unsubscribeFromCategory(categoryId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${categoryId}/unsubscribe/${userId}`, {});
  }

  isSubscribedToCategory(categoryId: number, userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/${categoryId}/is-subscribed/${userId}`);
  }
}
