// Linear Scale
const scale = d3.scaleLinear();
// - Domain : input
scale.domain([100, 500]);
// - Range : output
scale.range([10, 350]);

// console.log(scale(100));
// console.log(scale(300));
// console.log(scale(500));

// Time Scales
const width = 500;
const height = 300;
const padding = 40;

const parseTime = d3.timeParse("%m/%d/%y");
const formatTime = d3.timeFormat("%b %e");

const convertRow = d => ({
  Date: parseTime(d.Date),
  Amount: +d.Amount
});

const loadData = async () => {
  const data = await d3.csv("Scales/time_scale_data.csv", convertRow);
  // Create Scales
  const xScale = d3
    .scaleTime()
    .domain([d3.min(data, d => d.Date), d3.max(data, d => d.Date)])
    .range([padding, width - padding]);
  const yScale = d3
    .scaleLinear()
    .domain([d3.min(data, d => d.Amount), d3.max(data, d => d.Amount)])
    .range([height, padding - height]);

  // Append SVG
  const svg = d3
    .select(".canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Append Circles
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.Date))
    .attr("cy", d => yScale(d.Amount))
    .attr("r", 2);

  // Append Text
  svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(d => formatTime(d.Date))
    .attr("x", d => xScale(d.Date))
    .attr("y", d => yScale(d.Amount))
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "#bbb");
};

loadData();
