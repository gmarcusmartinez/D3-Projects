const drawMax = require('./utils/drawMax');
const drawMedian = require('./utils/drawMedian');
const drawMin = require('./utils/drawMin');
const drawRange = require('./utils/drawRange');
const drawRect = require('./utils/drawRect');

const yScale = require('./utils/yScale');
const xScale = require('./utils/xScale');
const canvas = require('./utils/createChart');

d3.csv('../data/boxplot.csv', plotData);

function plotData(data) {
  canvas
    .selectAll('g.box')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'box')
    .attr(
      'transform',
      (d) => `translate(${xScale(d.day)}, ${yScale(d.median)})`
    )
    .each(function (d) {
      drawRange(d, this);
      drawMax(d, this);
      drawMin(d, this);
      drawRect(d, this);
      drawMedian(this);
    });
}
