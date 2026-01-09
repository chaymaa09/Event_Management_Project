import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityEventCard } from './city-event-card';

describe('CityEventCard', () => {
  let component: CityEventCard;
  let fixture: ComponentFixture<CityEventCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityEventCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityEventCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
