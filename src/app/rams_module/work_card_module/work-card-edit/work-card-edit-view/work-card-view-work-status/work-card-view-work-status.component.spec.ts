import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCardViewWorkStatusComponent } from './work-card-view-work-status.component';

describe('WorkCardViewWorkStatusComponent', () => {
  let component: WorkCardViewWorkStatusComponent;
  let fixture: ComponentFixture<WorkCardViewWorkStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkCardViewWorkStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkCardViewWorkStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
