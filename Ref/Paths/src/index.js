// Graph
const width = 800;
const height = 300;
const padding = 40;
const formatTime = d3.timeFormat("%Y");

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const rowConverter = d => ({
  date: new Date(+d.year, +d.month - 1),
  average: parseFloat(d.average)
});

d3.csv("mauna_loa_co2_monthly_averages.csv", rowConverter).then(data => {
  const xScale = d3
    .scaleTime()
    .domain([d3.min(data, d => d.date), d3.max(data, d => d.date)])
    .range([padding, width]);
  // Create Scales
  const yScale = d3
    .scaleLinear()
    // Here set y axis to min value to emphasize upward trajectory
    .domain([
      d3.min(data, d => {
        if (d.average >= 0) return d.average;
      }) - 10,
      d3.max(data, d => d.average)
    ])
    .range([height - padding, 0]);

  const line = d3
    .line()
    // Define whether data is valid
    .defined(d => d.average >= 0)
    .x(d => xScale(d.date))
    .y(d => yScale(d.average));

  // Define Axes
  const xAxis = d3
    .axisBottom()
    .scale(xScale)
    .ticks(10)
    .tickFormat(formatTime);

  const yAxis = d3
    .axisLeft()
    .scale(yScale)
    .ticks(10);

  // Append a line to represnt a danger level above 350 ppm
  svg
    .append("line")
    .attr("class", "line safeLevel")
    .attr("x1", padding)
    .attr("x2", width)
    .attr("y1", yScale(350))
    .attr("y2", yScale(350));

  // Label Line
  svg
    .append("text")
    .attr("class", "dangerLabel")
    .attr("x", padding + 20)
    .attr("y", yScale(350) - 7)
    .text("350 ppm “safe” level");

  svg
    .append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);
  // Call Axes
  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${height - padding})`)
    .call(xAxis);
  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${padding},0)`)
    .call(yAxis);

  // Define Areas
  const area = d3
    .area()
    .defined(d => d.average >= 0)
    .x(d => xScale(d.date))
    .y0(() => yScale.range()[0])
    .y1(d => yScale(d.average));

  const dangerArea = d3
    .area()
    .defined(d => d.average >= 350)
    .x(d => xScale(d.date))
    .y0(() => yScale(350))
    .y1(d => yScale(d.average));

  //Create areas
  svg
    .append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area);

  svg
    .append("path")
    .datum(data)
    .attr("class", "area danger")
    .attr("d", dangerArea);
});
