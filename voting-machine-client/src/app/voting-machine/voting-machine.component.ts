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
  private errorMessage: string;
  constructor(private restService: RestService) { }

  ngOnInit() {
    this.getQuestions();
  }
  private getQuestions() {
    this.restService.getQuestions()
      .subscribe(
      data => this.question = data,
      error => this.errorMessage = <any>error,
    );
  }
}

