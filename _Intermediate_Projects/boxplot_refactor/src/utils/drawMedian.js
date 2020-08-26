function drawMedian(g) {
  return d3
    .select(g)
    .append('line')
    .attr('x1', -10)
    .attr('x2', 10)
    .attr('y1', 0)
    .attr('y2', 0)
    .style('stroke', 'darkgray')
    .style('stroke-width', '2px');
}

module.exports = drawMedian;
