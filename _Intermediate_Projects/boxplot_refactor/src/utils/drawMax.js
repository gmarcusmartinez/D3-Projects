const yScale = require('./yScale');

/**
 * drawMax
 * @param {*} d Indivdual row of data
 * @param {*} g Group element 
 * For this explanation I will use the datapoint:
 * day,min,max,median,q1,q3,number
   1,14,65,33,20,35,22 
 */

function drawMax(d, g) {
  return (
    d3
      .select(g)
      .append('line')
      .attr('class', 'max')
      // The value 10 is half of our rect width, alternatively we could import the rectangle width
      // as a variable and set the x values to -rectangleWidth / 2 && rectangleWidth / 2
      .attr('x1', -10)
      .attr('x2', 10)
      // Here we subtract our max from our median to place the y points, we want them to be equal
      // yScale(65) - yScale(33) : 181 - 328.2
      // = -147.2 Postion of 'Top Bar'
      .attr('y1', yScale(d.max) - yScale(d.median))
      .attr('y2', yScale(d.max) - yScale(d.median))
      .style('stroke', 'black')
      .style('stroke-width', '4px')
  );
}

module.exports = drawMax;
