const dims = { height: 300, width: 300, radius: 150 }
const cent = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 }

const svg = d3
  .select('.canvas')
  .append('svg')
  .attr('width', dims.width + 150)
  .attr('height', dims.height + 150)

const graph = svg
  .append('g')
  .attr('transform', `translate(${cent.x}, ${cent.y})`)

// Create Angles based on cost value
const pie = d3
  .pie()
  .sort(null)
  .value(d => d.cost)

const arcPath = d3
  .arc()
  .outerRadius(dims.radius)
  .innerRadius(dims.radius / 2)

const color = d3.scaleOrdinal(d3['schemeSet3'])

// Function to draw Paths
const update = data => {
  //Update color scale domain
  color.domain(data.map(obj => obj.name))

  const paths = graph.selectAll('path').data(pie(data))
  paths
    .enter()
    .append('path')
    .attr('class', 'arc')
    // Draw Path
    .attr('d', arcPath)
    .attr('stroke', '#fff')
    .attr('stroke-width', '3px')
    .attr('fill', d => color(d.data.name))
}

// Data Array and Firestore
let data = []

db.collection('expenses').onSnapshot(res => {
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

// Arc Generator
