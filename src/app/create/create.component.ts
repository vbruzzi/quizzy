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
  submitted = false;
  quizUrl = '';
  quizMinReq = false;

  // Returns the questions in quizForm.
  get formQuestions() {
    return this.quizForm.get('questions') as FormArray;
  }

  value(input) {
    if (typeof input === 'string') {
      return input;
    }
  }

  onSubmit() {
    const quiz = this.quizForm.value;
    const submitItem = {
      name: quiz.quizName,
      questions: []
    };

    for (const question of quiz.questions) {
      const currentQuestion = quiz.questions[question];
      const pushItem = {
        question: currentQuestion.question,
        options: [
          currentQuestion.option1,
          currentQuestion.option2,
          currentQuestion.option3,
          currentQuestion.option4
        ],
        answer: currentQuestion.correct
      };
      submitItem.questions.push(pushItem);
    }
    this.service.createQuiz(submitItem)
    .subscribe(data => {
      this.quizUrl = data._id;
      this.submitted = true;
    });
  }

  // Empty question skeleton
  addQuestion() {
    console.log(this.formQuestions)
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
  }

}
