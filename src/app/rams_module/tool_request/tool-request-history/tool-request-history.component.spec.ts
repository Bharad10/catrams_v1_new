import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolRequestHistoryComponent } from './tool-request-history.component';

describe('ToolRequestHistoryComponent', () => {
  let component: ToolRequestHistoryComponent;
  let fixture: ComponentFixture<ToolRequestHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolRequestHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolRequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
