import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDueTicketsComponent } from './dashboard-due-tickets.component';

describe('DashboardDueTicketsComponent', () => {
  let component: DashboardDueTicketsComponent;
  let fixture: ComponentFixture<DashboardDueTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDueTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDueTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
