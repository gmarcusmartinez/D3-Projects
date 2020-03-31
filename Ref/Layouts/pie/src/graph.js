const width = 300;
const height = 300;

const outerRadius = width / 2;
const innerRadius = 100;

const pie = d3.pie();

const color = d3.scaleOrdinal(d3.schemePastel2);

// Arc Path Generator
const arc = d3
  .arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius);

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
