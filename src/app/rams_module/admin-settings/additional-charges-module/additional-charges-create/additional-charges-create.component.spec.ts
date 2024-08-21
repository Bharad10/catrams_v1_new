import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalChargesCreateComponent } from './additional-charges-create.component';

describe('AdditionalChargesCreateComponent', () => {
  let component: AdditionalChargesCreateComponent;
  let fixture: ComponentFixture<AdditionalChargesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalChargesCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalChargesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
