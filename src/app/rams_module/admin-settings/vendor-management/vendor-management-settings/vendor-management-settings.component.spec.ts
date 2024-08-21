import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorManagementSettingsComponent } from './vendor-management-settings.component';

describe('VendorManagementSettingsComponent', () => {
  let component: VendorManagementSettingsComponent;
  let fixture: ComponentFixture<VendorManagementSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorManagementSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorManagementSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
