const update = () => {
  //1) Update any Scales which Rely on Data

  arcs
    .append("path")
    .attr("fill", (d, i) => color(i))
    .attr("d", arc);

  arcs
    .append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .text(d => d.value);
};
