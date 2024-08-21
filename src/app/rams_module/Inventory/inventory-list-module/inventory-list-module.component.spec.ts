import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryListModuleComponent } from './inventory-list-module.component';

describe('InventoryListModuleComponent', () => {
  let component: InventoryListModuleComponent;
  let fixture: ComponentFixture<InventoryListModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryListModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryListModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
