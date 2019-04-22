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
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		0: 0
/******/ 	}
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
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + "." + {"2":"81fcca","3":"85ed65","4":"39fa5a","5":"6be639","6":"23269e","7":"260982"}[chunkId] + ".js"
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
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"2":1,"3":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "" + ({}[chunkId]||chunkId) + "." + {"2":"81fcca","3":"85ed65","4":"39fa5a","5":"6be639","6":"23269e","7":"260982"}[chunkId] + ".min.css";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = function(event) {
/******/ 					var request = event && event.target && event.target.src || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.request = request;
/******/ 					delete installedCssChunks[chunkId]
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				};
/******/ 				linkTag.href = fullhref;
/******/
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
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

/***/ "1EKS":
/***/ (function(module, exports, __webpack_require__) {

var require;var require;!function(e){if(true)module.exports=e();else { var t; }}(function(){return function e(t,n,r){function o(u,a){if(!n[u]){if(!t[u]){var f="function"==typeof require&&require;if(!a&&f)return require(u,!0);if(i)return i(u,!0);throw new Error("Cannot find module '"+u+"'")}var s=n[u]={exports:{}};t[u][0].call(s.exports,function(e){var n=t[u][1][e];return o(n?n:e)},s,s.exports,e,t,n,r)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,t,n){(function(r,o,i,u,a,f,s,c,l){"use strict";function d(e,t){return t=h(e,t),g(e,t)}function h(e,t){if(t=t||{},t.algorithm=t.algorithm||"sha1",t.encoding=t.encoding||"hex",t.excludeValues=!!t.excludeValues,t.algorithm=t.algorithm.toLowerCase(),t.encoding=t.encoding.toLowerCase(),t.ignoreUnknown=t.ignoreUnknown===!0,t.respectType=t.respectType!==!1,t.respectFunctionNames=t.respectFunctionNames!==!1,t.respectFunctionProperties=t.respectFunctionProperties!==!1,t.unorderedArrays=t.unorderedArrays===!0,t.unorderedSets=t.unorderedSets!==!1,t.unorderedObjects=t.unorderedObjects!==!1,t.replacer=t.replacer||void 0,t.excludeKeys=t.excludeKeys||void 0,"undefined"==typeof e)throw new Error("Object argument required.");for(var n=0;n<v.length;++n)v[n].toLowerCase()===t.algorithm.toLowerCase()&&(t.algorithm=v[n]);if(v.indexOf(t.algorithm)===-1)throw new Error('Algorithm "'+t.algorithm+'"  not supported. supported values: '+v.join(", "));if(m.indexOf(t.encoding)===-1&&"passthrough"!==t.algorithm)throw new Error('Encoding "'+t.encoding+'"  not supported. supported values: '+m.join(", "));return t}function p(e){if("function"!=typeof e)return!1;var t=/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i;return null!=t.exec(Function.prototype.toString.call(e))}function g(e,t){var n;n="passthrough"!==t.algorithm?b.createHash(t.algorithm):new w,"undefined"==typeof n.write&&(n.write=n.update,n.end=n.update);var r=y(t,n);if(r.dispatch(e),n.update||n.end(""),n.digest)return n.digest("buffer"===t.encoding?void 0:t.encoding);var o=n.read();return"buffer"===t.encoding?o:o.toString(t.encoding)}function y(e,t,n){n=n||[];var r=function(e){return t.update?t.update(e,"utf8"):t.write(e,"utf8")};return{dispatch:function(t){e.replacer&&(t=e.replacer(t));var n=typeof t;return null===t&&(n="null"),this["_"+n](t)},_object:function(t){var o=/\[object (.*)\]/i,u=Object.prototype.toString.call(t),a=o.exec(u);a=a?a[1]:"unknown:["+u+"]",a=a.toLowerCase();var f=null;if((f=n.indexOf(t))>=0)return this.dispatch("[CIRCULAR:"+f+"]");if(n.push(t),"undefined"!=typeof i&&i.isBuffer&&i.isBuffer(t))return r("buffer:"),r(t);if("object"===a||"function"===a){var s=Object.keys(t);e.unorderedObjects&&(s=s.sort()),e.respectType===!1||p(t)||s.splice(0,0,"prototype","__proto__","constructor"),e.excludeKeys&&(s=s.filter(function(t){return!e.excludeKeys(t)})),r("object:"+s.length+":");var c=this;return s.forEach(function(n){c.dispatch(n),r(":"),e.excludeValues||c.dispatch(t[n]),r(",")})}if(!this["_"+a]){if(e.ignoreUnknown)return r("["+a+"]");throw new Error('Unknown object type "'+a+'"')}this["_"+a](t)},_array:function(t,o){o="undefined"!=typeof o?o:e.unorderedArrays!==!1;var i=this;if(r("array:"+t.length+":"),!o||t.length<=1)return t.forEach(function(e){return i.dispatch(e)});var u=[],a=t.map(function(t){var r=new w,o=n.slice(),i=y(e,r,o);return i.dispatch(t),u=u.concat(o.slice(n.length)),r.read().toString()});return n=n.concat(u),a.sort(),this._array(a,!1)},_date:function(e){return r("date:"+e.toJSON())},_symbol:function(e){return r("symbol:"+e.toString())},_error:function(e){return r("error:"+e.toString())},_boolean:function(e){return r("bool:"+e.toString())},_string:function(e){r("string:"+e.length+":"),r(e.toString())},_function:function(t){r("fn:"),p(t)?this.dispatch("[native]"):this.dispatch(t.toString()),e.respectFunctionNames!==!1&&this.dispatch("function-name:"+String(t.name)),e.respectFunctionProperties&&this._object(t)},_number:function(e){return r("number:"+e.toString())},_xml:function(e){return r("xml:"+e.toString())},_null:function(){return r("Null")},_undefined:function(){return r("Undefined")},_regexp:function(e){return r("regex:"+e.toString())},_uint8array:function(e){return r("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint8clampedarray:function(e){return r("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(e))},_int8array:function(e){return r("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint16array:function(e){return r("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_int16array:function(e){return r("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_uint32array:function(e){return r("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_int32array:function(e){return r("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_float32array:function(e){return r("float32array:"),this.dispatch(Array.prototype.slice.call(e))},_float64array:function(e){return r("float64array:"),this.dispatch(Array.prototype.slice.call(e))},_arraybuffer:function(e){return r("arraybuffer:"),this.dispatch(new Uint8Array(e))},_url:function(e){return r("url:"+e.toString(),"utf8")},_map:function(t){r("map:");var n=Array.from(t);return this._array(n,e.unorderedSets!==!1)},_set:function(t){r("set:");var n=Array.from(t);return this._array(n,e.unorderedSets!==!1)},_blob:function(){if(e.ignoreUnknown)return r("[blob]");throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n')},_domwindow:function(){return r("domwindow")},_process:function(){return r("process")},_timer:function(){return r("timer")},_pipe:function(){return r("pipe")},_tcp:function(){return r("tcp")},_udp:function(){return r("udp")},_tty:function(){return r("tty")},_statwatcher:function(){return r("statwatcher")},_securecontext:function(){return r("securecontext")},_connection:function(){return r("connection")},_zlib:function(){return r("zlib")},_context:function(){return r("context")},_nodescript:function(){return r("nodescript")},_httpparser:function(){return r("httpparser")},_dataview:function(){return r("dataview")},_signal:function(){return r("signal")},_fsevent:function(){return r("fsevent")},_tlswrap:function(){return r("tlswrap")}}}function w(){return{buf:"",write:function(e){this.buf+=e},end:function(e){this.buf+=e},read:function(){return this.buf}}}var b=e("crypto");n=t.exports=d,n.sha1=function(e){return d(e)},n.keys=function(e){return d(e,{excludeValues:!0,algorithm:"sha1",encoding:"hex"})},n.MD5=function(e){return d(e,{algorithm:"md5",encoding:"hex"})},n.keysMD5=function(e){return d(e,{algorithm:"md5",encoding:"hex",excludeValues:!0})};var v=b.getHashes?b.getHashes().slice():["sha1","md5"];v.push("passthrough");var m=["buffer","hex","binary","base64"];n.writeToStream=function(e,t,n){return"undefined"==typeof n&&(n=t,t={}),t=h(e,t),y(t,n).dispatch(e)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_e8180ef5.js","/")},{buffer:3,crypto:5,lYpoI2:10}],2:[function(e,t,n){(function(e,t,r,o,i,u,a,f,s){var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(e){"use strict";function t(e){var t=e.charCodeAt(0);return t===i||t===l?62:t===u||t===d?63:t<a?-1:t<a+10?t-a+26+26:t<s+26?t-s:t<f+26?t-f+26:void 0}function n(e){function n(e){s[l++]=e}var r,i,u,a,f,s;if(e.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var c=e.length;f="="===e.charAt(c-2)?2:"="===e.charAt(c-1)?1:0,s=new o(3*e.length/4-f),u=f>0?e.length-4:e.length;var l=0;for(r=0,i=0;r<u;r+=4,i+=3)a=t(e.charAt(r))<<18|t(e.charAt(r+1))<<12|t(e.charAt(r+2))<<6|t(e.charAt(r+3)),n((16711680&a)>>16),n((65280&a)>>8),n(255&a);return 2===f?(a=t(e.charAt(r))<<2|t(e.charAt(r+1))>>4,n(255&a)):1===f&&(a=t(e.charAt(r))<<10|t(e.charAt(r+1))<<4|t(e.charAt(r+2))>>2,n(a>>8&255),n(255&a)),s}function r(e){function t(e){return c.charAt(e)}function n(e){return t(e>>18&63)+t(e>>12&63)+t(e>>6&63)+t(63&e)}var r,o,i,u=e.length%3,a="";for(r=0,i=e.length-u;r<i;r+=3)o=(e[r]<<16)+(e[r+1]<<8)+e[r+2],a+=n(o);switch(u){case 1:o=e[e.length-1],a+=t(o>>2),a+=t(o<<4&63),a+="==";break;case 2:o=(e[e.length-2]<<8)+e[e.length-1],a+=t(o>>10),a+=t(o>>4&63),a+=t(o<<2&63),a+="="}return a}var o="undefined"!=typeof Uint8Array?Uint8Array:Array,i="+".charCodeAt(0),u="/".charCodeAt(0),a="0".charCodeAt(0),f="a".charCodeAt(0),s="A".charCodeAt(0),l="-".charCodeAt(0),d="_".charCodeAt(0);e.toByteArray=n,e.fromByteArray=r}("undefined"==typeof n?this.base64js={}:n)}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js","/node_modules/gulp-browserify/node_modules/base64-js/lib")},{buffer:3,lYpoI2:10}],3:[function(e,t,n){(function(t,r,o,i,u,a,f,s,c){function o(e,t,n){if(!(this instanceof o))return new o(e,t,n);var r=typeof e;if("base64"===t&&"string"===r)for(e=N(e);e.length%4!==0;)e+="=";var i;if("number"===r)i=F(e);else if("string"===r)i=o.byteLength(e,t);else{if("object"!==r)throw new Error("First argument needs to be a number, array or string.");i=F(e.length)}var u;o._useTypedArrays?u=o._augment(new Uint8Array(i)):(u=this,u.length=i,u._isBuffer=!0);var a;if(o._useTypedArrays&&"number"==typeof e.byteLength)u._set(e);else if(O(e))for(a=0;a<i;a++)o.isBuffer(e)?u[a]=e.readUInt8(a):u[a]=e[a];else if("string"===r)u.write(e,0,t);else if("number"===r&&!o._useTypedArrays&&!n)for(a=0;a<i;a++)u[a]=0;return u}function l(e,t,n,r){n=Number(n)||0;var i=e.length-n;r?(r=Number(r),r>i&&(r=i)):r=i;var u=t.length;$(u%2===0,"Invalid hex string"),r>u/2&&(r=u/2);for(var a=0;a<r;a++){var f=parseInt(t.substr(2*a,2),16);$(!isNaN(f),"Invalid hex string"),e[n+a]=f}return o._charsWritten=2*a,a}function d(e,t,n,r){var i=o._charsWritten=W(V(t),e,n,r);return i}function h(e,t,n,r){var i=o._charsWritten=W(q(t),e,n,r);return i}function p(e,t,n,r){return h(e,t,n,r)}function g(e,t,n,r){var i=o._charsWritten=W(R(t),e,n,r);return i}function y(e,t,n,r){var i=o._charsWritten=W(P(t),e,n,r);return i}function w(e,t,n){return 0===t&&n===e.length?G.fromByteArray(e):G.fromByteArray(e.slice(t,n))}function b(e,t,n){var r="",o="";n=Math.min(e.length,n);for(var i=t;i<n;i++)e[i]<=127?(r+=J(o)+String.fromCharCode(e[i]),o=""):o+="%"+e[i].toString(16);return r+J(o)}function v(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;o<n;o++)r+=String.fromCharCode(e[o]);return r}function m(e,t,n){return v(e,t,n)}function _(e,t,n){var r=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>r)&&(n=r);for(var o="",i=t;i<n;i++)o+=H(e[i]);return o}function E(e,t,n){for(var r=e.slice(t,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function I(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(i=e[t],t+1<o&&(i|=e[t+1]<<8)):(i=e[t]<<8,t+1<o&&(i|=e[t+1])),i}}function A(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(t+2<o&&(i=e[t+2]<<16),t+1<o&&(i|=e[t+1]<<8),i|=e[t],t+3<o&&(i+=e[t+3]<<24>>>0)):(t+1<o&&(i=e[t+1]<<16),t+2<o&&(i|=e[t+2]<<8),t+3<o&&(i|=e[t+3]),i+=e[t]<<24>>>0),i}}function B(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=I(e,t,n,!0),u=32768&i;return u?(65535-i+1)*-1:i}}function L(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=A(e,t,n,!0),u=2147483648&i;return u?(4294967295-i+1)*-1:i}}function U(e,t,n,r){return r||($("boolean"==typeof n,"missing or invalid endian"),$(t+3<e.length,"Trying to read beyond buffer length")),Q.read(e,t,n,23,4)}function x(e,t,n,r){return r||($("boolean"==typeof n,"missing or invalid endian"),$(t+7<e.length,"Trying to read beyond buffer length")),Q.read(e,t,n,52,8)}function S(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+1<e.length,"trying to write beyond buffer length"),K(t,65535));var i=e.length;if(!(n>=i))for(var u=0,a=Math.min(i-n,2);u<a;u++)e[n+u]=(t&255<<8*(r?u:1-u))>>>8*(r?u:1-u)}function j(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+3<e.length,"trying to write beyond buffer length"),K(t,4294967295));var i=e.length;if(!(n>=i))for(var u=0,a=Math.min(i-n,4);u<a;u++)e[n+u]=t>>>8*(r?u:3-u)&255}function C(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+1<e.length,"Trying to write beyond buffer length"),z(t,32767,-32768));var i=e.length;n>=i||(t>=0?S(e,t,n,r,o):S(e,65535+t+1,n,r,o))}function k(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+3<e.length,"Trying to write beyond buffer length"),z(t,2147483647,-2147483648));var i=e.length;n>=i||(t>=0?j(e,t,n,r,o):j(e,4294967295+t+1,n,r,o))}function T(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+3<e.length,"Trying to write beyond buffer length"),X(t,3.4028234663852886e38,-3.4028234663852886e38));var i=e.length;n>=i||Q.write(e,t,n,r,23,4)}function M(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+7<e.length,"Trying to write beyond buffer length"),X(t,1.7976931348623157e308,-1.7976931348623157e308));var i=e.length;n>=i||Q.write(e,t,n,r,52,8)}function N(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function Y(e,t,n){return"number"!=typeof e?n:(e=~~e,e>=t?t:e>=0?e:(e+=t,e>=0?e:0))}function F(e){return e=~~Math.ceil(+e),e<0?0:e}function D(e){return(Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)})(e)}function O(e){return D(e)||o.isBuffer(e)||e&&"object"==typeof e&&"number"==typeof e.length}function H(e){return e<16?"0"+e.toString(16):e.toString(16)}function V(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<=127)t.push(e.charCodeAt(n));else{var o=n;r>=55296&&r<=57343&&n++;for(var i=encodeURIComponent(e.slice(o,n+1)).substr(1).split("%"),u=0;u<i.length;u++)t.push(parseInt(i[u],16))}}return t}function q(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t}function P(e){for(var t,n,r,o=[],i=0;i<e.length;i++)t=e.charCodeAt(i),n=t>>8,r=t%256,o.push(r),o.push(n);return o}function R(e){return G.toByteArray(e)}function W(e,t,n,r){for(var o=0;o<r&&!(o+n>=t.length||o>=e.length);o++)t[o+n]=e[o];return o}function J(e){try{return decodeURIComponent(e)}catch(t){return String.fromCharCode(65533)}}function K(e,t){$("number"==typeof e,"cannot write a non-number as a number"),$(e>=0,"specified a negative value for writing an unsigned value"),$(e<=t,"value is larger than maximum value for type"),$(Math.floor(e)===e,"value has a fractional component")}function z(e,t,n){$("number"==typeof e,"cannot write a non-number as a number"),$(e<=t,"value larger than maximum allowed value"),$(e>=n,"value smaller than minimum allowed value"),$(Math.floor(e)===e,"value has a fractional component")}function X(e,t,n){$("number"==typeof e,"cannot write a non-number as a number"),$(e<=t,"value larger than maximum allowed value"),$(e>=n,"value smaller than minimum allowed value")}function $(e,t){if(!e)throw new Error(t||"Failed assertion")}var G=e("base64-js"),Q=e("ieee754");n.Buffer=o,n.SlowBuffer=o,n.INSPECT_MAX_BYTES=50,o.poolSize=8192,o._useTypedArrays=function(){try{var e=new ArrayBuffer(0),t=new Uint8Array(e);return t.foo=function(){return 42},42===t.foo()&&"function"==typeof t.subarray}catch(n){return!1}}(),o.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.isBuffer=function(e){return!(null===e||void 0===e||!e._isBuffer)},o.byteLength=function(e,t){var n;switch(e+="",t||"utf8"){case"hex":n=e.length/2;break;case"utf8":case"utf-8":n=V(e).length;break;case"ascii":case"binary":case"raw":n=e.length;break;case"base64":n=R(e).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*e.length;break;default:throw new Error("Unknown encoding")}return n},o.concat=function(e,t){if($(D(e),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===e.length)return new o(0);if(1===e.length)return e[0];var n;if("number"!=typeof t)for(t=0,n=0;n<e.length;n++)t+=e[n].length;var r=new o(t),i=0;for(n=0;n<e.length;n++){var u=e[n];u.copy(r,i),i+=u.length}return r},o.prototype.write=function(e,t,n,r){if(isFinite(t))isFinite(n)||(r=n,n=void 0);else{var o=r;r=t,t=n,n=o}t=Number(t)||0;var i=this.length-t;n?(n=Number(n),n>i&&(n=i)):n=i,r=String(r||"utf8").toLowerCase();var u;switch(r){case"hex":u=l(this,e,t,n);break;case"utf8":case"utf-8":u=d(this,e,t,n);break;case"ascii":u=h(this,e,t,n);break;case"binary":u=p(this,e,t,n);break;case"base64":u=g(this,e,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":u=y(this,e,t,n);break;default:throw new Error("Unknown encoding")}return u},o.prototype.toString=function(e,t,n){var r=this;if(e=String(e||"utf8").toLowerCase(),t=Number(t)||0,n=void 0!==n?Number(n):n=r.length,n===t)return"";var o;switch(e){case"hex":o=_(r,t,n);break;case"utf8":case"utf-8":o=b(r,t,n);break;case"ascii":o=v(r,t,n);break;case"binary":o=m(r,t,n);break;case"base64":o=w(r,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":o=E(r,t,n);break;default:throw new Error("Unknown encoding")}return o},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},o.prototype.copy=function(e,t,n,r){var i=this;if(n||(n=0),r||0===r||(r=this.length),t||(t=0),r!==n&&0!==e.length&&0!==i.length){$(r>=n,"sourceEnd < sourceStart"),$(t>=0&&t<e.length,"targetStart out of bounds"),$(n>=0&&n<i.length,"sourceStart out of bounds"),$(r>=0&&r<=i.length,"sourceEnd out of bounds"),r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);var u=r-n;if(u<100||!o._useTypedArrays)for(var a=0;a<u;a++)e[a+t]=this[a+n];else e._set(this.subarray(n,n+u),t)}},o.prototype.slice=function(e,t){var n=this.length;if(e=Y(e,n,0),t=Y(t,n,n),o._useTypedArrays)return o._augment(this.subarray(e,t));for(var r=t-e,i=new o(r,(void 0),(!0)),u=0;u<r;u++)i[u]=this[u+e];return i},o.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},o.prototype.set=function(e,t){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,t)},o.prototype.readUInt8=function(e,t){if(t||($(void 0!==e&&null!==e,"missing offset"),$(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length))return this[e]},o.prototype.readUInt16LE=function(e,t){return I(this,e,!0,t)},o.prototype.readUInt16BE=function(e,t){return I(this,e,!1,t)},o.prototype.readUInt32LE=function(e,t){return A(this,e,!0,t)},o.prototype.readUInt32BE=function(e,t){return A(this,e,!1,t)},o.prototype.readInt8=function(e,t){if(t||($(void 0!==e&&null!==e,"missing offset"),$(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length)){var n=128&this[e];return n?(255-this[e]+1)*-1:this[e]}},o.prototype.readInt16LE=function(e,t){return B(this,e,!0,t)},o.prototype.readInt16BE=function(e,t){return B(this,e,!1,t)},o.prototype.readInt32LE=function(e,t){return L(this,e,!0,t)},o.prototype.readInt32BE=function(e,t){return L(this,e,!1,t)},o.prototype.readFloatLE=function(e,t){return U(this,e,!0,t)},o.prototype.readFloatBE=function(e,t){return U(this,e,!1,t)},o.prototype.readDoubleLE=function(e,t){return x(this,e,!0,t)},o.prototype.readDoubleBE=function(e,t){return x(this,e,!1,t)},o.prototype.writeUInt8=function(e,t,n){n||($(void 0!==e&&null!==e,"missing value"),$(void 0!==t&&null!==t,"missing offset"),$(t<this.length,"trying to write beyond buffer length"),K(e,255)),t>=this.length||(this[t]=e)},o.prototype.writeUInt16LE=function(e,t,n){S(this,e,t,!0,n)},o.prototype.writeUInt16BE=function(e,t,n){S(this,e,t,!1,n)},o.prototype.writeUInt32LE=function(e,t,n){j(this,e,t,!0,n)},o.prototype.writeUInt32BE=function(e,t,n){j(this,e,t,!1,n)},o.prototype.writeInt8=function(e,t,n){n||($(void 0!==e&&null!==e,"missing value"),$(void 0!==t&&null!==t,"missing offset"),$(t<this.length,"Trying to write beyond buffer length"),z(e,127,-128)),t>=this.length||(e>=0?this.writeUInt8(e,t,n):this.writeUInt8(255+e+1,t,n))},o.prototype.writeInt16LE=function(e,t,n){C(this,e,t,!0,n)},o.prototype.writeInt16BE=function(e,t,n){C(this,e,t,!1,n)},o.prototype.writeInt32LE=function(e,t,n){k(this,e,t,!0,n)},o.prototype.writeInt32BE=function(e,t,n){k(this,e,t,!1,n)},o.prototype.writeFloatLE=function(e,t,n){T(this,e,t,!0,n)},o.prototype.writeFloatBE=function(e,t,n){T(this,e,t,!1,n)},o.prototype.writeDoubleLE=function(e,t,n){M(this,e,t,!0,n)},o.prototype.writeDoubleBE=function(e,t,n){M(this,e,t,!1,n)},o.prototype.fill=function(e,t,n){if(e||(e=0),t||(t=0),n||(n=this.length),"string"==typeof e&&(e=e.charCodeAt(0)),$("number"==typeof e&&!isNaN(e),"value is not a number"),$(n>=t,"end < start"),n!==t&&0!==this.length){$(t>=0&&t<this.length,"start out of bounds"),$(n>=0&&n<=this.length,"end out of bounds");for(var r=t;r<n;r++)this[r]=e}},o.prototype.inspect=function(){for(var e=[],t=this.length,r=0;r<t;r++)if(e[r]=H(this[r]),r===n.INSPECT_MAX_BYTES){e[r+1]="...";break}return"<Buffer "+e.join(" ")+">"},o.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(o._useTypedArrays)return new o(this).buffer;for(var e=new Uint8Array(this.length),t=0,n=e.length;t<n;t+=1)e[t]=this[t];return e.buffer}throw new Error("Buffer.toArrayBuffer not supported in this browser")};var Z=o.prototype;o._augment=function(e){return e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=Z.get,e.set=Z.set,e.write=Z.write,e.toString=Z.toString,e.toLocaleString=Z.toString,e.toJSON=Z.toJSON,e.copy=Z.copy,e.slice=Z.slice,e.readUInt8=Z.readUInt8,e.readUInt16LE=Z.readUInt16LE,e.readUInt16BE=Z.readUInt16BE,e.readUInt32LE=Z.readUInt32LE,e.readUInt32BE=Z.readUInt32BE,e.readInt8=Z.readInt8,e.readInt16LE=Z.readInt16LE,e.readInt16BE=Z.readInt16BE,e.readInt32LE=Z.readInt32LE,e.readInt32BE=Z.readInt32BE,e.readFloatLE=Z.readFloatLE,e.readFloatBE=Z.readFloatBE,e.readDoubleLE=Z.readDoubleLE,e.readDoubleBE=Z.readDoubleBE,e.writeUInt8=Z.writeUInt8,e.writeUInt16LE=Z.writeUInt16LE,e.writeUInt16BE=Z.writeUInt16BE,e.writeUInt32LE=Z.writeUInt32LE,e.writeUInt32BE=Z.writeUInt32BE,e.writeInt8=Z.writeInt8,e.writeInt16LE=Z.writeInt16LE,e.writeInt16BE=Z.writeInt16BE,e.writeInt32LE=Z.writeInt32LE,e.writeInt32BE=Z.writeInt32BE,e.writeFloatLE=Z.writeFloatLE,e.writeFloatBE=Z.writeFloatBE,e.writeDoubleLE=Z.writeDoubleLE,e.writeDoubleBE=Z.writeDoubleBE,e.fill=Z.fill,e.inspect=Z.inspect,e.toArrayBuffer=Z.toArrayBuffer,e}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/buffer/index.js","/node_modules/gulp-browserify/node_modules/buffer")},{"base64-js":2,buffer:3,ieee754:11,lYpoI2:10}],4:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){if(e.length%p!==0){var n=e.length+(p-e.length%p);e=o.concat([e,g],n)}for(var r=[],i=t?e.readInt32BE:e.readInt32LE,u=0;u<e.length;u+=p)r.push(i.call(e,u));return r}function d(e,t,n){for(var r=new o(t),i=n?r.writeInt32BE:r.writeInt32LE,u=0;u<e.length;u++)i.call(r,e[u],4*u,!0);return r}function h(e,t,n,r){o.isBuffer(e)||(e=new o(e));var i=t(l(e,r),e.length*y);return d(i,n,r)}var o=e("buffer").Buffer,p=4,g=new o(p);g.fill(0);var y=8;t.exports={hash:h}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:10}],5:[function(e,t,n){(function(t,r,o,i,u,a,f,s,c){function l(e,t,n){o.isBuffer(t)||(t=new o(t)),o.isBuffer(n)||(n=new o(n)),t.length>m?t=e(t):t.length<m&&(t=o.concat([t,_],m));for(var r=new o(m),i=new o(m),u=0;u<m;u++)r[u]=54^t[u],i[u]=92^t[u];var a=e(o.concat([r,n]));return e(o.concat([i,a]))}function d(e,t){e=e||"sha1";var n=v[e],r=[],i=0;return n||h("algorithm:",e,"is not yet supported"),{update:function(e){return o.isBuffer(e)||(e=new o(e)),r.push(e),i+=e.length,this},digest:function(e){var i=o.concat(r),u=t?l(n,t,i):n(i);return r=null,e?u.toString(e):u}}}function h(){var e=[].slice.call(arguments).join(" ");throw new Error([e,"we accept pull requests","http://github.com/dominictarr/crypto-browserify"].join("\n"))}function p(e,t){for(var n in e)t(e[n],n)}var o=e("buffer").Buffer,g=e("./sha"),y=e("./sha256"),w=e("./rng"),b=e("./md5"),v={sha1:g,sha256:y,md5:b},m=64,_=new o(m);_.fill(0),n.createHash=function(e){return d(e)},n.createHmac=function(e,t){return d(e,t)},n.randomBytes=function(e,t){if(!t||!t.call)return new o(w(e));try{t.call(this,void 0,new o(w(e)))}catch(n){t(n)}},p(["createCredentials","createCipher","createCipheriv","createDecipher","createDecipheriv","createSign","createVerify","createDiffieHellman","pbkdf2"],function(e){n[e]=function(){h("sorry,",e,"is not implemented yet")}})}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./md5":6,"./rng":7,"./sha":8,"./sha256":9,buffer:3,lYpoI2:10}],6:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){e[t>>5]|=128<<t%32,e[(t+64>>>9<<4)+14]=t;for(var n=1732584193,r=-271733879,o=-1732584194,i=271733878,u=0;u<e.length;u+=16){var a=n,f=r,s=o,c=i;n=h(n,r,o,i,e[u+0],7,-680876936),i=h(i,n,r,o,e[u+1],12,-389564586),o=h(o,i,n,r,e[u+2],17,606105819),r=h(r,o,i,n,e[u+3],22,-1044525330),n=h(n,r,o,i,e[u+4],7,-176418897),i=h(i,n,r,o,e[u+5],12,1200080426),o=h(o,i,n,r,e[u+6],17,-1473231341),r=h(r,o,i,n,e[u+7],22,-45705983),n=h(n,r,o,i,e[u+8],7,1770035416),i=h(i,n,r,o,e[u+9],12,-1958414417),o=h(o,i,n,r,e[u+10],17,-42063),r=h(r,o,i,n,e[u+11],22,-1990404162),n=h(n,r,o,i,e[u+12],7,1804603682),i=h(i,n,r,o,e[u+13],12,-40341101),o=h(o,i,n,r,e[u+14],17,-1502002290),r=h(r,o,i,n,e[u+15],22,1236535329),n=p(n,r,o,i,e[u+1],5,-165796510),i=p(i,n,r,o,e[u+6],9,-1069501632),o=p(o,i,n,r,e[u+11],14,643717713),r=p(r,o,i,n,e[u+0],20,-373897302),n=p(n,r,o,i,e[u+5],5,-701558691),i=p(i,n,r,o,e[u+10],9,38016083),o=p(o,i,n,r,e[u+15],14,-660478335),r=p(r,o,i,n,e[u+4],20,-405537848),n=p(n,r,o,i,e[u+9],5,568446438),i=p(i,n,r,o,e[u+14],9,-1019803690),o=p(o,i,n,r,e[u+3],14,-187363961),r=p(r,o,i,n,e[u+8],20,1163531501),n=p(n,r,o,i,e[u+13],5,-1444681467),i=p(i,n,r,o,e[u+2],9,-51403784),o=p(o,i,n,r,e[u+7],14,1735328473),r=p(r,o,i,n,e[u+12],20,-1926607734),n=g(n,r,o,i,e[u+5],4,-378558),i=g(i,n,r,o,e[u+8],11,-2022574463),o=g(o,i,n,r,e[u+11],16,1839030562),r=g(r,o,i,n,e[u+14],23,-35309556),n=g(n,r,o,i,e[u+1],4,-1530992060),i=g(i,n,r,o,e[u+4],11,1272893353),o=g(o,i,n,r,e[u+7],16,-155497632),r=g(r,o,i,n,e[u+10],23,-1094730640),n=g(n,r,o,i,e[u+13],4,681279174),i=g(i,n,r,o,e[u+0],11,-358537222),o=g(o,i,n,r,e[u+3],16,-722521979),r=g(r,o,i,n,e[u+6],23,76029189),n=g(n,r,o,i,e[u+9],4,-640364487),i=g(i,n,r,o,e[u+12],11,-421815835),o=g(o,i,n,r,e[u+15],16,530742520),r=g(r,o,i,n,e[u+2],23,-995338651),n=y(n,r,o,i,e[u+0],6,-198630844),i=y(i,n,r,o,e[u+7],10,1126891415),o=y(o,i,n,r,e[u+14],15,-1416354905),r=y(r,o,i,n,e[u+5],21,-57434055),n=y(n,r,o,i,e[u+12],6,1700485571),i=y(i,n,r,o,e[u+3],10,-1894986606),o=y(o,i,n,r,e[u+10],15,-1051523),r=y(r,o,i,n,e[u+1],21,-2054922799),n=y(n,r,o,i,e[u+8],6,1873313359),i=y(i,n,r,o,e[u+15],10,-30611744),o=y(o,i,n,r,e[u+6],15,-1560198380),r=y(r,o,i,n,e[u+13],21,1309151649),n=y(n,r,o,i,e[u+4],6,-145523070),i=y(i,n,r,o,e[u+11],10,-1120210379),o=y(o,i,n,r,e[u+2],15,718787259),r=y(r,o,i,n,e[u+9],21,-343485551),n=w(n,a),r=w(r,f),o=w(o,s),i=w(i,c)}return Array(n,r,o,i)}function d(e,t,n,r,o,i){return w(b(w(w(t,e),w(r,i)),o),n)}function h(e,t,n,r,o,i,u){return d(t&n|~t&r,e,t,o,i,u)}function p(e,t,n,r,o,i,u){return d(t&r|n&~r,e,t,o,i,u)}function g(e,t,n,r,o,i,u){return d(t^n^r,e,t,o,i,u)}function y(e,t,n,r,o,i,u){return d(n^(t|~r),e,t,o,i,u)}function w(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}function b(e,t){return e<<t|e>>>32-t}var v=e("./helpers");t.exports=function(e){return v.hash(e,l,16)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],7:[function(e,t,n){(function(e,n,r,o,i,u,a,f,s){!function(){var e,n,r=this;e=function(e){for(var t,t,n=new Array(e),r=0;r<e;r++)0==(3&r)&&(t=4294967296*Math.random()),n[r]=t>>>((3&r)<<3)&255;return n},r.crypto&&crypto.getRandomValues&&(n=function(e){var t=new Uint8Array(e);return crypto.getRandomValues(t),t}),t.exports=n||e}()}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:10}],8:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){e[t>>5]|=128<<24-t%32,e[(t+64>>9<<4)+15]=t;for(var n=Array(80),r=1732584193,o=-271733879,i=-1732584194,u=271733878,a=-1009589776,f=0;f<e.length;f+=16){for(var s=r,c=o,l=i,y=u,w=a,b=0;b<80;b++){b<16?n[b]=e[f+b]:n[b]=g(n[b-3]^n[b-8]^n[b-14]^n[b-16],1);var v=p(p(g(r,5),d(b,o,i,u)),p(p(a,n[b]),h(b)));a=u,u=i,i=g(o,30),o=r,r=v}r=p(r,s),o=p(o,c),i=p(i,l),u=p(u,y),a=p(a,w)}return Array(r,o,i,u,a)}function d(e,t,n,r){return e<20?t&n|~t&r:e<40?t^n^r:e<60?t&n|t&r|n&r:t^n^r}function h(e){return e<20?1518500249:e<40?1859775393:e<60?-1894007588:-899497514}function p(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}function g(e,t){return e<<t|e>>>32-t}var y=e("./helpers");t.exports=function(e){return y.hash(e,l,20,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],9:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){var l=e("./helpers"),d=function(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n},h=function(e,t){return e>>>t|e<<32-t},p=function(e,t){return e>>>t},g=function(e,t,n){return e&t^~e&n},y=function(e,t,n){return e&t^e&n^t&n},w=function(e){return h(e,2)^h(e,13)^h(e,22);
},b=function(e){return h(e,6)^h(e,11)^h(e,25)},v=function(e){return h(e,7)^h(e,18)^p(e,3)},m=function(e){return h(e,17)^h(e,19)^p(e,10)},_=function(e,t){var n,r,o,i,u,a,f,s,c,l,h,p,_=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298),E=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225),I=new Array(64);e[t>>5]|=128<<24-t%32,e[(t+64>>9<<4)+15]=t;for(var c=0;c<e.length;c+=16){n=E[0],r=E[1],o=E[2],i=E[3],u=E[4],a=E[5],f=E[6],s=E[7];for(var l=0;l<64;l++)l<16?I[l]=e[l+c]:I[l]=d(d(d(m(I[l-2]),I[l-7]),v(I[l-15])),I[l-16]),h=d(d(d(d(s,b(u)),g(u,a,f)),_[l]),I[l]),p=d(w(n),y(n,r,o)),s=f,f=a,a=u,u=d(i,h),i=o,o=r,r=n,n=d(h,p);E[0]=d(n,E[0]),E[1]=d(r,E[1]),E[2]=d(o,E[2]),E[3]=d(i,E[3]),E[4]=d(u,E[4]),E[5]=d(a,E[5]),E[6]=d(f,E[6]),E[7]=d(s,E[7])}return E};t.exports=function(e){return l.hash(e,_,32,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],10:[function(e,t,n){(function(e,n,r,o,i,u,a,f,s){function c(){}var e=t.exports={};e.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};if(t){var n=[];return window.addEventListener("message",function(e){var t=e.source;if((t===window||null===t)&&"process-tick"===e.data&&(e.stopPropagation(),n.length>0)){var r=n.shift();r()}},!0),function(e){n.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),e.title="browser",e.browser=!0,e.env={},e.argv=[],e.on=c,e.addListener=c,e.once=c,e.off=c,e.removeListener=c,e.removeAllListeners=c,e.emit=c,e.binding=function(e){throw new Error("process.binding is not supported")},e.cwd=function(){return"/"},e.chdir=function(e){throw new Error("process.chdir is not supported")}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/process/browser.js","/node_modules/gulp-browserify/node_modules/process")},{buffer:3,lYpoI2:10}],11:[function(e,t,n){(function(e,t,r,o,i,u,a,f,s){n.read=function(e,t,n,r,o){var i,u,a=8*o-r-1,f=(1<<a)-1,s=f>>1,c=-7,l=n?o-1:0,d=n?-1:1,h=e[t+l];for(l+=d,i=h&(1<<-c)-1,h>>=-c,c+=a;c>0;i=256*i+e[t+l],l+=d,c-=8);for(u=i&(1<<-c)-1,i>>=-c,c+=r;c>0;u=256*u+e[t+l],l+=d,c-=8);if(0===i)i=1-s;else{if(i===f)return u?NaN:(h?-1:1)*(1/0);u+=Math.pow(2,r),i-=s}return(h?-1:1)*u*Math.pow(2,i-r)},n.write=function(e,t,n,r,o,i){var u,a,f,s=8*i-o-1,c=(1<<s)-1,l=c>>1,d=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,h=r?0:i-1,p=r?1:-1,g=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,u=c):(u=Math.floor(Math.log(t)/Math.LN2),t*(f=Math.pow(2,-u))<1&&(u--,f*=2),t+=u+l>=1?d/f:d*Math.pow(2,1-l),t*f>=2&&(u++,f/=2),u+l>=c?(a=0,u=c):u+l>=1?(a=(t*f-1)*Math.pow(2,o),u+=l):(a=t*Math.pow(2,l-1)*Math.pow(2,o),u=0));o>=8;e[n+h]=255&a,h+=p,a/=256,o-=8);for(u=u<<o|a,s+=o;s>0;e[n+h]=255&u,h+=p,u/=256,s-=8);e[n+h-p]|=128*g}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/ieee754/index.js","/node_modules/ieee754")},{buffer:3,lYpoI2:10}]},{},[1])(1)});

/***/ }),

/***/ "4oWf":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

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
/**
 * 文档模板
 * @param {string} name 命令名称行，如，ls - 列出博文列表
 * @param synopsis 语法行，如，blog [-e]
 * @param description 描述行，描述命令功能等等
 * @returns {string}
 */
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

const makeTextSpinner = (cb, textArr, timeout) => {
  var text = textArr || ['-', '\\', '|', '/'],
    timer,
    counter = 0;

  return function(loading, $ele) {
    if (loading) {
      timer = setInterval(function() {
        counter++;
        if($ele){
          $ele.innerHTML = text[counter % text.length];
        }else if (cb){
          cb(text[counter % text.length])
        }
      }, 80)
    }else{
      if($ele) {$ele.remove()}
      clearInterval(timer);
    }
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



// CONCATENATED MODULE: ./node_modules/@zhoujiahao/utils/lib/store.js
let store = new Map();



// EXTERNAL MODULE: ./node_modules/object-hash/dist/object_hash.js
var object_hash = __webpack_require__("1EKS");
var object_hash_default = /*#__PURE__*/__webpack_require__.n(object_hash);

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

const reqAndCache = async (...args) => {
  const key = object_hash_default()(args);
  const result = store.get(key);
  if (result) {
    return result;
  } else {
    const newResult = await req(...args);
    store.set(key, newResult);
    return newResult
  }
};

const getImage = (url) => {
  let image = new Image();
  image.src = url;
  return image.decode();
};

const graphQlQuery = (endpoint, queryStr) => req(endpoint, 'POST', {query: queryStr});


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
/* concated harmony reexport today */__webpack_require__.d(__webpack_exports__, "l", function() { return today; });
/* unused concated harmony import Trim */
/* unused concated harmony import makeTextSpinner */
/* unused concated harmony import graphQlQuery */
/* concated harmony reexport req */__webpack_require__.d(__webpack_exports__, "i", function() { return req; });
/* unused concated harmony import getImage */
/* concated harmony reexport reqAndCache */__webpack_require__.d(__webpack_exports__, "j", function() { return reqAndCache; });
/* concated harmony reexport store */__webpack_require__.d(__webpack_exports__, "k", function() { return store; });






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
    var styleStr = "\n      position: absolute;\n      top: ".concat(config.y, ";\n      left: ").concat(config.x, ";\n      color: ").concat(config.indicatorColor, "\n     ");
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
                        return Promise.all(/* import() */[__webpack_require__.e(4), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, "w74N"));

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
// EXTERNAL MODULE: ./app/js/main/index.scss
var main = __webpack_require__("4oWf");

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
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29iamVjdC1oYXNoL2Rpc3Qvb2JqZWN0X2hhc2guanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL21haW4vaW5kZXguc2Nzcz84ZjZiIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AemhvdWppYWhhby91dGlscy9saWIvZG9tdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHpob3VqaWFoYW8vdXRpbHMvbGliL3RwbHV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B6aG91amlhaGFvL3V0aWxzL2xpYi9zdHJ1dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHpob3VqaWFoYW8vdXRpbHMvbGliL3N0b3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AemhvdWppYWhhby91dGlscy9saWIvcmVxdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B6aG91amlhaGFvL3V0aWxzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvanMvd2lkZ2V0cy9zdGVwSW5kaWNhdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL2FwcC9qcy9tYWluL3ByZUluc3RhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL21haW4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL3dpZGdldHMvc3RlcEluZGljYXRvci9zdHlsZS5zY3NzP2U0NzkiXSwibmFtZXMiOlsiZGVmYXVsdENvbmZpZyIsInRvdGFsU3RlcCIsImluZGljYXRvckNvbG9yIiwiaW5kaWNhdG9ySGlnaGxpZ2h0Q29sb3IiLCJ4IiwieSIsInN0ZXBJbmRpY2F0b3IiLCJ1c2VyQ29uZmlnIiwiY29uZmlnIiwiT2JqZWN0IiwiYXNzaWduIiwibW91bnRTZWxmIiwic3ViSW5kaWNhdG9ySFRNTCIsImluZGljYXRvclRwbCIsInJlcGVhdCIsIiRpbmRpY2F0b3IiLCJjcmVhdGVOb2Rlc0Zyb20iLCJzdHlsZVN0ciIsInNldEF0dHJpYnV0ZSIsImRvY3VtZW50IiwiYm9keSIsImFwcGVuZCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpZHRoIiwic3R5bGUiLCJsZWZ0IiwiaGlnaGxpZ2h0U3RlcCIsImluZGV4IiwiJHN0ZXAiLCJjaGlsZHJlbiIsImNvbG9yIiwiZGVzdHJveSIsImNsYXNzTGlzdCIsImFkZCIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJ3aW5kb3ciLCJUZXJtaW5hbCIsImluc3RhbGxWZW5kb3JzIiwiJGxpbmtUb0Jsb2ciLCIkIiwiaW5zdGFsbEJhc2ljQ21kIiwiY29tbWFuZHMiLCJhZGRDb21tYW5kcyIsImluc3RhbGxCbG9nIiwiYmxvZyIsImluc3RhbGxFZGl0b3IiLCJlZGl0IiwicHJvbWlzZVF1ZXVlIiwiaW5kaWNhdG9yIiwibGVuZ3RoIiwicHJvbWlzZU9uZUJ5T25lIiwidGhlbiIsImluaXQiLCJQc2V1ZG9UZXJtaW5hbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJpc0NvbW1hbmQiLCJBcnJheSIsImZyb20iLCJ0YXJnZXQiLCJpbmNsdWRlcyIsImNvbW1hbmQiLCJnZXRBdHRyaWJ1dGUiLCJpc011bHRpIiwiaGFzQXR0cmlidXRlIiwidG9FeGVjIiwic3BsaXQiLCJleGVjRm4iLCJpbnN0YWxsQ29tbWFuZHMiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFF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O0FBQ2hELGtCQUFJQyxTQUFTLEdBQUdDLEtBQUssQ0FBQ0MsSUFBTixDQUFXSCxHQUFHLENBQUNJLE1BQUosQ0FBVzVCLFNBQXRCLEVBQWlDNkIsUUFBakMsQ0FBMEMsU0FBMUMsQ0FBaEI7QUFDQSxrQkFBSSxDQUFDSixTQUFMLEVBQWdCO0FBRWhCLGtCQUFJSyxPQUFPLEdBQUdOLEdBQUcsQ0FBQ0ksTUFBSixDQUFXRyxZQUFYLENBQXdCLFVBQXhCLENBQWQ7QUFDQSxrQkFBSUMsT0FBTyxHQUFHUixHQUFHLENBQUNJLE1BQUosQ0FBV0ssWUFBWCxDQUF3QixPQUF4QixDQUFkO0FBQ0Esa0JBQUlDLE1BQU0sR0FBR0YsT0FBTyxHQUFHRixPQUFPLENBQUNLLEtBQVIsQ0FBYyxVQUFkLENBQUgsR0FBK0JMLE9BQW5EO0FBQ0Esa0JBQUlNLE1BQU0sR0FBR0osT0FBTyxHQUNoQixxQkFEZ0IsR0FFaEIsZUFGSjtBQUlBUixpQkFBRyxDQUFDSSxNQUFKLENBQVc1QixTQUFYLENBQXFCRyxNQUFyQixDQUE0QixTQUE1QjtBQUNBRSxzQkFBUSxDQUFDK0IsTUFBRCxDQUFSLENBQWlCRixNQUFqQixFQUF5QmQsSUFBekIsQ0FBOEIsWUFBTTtBQUNsQ0ksbUJBQUcsQ0FBQ0ksTUFBSixDQUFXNUIsU0FBWCxDQUFxQkMsR0FBckIsQ0FBeUIsU0FBekI7QUFDRCxlQUZEO0FBR0QsYUFmRDtBQWlCQW9DLHNCQUFlLEdBQUdqQixJQUFsQixDQUF1QixZQUFNO0FBQzNCa0IscUJBQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFaO0FBQ0QsYUFGRDs7QUF0Qlc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBSmxCLElBQUk7QUFBQTtBQUFBO0FBQUEsR0FBVjs7QUEyQkFBLElBQUksR0FBR0QsSUFBUCxHOzs7Ozs7O0FDL0JBLHVDIiwiZmlsZSI6Im1haW4uZjkyNTVlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cbiBcdFx0dmFyIHByZWZldGNoQ2h1bmtzID0gZGF0YVszXSB8fCBbXTtcbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG4gXHRcdC8vIGNodW5rIHByZWZldGNoaW5nIGZvciBqYXZhc2NyaXB0XG4gXHRcdHByZWZldGNoQ2h1bmtzLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gdW5kZWZpbmVkKSB7XG4gXHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBudWxsO1xuIFx0XHRcdFx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRsaW5rLnJlbCA9IFwicHJlZmV0Y2hcIjtcbiBcdFx0XHRcdGxpbmsuYXMgPSBcInNjcmlwdFwiO1xuIFx0XHRcdFx0bGluay5ocmVmID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgQ1NTIGNodW5rc1xuIFx0dmFyIGluc3RhbGxlZENzc0NodW5rcyA9IHtcbiBcdFx0MDogMFxuIFx0fVxuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0MDogMFxuIFx0fTtcblxuXG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLlwiICsge1wiMlwiOlwiODFmY2NhXCIsXCIzXCI6XCI4NWVkNjVcIixcIjRcIjpcIjM5ZmE1YVwiLFwiNVwiOlwiNmJlNjM5XCIsXCI2XCI6XCIyMzI2OWVcIixcIjdcIjpcIjI2MDk4MlwifVtjaHVua0lkXSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIENTUyBsb2FkaW5nXG4gXHRcdHZhciBjc3NDaHVua3MgPSB7XCIyXCI6MSxcIjNcIjoxfTtcbiBcdFx0aWYoaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdKSBwcm9taXNlcy5wdXNoKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSk7XG4gXHRcdGVsc2UgaWYoaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdICE9PSAwICYmIGNzc0NodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHR2YXIgaHJlZiA9IFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuXCIgKyB7XCIyXCI6XCI4MWZjY2FcIixcIjNcIjpcIjg1ZWQ2NVwiLFwiNFwiOlwiMzlmYTVhXCIsXCI1XCI6XCI2YmU2MzlcIixcIjZcIjpcIjIzMjY5ZVwiLFwiN1wiOlwiMjYwOTgyXCJ9W2NodW5rSWRdICsgXCIubWluLmNzc1wiO1xuIFx0XHRcdFx0dmFyIGZ1bGxocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgaHJlZjtcbiBcdFx0XHRcdHZhciBleGlzdGluZ0xpbmtUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaW5rXCIpO1xuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nTGlua1RhZ3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHRhZyA9IGV4aXN0aW5nTGlua1RhZ3NbaV07XG4gXHRcdFx0XHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIikgfHwgdGFnLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gXHRcdFx0XHRcdGlmKHRhZy5yZWwgPT09IFwic3R5bGVzaGVldFwiICYmIChkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpKSByZXR1cm4gcmVzb2x2ZSgpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0dmFyIGV4aXN0aW5nU3R5bGVUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzdHlsZVwiKTtcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ1N0eWxlVGFncy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgdGFnID0gZXhpc3RpbmdTdHlsZVRhZ3NbaV07XG4gXHRcdFx0XHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIik7XG4gXHRcdFx0XHRcdGlmKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikgcmV0dXJuIHJlc29sdmUoKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHZhciBsaW5rVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gXHRcdFx0XHRsaW5rVGFnLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuIFx0XHRcdFx0bGlua1RhZy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuIFx0XHRcdFx0bGlua1RhZy5vbmxvYWQgPSByZXNvbHZlO1xuIFx0XHRcdFx0bGlua1RhZy5vbmVycm9yID0gZnVuY3Rpb24oZXZlbnQpIHtcbiBcdFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYyB8fCBmdWxsaHJlZjtcbiBcdFx0XHRcdFx0dmFyIGVyciA9IG5ldyBFcnJvcihcIkxvYWRpbmcgQ1NTIGNodW5rIFwiICsgY2h1bmtJZCArIFwiIGZhaWxlZC5cXG4oXCIgKyByZXF1ZXN0ICsgXCIpXCIpO1xuIFx0XHRcdFx0XHRlcnIuY29kZSA9IFwiQ1NTX0NIVU5LX0xPQURfRkFJTEVEXCI7XG4gXHRcdFx0XHRcdGVyci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiBcdFx0XHRcdFx0ZGVsZXRlIGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXVxuIFx0XHRcdFx0XHRsaW5rVGFnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobGlua1RhZylcbiBcdFx0XHRcdFx0cmVqZWN0KGVycik7XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0bGlua1RhZy5ocmVmID0gZnVsbGhyZWY7XG5cbiBcdFx0XHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChsaW5rVGFnKTtcbiBcdFx0XHR9KS50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0XHR9KSk7XG4gXHRcdH1cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcignTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKScpO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdHdlYnBhY2tKc29ucENhbGxiYWNrKFtbXSwge30sIDAsIFs2XV0pO1xuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIkVZY1BcIik7XG4iLCIhZnVuY3Rpb24oZSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMpbW9kdWxlLmV4cG9ydHM9ZSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShlKTtlbHNle3ZhciB0O1widW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/dD13aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD90PWdsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmKHQ9c2VsZiksdC5vYmplY3RIYXNoPWUoKX19KGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIG8odSxhKXtpZighblt1XSl7aWYoIXRbdV0pe3ZhciBmPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWEmJmYpcmV0dXJuIGYodSwhMCk7aWYoaSlyZXR1cm4gaSh1LCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK3UrXCInXCIpfXZhciBzPW5bdV09e2V4cG9ydHM6e319O3RbdV1bMF0uY2FsbChzLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFt1XVsxXVtlXTtyZXR1cm4gbyhuP246ZSl9LHMscy5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW3VdLmV4cG9ydHN9Zm9yKHZhciBpPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsdT0wO3U8ci5sZW5ndGg7dSsrKW8oclt1XSk7cmV0dXJuIG99KHsxOltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKHIsbyxpLHUsYSxmLHMsYyxsKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBkKGUsdCl7cmV0dXJuIHQ9aChlLHQpLGcoZSx0KX1mdW5jdGlvbiBoKGUsdCl7aWYodD10fHx7fSx0LmFsZ29yaXRobT10LmFsZ29yaXRobXx8XCJzaGExXCIsdC5lbmNvZGluZz10LmVuY29kaW5nfHxcImhleFwiLHQuZXhjbHVkZVZhbHVlcz0hIXQuZXhjbHVkZVZhbHVlcyx0LmFsZ29yaXRobT10LmFsZ29yaXRobS50b0xvd2VyQ2FzZSgpLHQuZW5jb2Rpbmc9dC5lbmNvZGluZy50b0xvd2VyQ2FzZSgpLHQuaWdub3JlVW5rbm93bj10Lmlnbm9yZVVua25vd249PT0hMCx0LnJlc3BlY3RUeXBlPXQucmVzcGVjdFR5cGUhPT0hMSx0LnJlc3BlY3RGdW5jdGlvbk5hbWVzPXQucmVzcGVjdEZ1bmN0aW9uTmFtZXMhPT0hMSx0LnJlc3BlY3RGdW5jdGlvblByb3BlcnRpZXM9dC5yZXNwZWN0RnVuY3Rpb25Qcm9wZXJ0aWVzIT09ITEsdC51bm9yZGVyZWRBcnJheXM9dC51bm9yZGVyZWRBcnJheXM9PT0hMCx0LnVub3JkZXJlZFNldHM9dC51bm9yZGVyZWRTZXRzIT09ITEsdC51bm9yZGVyZWRPYmplY3RzPXQudW5vcmRlcmVkT2JqZWN0cyE9PSExLHQucmVwbGFjZXI9dC5yZXBsYWNlcnx8dm9pZCAwLHQuZXhjbHVkZUtleXM9dC5leGNsdWRlS2V5c3x8dm9pZCAwLFwidW5kZWZpbmVkXCI9PXR5cGVvZiBlKXRocm93IG5ldyBFcnJvcihcIk9iamVjdCBhcmd1bWVudCByZXF1aXJlZC5cIik7Zm9yKHZhciBuPTA7bjx2Lmxlbmd0aDsrK24pdltuXS50b0xvd2VyQ2FzZSgpPT09dC5hbGdvcml0aG0udG9Mb3dlckNhc2UoKSYmKHQuYWxnb3JpdGhtPXZbbl0pO2lmKHYuaW5kZXhPZih0LmFsZ29yaXRobSk9PT0tMSl0aHJvdyBuZXcgRXJyb3IoJ0FsZ29yaXRobSBcIicrdC5hbGdvcml0aG0rJ1wiICBub3Qgc3VwcG9ydGVkLiBzdXBwb3J0ZWQgdmFsdWVzOiAnK3Yuam9pbihcIiwgXCIpKTtpZihtLmluZGV4T2YodC5lbmNvZGluZyk9PT0tMSYmXCJwYXNzdGhyb3VnaFwiIT09dC5hbGdvcml0aG0pdGhyb3cgbmV3IEVycm9yKCdFbmNvZGluZyBcIicrdC5lbmNvZGluZysnXCIgIG5vdCBzdXBwb3J0ZWQuIHN1cHBvcnRlZCB2YWx1ZXM6ICcrbS5qb2luKFwiLCBcIikpO3JldHVybiB0fWZ1bmN0aW9uIHAoZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSlyZXR1cm4hMTt2YXIgdD0vXmZ1bmN0aW9uXFxzK1xcdypcXHMqXFwoXFxzKlxcKVxccyp7XFxzK1xcW25hdGl2ZSBjb2RlXFxdXFxzK30kL2k7cmV0dXJuIG51bGwhPXQuZXhlYyhGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKSl9ZnVuY3Rpb24gZyhlLHQpe3ZhciBuO249XCJwYXNzdGhyb3VnaFwiIT09dC5hbGdvcml0aG0/Yi5jcmVhdGVIYXNoKHQuYWxnb3JpdGhtKTpuZXcgdyxcInVuZGVmaW5lZFwiPT10eXBlb2Ygbi53cml0ZSYmKG4ud3JpdGU9bi51cGRhdGUsbi5lbmQ9bi51cGRhdGUpO3ZhciByPXkodCxuKTtpZihyLmRpc3BhdGNoKGUpLG4udXBkYXRlfHxuLmVuZChcIlwiKSxuLmRpZ2VzdClyZXR1cm4gbi5kaWdlc3QoXCJidWZmZXJcIj09PXQuZW5jb2Rpbmc/dm9pZCAwOnQuZW5jb2RpbmcpO3ZhciBvPW4ucmVhZCgpO3JldHVyblwiYnVmZmVyXCI9PT10LmVuY29kaW5nP286by50b1N0cmluZyh0LmVuY29kaW5nKX1mdW5jdGlvbiB5KGUsdCxuKXtuPW58fFtdO3ZhciByPWZ1bmN0aW9uKGUpe3JldHVybiB0LnVwZGF0ZT90LnVwZGF0ZShlLFwidXRmOFwiKTp0LndyaXRlKGUsXCJ1dGY4XCIpfTtyZXR1cm57ZGlzcGF0Y2g6ZnVuY3Rpb24odCl7ZS5yZXBsYWNlciYmKHQ9ZS5yZXBsYWNlcih0KSk7dmFyIG49dHlwZW9mIHQ7cmV0dXJuIG51bGw9PT10JiYobj1cIm51bGxcIiksdGhpc1tcIl9cIituXSh0KX0sX29iamVjdDpmdW5jdGlvbih0KXt2YXIgbz0vXFxbb2JqZWN0ICguKilcXF0vaSx1PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0KSxhPW8uZXhlYyh1KTthPWE/YVsxXTpcInVua25vd246W1wiK3UrXCJdXCIsYT1hLnRvTG93ZXJDYXNlKCk7dmFyIGY9bnVsbDtpZigoZj1uLmluZGV4T2YodCkpPj0wKXJldHVybiB0aGlzLmRpc3BhdGNoKFwiW0NJUkNVTEFSOlwiK2YrXCJdXCIpO2lmKG4ucHVzaCh0KSxcInVuZGVmaW5lZFwiIT10eXBlb2YgaSYmaS5pc0J1ZmZlciYmaS5pc0J1ZmZlcih0KSlyZXR1cm4gcihcImJ1ZmZlcjpcIikscih0KTtpZihcIm9iamVjdFwiPT09YXx8XCJmdW5jdGlvblwiPT09YSl7dmFyIHM9T2JqZWN0LmtleXModCk7ZS51bm9yZGVyZWRPYmplY3RzJiYocz1zLnNvcnQoKSksZS5yZXNwZWN0VHlwZT09PSExfHxwKHQpfHxzLnNwbGljZSgwLDAsXCJwcm90b3R5cGVcIixcIl9fcHJvdG9fX1wiLFwiY29uc3RydWN0b3JcIiksZS5leGNsdWRlS2V5cyYmKHM9cy5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIWUuZXhjbHVkZUtleXModCl9KSkscihcIm9iamVjdDpcIitzLmxlbmd0aCtcIjpcIik7dmFyIGM9dGhpcztyZXR1cm4gcy5mb3JFYWNoKGZ1bmN0aW9uKG4pe2MuZGlzcGF0Y2gobikscihcIjpcIiksZS5leGNsdWRlVmFsdWVzfHxjLmRpc3BhdGNoKHRbbl0pLHIoXCIsXCIpfSl9aWYoIXRoaXNbXCJfXCIrYV0pe2lmKGUuaWdub3JlVW5rbm93bilyZXR1cm4gcihcIltcIithK1wiXVwiKTt0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gb2JqZWN0IHR5cGUgXCInK2ErJ1wiJyl9dGhpc1tcIl9cIithXSh0KX0sX2FycmF5OmZ1bmN0aW9uKHQsbyl7bz1cInVuZGVmaW5lZFwiIT10eXBlb2Ygbz9vOmUudW5vcmRlcmVkQXJyYXlzIT09ITE7dmFyIGk9dGhpcztpZihyKFwiYXJyYXk6XCIrdC5sZW5ndGgrXCI6XCIpLCFvfHx0Lmxlbmd0aDw9MSlyZXR1cm4gdC5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiBpLmRpc3BhdGNoKGUpfSk7dmFyIHU9W10sYT10Lm1hcChmdW5jdGlvbih0KXt2YXIgcj1uZXcgdyxvPW4uc2xpY2UoKSxpPXkoZSxyLG8pO3JldHVybiBpLmRpc3BhdGNoKHQpLHU9dS5jb25jYXQoby5zbGljZShuLmxlbmd0aCkpLHIucmVhZCgpLnRvU3RyaW5nKCl9KTtyZXR1cm4gbj1uLmNvbmNhdCh1KSxhLnNvcnQoKSx0aGlzLl9hcnJheShhLCExKX0sX2RhdGU6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJkYXRlOlwiK2UudG9KU09OKCkpfSxfc3ltYm9sOmZ1bmN0aW9uKGUpe3JldHVybiByKFwic3ltYm9sOlwiK2UudG9TdHJpbmcoKSl9LF9lcnJvcjpmdW5jdGlvbihlKXtyZXR1cm4gcihcImVycm9yOlwiK2UudG9TdHJpbmcoKSl9LF9ib29sZWFuOmZ1bmN0aW9uKGUpe3JldHVybiByKFwiYm9vbDpcIitlLnRvU3RyaW5nKCkpfSxfc3RyaW5nOmZ1bmN0aW9uKGUpe3IoXCJzdHJpbmc6XCIrZS5sZW5ndGgrXCI6XCIpLHIoZS50b1N0cmluZygpKX0sX2Z1bmN0aW9uOmZ1bmN0aW9uKHQpe3IoXCJmbjpcIikscCh0KT90aGlzLmRpc3BhdGNoKFwiW25hdGl2ZV1cIik6dGhpcy5kaXNwYXRjaCh0LnRvU3RyaW5nKCkpLGUucmVzcGVjdEZ1bmN0aW9uTmFtZXMhPT0hMSYmdGhpcy5kaXNwYXRjaChcImZ1bmN0aW9uLW5hbWU6XCIrU3RyaW5nKHQubmFtZSkpLGUucmVzcGVjdEZ1bmN0aW9uUHJvcGVydGllcyYmdGhpcy5fb2JqZWN0KHQpfSxfbnVtYmVyOmZ1bmN0aW9uKGUpe3JldHVybiByKFwibnVtYmVyOlwiK2UudG9TdHJpbmcoKSl9LF94bWw6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ4bWw6XCIrZS50b1N0cmluZygpKX0sX251bGw6ZnVuY3Rpb24oKXtyZXR1cm4gcihcIk51bGxcIil9LF91bmRlZmluZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gcihcIlVuZGVmaW5lZFwiKX0sX3JlZ2V4cDpmdW5jdGlvbihlKXtyZXR1cm4gcihcInJlZ2V4OlwiK2UudG9TdHJpbmcoKSl9LF91aW50OGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDhhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF91aW50OGNsYW1wZWRhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVpbnQ4Y2xhbXBlZGFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2ludDhhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVpbnQ4YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfdWludDE2YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1aW50MTZhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9pbnQxNmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDE2YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfdWludDMyYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1aW50MzJhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9pbnQzMmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDMyYXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfZmxvYXQzMmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwiZmxvYXQzMmFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2Zsb2F0NjRhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcImZsb2F0NjRhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9hcnJheWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gcihcImFycmF5YnVmZmVyOlwiKSx0aGlzLmRpc3BhdGNoKG5ldyBVaW50OEFycmF5KGUpKX0sX3VybDpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVybDpcIitlLnRvU3RyaW5nKCksXCJ1dGY4XCIpfSxfbWFwOmZ1bmN0aW9uKHQpe3IoXCJtYXA6XCIpO3ZhciBuPUFycmF5LmZyb20odCk7cmV0dXJuIHRoaXMuX2FycmF5KG4sZS51bm9yZGVyZWRTZXRzIT09ITEpfSxfc2V0OmZ1bmN0aW9uKHQpe3IoXCJzZXQ6XCIpO3ZhciBuPUFycmF5LmZyb20odCk7cmV0dXJuIHRoaXMuX2FycmF5KG4sZS51bm9yZGVyZWRTZXRzIT09ITEpfSxfYmxvYjpmdW5jdGlvbigpe2lmKGUuaWdub3JlVW5rbm93bilyZXR1cm4gcihcIltibG9iXVwiKTt0aHJvdyBFcnJvcignSGFzaGluZyBCbG9iIG9iamVjdHMgaXMgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWRcXG4oc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9wdWxlb3Mvb2JqZWN0LWhhc2gvaXNzdWVzLzI2KVxcblVzZSBcIm9wdGlvbnMucmVwbGFjZXJcIiBvciBcIm9wdGlvbnMuaWdub3JlVW5rbm93blwiXFxuJyl9LF9kb213aW5kb3c6ZnVuY3Rpb24oKXtyZXR1cm4gcihcImRvbXdpbmRvd1wiKX0sX3Byb2Nlc3M6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInByb2Nlc3NcIil9LF90aW1lcjpmdW5jdGlvbigpe3JldHVybiByKFwidGltZXJcIil9LF9waXBlOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJwaXBlXCIpfSxfdGNwOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJ0Y3BcIil9LF91ZHA6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInVkcFwiKX0sX3R0eTpmdW5jdGlvbigpe3JldHVybiByKFwidHR5XCIpfSxfc3RhdHdhdGNoZXI6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInN0YXR3YXRjaGVyXCIpfSxfc2VjdXJlY29udGV4dDpmdW5jdGlvbigpe3JldHVybiByKFwic2VjdXJlY29udGV4dFwiKX0sX2Nvbm5lY3Rpb246ZnVuY3Rpb24oKXtyZXR1cm4gcihcImNvbm5lY3Rpb25cIil9LF96bGliOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJ6bGliXCIpfSxfY29udGV4dDpmdW5jdGlvbigpe3JldHVybiByKFwiY29udGV4dFwiKX0sX25vZGVzY3JpcHQ6ZnVuY3Rpb24oKXtyZXR1cm4gcihcIm5vZGVzY3JpcHRcIil9LF9odHRwcGFyc2VyOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJodHRwcGFyc2VyXCIpfSxfZGF0YXZpZXc6ZnVuY3Rpb24oKXtyZXR1cm4gcihcImRhdGF2aWV3XCIpfSxfc2lnbmFsOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJzaWduYWxcIil9LF9mc2V2ZW50OmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJmc2V2ZW50XCIpfSxfdGxzd3JhcDpmdW5jdGlvbigpe3JldHVybiByKFwidGxzd3JhcFwiKX19fWZ1bmN0aW9uIHcoKXtyZXR1cm57YnVmOlwiXCIsd3JpdGU6ZnVuY3Rpb24oZSl7dGhpcy5idWYrPWV9LGVuZDpmdW5jdGlvbihlKXt0aGlzLmJ1Zis9ZX0scmVhZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmJ1Zn19fXZhciBiPWUoXCJjcnlwdG9cIik7bj10LmV4cG9ydHM9ZCxuLnNoYTE9ZnVuY3Rpb24oZSl7cmV0dXJuIGQoZSl9LG4ua2V5cz1mdW5jdGlvbihlKXtyZXR1cm4gZChlLHtleGNsdWRlVmFsdWVzOiEwLGFsZ29yaXRobTpcInNoYTFcIixlbmNvZGluZzpcImhleFwifSl9LG4uTUQ1PWZ1bmN0aW9uKGUpe3JldHVybiBkKGUse2FsZ29yaXRobTpcIm1kNVwiLGVuY29kaW5nOlwiaGV4XCJ9KX0sbi5rZXlzTUQ1PWZ1bmN0aW9uKGUpe3JldHVybiBkKGUse2FsZ29yaXRobTpcIm1kNVwiLGVuY29kaW5nOlwiaGV4XCIsZXhjbHVkZVZhbHVlczohMH0pfTt2YXIgdj1iLmdldEhhc2hlcz9iLmdldEhhc2hlcygpLnNsaWNlKCk6W1wic2hhMVwiLFwibWQ1XCJdO3YucHVzaChcInBhc3N0aHJvdWdoXCIpO3ZhciBtPVtcImJ1ZmZlclwiLFwiaGV4XCIsXCJiaW5hcnlcIixcImJhc2U2NFwiXTtuLndyaXRlVG9TdHJlYW09ZnVuY3Rpb24oZSx0LG4pe3JldHVyblwidW5kZWZpbmVkXCI9PXR5cGVvZiBuJiYobj10LHQ9e30pLHQ9aChlLHQpLHkodCxuKS5kaXNwYXRjaChlKX19KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9mYWtlX2U4MTgwZWY1LmpzXCIsXCIvXCIpfSx7YnVmZmVyOjMsY3J5cHRvOjUsbFlwb0kyOjEwfV0sMjpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihlLHQscixvLGksdSxhLGYscyl7dmFyIGM9XCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7IWZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQoZSl7dmFyIHQ9ZS5jaGFyQ29kZUF0KDApO3JldHVybiB0PT09aXx8dD09PWw/NjI6dD09PXV8fHQ9PT1kPzYzOnQ8YT8tMTp0PGErMTA/dC1hKzI2KzI2OnQ8cysyNj90LXM6dDxmKzI2P3QtZisyNjp2b2lkIDB9ZnVuY3Rpb24gbihlKXtmdW5jdGlvbiBuKGUpe3NbbCsrXT1lfXZhciByLGksdSxhLGYscztpZihlLmxlbmd0aCU0PjApdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNFwiKTt2YXIgYz1lLmxlbmd0aDtmPVwiPVwiPT09ZS5jaGFyQXQoYy0yKT8yOlwiPVwiPT09ZS5jaGFyQXQoYy0xKT8xOjAscz1uZXcgbygzKmUubGVuZ3RoLzQtZiksdT1mPjA/ZS5sZW5ndGgtNDplLmxlbmd0aDt2YXIgbD0wO2ZvcihyPTAsaT0wO3I8dTtyKz00LGkrPTMpYT10KGUuY2hhckF0KHIpKTw8MTh8dChlLmNoYXJBdChyKzEpKTw8MTJ8dChlLmNoYXJBdChyKzIpKTw8Nnx0KGUuY2hhckF0KHIrMykpLG4oKDE2NzExNjgwJmEpPj4xNiksbigoNjUyODAmYSk+PjgpLG4oMjU1JmEpO3JldHVybiAyPT09Zj8oYT10KGUuY2hhckF0KHIpKTw8Mnx0KGUuY2hhckF0KHIrMSkpPj40LG4oMjU1JmEpKToxPT09ZiYmKGE9dChlLmNoYXJBdChyKSk8PDEwfHQoZS5jaGFyQXQocisxKSk8PDR8dChlLmNoYXJBdChyKzIpKT4+MixuKGE+PjgmMjU1KSxuKDI1NSZhKSksc31mdW5jdGlvbiByKGUpe2Z1bmN0aW9uIHQoZSl7cmV0dXJuIGMuY2hhckF0KGUpfWZ1bmN0aW9uIG4oZSl7cmV0dXJuIHQoZT4+MTgmNjMpK3QoZT4+MTImNjMpK3QoZT4+NiY2MykrdCg2MyZlKX12YXIgcixvLGksdT1lLmxlbmd0aCUzLGE9XCJcIjtmb3Iocj0wLGk9ZS5sZW5ndGgtdTtyPGk7cis9MylvPShlW3JdPDwxNikrKGVbcisxXTw8OCkrZVtyKzJdLGErPW4obyk7c3dpdGNoKHUpe2Nhc2UgMTpvPWVbZS5sZW5ndGgtMV0sYSs9dChvPj4yKSxhKz10KG88PDQmNjMpLGErPVwiPT1cIjticmVhaztjYXNlIDI6bz0oZVtlLmxlbmd0aC0yXTw8OCkrZVtlLmxlbmd0aC0xXSxhKz10KG8+PjEwKSxhKz10KG8+PjQmNjMpLGErPXQobzw8MiY2MyksYSs9XCI9XCJ9cmV0dXJuIGF9dmFyIG89XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQ4QXJyYXk/VWludDhBcnJheTpBcnJheSxpPVwiK1wiLmNoYXJDb2RlQXQoMCksdT1cIi9cIi5jaGFyQ29kZUF0KDApLGE9XCIwXCIuY2hhckNvZGVBdCgwKSxmPVwiYVwiLmNoYXJDb2RlQXQoMCkscz1cIkFcIi5jaGFyQ29kZUF0KDApLGw9XCItXCIuY2hhckNvZGVBdCgwKSxkPVwiX1wiLmNoYXJDb2RlQXQoMCk7ZS50b0J5dGVBcnJheT1uLGUuZnJvbUJ5dGVBcnJheT1yfShcInVuZGVmaW5lZFwiPT10eXBlb2Ygbj90aGlzLmJhc2U2NGpzPXt9Om4pfSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYi9iNjQuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliXCIpfSx7YnVmZmVyOjMsbFlwb0kyOjEwfV0sMzpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbih0LHIsbyxpLHUsYSxmLHMsYyl7ZnVuY3Rpb24gbyhlLHQsbil7aWYoISh0aGlzIGluc3RhbmNlb2YgbykpcmV0dXJuIG5ldyBvKGUsdCxuKTt2YXIgcj10eXBlb2YgZTtpZihcImJhc2U2NFwiPT09dCYmXCJzdHJpbmdcIj09PXIpZm9yKGU9TihlKTtlLmxlbmd0aCU0IT09MDspZSs9XCI9XCI7dmFyIGk7aWYoXCJudW1iZXJcIj09PXIpaT1GKGUpO2Vsc2UgaWYoXCJzdHJpbmdcIj09PXIpaT1vLmJ5dGVMZW5ndGgoZSx0KTtlbHNle2lmKFwib2JqZWN0XCIhPT1yKXRocm93IG5ldyBFcnJvcihcIkZpcnN0IGFyZ3VtZW50IG5lZWRzIHRvIGJlIGEgbnVtYmVyLCBhcnJheSBvciBzdHJpbmcuXCIpO2k9RihlLmxlbmd0aCl9dmFyIHU7by5fdXNlVHlwZWRBcnJheXM/dT1vLl9hdWdtZW50KG5ldyBVaW50OEFycmF5KGkpKToodT10aGlzLHUubGVuZ3RoPWksdS5faXNCdWZmZXI9ITApO3ZhciBhO2lmKG8uX3VzZVR5cGVkQXJyYXlzJiZcIm51bWJlclwiPT10eXBlb2YgZS5ieXRlTGVuZ3RoKXUuX3NldChlKTtlbHNlIGlmKE8oZSkpZm9yKGE9MDthPGk7YSsrKW8uaXNCdWZmZXIoZSk/dVthXT1lLnJlYWRVSW50OChhKTp1W2FdPWVbYV07ZWxzZSBpZihcInN0cmluZ1wiPT09cil1LndyaXRlKGUsMCx0KTtlbHNlIGlmKFwibnVtYmVyXCI9PT1yJiYhby5fdXNlVHlwZWRBcnJheXMmJiFuKWZvcihhPTA7YTxpO2ErKyl1W2FdPTA7cmV0dXJuIHV9ZnVuY3Rpb24gbChlLHQsbixyKXtuPU51bWJlcihuKXx8MDt2YXIgaT1lLmxlbmd0aC1uO3I/KHI9TnVtYmVyKHIpLHI+aSYmKHI9aSkpOnI9aTt2YXIgdT10Lmxlbmd0aDskKHUlMj09PTAsXCJJbnZhbGlkIGhleCBzdHJpbmdcIikscj51LzImJihyPXUvMik7Zm9yKHZhciBhPTA7YTxyO2ErKyl7dmFyIGY9cGFyc2VJbnQodC5zdWJzdHIoMiphLDIpLDE2KTskKCFpc05hTihmKSxcIkludmFsaWQgaGV4IHN0cmluZ1wiKSxlW24rYV09Zn1yZXR1cm4gby5fY2hhcnNXcml0dGVuPTIqYSxhfWZ1bmN0aW9uIGQoZSx0LG4scil7dmFyIGk9by5fY2hhcnNXcml0dGVuPVcoVih0KSxlLG4scik7cmV0dXJuIGl9ZnVuY3Rpb24gaChlLHQsbixyKXt2YXIgaT1vLl9jaGFyc1dyaXR0ZW49VyhxKHQpLGUsbixyKTtyZXR1cm4gaX1mdW5jdGlvbiBwKGUsdCxuLHIpe3JldHVybiBoKGUsdCxuLHIpfWZ1bmN0aW9uIGcoZSx0LG4scil7dmFyIGk9by5fY2hhcnNXcml0dGVuPVcoUih0KSxlLG4scik7cmV0dXJuIGl9ZnVuY3Rpb24geShlLHQsbixyKXt2YXIgaT1vLl9jaGFyc1dyaXR0ZW49VyhQKHQpLGUsbixyKTtyZXR1cm4gaX1mdW5jdGlvbiB3KGUsdCxuKXtyZXR1cm4gMD09PXQmJm49PT1lLmxlbmd0aD9HLmZyb21CeXRlQXJyYXkoZSk6Ry5mcm9tQnl0ZUFycmF5KGUuc2xpY2UodCxuKSl9ZnVuY3Rpb24gYihlLHQsbil7dmFyIHI9XCJcIixvPVwiXCI7bj1NYXRoLm1pbihlLmxlbmd0aCxuKTtmb3IodmFyIGk9dDtpPG47aSsrKWVbaV08PTEyNz8ocis9SihvKStTdHJpbmcuZnJvbUNoYXJDb2RlKGVbaV0pLG89XCJcIik6bys9XCIlXCIrZVtpXS50b1N0cmluZygxNik7cmV0dXJuIHIrSihvKX1mdW5jdGlvbiB2KGUsdCxuKXt2YXIgcj1cIlwiO249TWF0aC5taW4oZS5sZW5ndGgsbik7Zm9yKHZhciBvPXQ7bzxuO28rKylyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGVbb10pO3JldHVybiByfWZ1bmN0aW9uIG0oZSx0LG4pe3JldHVybiB2KGUsdCxuKX1mdW5jdGlvbiBfKGUsdCxuKXt2YXIgcj1lLmxlbmd0aDsoIXR8fHQ8MCkmJih0PTApLCghbnx8bjwwfHxuPnIpJiYobj1yKTtmb3IodmFyIG89XCJcIixpPXQ7aTxuO2krKylvKz1IKGVbaV0pO3JldHVybiBvfWZ1bmN0aW9uIEUoZSx0LG4pe2Zvcih2YXIgcj1lLnNsaWNlKHQsbiksbz1cIlwiLGk9MDtpPHIubGVuZ3RoO2krPTIpbys9U3RyaW5nLmZyb21DaGFyQ29kZShyW2ldKzI1NipyW2krMV0pO3JldHVybiBvfWZ1bmN0aW9uIEkoZSx0LG4scil7cnx8KCQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyBvZmZzZXRcIiksJCh0KzE8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSk7dmFyIG89ZS5sZW5ndGg7aWYoISh0Pj1vKSl7dmFyIGk7cmV0dXJuIG4/KGk9ZVt0XSx0KzE8byYmKGl8PWVbdCsxXTw8OCkpOihpPWVbdF08PDgsdCsxPG8mJihpfD1lW3QrMV0pKSxpfX1mdW5jdGlvbiBBKGUsdCxuLHIpe3J8fCgkKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLCQodCszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpO3ZhciBvPWUubGVuZ3RoO2lmKCEodD49bykpe3ZhciBpO3JldHVybiBuPyh0KzI8byYmKGk9ZVt0KzJdPDwxNiksdCsxPG8mJihpfD1lW3QrMV08PDgpLGl8PWVbdF0sdCszPG8mJihpKz1lW3QrM108PDI0Pj4+MCkpOih0KzE8byYmKGk9ZVt0KzFdPDwxNiksdCsyPG8mJihpfD1lW3QrMl08PDgpLHQrMzxvJiYoaXw9ZVt0KzNdKSxpKz1lW3RdPDwyND4+PjApLGl9fWZ1bmN0aW9uIEIoZSx0LG4scil7cnx8KCQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyBvZmZzZXRcIiksJCh0KzE8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSk7dmFyIG89ZS5sZW5ndGg7aWYoISh0Pj1vKSl7dmFyIGk9SShlLHQsbiwhMCksdT0zMjc2OCZpO3JldHVybiB1Pyg2NTUzNS1pKzEpKi0xOml9fWZ1bmN0aW9uIEwoZSx0LG4scil7cnx8KCQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyBvZmZzZXRcIiksJCh0KzM8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSk7dmFyIG89ZS5sZW5ndGg7aWYoISh0Pj1vKSl7dmFyIGk9QShlLHQsbiwhMCksdT0yMTQ3NDgzNjQ4Jmk7cmV0dXJuIHU/KDQyOTQ5NjcyOTUtaSsxKSotMTppfX1mdW5jdGlvbiBVKGUsdCxuLHIpe3JldHVybiByfHwoJChcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodCszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpLFEucmVhZChlLHQsbiwyMyw0KX1mdW5jdGlvbiB4KGUsdCxuLHIpe3JldHVybiByfHwoJChcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodCs3PGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpLFEucmVhZChlLHQsbiw1Miw4KX1mdW5jdGlvbiBTKGUsdCxuLHIsbyl7b3x8KCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIHZhbHVlXCIpLCQoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PW4mJm51bGwhPT1uLFwibWlzc2luZyBvZmZzZXRcIiksJChuKzE8ZS5sZW5ndGgsXCJ0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksSyh0LDY1NTM1KSk7dmFyIGk9ZS5sZW5ndGg7aWYoIShuPj1pKSlmb3IodmFyIHU9MCxhPU1hdGgubWluKGktbiwyKTt1PGE7dSsrKWVbbit1XT0odCYyNTU8PDgqKHI/dToxLXUpKT4+PjgqKHI/dToxLXUpfWZ1bmN0aW9uIGooZSx0LG4scixvKXtvfHwoJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3NpbmcgdmFsdWVcIiksJChcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodm9pZCAwIT09biYmbnVsbCE9PW4sXCJtaXNzaW5nIG9mZnNldFwiKSwkKG4rMzxlLmxlbmd0aCxcInRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxLKHQsNDI5NDk2NzI5NSkpO3ZhciBpPWUubGVuZ3RoO2lmKCEobj49aSkpZm9yKHZhciB1PTAsYT1NYXRoLm1pbihpLW4sNCk7dTxhO3UrKyllW24rdV09dD4+PjgqKHI/dTozLXUpJjI1NX1mdW5jdGlvbiBDKGUsdCxuLHIsbyl7b3x8KCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIHZhbHVlXCIpLCQoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PW4mJm51bGwhPT1uLFwibWlzc2luZyBvZmZzZXRcIiksJChuKzE8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikseih0LDMyNzY3LC0zMjc2OCkpO3ZhciBpPWUubGVuZ3RoO24+PWl8fCh0Pj0wP1MoZSx0LG4scixvKTpTKGUsNjU1MzUrdCsxLG4scixvKSl9ZnVuY3Rpb24gayhlLHQsbixyLG8pe298fCgkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyB2YWx1ZVwiKSwkKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT1uJiZudWxsIT09bixcIm1pc3Npbmcgb2Zmc2V0XCIpLCQobiszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLHoodCwyMTQ3NDgzNjQ3LC0yMTQ3NDgzNjQ4KSk7dmFyIGk9ZS5sZW5ndGg7bj49aXx8KHQ+PTA/aihlLHQsbixyLG8pOmooZSw0Mjk0OTY3Mjk1K3QrMSxuLHIsbykpfWZ1bmN0aW9uIFQoZSx0LG4scixvKXtvfHwoJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3NpbmcgdmFsdWVcIiksJChcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodm9pZCAwIT09biYmbnVsbCE9PW4sXCJtaXNzaW5nIG9mZnNldFwiKSwkKG4rMzxlLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxYKHQsMy40MDI4MjM0NjYzODUyODg2ZTM4LC0zLjQwMjgyMzQ2NjM4NTI4ODZlMzgpKTt2YXIgaT1lLmxlbmd0aDtuPj1pfHxRLndyaXRlKGUsdCxuLHIsMjMsNCl9ZnVuY3Rpb24gTShlLHQsbixyLG8pe298fCgkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyB2YWx1ZVwiKSwkKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT1uJiZudWxsIT09bixcIm1pc3Npbmcgb2Zmc2V0XCIpLCQobis3PGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLFgodCwxLjc5NzY5MzEzNDg2MjMxNTdlMzA4LC0xLjc5NzY5MzEzNDg2MjMxNTdlMzA4KSk7dmFyIGk9ZS5sZW5ndGg7bj49aXx8US53cml0ZShlLHQsbixyLDUyLDgpfWZ1bmN0aW9uIE4oZSl7cmV0dXJuIGUudHJpbT9lLnRyaW0oKTplLnJlcGxhY2UoL15cXHMrfFxccyskL2csXCJcIil9ZnVuY3Rpb24gWShlLHQsbil7cmV0dXJuXCJudW1iZXJcIiE9dHlwZW9mIGU/bjooZT1+fmUsZT49dD90OmU+PTA/ZTooZSs9dCxlPj0wP2U6MCkpfWZ1bmN0aW9uIEYoZSl7cmV0dXJuIGU9fn5NYXRoLmNlaWwoK2UpLGU8MD8wOmV9ZnVuY3Rpb24gRChlKXtyZXR1cm4oQXJyYXkuaXNBcnJheXx8ZnVuY3Rpb24oZSl7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpfSkoZSl9ZnVuY3Rpb24gTyhlKXtyZXR1cm4gRChlKXx8by5pc0J1ZmZlcihlKXx8ZSYmXCJvYmplY3RcIj09dHlwZW9mIGUmJlwibnVtYmVyXCI9PXR5cGVvZiBlLmxlbmd0aH1mdW5jdGlvbiBIKGUpe3JldHVybiBlPDE2P1wiMFwiK2UudG9TdHJpbmcoMTYpOmUudG9TdHJpbmcoMTYpfWZ1bmN0aW9uIFYoZSl7Zm9yKHZhciB0PVtdLG49MDtuPGUubGVuZ3RoO24rKyl7dmFyIHI9ZS5jaGFyQ29kZUF0KG4pO2lmKHI8PTEyNyl0LnB1c2goZS5jaGFyQ29kZUF0KG4pKTtlbHNle3ZhciBvPW47cj49NTUyOTYmJnI8PTU3MzQzJiZuKys7Zm9yKHZhciBpPWVuY29kZVVSSUNvbXBvbmVudChlLnNsaWNlKG8sbisxKSkuc3Vic3RyKDEpLnNwbGl0KFwiJVwiKSx1PTA7dTxpLmxlbmd0aDt1KyspdC5wdXNoKHBhcnNlSW50KGlbdV0sMTYpKX19cmV0dXJuIHR9ZnVuY3Rpb24gcShlKXtmb3IodmFyIHQ9W10sbj0wO248ZS5sZW5ndGg7bisrKXQucHVzaCgyNTUmZS5jaGFyQ29kZUF0KG4pKTtyZXR1cm4gdH1mdW5jdGlvbiBQKGUpe2Zvcih2YXIgdCxuLHIsbz1bXSxpPTA7aTxlLmxlbmd0aDtpKyspdD1lLmNoYXJDb2RlQXQoaSksbj10Pj44LHI9dCUyNTYsby5wdXNoKHIpLG8ucHVzaChuKTtyZXR1cm4gb31mdW5jdGlvbiBSKGUpe3JldHVybiBHLnRvQnl0ZUFycmF5KGUpfWZ1bmN0aW9uIFcoZSx0LG4scil7Zm9yKHZhciBvPTA7bzxyJiYhKG8rbj49dC5sZW5ndGh8fG8+PWUubGVuZ3RoKTtvKyspdFtvK25dPWVbb107cmV0dXJuIG99ZnVuY3Rpb24gSihlKXt0cnl7cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlKX1jYXRjaCh0KXtyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSg2NTUzMyl9fWZ1bmN0aW9uIEsoZSx0KXskKFwibnVtYmVyXCI9PXR5cGVvZiBlLFwiY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlclwiKSwkKGU+PTAsXCJzcGVjaWZpZWQgYSBuZWdhdGl2ZSB2YWx1ZSBmb3Igd3JpdGluZyBhbiB1bnNpZ25lZCB2YWx1ZVwiKSwkKGU8PXQsXCJ2YWx1ZSBpcyBsYXJnZXIgdGhhbiBtYXhpbXVtIHZhbHVlIGZvciB0eXBlXCIpLCQoTWF0aC5mbG9vcihlKT09PWUsXCJ2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudFwiKX1mdW5jdGlvbiB6KGUsdCxuKXskKFwibnVtYmVyXCI9PXR5cGVvZiBlLFwiY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlclwiKSwkKGU8PXQsXCJ2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWVcIiksJChlPj1uLFwidmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZVwiKSwkKE1hdGguZmxvb3IoZSk9PT1lLFwidmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnRcIil9ZnVuY3Rpb24gWChlLHQsbil7JChcIm51bWJlclwiPT10eXBlb2YgZSxcImNhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXJcIiksJChlPD10LFwidmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlXCIpLCQoZT49bixcInZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWVcIil9ZnVuY3Rpb24gJChlLHQpe2lmKCFlKXRocm93IG5ldyBFcnJvcih0fHxcIkZhaWxlZCBhc3NlcnRpb25cIil9dmFyIEc9ZShcImJhc2U2NC1qc1wiKSxRPWUoXCJpZWVlNzU0XCIpO24uQnVmZmVyPW8sbi5TbG93QnVmZmVyPW8sbi5JTlNQRUNUX01BWF9CWVRFUz01MCxvLnBvb2xTaXplPTgxOTIsby5fdXNlVHlwZWRBcnJheXM9ZnVuY3Rpb24oKXt0cnl7dmFyIGU9bmV3IEFycmF5QnVmZmVyKDApLHQ9bmV3IFVpbnQ4QXJyYXkoZSk7cmV0dXJuIHQuZm9vPWZ1bmN0aW9uKCl7cmV0dXJuIDQyfSw0Mj09PXQuZm9vKCkmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHQuc3ViYXJyYXl9Y2F0Y2gobil7cmV0dXJuITF9fSgpLG8uaXNFbmNvZGluZz1mdW5jdGlvbihlKXtzd2l0Y2goU3RyaW5nKGUpLnRvTG93ZXJDYXNlKCkpe2Nhc2VcImhleFwiOmNhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOmNhc2VcImFzY2lpXCI6Y2FzZVwiYmluYXJ5XCI6Y2FzZVwiYmFzZTY0XCI6Y2FzZVwicmF3XCI6Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6cmV0dXJuITA7ZGVmYXVsdDpyZXR1cm4hMX19LG8uaXNCdWZmZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIShudWxsPT09ZXx8dm9pZCAwPT09ZXx8IWUuX2lzQnVmZmVyKX0sby5ieXRlTGVuZ3RoPWZ1bmN0aW9uKGUsdCl7dmFyIG47c3dpdGNoKGUrPVwiXCIsdHx8XCJ1dGY4XCIpe2Nhc2VcImhleFwiOm49ZS5sZW5ndGgvMjticmVhaztjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjpuPVYoZSkubGVuZ3RoO2JyZWFrO2Nhc2VcImFzY2lpXCI6Y2FzZVwiYmluYXJ5XCI6Y2FzZVwicmF3XCI6bj1lLmxlbmd0aDticmVhaztjYXNlXCJiYXNlNjRcIjpuPVIoZSkubGVuZ3RoO2JyZWFrO2Nhc2VcInVjczJcIjpjYXNlXCJ1Y3MtMlwiOmNhc2VcInV0ZjE2bGVcIjpjYXNlXCJ1dGYtMTZsZVwiOm49MiplLmxlbmd0aDticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcihcIlVua25vd24gZW5jb2RpbmdcIil9cmV0dXJuIG59LG8uY29uY2F0PWZ1bmN0aW9uKGUsdCl7aWYoJChEKGUpLFwiVXNhZ2U6IEJ1ZmZlci5jb25jYXQobGlzdCwgW3RvdGFsTGVuZ3RoXSlcXG5saXN0IHNob3VsZCBiZSBhbiBBcnJheS5cIiksMD09PWUubGVuZ3RoKXJldHVybiBuZXcgbygwKTtpZigxPT09ZS5sZW5ndGgpcmV0dXJuIGVbMF07dmFyIG47aWYoXCJudW1iZXJcIiE9dHlwZW9mIHQpZm9yKHQ9MCxuPTA7bjxlLmxlbmd0aDtuKyspdCs9ZVtuXS5sZW5ndGg7dmFyIHI9bmV3IG8odCksaT0wO2ZvcihuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciB1PWVbbl07dS5jb3B5KHIsaSksaSs9dS5sZW5ndGh9cmV0dXJuIHJ9LG8ucHJvdG90eXBlLndyaXRlPWZ1bmN0aW9uKGUsdCxuLHIpe2lmKGlzRmluaXRlKHQpKWlzRmluaXRlKG4pfHwocj1uLG49dm9pZCAwKTtlbHNle3ZhciBvPXI7cj10LHQ9bixuPW99dD1OdW1iZXIodCl8fDA7dmFyIGk9dGhpcy5sZW5ndGgtdDtuPyhuPU51bWJlcihuKSxuPmkmJihuPWkpKTpuPWkscj1TdHJpbmcocnx8XCJ1dGY4XCIpLnRvTG93ZXJDYXNlKCk7dmFyIHU7c3dpdGNoKHIpe2Nhc2VcImhleFwiOnU9bCh0aGlzLGUsdCxuKTticmVhaztjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjp1PWQodGhpcyxlLHQsbik7YnJlYWs7Y2FzZVwiYXNjaWlcIjp1PWgodGhpcyxlLHQsbik7YnJlYWs7Y2FzZVwiYmluYXJ5XCI6dT1wKHRoaXMsZSx0LG4pO2JyZWFrO2Nhc2VcImJhc2U2NFwiOnU9Zyh0aGlzLGUsdCxuKTticmVhaztjYXNlXCJ1Y3MyXCI6Y2FzZVwidWNzLTJcIjpjYXNlXCJ1dGYxNmxlXCI6Y2FzZVwidXRmLTE2bGVcIjp1PXkodGhpcyxlLHQsbik7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGVuY29kaW5nXCIpfXJldHVybiB1fSxvLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbihlLHQsbil7dmFyIHI9dGhpcztpZihlPVN0cmluZyhlfHxcInV0ZjhcIikudG9Mb3dlckNhc2UoKSx0PU51bWJlcih0KXx8MCxuPXZvaWQgMCE9PW4/TnVtYmVyKG4pOm49ci5sZW5ndGgsbj09PXQpcmV0dXJuXCJcIjt2YXIgbztzd2l0Y2goZSl7Y2FzZVwiaGV4XCI6bz1fKHIsdCxuKTticmVhaztjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjpvPWIocix0LG4pO2JyZWFrO2Nhc2VcImFzY2lpXCI6bz12KHIsdCxuKTticmVhaztjYXNlXCJiaW5hcnlcIjpvPW0ocix0LG4pO2JyZWFrO2Nhc2VcImJhc2U2NFwiOm89dyhyLHQsbik7YnJlYWs7Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6bz1FKHIsdCxuKTticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcihcIlVua25vd24gZW5jb2RpbmdcIil9cmV0dXJuIG99LG8ucHJvdG90eXBlLnRvSlNPTj1mdW5jdGlvbigpe3JldHVybnt0eXBlOlwiQnVmZmVyXCIsZGF0YTpBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnJ8fHRoaXMsMCl9fSxvLnByb3RvdHlwZS5jb3B5PWZ1bmN0aW9uKGUsdCxuLHIpe3ZhciBpPXRoaXM7aWYobnx8KG49MCkscnx8MD09PXJ8fChyPXRoaXMubGVuZ3RoKSx0fHwodD0wKSxyIT09biYmMCE9PWUubGVuZ3RoJiYwIT09aS5sZW5ndGgpeyQocj49bixcInNvdXJjZUVuZCA8IHNvdXJjZVN0YXJ0XCIpLCQodD49MCYmdDxlLmxlbmd0aCxcInRhcmdldFN0YXJ0IG91dCBvZiBib3VuZHNcIiksJChuPj0wJiZuPGkubGVuZ3RoLFwic291cmNlU3RhcnQgb3V0IG9mIGJvdW5kc1wiKSwkKHI+PTAmJnI8PWkubGVuZ3RoLFwic291cmNlRW5kIG91dCBvZiBib3VuZHNcIikscj50aGlzLmxlbmd0aCYmKHI9dGhpcy5sZW5ndGgpLGUubGVuZ3RoLXQ8ci1uJiYocj1lLmxlbmd0aC10K24pO3ZhciB1PXItbjtpZih1PDEwMHx8IW8uX3VzZVR5cGVkQXJyYXlzKWZvcih2YXIgYT0wO2E8dTthKyspZVthK3RdPXRoaXNbYStuXTtlbHNlIGUuX3NldCh0aGlzLnN1YmFycmF5KG4sbit1KSx0KX19LG8ucHJvdG90eXBlLnNsaWNlPWZ1bmN0aW9uKGUsdCl7dmFyIG49dGhpcy5sZW5ndGg7aWYoZT1ZKGUsbiwwKSx0PVkodCxuLG4pLG8uX3VzZVR5cGVkQXJyYXlzKXJldHVybiBvLl9hdWdtZW50KHRoaXMuc3ViYXJyYXkoZSx0KSk7Zm9yKHZhciByPXQtZSxpPW5ldyBvKHIsKHZvaWQgMCksKCEwKSksdT0wO3U8cjt1KyspaVt1XT10aGlzW3UrZV07cmV0dXJuIGl9LG8ucHJvdG90eXBlLmdldD1mdW5jdGlvbihlKXtyZXR1cm4gY29uc29sZS5sb2coXCIuZ2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC5cIiksdGhpcy5yZWFkVUludDgoZSl9LG8ucHJvdG90eXBlLnNldD1mdW5jdGlvbihlLHQpe3JldHVybiBjb25zb2xlLmxvZyhcIi5zZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLlwiKSx0aGlzLndyaXRlVUludDgoZSx0KX0sby5wcm90b3R5cGUucmVhZFVJbnQ4PWZ1bmN0aW9uKGUsdCl7aWYodHx8KCQodm9pZCAwIT09ZSYmbnVsbCE9PWUsXCJtaXNzaW5nIG9mZnNldFwiKSwkKGU8dGhpcy5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSksIShlPj10aGlzLmxlbmd0aCkpcmV0dXJuIHRoaXNbZV19LG8ucHJvdG90eXBlLnJlYWRVSW50MTZMRT1mdW5jdGlvbihlLHQpe3JldHVybiBJKHRoaXMsZSwhMCx0KX0sby5wcm90b3R5cGUucmVhZFVJbnQxNkJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEkodGhpcyxlLCExLHQpfSxvLnByb3RvdHlwZS5yZWFkVUludDMyTEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gQSh0aGlzLGUsITAsdCl9LG8ucHJvdG90eXBlLnJlYWRVSW50MzJCRT1mdW5jdGlvbihlLHQpe3JldHVybiBBKHRoaXMsZSwhMSx0KX0sby5wcm90b3R5cGUucmVhZEludDg9ZnVuY3Rpb24oZSx0KXtpZih0fHwoJCh2b2lkIDAhPT1lJiZudWxsIT09ZSxcIm1pc3Npbmcgb2Zmc2V0XCIpLCQoZTx0aGlzLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKSwhKGU+PXRoaXMubGVuZ3RoKSl7dmFyIG49MTI4JnRoaXNbZV07cmV0dXJuIG4/KDI1NS10aGlzW2VdKzEpKi0xOnRoaXNbZV19fSxvLnByb3RvdHlwZS5yZWFkSW50MTZMRT1mdW5jdGlvbihlLHQpe3JldHVybiBCKHRoaXMsZSwhMCx0KX0sby5wcm90b3R5cGUucmVhZEludDE2QkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gQih0aGlzLGUsITEsdCl9LG8ucHJvdG90eXBlLnJlYWRJbnQzMkxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEwodGhpcyxlLCEwLHQpfSxvLnByb3RvdHlwZS5yZWFkSW50MzJCRT1mdW5jdGlvbihlLHQpe3JldHVybiBMKHRoaXMsZSwhMSx0KX0sby5wcm90b3R5cGUucmVhZEZsb2F0TEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gVSh0aGlzLGUsITAsdCl9LG8ucHJvdG90eXBlLnJlYWRGbG9hdEJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIFUodGhpcyxlLCExLHQpfSxvLnByb3RvdHlwZS5yZWFkRG91YmxlTEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4geCh0aGlzLGUsITAsdCl9LG8ucHJvdG90eXBlLnJlYWREb3VibGVCRT1mdW5jdGlvbihlLHQpe3JldHVybiB4KHRoaXMsZSwhMSx0KX0sby5wcm90b3R5cGUud3JpdGVVSW50OD1mdW5jdGlvbihlLHQsbil7bnx8KCQodm9pZCAwIT09ZSYmbnVsbCE9PWUsXCJtaXNzaW5nIHZhbHVlXCIpLCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIG9mZnNldFwiKSwkKHQ8dGhpcy5sZW5ndGgsXCJ0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksSyhlLDI1NSkpLHQ+PXRoaXMubGVuZ3RofHwodGhpc1t0XT1lKX0sby5wcm90b3R5cGUud3JpdGVVSW50MTZMRT1mdW5jdGlvbihlLHQsbil7Uyh0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVVSW50MTZCRT1mdW5jdGlvbihlLHQsbil7Uyh0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUud3JpdGVVSW50MzJMRT1mdW5jdGlvbihlLHQsbil7aih0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVVSW50MzJCRT1mdW5jdGlvbihlLHQsbil7aih0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUud3JpdGVJbnQ4PWZ1bmN0aW9uKGUsdCxuKXtufHwoJCh2b2lkIDAhPT1lJiZudWxsIT09ZSxcIm1pc3NpbmcgdmFsdWVcIiksJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLCQodDx0aGlzLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSx6KGUsMTI3LC0xMjgpKSx0Pj10aGlzLmxlbmd0aHx8KGU+PTA/dGhpcy53cml0ZVVJbnQ4KGUsdCxuKTp0aGlzLndyaXRlVUludDgoMjU1K2UrMSx0LG4pKX0sby5wcm90b3R5cGUud3JpdGVJbnQxNkxFPWZ1bmN0aW9uKGUsdCxuKXtDKHRoaXMsZSx0LCEwLG4pfSxvLnByb3RvdHlwZS53cml0ZUludDE2QkU9ZnVuY3Rpb24oZSx0LG4pe0ModGhpcyxlLHQsITEsbil9LG8ucHJvdG90eXBlLndyaXRlSW50MzJMRT1mdW5jdGlvbihlLHQsbil7ayh0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVJbnQzMkJFPWZ1bmN0aW9uKGUsdCxuKXtrKHRoaXMsZSx0LCExLG4pfSxvLnByb3RvdHlwZS53cml0ZUZsb2F0TEU9ZnVuY3Rpb24oZSx0LG4pe1QodGhpcyxlLHQsITAsbil9LG8ucHJvdG90eXBlLndyaXRlRmxvYXRCRT1mdW5jdGlvbihlLHQsbil7VCh0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUud3JpdGVEb3VibGVMRT1mdW5jdGlvbihlLHQsbil7TSh0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVEb3VibGVCRT1mdW5jdGlvbihlLHQsbil7TSh0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUuZmlsbD1mdW5jdGlvbihlLHQsbil7aWYoZXx8KGU9MCksdHx8KHQ9MCksbnx8KG49dGhpcy5sZW5ndGgpLFwic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1lLmNoYXJDb2RlQXQoMCkpLCQoXCJudW1iZXJcIj09dHlwZW9mIGUmJiFpc05hTihlKSxcInZhbHVlIGlzIG5vdCBhIG51bWJlclwiKSwkKG4+PXQsXCJlbmQgPCBzdGFydFwiKSxuIT09dCYmMCE9PXRoaXMubGVuZ3RoKXskKHQ+PTAmJnQ8dGhpcy5sZW5ndGgsXCJzdGFydCBvdXQgb2YgYm91bmRzXCIpLCQobj49MCYmbjw9dGhpcy5sZW5ndGgsXCJlbmQgb3V0IG9mIGJvdW5kc1wiKTtmb3IodmFyIHI9dDtyPG47cisrKXRoaXNbcl09ZX19LG8ucHJvdG90eXBlLmluc3BlY3Q9ZnVuY3Rpb24oKXtmb3IodmFyIGU9W10sdD10aGlzLmxlbmd0aCxyPTA7cjx0O3IrKylpZihlW3JdPUgodGhpc1tyXSkscj09PW4uSU5TUEVDVF9NQVhfQllURVMpe2VbcisxXT1cIi4uLlwiO2JyZWFrfXJldHVyblwiPEJ1ZmZlciBcIitlLmpvaW4oXCIgXCIpK1wiPlwifSxvLnByb3RvdHlwZS50b0FycmF5QnVmZmVyPWZ1bmN0aW9uKCl7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQ4QXJyYXkpe2lmKG8uX3VzZVR5cGVkQXJyYXlzKXJldHVybiBuZXcgbyh0aGlzKS5idWZmZXI7Zm9yKHZhciBlPW5ldyBVaW50OEFycmF5KHRoaXMubGVuZ3RoKSx0PTAsbj1lLmxlbmd0aDt0PG47dCs9MSllW3RdPXRoaXNbdF07cmV0dXJuIGUuYnVmZmVyfXRocm93IG5ldyBFcnJvcihcIkJ1ZmZlci50b0FycmF5QnVmZmVyIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpfTt2YXIgWj1vLnByb3RvdHlwZTtvLl9hdWdtZW50PWZ1bmN0aW9uKGUpe3JldHVybiBlLl9pc0J1ZmZlcj0hMCxlLl9nZXQ9ZS5nZXQsZS5fc2V0PWUuc2V0LGUuZ2V0PVouZ2V0LGUuc2V0PVouc2V0LGUud3JpdGU9Wi53cml0ZSxlLnRvU3RyaW5nPVoudG9TdHJpbmcsZS50b0xvY2FsZVN0cmluZz1aLnRvU3RyaW5nLGUudG9KU09OPVoudG9KU09OLGUuY29weT1aLmNvcHksZS5zbGljZT1aLnNsaWNlLGUucmVhZFVJbnQ4PVoucmVhZFVJbnQ4LGUucmVhZFVJbnQxNkxFPVoucmVhZFVJbnQxNkxFLGUucmVhZFVJbnQxNkJFPVoucmVhZFVJbnQxNkJFLGUucmVhZFVJbnQzMkxFPVoucmVhZFVJbnQzMkxFLGUucmVhZFVJbnQzMkJFPVoucmVhZFVJbnQzMkJFLGUucmVhZEludDg9Wi5yZWFkSW50OCxlLnJlYWRJbnQxNkxFPVoucmVhZEludDE2TEUsZS5yZWFkSW50MTZCRT1aLnJlYWRJbnQxNkJFLGUucmVhZEludDMyTEU9Wi5yZWFkSW50MzJMRSxlLnJlYWRJbnQzMkJFPVoucmVhZEludDMyQkUsZS5yZWFkRmxvYXRMRT1aLnJlYWRGbG9hdExFLGUucmVhZEZsb2F0QkU9Wi5yZWFkRmxvYXRCRSxlLnJlYWREb3VibGVMRT1aLnJlYWREb3VibGVMRSxlLnJlYWREb3VibGVCRT1aLnJlYWREb3VibGVCRSxlLndyaXRlVUludDg9Wi53cml0ZVVJbnQ4LGUud3JpdGVVSW50MTZMRT1aLndyaXRlVUludDE2TEUsZS53cml0ZVVJbnQxNkJFPVoud3JpdGVVSW50MTZCRSxlLndyaXRlVUludDMyTEU9Wi53cml0ZVVJbnQzMkxFLGUud3JpdGVVSW50MzJCRT1aLndyaXRlVUludDMyQkUsZS53cml0ZUludDg9Wi53cml0ZUludDgsZS53cml0ZUludDE2TEU9Wi53cml0ZUludDE2TEUsZS53cml0ZUludDE2QkU9Wi53cml0ZUludDE2QkUsZS53cml0ZUludDMyTEU9Wi53cml0ZUludDMyTEUsZS53cml0ZUludDMyQkU9Wi53cml0ZUludDMyQkUsZS53cml0ZUZsb2F0TEU9Wi53cml0ZUZsb2F0TEUsZS53cml0ZUZsb2F0QkU9Wi53cml0ZUZsb2F0QkUsZS53cml0ZURvdWJsZUxFPVoud3JpdGVEb3VibGVMRSxlLndyaXRlRG91YmxlQkU9Wi53cml0ZURvdWJsZUJFLGUuZmlsbD1aLmZpbGwsZS5pbnNwZWN0PVouaW5zcGVjdCxlLnRvQXJyYXlCdWZmZXI9Wi50b0FycmF5QnVmZmVyLGV9fSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyXCIpfSx7XCJiYXNlNjQtanNcIjoyLGJ1ZmZlcjozLGllZWU3NTQ6MTEsbFlwb0kyOjEwfV0sNDpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihuLHIsbyxpLHUsYSxmLHMsYyl7ZnVuY3Rpb24gbChlLHQpe2lmKGUubGVuZ3RoJXAhPT0wKXt2YXIgbj1lLmxlbmd0aCsocC1lLmxlbmd0aCVwKTtlPW8uY29uY2F0KFtlLGddLG4pfWZvcih2YXIgcj1bXSxpPXQ/ZS5yZWFkSW50MzJCRTplLnJlYWRJbnQzMkxFLHU9MDt1PGUubGVuZ3RoO3UrPXApci5wdXNoKGkuY2FsbChlLHUpKTtyZXR1cm4gcn1mdW5jdGlvbiBkKGUsdCxuKXtmb3IodmFyIHI9bmV3IG8odCksaT1uP3Iud3JpdGVJbnQzMkJFOnIud3JpdGVJbnQzMkxFLHU9MDt1PGUubGVuZ3RoO3UrKylpLmNhbGwocixlW3VdLDQqdSwhMCk7cmV0dXJuIHJ9ZnVuY3Rpb24gaChlLHQsbixyKXtvLmlzQnVmZmVyKGUpfHwoZT1uZXcgbyhlKSk7dmFyIGk9dChsKGUsciksZS5sZW5ndGgqeSk7cmV0dXJuIGQoaSxuLHIpfXZhciBvPWUoXCJidWZmZXJcIikuQnVmZmVyLHA9NCxnPW5ldyBvKHApO2cuZmlsbCgwKTt2YXIgeT04O3QuZXhwb3J0cz17aGFzaDpofX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L2hlbHBlcnMuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se2J1ZmZlcjozLGxZcG9JMjoxMH1dLDU6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24odCxyLG8saSx1LGEsZixzLGMpe2Z1bmN0aW9uIGwoZSx0LG4pe28uaXNCdWZmZXIodCl8fCh0PW5ldyBvKHQpKSxvLmlzQnVmZmVyKG4pfHwobj1uZXcgbyhuKSksdC5sZW5ndGg+bT90PWUodCk6dC5sZW5ndGg8bSYmKHQ9by5jb25jYXQoW3QsX10sbSkpO2Zvcih2YXIgcj1uZXcgbyhtKSxpPW5ldyBvKG0pLHU9MDt1PG07dSsrKXJbdV09NTRedFt1XSxpW3VdPTkyXnRbdV07dmFyIGE9ZShvLmNvbmNhdChbcixuXSkpO3JldHVybiBlKG8uY29uY2F0KFtpLGFdKSl9ZnVuY3Rpb24gZChlLHQpe2U9ZXx8XCJzaGExXCI7dmFyIG49dltlXSxyPVtdLGk9MDtyZXR1cm4gbnx8aChcImFsZ29yaXRobTpcIixlLFwiaXMgbm90IHlldCBzdXBwb3J0ZWRcIikse3VwZGF0ZTpmdW5jdGlvbihlKXtyZXR1cm4gby5pc0J1ZmZlcihlKXx8KGU9bmV3IG8oZSkpLHIucHVzaChlKSxpKz1lLmxlbmd0aCx0aGlzfSxkaWdlc3Q6ZnVuY3Rpb24oZSl7dmFyIGk9by5jb25jYXQociksdT10P2wobix0LGkpOm4oaSk7cmV0dXJuIHI9bnVsbCxlP3UudG9TdHJpbmcoZSk6dX19fWZ1bmN0aW9uIGgoKXt2YXIgZT1bXS5zbGljZS5jYWxsKGFyZ3VtZW50cykuam9pbihcIiBcIik7dGhyb3cgbmV3IEVycm9yKFtlLFwid2UgYWNjZXB0IHB1bGwgcmVxdWVzdHNcIixcImh0dHA6Ly9naXRodWIuY29tL2RvbWluaWN0YXJyL2NyeXB0by1icm93c2VyaWZ5XCJdLmpvaW4oXCJcXG5cIikpfWZ1bmN0aW9uIHAoZSx0KXtmb3IodmFyIG4gaW4gZSl0KGVbbl0sbil9dmFyIG89ZShcImJ1ZmZlclwiKS5CdWZmZXIsZz1lKFwiLi9zaGFcIikseT1lKFwiLi9zaGEyNTZcIiksdz1lKFwiLi9ybmdcIiksYj1lKFwiLi9tZDVcIiksdj17c2hhMTpnLHNoYTI1Njp5LG1kNTpifSxtPTY0LF89bmV3IG8obSk7Xy5maWxsKDApLG4uY3JlYXRlSGFzaD1mdW5jdGlvbihlKXtyZXR1cm4gZChlKX0sbi5jcmVhdGVIbWFjPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGQoZSx0KX0sbi5yYW5kb21CeXRlcz1mdW5jdGlvbihlLHQpe2lmKCF0fHwhdC5jYWxsKXJldHVybiBuZXcgbyh3KGUpKTt0cnl7dC5jYWxsKHRoaXMsdm9pZCAwLG5ldyBvKHcoZSkpKX1jYXRjaChuKXt0KG4pfX0scChbXCJjcmVhdGVDcmVkZW50aWFsc1wiLFwiY3JlYXRlQ2lwaGVyXCIsXCJjcmVhdGVDaXBoZXJpdlwiLFwiY3JlYXRlRGVjaXBoZXJcIixcImNyZWF0ZURlY2lwaGVyaXZcIixcImNyZWF0ZVNpZ25cIixcImNyZWF0ZVZlcmlmeVwiLFwiY3JlYXRlRGlmZmllSGVsbG1hblwiLFwicGJrZGYyXCJdLGZ1bmN0aW9uKGUpe25bZV09ZnVuY3Rpb24oKXtoKFwic29ycnksXCIsZSxcImlzIG5vdCBpbXBsZW1lbnRlZCB5ZXRcIil9fSl9KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9pbmRleC5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7XCIuL21kNVwiOjYsXCIuL3JuZ1wiOjcsXCIuL3NoYVwiOjgsXCIuL3NoYTI1NlwiOjksYnVmZmVyOjMsbFlwb0kyOjEwfV0sNjpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihuLHIsbyxpLHUsYSxmLHMsYyl7ZnVuY3Rpb24gbChlLHQpe2VbdD4+NV18PTEyODw8dCUzMixlWyh0KzY0Pj4+OTw8NCkrMTRdPXQ7Zm9yKHZhciBuPTE3MzI1ODQxOTMscj0tMjcxNzMzODc5LG89LTE3MzI1ODQxOTQsaT0yNzE3MzM4NzgsdT0wO3U8ZS5sZW5ndGg7dSs9MTYpe3ZhciBhPW4sZj1yLHM9byxjPWk7bj1oKG4scixvLGksZVt1KzBdLDcsLTY4MDg3NjkzNiksaT1oKGksbixyLG8sZVt1KzFdLDEyLC0zODk1NjQ1ODYpLG89aChvLGksbixyLGVbdSsyXSwxNyw2MDYxMDU4MTkpLHI9aChyLG8saSxuLGVbdSszXSwyMiwtMTA0NDUyNTMzMCksbj1oKG4scixvLGksZVt1KzRdLDcsLTE3NjQxODg5NyksaT1oKGksbixyLG8sZVt1KzVdLDEyLDEyMDAwODA0MjYpLG89aChvLGksbixyLGVbdSs2XSwxNywtMTQ3MzIzMTM0MSkscj1oKHIsbyxpLG4sZVt1KzddLDIyLC00NTcwNTk4Myksbj1oKG4scixvLGksZVt1KzhdLDcsMTc3MDAzNTQxNiksaT1oKGksbixyLG8sZVt1KzldLDEyLC0xOTU4NDE0NDE3KSxvPWgobyxpLG4scixlW3UrMTBdLDE3LC00MjA2Mykscj1oKHIsbyxpLG4sZVt1KzExXSwyMiwtMTk5MDQwNDE2Miksbj1oKG4scixvLGksZVt1KzEyXSw3LDE4MDQ2MDM2ODIpLGk9aChpLG4scixvLGVbdSsxM10sMTIsLTQwMzQxMTAxKSxvPWgobyxpLG4scixlW3UrMTRdLDE3LC0xNTAyMDAyMjkwKSxyPWgocixvLGksbixlW3UrMTVdLDIyLDEyMzY1MzUzMjkpLG49cChuLHIsbyxpLGVbdSsxXSw1LC0xNjU3OTY1MTApLGk9cChpLG4scixvLGVbdSs2XSw5LC0xMDY5NTAxNjMyKSxvPXAobyxpLG4scixlW3UrMTFdLDE0LDY0MzcxNzcxMykscj1wKHIsbyxpLG4sZVt1KzBdLDIwLC0zNzM4OTczMDIpLG49cChuLHIsbyxpLGVbdSs1XSw1LC03MDE1NTg2OTEpLGk9cChpLG4scixvLGVbdSsxMF0sOSwzODAxNjA4Myksbz1wKG8saSxuLHIsZVt1KzE1XSwxNCwtNjYwNDc4MzM1KSxyPXAocixvLGksbixlW3UrNF0sMjAsLTQwNTUzNzg0OCksbj1wKG4scixvLGksZVt1KzldLDUsNTY4NDQ2NDM4KSxpPXAoaSxuLHIsbyxlW3UrMTRdLDksLTEwMTk4MDM2OTApLG89cChvLGksbixyLGVbdSszXSwxNCwtMTg3MzYzOTYxKSxyPXAocixvLGksbixlW3UrOF0sMjAsMTE2MzUzMTUwMSksbj1wKG4scixvLGksZVt1KzEzXSw1LC0xNDQ0NjgxNDY3KSxpPXAoaSxuLHIsbyxlW3UrMl0sOSwtNTE0MDM3ODQpLG89cChvLGksbixyLGVbdSs3XSwxNCwxNzM1MzI4NDczKSxyPXAocixvLGksbixlW3UrMTJdLDIwLC0xOTI2NjA3NzM0KSxuPWcobixyLG8saSxlW3UrNV0sNCwtMzc4NTU4KSxpPWcoaSxuLHIsbyxlW3UrOF0sMTEsLTIwMjI1NzQ0NjMpLG89ZyhvLGksbixyLGVbdSsxMV0sMTYsMTgzOTAzMDU2Mikscj1nKHIsbyxpLG4sZVt1KzE0XSwyMywtMzUzMDk1NTYpLG49ZyhuLHIsbyxpLGVbdSsxXSw0LC0xNTMwOTkyMDYwKSxpPWcoaSxuLHIsbyxlW3UrNF0sMTEsMTI3Mjg5MzM1Myksbz1nKG8saSxuLHIsZVt1KzddLDE2LC0xNTU0OTc2MzIpLHI9ZyhyLG8saSxuLGVbdSsxMF0sMjMsLTEwOTQ3MzA2NDApLG49ZyhuLHIsbyxpLGVbdSsxM10sNCw2ODEyNzkxNzQpLGk9ZyhpLG4scixvLGVbdSswXSwxMSwtMzU4NTM3MjIyKSxvPWcobyxpLG4scixlW3UrM10sMTYsLTcyMjUyMTk3OSkscj1nKHIsbyxpLG4sZVt1KzZdLDIzLDc2MDI5MTg5KSxuPWcobixyLG8saSxlW3UrOV0sNCwtNjQwMzY0NDg3KSxpPWcoaSxuLHIsbyxlW3UrMTJdLDExLC00MjE4MTU4MzUpLG89ZyhvLGksbixyLGVbdSsxNV0sMTYsNTMwNzQyNTIwKSxyPWcocixvLGksbixlW3UrMl0sMjMsLTk5NTMzODY1MSksbj15KG4scixvLGksZVt1KzBdLDYsLTE5ODYzMDg0NCksaT15KGksbixyLG8sZVt1KzddLDEwLDExMjY4OTE0MTUpLG89eShvLGksbixyLGVbdSsxNF0sMTUsLTE0MTYzNTQ5MDUpLHI9eShyLG8saSxuLGVbdSs1XSwyMSwtNTc0MzQwNTUpLG49eShuLHIsbyxpLGVbdSsxMl0sNiwxNzAwNDg1NTcxKSxpPXkoaSxuLHIsbyxlW3UrM10sMTAsLTE4OTQ5ODY2MDYpLG89eShvLGksbixyLGVbdSsxMF0sMTUsLTEwNTE1MjMpLHI9eShyLG8saSxuLGVbdSsxXSwyMSwtMjA1NDkyMjc5OSksbj15KG4scixvLGksZVt1KzhdLDYsMTg3MzMxMzM1OSksaT15KGksbixyLG8sZVt1KzE1XSwxMCwtMzA2MTE3NDQpLG89eShvLGksbixyLGVbdSs2XSwxNSwtMTU2MDE5ODM4MCkscj15KHIsbyxpLG4sZVt1KzEzXSwyMSwxMzA5MTUxNjQ5KSxuPXkobixyLG8saSxlW3UrNF0sNiwtMTQ1NTIzMDcwKSxpPXkoaSxuLHIsbyxlW3UrMTFdLDEwLC0xMTIwMjEwMzc5KSxvPXkobyxpLG4scixlW3UrMl0sMTUsNzE4Nzg3MjU5KSxyPXkocixvLGksbixlW3UrOV0sMjEsLTM0MzQ4NTU1MSksbj13KG4sYSkscj13KHIsZiksbz13KG8scyksaT13KGksYyl9cmV0dXJuIEFycmF5KG4scixvLGkpfWZ1bmN0aW9uIGQoZSx0LG4scixvLGkpe3JldHVybiB3KGIodyh3KHQsZSksdyhyLGkpKSxvKSxuKX1mdW5jdGlvbiBoKGUsdCxuLHIsbyxpLHUpe3JldHVybiBkKHQmbnx+dCZyLGUsdCxvLGksdSl9ZnVuY3Rpb24gcChlLHQsbixyLG8saSx1KXtyZXR1cm4gZCh0JnJ8biZ+cixlLHQsbyxpLHUpfWZ1bmN0aW9uIGcoZSx0LG4scixvLGksdSl7cmV0dXJuIGQodF5uXnIsZSx0LG8saSx1KX1mdW5jdGlvbiB5KGUsdCxuLHIsbyxpLHUpe3JldHVybiBkKG5eKHR8fnIpLGUsdCxvLGksdSl9ZnVuY3Rpb24gdyhlLHQpe3ZhciBuPSg2NTUzNSZlKSsoNjU1MzUmdCkscj0oZT4+MTYpKyh0Pj4xNikrKG4+PjE2KTtyZXR1cm4gcjw8MTZ8NjU1MzUmbn1mdW5jdGlvbiBiKGUsdCl7cmV0dXJuIGU8PHR8ZT4+PjMyLXR9dmFyIHY9ZShcIi4vaGVscGVyc1wiKTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSl7cmV0dXJuIHYuaGFzaChlLGwsMTYpfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L21kNS5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7XCIuL2hlbHBlcnNcIjo0LGJ1ZmZlcjozLGxZcG9JMjoxMH1dLDc6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24oZSxuLHIsbyxpLHUsYSxmLHMpeyFmdW5jdGlvbigpe3ZhciBlLG4scj10aGlzO2U9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0LHQsbj1uZXcgQXJyYXkoZSkscj0wO3I8ZTtyKyspMD09KDMmcikmJih0PTQyOTQ5NjcyOTYqTWF0aC5yYW5kb20oKSksbltyXT10Pj4+KCgzJnIpPDwzKSYyNTU7cmV0dXJuIG59LHIuY3J5cHRvJiZjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzJiYobj1mdW5jdGlvbihlKXt2YXIgdD1uZXcgVWludDhBcnJheShlKTtyZXR1cm4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyh0KSx0fSksdC5leHBvcnRzPW58fGV9KCl9KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9ybmcuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se2J1ZmZlcjozLGxZcG9JMjoxMH1dLDg6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24obixyLG8saSx1LGEsZixzLGMpe2Z1bmN0aW9uIGwoZSx0KXtlW3Q+PjVdfD0xMjg8PDI0LXQlMzIsZVsodCs2ND4+OTw8NCkrMTVdPXQ7Zm9yKHZhciBuPUFycmF5KDgwKSxyPTE3MzI1ODQxOTMsbz0tMjcxNzMzODc5LGk9LTE3MzI1ODQxOTQsdT0yNzE3MzM4NzgsYT0tMTAwOTU4OTc3NixmPTA7ZjxlLmxlbmd0aDtmKz0xNil7Zm9yKHZhciBzPXIsYz1vLGw9aSx5PXUsdz1hLGI9MDtiPDgwO2IrKyl7YjwxNj9uW2JdPWVbZitiXTpuW2JdPWcobltiLTNdXm5bYi04XV5uW2ItMTRdXm5bYi0xNl0sMSk7dmFyIHY9cChwKGcociw1KSxkKGIsbyxpLHUpKSxwKHAoYSxuW2JdKSxoKGIpKSk7YT11LHU9aSxpPWcobywzMCksbz1yLHI9dn1yPXAocixzKSxvPXAobyxjKSxpPXAoaSxsKSx1PXAodSx5KSxhPXAoYSx3KX1yZXR1cm4gQXJyYXkocixvLGksdSxhKX1mdW5jdGlvbiBkKGUsdCxuLHIpe3JldHVybiBlPDIwP3Qmbnx+dCZyOmU8NDA/dF5uXnI6ZTw2MD90Jm58dCZyfG4mcjp0Xm5ecn1mdW5jdGlvbiBoKGUpe3JldHVybiBlPDIwPzE1MTg1MDAyNDk6ZTw0MD8xODU5Nzc1MzkzOmU8NjA/LTE4OTQwMDc1ODg6LTg5OTQ5NzUxNH1mdW5jdGlvbiBwKGUsdCl7dmFyIG49KDY1NTM1JmUpKyg2NTUzNSZ0KSxyPShlPj4xNikrKHQ+PjE2KSsobj4+MTYpO3JldHVybiByPDwxNnw2NTUzNSZufWZ1bmN0aW9uIGcoZSx0KXtyZXR1cm4gZTw8dHxlPj4+MzItdH12YXIgeT1lKFwiLi9oZWxwZXJzXCIpO3QuZXhwb3J0cz1mdW5jdGlvbihlKXtyZXR1cm4geS5oYXNoKGUsbCwyMCwhMCl9fSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvc2hhLmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtcIi4vaGVscGVyc1wiOjQsYnVmZmVyOjMsbFlwb0kyOjEwfV0sOTpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihuLHIsbyxpLHUsYSxmLHMsYyl7dmFyIGw9ZShcIi4vaGVscGVyc1wiKSxkPWZ1bmN0aW9uKGUsdCl7dmFyIG49KDY1NTM1JmUpKyg2NTUzNSZ0KSxyPShlPj4xNikrKHQ+PjE2KSsobj4+MTYpO3JldHVybiByPDwxNnw2NTUzNSZufSxoPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU+Pj50fGU8PDMyLXR9LHA9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZT4+PnR9LGc9ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBlJnRefmUmbn0seT1mdW5jdGlvbihlLHQsbil7cmV0dXJuIGUmdF5lJm5edCZufSx3PWZ1bmN0aW9uKGUpe3JldHVybiBoKGUsMileaChlLDEzKV5oKGUsMjIpO1xufSxiPWZ1bmN0aW9uKGUpe3JldHVybiBoKGUsNileaChlLDExKV5oKGUsMjUpfSx2PWZ1bmN0aW9uKGUpe3JldHVybiBoKGUsNyleaChlLDE4KV5wKGUsMyl9LG09ZnVuY3Rpb24oZSl7cmV0dXJuIGgoZSwxNyleaChlLDE5KV5wKGUsMTApfSxfPWZ1bmN0aW9uKGUsdCl7dmFyIG4scixvLGksdSxhLGYscyxjLGwsaCxwLF89bmV3IEFycmF5KDExMTYzNTI0MDgsMTg5OTQ0NzQ0MSwzMDQ5MzIzNDcxLDM5MjEwMDk1NzMsOTYxOTg3MTYzLDE1MDg5NzA5OTMsMjQ1MzYzNTc0OCwyODcwNzYzMjIxLDM2MjQzODEwODAsMzEwNTk4NDAxLDYwNzIyNTI3OCwxNDI2ODgxOTg3LDE5MjUwNzgzODgsMjE2MjA3ODIwNiwyNjE0ODg4MTAzLDMyNDgyMjI1ODAsMzgzNTM5MDQwMSw0MDIyMjI0Nzc0LDI2NDM0NzA3OCw2MDQ4MDc2MjgsNzcwMjU1OTgzLDEyNDkxNTAxMjIsMTU1NTA4MTY5MiwxOTk2MDY0OTg2LDI1NTQyMjA4ODIsMjgyMTgzNDM0OSwyOTUyOTk2ODA4LDMyMTAzMTM2NzEsMzMzNjU3MTg5MSwzNTg0NTI4NzExLDExMzkyNjk5MywzMzgyNDE4OTUsNjY2MzA3MjA1LDc3MzUyOTkxMiwxMjk0NzU3MzcyLDEzOTYxODIyOTEsMTY5NTE4MzcwMCwxOTg2NjYxMDUxLDIxNzcwMjYzNTAsMjQ1Njk1NjAzNywyNzMwNDg1OTIxLDI4MjAzMDI0MTEsMzI1OTczMDgwMCwzMzQ1NzY0NzcxLDM1MTYwNjU4MTcsMzYwMDM1MjgwNCw0MDk0NTcxOTA5LDI3NTQyMzM0NCw0MzAyMjc3MzQsNTA2OTQ4NjE2LDY1OTA2MDU1Niw4ODM5OTc4NzcsOTU4MTM5NTcxLDEzMjI4MjIyMTgsMTUzNzAwMjA2MywxNzQ3ODczNzc5LDE5NTU1NjIyMjIsMjAyNDEwNDgxNSwyMjI3NzMwNDUyLDIzNjE4NTI0MjQsMjQyODQzNjQ3NCwyNzU2NzM0MTg3LDMyMDQwMzE0NzksMzMyOTMyNTI5OCksRT1uZXcgQXJyYXkoMTc3OTAzMzcwMywzMTQ0MTM0Mjc3LDEwMTM5MDQyNDIsMjc3MzQ4MDc2MiwxMzU5ODkzMTE5LDI2MDA4MjI5MjQsNTI4NzM0NjM1LDE1NDE0NTkyMjUpLEk9bmV3IEFycmF5KDY0KTtlW3Q+PjVdfD0xMjg8PDI0LXQlMzIsZVsodCs2ND4+OTw8NCkrMTVdPXQ7Zm9yKHZhciBjPTA7YzxlLmxlbmd0aDtjKz0xNil7bj1FWzBdLHI9RVsxXSxvPUVbMl0saT1FWzNdLHU9RVs0XSxhPUVbNV0sZj1FWzZdLHM9RVs3XTtmb3IodmFyIGw9MDtsPDY0O2wrKylsPDE2P0lbbF09ZVtsK2NdOklbbF09ZChkKGQobShJW2wtMl0pLElbbC03XSksdihJW2wtMTVdKSksSVtsLTE2XSksaD1kKGQoZChkKHMsYih1KSksZyh1LGEsZikpLF9bbF0pLElbbF0pLHA9ZCh3KG4pLHkobixyLG8pKSxzPWYsZj1hLGE9dSx1PWQoaSxoKSxpPW8sbz1yLHI9bixuPWQoaCxwKTtFWzBdPWQobixFWzBdKSxFWzFdPWQocixFWzFdKSxFWzJdPWQobyxFWzJdKSxFWzNdPWQoaSxFWzNdKSxFWzRdPWQodSxFWzRdKSxFWzVdPWQoYSxFWzVdKSxFWzZdPWQoZixFWzZdKSxFWzddPWQocyxFWzddKX1yZXR1cm4gRX07dC5leHBvcnRzPWZ1bmN0aW9uKGUpe3JldHVybiBsLmhhc2goZSxfLDMyLCEwKX19KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9zaGEyNTYuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se1wiLi9oZWxwZXJzXCI6NCxidWZmZXI6MyxsWXBvSTI6MTB9XSwxMDpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihlLG4scixvLGksdSxhLGYscyl7ZnVuY3Rpb24gYygpe312YXIgZT10LmV4cG9ydHM9e307ZS5uZXh0VGljaz1mdW5jdGlvbigpe3ZhciBlPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5zZXRJbW1lZGlhdGUsdD1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cucG9zdE1lc3NhZ2UmJndpbmRvdy5hZGRFdmVudExpc3RlbmVyO2lmKGUpcmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGUpfTtpZih0KXt2YXIgbj1bXTtyZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsZnVuY3Rpb24oZSl7dmFyIHQ9ZS5zb3VyY2U7aWYoKHQ9PT13aW5kb3d8fG51bGw9PT10KSYmXCJwcm9jZXNzLXRpY2tcIj09PWUuZGF0YSYmKGUuc3RvcFByb3BhZ2F0aW9uKCksbi5sZW5ndGg+MCkpe3ZhciByPW4uc2hpZnQoKTtyKCl9fSwhMCksZnVuY3Rpb24oZSl7bi5wdXNoKGUpLHdpbmRvdy5wb3N0TWVzc2FnZShcInByb2Nlc3MtdGlja1wiLFwiKlwiKX19cmV0dXJuIGZ1bmN0aW9uKGUpe3NldFRpbWVvdXQoZSwwKX19KCksZS50aXRsZT1cImJyb3dzZXJcIixlLmJyb3dzZXI9ITAsZS5lbnY9e30sZS5hcmd2PVtdLGUub249YyxlLmFkZExpc3RlbmVyPWMsZS5vbmNlPWMsZS5vZmY9YyxlLnJlbW92ZUxpc3RlbmVyPWMsZS5yZW1vdmVBbGxMaXN0ZW5lcnM9YyxlLmVtaXQ9YyxlLmJpbmRpbmc9ZnVuY3Rpb24oZSl7dGhyb3cgbmV3IEVycm9yKFwicHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWRcIil9LGUuY3dkPWZ1bmN0aW9uKCl7cmV0dXJuXCIvXCJ9LGUuY2hkaXI9ZnVuY3Rpb24oZSl7dGhyb3cgbmV3IEVycm9yKFwicHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkXCIpfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3NcIil9LHtidWZmZXI6MyxsWXBvSTI6MTB9XSwxMTpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihlLHQscixvLGksdSxhLGYscyl7bi5yZWFkPWZ1bmN0aW9uKGUsdCxuLHIsbyl7dmFyIGksdSxhPTgqby1yLTEsZj0oMTw8YSktMSxzPWY+PjEsYz0tNyxsPW4/by0xOjAsZD1uPy0xOjEsaD1lW3QrbF07Zm9yKGwrPWQsaT1oJigxPDwtYyktMSxoPj49LWMsYys9YTtjPjA7aT0yNTYqaStlW3QrbF0sbCs9ZCxjLT04KTtmb3IodT1pJigxPDwtYyktMSxpPj49LWMsYys9cjtjPjA7dT0yNTYqdStlW3QrbF0sbCs9ZCxjLT04KTtpZigwPT09aSlpPTEtcztlbHNle2lmKGk9PT1mKXJldHVybiB1P05hTjooaD8tMToxKSooMS8wKTt1Kz1NYXRoLnBvdygyLHIpLGktPXN9cmV0dXJuKGg/LTE6MSkqdSpNYXRoLnBvdygyLGktcil9LG4ud3JpdGU9ZnVuY3Rpb24oZSx0LG4scixvLGkpe3ZhciB1LGEsZixzPTgqaS1vLTEsYz0oMTw8cyktMSxsPWM+PjEsZD0yMz09PW8/TWF0aC5wb3coMiwtMjQpLU1hdGgucG93KDIsLTc3KTowLGg9cj8wOmktMSxwPXI/MTotMSxnPXQ8MHx8MD09PXQmJjEvdDwwPzE6MDtmb3IodD1NYXRoLmFicyh0KSxpc05hTih0KXx8dD09PTEvMD8oYT1pc05hTih0KT8xOjAsdT1jKToodT1NYXRoLmZsb29yKE1hdGgubG9nKHQpL01hdGguTE4yKSx0KihmPU1hdGgucG93KDIsLXUpKTwxJiYodS0tLGYqPTIpLHQrPXUrbD49MT9kL2Y6ZCpNYXRoLnBvdygyLDEtbCksdCpmPj0yJiYodSsrLGYvPTIpLHUrbD49Yz8oYT0wLHU9Yyk6dStsPj0xPyhhPSh0KmYtMSkqTWF0aC5wb3coMixvKSx1Kz1sKTooYT10Kk1hdGgucG93KDIsbC0xKSpNYXRoLnBvdygyLG8pLHU9MCkpO28+PTg7ZVtuK2hdPTI1NSZhLGgrPXAsYS89MjU2LG8tPTgpO2Zvcih1PXU8PG98YSxzKz1vO3M+MDtlW24raF09MjU1JnUsaCs9cCx1Lz0yNTYscy09OCk7ZVtuK2gtcF18PTEyOCpnfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2llZWU3NTRcIil9LHtidWZmZXI6MyxsWXBvSTI6MTB9XX0se30sWzFdKSgxKX0pOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImNvbnN0ICQkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbC5iaW5kKGRvY3VtZW50KTtcbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpO1xuY29uc3QgZ290byA9ICh1cmwpID0+IHtcbiAgICBsZXQgJHRtcExpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgJHRtcExpbmsuaHJlZiA9IHVybCB8fCAnYWJvdXQ6YmxhbmtldCc7XG4gICAgJHRtcExpbmsudGFyZ2V0ID0gJ19ibGFua2V0JztcbiAgICAkdG1wTGluay5jbGljaygpO1xuICAgICR0bXBMaW5rID0gbnVsbDtcbn07XG5cbmNvbnN0IGNyZWF0ZU5vZGVzRnJvbSA9IChodG1sU3RyKSA9PiB7XG4gICAgbGV0ICRub2Rlc1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAkbm9kZXNXcmFwcGVyLmlubmVySFRNTCA9IGh0bWxTdHI7XG4gICAgcmV0dXJuICRub2Rlc1dyYXBwZXIuY2hpbGRyZW47XG59O1xuXG5jb25zdCBpc0VsZW1lbnRFbXB0eSA9ICgkZWxlKSA9PiB7XG4gICAgcmV0dXJuICEoJGVsZS5jaGlsZHJlbiAmJiAkZWxlLmNoaWxkcmVuLmxlbmd0aCk7XG59O1xuXG5leHBvcnQgeyQsICQkLCBnb3RvLCBpc0VsZW1lbnRFbXB0eSwgY3JlYXRlTm9kZXNGcm9tfTtcbiIsImNvbnN0IGxpbmsgPSAodGV4dCwgc3JjKSA9PiBgPGEgaHJlZj0ke3NyY30gdGFyZ2V0PVwiX2JsYW5rZXRcIiA+JHt0ZXh0fTwvYT5gO1xuLyoqXG4gKiDmlofmoaPmqKHmnb9cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOWRveS7pOWQjeensOihjO+8jOWmgu+8jGxzIC0g5YiX5Ye65Y2a5paH5YiX6KGoXG4gKiBAcGFyYW0gc3lub3BzaXMg6K+t5rOV6KGM77yM5aaC77yMYmxvZyBbLWVdXG4gKiBAcGFyYW0gZGVzY3JpcHRpb24g5o+P6L+w6KGM77yM5o+P6L+w5ZG95Luk5Yqf6IO9562J562JXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5jb25zdCBkb2NUcGwgPSAobmFtZSwgc3lub3BzaXMsIGRlc2NyaXB0aW9uKSA9PiAoYFxuICAgIE5BTUVcbiAgICAgICAgJHtuYW1lfVxuICAgICAgICBcbiAgICBTWU5PUFNJU1xuICAgICAgICAke3N5bm9wc2lzfVxuICAgICAgICBcbiAgICBERVNDUklQVElPTlxuICAgICAgICAke2Rlc2NyaXB0aW9ufWApLnJlcGxhY2UoLzwvZywgJyZsdDsnKTtcblxuZXhwb3J0IHtcbiAgICBsaW5rLFxuICAgIGRvY1RwbFxufTsiLCJjb25zdCBmb3JtYXQgPSAobXNnLCAuLi5hcmdzKSA9PiB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSByZXR1cm4gbXNnO1xuICAgIHJldHVybiBtc2cucmVwbGFjZSgveyhcXGQrKX0vZyxcbiAgICAgICAgKG1hdGNoLCBudW1iZXIpID0+IChhcmdzW251bWJlcl0gIT0gbnVsbFxuICAgICAgICAgICAgPyBhcmdzW251bWJlcl1cbiAgICAgICAgICAgIDogbWF0Y2gpKTtcbn07XG5jb25zdCBpbnNlcnQgPSAocHJlZml4KSA9PiAoc3RyKSA9PiBwcmVmaXggKyBzdHI7XG5cbmNvbnN0IENORGF0ZVN0cmluZyA9IChkYXRlKSA9PiB7XG4gIGxldCBjbiA9IFtcIuOAh1wiLFwi5LiAXCIsXCLkuoxcIixcIuS4iVwiLFwi5ZubXCIsXCLkupRcIixcIuWFrVwiLFwi5LiDXCIsXCLlhatcIixcIuS5nVwiXTtcbiAgbGV0IHMgPSBbXTtcbiAgbGV0IFlZID0gZGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCk7XG4gIGZvciAobGV0IGk9MDsgaTxZWS5sZW5ndGg7IGkrKylcbiAgICBpZiAoY25bWVkuY2hhckF0KGkpXSlcbiAgICAgIHMucHVzaChjbltZWS5jaGFyQXQoaSldKTtcbiAgICBlbHNlXG4gICAgICBzLnB1c2goWVkuY2hhckF0KGkpKTtcbiAgcy5wdXNoKFwi5bm0XCIpO1xuICBsZXQgTU0gPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICBpZiAoTU08MTApXG4gICAgcy5wdXNoKGNuW01NXSk7XG4gIGVsc2UgaWYgKE1NPDIwKVxuICAgIHMucHVzaChcIuWNgVwiICsgY25bTU0lIDEwXSk7XG4gIHMucHVzaChcIuaciFwiKTtcbiAgbGV0IEREID0gZGF0ZS5nZXREYXRlKCk7XG4gIGlmIChERDwxMClcbiAgICBzLnB1c2goY25bRERdKTtcbiAgZWxzZSBpZiAoREQ8MjApXG4gICAgcy5wdXNoKFwi5Y2BXCIgKyBjbltERCUgMTBdKTtcbiAgZWxzZVxuICAgIHMucHVzaChcIuS6jOWNgVwiICsgY25bREQlIDEwXSk7XG4gIHMucHVzaChcIuaXpVwiKTtcbiAgcmV0dXJuIHMuam9pbignJyk7XG59O1xuXG5jb25zdCBiYXNlNjQgPSB7XG4gIGRlY29kZTogKHN0cikgPT4ge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKHdpbmRvdy5hdG9iKHN0cikpKTtcbiAgfSxcbiAgZW5jb2RlOiBzdHIgPT4gd2luZG93LmJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpKVxufTtcblxuY29uc3QgVHJpbSA9IChzdHIpID0+IHtcbiAgaWYoIXN0cikgcmV0dXJuIFwiXCI7XG4gIGxldCBzdHJBcnIgPSBzdHIuc3BsaXQoJ1xcbicpLFxuICAgIG5vU3RhcnRTcGFjZSA9IHN0ckFyci5maWx0ZXIoc3RyID0+IC9eW14tXFxzXS4qLy50ZXN0KHN0cikgJiYgc3RyICE9PSAnJykubGVuZ3RoID4gMDtcbiAgaWYgKHN0ckFyci5sZW5ndGggPT09IDEgfHwgbm9TdGFydFNwYWNlKSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuICBlbHNlIHtcbiAgICBsZXQgc3BhY2VBcnIgPSBzdHJBcnIubWFwKHN0ciA9PiBzdHIubWF0Y2goL15cXHMrLykpLmZpbHRlcih2ID0+IHYpLm1hcChhcnIgPT4gYXJyWzBdKTtcbiAgICBsZXQgc2hvcnRlc3RTcGFjZUxlbiA9IE1hdGgubWluLmFwcGx5KG51bGwsIHNwYWNlQXJyLm1hcChzcGFjZSA9PiBzcGFjZS5sZW5ndGgpKTtcbiAgICBsZXQgcmVzdWx0ID0gc3RyQXJyLm1hcChzdHIgPT4gc3RyLnNsaWNlKHNob3J0ZXN0U3BhY2VMZW4pKS5qb2luKCdcXG4nKTtcbiAgICByZXR1cm4gcmVzdWx0LnN0YXJ0c1dpdGgoXCJcXG5cIilcbiAgICAgID8gcmVzdWx0LnJlcGxhY2UoXCJcXG5cIiwgXCJcIilcbiAgICAgIDogcmVzdWx0O1xuICB9XG59O1xuXG5jb25zdCBtYWtlVGV4dFNwaW5uZXIgPSAoY2IsIHRleHRBcnIsIHRpbWVvdXQpID0+IHtcbiAgdmFyIHRleHQgPSB0ZXh0QXJyIHx8IFsnLScsICdcXFxcJywgJ3wnLCAnLyddLFxuICAgIHRpbWVyLFxuICAgIGNvdW50ZXIgPSAwO1xuXG4gIHJldHVybiBmdW5jdGlvbihsb2FkaW5nLCAkZWxlKSB7XG4gICAgaWYgKGxvYWRpbmcpIHtcbiAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgaWYoJGVsZSl7XG4gICAgICAgICAgJGVsZS5pbm5lckhUTUwgPSB0ZXh0W2NvdW50ZXIgJSB0ZXh0Lmxlbmd0aF07XG4gICAgICAgIH1lbHNlIGlmIChjYil7XG4gICAgICAgICAgY2IodGV4dFtjb3VudGVyICUgdGV4dC5sZW5ndGhdKVxuICAgICAgICB9XG4gICAgICB9LCA4MClcbiAgICB9ZWxzZXtcbiAgICAgIGlmKCRlbGUpIHskZWxlLnJlbW92ZSgpfVxuICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCB0b2RheSA9ICgpID0+IHtcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgY29uc3QgWVlZWSA9IG5vdy5nZXRGdWxsWWVhcigpO1xuXG4gIGNvbnN0IG1tID0gbm93LmdldE1vbnRoKCkgKyAxO1xuICBjb25zdCBNTSA9IG1tIDwgMTAgPyAnMCcgKyBtbSA6IG1tO1xuXG4gIGNvbnN0IGRkID0gbm93LmdldERhdGUoKTtcbiAgY29uc3QgREQgPSBkZCA8IDEwID8gJzAnICsgZGQgOiBkZDtcbiAgcmV0dXJuIGAke1lZWVl9LSR7TU19LSR7RER9YDtcbn07XG5cbmV4cG9ydCB7Zm9ybWF0LCBpbnNlcnQsIENORGF0ZVN0cmluZywgYmFzZTY0LCB0b2RheSwgVHJpbSwgbWFrZVRleHRTcGlubmVyfTtcbiIsImxldCBzdG9yZSA9IG5ldyBNYXAoKTtcbmV4cG9ydCB7c3RvcmV9O1xuXG4iLCJpbXBvcnQge3N0b3JlfSBmcm9tIFwiLi9zdG9yZVwiO1xuaW1wb3J0IGhhc2ggZnJvbSAnb2JqZWN0LWhhc2gnO1xuXG5jb25zdCByZXEgPSBhc3luYyAodXJsLCBtZXRob2QsIGRhdGEsIHRva2VuKSA9PiB7XG4gIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7XG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICB9KTtcblxuICBpZiAodG9rZW4pIHtcbiAgICBoZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsIGB0b2tlbiAke3Rva2VufWApO1xuICB9XG5cbiAgcmV0dXJuIChhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICBoZWFkZXJzLFxuICAgIGJvZHk6IGRhdGEgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IG51bGxcbiAgfSkpLmpzb24oKTtcbn07XG5cbmNvbnN0IHJlcUFuZENhY2hlID0gYXN5bmMgKC4uLmFyZ3MpID0+IHtcbiAgY29uc3Qga2V5ID0gaGFzaChhcmdzKTtcbiAgY29uc3QgcmVzdWx0ID0gc3RvcmUuZ2V0KGtleSk7XG4gIGlmIChyZXN1bHQpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IG5ld1Jlc3VsdCA9IGF3YWl0IHJlcSguLi5hcmdzKTtcbiAgICBzdG9yZS5zZXQoa2V5LCBuZXdSZXN1bHQpO1xuICAgIHJldHVybiBuZXdSZXN1bHRcbiAgfVxufTtcblxuY29uc3QgZ2V0SW1hZ2UgPSAodXJsKSA9PiB7XG4gIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICBpbWFnZS5zcmMgPSB1cmw7XG4gIHJldHVybiBpbWFnZS5kZWNvZGUoKTtcbn07XG5cbmNvbnN0IGdyYXBoUWxRdWVyeSA9IChlbmRwb2ludCwgcXVlcnlTdHIpID0+IHJlcShlbmRwb2ludCwgJ1BPU1QnLCB7cXVlcnk6IHF1ZXJ5U3RyfSk7XG5cbmV4cG9ydCB7Z3JhcGhRbFF1ZXJ5LCByZXEsIGdldEltYWdlLCByZXFBbmRDYWNoZX07IiwiZXhwb3J0ICogZnJvbSAnLi9kb211dGlsJztcbmV4cG9ydCAqIGZyb20gJy4vdHBsdXRpbCc7XG5leHBvcnQgKiBmcm9tICcuL3N0cnV0aWxzJztcbmV4cG9ydCAqIGZyb20gJy4vcmVxdXRpbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9zdG9yZSc7XG5cbi8qKlxuICogZXhlYyBmdW5jIHRoYXQgcmV0dXJuIGEgcHJvbWlzZSBvbmUgYnkgb25lXG4gKiBAcGFyYW0gZnVuY0FyclxuICogQHBhcmFtIGNiRm5cbiAqIEBwYXJhbSBleHRyYVBhcmFtc1xuICogQHJldHVybnMge1Byb21pc2U8Li4uKnwqPn1cbiAqL1xuY29uc3QgcHJvbWlzZU9uZUJ5T25lID0gYXN5bmMgKGZ1bmNBcnIsIGNiRm4sIC4uLmV4dHJhUGFyYW1zKSA9PiB7XG4gIGxldCBbZmlyc3QsIC4uLnJlc3RdID0gWy4uLmZ1bmNBcnJdO1xuICByZXR1cm4gcmVzdC5yZWR1Y2UoXG4gICAgYXN5bmMgKGFjYywgZnVuYywgaW5kZXgpID0+IHtcbiAgICAgIGxldCBwcmV2UmVzdWx0ID0gYXdhaXQgYWNjO1xuICAgICAgY2JGbiAmJiB0eXBlb2YgY2JGbiA9PT0gXCJmdW5jdGlvblwiICYmIGNiRm4oaW5kZXggKyAxKTtcbiAgICAgIHJldHVybiBmdW5jKHByZXZSZXN1bHQsIC4uLmV4dHJhUGFyYW1zKTtcbiAgICB9LFxuICAgIGZpcnN0KCkudGhlbigoKSA9PiB7XG4gICAgICBjYkZuICYmIHR5cGVvZiBjYkZuID09PSBcImZ1bmN0aW9uXCIgJiYgY2JGbigwKTtcbiAgICB9KSxcbiAgKTtcbn07XG5cbmNvbnN0IHVwZGF0ZUFyckVsZSA9IChhcnIsIGluZGV4LCB2YWwpID0+IHtcbiAgY29uc3QgY29weSA9IGFyci5zbGljZSgpO1xuICBjb3B5LnNwbGljZShpbmRleCwgMSwgdmFsKTtcbiAgcmV0dXJuIGNvcHk7XG59O1xuXG5leHBvcnQge1xuICB1cGRhdGVBcnJFbGUsIHByb21pc2VPbmVCeU9uZSxcbn1cbiIsImltcG9ydCB7Y3JlYXRlTm9kZXNGcm9tfSBmcm9tICdAemhvdWppYWhhby91dGlscydcbmltcG9ydCAnLi9zdHlsZS5zY3NzJ1xuXG5jb25zdCBkZWZhdWx0Q29uZmlnID0ge1xuICB0b3RhbFN0ZXA6IDAsXG4gIGluZGljYXRvckNvbG9yOiAnIzAwMCcsXG4gIGluZGljYXRvckhpZ2hsaWdodENvbG9yOiAnI2ZmZicsXG4gIHg6IDAsXG4gIHk6IDAsXG59O1xuXG5jb25zdCBzdGVwSW5kaWNhdG9yID0gZnVuY3Rpb24gKHVzZXJDb25maWcpIHtcbiAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0Q29uZmlnLCB1c2VyQ29uZmlnKTtcbiAgY29uc3QgbW91bnRTZWxmID0gKCkgPT4ge1xuICAgIGNvbnN0IHN1YkluZGljYXRvckhUTUwgPSBgPHNwYW4+Ljwvc3Bhbj5gO1xuICAgIGNvbnN0IGluZGljYXRvclRwbCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInN0ZXAtaW5kaWNhdG9yXCI+XG4gICAgICAgICAgICAke3N1YkluZGljYXRvckhUTUwucmVwZWF0KGNvbmZpZy50b3RhbFN0ZXApfVxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xuICAgIGNvbnN0ICRpbmRpY2F0b3IgPSBjcmVhdGVOb2Rlc0Zyb20oaW5kaWNhdG9yVHBsKVswXTtcblxuICAgIGNvbnN0IHN0eWxlU3RyID0gYFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAke2NvbmZpZy55fTtcbiAgICAgIGxlZnQ6ICR7Y29uZmlnLnh9O1xuICAgICAgY29sb3I6ICR7Y29uZmlnLmluZGljYXRvckNvbG9yfVxuICAgICBgO1xuXG4gICAgJGluZGljYXRvci5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGVTdHIpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKCRpbmRpY2F0b3IpO1xuICAgIGlmIChjb25maWcueCA9PT0gJ2NlbnRlcicpIHtcbiAgICAgIGNvbnN0IHsgd2lkdGggfSA9ICRpbmRpY2F0b3IuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAkaW5kaWNhdG9yLnN0eWxlLmxlZnQgPSBgY2FsYyg1MCUgLSAke3dpZHRoIC8gMn1weClgXG4gICAgfVxuICAgIHJldHVybiAkaW5kaWNhdG9yO1xuICB9O1xuXG4gIGxldCAkaW5kaWNhdG9yID0gbW91bnRTZWxmKCk7XG4gIHJldHVybiB7XG4gICAgaGlnaGxpZ2h0U3RlcChpbmRleCkge1xuICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IGNvbmZpZy50b3RhbFN0ZXAgLSAxKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0ICRzdGVwID0gJGluZGljYXRvci5jaGlsZHJlbltpbmRleF07XG4gICAgICAkc3RlcC5zdHlsZS5jb2xvciA9IGNvbmZpZy5pbmRpY2F0b3JIaWdobGlnaHRDb2xvcjtcbiAgICB9LFxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAkaW5kaWNhdG9yLmNsYXNzTGlzdC5hZGQoJ2RvbmUnKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAkaW5kaWNhdG9yLnJlbW92ZSgpO1xuICAgICAgICAkaW5kaWNhdG9yID0gbnVsbDtcbiAgICAgIH0sIDIwMDApXG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzdGVwSW5kaWNhdG9yOyIsImltcG9ydCB7IHByb21pc2VPbmVCeU9uZSwgJCB9IGZyb20gXCJAemhvdWppYWhhby91dGlsc1wiXG5pbXBvcnQgc3RlcEluZGljYXRvciBmcm9tICcuLi93aWRnZXRzL3N0ZXBJbmRpY2F0b3IvJ1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbigpIHtcbiAgaWYoIXdpbmRvdy5UZXJtaW5hbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGluc3RhbGxWZW5kb3JzID0gYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGltcG9ydCgvKiB3ZWJwYWNrUHJlZmV0Y2g6IHRydWUgKi8gJ0B6aG91amlhaGFvL2Jsb2cvZGlzdC92ZW5kb3Jzfm1haW4nKTtcbiAgICBjb25zdCAkbGlua1RvQmxvZyA9ICQoJy5saW5rLXRvLWJsb2cnKTtcbiAgICBpZiAoISRsaW5rVG9CbG9nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgICRsaW5rVG9CbG9nLmNsYXNzTGlzdC5hZGQoJ2NvbW1hbmQnKTtcbiAgfTtcblxuICBjb25zdCBpbnN0YWxsQmFzaWNDbWQgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3Qge2RlZmF1bHQ6IGNvbW1hbmRzfSA9IGF3YWl0IGltcG9ydCgnLi4vYmFzaWMtY21kJyk7XG4gICAgd2luZG93LlRlcm1pbmFsLmFkZENvbW1hbmRzKGNvbW1hbmRzKTtcbiAgfTtcblxuICBjb25zdCBpbnN0YWxsQmxvZyA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB7ZGVmYXVsdDogYmxvZ30gPSBhd2FpdCBpbXBvcnQoJ0B6aG91amlhaGFvL2Jsb2cnKTtcbiAgICB3aW5kb3cuVGVybWluYWwuYWRkQ29tbWFuZHMoe2Jsb2d9KTtcbiAgfTtcblxuICBjb25zdCBpbnN0YWxsRWRpdG9yID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHtkZWZhdWx0OiBlZGl0fSA9IGF3YWl0IGltcG9ydCgnQHpob3VqaWFoYW8vZWRpdG9yJyk7XG4gICAgd2luZG93LlRlcm1pbmFsLmFkZENvbW1hbmRzKHtlZGl0fSk7XG4gIH07XG5cbiAgY29uc3QgcHJvbWlzZVF1ZXVlID0gW1xuICAgIGluc3RhbGxWZW5kb3JzLFxuICAgIGluc3RhbGxCYXNpY0NtZCxcbiAgICBpbnN0YWxsQmxvZyxcbiAgICBpbnN0YWxsRWRpdG9yXG4gIF07XG5cbiAgY29uc3QgaW5kaWNhdG9yID0gc3RlcEluZGljYXRvcih7XG4gICAgdG90YWxTdGVwOiBwcm9taXNlUXVldWUubGVuZ3RoLFxuICAgIGluZGljYXRvckNvbG9yOiAnI2NjYycsXG4gICAgeDogJ2NlbnRlcicsXG4gICAgeTogJ2NhbGMoNDAlICsgNjJweCknLFxuICB9KTtcblxuICByZXR1cm4gcHJvbWlzZU9uZUJ5T25lKHByb21pc2VRdWV1ZSwgaW5kaWNhdG9yLmhpZ2hsaWdodFN0ZXApLnRoZW4oaW5kaWNhdG9yLmRlc3Ryb3kpXG59IiwiaW1wb3J0IHskfSBmcm9tICdAemhvdWppYWhhby91dGlscyc7XHJcbmltcG9ydCBpbnN0YWxsQ29tbWFuZHMgZnJvbSAnLi9wcmVJbnN0YWxsJztcclxuXHJcbmltcG9ydCAnLi9pbmRleC5zY3NzJztcclxuY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcclxuICBjb25zdCB7ZGVmYXVsdDogUHNldWRvVGVybWluYWx9ID0gYXdhaXQgaW1wb3J0KCdwc2V1ZG90ZXJtaW5hbCcpO1xyXG4gIGNvbnN0IFRlcm1pbmFsID0gUHNldWRvVGVybWluYWwoJCgnI3Rlcm1pbmFsJykpO1xyXG4gIHdpbmRvdy5UZXJtaW5hbCA9IFRlcm1pbmFsO1xyXG5cclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcclxuICAgIGxldCBpc0NvbW1hbmQgPSBBcnJheS5mcm9tKGV2dC50YXJnZXQuY2xhc3NMaXN0KS5pbmNsdWRlcygnY29tbWFuZCcpO1xyXG4gICAgaWYgKCFpc0NvbW1hbmQpIHJldHVybjtcclxuXHJcbiAgICBsZXQgY29tbWFuZCA9IGV2dC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNtZCcpO1xyXG4gICAgbGV0IGlzTXVsdGkgPSBldnQudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnbXVsdGknKTtcclxuICAgIGxldCB0b0V4ZWMgPSBpc011bHRpID8gY29tbWFuZC5zcGxpdCgvXFxzKiYmXFxzKi8pIDogY29tbWFuZDtcclxuICAgIGxldCBleGVjRm4gPSBpc011bHRpXHJcbiAgICAgID8gJ2h1bWFuaXplckV4ZWNDbWRBcnInXHJcbiAgICAgIDogJ2h1bWFuaXplckV4ZWMnO1xyXG5cclxuICAgIGV2dC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnY29tbWFuZCcpO1xyXG4gICAgVGVybWluYWxbZXhlY0ZuXSh0b0V4ZWMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICBldnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2NvbW1hbmQnKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICBpbnN0YWxsQ29tbWFuZHMoKS50aGVuKCgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdjb21tYW5kcyBpbnN0YWxsZWQnKTtcclxuICB9KVxyXG59O1xyXG5cclxuaW5pdCgpLnRoZW4oKTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==