import { Injectable } from '@angular/core';
import { Answer } from '../models/answer.model';
import * as d3 from 'd3';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ChartService {
  private g: any;
  private current;
  private pie;
  private arc: any;
  private readonly color = d3.scaleOrdinal(d3.schemeCategory20b);
  constructor() { }

  ngOnInit() {

  }
  rawDataChart(setData: any, questions): any {
    const values: Array<Object> = [];
    let tempQuestion: Object;
    
    questions.map((value) => {
      for (const el in value) {
        if (setData.question === value.question) {
          tempQuestion = value
        }
      }
    })
    for (const el in setData) {
      if (setData.hasOwnProperty(el) && el !== 'answer_id' && el !== 'question' && setData[el] > 0) {
        values.push({ 'Answer': setData[el], 'Category': tempQuestion[el] });
      }
    }
    return values;
  }
  createPieChart(data, questions) {
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
      (this.rawDataChart(data, questions));
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

  createBarChart(dataset, questions) {
    const margin = { top: 20, right: 20, bottom: 30, left: 100 },
      width = 500 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom,
      x = d3.scaleBand()
        .range([0, width])
        .padding(0.1),
      y = d3.scaleLinear()
        .range([height, 0]),
      data: any = this.rawDataChart(dataset, questions),
      svg = d3.select('#bar-chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')');
    x.domain(data.map((d: any) => { return d.Category; }));
    const maxValue: any = d3.max(data, (d: any): any => { return d.Answer; });
    y.domain([0, maxValue]);
    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function (d: any) { return x(d.Category); })
      .attr('width', x.bandwidth())
      .attr('y', function (d: any) { return y(d.Answer); })
      .attr('height', function (d: any) { return height - y(d.Answer); })
      .style('fill', (d: any) => this.color(d.Category));
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));
    svg.append('g')
      .call(d3.axisLeft(y));
  }
  updateCharts() {
    d3.selectAll('svg')
      .remove()
      .exit();
  };

}
