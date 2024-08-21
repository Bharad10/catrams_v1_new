import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceListModuleComponent } from './service-list-module.component';

describe('ServiceListModuleComponent', () => {
  let component: ServiceListModuleComponent;
  let fixture: ComponentFixture<ServiceListModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceListModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceListModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
