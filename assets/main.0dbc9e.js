/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/ 		var prefetchChunks = data[3] || [];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		// chunk prefetching for javascript
/******/ 		prefetchChunks.forEach(function(chunkId) {
/******/ 			if(installedChunks[chunkId] === undefined) {
/******/ 				installedChunks[chunkId] = null;
/******/ 				var link = document.createElement('link');
/******/
/******/ 				if (__webpack_require__.nc) {
/******/ 					link.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				link.rel = "prefetch";
/******/ 				link.as = "script";
/******/ 				link.href = jsonpScriptSrc(chunkId);
/******/ 				document.head.appendChild(link);
/******/ 			}
/******/ 		});
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + "." + {"2":"de0bb4","3":"f14072","4":"9da885","5":"0162eb","6":"06268a"}[chunkId] + ".js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	webpackJsonpCallback([[], {}, 0, [5]]);
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "EYcP");
/******/ })
/************************************************************************/
/******/ ({

/***/ "EYcP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@zhoujiahao/utils/lib/domutil.js
const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);
const domutil_goto = (url) => {
    let $tmpLink = document.createElement('a');
    $tmpLink.href = url || 'about:blanket';
    $tmpLink.target = '_blanket';
    $tmpLink.click();
    $tmpLink = null;
};

const isElementEmpty = ($ele) => {
    return !($ele.children && $ele.children.length);
}


// CONCATENATED MODULE: ./node_modules/@zhoujiahao/utils/lib/tplutil.js
const tplutil_link = (text, src) => `<a href=${src} target="_blanket" >${text}</a>`;
const docTpl = (name, synopsis, description) => (`
    NAME
        ${name}
        
    SYNOPSIS
        ${synopsis}
        
    DESCRIPTION
        ${description}`).replace(/</g, '&lt;');


// CONCATENATED MODULE: ./node_modules/@zhoujiahao/utils/lib/strutils.js
const format = (msg, ...args) => {
    if (args.length === 0) return msg;
    return msg.replace(/{(\d+)}/g,
        (match, number) => (args[number] != null
            ? args[number]
            : match));
};
const insert = (prefix) => (str) => prefix + str;

const CNDateString = (date) => {
  let cn = ["〇","一","二","三","四","五","六","七","八","九"];
  let s = [];
  let YY = date.getFullYear().toString();
  for (let i=0; i<YY.length; i++)
    if (cn[YY.charAt(i)])
      s.push(cn[YY.charAt(i)]);
    else
      s.push(YY.charAt(i));
  s.push("年");
  let MM = date.getMonth() + 1;
  if (MM<10)
    s.push(cn[MM]);
  else if (MM<20)
    s.push("十" + cn[MM% 10]);
  s.push("月");
  let DD = date.getDate();
  if (DD<10)
    s.push(cn[DD]);
  else if (DD<20)
    s.push("十" + cn[DD% 10]);
  else
    s.push("二十" + cn[DD% 10]);
  s.push("日");
  return s.join('');
};



// CONCATENATED MODULE: ./node_modules/@zhoujiahao/utils/lib/requtils.js
const req = async (url, method, data) => {
    return (await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: data ? JSON.stringify(data) : null
    })).json();
};

const getImage = (url) => {
  let image = new Image();
  image.src = url;
  return image.decode();
};


const graphQlQuery = (endpoint, queryStr) => req(endpoint, 'POST', {query: queryStr});


// CONCATENATED MODULE: ./node_modules/@zhoujiahao/utils/lib/store.js
let store = new Map();



// CONCATENATED MODULE: ./node_modules/@zhoujiahao/utils/lib/index.js






const updateArrEle = (arr, index, val) => {
  const copy = arr.slice();
  copy.splice(index, 1, val);
  return copy;
};



// CONCATENATED MODULE: ./app/js/basic-cmd/install.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var desc = "install - \u5B89\u88C5\u9ED8\u8BA4\u547D\u4EE4\uFF0C\u5217\u51FA\u547D\u4EE4\u7B49\n        install           \u5B89\u88C5\u9ED8\u8BA4\u547D\u4EE4\n        install -l        \u5217\u51FA\u53EF\u5B89\u88C5\u7684\u989D\u5916\u547D\u4EE4\n        install <cmdName> \u5B89\u88C5\u6307\u5B9A\u547D\u4EE4";
var doc = docTpl('install', 'install [-l | <cmdName>]', desc);
/* harmony default export */ var install = ({
  doc: doc,
  shortopts: 'l',
  handler: function () {
    var _handler = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(paramsObj, cmdSet, $terminal, _ref) {
      var cmdName, isNoParams, _ref2, commands, _ref3, gui;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              cmdName = _ref.restParams;
              isNoParams = !paramsObj.l && !cmdName;

              if (!isNoParams) {
                _context.next = 11;
                break;
              }

              _context.next = 5;
              return Promise.all(/* import() */[__webpack_require__.e(2), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, "w74N"));

            case 5:
              _ref2 = _context.sent;
              commands = _ref2.default;
              window.Terminal.addCommands(commands);
              return _context.abrupt("return", Promise.resolve('成功安装命令，可输入 help 查看'));

            case 11:
              _context.t0 = cmdName;
              _context.next = _context.t0 === 'gui' ? 14 : 20;
              break;

            case 14:
              _context.next = 16;
              return __webpack_require__.e(/* import() */ 4).then(__webpack_require__.t.bind(null, "1yQL", 7));

            case 16:
              _ref3 = _context.sent;
              gui = _ref3.default;
              window.Terminal.addCommands({
                gui: gui
              });
              return _context.abrupt("break", 21);

            case 20:
              return _context.abrupt("return", '');

            case 21:
              return _context.abrupt("return", '');

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function handler(_x, _x2, _x3, _x4) {
      return _handler.apply(this, arguments);
    }

    return handler;
  }()
});
// CONCATENATED MODULE: ./app/js/main/index.js
function main_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function main_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { main_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { main_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var init =
/*#__PURE__*/
function () {
  var _ref = main_asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _ref2, PseudoTerminal, Terminal;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return __webpack_require__.e(/* import() */ 6).then(__webpack_require__.t.bind(null, "sedF", 7));

          case 2:
            _ref2 = _context.sent;
            PseudoTerminal = _ref2.default;
            Terminal = PseudoTerminal($('#terminal'));
            window.Terminal = Terminal;
            document.addEventListener('click', function (evt) {
              var isCommand = Array.from(evt.target.classList).includes('command');
              if (!isCommand) return;
              var command = evt.target.getAttribute('data-cmd');
              var isMulti = evt.target.hasAttribute('multi');
              var toExec = isMulti ? command.split(/\s*&\s*/) : command;
              var execFn = isMulti ? 'humanizerExecCmdArr' : 'humanizerExec';
              Terminal[execFn](toExec);
            });
            _context.next = 9;
            return Terminal.addCommands({
              install: install
            });

          case 9:
            _context.next = 11;
            return Terminal.humanizerExecCmdArr(['install']);

          case 11:
            __webpack_require__.e(/* import() */ 5).then(__webpack_require__.t.bind(null, "c+U0", 7)).then(function () {
              var $linkToblog = $('.link-to-blog');
              $linkToblog.classList.add('command');
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

init().then();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B6aG91amlhaGFvL3V0aWxzL2xpYi9kb211dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AemhvdWppYWhhby91dGlscy9saWIvdHBsdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHpob3VqaWFoYW8vdXRpbHMvbGliL3N0cnV0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AemhvdWppYWhhby91dGlscy9saWIvcmVxdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B6aG91amlhaGFvL3V0aWxzL2xpYi9zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHpob3VqaWFoYW8vdXRpbHMvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2FwcC9qcy9iYXNpYy1jbWQvaW5zdGFsbC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvanMvbWFpbi9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZXNjIiwiZG9jIiwiZG9jVHBsIiwic2hvcnRvcHRzIiwiaGFuZGxlciIsInBhcmFtc09iaiIsImNtZFNldCIsIiR0ZXJtaW5hbCIsImNtZE5hbWUiLCJyZXN0UGFyYW1zIiwiaXNOb1BhcmFtcyIsImwiLCJjb21tYW5kcyIsImRlZmF1bHQiLCJ3aW5kb3ciLCJUZXJtaW5hbCIsImFkZENvbW1hbmRzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJndWkiLCJpbml0IiwiUHNldWRvVGVybWluYWwiLCIkIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZ0IiwiaXNDb21tYW5kIiwiQXJyYXkiLCJmcm9tIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiaW5jbHVkZXMiLCJjb21tYW5kIiwiZ2V0QXR0cmlidXRlIiwiaXNNdWx0aSIsImhhc0F0dHJpYnV0ZSIsInRvRXhlYyIsInNwbGl0IiwiZXhl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TUMsV0FBVyxHQUFHcEIsQ0FBQyxDQUFDLGVBQUQsQ0FBckI7QUFDQW9CLHlCQUFXLENBQUNaLFNBQVosQ0FBc0JhLEdBQXRCLENBQTBCLFNBQTFCO0FBQ0QsYUFKSDs7QUF6Qlc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBSnZCLElBQUk7QUFBQTtBQUFBO0FBQUEsR0FBVjs7QUFnQ0FBLElBQUksR0FBR3FCLElBQVAsRyIsImZpbGUiOiJtYWluLjBkYmM5ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXG4gXHRcdHZhciBwcmVmZXRjaENodW5rcyA9IGRhdGFbM10gfHwgW107XG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuIFx0XHQvLyBjaHVuayBwcmVmZXRjaGluZyBmb3IgamF2YXNjcmlwdFxuIFx0XHRwcmVmZXRjaENodW5rcy5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IHVuZGVmaW5lZCkge1xuIFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gbnVsbDtcbiBcdFx0XHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRsaW5rLnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0bGluay5yZWwgPSBcInByZWZldGNoXCI7XG4gXHRcdFx0XHRsaW5rLmFzID0gXCJzY3JpcHRcIjtcbiBcdFx0XHRcdGxpbmsuaHJlZiA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuIFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0fTtcblxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0MDogMFxuIFx0fTtcblxuXG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLlwiICsge1wiMlwiOlwiZGUwYmI0XCIsXCIzXCI6XCJmMTQwNzJcIixcIjRcIjpcIjlkYTg4NVwiLFwiNVwiOlwiMDE2MmViXCIsXCI2XCI6XCIwNjI2OGFcIn1bY2h1bmtJZF0gKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcignTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKScpO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdHdlYnBhY2tKc29ucENhbGxiYWNrKFtbXSwge30sIDAsIFs1XV0pO1xuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIkVZY1BcIik7XG4iLCJjb25zdCAkJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwuYmluZChkb2N1bWVudCk7XHJcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpO1xyXG5jb25zdCBnb3RvID0gKHVybCkgPT4ge1xyXG4gICAgbGV0ICR0bXBMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgJHRtcExpbmsuaHJlZiA9IHVybCB8fCAnYWJvdXQ6YmxhbmtldCc7XHJcbiAgICAkdG1wTGluay50YXJnZXQgPSAnX2JsYW5rZXQnO1xyXG4gICAgJHRtcExpbmsuY2xpY2soKTtcclxuICAgICR0bXBMaW5rID0gbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IGlzRWxlbWVudEVtcHR5ID0gKCRlbGUpID0+IHtcclxuICAgIHJldHVybiAhKCRlbGUuY2hpbGRyZW4gJiYgJGVsZS5jaGlsZHJlbi5sZW5ndGgpO1xyXG59XHJcbmV4cG9ydCB7JCwgJCQsIGdvdG8sIGlzRWxlbWVudEVtcHR5fTtcclxuIiwiY29uc3QgbGluayA9ICh0ZXh0LCBzcmMpID0+IGA8YSBocmVmPSR7c3JjfSB0YXJnZXQ9XCJfYmxhbmtldFwiID4ke3RleHR9PC9hPmA7XHJcbmNvbnN0IGRvY1RwbCA9IChuYW1lLCBzeW5vcHNpcywgZGVzY3JpcHRpb24pID0+IChgXHJcbiAgICBOQU1FXHJcbiAgICAgICAgJHtuYW1lfVxyXG4gICAgICAgIFxyXG4gICAgU1lOT1BTSVNcclxuICAgICAgICAke3N5bm9wc2lzfVxyXG4gICAgICAgIFxyXG4gICAgREVTQ1JJUFRJT05cclxuICAgICAgICAke2Rlc2NyaXB0aW9ufWApLnJlcGxhY2UoLzwvZywgJyZsdDsnKTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBsaW5rLFxyXG4gICAgZG9jVHBsXHJcbn07IiwiY29uc3QgZm9ybWF0ID0gKG1zZywgLi4uYXJncykgPT4ge1xyXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSByZXR1cm4gbXNnO1xyXG4gICAgcmV0dXJuIG1zZy5yZXBsYWNlKC97KFxcZCspfS9nLFxyXG4gICAgICAgIChtYXRjaCwgbnVtYmVyKSA9PiAoYXJnc1tudW1iZXJdICE9IG51bGxcclxuICAgICAgICAgICAgPyBhcmdzW251bWJlcl1cclxuICAgICAgICAgICAgOiBtYXRjaCkpO1xyXG59O1xyXG5jb25zdCBpbnNlcnQgPSAocHJlZml4KSA9PiAoc3RyKSA9PiBwcmVmaXggKyBzdHI7XHJcblxyXG5jb25zdCBDTkRhdGVTdHJpbmcgPSAoZGF0ZSkgPT4ge1xyXG4gIGxldCBjbiA9IFtcIuOAh1wiLFwi5LiAXCIsXCLkuoxcIixcIuS4iVwiLFwi5ZubXCIsXCLkupRcIixcIuWFrVwiLFwi5LiDXCIsXCLlhatcIixcIuS5nVwiXTtcclxuICBsZXQgcyA9IFtdO1xyXG4gIGxldCBZWSA9IGRhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpO1xyXG4gIGZvciAobGV0IGk9MDsgaTxZWS5sZW5ndGg7IGkrKylcclxuICAgIGlmIChjbltZWS5jaGFyQXQoaSldKVxyXG4gICAgICBzLnB1c2goY25bWVkuY2hhckF0KGkpXSk7XHJcbiAgICBlbHNlXHJcbiAgICAgIHMucHVzaChZWS5jaGFyQXQoaSkpO1xyXG4gIHMucHVzaChcIuW5tFwiKTtcclxuICBsZXQgTU0gPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gIGlmIChNTTwxMClcclxuICAgIHMucHVzaChjbltNTV0pO1xyXG4gIGVsc2UgaWYgKE1NPDIwKVxyXG4gICAgcy5wdXNoKFwi5Y2BXCIgKyBjbltNTSUgMTBdKTtcclxuICBzLnB1c2goXCLmnIhcIik7XHJcbiAgbGV0IEREID0gZGF0ZS5nZXREYXRlKCk7XHJcbiAgaWYgKEREPDEwKVxyXG4gICAgcy5wdXNoKGNuW0REXSk7XHJcbiAgZWxzZSBpZiAoREQ8MjApXHJcbiAgICBzLnB1c2goXCLljYFcIiArIGNuW0REJSAxMF0pO1xyXG4gIGVsc2VcclxuICAgIHMucHVzaChcIuS6jOWNgVwiICsgY25bREQlIDEwXSk7XHJcbiAgcy5wdXNoKFwi5pelXCIpO1xyXG4gIHJldHVybiBzLmpvaW4oJycpO1xyXG59O1xyXG5cclxuZXhwb3J0IHtmb3JtYXQsIGluc2VydCwgQ05EYXRlU3RyaW5nfTtcclxuIiwiY29uc3QgcmVxID0gYXN5bmMgKHVybCwgbWV0aG9kLCBkYXRhKSA9PiB7XHJcbiAgICByZXR1cm4gKGF3YWl0IGZldGNoKHVybCwge1xyXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IGRhdGEgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IG51bGxcclxuICAgIH0pKS5qc29uKCk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRJbWFnZSA9ICh1cmwpID0+IHtcclxuICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICBpbWFnZS5zcmMgPSB1cmw7XHJcbiAgcmV0dXJuIGltYWdlLmRlY29kZSgpO1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IGdyYXBoUWxRdWVyeSA9IChlbmRwb2ludCwgcXVlcnlTdHIpID0+IHJlcShlbmRwb2ludCwgJ1BPU1QnLCB7cXVlcnk6IHF1ZXJ5U3RyfSk7XHJcblxyXG5leHBvcnQge2dyYXBoUWxRdWVyeSwgcmVxLCBnZXRJbWFnZX07IiwibGV0IHN0b3JlID0gbmV3IE1hcCgpO1xyXG5leHBvcnQge3N0b3JlfTtcclxuXHJcbiIsImV4cG9ydCAqIGZyb20gJy4vZG9tdXRpbCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdHBsdXRpbCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vc3RydXRpbHMnO1xyXG5leHBvcnQgKiBmcm9tICcuL3JlcXV0aWxzJztcclxuZXhwb3J0ICogZnJvbSAnLi9zdG9yZSc7XHJcblxyXG5jb25zdCB1cGRhdGVBcnJFbGUgPSAoYXJyLCBpbmRleCwgdmFsKSA9PiB7XHJcbiAgY29uc3QgY29weSA9IGFyci5zbGljZSgpO1xyXG4gIGNvcHkuc3BsaWNlKGluZGV4LCAxLCB2YWwpO1xyXG4gIHJldHVybiBjb3B5O1xyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICB1cGRhdGVBcnJFbGVcclxufVxyXG4iLCJpbXBvcnQge2RvY1RwbH0gZnJvbSAnQHpob3VqaWFoYW8vdXRpbHMnO1xuXG5jb25zdCBkZXNjID1cbiAgICBgaW5zdGFsbCAtIOWuieijhem7mOiupOWRveS7pO+8jOWIl+WHuuWRveS7pOetiVxuICAgICAgICBpbnN0YWxsICAgICAgICAgICDlronoo4Xpu5jorqTlkb3ku6RcbiAgICAgICAgaW5zdGFsbCAtbCAgICAgICAg5YiX5Ye65Y+v5a6J6KOF55qE6aKd5aSW5ZG95LukXG4gICAgICAgIGluc3RhbGwgPGNtZE5hbWU+IOWuieijheaMh+WumuWRveS7pGA7XG5cbmNvbnN0IGRvYyA9IGRvY1RwbCgnaW5zdGFsbCcsICdpbnN0YWxsIFstbCB8IDxjbWROYW1lPl0nLCBkZXNjKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkb2MsXG4gIHNob3J0b3B0czogJ2wnLFxuICBoYW5kbGVyOiAgYXN5bmMgKHBhcmFtc09iaiwgY21kU2V0LCAkdGVybWluYWwsIHtyZXN0UGFyYW1zOiBjbWROYW1lfSkgPT4ge1xuICAgIGxldCBpc05vUGFyYW1zID0gIXBhcmFtc09iai5sICYmICFjbWROYW1lO1xuXG4gICAgaWYoaXNOb1BhcmFtcykge1xuICAgICAgY29uc3Qge2RlZmF1bHQ6IGNvbW1hbmRzfSA9IGF3YWl0IGltcG9ydCgnLi4vYmFzaWMtY21kJyk7XG4gICAgICB3aW5kb3cuVGVybWluYWwuYWRkQ29tbWFuZHMoY29tbWFuZHMpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgn5oiQ5Yqf5a6J6KOF5ZG95Luk77yM5Y+v6L6T5YWlIGhlbHAg5p+l55yLJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAoY21kTmFtZSkge1xuICAgICAgICBjYXNlICdndWknIDoge1xuICAgICAgICAgIGNvbnN0IHtkZWZhdWx0OiBndWl9ID0gYXdhaXQgaW1wb3J0KCdAemhvdWppYWhhby9ibG9nJyk7XG4gICAgICAgICAgd2luZG93LlRlcm1pbmFsLmFkZENvbW1hbmRzKHtndWl9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG4iLCJpbXBvcnQgaW5zdGFsbCBmcm9tICcuLi9iYXNpYy1jbWQvaW5zdGFsbCc7XHJcbmltcG9ydCB7JH0gZnJvbSAnQHpob3VqaWFoYW8vdXRpbHMnO1xyXG5cclxuY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcclxuICBjb25zdCB7ZGVmYXVsdDogUHNldWRvVGVybWluYWx9ID0gYXdhaXQgaW1wb3J0KCdwc2V1ZG90ZXJtaW5hbCcpO1xyXG4gIGNvbnN0IFRlcm1pbmFsID0gUHNldWRvVGVybWluYWwoJCgnI3Rlcm1pbmFsJykpO1xyXG4gIHdpbmRvdy5UZXJtaW5hbCA9IFRlcm1pbmFsO1xyXG5cclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcclxuICAgIGxldCBpc0NvbW1hbmQgPSBBcnJheS5mcm9tKGV2dC50YXJnZXQuY2xhc3NMaXN0KS5pbmNsdWRlcygnY29tbWFuZCcpO1xyXG4gICAgaWYgKCFpc0NvbW1hbmQpIHJldHVybjtcclxuXHJcbiAgICBsZXQgY29tbWFuZCA9IGV2dC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNtZCcpO1xyXG4gICAgbGV0IGlzTXVsdGkgPSBldnQudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnbXVsdGknKTtcclxuICAgIGxldCB0b0V4ZWMgPSBpc011bHRpID8gY29tbWFuZC5zcGxpdCgvXFxzKiZcXHMqLykgOiBjb21tYW5kO1xyXG4gICAgbGV0IGV4ZWNGbiA9IGlzTXVsdGlcclxuICAgICAgPyAnaHVtYW5pemVyRXhlY0NtZEFycidcclxuICAgICAgOiAnaHVtYW5pemVyRXhlYyc7XHJcblxyXG4gICAgVGVybWluYWxbZXhlY0ZuXSh0b0V4ZWMpO1xyXG4gIH0pO1xyXG5cclxuICBhd2FpdCBUZXJtaW5hbC5hZGRDb21tYW5kcyh7aW5zdGFsbH0pO1xyXG4gIGF3YWl0IFRlcm1pbmFsLmh1bWFuaXplckV4ZWNDbWRBcnIoW1xyXG4gICAgJ2luc3RhbGwnLFxyXG4gICAgLy8gJ2luc3RhbGwgZ3VpJyxcclxuICAgIC8vICdndWknXHJcbiAgXSk7XHJcbiAgaW1wb3J0KC8qIHdlYnBhY2tQcmVmZXRjaDogdHJ1ZSAqLyAnQHpob3VqaWFoYW8vYmxvZy9kaXN0L3ZlbmRvcnN+bWFpbicpXHJcbiAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgIGNvbnN0ICRsaW5rVG9ibG9nID0gJCgnLmxpbmstdG8tYmxvZycpO1xyXG4gICAgICAkbGlua1RvYmxvZy5jbGFzc0xpc3QuYWRkKCdjb21tYW5kJyk7XHJcbiAgICB9KVxyXG59O1xyXG5cclxuaW5pdCgpLnRoZW4oKTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==