import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCardCreateComponent } from './work-card-create.component';

describe('WorkCardCreateComponent', () => {
  let component: WorkCardCreateComponent;
  let fixture: ComponentFixture<WorkCardCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkCardCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkCardCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
