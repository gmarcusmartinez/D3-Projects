const svg = d3.select('svg')

const createPlanets = async () => {
  const planets = await d3.json('planets.json')

  const circs = svg.selectAll('circle').data(planets)

  circs
    .enter()
    .append('circle')
    .attr('cy', 200)
    .attr('cx', d => d.distance)
    .attr('r', d => d.radius)
    .attr('fill', d => d.fill)
}

createPlanets()
