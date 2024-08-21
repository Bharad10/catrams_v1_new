import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatmoduleComponent } from './chatmodule.component';

describe('ChatmoduleComponent', () => {
  let component: ChatmoduleComponent;
  let fixture: ComponentFixture<ChatmoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatmoduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
