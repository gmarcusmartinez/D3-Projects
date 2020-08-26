const rowConverter = (d, i, cols) => {
  const row = {
    data: parseTime(d.Date)
  };

  for (let i = 0; i < cols.length; i++) {
    col = cols[i];
    d[col] ? (row[col] = +d[col]) : (row[col] = 0);
  }

  return row;
};

//Set up Stack Method
const stack = d3.stack().order(d3.stackOrderDescending);

d3.csv("src/ev_sales_data.csv", rowConverter, data => {});
