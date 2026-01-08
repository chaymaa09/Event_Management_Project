import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private baseUrl = `${environment.apiUrl}/cities`;

  constructor(private http: HttpClient) {}
  
  getCitiesByContinent(continent: string): Observable<City[]> {
    return this.http.get<City[]>(`${this.baseUrl}/${continent}`);
  }

  getCityByName(cityName: string): Observable<City> {
    return this.http.get<City>(`${this.baseUrl}/name/${cityName}`);
  }
}
