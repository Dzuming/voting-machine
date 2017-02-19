import { Component, OnInit } from '@angular/core';
import { RestService } from '../shared/services/rest.service';
import { Answer } from '../shared/models/answer.model';
@Component({
  selector: 'app-voting-machine-table',
  templateUrl: './voting-machine-table.component.html',
  providers: [
    RestService
  ]
})
export class VotingMachineTableComponent implements OnInit {
  public answers: Array<any>;
  private errorMessage: string;
  constructor(private restService: RestService) { }

  ngOnInit() {
    this.getAnswers();
  }
  private getAnswers() {
    this.restService.getAnswers()
      .subscribe(
      data => this.answers = data,
      error => this.errorMessage = <any>error,
      () => this.convertToPercentage(this.answers)
      );
  }
  private sumAnswerValues(value) {
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
  private convertToPercentage(value) {
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
