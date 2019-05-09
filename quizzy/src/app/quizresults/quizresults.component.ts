import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quizresults',
  templateUrl: './quizresults.component.html',
  styleUrls: ['./quizresults.component.css']
})
export class QuizresultsComponent implements OnInit {
  @Input() answers;

  correctAnswers: number = 0;
  result: string;

  constructor() { }


  processAnswers() {
    this.correctAnswers = 0;
    this.answers.forEach(answer => {
      if(answer['correct']) {
        this.correctAnswers++;
      }
    });
    console.log(this.correctAnswers + '/' + this.answers.length)
    this.result = this.correctAnswers + '/' + this.answers.length;
  }
  ngOnInit() {
  }

  ngOnChanges() {
    this.processAnswers();
  }
}
