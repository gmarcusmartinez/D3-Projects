const update = () => {
  // 1) Update Any Scales Which Rely On Data
  xScale.domain(d3.range(data.length));
  yScale.domain([0, d3.max(data)]);
  // 2)Join Updated Data to Elements
  // 3)Remove Unwanted Shapes Using the Exix Selection
  // 4)Update Current Shapes in DOM
  // 5)Append the Enter Selection to the DOM
};
