import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCardViewCustomerDetailsComponent } from './work-card-view-customer-details.component';

describe('WorkCardViewCustomerDetailsComponent', () => {
  let component: WorkCardViewCustomerDetailsComponent;
  let fixture: ComponentFixture<WorkCardViewCustomerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkCardViewCustomerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkCardViewCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
