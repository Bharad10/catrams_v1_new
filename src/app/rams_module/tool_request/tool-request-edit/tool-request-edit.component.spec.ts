import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolRequestEditComponent } from './tool-request-edit.component';

describe('ToolRequestEditComponent', () => {
  let component: ToolRequestEditComponent;
  let fixture: ComponentFixture<ToolRequestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolRequestEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
