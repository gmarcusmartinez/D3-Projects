const d3 = require("d3");
const { svg, height, yScale, xScale } = require("./graph");
const { sortBars } = require("./events");

const update = data => {
  const key = d => d.key;
  // 1) Update Any Scales Which Rely On Data
  xScale.domain(d3.range(data.length));
  yScale.domain([0, d3.max(data, d => d.value)]);

  // 2)Join Updated Data to Elements
  const rects = svg.selectAll("rect").data(data, key);
  const labels = svg.selectAll("text").data(data);

  // 3)Remove Unwanted Shapes Using the Exit Selection
  rects
    .exit()
    .transition()
    .duration(500)
    .attr("x", -xScale.bandwidth())
    .remove();

  labels
    .exit()
    .transition()
    .duration(500)
    .attr("x", -xScale.bandwidth())
    .remove();

  // 5)Append the Enter Selection to the DOM
  rects
    .enter()
    .append("rect")
    .merge(rects)
    .on("click", () => sortBars())
    .on("mouseover", function(d) {
      const xPosition = +d3.select(this).attr("x") + xScale.bandwidth() / 2;
      const yPosition = +d3.select(this).attr("y") / 2 + height / 2;

      //Update the tooltip position and value
      d3.select("#tooltip")
        .style("left", `${xPosition}px`)
        .style("top", `${yPosition}px`)
        .select("#value")
        .text(d.value);

      d3.select("#tooltip").classed("hidden", false);
    })
    .on("mouseout", () => d3.select("#tooltip").classed("hidden", true))
    .transition()
    .duration(500)
    // Set new x position, based on the updated xScale
    .attr("x", (d, i) => xScale(i))
    // Set new y position, based on the updated yScale
    .attr("y", d => height - yScale(d.value))
    .attr("width", xScale.bandwidth())
    .attr("height", d => yScale(d.value))
    .attr("fill", d => `rgb(0, 0,${Math.round(d.value * 10)})`);

  labels
    .enter()
    .append("text")
    .text(d => d.value)
    .attr("text-anchor", "middle")
    .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr("y", d => height - yScale(d.value) + 15)
    .attr("fill", "#fff")
    .merge(labels)
    .transition()
    .duration(500)
    .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr("y", d => height - yScale(d.value) + 15);
};

module.exports = update;
