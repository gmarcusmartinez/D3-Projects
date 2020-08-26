const yScale = require('./yScale');

function drawRect(d, g) {
  return d3
    .select(g)
    .append('rect')
    .attr('class', 'range')
    .attr('width', 20)
    .attr('x', -10)
    .attr('y', yScale(d.q3) - yScale(d.median))
    .attr('height', yScale(d.q1) - yScale(d.q3))
    .style('fill', 'white')
    .style('stroke', 'black')
    .style('stroke-width', '2px');
}

module.exports = drawRect;
