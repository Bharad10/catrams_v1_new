import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestSettingsComponent } from './service-request-settings.component';

describe('ServiceRequestSettingsComponent', () => {
  let component: ServiceRequestSettingsComponent;
  let fixture: ComponentFixture<ServiceRequestSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceRequestSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceRequestSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
