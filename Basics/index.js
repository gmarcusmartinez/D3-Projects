const svg = d3
  .select('.canvas')
  .append('svg')
  .attr('width', 600)
  .attr('height', 600)

// Setup
// Margins & Dimensions
const margin = { top: 20, right: 20, bottom: 100, left: 100 }
const graphWidth = 600 - margin.left - margin.right
const graphHeight = 600 - margin.top - margin.bottom

// graph
const graph = svg
  .append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left},${margin.top})`)

// Axis Generators
const xAxisGroup = graph
  .append('g')
  .attr('transform', `translate(0, ${graphHeight})`)
const yAxisGroup = graph.append('g')
const y = d3.scaleLinear().range([graphHeight, 0])
const x = d3
  .scaleBand()
  .range([0, 500])
  .paddingInner(0.2)
  .paddingOuter(0.2)

const xAxis = d3.axisBottom(x)
const yAxis = d3
  .axisLeft(y)
  .ticks(3)
  .tickFormat(d => `${d} Orders`)

xAxisGroup
  .selectAll('text')
  .attr('transform', 'rotate(-40)')
  .attr('text-anchor', 'end')

const t = d3.transition().duration(1000)

const update = data => {
  const max = d3.max(data, d => d.orders)
  //1. Update Scales (if they relay on our data)
  y.domain([0, max]).range([graphHeight, 0])
  x.domain(data.map(obj => obj.name))
  //2. Join the Data to the Rectangles
  const rects = graph.selectAll('rect').data(data)
  //3. Remove (id any) Unwanted Shapes
  rects.exit().remove()
  //4. Update Shapes in Dom
  rects
    .attr('width', x.bandwidth)
    .attr('fill', 'orange')
    .attr('x', d => x(d.name))
  //5. Append Enter Selection
  rects
    .enter()
    .append('rect')
    .attr('width', x.bandwidth)
    .attr('fill', 'orange')
    // Starting Conditions
    .attr('x', d => x(d.name))
    .attr('y', graphHeight)
    .merge(rects)
    // Transition
    .transition(t)
    .attr('y', d => y(d.orders))
    .attr('height', d => graphHeight - y(d.orders))

  // Call Axis
  xAxisGroup.call(xAxis)
  yAxisGroup.call(yAxis)
}

let data = []

db.collection('dishes').onSnapshot(res => {
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

/* Starting Conditions
Y - graphHeight
Height - 0
*/

/* Ending Conditions
Y - y(d.orders)
Height - graphHeight - y(d.orders)
*/
