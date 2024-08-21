import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolInspectionCheckComponent } from './tool-inspection-check.component';

describe('ToolInspectionCheckComponent', () => {
  let component: ToolInspectionCheckComponent;
  let fixture: ComponentFixture<ToolInspectionCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolInspectionCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolInspectionCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
