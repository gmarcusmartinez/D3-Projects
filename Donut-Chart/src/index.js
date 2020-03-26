const db = require("./db");
require("./graph");

const form = document.querySelector("form");
const name = document.querySelector("#name");
const cost = document.querySelector("#cost");
const error = document.querySelector("#error");

form.addEventListener("submit", async e => {
  e.preventDefault();
  if (name.value && cost.value) {
    const item = {
      name: name.value,
      cost: +cost.value
    };
    const res = await db.collection("expenses").add(item);
    name.value = "";
    cost.value = "";
    error.textContent = "";
  } else {
    error.textContent = "Please fill out all fields before entering";
  }
});
