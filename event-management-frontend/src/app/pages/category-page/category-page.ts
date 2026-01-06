import { Component, OnInit } from '@angular/core';
import { EventCategory } from '../../models/event.model';
import { Subscriber } from '../../models/event.model';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [],
  templateUrl: './category-page.html',
  styleUrl: './category-page.css',
})
export class CategoryPage implements OnInit{
  events: EventCategory[] = [];
  subscribers: Subscriber[] = [];

  constructor() {}
  ngOnInit(): void {
    this.loadEvents();  
  }

  loadEvents(): void {
    
  }

}


