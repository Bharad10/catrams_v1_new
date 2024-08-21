import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCardEditModuleComponent } from './work-card-edit-module.component';

describe('WorkCardEditModuleComponent', () => {
  let component: WorkCardEditModuleComponent;
  let fixture: ComponentFixture<WorkCardEditModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkCardEditModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkCardEditModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
