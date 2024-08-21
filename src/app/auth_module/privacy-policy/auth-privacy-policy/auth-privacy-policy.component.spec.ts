import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPrivacyPolicyComponent } from './auth-privacy-policy.component';

describe('AuthPrivacyPolicyComponent', () => {
  let component: AuthPrivacyPolicyComponent;
  let fixture: ComponentFixture<AuthPrivacyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthPrivacyPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
