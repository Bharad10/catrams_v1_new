import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolEditModuleComponent } from './tool-edit-module.component';

describe('ToolEditModuleComponent', () => {
  let component: ToolEditModuleComponent;
  let fixture: ComponentFixture<ToolEditModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolEditModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolEditModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
