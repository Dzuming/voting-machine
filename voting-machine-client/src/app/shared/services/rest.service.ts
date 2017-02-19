import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Question } from '../models/question.model';
import { Answer } from '../models/answer.model';
@Injectable()
export class RestService {
  private productUrl: string = 'http://localhost:8080/public/index.php/';
  constructor(private http: Http) { }
  getQuestions(): Observable<Question> {
        return this.http.get(this.productUrl + 'questions')
            .map(this.extractData)
            .catch(this.handleError);
    }
    getAnswers(): Observable<Answer[]> {
        return this.http.get(this.productUrl + 'answers')
            .map(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
