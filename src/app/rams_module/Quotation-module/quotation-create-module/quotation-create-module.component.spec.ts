import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationCreateModuleComponent } from './quotation-create-module.component';

describe('QuotationCreateModuleComponent', () => {
  let component: QuotationCreateModuleComponent;
  let fixture: ComponentFixture<QuotationCreateModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationCreateModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationCreateModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
