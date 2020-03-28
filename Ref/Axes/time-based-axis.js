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
  const startDate = d3.min(data, d => d.Date);
  const endDate = d3.max(data, d => d.Date);

  // Append SVG
  const svg = d3
    .select(".canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Create Scales
  const xScale = d3
    .scaleTime()
    .domain([
      d3.timeDay.offset(startDate, -1), //startDate minus one day, for padding
      d3.timeDay.offset(endDate, 1) //endDate plus one day, for padding
    ])
    .range([padding, width - padding]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.Amount)])
    .range([height - padding, padding]);

  // Create Axes
  const xAxis = d3
    .axisBottom(xScale)
    // Specify number of ticks
    .ticks(5)
    .tickFormat(formatTime);

  const yAxis = d3.axisLeft(yScale).ticks(10);

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
    .text(d => d.Amount)
    .attr("x", d => xScale(d.Date))
    .attr("y", d => yScale(d.Amount))
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")

    .attr("fill", "#bbb");

  // Append Lines
  svg
    .selectAll("line")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", d => xScale(d.Date))
    .attr("x2", d => xScale(d.Date))
    .attr("y1", height - padding)
    .attr("y2", d => yScale(d.Amount))
    .attr("stroke", "#ddd")
    .attr("stroke-width", 1);
  // Call Axes
  svg
    .append("g")
    // Assign Class to G element
    .attr("class", "axis")
    // Transform to bottom of graph
    .attr("transform", `translate(0,${height - padding})`)
    .call(xAxis);
  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${padding},0)`)
    .call(yAxis);
};

loadData();
