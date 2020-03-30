const d3 = require("d3");
const { svg, xScale } = require("./graph");

let sortOrder = true;

const sortBars = () => {
  svg
    .selectAll("rect")
    .sort((a, b) =>
      sortOrder
        ? d3.ascending(a.value, b.value)
        : d3.descending(a.value, b.value)
    )
    .transition()
    .delay((d, i) => i * 50)
    .duration(1000)
    .attr("x", (d, i) => xScale(i));

  svg
    .selectAll("text")
    .sort((a, b) =>
      sortOrder
        ? d3.ascending(a.value, b.value)
        : d3.descending(a.value, b.value)
    )
    .transition()
    .delay((d, i) => i * 50)
    .duration(1000)
    .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2);

  sortOrder = !sortOrder;
};

module.exports = { sortBars };
