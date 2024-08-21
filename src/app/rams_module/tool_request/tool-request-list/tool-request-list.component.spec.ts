import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolRequestListComponent } from './tool-request-list.component';

describe('ToolRequestListComponent', () => {
  let component: ToolRequestListComponent;
  let fixture: ComponentFixture<ToolRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolRequestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
