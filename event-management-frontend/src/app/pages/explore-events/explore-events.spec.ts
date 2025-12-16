import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreEvents } from './explore-events';

describe('ExploreEvents', () => {
  let component: ExploreEvents;
  let fixture: ComponentFixture<ExploreEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreEvents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreEvents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
