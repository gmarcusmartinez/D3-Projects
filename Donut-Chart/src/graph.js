const d3 = require("d3");
const db = require("./db");

const dims = { height: 300, width: 300, radius: 150 };
const center = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", dims.width + 150)
  .attr("height", dims.height + 150);

// Data Array and Firestore
const data = [];

// Arc Path Generator
export const arcPath = d3
  .arc()
  //Outer Radius
  .outerRadius(dims.radius)
  // Donut Inner Radius
  .innerRadius(dims.radius / 2);

// Create Color Scheme
export const color = d3.scaleOrdinal(d3["schemePastel2"]);
color.domain(data.map(obj => obj.name));

// // Legend Setup
// export const legendGroup = svg
//   .append("g")
//   .attr("transform", `translate(${dims.width + 40},10)`);
// export const legend = d3
//   .legendColor()
//   .shape("circle")
//   .shapePadding(10)
//   .scale(color);

export const graph = svg
  .append("g")
  .attr("transform", `translate(${center.x},${center.y})`);

const update = require("./update");

db.collection("expenses").onSnapshot(res => {
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
