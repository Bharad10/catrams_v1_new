import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleSettingsComponent } from './user-role-settings.component';

describe('UserRoleSettingsComponent', () => {
  let component: UserRoleSettingsComponent;
  let fixture: ComponentFixture<UserRoleSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRoleSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
