const margin = { top: 40, right: 20, bottom: 50, left: 100 }
const graphWidth = 560 - margin.left - margin.right
const graphHeight = 400 - margin.top - margin.bottom

const svg = d3
  .select('.canvas')
  .append('svg')
  .attr('width', graphWidth + margin.left + margin.right)
  .attr('height', graphHeight + margin.top + margin.bottom)

const graph = svg
  .append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left},${margin.top})`)

// Scales
const x = d3.scaleTime().range([0, graphWidth])
const y = d3.scaleLinear().range([graphHeight, 0])

// Axes Groups
const xAxisGroup = graph
  .append('g')
  .attr('class', 'x-axis')
  .attr('transform', `translate(0, ${graphHeight})`)

const yAxisGroup = graph.append('g').attr('class', 'y-axis')

// D3 line path generator
const line = d3
  .line()
  .curve(d3.curveMonotoneX)
  .x(function(d) {
    return x(new Date(d.date))
  })
  .y(function(d) {
    return y(d.distance)
  })
//Line path element
const path = graph.append('path')

// Create Dotted Line group and append to Graph
const dottedLines = graph
  .append('g')
  .attr('class', 'lines')
  .style('opacity', 0)
// Create x dotted-line group and append to line group
const xDottedLine = dottedLines
  .append('line')
  .attr('stroke', '#aaa')
  .attr('stroke-width', 1)
  .attr('stroke-dasharray', 4)

// Create y dotted-line group and append to line group
const yDottedLine = dottedLines
  .append('line')
  .attr('stroke', '#aaa')
  .attr('stroke-width', 1)
  .attr('stroke-dasharray', 4)

const update = data => {
  data = data.filter(obj => obj.activity === activity)

  //Sort by date
  data.sort((a, b) => new Date(a.date) - new Date(b.date))

  // Set Scale Domains
  x.domain(d3.extent(data, d => new Date(d.date)))
  y.domain([0, d3.max(data, d => d.distance)])

  //Update Path Data
  path
    .data([data])
    .attr('fill', 'none')
    .attr('stroke', '#00bfa5')
    .attr('stroke-width', 2)
    .attr('d', line)

  //Create circles for objects
  const circles = graph.selectAll('circle').data(data)

  circles.exit().remove()

  // Update Current Points
  circles.attr('cx', d => x(new Date(d.date))).attr('cy', d => y(d.distance))
  //Add New Points
  circles
    .enter()
    .append('circle')
    .attr('r', 4)
    .attr('cx', d => x(new Date(d.date)))
    .attr('cy', d => y(d.distance))
    .attr('fill', '#ccc')

  graph
    .selectAll('circle')
    .on('mouseover', (d, i, n) => {
      d3.select(n[i])
        .transition()
        .duration(250)
        .attr('r', 8)
        .attr('fill', '#fff')
      xDottedLine
        .attr('x1', x(new Date(d.date)))
        .attr('x2', x(new Date(d.date)))
        .attr('y1', graphHeight)
        .attr('y2', y(d.distance))
      yDottedLine
        .attr('x1', 0)
        .attr('x2', x(new Date(d.date)))
        .attr('y1', y(d.distance))
        .attr('y2', y(d.distance))

      dottedLines.style('opacity', 1)
    })
    .on('mouseleave', (d, i, n) => {
      d3.select(n[i])
        .transition()
        .duration(250)
        .attr('r', 4)
        .attr('fill', '#ccc')
      dottedLines.style('opacity', 0)
    })
  // Create Axes
  const xAxis = d3
    .axisBottom(x)
    .ticks(4)
    .tickFormat(d3.timeFormat('%b %d'))
  const yAxis = d3
    .axisLeft(y)
    .ticks(4)
    .tickFormat(d => d + ' km')

  //Call Axes
  xAxisGroup.call(xAxis)
  yAxisGroup.call(yAxis)

  //Rotate Axes
  xAxisGroup
    .selectAll('text')
    .attr('transform', 'rotate(-40)')
    .attr('text-anchor', 'end')
}

let data = []

db.collection('activities').onSnapshot(res => {
  res.docChanges().forEach(change => {
    const doc = { ...change.doc.data(), id: change.doc.id }
    switch (change.type) {
      case 'added':
        data.push(doc)
        break
      case 'modified':
        const index = data.findIndex(item => item.id === doc.id)
        data[index] = doc
        break
      case 'removed':
        data = data.filter(item => item.id !== doc.id)
        break
      default:
        break
    }
  })
  update(data)
})
