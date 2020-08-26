const update = data => {
  const series = stack(data);

  const groups = svg
    .selectAll("g")
    .data(series)
    .enter()
    .append("g")
    .style("fill", (d, i) => color(i));

  const rects = groups
    .selectAll("rect")
    .data(d => d)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => yScale(d[1]))
    .attr("height", d => yScale(d[0]) - yScale(d[1]))
    .attr("width", xScale.bandwidth());
};
