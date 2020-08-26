const height = 600;
const width = 600;
const tickSize = 470;

d3.csv('./data/boxplot.csv', plotData);

const canvas = d3
  .select('.canvas')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

function plotData(data) {
  const xRange = [20, tickSize];
  const yRange = [tickSize + 10, 20];

  // Create Scales
  const xScale = d3.scaleLinear().domain([1, 8]).range(xRange);
  const yScale = d3.scaleLinear().domain([0, 100]).range(yRange);

  const yAxis = d3.axisRight().scale(yScale).ticks(8).tickSize(-tickSize);

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

  d3.select('#xAxisG > path.domain').style('display', 'none');

  canvas
    .append('g')
    .attr('transform', `translate(${tickSize},0)`)
    .attr('id', 'yAxisG')
    .call(yAxis);

  const rectangleWidth = 20;

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
      // Draw Range
      d3.select(this)
        .append('line')
        .attr('class', 'range')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', yScale(d.max) - yScale(d.median))
        .attr('y2', yScale(d.min) - yScale(d.median))
        .style('stroke', 'black')
        .style('stroke-width', '4px');
      // Draw Max
      d3.select(this)
        .append('line')
        .attr('class', 'max')
        .attr('x1', -10)
        .attr('x2', 10)
        // Top Bar
        .attr('y1', yScale(d.max) - yScale(d.median))
        .attr('y2', yScale(d.max) - yScale(d.median))
        .style('stroke', 'black')
        .style('stroke-width', '4px');
      // Draw Min
      d3.select(this)
        .append('line')
        .attr('class', 'min')
        .attr('x1', -10)
        .attr('x2', 10)
        // Bottom Bar
        .attr('y1', yScale(d.min) - yScale(d.median))
        .attr('y2', yScale(d.min) - yScale(d.median))
        .style('stroke', 'black')
        .style('stroke-width', '4px');
      // Draw Offset Rect
      d3.select(this)
        .append('rect')
        .attr('class', 'range')
        .attr('width', rectangleWidth)
        .attr('x', -rectangleWidth / 2)
        .attr('y', yScale(d.q3) - yScale(d.median))
        .attr('height', yScale(d.q1) - yScale(d.q3))
        .style('fill', 'white')
        .style('stroke', 'black')
        .style('stroke-width', '2px');
      // Draw Median
      d3.select(this)
        .append('line')
        .attr('x1', -10)
        .attr('x2', 10)
        .attr('y1', 0)
        .attr('y2', 0)
        .style('stroke', 'darkgray')
        .style('stroke-width', '2px');
    });
}
