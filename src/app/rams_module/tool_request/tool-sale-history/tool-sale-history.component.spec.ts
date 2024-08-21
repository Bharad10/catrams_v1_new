import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolSaleHistoryComponent } from './tool-sale-history.component';

describe('ToolSaleHistoryComponent', () => {
  let component: ToolSaleHistoryComponent;
  let fixture: ComponentFixture<ToolSaleHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolSaleHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolSaleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
