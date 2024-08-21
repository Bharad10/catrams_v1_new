import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolListModuleComponent } from './tool-list-module.component';

describe('ToolListModuleComponent', () => {
  let component: ToolListModuleComponent;
  let fixture: ComponentFixture<ToolListModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolListModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolListModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
