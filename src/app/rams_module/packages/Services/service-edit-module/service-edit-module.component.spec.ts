import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEditModuleComponent } from './service-edit-module.component';

describe('ServiceEditModuleComponent', () => {
  let component: ServiceEditModuleComponent;
  let fixture: ComponentFixture<ServiceEditModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceEditModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceEditModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
