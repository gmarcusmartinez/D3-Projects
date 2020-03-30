const update = data => {
  const key = d => d.key;
  //1) Update Any Scales which rely on Data
  xScale.domain(d3.range(data.length));
  yScale.domain([0, d3.max(data, d => d.value)]);

  //2)Join Data to Elements
  const rects = svg.selectAll("rect").data(data, key);
  const labels = svg.selectAll("text").data(data, key);

  //3)Remove Unwanted Shapes Using the Exit Selection
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

  //5) Enter Selection
  rects
    .enter()
    .append("rect")
    .merge(rects)
    .transition()
    .duration(500)
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => height - yScale(d.value))
    .attr("width", xScale.bandwidth())
    .attr("height", d => yScale(d.value))
    .attr("fill", d => "rgb(0, 0, " + d.value * 10 + ")");

  labels
    .enter()
    .append("text")
    .merge(labels)
    .transition()
    .duration(500)
    .text(d => d.value)
    .attr("text-anchor", "middle")
    .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr("y", d => height - yScale(d.value) + 15)
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");
};
