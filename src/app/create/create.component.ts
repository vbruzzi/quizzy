import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { QuizComponent } from '../quiz/quiz.component';
import { QuizesService } from '../quizes.service';

// Quiz creation component
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private service: QuizesService) { }

  quizForm: FormGroup;
  model = {question: 'Question', options: ['', '', '', '']};
  formIsValid: any;
  submitted = false;
  quizUrl = '';
  quizMinReq = false;

  // Returns the questions in quizForm.
  get formQuestions() {
    return this.quizForm.get('questions') as FormArray;
  }

  onSubmit() {
    const quiz = this.quizForm.value;
    const submitItem = {
      name: quiz.quizName,
      questions: []
    };

    // Formatting for submission
    for (const question of quiz.questions) {
      let pushItem = {
        question: question.question,
        options: [
          question.option1,
          question.option2,
          question.option3,
          question.option4
        ],
        answer: null
      };

      pushItem.answer = pushItem.options[question.correct - 1];

      submitItem.questions.push(pushItem);
    }

    // Submits
    this.service.createQuiz(submitItem)
    .subscribe(data => {
      this.quizUrl = data._id;
      this.submitted = true;
    });
  }

  // Empty question skeleton
  addQuestion() {
    const question = this.fb.group({
      question: [],
      correct: [],
      option1: [],
      option2: [],
      option3: [],
      option4: [],
    });
    this.formQuestions.push(question);
  }

  ngOnInit() {
    this.quizForm = this.fb.group({
      quizName: '',
      questions: this.fb.array([])
    });
    this.addQuestion();
    this.onChanges();
  }

  onChanges(): void {
    this.quizForm.statusChanges.subscribe(status => this.formIsValid = status);
  }
}
