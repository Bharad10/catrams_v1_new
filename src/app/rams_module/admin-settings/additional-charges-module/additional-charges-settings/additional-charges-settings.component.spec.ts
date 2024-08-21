import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalChargesSettingsComponent } from './additional-charges-settings.component';

describe('AdditionalChargesSettingsComponent', () => {
  let component: AdditionalChargesSettingsComponent;
  let fixture: ComponentFixture<AdditionalChargesSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalChargesSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalChargesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
