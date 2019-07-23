import { Component, OnInit } from '@angular/core';
import { QuizesService } from '../quizes.service';
import { ActivatedRoute } from '@angular/router';
import { trigger,
  state,
  style,
  animate,
  transition,
  keyframes } from '@angular/animations';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
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
export class QuizComponent implements OnInit {
  constructor(
    private service: QuizesService,
    private route: ActivatedRoute,
    ) {}

  // Stores all questions to pass on to quizview
  questions: object;
  quizName: string;

  quizLoaded = false;
  // Answers to pass to quizresults
  answers: Array<object>;
  // Status for showing quiz/results (true means you're still doing quiz)
  status = true;
  // Id for quiz
  quizUrl: string;

  // Function to handle quiz end and display the result
  showResults($event) {
    this.answers = $event;
    this.quizLoaded = false;
  }

  uploadAnswers(result) {
    this.service.uploadAnswers(result, this.quizUrl);
  }

  endQuiz() {
    if(this.answers) {
      this.status = false;
    }
  }

  formReady() {
    if(this.questions) {
      this.quizLoaded = true;
    }
  }

  mapData(data) {
    this.quizName = data['name'];
    this.questions = data['questions'];
    this.quizUrl = data['id'];
  }

  ngOnInit() {
    // Gets quiz ID from url
    const id = this.route.snapshot.params['id'];
    // Fetches quiz via API
    if(id === 'random') {
      this.service.getRandom().subscribe(data => {
        this.mapData(data);
      });
    } else {
      this.service.getQuiz(id).subscribe(data => {
        this.mapData(data);
      });
    }
  }
}
