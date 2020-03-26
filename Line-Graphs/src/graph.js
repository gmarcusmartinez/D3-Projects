const d3 = require("d3");
const db = require("./db");
export const data = [];

const margin = { top: 40, right: 20, bottom: 50, left: 100 };
const graphWidth = 560 - margin.left - margin.right;
const graphHeight = 400 - margin.top - margin.bottom;

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", graphWidth + margin.left + margin.right)
  .attr("height", graphHeight + margin.top + margin.bottom);

export const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left},${margin.top})`);

export const x = d3.scaleTime().range([0, graphWidth]);
export const y = d3.scaleLinear().range([graphHeight, 0]);

export const xAxisGroup = graph
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0, ${graphHeight})`);

export const yAxisGroup = graph.append("g").attr("class", "y-axis");

// Line Path Generator
export const line = d3
  .line()
  .curve(d3.curveMonotoneX)
  .x(function(d) {
    return x(new Date(d.date));
  })
  .y(function(d) {
    return y(d.distance);
  });
const update = require("./update");

db.collection("activities").onSnapshot(res => {
  res.docChanges().forEach(change => {
    const doc = { ...change.doc.data(), id: change.doc.id };
    switch (change.type) {
      case "added":
        data.push(doc);
        break;
      case "modified":
        const index = data.findIndex(item => item.id === doc.id);
        data[index] = doc;
        break;
      case "removed":
        data = data.filter(item => item.id !== doc.id);
        break;
      default:
        break;
    }
  });
  update(data);
});
