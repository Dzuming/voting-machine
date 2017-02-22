import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../shared/services/rest.service';
import { CalculateService } from '../shared/services/calculate.service';
import { ChartService } from '../shared/services/chart.service';
import { Question } from '../shared/models/question.model';
import { Answer } from '../shared/models/answer.model';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-voting-machine',
  templateUrl: './voting-machine.component.html',
  providers: [
    RestService,
    CalculateService,
    ChartService
  ]
})
export class VotingMachineComponent implements OnInit {
  public questions: Object = Question;
  public randomQuestion: Object = Question;
  public answer: Object = Question;
  public answers: Answer[];
  public questionNumber: number;
  private errorMessage: string;

  constructor(private restService: RestService, private calculateService: CalculateService, private chartService: ChartService) { }

  ngOnInit() {

    this.getQuestions();
  }
  getRandomQuestion() {
    this.restService.getRandomQuestion()
      .subscribe(
      data => {
        this.randomQuestion = data;
        this.getQuestionNumber();
      },
      error => this.errorMessage = <any>error,
      () => {
        this.updateCharts(this.questionNumber);
      }
      );
  }
  getQuestions() {
    this.restService.getQuestions()
      .subscribe(
      data => this.questions = data,
      error => this.errorMessage = <any>error,
      () => {
        this.getRandomQuestion();
        this.getAnswers(this.questionNumber);
      }
      );
  }
  addAnswer(event) {
    const question: any = this.randomQuestion;
    this.getAnswerAfterClick(question.question_id, event);
    this.restService.addAnswer(this.answer)
      .subscribe(
      data => { this.getQuestionNumber(); },
      error => this.errorMessage = <any>error,
      () => this.updateCharts(this.questionNumber)
      );
  }

  getAnswerAfterClick(id: number, event: any) {
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
      'question_id': id,
      'answer_A': answer_A,
      'answer_B': answer_B,
      'answer_C': answer_C,
      'answer_D': answer_D,
    };
  }
  getQuestionNumber() {
    if (!this.randomQuestion) {
      return;
    }
    let tempQuestion: any;
    tempQuestion = this.questions;
    const tempRandomQuestion: any = this.randomQuestion;
    tempQuestion.map((value, index) => {
      for (const el in value) {
        if (tempRandomQuestion.question === value.question) {
          return this.questionNumber = index;
        }
      }
    });
  }
  public getAnswers(number?: number) {
    this.restService.getAnswers()
      .subscribe(
      data => this.answers = data,
      error => this.errorMessage = <any>error,
      () => {
        this.calculateService.convertToPercentage(this.answers);
        if (number >= 0) {
          this.chartService.createPieChart(this.answers[number], this.questions);
          this.chartService.createBarChart(this.answers[number], this.questions);
        }

      });
  }
  updateCharts(number: number) {
    this.chartService.updateCharts();
    return this.getAnswers(number);
  }
}

