const d3 = require("d3");

const width = 600;
const height = 250;

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const xScale = d3
  .scaleBand()
  .rangeRound([0, width])
  .paddingInner(0.05);

const yScale = d3.scaleLinear().range([0, height]);

module.exports = { svg, height, xScale, yScale };
