const d3 = require("d3");

const {
  x,
  y,
  xAxisGroup,
  yAxisGroup,
  xDottedLine,
  yDottedLine,
  graph,
  line,
  path
} = require("./graph");

const update = (data, activity = "cycling") => {
  //0) Filter Data by Activity
  data = data.filter(item => item.activity === activity);
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

  // Mouse Over Events
  // - n represents array of circles
  graph
    .selectAll("circle")
    .on("mouseover", (d, i, n) => {
      d3.select(n[i])
        .transition()
        .duration(100)
        .attr("r", 8);

      xDottedLine
        .attr("x1", x(new Date(d.date)))
        .attr("x2", x(new Date(d.date)))
        .attr("y1", 310)
        .attr("y2", y(d.distance));

      yDottedLine
        .attr("x1", 0)
        .attr("x2", x(new Date(d.date)))
        .attr("y1", y(d.distance))
        .attr("y2", y(d.distance));

      dottedLines.style("opacity", 1);
    })
    .on("mouseout", (d, i, n) => {
      d3.select(n[i])
        .transition()
        .duration(100)
        .attr("r", 4);
      dottedLines.style("opacity", 0);
    });
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
