const d3 = require("d3");
const { graph, arcPath, color, legendGroup, legend } = require("./graph");

const pie = d3
  .pie()
  // Do no Automatically Sort
  .sort(null)
  // Determine slice by value of cost returns an angle
  .value(d => d.cost);

// D3 tip
// const tip = d3
//   .tip()
//   .attr("class", "tip card")
//   .html(d => {
//     let content = `<div class="name">${d.data.name}</div>`;
//     content += `<div>${d.data.cost}</div>`;
//     return content;
//   });

// graph.call(tip);

const update = data => {
  const paths = graph.selectAll("path").data(pie(data));

  //   legendGroup.call(legend);
  //   legendGroup.selectAll("text").attr("fill", "#5c6bc0");

  color.domain(data.map(d => d.name));

  // 3)Remove Unwanted Shapes Using the Exix Selection
  paths
    .exit()
    .style("pointer-events", "none")
    .transition()
    .duration(750)
    .attr("d", arcTweenExit)
    .remove();

  // 4)Update Current Shapes in DOM
  paths
    .attr("d", arcPath)
    .transition()
    .duration(750)
    .attrTween("d", arcTweenUpdate);

  // 5)Append the Enter Selection to the DOM
  paths
    .enter()
    .append("path")
    .attr("class", "arc")
    .attr("stroke", "#fff")
    .attr("stroke-width", 3)
    // Apply '_current' property
    .each(function(d) {
      this._current = d;
    })
    .attr("fill", d => color(d.data.name))
    .transition()
    .duration(500)
    .attrTween("d", arcTweenEnter);

  //Add Events
  //   graph
  //     .selectAll("path")
  //     .on("mouseover", (d, i, n) => {
  //       tip.show(d, n[i]);
  //       handleMouseover(d, n, i);
  //     })
  //     .on("mouseout", (d, i, n) => {
  //       tip.hide();
  //       handleMouseout(d, n, i);
  //     });
};
// Events
const handleMouseover = (d, i, n) => {
  //n[i] - Current Path
  d3.select(n[i])
    .transition("changeSliceFill")
    .duration(300)
    .attr("fill", "#fff");
};

const handleMouseout = (d, i, n) => {
  //n[i] - Current Path
  d3.select(n[i])
    .transition("changeSliceFill")
    .duration(300)
    .attr("fill", color(d.data.name));
};
const arcTweenEnter = d => {
  let i = d3.interpolate(d.endAngle, d.startAngle);
  return function(t) {
    d.startAngle = i(t);
    return arcPath(d);
  };
};

const arcTweenExit = d => {
  let i = d3.interpolate(d.startAngle, d.endAngle);
  return function(t) {
    d.startAngle = i(t);
    return arcPath(d);
  };
};

function arcTweenUpdate(d) {
  // Interpolate between two objects
  let i = d3.interpolate(this._current, d);
  // Update current prop with new updated data
  this._current = d;
  return function(t) {
    return arcPath(i(t));
  };
}

module.exports = update;
