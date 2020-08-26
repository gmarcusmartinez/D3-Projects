/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const drawMax = __webpack_require__(1);
const drawMedian = __webpack_require__(3);
const drawMin = __webpack_require__(4);
const drawRange = __webpack_require__(5);
const drawRect = __webpack_require__(6);

const yScale = __webpack_require__(2);
const xScale = __webpack_require__(7);

const canvas = __webpack_require__(8);
d3.csv('../data/boxplot.csv', plotData);

console.log('65', yScale(65));
console.log(yScale(33));

function plotData(data) {
  canvas
    .selectAll('g.box')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'box')
    .attr(
      'transform',
      (d) => `translate(${xScale(d.day)}, ${yScale(d.median)})`
    )
    .each(function (d) {
      drawRange(d, this);
      drawMax(d, this);
      drawMin(d, this);
      drawRect(d, this);
      drawMedian(this);
    });
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const yScale = __webpack_require__(2);

/**
 * drawMax
 * @param {*} d Indivdual row of data
 * @param {*} g Group element 
 * For each explanation I will use the datapoint:
 * day,min,max,median,q1,q3,number
   1,14,65,33,20,35,22 
 */

function drawMax(d, g) {
  return (
    d3
      .select(g)
      .append('line')
      .attr('class', 'max')
      // The value 10 is half of our bar width, alternatively we could import the rectangle width
      // as a variable and set the x values to -rectangleWidth / 2 && rectangleWidth / 2
      .attr('x1', -10)
      .attr('x2', 10)
      .attr('y1', yScale(d.max) - yScale(d.median))
      .attr('y2', yScale(d.max) - yScale(d.median))
      .style('stroke', 'black')
      .style('stroke-width', '4px')
  );
}

module.exports = drawMax;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const yRange = [480, 20];
const yScale = d3.scaleLinear().domain([0, 100]).range(yRange);

module.exports = yScale;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function drawMedian(g) {
  return d3
    .select(g)
    .append('line')
    .attr('x1', -10)
    .attr('x2', 10)
    .attr('y1', 0)
    .attr('y2', 0)
    .style('stroke', 'darkgray')
    .style('stroke-width', '2px');
}

module.exports = drawMedian;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const yScale = __webpack_require__(2);

function drawMin(d, g) {
  return (
    d3
      .select(g)
      .append('line')
      .attr('class', 'max')
      .attr('x1', -10)
      .attr('x2', 10)
      // Bottom Bar
      .attr('y1', yScale(d.min) - yScale(d.median))
      .attr('y2', yScale(d.min) - yScale(d.median))
      .style('stroke', 'black')
      .style('stroke-width', '4px')
  );
}

module.exports = drawMin;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const yScale = __webpack_require__(2);

function drawRange(d, g) {
  return d3
    .select(g)
    .append('line')
    .attr('class', 'range')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', yScale(d.max) - yScale(d.median))
    .attr('y2', yScale(d.min) - yScale(d.median))
    .style('stroke', 'black')
    .style('stroke-width', '4px');
}

module.exports = drawRange;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const yScale = __webpack_require__(2);

function drawRect(d, g) {
  return d3
    .select(g)
    .append('rect')
    .attr('class', 'range')
    .attr('width', 20)
    .attr('x', -10)
    .attr('y', yScale(d.q3) - yScale(d.median))
    .attr('height', yScale(d.q1) - yScale(d.q3))
    .style('fill', 'white')
    .style('stroke', 'black')
    .style('stroke-width', '2px');
}

module.exports = drawRect;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

const xRange = [20, 470];
const xScale = d3.scaleLinear().domain([1, 8]).range(xRange);

module.exports = xScale;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const yScale = __webpack_require__(2);
const xScale = __webpack_require__(7);

const height = 600;
const width = 600;
const tickSize = 470;

const canvas = d3
  .select('.canvas')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const xAxis = d3
  .axisBottom()
  .scale(xScale)
  .tickSize(-tickSize)
  .tickValues([1, 2, 3, 4, 5, 6, 7]);

canvas
  .append('g')
  .attr('transform', `translate(0,${tickSize + 10})`)
  .attr('id', 'xAxisG')
  .call(xAxis);

const yAxis = d3.axisRight().scale(yScale).ticks(8).tickSize(-tickSize);

canvas
  .append('g')
  .attr('transform', `translate(${tickSize},0)`)
  .attr('id', 'yAxisG')
  .call(yAxis);

module.exports = canvas;


/***/ })
/******/ ]);