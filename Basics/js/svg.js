const data = [
  { width: 200, height: 100, fill: 'pink' },
  { width: 100, height: 60, fill: 'blue' },
  { width: 50, height: 30, fill: 'lightblue' }
]

const svg = d3.select('svg')

const rects = svg.selectAll('rect').data(data)
// Already in DOM
rects
  .attr('width', (d, i, n) => d.width)
  .attr('height', (d, i, n) => d.height)
  .attr('fill', (d, i, n) => d.fill)
// Enter Selection
rects
  .enter()
  .append('rect')
  .attr('width', (d, i, n) => d.width)
  .attr('height', (d, i, n) => d.height)
  .attr('fill', (d, i, n) => d.fill)
console.log(rects)
