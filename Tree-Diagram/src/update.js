const d3 = require("d3");
const { graph, stratify, tree } = require("./graph");

const color = d3.scaleOrdinal(d3["schemePastel2"]);

const update = data => {
  // Remove Current Nodes
  graph.selectAll(".node").remove();
  graph.selectAll(".link").remove();

  const rootNode = stratify(data);
  const treeData = tree(rootNode);

  const nodes = graph.selectAll(".node").data(treeData.descendants());

  color.domain(data.map(item => item.department));
  // Enter Selection
  const enterNodes = nodes
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x},${d.y})`);

  // Get Link Selection and Join Data
  const links = graph.selectAll(".link").data(treeData.links());
  // Enter Links
  links
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", "#aaa")
    .attr("stroke-width", 2)
    .attr(
      "d",
      d3
        .linkVertical()
        .x(d => d.x)
        .y(d => d.y)
    );

  // Append Rects For Names
  enterNodes
    .append("rect")
    .attr("fill", d => color(d.department))
    .attr("stroke", "#555")
    .attr("stroke-width", 2)
    .attr("height", 50)
    .attr("width", d => d.data.name.length * 20)
    // Move Names
    .attr("transform", d => {
      let x = d.data.name.length * 10;
      return `translate(${-x},-30)`;
    });

  enterNodes
    .append("text")
    .attr("text-anchor", "middle")
    .attr("fill", "#fff")
    .text(d => d.data.name);
};

module.exports = update;
