const movies = [
  'titanic',
  'avatar',
  'akira',
  'frozen',
  'deliverance',
  'avengers',
];

const colorScale = d3
  .scaleOrdinal()
  .domain(movies)
  .range(['#fcd88a', '#cf7c1c', '#93c464', '#75734F', '#5eafc6', '#41a368']);

module.exports = { movies, colorScale };
