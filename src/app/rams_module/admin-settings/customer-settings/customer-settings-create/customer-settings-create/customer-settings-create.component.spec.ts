import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSettingsCreateComponent } from './customer-settings-create.component';

describe('CustomerSettingsCreateComponent', () => {
  let component: CustomerSettingsCreateComponent;
  let fixture: ComponentFixture<CustomerSettingsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSettingsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSettingsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
