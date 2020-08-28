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

const canvas = __webpack_require__(1);
const plotPoints = __webpack_require__(4);
const drawLine = __webpack_require__(5);

d3.csv('data/tweetdata.csv', plotData);

function plotData(data) {
  plotPoints(canvas, data, 'tweets', 'orange');
  plotPoints(canvas, data, 'retweets', 'blue');
  plotPoints(canvas, data, 'favorites', 'lightgreen');

  drawLine(canvas, data, 'tweets', 'orange');
  drawLine(canvas, data, 'retweets', 'blue');
  drawLine(canvas, data, 'favorites', 'lightgreen');
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const xScale = __webpack_require__(2);
const yScale = __webpack_require__(3);

const height = 600;
const svgWidth = 600;
const chartWidth = 480;

const canvas = d3
  .select('.canvas')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', height);

// Create Axes
const xAxis = d3
  .axisBottom()
  .scale(xScale)
  .tickSize(chartWidth)
  .tickValues(d3.range(1, 11));
canvas.append('g').call(xAxis);

const yAxis = d3.axisRight().scale(yScale).ticks(10).tickSize(chartWidth);
canvas.append('g').call(yAxis);

module.exports = canvas;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const chartWidth = 480;

const xScale = d3.scaleLinear().domain([1, 10.5]).range([20, chartWidth]);
module.exports = xScale;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const chartWidth = 480;
const yScale = d3.scaleLinear().domain([0, 35]).range([chartWidth, 20]);

module.exports = yScale;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const xScale = __webpack_require__(2);
const yScale = __webpack_require__(3);

const plotPoints = (el, data, dataType, color) =>
  el
    .selectAll(`circle.${dataType}`)
    .data(data)
    .enter()
    .append('circle')
    .attr('class', `${dataType}`)
    .attr('r', 5)
    .attr('cx', (d) => xScale(d.day))
    .attr('cy', (d) => yScale(d[dataType]))
    .attr('fill', color);

module.exports = plotPoints;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const xScale = __webpack_require__(2);
const yScale = __webpack_require__(3);

const drawLine = (el, data, pointType, color) => {
  const lambdaXScale = (d) => xScale(d.day);
  const line = d3
    .line()
    .x(lambdaXScale)
    .y((d) => yScale(d[pointType]))
    .curve(d3.curveStep);

  return el
    .append('path')
    .attr('d', line(data))
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', 2);
};

module.exports = drawLine;


/***/ })
/******/ ]);