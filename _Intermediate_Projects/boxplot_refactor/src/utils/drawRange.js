const yScale = require('./yScale');

function drawRange(d, g) {
  return d3
    .select(g)
    .append('line')
    .attr('class', 'range')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', yScale(d.max) - yScale(d.median))
    .attr('y2', yScale(d.min) - yScale(d.median))
    .style('stroke', 'black')
    .style('stroke-width', '4px');
}

module.exports = drawRange;
