const db = require("./db");
require("./graph");

const form = document.querySelector("form");
const input = document.querySelector("input");
const error = document.querySelector(".error");
const btns = document.querySelectorAll("button");
const formAct = document.querySelector("form span");

let activity = "cycling";

btns.forEach(btn => {
  btn.addEventListener("click", e => {
    activity = e.target.dataset.activity;
    btns.forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    // Set id of input field
    input.setAttribute("id", activity);

    //Set text of form span
    formAct.textContent = activity;
  });
});

form.addEventListener("submit", e => {
  e.preventDefault();
  const distance = +input.value;
  if (distance) {
    db.collection("activities")
      .add({
        distance,
        activity,
        data: new Date().toString()
      })
      .then(() => {
        error.textContent = "";
        input.value = "";
      });
  } else {
    error.textContent = "Please enter a valid distance";
  }
});
