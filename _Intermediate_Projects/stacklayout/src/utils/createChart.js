const xScale = require('./xScale');
const yScale = require('./yScale');

const height = 600;
const width = 600;

const canvas = d3
  .select('.canvas')
  .append('svg')
  .attr('height', height)
  .attr('width', width)
  .attr('transform', `translate(50,50)`);

const xAxis = d3
  .axisBottom()
  .scale(xScale)
  .tickSize(500)
  .tickValues(d3.range(1, 11));

canvas.append('g').attr('id', 'xAxisG').call(xAxis);

const yAxis = d3.axisRight().scale(yScale).ticks(10).tickSize(530);

canvas.append('g').attr('id', 'yAxisG').call(yAxis);

module.exports = canvas;
