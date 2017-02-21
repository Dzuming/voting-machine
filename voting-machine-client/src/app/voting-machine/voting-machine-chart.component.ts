import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-voting-machine-chart',
  templateUrl: './voting-machine-chart.component.html'
})
export class VotingMachineChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.createChart();
  }
createChart() {
  var dataset:any = [
  { label: 'Abulia', count: 10 },
  { label: 'Betelgeuse', count: 20 },
  { label: 'Cantaloupe', count: 30 },
  { label: 'Dijkstra', count: 40 }
];

var width = 360;
var height = 360;
var radius = Math.min(width, height) / 2;
var color = d3.scaleOrdinal(d3.schemeCategory20b);
var svg = d3.select('#pie-chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

  var arc:any = d3.arc()
          .innerRadius(0)
          .outerRadius(radius);

        var pie = d3.pie()
          .value(function(d:any) { return d.count; })
          .sort(null);

        var path = svg.selectAll('path')
          .data(pie(dataset))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d:any) {
            return color(d.data.label);
          });
  
}

}
