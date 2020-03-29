const width = 500;
const height = 300;

const padding = 30;

const data = [];
const points = 50;
const maxRange = Math.random() * 1000;

for (let i = 0; i < points; i++) {
  const x = Math.floor(Math.random() * maxRange);
  const y = Math.floor(Math.random() * maxRange);
  data.push([x, y]);
}

// Create Scale Functions
const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, d => d[0])])
  .range([padding, width - padding * 2]);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, d => d[1])])
  .range([height - padding, padding]);

// Define Axis
const xAxis = d3
  .axisBottom()
  .scale(xScale)
  .ticks(5);
const yAxis = d3
  .axisLeft()
  .scale(yScale)
  .ticks(5);

// Create SVG Element
const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Create Axis
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

// Create Circles
svg
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d[0]))
  .attr("cy", d => yScale(d[1]))
  .attr("r", 2);

// Update
d3.select("button").on("click", () => {
  const num = data.length;
  const maxRange = Math.random() * 1000;
  dataset = [];

  for (let i = 0; i < num; i++) {
    const x = Math.floor(Math.random() * maxRange);
    const y = Math.floor(Math.random() * maxRange);

    dataset.push([x, y]);
  }
  // 1) Update Scale domains
  xScale.domain([0, d3.max(dataset, d => d[0])]);
  yScale.domain([0, d3.max(dataset, d => d[1])]);

  svg
    .selectAll("circle")
    .data(dataset)
    .transition()
    .duration(1000)
    // on() Transition Starts and Ends
    .on("start", function() {
      d3.select(this)
        .attr("fill", "magenta")
        .attr("r", 4);
    })
    .attr("cx", d => xScale(d[0]))
    .attr("cy", d => yScale(d[1]))
    .on("end", function() {
      d3.select(this)
        .transition()
        .duration(1000)
        .attr("fill", "black")
        .attr("r", 2);
    });

  // Update Axes
  svg
    .select(".x.axis")
    .transition()
    .duration(1000)
    .call(xAxis);
  svg
    .select(".y.axis")
    .transition()
    .duration(1000)
    .call(yAxis);
});
