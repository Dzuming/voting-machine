import { Component, OnInit } from '@angular/core';
import { RestService } from '../shared/services/rest.service';
import { Question } from '../shared/models/question.model';
@Component({
  selector: 'app-voting-machine',
  templateUrl: './voting-machine.component.html',
  providers: [
    RestService
  ]
})
export class VotingMachineComponent implements OnInit {
  public question: Object = Question;
  public answer: Object = Question;

  private errorMessage: string;
  constructor(private restService: RestService) { }

  ngOnInit() {
    this.getQuestion();
  }
  private getQuestion() {
    this.restService.getQuestion()
      .subscribe(
      data => this.question = data,
      error => this.errorMessage = <any>error,
    );
  }
  public addAnswer(event) {
    let answer_A = 0,
      answer_B = 0,
      answer_C = 0,
      answer_D = 0
      if (event.currentTarget.children[0].innerHTML === "Answer A") {
        answer_A = 1
      }
    this.answer = {
      'question_id': this.question,
      'answer_A': answer_A,
      'answer_B': answer_B,
      'answer_C': answer_C,
      'answer_D': answer_D,
    }
          this.restService.addAnswer(this.answer)
              .subscribe(
              data => {
              },
              error => this.errorMessage = <any>error);
  }

}

