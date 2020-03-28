// Linear Scale
const scale = d3.scaleLinear();

// Domain- input
scale.domain([100, 500]);
// Range - output
scale.range([10, 350]);

console.log(scale(100));
console.log(scale(300));
console.log(scale(500));
