import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedToolsModuleComponent } from './deleted-tools-module.component';

describe('DeletedToolsModuleComponent', () => {
  let component: DeletedToolsModuleComponent;
  let fixture: ComponentFixture<DeletedToolsModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedToolsModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedToolsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
