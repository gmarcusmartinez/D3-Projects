const width = 300;
const height = 300;

const data = [5, 10, 15, 20, 45, 6, 25];

const outerRadius = width / 2;
const innerRadius = 100;

const arc = d3
  .arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius);

const pie = d3.pie();

const color = d3.scaleOrdinal(d3.schemePastel2);

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const arcs = svg
  .selectAll("g.arc")
  .data(pie(data))
  .enter()
  .append("g")
  .attr("class", "arc")
  .attr("transform", `translate(${outerRadius}, ${outerRadius})`);

arcs
  .append("path")
  .attr("fill", (d, i) => color(i))
  .attr("d", arc);

arcs
  .append("text")
  .attr("transform", d => `translate(${arc.centroid(d)})`)
  .attr("text-anchor", "middle")
  .text(d => d.value);
