import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCardViewServiceDetailsComponent } from './work-card-view-service-details.component';

describe('WorkCardViewServiceDetailsComponent', () => {
  let component: WorkCardViewServiceDetailsComponent;
  let fixture: ComponentFixture<WorkCardViewServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkCardViewServiceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkCardViewServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
