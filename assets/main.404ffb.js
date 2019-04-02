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
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + "." + {"2":"de0bb4","3":"f14072","4":"c7c971","5":"0162eb","6":"06268a"}[chunkId] + ".js"
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
              evt.target.classList.remove('command');
              Terminal[execFn](toExec).then(function () {
                evt.target.classList.add('command');
              });
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

              if (location.host === 'blog.zjh.im') {
                Terminal.humanizerExecCmdArr(['install gui', 'gui']);
              }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B6aG91amlhaGFvL3V0aWxzL2xpYi9kb211dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AemhvdWppYWhhby91dGlscy9saWIvdHBsdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHpob3VqaWFoYW8vdXRpbHMvbGliL3N0cnV0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AemhvdWppYWhhby91dGlscy9saWIvcmVxdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B6aG91amlhaGFvL3V0aWxzL2xpYi9zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHpob3VqaWFoYW8vdXRpbHMvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2FwcC9qcy9iYXNpYy1jbWQvaW5zdGFsbC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvanMvbWFpbi9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZXNjIiwiZG9jIiwiZG9jVHBsIiwic2hvcnRvcHRzIiwiaGFuZGxlciIsInBhcmFtc09iaiIsImNtZFNldCIsIiR0ZXJtaW5hbCIsImNtZE5hbWUiLCJyZXN0UGFyYW1zIiwiaXNOb1BhcmFtcyIsImwiLCJjb21tYW5kcyIsImRlZmF1bHQiLCJ3aW5kb3ciLCJUZXJtaW5hbCIsImFkZENvbW1hbmRzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJndWkiLCJpbml0IiwiUHNldWRvVGVybWluYWwiLCIkIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZ0IiwiaXNDb21tYW5kIiwiQXJyYXkiLCJmcm9tIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiaW5jbHVkZXMiLCJjb21tYW5kIiwiZ2V0QXR0cmlidXRlIiwiaXNNdWx0aSIsImhhc0F0dHJpYnV0ZSIsInRvRXhlYyIsInNwbGl0IiwiZXhlY0ZuIiwicmVtb3ZlIiwidGhlbiIsImFkZCIsImluc3RhbGwiLCJodW1hbml6ZXJFeGVjQ21kQXJyIiwiJGxpbmtUb2Jsb2ciLCJsb2NhdGlvbiIsImhvc3QiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSxrREFBMEMsNkJBQTZCLGlFQUFpRTtBQUN4STs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0EseUNBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQXdCLGtDQUFrQztBQUMxRCxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Es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UUFBUSxDQUFDQyxXQUFULENBQXFCO0FBQUMwQixxQkFBTyxFQUFQQSxPQUFPQTtBQUFSLGFBQXJCLENBdEJLOztBQUFBO0FBQUE7QUFBQSxtQkF1QkwzQixRQUFRLENBQUM0QixtQkFBVCxDQUE2QixDQUNqQyxTQURpQyxDQUE3QixDQXZCSzs7QUFBQTtBQTBCWCxzR0FDR0gsSUFESCxDQUNRLFlBQU07QUFDVixrQkFBTUksV0FBVyxHQUFHdEIsQ0FBQyxDQUFDLGVBQUQsQ0FBckI7QUFDQXNCLHlCQUFXLENBQUNkLFNBQVosQ0FBc0JXLEdBQXRCLENBQTBCLFNBQTFCOztBQUVBLGtCQUFJSSxRQUFRLENBQUNDLElBQVQsS0FBa0IsYUFBdEIsRUFBcUM7QUFDbkMvQix3QkFBUSxDQUFDNEIsbUJBQVQsQ0FBNkIsQ0FDM0IsYUFEMkIsRUFFM0IsS0FGMkIsQ0FBN0I7QUFLRDtBQUNGLGFBWkg7O0FBMUJXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQUp2QixJQUFJO0FBQUE7QUFBQTtBQUFBLEdBQVY7O0FBeUNBQSxJQUFJLEdBQUdvQixJQUFQLEciLCJmaWxlIjoibWFpbi40MDRmZmIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuIFx0XHR2YXIgcHJlZmV0Y2hDaHVua3MgPSBkYXRhWzNdIHx8IFtdO1xuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcbiBcdFx0Ly8gY2h1bmsgcHJlZmV0Y2hpbmcgZm9yIGphdmFzY3JpcHRcbiBcdFx0cHJlZmV0Y2hDaHVua3MuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSB1bmRlZmluZWQpIHtcbiBcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IG51bGw7XG4gXHRcdFx0XHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGxpbmsucmVsID0gXCJwcmVmZXRjaFwiO1xuIFx0XHRcdFx0bGluay5hcyA9IFwic2NyaXB0XCI7XG4gXHRcdFx0XHRsaW5rLmhyZWYgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdH07XG5cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdDA6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5cIiArIHtcIjJcIjpcImRlMGJiNFwiLFwiM1wiOlwiZjE0MDcyXCIsXCI0XCI6XCJjN2M5NzFcIixcIjVcIjpcIjAxNjJlYlwiLFwiNlwiOlwiMDYyNjhhXCJ9W2NodW5rSWRdICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknKTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHR3ZWJwYWNrSnNvbnBDYWxsYmFjayhbW10sIHt9LCAwLCBbNV1dKTtcbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCJFWWNQXCIpO1xuIiwiY29uc3QgJCQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsLmJpbmQoZG9jdW1lbnQpO1xyXG5jb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KTtcclxuY29uc3QgZ290byA9ICh1cmwpID0+IHtcclxuICAgIGxldCAkdG1wTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICR0bXBMaW5rLmhyZWYgPSB1cmwgfHwgJ2Fib3V0OmJsYW5rZXQnO1xyXG4gICAgJHRtcExpbmsudGFyZ2V0ID0gJ19ibGFua2V0JztcclxuICAgICR0bXBMaW5rLmNsaWNrKCk7XHJcbiAgICAkdG1wTGluayA9IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBpc0VsZW1lbnRFbXB0eSA9ICgkZWxlKSA9PiB7XHJcbiAgICByZXR1cm4gISgkZWxlLmNoaWxkcmVuICYmICRlbGUuY2hpbGRyZW4ubGVuZ3RoKTtcclxufVxyXG5leHBvcnQgeyQsICQkLCBnb3RvLCBpc0VsZW1lbnRFbXB0eX07XHJcbiIsImNvbnN0IGxpbmsgPSAodGV4dCwgc3JjKSA9PiBgPGEgaHJlZj0ke3NyY30gdGFyZ2V0PVwiX2JsYW5rZXRcIiA+JHt0ZXh0fTwvYT5gO1xyXG5jb25zdCBkb2NUcGwgPSAobmFtZSwgc3lub3BzaXMsIGRlc2NyaXB0aW9uKSA9PiAoYFxyXG4gICAgTkFNRVxyXG4gICAgICAgICR7bmFtZX1cclxuICAgICAgICBcclxuICAgIFNZTk9QU0lTXHJcbiAgICAgICAgJHtzeW5vcHNpc31cclxuICAgICAgICBcclxuICAgIERFU0NSSVBUSU9OXHJcbiAgICAgICAgJHtkZXNjcmlwdGlvbn1gKS5yZXBsYWNlKC88L2csICcmbHQ7Jyk7XHJcblxyXG5leHBvcnQge1xyXG4gICAgbGluayxcclxuICAgIGRvY1RwbFxyXG59OyIsImNvbnN0IGZvcm1hdCA9IChtc2csIC4uLmFyZ3MpID0+IHtcclxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG1zZztcclxuICAgIHJldHVybiBtc2cucmVwbGFjZSgveyhcXGQrKX0vZyxcclxuICAgICAgICAobWF0Y2gsIG51bWJlcikgPT4gKGFyZ3NbbnVtYmVyXSAhPSBudWxsXHJcbiAgICAgICAgICAgID8gYXJnc1tudW1iZXJdXHJcbiAgICAgICAgICAgIDogbWF0Y2gpKTtcclxufTtcclxuY29uc3QgaW5zZXJ0ID0gKHByZWZpeCkgPT4gKHN0cikgPT4gcHJlZml4ICsgc3RyO1xyXG5cclxuY29uc3QgQ05EYXRlU3RyaW5nID0gKGRhdGUpID0+IHtcclxuICBsZXQgY24gPSBbXCLjgIdcIixcIuS4gFwiLFwi5LqMXCIsXCLkuIlcIixcIuWbm1wiLFwi5LqUXCIsXCLlha1cIixcIuS4g1wiLFwi5YWrXCIsXCLkuZ1cIl07XHJcbiAgbGV0IHMgPSBbXTtcclxuICBsZXQgWVkgPSBkYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKTtcclxuICBmb3IgKGxldCBpPTA7IGk8WVkubGVuZ3RoOyBpKyspXHJcbiAgICBpZiAoY25bWVkuY2hhckF0KGkpXSlcclxuICAgICAgcy5wdXNoKGNuW1lZLmNoYXJBdChpKV0pO1xyXG4gICAgZWxzZVxyXG4gICAgICBzLnB1c2goWVkuY2hhckF0KGkpKTtcclxuICBzLnB1c2goXCLlubRcIik7XHJcbiAgbGV0IE1NID0gZGF0ZS5nZXRNb250aCgpICsgMTtcclxuICBpZiAoTU08MTApXHJcbiAgICBzLnB1c2goY25bTU1dKTtcclxuICBlbHNlIGlmIChNTTwyMClcclxuICAgIHMucHVzaChcIuWNgVwiICsgY25bTU0lIDEwXSk7XHJcbiAgcy5wdXNoKFwi5pyIXCIpO1xyXG4gIGxldCBERCA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gIGlmIChERDwxMClcclxuICAgIHMucHVzaChjbltERF0pO1xyXG4gIGVsc2UgaWYgKEREPDIwKVxyXG4gICAgcy5wdXNoKFwi5Y2BXCIgKyBjbltERCUgMTBdKTtcclxuICBlbHNlXHJcbiAgICBzLnB1c2goXCLkuozljYFcIiArIGNuW0REJSAxMF0pO1xyXG4gIHMucHVzaChcIuaXpVwiKTtcclxuICByZXR1cm4gcy5qb2luKCcnKTtcclxufTtcclxuXHJcbmV4cG9ydCB7Zm9ybWF0LCBpbnNlcnQsIENORGF0ZVN0cmluZ307XHJcbiIsImNvbnN0IHJlcSA9IGFzeW5jICh1cmwsIG1ldGhvZCwgZGF0YSkgPT4ge1xyXG4gICAgcmV0dXJuIChhd2FpdCBmZXRjaCh1cmwsIHtcclxuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBkYXRhID8gSlNPTi5zdHJpbmdpZnkoZGF0YSkgOiBudWxsXHJcbiAgICB9KSkuanNvbigpO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0SW1hZ2UgPSAodXJsKSA9PiB7XHJcbiAgbGV0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgaW1hZ2Uuc3JjID0gdXJsO1xyXG4gIHJldHVybiBpbWFnZS5kZWNvZGUoKTtcclxufTtcclxuXHJcblxyXG5jb25zdCBncmFwaFFsUXVlcnkgPSAoZW5kcG9pbnQsIHF1ZXJ5U3RyKSA9PiByZXEoZW5kcG9pbnQsICdQT1NUJywge3F1ZXJ5OiBxdWVyeVN0cn0pO1xyXG5cclxuZXhwb3J0IHtncmFwaFFsUXVlcnksIHJlcSwgZ2V0SW1hZ2V9OyIsImxldCBzdG9yZSA9IG5ldyBNYXAoKTtcclxuZXhwb3J0IHtzdG9yZX07XHJcblxyXG4iLCJleHBvcnQgKiBmcm9tICcuL2RvbXV0aWwnO1xyXG5leHBvcnQgKiBmcm9tICcuL3RwbHV0aWwnO1xyXG5leHBvcnQgKiBmcm9tICcuL3N0cnV0aWxzJztcclxuZXhwb3J0ICogZnJvbSAnLi9yZXF1dGlscyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vc3RvcmUnO1xyXG5cclxuY29uc3QgdXBkYXRlQXJyRWxlID0gKGFyciwgaW5kZXgsIHZhbCkgPT4ge1xyXG4gIGNvbnN0IGNvcHkgPSBhcnIuc2xpY2UoKTtcclxuICBjb3B5LnNwbGljZShpbmRleCwgMSwgdmFsKTtcclxuICByZXR1cm4gY29weTtcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgdXBkYXRlQXJyRWxlXHJcbn1cclxuIiwiaW1wb3J0IHtkb2NUcGx9IGZyb20gJ0B6aG91amlhaGFvL3V0aWxzJztcblxuY29uc3QgZGVzYyA9XG4gICAgYGluc3RhbGwgLSDlronoo4Xpu5jorqTlkb3ku6TvvIzliJflh7rlkb3ku6TnrYlcbiAgICAgICAgaW5zdGFsbCAgICAgICAgICAg5a6J6KOF6buY6K6k5ZG95LukXG4gICAgICAgIGluc3RhbGwgLWwgICAgICAgIOWIl+WHuuWPr+WuieijheeahOmineWkluWRveS7pFxuICAgICAgICBpbnN0YWxsIDxjbWROYW1lPiDlronoo4XmjIflrprlkb3ku6RgO1xuXG5jb25zdCBkb2MgPSBkb2NUcGwoJ2luc3RhbGwnLCAnaW5zdGFsbCBbLWwgfCA8Y21kTmFtZT5dJywgZGVzYyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZG9jLFxuICBzaG9ydG9wdHM6ICdsJyxcbiAgaGFuZGxlcjogIGFzeW5jIChwYXJhbXNPYmosIGNtZFNldCwgJHRlcm1pbmFsLCB7cmVzdFBhcmFtczogY21kTmFtZX0pID0+IHtcbiAgICBsZXQgaXNOb1BhcmFtcyA9ICFwYXJhbXNPYmoubCAmJiAhY21kTmFtZTtcblxuICAgIGlmKGlzTm9QYXJhbXMpIHtcbiAgICAgIGNvbnN0IHtkZWZhdWx0OiBjb21tYW5kc30gPSBhd2FpdCBpbXBvcnQoJy4uL2Jhc2ljLWNtZCcpO1xuICAgICAgd2luZG93LlRlcm1pbmFsLmFkZENvbW1hbmRzKGNvbW1hbmRzKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoJ+aIkOWKn+WuieijheWRveS7pO+8jOWPr+i+k+WFpSBoZWxwIOafpeeciycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGNtZE5hbWUpIHtcbiAgICAgICAgY2FzZSAnZ3VpJyA6IHtcbiAgICAgICAgICBjb25zdCB7ZGVmYXVsdDogZ3VpfSA9IGF3YWl0IGltcG9ydCgnQHpob3VqaWFoYW8vYmxvZycpO1xuICAgICAgICAgIHdpbmRvdy5UZXJtaW5hbC5hZGRDb21tYW5kcyh7Z3VpfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxufTtcblxuIiwiaW1wb3J0IGluc3RhbGwgZnJvbSAnLi4vYmFzaWMtY21kL2luc3RhbGwnO1xyXG5pbXBvcnQgeyR9IGZyb20gJ0B6aG91amlhaGFvL3V0aWxzJztcclxuXHJcbmNvbnN0IGluaXQgPSBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3Qge2RlZmF1bHQ6IFBzZXVkb1Rlcm1pbmFsfSA9IGF3YWl0IGltcG9ydCgncHNldWRvdGVybWluYWwnKTtcclxuICBjb25zdCBUZXJtaW5hbCA9IFBzZXVkb1Rlcm1pbmFsKCQoJyN0ZXJtaW5hbCcpKTtcclxuICB3aW5kb3cuVGVybWluYWwgPSBUZXJtaW5hbDtcclxuXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICBsZXQgaXNDb21tYW5kID0gQXJyYXkuZnJvbShldnQudGFyZ2V0LmNsYXNzTGlzdCkuaW5jbHVkZXMoJ2NvbW1hbmQnKTtcclxuICAgIGlmICghaXNDb21tYW5kKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGNvbW1hbmQgPSBldnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jbWQnKTtcclxuICAgIGxldCBpc011bHRpID0gZXZ0LnRhcmdldC5oYXNBdHRyaWJ1dGUoJ211bHRpJyk7XHJcbiAgICBsZXQgdG9FeGVjID0gaXNNdWx0aSA/IGNvbW1hbmQuc3BsaXQoL1xccyomXFxzKi8pIDogY29tbWFuZDtcclxuICAgIGxldCBleGVjRm4gPSBpc011bHRpXHJcbiAgICAgID8gJ2h1bWFuaXplckV4ZWNDbWRBcnInXHJcbiAgICAgIDogJ2h1bWFuaXplckV4ZWMnO1xyXG5cclxuICAgIGV2dC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnY29tbWFuZCcpO1xyXG4gICAgVGVybWluYWxbZXhlY0ZuXSh0b0V4ZWMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICBldnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2NvbW1hbmQnKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICBhd2FpdCBUZXJtaW5hbC5hZGRDb21tYW5kcyh7aW5zdGFsbH0pO1xyXG4gIGF3YWl0IFRlcm1pbmFsLmh1bWFuaXplckV4ZWNDbWRBcnIoW1xyXG4gICAgJ2luc3RhbGwnLFxyXG4gIF0pO1xyXG4gIGltcG9ydCgvKiB3ZWJwYWNrUHJlZmV0Y2g6IHRydWUgKi8gJ0B6aG91amlhaGFvL2Jsb2cvZGlzdC92ZW5kb3Jzfm1haW4nKVxyXG4gICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICBjb25zdCAkbGlua1RvYmxvZyA9ICQoJy5saW5rLXRvLWJsb2cnKTtcclxuICAgICAgJGxpbmtUb2Jsb2cuY2xhc3NMaXN0LmFkZCgnY29tbWFuZCcpO1xyXG5cclxuICAgICAgaWYgKGxvY2F0aW9uLmhvc3QgPT09ICdibG9nLnpqaC5pbScpIHtcclxuICAgICAgICBUZXJtaW5hbC5odW1hbml6ZXJFeGVjQ21kQXJyKFtcclxuICAgICAgICAgICdpbnN0YWxsIGd1aScsXHJcbiAgICAgICAgICAnZ3VpJ1xyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgfVxyXG4gICAgfSlcclxufTtcclxuXHJcbmluaXQoKS50aGVuKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=