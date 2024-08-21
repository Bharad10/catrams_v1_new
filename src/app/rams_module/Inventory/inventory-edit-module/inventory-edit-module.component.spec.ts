import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryEditModuleComponent } from './inventory-edit-module.component';

describe('InventoryEditModuleComponent', () => {
  let component: InventoryEditModuleComponent;
  let fixture: ComponentFixture<InventoryEditModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryEditModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryEditModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
