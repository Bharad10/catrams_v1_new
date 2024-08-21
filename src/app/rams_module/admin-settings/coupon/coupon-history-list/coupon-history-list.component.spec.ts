import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponHistoryListComponent } from './coupon-history-list.component';

describe('CouponHistoryListComponent', () => {
  let component: CouponHistoryListComponent;
  let fixture: ComponentFixture<CouponHistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponHistoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
