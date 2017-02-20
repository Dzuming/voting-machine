import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class CalculateService {
  private productUrl: string = 'http://localhost:8080/public/index.php/';
  constructor(private http: Http) { }
  public sumAnswerValues(value) {
    let sum: Number;
    let sumArray: Array<Number> = [];
    value.map(element => {
      sum = 0;
      for (let el in element) {
        if (element.hasOwnProperty(el) && el !== "answer_id" && el !== "question") {
          sum += element[el];
        }
      }
      sumArray.push(sum);
    })
    return sumArray;
  }
  public convertToPercentage(value) {
    let sum: Array<any> = this.sumAnswerValues(value)
    value.map((element, index) => {
      for (let el in element) {
        if (element.hasOwnProperty(el) && el !== "answer_id" && el !== "question") {
          element[el] = (element[el] / sum[index] * 100).toFixed(2)
        }
      }
    })
  }
}