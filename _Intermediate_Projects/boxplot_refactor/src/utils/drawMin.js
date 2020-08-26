const yScale = require('./yScale');

function drawMin(d, g) {
  return (
    d3
      .select(g)
      .append('line')
      .attr('class', 'max')
      .attr('x1', -10)
      .attr('x2', 10)
      // Bottom Bar
      .attr('y1', yScale(d.min) - yScale(d.median))
      .attr('y2', yScale(d.min) - yScale(d.median))
      .style('stroke', 'black')
      .style('stroke-width', '4px')
  );
}

module.exports = drawMin;
