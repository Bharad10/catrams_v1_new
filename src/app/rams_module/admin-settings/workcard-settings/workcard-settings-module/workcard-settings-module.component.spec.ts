import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkcardSettingsModuleComponent } from './workcard-settings-module.component';

describe('WorkcardSettingsModuleComponent', () => {
  let component: WorkcardSettingsModuleComponent;
  let fixture: ComponentFixture<WorkcardSettingsModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkcardSettingsModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkcardSettingsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
