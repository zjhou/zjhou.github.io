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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("b/cK");


/***/ }),

/***/ "YuTi":
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "b/cK":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */
!function (global) {
  'use strict';

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === 'function' ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || '@@iterator';
  var asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator';
  var toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag';
  var inModule = ( false ? undefined : _typeof(module)) === 'object';
  var runtime = global.regeneratorRuntime;

  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    } // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.


    return;
  } // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.


  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  runtime.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: 'normal',
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: 'throw',
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = 'suspendedStart';
  var GenStateSuspendedYield = 'suspendedYield';
  var GenStateExecuting = 'executing';
  var GenStateCompleted = 'completed'; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = 'GeneratorFunction'; // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ['next', 'throw', 'return'].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === 'function' && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === 'GeneratorFunction' : false;
  };

  runtime.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;

      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = 'GeneratorFunction';
      }
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  runtime.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === 'throw') {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && _typeof(value) === 'object' && hasOwn.call(value, '__await')) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke('next', value, resolve, reject);
          }, function (err) {
            invoke('throw', err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (_typeof(global.process) === 'object' && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  runtime.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error('Generator is already running');
      }

      if (state === GenStateCompleted) {
        if (method === 'throw') {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === 'next') {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === 'throw') {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === 'return') {
          context.abrupt('return', context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === 'normal') {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === 'throw') {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = 'throw';
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === 'throw') {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = 'return';
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === 'throw') {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = 'throw';
        context.arg = new TypeError('The iterator does not provide a \'throw\' method');
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === 'throw') {
      context.method = 'throw';
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = 'throw';
      context.arg = new TypeError('iterator result is not an object');
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== 'return') {
        context.method = 'next';
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  Gp[toStringTagSymbol] = 'Generator'; // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return '[object Generator]';
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = 'normal';
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: 'root'
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === 'function') {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  runtime.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = 'next';
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === 't' && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === 'throw') {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = 'throw';
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = 'next';
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === 'root') {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle('end');
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, 'catchLoc');
          var hasFinally = hasOwn.call(entry, 'finallyLoc');

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error('try statement without catch or finally');
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, 'finallyLoc') && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === 'break' || type === 'continue') && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = 'next';
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === 'throw') {
        throw record.arg;
      }

      if (record.type === 'break' || record.type === 'continue') {
        this.next = record.arg;
      } else if (record.type === 'return') {
        this.rval = this.arg = record.arg;
        this.method = 'return';
        this.next = 'end';
      } else if (record.type === 'normal' && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    'catch': function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === 'throw') {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error('illegal catch attempt');
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === 'next') {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
}( // Among the various tricks for obtaining a reference to the global
// object, this seems to be the most reliable technique that does not
// use indirect eval (which violates Content Security Policy).
(typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' ? global : (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' ? self : this);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj"), __webpack_require__("YuTi")(module)))

/***/ }),

/***/ "yLpj":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvanMvdXRpbHMvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIl0sIm5hbWVzIjpbImdsb2JhbCIsIk9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJ1bmRlZmluZWQiLCIkU3ltYm9sIiwiU3ltYm9sIiwiaXRlcmF0b3JTeW1ib2wiLCJpdGVyYXRvciIsImFzeW5jSXRlcmF0b3JTeW1ib2wiLCJhc3luY0l0ZXJhdG9yIiwidG9TdHJpbmdUYWdTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsImluTW9kdWxlIiwibW9kdWxlIiwicnVudGltZSIsInJlZ2VuZXJhdG9yUnVudGltZSIsImV4cG9ydHMiLCJ3cmFwIiwiaW5uZXJGbiIsIm91dGVyRm4iLCJzZWxmIiwidHJ5TG9jc0xpc3QiLCJwcm90b0dlbmVyYXRvciIsIkdlbmVyYXRvciIsImdlbmVyYXRvciIsImNyZWF0ZSIsImNvbnRleHQiLCJDb250ZXh0IiwiX2ludm9rZSIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsImZuIiwib2JqIiwiYXJnIiwidHlwZSIsImNhbGwiLCJlcnIiLCJHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0IiwiR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCIsIkdlblN0YXRlRXhlY3V0aW5nIiwiR2VuU3RhdGVDb21wbGV0ZWQiLCJDb250aW51ZVNlbnRpbmVsIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsIkl0ZXJhdG9yUHJvdG90eXBlIiwiZ2V0UHJvdG8iLCJnZXRQcm90b3R5cGVPZiIsIk5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlIiwidmFsdWVzIiwiR3AiLCJjb25zdHJ1Y3RvciIsImRpc3BsYXlOYW1lIiwiZGVmaW5lSXRlcmF0b3JNZXRob2RzIiwiZm9yRWFjaCIsIm1ldGhvZCIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJnZW5GdW4iLCJjdG9yIiwibmFtZSIsIm1hcmsiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImF3cmFwIiwiX19hd2FpdCIsIkFzeW5jSXRlcmF0b3IiLCJpbnZva2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVjb3JkIiwicmVzdWx0IiwidmFsdWUiLCJQcm9taXNlIiwidGhlbiIsInVud3JhcHBlZCIsInByb2Nlc3MiLCJkb21haW4iLCJiaW5kIiwicHJldmlvdXNQcm9taXNlIiwiZW5xdWV1ZSIsImNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnIiwiYXN5bmMiLCJpdGVyIiwibmV4dCIsImRvbmUiLCJzdGF0ZSIsIkVycm9yIiwiZG9uZVJlc3VsdCIsImRlbGVnYXRlIiwiZGVsZWdhdGVSZXN1bHQiLCJtYXliZUludm9rZURlbGVnYXRlIiwic2VudCIsIl9zZW50IiwiZGlzcGF0Y2hFeGNlcHRpb24iLCJhYnJ1cHQiLCJyZXR1cm4iLCJUeXBlRXJyb3IiLCJpbmZvIiwicmVzdWx0TmFtZSIsIm5leHRMb2MiLCJ0b1N0cmluZyIsInB1c2hUcnlFbnRyeSIsImxvY3MiLCJlbnRyeSIsInRyeUxvYyIsImNhdGNoTG9jIiwiZmluYWxseUxvYyIsImFmdGVyTG9jIiwidHJ5RW50cmllcyIsInB1c2giLCJyZXNldFRyeUVudHJ5IiwiY29tcGxldGlvbiIsInJlc2V0Iiwia2V5cyIsIm9iamVjdCIsImtleSIsInJldmVyc2UiLCJsZW5ndGgiLCJwb3AiLCJpdGVyYWJsZSIsIml0ZXJhdG9yTWV0aG9kIiwiaXNOYU4iLCJpIiwic2tpcFRlbXBSZXNldCIsInByZXYiLCJjaGFyQXQiLCJzbGljZSIsInN0b3AiLCJyb290RW50cnkiLCJyb290UmVjb3JkIiwicnZhbCIsImV4Y2VwdGlvbiIsImhhbmRsZSIsImxvYyIsImNhdWdodCIsImhhc0NhdGNoIiwiaGFzRmluYWxseSIsImZpbmFsbHlFbnRyeSIsImNvbXBsZXRlIiwiZmluaXNoIiwidGhyb3duIiwiZGVsZWdhdGVZaWVsZCIsIndpbmRvdyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNyQkE7Ozs7Ozs7OztBQVVBLENBQUUsVUFBU0EsTUFBVCxFQUFpQjtBQUNmOztBQUVBLE1BQUlDLEVBQUUsR0FBR0MsTUFBTSxDQUFDQyxTQUFoQjtBQUNBLE1BQUlDLE1BQU0sR0FBR0gsRUFBRSxDQUFDSSxjQUFoQjtBQUNBLE1BQUlDLFNBQUosQ0FMZSxDQUtBOztBQUNmLE1BQUlDLE9BQU8sR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFVB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QW1CckIsVUFBbkIsRUFBK0JDLE9BQS9CLEVBQXdDO0FBQ25ELFdBQUtYLFFBQUwsR0FBZ0I7QUFDWmhGLGdCQUFRLEVBQUV5QyxNQUFNLENBQUNzRSxRQUFELENBREo7QUFFWnJCLGtCQUFVLEVBQUVBLFVBRkE7QUFHWkMsZUFBTyxFQUFFQTtBQUhHLE9BQWhCOztBQU1BLFVBQUksS0FBSzVDLE1BQUwsS0FBZ0IsTUFBcEIsRUFBNEI7QUFDeEI7QUFDQTtBQUNBLGFBQUtyQixHQUFMLEdBQVc5QixTQUFYO0FBQ0g7O0FBRUQsYUFBT3NDLGdCQUFQO0FBQ0g7QUFyTWUsR0FBcEI7QUF1TUgsQ0E5c0JBLEVBK3NCRztBQUNBO0FBQ0E7QUFDQSxRQUFPNUMsTUFBUCx5Q0FBT0EsTUFBUCxPQUFrQixRQUFsQixHQUE2QkEsTUFBN0IsR0FDSSxRQUFPZ0osTUFBUCx5Q0FBT0EsTUFBUCxPQUFrQixRQUFsQixHQUE2QkEsTUFBN0IsR0FDSSxRQUFPekgsSUFBUCx5Q0FBT0EsSUFBUCxPQUFnQixRQUFoQixHQUEyQkEsSUFBM0IsR0FBa0MsSUFwdEI3QyxDQUFELEM7Ozs7Ozs7O0FDVkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDIiwiZmlsZSI6Im1haW4tdmVuZG9yLmQzOTQ5YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogaHR0cHM6Ly9yYXcuZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9tYXN0ZXIvTElDRU5TRSBmaWxlLiBBblxuICogYWRkaXRpb25hbCBncmFudCBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluXG4gKiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuIShmdW5jdGlvbihnbG9iYWwpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICAgIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgPyBTeW1ib2wgOiB7fTtcbiAgICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8ICdAQGl0ZXJhdG9yJztcbiAgICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCAnQEBhc3luY0l0ZXJhdG9yJztcbiAgICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8ICdAQHRvU3RyaW5nVGFnJztcblxuICAgIHZhciBpbk1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnO1xuICAgIHZhciBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgICBpZiAocnVudGltZSkge1xuICAgICAgICBpZiAoaW5Nb2R1bGUpIHtcbiAgICAgICAgICAgIC8vIElmIHJlZ2VuZXJhdG9yUnVudGltZSBpcyBkZWZpbmVkIGdsb2JhbGx5IGFuZCB3ZSdyZSBpbiBhIG1vZHVsZSxcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIGV4cG9ydHMgb2JqZWN0IGlkZW50aWNhbCB0byByZWdlbmVyYXRvclJ1bnRpbWUuXG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG9uJ3QgYm90aGVyIGV2YWx1YXRpbmcgdGhlIHJlc3Qgb2YgdGhpcyBmaWxlIGlmIHRoZSBydW50aW1lIHdhc1xuICAgICAgICAvLyBhbHJlYWR5IGRlZmluZWQgZ2xvYmFsbHkuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHJ1bnRpbWUgZ2xvYmFsbHkgKGFzIGV4cGVjdGVkIGJ5IGdlbmVyYXRlZCBjb2RlKSBhcyBlaXRoZXJcbiAgICAvLyBtb2R1bGUuZXhwb3J0cyAoaWYgd2UncmUgaW4gYSBtb2R1bGUpIG9yIGEgbmV3LCBlbXB0eSBvYmplY3QuXG4gICAgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWUgPSBpbk1vZHVsZSA/IG1vZHVsZS5leHBvcnRzIDoge307XG5cbiAgICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgICAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgICAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgICAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICAgICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgICAgIHJldHVybiBnZW5lcmF0b3I7XG4gICAgfVxuICAgIHJ1bnRpbWUud3JhcCA9IHdyYXA7XG5cbiAgICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gICAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAgIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAgIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAgIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gICAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiAnbm9ybWFsJywgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6ICd0aHJvdycsIGFyZzogZXJyIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9ICdzdXNwZW5kZWRTdGFydCc7XG4gICAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSAnc3VzcGVuZGVkWWllbGQnO1xuICAgIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9ICdleGVjdXRpbmcnO1xuICAgIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9ICdjb21wbGV0ZWQnO1xuXG4gICAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAgIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gICAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gICAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gICAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICAgIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gICAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICAgIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAgIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICAgIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gICAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgICAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICAgIH1cblxuICAgIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICAgIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPVxuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gJ0dlbmVyYXRvckZ1bmN0aW9uJztcblxuICAgIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gICAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgICAgIFsnbmV4dCcsICd0aHJvdycsICdyZXR1cm4nXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgICAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09ICdmdW5jdGlvbicgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgICAgICByZXR1cm4gY3RvclxuICAgICAgICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gJ0dlbmVyYXRvckZ1bmN0aW9uJ1xuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICB9O1xuXG4gICAgcnVudGltZS5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgICAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gJ0dlbmVyYXRvckZ1bmN0aW9uJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgICAgIHJldHVybiBnZW5GdW47XG4gICAgfTtcblxuICAgIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAgIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gICAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAgIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gICAgcnVudGltZS5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICAgICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSAndGhyb3cnKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCAnX19hd2FpdCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW52b2tlKCduZXh0JywgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW52b2tlKCd0aHJvdycsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLiBJZiB0aGUgUHJvbWlzZSBpcyByZWplY3RlZCwgaG93ZXZlciwgdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc3VsdCBmb3IgdGhpcyBpdGVyYXRpb24gd2lsbCBiZSByZWplY3RlZCB3aXRoIHRoZSBzYW1lXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlYXNvbi4gTm90ZSB0aGF0IHJlamVjdGlvbnMgb2YgeWllbGRlZCBQcm9taXNlcyBhcmUgbm90XG4gICAgICAgICAgICAgICAgICAgIC8vIHRocm93biBiYWNrIGludG8gdGhlIGdlbmVyYXRvciBmdW5jdGlvbiwgYXMgaXMgdGhlIGNhc2VcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBhbiBhd2FpdGVkIFByb21pc2UgaXMgcmVqZWN0ZWQuIFRoaXMgZGlmZmVyZW5jZSBpblxuICAgICAgICAgICAgICAgICAgICAvLyBiZWhhdmlvciBiZXR3ZWVuIHlpZWxkIGFuZCBhd2FpdCBpcyBpbXBvcnRhbnQsIGJlY2F1c2UgaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxsb3dzIHRoZSBjb25zdW1lciB0byBkZWNpZGUgd2hhdCB0byBkbyB3aXRoIHRoZSB5aWVsZGVkXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlamVjdGlvbiAoc3dhbGxvdyBpdCBhbmQgY29udGludWUsIG1hbnVhbGx5IC50aHJvdyBpdCBiYWNrXG4gICAgICAgICAgICAgICAgICAgIC8vIGludG8gdGhlIGdlbmVyYXRvciwgYWJhbmRvbiBpdGVyYXRpb24sIHdoYXRldmVyKS4gV2l0aFxuICAgICAgICAgICAgICAgICAgICAvLyBhd2FpdCwgYnkgY29udHJhc3QsIHRoZXJlIGlzIG5vIG9wcG9ydHVuaXR5IHRvIGV4YW1pbmUgdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlamVjdGlvbiByZWFzb24gb3V0c2lkZSB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBzbyB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gb25seSBvcHRpb24gaXMgdG8gdGhyb3cgaXQgZnJvbSB0aGUgYXdhaXQgZXhwcmVzc2lvbiwgYW5kXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhbmRsZSB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LCByZWplY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBnbG9iYWwucHJvY2VzcyA9PT0gJ29iamVjdCcgJiYgZ2xvYmFsLnByb2Nlc3MuZG9tYWluKSB7XG4gICAgICAgICAgICBpbnZva2UgPSBnbG9iYWwucHJvY2Vzcy5kb21haW4uYmluZChpbnZva2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgICAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAgICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gICAgfVxuXG4gICAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBydW50aW1lLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gICAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAgIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAgIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICAgIHJ1bnRpbWUuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgICAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICAgICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgICAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmcnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09ICd0aHJvdycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICAgICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gJ25leHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSAndGhyb3cnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSAncmV0dXJuJykge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmFicnVwdCgncmV0dXJuJywgY29udGV4dC5hcmcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSAnbm9ybWFsJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09ICd0aHJvdycpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9ICd0aHJvdyc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gICAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAgIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAgIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICAgIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgICAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSAndGhyb3cnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5tZXRob2QgPSAncmV0dXJuJztcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gJ3Rocm93Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9ICd0aHJvdyc7XG4gICAgICAgICAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgICAgICAgICAnVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSBcXCd0aHJvd1xcJyBtZXRob2QnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gJ3Rocm93Jykge1xuICAgICAgICAgICAgY29udGV4dC5tZXRob2QgPSAndGhyb3cnO1xuICAgICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgICAgICBpZiAoISBpbmZvKSB7XG4gICAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9ICd0aHJvdyc7XG4gICAgICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoJ2l0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gICAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgICAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICAgICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAgICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAgICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAgICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSAncmV0dXJuJykge1xuICAgICAgICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gJ25leHQnO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAgIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gICAgR3BbdG9TdHJpbmdUYWdTeW1ib2xdID0gJ0dlbmVyYXRvcic7XG5cbiAgICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAgIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gICAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAnW29iamVjdCBHZW5lcmF0b3JdJztcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgICAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICAgICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICAgICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgICAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgICAgICByZWNvcmQudHlwZSA9ICdub3JtYWwnO1xuICAgICAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICAgICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICAgICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiAncm9vdCcgfV07XG4gICAgICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICAgICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgICB9XG5cbiAgICBydW50aW1lLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAgICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAgICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgICAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAgICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgICB9XG4gICAgcnVudGltZS52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgICAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gICAgfVxuXG4gICAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgICAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgICAgICAgIHRoaXMubWV0aG9kID0gJ25leHQnO1xuICAgICAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICAgICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSAndCcgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgICAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSAndGhyb3cnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICAgICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkLnR5cGUgPSAndGhyb3cnO1xuICAgICAgICAgICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgICAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgICAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9ICduZXh0JztcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICAgICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09ICdyb290Jykge1xuICAgICAgICAgICAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgICAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAgICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZSgnZW5kJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksICdjYXRjaExvYycpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCAnZmluYWxseUxvYycpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHknKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCAnZmluYWxseUxvYycpICYmXG4gICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAodHlwZSA9PT0gJ2JyZWFrJyB8fFxuICAgICAgICAgIHR5cGUgPT09ICdjb250aW51ZScpICYmXG4gICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgICAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICAgICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICAgICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICAgICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXRob2QgPSAnbmV4dCc7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gJ3Rocm93Jykge1xuICAgICAgICAgICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gJ2JyZWFrJyB8fFxuICAgICAgICByZWNvcmQudHlwZSA9PT0gJ2NvbnRpbnVlJykge1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSAncmV0dXJuJykge1xuICAgICAgICAgICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgICAgICB0aGlzLm1ldGhvZCA9ICdyZXR1cm4nO1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9ICdlbmQnO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gJ25vcm1hbCcgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgICdjYXRjaCc6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gJ3Rocm93Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAgICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lsbGVnYWwgY2F0Y2ggYXR0ZW1wdCcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICAgICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgICAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRoaXMubWV0aG9kID09PSAnbmV4dCcpIHtcbiAgICAgICAgICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAgICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICB9O1xufSkoXG4gICAgLy8gQW1vbmcgdGhlIHZhcmlvdXMgdHJpY2tzIGZvciBvYnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbFxuICAgIC8vIG9iamVjdCwgdGhpcyBzZWVtcyB0byBiZSB0aGUgbW9zdCByZWxpYWJsZSB0ZWNobmlxdWUgdGhhdCBkb2VzIG5vdFxuICAgIC8vIHVzZSBpbmRpcmVjdCBldmFsICh3aGljaCB2aW9sYXRlcyBDb250ZW50IFNlY3VyaXR5IFBvbGljeSkuXG4gICAgdHlwZW9mIGdsb2JhbCA9PT0gJ29iamVjdCcgPyBnbG9iYWwgOlxuICAgICAgICB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyA/IHdpbmRvdyA6XG4gICAgICAgICAgICB0eXBlb2Ygc2VsZiA9PT0gJ29iamVjdCcgPyBzZWxmIDogdGhpc1xuKTsiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iXSwic291cmNlUm9vdCI6IiJ9