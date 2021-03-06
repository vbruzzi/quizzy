import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-quizresults',
  templateUrl: './quizresults.component.html',
  styleUrls: ['./quizresults.component.css']
})
export class QuizresultsComponent{
  @Input() answers;
  @Input() quizUrl;
  @Output() finalResult = new EventEmitter<number>();

  correctAnswers: number = 0;
  result: string;
  score: number;

  processAnswers() {
    this.correctAnswers = 0;
    this.answers.forEach(answer => {
      if(answer['correct']) {
        this.correctAnswers++;
      }
    });

    this.result = this.correctAnswers + '/' + this.answers.length;
    this.score = this.correctAnswers/this.answers.length;
    this.finalResult.emit(this.score);
  }

  ngOnChanges() {
    this.processAnswers();
  }
}
