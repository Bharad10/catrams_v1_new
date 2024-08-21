import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentModuleDetailsComponent } from './payment-module-details.component';

describe('PaymentModuleDetailsComponent', () => {
  let component: PaymentModuleDetailsComponent;
  let fixture: ComponentFixture<PaymentModuleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentModuleDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentModuleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
