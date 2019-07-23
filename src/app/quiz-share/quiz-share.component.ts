import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-share',
  templateUrl: './quiz-share.component.html',
  styleUrls: ['./quiz-share.component.css']
})
export class QuizShareComponent {

  // URL for page
  baseUrl = 'quizzy-vbruzzi.herokuapp.com/quiz/';
  @Input() quizUrl: string;
  // Copied quiz url
  copied = false;

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
}
