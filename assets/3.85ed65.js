(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "0JWj":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "w74N":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@zhoujiahao/utils/lib/index.js + 5 modules
var lib = __webpack_require__("8RZD");

// CONCATENATED MODULE: ./app/js/basic-cmd/about.js

/* harmony default export */ var about = (function () {
  var githubLink = Object(lib["g" /* link */])('github', 'https://github.com/zjhou');
  return 'zjh, 男 | 前端开发 | ' + githubLink;
});
// CONCATENATED MODULE: ./app/js/api/constants.js
var apiEndPoint = 'https://api.fufu.im/graphql';
var myEndPoint = 'https://api.zjh.im';
var api = {
  posts: "".concat(myEndPoint, "/posts"),
  post: "".concat(myEndPoint, "/posts/{0}"),
  exec: "".concat(myEndPoint, "/terminal/exec/{0}")
};

// CONCATENATED MODULE: ./app/js/api/index.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var api_getPost = function getPost() {
  return Object(lib["j" /* reqAndCache */])(api.posts, 'GET');
};

var api_getPostById = function getPostById(id) {
  return Object(lib["j" /* reqAndCache */])(Object(lib["e" /* format */])(api.post, id), 'GET');
};

var getPostTitles =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var posts;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return api_getPost();

          case 2:
            posts = _context.sent;
            return _context.abrupt("return", posts.map(function (_ref2) {
              var title = _ref2.title;
              return title;
            }).join(' '));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getPostTitles() {
    return _ref.apply(this, arguments);
  };
}();

var api_execCmdRemote = function execCmdRemote(cmd) {
  return Object(lib["i" /* req */])(Object(lib["e" /* format */])(api.exec, cmd), 'GET');
};


// CONCATENATED MODULE: ./app/tpl/post.js
var post_title = function title(_ref) {
  var title = _ref.title,
      _id = _ref._id;
  return "<span class=\"command\" data-cmd=\"cat ".concat(title, " | tohtml\" data-id=\"").concat(_id, "\">").concat(title, "</span>");
};


// CONCATENATED MODULE: ./app/js/basic-cmd/ls.js
function ls_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function ls_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { ls_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { ls_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var doc = Object(lib["d" /* docTpl */])('ls', 'ls', 'list all post titles');
/* harmony default export */ var ls = ({
  handler: function () {
    var _handler = ls_asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var posts;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return api_getPost();

            case 2:
              posts = _context.sent;
              posts.forEach(function (_ref) {
                var title = _ref.title,
                    _id = _ref._id;
                lib["k" /* store */].set(title, _id);
              });
              return _context.abrupt("return", posts.map(post_title).join(' '));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function handler() {
      return _handler.apply(this, arguments);
    }

    return handler;
  }(),
  doc: doc
});
// EXTERNAL MODULE: ./node_modules/showdown/dist/showdown.js
var showdown = __webpack_require__("M55E");
var showdown_default = /*#__PURE__*/__webpack_require__.n(showdown);

// EXTERNAL MODULE: ./app/style/markdown.css
var markdown = __webpack_require__("0JWj");

// CONCATENATED MODULE: ./app/js/basic-cmd/tohtml.js



var converter = new showdown_default.a.Converter({
  openLinksInNewWindow: true,
  simpleLineBreaks: true
});
converter.setFlavor('github');
window.converter = converter;
var tohtml_doc = Object(lib["d" /* docTpl */])('tohtml -- parse markdown into html format', 'tohtml [markdown string]', 'NULL');
/* harmony default export */ var tohtml = ({
  handler: function handler(paramsObject, cmdSet, $terminal, _ref) {
    var restParams = _ref.restParams,
        fromPipe = _ref.fromPipe;

    var wrapper = function wrapper(content) {
      return "<div class=\"markdown-body\">".concat(content, "</div>");
    };

    return {
      html: wrapper(converter.makeHtml(fromPipe || restParams))
    };
  },
  doc: tohtml_doc
});
// CONCATENATED MODULE: ./app/js/basic-cmd/cat.js
function cat_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function cat_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { cat_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { cat_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var cat_doc = Object(lib["d" /* docTpl */])('cat', 'cat <post title>', 'show post content');
/* harmony default export */ var cat = ({
  handler: function () {
    var _handler = cat_asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(paramObj, cmdSet, $terminal, _ref) {
      var postName, postId, _ref2, content;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              postName = _ref.restParams;
              postId = lib["k" /* store */].get(postName.trim());

              if (postId) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", '');

            case 4:
              _context.next = 6;
              return api_getPostById(postId);

            case 6:
              _ref2 = _context.sent;
              content = _ref2.content;
              return _context.abrupt("return", content);

            case 9:
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
  }(),
  doc: cat_doc
});
// CONCATENATED MODULE: ./app/js/constants/strVar.js
var MOON_URL = 'https://fufu.im';

// EXTERNAL MODULE: ./node_modules/@zhoujiahao/notebook/lib/notebook.js
var notebook = __webpack_require__("LDA1");

// CONCATENATED MODULE: ./app/js/basic-cmd/fetchNote.js
function fetchNote_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function fetchNote_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { fetchNote_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { fetchNote_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var desc = 'fetchnote - 获取 github 仓库 zjhou/notes/_posts 下的文件';
var fetchNote_doc = Object(lib["d" /* docTpl */])('fetchnote', 'fetchnote <filePath>', desc);
/* harmony default export */ var fetchNote = ({
  doc: fetchNote_doc,
  handler: function () {
    var _handler = fetchNote_asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(paramObj, cmdSet, $terminal, _ref) {
      var noteName;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              noteName = _ref.restParams;
              return _context.abrupt("return", Object(notebook["c" /* fetchNoteContent */])(noteName));

            case 2:
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
// CONCATENATED MODULE: ./app/js/basic-cmd/deleteNote.js
function deleteNote_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function deleteNote_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { deleteNote_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { deleteNote_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var deleteNote_desc = 'deletenote - 删除 github 仓库 zjhou/notes/_posts 下的文件';
var deleteNote_doc = Object(lib["d" /* docTpl */])('deletenote', 'fetchnote <filePath>', deleteNote_desc);
/* harmony default export */ var deleteNote = ({
  doc: deleteNote_doc,
  handler: function () {
    var _handler = deleteNote_asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(paramObj, cmdSet, $terminal, _ref) {
      var noteName;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              noteName = _ref.restParams;

              if (noteName) {
                _context.next = 5;
                break;
              }

              throw '请输入准确的文件名';

            case 5:
              return _context.abrupt("return", Object(notebook["b" /* deleteNote */])(noteName));

            case 6:
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
// CONCATENATED MODULE: ./app/js/basic-cmd/index.js








var commands = {
  moon: function moon() {
    Object(lib["f" /* goto */])(MOON_URL);
  },
  about: about,
  ls: ls,
  cat: cat,
  deletenote: deleteNote,
  tohtml: tohtml,
  fetchnote: fetchNote,
  exit: function exit() {
    window.Terminal.destroy();
  }
};
/* harmony default export */ var basic_cmd = __webpack_exports__["default"] = (commands);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvc3R5bGUvbWFya2Rvd24uY3NzPzU4MTUiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL2Jhc2ljLWNtZC9hYm91dC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvanMvYXBpL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvanMvYXBpL2luZGV4LmpzIiwid2VicGFjazovLy8uL2FwcC90cGwvcG9zdC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvanMvYmFzaWMtY21kL2xzLmpzIiwid2VicGFjazovLy8uL2FwcC9qcy9iYXNpYy1jbWQvdG9odG1sLmpzIiwid2VicGFjazovLy8uL2FwcC9qcy9iYXNpYy1jbWQvY2F0LmpzIiwid2VicGFjazovLy8uL2FwcC9qcy9jb25zdGFudHMvc3RyVmFyLmpzIiwid2VicGFjazovLy8uL2FwcC9qcy9iYXNpYy1jbWQvZmV0Y2hOb3RlLmpzIiwid2VicGFjazovLy8uL2FwcC9qcy9iYXNpYy1jbWQvZGVsZXRlTm90ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvanMvYmFzaWMtY21kL2luZGV4LmpzIl0sIm5hbWVzIjpbImdpdGh1YkxpbmsiLCJsaW5rIiwiYXBpRW5kUG9pbnQiLCJteUVuZFBvaW50IiwiYXBpIiwicG9zdHMiLCJwb3N0IiwiZXhlYyIsImdldFBvc3QiLCJyZXFBbmRDYWNoZSIsImdldFBvc3RCeUlkIiwiaWQiLCJmb3JtYXQiLCJnZXRQb3N0VGl0bGVzIiwibWFwIiwidGl0bGUiLCJqb2luIiwiZXhlY0NtZFJlbW90ZSIsImNtZCIsInJlcSIsIl9pZCIsImRvYyIsImRvY1RwbCIsImhhbmRsZXIiLCJmb3JFYWNoIiwic3RvcmUiLCJzZXQiLCJjb252ZXJ0ZXIiLCJzaG93ZG93biIsIkNvbnZlcnRlciIsIm9wZW5MaW5rc0luTmV3V2luZG93Iiwic2ltcGxlTGluZUJyZWFrcyIsInNldEZsYXZvciIsIndpbmRvdyIsInBhcmFtc09iamVjdCIsImNtZFNldCIsIiR0ZXJtaW5hbCIsInJlc3RQYXJhbXMiLCJmcm9tUGlwZSIsIndyYXBwZXIiLCJjb250ZW50IiwiaHRtbCIsIm1ha2VIdG1sIiwicGFyYW1PYmoiLCJwb3N0TmFtZSIsInBvc3RJZCIsImdldCIsInRyaW0iLCJNT09OX1VSTCIsImRlc2MiLCJub3RlTmFtZSIsImZldGNoTm90ZUNvbnRlbnQiLCJkZWxldGVOb3RlIiwiY29tbWFuZHMiLCJtb29uIiwiZ290byIsImFib3V0IiwibHMiLCJjYXQiLCJkZWxldGVub3RlIiwidG9odG1sIiwiZmV0Y2hub3RlIiwiZXhpdCIsIlRlcm1pbmFsIiwiZGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Qzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUVlLHNEQUFZO0FBQ3ZCLE1BQUlBLFVBQVUsR0FBR0MsMkJBQUksQ0FBQyxRQUFELEVBQVcsMEJBQVgsQ0FBckI7QUFDQSxTQUFPLHFCQUFxQkQsVUFBNUI7QUFDSCxDOztBQ0xELElBQU1FLFdBQVcsR0FBRyw2QkFBcEI7QUFDQSxJQUFNQyxVQUFVLEdBQUcsb0JBQW5CO0FBQ0EsSUFBTUMsR0FBRyxHQUFHO0FBQ1JDLE9BQUssWUFBS0YsVUFBTCxXQURHO0FBRVJHLE1BQUksWUFBS0gsVUFBTCxlQUZJO0FBR1JJLE1BQUksWUFBS0osVUFBTDtBQUhJLENBQVo7Ozs7Ozs7QUNGQTtBQUNBOztBQUVBLElBQU1LLFdBQU8sR0FBRSxTQUFUQSxPQUFTLEdBQU07QUFDakIsU0FBT0Msa0NBQVcsQ0FBQ0wsR0FBRyxDQUFDQyxLQUFMLEVBQVksS0FBWixDQUFsQjtBQUNILENBRkQ7O0FBSUEsSUFBTUssZUFBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ0MsRUFBRCxFQUFRO0FBQ3hCLFNBQU9GLGtDQUFXLENBQUNHLDZCQUFNLENBQUNSLEdBQUcsQ0FBQ0UsSUFBTCxFQUFXSyxFQUFYLENBQVAsRUFBdUIsS0FBdkIsQ0FBbEI7QUFDSCxDQUZEOztBQUlBLElBQU1FLGFBQWE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHO0FBQUE7QUFBQTtB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ZixFQUF1QzJCLGVBQXZDLENBQWxCO0FBQ2U7QUFDYjVCLEtBQUcsRUFBSEEsY0FEYTtBQUVQRSxTQUZPO0FBQUE7QUFBQTtBQUFBLDZDQUVDb0IsUUFGRCxFQUVXUixNQUZYLEVBRW1CQyxTQUZuQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFMkNjLHNCQUYzQyxRQUUrQmIsVUFGL0I7O0FBQUEsa0JBR05hLFFBSE07QUFBQTtBQUFBO0FBQUE7O0FBQUEsb0JBSUgsV0FKRzs7QUFBQTtBQUFBLCtDQU9GRSxzQ0FBVSxDQUFDRixRQUFELENBUFI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxDQUFmLEU7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1HLFFBQVEsR0FBRztBQUNiQyxNQUFJLEVBQUUsZ0JBQU07QUFBQ0MsK0JBQUksQ0FBQ1AsUUFBRCxDQUFKO0FBQWdCLEdBRGhCO0FBRWJRLE9BQUssRUFBTEEsS0FGYTtBQUdiQyxJQUFFLEVBQUZBLEVBSGE7QUFJYkMsS0FBRyxFQUFIQSxHQUphO0FBS2JDLFlBQVUsRUFBVkEsVUFMYTtBQU1iQyxRQUFNLEVBQU5BLE1BTmE7QUFPYkMsV0FBUyxFQUFUQSxTQVBhO0FBUWJDLE1BQUksRUFBRSxnQkFBTTtBQUFDN0IsVUFBTSxDQUFDOEIsUUFBUCxDQUFnQkMsT0FBaEI7QUFBMEI7QUFSMUIsQ0FBakI7QUFXZVgsdUZBQWYsRSIsImZpbGUiOiIzLjg1ZWQ2NS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCB7bGlua30gZnJvbSAnQHpob3VqaWFoYW8vdXRpbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGdpdGh1YkxpbmsgPSBsaW5rKCdnaXRodWInLCAnaHR0cHM6Ly9naXRodWIuY29tL3pqaG91Jyk7XHJcbiAgICByZXR1cm4gJ3pqaCwg55S3IHwg5YmN56uv5byA5Y+RIHwgJyArIGdpdGh1Ykxpbms7XHJcbn0iLCJjb25zdCBhcGlFbmRQb2ludCA9ICdodHRwczovL2FwaS5mdWZ1LmltL2dyYXBocWwnO1xyXG5jb25zdCBteUVuZFBvaW50ID0gJ2h0dHBzOi8vYXBpLnpqaC5pbSc7XHJcbmNvbnN0IGFwaSA9IHtcclxuICAgIHBvc3RzOiBgJHtteUVuZFBvaW50fS9wb3N0c2AsXHJcbiAgICBwb3N0OiBgJHtteUVuZFBvaW50fS9wb3N0cy97MH1gLFxyXG4gICAgZXhlYzogYCR7bXlFbmRQb2ludH0vdGVybWluYWwvZXhlYy97MH1gXHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gICAgYXBpLFxyXG4gICAgYXBpRW5kUG9pbnRcclxufTtcclxuXHJcblxyXG4iLCJpbXBvcnQge3JlcSwgZm9ybWF0LCByZXFBbmRDYWNoZX0gZnJvbSAnQHpob3VqaWFoYW8vdXRpbHMnO1xyXG5pbXBvcnQge2FwaX0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuY29uc3QgZ2V0UG9zdD0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHJlcUFuZENhY2hlKGFwaS5wb3N0cywgJ0dFVCcpO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UG9zdEJ5SWQgPSAoaWQpID0+IHtcclxuICAgIHJldHVybiByZXFBbmRDYWNoZShmb3JtYXQoYXBpLnBvc3QsIGlkKSwgJ0dFVCcpO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UG9zdFRpdGxlcyA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHBvc3RzID0gYXdhaXQgZ2V0UG9zdCgpO1xyXG4gICAgcmV0dXJuIHBvc3RzLm1hcCgoe3RpdGxlfSkgPT4gdGl0bGUpLmpvaW4oJyAnKTtcclxufTtcclxuXHJcbmNvbnN0IGV4ZWNDbWRSZW1vdGUgPSAoY21kKSA9PiB7XHJcbiAgICByZXR1cm4gcmVxKGZvcm1hdChhcGkuZXhlYywgY21kKSwgJ0dFVCcpO1xyXG59O1xyXG5cclxuZXhwb3J0IHtnZXRQb3N0LCBnZXRQb3N0VGl0bGVzLCBnZXRQb3N0QnlJZCwgZXhlY0NtZFJlbW90ZX07XHJcbiIsImNvbnN0IHRpdGxlID0gKHt0aXRsZSwgX2lkfSkgPT5cclxuICAgIGA8c3BhbiBjbGFzcz1cImNvbW1hbmRcIiBkYXRhLWNtZD1cImNhdCAke3RpdGxlfSB8IHRvaHRtbFwiIGRhdGEtaWQ9XCIke19pZH1cIj4ke3RpdGxlfTwvc3Bhbj5gO1xyXG5cclxuZXhwb3J0IHt0aXRsZX07IiwiaW1wb3J0IHtnZXRQb3N0fSBmcm9tICcuLi9hcGknO1xyXG5pbXBvcnQge3RpdGxlfSBmcm9tICcuLi8uLi90cGwvcG9zdCc7XHJcbmltcG9ydCB7ZG9jVHBsLCBzdG9yZX0gZnJvbSAnQHpob3VqaWFoYW8vdXRpbHMnO1xyXG5cclxuY29uc3QgZG9jID0gZG9jVHBsKCdscycsICdscycsICdsaXN0IGFsbCBwb3N0IHRpdGxlcycpO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBoYW5kbGVyOiBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgcG9zdHMgPSBhd2FpdCBnZXRQb3N0KCk7XHJcbiAgICAgICAgcG9zdHMuZm9yRWFjaCgoe3RpdGxlLCBfaWR9KSA9PiB7XHJcbiAgICAgICAgICAgIHN0b3JlLnNldCh0aXRsZSwgX2lkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcG9zdHMubWFwKHRpdGxlKS5qb2luKCcgJyk7XHJcbiAgICB9LFxyXG4gICAgZG9jXHJcbn07IiwiaW1wb3J0IHNob3dkb3duIGZyb20gJ3Nob3dkb3duJztcclxuaW1wb3J0ICcuLi8uLi9zdHlsZS9tYXJrZG93bi5jc3MnO1xyXG5pbXBvcnQge2RvY1RwbH0gZnJvbSAnQHpob3VqaWFoYW8vdXRpbHMnO1xyXG5sZXQgY29udmVydGVyID0gbmV3IHNob3dkb3duLkNvbnZlcnRlcih7XHJcbiAgICBvcGVuTGlua3NJbk5ld1dpbmRvdzogdHJ1ZSxcclxuICAgIHNpbXBsZUxpbmVCcmVha3M6IHRydWVcclxufSk7XHJcbmNvbnZlcnRlci5zZXRGbGF2b3IoJ2dpdGh1YicpO1xyXG53aW5kb3cuY29udmVydGVyID0gY29udmVydGVyO1xyXG5cclxuY29uc3QgZG9jID0gZG9jVHBsKCd0b2h0bWwgLS0gcGFyc2UgbWFya2Rvd24gaW50byBodG1sIGZvcm1hdCcsICd0b2h0bWwgW21hcmtkb3duIHN0cmluZ10nLCAnTlVMTCcpO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBoYW5kbGVyOiBmdW5jdGlvbiAocGFyYW1zT2JqZWN0LCBjbWRTZXQsICR0ZXJtaW5hbCwge3Jlc3RQYXJhbXMsIGZyb21QaXBlfSkge1xyXG4gICAgICAgIGxldCB3cmFwcGVyID0gKGNvbnRlbnQpID0+XHJcbiAgICAgICAgICBgPGRpdiBjbGFzcz1cIm1hcmtkb3duLWJvZHlcIj4ke2NvbnRlbnR9PC9kaXY+YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtodG1sOiB3cmFwcGVyKGNvbnZlcnRlci5tYWtlSHRtbChmcm9tUGlwZSB8fCByZXN0UGFyYW1zKSl9O1xyXG4gICAgfSxcclxuICAgIGRvY1xyXG59OyIsImltcG9ydCB7c3RvcmUsIGRvY1RwbH0gZnJvbSAnQHpob3VqaWFoYW8vdXRpbHMnO1xyXG5pbXBvcnQge2dldFBvc3RCeUlkfSBmcm9tICcuLi9hcGknO1xyXG5cclxuY29uc3QgZG9jID0gZG9jVHBsKCdjYXQnLCAnY2F0IDxwb3N0IHRpdGxlPicsICdzaG93IHBvc3QgY29udGVudCcpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgaGFuZGxlcjogYXN5bmMgZnVuY3Rpb24gKHBhcmFtT2JqLCBjbWRTZXQsICR0ZXJtaW5hbCwge3Jlc3RQYXJhbXM6IHBvc3ROYW1lfSkge1xyXG4gICAgICAgIGNvbnN0IHBvc3RJZCA9IHN0b3JlLmdldChwb3N0TmFtZS50cmltKCkpO1xyXG4gICAgICAgIGlmICghcG9zdElkKSB7XHJcbiAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7Y29udGVudH0gPSBhd2FpdCBnZXRQb3N0QnlJZChwb3N0SWQpO1xyXG4gICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfSxcclxuICAgIGRvY1xyXG59O1xyXG4iLCJjb25zdCBNT09OX1VSTCA9ICdodHRwczovL2Z1ZnUuaW0nO1xyXG5cclxuZXhwb3J0IHtNT09OX1VSTH07IiwiaW1wb3J0IHtkb2NUcGx9IGZyb20gJ0B6aG91amlhaGFvL3V0aWxzJztcclxuaW1wb3J0IHtmZXRjaE5vdGVDb250ZW50fSBmcm9tICdAemhvdWppYWhhby9ub3RlYm9vaydcclxuXHJcbmNvbnN0IGRlc2MgPSAnZmV0Y2hub3RlIC0g6I635Y+WIGdpdGh1YiDku5PlupMgempob3Uvbm90ZXMvX3Bvc3RzIOS4i+eahOaWh+S7tic7XHJcblxyXG5jb25zdCBkb2MgPSBkb2NUcGwoJ2ZldGNobm90ZScsICdmZXRjaG5vdGUgPGZpbGVQYXRoPicsIGRlc2MpO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZG9jLFxyXG4gIGFzeW5jIGhhbmRsZXIocGFyYW1PYmosIGNtZFNldCwgJHRlcm1pbmFsLCB7cmVzdFBhcmFtczogbm90ZU5hbWV9KSB7XHJcbiAgICByZXR1cm4gZmV0Y2hOb3RlQ29udGVudChub3RlTmFtZSk7XHJcbiAgfVxyXG59OyIsImltcG9ydCB7ZG9jVHBsfSBmcm9tICdAemhvdWppYWhhby91dGlscyc7XG5pbXBvcnQge2RlbGV0ZU5vdGV9IGZyb20gJ0B6aG91amlhaGFvL25vdGVib29rJ1xuXG5jb25zdCBkZXNjID0gJ2RlbGV0ZW5vdGUgLSDliKDpmaQgZ2l0aHViIOS7k+W6kyB6amhvdS9ub3Rlcy9fcG9zdHMg5LiL55qE5paH5Lu2JztcblxuY29uc3QgZG9jID0gZG9jVHBsKCdkZWxldGVub3RlJywgJ2ZldGNobm90ZSA8ZmlsZVBhdGg+JywgZGVzYyk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIGRvYyxcbiAgYXN5bmMgaGFuZGxlcihwYXJhbU9iaiwgY21kU2V0LCAkdGVybWluYWwsIHtyZXN0UGFyYW1zOiBub3RlTmFtZX0pIHtcbiAgICBpZiAoIW5vdGVOYW1lKSB7XG4gICAgICB0aHJvdyAn6K+36L6T5YWl5YeG56Gu55qE5paH5Lu25ZCNJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZGVsZXRlTm90ZShub3RlTmFtZSk7XG4gICAgfVxuICB9XG59OyIsImltcG9ydCBhYm91dCBmcm9tICcuL2Fib3V0JztcclxuaW1wb3J0IGxzIGZyb20gJy4vbHMnO1xyXG5pbXBvcnQgdG9odG1sIGZyb20gJy4vdG9odG1sJztcclxuaW1wb3J0IGNhdCBmcm9tICcuL2NhdCc7XHJcbmltcG9ydCB7TU9PTl9VUkx9IGZyb20gJy4uL2NvbnN0YW50cy9zdHJWYXInO1xyXG5pbXBvcnQgZmV0Y2hub3RlIGZyb20gJy4vZmV0Y2hOb3RlJztcclxuaW1wb3J0IGRlbGV0ZW5vdGUgZnJvbSAnLi9kZWxldGVOb3RlJztcclxuaW1wb3J0IHtnb3RvfSBmcm9tICdAemhvdWppYWhhby91dGlscy8nO1xyXG5cclxuY29uc3QgY29tbWFuZHMgPSB7XHJcbiAgICBtb29uOiAoKSA9PiB7Z290byhNT09OX1VSTCk7fSxcclxuICAgIGFib3V0LFxyXG4gICAgbHMsXHJcbiAgICBjYXQsXHJcbiAgICBkZWxldGVub3RlLFxyXG4gICAgdG9odG1sLFxyXG4gICAgZmV0Y2hub3RlLFxyXG4gICAgZXhpdDogKCkgPT4ge3dpbmRvdy5UZXJtaW5hbC5kZXN0cm95KCl9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tbWFuZHM7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=