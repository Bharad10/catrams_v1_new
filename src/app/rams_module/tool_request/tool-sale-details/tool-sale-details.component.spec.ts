import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolSaleDetailsComponent } from './tool-sale-details.component';

describe('ToolSaleDetailsComponent', () => {
  let component: ToolSaleDetailsComponent;
  let fixture: ComponentFixture<ToolSaleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolSaleDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolSaleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
