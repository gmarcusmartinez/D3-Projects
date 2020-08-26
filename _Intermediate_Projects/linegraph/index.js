const height = 600;
const svgWidth = 600;
const chartWidth = 480;

// Create Scales
const xScale = d3.scaleLinear().domain([1, 10.5]).range([20, chartWidth]);
const yScale = d3.scaleLinear().domain([0, 35]).range([chartWidth, 20]);

// Create Chart
const canvas = d3
  .select('.canvas')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', height);

// Create Axes
const xAxis = d3
  .axisBottom()
  .scale(xScale)
  .tickSize(chartWidth)
  .tickValues(d3.range(1, 11));
canvas.append('g').call(xAxis);

const yAxis = d3.axisRight().scale(yScale).ticks(10).tickSize(chartWidth);
canvas.append('g').call(yAxis);

d3.csv('tweetdata.csv', plotData);

function plotData(data) {
  canvas
    .selectAll('circle.tweets')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'tweets')
    .attr('r', 5)
    .attr('cx', (d) => xScale(d.day))
    .attr('cy', (d) => yScale(d.tweets))
    .attr('fill', 'orange');
  canvas
    .selectAll('circle.retweets')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'retweets')
    .attr('r', 5)
    .attr('cx', (d) => xScale(d.day))
    .attr('cy', (d) => yScale(d.retweets))
    .attr('fill', 'blue');
  canvas
    .selectAll('circle.favorites')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'favorites')
    .attr('r', 5)
    .attr('cx', (d) => xScale(d.day))
    .attr('cy', (d) => yScale(d.favorites))
    .attr('fill', 'lightgreen');

  const lambdaXScale = (d) => xScale(d.day);

  const tweetLine = d3
    .line()
    .x(lambdaXScale)
    .y((d) => yScale(d.tweets))
    .curve(d3.curveBasis);

  const retweetLine = d3
    .line()
    .x(lambdaXScale)
    .y((d) => yScale(d.retweets))
    .curve(d3.curveStep);

  const favLine = d3
    .line()
    .x(lambdaXScale)
    .y((d) => yScale(d.favorites))
    .curve(d3.curveCardinal);

  canvas
    .append('path')
    .attr('d', tweetLine(data))
    .attr('fill', 'none')
    .attr('stroke', 'orange')
    .attr('stroke-width', 2);
  canvas
    .append('path')
    .attr('d', retweetLine(data))
    .attr('fill', 'none')
    .attr('stroke', 'blue')
    .attr('stroke-width', 2);
  canvas
    .append('path')
    .attr('d', favLine(data))
    .attr('fill', 'none')
    .attr('stroke', 'lightgreen')
    .attr('stroke-width', 2);
}
