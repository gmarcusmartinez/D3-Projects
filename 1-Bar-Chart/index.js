const margin = { top: 20, right: 20, bottom: 10, left: 20 };
const width = 600 - margin.left - margin.right;
const height = 220 - margin.top - margin.bottom;
const barPadding = 2;

d3.csv("data.csv").then(data => {
  const svg = d3
    .select(".canvas")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const graph = svg
    .append("g")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const rects = graph
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => (i * width) / data.length)
    .attr("y", d => height - d.value)
    .attr("width", width / data.length - barPadding)
    .attr("height", d => d.value)
    // Styling
    .attr("fill", "pink")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1);
  // Text
  graph
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.value)
    .attr("text-anchor", "middle")
    .attr(
      "x",
      (d, i) =>
        i * (width / data.length) + (width / data.length - barPadding) / 2
    )
    .attr("y", d => height - d.value + 15)
    //Styling
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px");
});
