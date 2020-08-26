const yRange = [480, 20];
const yScale = d3.scaleLinear().domain([0, 100]).range(yRange);

module.exports = yScale;
