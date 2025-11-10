import { Injectable } from "@angular/core";
import { Event } from "./event";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiServerUrl ='http://localhost:8080';
  constructor(private http: HttpClient) { }

  public getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiServerUrl}/events/all`);
    }
}