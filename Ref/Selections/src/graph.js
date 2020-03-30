const width = 600;
const height = 250;

const xScale = d3
  .scaleBand()
  .domain(d3.range(data.length))
  .rangeRound([0, width])
  .paddingInner(0.05);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .range([0, height]);

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
