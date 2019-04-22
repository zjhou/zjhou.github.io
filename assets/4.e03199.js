(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "0JWj":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

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
  return Object(lib["i" /* req */])(api.posts, 'GET');
};

var api_getPostById = function getPostById(id) {
  return Object(lib["i" /* req */])(Object(lib["e" /* format */])(api.post, id), 'GET');
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
                lib["j" /* store */].set(title, _id);
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
              postId = lib["j" /* store */].get(postName.trim());

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
  fetchnote: fetchNote
};
/* harmony default export */ var basic_cmd = __webpack_exports__["default"] = (commands);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvc3R5bGUvbWFya2Rvd24uY3NzIiwid2VicGFjazovLy8uL2FwcC9qcy9iYXNpYy1jbWQvYWJvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL2FwaS9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL2FwaS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvdHBsL3Bvc3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL2Jhc2ljLWNtZC9scy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvanMvYmFzaWMtY21kL3RvaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvanMvYmFzaWMtY21kL2NhdC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvanMvY29uc3RhbnRzL3N0clZhci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvanMvYmFzaWMtY21kL2ZldGNoTm90ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvanMvYmFzaWMtY21kL2RlbGV0ZU5vdGUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL2Jhc2ljLWNtZC9pbmRleC5qcyJdLCJuYW1lcyI6WyJnaXRodWJMaW5rIiwibGluayIsImFwaUVuZFBvaW50IiwibXlFbmRQb2ludCIsImFwaSIsInBvc3RzIiwicG9zdCIsImV4ZWMiLCJnZXRQb3N0IiwicmVxIiwiZ2V0UG9zdEJ5SWQiLCJpZCIsImZvcm1hdCIsImdldFBvc3RUaXRsZXMiLCJtYXAiLCJ0aXRsZSIsImpvaW4iLCJleGVjQ21kUmVtb3RlIiwiY21kIiwiX2lkIiwiZG9jIiwiZG9jVHBsIiwiaGFuZGxlciIsImZvckVhY2giLCJzdG9yZSIsInNldCIsImNvbnZlcnRlciIsInNob3dkb3duIiwiQ29udmVydGVyIiwib3BlbkxpbmtzSW5OZXdXaW5kb3ciLCJzaW1wbGVMaW5lQnJlYWtzIiwic2V0Rmxhdm9yIiwid2luZG93IiwicGFyYW1zT2JqZWN0IiwiY21kU2V0IiwiJHRlcm1pbmFsIiwicmVzdFBhcmFtcyIsImZyb21QaXBlIiwid3JhcHBlciIsImNvbnRlbnQiLCJodG1sIiwibWFrZUh0bWwiLCJwYXJhbU9iaiIsInBvc3ROYW1lIiwicG9zdElkIiwiZ2V0IiwidHJpbSIsIk1PT05fVVJMIiwiZGVzYyIsIm5vdGVOYW1lIiwiZmV0Y2hOb3RlQ29udGVudCIsImRlbGV0ZU5vdGUiLCJjb21tYW5kcyIsIm1vb24iLCJnb3RvIiwiYWJvdXQiLCJscyIsImNhdCIsImRlbGV0ZW5vdGUiLCJ0b2h0bWwiLCJmZXRjaG5vdGUiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUM7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFFZSxzREFBWTtBQUN2QixNQUFJQSxVQUFVLEdBQUdDLDJCQUFJLENBQUMsUUFBRCxFQUFXLDBCQUFYLENBQXJCO0FBQ0EsU0FBTyxxQkFBcUJELFVBQTVCO0FBQ0gsQzs7QUNMRCxJQUFNRSxXQUFXLEdBQUcsNkJBQXBCO0FBQ0EsSUFBTUMsVUFBVSxHQUFHLG9CQUFuQjtBQUNBLElBQU1DLEdBQUcsR0FBRztBQUNSQyxPQUFLLFlBQUtGLFVBQUwsV0FERztBQUVSRyxNQUFJLFlBQUtILFVBQUwsZUFGSTtBQUdSSSxNQUFJLFlBQUtKLFVBQUw7QUFISSxDQUFaOzs7Ozs7O0FDRkE7QUFDQTs7QUFFQSxJQUFNSyxXQUFPLEdBQUUsU0FBVEEsT0FBUyxHQUFNO0FBQ2pCLFNBQU9DLDBCQUFHLENBQUNMLEdBQUcsQ0FBQ0MsS0FBTCxFQUFZLEtBQVosQ0FBVjtBQUNILENBRkQ7O0FBSUEsSUFBTUssZUFBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ0MsRUFBRCxFQUFRO0FBQ3hCLFNBQU9GLDBCQUFHLENBQUNHLDZCQUFNLENBQUNSLEdBQUcsQ0FBQ0UsSUFBTCxFQUFXSyxFQUFYLENBQVAsRUFBdUIsS0FBdkIsQ0FBVjtBQUNILENBRkQ7O0FBSUEsSUFBTUUsYUFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDRUwsV0FBTyxFQURUOztBQUFBO0FBQ1pILGlCQURZO0FBQUEsNkNBRVhBLEtBQUssQ0FBQ1MsR0FBTixDQUFVO0FBQUEsa0JBQUVDLEtBQUYsU0FBRUEsS0FBRjtBQUFBLHFCQUFhQSxLQUFiO0FBQUEsYUFBVixFQUE4QkMsSUFBOUIsQ0FBbUMsR0FBbkMsQ0FGVzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFiSCxhQUFhO0FBQUE7QUFBQTtBQUFBLEdBQW5COztBQUtBLElBQU1JLGlCQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUNDLEdBQUQsRUFBUztBQUMzQixTQUFPVCwwQkFBRyxDQUFDRyw2QkFBTSxDQUFDUixHQUFHLENBQUNHLElBQUwsRUFBV1csR0FBWCxDQUFQLEVBQXdCLEtBQXhCLENBQVY7QUFDSCxDQUZEOzs7O0FDaEJBLElBQU1ILFVBQUssR0FBRztBQUFBLE1BQUVBLEtBQUYsUUFBRUEsS0FBRjtBQUFBLE1BQVNJLEdBQVQsUUFBU0EsR0FBVDtBQUFBLDBEQUM2QkosS0FEN0IsbUNBQ3lESSxHQUR6RCxnQkFDaUVKLEtBRGpFO0FBQUEsQ0FBZDs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFFQSxJQUFNSyxHQUFHLEdBQUdDLDZCQUFNLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxzQkFBYixDQUFsQjtBQUNlO0FBQ1hDLFNBQU87QUFBQTtBQUFBO0FBQUEsNEJBQUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFDZWQsV0FBTyxFQUR0Qjs7QUFBQTtBQUNDSCxtQkFERDtBQUVMQSxtQkFBSyxDQUFDa0IsT0FBTixDQUFjLGdCQUFrQjtBQUFBLG9CQUFoQlIsS0FBZ0IsUUFBaEJBLEtBQWdCO0FBQUEsb0JBQVRJLEdBQVMsUUFBVEEsR0FBUztBQUM1Qkssb0NBQUssQ0FBQ0MsR0FBTixDQUFVVixLQUFWLEVBQWlCSSxHQUFqQjtBQUNILGVBRkQ7QUFGSywrQ0FLRWQsS0FBSyxDQUFDUyxHQUFOLENBQVVDLFVBQVYsRUFBaUJDLElBQWpCLENBQXNCLEdBQXRCLENBTEY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxLQURJO0FBUVhJLEtBQUcsRUFBSEE7QUFSVyxDQUFmLEU7Ozs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBLElBQUlNLFNBQVMsR0FBRyxJQUFJQyxrQkFBUSxDQUFDQyxTQUFiLENBQXVCO0FBQ25DQyxzQkFBb0IsRUFBRSxJQURhO0FBRW5DQyxrQkFBZ0IsRUFBRTtBQUZpQixDQUF2QixDQUFoQjtBQUlBSixTQUFTLENBQUNLLFNBQVYsQ0FBb0IsUUFBcEI7QUFDQUMsTUFBTSxDQUFDTixTQUFQLEdBQW1CQSxTQUFuQjtBQUVBLElBQU1OLFVBQUcsR0FBR0MsNkJBQU0sQ0FBQywyQ0FBRCxFQUE4QywwQkFBOUMsRUFBMEUsTUFBMUUsQ0FBbEI7QUFDZTtBQUNYQyxTQUFPLEVBQUUsaUJBQVVXLFlBQVYsRUFBd0JDLE1BQXhCLEVBQWdDQyxTQUFoQyxRQUFtRTtBQUFBLFFBQXZCQyxVQUF1QixRQUF2QkEsVUFBdUI7QUFBQSxRQUFYQyxRQUFXLFFBQVhBLFFBQVc7O0FBQ3hFLFFBQUlDLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUNDLE9BQUQ7QUFBQSxvREFDa0JBLE9BRGxCO0FBQUEsS0FBZDs7QUFHQSxXQUFPO0FBQUNDLFVBQUksRUFBRUYsT0FBTyxDQUFDWixTQUFTLENBQUNlLFFBQVYsQ0FBbUJKLFFBQVEsSUFBSUQsVUFBL0IsQ0FBRDtBQUFkLEtBQVA7QUFDSCxHQU5VO0FBT1hoQixLQUFHLEVBQUhBLFVBQUdBO0FBUFEsQ0FBZixFOzs7Ozs7QUNYQTtBQUNBO0FBRUEsSUFBTUEsT0FBRyxHQUFHQyw2QkFBTSxDQUFDLEtBQUQsRUFBUSxrQkFBUixFQUE0QixtQkFBNUIsQ0FBbEI7QUFFZTtBQUNYQyxTQUFPO0FBQUE7QUFBQTtBQUFBLDRCQUFFLGlCQUFnQm9CLFFBQWhCLEVBQTBCUixNQUExQixFQUFrQ0MsU0FBbEM7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEwRFEsc0JBQTFELFFBQThDUCxVQUE5QztBQUNDUSxvQkFERCxHQUNVcEIsb0JBQUssQ0FBQ3FCLEdBQU4sQ0FBVUYsUUFBUSxDQUFDRyxJQUFULEVBQVYsQ0FEVjs7QUFBQSxrQkFFQUYsTUFGQTtBQUFBO0FBQUE7QUFBQTs7QUFBQSwrQ0FHSSxFQUhKOztBQUFBO0FBQUE7QUFBQSxxQkFNbUJsQyxlQUFXLENBQUNrQyxNQUFELENBTjlCOztBQUFBO0FBQUE7QUFNRUwscUJBTkYsU0FNRUEsT0FORjtBQUFBLCtDQU9FQSxPQVBGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsS0FESTtBQVVYbkIsS0FBRyxFQUFIQSxPQUFHQTtBQVZRLENBQWYsRTs7QUNMQSxJQUFNMkIsUUFBUSxHQUFHLGlCQUFqQjs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFFQSxJQUFNQyxJQUFJLEdBQUcsa0RBQWI7QUFFQSxJQUFNNUIsYUFBRyxHQUFHQyw2QkFBTSxDQUFDLFdBQUQsRUFBYyxzQkFBZCxFQUFzQzJCLElBQXRDLENBQWxCO0FBQ2U7QUFDYjVCLEtBQUcsRUFBSEEsYUFEYTtBQUVQRSxTQUZPO0FBQUE7QUFBQTtBQUFBLDZDQUVDb0IsUUFGRCxFQUVXUixNQUZYLEVBRW1CQyxTQUZuQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFMkNjLHNCQUYzQyxRQUUrQmIsVUFGL0I7QUFBQSwrQ0FHSmMsNENBQWdCLENBQUNELFFBQUQsQ0FIWjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLENBQWYsRTs7Ozs7O0FDTkE7QUFDQTtBQUVBLElBQU1ELGVBQUksR0FBRyxtREFBYjtBQUVBLElBQU01QixjQUFHLEdBQUdDLDZCQUFNLENBQUMsWUFBRCxFQUFlLHNCQUFmLEVBQXVDMkIsZUFBdkMsQ0FBbEI7QUFDZTtBQUNiNUIsS0FBRyxFQUFIQSxjQURhO0FBRVBFLFNBRk87QUFBQTtBQUFBO0FBQUEsNkNBRUNvQixRQUZELEVBRVdSLE1BRlgsRUFFbUJDLFNBRm5CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUUyQ2Msc0JBRjNDLFFBRStCYixVQUYvQjs7QUFBQSxrQkFHTmEsUUFITTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxvQkFJSCxXQUpHOztBQUFBO0FBQUEsK0NBT0ZFLHNDQUFVLENBQUNGLFFBQUQsQ0FQUjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLENBQWYsRTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUcsUUFBUSxHQUFHO0FBQ2JDLE1BQUksRUFBRSxnQkFBTTtBQUFDQywrQkFBSSxDQUFDUCxRQUFELENBQUo7QUFBZ0IsR0FEaEI7QUFFYlEsT0FBSyxFQUFMQSxLQUZhO0FBR2JDLElBQUUsRUFBRkEsRUFIYTtBQUliQyxLQUFHLEVBQUhBLEdBSmE7QUFLYkMsWUFBVSxFQUFWQSxVQUxhO0FBTWJDLFFBQU0sRUFBTkEsTUFOYTtBQU9iQyxXQUFTLEVBQVRBLFNBQVNBO0FBUEksQ0FBakI7QUFVZVIsdUZBQWYsRSIsImZpbGUiOiI0LmUwMzE5OS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwiaW1wb3J0IHtsaW5rfSBmcm9tICdAemhvdWppYWhhby91dGlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgZ2l0aHViTGluayA9IGxpbmsoJ2dpdGh1YicsICdodHRwczovL2dpdGh1Yi5jb20vempob3UnKTtcclxuICAgIHJldHVybiAnempoLCDnlLcgfCDliY3nq6/lvIDlj5EgfCAnICsgZ2l0aHViTGluaztcclxufSIsImNvbnN0IGFwaUVuZFBvaW50ID0gJ2h0dHBzOi8vYXBpLmZ1ZnUuaW0vZ3JhcGhxbCc7XHJcbmNvbnN0IG15RW5kUG9pbnQgPSAnaHR0cHM6Ly9hcGkuempoLmltJztcclxuY29uc3QgYXBpID0ge1xyXG4gICAgcG9zdHM6IGAke215RW5kUG9pbnR9L3Bvc3RzYCxcclxuICAgIHBvc3Q6IGAke215RW5kUG9pbnR9L3Bvc3RzL3swfWAsXHJcbiAgICBleGVjOiBgJHtteUVuZFBvaW50fS90ZXJtaW5hbC9leGVjL3swfWBcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBhcGksXHJcbiAgICBhcGlFbmRQb2ludFxyXG59O1xyXG5cclxuXHJcbiIsImltcG9ydCB7cmVxLCBmb3JtYXR9IGZyb20gJ0B6aG91amlhaGFvL3V0aWxzJztcclxuaW1wb3J0IHthcGl9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbmNvbnN0IGdldFBvc3Q9ICgpID0+IHtcclxuICAgIHJldHVybiByZXEoYXBpLnBvc3RzLCAnR0VUJyk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRQb3N0QnlJZCA9IChpZCkgPT4ge1xyXG4gICAgcmV0dXJuIHJlcShmb3JtYXQoYXBpLnBvc3QsIGlkKSwgJ0dFVCcpO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UG9zdFRpdGxlcyA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHBvc3RzID0gYXdhaXQgZ2V0UG9zdCgpO1xyXG4gICAgcmV0dXJuIHBvc3RzLm1hcCgoe3RpdGxlfSkgPT4gdGl0bGUpLmpvaW4oJyAnKTtcclxufTtcclxuXHJcbmNvbnN0IGV4ZWNDbWRSZW1vdGUgPSAoY21kKSA9PiB7XHJcbiAgICByZXR1cm4gcmVxKGZvcm1hdChhcGkuZXhlYywgY21kKSwgJ0dFVCcpO1xyXG59O1xyXG5cclxuZXhwb3J0IHtnZXRQb3N0LCBnZXRQb3N0VGl0bGVzLCBnZXRQb3N0QnlJZCwgZXhlY0NtZFJlbW90ZX07XHJcbiIsImNvbnN0IHRpdGxlID0gKHt0aXRsZSwgX2lkfSkgPT5cclxuICAgIGA8c3BhbiBjbGFzcz1cImNvbW1hbmRcIiBkYXRhLWNtZD1cImNhdCAke3RpdGxlfSB8IHRvaHRtbFwiIGRhdGEtaWQ9XCIke19pZH1cIj4ke3RpdGxlfTwvc3Bhbj5gO1xyXG5cclxuZXhwb3J0IHt0aXRsZX07IiwiaW1wb3J0IHtnZXRQb3N0fSBmcm9tICcuLi9hcGknO1xyXG5pbXBvcnQge3RpdGxlfSBmcm9tICcuLi8uLi90cGwvcG9zdCc7XHJcbmltcG9ydCB7ZG9jVHBsLCBzdG9yZX0gZnJvbSAnQHpob3VqaWFoYW8vdXRpbHMnO1xyXG5cclxuY29uc3QgZG9jID0gZG9jVHBsKCdscycsICdscycsICdsaXN0IGFsbCBwb3N0IHRpdGxlcycpO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBoYW5kbGVyOiBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgcG9zdHMgPSBhd2FpdCBnZXRQb3N0KCk7XHJcbiAgICAgICAgcG9zdHMuZm9yRWFjaCgoe3RpdGxlLCBfaWR9KSA9PiB7XHJcbiAgICAgICAgICAgIHN0b3JlLnNldCh0aXRsZSwgX2lkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcG9zdHMubWFwKHRpdGxlKS5qb2luKCcgJyk7XHJcbiAgICB9LFxyXG4gICAgZG9jXHJcbn07IiwiaW1wb3J0IHNob3dkb3duIGZyb20gJ3Nob3dkb3duJztcclxuaW1wb3J0ICcuLi8uLi9zdHlsZS9tYXJrZG93bi5jc3MnO1xyXG5pbXBvcnQge2RvY1RwbH0gZnJvbSAnQHpob3VqaWFoYW8vdXRpbHMnO1xyXG5sZXQgY29udmVydGVyID0gbmV3IHNob3dkb3duLkNvbnZlcnRlcih7XHJcbiAgICBvcGVuTGlua3NJbk5ld1dpbmRvdzogdHJ1ZSxcclxuICAgIHNpbXBsZUxpbmVCcmVha3M6IHRydWVcclxufSk7XHJcbmNvbnZlcnRlci5zZXRGbGF2b3IoJ2dpdGh1YicpO1xyXG53aW5kb3cuY29udmVydGVyID0gY29udmVydGVyO1xyXG5cclxuY29uc3QgZG9jID0gZG9jVHBsKCd0b2h0bWwgLS0gcGFyc2UgbWFya2Rvd24gaW50byBodG1sIGZvcm1hdCcsICd0b2h0bWwgW21hcmtkb3duIHN0cmluZ10nLCAnTlVMTCcpO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBoYW5kbGVyOiBmdW5jdGlvbiAocGFyYW1zT2JqZWN0LCBjbWRTZXQsICR0ZXJtaW5hbCwge3Jlc3RQYXJhbXMsIGZyb21QaXBlfSkge1xyXG4gICAgICAgIGxldCB3cmFwcGVyID0gKGNvbnRlbnQpID0+XHJcbiAgICAgICAgICBgPGRpdiBjbGFzcz1cIm1hcmtkb3duLWJvZHlcIj4ke2NvbnRlbnR9PC9kaXY+YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtodG1sOiB3cmFwcGVyKGNvbnZlcnRlci5tYWtlSHRtbChmcm9tUGlwZSB8fCByZXN0UGFyYW1zKSl9O1xyXG4gICAgfSxcclxuICAgIGRvY1xyXG59OyIsImltcG9ydCB7c3RvcmUsIGRvY1RwbH0gZnJvbSAnQHpob3VqaWFoYW8vdXRpbHMnO1xyXG5pbXBvcnQge2dldFBvc3RCeUlkfSBmcm9tICcuLi9hcGknO1xyXG5cclxuY29uc3QgZG9jID0gZG9jVHBsKCdjYXQnLCAnY2F0IDxwb3N0IHRpdGxlPicsICdzaG93IHBvc3QgY29udGVudCcpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgaGFuZGxlcjogYXN5bmMgZnVuY3Rpb24gKHBhcmFtT2JqLCBjbWRTZXQsICR0ZXJtaW5hbCwge3Jlc3RQYXJhbXM6IHBvc3ROYW1lfSkge1xyXG4gICAgICAgIGNvbnN0IHBvc3RJZCA9IHN0b3JlLmdldChwb3N0TmFtZS50cmltKCkpO1xyXG4gICAgICAgIGlmICghcG9zdElkKSB7XHJcbiAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7Y29udGVudH0gPSBhd2FpdCBnZXRQb3N0QnlJZChwb3N0SWQpO1xyXG4gICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfSxcclxuICAgIGRvY1xyXG59O1xyXG4iLCJjb25zdCBNT09OX1VSTCA9ICdodHRwczovL2Z1ZnUuaW0nO1xyXG5cclxuZXhwb3J0IHtNT09OX1VSTH07IiwiaW1wb3J0IHtkb2NUcGx9IGZyb20gJ0B6aG91amlhaGFvL3V0aWxzJztcclxuaW1wb3J0IHtmZXRjaE5vdGVDb250ZW50fSBmcm9tICdAemhvdWppYWhhby9ub3RlYm9vaydcclxuXHJcbmNvbnN0IGRlc2MgPSAnZmV0Y2hub3RlIC0g6I635Y+WIGdpdGh1YiDku5PlupMgempob3Uvbm90ZXMvX3Bvc3RzIOS4i+eahOaWh+S7tic7XHJcblxyXG5jb25zdCBkb2MgPSBkb2NUcGwoJ2ZldGNobm90ZScsICdmZXRjaG5vdGUgPGZpbGVQYXRoPicsIGRlc2MpO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZG9jLFxyXG4gIGFzeW5jIGhhbmRsZXIocGFyYW1PYmosIGNtZFNldCwgJHRlcm1pbmFsLCB7cmVzdFBhcmFtczogbm90ZU5hbWV9KSB7XHJcbiAgICByZXR1cm4gZmV0Y2hOb3RlQ29udGVudChub3RlTmFtZSk7XHJcbiAgfVxyXG59OyIsImltcG9ydCB7ZG9jVHBsfSBmcm9tICdAemhvdWppYWhhby91dGlscyc7XG5pbXBvcnQge2RlbGV0ZU5vdGV9IGZyb20gJ0B6aG91amlhaGFvL25vdGVib29rJ1xuXG5jb25zdCBkZXNjID0gJ2RlbGV0ZW5vdGUgLSDliKDpmaQgZ2l0aHViIOS7k+W6kyB6amhvdS9ub3Rlcy9fcG9zdHMg5LiL55qE5paH5Lu2JztcblxuY29uc3QgZG9jID0gZG9jVHBsKCdkZWxldGVub3RlJywgJ2ZldGNobm90ZSA8ZmlsZVBhdGg+JywgZGVzYyk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIGRvYyxcbiAgYXN5bmMgaGFuZGxlcihwYXJhbU9iaiwgY21kU2V0LCAkdGVybWluYWwsIHtyZXN0UGFyYW1zOiBub3RlTmFtZX0pIHtcbiAgICBpZiAoIW5vdGVOYW1lKSB7XG4gICAgICB0aHJvdyAn6K+36L6T5YWl5YeG56Gu55qE5paH5Lu25ZCNJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZGVsZXRlTm90ZShub3RlTmFtZSk7XG4gICAgfVxuICB9XG59OyIsImltcG9ydCBhYm91dCBmcm9tICcuL2Fib3V0JztcclxuaW1wb3J0IGxzIGZyb20gJy4vbHMnO1xyXG5pbXBvcnQgdG9odG1sIGZyb20gJy4vdG9odG1sJztcclxuaW1wb3J0IGNhdCBmcm9tICcuL2NhdCc7XHJcbmltcG9ydCB7TU9PTl9VUkx9IGZyb20gJy4uL2NvbnN0YW50cy9zdHJWYXInO1xyXG5pbXBvcnQgZmV0Y2hub3RlIGZyb20gJy4vZmV0Y2hOb3RlJztcclxuaW1wb3J0IGRlbGV0ZW5vdGUgZnJvbSAnLi9kZWxldGVOb3RlJztcclxuaW1wb3J0IHtnb3RvfSBmcm9tICdAemhvdWppYWhhby91dGlscy8nO1xyXG5cclxuY29uc3QgY29tbWFuZHMgPSB7XHJcbiAgICBtb29uOiAoKSA9PiB7Z290byhNT09OX1VSTCk7fSxcclxuICAgIGFib3V0LFxyXG4gICAgbHMsXHJcbiAgICBjYXQsXHJcbiAgICBkZWxldGVub3RlLFxyXG4gICAgdG9odG1sLFxyXG4gICAgZmV0Y2hub3RlLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tbWFuZHM7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=