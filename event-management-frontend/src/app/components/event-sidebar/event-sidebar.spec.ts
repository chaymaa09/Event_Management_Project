import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSidebar } from './event-sidebar';

describe('EventSidebar', () => {
  let component: EventSidebar;
  let fixture: ComponentFixture<EventSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
