import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolRequestPageComponent } from './tool-request-page.component';

describe('ToolRequestPageComponent', () => {
  let component: ToolRequestPageComponent;
  let fixture: ComponentFixture<ToolRequestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolRequestPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
