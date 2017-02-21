import { Component, OnInit, Input } from '@angular/core';
import { Answer } from '../shared/models/answer.model';
import { Question } from '../shared/models/question.model';
import { RestService } from '../shared/services/rest.service';
import { CalculateService } from '../shared/services/calculate.service';
import { ChartService } from '../shared/services/chart.service';
import * as d3 from 'd3';
@Component({
  selector: 'app-voting-machine-chart',
  templateUrl: './voting-machine-chart.component.html',
  providers: [
    RestService,
    CalculateService,
    ChartService
  ]
})
export class VotingMachineChartComponent implements OnInit {
  @Input() answers: Answer[];
  @Input() questions: Question[];
  @Input() randomQuestion: Object = Question
  @Input() questionNumber: Number;
  public singleAnswer: Object = Answer;
  private allAnswers: Answer[];
  private errorMessage: String;
  constructor(private restService: RestService, private calculateService: CalculateService, private chartService: ChartService) { }
  ngOnInit() {
    this.getAnswers(0);
  }
  public getAnswers(number) {
    this.restService.getAnswers()
      .subscribe(
      data => {
        this.allAnswers = data;
        this.calculateService.convertToPercentage(this.allAnswers)
      },
      error => this.errorMessage = <any>error,
      () => {
        console.log(this.questionNumber);
        this.singleAnswer = this.allAnswers[number];
        this.chartService.createPieChart(this.singleAnswer, this.questions);
        this.chartService.createBarChart(this.singleAnswer, this.questions);
      },
    );
  }
  updateCharts(data) {
    this.chartService.updateCharts()
    return this.getAnswers(data)
  }
}
