const d3 = require("d3");

const { x, y, xAxisGroup, yAxisGroup } = require("./graph");

const update = data => {
  x.domain(d3.extent(data, d => new Date(d.date)));
  y.domain([0, d3.max(data, d => d.distance)]);

  // Create Axes
  const xAxis = d3.axisBottom(x).ticks(4);
  const yAxis = d3.axisLeft(y).ticks(4);

  // Call Axes
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
};

module.exports = update;
