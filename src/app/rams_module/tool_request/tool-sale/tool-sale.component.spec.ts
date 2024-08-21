import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolSaleComponent } from './tool-sale.component';

describe('ToolSaleComponent', () => {
  let component: ToolSaleComponent;
  let fixture: ComponentFixture<ToolSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
