const width = 800;
const height = 500;
const padding = 20;

const parseTime = d3.timeParse("%Y-%m");
const formatTime = d3.timeFormat("%b %Y");

const createScales = data => {
  const xScale = d3
    .scaleTime()
    .domain([d3.min(data, d => d.date), d3.max(data, d => d.date)]);

  const yScale = d3.scaleLinear().domain([
    0,
    d3.max(data, d => {
      let sum = 0;
      for (let i = 0; i < keys.length; i++) {
        sum += d[keys[i]];
      }
      return sum;
    })
  ]);
  return [xScale, yScale];
};
