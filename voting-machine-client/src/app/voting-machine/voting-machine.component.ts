import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../shared/services/rest.service';
import { CalculateService } from '../shared/services/calculate.service';
import { Question } from '../shared/models/question.model';
import { Answer } from '../shared/models/answer.model';
@Component({
  selector: 'app-voting-machine',
  templateUrl: './voting-machine.component.html',
  providers: [
    RestService,
    CalculateService
  ]
})
export class VotingMachineComponent implements OnInit {
  public question: Object = Question;
  public answer: Object = Question;
  public answers: Answer[];
  private errorMessage: string;
  constructor(private restService: RestService, private calculateService: CalculateService) { }

  ngOnInit() {
    this.getQuestion();
    this.getAnswers();
  }
  public getQuestion() {
    this.restService.getQuestion()
      .subscribe(
      data => this.question = data,
      error => this.errorMessage = <any>error,
    );
  }
  public addAnswer(event) {
    const question: any = this.question;
    let answer_A = 0,
      answer_B = 0,
      answer_C = 0,
      answer_D = 0;
    if (event.currentTarget.children[0].innerHTML === 'Answer A') {
      answer_A = 1;
    } else if (event.currentTarget.children[0].innerHTML === 'Answer B') {
      answer_B = 1;
    } else if (event.currentTarget.children[0].innerHTML === 'Answer C') {
      answer_C = 1;
    } else {
      answer_D = 1;
    }
    this.answer = {
      'question_id': question.question_id,
      'answer_A': answer_A,
      'answer_B': answer_B,
      'answer_C': answer_C,
      'answer_D': answer_D,
    };
    this.restService.addAnswer(this.answer)
      .subscribe(
      data => {
      },
      error => this.errorMessage = <any>error,
      () => this.getAnswers()
      );
  }
  public getAnswers() {
    this.restService.getAnswers()
      .subscribe(
      data => this.answers = data,
      error => this.errorMessage = <any>error,
      () => this.calculateService.convertToPercentage(this.answers),
    );
  }

}

