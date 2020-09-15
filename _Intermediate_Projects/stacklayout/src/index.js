const canvas = require('./utils/createChart');
const xScale = require('./utils/xScale');
const yScale = require('./utils/yScale');
const { movies, colorScale } = require('./utils/colorScale');

d3.csv('./data/movies.csv', plotData);

function plotData(data) {
  const stackLayout = d3.stack().keys(movies);
  const heightScale = d3.scaleLinear().domain([0, 60]).range([0, 480]);

  canvas
    .selectAll('g.bar')
    .data(stackLayout(data))
    .enter()
    .append('g')
    .attr('class', 'bar')
    .each(function (d) {
      d3.select(this)
        .selectAll('rect')
        .data(d)
        .enter()
        .append('rect')
        .attr('x', (_, i) => xScale(i) + 30)
        .attr('y', (d) => yScale(d[1]))
        .attr('height', (d) => heightScale(d[1] - d[0]))
        .attr('width', 40)
        .style('fill', colorScale(d.key));
    });
}
