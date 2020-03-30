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

d3.select(".randomize").on("click", e => {
  const maxValue = 25;
  let newData = [];
  for (let i = 0; i < data.length; i++) {
    newData.push({
      key: uuid.v4(),
      value: Math.floor(Math.random() * maxValue)
    });
  }
  update(newData);
  console.log(newData);
});

update(data);
