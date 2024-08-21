import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalChargesEditComponent } from './additional-charges-edit.component';

describe('AdditionalChargesEditComponent', () => {
  let component: AdditionalChargesEditComponent;
  let fixture: ComponentFixture<AdditionalChargesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalChargesEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalChargesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
