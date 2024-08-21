import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolRequestDetailsComponent } from './tool-request-details.component';

describe('ToolRequestDetailsComponent', () => {
  let component: ToolRequestDetailsComponent;
  let fixture: ComponentFixture<ToolRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolRequestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
