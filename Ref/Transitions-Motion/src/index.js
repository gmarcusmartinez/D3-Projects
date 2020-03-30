const d3 = require("d3");

const data = require("./data");
const update = require("./update");

d3.select(".remove").on("click", e => {
  data.pop();
  update(data);
});

d3.select(".add").on("click", e => {
  const maxValue = 25;
  const num = Math.floor(Math.random() * maxValue);
  data.push({ key: 26, value: num });
  update(data);
});

update(data);
