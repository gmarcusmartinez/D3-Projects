const d3 = require("d3");
const width = 600;
const height = 250;

let data = require("./data");
const createScales = require("./scales");

const [xScale, yScale] = createScales(data, width, height);

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Create Bars
svg
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  // Transitions
  .transition()
  .duration(1000)
  // Ease
  .ease(d3.easeCircleIn)
  .attr("x", (d, i) => xScale(i))
  .attr("y", (d, i) => height - yScale(d))
  .attr("width", xScale.bandwidth())
  .attr("height", d => yScale(d))
  .attr("fill", d => `rgb(0, 0,${Math.round(d * 10)})`);

// Create Labels
svg
  .selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .transition()
  .duration(1000)
  .ease(d3.easeCircleIn)
  .text(d => d)
  .attr("text-anchor", "middle")
  .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
  .attr("y", d => height - yScale(d) + 15)
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white");

d3.select("button").on("click", e => {
  dataSet = [
    11,
    12,
    15,
    20,
    18,
    17,
    16,
    18,
    23,
    25,
    5,
    10,
    13,
    19,
    21,
    25,
    22,
    18,
    15,
    13
  ];
  // Update Rectangles
  svg
    .selectAll("rect")
    .data(dataSet)
    .attr("y", d => height - yScale(d))
    .attr("height", d => yScale(d));

  // Update Text
  svg
    .selectAll("text")
    .data(dataSet)
    .text(d => d)
    .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr("y", d => height - yScale(d) + 15);
});
