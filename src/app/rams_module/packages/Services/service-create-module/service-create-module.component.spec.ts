import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCreateModuleComponent } from './service-create-module.component';

describe('ServiceCreateModuleComponent', () => {
  let component: ServiceCreateModuleComponent;
  let fixture: ComponentFixture<ServiceCreateModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCreateModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCreateModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
