const d3 = require("d3");
const data = [];

const dims = { height: 500, width: 1100 };
const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", dims.width + 100)
  .attr("height", dims.height + 100);

const graph = svg.append("g").attr("transform", `translate(50,50)`);

// Data Stratify
const stratify = d3
  .stratify()
  .id(d => d.name)
  .parentId(d => d.parent);

// Tree
const tree = d3.tree().size([dims.width, dims.height]);

module.exports = { data, graph, stratify, tree };
