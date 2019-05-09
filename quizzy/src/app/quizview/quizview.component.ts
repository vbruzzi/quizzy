import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quizview',
  templateUrl: './quizview.component.html',
  styleUrls: ['./quizview.component.css']
})
export class QuizviewComponent implements OnInit {
  // Gets questions/sends answers
  @Input() questions: Object[];
  @Output() finishedQuiz = new EventEmitter<Object>();
  
  // Stores user answers
  answers: Array<Object> = [];
  // Keeps track of current question
  currentQuestion: Object;
  // Amount of questions
  count: number;
  // user choice for current question, used with ngmodel
  choice:string;
  // Progress bar values
  progress:number = 0;
  progressIncrements: number;

  //Shifts to next question
  next() {
    // Answer template
    const answer = {'question': this.currentQuestion['question'], 'answer': this.choice}
    // Correct answer
    if(this.choice === this.currentQuestion['answer']) {
      answer['correct'] = true;
    // Incorrect
    } else {
      answer['correct'] = false;
      answer['correctAnswer'] = this.currentQuestion['answer']
    }

    this.answers.push(answer);
    this.count--;
    this.progress += this.progressIncrements;

    // Quiz is finished
    if(this.count < 0) {
      this.finishedQuiz.emit(this.answers);
    // Not finished
    } else {
      this.currentQuestion = this.questions[this.count];
      this.choice = null;
    }
  }
  

  ngOnChanges() {
    if(this.questions) {
      this.count = this.questions.length-1;
      this.currentQuestion = this.questions[this.count];
      this.progressIncrements = 100/this.questions.length;
    }
  }

  ngOnInit() {}
}
