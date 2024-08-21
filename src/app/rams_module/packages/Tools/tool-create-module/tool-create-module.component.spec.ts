import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolCreateModuleComponent } from './tool-create-module.component';

describe('ToolCreateModuleComponent', () => {
  let component: ToolCreateModuleComponent;
  let fixture: ComponentFixture<ToolCreateModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolCreateModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolCreateModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
