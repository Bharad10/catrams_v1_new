import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCardListComponent } from './work-card-list.component';

describe('WorkCardListComponent', () => {
  let component: WorkCardListComponent;
  let fixture: ComponentFixture<WorkCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkCardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
