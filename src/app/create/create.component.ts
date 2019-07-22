import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { QuizComponent } from '../quiz/quiz.component';
import { QuizesService } from '../quizes.service';
import { TemplateParseError } from '@angular/compiler';
import { trigger,
  state,
  style,
  animate,
  transition,
  keyframes } from '@angular/animations';

// Quiz creation component
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'], 
  animations: [
    trigger('fadeOut',  [
      transition(':leave', animate(700, keyframes([
        style({opacity: 1, offset: 0}),
        style({opacity: 0, offset: 1})
      ])))
    ]),
    trigger('fadeIn',  [
      transition(':enter', animate(700, keyframes([
        style({ opacity: 0 }),
        style({ opacity: 1 })
      ])))
    ])
  ]
})

export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private service: QuizesService) { }

  quizForm: FormGroup;
  // Model for questions
  model = {question: 'Question', options: ['', '', '', '']};
  // Status for submit button
  formIsValid: any;
  // URL for page
  baseUrl = 'quizzy-vbruzzi.herokuapp.com/quiz/';
  // Quiz ID
  quizUrl = '';
  // Quiz is submitted
  submitted = false;
  // Copied quiz url
  copied = false;
  // Submission is complete (for displaying quiz url)
  complete = false;

  // Returns the questions in quizForm.
  get formQuestions() {
    return this.quizForm.get('questions') as FormArray;
  }

  onSubmit() {
    const quiz = this.quizForm.value;
    const submitItem = {
      name: quiz.quizName,
      questions: [],
      public: quiz.public
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

  finishUpload() { 
    if (this.submitted) {
      this.complete = true;
    }
  }

  copyUrl(): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.baseUrl + this.quizUrl;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.copied = true;
  }

  ngOnInit() {
    this.quizForm = this.fb.group({
      quizName: '',
      public: false,
      questions: this.fb.array([])
    });
    this.addQuestion();
    this.onChanges();
  }

  onChanges(): void {
    this.quizForm.statusChanges.subscribe(status => this.formIsValid = status);
  }
}
