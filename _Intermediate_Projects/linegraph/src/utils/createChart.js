const xScale = require('./xScale');
const yScale = require('./yScale');

const height = 600;
const svgWidth = 600;
const chartWidth = 480;

const canvas = d3
  .select('.canvas')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', height);

const xAxis = d3
  .axisBottom()
  .scale(xScale)
  .tickSize(chartWidth)
  .tickValues(d3.range(1, 11));

canvas.append('g').call(xAxis);

const yAxis = d3.axisRight().scale(yScale).ticks(10).tickSize(chartWidth);
canvas.append('g').call(yAxis);

module.exports = canvas;
