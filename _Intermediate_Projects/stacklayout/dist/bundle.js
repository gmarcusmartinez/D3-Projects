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
const xScale = __webpack_require__(2);
const yScale = __webpack_require__(3);
const { movies, colorScale } = __webpack_require__(4);

d3.csv('./data/movies.csv', plotData);

function plotData(data) {
  const stackLayout = d3.stack().keys(movies);
  const heightScale = d3.scaleLinear().domain([0, 60]).range([0, 480]);

  canvas
    .selectAll('g.bar')
    .data(stackLayout(data))
    .enter()
    .append('g')
    .attr('class', 'bar')
    .each(function (d) {
      d3.select(this)
        .selectAll('rect')
        .data(d)
        .enter()
        .append('rect')
        .attr('x', (_, i) => xScale(i) + 30)
        .attr('y', (d) => yScale(d[1]))
        .attr('height', (d) => heightScale(d[1] - d[0]))
        .attr('width', 40)
        .style('fill', colorScale(d.key));
    });
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const xScale = __webpack_require__(2);
const yScale = __webpack_require__(3);

const height = 600;
const width = 600;

const canvas = d3
  .select('.canvas')
  .append('svg')
  .attr('height', height)
  .attr('width', width)
  .attr('transform', `translate(50,50)`);

const xAxis = d3
  .axisBottom()
  .scale(xScale)
  .tickSize(500)
  .tickValues(d3.range(1, 11));

canvas.append('g').attr('id', 'xAxisG').call(xAxis);

const yAxis = d3.axisRight().scale(yScale).ticks(10).tickSize(530);

canvas.append('g').attr('id', 'yAxisG').call(yAxis);

module.exports = canvas;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const xScale = d3.scaleLinear().domain([0, 10]).range([0, 500]);

module.exports = xScale;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const yScale = d3.scaleLinear().domain([0, 60]).range([480, 0]);

module.exports = yScale;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);