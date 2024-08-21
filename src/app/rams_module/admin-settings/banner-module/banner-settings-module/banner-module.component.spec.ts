import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerModuleComponent } from './banner-module.component';

describe('BannerModuleComponent', () => {
  let component: BannerModuleComponent;
  let fixture: ComponentFixture<BannerModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
