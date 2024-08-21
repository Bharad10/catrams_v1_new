import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHistoryDetailsComponent } from './service-history-details.component';

describe('ServiceHistoryDetailsComponent', () => {
  let component: ServiceHistoryDetailsComponent;
  let fixture: ComponentFixture<ServiceHistoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceHistoryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
