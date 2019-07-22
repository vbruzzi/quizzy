import { Component, OnInit } from '@angular/core';
import { QuizesService } from '../quizes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  constructor(
    private service: QuizesService,
    private route: ActivatedRoute,
    ) {}

  // Stores all questions and quizname
  // to pass on to quizview
  questions: Object;
  quizName:string;

  // Answers to pass to quizresults
  answers: Array<Object>;

  // Status for showing quiz/results (true means you're still doing quiz)
  status: boolean = true;

  // Function to handle quiz end and display the result
  showResults($event) {
    this.answers = $event;
    this.status = false;
  }

  ngOnInit() {
    // Gets quiz ID from url
    const id = this.route.snapshot.params['id'];

    // Fetches quiz via API
    if(id == 'random') {
      this.service.getRandom().subscribe(data => {
        this.quizName = data['name'];
        this.questions = data['questions'];
      });
    } else {
      try {
        this.service.getQuiz(id).subscribe(data => {
          this.quizName = data['name'];
          this.questions = data['questions'];
        });
      }
      catch(error) {
    
      }
    }
  }
}