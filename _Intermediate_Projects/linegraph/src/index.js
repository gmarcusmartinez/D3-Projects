const canvas = require('./utils/createChart');
const plotPoints = require('./utils/plotPoints');
const drawLine = require('./utils/drawLine');

d3.csv('data/tweetdata.csv', plotData);

function plotData(data) {
  plotPoints(canvas, data, 'tweets', 'orange');
  plotPoints(canvas, data, 'retweets', 'blue');
  plotPoints(canvas, data, 'favorites', 'lightgreen');

  drawLine(canvas, data, 'tweets', 'orange');
  drawLine(canvas, data, 'retweets', 'blue');
  drawLine(canvas, data, 'favorites', 'lightgreen');
}
