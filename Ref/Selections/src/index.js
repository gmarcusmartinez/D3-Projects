d3.select(".remove").on("click", e => {
  data.pop();
  update(data);
});

d3.select(".add").on("click", () => {
  const minValue = 2;
  const maxValue = 25;
  const num = Math.floor(Math.random() * maxValue) + minValue;
  const lastKeyValue = data[data.length - 1].key;

  data.push({
    key: lastKeyValue + 1,
    value: num
  });
  update(data);
});

d3.select("#slider").on("change", function() {
  //Returns threshhold value as int
  const threshold = +d3.select(this).node().value;
  svg
    .selectAll("rect")
    .attr("fill", d => `rgb(0,0,${d.value * 10})`)
    // New Selection
    .filter(d => d.value <= threshold)
    .attr("fill", "red");
});

update(data);
