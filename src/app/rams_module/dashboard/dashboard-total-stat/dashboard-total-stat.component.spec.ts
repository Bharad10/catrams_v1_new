import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTotalStatComponent } from './dashboard-total-stat.component';

describe('DashboardTotalStatComponent', () => {
  let component: DashboardTotalStatComponent;
  let fixture: ComponentFixture<DashboardTotalStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTotalStatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTotalStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
