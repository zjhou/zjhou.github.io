(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "LDA1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return deleteNote; });
/* unused harmony export listNotes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return updateNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return fetchNoteContent; });
/* harmony import */ var _zhoujiahao_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8RZD");


const POSTS_URL = 'https://api.github.com/repos/zjhou/notes/contents/_posts';
const token = localStorage.getItem('ghtoken');

const listNotes = async () => {
  let notes = _zhoujiahao_utils__WEBPACK_IMPORTED_MODULE_0__[/* store */ "k"].get('notes');
  if (!notes) {
    notes = await Object(_zhoujiahao_utils__WEBPACK_IMPORTED_MODULE_0__[/* req */ "i"])(POSTS_URL, 'GET');
    _zhoujiahao_utils__WEBPACK_IMPORTED_MODULE_0__[/* store */ "k"].set('notes', notes);
  }
  return notes;
};

/**
 * 添加一条笔记到仓库（zjhou/notes）
 * @param noteName 笔记名称，短横线连接多个字符
 * @param noteContent 笔记内容
 * @param dateStr 日期字符串，格式 'YYYY-MM-DD'
 */
const addNote = (noteName, noteContent, dateStr) => {
  if (!token) {
    return Promise.reject('please set PAT first!');
  }

  const noteFileName = `${dateStr || Object(_zhoujiahao_utils__WEBPACK_IMPORTED_MODULE_0__[/* today */ "l"])()}-${noteName}.md`;
  const reqEndPoint = `${POSTS_URL}/${noteFileName}`;
  const commitObj = {
    message: `add note: ${noteFileName}`,
    committer: {name: 'zjhou', email: 'z@zjh.im'},
    content: _zhoujiahao_utils__WEBPACK_IMPORTED_MODULE_0__[/* base64 */ "b"].encode(noteContent)
  };

  return Object(_zhoujiahao_utils__WEBPACK_IMPORTED_MODULE_0__[/* req */ "i"])(
    reqEndPoint,
    'PUT',
    commitObj,
    token
  );
};

/**
 * 更新指定笔记（zjhou/notes）
 * @param noteName 笔记名称，短横线连接多个字符
 * @param noteContent 笔记内容
 */
const updateNote = async (noteName, noteContent) => {
  if (!token) {
    return Promise.reject('please set PAT first!');
  }

  const notes = await listNotes();
  const targetNote = notes.filter(({name}) => {
    return name.includes(noteName)
  })[0];

  if (!targetNote) {
    throw '无法找到笔记';
  }
  const {name, sha} = targetNote;
  const reqEndPoint = `${POSTS_URL}/${name}`;
  const commitObj = {
    message: `update note: ${name}`,
    content: _zhoujiahao_utils__WEBPACK_IMPORTED_MODULE_0__[/* base64 */ "b"].encode(noteContent),
    sha,
    committer: {name: 'zjhou', email: 'z@zjh.im'},
  };

  return Object(_zhoujiahao_utils__WEBPACK_IMPORTED_MODULE_0__[/* req */ "i"])(
    reqEndPoint,
    'PUT',
    commitObj,
    token
  );
};

const deleteNote = async (exactFileName) => {
  if (!token) {
    throw 'please set PAT first!'
  }
  const notes = await listNotes();
  const targetNote = notes.filter(({name}) => {
    return name === exactFileName
  })[0];
  if (!targetNote) {
    throw '无法找到笔记';
  }
  const paramObj = {
    message: `delete note: ${exactFileName}`,
    sha: targetNote.sha
  };
  const targetPath = `${POSTS_URL}/${exactFileName}`;
  return Object(_zhoujiahao_utils__WEBPACK_IMPORTED_MODULE_0__[/* req */ "i"])(
    targetPath,
    'DELETE',
    paramObj,
    token,
  ).then(() => {
    return '成功删除！'
  });
};

const fetchNoteContent = async (noteName) => {
  if (!noteName) {
    throw '请指定笔记名称';
  }
  const notes = await listNotes();
  const notesNameArr = notes.map(({name}) => name.toLowerCase());
  const targetNote = notesNameArr.filter(candi => {
    return candi.includes(noteName.toLowerCase());
  })[0];
  const noteURL = `${POSTS_URL}/${targetNote}`;
  const encodedNote = await Object(_zhoujiahao_utils__WEBPACK_IMPORTED_MODULE_0__[/* req */ "i"])(
    noteURL,
    'GET'
  );
  return _zhoujiahao_utils__WEBPACK_IMPORTED_MODULE_0__[/* base64 */ "b"].decode(encodedNote.content);
};




/***/ }),

/***/ "gXRL":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "zsIg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@zhoujiahao/editor/lib/editor/gui/main.scss
var main = __webpack_require__("gXRL");

// EXTERNAL MODULE: ./node_modules/@zhoujiahao/utils/lib/index.js + 5 modules
var lib = __webpack_require__("8RZD");

// CONCATENATED MODULE: ./node_modules/@zhoujiahao/editor/lib/editor/gui/index.js



/* harmony default export */ var gui = (function (selector, source = '', sourceHTML = '') {
  const $GUI = Object(lib["a" /* $ */])(selector);
  $GUI.innerHTML = `
    <div class="editor-wrapper">
      <div class="edit-area">
          <textarea class="editor">${source}</textarea>
      </div>
      <div class="preview-area"><div class="markdown-body">${sourceHTML}</div></div>
    </div> 
  `;

  $GUI.classList.add('editor');
  $GUI.classList.add('on');

  const $editor = Object(lib["a" /* $ */])("textarea.editor");
  const $preview = Object(lib["a" /* $ */])(".preview-area");

  $editor.focus();

  return {
    $editor,
    $preview,
  }
});
// CONCATENATED MODULE: ./node_modules/@zhoujiahao/editor/lib/editor/index.js




const editor = (source, onOk, onErr) => {
  const sourceHTML = window.converter.makeHtml(source);
  const $GUI = Object(lib["a" /* $ */])("#gui");
  const {
    $editor,
    $preview
  } = gui('#gui', source, sourceHTML);

  const handleOk = () => {
    onOk($editor.value);
    $GUI.classList.remove('on');
    $GUI.innerHTML = '';
  };

  const handleCancel = () => {
    onOk('');
    $GUI.classList.remove('on');
    $GUI.innerHTML = '';
  };

  $editor.addEventListener('keydown', (e) => {
    const {key, ctrlKey} = e;
    const isSave = ctrlKey && key === 's';
    const isExit = ctrlKey && key === 'c';
    if (isSave) {
      handleOk();
      return;
    }
    if (isExit) {
      handleCancel();
    }
  });
  $editor.addEventListener('input', (e) => {
    $preview.innerHTML = window.converter.makeHtml(e.target.value);
  })
};

/* harmony default export */ var lib_editor = (editor);

// EXTERNAL MODULE: ./node_modules/@zhoujiahao/notebook/lib/notebook.js
var notebook = __webpack_require__("LDA1");

// CONCATENATED MODULE: ./node_modules/@zhoujiahao/editor/lib/index.js



/* harmony default export */ var editor_lib = __webpack_exports__["default"] = ({
  shortopts: 'n:u',
  handler(paramObj, cmdSet, $terminal, {restParams, fromPipe}) {
    const editorPromise = new Promise((resolve, reject) => {
      const {n: fileName, u: isUpdate} = paramObj;
      const handleOk = (content) => {
        const handler = isUpdate ? notebook["d" /* updateNote */] : notebook["a" /* addNote */];
        const action = isUpdate ? '更新' : '添加';

        handler(fileName, content)
          .then(() => {
            resolve(`笔记${action}成功！`);
          })
          .catch(reject);
      };

      if (fileName) {
        lib_editor(isUpdate ? fromPipe : '', handleOk, reject);
      } else {
        lib_editor(restParams || fromPipe, resolve, reject)
      }
    });
    return editorPromise;
  }
});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHpob3VqaWFoYW8vbm90ZWJvb2svbGliL25vdGVib29rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AemhvdWppYWhhby9lZGl0b3IvbGliL2VkaXRvci9ndWkvbWFpbi5zY3NzP2E4ODkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B6aG91amlhaGFvL2VkaXRvci9saWIvZWRpdG9yL2d1aS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHpob3VqaWFoYW8vZWRpdG9yL2xpYi9lZGl0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B6aG91amlhaGFvL2VkaXRvci9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThEOztBQUU5RDtBQUNBOztBQUVBO0FBQ0EsY0FBYywrREFBSztBQUNuQjtBQUNBLGtCQUFrQixxRUFBRztBQUNyQixJQUFJLCtEQUFLO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCQUEwQixXQUFXLHVFQUFLLEdBQUcsR0FBRyxTQUFTO0FBQ3pELHlCQUF5QixVQUFVLEdBQUcsYUFBYTtBQUNuRDtBQUNBLDBCQUEwQixhQUFhO0FBQ3ZDLGdCQUFnQixpQ0FBaUM7QUFDakQsYUFBYSxnRUFBTTtBQUNuQjs7QUFFQSxTQUFTLHFFQUFHO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxLQUFLO0FBQ3pDO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxTQUFTLFVBQVU7QUFDbkIseUJBQXlCLFVBQVUsR0FBRyxLQUFLO0FBQzNDO0FBQ0EsNkJBQTZCLEtBQUs7QUFDbEMsYUFBYSxnRUFBTTtBQUNuQjtBQUNBLGdCQUFnQixpQ0FBaUM7QUFDakQ7O0FBRUEsU0FBUyxxRUFBRztBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLEtBQUs7QUFDekM7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsY0FBYztBQUMzQztBQUNBO0FBQ0Esd0JBQXdCLFVBQVUsR0FBRyxjQUFjO0FBQ25ELFNBQVMscUVBQUc7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxLQUFLO0FBQ3hDO0FBQ0E7QUFDQSxHQUFHO0FBQ0gscUJBQXFCLFVBQVUsR0FBRyxXQUFXO0FBQzdDLDRCQUE0QixxRUFBRztBQUMvQjtBQUNBO0FBQ0E7QUFDQSxTQUFTLGdFQUFNO0FBQ2Y7O0FBSUM7Ozs7Ozs7O0FDekhELHVDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FxQjtBQUNjOztBQUVwQjtBQUNmLGVBQWUsd0JBQUM7QUFDaEI7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLE9BQU87QUFDNUM7QUFDQSw2REFBNkQsV0FBVztBQUN4RTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCLHdCQUFDO0FBQ25CLG1CQUFtQix3QkFBQzs7QUFFcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOztBQzFCYTtBQUNjO0FBQ1M7O0FBRXBDO0FBQ0E7QUFDQSxlQUFlLHdCQUFDO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLEdBQUcsR0FBRyxHQUFPOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsYUFBYTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFZSxxREFBTSxFQUFDOzs7Ozs7QUN6Q1E7QUFDMkI7O0FBRTFDO0FBQ2Y7QUFDQSx3Q0FBd0MscUJBQXFCO0FBQzdEO0FBQ0EsYUFBYSx5QkFBeUI7QUFDdEM7QUFDQSxtQ0FBbUMsOEJBQVUsR0FBRywyQkFBTztBQUN2RDs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCLE9BQU87QUFDaEMsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLFVBQU07QUFDZCxPQUFPO0FBQ1AsUUFBUSxVQUFNO0FBQ2Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEMiLCJmaWxlIjoiMi44MWZjY2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0b2RheSwgc3RvcmUsIHJlcSwgYmFzZTY0IH0gZnJvbSBcIkB6aG91amlhaGFvL3V0aWxzXCI7XG5cbmNvbnN0IFBPU1RTX1VSTCA9ICdodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zL3pqaG91L25vdGVzL2NvbnRlbnRzL19wb3N0cyc7XG5jb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnaHRva2VuJyk7XG5cbmNvbnN0IGxpc3ROb3RlcyA9IGFzeW5jICgpID0+IHtcbiAgbGV0IG5vdGVzID0gc3RvcmUuZ2V0KCdub3RlcycpO1xuICBpZiAoIW5vdGVzKSB7XG4gICAgbm90ZXMgPSBhd2FpdCByZXEoUE9TVFNfVVJMLCAnR0VUJyk7XG4gICAgc3RvcmUuc2V0KCdub3RlcycsIG5vdGVzKTtcbiAgfVxuICByZXR1cm4gbm90ZXM7XG59O1xuXG4vKipcbiAqIOa3u+WKoOS4gOadoeeslOiusOWIsOS7k+W6k++8iHpqaG91L25vdGVz77yJXG4gKiBAcGFyYW0gbm90ZU5hbWUg56yU6K6w5ZCN56ew77yM55+t5qiq57q/6L+e5o6l5aSa5Liq5a2X56ymXG4gKiBAcGFyYW0gbm90ZUNvbnRlbnQg56yU6K6w5YaF5a65XG4gKiBAcGFyYW0gZGF0ZVN0ciDml6XmnJ/lrZfnrKbkuLLvvIzmoLzlvI8gJ1lZWVktTU0tREQnXG4gKi9cbmNvbnN0IGFkZE5vdGUgPSAobm90ZU5hbWUsIG5vdGVDb250ZW50LCBkYXRlU3RyKSA9PiB7XG4gIGlmICghdG9rZW4pIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ3BsZWFzZSBzZXQgUEFUIGZpcnN0IScpO1xuICB9XG5cbiAgY29uc3Qgbm90ZUZpbGVOYW1lID0gYCR7ZGF0ZVN0ciB8fCB0b2RheSgpfS0ke25vdGVOYW1lfS5tZGA7XG4gIGNvbnN0IHJlcUVuZFBvaW50ID0gYCR7UE9TVFNfVVJMfS8ke25vdGVGaWxlTmFtZX1gO1xuICBjb25zdCBjb21taXRPYmogPSB7XG4gICAgbWVzc2FnZTogYGFkZCBub3RlOiAke25vdGVGaWxlTmFtZX1gLFxuICAgIGNvbW1pdHRlcjoge25hbWU6ICd6amhvdScsIGVtYWlsOiAnekB6amguaW0nfSxcbiAgICBjb250ZW50OiBiYXNlNjQuZW5jb2RlKG5vdGVDb250ZW50KVxuICB9O1xuXG4gIHJldHVybiByZXEoXG4gICAgcmVxRW5kUG9pbnQsXG4gICAgJ1BVVCcsXG4gICAgY29tbWl0T2JqLFxuICAgIHRva2VuXG4gICk7XG59O1xuXG4vKipcbiAqIOabtOaWsOaMh+WumueslOiusO+8iHpqaG91L25vdGVz77yJXG4gKiBAcGFyYW0gbm90ZU5hbWUg56yU6K6w5ZCN56ew77yM55+t5qiq57q/6L+e5o6l5aSa5Liq5a2X56ymXG4gKiBAcGFyYW0gbm90ZUNvbnRlbnQg56yU6K6w5YaF5a65XG4gKi9cbmNvbnN0IHVwZGF0ZU5vdGUgPSBhc3luYyAobm90ZU5hbWUsIG5vdGVDb250ZW50KSA9PiB7XG4gIGlmICghdG9rZW4pIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ3BsZWFzZSBzZXQgUEFUIGZpcnN0IScpO1xuICB9XG5cbiAgY29uc3Qgbm90ZXMgPSBhd2FpdCBsaXN0Tm90ZXMoKTtcbiAgY29uc3QgdGFyZ2V0Tm90ZSA9IG5vdGVzLmZpbHRlcigoe25hbWV9KSA9PiB7XG4gICAgcmV0dXJuIG5hbWUuaW5jbHVkZXMobm90ZU5hbWUpXG4gIH0pWzBdO1xuXG4gIGlmICghdGFyZ2V0Tm90ZSkge1xuICAgIHRocm93ICfml6Dms5Xmib7liLDnrJTorrAnO1xuICB9XG4gIGNvbnN0IHtuYW1lLCBzaGF9ID0gdGFyZ2V0Tm90ZTtcbiAgY29uc3QgcmVxRW5kUG9pbnQgPSBgJHtQT1NUU19VUkx9LyR7bmFtZX1gO1xuICBjb25zdCBjb21taXRPYmogPSB7XG4gICAgbWVzc2FnZTogYHVwZGF0ZSBub3RlOiAke25hbWV9YCxcbiAgICBjb250ZW50OiBiYXNlNjQuZW5jb2RlKG5vdGVDb250ZW50KSxcbiAgICBzaGEsXG4gICAgY29tbWl0dGVyOiB7bmFtZTogJ3pqaG91JywgZW1haWw6ICd6QHpqaC5pbSd9LFxuICB9O1xuXG4gIHJldHVybiByZXEoXG4gICAgcmVxRW5kUG9pbnQsXG4gICAgJ1BVVCcsXG4gICAgY29tbWl0T2JqLFxuICAgIHRva2VuXG4gICk7XG59O1xuXG5jb25zdCBkZWxldGVOb3RlID0gYXN5bmMgKGV4YWN0RmlsZU5hbWUpID0+IHtcbiAgaWYgKCF0b2tlbikge1xuICAgIHRocm93ICdwbGVhc2Ugc2V0IFBBVCBmaXJzdCEnXG4gIH1cbiAgY29uc3Qgbm90ZXMgPSBhd2FpdCBsaXN0Tm90ZXMoKTtcbiAgY29uc3QgdGFyZ2V0Tm90ZSA9IG5vdGVzLmZpbHRlcigoe25hbWV9KSA9PiB7XG4gICAgcmV0dXJuIG5hbWUgPT09IGV4YWN0RmlsZU5hbWVcbiAgfSlbMF07XG4gIGlmICghdGFyZ2V0Tm90ZSkge1xuICAgIHRocm93ICfml6Dms5Xmib7liLDnrJTorrAnO1xuICB9XG4gIGNvbnN0IHBhcmFtT2JqID0ge1xuICAgIG1lc3NhZ2U6IGBkZWxldGUgbm90ZTogJHtleGFjdEZpbGVOYW1lfWAsXG4gICAgc2hhOiB0YXJnZXROb3RlLnNoYVxuICB9O1xuICBjb25zdCB0YXJnZXRQYXRoID0gYCR7UE9TVFNfVVJMfS8ke2V4YWN0RmlsZU5hbWV9YDtcbiAgcmV0dXJuIHJlcShcbiAgICB0YXJnZXRQYXRoLFxuICAgICdERUxFVEUnLFxuICAgIHBhcmFtT2JqLFxuICAgIHRva2VuLFxuICApLnRoZW4oKCkgPT4ge1xuICAgIHJldHVybiAn5oiQ5Yqf5Yig6Zmk77yBJ1xuICB9KTtcbn07XG5cbmNvbnN0IGZldGNoTm90ZUNvbnRlbnQgPSBhc3luYyAobm90ZU5hbWUpID0+IHtcbiAgaWYgKCFub3RlTmFtZSkge1xuICAgIHRocm93ICfor7fmjIflrprnrJTorrDlkI3np7AnO1xuICB9XG4gIGNvbnN0IG5vdGVzID0gYXdhaXQgbGlzdE5vdGVzKCk7XG4gIGNvbnN0IG5vdGVzTmFtZUFyciA9IG5vdGVzLm1hcCgoe25hbWV9KSA9PiBuYW1lLnRvTG93ZXJDYXNlKCkpO1xuICBjb25zdCB0YXJnZXROb3RlID0gbm90ZXNOYW1lQXJyLmZpbHRlcihjYW5kaSA9PiB7XG4gICAgcmV0dXJuIGNhbmRpLmluY2x1ZGVzKG5vdGVOYW1lLnRvTG93ZXJDYXNlKCkpO1xuICB9KVswXTtcbiAgY29uc3Qgbm90ZVVSTCA9IGAke1BPU1RTX1VSTH0vJHt0YXJnZXROb3RlfWA7XG4gIGNvbnN0IGVuY29kZWROb3RlID0gYXdhaXQgcmVxKFxuICAgIG5vdGVVUkwsXG4gICAgJ0dFVCdcbiAgKTtcbiAgcmV0dXJuIGJhc2U2NC5kZWNvZGUoZW5jb2RlZE5vdGUuY29udGVudCk7XG59O1xuXG5leHBvcnQge1xuICBhZGROb3RlLCBkZWxldGVOb3RlLCBsaXN0Tm90ZXMsIHVwZGF0ZU5vdGUsIGZldGNoTm90ZUNvbnRlbnRcbn1cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCAnLi9tYWluLnNjc3MnO1xuaW1wb3J0IHskfSBmcm9tICdAemhvdWppYWhhby91dGlscydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHNlbGVjdG9yLCBzb3VyY2UgPSAnJywgc291cmNlSFRNTCA9ICcnKSB7XG4gIGNvbnN0ICRHVUkgPSAkKHNlbGVjdG9yKTtcbiAgJEdVSS5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cImVkaXRvci13cmFwcGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZWRpdC1hcmVhXCI+XG4gICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZWRpdG9yXCI+JHtzb3VyY2V9PC90ZXh0YXJlYT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInByZXZpZXctYXJlYVwiPjxkaXYgY2xhc3M9XCJtYXJrZG93bi1ib2R5XCI+JHtzb3VyY2VIVE1MfTwvZGl2PjwvZGl2PlxuICAgIDwvZGl2PiBcbiAgYDtcblxuICAkR1VJLmNsYXNzTGlzdC5hZGQoJ2VkaXRvcicpO1xuICAkR1VJLmNsYXNzTGlzdC5hZGQoJ29uJyk7XG5cbiAgY29uc3QgJGVkaXRvciA9ICQoXCJ0ZXh0YXJlYS5lZGl0b3JcIik7XG4gIGNvbnN0ICRwcmV2aWV3ID0gJChcIi5wcmV2aWV3LWFyZWFcIik7XG5cbiAgJGVkaXRvci5mb2N1cygpO1xuXG4gIHJldHVybiB7XG4gICAgJGVkaXRvcixcbiAgICAkcHJldmlldyxcbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCBpbml0R3VpIGZyb20gJy4vZ3VpJ1xuaW1wb3J0IHskfSBmcm9tICdAemhvdWppYWhhby91dGlscyc7XG5cbmNvbnN0IGVkaXRvciA9IChzb3VyY2UsIG9uT2ssIG9uRXJyKSA9PiB7XG4gIGNvbnN0IHNvdXJjZUhUTUwgPSB3aW5kb3cuY29udmVydGVyLm1ha2VIdG1sKHNvdXJjZSk7XG4gIGNvbnN0ICRHVUkgPSAkKFwiI2d1aVwiKTtcbiAgY29uc3Qge1xuICAgICRlZGl0b3IsXG4gICAgJHByZXZpZXdcbiAgfSA9IGluaXRHdWkoJyNndWknLCBzb3VyY2UsIHNvdXJjZUhUTUwpO1xuXG4gIGNvbnN0IGhhbmRsZU9rID0gKCkgPT4ge1xuICAgIG9uT2soJGVkaXRvci52YWx1ZSk7XG4gICAgJEdVSS5jbGFzc0xpc3QucmVtb3ZlKCdvbicpO1xuICAgICRHVUkuaW5uZXJIVE1MID0gJyc7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2FuY2VsID0gKCkgPT4ge1xuICAgIG9uT2soJycpO1xuICAgICRHVUkuY2xhc3NMaXN0LnJlbW92ZSgnb24nKTtcbiAgICAkR1VJLmlubmVySFRNTCA9ICcnO1xuICB9O1xuXG4gICRlZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgY29uc3Qge2tleSwgY3RybEtleX0gPSBlO1xuICAgIGNvbnN0IGlzU2F2ZSA9IGN0cmxLZXkgJiYga2V5ID09PSAncyc7XG4gICAgY29uc3QgaXNFeGl0ID0gY3RybEtleSAmJiBrZXkgPT09ICdjJztcbiAgICBpZiAoaXNTYXZlKSB7XG4gICAgICBoYW5kbGVPaygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNFeGl0KSB7XG4gICAgICBoYW5kbGVDYW5jZWwoKTtcbiAgICB9XG4gIH0pO1xuICAkZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcbiAgICAkcHJldmlldy5pbm5lckhUTUwgPSB3aW5kb3cuY29udmVydGVyLm1ha2VIdG1sKGUudGFyZ2V0LnZhbHVlKTtcbiAgfSlcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGVkaXRvcjtcbiIsImltcG9ydCBlZGl0b3IgZnJvbSAnLi9lZGl0b3InO1xuaW1wb3J0IHthZGROb3RlLCB1cGRhdGVOb3RlfSBmcm9tIFwiQHpob3VqaWFoYW8vbm90ZWJvb2tcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzaG9ydG9wdHM6ICduOnUnLFxuICBoYW5kbGVyKHBhcmFtT2JqLCBjbWRTZXQsICR0ZXJtaW5hbCwge3Jlc3RQYXJhbXMsIGZyb21QaXBlfSkge1xuICAgIGNvbnN0IGVkaXRvclByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCB7bjogZmlsZU5hbWUsIHU6IGlzVXBkYXRlfSA9IHBhcmFtT2JqO1xuICAgICAgY29uc3QgaGFuZGxlT2sgPSAoY29udGVudCkgPT4ge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gaXNVcGRhdGUgPyB1cGRhdGVOb3RlIDogYWRkTm90ZTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gaXNVcGRhdGUgPyAn5pu05pawJyA6ICfmt7vliqAnO1xuXG4gICAgICAgIGhhbmRsZXIoZmlsZU5hbWUsIGNvbnRlbnQpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShg56yU6K6wJHthY3Rpb2595oiQ5Yqf77yBYCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgIH07XG5cbiAgICAgIGlmIChmaWxlTmFtZSkge1xuICAgICAgICBlZGl0b3IoaXNVcGRhdGUgPyBmcm9tUGlwZSA6ICcnLCBoYW5kbGVPaywgcmVqZWN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVkaXRvcihyZXN0UGFyYW1zIHx8IGZyb21QaXBlLCByZXNvbHZlLCByZWplY3QpXG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGVkaXRvclByb21pc2U7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9