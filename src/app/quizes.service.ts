import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizesService {
  httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  api = 'https://thawing-waters-52286.herokuapp.com/';

  getQuiz(quizId): Observable<object> {
    return this.http.get(this.api + 'quiz/' + quizId);
  }

  getRandom() {
    return this.http.get(this.api + 'random');
  }

  createQuiz(quiz: object): Observable<any> {
    return this.http.post<object>(this.api + 'create', // API link
                                  JSON.stringify(quiz), // Object to be posted
                                  this.httpOptions); // Header
  }

  uploadAnswers(results, quizid): Observable<any> {
    return this.http.post<object>(this.api + 'stats',
                                  JSON.stringify({result: results, quizId: quizid}),
                                  this.httpOptions);
  }

  getStats(id) {
    return this.http.get(this.api + 'stats/' + id);
  }
}
