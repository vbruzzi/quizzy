import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizresultsComponent } from './quizresults.component';

describe('QuizresultsComponent', () => {
  let component: QuizresultsComponent;
  let fixture: ComponentFixture<QuizresultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizresultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
