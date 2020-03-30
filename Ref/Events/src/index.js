const d3 = require("d3");
const uuid = require("uuid");

const data = require("./data");
const update = require("./update");

d3.select(".remove").on("click", e => {
  data.pop();
  update(data);
});

d3.select(".add").on("click", e => {
  const maxValue = 25;
  const num = Math.floor(Math.random() * maxValue);
  data.push({ key: uuid.v4(), value: num });
  update(data);
});

update(data);
