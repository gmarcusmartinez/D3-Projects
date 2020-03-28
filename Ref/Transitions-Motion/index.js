const width = 600;
const height = 500;

const generateData = num => {
  const res = [];
  for (let i = 0; i < num; i++) {
    res.push(Math.floor(Math.random() * 25));
  }
  return res;
};

const data = generateData(20);

var svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const xScale = d3
  // d3.scaleBand() - els in arbitrary order but must be evenly spaced.
  .scaleBand()
  // d3.range() - returns number[] from 0 to specified number in argument
  .domain(d3.range(data.length))
  // round to nearest whole value for pixel sharpness
  .rangeRound([0, width])
  .paddingInner(0.05);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, height]);

// Create Bars
svg
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d, i) => xScale(i))
  .attr("y", (d, i) => height - yScale(d))
  .attr("width", xScale.bandwidth())
  .attr("height", d => yScale(d))
  .attr("fill", d => `rgb(0, 0,${Math.round(d * 10)})`);

// Create Labels
svg
  .selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .text(d => d)
  .attr("text-anchor", "middle")
  .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
  .attr("y", d => height - yScale(d) + 15)
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white");
