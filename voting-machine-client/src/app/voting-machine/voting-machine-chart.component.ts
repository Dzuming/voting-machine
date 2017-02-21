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
  private hmm: Answer[];
  private errorMessage: String;
  private g: any;
  private current;
  private pie;
  private arc: any;
  private readonly color = d3.scaleOrdinal(d3.schemeCategory20b);
  constructor(private restService: RestService, private calculateService: CalculateService) { }

  ngOnInit() {
    this.getAnswers(0);
  }
  rawDataChart(setData: any): any {
    const values: Array<Object> = [];
    for (const el in setData) {
      if (setData.hasOwnProperty(el) && el !== 'answer_id' && el !== 'question' && setData[el] > 0) {
        values.push({ 'Answer': setData[el], 'Category': el });
      }
    }
    return values;
  }
  createPieChart(data) {
    const width = 360,
      height = 360,
      radius = Math.min(width, height) / 2,
      svg = d3.select('#pie-chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
    this.arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);
    this.pie = d3.pie()
      .value((d: any) => { return d.Answer; })
      .sort(null)
      (this.rawDataChart(data));
    this.g = svg.selectAll('path')
      .data(this.pie)
      .enter()
      .append('g')
      .attr('class', this.arc);
    this.g.append('path')
      .attr('d', this.arc)
      .style('fill', (d: any) => this.color(d.data.Category))
      .style('stroke', (d: any) => this.color(d.data.Category));
    this.g.append('text')
      .attr('transform', (d) => 'translate(' + this.arc.centroid(d) + ')')
      .attr('text-anchor', 'middle')
      .text((d: any) => d.data.Category + ' ' + d.value + '%')
      .style('fill', '#fff');
  }
  updatePieChart(data) {
    d3.selectAll('svg')
      .remove()
      .exit();
    this.getAnswers(data);
  };
  createBarChart(dataset) {
    const margin = { top: 20, right: 20, bottom: 30, left: 100 },
      width = 500 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom,
      x = d3.scaleBand()
        .range([0, width])
        .padding(0.1),
      y = d3.scaleLinear()
        .range([height, 0]),
      data: any = this.rawDataChart(dataset),
      svg = d3.select('#bar-chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')');

    // Scale the range of the data in the domains
    x.domain(data.map((d: any) => { return d.Category; }));
    const maxValue: any = d3.max(data, (d: any): any => { return d.Answer; });
    y.domain([0, maxValue]);

    // append the rectangles for the bar chart
    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function (d: any) { return x(d.Category); })
      .attr('width', x.bandwidth())
      .attr('y', function (d: any) { return y(d.Answer); })
      .attr('height', function (d: any) { return height - y(d.Answer); })
      .style('fill', (d: any) => this.color(d.Category));

    // add the x Axis
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    // add the y Axis
    svg.append('g')
      .call(d3.axisLeft(y));
  }
  public getAnswers(number) {
    this.restService.getAnswers()
      .subscribe(
      data => this.hmm = data,
      error => this.errorMessage = <any>error,
      () => {
        this.calculateService.convertToPercentage(this.hmm);
        this.createPieChart(this.hmm[number]);
        this.createBarChart(this.hmm[number]);
      },
    );
  }
}
