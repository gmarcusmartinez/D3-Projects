const data = [
  [5, 20],
  [480, 90],
  [250, 50],
  [100, 33],
  [330, 95],
  [410, 12],
  [475, 44],
  [25, 67],
  [85, 21],
  [220, 88],
  [600, 150]
];
const width = 600;
const height = 240;
const padding = 40;

// Create Scales
const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, d => d[0])])
  .range([padding, width - padding]);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, d => d[1])])
  .range([height - padding, padding]);

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

svg
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d[0]))
  .attr("cy", d => yScale(d[1]))
  .attr("r", 5);

svg
  .selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .attr("x", d => xScale(d[0] + 5))
  .attr("y", d => yScale(d[1]))
  .text(d => d[0])
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "red");
