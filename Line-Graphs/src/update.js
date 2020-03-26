const d3 = require("d3");

const { x, y, xAxisGroup, yAxisGroup, graph, line } = require("./graph");

const path = graph.append("path");

// // Create Dotted Line group and append to Graph
// const dottedLines = graph
//   .append("g")
//   .attr("class", "lines")
//   .style("opacity", 0);
// // Create x dotted-line group and append to line group
// const xDottedLine = dottedLines
//   .append("line")
//   .attr("stroke", "#aaa")
//   .attr("stroke-width", 1)
//   .attr("stroke-dasharray", 4);

// // Create y dotted-line group and append to line group
// const yDottedLine = dottedLines
//   .append("line")
//   .attr("stroke", "#aaa")
//   .attr("stroke-width", 1)
//   .attr("stroke-dasharray", 4);

const update = (data, activity) => {
  //0) Filter Data by Activity
  data = data.filter(item => item.activity === activity);
  // - Sort Data by Date
  data.sort((a, b) => new Date(a.date) - new Date(b.date));
  // 1) Update Any Scales Which Rely On Data
  x.domain(d3.extent(data, d => new Date(d.date)));
  y.domain([0, d3.max(data, d => d.distance)]);

  // Update Path Data
  path
    .data([data])
    .attr("fill", "none")
    .attr("stroke", "#00bfa5")
    .attr("stroke-width", 2)
    .attr("d", line);

  // 2)Join Updated Data to Elements
  const circles = graph.selectAll("circle").data(data);

  // 3)Remove Unwanted Shapes Using the Exix Selection
  circles.exit().remove();

  // 4)Update Current Shapes in DOM
  circles.attr("cx", d => x(new Date(d.date))).attr("cy", d => y(d.distance));

  // 5)Append the Enter Selection to the DOM
  circles
    .enter()
    .append("circle")
    .attr("r", 4)
    .attr("cx", d => x(new Date(d.date)))
    .attr("cy", d => y(d.distance))
    .attr("fill", "#fff");

  // Create Axes
  const xAxis = d3
    .axisBottom(x)
    .ticks(4)
    .tickFormat(d3.timeFormat("%b %d"));
  const yAxis = d3
    .axisLeft(y)
    .ticks(4)
    .tickFormat(d => d + `km`);

  // Call Axes
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  // Rotate Axes Text
  xAxisGroup
    .selectAll("text")
    .attr("transform", "rotate(-40)")
    .attr("text-anchor", "end");
};

module.exports = update;
