import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizShareComponent } from './quiz-share.component';

describe('QuizShareComponent', () => {
  let component: QuizShareComponent;
  let fixture: ComponentFixture<QuizShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
