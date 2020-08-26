const yScale = require('./yScale');
const xScale = require('./xScale');

const height = 600;
const width = 600;
const tickSize = 470;

const canvas = d3
  .select('.canvas')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const xAxis = d3
  .axisBottom()
  .scale(xScale)
  .tickSize(-tickSize)
  .tickValues([1, 2, 3, 4, 5, 6, 7]);

canvas
  .append('g')
  .attr('transform', `translate(0,${tickSize + 10})`)
  .attr('id', 'xAxisG')
  .call(xAxis);

const yAxis = d3.axisRight().scale(yScale).ticks(8).tickSize(-tickSize);

canvas
  .append('g')
  .attr('transform', `translate(${tickSize},0)`)
  .attr('id', 'yAxisG')
  .call(yAxis);

module.exports = canvas;
