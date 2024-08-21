import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolInspectionListComponent } from './tool-inspection-list.component';

describe('ToolInspectionListComponent', () => {
  let component: ToolInspectionListComponent;
  let fixture: ComponentFixture<ToolInspectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolInspectionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolInspectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
