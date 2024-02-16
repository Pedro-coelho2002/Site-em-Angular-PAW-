import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventNameComponent } from './event-name.component';

describe('EventNameComponent', () => {
  let component: EventNameComponent;
  let fixture: ComponentFixture<EventNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventNameComponent]
    });
    fixture = TestBed.createComponent(EventNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
