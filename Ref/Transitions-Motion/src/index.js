const d3 = require("d3");
const width = 600;
const height = 250;

const data = require("./data");
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
  .text(d => d)
  .attr("text-anchor", "middle")
  .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
  .attr("y", d => height - yScale(d) + 15)
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white");

d3.select("button").on("click", e => {
  // const maxValue = 25;
  // const num = Math.floor(Math.random() * maxValue);
  // data.push(num);
  data.pop();
  //1) Update Scale domains
  xScale.domain(d3.range(data.length));
  yScale.domain([0, d3.max(data)]);

  //Select Rects
  const rects = svg.selectAll("rect").data(data);

  // 5)Append the Enter Selection to the DOM
  rects
    .enter()
    .append("rect")
    .attr("x", width)
    .attr("y", d => height - yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", d => yScale(d))
    .attr("fill", d => `rgb(0, 0,${Math.round(d * 10)})`)
    .merge(rects)
    .transition()
    .duration(500)
    // Set new x position, based on the updated xScale
    .attr("x", (d, i) => xScale(i))
    // Set new y position, based on the updated yScale
    .attr("y", d => height - yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", d => yScale(d));

  // 3)Remove Unwanted Shapes Using the Exix Selection
  rects
    .exit()
    .transition()
    .duration(500)
    // Move past the right edge of the SVG
    .attr("x", width)
    // Deletes this element from the DOM once transition is complete
    .remove();

  const text = svg.selectAll("text").data(data);
  // Update Text
  text
    .enter()
    .append("text")
    .text(d => d)
    .attr("text-anchor", "middle")
    .text(d => d)
    .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr("y", d => height - yScale(d) + 15)
    .merge(text)
    .transition()
    .duration(500)
    .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr("y", d => height - yScale(d) + 15);
});
