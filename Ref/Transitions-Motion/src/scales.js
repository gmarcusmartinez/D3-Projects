const d3 = require("d3");

const createScales = (data, width, height) => {
  const xScale = d3
    // D3.scaleBand() - els in arbitrary order but must be evenly spaced.
    .scaleBand()
    // D3.range() - returns number[] from 0 to specified number in argument
    .domain(d3.range(data.length))
    // Round to nearest whole value for pixel sharpness
    .rangeRound([0, width])
    .paddingInner(0.05);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, height]);

  return [xScale, yScale];
};

module.exports = createScales;
