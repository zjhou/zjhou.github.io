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
  let notes = _zhoujiahao_utils__WEBPACK_IMPORTED_MODULE_0__[/* store */ "j"].get('notes');
  if (!notes) {
    notes = await Object(_zhoujiahao_utils__WEBPACK_IMPORTED_MODULE_0__[/* req */ "i"])(POSTS_URL, 'GET');
    _zhoujiahao_utils__WEBPACK_IMPORTED_MODULE_0__[/* store */ "j"].set('notes', notes);
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

  const noteFileName = `${dateStr || Object(_zhoujiahao_utils__WEBPACK_IMPORTED_MODULE_0__[/* today */ "k"])()}-${noteName}.md`;
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
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHpob3VqaWFoYW8vbm90ZWJvb2svbGliL25vdGVib29rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AemhvdWppYWhhby9lZGl0b3IvbGliL2VkaXRvci9ndWkvbWFpbi5zY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AemhvdWppYWhhby9lZGl0b3IvbGliL2VkaXRvci9ndWkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B6aG91amlhaGFvL2VkaXRvci9saWIvZWRpdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AemhvdWppYWhhby9lZGl0b3IvbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE4RDs7QUFFOUQ7QUFDQTs7QUFFQTtBQUNBLGNBQWMsK0RBQUs7QUFDbkI7QUFDQSxrQkFBa0IscUVBQUc7QUFDckIsSUFBSSwrREFBSztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEIsV0FBVyx1RUFBSyxHQUFHLEdBQUcsU0FBUztBQUN6RCx5QkFBeUIsVUFBVSxHQUFHLGFBQWE7QUFDbkQ7QUFDQSwwQkFBMEIsYUFBYTtBQUN2QyxnQkFBZ0IsaUNBQWlDO0FBQ2pELGFBQWEsZ0VBQU07QUFDbkI7O0FBRUEsU0FBUyxxRUFBRztBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MsS0FBSztBQUN6QztBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsU0FBUyxVQUFVO0FBQ25CLHlCQUF5QixVQUFVLEdBQUcsS0FBSztBQUMzQztBQUNBLDZCQUE2QixLQUFLO0FBQ2xDLGFBQWEsZ0VBQU07QUFDbkI7QUFDQSxnQkFBZ0IsaUNBQWlDO0FBQ2pEOztBQUVBLFNBQVMscUVBQUc7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxLQUFLO0FBQ3pDO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGNBQWM7QUFDM0M7QUFDQTtBQUNBLHdCQUF3QixVQUFVLEdBQUcsY0FBYztBQUNuRCxTQUFTLHFFQUFHO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsS0FBSztBQUN4QztBQUNBO0FBQ0EsR0FBRztBQUNILHFCQUFxQixVQUFVLEdBQUcsV0FBVztBQUM3Qyw0QkFBNEIscUVBQUc7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsU0FBUyxnRUFBTTtBQUNmOztBQUlDOzs7Ozs7OztBQ3pIRCx5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBcUI7QUFDYzs7QUFFcEI7QUFDZixlQUFlLHdCQUFDO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxPQUFPO0FBQzVDO0FBQ0EsNkRBQTZELFdBQVc7QUFDeEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQix3QkFBQztBQUNuQixtQkFBbUIsd0JBQUM7O0FBRXBCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7QUMxQmE7QUFDYztBQUNTOztBQUVwQztBQUNBO0FBQ0EsZUFBZSx3QkFBQztBQUNoQjtBQUNBO0FBQ0E7QUFDQSxHQUFHLEdBQUcsR0FBTzs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLGFBQWE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRWUscURBQU0sRUFBQzs7Ozs7O0FDekNRO0FBQzJCOztBQUUxQztBQUNmO0FBQ0Esd0NBQXdDLHFCQUFxQjtBQUM3RDtBQUNBLGFBQWEseUJBQXlCO0FBQ3RDO0FBQ0EsbUNBQW1DLDhCQUFVLEdBQUcsMkJBQU87QUFDdkQ7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QixPQUFPO0FBQ2hDLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0EsUUFBUSxVQUFNO0FBQ2QsT0FBTztBQUNQLFFBQVEsVUFBTTtBQUNkO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDIiwiZmlsZSI6IjIuMTRiODY4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdG9kYXksIHN0b3JlLCByZXEsIGJhc2U2NCB9IGZyb20gXCJAemhvdWppYWhhby91dGlsc1wiO1xuXG5jb25zdCBQT1NUU19VUkwgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy96amhvdS9ub3Rlcy9jb250ZW50cy9fcG9zdHMnO1xuY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2h0b2tlbicpO1xuXG5jb25zdCBsaXN0Tm90ZXMgPSBhc3luYyAoKSA9PiB7XG4gIGxldCBub3RlcyA9IHN0b3JlLmdldCgnbm90ZXMnKTtcbiAgaWYgKCFub3Rlcykge1xuICAgIG5vdGVzID0gYXdhaXQgcmVxKFBPU1RTX1VSTCwgJ0dFVCcpO1xuICAgIHN0b3JlLnNldCgnbm90ZXMnLCBub3Rlcyk7XG4gIH1cbiAgcmV0dXJuIG5vdGVzO1xufTtcblxuLyoqXG4gKiDmt7vliqDkuIDmnaHnrJTorrDliLDku5PlupPvvIh6amhvdS9ub3Rlc++8iVxuICogQHBhcmFtIG5vdGVOYW1lIOeslOiusOWQjeensO+8jOefreaoque6v+i/nuaOpeWkmuS4quWtl+esplxuICogQHBhcmFtIG5vdGVDb250ZW50IOeslOiusOWGheWuuVxuICogQHBhcmFtIGRhdGVTdHIg5pel5pyf5a2X56ym5Liy77yM5qC85byPICdZWVlZLU1NLUREJ1xuICovXG5jb25zdCBhZGROb3RlID0gKG5vdGVOYW1lLCBub3RlQ29udGVudCwgZGF0ZVN0cikgPT4ge1xuICBpZiAoIXRva2VuKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdwbGVhc2Ugc2V0IFBBVCBmaXJzdCEnKTtcbiAgfVxuXG4gIGNvbnN0IG5vdGVGaWxlTmFtZSA9IGAke2RhdGVTdHIgfHwgdG9kYXkoKX0tJHtub3RlTmFtZX0ubWRgO1xuICBjb25zdCByZXFFbmRQb2ludCA9IGAke1BPU1RTX1VSTH0vJHtub3RlRmlsZU5hbWV9YDtcbiAgY29uc3QgY29tbWl0T2JqID0ge1xuICAgIG1lc3NhZ2U6IGBhZGQgbm90ZTogJHtub3RlRmlsZU5hbWV9YCxcbiAgICBjb21taXR0ZXI6IHtuYW1lOiAnempob3UnLCBlbWFpbDogJ3pAempoLmltJ30sXG4gICAgY29udGVudDogYmFzZTY0LmVuY29kZShub3RlQ29udGVudClcbiAgfTtcblxuICByZXR1cm4gcmVxKFxuICAgIHJlcUVuZFBvaW50LFxuICAgICdQVVQnLFxuICAgIGNvbW1pdE9iaixcbiAgICB0b2tlblxuICApO1xufTtcblxuLyoqXG4gKiDmm7TmlrDmjIflrprnrJTorrDvvIh6amhvdS9ub3Rlc++8iVxuICogQHBhcmFtIG5vdGVOYW1lIOeslOiusOWQjeensO+8jOefreaoque6v+i/nuaOpeWkmuS4quWtl+esplxuICogQHBhcmFtIG5vdGVDb250ZW50IOeslOiusOWGheWuuVxuICovXG5jb25zdCB1cGRhdGVOb3RlID0gYXN5bmMgKG5vdGVOYW1lLCBub3RlQ29udGVudCkgPT4ge1xuICBpZiAoIXRva2VuKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdwbGVhc2Ugc2V0IFBBVCBmaXJzdCEnKTtcbiAgfVxuXG4gIGNvbnN0IG5vdGVzID0gYXdhaXQgbGlzdE5vdGVzKCk7XG4gIGNvbnN0IHRhcmdldE5vdGUgPSBub3Rlcy5maWx0ZXIoKHtuYW1lfSkgPT4ge1xuICAgIHJldHVybiBuYW1lLmluY2x1ZGVzKG5vdGVOYW1lKVxuICB9KVswXTtcblxuICBpZiAoIXRhcmdldE5vdGUpIHtcbiAgICB0aHJvdyAn5peg5rOV5om+5Yiw56yU6K6wJztcbiAgfVxuICBjb25zdCB7bmFtZSwgc2hhfSA9IHRhcmdldE5vdGU7XG4gIGNvbnN0IHJlcUVuZFBvaW50ID0gYCR7UE9TVFNfVVJMfS8ke25hbWV9YDtcbiAgY29uc3QgY29tbWl0T2JqID0ge1xuICAgIG1lc3NhZ2U6IGB1cGRhdGUgbm90ZTogJHtuYW1lfWAsXG4gICAgY29udGVudDogYmFzZTY0LmVuY29kZShub3RlQ29udGVudCksXG4gICAgc2hhLFxuICAgIGNvbW1pdHRlcjoge25hbWU6ICd6amhvdScsIGVtYWlsOiAnekB6amguaW0nfSxcbiAgfTtcblxuICByZXR1cm4gcmVxKFxuICAgIHJlcUVuZFBvaW50LFxuICAgICdQVVQnLFxuICAgIGNvbW1pdE9iaixcbiAgICB0b2tlblxuICApO1xufTtcblxuY29uc3QgZGVsZXRlTm90ZSA9IGFzeW5jIChleGFjdEZpbGVOYW1lKSA9PiB7XG4gIGlmICghdG9rZW4pIHtcbiAgICB0aHJvdyAncGxlYXNlIHNldCBQQVQgZmlyc3QhJ1xuICB9XG4gIGNvbnN0IG5vdGVzID0gYXdhaXQgbGlzdE5vdGVzKCk7XG4gIGNvbnN0IHRhcmdldE5vdGUgPSBub3Rlcy5maWx0ZXIoKHtuYW1lfSkgPT4ge1xuICAgIHJldHVybiBuYW1lID09PSBleGFjdEZpbGVOYW1lXG4gIH0pWzBdO1xuICBpZiAoIXRhcmdldE5vdGUpIHtcbiAgICB0aHJvdyAn5peg5rOV5om+5Yiw56yU6K6wJztcbiAgfVxuICBjb25zdCBwYXJhbU9iaiA9IHtcbiAgICBtZXNzYWdlOiBgZGVsZXRlIG5vdGU6ICR7ZXhhY3RGaWxlTmFtZX1gLFxuICAgIHNoYTogdGFyZ2V0Tm90ZS5zaGFcbiAgfTtcbiAgY29uc3QgdGFyZ2V0UGF0aCA9IGAke1BPU1RTX1VSTH0vJHtleGFjdEZpbGVOYW1lfWA7XG4gIHJldHVybiByZXEoXG4gICAgdGFyZ2V0UGF0aCxcbiAgICAnREVMRVRFJyxcbiAgICBwYXJhbU9iaixcbiAgICB0b2tlbixcbiAgKS50aGVuKCgpID0+IHtcbiAgICByZXR1cm4gJ+aIkOWKn+WIoOmZpO+8gSdcbiAgfSk7XG59O1xuXG5jb25zdCBmZXRjaE5vdGVDb250ZW50ID0gYXN5bmMgKG5vdGVOYW1lKSA9PiB7XG4gIGlmICghbm90ZU5hbWUpIHtcbiAgICB0aHJvdyAn6K+35oyH5a6a56yU6K6w5ZCN56ewJztcbiAgfVxuICBjb25zdCBub3RlcyA9IGF3YWl0IGxpc3ROb3RlcygpO1xuICBjb25zdCBub3Rlc05hbWVBcnIgPSBub3Rlcy5tYXAoKHtuYW1lfSkgPT4gbmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgY29uc3QgdGFyZ2V0Tm90ZSA9IG5vdGVzTmFtZUFyci5maWx0ZXIoY2FuZGkgPT4ge1xuICAgIHJldHVybiBjYW5kaS5pbmNsdWRlcyhub3RlTmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgfSlbMF07XG4gIGNvbnN0IG5vdGVVUkwgPSBgJHtQT1NUU19VUkx9LyR7dGFyZ2V0Tm90ZX1gO1xuICBjb25zdCBlbmNvZGVkTm90ZSA9IGF3YWl0IHJlcShcbiAgICBub3RlVVJMLFxuICAgICdHRVQnXG4gICk7XG4gIHJldHVybiBiYXNlNjQuZGVjb2RlKGVuY29kZWROb3RlLmNvbnRlbnQpO1xufTtcblxuZXhwb3J0IHtcbiAgYWRkTm90ZSwgZGVsZXRlTm90ZSwgbGlzdE5vdGVzLCB1cGRhdGVOb3RlLCBmZXRjaE5vdGVDb250ZW50XG59XG4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsImltcG9ydCAnLi9tYWluLnNjc3MnO1xuaW1wb3J0IHskfSBmcm9tICdAemhvdWppYWhhby91dGlscydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHNlbGVjdG9yLCBzb3VyY2UgPSAnJywgc291cmNlSFRNTCA9ICcnKSB7XG4gIGNvbnN0ICRHVUkgPSAkKHNlbGVjdG9yKTtcbiAgJEdVSS5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cImVkaXRvci13cmFwcGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZWRpdC1hcmVhXCI+XG4gICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZWRpdG9yXCI+JHtzb3VyY2V9PC90ZXh0YXJlYT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInByZXZpZXctYXJlYVwiPjxkaXYgY2xhc3M9XCJtYXJrZG93bi1ib2R5XCI+JHtzb3VyY2VIVE1MfTwvZGl2PjwvZGl2PlxuICAgIDwvZGl2PiBcbiAgYDtcblxuICAkR1VJLmNsYXNzTGlzdC5hZGQoJ2VkaXRvcicpO1xuICAkR1VJLmNsYXNzTGlzdC5hZGQoJ29uJyk7XG5cbiAgY29uc3QgJGVkaXRvciA9ICQoXCJ0ZXh0YXJlYS5lZGl0b3JcIik7XG4gIGNvbnN0ICRwcmV2aWV3ID0gJChcIi5wcmV2aWV3LWFyZWFcIik7XG5cbiAgJGVkaXRvci5mb2N1cygpO1xuXG4gIHJldHVybiB7XG4gICAgJGVkaXRvcixcbiAgICAkcHJldmlldyxcbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCBpbml0R3VpIGZyb20gJy4vZ3VpJ1xuaW1wb3J0IHskfSBmcm9tICdAemhvdWppYWhhby91dGlscyc7XG5cbmNvbnN0IGVkaXRvciA9IChzb3VyY2UsIG9uT2ssIG9uRXJyKSA9PiB7XG4gIGNvbnN0IHNvdXJjZUhUTUwgPSB3aW5kb3cuY29udmVydGVyLm1ha2VIdG1sKHNvdXJjZSk7XG4gIGNvbnN0ICRHVUkgPSAkKFwiI2d1aVwiKTtcbiAgY29uc3Qge1xuICAgICRlZGl0b3IsXG4gICAgJHByZXZpZXdcbiAgfSA9IGluaXRHdWkoJyNndWknLCBzb3VyY2UsIHNvdXJjZUhUTUwpO1xuXG4gIGNvbnN0IGhhbmRsZU9rID0gKCkgPT4ge1xuICAgIG9uT2soJGVkaXRvci52YWx1ZSk7XG4gICAgJEdVSS5jbGFzc0xpc3QucmVtb3ZlKCdvbicpO1xuICAgICRHVUkuaW5uZXJIVE1MID0gJyc7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2FuY2VsID0gKCkgPT4ge1xuICAgIG9uT2soJycpO1xuICAgICRHVUkuY2xhc3NMaXN0LnJlbW92ZSgnb24nKTtcbiAgICAkR1VJLmlubmVySFRNTCA9ICcnO1xuICB9O1xuXG4gICRlZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgY29uc3Qge2tleSwgY3RybEtleX0gPSBlO1xuICAgIGNvbnN0IGlzU2F2ZSA9IGN0cmxLZXkgJiYga2V5ID09PSAncyc7XG4gICAgY29uc3QgaXNFeGl0ID0gY3RybEtleSAmJiBrZXkgPT09ICdjJztcbiAgICBpZiAoaXNTYXZlKSB7XG4gICAgICBoYW5kbGVPaygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNFeGl0KSB7XG4gICAgICBoYW5kbGVDYW5jZWwoKTtcbiAgICB9XG4gIH0pO1xuICAkZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcbiAgICAkcHJldmlldy5pbm5lckhUTUwgPSB3aW5kb3cuY29udmVydGVyLm1ha2VIdG1sKGUudGFyZ2V0LnZhbHVlKTtcbiAgfSlcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGVkaXRvcjtcbiIsImltcG9ydCBlZGl0b3IgZnJvbSAnLi9lZGl0b3InO1xuaW1wb3J0IHthZGROb3RlLCB1cGRhdGVOb3RlfSBmcm9tIFwiQHpob3VqaWFoYW8vbm90ZWJvb2tcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzaG9ydG9wdHM6ICduOnUnLFxuICBoYW5kbGVyKHBhcmFtT2JqLCBjbWRTZXQsICR0ZXJtaW5hbCwge3Jlc3RQYXJhbXMsIGZyb21QaXBlfSkge1xuICAgIGNvbnN0IGVkaXRvclByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCB7bjogZmlsZU5hbWUsIHU6IGlzVXBkYXRlfSA9IHBhcmFtT2JqO1xuICAgICAgY29uc3QgaGFuZGxlT2sgPSAoY29udGVudCkgPT4ge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gaXNVcGRhdGUgPyB1cGRhdGVOb3RlIDogYWRkTm90ZTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gaXNVcGRhdGUgPyAn5pu05pawJyA6ICfmt7vliqAnO1xuXG4gICAgICAgIGhhbmRsZXIoZmlsZU5hbWUsIGNvbnRlbnQpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShg56yU6K6wJHthY3Rpb2595oiQ5Yqf77yBYCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgIH07XG5cbiAgICAgIGlmIChmaWxlTmFtZSkge1xuICAgICAgICBlZGl0b3IoaXNVcGRhdGUgPyBmcm9tUGlwZSA6ICcnLCBoYW5kbGVPaywgcmVqZWN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVkaXRvcihyZXN0UGFyYW1zIHx8IGZyb21QaXBlLCByZXNvbHZlLCByZWplY3QpXG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGVkaXRvclByb21pc2U7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9