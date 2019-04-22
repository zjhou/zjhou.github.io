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
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + "." + {"2":"14b868","3":"4d1e9f","4":"e03199","5":"6be639","6":"23269e","7":"806e94"}[chunkId] + ".js"
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
/******/ 	webpackJsonpCallback([[], {}, 0, [6]]);
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "EYcP");
/******/ })
/************************************************************************/
/******/ ({

/***/ "8RZD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

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

const createNodesFrom = (htmlStr) => {
    let $nodesWrapper = document.createElement('div');
    $nodesWrapper.innerHTML = htmlStr;
    return $nodesWrapper.children;
};

const isElementEmpty = ($ele) => {
    return !($ele.children && $ele.children.length);
};



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

const base64 = {
  decode: (str) => {
    return decodeURIComponent(escape(window.atob(str)));
  },
  encode: str => window.btoa(unescape(encodeURIComponent(str)))
};

const Trim = (str) => {
  if(!str) return "";
  let strArr = str.split('\n'),
    noStartSpace = strArr.filter(str => /^[^-\s].*/.test(str) && str !== '').length > 0;
  if (strArr.length === 1 || noStartSpace) {
    return str;
  }
  else {
    let spaceArr = strArr.map(str => str.match(/^\s+/)).filter(v => v).map(arr => arr[0]);
    let shortestSpaceLen = Math.min.apply(null, spaceArr.map(space => space.length));
    let result = strArr.map(str => str.slice(shortestSpaceLen)).join('\n');
    return result.startsWith("\n")
      ? result.replace("\n", "")
      : result;
  }
};

const today = () => {
  const now = new Date();
  const YYYY = now.getFullYear();

  const mm = now.getMonth() + 1;
  const MM = mm < 10 ? '0' + mm : mm;

  const dd = now.getDate();
  const DD = dd < 10 ? '0' + dd : dd;
  return `${YYYY}-${MM}-${DD}`;
};



// CONCATENATED MODULE: ./node_modules/@zhoujiahao/utils/lib/requtils.js
const req = async (url, method, data, token) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  if (token) {
    headers.append('Authorization', `token ${token}`);
  }

  return (await fetch(url, {
    method: method,
    headers,
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
/* unused harmony export updateArrEle */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return promiseOneByOne; });
/* concated harmony reexport $ */__webpack_require__.d(__webpack_exports__, "a", function() { return $; });
/* unused concated harmony import $$ */
/* concated harmony reexport goto */__webpack_require__.d(__webpack_exports__, "f", function() { return domutil_goto; });
/* unused concated harmony import isElementEmpty */
/* concated harmony reexport createNodesFrom */__webpack_require__.d(__webpack_exports__, "c", function() { return createNodesFrom; });
/* concated harmony reexport link */__webpack_require__.d(__webpack_exports__, "g", function() { return tplutil_link; });
/* concated harmony reexport docTpl */__webpack_require__.d(__webpack_exports__, "d", function() { return docTpl; });
/* concated harmony reexport format */__webpack_require__.d(__webpack_exports__, "e", function() { return format; });
/* unused concated harmony import insert */
/* unused concated harmony import CNDateString */
/* concated harmony reexport base64 */__webpack_require__.d(__webpack_exports__, "b", function() { return base64; });
/* concated harmony reexport today */__webpack_require__.d(__webpack_exports__, "k", function() { return today; });
/* unused concated harmony import Trim */
/* unused concated harmony import graphQlQuery */
/* concated harmony reexport req */__webpack_require__.d(__webpack_exports__, "i", function() { return req; });
/* unused concated harmony import getImage */
/* concated harmony reexport store */__webpack_require__.d(__webpack_exports__, "j", function() { return store; });






/**
 * exec func that return a promise one by one
 * @param funcArr
 * @param cbFn
 * @param extraParams
 * @returns {Promise<...*|*>}
 */
const promiseOneByOne = async (funcArr, cbFn, ...extraParams) => {
  let [first, ...rest] = [...funcArr];
  return rest.reduce(
    async (acc, func, index) => {
      let prevResult = await acc;
      cbFn && typeof cbFn === "function" && cbFn(index + 1);
      return func(prevResult, ...extraParams);
    },
    first().then(() => {
      cbFn && typeof cbFn === "function" && cbFn(0);
    }),
  );
};

const updateArrEle = (arr, index, val) => {
  const copy = arr.slice();
  copy.splice(index, 1, val);
  return copy;
};




/***/ }),

/***/ "EYcP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@zhoujiahao/utils/lib/index.js + 5 modules
var lib = __webpack_require__("8RZD");

// EXTERNAL MODULE: ./app/js/widgets/stepIndicator/style.scss
var style = __webpack_require__("pEpt");

// CONCATENATED MODULE: ./app/js/widgets/stepIndicator/index.js


var defaultConfig = {
  totalStep: 0,
  indicatorColor: '#000',
  indicatorHighlightColor: '#fff',
  x: 0,
  y: 0
};

var stepIndicator_stepIndicator = function stepIndicator(userConfig) {
  var config = Object.assign(defaultConfig, userConfig);

  var mountSelf = function mountSelf() {
    var subIndicatorHTML = "<span>.</span>";
    var indicatorTpl = "\n        <div class=\"step-indicator\">\n            ".concat(subIndicatorHTML.repeat(config.totalStep), "\n        </div>\n    ");
    var $indicator = Object(lib["c" /* createNodesFrom */])(indicatorTpl)[0];
    var styleStr = "position: absolute; top: ".concat(config.y, "; left: ").concat(config.x, "; color: ").concat(config.indicatorColor);
    $indicator.setAttribute('style', styleStr);
    document.body.append($indicator);

    if (config.x === 'center') {
      var _$indicator$getBoundi = $indicator.getBoundingClientRect(),
          width = _$indicator$getBoundi.width;

      $indicator.style.left = "calc(50% - ".concat(width / 2, "px)");
    }

    return $indicator;
  };

  var $indicator = mountSelf();
  return {
    highlightStep: function highlightStep(index) {
      if (index < 0 || index > config.totalStep - 1) {
        return;
      }

      var $step = $indicator.children[index];
      $step.style.color = config.indicatorHighlightColor;
    },
    destroy: function destroy() {
      $indicator.classList.add('done');
      setTimeout(function () {
        $indicator.remove();
        $indicator = null;
      }, 2000);
    }
  };
};

/* harmony default export */ var widgets_stepIndicator = (stepIndicator_stepIndicator);
// CONCATENATED MODULE: ./app/js/main/preInstall.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



/* harmony default export */ var preInstall = (function () {
  return preInstall_ref.apply(this, arguments);
});

function preInstall_ref() {
  preInstall_ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var installVendors, installBasicCmd, installBlog, installEditor, promiseQueue, indicator;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (window.Terminal) {
              _context5.next = 2;
              break;
            }

            return _context5.abrupt("return", false);

          case 2:
            installVendors =
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee() {
                var $linkToBlog;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return __webpack_require__.e(/* import() */ 6).then(__webpack_require__.t.bind(null, "c+U0", 7));

                      case 2:
                        $linkToBlog = Object(lib["a" /* $ */])('.link-to-blog');

                        if ($linkToBlog) {
                          _context.next = 5;
                          break;
                        }

                        return _context.abrupt("return");

                      case 5:
                        $linkToBlog.classList.add('command');

                      case 6:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function installVendors() {
                return _ref2.apply(this, arguments);
              };
            }();

            installBasicCmd =
            /*#__PURE__*/
            function () {
              var _ref3 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee2() {
                var _ref4, commands;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return Promise.all(/* import() */[__webpack_require__.e(3), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, "w74N"));

                      case 2:
                        _ref4 = _context2.sent;
                        commands = _ref4["default"];
                        window.Terminal.addCommands(commands);

                      case 5:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function installBasicCmd() {
                return _ref3.apply(this, arguments);
              };
            }();

            installBlog =
            /*#__PURE__*/
            function () {
              var _ref5 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee3() {
                var _ref6, blog;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return __webpack_require__.e(/* import() */ 5).then(__webpack_require__.t.bind(null, "1yQL", 7));

                      case 2:
                        _ref6 = _context3.sent;
                        blog = _ref6["default"];
                        window.Terminal.addCommands({
                          blog: blog
                        });

                      case 5:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function installBlog() {
                return _ref5.apply(this, arguments);
              };
            }();

            installEditor =
            /*#__PURE__*/
            function () {
              var _ref7 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee4() {
                var _ref8, edit;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return __webpack_require__.e(/* import() */ 2).then(__webpack_require__.bind(null, "zsIg"));

                      case 2:
                        _ref8 = _context4.sent;
                        edit = _ref8["default"];
                        window.Terminal.addCommands({
                          edit: edit
                        });

                      case 5:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function installEditor() {
                return _ref7.apply(this, arguments);
              };
            }();

            promiseQueue = [installVendors, installBasicCmd, installBlog, installEditor];
            indicator = widgets_stepIndicator({
              totalStep: promiseQueue.length,
              indicatorColor: '#ccc',
              x: 'center',
              y: 'calc(40% + 62px)'
            });
            return _context5.abrupt("return", Object(lib["h" /* promiseOneByOne */])(promiseQueue, indicator.highlightStep).then(indicator.destroy));

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return preInstall_ref.apply(this, arguments);
}
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
            return __webpack_require__.e(/* import() */ 7).then(__webpack_require__.t.bind(null, "sedF", 7));

          case 2:
            _ref2 = _context.sent;
            PseudoTerminal = _ref2["default"];
            Terminal = PseudoTerminal(Object(lib["a" /* $ */])('#terminal'));
            window.Terminal = Terminal;
            document.addEventListener('click', function (evt) {
              var isCommand = Array.from(evt.target.classList).includes('command');
              if (!isCommand) return;
              var command = evt.target.getAttribute('data-cmd');
              var isMulti = evt.target.hasAttribute('multi');
              var toExec = isMulti ? command.split(/\s*&&\s*/) : command;
              var execFn = isMulti ? 'humanizerExecCmdArr' : 'humanizerExec';
              evt.target.classList.remove('command');
              Terminal[execFn](toExec).then(function () {
                evt.target.classList.add('command');
              });
            });
            preInstall().then(function () {
              console.log('commands installed');
            });

          case 8:
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

/***/ }),

/***/ "pEpt":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B6aG91amlhaGFvL3V0aWxzL2xpYi9kb211dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AemhvdWppYWhhby91dGlscy9saWIvdHBsdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHpob3VqaWFoYW8vdXRpbHMvbGliL3N0cnV0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AemhvdWppYWhhby91dGlscy9saWIvcmVxdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B6aG91amlhaGFvL3V0aWxzL2xpYi9zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHpob3VqaWFoYW8vdXRpbHMvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2FwcC9qcy93aWRnZXRzL3N0ZXBJbmRpY2F0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL21haW4vcHJlSW5zdGFsbC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvanMvbWFpbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvanMvd2lkZ2V0cy9zdGVwSW5kaWNhdG9yL3N0eWxlLnNjc3MiXSwibmFtZXMiOlsiZGVmYXVsdENvbmZpZyIsInRvdGFsU3RlcCIsImluZGljYXRvckNvbG9yIiwiaW5kaWNhdG9ySGlnaGxpZ2h0Q29sb3IiLCJ4IiwieSIsInN0ZXBJbmRpY2F0b3IiLCJ1c2VyQ29uZmlnIiwiY29uZmlnIiwiT2JqZWN0IiwiYXNzaWduIiwibW91bnRTZWxmIiwic3ViSW5kaWNhdG9ySFRNTCIsImluZGljYXRvclRwbCIsInJlcGVhdCIsIiRpbmRpY2F0b3IiLCJjcmVhdGVOb2Rlc0Zyb20iLCJzdHlsZVN0ciIsInNldEF0dHJpYnV0ZSIsImRvY3VtZW50IiwiYm9keSIsImFwcGVuZCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpZHRoIiwic3R5bGUiLCJsZWZ0IiwiaGlnaGxpZ2h0U3RlcCIsImluZGV4IiwiJHN0ZXAiLCJjaGlsZHJlbiIsImNvbG9yIiwiZGVzdHJveSIsImNsYXNzTGlzdCIsImFkZCIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJ3aW5kb3ciLCJUZXJtaW5hbCIsImluc3RhbGxWZW5kb3JzIiwiJGxpbmtUb0Jsb2ciLCIkIiwiaW5zdGFsbEJhc2ljQ21kIiwiY29tbWFuZHMiLCJhZGRDb21tYW5kcyIsImluc3RhbGxCbG9nIiwiYmxvZyIsImluc3RhbGxFZGl0b3IiLCJlZGl0IiwicHJvbWlzZVF1ZXVlIiwiaW5kaWNhdG9yIiwibGVuZ3RoIiwicHJvbWlzZU9uZUJ5T25lIiwidGhlbiIsImluaXQiLCJQc2V1ZG9UZXJtaW5hbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJpc0NvbW1hbmQiLCJBcnJheSIsImZyb20iLCJ0YXJnZXQiLCJpbmNsdWRlcyIsImNvbW1hbmQiLCJnZXRBdHRyaWJ1dGUiLCJpc011bHRpIiwiaGFzQXR0cmlidXRlIiwidG9FeGVjIiwic3BsaXQiLCJleGVjRm4iLCJpbnN0YWxsQ29tbWFuZHMiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0Esa0RBQTBDLDZCQUE2Qiw4RUFBOEU7QUFDcko7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QVgsQ0FBd0IsT0FBeEIsQ0FBZDtBQUNBLGtCQUFJQyxNQUFNLEdBQUdGLE9BQU8sR0FBR0YsT0FBTyxDQUFDSyxLQUFSLENBQWMsVUFBZCxDQUFILEdBQStCTCxPQUFuRDtBQUNBLGtCQUFJTSxNQUFNLEdBQUdKLE9BQU8sR0FDaEIscUJBRGdCLEdBRWhCLGVBRko7QUFJQVIsaUJBQUcsQ0FBQ0ksTUFBSixDQUFXNUIsU0FBWCxDQUFxQkcsTUFBckIsQ0FBNEIsU0FBNUI7QUFDQUUsc0JBQVEsQ0FBQytCLE1BQUQsQ0FBUixDQUFpQkYsTUFBakIsRUFBeUJkLElBQXpCLENBQThCLFlBQU07QUFDbENJLG1CQUFHLENBQUNJLE1BQUosQ0FBVzVCLFNBQVgsQ0FBcUJDLEdBQXJCLENBQXlCLFNBQXpCO0FBQ0QsZUFGRDtBQUdELGFBZkQ7QUFpQkFvQyxzQkFBZSxHQUFHakIsSUFBbEIsQ0FBdUIsWUFBTTtBQUMzQmtCLHFCQUFPLENBQUNDLEdBQVIsQ0FBWSxvQkFBWjtBQUNELGFBRkQ7O0FBdEJXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQUpsQixJQUFJO0FBQUE7QUFBQTtBQUFBLEdBQVY7O0FBMkJBQSxJQUFJLEdBQUdELElBQVAsRzs7Ozs7OztBQzlCQSx5QyIsImZpbGUiOiJtYWluLmJhMjcyYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXG4gXHRcdHZhciBwcmVmZXRjaENodW5rcyA9IGRhdGFbM10gfHwgW107XG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuIFx0XHQvLyBjaHVuayBwcmVmZXRjaGluZyBmb3IgamF2YXNjcmlwdFxuIFx0XHRwcmVmZXRjaENodW5rcy5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IHVuZGVmaW5lZCkge1xuIFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gbnVsbDtcbiBcdFx0XHRcdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRsaW5rLnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0bGluay5yZWwgPSBcInByZWZldGNoXCI7XG4gXHRcdFx0XHRsaW5rLmFzID0gXCJzY3JpcHRcIjtcbiBcdFx0XHRcdGxpbmsuaHJlZiA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuIFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0fTtcblxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0MDogMFxuIFx0fTtcblxuXG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLlwiICsge1wiMlwiOlwiMTRiODY4XCIsXCIzXCI6XCI0ZDFlOWZcIixcIjRcIjpcImUwMzE5OVwiLFwiNVwiOlwiNmJlNjM5XCIsXCI2XCI6XCIyMzI2OWVcIixcIjdcIjpcIjgwNmU5NFwifVtjaHVua0lkXSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJyk7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0d2VicGFja0pzb25wQ2FsbGJhY2soW1tdLCB7fSwgMCwgWzZdXSk7XG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiRVljUFwiKTtcbiIsImNvbnN0ICQkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbC5iaW5kKGRvY3VtZW50KTtcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpO1xuY29uc3QgZ290byA9ICh1cmwpID0+IHtcbiAgICBsZXQgJHRtcExpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgJHRtcExpbmsuaHJlZiA9IHVybCB8fCAnYWJvdXQ6YmxhbmtldCc7XG4gICAgJHRtcExpbmsudGFyZ2V0ID0gJ19ibGFua2V0JztcbiAgICAkdG1wTGluay5jbGljaygpO1xuICAgICR0bXBMaW5rID0gbnVsbDtcbn07XG5cbmNvbnN0IGNyZWF0ZU5vZGVzRnJvbSA9IChodG1sU3RyKSA9PiB7XG4gICAgbGV0ICRub2Rlc1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAkbm9kZXNXcmFwcGVyLmlubmVySFRNTCA9IGh0bWxTdHI7XG4gICAgcmV0dXJuICRub2Rlc1dyYXBwZXIuY2hpbGRyZW47XG59O1xuXG5jb25zdCBpc0VsZW1lbnRFbXB0eSA9ICgkZWxlKSA9PiB7XG4gICAgcmV0dXJuICEoJGVsZS5jaGlsZHJlbiAmJiAkZWxlLmNoaWxkcmVuLmxlbmd0aCk7XG59O1xuXG5leHBvcnQgeyQsICQkLCBnb3RvLCBpc0VsZW1lbnRFbXB0eSwgY3JlYXRlTm9kZXNGcm9tfTtcbiIsImNvbnN0IGxpbmsgPSAodGV4dCwgc3JjKSA9PiBgPGEgaHJlZj0ke3NyY30gdGFyZ2V0PVwiX2JsYW5rZXRcIiA+JHt0ZXh0fTwvYT5gO1xuY29uc3QgZG9jVHBsID0gKG5hbWUsIHN5bm9wc2lzLCBkZXNjcmlwdGlvbikgPT4gKGBcbiAgICBOQU1FXG4gICAgICAgICR7bmFtZX1cbiAgICAgICAgXG4gICAgU1lOT1BTSVNcbiAgICAgICAgJHtzeW5vcHNpc31cbiAgICAgICAgXG4gICAgREVTQ1JJUFRJT05cbiAgICAgICAgJHtkZXNjcmlwdGlvbn1gKS5yZXBsYWNlKC88L2csICcmbHQ7Jyk7XG5cbmV4cG9ydCB7XG4gICAgbGluayxcbiAgICBkb2NUcGxcbn07IiwiY29uc3QgZm9ybWF0ID0gKG1zZywgLi4uYXJncykgPT4ge1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG1zZztcbiAgICByZXR1cm4gbXNnLnJlcGxhY2UoL3soXFxkKyl9L2csXG4gICAgICAgIChtYXRjaCwgbnVtYmVyKSA9PiAoYXJnc1tudW1iZXJdICE9IG51bGxcbiAgICAgICAgICAgID8gYXJnc1tudW1iZXJdXG4gICAgICAgICAgICA6IG1hdGNoKSk7XG59O1xuY29uc3QgaW5zZXJ0ID0gKHByZWZpeCkgPT4gKHN0cikgPT4gcHJlZml4ICsgc3RyO1xuXG5jb25zdCBDTkRhdGVTdHJpbmcgPSAoZGF0ZSkgPT4ge1xuICBsZXQgY24gPSBbXCLjgIdcIixcIuS4gFwiLFwi5LqMXCIsXCLkuIlcIixcIuWbm1wiLFwi5LqUXCIsXCLlha1cIixcIuS4g1wiLFwi5YWrXCIsXCLkuZ1cIl07XG4gIGxldCBzID0gW107XG4gIGxldCBZWSA9IGRhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpO1xuICBmb3IgKGxldCBpPTA7IGk8WVkubGVuZ3RoOyBpKyspXG4gICAgaWYgKGNuW1lZLmNoYXJBdChpKV0pXG4gICAgICBzLnB1c2goY25bWVkuY2hhckF0KGkpXSk7XG4gICAgZWxzZVxuICAgICAgcy5wdXNoKFlZLmNoYXJBdChpKSk7XG4gIHMucHVzaChcIuW5tFwiKTtcbiAgbGV0IE1NID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgaWYgKE1NPDEwKVxuICAgIHMucHVzaChjbltNTV0pO1xuICBlbHNlIGlmIChNTTwyMClcbiAgICBzLnB1c2goXCLljYFcIiArIGNuW01NJSAxMF0pO1xuICBzLnB1c2goXCLmnIhcIik7XG4gIGxldCBERCA9IGRhdGUuZ2V0RGF0ZSgpO1xuICBpZiAoREQ8MTApXG4gICAgcy5wdXNoKGNuW0REXSk7XG4gIGVsc2UgaWYgKEREPDIwKVxuICAgIHMucHVzaChcIuWNgVwiICsgY25bREQlIDEwXSk7XG4gIGVsc2VcbiAgICBzLnB1c2goXCLkuozljYFcIiArIGNuW0REJSAxMF0pO1xuICBzLnB1c2goXCLml6VcIik7XG4gIHJldHVybiBzLmpvaW4oJycpO1xufTtcblxuY29uc3QgYmFzZTY0ID0ge1xuICBkZWNvZGU6IChzdHIpID0+IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZSh3aW5kb3cuYXRvYihzdHIpKSk7XG4gIH0sXG4gIGVuY29kZTogc3RyID0+IHdpbmRvdy5idG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKSlcbn07XG5cbmNvbnN0IFRyaW0gPSAoc3RyKSA9PiB7XG4gIGlmKCFzdHIpIHJldHVybiBcIlwiO1xuICBsZXQgc3RyQXJyID0gc3RyLnNwbGl0KCdcXG4nKSxcbiAgICBub1N0YXJ0U3BhY2UgPSBzdHJBcnIuZmlsdGVyKHN0ciA9PiAvXlteLVxcc10uKi8udGVzdChzdHIpICYmIHN0ciAhPT0gJycpLmxlbmd0aCA+IDA7XG4gIGlmIChzdHJBcnIubGVuZ3RoID09PSAxIHx8IG5vU3RhcnRTcGFjZSkge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbiAgZWxzZSB7XG4gICAgbGV0IHNwYWNlQXJyID0gc3RyQXJyLm1hcChzdHIgPT4gc3RyLm1hdGNoKC9eXFxzKy8pKS5maWx0ZXIodiA9PiB2KS5tYXAoYXJyID0+IGFyclswXSk7XG4gICAgbGV0IHNob3J0ZXN0U3BhY2VMZW4gPSBNYXRoLm1pbi5hcHBseShudWxsLCBzcGFjZUFyci5tYXAoc3BhY2UgPT4gc3BhY2UubGVuZ3RoKSk7XG4gICAgbGV0IHJlc3VsdCA9IHN0ckFyci5tYXAoc3RyID0+IHN0ci5zbGljZShzaG9ydGVzdFNwYWNlTGVuKSkuam9pbignXFxuJyk7XG4gICAgcmV0dXJuIHJlc3VsdC5zdGFydHNXaXRoKFwiXFxuXCIpXG4gICAgICA/IHJlc3VsdC5yZXBsYWNlKFwiXFxuXCIsIFwiXCIpXG4gICAgICA6IHJlc3VsdDtcbiAgfVxufTtcblxuY29uc3QgdG9kYXkgPSAoKSA9PiB7XG4gIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IFlZWVkgPSBub3cuZ2V0RnVsbFllYXIoKTtcblxuICBjb25zdCBtbSA9IG5vdy5nZXRNb250aCgpICsgMTtcbiAgY29uc3QgTU0gPSBtbSA8IDEwID8gJzAnICsgbW0gOiBtbTtcblxuICBjb25zdCBkZCA9IG5vdy5nZXREYXRlKCk7XG4gIGNvbnN0IEREID0gZGQgPCAxMCA/ICcwJyArIGRkIDogZGQ7XG4gIHJldHVybiBgJHtZWVlZfS0ke01NfS0ke0REfWA7XG59O1xuXG5leHBvcnQge2Zvcm1hdCwgaW5zZXJ0LCBDTkRhdGVTdHJpbmcsIGJhc2U2NCwgdG9kYXksIFRyaW19O1xuIiwiY29uc3QgcmVxID0gYXN5bmMgKHVybCwgbWV0aG9kLCBkYXRhLCB0b2tlbikgPT4ge1xuICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoe1xuICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgfSk7XG5cbiAgaWYgKHRva2VuKSB7XG4gICAgaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBgdG9rZW4gJHt0b2tlbn1gKTtcbiAgfVxuXG4gIHJldHVybiAoYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgbWV0aG9kOiBtZXRob2QsXG4gICAgaGVhZGVycyxcbiAgICBib2R5OiBkYXRhID8gSlNPTi5zdHJpbmdpZnkoZGF0YSkgOiBudWxsXG4gIH0pKS5qc29uKCk7XG59O1xuXG5jb25zdCBnZXRJbWFnZSA9ICh1cmwpID0+IHtcbiAgbGV0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gIGltYWdlLnNyYyA9IHVybDtcbiAgcmV0dXJuIGltYWdlLmRlY29kZSgpO1xufTtcblxuY29uc3QgZ3JhcGhRbFF1ZXJ5ID0gKGVuZHBvaW50LCBxdWVyeVN0cikgPT4gcmVxKGVuZHBvaW50LCAnUE9TVCcsIHtxdWVyeTogcXVlcnlTdHJ9KTtcblxuZXhwb3J0IHtncmFwaFFsUXVlcnksIHJlcSwgZ2V0SW1hZ2V9OyIsImxldCBzdG9yZSA9IG5ldyBNYXAoKTtcbmV4cG9ydCB7c3RvcmV9O1xuXG4iLCJleHBvcnQgKiBmcm9tICcuL2RvbXV0aWwnO1xuZXhwb3J0ICogZnJvbSAnLi90cGx1dGlsJztcbmV4cG9ydCAqIGZyb20gJy4vc3RydXRpbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9yZXF1dGlscyc7XG5leHBvcnQgKiBmcm9tICcuL3N0b3JlJztcblxuLyoqXG4gKiBleGVjIGZ1bmMgdGhhdCByZXR1cm4gYSBwcm9taXNlIG9uZSBieSBvbmVcbiAqIEBwYXJhbSBmdW5jQXJyXG4gKiBAcGFyYW0gY2JGblxuICogQHBhcmFtIGV4dHJhUGFyYW1zXG4gKiBAcmV0dXJucyB7UHJvbWlzZTwuLi4qfCo+fVxuICovXG5jb25zdCBwcm9taXNlT25lQnlPbmUgPSBhc3luYyAoZnVuY0FyciwgY2JGbiwgLi4uZXh0cmFQYXJhbXMpID0+IHtcbiAgbGV0IFtmaXJzdCwgLi4ucmVzdF0gPSBbLi4uZnVuY0Fycl07XG4gIHJldHVybiByZXN0LnJlZHVjZShcbiAgICBhc3luYyAoYWNjLCBmdW5jLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IHByZXZSZXN1bHQgPSBhd2FpdCBhY2M7XG4gICAgICBjYkZuICYmIHR5cGVvZiBjYkZuID09PSBcImZ1bmN0aW9uXCIgJiYgY2JGbihpbmRleCArIDEpO1xuICAgICAgcmV0dXJuIGZ1bmMocHJldlJlc3VsdCwgLi4uZXh0cmFQYXJhbXMpO1xuICAgIH0sXG4gICAgZmlyc3QoKS50aGVuKCgpID0+IHtcbiAgICAgIGNiRm4gJiYgdHlwZW9mIGNiRm4gPT09IFwiZnVuY3Rpb25cIiAmJiBjYkZuKDApO1xuICAgIH0pLFxuICApO1xufTtcblxuY29uc3QgdXBkYXRlQXJyRWxlID0gKGFyciwgaW5kZXgsIHZhbCkgPT4ge1xuICBjb25zdCBjb3B5ID0gYXJyLnNsaWNlKCk7XG4gIGNvcHkuc3BsaWNlKGluZGV4LCAxLCB2YWwpO1xuICByZXR1cm4gY29weTtcbn07XG5cbmV4cG9ydCB7XG4gIHVwZGF0ZUFyckVsZSwgcHJvbWlzZU9uZUJ5T25lLFxufVxuIiwiaW1wb3J0IHtjcmVhdGVOb2Rlc0Zyb219IGZyb20gJ0B6aG91amlhaGFvL3V0aWxzJ1xuaW1wb3J0ICcuL3N0eWxlLnNjc3MnXG5cbmNvbnN0IGRlZmF1bHRDb25maWcgPSB7XG4gIHRvdGFsU3RlcDogMCxcbiAgaW5kaWNhdG9yQ29sb3I6ICcjMDAwJyxcbiAgaW5kaWNhdG9ySGlnaGxpZ2h0Q29sb3I6ICcjZmZmJyxcbiAgeDogMCxcbiAgeTogMCxcbn07XG5cbmNvbnN0IHN0ZXBJbmRpY2F0b3IgPSBmdW5jdGlvbiAodXNlckNvbmZpZykge1xuICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRDb25maWcsIHVzZXJDb25maWcpO1xuICBjb25zdCBtb3VudFNlbGYgPSAoKSA9PiB7XG4gICAgY29uc3Qgc3ViSW5kaWNhdG9ySFRNTCA9IGA8c3Bhbj4uPC9zcGFuPmA7XG4gICAgY29uc3QgaW5kaWNhdG9yVHBsID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwic3RlcC1pbmRpY2F0b3JcIj5cbiAgICAgICAgICAgICR7c3ViSW5kaWNhdG9ySFRNTC5yZXBlYXQoY29uZmlnLnRvdGFsU3RlcCl9XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgY29uc3QgJGluZGljYXRvciA9IGNyZWF0ZU5vZGVzRnJvbShpbmRpY2F0b3JUcGwpWzBdO1xuICAgIGNvbnN0IHN0eWxlU3RyID0gYHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAke2NvbmZpZy55fTsgbGVmdDogJHtjb25maWcueH07IGNvbG9yOiAke2NvbmZpZy5pbmRpY2F0b3JDb2xvcn1gO1xuICAgICRpbmRpY2F0b3Iuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlU3RyKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZCgkaW5kaWNhdG9yKTtcbiAgICBpZiAoY29uZmlnLnggPT09ICdjZW50ZXInKSB7XG4gICAgICBjb25zdCB7IHdpZHRoIH0gPSAkaW5kaWNhdG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgJGluZGljYXRvci5zdHlsZS5sZWZ0ID0gYGNhbGMoNTAlIC0gJHt3aWR0aCAvIDJ9cHgpYFxuICAgIH1cbiAgICByZXR1cm4gJGluZGljYXRvcjtcbiAgfTtcblxuICBsZXQgJGluZGljYXRvciA9IG1vdW50U2VsZigpO1xuICByZXR1cm4ge1xuICAgIGhpZ2hsaWdodFN0ZXAoaW5kZXgpIHtcbiAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiBjb25maWcudG90YWxTdGVwIC0gMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCAkc3RlcCA9ICRpbmRpY2F0b3IuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgJHN0ZXAuc3R5bGUuY29sb3IgPSBjb25maWcuaW5kaWNhdG9ySGlnaGxpZ2h0Q29sb3I7XG4gICAgfSxcbiAgICBkZXN0cm95KCkge1xuICAgICAgJGluZGljYXRvci5jbGFzc0xpc3QuYWRkKCdkb25lJyk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgJGluZGljYXRvci5yZW1vdmUoKTtcbiAgICAgICAgJGluZGljYXRvciA9IG51bGw7XG4gICAgICB9LCAyMDAwKVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgc3RlcEluZGljYXRvcjsiLCJpbXBvcnQgeyBwcm9taXNlT25lQnlPbmUsICQgfSBmcm9tIFwiQHpob3VqaWFoYW8vdXRpbHNcIlxuaW1wb3J0IHN0ZXBJbmRpY2F0b3IgZnJvbSAnLi4vd2lkZ2V0cy9zdGVwSW5kaWNhdG9yLydcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oKSB7XG4gIGlmKCF3aW5kb3cuVGVybWluYWwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBpbnN0YWxsVmVuZG9ycyA9IGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBpbXBvcnQoLyogd2VicGFja1ByZWZldGNoOiB0cnVlICovICdAemhvdWppYWhhby9ibG9nL2Rpc3QvdmVuZG9yc35tYWluJyk7XG4gICAgY29uc3QgJGxpbmtUb0Jsb2cgPSAkKCcubGluay10by1ibG9nJyk7XG4gICAgaWYgKCEkbGlua1RvQmxvZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkbGlua1RvQmxvZy5jbGFzc0xpc3QuYWRkKCdjb21tYW5kJyk7XG4gIH07XG5cbiAgY29uc3QgaW5zdGFsbEJhc2ljQ21kID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHtkZWZhdWx0OiBjb21tYW5kc30gPSBhd2FpdCBpbXBvcnQoJy4uL2Jhc2ljLWNtZCcpO1xuICAgIHdpbmRvdy5UZXJtaW5hbC5hZGRDb21tYW5kcyhjb21tYW5kcyk7XG4gIH07XG5cbiAgY29uc3QgaW5zdGFsbEJsb2cgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3Qge2RlZmF1bHQ6IGJsb2d9ID0gYXdhaXQgaW1wb3J0KCdAemhvdWppYWhhby9ibG9nJyk7XG4gICAgd2luZG93LlRlcm1pbmFsLmFkZENvbW1hbmRzKHtibG9nfSk7XG4gIH07XG5cbiAgY29uc3QgaW5zdGFsbEVkaXRvciA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB7ZGVmYXVsdDogZWRpdH0gPSBhd2FpdCBpbXBvcnQoJ0B6aG91amlhaGFvL2VkaXRvcicpO1xuICAgIHdpbmRvdy5UZXJtaW5hbC5hZGRDb21tYW5kcyh7ZWRpdH0pO1xuICB9O1xuXG4gIGNvbnN0IHByb21pc2VRdWV1ZSA9IFtcbiAgICBpbnN0YWxsVmVuZG9ycyxcbiAgICBpbnN0YWxsQmFzaWNDbWQsXG4gICAgaW5zdGFsbEJsb2csXG4gICAgaW5zdGFsbEVkaXRvclxuICBdO1xuXG4gIGNvbnN0IGluZGljYXRvciA9IHN0ZXBJbmRpY2F0b3Ioe1xuICAgIHRvdGFsU3RlcDogcHJvbWlzZVF1ZXVlLmxlbmd0aCxcbiAgICBpbmRpY2F0b3JDb2xvcjogJyNjY2MnLFxuICAgIHg6ICdjZW50ZXInLFxuICAgIHk6ICdjYWxjKDQwJSArIDYycHgpJyxcbiAgfSk7XG5cbiAgcmV0dXJuIHByb21pc2VPbmVCeU9uZShwcm9taXNlUXVldWUsIGluZGljYXRvci5oaWdobGlnaHRTdGVwKS50aGVuKGluZGljYXRvci5kZXN0cm95KVxufSIsImltcG9ydCB7JH0gZnJvbSAnQHpob3VqaWFoYW8vdXRpbHMnO1xyXG5pbXBvcnQgaW5zdGFsbENvbW1hbmRzIGZyb20gJy4vcHJlSW5zdGFsbCc7XHJcblxyXG5jb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHtkZWZhdWx0OiBQc2V1ZG9UZXJtaW5hbH0gPSBhd2FpdCBpbXBvcnQoJ3BzZXVkb3Rlcm1pbmFsJyk7XHJcbiAgY29uc3QgVGVybWluYWwgPSBQc2V1ZG9UZXJtaW5hbCgkKCcjdGVybWluYWwnKSk7XHJcbiAgd2luZG93LlRlcm1pbmFsID0gVGVybWluYWw7XHJcblxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgbGV0IGlzQ29tbWFuZCA9IEFycmF5LmZyb20oZXZ0LnRhcmdldC5jbGFzc0xpc3QpLmluY2x1ZGVzKCdjb21tYW5kJyk7XHJcbiAgICBpZiAoIWlzQ29tbWFuZCkgcmV0dXJuO1xyXG5cclxuICAgIGxldCBjb21tYW5kID0gZXZ0LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY21kJyk7XHJcbiAgICBsZXQgaXNNdWx0aSA9IGV2dC50YXJnZXQuaGFzQXR0cmlidXRlKCdtdWx0aScpO1xyXG4gICAgbGV0IHRvRXhlYyA9IGlzTXVsdGkgPyBjb21tYW5kLnNwbGl0KC9cXHMqJiZcXHMqLykgOiBjb21tYW5kO1xyXG4gICAgbGV0IGV4ZWNGbiA9IGlzTXVsdGlcclxuICAgICAgPyAnaHVtYW5pemVyRXhlY0NtZEFycidcclxuICAgICAgOiAnaHVtYW5pemVyRXhlYyc7XHJcblxyXG4gICAgZXZ0LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdjb21tYW5kJyk7XHJcbiAgICBUZXJtaW5hbFtleGVjRm5dKHRvRXhlYykudGhlbigoKSA9PiB7XHJcbiAgICAgIGV2dC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnY29tbWFuZCcpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGluc3RhbGxDb21tYW5kcygpLnRoZW4oKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ2NvbW1hbmRzIGluc3RhbGxlZCcpO1xyXG4gIH0pXHJcbn07XHJcblxyXG5pbml0KCkudGhlbigpO1xyXG4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=