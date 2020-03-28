const generateData = num => {
  const res = [];
  const range = Math.random() * 1000;

  let count = 0;
  while (count < num) {
    count++;
    const x = Math.floor(Math.random() * range);
    const y = Math.floor(Math.random() * range);
    res.push([x, y]);
  }
  return res;
};

const data = generateData(20);

const width = 400;
const height = 400;
const padding = 40;

// Create Scales
const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, d => d[0])])
  .range([padding, width - padding]);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, d => d[1])])
  .range([height - padding, padding]);

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

svg
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d[0]))
  .attr("cy", d => yScale(d[1]))
  .attr("r", 3);

// Create Axes
const xAxis = d3
  .axisBottom(xScale)
  // Specify number of ticks
  .ticks(5);

const yAxis = d3.axisLeft(yScale).ticks(5);

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
