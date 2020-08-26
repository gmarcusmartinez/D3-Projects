!(function (t) {
  var e = {};
  function a(r) {
    if (e[r]) return e[r].exports;
    var n = (e[r] = { i: r, l: !1, exports: {} });
    return t[r].call(n.exports, n, n.exports, a), (n.l = !0), n.exports;
  }
  (a.m = t),
    (a.c = e),
    (a.d = function (t, e, r) {
      a.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
    }),
    (a.r = function (t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 });
    }),
    (a.t = function (t, e) {
      if ((1 & e && (t = a(t)), 8 & e)) return t;
      if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (
        (a.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: t }),
        2 & e && 'string' != typeof t)
      )
        for (var n in t)
          a.d(
            r,
            n,
            function (e) {
              return t[e];
            }.bind(null, n)
          );
      return r;
    }),
    (a.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return a.d(e, 'a', e), e;
    }),
    (a.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (a.p = ''),
    a((a.s = 0));
})([
  function (t, e) {
    d3.csv('./data/boxplot.csv', function (t) {
      a.selectAll('g.box')
        .data(t)
        .enter()
        .append('g')
        .attr('class', 'box')
        .attr('transform', (t) => `translate(${i(t.day)}, ${s(t.median)})`)
        .each(function (t) {
          var e;
          !(function (t, e) {
            d3.select(e)
              .append('line')
              .attr('class', 'range')
              .attr('x1', 0)
              .attr('x2', 0)
              .attr('y1', s(t.max) - s(t.median))
              .attr('y2', s(t.min) - s(t.median))
              .style('stroke', 'black')
              .style('stroke-width', '4px');
          })(t, this),
            (function (t, e) {
              d3.select(e)
                .append('line')
                .attr('class', 'max')
                .attr('x1', -10)
                .attr('x2', 10)
                .attr('y1', s(t.max) - s(t.median))
                .attr('y2', s(t.max) - s(t.median))
                .style('stroke', 'black')
                .style('stroke-width', '4px');
            })(t, this),
            (function (t, e) {
              d3.select(e)
                .append('line')
                .attr('class', 'max')
                .attr('x1', -10)
                .attr('x2', 10)
                .attr('y1', s(t.min) - s(t.median))
                .attr('y2', s(t.min) - s(t.median))
                .style('stroke', 'black')
                .style('stroke-width', '4px');
            })(t, this),
            (function (t, e) {
              d3.select(e)
                .append('rect')
                .attr('class', 'range')
                .attr('width', 20)
                .attr('x', -10)
                .attr('y', s(t.q3) - s(t.median))
                .attr('height', s(t.q1) - s(t.q3))
                .style('fill', 'white')
                .style('stroke', 'black')
                .style('stroke-width', '2px');
            })(t, this),
            (e = t),
            d3
              .select(e)
              .append('line')
              .attr('x1', -10)
              .attr('x2', 10)
              .attr('y1', 0)
              .attr('y2', 0)
              .style('stroke', 'darkgray')
              .style('stroke-width', '2px');
        });
    });
    const a = d3
        .select('.canvas')
        .append('svg')
        .attr('width', 600)
        .attr('height', 600),
      r = [20, 470],
      n = [480, 20],
      i = d3.scaleLinear().domain([1, 8]).range(r),
      s = d3.scaleLinear().domain([0, 100]).range(n),
      l = d3
        .axisBottom()
        .scale(i)
        .tickSize(-470)
        .tickValues([1, 2, 3, 4, 5, 6, 7]);
    a.append('g')
      .attr('transform', 'translate(0,480)')
      .attr('id', 'xAxisG')
      .call(l);
    const o = d3.axisRight().scale(s).ticks(8).tickSize(-470);
    a.append('g')
      .attr('transform', 'translate(470,0)')
      .attr('id', 'yAxisG')
      .call(o);
  },
]);
