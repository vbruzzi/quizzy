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

  api = "http://thawing-waters-52286.herokuapp.com/";

  getQuiz(quizId): Observable<Object> {
    return this.http.get(this.api + 'quiz/' + quizId);
  }

  createQuiz(quiz: Object): Observable<any>{
    return this.http.post<Object>('http://thawing-waters-52286.herokuapp.com/create', // API link
                                  JSON.stringify(quiz), // Object to be posted
                                  this.httpOptions); // Header
  }
}
