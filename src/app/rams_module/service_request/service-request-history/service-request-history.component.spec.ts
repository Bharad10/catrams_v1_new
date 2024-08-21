import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestHistoryComponent } from './service-request-history.component';

describe('ServiceRequestHistoryComponent', () => {
  let component: ServiceRequestHistoryComponent;
  let fixture: ComponentFixture<ServiceRequestHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceRequestHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceRequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
