import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationEditModuleComponent } from './quotation-edit-module.component';

describe('QuotationEditModuleComponent', () => {
  let component: QuotationEditModuleComponent;
  let fixture: ComponentFixture<QuotationEditModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationEditModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationEditModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
