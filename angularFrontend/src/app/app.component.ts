import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventService } from './event.service';
import { Event } from './event';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // <-- needed for *ngFor

@Component({
  selector: 'app-root',
  standalone: true,             // <-- make it standalone
  imports: [CommonModule, RouterOutlet], // <-- import directives you use
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']      // <-- fix typo
})
export class AppComponent implements OnInit {
  public events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.getEvents();
  }

  public getEvents(): void {
    this.eventService.getEvents().subscribe(
      (response: Event[]) => {
        this.events = response;
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
