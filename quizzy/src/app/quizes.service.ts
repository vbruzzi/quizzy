import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizesService {

  constructor(private http: HttpClient) { }

  api = "http://localhost:5000/quiz";

  getQuiz(quizId): Observable<Object> {
    return this.http.get(this.api + '/' + quizId);
  }
}
