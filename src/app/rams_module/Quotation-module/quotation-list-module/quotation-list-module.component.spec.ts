import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationListModuleComponent } from './quotation-list-module.component';

describe('QuotationListModuleComponent', () => {
  let component: QuotationListModuleComponent;
  let fixture: ComponentFixture<QuotationListModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationListModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationListModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
