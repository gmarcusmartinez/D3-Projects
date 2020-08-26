const height = 600;
const width = 600;
const tickSize = 470;

d3.csv('boxplot.csv', plotData);

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
      d3.select(this)
        .append('rect')
        .attr('width', rectangleWidth)
        .attr('x', -rectangleWidth / 2)
        // Center each group on the median value
        .attr('y', yScale(d.q3) - yScale(d.median))
        .attr('height', yScale(d.q1) - yScale(d.q3))
        .style('fill', 'white')
        .style('stroke', 'black');
    });
}
