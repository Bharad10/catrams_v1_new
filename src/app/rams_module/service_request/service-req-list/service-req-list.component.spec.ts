import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceReqListComponent } from './service-req-list.component';

describe('ServiceReqListComponent', () => {
  let component: ServiceReqListComponent;
  let fixture: ComponentFixture<ServiceReqListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceReqListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceReqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
