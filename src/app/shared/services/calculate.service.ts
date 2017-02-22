import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class CalculateService {

  constructor(private http: Http) { }

   sumAnswerValues(value: Array<any>) {
    let sum: Number;
    const sumArray: Array<Number> = [];
    value.map(element => {
      sum = 0;
      for (const el in element) {
        if (element.hasOwnProperty(el) && el !== 'answer_id' && el !== 'question') {
          sum += element[el];
        }
      }
      sumArray.push(sum);
    });
    return sumArray;
  }

   convertToPercentage(value: Array<any>) {
    if (Object.keys(value).length === 0 && value.constructor === Object) {
      return;
    };
    const sum: Array<any> = this.sumAnswerValues(value);
    value.map((element, index) => {
      for (const el in element) {
        if (element.hasOwnProperty(el) && el !== 'answer_id' && el !== 'question') {
          element[el] = (element[el] / sum[index] * 100).toFixed(2);
        }
      }
    });
  }
}
