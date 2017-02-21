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
  @Input() answers: Answer[];
  public hmm: Answer[];
  public errorMessage: String;
  public g: any;
  public current;
  public pie;
  public arc: any;
  constructor(private restService: RestService, private calculateService: CalculateService) { }

  ngOnInit() {
    this.getAnswers(0);
  }
  rawDataChart(setData: any): any {
    let values:Array<Object> = [];
    let i = 0
    for (let el in setData) {
      if (setData.hasOwnProperty(el) && el !== "answer_id" && el !== "question" && setData[el] > 0) {
        values.push({ 'Answer': setData[el], 'Category': el })
      }
    }
    return values;
  }
  // rawDataChart(setData: any): any {
  //   return [
  //     { 'Answer': setData.answer_A, 'Category': 'Answer A' },
  //     { 'Answer': setData.answer_B, 'Category': 'Answer B' },
  //     { 'Answer': setData.answer_C, 'Category': 'Answer C' },
  //     { 'Answer': setData.answer_D, 'Category': 'Answer D' }
  //   ];
  // }
  createPieChart(data) {
    const width = 360;
    const height = 360;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory20b);
    let svg = d3.select('#pie-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
    this.arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);
    this.pie = d3.pie()
      .value(function (d: any) { return d.Answer; })
      .sort(null)
      (this.rawDataChart(data));
    this.g = svg.selectAll('path')
      .data(this.pie)
      .enter()
      .append('g')
      .attr('class', this.arc)
    this.g.append('path')
      .attr('d', this.arc)
      .style('fill', (d: any) => color(d.data.Category))
      .style('stroke', (d: any) => color(d.data.Category))
    this.g.append('text')
      .attr('transform', (d) => 'translate(' + this.arc.centroid(d) + ')')
      .attr('text-anchor', 'middle')
      .text((d: any) =>d.data.Category + ' ' + d.value + "%")
      .style('fill', '#fff');
  }
  public getAnswers(number) {
    this.restService.getAnswers()
      .subscribe(
      data => this.hmm = data,
      error => this.errorMessage = <any>error,
      () => {
        this.calculateService.convertToPercentage(this.hmm),
          this.createPieChart(this.hmm[number])
      },
    );
  }
  updatePieChart(data) {
    d3.select('svg')
      .remove()
      .exit();
    this.getAnswers(data);
  };
}
