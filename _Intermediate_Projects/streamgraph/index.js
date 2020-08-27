const height = 600;
const width = 600;
const chartWidth = 480;

const canvas = d3
  .select('.canvas')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// Create Scales
const xScale = d3.scaleLinear().domain([1, 10]).range([20, 470]);
const yScale = d3.scaleLinear().domain([0, 55]).range([chartWidth, 20]);

// Create Axes
const xAxis = d3
  .axisBottom()
  .scale(xScale)
  .tickSize(chartWidth)
  .tickValues(d3.range(1, 11));

const yAxis = d3.axisRight().scale(yScale).tickSize(chartWidth).ticks(10);

canvas.append('g').attr('id', 'xAxisG').call(xAxis);
canvas.append('g').attr('id', 'yAxisG').call(yAxis);

d3.csv('movies.csv', plotData);

// Color Scale
const movies = [
  'titanic',
  'avatar',
  'akira',
  'frozen',
  'deliverance',
  'avengers',
];
const colors = [
  '#fcd88a',
  '#cf7c1c',
  '#93c464',
  '#75734F',
  '#5eafc6',
  '#41a368',
];
const fillScale = d3.scaleOrdinal().domain(movies).range(colors);

function plotData(data) {
  Object.keys(data[0]).forEach((key) => {
    if (key !== 'day') {
      const movieArea = d3
        .area()
        .x((d) => xScale(d.day))
        .y0((d) => yScale(simpleStack(d, key) - d[key]))
        .y1((d) => yScale(simpleStack(d, key)))
        .curve(d3.curveBasis);
      canvas
        .append('path')
        .style('id', key + 'Area')
        .attr('d', movieArea(data) + 'z')
        .attr('fill', fillScale(key))
        .attr('stroke', 'black')
        .attr('stroke-width', 1);
    }
  });
}

function simpleStack(lineData, lineKey) {
  let newHeight = 0;
  Object.keys(lineData).every((key) => {
    if (key !== 'day') {
      newHeight += +lineData[key];
      if (key === lineKey) return false;
    }
    return true;
  });
  return newHeight;
}

const legendA = d3.legendColor().scale(fillScale);

canvas.append('g').attr('transform', 'translate(500,0)').call(legendA);
