const dims = { height: 500, width: 1100 }

const svg = d3
  .select('.canvas')
  .append('svg')
  .attr('width', dims.width + 100)
  .attr('height', dims.height + 100)
const graph = svg.append('g').attr('transform', 'translate(50, 50)')

// Data Stratify
const stratify = d3
  .stratify()
  .id(d => d.name)
  .parentId(d => d.parent)

const tree = d3.tree().size([dims.width, dims.height])
const color = d3.scaleOrdinal(d3['schemeSet3'])

const update = data => {
  graph.selectAll('.node').remove()
  graph.selectAll('.link').remove()

  color.domain(data.map(obj => obj.department))

  // Get Updated Root Node Data
  const rootNode = stratify(data)
  const treeData = tree(rootNode)

  const links = graph.selectAll('.link').data(treeData.links())
  links
    .enter()
    .append('path')
    .transition()
    .duration(750)
    .attr('class', 'link')
    .attr('fill', 'none')
    .attr('stroke', '#aaa')
    .attr('stroke-width', 2)
    .attr(
      'd',
      d3
        .linkVertical()
        .x(d => d.x)
        .y(d => d.y)
    )
  // Join Data
  const nodes = graph.selectAll('.node').data(treeData.descendants())

  const enterNodes = nodes
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.x},${d.y})`)

  enterNodes
    .append('rect')
    .attr('fill', d => color(d.data.department))
    .attr('stroke', '#555')
    .attr('stroke-width', 2)
    .attr('height', 50)
    .attr('width', d => d.data.name.length * 20)
    .attr('transform', d => {
      let x = d.data.name.length * 10
      return `translate (${-x}, -25)`
    })

  enterNodes
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .text(d => d.data.name)
}

// Data Array and Firestore
let data = []

db.collection('employees').onSnapshot(res => {
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
