import { Component, OnInit } from '@angular/core';
import { RestService } from '../shared/services/rest.service';
@Component({
  selector: 'app-voting-machine',
  templateUrl: './voting-machine.component.html',
  providers: [
    RestService
  ]
})
export class VotingMachineComponent implements OnInit {
  public question;
  private errorMessage: string;
  constructor(private restService:RestService) { }

  ngOnInit() {
    this.getQuestion();
  }
private getQuestion() {
        this.restService.getQuestion()
            .subscribe(
            data => this.question = data[0].question,
            error => this.errorMessage = <any>error,
            ()=> console.log(this.question)
            );
    }
    
}
