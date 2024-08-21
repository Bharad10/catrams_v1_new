import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNewTicketsComponent } from './dashboard-new-tickets.component';

describe('DashboardNewTicketsComponent', () => {
  let component: DashboardNewTicketsComponent;
  let fixture: ComponentFixture<DashboardNewTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardNewTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardNewTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
