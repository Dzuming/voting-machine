import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Question } from '../models/question.model';
import { Answer } from '../models/answer.model';
import { CalculateService } from './calculate.service';
@Injectable()
export class RestService {
    private productUrl = 'http://46.101.130.122/voting-machine-server/public/index.php/';
    public answers: Array<any>;
    public errorMessage: string;
    constructor(private http: Http, private calculateService: CalculateService) { }
    getRandomQuestion(): Observable<Question> {
        return this.http.get(this.productUrl + 'questions/random')
            .map(this.extractData)
            .catch(this.handleError);
    }
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
    addAnswer(answer): Observable<Answer> {
        const body = JSON.stringify(answer),
            headers = new Headers({
                'Content-Type': 'application/json',
            });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.productUrl + 'answers', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
