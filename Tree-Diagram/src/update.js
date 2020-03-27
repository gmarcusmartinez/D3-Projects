const { graph, stratify, tree } = require("./graph");

const update = data => {
  const rootNode = stratify(data);
  const treeData = tree(rootNode);

  const nodes = graph.selectAll(".node").data(treeData.descendants());

  // Enter Selection
  const enterNodes = nodes
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x},${d.y})`);

  // Append Rects For Names
  enterNodes
    .append("rect")
    .attr("fill", "#aaa")
    .attr("stroke", "#555")
    .attr("stroke-width", 2)
    .attr("height", 50)
    .attr("width", d => d.data.name.length * 20);
  enterNodes
    .append("text")
    .attr("text-anchor", "middle")
    .attr("fill", "#fff")
    .text(d => d.data.name);
};

module.exports = update;
