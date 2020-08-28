const height = 600;
const width = 600;

const canvas = d3
  .select('.canvas')
  .append('svg')
  .attr('height', height)
  .attr('width', width);

const fillScale = d3
  .scaleOrdinal()
  .range(['#fcd88a', '#cf7c1c', '#93c464', '#75734F']);

const arc = d3.arc();
arc.innerRadius(80).outerRadius(100);

d3.json('tweets.json', drawPie);

function drawPie(data) {
  const nestedTweets = d3
    .nest()
    .key((d) => d.user)
    .entries(data.tweets);

  nestedTweets.forEach((d) => {
    d.numTweets = d.values.length;
    d.numFavorites = d3.sum(d.values, (p) => p.favorites.length);
    d.numRetweets = d3.sum(d.values, (p) => p.retweets.length);
  });

  const pieChart = d3.pie().sort(null);
  pieChart.value((d) => d.numTweets);

  const tweetsPie = pieChart(nestedTweets);
  pieChart.value((d) => d.numRetweets);

  const retweetsPie = pieChart(nestedTweets);

  nestedTweets.forEach((d, i) => {
    d.tweetsSlice = tweetsPie[i];
    d.retweetsSlice = retweetsPie[i];
  });

  canvas
    .append('g')
    .attr('transform', 'translate(300,300)')
    .selectAll('path')
    .data(nestedTweets)
    .enter()
    .append('path')
    .attr('d', (d) => arc(d.tweetsSlice))
    .style('fill', (d, i) => fillScale(i))
    .style('stroke', 'black')
    .style('stroke-width', '2px');

  d3.selectAll('path').transition().duration(1000).attrTween('d', arcTween);

  function arcTween(d) {
    return (t) => {
      const interpolateStartAngle = d3.interpolate(
        d.tweetsSlice.startAngle,
        d.retweetsSlice.startAngle
      );
      const interpolateEndAngle = d3.interpolate(
        d.tweetsSlice.endAngle,
        d.retweetsSlice.endAngle
      );

      d.startAngle = interpolateStartAngle(t);
      d.endAngle = interpolateEndAngle(t);
      return arc(d);
    };
  }
}
