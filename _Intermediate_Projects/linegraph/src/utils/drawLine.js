const xScale = require('./xScale');
const yScale = require('./yScale');

const drawLine = (el, data, pointType, color) => {
  const lambdaXScale = (d) => xScale(d.day);
  const line = d3
    .line()
    .x(lambdaXScale)
    .y((d) => yScale(d[pointType]))
    .curve(d3.curveStep);

  return el
    .append('path')
    .attr('d', line(data))
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', 2);
};

module.exports = drawLine;
