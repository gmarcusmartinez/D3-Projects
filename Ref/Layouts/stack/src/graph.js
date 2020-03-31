const width = 500;
const height = 300;

const stack = d3.stack().keys(["apples", "oranges", "grapes"]);
const color = d3.scaleOrdinal(d3.schemePastel1);

const xScale = d3
  .scaleBand()
  .domain(d3.range(data.length))
  .range([0, width])
  .paddingInner(0.05);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, d => d.apples + d.oranges + d.grapes)])
  .range([0, height]);

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
