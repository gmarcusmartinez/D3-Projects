const d3 = require("d3");

const dims = { height: 300, width: 300, radius: 150 };
const center = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", dims.width + 150)
  .attr("height", dims.height + 150);

// Arc Path Generator
const arcPath = d3
  .arc()
  .outerRadius(dims.radius)
  .innerRadius(dims.radius / 2);

const color = d3.scaleOrdinal(d3["schemePastel2"]);

const graph = svg
  .append("g")
  .attr("transform", `translate(${center.x},${center.y})`);

const pie = d3
  .pie()
  // Do no Automatically Sort
  .sort(null)
  // Determine slice by value of cost returns an angle
  .value(d => d.cost);

module.exports = { arcPath, color, graph, pie };
