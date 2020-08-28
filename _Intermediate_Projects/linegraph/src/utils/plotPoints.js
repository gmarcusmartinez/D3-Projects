const xScale = require('./xScale');
const yScale = require('./yScale');

const plotPoints = (el, data, dataType, color) =>
  el
    .selectAll(`circle.${dataType}`)
    .data(data)
    .enter()
    .append('circle')
    .attr('class', `${dataType}`)
    .attr('r', 5)
    .attr('cx', (d) => xScale(d.day))
    .attr('cy', (d) => yScale(d[dataType]))
    .attr('fill', color);

module.exports = plotPoints;
