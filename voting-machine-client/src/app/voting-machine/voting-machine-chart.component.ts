import { Component, OnInit, Input } from '@angular/core';
import { Answer } from '../shared/models/answer.model';
import { RestService } from '../shared/services/rest.service';
import { CalculateService } from '../shared/services/calculate.service';
import * as d3 from 'd3';
@Component({
  selector: 'app-voting-machine-chart',
  templateUrl: './voting-machine-chart.component.html',
  providers: [
    RestService,
    CalculateService
  ]
})
export class VotingMachineChartComponent implements OnInit {
  public answers: Answer[];
  public selectedAnswerNumber:Number = 0;
  public errorMessage: String;
  constructor(private restService: RestService, private calculateService: CalculateService) { }

  ngOnInit() {
    this.getAnswers(this.selectedAnswerNumber);
  }
  rawDataChart(setData:any):any {
    return [{ 'Answer': setData.answer_A, 'Category': 'Answer A' },
            { 'Answer': setData.answer_B, 'Category': 'Answer B' },
            { 'Answer': setData.answer_C, 'Category': 'Answer C' },
            { 'Answer': setData.answer_D, 'Category': 'Answer D' }
    ];
  }
  createChart(data) {
    const  width = 360;
    const  height = 360;
    const  radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory20b);
    let svg = d3.select('#pie-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
    let arc: any = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);
    var pie = d3.pie()
      .value(function (d: any) { return d.Answer; })
      .sort(null)
      (this.rawDataChart(data));
      console.log(this.rawDataChart(data))
    let g = svg.selectAll('path')
      .data(pie)
      .enter()
      .append('g')
      .attr('class', arc)
      g.append('path')
      .attr('d', arc)
      .style('fill', (d: any) => color(d.data.Category))
      .style('stroke', (d: any) => color(d.data.Category));
    g.append('text')
      .attr('transform', (d) => 'translate(' + arc.centroid(d) + ')')
      .attr('text-anchor', 'middle')
      .text((d: any) => d.value + "%")
      .style('fill', '#fff');

  }
  public getAnswers(number) {
    this.restService.getAnswers()
      .subscribe(
      data => this.answers = data,
      error => this.errorMessage = <any>error,
      () => {this.calculateService.convertToPercentage(this.answers),
        this.createChart(this.answers[number])},
    );
  }
  SumofSingleCategories(dataChart): any {
    return d3.nest().key((d: any) => d.answer)
      .rollup((value): any => d3.sum(value, (d: any) => d.answer))
      .entries(dataChart);
  }

}
