import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCardDetailsComponent } from './data-card-details.component';
describe('DataCardDetailsComponent', () => {
  let component: DataCardDetailsComponent;
  let fixture: ComponentFixture<DataCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataCardDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
