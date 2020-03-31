const error = document.querySelector(".error");
const numInput = document.querySelector("#num-input");

d3.select("#add").on("click", function() {
  const num = +numInput.value;
  d3.event.stopPropagation();
  d3.event.preventDefault();

  if (num <= 25 && num >= 0) {
    const lastKeyValue = data[data.length - 1].key;

    data.push({
      key: lastKeyValue + 1,
      value: num
    });
    update(data);

    error.textContent = "";
    numInput.value = "";
  } else {
    error.textContent = "Please enter a valid number";
  }
});

d3.select(".remove").on("click", e => {
  data.pop();
  update(data);
});

update(data);
