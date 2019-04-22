(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

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

/***/ "M55E":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;;/*! showdown v 1.9.0 - 10-11-2018 */
(function(){
/**
 * Created by Tivie on 13-07-2015.
 */

function getDefaultOpts (simple) {
  'use strict';

  var defaultOptions = {
    omitExtraWLInCodeBlocks: {
      defaultValue: false,
      describe: 'Omit the default extra whiteline added to code blocks',
      type: 'boolean'
    },
    noHeaderId: {
      defaultValue: false,
      describe: 'Turn on/off generated header id',
      type: 'boolean'
    },
    prefixHeaderId: {
      defaultValue: false,
      describe: 'Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic \'section-\' prefix',
      type: 'string'
    },
    rawPrefixHeaderId: {
      defaultValue: false,
      describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',
      type: 'boolean'
    },
    ghCompatibleHeaderId: {
      defaultValue: false,
      describe: 'Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)',
      type: 'boolean'
    },
    rawHeaderId: {
      defaultValue: false,
      describe: 'Remove only spaces, \' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids',
      type: 'boolean'
    },
    headerLevelStart: {
      defaultValue: false,
      describe: 'The header blocks level start',
      type: 'integer'
    },
    parseImgDimensions: {
      defaultValue: false,
      describe: 'Turn on/off image dimension parsing',
      type: 'boolean'
    },
    simplifiedAutoLink: {
      defaultValue: false,
      describe: 'Turn on/off GFM autolink style',
      type: 'boolean'
    },
    excludeTrailingPunctuationFromURLs: {
      defaultValue: false,
      describe: 'Excludes trailing punctuation from links generated with autoLinking',
      type: 'boolean'
    },
    literalMidWordUnderscores: {
      defaultValue: false,
      describe: 'Parse midword underscores as literal underscores',
      type: 'boolean'
    },
    literalMidWordAsterisks: {
      defaultValue: false,
      describe: 'Parse midword asterisks as literal asterisks',
      type: 'boolean'
    },
    strikethrough: {
      defaultValue: false,
      describe: 'Turn on/off strikethrough support',
      type: 'boolean'
    },
    tables: {
      defaultValue: false,
      describe: 'Turn on/off tables support',
      type: 'boolean'
    },
    tablesHeaderId: {
      defaultValue: false,
      describe: 'Add an id to table headers',
      type: 'boolean'
    },
    ghCodeBlocks: {
      defaultValue: true,
      describe: 'Turn on/off GFM fenced code blocks support',
      type: 'boolean'
    },
    tasklists: {
      defaultValue: false,
      describe: 'Turn on/off GFM tasklist support',
      type: 'boolean'
    },
    smoothLivePreview: {
      defaultValue: false,
      describe: 'Prevents weird effects in live previews due to incomplete input',
      type: 'boolean'
    },
    smartIndentationFix: {
      defaultValue: false,
      description: 'Tries to smartly fix indentation in es6 strings',
      type: 'boolean'
    },
    disableForced4SpacesIndentedSublists: {
      defaultValue: false,
      description: 'Disables the requirement of indenting nested sublists by 4 spaces',
      type: 'boolean'
    },
    simpleLineBreaks: {
      defaultValue: false,
      description: 'Parses simple line breaks as <br> (GFM Style)',
      type: 'boolean'
    },
    requireSpaceBeforeHeadingText: {
      defaultValue: false,
      description: 'Makes adding a space between `#` and the header text mandatory (GFM Style)',
      type: 'boolean'
    },
    ghMentions: {
      defaultValue: false,
      description: 'Enables github @mentions',
      type: 'boolean'
    },
    ghMentionsLink: {
      defaultValue: 'https://github.com/{u}',
      description: 'Changes the link generated by @mentions. Only applies if ghMentions option is enabled.',
      type: 'string'
    },
    encodeEmails: {
      defaultValue: true,
      description: 'Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities',
      type: 'boolean'
    },
    openLinksInNewWindow: {
      defaultValue: false,
      description: 'Open all links in new windows',
      type: 'boolean'
    },
    backslashEscapesHTMLTags: {
      defaultValue: false,
      description: 'Support for HTML Tag escaping. ex: \<div>foo\</div>',
      type: 'boolean'
    },
    emoji: {
      defaultValue: false,
      description: 'Enable emoji support. Ex: `this is a :smile: emoji`',
      type: 'boolean'
    },
    underline: {
      defaultValue: false,
      description: 'Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`',
      type: 'boolean'
    },
    completeHTMLDocument: {
      defaultValue: false,
      description: 'Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags',
      type: 'boolean'
    },
    metadata: {
      defaultValue: false,
      description: 'Enable support for document metadata (defined at the top of the document between `«««` and `»»»` or between `---` and `---`).',
      type: 'boolean'
    },
    splitAdjacentBlockquotes: {
      defaultValue: false,
      description: 'Split adjacent blockquote blocks',
      type: 'boolean'
    }
  };
  if (simple === false) {
    return JSON.parse(JSON.stringify(defaultOptions));
  }
  var ret = {};
  for (var opt in defaultOptions) {
    if (defaultOptions.hasOwnProperty(opt)) {
      ret[opt] = defaultOptions[opt].defaultValue;
    }
  }
  return ret;
}

function allOptionsOn () {
  'use strict';
  var options = getDefaultOpts(true),
      ret = {};
  for (var opt in options) {
    if (options.hasOwnProperty(opt)) {
      ret[opt] = true;
    }
  }
  return ret;
}

/**
 * Created by Tivie on 06-01-2015.
 */

// Private properties
var showdown = {},
    parsers = {},
    extensions = {},
    globalOptions = getDefaultOpts(true),
    setFlavor = 'vanilla',
    flavor = {
      github: {
        omitExtraWLInCodeBlocks:              true,
        simplifiedAutoLink:                   true,
        excludeTrailingPunctuationFromURLs:   true,
        literalMidWordUnderscores:            true,
        strikethrough:                        true,
        tables:                               true,
        tablesHeaderId:                       true,
        ghCodeBlocks:                         true,
        tasklists:                            true,
        disableForced4SpacesIndentedSublists: true,
        simpleLineBreaks:                     true,
        requireSpaceBeforeHeadingText:        true,
        ghCompatibleHeaderId:                 true,
        ghMentions:                           true,
        backslashEscapesHTMLTags:             true,
        emoji:                                true,
        splitAdjacentBlockquotes:             true
      },
      original: {
        noHeaderId:                           true,
        ghCodeBlocks:                         false
      },
      ghost: {
        omitExtraWLInCodeBlocks:              true,
        parseImgDimensions:                   true,
        simplifiedAutoLink:                   true,
        excludeTrailingPunctuationFromURLs:   true,
        literalMidWordUnderscores:            true,
        strikethrough:                        true,
        tables:                               true,
        tablesHeaderId:                       true,
        ghCodeBlocks:                         true,
        tasklists:                            true,
        smoothLivePreview:                    true,
        simpleLineBreaks:                     true,
        requireSpaceBeforeHeadingText:        true,
        ghMentions:                           false,
        encodeEmails:                         true
      },
      vanilla: getDefaultOpts(true),
      allOn: allOptionsOn()
    };

/**
 * helper namespace
 * @type {{}}
 */
showdown.helper = {};

/**
 * TODO LEGACY SUPPORT CODE
 * @type {{}}
 */
showdown.extensions = {};

/**
 * Set a global option
 * @static
 * @param {string} key
 * @param {*} value
 * @returns {showdown}
 */
showdown.setOption = function (key, value) {
  'use strict';
  globalOptions[key] = value;
  return this;
};

/**
 * Get a global option
 * @static
 * @param {string} key
 * @returns {*}
 */
showdown.getOption = function (key) {
  'use strict';
  return globalOptions[key];
};

/**
 * Get the global options
 * @static
 * @returns {{}}
 */
showdown.getOptions = function () {
  'use strict';
  return globalOptions;
};

/**
 * Reset global options to the default values
 * @static
 */
showdown.resetOptions = function () {
  'use strict';
  globalOptions = getDefaultOpts(true);
};

/**
 * Set the flavor showdown should use as default
 * @param {string} name
 */
showdown.setFlavor = function (name) {
  'use strict';
  if (!flavor.hasOwnProperty(name)) {
    throw Error(name + ' flavor was not found');
  }
  showdown.resetOptions();
  var preset = flavor[name];
  setFlavor = name;
  for (var option in preset) {
    if (preset.hasOwnProperty(option)) {
      globalOptions[option] = preset[option];
    }
  }
};

/**
 * Get the currently set flavor
 * @returns {string}
 */
showdown.getFlavor = function () {
  'use strict';
  return setFlavor;
};

/**
 * Get the options of a specified flavor. Returns undefined if the flavor was not found
 * @param {string} name Name of the flavor
 * @returns {{}|undefined}
 */
showdown.getFlavorOptions = function (name) {
  'use strict';
  if (flavor.hasOwnProperty(name)) {
    return flavor[name];
  }
};

/**
 * Get the default options
 * @static
 * @param {boolean} [simple=true]
 * @returns {{}}
 */
showdown.getDefaultOptions = function (simple) {
  'use strict';
  return getDefaultOpts(simple);
};

/**
 * Get or set a subParser
 *
 * subParser(name)       - Get a registered subParser
 * subParser(name, func) - Register a subParser
 * @static
 * @param {string} name
 * @param {function} [func]
 * @returns {*}
 */
showdown.subParser = function (name, func) {
  'use strict';
  if (showdown.helper.isString(name)) {
    if (typeof func !== 'undefined') {
      parsers[name] = func;
    } else {
      if (parsers.hasOwnProperty(name)) {
        return parsers[name];
      } else {
        throw Error('SubParser named ' + name + ' not registered!');
      }
    }
  }
};

/**
 * Gets or registers an extension
 * @static
 * @param {string} name
 * @param {object|function=} ext
 * @returns {*}
 */
showdown.extension = function (name, ext) {
  'use strict';

  if (!showdown.helper.isString(name)) {
    throw Error('Extension \'name\' must be a string');
  }

  name = showdown.helper.stdExtName(name);

  // Getter
  if (showdown.helper.isUndefined(ext)) {
    if (!extensions.hasOwnProperty(name)) {
      throw Error('Extension named ' + name + ' is not registered!');
    }
    return extensions[name];

    // Setter
  } else {
    // Expand extension if it's wrapped in a function
    if (typeof ext === 'function') {
      ext = ext();
    }

    // Ensure extension is an array
    if (!showdown.helper.isArray(ext)) {
      ext = [ext];
    }

    var validExtension = validate(ext, name);

    if (validExtension.valid) {
      extensions[name] = ext;
    } else {
      throw Error(validExtension.error);
    }
  }
};

/**
 * Gets all extensions registered
 * @returns {{}}
 */
showdown.getAllExtensions = function () {
  'use strict';
  return extensions;
};

/**
 * Remove an extension
 * @param {string} name
 */
showdown.removeExtension = function (name) {
  'use strict';
  delete extensions[name];
};

/**
 * Removes all extensions
 */
showdown.resetExtensions = function () {
  'use strict';
  extensions = {};
};

/**
 * Validate extension
 * @param {array} extension
 * @param {string} name
 * @returns {{valid: boolean, error: string}}
 */
function validate (extension, name) {
  'use strict';

  var errMsg = (name) ? 'Error in ' + name + ' extension->' : 'Error in unnamed extension',
      ret = {
        valid: true,
        error: ''
      };

  if (!showdown.helper.isArray(extension)) {
    extension = [extension];
  }

  for (var i = 0; i < extension.length; ++i) {
    var baseMsg = errMsg + ' sub-extension ' + i + ': ',
        ext = extension[i];
    if (typeof ext !== 'object') {
      ret.valid = false;
      ret.error = baseMsg + 'must be an object, but ' + typeof ext + ' given';
      return ret;
    }

    if (!showdown.helper.isString(ext.type)) {
      ret.valid = false;
      ret.error = baseMsg + 'property "type" must be a string, but ' + typeof ext.type + ' given';
      return ret;
    }

    var type = ext.type = ext.type.toLowerCase();

    // normalize extension type
    if (type === 'language') {
      type = ext.type = 'lang';
    }

    if (type === 'html') {
      type = ext.type = 'output';
    }

    if (type !== 'lang' && type !== 'output' && type !== 'listener') {
      ret.valid = false;
      ret.error = baseMsg + 'type ' + type + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"';
      return ret;
    }

    if (type === 'listener') {
      if (showdown.helper.isUndefined(ext.listeners)) {
        ret.valid = false;
        ret.error = baseMsg + '. Extensions of type "listener" must have a property called "listeners"';
        return ret;
      }
    } else {
      if (showdown.helper.isUndefined(ext.filter) && showdown.helper.isUndefined(ext.regex)) {
        ret.valid = false;
        ret.error = baseMsg + type + ' extensions must define either a "regex" property or a "filter" method';
        return ret;
      }
    }

    if (ext.listeners) {
      if (typeof ext.listeners !== 'object') {
        ret.valid = false;
        ret.error = baseMsg + '"listeners" property must be an object but ' + typeof ext.listeners + ' given';
        return ret;
      }
      for (var ln in ext.listeners) {
        if (ext.listeners.hasOwnProperty(ln)) {
          if (typeof ext.listeners[ln] !== 'function') {
            ret.valid = false;
            ret.error = baseMsg + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + ln +
              ' must be a function but ' + typeof ext.listeners[ln] + ' given';
            return ret;
          }
        }
      }
    }

    if (ext.filter) {
      if (typeof ext.filter !== 'function') {
        ret.valid = false;
        ret.error = baseMsg + '"filter" must be a function, but ' + typeof ext.filter + ' given';
        return ret;
      }
    } else if (ext.regex) {
      if (showdown.helper.isString(ext.regex)) {
        ext.regex = new RegExp(ext.regex, 'g');
      }
      if (!(ext.regex instanceof RegExp)) {
        ret.valid = false;
        ret.error = baseMsg + '"regex" property must either be a string or a RegExp object, but ' + typeof ext.regex + ' given';
        return ret;
      }
      if (showdown.helper.isUndefined(ext.replace)) {
        ret.valid = false;
        ret.error = baseMsg + '"regex" extensions must implement a replace string or function';
        return ret;
      }
    }
  }
  return ret;
}

/**
 * Validate extension
 * @param {object} ext
 * @returns {boolean}
 */
showdown.validateExtension = function (ext) {
  'use strict';

  var validateExtension = validate(ext, null);
  if (!validateExtension.valid) {
    console.warn(validateExtension.error);
    return false;
  }
  return true;
};

/**
 * showdownjs helper functions
 */

if (!showdown.hasOwnProperty('helper')) {
  showdown.helper = {};
}

/**
 * Check if var is string
 * @static
 * @param {string} a
 * @returns {boolean}
 */
showdown.helper.isString = function (a) {
  'use strict';
  return (typeof a === 'string' || a instanceof String);
};

/**
 * Check if var is a function
 * @static
 * @param {*} a
 * @returns {boolean}
 */
showdown.helper.isFunction = function (a) {
  'use strict';
  var getType = {};
  return a && getType.toString.call(a) === '[object Function]';
};

/**
 * isArray helper function
 * @static
 * @param {*} a
 * @returns {boolean}
 */
showdown.helper.isArray = function (a) {
  'use strict';
  return Array.isArray(a);
};

/**
 * Check if value is undefined
 * @static
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 */
showdown.helper.isUndefined = function (value) {
  'use strict';
  return typeof value === 'undefined';
};

/**
 * ForEach helper function
 * Iterates over Arrays and Objects (own properties only)
 * @static
 * @param {*} obj
 * @param {function} callback Accepts 3 params: 1. value, 2. key, 3. the original array/object
 */
showdown.helper.forEach = function (obj, callback) {
  'use strict';
  // check if obj is defined
  if (showdown.helper.isUndefined(obj)) {
    throw new Error('obj param is required');
  }

  if (showdown.helper.isUndefined(callback)) {
    throw new Error('callback param is required');
  }

  if (!showdown.helper.isFunction(callback)) {
    throw new Error('callback param must be a function/closure');
  }

  if (typeof obj.forEach === 'function') {
    obj.forEach(callback);
  } else if (showdown.helper.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      callback(obj[i], i, obj);
    }
  } else if (typeof (obj) === 'object') {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        callback(obj[prop], prop, obj);
      }
    }
  } else {
    throw new Error('obj does not seem to be an array or an iterable object');
  }
};

/**
 * Standardidize extension name
 * @static
 * @param {string} s extension name
 * @returns {string}
 */
showdown.helper.stdExtName = function (s) {
  'use strict';
  return s.replace(/[_?*+\/\\.^-]/g, '').replace(/\s/g, '').toLowerCase();
};

function escapeCharactersCallback (wholeMatch, m1) {
  'use strict';
  var charCodeToEscape = m1.charCodeAt(0);
  return '¨E' + charCodeToEscape + 'E';
}

/**
 * Callback used to escape characters when passing through String.replace
 * @static
 * @param {string} wholeMatch
 * @param {string} m1
 * @returns {string}
 */
showdown.helper.escapeCharactersCallback = escapeCharactersCallback;

/**
 * Escape characters in a string
 * @static
 * @param {string} text
 * @param {string} charsToEscape
 * @param {boolean} afterBackslash
 * @returns {XML|string|void|*}
 */
showdown.helper.escapeCharacters = function (text, charsToEscape, afterBackslash) {
  'use strict';
  // First we have to escape the escape characters so that
  // we can build a character class out of them
  var regexString = '([' + charsToEscape.replace(/([\[\]\\])/g, '\\$1') + '])';

  if (afterBackslash) {
    regexString = '\\\\' + regexString;
  }

  var regex = new RegExp(regexString, 'g');
  text = text.replace(regex, escapeCharactersCallback);

  return text;
};

/**
 * Unescape HTML entities
 * @param txt
 * @returns {string}
 */
showdown.helper.unescapeHTMLEntities = function (txt) {
  'use strict';

  return txt
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
};

var rgxFindMatchPos = function (str, left, right, flags) {
  'use strict';
  var f = flags || '',
      g = f.indexOf('g') > -1,
      x = new RegExp(left + '|' + right, 'g' + f.replace(/g/g, '')),
      l = new RegExp(left, f.replace(/g/g, '')),
      pos = [],
      t, s, m, start, end;

  do {
    t = 0;
    while ((m = x.exec(str))) {
      if (l.test(m[0])) {
        if (!(t++)) {
          s = x.lastIndex;
          start = s - m[0].length;
        }
      } else if (t) {
        if (!--t) {
          end = m.index + m[0].length;
          var obj = {
            left: {start: start, end: s},
            match: {start: s, end: m.index},
            right: {start: m.index, end: end},
            wholeMatch: {start: start, end: end}
          };
          pos.push(obj);
          if (!g) {
            return pos;
          }
        }
      }
    }
  } while (t && (x.lastIndex = s));

  return pos;
};

/**
 * matchRecursiveRegExp
 *
 * (c) 2007 Steven Levithan <stevenlevithan.com>
 * MIT License
 *
 * Accepts a string to search, a left and right format delimiter
 * as regex patterns, and optional regex flags. Returns an array
 * of matches, allowing nested instances of left/right delimiters.
 * Use the "g" flag to return all matches, otherwise only the
 * first is returned. Be careful to ensure that the left and
 * right format delimiters produce mutually exclusive matches.
 * Backreferences are not supported within the right delimiter
 * due to how it is internally combined with the left delimiter.
 * When matching strings whose format delimiters are unbalanced
 * to the left or right, the output is intentionally as a
 * conventional regex library with recursion support would
 * produce, e.g. "<<x>" and "<x>>" both produce ["x"] when using
 * "<" and ">" as the delimiters (both strings contain a single,
 * balanced instance of "<x>").
 *
 * examples:
 * matchRecursiveRegExp("test", "\\(", "\\)")
 * returns: []
 * matchRecursiveRegExp("<t<<e>><s>>t<>", "<", ">", "g")
 * returns: ["t<<e>><s>", ""]
 * matchRecursiveRegExp("<div id=\"x\">test</div>", "<div\\b[^>]*>", "</div>", "gi")
 * returns: ["test"]
 */
showdown.helper.matchRecursiveRegExp = function (str, left, right, flags) {
  'use strict';

  var matchPos = rgxFindMatchPos (str, left, right, flags),
      results = [];

  for (var i = 0; i < matchPos.length; ++i) {
    results.push([
      str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
      str.slice(matchPos[i].match.start, matchPos[i].match.end),
      str.slice(matchPos[i].left.start, matchPos[i].left.end),
      str.slice(matchPos[i].right.start, matchPos[i].right.end)
    ]);
  }
  return results;
};

/**
 *
 * @param {string} str
 * @param {string|function} replacement
 * @param {string} left
 * @param {string} right
 * @param {string} flags
 * @returns {string}
 */
showdown.helper.replaceRecursiveRegExp = function (str, replacement, left, right, flags) {
  'use strict';

  if (!showdown.helper.isFunction(replacement)) {
    var repStr = replacement;
    replacement = function () {
      return repStr;
    };
  }

  var matchPos = rgxFindMatchPos(str, left, right, flags),
      finalStr = str,
      lng = matchPos.length;

  if (lng > 0) {
    var bits = [];
    if (matchPos[0].wholeMatch.start !== 0) {
      bits.push(str.slice(0, matchPos[0].wholeMatch.start));
    }
    for (var i = 0; i < lng; ++i) {
      bits.push(
        replacement(
          str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
          str.slice(matchPos[i].match.start, matchPos[i].match.end),
          str.slice(matchPos[i].left.start, matchPos[i].left.end),
          str.slice(matchPos[i].right.start, matchPos[i].right.end)
        )
      );
      if (i < lng - 1) {
        bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
      }
    }
    if (matchPos[lng - 1].wholeMatch.end < str.length) {
      bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
    }
    finalStr = bits.join('');
  }
  return finalStr;
};

/**
 * Returns the index within the passed String object of the first occurrence of the specified regex,
 * starting the search at fromIndex. Returns -1 if the value is not found.
 *
 * @param {string} str string to search
 * @param {RegExp} regex Regular expression to search
 * @param {int} [fromIndex = 0] Index to start the search
 * @returns {Number}
 * @throws InvalidArgumentError
 */
showdown.helper.regexIndexOf = function (str, regex, fromIndex) {
  'use strict';
  if (!showdown.helper.isString(str)) {
    throw 'InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string';
  }
  if (regex instanceof RegExp === false) {
    throw 'InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp';
  }
  var indexOf = str.substring(fromIndex || 0).search(regex);
  return (indexOf >= 0) ? (indexOf + (fromIndex || 0)) : indexOf;
};

/**
 * Splits the passed string object at the defined index, and returns an array composed of the two substrings
 * @param {string} str string to split
 * @param {int} index index to split string at
 * @returns {[string,string]}
 * @throws InvalidArgumentError
 */
showdown.helper.splitAtIndex = function (str, index) {
  'use strict';
  if (!showdown.helper.isString(str)) {
    throw 'InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string';
  }
  return [str.substring(0, index), str.substring(index)];
};

/**
 * Obfuscate an e-mail address through the use of Character Entities,
 * transforming ASCII characters into their equivalent decimal or hex entities.
 *
 * Since it has a random component, subsequent calls to this function produce different results
 *
 * @param {string} mail
 * @returns {string}
 */
showdown.helper.encodeEmailAddress = function (mail) {
  'use strict';
  var encode = [
    function (ch) {
      return '&#' + ch.charCodeAt(0) + ';';
    },
    function (ch) {
      return '&#x' + ch.charCodeAt(0).toString(16) + ';';
    },
    function (ch) {
      return ch;
    }
  ];

  mail = mail.replace(/./g, function (ch) {
    if (ch === '@') {
      // this *must* be encoded. I insist.
      ch = encode[Math.floor(Math.random() * 2)](ch);
    } else {
      var r = Math.random();
      // roughly 10% raw, 45% hex, 45% dec
      ch = (
        r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch)
      );
    }
    return ch;
  });

  return mail;
};

/**
 *
 * @param str
 * @param targetLength
 * @param padString
 * @returns {string}
 */
showdown.helper.padEnd = function padEnd (str, targetLength, padString) {
  'use strict';
  /*jshint bitwise: false*/
  // eslint-disable-next-line space-infix-ops
  targetLength = targetLength>>0; //floor if number or convert non-number to 0;
  /*jshint bitwise: true*/
  padString = String(padString || ' ');
  if (str.length > targetLength) {
    return String(str);
  } else {
    targetLength = targetLength - str.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
    }
    return String(str) + padString.slice(0,targetLength);
  }
};

/**
 * POLYFILLS
 */
// use this instead of builtin is undefined for IE8 compatibility
if (typeof(console) === 'undefined') {
  console = {
    warn: function (msg) {
      'use strict';
      alert(msg);
    },
    log: function (msg) {
      'use strict';
      alert(msg);
    },
    error: function (msg) {
      'use strict';
      throw msg;
    }
  };
}

/**
 * Common regexes.
 * We declare some common regexes to improve performance
 */
showdown.helper.regexes = {
  asteriskDashAndColon: /([*_:~])/g
};

/**
 * EMOJIS LIST
 */
showdown.helper.emojis = {
  '+1':'\ud83d\udc4d',
  '-1':'\ud83d\udc4e',
  '100':'\ud83d\udcaf',
  '1234':'\ud83d\udd22',
  '1st_place_medal':'\ud83e\udd47',
  '2nd_place_medal':'\ud83e\udd48',
  '3rd_place_medal':'\ud83e\udd49',
  '8ball':'\ud83c\udfb1',
  'a':'\ud83c\udd70\ufe0f',
  'ab':'\ud83c\udd8e',
  'abc':'\ud83d\udd24',
  'abcd':'\ud83d\udd21',
  'accept':'\ud83c\ude51',
  'aerial_tramway':'\ud83d\udea1',
  'airplane':'\u2708\ufe0f',
  'alarm_clock':'\u23f0',
  'alembic':'\u2697\ufe0f',
  'alien':'\ud83d\udc7d',
  'ambulance':'\ud83d\ude91',
  'amphora':'\ud83c\udffa',
  'anchor':'\u2693\ufe0f',
  'angel':'\ud83d\udc7c',
  'anger':'\ud83d\udca2',
  'angry':'\ud83d\ude20',
  'anguished':'\ud83d\ude27',
  'ant':'\ud83d\udc1c',
  'apple':'\ud83c\udf4e',
  'aquarius':'\u2652\ufe0f',
  'aries':'\u2648\ufe0f',
  'arrow_backward':'\u25c0\ufe0f',
  'arrow_double_down':'\u23ec',
  'arrow_double_up':'\u23eb',
  'arrow_down':'\u2b07\ufe0f',
  'arrow_down_small':'\ud83d\udd3d',
  'arrow_forward':'\u25b6\ufe0f',
  'arrow_heading_down':'\u2935\ufe0f',
  'arrow_heading_up':'\u2934\ufe0f',
  'arrow_left':'\u2b05\ufe0f',
  'arrow_lower_left':'\u2199\ufe0f',
  'arrow_lower_right':'\u2198\ufe0f',
  'arrow_right':'\u27a1\ufe0f',
  'arrow_right_hook':'\u21aa\ufe0f',
  'arrow_up':'\u2b06\ufe0f',
  'arrow_up_down':'\u2195\ufe0f',
  'arrow_up_small':'\ud83d\udd3c',
  'arrow_upper_left':'\u2196\ufe0f',
  'arrow_upper_right':'\u2197\ufe0f',
  'arrows_clockwise':'\ud83d\udd03',
  'arrows_counterclockwise':'\ud83d\udd04',
  'art':'\ud83c\udfa8',
  'articulated_lorry':'\ud83d\ude9b',
  'artificial_satellite':'\ud83d\udef0',
  'astonished':'\ud83d\ude32',
  'athletic_shoe':'\ud83d\udc5f',
  'atm':'\ud83c\udfe7',
  'atom_symbol':'\u269b\ufe0f',
  'avocado':'\ud83e\udd51',
  'b':'\ud83c\udd71\ufe0f',
  'baby':'\ud83d\udc76',
  'baby_bottle':'\ud83c\udf7c',
  'baby_chick':'\ud83d\udc24',
  'baby_symbol':'\ud83d\udebc',
  'back':'\ud83d\udd19',
  'bacon':'\ud83e\udd53',
  'badminton':'\ud83c\udff8',
  'baggage_claim':'\ud83d\udec4',
  'baguette_bread':'\ud83e\udd56',
  'balance_scale':'\u2696\ufe0f',
  'balloon':'\ud83c\udf88',
  'ballot_box':'\ud83d\uddf3',
  'ballot_box_with_check':'\u2611\ufe0f',
  'bamboo':'\ud83c\udf8d',
  'banana':'\ud83c\udf4c',
  'bangbang':'\u203c\ufe0f',
  'bank':'\ud83c\udfe6',
  'bar_chart':'\ud83d\udcca',
  'barber':'\ud83d\udc88',
  'baseball':'\u26be\ufe0f',
  'basketball':'\ud83c\udfc0',
  'basketball_man':'\u26f9\ufe0f',
  'basketball_woman':'\u26f9\ufe0f&zwj;\u2640\ufe0f',
  'bat':'\ud83e\udd87',
  'bath':'\ud83d\udec0',
  'bathtub':'\ud83d\udec1',
  'battery':'\ud83d\udd0b',
  'beach_umbrella':'\ud83c\udfd6',
  'bear':'\ud83d\udc3b',
  'bed':'\ud83d\udecf',
  'bee':'\ud83d\udc1d',
  'beer':'\ud83c\udf7a',
  'beers':'\ud83c\udf7b',
  'beetle':'\ud83d\udc1e',
  'beginner':'\ud83d\udd30',
  'bell':'\ud83d\udd14',
  'bellhop_bell':'\ud83d\udece',
  'bento':'\ud83c\udf71',
  'biking_man':'\ud83d\udeb4',
  'bike':'\ud83d\udeb2',
  'biking_woman':'\ud83d\udeb4&zwj;\u2640\ufe0f',
  'bikini':'\ud83d\udc59',
  'biohazard':'\u2623\ufe0f',
  'bird':'\ud83d\udc26',
  'birthday':'\ud83c\udf82',
  'black_circle':'\u26ab\ufe0f',
  'black_flag':'\ud83c\udff4',
  'black_heart':'\ud83d\udda4',
  'black_joker':'\ud83c\udccf',
  'black_large_square':'\u2b1b\ufe0f',
  'black_medium_small_square':'\u25fe\ufe0f',
  'black_medium_square':'\u25fc\ufe0f',
  'black_nib':'\u2712\ufe0f',
  'black_small_square':'\u25aa\ufe0f',
  'black_square_button':'\ud83d\udd32',
  'blonde_man':'\ud83d\udc71',
  'blonde_woman':'\ud83d\udc71&zwj;\u2640\ufe0f',
  'blossom':'\ud83c\udf3c',
  'blowfish':'\ud83d\udc21',
  'blue_book':'\ud83d\udcd8',
  'blue_car':'\ud83d\ude99',
  'blue_heart':'\ud83d\udc99',
  'blush':'\ud83d\ude0a',
  'boar':'\ud83d\udc17',
  'boat':'\u26f5\ufe0f',
  'bomb':'\ud83d\udca3',
  'book':'\ud83d\udcd6',
  'bookmark':'\ud83d\udd16',
  'bookmark_tabs':'\ud83d\udcd1',
  'books':'\ud83d\udcda',
  'boom':'\ud83d\udca5',
  'boot':'\ud83d\udc62',
  'bouquet':'\ud83d\udc90',
  'bowing_man':'\ud83d\ude47',
  'bow_and_arrow':'\ud83c\udff9',
  'bowing_woman':'\ud83d\ude47&zwj;\u2640\ufe0f',
  'bowling':'\ud83c\udfb3',
  'boxing_glove':'\ud83e\udd4a',
  'boy':'\ud83d\udc66',
  'bread':'\ud83c\udf5e',
  'bride_with_veil':'\ud83d\udc70',
  'bridge_at_night':'\ud83c\udf09',
  'briefcase':'\ud83d\udcbc',
  'broken_heart':'\ud83d\udc94',
  'bug':'\ud83d\udc1b',
  'building_construction':'\ud83c\udfd7',
  'bulb':'\ud83d\udca1',
  'bullettrain_front':'\ud83d\ude85',
  'bullettrain_side':'\ud83d\ude84',
  'burrito':'\ud83c\udf2f',
  'bus':'\ud83d\ude8c',
  'business_suit_levitating':'\ud83d\udd74',
  'busstop':'\ud83d\ude8f',
  'bust_in_silhouette':'\ud83d\udc64',
  'busts_in_silhouette':'\ud83d\udc65',
  'butterfly':'\ud83e\udd8b',
  'cactus':'\ud83c\udf35',
  'cake':'\ud83c\udf70',
  'calendar':'\ud83d\udcc6',
  'call_me_hand':'\ud83e\udd19',
  'calling':'\ud83d\udcf2',
  'camel':'\ud83d\udc2b',
  'camera':'\ud83d\udcf7',
  'camera_flash':'\ud83d\udcf8',
  'camping':'\ud83c\udfd5',
  'cancer':'\u264b\ufe0f',
  'candle':'\ud83d\udd6f',
  'candy':'\ud83c\udf6c',
  'canoe':'\ud83d\udef6',
  'capital_abcd':'\ud83d\udd20',
  'capricorn':'\u2651\ufe0f',
  'car':'\ud83d\ude97',
  'card_file_box':'\ud83d\uddc3',
  'card_index':'\ud83d\udcc7',
  'card_index_dividers':'\ud83d\uddc2',
  'carousel_horse':'\ud83c\udfa0',
  'carrot':'\ud83e\udd55',
  'cat':'\ud83d\udc31',
  'cat2':'\ud83d\udc08',
  'cd':'\ud83d\udcbf',
  'chains':'\u26d3',
  'champagne':'\ud83c\udf7e',
  'chart':'\ud83d\udcb9',
  'chart_with_downwards_trend':'\ud83d\udcc9',
  'chart_with_upwards_trend':'\ud83d\udcc8',
  'checkered_flag':'\ud83c\udfc1',
  'cheese':'\ud83e\uddc0',
  'cherries':'\ud83c\udf52',
  'cherry_blossom':'\ud83c\udf38',
  'chestnut':'\ud83c\udf30',
  'chicken':'\ud83d\udc14',
  'children_crossing':'\ud83d\udeb8',
  'chipmunk':'\ud83d\udc3f',
  'chocolate_bar':'\ud83c\udf6b',
  'christmas_tree':'\ud83c\udf84',
  'church':'\u26ea\ufe0f',
  'cinema':'\ud83c\udfa6',
  'circus_tent':'\ud83c\udfaa',
  'city_sunrise':'\ud83c\udf07',
  'city_sunset':'\ud83c\udf06',
  'cityscape':'\ud83c\udfd9',
  'cl':'\ud83c\udd91',
  'clamp':'\ud83d\udddc',
  'clap':'\ud83d\udc4f',
  'clapper':'\ud83c\udfac',
  'classical_building':'\ud83c\udfdb',
  'clinking_glasses':'\ud83e\udd42',
  'clipboard':'\ud83d\udccb',
  'clock1':'\ud83d\udd50',
  'clock10':'\ud83d\udd59',
  'clock1030':'\ud83d\udd65',
  'clock11':'\ud83d\udd5a',
  'clock1130':'\ud83d\udd66',
  'clock12':'\ud83d\udd5b',
  'clock1230':'\ud83d\udd67',
  'clock130':'\ud83d\udd5c',
  'clock2':'\ud83d\udd51',
  'clock230':'\ud83d\udd5d',
  'clock3':'\ud83d\udd52',
  'clock330':'\ud83d\udd5e',
  'clock4':'\ud83d\udd53',
  'clock430':'\ud83d\udd5f',
  'clock5':'\ud83d\udd54',
  'clock530':'\ud83d\udd60',
  'clock6':'\ud83d\udd55',
  'clock630':'\ud83d\udd61',
  'clock7':'\ud83d\udd56',
  'clock730':'\ud83d\udd62',
  'clock8':'\ud83d\udd57',
  'clock830':'\ud83d\udd63',
  'clock9':'\ud83d\udd58',
  'clock930':'\ud83d\udd64',
  'closed_book':'\ud83d\udcd5',
  'closed_lock_with_key':'\ud83d\udd10',
  'closed_umbrella':'\ud83c\udf02',
  'cloud':'\u2601\ufe0f',
  'cloud_with_lightning':'\ud83c\udf29',
  'cloud_with_lightning_and_rain':'\u26c8',
  'cloud_with_rain':'\ud83c\udf27',
  'cloud_with_snow':'\ud83c\udf28',
  'clown_face':'\ud83e\udd21',
  'clubs':'\u2663\ufe0f',
  'cocktail':'\ud83c\udf78',
  'coffee':'\u2615\ufe0f',
  'coffin':'\u26b0\ufe0f',
  'cold_sweat':'\ud83d\ude30',
  'comet':'\u2604\ufe0f',
  'computer':'\ud83d\udcbb',
  'computer_mouse':'\ud83d\uddb1',
  'confetti_ball':'\ud83c\udf8a',
  'confounded':'\ud83d\ude16',
  'confused':'\ud83d\ude15',
  'congratulations':'\u3297\ufe0f',
  'construction':'\ud83d\udea7',
  'construction_worker_man':'\ud83d\udc77',
  'construction_worker_woman':'\ud83d\udc77&zwj;\u2640\ufe0f',
  'control_knobs':'\ud83c\udf9b',
  'convenience_store':'\ud83c\udfea',
  'cookie':'\ud83c\udf6a',
  'cool':'\ud83c\udd92',
  'policeman':'\ud83d\udc6e',
  'copyright':'\u00a9\ufe0f',
  'corn':'\ud83c\udf3d',
  'couch_and_lamp':'\ud83d\udecb',
  'couple':'\ud83d\udc6b',
  'couple_with_heart_woman_man':'\ud83d\udc91',
  'couple_with_heart_man_man':'\ud83d\udc68&zwj;\u2764\ufe0f&zwj;\ud83d\udc68',
  'couple_with_heart_woman_woman':'\ud83d\udc69&zwj;\u2764\ufe0f&zwj;\ud83d\udc69',
  'couplekiss_man_man':'\ud83d\udc68&zwj;\u2764\ufe0f&zwj;\ud83d\udc8b&zwj;\ud83d\udc68',
  'couplekiss_man_woman':'\ud83d\udc8f',
  'couplekiss_woman_woman':'\ud83d\udc69&zwj;\u2764\ufe0f&zwj;\ud83d\udc8b&zwj;\ud83d\udc69',
  'cow':'\ud83d\udc2e',
  'cow2':'\ud83d\udc04',
  'cowboy_hat_face':'\ud83e\udd20',
  'crab':'\ud83e\udd80',
  'crayon':'\ud83d\udd8d',
  'credit_card':'\ud83d\udcb3',
  'crescent_moon':'\ud83c\udf19',
  'cricket':'\ud83c\udfcf',
  'crocodile':'\ud83d\udc0a',
  'croissant':'\ud83e\udd50',
  'crossed_fingers':'\ud83e\udd1e',
  'crossed_flags':'\ud83c\udf8c',
  'crossed_swords':'\u2694\ufe0f',
  'crown':'\ud83d\udc51',
  'cry':'\ud83d\ude22',
  'crying_cat_face':'\ud83d\ude3f',
  'crystal_ball':'\ud83d\udd2e',
  'cucumber':'\ud83e\udd52',
  'cupid':'\ud83d\udc98',
  'curly_loop':'\u27b0',
  'currency_exchange':'\ud83d\udcb1',
  'curry':'\ud83c\udf5b',
  'custard':'\ud83c\udf6e',
  'customs':'\ud83d\udec3',
  'cyclone':'\ud83c\udf00',
  'dagger':'\ud83d\udde1',
  'dancer':'\ud83d\udc83',
  'dancing_women':'\ud83d\udc6f',
  'dancing_men':'\ud83d\udc6f&zwj;\u2642\ufe0f',
  'dango':'\ud83c\udf61',
  'dark_sunglasses':'\ud83d\udd76',
  'dart':'\ud83c\udfaf',
  'dash':'\ud83d\udca8',
  'date':'\ud83d\udcc5',
  'deciduous_tree':'\ud83c\udf33',
  'deer':'\ud83e\udd8c',
  'department_store':'\ud83c\udfec',
  'derelict_house':'\ud83c\udfda',
  'desert':'\ud83c\udfdc',
  'desert_island':'\ud83c\udfdd',
  'desktop_computer':'\ud83d\udda5',
  'male_detective':'\ud83d\udd75\ufe0f',
  'diamond_shape_with_a_dot_inside':'\ud83d\udca0',
  'diamonds':'\u2666\ufe0f',
  'disappointed':'\ud83d\ude1e',
  'disappointed_relieved':'\ud83d\ude25',
  'dizzy':'\ud83d\udcab',
  'dizzy_face':'\ud83d\ude35',
  'do_not_litter':'\ud83d\udeaf',
  'dog':'\ud83d\udc36',
  'dog2':'\ud83d\udc15',
  'dollar':'\ud83d\udcb5',
  'dolls':'\ud83c\udf8e',
  'dolphin':'\ud83d\udc2c',
  'door':'\ud83d\udeaa',
  'doughnut':'\ud83c\udf69',
  'dove':'\ud83d\udd4a',
  'dragon':'\ud83d\udc09',
  'dragon_face':'\ud83d\udc32',
  'dress':'\ud83d\udc57',
  'dromedary_camel':'\ud83d\udc2a',
  'drooling_face':'\ud83e\udd24',
  'droplet':'\ud83d\udca7',
  'drum':'\ud83e\udd41',
  'duck':'\ud83e\udd86',
  'dvd':'\ud83d\udcc0',
  'e-mail':'\ud83d\udce7',
  'eagle':'\ud83e\udd85',
  'ear':'\ud83d\udc42',
  'ear_of_rice':'\ud83c\udf3e',
  'earth_africa':'\ud83c\udf0d',
  'earth_americas':'\ud83c\udf0e',
  'earth_asia':'\ud83c\udf0f',
  'egg':'\ud83e\udd5a',
  'eggplant':'\ud83c\udf46',
  'eight_pointed_black_star':'\u2734\ufe0f',
  'eight_spoked_asterisk':'\u2733\ufe0f',
  'electric_plug':'\ud83d\udd0c',
  'elephant':'\ud83d\udc18',
  'email':'\u2709\ufe0f',
  'end':'\ud83d\udd1a',
  'envelope_with_arrow':'\ud83d\udce9',
  'euro':'\ud83d\udcb6',
  'european_castle':'\ud83c\udff0',
  'european_post_office':'\ud83c\udfe4',
  'evergreen_tree':'\ud83c\udf32',
  'exclamation':'\u2757\ufe0f',
  'expressionless':'\ud83d\ude11',
  'eye':'\ud83d\udc41',
  'eye_speech_bubble':'\ud83d\udc41&zwj;\ud83d\udde8',
  'eyeglasses':'\ud83d\udc53',
  'eyes':'\ud83d\udc40',
  'face_with_head_bandage':'\ud83e\udd15',
  'face_with_thermometer':'\ud83e\udd12',
  'fist_oncoming':'\ud83d\udc4a',
  'factory':'\ud83c\udfed',
  'fallen_leaf':'\ud83c\udf42',
  'family_man_woman_boy':'\ud83d\udc6a',
  'family_man_boy':'\ud83d\udc68&zwj;\ud83d\udc66',
  'family_man_boy_boy':'\ud83d\udc68&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_man_girl':'\ud83d\udc68&zwj;\ud83d\udc67',
  'family_man_girl_boy':'\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_man_girl_girl':'\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'family_man_man_boy':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc66',
  'family_man_man_boy_boy':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_man_man_girl':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc67',
  'family_man_man_girl_boy':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_man_man_girl_girl':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'family_man_woman_boy_boy':'\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_man_woman_girl':'\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc67',
  'family_man_woman_girl_boy':'\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_man_woman_girl_girl':'\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'family_woman_boy':'\ud83d\udc69&zwj;\ud83d\udc66',
  'family_woman_boy_boy':'\ud83d\udc69&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_woman_girl':'\ud83d\udc69&zwj;\ud83d\udc67',
  'family_woman_girl_boy':'\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_woman_girl_girl':'\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'family_woman_woman_boy':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc66',
  'family_woman_woman_boy_boy':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_woman_woman_girl':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc67',
  'family_woman_woman_girl_boy':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_woman_woman_girl_girl':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'fast_forward':'\u23e9',
  'fax':'\ud83d\udce0',
  'fearful':'\ud83d\ude28',
  'feet':'\ud83d\udc3e',
  'female_detective':'\ud83d\udd75\ufe0f&zwj;\u2640\ufe0f',
  'ferris_wheel':'\ud83c\udfa1',
  'ferry':'\u26f4',
  'field_hockey':'\ud83c\udfd1',
  'file_cabinet':'\ud83d\uddc4',
  'file_folder':'\ud83d\udcc1',
  'film_projector':'\ud83d\udcfd',
  'film_strip':'\ud83c\udf9e',
  'fire':'\ud83d\udd25',
  'fire_engine':'\ud83d\ude92',
  'fireworks':'\ud83c\udf86',
  'first_quarter_moon':'\ud83c\udf13',
  'first_quarter_moon_with_face':'\ud83c\udf1b',
  'fish':'\ud83d\udc1f',
  'fish_cake':'\ud83c\udf65',
  'fishing_pole_and_fish':'\ud83c\udfa3',
  'fist_raised':'\u270a',
  'fist_left':'\ud83e\udd1b',
  'fist_right':'\ud83e\udd1c',
  'flags':'\ud83c\udf8f',
  'flashlight':'\ud83d\udd26',
  'fleur_de_lis':'\u269c\ufe0f',
  'flight_arrival':'\ud83d\udeec',
  'flight_departure':'\ud83d\udeeb',
  'floppy_disk':'\ud83d\udcbe',
  'flower_playing_cards':'\ud83c\udfb4',
  'flushed':'\ud83d\ude33',
  'fog':'\ud83c\udf2b',
  'foggy':'\ud83c\udf01',
  'football':'\ud83c\udfc8',
  'footprints':'\ud83d\udc63',
  'fork_and_knife':'\ud83c\udf74',
  'fountain':'\u26f2\ufe0f',
  'fountain_pen':'\ud83d\udd8b',
  'four_leaf_clover':'\ud83c\udf40',
  'fox_face':'\ud83e\udd8a',
  'framed_picture':'\ud83d\uddbc',
  'free':'\ud83c\udd93',
  'fried_egg':'\ud83c\udf73',
  'fried_shrimp':'\ud83c\udf64',
  'fries':'\ud83c\udf5f',
  'frog':'\ud83d\udc38',
  'frowning':'\ud83d\ude26',
  'frowning_face':'\u2639\ufe0f',
  'frowning_man':'\ud83d\ude4d&zwj;\u2642\ufe0f',
  'frowning_woman':'\ud83d\ude4d',
  'middle_finger':'\ud83d\udd95',
  'fuelpump':'\u26fd\ufe0f',
  'full_moon':'\ud83c\udf15',
  'full_moon_with_face':'\ud83c\udf1d',
  'funeral_urn':'\u26b1\ufe0f',
  'game_die':'\ud83c\udfb2',
  'gear':'\u2699\ufe0f',
  'gem':'\ud83d\udc8e',
  'gemini':'\u264a\ufe0f',
  'ghost':'\ud83d\udc7b',
  'gift':'\ud83c\udf81',
  'gift_heart':'\ud83d\udc9d',
  'girl':'\ud83d\udc67',
  'globe_with_meridians':'\ud83c\udf10',
  'goal_net':'\ud83e\udd45',
  'goat':'\ud83d\udc10',
  'golf':'\u26f3\ufe0f',
  'golfing_man':'\ud83c\udfcc\ufe0f',
  'golfing_woman':'\ud83c\udfcc\ufe0f&zwj;\u2640\ufe0f',
  'gorilla':'\ud83e\udd8d',
  'grapes':'\ud83c\udf47',
  'green_apple':'\ud83c\udf4f',
  'green_book':'\ud83d\udcd7',
  'green_heart':'\ud83d\udc9a',
  'green_salad':'\ud83e\udd57',
  'grey_exclamation':'\u2755',
  'grey_question':'\u2754',
  'grimacing':'\ud83d\ude2c',
  'grin':'\ud83d\ude01',
  'grinning':'\ud83d\ude00',
  'guardsman':'\ud83d\udc82',
  'guardswoman':'\ud83d\udc82&zwj;\u2640\ufe0f',
  'guitar':'\ud83c\udfb8',
  'gun':'\ud83d\udd2b',
  'haircut_woman':'\ud83d\udc87',
  'haircut_man':'\ud83d\udc87&zwj;\u2642\ufe0f',
  'hamburger':'\ud83c\udf54',
  'hammer':'\ud83d\udd28',
  'hammer_and_pick':'\u2692',
  'hammer_and_wrench':'\ud83d\udee0',
  'hamster':'\ud83d\udc39',
  'hand':'\u270b',
  'handbag':'\ud83d\udc5c',
  'handshake':'\ud83e\udd1d',
  'hankey':'\ud83d\udca9',
  'hatched_chick':'\ud83d\udc25',
  'hatching_chick':'\ud83d\udc23',
  'headphones':'\ud83c\udfa7',
  'hear_no_evil':'\ud83d\ude49',
  'heart':'\u2764\ufe0f',
  'heart_decoration':'\ud83d\udc9f',
  'heart_eyes':'\ud83d\ude0d',
  'heart_eyes_cat':'\ud83d\ude3b',
  'heartbeat':'\ud83d\udc93',
  'heartpulse':'\ud83d\udc97',
  'hearts':'\u2665\ufe0f',
  'heavy_check_mark':'\u2714\ufe0f',
  'heavy_division_sign':'\u2797',
  'heavy_dollar_sign':'\ud83d\udcb2',
  'heavy_heart_exclamation':'\u2763\ufe0f',
  'heavy_minus_sign':'\u2796',
  'heavy_multiplication_x':'\u2716\ufe0f',
  'heavy_plus_sign':'\u2795',
  'helicopter':'\ud83d\ude81',
  'herb':'\ud83c\udf3f',
  'hibiscus':'\ud83c\udf3a',
  'high_brightness':'\ud83d\udd06',
  'high_heel':'\ud83d\udc60',
  'hocho':'\ud83d\udd2a',
  'hole':'\ud83d\udd73',
  'honey_pot':'\ud83c\udf6f',
  'horse':'\ud83d\udc34',
  'horse_racing':'\ud83c\udfc7',
  'hospital':'\ud83c\udfe5',
  'hot_pepper':'\ud83c\udf36',
  'hotdog':'\ud83c\udf2d',
  'hotel':'\ud83c\udfe8',
  'hotsprings':'\u2668\ufe0f',
  'hourglass':'\u231b\ufe0f',
  'hourglass_flowing_sand':'\u23f3',
  'house':'\ud83c\udfe0',
  'house_with_garden':'\ud83c\udfe1',
  'houses':'\ud83c\udfd8',
  'hugs':'\ud83e\udd17',
  'hushed':'\ud83d\ude2f',
  'ice_cream':'\ud83c\udf68',
  'ice_hockey':'\ud83c\udfd2',
  'ice_skate':'\u26f8',
  'icecream':'\ud83c\udf66',
  'id':'\ud83c\udd94',
  'ideograph_advantage':'\ud83c\ude50',
  'imp':'\ud83d\udc7f',
  'inbox_tray':'\ud83d\udce5',
  'incoming_envelope':'\ud83d\udce8',
  'tipping_hand_woman':'\ud83d\udc81',
  'information_source':'\u2139\ufe0f',
  'innocent':'\ud83d\ude07',
  'interrobang':'\u2049\ufe0f',
  'iphone':'\ud83d\udcf1',
  'izakaya_lantern':'\ud83c\udfee',
  'jack_o_lantern':'\ud83c\udf83',
  'japan':'\ud83d\uddfe',
  'japanese_castle':'\ud83c\udfef',
  'japanese_goblin':'\ud83d\udc7a',
  'japanese_ogre':'\ud83d\udc79',
  'jeans':'\ud83d\udc56',
  'joy':'\ud83d\ude02',
  'joy_cat':'\ud83d\ude39',
  'joystick':'\ud83d\udd79',
  'kaaba':'\ud83d\udd4b',
  'key':'\ud83d\udd11',
  'keyboard':'\u2328\ufe0f',
  'keycap_ten':'\ud83d\udd1f',
  'kick_scooter':'\ud83d\udef4',
  'kimono':'\ud83d\udc58',
  'kiss':'\ud83d\udc8b',
  'kissing':'\ud83d\ude17',
  'kissing_cat':'\ud83d\ude3d',
  'kissing_closed_eyes':'\ud83d\ude1a',
  'kissing_heart':'\ud83d\ude18',
  'kissing_smiling_eyes':'\ud83d\ude19',
  'kiwi_fruit':'\ud83e\udd5d',
  'koala':'\ud83d\udc28',
  'koko':'\ud83c\ude01',
  'label':'\ud83c\udff7',
  'large_blue_circle':'\ud83d\udd35',
  'large_blue_diamond':'\ud83d\udd37',
  'large_orange_diamond':'\ud83d\udd36',
  'last_quarter_moon':'\ud83c\udf17',
  'last_quarter_moon_with_face':'\ud83c\udf1c',
  'latin_cross':'\u271d\ufe0f',
  'laughing':'\ud83d\ude06',
  'leaves':'\ud83c\udf43',
  'ledger':'\ud83d\udcd2',
  'left_luggage':'\ud83d\udec5',
  'left_right_arrow':'\u2194\ufe0f',
  'leftwards_arrow_with_hook':'\u21a9\ufe0f',
  'lemon':'\ud83c\udf4b',
  'leo':'\u264c\ufe0f',
  'leopard':'\ud83d\udc06',
  'level_slider':'\ud83c\udf9a',
  'libra':'\u264e\ufe0f',
  'light_rail':'\ud83d\ude88',
  'link':'\ud83d\udd17',
  'lion':'\ud83e\udd81',
  'lips':'\ud83d\udc44',
  'lipstick':'\ud83d\udc84',
  'lizard':'\ud83e\udd8e',
  'lock':'\ud83d\udd12',
  'lock_with_ink_pen':'\ud83d\udd0f',
  'lollipop':'\ud83c\udf6d',
  'loop':'\u27bf',
  'loud_sound':'\ud83d\udd0a',
  'loudspeaker':'\ud83d\udce2',
  'love_hotel':'\ud83c\udfe9',
  'love_letter':'\ud83d\udc8c',
  'low_brightness':'\ud83d\udd05',
  'lying_face':'\ud83e\udd25',
  'm':'\u24c2\ufe0f',
  'mag':'\ud83d\udd0d',
  'mag_right':'\ud83d\udd0e',
  'mahjong':'\ud83c\udc04\ufe0f',
  'mailbox':'\ud83d\udceb',
  'mailbox_closed':'\ud83d\udcea',
  'mailbox_with_mail':'\ud83d\udcec',
  'mailbox_with_no_mail':'\ud83d\udced',
  'man':'\ud83d\udc68',
  'man_artist':'\ud83d\udc68&zwj;\ud83c\udfa8',
  'man_astronaut':'\ud83d\udc68&zwj;\ud83d\ude80',
  'man_cartwheeling':'\ud83e\udd38&zwj;\u2642\ufe0f',
  'man_cook':'\ud83d\udc68&zwj;\ud83c\udf73',
  'man_dancing':'\ud83d\udd7a',
  'man_facepalming':'\ud83e\udd26&zwj;\u2642\ufe0f',
  'man_factory_worker':'\ud83d\udc68&zwj;\ud83c\udfed',
  'man_farmer':'\ud83d\udc68&zwj;\ud83c\udf3e',
  'man_firefighter':'\ud83d\udc68&zwj;\ud83d\ude92',
  'man_health_worker':'\ud83d\udc68&zwj;\u2695\ufe0f',
  'man_in_tuxedo':'\ud83e\udd35',
  'man_judge':'\ud83d\udc68&zwj;\u2696\ufe0f',
  'man_juggling':'\ud83e\udd39&zwj;\u2642\ufe0f',
  'man_mechanic':'\ud83d\udc68&zwj;\ud83d\udd27',
  'man_office_worker':'\ud83d\udc68&zwj;\ud83d\udcbc',
  'man_pilot':'\ud83d\udc68&zwj;\u2708\ufe0f',
  'man_playing_handball':'\ud83e\udd3e&zwj;\u2642\ufe0f',
  'man_playing_water_polo':'\ud83e\udd3d&zwj;\u2642\ufe0f',
  'man_scientist':'\ud83d\udc68&zwj;\ud83d\udd2c',
  'man_shrugging':'\ud83e\udd37&zwj;\u2642\ufe0f',
  'man_singer':'\ud83d\udc68&zwj;\ud83c\udfa4',
  'man_student':'\ud83d\udc68&zwj;\ud83c\udf93',
  'man_teacher':'\ud83d\udc68&zwj;\ud83c\udfeb',
  'man_technologist':'\ud83d\udc68&zwj;\ud83d\udcbb',
  'man_with_gua_pi_mao':'\ud83d\udc72',
  'man_with_turban':'\ud83d\udc73',
  'tangerine':'\ud83c\udf4a',
  'mans_shoe':'\ud83d\udc5e',
  'mantelpiece_clock':'\ud83d\udd70',
  'maple_leaf':'\ud83c\udf41',
  'martial_arts_uniform':'\ud83e\udd4b',
  'mask':'\ud83d\ude37',
  'massage_woman':'\ud83d\udc86',
  'massage_man':'\ud83d\udc86&zwj;\u2642\ufe0f',
  'meat_on_bone':'\ud83c\udf56',
  'medal_military':'\ud83c\udf96',
  'medal_sports':'\ud83c\udfc5',
  'mega':'\ud83d\udce3',
  'melon':'\ud83c\udf48',
  'memo':'\ud83d\udcdd',
  'men_wrestling':'\ud83e\udd3c&zwj;\u2642\ufe0f',
  'menorah':'\ud83d\udd4e',
  'mens':'\ud83d\udeb9',
  'metal':'\ud83e\udd18',
  'metro':'\ud83d\ude87',
  'microphone':'\ud83c\udfa4',
  'microscope':'\ud83d\udd2c',
  'milk_glass':'\ud83e\udd5b',
  'milky_way':'\ud83c\udf0c',
  'minibus':'\ud83d\ude90',
  'minidisc':'\ud83d\udcbd',
  'mobile_phone_off':'\ud83d\udcf4',
  'money_mouth_face':'\ud83e\udd11',
  'money_with_wings':'\ud83d\udcb8',
  'moneybag':'\ud83d\udcb0',
  'monkey':'\ud83d\udc12',
  'monkey_face':'\ud83d\udc35',
  'monorail':'\ud83d\ude9d',
  'moon':'\ud83c\udf14',
  'mortar_board':'\ud83c\udf93',
  'mosque':'\ud83d\udd4c',
  'motor_boat':'\ud83d\udee5',
  'motor_scooter':'\ud83d\udef5',
  'motorcycle':'\ud83c\udfcd',
  'motorway':'\ud83d\udee3',
  'mount_fuji':'\ud83d\uddfb',
  'mountain':'\u26f0',
  'mountain_biking_man':'\ud83d\udeb5',
  'mountain_biking_woman':'\ud83d\udeb5&zwj;\u2640\ufe0f',
  'mountain_cableway':'\ud83d\udea0',
  'mountain_railway':'\ud83d\ude9e',
  'mountain_snow':'\ud83c\udfd4',
  'mouse':'\ud83d\udc2d',
  'mouse2':'\ud83d\udc01',
  'movie_camera':'\ud83c\udfa5',
  'moyai':'\ud83d\uddff',
  'mrs_claus':'\ud83e\udd36',
  'muscle':'\ud83d\udcaa',
  'mushroom':'\ud83c\udf44',
  'musical_keyboard':'\ud83c\udfb9',
  'musical_note':'\ud83c\udfb5',
  'musical_score':'\ud83c\udfbc',
  'mute':'\ud83d\udd07',
  'nail_care':'\ud83d\udc85',
  'name_badge':'\ud83d\udcdb',
  'national_park':'\ud83c\udfde',
  'nauseated_face':'\ud83e\udd22',
  'necktie':'\ud83d\udc54',
  'negative_squared_cross_mark':'\u274e',
  'nerd_face':'\ud83e\udd13',
  'neutral_face':'\ud83d\ude10',
  'new':'\ud83c\udd95',
  'new_moon':'\ud83c\udf11',
  'new_moon_with_face':'\ud83c\udf1a',
  'newspaper':'\ud83d\udcf0',
  'newspaper_roll':'\ud83d\uddde',
  'next_track_button':'\u23ed',
  'ng':'\ud83c\udd96',
  'no_good_man':'\ud83d\ude45&zwj;\u2642\ufe0f',
  'no_good_woman':'\ud83d\ude45',
  'night_with_stars':'\ud83c\udf03',
  'no_bell':'\ud83d\udd15',
  'no_bicycles':'\ud83d\udeb3',
  'no_entry':'\u26d4\ufe0f',
  'no_entry_sign':'\ud83d\udeab',
  'no_mobile_phones':'\ud83d\udcf5',
  'no_mouth':'\ud83d\ude36',
  'no_pedestrians':'\ud83d\udeb7',
  'no_smoking':'\ud83d\udead',
  'non-potable_water':'\ud83d\udeb1',
  'nose':'\ud83d\udc43',
  'notebook':'\ud83d\udcd3',
  'notebook_with_decorative_cover':'\ud83d\udcd4',
  'notes':'\ud83c\udfb6',
  'nut_and_bolt':'\ud83d\udd29',
  'o':'\u2b55\ufe0f',
  'o2':'\ud83c\udd7e\ufe0f',
  'ocean':'\ud83c\udf0a',
  'octopus':'\ud83d\udc19',
  'oden':'\ud83c\udf62',
  'office':'\ud83c\udfe2',
  'oil_drum':'\ud83d\udee2',
  'ok':'\ud83c\udd97',
  'ok_hand':'\ud83d\udc4c',
  'ok_man':'\ud83d\ude46&zwj;\u2642\ufe0f',
  'ok_woman':'\ud83d\ude46',
  'old_key':'\ud83d\udddd',
  'older_man':'\ud83d\udc74',
  'older_woman':'\ud83d\udc75',
  'om':'\ud83d\udd49',
  'on':'\ud83d\udd1b',
  'oncoming_automobile':'\ud83d\ude98',
  'oncoming_bus':'\ud83d\ude8d',
  'oncoming_police_car':'\ud83d\ude94',
  'oncoming_taxi':'\ud83d\ude96',
  'open_file_folder':'\ud83d\udcc2',
  'open_hands':'\ud83d\udc50',
  'open_mouth':'\ud83d\ude2e',
  'open_umbrella':'\u2602\ufe0f',
  'ophiuchus':'\u26ce',
  'orange_book':'\ud83d\udcd9',
  'orthodox_cross':'\u2626\ufe0f',
  'outbox_tray':'\ud83d\udce4',
  'owl':'\ud83e\udd89',
  'ox':'\ud83d\udc02',
  'package':'\ud83d\udce6',
  'page_facing_up':'\ud83d\udcc4',
  'page_with_curl':'\ud83d\udcc3',
  'pager':'\ud83d\udcdf',
  'paintbrush':'\ud83d\udd8c',
  'palm_tree':'\ud83c\udf34',
  'pancakes':'\ud83e\udd5e',
  'panda_face':'\ud83d\udc3c',
  'paperclip':'\ud83d\udcce',
  'paperclips':'\ud83d\udd87',
  'parasol_on_ground':'\u26f1',
  'parking':'\ud83c\udd7f\ufe0f',
  'part_alternation_mark':'\u303d\ufe0f',
  'partly_sunny':'\u26c5\ufe0f',
  'passenger_ship':'\ud83d\udef3',
  'passport_control':'\ud83d\udec2',
  'pause_button':'\u23f8',
  'peace_symbol':'\u262e\ufe0f',
  'peach':'\ud83c\udf51',
  'peanuts':'\ud83e\udd5c',
  'pear':'\ud83c\udf50',
  'pen':'\ud83d\udd8a',
  'pencil2':'\u270f\ufe0f',
  'penguin':'\ud83d\udc27',
  'pensive':'\ud83d\ude14',
  'performing_arts':'\ud83c\udfad',
  'persevere':'\ud83d\ude23',
  'person_fencing':'\ud83e\udd3a',
  'pouting_woman':'\ud83d\ude4e',
  'phone':'\u260e\ufe0f',
  'pick':'\u26cf',
  'pig':'\ud83d\udc37',
  'pig2':'\ud83d\udc16',
  'pig_nose':'\ud83d\udc3d',
  'pill':'\ud83d\udc8a',
  'pineapple':'\ud83c\udf4d',
  'ping_pong':'\ud83c\udfd3',
  'pisces':'\u2653\ufe0f',
  'pizza':'\ud83c\udf55',
  'place_of_worship':'\ud83d\uded0',
  'plate_with_cutlery':'\ud83c\udf7d',
  'play_or_pause_button':'\u23ef',
  'point_down':'\ud83d\udc47',
  'point_left':'\ud83d\udc48',
  'point_right':'\ud83d\udc49',
  'point_up':'\u261d\ufe0f',
  'point_up_2':'\ud83d\udc46',
  'police_car':'\ud83d\ude93',
  'policewoman':'\ud83d\udc6e&zwj;\u2640\ufe0f',
  'poodle':'\ud83d\udc29',
  'popcorn':'\ud83c\udf7f',
  'post_office':'\ud83c\udfe3',
  'postal_horn':'\ud83d\udcef',
  'postbox':'\ud83d\udcee',
  'potable_water':'\ud83d\udeb0',
  'potato':'\ud83e\udd54',
  'pouch':'\ud83d\udc5d',
  'poultry_leg':'\ud83c\udf57',
  'pound':'\ud83d\udcb7',
  'rage':'\ud83d\ude21',
  'pouting_cat':'\ud83d\ude3e',
  'pouting_man':'\ud83d\ude4e&zwj;\u2642\ufe0f',
  'pray':'\ud83d\ude4f',
  'prayer_beads':'\ud83d\udcff',
  'pregnant_woman':'\ud83e\udd30',
  'previous_track_button':'\u23ee',
  'prince':'\ud83e\udd34',
  'princess':'\ud83d\udc78',
  'printer':'\ud83d\udda8',
  'purple_heart':'\ud83d\udc9c',
  'purse':'\ud83d\udc5b',
  'pushpin':'\ud83d\udccc',
  'put_litter_in_its_place':'\ud83d\udeae',
  'question':'\u2753',
  'rabbit':'\ud83d\udc30',
  'rabbit2':'\ud83d\udc07',
  'racehorse':'\ud83d\udc0e',
  'racing_car':'\ud83c\udfce',
  'radio':'\ud83d\udcfb',
  'radio_button':'\ud83d\udd18',
  'radioactive':'\u2622\ufe0f',
  'railway_car':'\ud83d\ude83',
  'railway_track':'\ud83d\udee4',
  'rainbow':'\ud83c\udf08',
  'rainbow_flag':'\ud83c\udff3\ufe0f&zwj;\ud83c\udf08',
  'raised_back_of_hand':'\ud83e\udd1a',
  'raised_hand_with_fingers_splayed':'\ud83d\udd90',
  'raised_hands':'\ud83d\ude4c',
  'raising_hand_woman':'\ud83d\ude4b',
  'raising_hand_man':'\ud83d\ude4b&zwj;\u2642\ufe0f',
  'ram':'\ud83d\udc0f',
  'ramen':'\ud83c\udf5c',
  'rat':'\ud83d\udc00',
  'record_button':'\u23fa',
  'recycle':'\u267b\ufe0f',
  'red_circle':'\ud83d\udd34',
  'registered':'\u00ae\ufe0f',
  'relaxed':'\u263a\ufe0f',
  'relieved':'\ud83d\ude0c',
  'reminder_ribbon':'\ud83c\udf97',
  'repeat':'\ud83d\udd01',
  'repeat_one':'\ud83d\udd02',
  'rescue_worker_helmet':'\u26d1',
  'restroom':'\ud83d\udebb',
  'revolving_hearts':'\ud83d\udc9e',
  'rewind':'\u23ea',
  'rhinoceros':'\ud83e\udd8f',
  'ribbon':'\ud83c\udf80',
  'rice':'\ud83c\udf5a',
  'rice_ball':'\ud83c\udf59',
  'rice_cracker':'\ud83c\udf58',
  'rice_scene':'\ud83c\udf91',
  'right_anger_bubble':'\ud83d\uddef',
  'ring':'\ud83d\udc8d',
  'robot':'\ud83e\udd16',
  'rocket':'\ud83d\ude80',
  'rofl':'\ud83e\udd23',
  'roll_eyes':'\ud83d\ude44',
  'roller_coaster':'\ud83c\udfa2',
  'rooster':'\ud83d\udc13',
  'rose':'\ud83c\udf39',
  'rosette':'\ud83c\udff5',
  'rotating_light':'\ud83d\udea8',
  'round_pushpin':'\ud83d\udccd',
  'rowing_man':'\ud83d\udea3',
  'rowing_woman':'\ud83d\udea3&zwj;\u2640\ufe0f',
  'rugby_football':'\ud83c\udfc9',
  'running_man':'\ud83c\udfc3',
  'running_shirt_with_sash':'\ud83c\udfbd',
  'running_woman':'\ud83c\udfc3&zwj;\u2640\ufe0f',
  'sa':'\ud83c\ude02\ufe0f',
  'sagittarius':'\u2650\ufe0f',
  'sake':'\ud83c\udf76',
  'sandal':'\ud83d\udc61',
  'santa':'\ud83c\udf85',
  'satellite':'\ud83d\udce1',
  'saxophone':'\ud83c\udfb7',
  'school':'\ud83c\udfeb',
  'school_satchel':'\ud83c\udf92',
  'scissors':'\u2702\ufe0f',
  'scorpion':'\ud83e\udd82',
  'scorpius':'\u264f\ufe0f',
  'scream':'\ud83d\ude31',
  'scream_cat':'\ud83d\ude40',
  'scroll':'\ud83d\udcdc',
  'seat':'\ud83d\udcba',
  'secret':'\u3299\ufe0f',
  'see_no_evil':'\ud83d\ude48',
  'seedling':'\ud83c\udf31',
  'selfie':'\ud83e\udd33',
  'shallow_pan_of_food':'\ud83e\udd58',
  'shamrock':'\u2618\ufe0f',
  'shark':'\ud83e\udd88',
  'shaved_ice':'\ud83c\udf67',
  'sheep':'\ud83d\udc11',
  'shell':'\ud83d\udc1a',
  'shield':'\ud83d\udee1',
  'shinto_shrine':'\u26e9',
  'ship':'\ud83d\udea2',
  'shirt':'\ud83d\udc55',
  'shopping':'\ud83d\udecd',
  'shopping_cart':'\ud83d\uded2',
  'shower':'\ud83d\udebf',
  'shrimp':'\ud83e\udd90',
  'signal_strength':'\ud83d\udcf6',
  'six_pointed_star':'\ud83d\udd2f',
  'ski':'\ud83c\udfbf',
  'skier':'\u26f7',
  'skull':'\ud83d\udc80',
  'skull_and_crossbones':'\u2620\ufe0f',
  'sleeping':'\ud83d\ude34',
  'sleeping_bed':'\ud83d\udecc',
  'sleepy':'\ud83d\ude2a',
  'slightly_frowning_face':'\ud83d\ude41',
  'slightly_smiling_face':'\ud83d\ude42',
  'slot_machine':'\ud83c\udfb0',
  'small_airplane':'\ud83d\udee9',
  'small_blue_diamond':'\ud83d\udd39',
  'small_orange_diamond':'\ud83d\udd38',
  'small_red_triangle':'\ud83d\udd3a',
  'small_red_triangle_down':'\ud83d\udd3b',
  'smile':'\ud83d\ude04',
  'smile_cat':'\ud83d\ude38',
  'smiley':'\ud83d\ude03',
  'smiley_cat':'\ud83d\ude3a',
  'smiling_imp':'\ud83d\ude08',
  'smirk':'\ud83d\ude0f',
  'smirk_cat':'\ud83d\ude3c',
  'smoking':'\ud83d\udeac',
  'snail':'\ud83d\udc0c',
  'snake':'\ud83d\udc0d',
  'sneezing_face':'\ud83e\udd27',
  'snowboarder':'\ud83c\udfc2',
  'snowflake':'\u2744\ufe0f',
  'snowman':'\u26c4\ufe0f',
  'snowman_with_snow':'\u2603\ufe0f',
  'sob':'\ud83d\ude2d',
  'soccer':'\u26bd\ufe0f',
  'soon':'\ud83d\udd1c',
  'sos':'\ud83c\udd98',
  'sound':'\ud83d\udd09',
  'space_invader':'\ud83d\udc7e',
  'spades':'\u2660\ufe0f',
  'spaghetti':'\ud83c\udf5d',
  'sparkle':'\u2747\ufe0f',
  'sparkler':'\ud83c\udf87',
  'sparkles':'\u2728',
  'sparkling_heart':'\ud83d\udc96',
  'speak_no_evil':'\ud83d\ude4a',
  'speaker':'\ud83d\udd08',
  'speaking_head':'\ud83d\udde3',
  'speech_balloon':'\ud83d\udcac',
  'speedboat':'\ud83d\udea4',
  'spider':'\ud83d\udd77',
  'spider_web':'\ud83d\udd78',
  'spiral_calendar':'\ud83d\uddd3',
  'spiral_notepad':'\ud83d\uddd2',
  'spoon':'\ud83e\udd44',
  'squid':'\ud83e\udd91',
  'stadium':'\ud83c\udfdf',
  'star':'\u2b50\ufe0f',
  'star2':'\ud83c\udf1f',
  'star_and_crescent':'\u262a\ufe0f',
  'star_of_david':'\u2721\ufe0f',
  'stars':'\ud83c\udf20',
  'station':'\ud83d\ude89',
  'statue_of_liberty':'\ud83d\uddfd',
  'steam_locomotive':'\ud83d\ude82',
  'stew':'\ud83c\udf72',
  'stop_button':'\u23f9',
  'stop_sign':'\ud83d\uded1',
  'stopwatch':'\u23f1',
  'straight_ruler':'\ud83d\udccf',
  'strawberry':'\ud83c\udf53',
  'stuck_out_tongue':'\ud83d\ude1b',
  'stuck_out_tongue_closed_eyes':'\ud83d\ude1d',
  'stuck_out_tongue_winking_eye':'\ud83d\ude1c',
  'studio_microphone':'\ud83c\udf99',
  'stuffed_flatbread':'\ud83e\udd59',
  'sun_behind_large_cloud':'\ud83c\udf25',
  'sun_behind_rain_cloud':'\ud83c\udf26',
  'sun_behind_small_cloud':'\ud83c\udf24',
  'sun_with_face':'\ud83c\udf1e',
  'sunflower':'\ud83c\udf3b',
  'sunglasses':'\ud83d\ude0e',
  'sunny':'\u2600\ufe0f',
  'sunrise':'\ud83c\udf05',
  'sunrise_over_mountains':'\ud83c\udf04',
  'surfing_man':'\ud83c\udfc4',
  'surfing_woman':'\ud83c\udfc4&zwj;\u2640\ufe0f',
  'sushi':'\ud83c\udf63',
  'suspension_railway':'\ud83d\ude9f',
  'sweat':'\ud83d\ude13',
  'sweat_drops':'\ud83d\udca6',
  'sweat_smile':'\ud83d\ude05',
  'sweet_potato':'\ud83c\udf60',
  'swimming_man':'\ud83c\udfca',
  'swimming_woman':'\ud83c\udfca&zwj;\u2640\ufe0f',
  'symbols':'\ud83d\udd23',
  'synagogue':'\ud83d\udd4d',
  'syringe':'\ud83d\udc89',
  'taco':'\ud83c\udf2e',
  'tada':'\ud83c\udf89',
  'tanabata_tree':'\ud83c\udf8b',
  'taurus':'\u2649\ufe0f',
  'taxi':'\ud83d\ude95',
  'tea':'\ud83c\udf75',
  'telephone_receiver':'\ud83d\udcde',
  'telescope':'\ud83d\udd2d',
  'tennis':'\ud83c\udfbe',
  'tent':'\u26fa\ufe0f',
  'thermometer':'\ud83c\udf21',
  'thinking':'\ud83e\udd14',
  'thought_balloon':'\ud83d\udcad',
  'ticket':'\ud83c\udfab',
  'tickets':'\ud83c\udf9f',
  'tiger':'\ud83d\udc2f',
  'tiger2':'\ud83d\udc05',
  'timer_clock':'\u23f2',
  'tipping_hand_man':'\ud83d\udc81&zwj;\u2642\ufe0f',
  'tired_face':'\ud83d\ude2b',
  'tm':'\u2122\ufe0f',
  'toilet':'\ud83d\udebd',
  'tokyo_tower':'\ud83d\uddfc',
  'tomato':'\ud83c\udf45',
  'tongue':'\ud83d\udc45',
  'top':'\ud83d\udd1d',
  'tophat':'\ud83c\udfa9',
  'tornado':'\ud83c\udf2a',
  'trackball':'\ud83d\uddb2',
  'tractor':'\ud83d\ude9c',
  'traffic_light':'\ud83d\udea5',
  'train':'\ud83d\ude8b',
  'train2':'\ud83d\ude86',
  'tram':'\ud83d\ude8a',
  'triangular_flag_on_post':'\ud83d\udea9',
  'triangular_ruler':'\ud83d\udcd0',
  'trident':'\ud83d\udd31',
  'triumph':'\ud83d\ude24',
  'trolleybus':'\ud83d\ude8e',
  'trophy':'\ud83c\udfc6',
  'tropical_drink':'\ud83c\udf79',
  'tropical_fish':'\ud83d\udc20',
  'truck':'\ud83d\ude9a',
  'trumpet':'\ud83c\udfba',
  'tulip':'\ud83c\udf37',
  'tumbler_glass':'\ud83e\udd43',
  'turkey':'\ud83e\udd83',
  'turtle':'\ud83d\udc22',
  'tv':'\ud83d\udcfa',
  'twisted_rightwards_arrows':'\ud83d\udd00',
  'two_hearts':'\ud83d\udc95',
  'two_men_holding_hands':'\ud83d\udc6c',
  'two_women_holding_hands':'\ud83d\udc6d',
  'u5272':'\ud83c\ude39',
  'u5408':'\ud83c\ude34',
  'u55b6':'\ud83c\ude3a',
  'u6307':'\ud83c\ude2f\ufe0f',
  'u6708':'\ud83c\ude37\ufe0f',
  'u6709':'\ud83c\ude36',
  'u6e80':'\ud83c\ude35',
  'u7121':'\ud83c\ude1a\ufe0f',
  'u7533':'\ud83c\ude38',
  'u7981':'\ud83c\ude32',
  'u7a7a':'\ud83c\ude33',
  'umbrella':'\u2614\ufe0f',
  'unamused':'\ud83d\ude12',
  'underage':'\ud83d\udd1e',
  'unicorn':'\ud83e\udd84',
  'unlock':'\ud83d\udd13',
  'up':'\ud83c\udd99',
  'upside_down_face':'\ud83d\ude43',
  'v':'\u270c\ufe0f',
  'vertical_traffic_light':'\ud83d\udea6',
  'vhs':'\ud83d\udcfc',
  'vibration_mode':'\ud83d\udcf3',
  'video_camera':'\ud83d\udcf9',
  'video_game':'\ud83c\udfae',
  'violin':'\ud83c\udfbb',
  'virgo':'\u264d\ufe0f',
  'volcano':'\ud83c\udf0b',
  'volleyball':'\ud83c\udfd0',
  'vs':'\ud83c\udd9a',
  'vulcan_salute':'\ud83d\udd96',
  'walking_man':'\ud83d\udeb6',
  'walking_woman':'\ud83d\udeb6&zwj;\u2640\ufe0f',
  'waning_crescent_moon':'\ud83c\udf18',
  'waning_gibbous_moon':'\ud83c\udf16',
  'warning':'\u26a0\ufe0f',
  'wastebasket':'\ud83d\uddd1',
  'watch':'\u231a\ufe0f',
  'water_buffalo':'\ud83d\udc03',
  'watermelon':'\ud83c\udf49',
  'wave':'\ud83d\udc4b',
  'wavy_dash':'\u3030\ufe0f',
  'waxing_crescent_moon':'\ud83c\udf12',
  'wc':'\ud83d\udebe',
  'weary':'\ud83d\ude29',
  'wedding':'\ud83d\udc92',
  'weight_lifting_man':'\ud83c\udfcb\ufe0f',
  'weight_lifting_woman':'\ud83c\udfcb\ufe0f&zwj;\u2640\ufe0f',
  'whale':'\ud83d\udc33',
  'whale2':'\ud83d\udc0b',
  'wheel_of_dharma':'\u2638\ufe0f',
  'wheelchair':'\u267f\ufe0f',
  'white_check_mark':'\u2705',
  'white_circle':'\u26aa\ufe0f',
  'white_flag':'\ud83c\udff3\ufe0f',
  'white_flower':'\ud83d\udcae',
  'white_large_square':'\u2b1c\ufe0f',
  'white_medium_small_square':'\u25fd\ufe0f',
  'white_medium_square':'\u25fb\ufe0f',
  'white_small_square':'\u25ab\ufe0f',
  'white_square_button':'\ud83d\udd33',
  'wilted_flower':'\ud83e\udd40',
  'wind_chime':'\ud83c\udf90',
  'wind_face':'\ud83c\udf2c',
  'wine_glass':'\ud83c\udf77',
  'wink':'\ud83d\ude09',
  'wolf':'\ud83d\udc3a',
  'woman':'\ud83d\udc69',
  'woman_artist':'\ud83d\udc69&zwj;\ud83c\udfa8',
  'woman_astronaut':'\ud83d\udc69&zwj;\ud83d\ude80',
  'woman_cartwheeling':'\ud83e\udd38&zwj;\u2640\ufe0f',
  'woman_cook':'\ud83d\udc69&zwj;\ud83c\udf73',
  'woman_facepalming':'\ud83e\udd26&zwj;\u2640\ufe0f',
  'woman_factory_worker':'\ud83d\udc69&zwj;\ud83c\udfed',
  'woman_farmer':'\ud83d\udc69&zwj;\ud83c\udf3e',
  'woman_firefighter':'\ud83d\udc69&zwj;\ud83d\ude92',
  'woman_health_worker':'\ud83d\udc69&zwj;\u2695\ufe0f',
  'woman_judge':'\ud83d\udc69&zwj;\u2696\ufe0f',
  'woman_juggling':'\ud83e\udd39&zwj;\u2640\ufe0f',
  'woman_mechanic':'\ud83d\udc69&zwj;\ud83d\udd27',
  'woman_office_worker':'\ud83d\udc69&zwj;\ud83d\udcbc',
  'woman_pilot':'\ud83d\udc69&zwj;\u2708\ufe0f',
  'woman_playing_handball':'\ud83e\udd3e&zwj;\u2640\ufe0f',
  'woman_playing_water_polo':'\ud83e\udd3d&zwj;\u2640\ufe0f',
  'woman_scientist':'\ud83d\udc69&zwj;\ud83d\udd2c',
  'woman_shrugging':'\ud83e\udd37&zwj;\u2640\ufe0f',
  'woman_singer':'\ud83d\udc69&zwj;\ud83c\udfa4',
  'woman_student':'\ud83d\udc69&zwj;\ud83c\udf93',
  'woman_teacher':'\ud83d\udc69&zwj;\ud83c\udfeb',
  'woman_technologist':'\ud83d\udc69&zwj;\ud83d\udcbb',
  'woman_with_turban':'\ud83d\udc73&zwj;\u2640\ufe0f',
  'womans_clothes':'\ud83d\udc5a',
  'womans_hat':'\ud83d\udc52',
  'women_wrestling':'\ud83e\udd3c&zwj;\u2640\ufe0f',
  'womens':'\ud83d\udeba',
  'world_map':'\ud83d\uddfa',
  'worried':'\ud83d\ude1f',
  'wrench':'\ud83d\udd27',
  'writing_hand':'\u270d\ufe0f',
  'x':'\u274c',
  'yellow_heart':'\ud83d\udc9b',
  'yen':'\ud83d\udcb4',
  'yin_yang':'\u262f\ufe0f',
  'yum':'\ud83d\ude0b',
  'zap':'\u26a1\ufe0f',
  'zipper_mouth_face':'\ud83e\udd10',
  'zzz':'\ud83d\udca4',

  /* special emojis :P */
  'octocat':  '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">',
  'showdown': '<span style="font-family: \'Anonymous Pro\', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;">S</span>'
};

/**
 * Created by Estevao on 31-05-2015.
 */

/**
 * Showdown Converter class
 * @class
 * @param {object} [converterOptions]
 * @returns {Converter}
 */
showdown.Converter = function (converterOptions) {
  'use strict';

  var
      /**
       * Options used by this converter
       * @private
       * @type {{}}
       */
      options = {},

      /**
       * Language extensions used by this converter
       * @private
       * @type {Array}
       */
      langExtensions = [],

      /**
       * Output modifiers extensions used by this converter
       * @private
       * @type {Array}
       */
      outputModifiers = [],

      /**
       * Event listeners
       * @private
       * @type {{}}
       */
      listeners = {},

      /**
       * The flavor set in this converter
       */
      setConvFlavor = setFlavor,

    /**
     * Metadata of the document
     * @type {{parsed: {}, raw: string, format: string}}
     */
      metadata = {
        parsed: {},
        raw: '',
        format: ''
      };

  _constructor();

  /**
   * Converter constructor
   * @private
   */
  function _constructor () {
    converterOptions = converterOptions || {};

    for (var gOpt in globalOptions) {
      if (globalOptions.hasOwnProperty(gOpt)) {
        options[gOpt] = globalOptions[gOpt];
      }
    }

    // Merge options
    if (typeof converterOptions === 'object') {
      for (var opt in converterOptions) {
        if (converterOptions.hasOwnProperty(opt)) {
          options[opt] = converterOptions[opt];
        }
      }
    } else {
      throw Error('Converter expects the passed parameter to be an object, but ' + typeof converterOptions +
      ' was passed instead.');
    }

    if (options.extensions) {
      showdown.helper.forEach(options.extensions, _parseExtension);
    }
  }

  /**
   * Parse extension
   * @param {*} ext
   * @param {string} [name='']
   * @private
   */
  function _parseExtension (ext, name) {

    name = name || null;
    // If it's a string, the extension was previously loaded
    if (showdown.helper.isString(ext)) {
      ext = showdown.helper.stdExtName(ext);
      name = ext;

      // LEGACY_SUPPORT CODE
      if (showdown.extensions[ext]) {
        console.warn('DEPRECATION WARNING: ' + ext + ' is an old extension that uses a deprecated loading method.' +
          'Please inform the developer that the extension should be updated!');
        legacyExtensionLoading(showdown.extensions[ext], ext);
        return;
      // END LEGACY SUPPORT CODE

      } else if (!showdown.helper.isUndefined(extensions[ext])) {
        ext = extensions[ext];

      } else {
        throw Error('Extension "' + ext + '" could not be loaded. It was either not found or is not a valid extension.');
      }
    }

    if (typeof ext === 'function') {
      ext = ext();
    }

    if (!showdown.helper.isArray(ext)) {
      ext = [ext];
    }

    var validExt = validate(ext, name);
    if (!validExt.valid) {
      throw Error(validExt.error);
    }

    for (var i = 0; i < ext.length; ++i) {
      switch (ext[i].type) {

        case 'lang':
          langExtensions.push(ext[i]);
          break;

        case 'output':
          outputModifiers.push(ext[i]);
          break;
      }
      if (ext[i].hasOwnProperty('listeners')) {
        for (var ln in ext[i].listeners) {
          if (ext[i].listeners.hasOwnProperty(ln)) {
            listen(ln, ext[i].listeners[ln]);
          }
        }
      }
    }

  }

  /**
   * LEGACY_SUPPORT
   * @param {*} ext
   * @param {string} name
   */
  function legacyExtensionLoading (ext, name) {
    if (typeof ext === 'function') {
      ext = ext(new showdown.Converter());
    }
    if (!showdown.helper.isArray(ext)) {
      ext = [ext];
    }
    var valid = validate(ext, name);

    if (!valid.valid) {
      throw Error(valid.error);
    }

    for (var i = 0; i < ext.length; ++i) {
      switch (ext[i].type) {
        case 'lang':
          langExtensions.push(ext[i]);
          break;
        case 'output':
          outputModifiers.push(ext[i]);
          break;
        default:// should never reach here
          throw Error('Extension loader error: Type unrecognized!!!');
      }
    }
  }

  /**
   * Listen to an event
   * @param {string} name
   * @param {function} callback
   */
  function listen (name, callback) {
    if (!showdown.helper.isString(name)) {
      throw Error('Invalid argument in converter.listen() method: name must be a string, but ' + typeof name + ' given');
    }

    if (typeof callback !== 'function') {
      throw Error('Invalid argument in converter.listen() method: callback must be a function, but ' + typeof callback + ' given');
    }

    if (!listeners.hasOwnProperty(name)) {
      listeners[name] = [];
    }
    listeners[name].push(callback);
  }

  function rTrimInputText (text) {
    var rsp = text.match(/^\s*/)[0].length,
        rgx = new RegExp('^\\s{0,' + rsp + '}', 'gm');
    return text.replace(rgx, '');
  }

  /**
   * Dispatch an event
   * @private
   * @param {string} evtName Event name
   * @param {string} text Text
   * @param {{}} options Converter Options
   * @param {{}} globals
   * @returns {string}
   */
  this._dispatch = function dispatch (evtName, text, options, globals) {
    if (listeners.hasOwnProperty(evtName)) {
      for (var ei = 0; ei < listeners[evtName].length; ++ei) {
        var nText = listeners[evtName][ei](evtName, text, this, options, globals);
        if (nText && typeof nText !== 'undefined') {
          text = nText;
        }
      }
    }
    return text;
  };

  /**
   * Listen to an event
   * @param {string} name
   * @param {function} callback
   * @returns {showdown.Converter}
   */
  this.listen = function (name, callback) {
    listen(name, callback);
    return this;
  };

  /**
   * Converts a markdown string into HTML
   * @param {string} text
   * @returns {*}
   */
  this.makeHtml = function (text) {
    //check if text is not falsy
    if (!text) {
      return text;
    }

    var globals = {
      gHtmlBlocks:     [],
      gHtmlMdBlocks:   [],
      gHtmlSpans:      [],
      gUrls:           {},
      gTitles:         {},
      gDimensions:     {},
      gListLevel:      0,
      hashLinkCounts:  {},
      langExtensions:  langExtensions,
      outputModifiers: outputModifiers,
      converter:       this,
      ghCodeBlocks:    [],
      metadata: {
        parsed: {},
        raw: '',
        format: ''
      }
    };

    // This lets us use ¨ trema as an escape char to avoid md5 hashes
    // The choice of character is arbitrary; anything that isn't
    // magic in Markdown will work.
    text = text.replace(/¨/g, '¨T');

    // Replace $ with ¨D
    // RegExp interprets $ as a special character
    // when it's in a replacement string
    text = text.replace(/\$/g, '¨D');

    // Standardize line endings
    text = text.replace(/\r\n/g, '\n'); // DOS to Unix
    text = text.replace(/\r/g, '\n'); // Mac to Unix

    // Stardardize line spaces
    text = text.replace(/\u00A0/g, '&nbsp;');

    if (options.smartIndentationFix) {
      text = rTrimInputText(text);
    }

    // Make sure text begins and ends with a couple of newlines:
    text = '\n\n' + text + '\n\n';

    // detab
    text = showdown.subParser('detab')(text, options, globals);

    /**
     * Strip any lines consisting only of spaces and tabs.
     * This makes subsequent regexs easier to write, because we can
     * match consecutive blank lines with /\n+/ instead of something
     * contorted like /[ \t]*\n+/
     */
    text = text.replace(/^[ \t]+$/mg, '');

    //run languageExtensions
    showdown.helper.forEach(langExtensions, function (ext) {
      text = showdown.subParser('runExtension')(ext, text, options, globals);
    });

    // run the sub parsers
    text = showdown.subParser('metadata')(text, options, globals);
    text = showdown.subParser('hashPreCodeTags')(text, options, globals);
    text = showdown.subParser('githubCodeBlocks')(text, options, globals);
    text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
    text = showdown.subParser('hashCodeTags')(text, options, globals);
    text = showdown.subParser('stripLinkDefinitions')(text, options, globals);
    text = showdown.subParser('blockGamut')(text, options, globals);
    text = showdown.subParser('unhashHTMLSpans')(text, options, globals);
    text = showdown.subParser('unescapeSpecialChars')(text, options, globals);

    // attacklab: Restore dollar signs
    text = text.replace(/¨D/g, '$$');

    // attacklab: Restore tremas
    text = text.replace(/¨T/g, '¨');

    // render a complete html document instead of a partial if the option is enabled
    text = showdown.subParser('completeHTMLDocument')(text, options, globals);

    // Run output modifiers
    showdown.helper.forEach(outputModifiers, function (ext) {
      text = showdown.subParser('runExtension')(ext, text, options, globals);
    });

    // update metadata
    metadata = globals.metadata;
    return text;
  };

  /**
   * Converts an HTML string into a markdown string
   * @param src
   * @param [HTMLParser] A WHATWG DOM and HTML parser, such as JSDOM. If none is supplied, window.document will be used.
   * @returns {string}
   */
  this.makeMarkdown = this.makeMd = function (src, HTMLParser) {

    // replace \r\n with \n
    src = src.replace(/\r\n/g, '\n');
    src = src.replace(/\r/g, '\n'); // old macs

    // due to an edge case, we need to find this: > <
    // to prevent removing of non silent white spaces
    // ex: <em>this is</em> <strong>sparta</strong>
    src = src.replace(/>[ \t]+</, '>¨NBSP;<');

    if (!HTMLParser) {
      if (window && window.document) {
        HTMLParser = window.document;
      } else {
        throw new Error('HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM');
      }
    }

    var doc = HTMLParser.createElement('div');
    doc.innerHTML = src;

    var globals = {
      preList: substitutePreCodeTags(doc)
    };

    // remove all newlines and collapse spaces
    clean(doc);

    // some stuff, like accidental reference links must now be escaped
    // TODO
    // doc.innerHTML = doc.innerHTML.replace(/\[[\S\t ]]/);

    var nodes = doc.childNodes,
        mdDoc = '';

    for (var i = 0; i < nodes.length; i++) {
      mdDoc += showdown.subParser('makeMarkdown.node')(nodes[i], globals);
    }

    function clean (node) {
      for (var n = 0; n < node.childNodes.length; ++n) {
        var child = node.childNodes[n];
        if (child.nodeType === 3) {
          if (!/\S/.test(child.nodeValue)) {
            node.removeChild(child);
            --n;
          } else {
            child.nodeValue = child.nodeValue.split('\n').join(' ');
            child.nodeValue = child.nodeValue.replace(/(\s)+/g, '$1');
          }
        } else if (child.nodeType === 1) {
          clean(child);
        }
      }
    }

    // find all pre tags and replace contents with placeholder
    // we need this so that we can remove all indentation from html
    // to ease up parsing
    function substitutePreCodeTags (doc) {

      var pres = doc.querySelectorAll('pre'),
          presPH = [];

      for (var i = 0; i < pres.length; ++i) {

        if (pres[i].childElementCount === 1 && pres[i].firstChild.tagName.toLowerCase() === 'code') {
          var content = pres[i].firstChild.innerHTML.trim(),
              language = pres[i].firstChild.getAttribute('data-language') || '';

          // if data-language attribute is not defined, then we look for class language-*
          if (language === '') {
            var classes = pres[i].firstChild.className.split(' ');
            for (var c = 0; c < classes.length; ++c) {
              var matches = classes[c].match(/^language-(.+)$/);
              if (matches !== null) {
                language = matches[1];
                break;
              }
            }
          }

          // unescape html entities in content
          content = showdown.helper.unescapeHTMLEntities(content);

          presPH.push(content);
          pres[i].outerHTML = '<precode language="' + language + '" precodenum="' + i.toString() + '"></precode>';
        } else {
          presPH.push(pres[i].innerHTML);
          pres[i].innerHTML = '';
          pres[i].setAttribute('prenum', i.toString());
        }
      }
      return presPH;
    }

    return mdDoc;
  };

  /**
   * Set an option of this Converter instance
   * @param {string} key
   * @param {*} value
   */
  this.setOption = function (key, value) {
    options[key] = value;
  };

  /**
   * Get the option of this Converter instance
   * @param {string} key
   * @returns {*}
   */
  this.getOption = function (key) {
    return options[key];
  };

  /**
   * Get the options of this Converter instance
   * @returns {{}}
   */
  this.getOptions = function () {
    return options;
  };

  /**
   * Add extension to THIS converter
   * @param {{}} extension
   * @param {string} [name=null]
   */
  this.addExtension = function (extension, name) {
    name = name || null;
    _parseExtension(extension, name);
  };

  /**
   * Use a global registered extension with THIS converter
   * @param {string} extensionName Name of the previously registered extension
   */
  this.useExtension = function (extensionName) {
    _parseExtension(extensionName);
  };

  /**
   * Set the flavor THIS converter should use
   * @param {string} name
   */
  this.setFlavor = function (name) {
    if (!flavor.hasOwnProperty(name)) {
      throw Error(name + ' flavor was not found');
    }
    var preset = flavor[name];
    setConvFlavor = name;
    for (var option in preset) {
      if (preset.hasOwnProperty(option)) {
        options[option] = preset[option];
      }
    }
  };

  /**
   * Get the currently set flavor of this converter
   * @returns {string}
   */
  this.getFlavor = function () {
    return setConvFlavor;
  };

  /**
   * Remove an extension from THIS converter.
   * Note: This is a costly operation. It's better to initialize a new converter
   * and specify the extensions you wish to use
   * @param {Array} extension
   */
  this.removeExtension = function (extension) {
    if (!showdown.helper.isArray(extension)) {
      extension = [extension];
    }
    for (var a = 0; a < extension.length; ++a) {
      var ext = extension[a];
      for (var i = 0; i < langExtensions.length; ++i) {
        if (langExtensions[i] === ext) {
          langExtensions[i].splice(i, 1);
        }
      }
      for (var ii = 0; ii < outputModifiers.length; ++i) {
        if (outputModifiers[ii] === ext) {
          outputModifiers[ii].splice(i, 1);
        }
      }
    }
  };

  /**
   * Get all extension of THIS converter
   * @returns {{language: Array, output: Array}}
   */
  this.getAllExtensions = function () {
    return {
      language: langExtensions,
      output: outputModifiers
    };
  };

  /**
   * Get the metadata of the previously parsed document
   * @param raw
   * @returns {string|{}}
   */
  this.getMetadata = function (raw) {
    if (raw) {
      return metadata.raw;
    } else {
      return metadata.parsed;
    }
  };

  /**
   * Get the metadata format of the previously parsed document
   * @returns {string}
   */
  this.getMetadataFormat = function () {
    return metadata.format;
  };

  /**
   * Private: set a single key, value metadata pair
   * @param {string} key
   * @param {string} value
   */
  this._setMetadataPair = function (key, value) {
    metadata.parsed[key] = value;
  };

  /**
   * Private: set metadata format
   * @param {string} format
   */
  this._setMetadataFormat = function (format) {
    metadata.format = format;
  };

  /**
   * Private: set metadata raw text
   * @param {string} raw
   */
  this._setMetadataRaw = function (raw) {
    metadata.raw = raw;
  };
};

/**
 * Turn Markdown link shortcuts into XHTML <a> tags.
 */
showdown.subParser('anchors', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('anchors.before', text, options, globals);

  var writeAnchorTag = function (wholeMatch, linkText, linkId, url, m5, m6, title) {
    if (showdown.helper.isUndefined(title)) {
      title = '';
    }
    linkId = linkId.toLowerCase();

    // Special case for explicit empty url
    if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
      url = '';
    } else if (!url) {
      if (!linkId) {
        // lower-case and turn embedded newlines into spaces
        linkId = linkText.toLowerCase().replace(/ ?\n/g, ' ');
      }
      url = '#' + linkId;

      if (!showdown.helper.isUndefined(globals.gUrls[linkId])) {
        url = globals.gUrls[linkId];
        if (!showdown.helper.isUndefined(globals.gTitles[linkId])) {
          title = globals.gTitles[linkId];
        }
      } else {
        return wholeMatch;
      }
    }

    //url = showdown.helper.escapeCharacters(url, '*_', false); // replaced line to improve performance
    url = url.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);

    var result = '<a href="' + url + '"';

    if (title !== '' && title !== null) {
      title = title.replace(/"/g, '&quot;');
      //title = showdown.helper.escapeCharacters(title, '*_', false); // replaced line to improve performance
      title = title.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
      result += ' title="' + title + '"';
    }

    // optionLinksInNewWindow only applies
    // to external links. Hash links (#) open in same page
    if (options.openLinksInNewWindow && !/^#/.test(url)) {
      // escaped _
      result += ' target="¨E95Eblank"';
    }

    result += '>' + linkText + '</a>';

    return result;
  };

  // First, handle reference-style links: [link text] [id]
  text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, writeAnchorTag);

  // Next, inline-style links: [link text](url "optional title")
  // cases with crazy urls like ./image/cat1).png
  text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
    writeAnchorTag);

  // normal cases
  text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
                      writeAnchorTag);

  // handle reference-style shortcuts: [link text]
  // These must come last in case you've also got [link test][1]
  // or [link test](/foo)
  text = text.replace(/\[([^\[\]]+)]()()()()()/g, writeAnchorTag);

  // Lastly handle GithubMentions if option is enabled
  if (options.ghMentions) {
    text = text.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gmi, function (wm, st, escape, mentions, username) {
      if (escape === '\\') {
        return st + mentions;
      }

      //check if options.ghMentionsLink is a string
      if (!showdown.helper.isString(options.ghMentionsLink)) {
        throw new Error('ghMentionsLink option must be a string');
      }
      var lnk = options.ghMentionsLink.replace(/\{u}/g, username),
          target = '';
      if (options.openLinksInNewWindow) {
        target = ' target="¨E95Eblank"';
      }
      return st + '<a href="' + lnk + '"' + target + '>' + mentions + '</a>';
    });
  }

  text = globals.converter._dispatch('anchors.after', text, options, globals);
  return text;
});

// url allowed chars [a-z\d_.~:/?#[]@!$&'()*+,;=-]

var simpleURLRegex  = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi,
    simpleURLRegex2 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi,
    delimUrlRegex   = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi,
    simpleMailRegex = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi,
    delimMailRegex  = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,

    replaceLink = function (options) {
      'use strict';
      return function (wm, leadingMagicChars, link, m2, m3, trailingPunctuation, trailingMagicChars) {
        link = link.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
        var lnkTxt = link,
            append = '',
            target = '',
            lmc    = leadingMagicChars || '',
            tmc    = trailingMagicChars || '';
        if (/^www\./i.test(link)) {
          link = link.replace(/^www\./i, 'http://www.');
        }
        if (options.excludeTrailingPunctuationFromURLs && trailingPunctuation) {
          append = trailingPunctuation;
        }
        if (options.openLinksInNewWindow) {
          target = ' target="¨E95Eblank"';
        }
        return lmc + '<a href="' + link + '"' + target + '>' + lnkTxt + '</a>' + append + tmc;
      };
    },

    replaceMail = function (options, globals) {
      'use strict';
      return function (wholeMatch, b, mail) {
        var href = 'mailto:';
        b = b || '';
        mail = showdown.subParser('unescapeSpecialChars')(mail, options, globals);
        if (options.encodeEmails) {
          href = showdown.helper.encodeEmailAddress(href + mail);
          mail = showdown.helper.encodeEmailAddress(mail);
        } else {
          href = href + mail;
        }
        return b + '<a href="' + href + '">' + mail + '</a>';
      };
    };

showdown.subParser('autoLinks', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('autoLinks.before', text, options, globals);

  text = text.replace(delimUrlRegex, replaceLink(options));
  text = text.replace(delimMailRegex, replaceMail(options, globals));

  text = globals.converter._dispatch('autoLinks.after', text, options, globals);

  return text;
});

showdown.subParser('simplifiedAutoLinks', function (text, options, globals) {
  'use strict';

  if (!options.simplifiedAutoLink) {
    return text;
  }

  text = globals.converter._dispatch('simplifiedAutoLinks.before', text, options, globals);

  if (options.excludeTrailingPunctuationFromURLs) {
    text = text.replace(simpleURLRegex2, replaceLink(options));
  } else {
    text = text.replace(simpleURLRegex, replaceLink(options));
  }
  text = text.replace(simpleMailRegex, replaceMail(options, globals));

  text = globals.converter._dispatch('simplifiedAutoLinks.after', text, options, globals);

  return text;
});

/**
 * These are all the transformations that form block-level
 * tags like paragraphs, headers, and list items.
 */
showdown.subParser('blockGamut', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('blockGamut.before', text, options, globals);

  // we parse blockquotes first so that we can have headings and hrs
  // inside blockquotes
  text = showdown.subParser('blockQuotes')(text, options, globals);
  text = showdown.subParser('headers')(text, options, globals);

  // Do Horizontal Rules:
  text = showdown.subParser('horizontalRule')(text, options, globals);

  text = showdown.subParser('lists')(text, options, globals);
  text = showdown.subParser('codeBlocks')(text, options, globals);
  text = showdown.subParser('tables')(text, options, globals);

  // We already ran _HashHTMLBlocks() before, in Markdown(), but that
  // was to escape raw HTML in the original Markdown source. This time,
  // we're escaping the markup we've just created, so that we don't wrap
  // <p> tags around block-level tags.
  text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
  text = showdown.subParser('paragraphs')(text, options, globals);

  text = globals.converter._dispatch('blockGamut.after', text, options, globals);

  return text;
});

showdown.subParser('blockQuotes', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('blockQuotes.before', text, options, globals);

  // add a couple extra lines after the text and endtext mark
  text = text + '\n\n';

  var rgx = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;

  if (options.splitAdjacentBlockquotes) {
    rgx = /^ {0,3}>[\s\S]*?(?:\n\n)/gm;
  }

  text = text.replace(rgx, function (bq) {
    // attacklab: hack around Konqueror 3.5.4 bug:
    // "----------bug".replace(/^-/g,"") == "bug"
    bq = bq.replace(/^[ \t]*>[ \t]?/gm, ''); // trim one level of quoting

    // attacklab: clean up hack
    bq = bq.replace(/¨0/g, '');

    bq = bq.replace(/^[ \t]+$/gm, ''); // trim whitespace-only lines
    bq = showdown.subParser('githubCodeBlocks')(bq, options, globals);
    bq = showdown.subParser('blockGamut')(bq, options, globals); // recurse

    bq = bq.replace(/(^|\n)/g, '$1  ');
    // These leading spaces screw with <pre> content, so we need to fix that:
    bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (wholeMatch, m1) {
      var pre = m1;
      // attacklab: hack around Konqueror 3.5.4 bug:
      pre = pre.replace(/^  /mg, '¨0');
      pre = pre.replace(/¨0/g, '');
      return pre;
    });

    return showdown.subParser('hashBlock')('<blockquote>\n' + bq + '\n</blockquote>', options, globals);
  });

  text = globals.converter._dispatch('blockQuotes.after', text, options, globals);
  return text;
});

/**
 * Process Markdown `<pre><code>` blocks.
 */
showdown.subParser('codeBlocks', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('codeBlocks.before', text, options, globals);

  // sentinel workarounds for lack of \A and \Z, safari\khtml bug
  text += '¨0';

  var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
  text = text.replace(pattern, function (wholeMatch, m1, m2) {
    var codeblock = m1,
        nextChar = m2,
        end = '\n';

    codeblock = showdown.subParser('outdent')(codeblock, options, globals);
    codeblock = showdown.subParser('encodeCode')(codeblock, options, globals);
    codeblock = showdown.subParser('detab')(codeblock, options, globals);
    codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
    codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing newlines

    if (options.omitExtraWLInCodeBlocks) {
      end = '';
    }

    codeblock = '<pre><code>' + codeblock + end + '</code></pre>';

    return showdown.subParser('hashBlock')(codeblock, options, globals) + nextChar;
  });

  // strip sentinel
  text = text.replace(/¨0/, '');

  text = globals.converter._dispatch('codeBlocks.after', text, options, globals);
  return text;
});

/**
 *
 *   *  Backtick quotes are used for <code></code> spans.
 *
 *   *  You can use multiple backticks as the delimiters if you want to
 *     include literal backticks in the code span. So, this input:
 *
 *         Just type ``foo `bar` baz`` at the prompt.
 *
 *       Will translate to:
 *
 *         <p>Just type <code>foo `bar` baz</code> at the prompt.</p>
 *
 *    There's no arbitrary limit to the number of backticks you
 *    can use as delimters. If you need three consecutive backticks
 *    in your code, use four for delimiters, etc.
 *
 *  *  You can use spaces to get literal backticks at the edges:
 *
 *         ... type `` `bar` `` ...
 *
 *       Turns to:
 *
 *         ... type <code>`bar`</code> ...
 */
showdown.subParser('codeSpans', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('codeSpans.before', text, options, globals);

  if (typeof(text) === 'undefined') {
    text = '';
  }
  text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
    function (wholeMatch, m1, m2, m3) {
      var c = m3;
      c = c.replace(/^([ \t]*)/g, '');	// leading whitespace
      c = c.replace(/[ \t]*$/g, '');	// trailing whitespace
      c = showdown.subParser('encodeCode')(c, options, globals);
      c = m1 + '<code>' + c + '</code>';
      c = showdown.subParser('hashHTMLSpans')(c, options, globals);
      return c;
    }
  );

  text = globals.converter._dispatch('codeSpans.after', text, options, globals);
  return text;
});

/**
 * Create a full HTML document from the processed markdown
 */
showdown.subParser('completeHTMLDocument', function (text, options, globals) {
  'use strict';

  if (!options.completeHTMLDocument) {
    return text;
  }

  text = globals.converter._dispatch('completeHTMLDocument.before', text, options, globals);

  var doctype = 'html',
      doctypeParsed = '<!DOCTYPE HTML>\n',
      title = '',
      charset = '<meta charset="utf-8">\n',
      lang = '',
      metadata = '';

  if (typeof globals.metadata.parsed.doctype !== 'undefined') {
    doctypeParsed = '<!DOCTYPE ' +  globals.metadata.parsed.doctype + '>\n';
    doctype = globals.metadata.parsed.doctype.toString().toLowerCase();
    if (doctype === 'html' || doctype === 'html5') {
      charset = '<meta charset="utf-8">';
    }
  }

  for (var meta in globals.metadata.parsed) {
    if (globals.metadata.parsed.hasOwnProperty(meta)) {
      switch (meta.toLowerCase()) {
        case 'doctype':
          break;

        case 'title':
          title = '<title>' +  globals.metadata.parsed.title + '</title>\n';
          break;

        case 'charset':
          if (doctype === 'html' || doctype === 'html5') {
            charset = '<meta charset="' + globals.metadata.parsed.charset + '">\n';
          } else {
            charset = '<meta name="charset" content="' + globals.metadata.parsed.charset + '">\n';
          }
          break;

        case 'language':
        case 'lang':
          lang = ' lang="' + globals.metadata.parsed[meta] + '"';
          metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
          break;

        default:
          metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
      }
    }
  }

  text = doctypeParsed + '<html' + lang + '>\n<head>\n' + title + charset + metadata + '</head>\n<body>\n' + text.trim() + '\n</body>\n</html>';

  text = globals.converter._dispatch('completeHTMLDocument.after', text, options, globals);
  return text;
});

/**
 * Convert all tabs to spaces
 */
showdown.subParser('detab', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('detab.before', text, options, globals);

  // expand first n-1 tabs
  text = text.replace(/\t(?=\t)/g, '    '); // g_tab_width

  // replace the nth with two sentinels
  text = text.replace(/\t/g, '¨A¨B');

  // use the sentinel to anchor our regex so it doesn't explode
  text = text.replace(/¨B(.+?)¨A/g, function (wholeMatch, m1) {
    var leadingText = m1,
        numSpaces = 4 - leadingText.length % 4;  // g_tab_width

    // there *must* be a better way to do this:
    for (var i = 0; i < numSpaces; i++) {
      leadingText += ' ';
    }

    return leadingText;
  });

  // clean up sentinels
  text = text.replace(/¨A/g, '    ');  // g_tab_width
  text = text.replace(/¨B/g, '');

  text = globals.converter._dispatch('detab.after', text, options, globals);
  return text;
});

showdown.subParser('ellipsis', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('ellipsis.before', text, options, globals);

  text = text.replace(/\.\.\./g, '…');

  text = globals.converter._dispatch('ellipsis.after', text, options, globals);

  return text;
});

/**
 * Turn emoji codes into emojis
 *
 * List of supported emojis: https://github.com/showdownjs/showdown/wiki/Emojis
 */
showdown.subParser('emoji', function (text, options, globals) {
  'use strict';

  if (!options.emoji) {
    return text;
  }

  text = globals.converter._dispatch('emoji.before', text, options, globals);

  var emojiRgx = /:([\S]+?):/g;

  text = text.replace(emojiRgx, function (wm, emojiCode) {
    if (showdown.helper.emojis.hasOwnProperty(emojiCode)) {
      return showdown.helper.emojis[emojiCode];
    }
    return wm;
  });

  text = globals.converter._dispatch('emoji.after', text, options, globals);

  return text;
});

/**
 * Smart processing for ampersands and angle brackets that need to be encoded.
 */
showdown.subParser('encodeAmpsAndAngles', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('encodeAmpsAndAngles.before', text, options, globals);

  // Ampersand-encoding based entirely on Nat Irons's Amputator MT plugin:
  // http://bumppo.net/projects/amputator/
  text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, '&amp;');

  // Encode naked <'s
  text = text.replace(/<(?![a-z\/?$!])/gi, '&lt;');

  // Encode <
  text = text.replace(/</g, '&lt;');

  // Encode >
  text = text.replace(/>/g, '&gt;');

  text = globals.converter._dispatch('encodeAmpsAndAngles.after', text, options, globals);
  return text;
});

/**
 * Returns the string, with after processing the following backslash escape sequences.
 *
 * attacklab: The polite way to do this is with the new escapeCharacters() function:
 *
 *    text = escapeCharacters(text,"\\",true);
 *    text = escapeCharacters(text,"`*_{}[]()>#+-.!",true);
 *
 * ...but we're sidestepping its use of the (slow) RegExp constructor
 * as an optimization for Firefox.  This function gets called a LOT.
 */
showdown.subParser('encodeBackslashEscapes', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('encodeBackslashEscapes.before', text, options, globals);

  text = text.replace(/\\(\\)/g, showdown.helper.escapeCharactersCallback);
  text = text.replace(/\\([`*_{}\[\]()>#+.!~=|-])/g, showdown.helper.escapeCharactersCallback);

  text = globals.converter._dispatch('encodeBackslashEscapes.after', text, options, globals);
  return text;
});

/**
 * Encode/escape certain characters inside Markdown code runs.
 * The point is that in code, these characters are literals,
 * and lose their special Markdown meanings.
 */
showdown.subParser('encodeCode', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('encodeCode.before', text, options, globals);

  // Encode all ampersands; HTML entities are not
  // entities within a Markdown code span.
  text = text
    .replace(/&/g, '&amp;')
  // Do the angle bracket song and dance:
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  // Now, escape characters that are magic in Markdown:
    .replace(/([*_{}\[\]\\=~-])/g, showdown.helper.escapeCharactersCallback);

  text = globals.converter._dispatch('encodeCode.after', text, options, globals);
  return text;
});

/**
 * Within tags -- meaning between < and > -- encode [\ ` * _ ~ =] so they
 * don't conflict with their use in Markdown for code, italics and strong.
 */
showdown.subParser('escapeSpecialCharsWithinTagAttributes', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('escapeSpecialCharsWithinTagAttributes.before', text, options, globals);

  // Build a regex to find HTML tags.
  var tags     = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi,
      comments = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;

  text = text.replace(tags, function (wholeMatch) {
    return wholeMatch
      .replace(/(.)<\/?code>(?=.)/g, '$1`')
      .replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
  });

  text = text.replace(comments, function (wholeMatch) {
    return wholeMatch
      .replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
  });

  text = globals.converter._dispatch('escapeSpecialCharsWithinTagAttributes.after', text, options, globals);
  return text;
});

/**
 * Handle github codeblocks prior to running HashHTML so that
 * HTML contained within the codeblock gets escaped properly
 * Example:
 * ```ruby
 *     def hello_world(x)
 *       puts "Hello, #{x}"
 *     end
 * ```
 */
showdown.subParser('githubCodeBlocks', function (text, options, globals) {
  'use strict';

  // early exit if option is not enabled
  if (!options.ghCodeBlocks) {
    return text;
  }

  text = globals.converter._dispatch('githubCodeBlocks.before', text, options, globals);

  text += '¨0';

  text = text.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function (wholeMatch, delim, language, codeblock) {
    var end = (options.omitExtraWLInCodeBlocks) ? '' : '\n';

    // First parse the github code block
    codeblock = showdown.subParser('encodeCode')(codeblock, options, globals);
    codeblock = showdown.subParser('detab')(codeblock, options, globals);
    codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
    codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing whitespace

    codeblock = '<pre><code' + (language ? ' class="' + language + ' language-' + language + '"' : '') + '>' + codeblock + end + '</code></pre>';

    codeblock = showdown.subParser('hashBlock')(codeblock, options, globals);

    // Since GHCodeblocks can be false positives, we need to
    // store the primitive text and the parsed text in a global var,
    // and then return a token
    return '\n\n¨G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeblock}) - 1) + 'G\n\n';
  });

  // attacklab: strip sentinel
  text = text.replace(/¨0/, '');

  return globals.converter._dispatch('githubCodeBlocks.after', text, options, globals);
});

showdown.subParser('hashBlock', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashBlock.before', text, options, globals);
  text = text.replace(/(^\n+|\n+$)/g, '');
  text = '\n\n¨K' + (globals.gHtmlBlocks.push(text) - 1) + 'K\n\n';
  text = globals.converter._dispatch('hashBlock.after', text, options, globals);
  return text;
});

/**
 * Hash and escape <code> elements that should not be parsed as markdown
 */
showdown.subParser('hashCodeTags', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashCodeTags.before', text, options, globals);

  var repFunc = function (wholeMatch, match, left, right) {
    var codeblock = left + showdown.subParser('encodeCode')(match, options, globals) + right;
    return '¨C' + (globals.gHtmlSpans.push(codeblock) - 1) + 'C';
  };

  // Hash naked <code>
  text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '<code\\b[^>]*>', '</code>', 'gim');

  text = globals.converter._dispatch('hashCodeTags.after', text, options, globals);
  return text;
});

showdown.subParser('hashElement', function (text, options, globals) {
  'use strict';

  return function (wholeMatch, m1) {
    var blockText = m1;

    // Undo double lines
    blockText = blockText.replace(/\n\n/g, '\n');
    blockText = blockText.replace(/^\n/, '');

    // strip trailing blank lines
    blockText = blockText.replace(/\n+$/g, '');

    // Replace the element text with a marker ("¨KxK" where x is its key)
    blockText = '\n\n¨K' + (globals.gHtmlBlocks.push(blockText) - 1) + 'K\n\n';

    return blockText;
  };
});

showdown.subParser('hashHTMLBlocks', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashHTMLBlocks.before', text, options, globals);

  var blockTags = [
        'pre',
        'div',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'blockquote',
        'table',
        'dl',
        'ol',
        'ul',
        'script',
        'noscript',
        'form',
        'fieldset',
        'iframe',
        'math',
        'style',
        'section',
        'header',
        'footer',
        'nav',
        'article',
        'aside',
        'address',
        'audio',
        'canvas',
        'figure',
        'hgroup',
        'output',
        'video',
        'p'
      ],
      repFunc = function (wholeMatch, match, left, right) {
        var txt = wholeMatch;
        // check if this html element is marked as markdown
        // if so, it's contents should be parsed as markdown
        if (left.search(/\bmarkdown\b/) !== -1) {
          txt = left + globals.converter.makeHtml(match) + right;
        }
        return '\n\n¨K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
      };

  if (options.backslashEscapesHTMLTags) {
    // encode backslash escaped HTML tags
    text = text.replace(/\\<(\/?[^>]+?)>/g, function (wm, inside) {
      return '&lt;' + inside + '&gt;';
    });
  }

  // hash HTML Blocks
  for (var i = 0; i < blockTags.length; ++i) {

    var opTagPos,
        rgx1     = new RegExp('^ {0,3}(<' + blockTags[i] + '\\b[^>]*>)', 'im'),
        patLeft  = '<' + blockTags[i] + '\\b[^>]*>',
        patRight = '</' + blockTags[i] + '>';
    // 1. Look for the first position of the first opening HTML tag in the text
    while ((opTagPos = showdown.helper.regexIndexOf(text, rgx1)) !== -1) {

      // if the HTML tag is \ escaped, we need to escape it and break


      //2. Split the text in that position
      var subTexts = showdown.helper.splitAtIndex(text, opTagPos),
      //3. Match recursively
          newSubText1 = showdown.helper.replaceRecursiveRegExp(subTexts[1], repFunc, patLeft, patRight, 'im');

      // prevent an infinite loop
      if (newSubText1 === subTexts[1]) {
        break;
      }
      text = subTexts[0].concat(newSubText1);
    }
  }
  // HR SPECIAL CASE
  text = text.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,
    showdown.subParser('hashElement')(text, options, globals));

  // Special case for standalone HTML comments
  text = showdown.helper.replaceRecursiveRegExp(text, function (txt) {
    return '\n\n¨K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
  }, '^ {0,3}<!--', '-->', 'gm');

  // PHP and ASP-style processor instructions (<?...?> and <%...%>)
  text = text.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,
    showdown.subParser('hashElement')(text, options, globals));

  text = globals.converter._dispatch('hashHTMLBlocks.after', text, options, globals);
  return text;
});

/**
 * Hash span elements that should not be parsed as markdown
 */
showdown.subParser('hashHTMLSpans', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashHTMLSpans.before', text, options, globals);

  function hashHTMLSpan (html) {
    return '¨C' + (globals.gHtmlSpans.push(html) - 1) + 'C';
  }

  // Hash Self Closing tags
  text = text.replace(/<[^>]+?\/>/gi, function (wm) {
    return hashHTMLSpan(wm);
  });

  // Hash tags without properties
  text = text.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function (wm) {
    return hashHTMLSpan(wm);
  });

  // Hash tags with properties
  text = text.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function (wm) {
    return hashHTMLSpan(wm);
  });

  // Hash self closing tags without />
  text = text.replace(/<[^>]+?>/gi, function (wm) {
    return hashHTMLSpan(wm);
  });

  /*showdown.helper.matchRecursiveRegExp(text, '<code\\b[^>]*>', '</code>', 'gi');*/

  text = globals.converter._dispatch('hashHTMLSpans.after', text, options, globals);
  return text;
});

/**
 * Unhash HTML spans
 */
showdown.subParser('unhashHTMLSpans', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('unhashHTMLSpans.before', text, options, globals);

  for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
    var repText = globals.gHtmlSpans[i],
        // limiter to prevent infinite loop (assume 10 as limit for recurse)
        limit = 0;

    while (/¨C(\d+)C/.test(repText)) {
      var num = RegExp.$1;
      repText = repText.replace('¨C' + num + 'C', globals.gHtmlSpans[num]);
      if (limit === 10) {
        console.error('maximum nesting of 10 spans reached!!!');
        break;
      }
      ++limit;
    }
    text = text.replace('¨C' + i + 'C', repText);
  }

  text = globals.converter._dispatch('unhashHTMLSpans.after', text, options, globals);
  return text;
});

/**
 * Hash and escape <pre><code> elements that should not be parsed as markdown
 */
showdown.subParser('hashPreCodeTags', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashPreCodeTags.before', text, options, globals);

  var repFunc = function (wholeMatch, match, left, right) {
    // encode html entities
    var codeblock = left + showdown.subParser('encodeCode')(match, options, globals) + right;
    return '\n\n¨G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeblock}) - 1) + 'G\n\n';
  };

  // Hash <pre><code>
  text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>', '^ {0,3}</code>\\s*</pre>', 'gim');

  text = globals.converter._dispatch('hashPreCodeTags.after', text, options, globals);
  return text;
});

showdown.subParser('headers', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('headers.before', text, options, globals);

  var headerLevelStart = (isNaN(parseInt(options.headerLevelStart))) ? 1 : parseInt(options.headerLevelStart),

  // Set text-style headers:
  //	Header 1
  //	========
  //
  //	Header 2
  //	--------
  //
      setextRegexH1 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm,
      setextRegexH2 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;

  text = text.replace(setextRegexH1, function (wholeMatch, m1) {

    var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
        hLevel = headerLevelStart,
        hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
    return showdown.subParser('hashBlock')(hashBlock, options, globals);
  });

  text = text.replace(setextRegexH2, function (matchFound, m1) {
    var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
        hLevel = headerLevelStart + 1,
        hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
    return showdown.subParser('hashBlock')(hashBlock, options, globals);
  });

  // atx-style headers:
  //  # Header 1
  //  ## Header 2
  //  ## Header 2 with closing hashes ##
  //  ...
  //  ###### Header 6
  //
  var atxStyle = (options.requireSpaceBeforeHeadingText) ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;

  text = text.replace(atxStyle, function (wholeMatch, m1, m2) {
    var hText = m2;
    if (options.customizedHeaderId) {
      hText = m2.replace(/\s?\{([^{]+?)}\s*$/, '');
    }

    var span = showdown.subParser('spanGamut')(hText, options, globals),
        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m2) + '"',
        hLevel = headerLevelStart - 1 + m1.length,
        header = '<h' + hLevel + hID + '>' + span + '</h' + hLevel + '>';

    return showdown.subParser('hashBlock')(header, options, globals);
  });

  function headerId (m) {
    var title,
        prefix;

    // It is separate from other options to allow combining prefix and customized
    if (options.customizedHeaderId) {
      var match = m.match(/\{([^{]+?)}\s*$/);
      if (match && match[1]) {
        m = match[1];
      }
    }

    title = m;

    // Prefix id to prevent causing inadvertent pre-existing style matches.
    if (showdown.helper.isString(options.prefixHeaderId)) {
      prefix = options.prefixHeaderId;
    } else if (options.prefixHeaderId === true) {
      prefix = 'section-';
    } else {
      prefix = '';
    }

    if (!options.rawPrefixHeaderId) {
      title = prefix + title;
    }

    if (options.ghCompatibleHeaderId) {
      title = title
        .replace(/ /g, '-')
        // replace previously escaped chars (&, ¨ and $)
        .replace(/&amp;/g, '')
        .replace(/¨T/g, '')
        .replace(/¨D/g, '')
        // replace rest of the chars (&~$ are repeated as they might have been escaped)
        // borrowed from github's redcarpet (some they should produce similar results)
        .replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, '')
        .toLowerCase();
    } else if (options.rawHeaderId) {
      title = title
        .replace(/ /g, '-')
        // replace previously escaped chars (&, ¨ and $)
        .replace(/&amp;/g, '&')
        .replace(/¨T/g, '¨')
        .replace(/¨D/g, '$')
        // replace " and '
        .replace(/["']/g, '-')
        .toLowerCase();
    } else {
      title = title
        .replace(/[^\w]/g, '')
        .toLowerCase();
    }

    if (options.rawPrefixHeaderId) {
      title = prefix + title;
    }

    if (globals.hashLinkCounts[title]) {
      title = title + '-' + (globals.hashLinkCounts[title]++);
    } else {
      globals.hashLinkCounts[title] = 1;
    }
    return title;
  }

  text = globals.converter._dispatch('headers.after', text, options, globals);
  return text;
});

/**
 * Turn Markdown link shortcuts into XHTML <a> tags.
 */
showdown.subParser('horizontalRule', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('horizontalRule.before', text, options, globals);

  var key = showdown.subParser('hashBlock')('<hr />', options, globals);
  text = text.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, key);
  text = text.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, key);
  text = text.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, key);

  text = globals.converter._dispatch('horizontalRule.after', text, options, globals);
  return text;
});

/**
 * Turn Markdown image shortcuts into <img> tags.
 */
showdown.subParser('images', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('images.before', text, options, globals);

  var inlineRegExp      = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,
      crazyRegExp       = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g,
      base64RegExp      = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,
      referenceRegExp   = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g,
      refShortcutRegExp = /!\[([^\[\]]+)]()()()()()/g;

  function writeImageTagBase64 (wholeMatch, altText, linkId, url, width, height, m5, title) {
    url = url.replace(/\s/g, '');
    return writeImageTag (wholeMatch, altText, linkId, url, width, height, m5, title);
  }

  function writeImageTag (wholeMatch, altText, linkId, url, width, height, m5, title) {

    var gUrls   = globals.gUrls,
        gTitles = globals.gTitles,
        gDims   = globals.gDimensions;

    linkId = linkId.toLowerCase();

    if (!title) {
      title = '';
    }
    // Special case for explicit empty url
    if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
      url = '';

    } else if (url === '' || url === null) {
      if (linkId === '' || linkId === null) {
        // lower-case and turn embedded newlines into spaces
        linkId = altText.toLowerCase().replace(/ ?\n/g, ' ');
      }
      url = '#' + linkId;

      if (!showdown.helper.isUndefined(gUrls[linkId])) {
        url = gUrls[linkId];
        if (!showdown.helper.isUndefined(gTitles[linkId])) {
          title = gTitles[linkId];
        }
        if (!showdown.helper.isUndefined(gDims[linkId])) {
          width = gDims[linkId].width;
          height = gDims[linkId].height;
        }
      } else {
        return wholeMatch;
      }
    }

    altText = altText
      .replace(/"/g, '&quot;')
    //altText = showdown.helper.escapeCharacters(altText, '*_', false);
      .replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
    //url = showdown.helper.escapeCharacters(url, '*_', false);
    url = url.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
    var result = '<img src="' + url + '" alt="' + altText + '"';

    if (title && showdown.helper.isString(title)) {
      title = title
        .replace(/"/g, '&quot;')
      //title = showdown.helper.escapeCharacters(title, '*_', false);
        .replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
      result += ' title="' + title + '"';
    }

    if (width && height) {
      width  = (width === '*') ? 'auto' : width;
      height = (height === '*') ? 'auto' : height;

      result += ' width="' + width + '"';
      result += ' height="' + height + '"';
    }

    result += ' />';

    return result;
  }

  // First, handle reference-style labeled images: ![alt text][id]
  text = text.replace(referenceRegExp, writeImageTag);

  // Next, handle inline images:  ![alt text](url =<width>x<height> "optional title")

  // base64 encoded images
  text = text.replace(base64RegExp, writeImageTagBase64);

  // cases with crazy urls like ./image/cat1).png
  text = text.replace(crazyRegExp, writeImageTag);

  // normal cases
  text = text.replace(inlineRegExp, writeImageTag);

  // handle reference-style shortcuts: ![img text]
  text = text.replace(refShortcutRegExp, writeImageTag);

  text = globals.converter._dispatch('images.after', text, options, globals);
  return text;
});

showdown.subParser('italicsAndBold', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('italicsAndBold.before', text, options, globals);

  // it's faster to have 3 separate regexes for each case than have just one
  // because of backtracing, in some cases, it could lead to an exponential effect
  // called "catastrophic backtrace". Ominous!

  function parseInside (txt, left, right) {
    /*
    if (options.simplifiedAutoLink) {
      txt = showdown.subParser('simplifiedAutoLinks')(txt, options, globals);
    }
    */
    return left + txt + right;
  }

  // Parse underscores
  if (options.literalMidWordUnderscores) {
    text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function (wm, txt) {
      return parseInside (txt, '<strong><em>', '</em></strong>');
    });
    text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function (wm, txt) {
      return parseInside (txt, '<strong>', '</strong>');
    });
    text = text.replace(/\b_(\S[\s\S]*?)_\b/g, function (wm, txt) {
      return parseInside (txt, '<em>', '</em>');
    });
  } else {
    text = text.replace(/___(\S[\s\S]*?)___/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong><em>', '</em></strong>') : wm;
    });
    text = text.replace(/__(\S[\s\S]*?)__/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong>', '</strong>') : wm;
    });
    text = text.replace(/_([^\s_][\s\S]*?)_/g, function (wm, m) {
      // !/^_[^_]/.test(m) - test if it doesn't start with __ (since it seems redundant, we removed it)
      return (/\S$/.test(m)) ? parseInside (m, '<em>', '</em>') : wm;
    });
  }

  // Now parse asterisks
  if (options.literalMidWordAsterisks) {
    text = text.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g, function (wm, lead, txt) {
      return parseInside (txt, lead + '<strong><em>', '</em></strong>');
    });
    text = text.replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g, function (wm, lead, txt) {
      return parseInside (txt, lead + '<strong>', '</strong>');
    });
    text = text.replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g, function (wm, lead, txt) {
      return parseInside (txt, lead + '<em>', '</em>');
    });
  } else {
    text = text.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong><em>', '</em></strong>') : wm;
    });
    text = text.replace(/\*\*(\S[\s\S]*?)\*\*/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong>', '</strong>') : wm;
    });
    text = text.replace(/\*([^\s*][\s\S]*?)\*/g, function (wm, m) {
      // !/^\*[^*]/.test(m) - test if it doesn't start with ** (since it seems redundant, we removed it)
      return (/\S$/.test(m)) ? parseInside (m, '<em>', '</em>') : wm;
    });
  }


  text = globals.converter._dispatch('italicsAndBold.after', text, options, globals);
  return text;
});

/**
 * Form HTML ordered (numbered) and unordered (bulleted) lists.
 */
showdown.subParser('lists', function (text, options, globals) {
  'use strict';

  /**
   * Process the contents of a single ordered or unordered list, splitting it
   * into individual list items.
   * @param {string} listStr
   * @param {boolean} trimTrailing
   * @returns {string}
   */
  function processListItems (listStr, trimTrailing) {
    // The $g_list_level global keeps track of when we're inside a list.
    // Each time we enter a list, we increment it; when we leave a list,
    // we decrement. If it's zero, we're not in a list anymore.
    //
    // We do this because when we're not inside a list, we want to treat
    // something like this:
    //
    //    I recommend upgrading to version
    //    8. Oops, now this line is treated
    //    as a sub-list.
    //
    // As a single paragraph, despite the fact that the second line starts
    // with a digit-period-space sequence.
    //
    // Whereas when we're inside a list (or sub-list), that line will be
    // treated as the start of a sub-list. What a kludge, huh? This is
    // an aspect of Markdown's syntax that's hard to parse perfectly
    // without resorting to mind-reading. Perhaps the solution is to
    // change the syntax rules such that sub-lists must start with a
    // starting cardinal number; e.g. "1." or "a.".
    globals.gListLevel++;

    // trim trailing blank lines:
    listStr = listStr.replace(/\n{2,}$/, '\n');

    // attacklab: add sentinel to emulate \z
    listStr += '¨0';

    var rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm,
        isParagraphed = (/\n[ \t]*\n(?!¨0)/.test(listStr));

    // Since version 1.5, nesting sublists requires 4 spaces (or 1 tab) indentation,
    // which is a syntax breaking change
    // activating this option reverts to old behavior
    if (options.disableForced4SpacesIndentedSublists) {
      rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm;
    }

    listStr = listStr.replace(rgx, function (wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
      checked = (checked && checked.trim() !== '');

      var item = showdown.subParser('outdent')(m4, options, globals),
          bulletStyle = '';

      // Support for github tasklists
      if (taskbtn && options.tasklists) {
        bulletStyle = ' class="task-list-item" style="list-style-type: none;"';
        item = item.replace(/^[ \t]*\[(x|X| )?]/m, function () {
          var otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
          if (checked) {
            otp += ' checked';
          }
          otp += '>';
          return otp;
        });
      }

      // ISSUE #312
      // This input: - - - a
      // causes trouble to the parser, since it interprets it as:
      // <ul><li><li><li>a</li></li></li></ul>
      // instead of:
      // <ul><li>- - a</li></ul>
      // So, to prevent it, we will put a marker (¨A)in the beginning of the line
      // Kind of hackish/monkey patching, but seems more effective than overcomplicating the list parser
      item = item.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function (wm2) {
        return '¨A' + wm2;
      });

      // m1 - Leading line or
      // Has a double return (multi paragraph) or
      // Has sublist
      if (m1 || (item.search(/\n{2,}/) > -1)) {
        item = showdown.subParser('githubCodeBlocks')(item, options, globals);
        item = showdown.subParser('blockGamut')(item, options, globals);
      } else {
        // Recursion for sub-lists:
        item = showdown.subParser('lists')(item, options, globals);
        item = item.replace(/\n$/, ''); // chomp(item)
        item = showdown.subParser('hashHTMLBlocks')(item, options, globals);

        // Colapse double linebreaks
        item = item.replace(/\n\n+/g, '\n\n');
        if (isParagraphed) {
          item = showdown.subParser('paragraphs')(item, options, globals);
        } else {
          item = showdown.subParser('spanGamut')(item, options, globals);
        }
      }

      // now we need to remove the marker (¨A)
      item = item.replace('¨A', '');
      // we can finally wrap the line in list item tags
      item =  '<li' + bulletStyle + '>' + item + '</li>\n';

      return item;
    });

    // attacklab: strip sentinel
    listStr = listStr.replace(/¨0/g, '');

    globals.gListLevel--;

    if (trimTrailing) {
      listStr = listStr.replace(/\s+$/, '');
    }

    return listStr;
  }

  function styleStartNumber (list, listType) {
    // check if ol and starts by a number different than 1
    if (listType === 'ol') {
      var res = list.match(/^ *(\d+)\./);
      if (res && res[1] !== '1') {
        return ' start="' + res[1] + '"';
      }
    }
    return '';
  }

  /**
   * Check and parse consecutive lists (better fix for issue #142)
   * @param {string} list
   * @param {string} listType
   * @param {boolean} trimTrailing
   * @returns {string}
   */
  function parseConsecutiveLists (list, listType, trimTrailing) {
    // check if we caught 2 or more consecutive lists by mistake
    // we use the counterRgx, meaning if listType is UL we look for OL and vice versa
    var olRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm,
        ulRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm,
        counterRxg = (listType === 'ul') ? olRgx : ulRgx,
        result = '';

    if (list.search(counterRxg) !== -1) {
      (function parseCL (txt) {
        var pos = txt.search(counterRxg),
            style = styleStartNumber(list, listType);
        if (pos !== -1) {
          // slice
          result += '\n\n<' + listType + style + '>\n' + processListItems(txt.slice(0, pos), !!trimTrailing) + '</' + listType + '>\n';

          // invert counterType and listType
          listType = (listType === 'ul') ? 'ol' : 'ul';
          counterRxg = (listType === 'ul') ? olRgx : ulRgx;

          //recurse
          parseCL(txt.slice(pos));
        } else {
          result += '\n\n<' + listType + style + '>\n' + processListItems(txt, !!trimTrailing) + '</' + listType + '>\n';
        }
      })(list);
    } else {
      var style = styleStartNumber(list, listType);
      result = '\n\n<' + listType + style + '>\n' + processListItems(list, !!trimTrailing) + '</' + listType + '>\n';
    }

    return result;
  }

  /** Start of list parsing **/
  text = globals.converter._dispatch('lists.before', text, options, globals);
  // add sentinel to hack around khtml/safari bug:
  // http://bugs.webkit.org/show_bug.cgi?id=11231
  text += '¨0';

  if (globals.gListLevel) {
    text = text.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
      function (wholeMatch, list, m2) {
        var listType = (m2.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
        return parseConsecutiveLists(list, listType, true);
      }
    );
  } else {
    text = text.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
      function (wholeMatch, m1, list, m3) {
        var listType = (m3.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
        return parseConsecutiveLists(list, listType, false);
      }
    );
  }

  // strip sentinel
  text = text.replace(/¨0/, '');
  text = globals.converter._dispatch('lists.after', text, options, globals);
  return text;
});

/**
 * Parse metadata at the top of the document
 */
showdown.subParser('metadata', function (text, options, globals) {
  'use strict';

  if (!options.metadata) {
    return text;
  }

  text = globals.converter._dispatch('metadata.before', text, options, globals);

  function parseMetadataContents (content) {
    // raw is raw so it's not changed in any way
    globals.metadata.raw = content;

    // escape chars forbidden in html attributes
    // double quotes
    content = content
      // ampersand first
      .replace(/&/g, '&amp;')
      // double quotes
      .replace(/"/g, '&quot;');

    content = content.replace(/\n {4}/g, ' ');
    content.replace(/^([\S ]+): +([\s\S]+?)$/gm, function (wm, key, value) {
      globals.metadata.parsed[key] = value;
      return '';
    });
  }

  text = text.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function (wholematch, format, content) {
    parseMetadataContents(content);
    return '¨M';
  });

  text = text.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function (wholematch, format, content) {
    if (format) {
      globals.metadata.format = format;
    }
    parseMetadataContents(content);
    return '¨M';
  });

  text = text.replace(/¨M/g, '');

  text = globals.converter._dispatch('metadata.after', text, options, globals);
  return text;
});

/**
 * Remove one level of line-leading tabs or spaces
 */
showdown.subParser('outdent', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('outdent.before', text, options, globals);

  // attacklab: hack around Konqueror 3.5.4 bug:
  // "----------bug".replace(/^-/g,"") == "bug"
  text = text.replace(/^(\t|[ ]{1,4})/gm, '¨0'); // attacklab: g_tab_width

  // attacklab: clean up hack
  text = text.replace(/¨0/g, '');

  text = globals.converter._dispatch('outdent.after', text, options, globals);
  return text;
});

/**
 *
 */
showdown.subParser('paragraphs', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('paragraphs.before', text, options, globals);
  // Strip leading and trailing lines:
  text = text.replace(/^\n+/g, '');
  text = text.replace(/\n+$/g, '');

  var grafs = text.split(/\n{2,}/g),
      grafsOut = [],
      end = grafs.length; // Wrap <p> tags

  for (var i = 0; i < end; i++) {
    var str = grafs[i];
    // if this is an HTML marker, copy it
    if (str.search(/¨(K|G)(\d+)\1/g) >= 0) {
      grafsOut.push(str);

    // test for presence of characters to prevent empty lines being parsed
    // as paragraphs (resulting in undesired extra empty paragraphs)
    } else if (str.search(/\S/) >= 0) {
      str = showdown.subParser('spanGamut')(str, options, globals);
      str = str.replace(/^([ \t]*)/g, '<p>');
      str += '</p>';
      grafsOut.push(str);
    }
  }

  /** Unhashify HTML blocks */
  end = grafsOut.length;
  for (i = 0; i < end; i++) {
    var blockText = '',
        grafsOutIt = grafsOut[i],
        codeFlag = false;
    // if this is a marker for an html block...
    // use RegExp.test instead of string.search because of QML bug
    while (/¨(K|G)(\d+)\1/.test(grafsOutIt)) {
      var delim = RegExp.$1,
          num   = RegExp.$2;

      if (delim === 'K') {
        blockText = globals.gHtmlBlocks[num];
      } else {
        // we need to check if ghBlock is a false positive
        if (codeFlag) {
          // use encoded version of all text
          blockText = showdown.subParser('encodeCode')(globals.ghCodeBlocks[num].text, options, globals);
        } else {
          blockText = globals.ghCodeBlocks[num].codeblock;
        }
      }
      blockText = blockText.replace(/\$/g, '$$$$'); // Escape any dollar signs

      grafsOutIt = grafsOutIt.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, blockText);
      // Check if grafsOutIt is a pre->code
      if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(grafsOutIt)) {
        codeFlag = true;
      }
    }
    grafsOut[i] = grafsOutIt;
  }
  text = grafsOut.join('\n');
  // Strip leading and trailing lines:
  text = text.replace(/^\n+/g, '');
  text = text.replace(/\n+$/g, '');
  return globals.converter._dispatch('paragraphs.after', text, options, globals);
});

/**
 * Run extension
 */
showdown.subParser('runExtension', function (ext, text, options, globals) {
  'use strict';

  if (ext.filter) {
    text = ext.filter(text, globals.converter, options);

  } else if (ext.regex) {
    // TODO remove this when old extension loading mechanism is deprecated
    var re = ext.regex;
    if (!(re instanceof RegExp)) {
      re = new RegExp(re, 'g');
    }
    text = text.replace(re, ext.replace);
  }

  return text;
});

/**
 * These are all the transformations that occur *within* block-level
 * tags like paragraphs, headers, and list items.
 */
showdown.subParser('spanGamut', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('spanGamut.before', text, options, globals);
  text = showdown.subParser('codeSpans')(text, options, globals);
  text = showdown.subParser('escapeSpecialCharsWithinTagAttributes')(text, options, globals);
  text = showdown.subParser('encodeBackslashEscapes')(text, options, globals);

  // Process anchor and image tags. Images must come first,
  // because ![foo][f] looks like an anchor.
  text = showdown.subParser('images')(text, options, globals);
  text = showdown.subParser('anchors')(text, options, globals);

  // Make links out of things like `<http://example.com/>`
  // Must come after anchors, because you can use < and >
  // delimiters in inline links like [this](<url>).
  text = showdown.subParser('autoLinks')(text, options, globals);
  text = showdown.subParser('simplifiedAutoLinks')(text, options, globals);
  text = showdown.subParser('emoji')(text, options, globals);
  text = showdown.subParser('underline')(text, options, globals);
  text = showdown.subParser('italicsAndBold')(text, options, globals);
  text = showdown.subParser('strikethrough')(text, options, globals);
  text = showdown.subParser('ellipsis')(text, options, globals);

  // we need to hash HTML tags inside spans
  text = showdown.subParser('hashHTMLSpans')(text, options, globals);

  // now we encode amps and angles
  text = showdown.subParser('encodeAmpsAndAngles')(text, options, globals);

  // Do hard breaks
  if (options.simpleLineBreaks) {
    // GFM style hard breaks
    // only add line breaks if the text does not contain a block (special case for lists)
    if (!/\n\n¨K/.test(text)) {
      text = text.replace(/\n+/g, '<br />\n');
    }
  } else {
    // Vanilla hard breaks
    text = text.replace(/  +\n/g, '<br />\n');
  }

  text = globals.converter._dispatch('spanGamut.after', text, options, globals);
  return text;
});

showdown.subParser('strikethrough', function (text, options, globals) {
  'use strict';

  function parseInside (txt) {
    if (options.simplifiedAutoLink) {
      txt = showdown.subParser('simplifiedAutoLinks')(txt, options, globals);
    }
    return '<del>' + txt + '</del>';
  }

  if (options.strikethrough) {
    text = globals.converter._dispatch('strikethrough.before', text, options, globals);
    text = text.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function (wm, txt) { return parseInside(txt); });
    text = globals.converter._dispatch('strikethrough.after', text, options, globals);
  }

  return text;
});

/**
 * Strips link definitions from text, stores the URLs and titles in
 * hash references.
 * Link defs are in the form: ^[id]: url "optional title"
 */
showdown.subParser('stripLinkDefinitions', function (text, options, globals) {
  'use strict';

  var regex       = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm,
      base64Regex = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;

  // attacklab: sentinel workarounds for lack of \A and \Z, safari\khtml bug
  text += '¨0';

  var replaceFunc = function (wholeMatch, linkId, url, width, height, blankLines, title) {
    linkId = linkId.toLowerCase();
    if (url.match(/^data:.+?\/.+?;base64,/)) {
      // remove newlines
      globals.gUrls[linkId] = url.replace(/\s/g, '');
    } else {
      globals.gUrls[linkId] = showdown.subParser('encodeAmpsAndAngles')(url, options, globals);  // Link IDs are case-insensitive
    }

    if (blankLines) {
      // Oops, found blank lines, so it's not a title.
      // Put back the parenthetical statement we stole.
      return blankLines + title;

    } else {
      if (title) {
        globals.gTitles[linkId] = title.replace(/"|'/g, '&quot;');
      }
      if (options.parseImgDimensions && width && height) {
        globals.gDimensions[linkId] = {
          width:  width,
          height: height
        };
      }
    }
    // Completely remove the definition from the text
    return '';
  };

  // first we try to find base64 link references
  text = text.replace(base64Regex, replaceFunc);

  text = text.replace(regex, replaceFunc);

  // attacklab: strip sentinel
  text = text.replace(/¨0/, '');

  return text;
});

showdown.subParser('tables', function (text, options, globals) {
  'use strict';

  if (!options.tables) {
    return text;
  }

  var tableRgx       = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm,
    //singeColTblRgx = /^ {0,3}\|.+\|\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n(?: {0,3}\|.+\|\n)+(?:\n\n|¨0)/gm;
      singeColTblRgx = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;

  function parseStyles (sLine) {
    if (/^:[ \t]*--*$/.test(sLine)) {
      return ' style="text-align:left;"';
    } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
      return ' style="text-align:right;"';
    } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
      return ' style="text-align:center;"';
    } else {
      return '';
    }
  }

  function parseHeaders (header, style) {
    var id = '';
    header = header.trim();
    // support both tablesHeaderId and tableHeaderId due to error in documentation so we don't break backwards compatibility
    if (options.tablesHeaderId || options.tableHeaderId) {
      id = ' id="' + header.replace(/ /g, '_').toLowerCase() + '"';
    }
    header = showdown.subParser('spanGamut')(header, options, globals);

    return '<th' + id + style + '>' + header + '</th>\n';
  }

  function parseCells (cell, style) {
    var subText = showdown.subParser('spanGamut')(cell, options, globals);
    return '<td' + style + '>' + subText + '</td>\n';
  }

  function buildTable (headers, cells) {
    var tb = '<table>\n<thead>\n<tr>\n',
        tblLgn = headers.length;

    for (var i = 0; i < tblLgn; ++i) {
      tb += headers[i];
    }
    tb += '</tr>\n</thead>\n<tbody>\n';

    for (i = 0; i < cells.length; ++i) {
      tb += '<tr>\n';
      for (var ii = 0; ii < tblLgn; ++ii) {
        tb += cells[i][ii];
      }
      tb += '</tr>\n';
    }
    tb += '</tbody>\n</table>\n';
    return tb;
  }

  function parseTable (rawTable) {
    var i, tableLines = rawTable.split('\n');

    for (i = 0; i < tableLines.length; ++i) {
      // strip wrong first and last column if wrapped tables are used
      if (/^ {0,3}\|/.test(tableLines[i])) {
        tableLines[i] = tableLines[i].replace(/^ {0,3}\|/, '');
      }
      if (/\|[ \t]*$/.test(tableLines[i])) {
        tableLines[i] = tableLines[i].replace(/\|[ \t]*$/, '');
      }
      // parse code spans first, but we only support one line code spans
      tableLines[i] = showdown.subParser('codeSpans')(tableLines[i], options, globals);
    }

    var rawHeaders = tableLines[0].split('|').map(function (s) { return s.trim();}),
        rawStyles = tableLines[1].split('|').map(function (s) { return s.trim();}),
        rawCells = [],
        headers = [],
        styles = [],
        cells = [];

    tableLines.shift();
    tableLines.shift();

    for (i = 0; i < tableLines.length; ++i) {
      if (tableLines[i].trim() === '') {
        continue;
      }
      rawCells.push(
        tableLines[i]
          .split('|')
          .map(function (s) {
            return s.trim();
          })
      );
    }

    if (rawHeaders.length < rawStyles.length) {
      return rawTable;
    }

    for (i = 0; i < rawStyles.length; ++i) {
      styles.push(parseStyles(rawStyles[i]));
    }

    for (i = 0; i < rawHeaders.length; ++i) {
      if (showdown.helper.isUndefined(styles[i])) {
        styles[i] = '';
      }
      headers.push(parseHeaders(rawHeaders[i], styles[i]));
    }

    for (i = 0; i < rawCells.length; ++i) {
      var row = [];
      for (var ii = 0; ii < headers.length; ++ii) {
        if (showdown.helper.isUndefined(rawCells[i][ii])) {

        }
        row.push(parseCells(rawCells[i][ii], styles[ii]));
      }
      cells.push(row);
    }

    return buildTable(headers, cells);
  }

  text = globals.converter._dispatch('tables.before', text, options, globals);

  // find escaped pipe characters
  text = text.replace(/\\(\|)/g, showdown.helper.escapeCharactersCallback);

  // parse multi column tables
  text = text.replace(tableRgx, parseTable);

  // parse one column tables
  text = text.replace(singeColTblRgx, parseTable);

  text = globals.converter._dispatch('tables.after', text, options, globals);

  return text;
});

showdown.subParser('underline', function (text, options, globals) {
  'use strict';

  if (!options.underline) {
    return text;
  }

  text = globals.converter._dispatch('underline.before', text, options, globals);

  if (options.literalMidWordUnderscores) {
    text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function (wm, txt) {
      return '<u>' + txt + '</u>';
    });
    text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function (wm, txt) {
      return '<u>' + txt + '</u>';
    });
  } else {
    text = text.replace(/___(\S[\s\S]*?)___/g, function (wm, m) {
      return (/\S$/.test(m)) ? '<u>' + m + '</u>' : wm;
    });
    text = text.replace(/__(\S[\s\S]*?)__/g, function (wm, m) {
      return (/\S$/.test(m)) ? '<u>' + m + '</u>' : wm;
    });
  }

  // escape remaining underscores to prevent them being parsed by italic and bold
  text = text.replace(/(_)/g, showdown.helper.escapeCharactersCallback);

  text = globals.converter._dispatch('underline.after', text, options, globals);

  return text;
});

/**
 * Swap back in all the special characters we've hidden.
 */
showdown.subParser('unescapeSpecialChars', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('unescapeSpecialChars.before', text, options, globals);

  text = text.replace(/¨E(\d+)E/g, function (wholeMatch, m1) {
    var charCodeToReplace = parseInt(m1);
    return String.fromCharCode(charCodeToReplace);
  });

  text = globals.converter._dispatch('unescapeSpecialChars.after', text, options, globals);
  return text;
});

showdown.subParser('makeMarkdown.blockquote', function (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes()) {
    var children = node.childNodes,
        childrenLength = children.length;

    for (var i = 0; i < childrenLength; ++i) {
      var innerTxt = showdown.subParser('makeMarkdown.node')(children[i], globals);

      if (innerTxt === '') {
        continue;
      }
      txt += innerTxt;
    }
  }
  // cleanup
  txt = txt.trim();
  txt = '> ' + txt.split('\n').join('\n> ');
  return txt;
});

showdown.subParser('makeMarkdown.codeBlock', function (node, globals) {
  'use strict';

  var lang = node.getAttribute('language'),
      num  = node.getAttribute('precodenum');
  return '```' + lang + '\n' + globals.preList[num] + '\n```';
});

showdown.subParser('makeMarkdown.codeSpan', function (node) {
  'use strict';

  return '`' + node.innerHTML + '`';
});

showdown.subParser('makeMarkdown.emphasis', function (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes()) {
    txt += '*';
    var children = node.childNodes,
        childrenLength = children.length;
    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
    txt += '*';
  }
  return txt;
});

showdown.subParser('makeMarkdown.header', function (node, globals, headerLevel) {
  'use strict';

  var headerMark = new Array(headerLevel + 1).join('#'),
      txt = '';

  if (node.hasChildNodes()) {
    txt = headerMark + ' ';
    var children = node.childNodes,
        childrenLength = children.length;

    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
  }
  return txt;
});

showdown.subParser('makeMarkdown.hr', function () {
  'use strict';

  return '---';
});

showdown.subParser('makeMarkdown.image', function (node) {
  'use strict';

  var txt = '';
  if (node.hasAttribute('src')) {
    txt += '![' + node.getAttribute('alt') + '](';
    txt += '<' + node.getAttribute('src') + '>';
    if (node.hasAttribute('width') && node.hasAttribute('height')) {
      txt += ' =' + node.getAttribute('width') + 'x' + node.getAttribute('height');
    }

    if (node.hasAttribute('title')) {
      txt += ' "' + node.getAttribute('title') + '"';
    }
    txt += ')';
  }
  return txt;
});

showdown.subParser('makeMarkdown.links', function (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes() && node.hasAttribute('href')) {
    var children = node.childNodes,
        childrenLength = children.length;
    txt = '[';
    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
    txt += '](';
    txt += '<' + node.getAttribute('href') + '>';
    if (node.hasAttribute('title')) {
      txt += ' "' + node.getAttribute('title') + '"';
    }
    txt += ')';
  }
  return txt;
});

showdown.subParser('makeMarkdown.list', function (node, globals, type) {
  'use strict';

  var txt = '';
  if (!node.hasChildNodes()) {
    return '';
  }
  var listItems       = node.childNodes,
      listItemsLenght = listItems.length,
      listNum = node.getAttribute('start') || 1;

  for (var i = 0; i < listItemsLenght; ++i) {
    if (typeof listItems[i].tagName === 'undefined' || listItems[i].tagName.toLowerCase() !== 'li') {
      continue;
    }

    // define the bullet to use in list
    var bullet = '';
    if (type === 'ol') {
      bullet = listNum.toString() + '. ';
    } else {
      bullet = '- ';
    }

    // parse list item
    txt += bullet + showdown.subParser('makeMarkdown.listItem')(listItems[i], globals);
    ++listNum;
  }

  // add comment at the end to prevent consecutive lists to be parsed as one
  txt += '\n<!-- -->\n';
  return txt.trim();
});

showdown.subParser('makeMarkdown.listItem', function (node, globals) {
  'use strict';

  var listItemTxt = '';

  var children = node.childNodes,
      childrenLenght = children.length;

  for (var i = 0; i < childrenLenght; ++i) {
    listItemTxt += showdown.subParser('makeMarkdown.node')(children[i], globals);
  }
  // if it's only one liner, we need to add a newline at the end
  if (!/\n$/.test(listItemTxt)) {
    listItemTxt += '\n';
  } else {
    // it's multiparagraph, so we need to indent
    listItemTxt = listItemTxt
      .split('\n')
      .join('\n    ')
      .replace(/^ {4}$/gm, '')
      .replace(/\n\n+/g, '\n\n');
  }

  return listItemTxt;
});



showdown.subParser('makeMarkdown.node', function (node, globals, spansOnly) {
  'use strict';

  spansOnly = spansOnly || false;

  var txt = '';

  // edge case of text without wrapper paragraph
  if (node.nodeType === 3) {
    return showdown.subParser('makeMarkdown.txt')(node, globals);
  }

  // HTML comment
  if (node.nodeType === 8) {
    return '<!--' + node.data + '-->\n\n';
  }

  // process only node elements
  if (node.nodeType !== 1) {
    return '';
  }

  var tagName = node.tagName.toLowerCase();

  switch (tagName) {

    //
    // BLOCKS
    //
    case 'h1':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 1) + '\n\n'; }
      break;
    case 'h2':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 2) + '\n\n'; }
      break;
    case 'h3':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 3) + '\n\n'; }
      break;
    case 'h4':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 4) + '\n\n'; }
      break;
    case 'h5':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 5) + '\n\n'; }
      break;
    case 'h6':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 6) + '\n\n'; }
      break;

    case 'p':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.paragraph')(node, globals) + '\n\n'; }
      break;

    case 'blockquote':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.blockquote')(node, globals) + '\n\n'; }
      break;

    case 'hr':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.hr')(node, globals) + '\n\n'; }
      break;

    case 'ol':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.list')(node, globals, 'ol') + '\n\n'; }
      break;

    case 'ul':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.list')(node, globals, 'ul') + '\n\n'; }
      break;

    case 'precode':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.codeBlock')(node, globals) + '\n\n'; }
      break;

    case 'pre':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.pre')(node, globals) + '\n\n'; }
      break;

    case 'table':
      if (!spansOnly) { txt = showdown.subParser('makeMarkdown.table')(node, globals) + '\n\n'; }
      break;

    //
    // SPANS
    //
    case 'code':
      txt = showdown.subParser('makeMarkdown.codeSpan')(node, globals);
      break;

    case 'em':
    case 'i':
      txt = showdown.subParser('makeMarkdown.emphasis')(node, globals);
      break;

    case 'strong':
    case 'b':
      txt = showdown.subParser('makeMarkdown.strong')(node, globals);
      break;

    case 'del':
      txt = showdown.subParser('makeMarkdown.strikethrough')(node, globals);
      break;

    case 'a':
      txt = showdown.subParser('makeMarkdown.links')(node, globals);
      break;

    case 'img':
      txt = showdown.subParser('makeMarkdown.image')(node, globals);
      break;

    default:
      txt = node.outerHTML + '\n\n';
  }

  // common normalization
  // TODO eventually

  return txt;
});

showdown.subParser('makeMarkdown.paragraph', function (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes()) {
    var children = node.childNodes,
        childrenLength = children.length;
    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
  }

  // some text normalization
  txt = txt.trim();

  return txt;
});

showdown.subParser('makeMarkdown.pre', function (node, globals) {
  'use strict';

  var num  = node.getAttribute('prenum');
  return '<pre>' + globals.preList[num] + '</pre>';
});

showdown.subParser('makeMarkdown.strikethrough', function (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes()) {
    txt += '~~';
    var children = node.childNodes,
        childrenLength = children.length;
    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
    txt += '~~';
  }
  return txt;
});

showdown.subParser('makeMarkdown.strong', function (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes()) {
    txt += '**';
    var children = node.childNodes,
        childrenLength = children.length;
    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
    txt += '**';
  }
  return txt;
});

showdown.subParser('makeMarkdown.table', function (node, globals) {
  'use strict';

  var txt = '',
      tableArray = [[], []],
      headings   = node.querySelectorAll('thead>tr>th'),
      rows       = node.querySelectorAll('tbody>tr'),
      i, ii;
  for (i = 0; i < headings.length; ++i) {
    var headContent = showdown.subParser('makeMarkdown.tableCell')(headings[i], globals),
        allign = '---';

    if (headings[i].hasAttribute('style')) {
      var style = headings[i].getAttribute('style').toLowerCase().replace(/\s/g, '');
      switch (style) {
        case 'text-align:left;':
          allign = ':---';
          break;
        case 'text-align:right;':
          allign = '---:';
          break;
        case 'text-align:center;':
          allign = ':---:';
          break;
      }
    }
    tableArray[0][i] = headContent.trim();
    tableArray[1][i] = allign;
  }

  for (i = 0; i < rows.length; ++i) {
    var r = tableArray.push([]) - 1,
        cols = rows[i].getElementsByTagName('td');

    for (ii = 0; ii < headings.length; ++ii) {
      var cellContent = ' ';
      if (typeof cols[ii] !== 'undefined') {
        cellContent = showdown.subParser('makeMarkdown.tableCell')(cols[ii], globals);
      }
      tableArray[r].push(cellContent);
    }
  }

  var cellSpacesCount = 3;
  for (i = 0; i < tableArray.length; ++i) {
    for (ii = 0; ii < tableArray[i].length; ++ii) {
      var strLen = tableArray[i][ii].length;
      if (strLen > cellSpacesCount) {
        cellSpacesCount = strLen;
      }
    }
  }

  for (i = 0; i < tableArray.length; ++i) {
    for (ii = 0; ii < tableArray[i].length; ++ii) {
      if (i === 1) {
        if (tableArray[i][ii].slice(-1) === ':') {
          tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii].slice(-1), cellSpacesCount - 1, '-') + ':';
        } else {
          tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii], cellSpacesCount, '-');
        }
      } else {
        tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii], cellSpacesCount);
      }
    }
    txt += '| ' + tableArray[i].join(' | ') + ' |\n';
  }

  return txt.trim();
});

showdown.subParser('makeMarkdown.tableCell', function (node, globals) {
  'use strict';

  var txt = '';
  if (!node.hasChildNodes()) {
    return '';
  }
  var children = node.childNodes,
      childrenLength = children.length;

  for (var i = 0; i < childrenLength; ++i) {
    txt += showdown.subParser('makeMarkdown.node')(children[i], globals, true);
  }
  return txt.trim();
});

showdown.subParser('makeMarkdown.txt', function (node) {
  'use strict';

  var txt = node.nodeValue;

  // multiple spaces are collapsed
  txt = txt.replace(/ +/g, ' ');

  // replace the custom ¨NBSP; with a space
  txt = txt.replace(/¨NBSP;/g, ' ');

  // ", <, > and & should replace escaped html entities
  txt = showdown.helper.unescapeHTMLEntities(txt);

  // escape markdown magic characters
  // emphasis, strong and strikethrough - can appear everywhere
  // we also escape pipe (|) because of tables
  // and escape ` because of code blocks and spans
  txt = txt.replace(/([*_~|`])/g, '\\$1');

  // escape > because of blockquotes
  txt = txt.replace(/^(\s*)>/g, '\\$1>');

  // hash character, only troublesome at the beginning of a line because of headers
  txt = txt.replace(/^#/gm, '\\#');

  // horizontal rules
  txt = txt.replace(/^(\s*)([-=]{3,})(\s*)$/, '$1\\$2$3');

  // dot, because of ordered lists, only troublesome at the beginning of a line when preceded by an integer
  txt = txt.replace(/^( {0,3}\d+)\./gm, '$1\\.');

  // +, * and -, at the beginning of a line becomes a list, so we need to escape them also (asterisk was already escaped)
  txt = txt.replace(/^( {0,3})([+-])/gm, '$1\\$2');

  // images and links, ] followed by ( is problematic, so we escape it
  txt = txt.replace(/]([\s]*)\(/g, '\\]$1\\(');

  // reference URIs must also be escaped
  txt = txt.replace(/^ {0,3}\[([\S \t]*?)]:/gm, '\\[$1]:');

  return txt;
});

var root = this;

// AMD Loader
if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    'use strict';
    return showdown;
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

// CommonJS/nodeJS Loader
} else {}
}).call(this);

//# sourceMappingURL=showdown.js.map


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHpob3VqaWFoYW8vbm90ZWJvb2svbGliL25vdGVib29rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zaG93ZG93bi9kaXN0L3Nob3dkb3duLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE4RDs7QUFFOUQ7QUFDQTs7QUFFQTtBQUNBLGNBQWMsK0RBQUs7QUFDbkI7QUFDQSxrQkFBa0IscUVBQUc7QUFDckIsSUFBSSwrREFBSztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEIsV0FBVyx1RUFBSyxHQUFHLEdBQUcsU0FBUztBQUN6RCx5QkFBeUIsVUFBVSxHQUFHLGFBQWE7QUFDbkQ7QUFDQSwwQkFBMEIsYUFBYTtBQUN2QyxnQkFBZ0IsaUNBQWlDO0FBQ2pELGFBQWEsZ0VBQU07QUFDbkI7O0FBRUEsU0FBUyxxRUFBRztBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MsS0FBSztBQUN6QztBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsU0FBUyxVQUFVO0FBQ25CLHlCQUF5QixVQUFVLEdBQUcsS0FBSztBQUMzQztBQUNBLDZCQUE2QixLQUFLO0FBQ2xDLGFBQWEsZ0VBQU07QUFDbkI7QUFDQSxnQkFBZ0IsaUNBQWlDO0FBQ2pEOztBQUVBLFNBQVMscUVBQUc7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxLQUFLO0FBQ3pDO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGNBQWM7QUFDM0M7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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REFBa0QsSUFBSSxtQkFBbUIsSUFBSTtBQUN0SjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BC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QUMzQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG9CQUFvQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLG9CQUFvQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixvQkFBb0I7QUFDdkM7QUFDQTtB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QUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLG9CQUFvQjtBQUNyQztBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSw4QkFBOEI7QUFDOUIsMkJBQTJCOztBQUUzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUNBQWlDLEdBQUc7O0FBRXBDO0FBQ0EseUJBQXlCLElBQUk7O0FBRTdCO0FBQ0EseUJBQXlCLElBQUk7O0FBRTdCO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsSUFBSTs7QUFFNUI7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0EsSUFBSSxJQUEwQztBQUM5QyxFQUFFLG1DQUFPO0FBQ1Q7QUFDQTtBQUNBLEdBQUc7QUFBQSxvR0FBQzs7QUFFSjtBQUNBLENBQUMsTUFBTSxFQU1OO0FBQ0QsQ0FBQzs7QUFFRCIsImZpbGUiOiIzLjRkMWU5Zi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRvZGF5LCBzdG9yZSwgcmVxLCBiYXNlNjQgfSBmcm9tIFwiQHpob3VqaWFoYW8vdXRpbHNcIjtcblxuY29uc3QgUE9TVFNfVVJMID0gJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3Mvempob3Uvbm90ZXMvY29udGVudHMvX3Bvc3RzJztcbmNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dodG9rZW4nKTtcblxuY29uc3QgbGlzdE5vdGVzID0gYXN5bmMgKCkgPT4ge1xuICBsZXQgbm90ZXMgPSBzdG9yZS5nZXQoJ25vdGVzJyk7XG4gIGlmICghbm90ZXMpIHtcbiAgICBub3RlcyA9IGF3YWl0IHJlcShQT1NUU19VUkwsICdHRVQnKTtcbiAgICBzdG9yZS5zZXQoJ25vdGVzJywgbm90ZXMpO1xuICB9XG4gIHJldHVybiBub3Rlcztcbn07XG5cbi8qKlxuICog5re75Yqg5LiA5p2h56yU6K6w5Yiw5LuT5bqT77yIempob3Uvbm90ZXPvvIlcbiAqIEBwYXJhbSBub3RlTmFtZSDnrJTorrDlkI3np7DvvIznn63mqKrnur/ov57mjqXlpJrkuKrlrZfnrKZcbiAqIEBwYXJhbSBub3RlQ29udGVudCDnrJTorrDlhoXlrrlcbiAqIEBwYXJhbSBkYXRlU3RyIOaXpeacn+Wtl+espuS4su+8jOagvOW8jyAnWVlZWS1NTS1ERCdcbiAqL1xuY29uc3QgYWRkTm90ZSA9IChub3RlTmFtZSwgbm90ZUNvbnRlbnQsIGRhdGVTdHIpID0+IHtcbiAgaWYgKCF0b2tlbikge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgncGxlYXNlIHNldCBQQVQgZmlyc3QhJyk7XG4gIH1cblxuICBjb25zdCBub3RlRmlsZU5hbWUgPSBgJHtkYXRlU3RyIHx8IHRvZGF5KCl9LSR7bm90ZU5hbWV9Lm1kYDtcbiAgY29uc3QgcmVxRW5kUG9pbnQgPSBgJHtQT1NUU19VUkx9LyR7bm90ZUZpbGVOYW1lfWA7XG4gIGNvbnN0IGNvbW1pdE9iaiA9IHtcbiAgICBtZXNzYWdlOiBgYWRkIG5vdGU6ICR7bm90ZUZpbGVOYW1lfWAsXG4gICAgY29tbWl0dGVyOiB7bmFtZTogJ3pqaG91JywgZW1haWw6ICd6QHpqaC5pbSd9LFxuICAgIGNvbnRlbnQ6IGJhc2U2NC5lbmNvZGUobm90ZUNvbnRlbnQpXG4gIH07XG5cbiAgcmV0dXJuIHJlcShcbiAgICByZXFFbmRQb2ludCxcbiAgICAnUFVUJyxcbiAgICBjb21taXRPYmosXG4gICAgdG9rZW5cbiAgKTtcbn07XG5cbi8qKlxuICog5pu05paw5oyH5a6a56yU6K6w77yIempob3Uvbm90ZXPvvIlcbiAqIEBwYXJhbSBub3RlTmFtZSDnrJTorrDlkI3np7DvvIznn63mqKrnur/ov57mjqXlpJrkuKrlrZfnrKZcbiAqIEBwYXJhbSBub3RlQ29udGVudCDnrJTorrDlhoXlrrlcbiAqL1xuY29uc3QgdXBkYXRlTm90ZSA9IGFzeW5jIChub3RlTmFtZSwgbm90ZUNvbnRlbnQpID0+IHtcbiAgaWYgKCF0b2tlbikge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgncGxlYXNlIHNldCBQQVQgZmlyc3QhJyk7XG4gIH1cblxuICBjb25zdCBub3RlcyA9IGF3YWl0IGxpc3ROb3RlcygpO1xuICBjb25zdCB0YXJnZXROb3RlID0gbm90ZXMuZmlsdGVyKCh7bmFtZX0pID0+IHtcbiAgICByZXR1cm4gbmFtZS5pbmNsdWRlcyhub3RlTmFtZSlcbiAgfSlbMF07XG5cbiAgaWYgKCF0YXJnZXROb3RlKSB7XG4gICAgdGhyb3cgJ+aXoOazleaJvuWIsOeslOiusCc7XG4gIH1cbiAgY29uc3Qge25hbWUsIHNoYX0gPSB0YXJnZXROb3RlO1xuICBjb25zdCByZXFFbmRQb2ludCA9IGAke1BPU1RTX1VSTH0vJHtuYW1lfWA7XG4gIGNvbnN0IGNvbW1pdE9iaiA9IHtcbiAgICBtZXNzYWdlOiBgdXBkYXRlIG5vdGU6ICR7bmFtZX1gLFxuICAgIGNvbnRlbnQ6IGJhc2U2NC5lbmNvZGUobm90ZUNvbnRlbnQpLFxuICAgIHNoYSxcbiAgICBjb21taXR0ZXI6IHtuYW1lOiAnempob3UnLCBlbWFpbDogJ3pAempoLmltJ30sXG4gIH07XG5cbiAgcmV0dXJuIHJlcShcbiAgICByZXFFbmRQb2ludCxcbiAgICAnUFVUJyxcbiAgICBjb21taXRPYmosXG4gICAgdG9rZW5cbiAgKTtcbn07XG5cbmNvbnN0IGRlbGV0ZU5vdGUgPSBhc3luYyAoZXhhY3RGaWxlTmFtZSkgPT4ge1xuICBpZiAoIXRva2VuKSB7XG4gICAgdGhyb3cgJ3BsZWFzZSBzZXQgUEFUIGZpcnN0ISdcbiAgfVxuICBjb25zdCBub3RlcyA9IGF3YWl0IGxpc3ROb3RlcygpO1xuICBjb25zdCB0YXJnZXROb3RlID0gbm90ZXMuZmlsdGVyKCh7bmFtZX0pID0+IHtcbiAgICByZXR1cm4gbmFtZSA9PT0gZXhhY3RGaWxlTmFtZVxuICB9KVswXTtcbiAgaWYgKCF0YXJnZXROb3RlKSB7XG4gICAgdGhyb3cgJ+aXoOazleaJvuWIsOeslOiusCc7XG4gIH1cbiAgY29uc3QgcGFyYW1PYmogPSB7XG4gICAgbWVzc2FnZTogYGRlbGV0ZSBub3RlOiAke2V4YWN0RmlsZU5hbWV9YCxcbiAgICBzaGE6IHRhcmdldE5vdGUuc2hhXG4gIH07XG4gIGNvbnN0IHRhcmdldFBhdGggPSBgJHtQT1NUU19VUkx9LyR7ZXhhY3RGaWxlTmFtZX1gO1xuICByZXR1cm4gcmVxKFxuICAgIHRhcmdldFBhdGgsXG4gICAgJ0RFTEVURScsXG4gICAgcGFyYW1PYmosXG4gICAgdG9rZW4sXG4gICkudGhlbigoKSA9PiB7XG4gICAgcmV0dXJuICfmiJDlip/liKDpmaTvvIEnXG4gIH0pO1xufTtcblxuY29uc3QgZmV0Y2hOb3RlQ29udGVudCA9IGFzeW5jIChub3RlTmFtZSkgPT4ge1xuICBpZiAoIW5vdGVOYW1lKSB7XG4gICAgdGhyb3cgJ+ivt+aMh+WumueslOiusOWQjeensCc7XG4gIH1cbiAgY29uc3Qgbm90ZXMgPSBhd2FpdCBsaXN0Tm90ZXMoKTtcbiAgY29uc3Qgbm90ZXNOYW1lQXJyID0gbm90ZXMubWFwKCh7bmFtZX0pID0+IG5hbWUudG9Mb3dlckNhc2UoKSk7XG4gIGNvbnN0IHRhcmdldE5vdGUgPSBub3Rlc05hbWVBcnIuZmlsdGVyKGNhbmRpID0+IHtcbiAgICByZXR1cm4gY2FuZGkuaW5jbHVkZXMobm90ZU5hbWUudG9Mb3dlckNhc2UoKSk7XG4gIH0pWzBdO1xuICBjb25zdCBub3RlVVJMID0gYCR7UE9TVFNfVVJMfS8ke3RhcmdldE5vdGV9YDtcbiAgY29uc3QgZW5jb2RlZE5vdGUgPSBhd2FpdCByZXEoXG4gICAgbm90ZVVSTCxcbiAgICAnR0VUJ1xuICApO1xuICByZXR1cm4gYmFzZTY0LmRlY29kZShlbmNvZGVkTm90ZS5jb250ZW50KTtcbn07XG5cbmV4cG9ydCB7XG4gIGFkZE5vdGUsIGRlbGV0ZU5vdGUsIGxpc3ROb3RlcywgdXBkYXRlTm90ZSwgZmV0Y2hOb3RlQ29udGVudFxufVxuIiwiOy8qISBzaG93ZG93biB2IDEuOS4wIC0gMTAtMTEtMjAxOCAqL1xyXG4oZnVuY3Rpb24oKXtcclxuLyoqXG4gKiBDcmVhdGVkIGJ5IFRpdmllIG9uIDEzLTA3LTIwMTUuXG4gKi9cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdE9wdHMgKHNpbXBsZSkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGRlZmF1bHRPcHRpb25zID0ge1xuICAgIG9taXRFeHRyYVdMSW5Db2RlQmxvY2tzOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpYmU6ICdPbWl0IHRoZSBkZWZhdWx0IGV4dHJhIHdoaXRlbGluZSBhZGRlZCB0byBjb2RlIGJsb2NrcycsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIG5vSGVhZGVySWQ6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmliZTogJ1R1cm4gb24vb2ZmIGdlbmVyYXRlZCBoZWFkZXIgaWQnLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICBwcmVmaXhIZWFkZXJJZDoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaWJlOiAnQWRkIGEgcHJlZml4IHRvIHRoZSBnZW5lcmF0ZWQgaGVhZGVyIGlkcy4gUGFzc2luZyBhIHN0cmluZyB3aWxsIHByZWZpeCB0aGF0IHN0cmluZyB0byB0aGUgaGVhZGVyIGlkLiBTZXR0aW5nIHRvIHRydWUgd2lsbCBhZGQgYSBnZW5lcmljIFxcJ3NlY3Rpb24tXFwnIHByZWZpeCcsXG4gICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIH0sXG4gICAgcmF3UHJlZml4SGVhZGVySWQ6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmliZTogJ1NldHRpbmcgdGhpcyBvcHRpb24gdG8gdHJ1ZSB3aWxsIHByZXZlbnQgc2hvd2Rvd24gZnJvbSBtb2RpZnlpbmcgdGhlIHByZWZpeC4gVGhpcyBtaWdodCByZXN1bHQgaW4gbWFsZm9ybWVkIElEcyAoaWYsIGZvciBpbnN0YW5jZSwgdGhlIFwiIGNoYXIgaXMgdXNlZCBpbiB0aGUgcHJlZml4KScsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIGdoQ29tcGF0aWJsZUhlYWRlcklkOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpYmU6ICdHZW5lcmF0ZSBoZWFkZXIgaWRzIGNvbXBhdGlibGUgd2l0aCBnaXRodWIgc3R5bGUgKHNwYWNlcyBhcmUgcmVwbGFjZWQgd2l0aCBkYXNoZXMsIGEgYnVuY2ggb2Ygbm9uIGFscGhhbnVtZXJpYyBjaGFycyBhcmUgcmVtb3ZlZCknLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICByYXdIZWFkZXJJZDoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaWJlOiAnUmVtb3ZlIG9ubHkgc3BhY2VzLCBcXCcgYW5kIFwiIGZyb20gZ2VuZXJhdGVkIGhlYWRlciBpZHMgKGluY2x1ZGluZyBwcmVmaXhlcyksIHJlcGxhY2luZyB0aGVtIHdpdGggZGFzaGVzICgtKS4gV0FSTklORzogVGhpcyBtaWdodCByZXN1bHQgaW4gbWFsZm9ybWVkIGlkcycsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIGhlYWRlckxldmVsU3RhcnQ6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmliZTogJ1RoZSBoZWFkZXIgYmxvY2tzIGxldmVsIHN0YXJ0JyxcbiAgICAgIHR5cGU6ICdpbnRlZ2VyJ1xuICAgIH0sXG4gICAgcGFyc2VJbWdEaW1lbnNpb25zOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpYmU6ICdUdXJuIG9uL29mZiBpbWFnZSBkaW1lbnNpb24gcGFyc2luZycsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIHNpbXBsaWZpZWRBdXRvTGluazoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaWJlOiAnVHVybiBvbi9vZmYgR0ZNIGF1dG9saW5rIHN0eWxlJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgZXhjbHVkZVRyYWlsaW5nUHVuY3R1YXRpb25Gcm9tVVJMczoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaWJlOiAnRXhjbHVkZXMgdHJhaWxpbmcgcHVuY3R1YXRpb24gZnJvbSBsaW5rcyBnZW5lcmF0ZWQgd2l0aCBhdXRvTGlua2luZycsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIGxpdGVyYWxNaWRXb3JkVW5kZXJzY29yZXM6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmliZTogJ1BhcnNlIG1pZHdvcmQgdW5kZXJzY29yZXMgYXMgbGl0ZXJhbCB1bmRlcnNjb3JlcycsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIGxpdGVyYWxNaWRXb3JkQXN0ZXJpc2tzOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpYmU6ICdQYXJzZSBtaWR3b3JkIGFzdGVyaXNrcyBhcyBsaXRlcmFsIGFzdGVyaXNrcycsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIHN0cmlrZXRocm91Z2g6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmliZTogJ1R1cm4gb24vb2ZmIHN0cmlrZXRocm91Z2ggc3VwcG9ydCcsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIHRhYmxlczoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaWJlOiAnVHVybiBvbi9vZmYgdGFibGVzIHN1cHBvcnQnLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICB0YWJsZXNIZWFkZXJJZDoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaWJlOiAnQWRkIGFuIGlkIHRvIHRhYmxlIGhlYWRlcnMnLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICBnaENvZGVCbG9ja3M6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcbiAgICAgIGRlc2NyaWJlOiAnVHVybiBvbi9vZmYgR0ZNIGZlbmNlZCBjb2RlIGJsb2NrcyBzdXBwb3J0JyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgdGFza2xpc3RzOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpYmU6ICdUdXJuIG9uL29mZiBHRk0gdGFza2xpc3Qgc3VwcG9ydCcsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIHNtb290aExpdmVQcmV2aWV3OiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpYmU6ICdQcmV2ZW50cyB3ZWlyZCBlZmZlY3RzIGluIGxpdmUgcHJldmlld3MgZHVlIHRvIGluY29tcGxldGUgaW5wdXQnLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICBzbWFydEluZGVudGF0aW9uRml4OiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpcHRpb246ICdUcmllcyB0byBzbWFydGx5IGZpeCBpbmRlbnRhdGlvbiBpbiBlczYgc3RyaW5ncycsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIGRpc2FibGVGb3JjZWQ0U3BhY2VzSW5kZW50ZWRTdWJsaXN0czoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnRGlzYWJsZXMgdGhlIHJlcXVpcmVtZW50IG9mIGluZGVudGluZyBuZXN0ZWQgc3VibGlzdHMgYnkgNCBzcGFjZXMnLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICBzaW1wbGVMaW5lQnJlYWtzOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpcHRpb246ICdQYXJzZXMgc2ltcGxlIGxpbmUgYnJlYWtzIGFzIDxicj4gKEdGTSBTdHlsZSknLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICByZXF1aXJlU3BhY2VCZWZvcmVIZWFkaW5nVGV4dDoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnTWFrZXMgYWRkaW5nIGEgc3BhY2UgYmV0d2VlbiBgI2AgYW5kIHRoZSBoZWFkZXIgdGV4dCBtYW5kYXRvcnkgKEdGTSBTdHlsZSknLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICBnaE1lbnRpb25zOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpcHRpb246ICdFbmFibGVzIGdpdGh1YiBAbWVudGlvbnMnLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICBnaE1lbnRpb25zTGluazoge1xuICAgICAgZGVmYXVsdFZhbHVlOiAnaHR0cHM6Ly9naXRodWIuY29tL3t1fScsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NoYW5nZXMgdGhlIGxpbmsgZ2VuZXJhdGVkIGJ5IEBtZW50aW9ucy4gT25seSBhcHBsaWVzIGlmIGdoTWVudGlvbnMgb3B0aW9uIGlzIGVuYWJsZWQuJyxcbiAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSxcbiAgICBlbmNvZGVFbWFpbHM6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnRW5jb2RlIGUtbWFpbCBhZGRyZXNzZXMgdGhyb3VnaCB0aGUgdXNlIG9mIENoYXJhY3RlciBFbnRpdGllcywgdHJhbnNmb3JtaW5nIEFTQ0lJIGUtbWFpbCBhZGRyZXNzZXMgaW50byBpdHMgZXF1aXZhbGVudCBkZWNpbWFsIGVudGl0aWVzJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgb3BlbkxpbmtzSW5OZXdXaW5kb3c6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmlwdGlvbjogJ09wZW4gYWxsIGxpbmtzIGluIG5ldyB3aW5kb3dzJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgYmFja3NsYXNoRXNjYXBlc0hUTUxUYWdzOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpcHRpb246ICdTdXBwb3J0IGZvciBIVE1MIFRhZyBlc2NhcGluZy4gZXg6IFxcPGRpdj5mb29cXDwvZGl2PicsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIGVtb2ppOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpcHRpb246ICdFbmFibGUgZW1vamkgc3VwcG9ydC4gRXg6IGB0aGlzIGlzIGEgOnNtaWxlOiBlbW9qaWAnLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICB1bmRlcmxpbmU6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmlwdGlvbjogJ0VuYWJsZSBzdXBwb3J0IGZvciB1bmRlcmxpbmUuIFN5bnRheCBpcyBkb3VibGUgb3IgdHJpcGxlIHVuZGVyc2NvcmVzOiBgX191bmRlcmxpbmUgd29yZF9fYC4gV2l0aCB0aGlzIG9wdGlvbiBlbmFibGVkLCB1bmRlcnNjb3JlcyBubyBsb25nZXIgcGFyc2VzIGludG8gYDxlbT5gIGFuZCBgPHN0cm9uZz5gJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgY29tcGxldGVIVE1MRG9jdW1lbnQ6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmlwdGlvbjogJ091dHB1dHMgYSBjb21wbGV0ZSBodG1sIGRvY3VtZW50LCBpbmNsdWRpbmcgYDxodG1sPmAsIGA8aGVhZD5gIGFuZCBgPGJvZHk+YCB0YWdzJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgbWV0YWRhdGE6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmlwdGlvbjogJ0VuYWJsZSBzdXBwb3J0IGZvciBkb2N1bWVudCBtZXRhZGF0YSAoZGVmaW5lZCBhdCB0aGUgdG9wIG9mIHRoZSBkb2N1bWVudCBiZXR3ZWVuIGDCq8KrwqtgIGFuZCBgwrvCu8K7YCBvciBiZXR3ZWVuIGAtLS1gIGFuZCBgLS0tYCkuJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgc3BsaXRBZGphY2VudEJsb2NrcXVvdGVzOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpcHRpb246ICdTcGxpdCBhZGphY2VudCBibG9ja3F1b3RlIGJsb2NrcycsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9XG4gIH07XG4gIGlmIChzaW1wbGUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGVmYXVsdE9wdGlvbnMpKTtcbiAgfVxuICB2YXIgcmV0ID0ge307XG4gIGZvciAodmFyIG9wdCBpbiBkZWZhdWx0T3B0aW9ucykge1xuICAgIGlmIChkZWZhdWx0T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShvcHQpKSB7XG4gICAgICByZXRbb3B0XSA9IGRlZmF1bHRPcHRpb25zW29wdF0uZGVmYXVsdFZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBhbGxPcHRpb25zT24gKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBvcHRpb25zID0gZ2V0RGVmYXVsdE9wdHModHJ1ZSksXG4gICAgICByZXQgPSB7fTtcbiAgZm9yICh2YXIgb3B0IGluIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShvcHQpKSB7XG4gICAgICByZXRbb3B0XSA9IHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXQ7XG59XG5cclxuLyoqXG4gKiBDcmVhdGVkIGJ5IFRpdmllIG9uIDA2LTAxLTIwMTUuXG4gKi9cblxuLy8gUHJpdmF0ZSBwcm9wZXJ0aWVzXG52YXIgc2hvd2Rvd24gPSB7fSxcbiAgICBwYXJzZXJzID0ge30sXG4gICAgZXh0ZW5zaW9ucyA9IHt9LFxuICAgIGdsb2JhbE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0cyh0cnVlKSxcbiAgICBzZXRGbGF2b3IgPSAndmFuaWxsYScsXG4gICAgZmxhdm9yID0ge1xuICAgICAgZ2l0aHViOiB7XG4gICAgICAgIG9taXRFeHRyYVdMSW5Db2RlQmxvY2tzOiAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgc2ltcGxpZmllZEF1dG9MaW5rOiAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICBleGNsdWRlVHJhaWxpbmdQdW5jdHVhdGlvbkZyb21VUkxzOiAgIHRydWUsXG4gICAgICAgIGxpdGVyYWxNaWRXb3JkVW5kZXJzY29yZXM6ICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgc3RyaWtldGhyb3VnaDogICAgICAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICB0YWJsZXM6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgIHRhYmxlc0hlYWRlcklkOiAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgZ2hDb2RlQmxvY2tzOiAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICB0YXNrbGlzdHM6ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgIGRpc2FibGVGb3JjZWQ0U3BhY2VzSW5kZW50ZWRTdWJsaXN0czogdHJ1ZSxcbiAgICAgICAgc2ltcGxlTGluZUJyZWFrczogICAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICByZXF1aXJlU3BhY2VCZWZvcmVIZWFkaW5nVGV4dDogICAgICAgIHRydWUsXG4gICAgICAgIGdoQ29tcGF0aWJsZUhlYWRlcklkOiAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgZ2hNZW50aW9uczogICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICBiYWNrc2xhc2hFc2NhcGVzSFRNTFRhZ3M6ICAgICAgICAgICAgIHRydWUsXG4gICAgICAgIGVtb2ppOiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgc3BsaXRBZGphY2VudEJsb2NrcXVvdGVzOiAgICAgICAgICAgICB0cnVlXG4gICAgICB9LFxuICAgICAgb3JpZ2luYWw6IHtcbiAgICAgICAgbm9IZWFkZXJJZDogICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICBnaENvZGVCbG9ja3M6ICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICB9LFxuICAgICAgZ2hvc3Q6IHtcbiAgICAgICAgb21pdEV4dHJhV0xJbkNvZGVCbG9ja3M6ICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICBwYXJzZUltZ0RpbWVuc2lvbnM6ICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgIHNpbXBsaWZpZWRBdXRvTGluazogICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgZXhjbHVkZVRyYWlsaW5nUHVuY3R1YXRpb25Gcm9tVVJMczogICB0cnVlLFxuICAgICAgICBsaXRlcmFsTWlkV29yZFVuZGVyc2NvcmVzOiAgICAgICAgICAgIHRydWUsXG4gICAgICAgIHN0cmlrZXRocm91Z2g6ICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgdGFibGVzOiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICB0YWJsZXNIZWFkZXJJZDogICAgICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgIGdoQ29kZUJsb2NrczogICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgdGFza2xpc3RzOiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICBzbW9vdGhMaXZlUHJldmlldzogICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgIHNpbXBsZUxpbmVCcmVha3M6ICAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgcmVxdWlyZVNwYWNlQmVmb3JlSGVhZGluZ1RleHQ6ICAgICAgICB0cnVlLFxuICAgICAgICBnaE1lbnRpb25zOiAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICBlbmNvZGVFbWFpbHM6ICAgICAgICAgICAgICAgICAgICAgICAgIHRydWVcbiAgICAgIH0sXG4gICAgICB2YW5pbGxhOiBnZXREZWZhdWx0T3B0cyh0cnVlKSxcbiAgICAgIGFsbE9uOiBhbGxPcHRpb25zT24oKVxuICAgIH07XG5cbi8qKlxuICogaGVscGVyIG5hbWVzcGFjZVxuICogQHR5cGUge3t9fVxuICovXG5zaG93ZG93bi5oZWxwZXIgPSB7fTtcblxuLyoqXG4gKiBUT0RPIExFR0FDWSBTVVBQT1JUIENPREVcbiAqIEB0eXBlIHt7fX1cbiAqL1xuc2hvd2Rvd24uZXh0ZW5zaW9ucyA9IHt9O1xuXG4vKipcbiAqIFNldCBhIGdsb2JhbCBvcHRpb25cbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm5zIHtzaG93ZG93bn1cbiAqL1xuc2hvd2Rvd24uc2V0T3B0aW9uID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBnbG9iYWxPcHRpb25zW2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEdldCBhIGdsb2JhbCBvcHRpb25cbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEByZXR1cm5zIHsqfVxuICovXG5zaG93ZG93bi5nZXRPcHRpb24gPSBmdW5jdGlvbiAoa2V5KSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgcmV0dXJuIGdsb2JhbE9wdGlvbnNba2V5XTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBnbG9iYWwgb3B0aW9uc1xuICogQHN0YXRpY1xuICogQHJldHVybnMge3t9fVxuICovXG5zaG93ZG93bi5nZXRPcHRpb25zID0gZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHJldHVybiBnbG9iYWxPcHRpb25zO1xufTtcblxuLyoqXG4gKiBSZXNldCBnbG9iYWwgb3B0aW9ucyB0byB0aGUgZGVmYXVsdCB2YWx1ZXNcbiAqIEBzdGF0aWNcbiAqL1xuc2hvd2Rvd24ucmVzZXRPcHRpb25zID0gZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG4gIGdsb2JhbE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0cyh0cnVlKTtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBmbGF2b3Igc2hvd2Rvd24gc2hvdWxkIHVzZSBhcyBkZWZhdWx0XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICovXG5zaG93ZG93bi5zZXRGbGF2b3IgPSBmdW5jdGlvbiAobmFtZSkge1xuICAndXNlIHN0cmljdCc7XG4gIGlmICghZmxhdm9yLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgdGhyb3cgRXJyb3IobmFtZSArICcgZmxhdm9yIHdhcyBub3QgZm91bmQnKTtcbiAgfVxuICBzaG93ZG93bi5yZXNldE9wdGlvbnMoKTtcbiAgdmFyIHByZXNldCA9IGZsYXZvcltuYW1lXTtcbiAgc2V0Rmxhdm9yID0gbmFtZTtcbiAgZm9yICh2YXIgb3B0aW9uIGluIHByZXNldCkge1xuICAgIGlmIChwcmVzZXQuaGFzT3duUHJvcGVydHkob3B0aW9uKSkge1xuICAgICAgZ2xvYmFsT3B0aW9uc1tvcHRpb25dID0gcHJlc2V0W29wdGlvbl07XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEdldCB0aGUgY3VycmVudGx5IHNldCBmbGF2b3JcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbnNob3dkb3duLmdldEZsYXZvciA9IGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICByZXR1cm4gc2V0Rmxhdm9yO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIG9wdGlvbnMgb2YgYSBzcGVjaWZpZWQgZmxhdm9yLiBSZXR1cm5zIHVuZGVmaW5lZCBpZiB0aGUgZmxhdm9yIHdhcyBub3QgZm91bmRcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIGZsYXZvclxuICogQHJldHVybnMge3t9fHVuZGVmaW5lZH1cbiAqL1xuc2hvd2Rvd24uZ2V0Rmxhdm9yT3B0aW9ucyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgaWYgKGZsYXZvci5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgIHJldHVybiBmbGF2b3JbbmFtZV07XG4gIH1cbn07XG5cbi8qKlxuICogR2V0IHRoZSBkZWZhdWx0IG9wdGlvbnNcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NpbXBsZT10cnVlXVxuICogQHJldHVybnMge3t9fVxuICovXG5zaG93ZG93bi5nZXREZWZhdWx0T3B0aW9ucyA9IGZ1bmN0aW9uIChzaW1wbGUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICByZXR1cm4gZ2V0RGVmYXVsdE9wdHMoc2ltcGxlKTtcbn07XG5cbi8qKlxuICogR2V0IG9yIHNldCBhIHN1YlBhcnNlclxuICpcbiAqIHN1YlBhcnNlcihuYW1lKSAgICAgICAtIEdldCBhIHJlZ2lzdGVyZWQgc3ViUGFyc2VyXG4gKiBzdWJQYXJzZXIobmFtZSwgZnVuYykgLSBSZWdpc3RlciBhIHN1YlBhcnNlclxuICogQHN0YXRpY1xuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtmdW5jXVxuICogQHJldHVybnMgeyp9XG4gKi9cbnNob3dkb3duLnN1YlBhcnNlciA9IGZ1bmN0aW9uIChuYW1lLCBmdW5jKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgaWYgKHNob3dkb3duLmhlbHBlci5pc1N0cmluZyhuYW1lKSkge1xuICAgIGlmICh0eXBlb2YgZnVuYyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHBhcnNlcnNbbmFtZV0gPSBmdW5jO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocGFyc2Vycy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICByZXR1cm4gcGFyc2Vyc1tuYW1lXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKCdTdWJQYXJzZXIgbmFtZWQgJyArIG5hbWUgKyAnIG5vdCByZWdpc3RlcmVkIScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBHZXRzIG9yIHJlZ2lzdGVycyBhbiBleHRlbnNpb25cbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbj19IGV4dFxuICogQHJldHVybnMgeyp9XG4gKi9cbnNob3dkb3duLmV4dGVuc2lvbiA9IGZ1bmN0aW9uIChuYW1lLCBleHQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGlmICghc2hvd2Rvd24uaGVscGVyLmlzU3RyaW5nKG5hbWUpKSB7XG4gICAgdGhyb3cgRXJyb3IoJ0V4dGVuc2lvbiBcXCduYW1lXFwnIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgfVxuXG4gIG5hbWUgPSBzaG93ZG93bi5oZWxwZXIuc3RkRXh0TmFtZShuYW1lKTtcblxuICAvLyBHZXR0ZXJcbiAgaWYgKHNob3dkb3duLmhlbHBlci5pc1VuZGVmaW5lZChleHQpKSB7XG4gICAgaWYgKCFleHRlbnNpb25zLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICB0aHJvdyBFcnJvcignRXh0ZW5zaW9uIG5hbWVkICcgKyBuYW1lICsgJyBpcyBub3QgcmVnaXN0ZXJlZCEnKTtcbiAgICB9XG4gICAgcmV0dXJuIGV4dGVuc2lvbnNbbmFtZV07XG5cbiAgICAvLyBTZXR0ZXJcbiAgfSBlbHNlIHtcbiAgICAvLyBFeHBhbmQgZXh0ZW5zaW9uIGlmIGl0J3Mgd3JhcHBlZCBpbiBhIGZ1bmN0aW9uXG4gICAgaWYgKHR5cGVvZiBleHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGV4dCA9IGV4dCgpO1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSBleHRlbnNpb24gaXMgYW4gYXJyYXlcbiAgICBpZiAoIXNob3dkb3duLmhlbHBlci5pc0FycmF5KGV4dCkpIHtcbiAgICAgIGV4dCA9IFtleHRdO1xuICAgIH1cblxuICAgIHZhciB2YWxpZEV4dGVuc2lvbiA9IHZhbGlkYXRlKGV4dCwgbmFtZSk7XG5cbiAgICBpZiAodmFsaWRFeHRlbnNpb24udmFsaWQpIHtcbiAgICAgIGV4dGVuc2lvbnNbbmFtZV0gPSBleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKHZhbGlkRXh0ZW5zaW9uLmVycm9yKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogR2V0cyBhbGwgZXh0ZW5zaW9ucyByZWdpc3RlcmVkXG4gKiBAcmV0dXJucyB7e319XG4gKi9cbnNob3dkb3duLmdldEFsbEV4dGVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgcmV0dXJuIGV4dGVuc2lvbnM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBleHRlbnNpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKi9cbnNob3dkb3duLnJlbW92ZUV4dGVuc2lvbiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgZGVsZXRlIGV4dGVuc2lvbnNbbmFtZV07XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGV4dGVuc2lvbnNcbiAqL1xuc2hvd2Rvd24ucmVzZXRFeHRlbnNpb25zID0gZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG4gIGV4dGVuc2lvbnMgPSB7fTtcbn07XG5cbi8qKlxuICogVmFsaWRhdGUgZXh0ZW5zaW9uXG4gKiBAcGFyYW0ge2FycmF5fSBleHRlbnNpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJucyB7e3ZhbGlkOiBib29sZWFuLCBlcnJvcjogc3RyaW5nfX1cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGUgKGV4dGVuc2lvbiwgbmFtZSkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGVyck1zZyA9IChuYW1lKSA/ICdFcnJvciBpbiAnICsgbmFtZSArICcgZXh0ZW5zaW9uLT4nIDogJ0Vycm9yIGluIHVubmFtZWQgZXh0ZW5zaW9uJyxcbiAgICAgIHJldCA9IHtcbiAgICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICAgIGVycm9yOiAnJ1xuICAgICAgfTtcblxuICBpZiAoIXNob3dkb3duLmhlbHBlci5pc0FycmF5KGV4dGVuc2lvbikpIHtcbiAgICBleHRlbnNpb24gPSBbZXh0ZW5zaW9uXTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZXh0ZW5zaW9uLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGJhc2VNc2cgPSBlcnJNc2cgKyAnIHN1Yi1leHRlbnNpb24gJyArIGkgKyAnOiAnLFxuICAgICAgICBleHQgPSBleHRlbnNpb25baV07XG4gICAgaWYgKHR5cGVvZiBleHQgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXQudmFsaWQgPSBmYWxzZTtcbiAgICAgIHJldC5lcnJvciA9IGJhc2VNc2cgKyAnbXVzdCBiZSBhbiBvYmplY3QsIGJ1dCAnICsgdHlwZW9mIGV4dCArICcgZ2l2ZW4nO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBpZiAoIXNob3dkb3duLmhlbHBlci5pc1N0cmluZyhleHQudHlwZSkpIHtcbiAgICAgIHJldC52YWxpZCA9IGZhbHNlO1xuICAgICAgcmV0LmVycm9yID0gYmFzZU1zZyArICdwcm9wZXJ0eSBcInR5cGVcIiBtdXN0IGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBleHQudHlwZSArICcgZ2l2ZW4nO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9IGV4dC50eXBlID0gZXh0LnR5cGUudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIG5vcm1hbGl6ZSBleHRlbnNpb24gdHlwZVxuICAgIGlmICh0eXBlID09PSAnbGFuZ3VhZ2UnKSB7XG4gICAgICB0eXBlID0gZXh0LnR5cGUgPSAnbGFuZyc7XG4gICAgfVxuXG4gICAgaWYgKHR5cGUgPT09ICdodG1sJykge1xuICAgICAgdHlwZSA9IGV4dC50eXBlID0gJ291dHB1dCc7XG4gICAgfVxuXG4gICAgaWYgKHR5cGUgIT09ICdsYW5nJyAmJiB0eXBlICE9PSAnb3V0cHV0JyAmJiB0eXBlICE9PSAnbGlzdGVuZXInKSB7XG4gICAgICByZXQudmFsaWQgPSBmYWxzZTtcbiAgICAgIHJldC5lcnJvciA9IGJhc2VNc2cgKyAndHlwZSAnICsgdHlwZSArICcgaXMgbm90IHJlY29nbml6ZWQuIFZhbGlkIHZhbHVlczogXCJsYW5nL2xhbmd1YWdlXCIsIFwib3V0cHV0L2h0bWxcIiBvciBcImxpc3RlbmVyXCInO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ2xpc3RlbmVyJykge1xuICAgICAgaWYgKHNob3dkb3duLmhlbHBlci5pc1VuZGVmaW5lZChleHQubGlzdGVuZXJzKSkge1xuICAgICAgICByZXQudmFsaWQgPSBmYWxzZTtcbiAgICAgICAgcmV0LmVycm9yID0gYmFzZU1zZyArICcuIEV4dGVuc2lvbnMgb2YgdHlwZSBcImxpc3RlbmVyXCIgbXVzdCBoYXZlIGEgcHJvcGVydHkgY2FsbGVkIFwibGlzdGVuZXJzXCInO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc2hvd2Rvd24uaGVscGVyLmlzVW5kZWZpbmVkKGV4dC5maWx0ZXIpICYmIHNob3dkb3duLmhlbHBlci5pc1VuZGVmaW5lZChleHQucmVnZXgpKSB7XG4gICAgICAgIHJldC52YWxpZCA9IGZhbHNlO1xuICAgICAgICByZXQuZXJyb3IgPSBiYXNlTXNnICsgdHlwZSArICcgZXh0ZW5zaW9ucyBtdXN0IGRlZmluZSBlaXRoZXIgYSBcInJlZ2V4XCIgcHJvcGVydHkgb3IgYSBcImZpbHRlclwiIG1ldGhvZCc7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGV4dC5saXN0ZW5lcnMpIHtcbiAgICAgIGlmICh0eXBlb2YgZXh0Lmxpc3RlbmVycyAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0LnZhbGlkID0gZmFsc2U7XG4gICAgICAgIHJldC5lcnJvciA9IGJhc2VNc2cgKyAnXCJsaXN0ZW5lcnNcIiBwcm9wZXJ0eSBtdXN0IGJlIGFuIG9iamVjdCBidXQgJyArIHR5cGVvZiBleHQubGlzdGVuZXJzICsgJyBnaXZlbic7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBsbiBpbiBleHQubGlzdGVuZXJzKSB7XG4gICAgICAgIGlmIChleHQubGlzdGVuZXJzLmhhc093blByb3BlcnR5KGxuKSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgZXh0Lmxpc3RlbmVyc1tsbl0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldC52YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0LmVycm9yID0gYmFzZU1zZyArICdcImxpc3RlbmVyc1wiIHByb3BlcnR5IG11c3QgYmUgYW4gaGFzaCBvZiBbZXZlbnQgbmFtZV06IFtjYWxsYmFja10uIGxpc3RlbmVycy4nICsgbG4gK1xuICAgICAgICAgICAgICAnIG11c3QgYmUgYSBmdW5jdGlvbiBidXQgJyArIHR5cGVvZiBleHQubGlzdGVuZXJzW2xuXSArICcgZ2l2ZW4nO1xuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZXh0LmZpbHRlcikge1xuICAgICAgaWYgKHR5cGVvZiBleHQuZmlsdGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldC52YWxpZCA9IGZhbHNlO1xuICAgICAgICByZXQuZXJyb3IgPSBiYXNlTXNnICsgJ1wiZmlsdGVyXCIgbXVzdCBiZSBhIGZ1bmN0aW9uLCBidXQgJyArIHR5cGVvZiBleHQuZmlsdGVyICsgJyBnaXZlbic7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChleHQucmVnZXgpIHtcbiAgICAgIGlmIChzaG93ZG93bi5oZWxwZXIuaXNTdHJpbmcoZXh0LnJlZ2V4KSkge1xuICAgICAgICBleHQucmVnZXggPSBuZXcgUmVnRXhwKGV4dC5yZWdleCwgJ2cnKTtcbiAgICAgIH1cbiAgICAgIGlmICghKGV4dC5yZWdleCBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcbiAgICAgICAgcmV0LnZhbGlkID0gZmFsc2U7XG4gICAgICAgIHJldC5lcnJvciA9IGJhc2VNc2cgKyAnXCJyZWdleFwiIHByb3BlcnR5IG11c3QgZWl0aGVyIGJlIGEgc3RyaW5nIG9yIGEgUmVnRXhwIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgZXh0LnJlZ2V4ICsgJyBnaXZlbic7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgICBpZiAoc2hvd2Rvd24uaGVscGVyLmlzVW5kZWZpbmVkKGV4dC5yZXBsYWNlKSkge1xuICAgICAgICByZXQudmFsaWQgPSBmYWxzZTtcbiAgICAgICAgcmV0LmVycm9yID0gYmFzZU1zZyArICdcInJlZ2V4XCIgZXh0ZW5zaW9ucyBtdXN0IGltcGxlbWVudCBhIHJlcGxhY2Ugc3RyaW5nIG9yIGZ1bmN0aW9uJztcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSBleHRlbnNpb25cbiAqIEBwYXJhbSB7b2JqZWN0fSBleHRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5zaG93ZG93bi52YWxpZGF0ZUV4dGVuc2lvbiA9IGZ1bmN0aW9uIChleHQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB2YWxpZGF0ZUV4dGVuc2lvbiA9IHZhbGlkYXRlKGV4dCwgbnVsbCk7XG4gIGlmICghdmFsaWRhdGVFeHRlbnNpb24udmFsaWQpIHtcbiAgICBjb25zb2xlLndhcm4odmFsaWRhdGVFeHRlbnNpb24uZXJyb3IpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cclxuLyoqXG4gKiBzaG93ZG93bmpzIGhlbHBlciBmdW5jdGlvbnNcbiAqL1xuXG5pZiAoIXNob3dkb3duLmhhc093blByb3BlcnR5KCdoZWxwZXInKSkge1xuICBzaG93ZG93bi5oZWxwZXIgPSB7fTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB2YXIgaXMgc3RyaW5nXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge3N0cmluZ30gYVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbnNob3dkb3duLmhlbHBlci5pc1N0cmluZyA9IGZ1bmN0aW9uIChhKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgcmV0dXJuICh0eXBlb2YgYSA9PT0gJ3N0cmluZycgfHwgYSBpbnN0YW5jZW9mIFN0cmluZyk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHZhciBpcyBhIGZ1bmN0aW9uXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0geyp9IGFcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5zaG93ZG93bi5oZWxwZXIuaXNGdW5jdGlvbiA9IGZ1bmN0aW9uIChhKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIGdldFR5cGUgPSB7fTtcbiAgcmV0dXJuIGEgJiYgZ2V0VHlwZS50b1N0cmluZy5jYWxsKGEpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcblxuLyoqXG4gKiBpc0FycmF5IGhlbHBlciBmdW5jdGlvblxuICogQHN0YXRpY1xuICogQHBhcmFtIHsqfSBhXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuc2hvd2Rvd24uaGVscGVyLmlzQXJyYXkgPSBmdW5jdGlvbiAoYSkge1xuICAndXNlIHN0cmljdCc7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGEpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYHVuZGVmaW5lZGAsIGVsc2UgYGZhbHNlYC5cbiAqL1xuc2hvd2Rvd24uaGVscGVyLmlzVW5kZWZpbmVkID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XG59O1xuXG4vKipcbiAqIEZvckVhY2ggaGVscGVyIGZ1bmN0aW9uXG4gKiBJdGVyYXRlcyBvdmVyIEFycmF5cyBhbmQgT2JqZWN0cyAob3duIHByb3BlcnRpZXMgb25seSlcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBBY2NlcHRzIDMgcGFyYW1zOiAxLiB2YWx1ZSwgMi4ga2V5LCAzLiB0aGUgb3JpZ2luYWwgYXJyYXkvb2JqZWN0XG4gKi9cbnNob3dkb3duLmhlbHBlci5mb3JFYWNoID0gZnVuY3Rpb24gKG9iaiwgY2FsbGJhY2spIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAvLyBjaGVjayBpZiBvYmogaXMgZGVmaW5lZFxuICBpZiAoc2hvd2Rvd24uaGVscGVyLmlzVW5kZWZpbmVkKG9iaikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ29iaiBwYXJhbSBpcyByZXF1aXJlZCcpO1xuICB9XG5cbiAgaWYgKHNob3dkb3duLmhlbHBlci5pc1VuZGVmaW5lZChjYWxsYmFjaykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbGxiYWNrIHBhcmFtIGlzIHJlcXVpcmVkJyk7XG4gIH1cblxuICBpZiAoIXNob3dkb3duLmhlbHBlci5pc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2FsbGJhY2sgcGFyYW0gbXVzdCBiZSBhIGZ1bmN0aW9uL2Nsb3N1cmUnKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqLmZvckVhY2ggPT09ICdmdW5jdGlvbicpIHtcbiAgICBvYmouZm9yRWFjaChjYWxsYmFjayk7XG4gIH0gZWxzZSBpZiAoc2hvd2Rvd24uaGVscGVyLmlzQXJyYXkob2JqKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjYWxsYmFjayhvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiAob2JqKSA9PT0gJ29iamVjdCcpIHtcbiAgICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICBjYWxsYmFjayhvYmpbcHJvcF0sIHByb3AsIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignb2JqIGRvZXMgbm90IHNlZW0gdG8gYmUgYW4gYXJyYXkgb3IgYW4gaXRlcmFibGUgb2JqZWN0Jyk7XG4gIH1cbn07XG5cbi8qKlxuICogU3RhbmRhcmRpZGl6ZSBleHRlbnNpb24gbmFtZVxuICogQHN0YXRpY1xuICogQHBhcmFtIHtzdHJpbmd9IHMgZXh0ZW5zaW9uIG5hbWVcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbnNob3dkb3duLmhlbHBlci5zdGRFeHROYW1lID0gZnVuY3Rpb24gKHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICByZXR1cm4gcy5yZXBsYWNlKC9bXz8qK1xcL1xcXFwuXi1dL2csICcnKS5yZXBsYWNlKC9cXHMvZywgJycpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG5mdW5jdGlvbiBlc2NhcGVDaGFyYWN0ZXJzQ2FsbGJhY2sgKHdob2xlTWF0Y2gsIG0xKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIGNoYXJDb2RlVG9Fc2NhcGUgPSBtMS5jaGFyQ29kZUF0KDApO1xuICByZXR1cm4gJ8KoRScgKyBjaGFyQ29kZVRvRXNjYXBlICsgJ0UnO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIHVzZWQgdG8gZXNjYXBlIGNoYXJhY3RlcnMgd2hlbiBwYXNzaW5nIHRocm91Z2ggU3RyaW5nLnJlcGxhY2VcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7c3RyaW5nfSB3aG9sZU1hdGNoXG4gKiBAcGFyYW0ge3N0cmluZ30gbTFcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbnNob3dkb3duLmhlbHBlci5lc2NhcGVDaGFyYWN0ZXJzQ2FsbGJhY2sgPSBlc2NhcGVDaGFyYWN0ZXJzQ2FsbGJhY2s7XG5cbi8qKlxuICogRXNjYXBlIGNoYXJhY3RlcnMgaW4gYSBzdHJpbmdcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKiBAcGFyYW0ge3N0cmluZ30gY2hhcnNUb0VzY2FwZVxuICogQHBhcmFtIHtib29sZWFufSBhZnRlckJhY2tzbGFzaFxuICogQHJldHVybnMge1hNTHxzdHJpbmd8dm9pZHwqfVxuICovXG5zaG93ZG93bi5oZWxwZXIuZXNjYXBlQ2hhcmFjdGVycyA9IGZ1bmN0aW9uICh0ZXh0LCBjaGFyc1RvRXNjYXBlLCBhZnRlckJhY2tzbGFzaCkge1xuICAndXNlIHN0cmljdCc7XG4gIC8vIEZpcnN0IHdlIGhhdmUgdG8gZXNjYXBlIHRoZSBlc2NhcGUgY2hhcmFjdGVycyBzbyB0aGF0XG4gIC8vIHdlIGNhbiBidWlsZCBhIGNoYXJhY3RlciBjbGFzcyBvdXQgb2YgdGhlbVxuICB2YXIgcmVnZXhTdHJpbmcgPSAnKFsnICsgY2hhcnNUb0VzY2FwZS5yZXBsYWNlKC8oW1xcW1xcXVxcXFxdKS9nLCAnXFxcXCQxJykgKyAnXSknO1xuXG4gIGlmIChhZnRlckJhY2tzbGFzaCkge1xuICAgIHJlZ2V4U3RyaW5nID0gJ1xcXFxcXFxcJyArIHJlZ2V4U3RyaW5nO1xuICB9XG5cbiAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChyZWdleFN0cmluZywgJ2cnKTtcbiAgdGV4dCA9IHRleHQucmVwbGFjZShyZWdleCwgZXNjYXBlQ2hhcmFjdGVyc0NhbGxiYWNrKTtcblxuICByZXR1cm4gdGV4dDtcbn07XG5cbi8qKlxuICogVW5lc2NhcGUgSFRNTCBlbnRpdGllc1xuICogQHBhcmFtIHR4dFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuc2hvd2Rvd24uaGVscGVyLnVuZXNjYXBlSFRNTEVudGl0aWVzID0gZnVuY3Rpb24gKHR4dCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgcmV0dXJuIHR4dFxuICAgIC5yZXBsYWNlKC8mcXVvdDsvZywgJ1wiJylcbiAgICAucmVwbGFjZSgvJmx0Oy9nLCAnPCcpXG4gICAgLnJlcGxhY2UoLyZndDsvZywgJz4nKVxuICAgIC5yZXBsYWNlKC8mYW1wOy9nLCAnJicpO1xufTtcblxudmFyIHJneEZpbmRNYXRjaFBvcyA9IGZ1bmN0aW9uIChzdHIsIGxlZnQsIHJpZ2h0LCBmbGFncykge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBmID0gZmxhZ3MgfHwgJycsXG4gICAgICBnID0gZi5pbmRleE9mKCdnJykgPiAtMSxcbiAgICAgIHggPSBuZXcgUmVnRXhwKGxlZnQgKyAnfCcgKyByaWdodCwgJ2cnICsgZi5yZXBsYWNlKC9nL2csICcnKSksXG4gICAgICBsID0gbmV3IFJlZ0V4cChsZWZ0LCBmLnJlcGxhY2UoL2cvZywgJycpKSxcbiAgICAgIHBvcyA9IFtdLFxuICAgICAgdCwgcywgbSwgc3RhcnQsIGVuZDtcblxuICBkbyB7XG4gICAgdCA9IDA7XG4gICAgd2hpbGUgKChtID0geC5leGVjKHN0cikpKSB7XG4gICAgICBpZiAobC50ZXN0KG1bMF0pKSB7XG4gICAgICAgIGlmICghKHQrKykpIHtcbiAgICAgICAgICBzID0geC5sYXN0SW5kZXg7XG4gICAgICAgICAgc3RhcnQgPSBzIC0gbVswXS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodCkge1xuICAgICAgICBpZiAoIS0tdCkge1xuICAgICAgICAgIGVuZCA9IG0uaW5kZXggKyBtWzBdLmxlbmd0aDtcbiAgICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgbGVmdDoge3N0YXJ0OiBzdGFydCwgZW5kOiBzfSxcbiAgICAgICAgICAgIG1hdGNoOiB7c3RhcnQ6IHMsIGVuZDogbS5pbmRleH0sXG4gICAgICAgICAgICByaWdodDoge3N0YXJ0OiBtLmluZGV4LCBlbmQ6IGVuZH0sXG4gICAgICAgICAgICB3aG9sZU1hdGNoOiB7c3RhcnQ6IHN0YXJ0LCBlbmQ6IGVuZH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIHBvcy5wdXNoKG9iaik7XG4gICAgICAgICAgaWYgKCFnKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9zO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSB3aGlsZSAodCAmJiAoeC5sYXN0SW5kZXggPSBzKSk7XG5cbiAgcmV0dXJuIHBvcztcbn07XG5cbi8qKlxuICogbWF0Y2hSZWN1cnNpdmVSZWdFeHBcbiAqXG4gKiAoYykgMjAwNyBTdGV2ZW4gTGV2aXRoYW4gPHN0ZXZlbmxldml0aGFuLmNvbT5cbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQWNjZXB0cyBhIHN0cmluZyB0byBzZWFyY2gsIGEgbGVmdCBhbmQgcmlnaHQgZm9ybWF0IGRlbGltaXRlclxuICogYXMgcmVnZXggcGF0dGVybnMsIGFuZCBvcHRpb25hbCByZWdleCBmbGFncy4gUmV0dXJucyBhbiBhcnJheVxuICogb2YgbWF0Y2hlcywgYWxsb3dpbmcgbmVzdGVkIGluc3RhbmNlcyBvZiBsZWZ0L3JpZ2h0IGRlbGltaXRlcnMuXG4gKiBVc2UgdGhlIFwiZ1wiIGZsYWcgdG8gcmV0dXJuIGFsbCBtYXRjaGVzLCBvdGhlcndpc2Ugb25seSB0aGVcbiAqIGZpcnN0IGlzIHJldHVybmVkLiBCZSBjYXJlZnVsIHRvIGVuc3VyZSB0aGF0IHRoZSBsZWZ0IGFuZFxuICogcmlnaHQgZm9ybWF0IGRlbGltaXRlcnMgcHJvZHVjZSBtdXR1YWxseSBleGNsdXNpdmUgbWF0Y2hlcy5cbiAqIEJhY2tyZWZlcmVuY2VzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGhpbiB0aGUgcmlnaHQgZGVsaW1pdGVyXG4gKiBkdWUgdG8gaG93IGl0IGlzIGludGVybmFsbHkgY29tYmluZWQgd2l0aCB0aGUgbGVmdCBkZWxpbWl0ZXIuXG4gKiBXaGVuIG1hdGNoaW5nIHN0cmluZ3Mgd2hvc2UgZm9ybWF0IGRlbGltaXRlcnMgYXJlIHVuYmFsYW5jZWRcbiAqIHRvIHRoZSBsZWZ0IG9yIHJpZ2h0LCB0aGUgb3V0cHV0IGlzIGludGVudGlvbmFsbHkgYXMgYVxuICogY29udmVudGlvbmFsIHJlZ2V4IGxpYnJhcnkgd2l0aCByZWN1cnNpb24gc3VwcG9ydCB3b3VsZFxuICogcHJvZHVjZSwgZS5nLiBcIjw8eD5cIiBhbmQgXCI8eD4+XCIgYm90aCBwcm9kdWNlIFtcInhcIl0gd2hlbiB1c2luZ1xuICogXCI8XCIgYW5kIFwiPlwiIGFzIHRoZSBkZWxpbWl0ZXJzIChib3RoIHN0cmluZ3MgY29udGFpbiBhIHNpbmdsZSxcbiAqIGJhbGFuY2VkIGluc3RhbmNlIG9mIFwiPHg+XCIpLlxuICpcbiAqIGV4YW1wbGVzOlxuICogbWF0Y2hSZWN1cnNpdmVSZWdFeHAoXCJ0ZXN0XCIsIFwiXFxcXChcIiwgXCJcXFxcKVwiKVxuICogcmV0dXJuczogW11cbiAqIG1hdGNoUmVjdXJzaXZlUmVnRXhwKFwiPHQ8PGU+PjxzPj50PD5cIiwgXCI8XCIsIFwiPlwiLCBcImdcIilcbiAqIHJldHVybnM6IFtcInQ8PGU+PjxzPlwiLCBcIlwiXVxuICogbWF0Y2hSZWN1cnNpdmVSZWdFeHAoXCI8ZGl2IGlkPVxcXCJ4XFxcIj50ZXN0PC9kaXY+XCIsIFwiPGRpdlxcXFxiW14+XSo+XCIsIFwiPC9kaXY+XCIsIFwiZ2lcIilcbiAqIHJldHVybnM6IFtcInRlc3RcIl1cbiAqL1xuc2hvd2Rvd24uaGVscGVyLm1hdGNoUmVjdXJzaXZlUmVnRXhwID0gZnVuY3Rpb24gKHN0ciwgbGVmdCwgcmlnaHQsIGZsYWdzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbWF0Y2hQb3MgPSByZ3hGaW5kTWF0Y2hQb3MgKHN0ciwgbGVmdCwgcmlnaHQsIGZsYWdzKSxcbiAgICAgIHJlc3VsdHMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG1hdGNoUG9zLmxlbmd0aDsgKytpKSB7XG4gICAgcmVzdWx0cy5wdXNoKFtcbiAgICAgIHN0ci5zbGljZShtYXRjaFBvc1tpXS53aG9sZU1hdGNoLnN0YXJ0LCBtYXRjaFBvc1tpXS53aG9sZU1hdGNoLmVuZCksXG4gICAgICBzdHIuc2xpY2UobWF0Y2hQb3NbaV0ubWF0Y2guc3RhcnQsIG1hdGNoUG9zW2ldLm1hdGNoLmVuZCksXG4gICAgICBzdHIuc2xpY2UobWF0Y2hQb3NbaV0ubGVmdC5zdGFydCwgbWF0Y2hQb3NbaV0ubGVmdC5lbmQpLFxuICAgICAgc3RyLnNsaWNlKG1hdGNoUG9zW2ldLnJpZ2h0LnN0YXJ0LCBtYXRjaFBvc1tpXS5yaWdodC5lbmQpXG4gICAgXSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge3N0cmluZ3xmdW5jdGlvbn0gcmVwbGFjZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsZWZ0XG4gKiBAcGFyYW0ge3N0cmluZ30gcmlnaHRcbiAqIEBwYXJhbSB7c3RyaW5nfSBmbGFnc1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuc2hvd2Rvd24uaGVscGVyLnJlcGxhY2VSZWN1cnNpdmVSZWdFeHAgPSBmdW5jdGlvbiAoc3RyLCByZXBsYWNlbWVudCwgbGVmdCwgcmlnaHQsIGZsYWdzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBpZiAoIXNob3dkb3duLmhlbHBlci5pc0Z1bmN0aW9uKHJlcGxhY2VtZW50KSkge1xuICAgIHZhciByZXBTdHIgPSByZXBsYWNlbWVudDtcbiAgICByZXBsYWNlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiByZXBTdHI7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBtYXRjaFBvcyA9IHJneEZpbmRNYXRjaFBvcyhzdHIsIGxlZnQsIHJpZ2h0LCBmbGFncyksXG4gICAgICBmaW5hbFN0ciA9IHN0cixcbiAgICAgIGxuZyA9IG1hdGNoUG9zLmxlbmd0aDtcblxuICBpZiAobG5nID4gMCkge1xuICAgIHZhciBiaXRzID0gW107XG4gICAgaWYgKG1hdGNoUG9zWzBdLndob2xlTWF0Y2guc3RhcnQgIT09IDApIHtcbiAgICAgIGJpdHMucHVzaChzdHIuc2xpY2UoMCwgbWF0Y2hQb3NbMF0ud2hvbGVNYXRjaC5zdGFydCkpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxuZzsgKytpKSB7XG4gICAgICBiaXRzLnB1c2goXG4gICAgICAgIHJlcGxhY2VtZW50KFxuICAgICAgICAgIHN0ci5zbGljZShtYXRjaFBvc1tpXS53aG9sZU1hdGNoLnN0YXJ0LCBtYXRjaFBvc1tpXS53aG9sZU1hdGNoLmVuZCksXG4gICAgICAgICAgc3RyLnNsaWNlKG1hdGNoUG9zW2ldLm1hdGNoLnN0YXJ0LCBtYXRjaFBvc1tpXS5tYXRjaC5lbmQpLFxuICAgICAgICAgIHN0ci5zbGljZShtYXRjaFBvc1tpXS5sZWZ0LnN0YXJ0LCBtYXRjaFBvc1tpXS5sZWZ0LmVuZCksXG4gICAgICAgICAgc3RyLnNsaWNlKG1hdGNoUG9zW2ldLnJpZ2h0LnN0YXJ0LCBtYXRjaFBvc1tpXS5yaWdodC5lbmQpXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBpZiAoaSA8IGxuZyAtIDEpIHtcbiAgICAgICAgYml0cy5wdXNoKHN0ci5zbGljZShtYXRjaFBvc1tpXS53aG9sZU1hdGNoLmVuZCwgbWF0Y2hQb3NbaSArIDFdLndob2xlTWF0Y2guc3RhcnQpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1hdGNoUG9zW2xuZyAtIDFdLndob2xlTWF0Y2guZW5kIDwgc3RyLmxlbmd0aCkge1xuICAgICAgYml0cy5wdXNoKHN0ci5zbGljZShtYXRjaFBvc1tsbmcgLSAxXS53aG9sZU1hdGNoLmVuZCkpO1xuICAgIH1cbiAgICBmaW5hbFN0ciA9IGJpdHMuam9pbignJyk7XG4gIH1cbiAgcmV0dXJuIGZpbmFsU3RyO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbmRleCB3aXRoaW4gdGhlIHBhc3NlZCBTdHJpbmcgb2JqZWN0IG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgcmVnZXgsXG4gKiBzdGFydGluZyB0aGUgc2VhcmNoIGF0IGZyb21JbmRleC4gUmV0dXJucyAtMSBpZiB0aGUgdmFsdWUgaXMgbm90IGZvdW5kLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgc3RyaW5nIHRvIHNlYXJjaFxuICogQHBhcmFtIHtSZWdFeHB9IHJlZ2V4IFJlZ3VsYXIgZXhwcmVzc2lvbiB0byBzZWFyY2hcbiAqIEBwYXJhbSB7aW50fSBbZnJvbUluZGV4ID0gMF0gSW5kZXggdG8gc3RhcnQgdGhlIHNlYXJjaFxuICogQHJldHVybnMge051bWJlcn1cbiAqIEB0aHJvd3MgSW52YWxpZEFyZ3VtZW50RXJyb3JcbiAqL1xuc2hvd2Rvd24uaGVscGVyLnJlZ2V4SW5kZXhPZiA9IGZ1bmN0aW9uIChzdHIsIHJlZ2V4LCBmcm9tSW5kZXgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBpZiAoIXNob3dkb3duLmhlbHBlci5pc1N0cmluZyhzdHIpKSB7XG4gICAgdGhyb3cgJ0ludmFsaWRBcmd1bWVudEVycm9yOiBmaXJzdCBwYXJhbWV0ZXIgb2Ygc2hvd2Rvd24uaGVscGVyLnJlZ2V4SW5kZXhPZiBmdW5jdGlvbiBtdXN0IGJlIGEgc3RyaW5nJztcbiAgfVxuICBpZiAocmVnZXggaW5zdGFuY2VvZiBSZWdFeHAgPT09IGZhbHNlKSB7XG4gICAgdGhyb3cgJ0ludmFsaWRBcmd1bWVudEVycm9yOiBzZWNvbmQgcGFyYW1ldGVyIG9mIHNob3dkb3duLmhlbHBlci5yZWdleEluZGV4T2YgZnVuY3Rpb24gbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBSZWdFeHAnO1xuICB9XG4gIHZhciBpbmRleE9mID0gc3RyLnN1YnN0cmluZyhmcm9tSW5kZXggfHwgMCkuc2VhcmNoKHJlZ2V4KTtcbiAgcmV0dXJuIChpbmRleE9mID49IDApID8gKGluZGV4T2YgKyAoZnJvbUluZGV4IHx8IDApKSA6IGluZGV4T2Y7XG59O1xuXG4vKipcbiAqIFNwbGl0cyB0aGUgcGFzc2VkIHN0cmluZyBvYmplY3QgYXQgdGhlIGRlZmluZWQgaW5kZXgsIGFuZCByZXR1cm5zIGFuIGFycmF5IGNvbXBvc2VkIG9mIHRoZSB0d28gc3Vic3RyaW5nc1xuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBzdHJpbmcgdG8gc3BsaXRcbiAqIEBwYXJhbSB7aW50fSBpbmRleCBpbmRleCB0byBzcGxpdCBzdHJpbmcgYXRcbiAqIEByZXR1cm5zIHtbc3RyaW5nLHN0cmluZ119XG4gKiBAdGhyb3dzIEludmFsaWRBcmd1bWVudEVycm9yXG4gKi9cbnNob3dkb3duLmhlbHBlci5zcGxpdEF0SW5kZXggPSBmdW5jdGlvbiAoc3RyLCBpbmRleCkge1xuICAndXNlIHN0cmljdCc7XG4gIGlmICghc2hvd2Rvd24uaGVscGVyLmlzU3RyaW5nKHN0cikpIHtcbiAgICB0aHJvdyAnSW52YWxpZEFyZ3VtZW50RXJyb3I6IGZpcnN0IHBhcmFtZXRlciBvZiBzaG93ZG93bi5oZWxwZXIucmVnZXhJbmRleE9mIGZ1bmN0aW9uIG11c3QgYmUgYSBzdHJpbmcnO1xuICB9XG4gIHJldHVybiBbc3RyLnN1YnN0cmluZygwLCBpbmRleCksIHN0ci5zdWJzdHJpbmcoaW5kZXgpXTtcbn07XG5cbi8qKlxuICogT2JmdXNjYXRlIGFuIGUtbWFpbCBhZGRyZXNzIHRocm91Z2ggdGhlIHVzZSBvZiBDaGFyYWN0ZXIgRW50aXRpZXMsXG4gKiB0cmFuc2Zvcm1pbmcgQVNDSUkgY2hhcmFjdGVycyBpbnRvIHRoZWlyIGVxdWl2YWxlbnQgZGVjaW1hbCBvciBoZXggZW50aXRpZXMuXG4gKlxuICogU2luY2UgaXQgaGFzIGEgcmFuZG9tIGNvbXBvbmVudCwgc3Vic2VxdWVudCBjYWxscyB0byB0aGlzIGZ1bmN0aW9uIHByb2R1Y2UgZGlmZmVyZW50IHJlc3VsdHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWFpbFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuc2hvd2Rvd24uaGVscGVyLmVuY29kZUVtYWlsQWRkcmVzcyA9IGZ1bmN0aW9uIChtYWlsKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIGVuY29kZSA9IFtcbiAgICBmdW5jdGlvbiAoY2gpIHtcbiAgICAgIHJldHVybiAnJiMnICsgY2guY2hhckNvZGVBdCgwKSArICc7JztcbiAgICB9LFxuICAgIGZ1bmN0aW9uIChjaCkge1xuICAgICAgcmV0dXJuICcmI3gnICsgY2guY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikgKyAnOyc7XG4gICAgfSxcbiAgICBmdW5jdGlvbiAoY2gpIHtcbiAgICAgIHJldHVybiBjaDtcbiAgICB9XG4gIF07XG5cbiAgbWFpbCA9IG1haWwucmVwbGFjZSgvLi9nLCBmdW5jdGlvbiAoY2gpIHtcbiAgICBpZiAoY2ggPT09ICdAJykge1xuICAgICAgLy8gdGhpcyAqbXVzdCogYmUgZW5jb2RlZC4gSSBpbnNpc3QuXG4gICAgICBjaCA9IGVuY29kZVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV0oY2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgciA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAvLyByb3VnaGx5IDEwJSByYXcsIDQ1JSBoZXgsIDQ1JSBkZWNcbiAgICAgIGNoID0gKFxuICAgICAgICByID4gMC45ID8gZW5jb2RlWzJdKGNoKSA6IHIgPiAwLjQ1ID8gZW5jb2RlWzFdKGNoKSA6IGVuY29kZVswXShjaClcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBjaDtcbiAgfSk7XG5cbiAgcmV0dXJuIG1haWw7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gc3RyXG4gKiBAcGFyYW0gdGFyZ2V0TGVuZ3RoXG4gKiBAcGFyYW0gcGFkU3RyaW5nXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5zaG93ZG93bi5oZWxwZXIucGFkRW5kID0gZnVuY3Rpb24gcGFkRW5kIChzdHIsIHRhcmdldExlbmd0aCwgcGFkU3RyaW5nKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgLypqc2hpbnQgYml0d2lzZTogZmFsc2UqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgc3BhY2UtaW5maXgtb3BzXG4gIHRhcmdldExlbmd0aCA9IHRhcmdldExlbmd0aD4+MDsgLy9mbG9vciBpZiBudW1iZXIgb3IgY29udmVydCBub24tbnVtYmVyIHRvIDA7XG4gIC8qanNoaW50IGJpdHdpc2U6IHRydWUqL1xuICBwYWRTdHJpbmcgPSBTdHJpbmcocGFkU3RyaW5nIHx8ICcgJyk7XG4gIGlmIChzdHIubGVuZ3RoID4gdGFyZ2V0TGVuZ3RoKSB7XG4gICAgcmV0dXJuIFN0cmluZyhzdHIpO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldExlbmd0aCA9IHRhcmdldExlbmd0aCAtIHN0ci5sZW5ndGg7XG4gICAgaWYgKHRhcmdldExlbmd0aCA+IHBhZFN0cmluZy5sZW5ndGgpIHtcbiAgICAgIHBhZFN0cmluZyArPSBwYWRTdHJpbmcucmVwZWF0KHRhcmdldExlbmd0aCAvIHBhZFN0cmluZy5sZW5ndGgpOyAvL2FwcGVuZCB0byBvcmlnaW5hbCB0byBlbnN1cmUgd2UgYXJlIGxvbmdlciB0aGFuIG5lZWRlZFxuICAgIH1cbiAgICByZXR1cm4gU3RyaW5nKHN0cikgKyBwYWRTdHJpbmcuc2xpY2UoMCx0YXJnZXRMZW5ndGgpO1xuICB9XG59O1xuXG4vKipcbiAqIFBPTFlGSUxMU1xuICovXG4vLyB1c2UgdGhpcyBpbnN0ZWFkIG9mIGJ1aWx0aW4gaXMgdW5kZWZpbmVkIGZvciBJRTggY29tcGF0aWJpbGl0eVxuaWYgKHR5cGVvZihjb25zb2xlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgY29uc29sZSA9IHtcbiAgICB3YXJuOiBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAndXNlIHN0cmljdCc7XG4gICAgICBhbGVydChtc2cpO1xuICAgIH0sXG4gICAgbG9nOiBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAndXNlIHN0cmljdCc7XG4gICAgICBhbGVydChtc2cpO1xuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgIHRocm93IG1zZztcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogQ29tbW9uIHJlZ2V4ZXMuXG4gKiBXZSBkZWNsYXJlIHNvbWUgY29tbW9uIHJlZ2V4ZXMgdG8gaW1wcm92ZSBwZXJmb3JtYW5jZVxuICovXG5zaG93ZG93bi5oZWxwZXIucmVnZXhlcyA9IHtcbiAgYXN0ZXJpc2tEYXNoQW5kQ29sb246IC8oWypfOn5dKS9nXG59O1xuXG4vKipcbiAqIEVNT0pJUyBMSVNUXG4gKi9cbnNob3dkb3duLmhlbHBlci5lbW9qaXMgPSB7XG4gICcrMSc6J1xcdWQ4M2RcXHVkYzRkJyxcbiAgJy0xJzonXFx1ZDgzZFxcdWRjNGUnLFxuICAnMTAwJzonXFx1ZDgzZFxcdWRjYWYnLFxuICAnMTIzNCc6J1xcdWQ4M2RcXHVkZDIyJyxcbiAgJzFzdF9wbGFjZV9tZWRhbCc6J1xcdWQ4M2VcXHVkZDQ3JyxcbiAgJzJuZF9wbGFjZV9tZWRhbCc6J1xcdWQ4M2VcXHVkZDQ4JyxcbiAgJzNyZF9wbGFjZV9tZWRhbCc6J1xcdWQ4M2VcXHVkZDQ5JyxcbiAgJzhiYWxsJzonXFx1ZDgzY1xcdWRmYjEnLFxuICAnYSc6J1xcdWQ4M2NcXHVkZDcwXFx1ZmUwZicsXG4gICdhYic6J1xcdWQ4M2NcXHVkZDhlJyxcbiAgJ2FiYyc6J1xcdWQ4M2RcXHVkZDI0JyxcbiAgJ2FiY2QnOidcXHVkODNkXFx1ZGQyMScsXG4gICdhY2NlcHQnOidcXHVkODNjXFx1ZGU1MScsXG4gICdhZXJpYWxfdHJhbXdheSc6J1xcdWQ4M2RcXHVkZWExJyxcbiAgJ2FpcnBsYW5lJzonXFx1MjcwOFxcdWZlMGYnLFxuICAnYWxhcm1fY2xvY2snOidcXHUyM2YwJyxcbiAgJ2FsZW1iaWMnOidcXHUyNjk3XFx1ZmUwZicsXG4gICdhbGllbic6J1xcdWQ4M2RcXHVkYzdkJyxcbiAgJ2FtYnVsYW5jZSc6J1xcdWQ4M2RcXHVkZTkxJyxcbiAgJ2FtcGhvcmEnOidcXHVkODNjXFx1ZGZmYScsXG4gICdhbmNob3InOidcXHUyNjkzXFx1ZmUwZicsXG4gICdhbmdlbCc6J1xcdWQ4M2RcXHVkYzdjJyxcbiAgJ2FuZ2VyJzonXFx1ZDgzZFxcdWRjYTInLFxuICAnYW5ncnknOidcXHVkODNkXFx1ZGUyMCcsXG4gICdhbmd1aXNoZWQnOidcXHVkODNkXFx1ZGUyNycsXG4gICdhbnQnOidcXHVkODNkXFx1ZGMxYycsXG4gICdhcHBsZSc6J1xcdWQ4M2NcXHVkZjRlJyxcbiAgJ2FxdWFyaXVzJzonXFx1MjY1MlxcdWZlMGYnLFxuICAnYXJpZXMnOidcXHUyNjQ4XFx1ZmUwZicsXG4gICdhcnJvd19iYWNrd2FyZCc6J1xcdTI1YzBcXHVmZTBmJyxcbiAgJ2Fycm93X2RvdWJsZV9kb3duJzonXFx1MjNlYycsXG4gICdhcnJvd19kb3VibGVfdXAnOidcXHUyM2ViJyxcbiAgJ2Fycm93X2Rvd24nOidcXHUyYjA3XFx1ZmUwZicsXG4gICdhcnJvd19kb3duX3NtYWxsJzonXFx1ZDgzZFxcdWRkM2QnLFxuICAnYXJyb3dfZm9yd2FyZCc6J1xcdTI1YjZcXHVmZTBmJyxcbiAgJ2Fycm93X2hlYWRpbmdfZG93bic6J1xcdTI5MzVcXHVmZTBmJyxcbiAgJ2Fycm93X2hlYWRpbmdfdXAnOidcXHUyOTM0XFx1ZmUwZicsXG4gICdhcnJvd19sZWZ0JzonXFx1MmIwNVxcdWZlMGYnLFxuICAnYXJyb3dfbG93ZXJfbGVmdCc6J1xcdTIxOTlcXHVmZTBmJyxcbiAgJ2Fycm93X2xvd2VyX3JpZ2h0JzonXFx1MjE5OFxcdWZlMGYnLFxuICAnYXJyb3dfcmlnaHQnOidcXHUyN2ExXFx1ZmUwZicsXG4gICdhcnJvd19yaWdodF9ob29rJzonXFx1MjFhYVxcdWZlMGYnLFxuICAnYXJyb3dfdXAnOidcXHUyYjA2XFx1ZmUwZicsXG4gICdhcnJvd191cF9kb3duJzonXFx1MjE5NVxcdWZlMGYnLFxuICAnYXJyb3dfdXBfc21hbGwnOidcXHVkODNkXFx1ZGQzYycsXG4gICdhcnJvd191cHBlcl9sZWZ0JzonXFx1MjE5NlxcdWZlMGYnLFxuICAnYXJyb3dfdXBwZXJfcmlnaHQnOidcXHUyMTk3XFx1ZmUwZicsXG4gICdhcnJvd3NfY2xvY2t3aXNlJzonXFx1ZDgzZFxcdWRkMDMnLFxuICAnYXJyb3dzX2NvdW50ZXJjbG9ja3dpc2UnOidcXHVkODNkXFx1ZGQwNCcsXG4gICdhcnQnOidcXHVkODNjXFx1ZGZhOCcsXG4gICdhcnRpY3VsYXRlZF9sb3JyeSc6J1xcdWQ4M2RcXHVkZTliJyxcbiAgJ2FydGlmaWNpYWxfc2F0ZWxsaXRlJzonXFx1ZDgzZFxcdWRlZjAnLFxuICAnYXN0b25pc2hlZCc6J1xcdWQ4M2RcXHVkZTMyJyxcbiAgJ2F0aGxldGljX3Nob2UnOidcXHVkODNkXFx1ZGM1ZicsXG4gICdhdG0nOidcXHVkODNjXFx1ZGZlNycsXG4gICdhdG9tX3N5bWJvbCc6J1xcdTI2OWJcXHVmZTBmJyxcbiAgJ2F2b2NhZG8nOidcXHVkODNlXFx1ZGQ1MScsXG4gICdiJzonXFx1ZDgzY1xcdWRkNzFcXHVmZTBmJyxcbiAgJ2JhYnknOidcXHVkODNkXFx1ZGM3NicsXG4gICdiYWJ5X2JvdHRsZSc6J1xcdWQ4M2NcXHVkZjdjJyxcbiAgJ2JhYnlfY2hpY2snOidcXHVkODNkXFx1ZGMyNCcsXG4gICdiYWJ5X3N5bWJvbCc6J1xcdWQ4M2RcXHVkZWJjJyxcbiAgJ2JhY2snOidcXHVkODNkXFx1ZGQxOScsXG4gICdiYWNvbic6J1xcdWQ4M2VcXHVkZDUzJyxcbiAgJ2JhZG1pbnRvbic6J1xcdWQ4M2NcXHVkZmY4JyxcbiAgJ2JhZ2dhZ2VfY2xhaW0nOidcXHVkODNkXFx1ZGVjNCcsXG4gICdiYWd1ZXR0ZV9icmVhZCc6J1xcdWQ4M2VcXHVkZDU2JyxcbiAgJ2JhbGFuY2Vfc2NhbGUnOidcXHUyNjk2XFx1ZmUwZicsXG4gICdiYWxsb29uJzonXFx1ZDgzY1xcdWRmODgnLFxuICAnYmFsbG90X2JveCc6J1xcdWQ4M2RcXHVkZGYzJyxcbiAgJ2JhbGxvdF9ib3hfd2l0aF9jaGVjayc6J1xcdTI2MTFcXHVmZTBmJyxcbiAgJ2JhbWJvbyc6J1xcdWQ4M2NcXHVkZjhkJyxcbiAgJ2JhbmFuYSc6J1xcdWQ4M2NcXHVkZjRjJyxcbiAgJ2JhbmdiYW5nJzonXFx1MjAzY1xcdWZlMGYnLFxuICAnYmFuayc6J1xcdWQ4M2NcXHVkZmU2JyxcbiAgJ2Jhcl9jaGFydCc6J1xcdWQ4M2RcXHVkY2NhJyxcbiAgJ2JhcmJlcic6J1xcdWQ4M2RcXHVkYzg4JyxcbiAgJ2Jhc2ViYWxsJzonXFx1MjZiZVxcdWZlMGYnLFxuICAnYmFza2V0YmFsbCc6J1xcdWQ4M2NcXHVkZmMwJyxcbiAgJ2Jhc2tldGJhbGxfbWFuJzonXFx1MjZmOVxcdWZlMGYnLFxuICAnYmFza2V0YmFsbF93b21hbic6J1xcdTI2ZjlcXHVmZTBmJnp3ajtcXHUyNjQwXFx1ZmUwZicsXG4gICdiYXQnOidcXHVkODNlXFx1ZGQ4NycsXG4gICdiYXRoJzonXFx1ZDgzZFxcdWRlYzAnLFxuICAnYmF0aHR1Yic6J1xcdWQ4M2RcXHVkZWMxJyxcbiAgJ2JhdHRlcnknOidcXHVkODNkXFx1ZGQwYicsXG4gICdiZWFjaF91bWJyZWxsYSc6J1xcdWQ4M2NcXHVkZmQ2JyxcbiAgJ2JlYXInOidcXHVkODNkXFx1ZGMzYicsXG4gICdiZWQnOidcXHVkODNkXFx1ZGVjZicsXG4gICdiZWUnOidcXHVkODNkXFx1ZGMxZCcsXG4gICdiZWVyJzonXFx1ZDgzY1xcdWRmN2EnLFxuICAnYmVlcnMnOidcXHVkODNjXFx1ZGY3YicsXG4gICdiZWV0bGUnOidcXHVkODNkXFx1ZGMxZScsXG4gICdiZWdpbm5lcic6J1xcdWQ4M2RcXHVkZDMwJyxcbiAgJ2JlbGwnOidcXHVkODNkXFx1ZGQxNCcsXG4gICdiZWxsaG9wX2JlbGwnOidcXHVkODNkXFx1ZGVjZScsXG4gICdiZW50byc6J1xcdWQ4M2NcXHVkZjcxJyxcbiAgJ2Jpa2luZ19tYW4nOidcXHVkODNkXFx1ZGViNCcsXG4gICdiaWtlJzonXFx1ZDgzZFxcdWRlYjInLFxuICAnYmlraW5nX3dvbWFuJzonXFx1ZDgzZFxcdWRlYjQmendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ2Jpa2luaSc6J1xcdWQ4M2RcXHVkYzU5JyxcbiAgJ2Jpb2hhemFyZCc6J1xcdTI2MjNcXHVmZTBmJyxcbiAgJ2JpcmQnOidcXHVkODNkXFx1ZGMyNicsXG4gICdiaXJ0aGRheSc6J1xcdWQ4M2NcXHVkZjgyJyxcbiAgJ2JsYWNrX2NpcmNsZSc6J1xcdTI2YWJcXHVmZTBmJyxcbiAgJ2JsYWNrX2ZsYWcnOidcXHVkODNjXFx1ZGZmNCcsXG4gICdibGFja19oZWFydCc6J1xcdWQ4M2RcXHVkZGE0JyxcbiAgJ2JsYWNrX2pva2VyJzonXFx1ZDgzY1xcdWRjY2YnLFxuICAnYmxhY2tfbGFyZ2Vfc3F1YXJlJzonXFx1MmIxYlxcdWZlMGYnLFxuICAnYmxhY2tfbWVkaXVtX3NtYWxsX3NxdWFyZSc6J1xcdTI1ZmVcXHVmZTBmJyxcbiAgJ2JsYWNrX21lZGl1bV9zcXVhcmUnOidcXHUyNWZjXFx1ZmUwZicsXG4gICdibGFja19uaWInOidcXHUyNzEyXFx1ZmUwZicsXG4gICdibGFja19zbWFsbF9zcXVhcmUnOidcXHUyNWFhXFx1ZmUwZicsXG4gICdibGFja19zcXVhcmVfYnV0dG9uJzonXFx1ZDgzZFxcdWRkMzInLFxuICAnYmxvbmRlX21hbic6J1xcdWQ4M2RcXHVkYzcxJyxcbiAgJ2Jsb25kZV93b21hbic6J1xcdWQ4M2RcXHVkYzcxJnp3ajtcXHUyNjQwXFx1ZmUwZicsXG4gICdibG9zc29tJzonXFx1ZDgzY1xcdWRmM2MnLFxuICAnYmxvd2Zpc2gnOidcXHVkODNkXFx1ZGMyMScsXG4gICdibHVlX2Jvb2snOidcXHVkODNkXFx1ZGNkOCcsXG4gICdibHVlX2Nhcic6J1xcdWQ4M2RcXHVkZTk5JyxcbiAgJ2JsdWVfaGVhcnQnOidcXHVkODNkXFx1ZGM5OScsXG4gICdibHVzaCc6J1xcdWQ4M2RcXHVkZTBhJyxcbiAgJ2JvYXInOidcXHVkODNkXFx1ZGMxNycsXG4gICdib2F0JzonXFx1MjZmNVxcdWZlMGYnLFxuICAnYm9tYic6J1xcdWQ4M2RcXHVkY2EzJyxcbiAgJ2Jvb2snOidcXHVkODNkXFx1ZGNkNicsXG4gICdib29rbWFyayc6J1xcdWQ4M2RcXHVkZDE2JyxcbiAgJ2Jvb2ttYXJrX3RhYnMnOidcXHVkODNkXFx1ZGNkMScsXG4gICdib29rcyc6J1xcdWQ4M2RcXHVkY2RhJyxcbiAgJ2Jvb20nOidcXHVkODNkXFx1ZGNhNScsXG4gICdib290JzonXFx1ZDgzZFxcdWRjNjInLFxuICAnYm91cXVldCc6J1xcdWQ4M2RcXHVkYzkwJyxcbiAgJ2Jvd2luZ19tYW4nOidcXHVkODNkXFx1ZGU0NycsXG4gICdib3dfYW5kX2Fycm93JzonXFx1ZDgzY1xcdWRmZjknLFxuICAnYm93aW5nX3dvbWFuJzonXFx1ZDgzZFxcdWRlNDcmendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ2Jvd2xpbmcnOidcXHVkODNjXFx1ZGZiMycsXG4gICdib3hpbmdfZ2xvdmUnOidcXHVkODNlXFx1ZGQ0YScsXG4gICdib3knOidcXHVkODNkXFx1ZGM2NicsXG4gICdicmVhZCc6J1xcdWQ4M2NcXHVkZjVlJyxcbiAgJ2JyaWRlX3dpdGhfdmVpbCc6J1xcdWQ4M2RcXHVkYzcwJyxcbiAgJ2JyaWRnZV9hdF9uaWdodCc6J1xcdWQ4M2NcXHVkZjA5JyxcbiAgJ2JyaWVmY2FzZSc6J1xcdWQ4M2RcXHVkY2JjJyxcbiAgJ2Jyb2tlbl9oZWFydCc6J1xcdWQ4M2RcXHVkYzk0JyxcbiAgJ2J1Zyc6J1xcdWQ4M2RcXHVkYzFiJyxcbiAgJ2J1aWxkaW5nX2NvbnN0cnVjdGlvbic6J1xcdWQ4M2NcXHVkZmQ3JyxcbiAgJ2J1bGInOidcXHVkODNkXFx1ZGNhMScsXG4gICdidWxsZXR0cmFpbl9mcm9udCc6J1xcdWQ4M2RcXHVkZTg1JyxcbiAgJ2J1bGxldHRyYWluX3NpZGUnOidcXHVkODNkXFx1ZGU4NCcsXG4gICdidXJyaXRvJzonXFx1ZDgzY1xcdWRmMmYnLFxuICAnYnVzJzonXFx1ZDgzZFxcdWRlOGMnLFxuICAnYnVzaW5lc3Nfc3VpdF9sZXZpdGF0aW5nJzonXFx1ZDgzZFxcdWRkNzQnLFxuICAnYnVzc3RvcCc6J1xcdWQ4M2RcXHVkZThmJyxcbiAgJ2J1c3RfaW5fc2lsaG91ZXR0ZSc6J1xcdWQ4M2RcXHVkYzY0JyxcbiAgJ2J1c3RzX2luX3NpbGhvdWV0dGUnOidcXHVkODNkXFx1ZGM2NScsXG4gICdidXR0ZXJmbHknOidcXHVkODNlXFx1ZGQ4YicsXG4gICdjYWN0dXMnOidcXHVkODNjXFx1ZGYzNScsXG4gICdjYWtlJzonXFx1ZDgzY1xcdWRmNzAnLFxuICAnY2FsZW5kYXInOidcXHVkODNkXFx1ZGNjNicsXG4gICdjYWxsX21lX2hhbmQnOidcXHVkODNlXFx1ZGQxOScsXG4gICdjYWxsaW5nJzonXFx1ZDgzZFxcdWRjZjInLFxuICAnY2FtZWwnOidcXHVkODNkXFx1ZGMyYicsXG4gICdjYW1lcmEnOidcXHVkODNkXFx1ZGNmNycsXG4gICdjYW1lcmFfZmxhc2gnOidcXHVkODNkXFx1ZGNmOCcsXG4gICdjYW1waW5nJzonXFx1ZDgzY1xcdWRmZDUnLFxuICAnY2FuY2VyJzonXFx1MjY0YlxcdWZlMGYnLFxuICAnY2FuZGxlJzonXFx1ZDgzZFxcdWRkNmYnLFxuICAnY2FuZHknOidcXHVkODNjXFx1ZGY2YycsXG4gICdjYW5vZSc6J1xcdWQ4M2RcXHVkZWY2JyxcbiAgJ2NhcGl0YWxfYWJjZCc6J1xcdWQ4M2RcXHVkZDIwJyxcbiAgJ2NhcHJpY29ybic6J1xcdTI2NTFcXHVmZTBmJyxcbiAgJ2Nhcic6J1xcdWQ4M2RcXHVkZTk3JyxcbiAgJ2NhcmRfZmlsZV9ib3gnOidcXHVkODNkXFx1ZGRjMycsXG4gICdjYXJkX2luZGV4JzonXFx1ZDgzZFxcdWRjYzcnLFxuICAnY2FyZF9pbmRleF9kaXZpZGVycyc6J1xcdWQ4M2RcXHVkZGMyJyxcbiAgJ2Nhcm91c2VsX2hvcnNlJzonXFx1ZDgzY1xcdWRmYTAnLFxuICAnY2Fycm90JzonXFx1ZDgzZVxcdWRkNTUnLFxuICAnY2F0JzonXFx1ZDgzZFxcdWRjMzEnLFxuICAnY2F0Mic6J1xcdWQ4M2RcXHVkYzA4JyxcbiAgJ2NkJzonXFx1ZDgzZFxcdWRjYmYnLFxuICAnY2hhaW5zJzonXFx1MjZkMycsXG4gICdjaGFtcGFnbmUnOidcXHVkODNjXFx1ZGY3ZScsXG4gICdjaGFydCc6J1xcdWQ4M2RcXHVkY2I5JyxcbiAgJ2NoYXJ0X3dpdGhfZG93bndhcmRzX3RyZW5kJzonXFx1ZDgzZFxcdWRjYzknLFxuICAnY2hhcnRfd2l0aF91cHdhcmRzX3RyZW5kJzonXFx1ZDgzZFxcdWRjYzgnLFxuICAnY2hlY2tlcmVkX2ZsYWcnOidcXHVkODNjXFx1ZGZjMScsXG4gICdjaGVlc2UnOidcXHVkODNlXFx1ZGRjMCcsXG4gICdjaGVycmllcyc6J1xcdWQ4M2NcXHVkZjUyJyxcbiAgJ2NoZXJyeV9ibG9zc29tJzonXFx1ZDgzY1xcdWRmMzgnLFxuICAnY2hlc3RudXQnOidcXHVkODNjXFx1ZGYzMCcsXG4gICdjaGlja2VuJzonXFx1ZDgzZFxcdWRjMTQnLFxuICAnY2hpbGRyZW5fY3Jvc3NpbmcnOidcXHVkODNkXFx1ZGViOCcsXG4gICdjaGlwbXVuayc6J1xcdWQ4M2RcXHVkYzNmJyxcbiAgJ2Nob2NvbGF0ZV9iYXInOidcXHVkODNjXFx1ZGY2YicsXG4gICdjaHJpc3RtYXNfdHJlZSc6J1xcdWQ4M2NcXHVkZjg0JyxcbiAgJ2NodXJjaCc6J1xcdTI2ZWFcXHVmZTBmJyxcbiAgJ2NpbmVtYSc6J1xcdWQ4M2NcXHVkZmE2JyxcbiAgJ2NpcmN1c190ZW50JzonXFx1ZDgzY1xcdWRmYWEnLFxuICAnY2l0eV9zdW5yaXNlJzonXFx1ZDgzY1xcdWRmMDcnLFxuICAnY2l0eV9zdW5zZXQnOidcXHVkODNjXFx1ZGYwNicsXG4gICdjaXR5c2NhcGUnOidcXHVkODNjXFx1ZGZkOScsXG4gICdjbCc6J1xcdWQ4M2NcXHVkZDkxJyxcbiAgJ2NsYW1wJzonXFx1ZDgzZFxcdWRkZGMnLFxuICAnY2xhcCc6J1xcdWQ4M2RcXHVkYzRmJyxcbiAgJ2NsYXBwZXInOidcXHVkODNjXFx1ZGZhYycsXG4gICdjbGFzc2ljYWxfYnVpbGRpbmcnOidcXHVkODNjXFx1ZGZkYicsXG4gICdjbGlua2luZ19nbGFzc2VzJzonXFx1ZDgzZVxcdWRkNDInLFxuICAnY2xpcGJvYXJkJzonXFx1ZDgzZFxcdWRjY2InLFxuICAnY2xvY2sxJzonXFx1ZDgzZFxcdWRkNTAnLFxuICAnY2xvY2sxMCc6J1xcdWQ4M2RcXHVkZDU5JyxcbiAgJ2Nsb2NrMTAzMCc6J1xcdWQ4M2RcXHVkZDY1JyxcbiAgJ2Nsb2NrMTEnOidcXHVkODNkXFx1ZGQ1YScsXG4gICdjbG9jazExMzAnOidcXHVkODNkXFx1ZGQ2NicsXG4gICdjbG9jazEyJzonXFx1ZDgzZFxcdWRkNWInLFxuICAnY2xvY2sxMjMwJzonXFx1ZDgzZFxcdWRkNjcnLFxuICAnY2xvY2sxMzAnOidcXHVkODNkXFx1ZGQ1YycsXG4gICdjbG9jazInOidcXHVkODNkXFx1ZGQ1MScsXG4gICdjbG9jazIzMCc6J1xcdWQ4M2RcXHVkZDVkJyxcbiAgJ2Nsb2NrMyc6J1xcdWQ4M2RcXHVkZDUyJyxcbiAgJ2Nsb2NrMzMwJzonXFx1ZDgzZFxcdWRkNWUnLFxuICAnY2xvY2s0JzonXFx1ZDgzZFxcdWRkNTMnLFxuICAnY2xvY2s0MzAnOidcXHVkODNkXFx1ZGQ1ZicsXG4gICdjbG9jazUnOidcXHVkODNkXFx1ZGQ1NCcsXG4gICdjbG9jazUzMCc6J1xcdWQ4M2RcXHVkZDYwJyxcbiAgJ2Nsb2NrNic6J1xcdWQ4M2RcXHVkZDU1JyxcbiAgJ2Nsb2NrNjMwJzonXFx1ZDgzZFxcdWRkNjEnLFxuICAnY2xvY2s3JzonXFx1ZDgzZFxcdWRkNTYnLFxuICAnY2xvY2s3MzAnOidcXHVkODNkXFx1ZGQ2MicsXG4gICdjbG9jazgnOidcXHVkODNkXFx1ZGQ1NycsXG4gICdjbG9jazgzMCc6J1xcdWQ4M2RcXHVkZDYzJyxcbiAgJ2Nsb2NrOSc6J1xcdWQ4M2RcXHVkZDU4JyxcbiAgJ2Nsb2NrOTMwJzonXFx1ZDgzZFxcdWRkNjQnLFxuICAnY2xvc2VkX2Jvb2snOidcXHVkODNkXFx1ZGNkNScsXG4gICdjbG9zZWRfbG9ja193aXRoX2tleSc6J1xcdWQ4M2RcXHVkZDEwJyxcbiAgJ2Nsb3NlZF91bWJyZWxsYSc6J1xcdWQ4M2NcXHVkZjAyJyxcbiAgJ2Nsb3VkJzonXFx1MjYwMVxcdWZlMGYnLFxuICAnY2xvdWRfd2l0aF9saWdodG5pbmcnOidcXHVkODNjXFx1ZGYyOScsXG4gICdjbG91ZF93aXRoX2xpZ2h0bmluZ19hbmRfcmFpbic6J1xcdTI2YzgnLFxuICAnY2xvdWRfd2l0aF9yYWluJzonXFx1ZDgzY1xcdWRmMjcnLFxuICAnY2xvdWRfd2l0aF9zbm93JzonXFx1ZDgzY1xcdWRmMjgnLFxuICAnY2xvd25fZmFjZSc6J1xcdWQ4M2VcXHVkZDIxJyxcbiAgJ2NsdWJzJzonXFx1MjY2M1xcdWZlMGYnLFxuICAnY29ja3RhaWwnOidcXHVkODNjXFx1ZGY3OCcsXG4gICdjb2ZmZWUnOidcXHUyNjE1XFx1ZmUwZicsXG4gICdjb2ZmaW4nOidcXHUyNmIwXFx1ZmUwZicsXG4gICdjb2xkX3N3ZWF0JzonXFx1ZDgzZFxcdWRlMzAnLFxuICAnY29tZXQnOidcXHUyNjA0XFx1ZmUwZicsXG4gICdjb21wdXRlcic6J1xcdWQ4M2RcXHVkY2JiJyxcbiAgJ2NvbXB1dGVyX21vdXNlJzonXFx1ZDgzZFxcdWRkYjEnLFxuICAnY29uZmV0dGlfYmFsbCc6J1xcdWQ4M2NcXHVkZjhhJyxcbiAgJ2NvbmZvdW5kZWQnOidcXHVkODNkXFx1ZGUxNicsXG4gICdjb25mdXNlZCc6J1xcdWQ4M2RcXHVkZTE1JyxcbiAgJ2NvbmdyYXR1bGF0aW9ucyc6J1xcdTMyOTdcXHVmZTBmJyxcbiAgJ2NvbnN0cnVjdGlvbic6J1xcdWQ4M2RcXHVkZWE3JyxcbiAgJ2NvbnN0cnVjdGlvbl93b3JrZXJfbWFuJzonXFx1ZDgzZFxcdWRjNzcnLFxuICAnY29uc3RydWN0aW9uX3dvcmtlcl93b21hbic6J1xcdWQ4M2RcXHVkYzc3Jnp3ajtcXHUyNjQwXFx1ZmUwZicsXG4gICdjb250cm9sX2tub2JzJzonXFx1ZDgzY1xcdWRmOWInLFxuICAnY29udmVuaWVuY2Vfc3RvcmUnOidcXHVkODNjXFx1ZGZlYScsXG4gICdjb29raWUnOidcXHVkODNjXFx1ZGY2YScsXG4gICdjb29sJzonXFx1ZDgzY1xcdWRkOTInLFxuICAncG9saWNlbWFuJzonXFx1ZDgzZFxcdWRjNmUnLFxuICAnY29weXJpZ2h0JzonXFx1MDBhOVxcdWZlMGYnLFxuICAnY29ybic6J1xcdWQ4M2NcXHVkZjNkJyxcbiAgJ2NvdWNoX2FuZF9sYW1wJzonXFx1ZDgzZFxcdWRlY2InLFxuICAnY291cGxlJzonXFx1ZDgzZFxcdWRjNmInLFxuICAnY291cGxlX3dpdGhfaGVhcnRfd29tYW5fbWFuJzonXFx1ZDgzZFxcdWRjOTEnLFxuICAnY291cGxlX3dpdGhfaGVhcnRfbWFuX21hbic6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHUyNzY0XFx1ZmUwZiZ6d2o7XFx1ZDgzZFxcdWRjNjgnLFxuICAnY291cGxlX3dpdGhfaGVhcnRfd29tYW5fd29tYW4nOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1Mjc2NFxcdWZlMGYmendqO1xcdWQ4M2RcXHVkYzY5JyxcbiAgJ2NvdXBsZWtpc3NfbWFuX21hbic6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHUyNzY0XFx1ZmUwZiZ6d2o7XFx1ZDgzZFxcdWRjOGImendqO1xcdWQ4M2RcXHVkYzY4JyxcbiAgJ2NvdXBsZWtpc3NfbWFuX3dvbWFuJzonXFx1ZDgzZFxcdWRjOGYnLFxuICAnY291cGxla2lzc193b21hbl93b21hbic6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHUyNzY0XFx1ZmUwZiZ6d2o7XFx1ZDgzZFxcdWRjOGImendqO1xcdWQ4M2RcXHVkYzY5JyxcbiAgJ2Nvdyc6J1xcdWQ4M2RcXHVkYzJlJyxcbiAgJ2NvdzInOidcXHVkODNkXFx1ZGMwNCcsXG4gICdjb3dib3lfaGF0X2ZhY2UnOidcXHVkODNlXFx1ZGQyMCcsXG4gICdjcmFiJzonXFx1ZDgzZVxcdWRkODAnLFxuICAnY3JheW9uJzonXFx1ZDgzZFxcdWRkOGQnLFxuICAnY3JlZGl0X2NhcmQnOidcXHVkODNkXFx1ZGNiMycsXG4gICdjcmVzY2VudF9tb29uJzonXFx1ZDgzY1xcdWRmMTknLFxuICAnY3JpY2tldCc6J1xcdWQ4M2NcXHVkZmNmJyxcbiAgJ2Nyb2NvZGlsZSc6J1xcdWQ4M2RcXHVkYzBhJyxcbiAgJ2Nyb2lzc2FudCc6J1xcdWQ4M2VcXHVkZDUwJyxcbiAgJ2Nyb3NzZWRfZmluZ2Vycyc6J1xcdWQ4M2VcXHVkZDFlJyxcbiAgJ2Nyb3NzZWRfZmxhZ3MnOidcXHVkODNjXFx1ZGY4YycsXG4gICdjcm9zc2VkX3N3b3Jkcyc6J1xcdTI2OTRcXHVmZTBmJyxcbiAgJ2Nyb3duJzonXFx1ZDgzZFxcdWRjNTEnLFxuICAnY3J5JzonXFx1ZDgzZFxcdWRlMjInLFxuICAnY3J5aW5nX2NhdF9mYWNlJzonXFx1ZDgzZFxcdWRlM2YnLFxuICAnY3J5c3RhbF9iYWxsJzonXFx1ZDgzZFxcdWRkMmUnLFxuICAnY3VjdW1iZXInOidcXHVkODNlXFx1ZGQ1MicsXG4gICdjdXBpZCc6J1xcdWQ4M2RcXHVkYzk4JyxcbiAgJ2N1cmx5X2xvb3AnOidcXHUyN2IwJyxcbiAgJ2N1cnJlbmN5X2V4Y2hhbmdlJzonXFx1ZDgzZFxcdWRjYjEnLFxuICAnY3VycnknOidcXHVkODNjXFx1ZGY1YicsXG4gICdjdXN0YXJkJzonXFx1ZDgzY1xcdWRmNmUnLFxuICAnY3VzdG9tcyc6J1xcdWQ4M2RcXHVkZWMzJyxcbiAgJ2N5Y2xvbmUnOidcXHVkODNjXFx1ZGYwMCcsXG4gICdkYWdnZXInOidcXHVkODNkXFx1ZGRlMScsXG4gICdkYW5jZXInOidcXHVkODNkXFx1ZGM4MycsXG4gICdkYW5jaW5nX3dvbWVuJzonXFx1ZDgzZFxcdWRjNmYnLFxuICAnZGFuY2luZ19tZW4nOidcXHVkODNkXFx1ZGM2ZiZ6d2o7XFx1MjY0MlxcdWZlMGYnLFxuICAnZGFuZ28nOidcXHVkODNjXFx1ZGY2MScsXG4gICdkYXJrX3N1bmdsYXNzZXMnOidcXHVkODNkXFx1ZGQ3NicsXG4gICdkYXJ0JzonXFx1ZDgzY1xcdWRmYWYnLFxuICAnZGFzaCc6J1xcdWQ4M2RcXHVkY2E4JyxcbiAgJ2RhdGUnOidcXHVkODNkXFx1ZGNjNScsXG4gICdkZWNpZHVvdXNfdHJlZSc6J1xcdWQ4M2NcXHVkZjMzJyxcbiAgJ2RlZXInOidcXHVkODNlXFx1ZGQ4YycsXG4gICdkZXBhcnRtZW50X3N0b3JlJzonXFx1ZDgzY1xcdWRmZWMnLFxuICAnZGVyZWxpY3RfaG91c2UnOidcXHVkODNjXFx1ZGZkYScsXG4gICdkZXNlcnQnOidcXHVkODNjXFx1ZGZkYycsXG4gICdkZXNlcnRfaXNsYW5kJzonXFx1ZDgzY1xcdWRmZGQnLFxuICAnZGVza3RvcF9jb21wdXRlcic6J1xcdWQ4M2RcXHVkZGE1JyxcbiAgJ21hbGVfZGV0ZWN0aXZlJzonXFx1ZDgzZFxcdWRkNzVcXHVmZTBmJyxcbiAgJ2RpYW1vbmRfc2hhcGVfd2l0aF9hX2RvdF9pbnNpZGUnOidcXHVkODNkXFx1ZGNhMCcsXG4gICdkaWFtb25kcyc6J1xcdTI2NjZcXHVmZTBmJyxcbiAgJ2Rpc2FwcG9pbnRlZCc6J1xcdWQ4M2RcXHVkZTFlJyxcbiAgJ2Rpc2FwcG9pbnRlZF9yZWxpZXZlZCc6J1xcdWQ4M2RcXHVkZTI1JyxcbiAgJ2Rpenp5JzonXFx1ZDgzZFxcdWRjYWInLFxuICAnZGl6enlfZmFjZSc6J1xcdWQ4M2RcXHVkZTM1JyxcbiAgJ2RvX25vdF9saXR0ZXInOidcXHVkODNkXFx1ZGVhZicsXG4gICdkb2cnOidcXHVkODNkXFx1ZGMzNicsXG4gICdkb2cyJzonXFx1ZDgzZFxcdWRjMTUnLFxuICAnZG9sbGFyJzonXFx1ZDgzZFxcdWRjYjUnLFxuICAnZG9sbHMnOidcXHVkODNjXFx1ZGY4ZScsXG4gICdkb2xwaGluJzonXFx1ZDgzZFxcdWRjMmMnLFxuICAnZG9vcic6J1xcdWQ4M2RcXHVkZWFhJyxcbiAgJ2RvdWdobnV0JzonXFx1ZDgzY1xcdWRmNjknLFxuICAnZG92ZSc6J1xcdWQ4M2RcXHVkZDRhJyxcbiAgJ2RyYWdvbic6J1xcdWQ4M2RcXHVkYzA5JyxcbiAgJ2RyYWdvbl9mYWNlJzonXFx1ZDgzZFxcdWRjMzInLFxuICAnZHJlc3MnOidcXHVkODNkXFx1ZGM1NycsXG4gICdkcm9tZWRhcnlfY2FtZWwnOidcXHVkODNkXFx1ZGMyYScsXG4gICdkcm9vbGluZ19mYWNlJzonXFx1ZDgzZVxcdWRkMjQnLFxuICAnZHJvcGxldCc6J1xcdWQ4M2RcXHVkY2E3JyxcbiAgJ2RydW0nOidcXHVkODNlXFx1ZGQ0MScsXG4gICdkdWNrJzonXFx1ZDgzZVxcdWRkODYnLFxuICAnZHZkJzonXFx1ZDgzZFxcdWRjYzAnLFxuICAnZS1tYWlsJzonXFx1ZDgzZFxcdWRjZTcnLFxuICAnZWFnbGUnOidcXHVkODNlXFx1ZGQ4NScsXG4gICdlYXInOidcXHVkODNkXFx1ZGM0MicsXG4gICdlYXJfb2ZfcmljZSc6J1xcdWQ4M2NcXHVkZjNlJyxcbiAgJ2VhcnRoX2FmcmljYSc6J1xcdWQ4M2NcXHVkZjBkJyxcbiAgJ2VhcnRoX2FtZXJpY2FzJzonXFx1ZDgzY1xcdWRmMGUnLFxuICAnZWFydGhfYXNpYSc6J1xcdWQ4M2NcXHVkZjBmJyxcbiAgJ2VnZyc6J1xcdWQ4M2VcXHVkZDVhJyxcbiAgJ2VnZ3BsYW50JzonXFx1ZDgzY1xcdWRmNDYnLFxuICAnZWlnaHRfcG9pbnRlZF9ibGFja19zdGFyJzonXFx1MjczNFxcdWZlMGYnLFxuICAnZWlnaHRfc3Bva2VkX2FzdGVyaXNrJzonXFx1MjczM1xcdWZlMGYnLFxuICAnZWxlY3RyaWNfcGx1Zyc6J1xcdWQ4M2RcXHVkZDBjJyxcbiAgJ2VsZXBoYW50JzonXFx1ZDgzZFxcdWRjMTgnLFxuICAnZW1haWwnOidcXHUyNzA5XFx1ZmUwZicsXG4gICdlbmQnOidcXHVkODNkXFx1ZGQxYScsXG4gICdlbnZlbG9wZV93aXRoX2Fycm93JzonXFx1ZDgzZFxcdWRjZTknLFxuICAnZXVybyc6J1xcdWQ4M2RcXHVkY2I2JyxcbiAgJ2V1cm9wZWFuX2Nhc3RsZSc6J1xcdWQ4M2NcXHVkZmYwJyxcbiAgJ2V1cm9wZWFuX3Bvc3Rfb2ZmaWNlJzonXFx1ZDgzY1xcdWRmZTQnLFxuICAnZXZlcmdyZWVuX3RyZWUnOidcXHVkODNjXFx1ZGYzMicsXG4gICdleGNsYW1hdGlvbic6J1xcdTI3NTdcXHVmZTBmJyxcbiAgJ2V4cHJlc3Npb25sZXNzJzonXFx1ZDgzZFxcdWRlMTEnLFxuICAnZXllJzonXFx1ZDgzZFxcdWRjNDEnLFxuICAnZXllX3NwZWVjaF9idWJibGUnOidcXHVkODNkXFx1ZGM0MSZ6d2o7XFx1ZDgzZFxcdWRkZTgnLFxuICAnZXllZ2xhc3Nlcyc6J1xcdWQ4M2RcXHVkYzUzJyxcbiAgJ2V5ZXMnOidcXHVkODNkXFx1ZGM0MCcsXG4gICdmYWNlX3dpdGhfaGVhZF9iYW5kYWdlJzonXFx1ZDgzZVxcdWRkMTUnLFxuICAnZmFjZV93aXRoX3RoZXJtb21ldGVyJzonXFx1ZDgzZVxcdWRkMTInLFxuICAnZmlzdF9vbmNvbWluZyc6J1xcdWQ4M2RcXHVkYzRhJyxcbiAgJ2ZhY3RvcnknOidcXHVkODNjXFx1ZGZlZCcsXG4gICdmYWxsZW5fbGVhZic6J1xcdWQ4M2NcXHVkZjQyJyxcbiAgJ2ZhbWlseV9tYW5fd29tYW5fYm95JzonXFx1ZDgzZFxcdWRjNmEnLFxuICAnZmFtaWx5X21hbl9ib3knOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzZFxcdWRjNjYnLFxuICAnZmFtaWx5X21hbl9ib3lfYm95JzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2RcXHVkYzY2Jnp3ajtcXHVkODNkXFx1ZGM2NicsXG4gICdmYW1pbHlfbWFuX2dpcmwnOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzZFxcdWRjNjcnLFxuICAnZmFtaWx5X21hbl9naXJsX2JveSc6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNkXFx1ZGM2NyZ6d2o7XFx1ZDgzZFxcdWRjNjYnLFxuICAnZmFtaWx5X21hbl9naXJsX2dpcmwnOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzZFxcdWRjNjcmendqO1xcdWQ4M2RcXHVkYzY3JyxcbiAgJ2ZhbWlseV9tYW5fbWFuX2JveSc6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzZFxcdWRjNjYnLFxuICAnZmFtaWx5X21hbl9tYW5fYm95X2JveSc6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzZFxcdWRjNjYmendqO1xcdWQ4M2RcXHVkYzY2JyxcbiAgJ2ZhbWlseV9tYW5fbWFuX2dpcmwnOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2RcXHVkYzY3JyxcbiAgJ2ZhbWlseV9tYW5fbWFuX2dpcmxfYm95JzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNkXFx1ZGM2NyZ6d2o7XFx1ZDgzZFxcdWRjNjYnLFxuICAnZmFtaWx5X21hbl9tYW5fZ2lybF9naXJsJzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNkXFx1ZGM2NyZ6d2o7XFx1ZDgzZFxcdWRjNjcnLFxuICAnZmFtaWx5X21hbl93b21hbl9ib3lfYm95JzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNkXFx1ZGM2NiZ6d2o7XFx1ZDgzZFxcdWRjNjYnLFxuICAnZmFtaWx5X21hbl93b21hbl9naXJsJzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNkXFx1ZGM2NycsXG4gICdmYW1pbHlfbWFuX3dvbWFuX2dpcmxfYm95JzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNkXFx1ZGM2NyZ6d2o7XFx1ZDgzZFxcdWRjNjYnLFxuICAnZmFtaWx5X21hbl93b21hbl9naXJsX2dpcmwnOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2RcXHVkYzY3Jnp3ajtcXHVkODNkXFx1ZGM2NycsXG4gICdmYW1pbHlfd29tYW5fYm95JzonXFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2RcXHVkYzY2JyxcbiAgJ2ZhbWlseV93b21hbl9ib3lfYm95JzonXFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2RcXHVkYzY2Jnp3ajtcXHVkODNkXFx1ZGM2NicsXG4gICdmYW1pbHlfd29tYW5fZ2lybCc6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNkXFx1ZGM2NycsXG4gICdmYW1pbHlfd29tYW5fZ2lybF9ib3knOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzZFxcdWRjNjcmendqO1xcdWQ4M2RcXHVkYzY2JyxcbiAgJ2ZhbWlseV93b21hbl9naXJsX2dpcmwnOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzZFxcdWRjNjcmendqO1xcdWQ4M2RcXHVkYzY3JyxcbiAgJ2ZhbWlseV93b21hbl93b21hbl9ib3knOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2RcXHVkYzY2JyxcbiAgJ2ZhbWlseV93b21hbl93b21hbl9ib3lfYm95JzonXFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNkXFx1ZGM2NiZ6d2o7XFx1ZDgzZFxcdWRjNjYnLFxuICAnZmFtaWx5X3dvbWFuX3dvbWFuX2dpcmwnOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2RcXHVkYzY3JyxcbiAgJ2ZhbWlseV93b21hbl93b21hbl9naXJsX2JveSc6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzZFxcdWRjNjcmendqO1xcdWQ4M2RcXHVkYzY2JyxcbiAgJ2ZhbWlseV93b21hbl93b21hbl9naXJsX2dpcmwnOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2RcXHVkYzY3Jnp3ajtcXHVkODNkXFx1ZGM2NycsXG4gICdmYXN0X2ZvcndhcmQnOidcXHUyM2U5JyxcbiAgJ2ZheCc6J1xcdWQ4M2RcXHVkY2UwJyxcbiAgJ2ZlYXJmdWwnOidcXHVkODNkXFx1ZGUyOCcsXG4gICdmZWV0JzonXFx1ZDgzZFxcdWRjM2UnLFxuICAnZmVtYWxlX2RldGVjdGl2ZSc6J1xcdWQ4M2RcXHVkZDc1XFx1ZmUwZiZ6d2o7XFx1MjY0MFxcdWZlMGYnLFxuICAnZmVycmlzX3doZWVsJzonXFx1ZDgzY1xcdWRmYTEnLFxuICAnZmVycnknOidcXHUyNmY0JyxcbiAgJ2ZpZWxkX2hvY2tleSc6J1xcdWQ4M2NcXHVkZmQxJyxcbiAgJ2ZpbGVfY2FiaW5ldCc6J1xcdWQ4M2RcXHVkZGM0JyxcbiAgJ2ZpbGVfZm9sZGVyJzonXFx1ZDgzZFxcdWRjYzEnLFxuICAnZmlsbV9wcm9qZWN0b3InOidcXHVkODNkXFx1ZGNmZCcsXG4gICdmaWxtX3N0cmlwJzonXFx1ZDgzY1xcdWRmOWUnLFxuICAnZmlyZSc6J1xcdWQ4M2RcXHVkZDI1JyxcbiAgJ2ZpcmVfZW5naW5lJzonXFx1ZDgzZFxcdWRlOTInLFxuICAnZmlyZXdvcmtzJzonXFx1ZDgzY1xcdWRmODYnLFxuICAnZmlyc3RfcXVhcnRlcl9tb29uJzonXFx1ZDgzY1xcdWRmMTMnLFxuICAnZmlyc3RfcXVhcnRlcl9tb29uX3dpdGhfZmFjZSc6J1xcdWQ4M2NcXHVkZjFiJyxcbiAgJ2Zpc2gnOidcXHVkODNkXFx1ZGMxZicsXG4gICdmaXNoX2Nha2UnOidcXHVkODNjXFx1ZGY2NScsXG4gICdmaXNoaW5nX3BvbGVfYW5kX2Zpc2gnOidcXHVkODNjXFx1ZGZhMycsXG4gICdmaXN0X3JhaXNlZCc6J1xcdTI3MGEnLFxuICAnZmlzdF9sZWZ0JzonXFx1ZDgzZVxcdWRkMWInLFxuICAnZmlzdF9yaWdodCc6J1xcdWQ4M2VcXHVkZDFjJyxcbiAgJ2ZsYWdzJzonXFx1ZDgzY1xcdWRmOGYnLFxuICAnZmxhc2hsaWdodCc6J1xcdWQ4M2RcXHVkZDI2JyxcbiAgJ2ZsZXVyX2RlX2xpcyc6J1xcdTI2OWNcXHVmZTBmJyxcbiAgJ2ZsaWdodF9hcnJpdmFsJzonXFx1ZDgzZFxcdWRlZWMnLFxuICAnZmxpZ2h0X2RlcGFydHVyZSc6J1xcdWQ4M2RcXHVkZWViJyxcbiAgJ2Zsb3BweV9kaXNrJzonXFx1ZDgzZFxcdWRjYmUnLFxuICAnZmxvd2VyX3BsYXlpbmdfY2FyZHMnOidcXHVkODNjXFx1ZGZiNCcsXG4gICdmbHVzaGVkJzonXFx1ZDgzZFxcdWRlMzMnLFxuICAnZm9nJzonXFx1ZDgzY1xcdWRmMmInLFxuICAnZm9nZ3knOidcXHVkODNjXFx1ZGYwMScsXG4gICdmb290YmFsbCc6J1xcdWQ4M2NcXHVkZmM4JyxcbiAgJ2Zvb3RwcmludHMnOidcXHVkODNkXFx1ZGM2MycsXG4gICdmb3JrX2FuZF9rbmlmZSc6J1xcdWQ4M2NcXHVkZjc0JyxcbiAgJ2ZvdW50YWluJzonXFx1MjZmMlxcdWZlMGYnLFxuICAnZm91bnRhaW5fcGVuJzonXFx1ZDgzZFxcdWRkOGInLFxuICAnZm91cl9sZWFmX2Nsb3Zlcic6J1xcdWQ4M2NcXHVkZjQwJyxcbiAgJ2ZveF9mYWNlJzonXFx1ZDgzZVxcdWRkOGEnLFxuICAnZnJhbWVkX3BpY3R1cmUnOidcXHVkODNkXFx1ZGRiYycsXG4gICdmcmVlJzonXFx1ZDgzY1xcdWRkOTMnLFxuICAnZnJpZWRfZWdnJzonXFx1ZDgzY1xcdWRmNzMnLFxuICAnZnJpZWRfc2hyaW1wJzonXFx1ZDgzY1xcdWRmNjQnLFxuICAnZnJpZXMnOidcXHVkODNjXFx1ZGY1ZicsXG4gICdmcm9nJzonXFx1ZDgzZFxcdWRjMzgnLFxuICAnZnJvd25pbmcnOidcXHVkODNkXFx1ZGUyNicsXG4gICdmcm93bmluZ19mYWNlJzonXFx1MjYzOVxcdWZlMGYnLFxuICAnZnJvd25pbmdfbWFuJzonXFx1ZDgzZFxcdWRlNGQmendqO1xcdTI2NDJcXHVmZTBmJyxcbiAgJ2Zyb3duaW5nX3dvbWFuJzonXFx1ZDgzZFxcdWRlNGQnLFxuICAnbWlkZGxlX2Zpbmdlcic6J1xcdWQ4M2RcXHVkZDk1JyxcbiAgJ2Z1ZWxwdW1wJzonXFx1MjZmZFxcdWZlMGYnLFxuICAnZnVsbF9tb29uJzonXFx1ZDgzY1xcdWRmMTUnLFxuICAnZnVsbF9tb29uX3dpdGhfZmFjZSc6J1xcdWQ4M2NcXHVkZjFkJyxcbiAgJ2Z1bmVyYWxfdXJuJzonXFx1MjZiMVxcdWZlMGYnLFxuICAnZ2FtZV9kaWUnOidcXHVkODNjXFx1ZGZiMicsXG4gICdnZWFyJzonXFx1MjY5OVxcdWZlMGYnLFxuICAnZ2VtJzonXFx1ZDgzZFxcdWRjOGUnLFxuICAnZ2VtaW5pJzonXFx1MjY0YVxcdWZlMGYnLFxuICAnZ2hvc3QnOidcXHVkODNkXFx1ZGM3YicsXG4gICdnaWZ0JzonXFx1ZDgzY1xcdWRmODEnLFxuICAnZ2lmdF9oZWFydCc6J1xcdWQ4M2RcXHVkYzlkJyxcbiAgJ2dpcmwnOidcXHVkODNkXFx1ZGM2NycsXG4gICdnbG9iZV93aXRoX21lcmlkaWFucyc6J1xcdWQ4M2NcXHVkZjEwJyxcbiAgJ2dvYWxfbmV0JzonXFx1ZDgzZVxcdWRkNDUnLFxuICAnZ29hdCc6J1xcdWQ4M2RcXHVkYzEwJyxcbiAgJ2dvbGYnOidcXHUyNmYzXFx1ZmUwZicsXG4gICdnb2xmaW5nX21hbic6J1xcdWQ4M2NcXHVkZmNjXFx1ZmUwZicsXG4gICdnb2xmaW5nX3dvbWFuJzonXFx1ZDgzY1xcdWRmY2NcXHVmZTBmJnp3ajtcXHUyNjQwXFx1ZmUwZicsXG4gICdnb3JpbGxhJzonXFx1ZDgzZVxcdWRkOGQnLFxuICAnZ3JhcGVzJzonXFx1ZDgzY1xcdWRmNDcnLFxuICAnZ3JlZW5fYXBwbGUnOidcXHVkODNjXFx1ZGY0ZicsXG4gICdncmVlbl9ib29rJzonXFx1ZDgzZFxcdWRjZDcnLFxuICAnZ3JlZW5faGVhcnQnOidcXHVkODNkXFx1ZGM5YScsXG4gICdncmVlbl9zYWxhZCc6J1xcdWQ4M2VcXHVkZDU3JyxcbiAgJ2dyZXlfZXhjbGFtYXRpb24nOidcXHUyNzU1JyxcbiAgJ2dyZXlfcXVlc3Rpb24nOidcXHUyNzU0JyxcbiAgJ2dyaW1hY2luZyc6J1xcdWQ4M2RcXHVkZTJjJyxcbiAgJ2dyaW4nOidcXHVkODNkXFx1ZGUwMScsXG4gICdncmlubmluZyc6J1xcdWQ4M2RcXHVkZTAwJyxcbiAgJ2d1YXJkc21hbic6J1xcdWQ4M2RcXHVkYzgyJyxcbiAgJ2d1YXJkc3dvbWFuJzonXFx1ZDgzZFxcdWRjODImendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ2d1aXRhcic6J1xcdWQ4M2NcXHVkZmI4JyxcbiAgJ2d1bic6J1xcdWQ4M2RcXHVkZDJiJyxcbiAgJ2hhaXJjdXRfd29tYW4nOidcXHVkODNkXFx1ZGM4NycsXG4gICdoYWlyY3V0X21hbic6J1xcdWQ4M2RcXHVkYzg3Jnp3ajtcXHUyNjQyXFx1ZmUwZicsXG4gICdoYW1idXJnZXInOidcXHVkODNjXFx1ZGY1NCcsXG4gICdoYW1tZXInOidcXHVkODNkXFx1ZGQyOCcsXG4gICdoYW1tZXJfYW5kX3BpY2snOidcXHUyNjkyJyxcbiAgJ2hhbW1lcl9hbmRfd3JlbmNoJzonXFx1ZDgzZFxcdWRlZTAnLFxuICAnaGFtc3Rlcic6J1xcdWQ4M2RcXHVkYzM5JyxcbiAgJ2hhbmQnOidcXHUyNzBiJyxcbiAgJ2hhbmRiYWcnOidcXHVkODNkXFx1ZGM1YycsXG4gICdoYW5kc2hha2UnOidcXHVkODNlXFx1ZGQxZCcsXG4gICdoYW5rZXknOidcXHVkODNkXFx1ZGNhOScsXG4gICdoYXRjaGVkX2NoaWNrJzonXFx1ZDgzZFxcdWRjMjUnLFxuICAnaGF0Y2hpbmdfY2hpY2snOidcXHVkODNkXFx1ZGMyMycsXG4gICdoZWFkcGhvbmVzJzonXFx1ZDgzY1xcdWRmYTcnLFxuICAnaGVhcl9ub19ldmlsJzonXFx1ZDgzZFxcdWRlNDknLFxuICAnaGVhcnQnOidcXHUyNzY0XFx1ZmUwZicsXG4gICdoZWFydF9kZWNvcmF0aW9uJzonXFx1ZDgzZFxcdWRjOWYnLFxuICAnaGVhcnRfZXllcyc6J1xcdWQ4M2RcXHVkZTBkJyxcbiAgJ2hlYXJ0X2V5ZXNfY2F0JzonXFx1ZDgzZFxcdWRlM2InLFxuICAnaGVhcnRiZWF0JzonXFx1ZDgzZFxcdWRjOTMnLFxuICAnaGVhcnRwdWxzZSc6J1xcdWQ4M2RcXHVkYzk3JyxcbiAgJ2hlYXJ0cyc6J1xcdTI2NjVcXHVmZTBmJyxcbiAgJ2hlYXZ5X2NoZWNrX21hcmsnOidcXHUyNzE0XFx1ZmUwZicsXG4gICdoZWF2eV9kaXZpc2lvbl9zaWduJzonXFx1Mjc5NycsXG4gICdoZWF2eV9kb2xsYXJfc2lnbic6J1xcdWQ4M2RcXHVkY2IyJyxcbiAgJ2hlYXZ5X2hlYXJ0X2V4Y2xhbWF0aW9uJzonXFx1Mjc2M1xcdWZlMGYnLFxuICAnaGVhdnlfbWludXNfc2lnbic6J1xcdTI3OTYnLFxuICAnaGVhdnlfbXVsdGlwbGljYXRpb25feCc6J1xcdTI3MTZcXHVmZTBmJyxcbiAgJ2hlYXZ5X3BsdXNfc2lnbic6J1xcdTI3OTUnLFxuICAnaGVsaWNvcHRlcic6J1xcdWQ4M2RcXHVkZTgxJyxcbiAgJ2hlcmInOidcXHVkODNjXFx1ZGYzZicsXG4gICdoaWJpc2N1cyc6J1xcdWQ4M2NcXHVkZjNhJyxcbiAgJ2hpZ2hfYnJpZ2h0bmVzcyc6J1xcdWQ4M2RcXHVkZDA2JyxcbiAgJ2hpZ2hfaGVlbCc6J1xcdWQ4M2RcXHVkYzYwJyxcbiAgJ2hvY2hvJzonXFx1ZDgzZFxcdWRkMmEnLFxuICAnaG9sZSc6J1xcdWQ4M2RcXHVkZDczJyxcbiAgJ2hvbmV5X3BvdCc6J1xcdWQ4M2NcXHVkZjZmJyxcbiAgJ2hvcnNlJzonXFx1ZDgzZFxcdWRjMzQnLFxuICAnaG9yc2VfcmFjaW5nJzonXFx1ZDgzY1xcdWRmYzcnLFxuICAnaG9zcGl0YWwnOidcXHVkODNjXFx1ZGZlNScsXG4gICdob3RfcGVwcGVyJzonXFx1ZDgzY1xcdWRmMzYnLFxuICAnaG90ZG9nJzonXFx1ZDgzY1xcdWRmMmQnLFxuICAnaG90ZWwnOidcXHVkODNjXFx1ZGZlOCcsXG4gICdob3RzcHJpbmdzJzonXFx1MjY2OFxcdWZlMGYnLFxuICAnaG91cmdsYXNzJzonXFx1MjMxYlxcdWZlMGYnLFxuICAnaG91cmdsYXNzX2Zsb3dpbmdfc2FuZCc6J1xcdTIzZjMnLFxuICAnaG91c2UnOidcXHVkODNjXFx1ZGZlMCcsXG4gICdob3VzZV93aXRoX2dhcmRlbic6J1xcdWQ4M2NcXHVkZmUxJyxcbiAgJ2hvdXNlcyc6J1xcdWQ4M2NcXHVkZmQ4JyxcbiAgJ2h1Z3MnOidcXHVkODNlXFx1ZGQxNycsXG4gICdodXNoZWQnOidcXHVkODNkXFx1ZGUyZicsXG4gICdpY2VfY3JlYW0nOidcXHVkODNjXFx1ZGY2OCcsXG4gICdpY2VfaG9ja2V5JzonXFx1ZDgzY1xcdWRmZDInLFxuICAnaWNlX3NrYXRlJzonXFx1MjZmOCcsXG4gICdpY2VjcmVhbSc6J1xcdWQ4M2NcXHVkZjY2JyxcbiAgJ2lkJzonXFx1ZDgzY1xcdWRkOTQnLFxuICAnaWRlb2dyYXBoX2FkdmFudGFnZSc6J1xcdWQ4M2NcXHVkZTUwJyxcbiAgJ2ltcCc6J1xcdWQ4M2RcXHVkYzdmJyxcbiAgJ2luYm94X3RyYXknOidcXHVkODNkXFx1ZGNlNScsXG4gICdpbmNvbWluZ19lbnZlbG9wZSc6J1xcdWQ4M2RcXHVkY2U4JyxcbiAgJ3RpcHBpbmdfaGFuZF93b21hbic6J1xcdWQ4M2RcXHVkYzgxJyxcbiAgJ2luZm9ybWF0aW9uX3NvdXJjZSc6J1xcdTIxMzlcXHVmZTBmJyxcbiAgJ2lubm9jZW50JzonXFx1ZDgzZFxcdWRlMDcnLFxuICAnaW50ZXJyb2JhbmcnOidcXHUyMDQ5XFx1ZmUwZicsXG4gICdpcGhvbmUnOidcXHVkODNkXFx1ZGNmMScsXG4gICdpemFrYXlhX2xhbnRlcm4nOidcXHVkODNjXFx1ZGZlZScsXG4gICdqYWNrX29fbGFudGVybic6J1xcdWQ4M2NcXHVkZjgzJyxcbiAgJ2phcGFuJzonXFx1ZDgzZFxcdWRkZmUnLFxuICAnamFwYW5lc2VfY2FzdGxlJzonXFx1ZDgzY1xcdWRmZWYnLFxuICAnamFwYW5lc2VfZ29ibGluJzonXFx1ZDgzZFxcdWRjN2EnLFxuICAnamFwYW5lc2Vfb2dyZSc6J1xcdWQ4M2RcXHVkYzc5JyxcbiAgJ2plYW5zJzonXFx1ZDgzZFxcdWRjNTYnLFxuICAnam95JzonXFx1ZDgzZFxcdWRlMDInLFxuICAnam95X2NhdCc6J1xcdWQ4M2RcXHVkZTM5JyxcbiAgJ2pveXN0aWNrJzonXFx1ZDgzZFxcdWRkNzknLFxuICAna2FhYmEnOidcXHVkODNkXFx1ZGQ0YicsXG4gICdrZXknOidcXHVkODNkXFx1ZGQxMScsXG4gICdrZXlib2FyZCc6J1xcdTIzMjhcXHVmZTBmJyxcbiAgJ2tleWNhcF90ZW4nOidcXHVkODNkXFx1ZGQxZicsXG4gICdraWNrX3Njb290ZXInOidcXHVkODNkXFx1ZGVmNCcsXG4gICdraW1vbm8nOidcXHVkODNkXFx1ZGM1OCcsXG4gICdraXNzJzonXFx1ZDgzZFxcdWRjOGInLFxuICAna2lzc2luZyc6J1xcdWQ4M2RcXHVkZTE3JyxcbiAgJ2tpc3NpbmdfY2F0JzonXFx1ZDgzZFxcdWRlM2QnLFxuICAna2lzc2luZ19jbG9zZWRfZXllcyc6J1xcdWQ4M2RcXHVkZTFhJyxcbiAgJ2tpc3NpbmdfaGVhcnQnOidcXHVkODNkXFx1ZGUxOCcsXG4gICdraXNzaW5nX3NtaWxpbmdfZXllcyc6J1xcdWQ4M2RcXHVkZTE5JyxcbiAgJ2tpd2lfZnJ1aXQnOidcXHVkODNlXFx1ZGQ1ZCcsXG4gICdrb2FsYSc6J1xcdWQ4M2RcXHVkYzI4JyxcbiAgJ2tva28nOidcXHVkODNjXFx1ZGUwMScsXG4gICdsYWJlbCc6J1xcdWQ4M2NcXHVkZmY3JyxcbiAgJ2xhcmdlX2JsdWVfY2lyY2xlJzonXFx1ZDgzZFxcdWRkMzUnLFxuICAnbGFyZ2VfYmx1ZV9kaWFtb25kJzonXFx1ZDgzZFxcdWRkMzcnLFxuICAnbGFyZ2Vfb3JhbmdlX2RpYW1vbmQnOidcXHVkODNkXFx1ZGQzNicsXG4gICdsYXN0X3F1YXJ0ZXJfbW9vbic6J1xcdWQ4M2NcXHVkZjE3JyxcbiAgJ2xhc3RfcXVhcnRlcl9tb29uX3dpdGhfZmFjZSc6J1xcdWQ4M2NcXHVkZjFjJyxcbiAgJ2xhdGluX2Nyb3NzJzonXFx1MjcxZFxcdWZlMGYnLFxuICAnbGF1Z2hpbmcnOidcXHVkODNkXFx1ZGUwNicsXG4gICdsZWF2ZXMnOidcXHVkODNjXFx1ZGY0MycsXG4gICdsZWRnZXInOidcXHVkODNkXFx1ZGNkMicsXG4gICdsZWZ0X2x1Z2dhZ2UnOidcXHVkODNkXFx1ZGVjNScsXG4gICdsZWZ0X3JpZ2h0X2Fycm93JzonXFx1MjE5NFxcdWZlMGYnLFxuICAnbGVmdHdhcmRzX2Fycm93X3dpdGhfaG9vayc6J1xcdTIxYTlcXHVmZTBmJyxcbiAgJ2xlbW9uJzonXFx1ZDgzY1xcdWRmNGInLFxuICAnbGVvJzonXFx1MjY0Y1xcdWZlMGYnLFxuICAnbGVvcGFyZCc6J1xcdWQ4M2RcXHVkYzA2JyxcbiAgJ2xldmVsX3NsaWRlcic6J1xcdWQ4M2NcXHVkZjlhJyxcbiAgJ2xpYnJhJzonXFx1MjY0ZVxcdWZlMGYnLFxuICAnbGlnaHRfcmFpbCc6J1xcdWQ4M2RcXHVkZTg4JyxcbiAgJ2xpbmsnOidcXHVkODNkXFx1ZGQxNycsXG4gICdsaW9uJzonXFx1ZDgzZVxcdWRkODEnLFxuICAnbGlwcyc6J1xcdWQ4M2RcXHVkYzQ0JyxcbiAgJ2xpcHN0aWNrJzonXFx1ZDgzZFxcdWRjODQnLFxuICAnbGl6YXJkJzonXFx1ZDgzZVxcdWRkOGUnLFxuICAnbG9jayc6J1xcdWQ4M2RcXHVkZDEyJyxcbiAgJ2xvY2tfd2l0aF9pbmtfcGVuJzonXFx1ZDgzZFxcdWRkMGYnLFxuICAnbG9sbGlwb3AnOidcXHVkODNjXFx1ZGY2ZCcsXG4gICdsb29wJzonXFx1MjdiZicsXG4gICdsb3VkX3NvdW5kJzonXFx1ZDgzZFxcdWRkMGEnLFxuICAnbG91ZHNwZWFrZXInOidcXHVkODNkXFx1ZGNlMicsXG4gICdsb3ZlX2hvdGVsJzonXFx1ZDgzY1xcdWRmZTknLFxuICAnbG92ZV9sZXR0ZXInOidcXHVkODNkXFx1ZGM4YycsXG4gICdsb3dfYnJpZ2h0bmVzcyc6J1xcdWQ4M2RcXHVkZDA1JyxcbiAgJ2x5aW5nX2ZhY2UnOidcXHVkODNlXFx1ZGQyNScsXG4gICdtJzonXFx1MjRjMlxcdWZlMGYnLFxuICAnbWFnJzonXFx1ZDgzZFxcdWRkMGQnLFxuICAnbWFnX3JpZ2h0JzonXFx1ZDgzZFxcdWRkMGUnLFxuICAnbWFoam9uZyc6J1xcdWQ4M2NcXHVkYzA0XFx1ZmUwZicsXG4gICdtYWlsYm94JzonXFx1ZDgzZFxcdWRjZWInLFxuICAnbWFpbGJveF9jbG9zZWQnOidcXHVkODNkXFx1ZGNlYScsXG4gICdtYWlsYm94X3dpdGhfbWFpbCc6J1xcdWQ4M2RcXHVkY2VjJyxcbiAgJ21haWxib3hfd2l0aF9ub19tYWlsJzonXFx1ZDgzZFxcdWRjZWQnLFxuICAnbWFuJzonXFx1ZDgzZFxcdWRjNjgnLFxuICAnbWFuX2FydGlzdCc6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNjXFx1ZGZhOCcsXG4gICdtYW5fYXN0cm9uYXV0JzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2RcXHVkZTgwJyxcbiAgJ21hbl9jYXJ0d2hlZWxpbmcnOidcXHVkODNlXFx1ZGQzOCZ6d2o7XFx1MjY0MlxcdWZlMGYnLFxuICAnbWFuX2Nvb2snOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzY1xcdWRmNzMnLFxuICAnbWFuX2RhbmNpbmcnOidcXHVkODNkXFx1ZGQ3YScsXG4gICdtYW5fZmFjZXBhbG1pbmcnOidcXHVkODNlXFx1ZGQyNiZ6d2o7XFx1MjY0MlxcdWZlMGYnLFxuICAnbWFuX2ZhY3Rvcnlfd29ya2VyJzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2NcXHVkZmVkJyxcbiAgJ21hbl9mYXJtZXInOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzY1xcdWRmM2UnLFxuICAnbWFuX2ZpcmVmaWdodGVyJzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2RcXHVkZTkyJyxcbiAgJ21hbl9oZWFsdGhfd29ya2VyJzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdTI2OTVcXHVmZTBmJyxcbiAgJ21hbl9pbl90dXhlZG8nOidcXHVkODNlXFx1ZGQzNScsXG4gICdtYW5fanVkZ2UnOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1MjY5NlxcdWZlMGYnLFxuICAnbWFuX2p1Z2dsaW5nJzonXFx1ZDgzZVxcdWRkMzkmendqO1xcdTI2NDJcXHVmZTBmJyxcbiAgJ21hbl9tZWNoYW5pYyc6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNkXFx1ZGQyNycsXG4gICdtYW5fb2ZmaWNlX3dvcmtlcic6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNkXFx1ZGNiYycsXG4gICdtYW5fcGlsb3QnOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1MjcwOFxcdWZlMGYnLFxuICAnbWFuX3BsYXlpbmdfaGFuZGJhbGwnOidcXHVkODNlXFx1ZGQzZSZ6d2o7XFx1MjY0MlxcdWZlMGYnLFxuICAnbWFuX3BsYXlpbmdfd2F0ZXJfcG9sbyc6J1xcdWQ4M2VcXHVkZDNkJnp3ajtcXHUyNjQyXFx1ZmUwZicsXG4gICdtYW5fc2NpZW50aXN0JzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2RcXHVkZDJjJyxcbiAgJ21hbl9zaHJ1Z2dpbmcnOidcXHVkODNlXFx1ZGQzNyZ6d2o7XFx1MjY0MlxcdWZlMGYnLFxuICAnbWFuX3Npbmdlcic6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNjXFx1ZGZhNCcsXG4gICdtYW5fc3R1ZGVudCc6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNjXFx1ZGY5MycsXG4gICdtYW5fdGVhY2hlcic6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNjXFx1ZGZlYicsXG4gICdtYW5fdGVjaG5vbG9naXN0JzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2RcXHVkY2JiJyxcbiAgJ21hbl93aXRoX2d1YV9waV9tYW8nOidcXHVkODNkXFx1ZGM3MicsXG4gICdtYW5fd2l0aF90dXJiYW4nOidcXHVkODNkXFx1ZGM3MycsXG4gICd0YW5nZXJpbmUnOidcXHVkODNjXFx1ZGY0YScsXG4gICdtYW5zX3Nob2UnOidcXHVkODNkXFx1ZGM1ZScsXG4gICdtYW50ZWxwaWVjZV9jbG9jayc6J1xcdWQ4M2RcXHVkZDcwJyxcbiAgJ21hcGxlX2xlYWYnOidcXHVkODNjXFx1ZGY0MScsXG4gICdtYXJ0aWFsX2FydHNfdW5pZm9ybSc6J1xcdWQ4M2VcXHVkZDRiJyxcbiAgJ21hc2snOidcXHVkODNkXFx1ZGUzNycsXG4gICdtYXNzYWdlX3dvbWFuJzonXFx1ZDgzZFxcdWRjODYnLFxuICAnbWFzc2FnZV9tYW4nOidcXHVkODNkXFx1ZGM4NiZ6d2o7XFx1MjY0MlxcdWZlMGYnLFxuICAnbWVhdF9vbl9ib25lJzonXFx1ZDgzY1xcdWRmNTYnLFxuICAnbWVkYWxfbWlsaXRhcnknOidcXHVkODNjXFx1ZGY5NicsXG4gICdtZWRhbF9zcG9ydHMnOidcXHVkODNjXFx1ZGZjNScsXG4gICdtZWdhJzonXFx1ZDgzZFxcdWRjZTMnLFxuICAnbWVsb24nOidcXHVkODNjXFx1ZGY0OCcsXG4gICdtZW1vJzonXFx1ZDgzZFxcdWRjZGQnLFxuICAnbWVuX3dyZXN0bGluZyc6J1xcdWQ4M2VcXHVkZDNjJnp3ajtcXHUyNjQyXFx1ZmUwZicsXG4gICdtZW5vcmFoJzonXFx1ZDgzZFxcdWRkNGUnLFxuICAnbWVucyc6J1xcdWQ4M2RcXHVkZWI5JyxcbiAgJ21ldGFsJzonXFx1ZDgzZVxcdWRkMTgnLFxuICAnbWV0cm8nOidcXHVkODNkXFx1ZGU4NycsXG4gICdtaWNyb3Bob25lJzonXFx1ZDgzY1xcdWRmYTQnLFxuICAnbWljcm9zY29wZSc6J1xcdWQ4M2RcXHVkZDJjJyxcbiAgJ21pbGtfZ2xhc3MnOidcXHVkODNlXFx1ZGQ1YicsXG4gICdtaWxreV93YXknOidcXHVkODNjXFx1ZGYwYycsXG4gICdtaW5pYnVzJzonXFx1ZDgzZFxcdWRlOTAnLFxuICAnbWluaWRpc2MnOidcXHVkODNkXFx1ZGNiZCcsXG4gICdtb2JpbGVfcGhvbmVfb2ZmJzonXFx1ZDgzZFxcdWRjZjQnLFxuICAnbW9uZXlfbW91dGhfZmFjZSc6J1xcdWQ4M2VcXHVkZDExJyxcbiAgJ21vbmV5X3dpdGhfd2luZ3MnOidcXHVkODNkXFx1ZGNiOCcsXG4gICdtb25leWJhZyc6J1xcdWQ4M2RcXHVkY2IwJyxcbiAgJ21vbmtleSc6J1xcdWQ4M2RcXHVkYzEyJyxcbiAgJ21vbmtleV9mYWNlJzonXFx1ZDgzZFxcdWRjMzUnLFxuICAnbW9ub3JhaWwnOidcXHVkODNkXFx1ZGU5ZCcsXG4gICdtb29uJzonXFx1ZDgzY1xcdWRmMTQnLFxuICAnbW9ydGFyX2JvYXJkJzonXFx1ZDgzY1xcdWRmOTMnLFxuICAnbW9zcXVlJzonXFx1ZDgzZFxcdWRkNGMnLFxuICAnbW90b3JfYm9hdCc6J1xcdWQ4M2RcXHVkZWU1JyxcbiAgJ21vdG9yX3Njb290ZXInOidcXHVkODNkXFx1ZGVmNScsXG4gICdtb3RvcmN5Y2xlJzonXFx1ZDgzY1xcdWRmY2QnLFxuICAnbW90b3J3YXknOidcXHVkODNkXFx1ZGVlMycsXG4gICdtb3VudF9mdWppJzonXFx1ZDgzZFxcdWRkZmInLFxuICAnbW91bnRhaW4nOidcXHUyNmYwJyxcbiAgJ21vdW50YWluX2Jpa2luZ19tYW4nOidcXHVkODNkXFx1ZGViNScsXG4gICdtb3VudGFpbl9iaWtpbmdfd29tYW4nOidcXHVkODNkXFx1ZGViNSZ6d2o7XFx1MjY0MFxcdWZlMGYnLFxuICAnbW91bnRhaW5fY2FibGV3YXknOidcXHVkODNkXFx1ZGVhMCcsXG4gICdtb3VudGFpbl9yYWlsd2F5JzonXFx1ZDgzZFxcdWRlOWUnLFxuICAnbW91bnRhaW5fc25vdyc6J1xcdWQ4M2NcXHVkZmQ0JyxcbiAgJ21vdXNlJzonXFx1ZDgzZFxcdWRjMmQnLFxuICAnbW91c2UyJzonXFx1ZDgzZFxcdWRjMDEnLFxuICAnbW92aWVfY2FtZXJhJzonXFx1ZDgzY1xcdWRmYTUnLFxuICAnbW95YWknOidcXHVkODNkXFx1ZGRmZicsXG4gICdtcnNfY2xhdXMnOidcXHVkODNlXFx1ZGQzNicsXG4gICdtdXNjbGUnOidcXHVkODNkXFx1ZGNhYScsXG4gICdtdXNocm9vbSc6J1xcdWQ4M2NcXHVkZjQ0JyxcbiAgJ211c2ljYWxfa2V5Ym9hcmQnOidcXHVkODNjXFx1ZGZiOScsXG4gICdtdXNpY2FsX25vdGUnOidcXHVkODNjXFx1ZGZiNScsXG4gICdtdXNpY2FsX3Njb3JlJzonXFx1ZDgzY1xcdWRmYmMnLFxuICAnbXV0ZSc6J1xcdWQ4M2RcXHVkZDA3JyxcbiAgJ25haWxfY2FyZSc6J1xcdWQ4M2RcXHVkYzg1JyxcbiAgJ25hbWVfYmFkZ2UnOidcXHVkODNkXFx1ZGNkYicsXG4gICduYXRpb25hbF9wYXJrJzonXFx1ZDgzY1xcdWRmZGUnLFxuICAnbmF1c2VhdGVkX2ZhY2UnOidcXHVkODNlXFx1ZGQyMicsXG4gICduZWNrdGllJzonXFx1ZDgzZFxcdWRjNTQnLFxuICAnbmVnYXRpdmVfc3F1YXJlZF9jcm9zc19tYXJrJzonXFx1Mjc0ZScsXG4gICduZXJkX2ZhY2UnOidcXHVkODNlXFx1ZGQxMycsXG4gICduZXV0cmFsX2ZhY2UnOidcXHVkODNkXFx1ZGUxMCcsXG4gICduZXcnOidcXHVkODNjXFx1ZGQ5NScsXG4gICduZXdfbW9vbic6J1xcdWQ4M2NcXHVkZjExJyxcbiAgJ25ld19tb29uX3dpdGhfZmFjZSc6J1xcdWQ4M2NcXHVkZjFhJyxcbiAgJ25ld3NwYXBlcic6J1xcdWQ4M2RcXHVkY2YwJyxcbiAgJ25ld3NwYXBlcl9yb2xsJzonXFx1ZDgzZFxcdWRkZGUnLFxuICAnbmV4dF90cmFja19idXR0b24nOidcXHUyM2VkJyxcbiAgJ25nJzonXFx1ZDgzY1xcdWRkOTYnLFxuICAnbm9fZ29vZF9tYW4nOidcXHVkODNkXFx1ZGU0NSZ6d2o7XFx1MjY0MlxcdWZlMGYnLFxuICAnbm9fZ29vZF93b21hbic6J1xcdWQ4M2RcXHVkZTQ1JyxcbiAgJ25pZ2h0X3dpdGhfc3RhcnMnOidcXHVkODNjXFx1ZGYwMycsXG4gICdub19iZWxsJzonXFx1ZDgzZFxcdWRkMTUnLFxuICAnbm9fYmljeWNsZXMnOidcXHVkODNkXFx1ZGViMycsXG4gICdub19lbnRyeSc6J1xcdTI2ZDRcXHVmZTBmJyxcbiAgJ25vX2VudHJ5X3NpZ24nOidcXHVkODNkXFx1ZGVhYicsXG4gICdub19tb2JpbGVfcGhvbmVzJzonXFx1ZDgzZFxcdWRjZjUnLFxuICAnbm9fbW91dGgnOidcXHVkODNkXFx1ZGUzNicsXG4gICdub19wZWRlc3RyaWFucyc6J1xcdWQ4M2RcXHVkZWI3JyxcbiAgJ25vX3Ntb2tpbmcnOidcXHVkODNkXFx1ZGVhZCcsXG4gICdub24tcG90YWJsZV93YXRlcic6J1xcdWQ4M2RcXHVkZWIxJyxcbiAgJ25vc2UnOidcXHVkODNkXFx1ZGM0MycsXG4gICdub3RlYm9vayc6J1xcdWQ4M2RcXHVkY2QzJyxcbiAgJ25vdGVib29rX3dpdGhfZGVjb3JhdGl2ZV9jb3Zlcic6J1xcdWQ4M2RcXHVkY2Q0JyxcbiAgJ25vdGVzJzonXFx1ZDgzY1xcdWRmYjYnLFxuICAnbnV0X2FuZF9ib2x0JzonXFx1ZDgzZFxcdWRkMjknLFxuICAnbyc6J1xcdTJiNTVcXHVmZTBmJyxcbiAgJ28yJzonXFx1ZDgzY1xcdWRkN2VcXHVmZTBmJyxcbiAgJ29jZWFuJzonXFx1ZDgzY1xcdWRmMGEnLFxuICAnb2N0b3B1cyc6J1xcdWQ4M2RcXHVkYzE5JyxcbiAgJ29kZW4nOidcXHVkODNjXFx1ZGY2MicsXG4gICdvZmZpY2UnOidcXHVkODNjXFx1ZGZlMicsXG4gICdvaWxfZHJ1bSc6J1xcdWQ4M2RcXHVkZWUyJyxcbiAgJ29rJzonXFx1ZDgzY1xcdWRkOTcnLFxuICAnb2tfaGFuZCc6J1xcdWQ4M2RcXHVkYzRjJyxcbiAgJ29rX21hbic6J1xcdWQ4M2RcXHVkZTQ2Jnp3ajtcXHUyNjQyXFx1ZmUwZicsXG4gICdva193b21hbic6J1xcdWQ4M2RcXHVkZTQ2JyxcbiAgJ29sZF9rZXknOidcXHVkODNkXFx1ZGRkZCcsXG4gICdvbGRlcl9tYW4nOidcXHVkODNkXFx1ZGM3NCcsXG4gICdvbGRlcl93b21hbic6J1xcdWQ4M2RcXHVkYzc1JyxcbiAgJ29tJzonXFx1ZDgzZFxcdWRkNDknLFxuICAnb24nOidcXHVkODNkXFx1ZGQxYicsXG4gICdvbmNvbWluZ19hdXRvbW9iaWxlJzonXFx1ZDgzZFxcdWRlOTgnLFxuICAnb25jb21pbmdfYnVzJzonXFx1ZDgzZFxcdWRlOGQnLFxuICAnb25jb21pbmdfcG9saWNlX2Nhcic6J1xcdWQ4M2RcXHVkZTk0JyxcbiAgJ29uY29taW5nX3RheGknOidcXHVkODNkXFx1ZGU5NicsXG4gICdvcGVuX2ZpbGVfZm9sZGVyJzonXFx1ZDgzZFxcdWRjYzInLFxuICAnb3Blbl9oYW5kcyc6J1xcdWQ4M2RcXHVkYzUwJyxcbiAgJ29wZW5fbW91dGgnOidcXHVkODNkXFx1ZGUyZScsXG4gICdvcGVuX3VtYnJlbGxhJzonXFx1MjYwMlxcdWZlMGYnLFxuICAnb3BoaXVjaHVzJzonXFx1MjZjZScsXG4gICdvcmFuZ2VfYm9vayc6J1xcdWQ4M2RcXHVkY2Q5JyxcbiAgJ29ydGhvZG94X2Nyb3NzJzonXFx1MjYyNlxcdWZlMGYnLFxuICAnb3V0Ym94X3RyYXknOidcXHVkODNkXFx1ZGNlNCcsXG4gICdvd2wnOidcXHVkODNlXFx1ZGQ4OScsXG4gICdveCc6J1xcdWQ4M2RcXHVkYzAyJyxcbiAgJ3BhY2thZ2UnOidcXHVkODNkXFx1ZGNlNicsXG4gICdwYWdlX2ZhY2luZ191cCc6J1xcdWQ4M2RcXHVkY2M0JyxcbiAgJ3BhZ2Vfd2l0aF9jdXJsJzonXFx1ZDgzZFxcdWRjYzMnLFxuICAncGFnZXInOidcXHVkODNkXFx1ZGNkZicsXG4gICdwYWludGJydXNoJzonXFx1ZDgzZFxcdWRkOGMnLFxuICAncGFsbV90cmVlJzonXFx1ZDgzY1xcdWRmMzQnLFxuICAncGFuY2FrZXMnOidcXHVkODNlXFx1ZGQ1ZScsXG4gICdwYW5kYV9mYWNlJzonXFx1ZDgzZFxcdWRjM2MnLFxuICAncGFwZXJjbGlwJzonXFx1ZDgzZFxcdWRjY2UnLFxuICAncGFwZXJjbGlwcyc6J1xcdWQ4M2RcXHVkZDg3JyxcbiAgJ3BhcmFzb2xfb25fZ3JvdW5kJzonXFx1MjZmMScsXG4gICdwYXJraW5nJzonXFx1ZDgzY1xcdWRkN2ZcXHVmZTBmJyxcbiAgJ3BhcnRfYWx0ZXJuYXRpb25fbWFyayc6J1xcdTMwM2RcXHVmZTBmJyxcbiAgJ3BhcnRseV9zdW5ueSc6J1xcdTI2YzVcXHVmZTBmJyxcbiAgJ3Bhc3Nlbmdlcl9zaGlwJzonXFx1ZDgzZFxcdWRlZjMnLFxuICAncGFzc3BvcnRfY29udHJvbCc6J1xcdWQ4M2RcXHVkZWMyJyxcbiAgJ3BhdXNlX2J1dHRvbic6J1xcdTIzZjgnLFxuICAncGVhY2Vfc3ltYm9sJzonXFx1MjYyZVxcdWZlMGYnLFxuICAncGVhY2gnOidcXHVkODNjXFx1ZGY1MScsXG4gICdwZWFudXRzJzonXFx1ZDgzZVxcdWRkNWMnLFxuICAncGVhcic6J1xcdWQ4M2NcXHVkZjUwJyxcbiAgJ3Blbic6J1xcdWQ4M2RcXHVkZDhhJyxcbiAgJ3BlbmNpbDInOidcXHUyNzBmXFx1ZmUwZicsXG4gICdwZW5ndWluJzonXFx1ZDgzZFxcdWRjMjcnLFxuICAncGVuc2l2ZSc6J1xcdWQ4M2RcXHVkZTE0JyxcbiAgJ3BlcmZvcm1pbmdfYXJ0cyc6J1xcdWQ4M2NcXHVkZmFkJyxcbiAgJ3BlcnNldmVyZSc6J1xcdWQ4M2RcXHVkZTIzJyxcbiAgJ3BlcnNvbl9mZW5jaW5nJzonXFx1ZDgzZVxcdWRkM2EnLFxuICAncG91dGluZ193b21hbic6J1xcdWQ4M2RcXHVkZTRlJyxcbiAgJ3Bob25lJzonXFx1MjYwZVxcdWZlMGYnLFxuICAncGljayc6J1xcdTI2Y2YnLFxuICAncGlnJzonXFx1ZDgzZFxcdWRjMzcnLFxuICAncGlnMic6J1xcdWQ4M2RcXHVkYzE2JyxcbiAgJ3BpZ19ub3NlJzonXFx1ZDgzZFxcdWRjM2QnLFxuICAncGlsbCc6J1xcdWQ4M2RcXHVkYzhhJyxcbiAgJ3BpbmVhcHBsZSc6J1xcdWQ4M2NcXHVkZjRkJyxcbiAgJ3BpbmdfcG9uZyc6J1xcdWQ4M2NcXHVkZmQzJyxcbiAgJ3Bpc2Nlcyc6J1xcdTI2NTNcXHVmZTBmJyxcbiAgJ3BpenphJzonXFx1ZDgzY1xcdWRmNTUnLFxuICAncGxhY2Vfb2Zfd29yc2hpcCc6J1xcdWQ4M2RcXHVkZWQwJyxcbiAgJ3BsYXRlX3dpdGhfY3V0bGVyeSc6J1xcdWQ4M2NcXHVkZjdkJyxcbiAgJ3BsYXlfb3JfcGF1c2VfYnV0dG9uJzonXFx1MjNlZicsXG4gICdwb2ludF9kb3duJzonXFx1ZDgzZFxcdWRjNDcnLFxuICAncG9pbnRfbGVmdCc6J1xcdWQ4M2RcXHVkYzQ4JyxcbiAgJ3BvaW50X3JpZ2h0JzonXFx1ZDgzZFxcdWRjNDknLFxuICAncG9pbnRfdXAnOidcXHUyNjFkXFx1ZmUwZicsXG4gICdwb2ludF91cF8yJzonXFx1ZDgzZFxcdWRjNDYnLFxuICAncG9saWNlX2Nhcic6J1xcdWQ4M2RcXHVkZTkzJyxcbiAgJ3BvbGljZXdvbWFuJzonXFx1ZDgzZFxcdWRjNmUmendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ3Bvb2RsZSc6J1xcdWQ4M2RcXHVkYzI5JyxcbiAgJ3BvcGNvcm4nOidcXHVkODNjXFx1ZGY3ZicsXG4gICdwb3N0X29mZmljZSc6J1xcdWQ4M2NcXHVkZmUzJyxcbiAgJ3Bvc3RhbF9ob3JuJzonXFx1ZDgzZFxcdWRjZWYnLFxuICAncG9zdGJveCc6J1xcdWQ4M2RcXHVkY2VlJyxcbiAgJ3BvdGFibGVfd2F0ZXInOidcXHVkODNkXFx1ZGViMCcsXG4gICdwb3RhdG8nOidcXHVkODNlXFx1ZGQ1NCcsXG4gICdwb3VjaCc6J1xcdWQ4M2RcXHVkYzVkJyxcbiAgJ3BvdWx0cnlfbGVnJzonXFx1ZDgzY1xcdWRmNTcnLFxuICAncG91bmQnOidcXHVkODNkXFx1ZGNiNycsXG4gICdyYWdlJzonXFx1ZDgzZFxcdWRlMjEnLFxuICAncG91dGluZ19jYXQnOidcXHVkODNkXFx1ZGUzZScsXG4gICdwb3V0aW5nX21hbic6J1xcdWQ4M2RcXHVkZTRlJnp3ajtcXHUyNjQyXFx1ZmUwZicsXG4gICdwcmF5JzonXFx1ZDgzZFxcdWRlNGYnLFxuICAncHJheWVyX2JlYWRzJzonXFx1ZDgzZFxcdWRjZmYnLFxuICAncHJlZ25hbnRfd29tYW4nOidcXHVkODNlXFx1ZGQzMCcsXG4gICdwcmV2aW91c190cmFja19idXR0b24nOidcXHUyM2VlJyxcbiAgJ3ByaW5jZSc6J1xcdWQ4M2VcXHVkZDM0JyxcbiAgJ3ByaW5jZXNzJzonXFx1ZDgzZFxcdWRjNzgnLFxuICAncHJpbnRlcic6J1xcdWQ4M2RcXHVkZGE4JyxcbiAgJ3B1cnBsZV9oZWFydCc6J1xcdWQ4M2RcXHVkYzljJyxcbiAgJ3B1cnNlJzonXFx1ZDgzZFxcdWRjNWInLFxuICAncHVzaHBpbic6J1xcdWQ4M2RcXHVkY2NjJyxcbiAgJ3B1dF9saXR0ZXJfaW5faXRzX3BsYWNlJzonXFx1ZDgzZFxcdWRlYWUnLFxuICAncXVlc3Rpb24nOidcXHUyNzUzJyxcbiAgJ3JhYmJpdCc6J1xcdWQ4M2RcXHVkYzMwJyxcbiAgJ3JhYmJpdDInOidcXHVkODNkXFx1ZGMwNycsXG4gICdyYWNlaG9yc2UnOidcXHVkODNkXFx1ZGMwZScsXG4gICdyYWNpbmdfY2FyJzonXFx1ZDgzY1xcdWRmY2UnLFxuICAncmFkaW8nOidcXHVkODNkXFx1ZGNmYicsXG4gICdyYWRpb19idXR0b24nOidcXHVkODNkXFx1ZGQxOCcsXG4gICdyYWRpb2FjdGl2ZSc6J1xcdTI2MjJcXHVmZTBmJyxcbiAgJ3JhaWx3YXlfY2FyJzonXFx1ZDgzZFxcdWRlODMnLFxuICAncmFpbHdheV90cmFjayc6J1xcdWQ4M2RcXHVkZWU0JyxcbiAgJ3JhaW5ib3cnOidcXHVkODNjXFx1ZGYwOCcsXG4gICdyYWluYm93X2ZsYWcnOidcXHVkODNjXFx1ZGZmM1xcdWZlMGYmendqO1xcdWQ4M2NcXHVkZjA4JyxcbiAgJ3JhaXNlZF9iYWNrX29mX2hhbmQnOidcXHVkODNlXFx1ZGQxYScsXG4gICdyYWlzZWRfaGFuZF93aXRoX2ZpbmdlcnNfc3BsYXllZCc6J1xcdWQ4M2RcXHVkZDkwJyxcbiAgJ3JhaXNlZF9oYW5kcyc6J1xcdWQ4M2RcXHVkZTRjJyxcbiAgJ3JhaXNpbmdfaGFuZF93b21hbic6J1xcdWQ4M2RcXHVkZTRiJyxcbiAgJ3JhaXNpbmdfaGFuZF9tYW4nOidcXHVkODNkXFx1ZGU0YiZ6d2o7XFx1MjY0MlxcdWZlMGYnLFxuICAncmFtJzonXFx1ZDgzZFxcdWRjMGYnLFxuICAncmFtZW4nOidcXHVkODNjXFx1ZGY1YycsXG4gICdyYXQnOidcXHVkODNkXFx1ZGMwMCcsXG4gICdyZWNvcmRfYnV0dG9uJzonXFx1MjNmYScsXG4gICdyZWN5Y2xlJzonXFx1MjY3YlxcdWZlMGYnLFxuICAncmVkX2NpcmNsZSc6J1xcdWQ4M2RcXHVkZDM0JyxcbiAgJ3JlZ2lzdGVyZWQnOidcXHUwMGFlXFx1ZmUwZicsXG4gICdyZWxheGVkJzonXFx1MjYzYVxcdWZlMGYnLFxuICAncmVsaWV2ZWQnOidcXHVkODNkXFx1ZGUwYycsXG4gICdyZW1pbmRlcl9yaWJib24nOidcXHVkODNjXFx1ZGY5NycsXG4gICdyZXBlYXQnOidcXHVkODNkXFx1ZGQwMScsXG4gICdyZXBlYXRfb25lJzonXFx1ZDgzZFxcdWRkMDInLFxuICAncmVzY3VlX3dvcmtlcl9oZWxtZXQnOidcXHUyNmQxJyxcbiAgJ3Jlc3Ryb29tJzonXFx1ZDgzZFxcdWRlYmInLFxuICAncmV2b2x2aW5nX2hlYXJ0cyc6J1xcdWQ4M2RcXHVkYzllJyxcbiAgJ3Jld2luZCc6J1xcdTIzZWEnLFxuICAncmhpbm9jZXJvcyc6J1xcdWQ4M2VcXHVkZDhmJyxcbiAgJ3JpYmJvbic6J1xcdWQ4M2NcXHVkZjgwJyxcbiAgJ3JpY2UnOidcXHVkODNjXFx1ZGY1YScsXG4gICdyaWNlX2JhbGwnOidcXHVkODNjXFx1ZGY1OScsXG4gICdyaWNlX2NyYWNrZXInOidcXHVkODNjXFx1ZGY1OCcsXG4gICdyaWNlX3NjZW5lJzonXFx1ZDgzY1xcdWRmOTEnLFxuICAncmlnaHRfYW5nZXJfYnViYmxlJzonXFx1ZDgzZFxcdWRkZWYnLFxuICAncmluZyc6J1xcdWQ4M2RcXHVkYzhkJyxcbiAgJ3JvYm90JzonXFx1ZDgzZVxcdWRkMTYnLFxuICAncm9ja2V0JzonXFx1ZDgzZFxcdWRlODAnLFxuICAncm9mbCc6J1xcdWQ4M2VcXHVkZDIzJyxcbiAgJ3JvbGxfZXllcyc6J1xcdWQ4M2RcXHVkZTQ0JyxcbiAgJ3JvbGxlcl9jb2FzdGVyJzonXFx1ZDgzY1xcdWRmYTInLFxuICAncm9vc3Rlcic6J1xcdWQ4M2RcXHVkYzEzJyxcbiAgJ3Jvc2UnOidcXHVkODNjXFx1ZGYzOScsXG4gICdyb3NldHRlJzonXFx1ZDgzY1xcdWRmZjUnLFxuICAncm90YXRpbmdfbGlnaHQnOidcXHVkODNkXFx1ZGVhOCcsXG4gICdyb3VuZF9wdXNocGluJzonXFx1ZDgzZFxcdWRjY2QnLFxuICAncm93aW5nX21hbic6J1xcdWQ4M2RcXHVkZWEzJyxcbiAgJ3Jvd2luZ193b21hbic6J1xcdWQ4M2RcXHVkZWEzJnp3ajtcXHUyNjQwXFx1ZmUwZicsXG4gICdydWdieV9mb290YmFsbCc6J1xcdWQ4M2NcXHVkZmM5JyxcbiAgJ3J1bm5pbmdfbWFuJzonXFx1ZDgzY1xcdWRmYzMnLFxuICAncnVubmluZ19zaGlydF93aXRoX3Nhc2gnOidcXHVkODNjXFx1ZGZiZCcsXG4gICdydW5uaW5nX3dvbWFuJzonXFx1ZDgzY1xcdWRmYzMmendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ3NhJzonXFx1ZDgzY1xcdWRlMDJcXHVmZTBmJyxcbiAgJ3NhZ2l0dGFyaXVzJzonXFx1MjY1MFxcdWZlMGYnLFxuICAnc2FrZSc6J1xcdWQ4M2NcXHVkZjc2JyxcbiAgJ3NhbmRhbCc6J1xcdWQ4M2RcXHVkYzYxJyxcbiAgJ3NhbnRhJzonXFx1ZDgzY1xcdWRmODUnLFxuICAnc2F0ZWxsaXRlJzonXFx1ZDgzZFxcdWRjZTEnLFxuICAnc2F4b3Bob25lJzonXFx1ZDgzY1xcdWRmYjcnLFxuICAnc2Nob29sJzonXFx1ZDgzY1xcdWRmZWInLFxuICAnc2Nob29sX3NhdGNoZWwnOidcXHVkODNjXFx1ZGY5MicsXG4gICdzY2lzc29ycyc6J1xcdTI3MDJcXHVmZTBmJyxcbiAgJ3Njb3JwaW9uJzonXFx1ZDgzZVxcdWRkODInLFxuICAnc2NvcnBpdXMnOidcXHUyNjRmXFx1ZmUwZicsXG4gICdzY3JlYW0nOidcXHVkODNkXFx1ZGUzMScsXG4gICdzY3JlYW1fY2F0JzonXFx1ZDgzZFxcdWRlNDAnLFxuICAnc2Nyb2xsJzonXFx1ZDgzZFxcdWRjZGMnLFxuICAnc2VhdCc6J1xcdWQ4M2RcXHVkY2JhJyxcbiAgJ3NlY3JldCc6J1xcdTMyOTlcXHVmZTBmJyxcbiAgJ3NlZV9ub19ldmlsJzonXFx1ZDgzZFxcdWRlNDgnLFxuICAnc2VlZGxpbmcnOidcXHVkODNjXFx1ZGYzMScsXG4gICdzZWxmaWUnOidcXHVkODNlXFx1ZGQzMycsXG4gICdzaGFsbG93X3Bhbl9vZl9mb29kJzonXFx1ZDgzZVxcdWRkNTgnLFxuICAnc2hhbXJvY2snOidcXHUyNjE4XFx1ZmUwZicsXG4gICdzaGFyayc6J1xcdWQ4M2VcXHVkZDg4JyxcbiAgJ3NoYXZlZF9pY2UnOidcXHVkODNjXFx1ZGY2NycsXG4gICdzaGVlcCc6J1xcdWQ4M2RcXHVkYzExJyxcbiAgJ3NoZWxsJzonXFx1ZDgzZFxcdWRjMWEnLFxuICAnc2hpZWxkJzonXFx1ZDgzZFxcdWRlZTEnLFxuICAnc2hpbnRvX3NocmluZSc6J1xcdTI2ZTknLFxuICAnc2hpcCc6J1xcdWQ4M2RcXHVkZWEyJyxcbiAgJ3NoaXJ0JzonXFx1ZDgzZFxcdWRjNTUnLFxuICAnc2hvcHBpbmcnOidcXHVkODNkXFx1ZGVjZCcsXG4gICdzaG9wcGluZ19jYXJ0JzonXFx1ZDgzZFxcdWRlZDInLFxuICAnc2hvd2VyJzonXFx1ZDgzZFxcdWRlYmYnLFxuICAnc2hyaW1wJzonXFx1ZDgzZVxcdWRkOTAnLFxuICAnc2lnbmFsX3N0cmVuZ3RoJzonXFx1ZDgzZFxcdWRjZjYnLFxuICAnc2l4X3BvaW50ZWRfc3Rhcic6J1xcdWQ4M2RcXHVkZDJmJyxcbiAgJ3NraSc6J1xcdWQ4M2NcXHVkZmJmJyxcbiAgJ3NraWVyJzonXFx1MjZmNycsXG4gICdza3VsbCc6J1xcdWQ4M2RcXHVkYzgwJyxcbiAgJ3NrdWxsX2FuZF9jcm9zc2JvbmVzJzonXFx1MjYyMFxcdWZlMGYnLFxuICAnc2xlZXBpbmcnOidcXHVkODNkXFx1ZGUzNCcsXG4gICdzbGVlcGluZ19iZWQnOidcXHVkODNkXFx1ZGVjYycsXG4gICdzbGVlcHknOidcXHVkODNkXFx1ZGUyYScsXG4gICdzbGlnaHRseV9mcm93bmluZ19mYWNlJzonXFx1ZDgzZFxcdWRlNDEnLFxuICAnc2xpZ2h0bHlfc21pbGluZ19mYWNlJzonXFx1ZDgzZFxcdWRlNDInLFxuICAnc2xvdF9tYWNoaW5lJzonXFx1ZDgzY1xcdWRmYjAnLFxuICAnc21hbGxfYWlycGxhbmUnOidcXHVkODNkXFx1ZGVlOScsXG4gICdzbWFsbF9ibHVlX2RpYW1vbmQnOidcXHVkODNkXFx1ZGQzOScsXG4gICdzbWFsbF9vcmFuZ2VfZGlhbW9uZCc6J1xcdWQ4M2RcXHVkZDM4JyxcbiAgJ3NtYWxsX3JlZF90cmlhbmdsZSc6J1xcdWQ4M2RcXHVkZDNhJyxcbiAgJ3NtYWxsX3JlZF90cmlhbmdsZV9kb3duJzonXFx1ZDgzZFxcdWRkM2InLFxuICAnc21pbGUnOidcXHVkODNkXFx1ZGUwNCcsXG4gICdzbWlsZV9jYXQnOidcXHVkODNkXFx1ZGUzOCcsXG4gICdzbWlsZXknOidcXHVkODNkXFx1ZGUwMycsXG4gICdzbWlsZXlfY2F0JzonXFx1ZDgzZFxcdWRlM2EnLFxuICAnc21pbGluZ19pbXAnOidcXHVkODNkXFx1ZGUwOCcsXG4gICdzbWlyayc6J1xcdWQ4M2RcXHVkZTBmJyxcbiAgJ3NtaXJrX2NhdCc6J1xcdWQ4M2RcXHVkZTNjJyxcbiAgJ3Ntb2tpbmcnOidcXHVkODNkXFx1ZGVhYycsXG4gICdzbmFpbCc6J1xcdWQ4M2RcXHVkYzBjJyxcbiAgJ3NuYWtlJzonXFx1ZDgzZFxcdWRjMGQnLFxuICAnc25lZXppbmdfZmFjZSc6J1xcdWQ4M2VcXHVkZDI3JyxcbiAgJ3Nub3dib2FyZGVyJzonXFx1ZDgzY1xcdWRmYzInLFxuICAnc25vd2ZsYWtlJzonXFx1Mjc0NFxcdWZlMGYnLFxuICAnc25vd21hbic6J1xcdTI2YzRcXHVmZTBmJyxcbiAgJ3Nub3dtYW5fd2l0aF9zbm93JzonXFx1MjYwM1xcdWZlMGYnLFxuICAnc29iJzonXFx1ZDgzZFxcdWRlMmQnLFxuICAnc29jY2VyJzonXFx1MjZiZFxcdWZlMGYnLFxuICAnc29vbic6J1xcdWQ4M2RcXHVkZDFjJyxcbiAgJ3Nvcyc6J1xcdWQ4M2NcXHVkZDk4JyxcbiAgJ3NvdW5kJzonXFx1ZDgzZFxcdWRkMDknLFxuICAnc3BhY2VfaW52YWRlcic6J1xcdWQ4M2RcXHVkYzdlJyxcbiAgJ3NwYWRlcyc6J1xcdTI2NjBcXHVmZTBmJyxcbiAgJ3NwYWdoZXR0aSc6J1xcdWQ4M2NcXHVkZjVkJyxcbiAgJ3NwYXJrbGUnOidcXHUyNzQ3XFx1ZmUwZicsXG4gICdzcGFya2xlcic6J1xcdWQ4M2NcXHVkZjg3JyxcbiAgJ3NwYXJrbGVzJzonXFx1MjcyOCcsXG4gICdzcGFya2xpbmdfaGVhcnQnOidcXHVkODNkXFx1ZGM5NicsXG4gICdzcGVha19ub19ldmlsJzonXFx1ZDgzZFxcdWRlNGEnLFxuICAnc3BlYWtlcic6J1xcdWQ4M2RcXHVkZDA4JyxcbiAgJ3NwZWFraW5nX2hlYWQnOidcXHVkODNkXFx1ZGRlMycsXG4gICdzcGVlY2hfYmFsbG9vbic6J1xcdWQ4M2RcXHVkY2FjJyxcbiAgJ3NwZWVkYm9hdCc6J1xcdWQ4M2RcXHVkZWE0JyxcbiAgJ3NwaWRlcic6J1xcdWQ4M2RcXHVkZDc3JyxcbiAgJ3NwaWRlcl93ZWInOidcXHVkODNkXFx1ZGQ3OCcsXG4gICdzcGlyYWxfY2FsZW5kYXInOidcXHVkODNkXFx1ZGRkMycsXG4gICdzcGlyYWxfbm90ZXBhZCc6J1xcdWQ4M2RcXHVkZGQyJyxcbiAgJ3Nwb29uJzonXFx1ZDgzZVxcdWRkNDQnLFxuICAnc3F1aWQnOidcXHVkODNlXFx1ZGQ5MScsXG4gICdzdGFkaXVtJzonXFx1ZDgzY1xcdWRmZGYnLFxuICAnc3Rhcic6J1xcdTJiNTBcXHVmZTBmJyxcbiAgJ3N0YXIyJzonXFx1ZDgzY1xcdWRmMWYnLFxuICAnc3Rhcl9hbmRfY3Jlc2NlbnQnOidcXHUyNjJhXFx1ZmUwZicsXG4gICdzdGFyX29mX2RhdmlkJzonXFx1MjcyMVxcdWZlMGYnLFxuICAnc3RhcnMnOidcXHVkODNjXFx1ZGYyMCcsXG4gICdzdGF0aW9uJzonXFx1ZDgzZFxcdWRlODknLFxuICAnc3RhdHVlX29mX2xpYmVydHknOidcXHVkODNkXFx1ZGRmZCcsXG4gICdzdGVhbV9sb2NvbW90aXZlJzonXFx1ZDgzZFxcdWRlODInLFxuICAnc3Rldyc6J1xcdWQ4M2NcXHVkZjcyJyxcbiAgJ3N0b3BfYnV0dG9uJzonXFx1MjNmOScsXG4gICdzdG9wX3NpZ24nOidcXHVkODNkXFx1ZGVkMScsXG4gICdzdG9wd2F0Y2gnOidcXHUyM2YxJyxcbiAgJ3N0cmFpZ2h0X3J1bGVyJzonXFx1ZDgzZFxcdWRjY2YnLFxuICAnc3RyYXdiZXJyeSc6J1xcdWQ4M2NcXHVkZjUzJyxcbiAgJ3N0dWNrX291dF90b25ndWUnOidcXHVkODNkXFx1ZGUxYicsXG4gICdzdHVja19vdXRfdG9uZ3VlX2Nsb3NlZF9leWVzJzonXFx1ZDgzZFxcdWRlMWQnLFxuICAnc3R1Y2tfb3V0X3Rvbmd1ZV93aW5raW5nX2V5ZSc6J1xcdWQ4M2RcXHVkZTFjJyxcbiAgJ3N0dWRpb19taWNyb3Bob25lJzonXFx1ZDgzY1xcdWRmOTknLFxuICAnc3R1ZmZlZF9mbGF0YnJlYWQnOidcXHVkODNlXFx1ZGQ1OScsXG4gICdzdW5fYmVoaW5kX2xhcmdlX2Nsb3VkJzonXFx1ZDgzY1xcdWRmMjUnLFxuICAnc3VuX2JlaGluZF9yYWluX2Nsb3VkJzonXFx1ZDgzY1xcdWRmMjYnLFxuICAnc3VuX2JlaGluZF9zbWFsbF9jbG91ZCc6J1xcdWQ4M2NcXHVkZjI0JyxcbiAgJ3N1bl93aXRoX2ZhY2UnOidcXHVkODNjXFx1ZGYxZScsXG4gICdzdW5mbG93ZXInOidcXHVkODNjXFx1ZGYzYicsXG4gICdzdW5nbGFzc2VzJzonXFx1ZDgzZFxcdWRlMGUnLFxuICAnc3VubnknOidcXHUyNjAwXFx1ZmUwZicsXG4gICdzdW5yaXNlJzonXFx1ZDgzY1xcdWRmMDUnLFxuICAnc3VucmlzZV9vdmVyX21vdW50YWlucyc6J1xcdWQ4M2NcXHVkZjA0JyxcbiAgJ3N1cmZpbmdfbWFuJzonXFx1ZDgzY1xcdWRmYzQnLFxuICAnc3VyZmluZ193b21hbic6J1xcdWQ4M2NcXHVkZmM0Jnp3ajtcXHUyNjQwXFx1ZmUwZicsXG4gICdzdXNoaSc6J1xcdWQ4M2NcXHVkZjYzJyxcbiAgJ3N1c3BlbnNpb25fcmFpbHdheSc6J1xcdWQ4M2RcXHVkZTlmJyxcbiAgJ3N3ZWF0JzonXFx1ZDgzZFxcdWRlMTMnLFxuICAnc3dlYXRfZHJvcHMnOidcXHVkODNkXFx1ZGNhNicsXG4gICdzd2VhdF9zbWlsZSc6J1xcdWQ4M2RcXHVkZTA1JyxcbiAgJ3N3ZWV0X3BvdGF0byc6J1xcdWQ4M2NcXHVkZjYwJyxcbiAgJ3N3aW1taW5nX21hbic6J1xcdWQ4M2NcXHVkZmNhJyxcbiAgJ3N3aW1taW5nX3dvbWFuJzonXFx1ZDgzY1xcdWRmY2EmendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ3N5bWJvbHMnOidcXHVkODNkXFx1ZGQyMycsXG4gICdzeW5hZ29ndWUnOidcXHVkODNkXFx1ZGQ0ZCcsXG4gICdzeXJpbmdlJzonXFx1ZDgzZFxcdWRjODknLFxuICAndGFjbyc6J1xcdWQ4M2NcXHVkZjJlJyxcbiAgJ3RhZGEnOidcXHVkODNjXFx1ZGY4OScsXG4gICd0YW5hYmF0YV90cmVlJzonXFx1ZDgzY1xcdWRmOGInLFxuICAndGF1cnVzJzonXFx1MjY0OVxcdWZlMGYnLFxuICAndGF4aSc6J1xcdWQ4M2RcXHVkZTk1JyxcbiAgJ3RlYSc6J1xcdWQ4M2NcXHVkZjc1JyxcbiAgJ3RlbGVwaG9uZV9yZWNlaXZlcic6J1xcdWQ4M2RcXHVkY2RlJyxcbiAgJ3RlbGVzY29wZSc6J1xcdWQ4M2RcXHVkZDJkJyxcbiAgJ3Rlbm5pcyc6J1xcdWQ4M2NcXHVkZmJlJyxcbiAgJ3RlbnQnOidcXHUyNmZhXFx1ZmUwZicsXG4gICd0aGVybW9tZXRlcic6J1xcdWQ4M2NcXHVkZjIxJyxcbiAgJ3RoaW5raW5nJzonXFx1ZDgzZVxcdWRkMTQnLFxuICAndGhvdWdodF9iYWxsb29uJzonXFx1ZDgzZFxcdWRjYWQnLFxuICAndGlja2V0JzonXFx1ZDgzY1xcdWRmYWInLFxuICAndGlja2V0cyc6J1xcdWQ4M2NcXHVkZjlmJyxcbiAgJ3RpZ2VyJzonXFx1ZDgzZFxcdWRjMmYnLFxuICAndGlnZXIyJzonXFx1ZDgzZFxcdWRjMDUnLFxuICAndGltZXJfY2xvY2snOidcXHUyM2YyJyxcbiAgJ3RpcHBpbmdfaGFuZF9tYW4nOidcXHVkODNkXFx1ZGM4MSZ6d2o7XFx1MjY0MlxcdWZlMGYnLFxuICAndGlyZWRfZmFjZSc6J1xcdWQ4M2RcXHVkZTJiJyxcbiAgJ3RtJzonXFx1MjEyMlxcdWZlMGYnLFxuICAndG9pbGV0JzonXFx1ZDgzZFxcdWRlYmQnLFxuICAndG9reW9fdG93ZXInOidcXHVkODNkXFx1ZGRmYycsXG4gICd0b21hdG8nOidcXHVkODNjXFx1ZGY0NScsXG4gICd0b25ndWUnOidcXHVkODNkXFx1ZGM0NScsXG4gICd0b3AnOidcXHVkODNkXFx1ZGQxZCcsXG4gICd0b3BoYXQnOidcXHVkODNjXFx1ZGZhOScsXG4gICd0b3JuYWRvJzonXFx1ZDgzY1xcdWRmMmEnLFxuICAndHJhY2tiYWxsJzonXFx1ZDgzZFxcdWRkYjInLFxuICAndHJhY3Rvcic6J1xcdWQ4M2RcXHVkZTljJyxcbiAgJ3RyYWZmaWNfbGlnaHQnOidcXHVkODNkXFx1ZGVhNScsXG4gICd0cmFpbic6J1xcdWQ4M2RcXHVkZThiJyxcbiAgJ3RyYWluMic6J1xcdWQ4M2RcXHVkZTg2JyxcbiAgJ3RyYW0nOidcXHVkODNkXFx1ZGU4YScsXG4gICd0cmlhbmd1bGFyX2ZsYWdfb25fcG9zdCc6J1xcdWQ4M2RcXHVkZWE5JyxcbiAgJ3RyaWFuZ3VsYXJfcnVsZXInOidcXHVkODNkXFx1ZGNkMCcsXG4gICd0cmlkZW50JzonXFx1ZDgzZFxcdWRkMzEnLFxuICAndHJpdW1waCc6J1xcdWQ4M2RcXHVkZTI0JyxcbiAgJ3Ryb2xsZXlidXMnOidcXHVkODNkXFx1ZGU4ZScsXG4gICd0cm9waHknOidcXHVkODNjXFx1ZGZjNicsXG4gICd0cm9waWNhbF9kcmluayc6J1xcdWQ4M2NcXHVkZjc5JyxcbiAgJ3Ryb3BpY2FsX2Zpc2gnOidcXHVkODNkXFx1ZGMyMCcsXG4gICd0cnVjayc6J1xcdWQ4M2RcXHVkZTlhJyxcbiAgJ3RydW1wZXQnOidcXHVkODNjXFx1ZGZiYScsXG4gICd0dWxpcCc6J1xcdWQ4M2NcXHVkZjM3JyxcbiAgJ3R1bWJsZXJfZ2xhc3MnOidcXHVkODNlXFx1ZGQ0MycsXG4gICd0dXJrZXknOidcXHVkODNlXFx1ZGQ4MycsXG4gICd0dXJ0bGUnOidcXHVkODNkXFx1ZGMyMicsXG4gICd0dic6J1xcdWQ4M2RcXHVkY2ZhJyxcbiAgJ3R3aXN0ZWRfcmlnaHR3YXJkc19hcnJvd3MnOidcXHVkODNkXFx1ZGQwMCcsXG4gICd0d29faGVhcnRzJzonXFx1ZDgzZFxcdWRjOTUnLFxuICAndHdvX21lbl9ob2xkaW5nX2hhbmRzJzonXFx1ZDgzZFxcdWRjNmMnLFxuICAndHdvX3dvbWVuX2hvbGRpbmdfaGFuZHMnOidcXHVkODNkXFx1ZGM2ZCcsXG4gICd1NTI3Mic6J1xcdWQ4M2NcXHVkZTM5JyxcbiAgJ3U1NDA4JzonXFx1ZDgzY1xcdWRlMzQnLFxuICAndTU1YjYnOidcXHVkODNjXFx1ZGUzYScsXG4gICd1NjMwNyc6J1xcdWQ4M2NcXHVkZTJmXFx1ZmUwZicsXG4gICd1NjcwOCc6J1xcdWQ4M2NcXHVkZTM3XFx1ZmUwZicsXG4gICd1NjcwOSc6J1xcdWQ4M2NcXHVkZTM2JyxcbiAgJ3U2ZTgwJzonXFx1ZDgzY1xcdWRlMzUnLFxuICAndTcxMjEnOidcXHVkODNjXFx1ZGUxYVxcdWZlMGYnLFxuICAndTc1MzMnOidcXHVkODNjXFx1ZGUzOCcsXG4gICd1Nzk4MSc6J1xcdWQ4M2NcXHVkZTMyJyxcbiAgJ3U3YTdhJzonXFx1ZDgzY1xcdWRlMzMnLFxuICAndW1icmVsbGEnOidcXHUyNjE0XFx1ZmUwZicsXG4gICd1bmFtdXNlZCc6J1xcdWQ4M2RcXHVkZTEyJyxcbiAgJ3VuZGVyYWdlJzonXFx1ZDgzZFxcdWRkMWUnLFxuICAndW5pY29ybic6J1xcdWQ4M2VcXHVkZDg0JyxcbiAgJ3VubG9jayc6J1xcdWQ4M2RcXHVkZDEzJyxcbiAgJ3VwJzonXFx1ZDgzY1xcdWRkOTknLFxuICAndXBzaWRlX2Rvd25fZmFjZSc6J1xcdWQ4M2RcXHVkZTQzJyxcbiAgJ3YnOidcXHUyNzBjXFx1ZmUwZicsXG4gICd2ZXJ0aWNhbF90cmFmZmljX2xpZ2h0JzonXFx1ZDgzZFxcdWRlYTYnLFxuICAndmhzJzonXFx1ZDgzZFxcdWRjZmMnLFxuICAndmlicmF0aW9uX21vZGUnOidcXHVkODNkXFx1ZGNmMycsXG4gICd2aWRlb19jYW1lcmEnOidcXHVkODNkXFx1ZGNmOScsXG4gICd2aWRlb19nYW1lJzonXFx1ZDgzY1xcdWRmYWUnLFxuICAndmlvbGluJzonXFx1ZDgzY1xcdWRmYmInLFxuICAndmlyZ28nOidcXHUyNjRkXFx1ZmUwZicsXG4gICd2b2xjYW5vJzonXFx1ZDgzY1xcdWRmMGInLFxuICAndm9sbGV5YmFsbCc6J1xcdWQ4M2NcXHVkZmQwJyxcbiAgJ3ZzJzonXFx1ZDgzY1xcdWRkOWEnLFxuICAndnVsY2FuX3NhbHV0ZSc6J1xcdWQ4M2RcXHVkZDk2JyxcbiAgJ3dhbGtpbmdfbWFuJzonXFx1ZDgzZFxcdWRlYjYnLFxuICAnd2Fsa2luZ193b21hbic6J1xcdWQ4M2RcXHVkZWI2Jnp3ajtcXHUyNjQwXFx1ZmUwZicsXG4gICd3YW5pbmdfY3Jlc2NlbnRfbW9vbic6J1xcdWQ4M2NcXHVkZjE4JyxcbiAgJ3dhbmluZ19naWJib3VzX21vb24nOidcXHVkODNjXFx1ZGYxNicsXG4gICd3YXJuaW5nJzonXFx1MjZhMFxcdWZlMGYnLFxuICAnd2FzdGViYXNrZXQnOidcXHVkODNkXFx1ZGRkMScsXG4gICd3YXRjaCc6J1xcdTIzMWFcXHVmZTBmJyxcbiAgJ3dhdGVyX2J1ZmZhbG8nOidcXHVkODNkXFx1ZGMwMycsXG4gICd3YXRlcm1lbG9uJzonXFx1ZDgzY1xcdWRmNDknLFxuICAnd2F2ZSc6J1xcdWQ4M2RcXHVkYzRiJyxcbiAgJ3dhdnlfZGFzaCc6J1xcdTMwMzBcXHVmZTBmJyxcbiAgJ3dheGluZ19jcmVzY2VudF9tb29uJzonXFx1ZDgzY1xcdWRmMTInLFxuICAnd2MnOidcXHVkODNkXFx1ZGViZScsXG4gICd3ZWFyeSc6J1xcdWQ4M2RcXHVkZTI5JyxcbiAgJ3dlZGRpbmcnOidcXHVkODNkXFx1ZGM5MicsXG4gICd3ZWlnaHRfbGlmdGluZ19tYW4nOidcXHVkODNjXFx1ZGZjYlxcdWZlMGYnLFxuICAnd2VpZ2h0X2xpZnRpbmdfd29tYW4nOidcXHVkODNjXFx1ZGZjYlxcdWZlMGYmendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ3doYWxlJzonXFx1ZDgzZFxcdWRjMzMnLFxuICAnd2hhbGUyJzonXFx1ZDgzZFxcdWRjMGInLFxuICAnd2hlZWxfb2ZfZGhhcm1hJzonXFx1MjYzOFxcdWZlMGYnLFxuICAnd2hlZWxjaGFpcic6J1xcdTI2N2ZcXHVmZTBmJyxcbiAgJ3doaXRlX2NoZWNrX21hcmsnOidcXHUyNzA1JyxcbiAgJ3doaXRlX2NpcmNsZSc6J1xcdTI2YWFcXHVmZTBmJyxcbiAgJ3doaXRlX2ZsYWcnOidcXHVkODNjXFx1ZGZmM1xcdWZlMGYnLFxuICAnd2hpdGVfZmxvd2VyJzonXFx1ZDgzZFxcdWRjYWUnLFxuICAnd2hpdGVfbGFyZ2Vfc3F1YXJlJzonXFx1MmIxY1xcdWZlMGYnLFxuICAnd2hpdGVfbWVkaXVtX3NtYWxsX3NxdWFyZSc6J1xcdTI1ZmRcXHVmZTBmJyxcbiAgJ3doaXRlX21lZGl1bV9zcXVhcmUnOidcXHUyNWZiXFx1ZmUwZicsXG4gICd3aGl0ZV9zbWFsbF9zcXVhcmUnOidcXHUyNWFiXFx1ZmUwZicsXG4gICd3aGl0ZV9zcXVhcmVfYnV0dG9uJzonXFx1ZDgzZFxcdWRkMzMnLFxuICAnd2lsdGVkX2Zsb3dlcic6J1xcdWQ4M2VcXHVkZDQwJyxcbiAgJ3dpbmRfY2hpbWUnOidcXHVkODNjXFx1ZGY5MCcsXG4gICd3aW5kX2ZhY2UnOidcXHVkODNjXFx1ZGYyYycsXG4gICd3aW5lX2dsYXNzJzonXFx1ZDgzY1xcdWRmNzcnLFxuICAnd2luayc6J1xcdWQ4M2RcXHVkZTA5JyxcbiAgJ3dvbGYnOidcXHVkODNkXFx1ZGMzYScsXG4gICd3b21hbic6J1xcdWQ4M2RcXHVkYzY5JyxcbiAgJ3dvbWFuX2FydGlzdCc6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNjXFx1ZGZhOCcsXG4gICd3b21hbl9hc3Ryb25hdXQnOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzZFxcdWRlODAnLFxuICAnd29tYW5fY2FydHdoZWVsaW5nJzonXFx1ZDgzZVxcdWRkMzgmendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ3dvbWFuX2Nvb2snOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzY1xcdWRmNzMnLFxuICAnd29tYW5fZmFjZXBhbG1pbmcnOidcXHVkODNlXFx1ZGQyNiZ6d2o7XFx1MjY0MFxcdWZlMGYnLFxuICAnd29tYW5fZmFjdG9yeV93b3JrZXInOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzY1xcdWRmZWQnLFxuICAnd29tYW5fZmFybWVyJzonXFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2NcXHVkZjNlJyxcbiAgJ3dvbWFuX2ZpcmVmaWdodGVyJzonXFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2RcXHVkZTkyJyxcbiAgJ3dvbWFuX2hlYWx0aF93b3JrZXInOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1MjY5NVxcdWZlMGYnLFxuICAnd29tYW5fanVkZ2UnOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1MjY5NlxcdWZlMGYnLFxuICAnd29tYW5fanVnZ2xpbmcnOidcXHVkODNlXFx1ZGQzOSZ6d2o7XFx1MjY0MFxcdWZlMGYnLFxuICAnd29tYW5fbWVjaGFuaWMnOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzZFxcdWRkMjcnLFxuICAnd29tYW5fb2ZmaWNlX3dvcmtlcic6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNkXFx1ZGNiYycsXG4gICd3b21hbl9waWxvdCc6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHUyNzA4XFx1ZmUwZicsXG4gICd3b21hbl9wbGF5aW5nX2hhbmRiYWxsJzonXFx1ZDgzZVxcdWRkM2UmendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ3dvbWFuX3BsYXlpbmdfd2F0ZXJfcG9sbyc6J1xcdWQ4M2VcXHVkZDNkJnp3ajtcXHUyNjQwXFx1ZmUwZicsXG4gICd3b21hbl9zY2llbnRpc3QnOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzZFxcdWRkMmMnLFxuICAnd29tYW5fc2hydWdnaW5nJzonXFx1ZDgzZVxcdWRkMzcmendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ3dvbWFuX3Npbmdlcic6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNjXFx1ZGZhNCcsXG4gICd3b21hbl9zdHVkZW50JzonXFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2NcXHVkZjkzJyxcbiAgJ3dvbWFuX3RlYWNoZXInOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzY1xcdWRmZWInLFxuICAnd29tYW5fdGVjaG5vbG9naXN0JzonXFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2RcXHVkY2JiJyxcbiAgJ3dvbWFuX3dpdGhfdHVyYmFuJzonXFx1ZDgzZFxcdWRjNzMmendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ3dvbWFuc19jbG90aGVzJzonXFx1ZDgzZFxcdWRjNWEnLFxuICAnd29tYW5zX2hhdCc6J1xcdWQ4M2RcXHVkYzUyJyxcbiAgJ3dvbWVuX3dyZXN0bGluZyc6J1xcdWQ4M2VcXHVkZDNjJnp3ajtcXHUyNjQwXFx1ZmUwZicsXG4gICd3b21lbnMnOidcXHVkODNkXFx1ZGViYScsXG4gICd3b3JsZF9tYXAnOidcXHVkODNkXFx1ZGRmYScsXG4gICd3b3JyaWVkJzonXFx1ZDgzZFxcdWRlMWYnLFxuICAnd3JlbmNoJzonXFx1ZDgzZFxcdWRkMjcnLFxuICAnd3JpdGluZ19oYW5kJzonXFx1MjcwZFxcdWZlMGYnLFxuICAneCc6J1xcdTI3NGMnLFxuICAneWVsbG93X2hlYXJ0JzonXFx1ZDgzZFxcdWRjOWInLFxuICAneWVuJzonXFx1ZDgzZFxcdWRjYjQnLFxuICAneWluX3lhbmcnOidcXHUyNjJmXFx1ZmUwZicsXG4gICd5dW0nOidcXHVkODNkXFx1ZGUwYicsXG4gICd6YXAnOidcXHUyNmExXFx1ZmUwZicsXG4gICd6aXBwZXJfbW91dGhfZmFjZSc6J1xcdWQ4M2VcXHVkZDEwJyxcbiAgJ3p6eic6J1xcdWQ4M2RcXHVkY2E0JyxcblxuICAvKiBzcGVjaWFsIGVtb2ppcyA6UCAqL1xuICAnb2N0b2NhdCc6ICAnPGltZyBhbHQ9XCI6b2N0b2NhdDpcIiBoZWlnaHQ9XCIyMFwiIHdpZHRoPVwiMjBcIiBhbGlnbj1cImFic21pZGRsZVwiIHNyYz1cImh0dHBzOi8vYXNzZXRzLWNkbi5naXRodWIuY29tL2ltYWdlcy9pY29ucy9lbW9qaS9vY3RvY2F0LnBuZ1wiPicsXG4gICdzaG93ZG93bic6ICc8c3BhbiBzdHlsZT1cImZvbnQtZmFtaWx5OiBcXCdBbm9ueW1vdXMgUHJvXFwnLCBtb25vc3BhY2U7IHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyB0ZXh0LWRlY29yYXRpb24tc3R5bGU6IGRhc2hlZDsgdGV4dC1kZWNvcmF0aW9uLWNvbG9yOiAjM2U4YjhhO3RleHQtdW5kZXJsaW5lLXBvc2l0aW9uOiB1bmRlcjtcIj5TPC9zcGFuPidcbn07XG5cclxuLyoqXG4gKiBDcmVhdGVkIGJ5IEVzdGV2YW8gb24gMzEtMDUtMjAxNS5cbiAqL1xuXG4vKipcbiAqIFNob3dkb3duIENvbnZlcnRlciBjbGFzc1xuICogQGNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gW2NvbnZlcnRlck9wdGlvbnNdXG4gKiBAcmV0dXJucyB7Q29udmVydGVyfVxuICovXG5zaG93ZG93bi5Db252ZXJ0ZXIgPSBmdW5jdGlvbiAoY29udmVydGVyT3B0aW9ucykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyXG4gICAgICAvKipcbiAgICAgICAqIE9wdGlvbnMgdXNlZCBieSB0aGlzIGNvbnZlcnRlclxuICAgICAgICogQHByaXZhdGVcbiAgICAgICAqIEB0eXBlIHt7fX1cbiAgICAgICAqL1xuICAgICAgb3B0aW9ucyA9IHt9LFxuXG4gICAgICAvKipcbiAgICAgICAqIExhbmd1YWdlIGV4dGVuc2lvbnMgdXNlZCBieSB0aGlzIGNvbnZlcnRlclxuICAgICAgICogQHByaXZhdGVcbiAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAqL1xuICAgICAgbGFuZ0V4dGVuc2lvbnMgPSBbXSxcblxuICAgICAgLyoqXG4gICAgICAgKiBPdXRwdXQgbW9kaWZpZXJzIGV4dGVuc2lvbnMgdXNlZCBieSB0aGlzIGNvbnZlcnRlclxuICAgICAgICogQHByaXZhdGVcbiAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAqL1xuICAgICAgb3V0cHV0TW9kaWZpZXJzID0gW10sXG5cbiAgICAgIC8qKlxuICAgICAgICogRXZlbnQgbGlzdGVuZXJzXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQHR5cGUge3t9fVxuICAgICAgICovXG4gICAgICBsaXN0ZW5lcnMgPSB7fSxcblxuICAgICAgLyoqXG4gICAgICAgKiBUaGUgZmxhdm9yIHNldCBpbiB0aGlzIGNvbnZlcnRlclxuICAgICAgICovXG4gICAgICBzZXRDb252Rmxhdm9yID0gc2V0Rmxhdm9yLFxuXG4gICAgLyoqXG4gICAgICogTWV0YWRhdGEgb2YgdGhlIGRvY3VtZW50XG4gICAgICogQHR5cGUge3twYXJzZWQ6IHt9LCByYXc6IHN0cmluZywgZm9ybWF0OiBzdHJpbmd9fVxuICAgICAqL1xuICAgICAgbWV0YWRhdGEgPSB7XG4gICAgICAgIHBhcnNlZDoge30sXG4gICAgICAgIHJhdzogJycsXG4gICAgICAgIGZvcm1hdDogJydcbiAgICAgIH07XG5cbiAgX2NvbnN0cnVjdG9yKCk7XG5cbiAgLyoqXG4gICAqIENvbnZlcnRlciBjb25zdHJ1Y3RvclxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gX2NvbnN0cnVjdG9yICgpIHtcbiAgICBjb252ZXJ0ZXJPcHRpb25zID0gY29udmVydGVyT3B0aW9ucyB8fCB7fTtcblxuICAgIGZvciAodmFyIGdPcHQgaW4gZ2xvYmFsT3B0aW9ucykge1xuICAgICAgaWYgKGdsb2JhbE9wdGlvbnMuaGFzT3duUHJvcGVydHkoZ09wdCkpIHtcbiAgICAgICAgb3B0aW9uc1tnT3B0XSA9IGdsb2JhbE9wdGlvbnNbZ09wdF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWVyZ2Ugb3B0aW9uc1xuICAgIGlmICh0eXBlb2YgY29udmVydGVyT3B0aW9ucyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGZvciAodmFyIG9wdCBpbiBjb252ZXJ0ZXJPcHRpb25zKSB7XG4gICAgICAgIGlmIChjb252ZXJ0ZXJPcHRpb25zLmhhc093blByb3BlcnR5KG9wdCkpIHtcbiAgICAgICAgICBvcHRpb25zW29wdF0gPSBjb252ZXJ0ZXJPcHRpb25zW29wdF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ0NvbnZlcnRlciBleHBlY3RzIHRoZSBwYXNzZWQgcGFyYW1ldGVyIHRvIGJlIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgY29udmVydGVyT3B0aW9ucyArXG4gICAgICAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5leHRlbnNpb25zKSB7XG4gICAgICBzaG93ZG93bi5oZWxwZXIuZm9yRWFjaChvcHRpb25zLmV4dGVuc2lvbnMsIF9wYXJzZUV4dGVuc2lvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIGV4dGVuc2lvblxuICAgKiBAcGFyYW0geyp9IGV4dFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW25hbWU9JyddXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBfcGFyc2VFeHRlbnNpb24gKGV4dCwgbmFtZSkge1xuXG4gICAgbmFtZSA9IG5hbWUgfHwgbnVsbDtcbiAgICAvLyBJZiBpdCdzIGEgc3RyaW5nLCB0aGUgZXh0ZW5zaW9uIHdhcyBwcmV2aW91c2x5IGxvYWRlZFxuICAgIGlmIChzaG93ZG93bi5oZWxwZXIuaXNTdHJpbmcoZXh0KSkge1xuICAgICAgZXh0ID0gc2hvd2Rvd24uaGVscGVyLnN0ZEV4dE5hbWUoZXh0KTtcbiAgICAgIG5hbWUgPSBleHQ7XG5cbiAgICAgIC8vIExFR0FDWV9TVVBQT1JUIENPREVcbiAgICAgIGlmIChzaG93ZG93bi5leHRlbnNpb25zW2V4dF0pIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdERVBSRUNBVElPTiBXQVJOSU5HOiAnICsgZXh0ICsgJyBpcyBhbiBvbGQgZXh0ZW5zaW9uIHRoYXQgdXNlcyBhIGRlcHJlY2F0ZWQgbG9hZGluZyBtZXRob2QuJyArXG4gICAgICAgICAgJ1BsZWFzZSBpbmZvcm0gdGhlIGRldmVsb3BlciB0aGF0IHRoZSBleHRlbnNpb24gc2hvdWxkIGJlIHVwZGF0ZWQhJyk7XG4gICAgICAgIGxlZ2FjeUV4dGVuc2lvbkxvYWRpbmcoc2hvd2Rvd24uZXh0ZW5zaW9uc1tleHRdLCBleHQpO1xuICAgICAgICByZXR1cm47XG4gICAgICAvLyBFTkQgTEVHQUNZIFNVUFBPUlQgQ09ERVxuXG4gICAgICB9IGVsc2UgaWYgKCFzaG93ZG93bi5oZWxwZXIuaXNVbmRlZmluZWQoZXh0ZW5zaW9uc1tleHRdKSkge1xuICAgICAgICBleHQgPSBleHRlbnNpb25zW2V4dF07XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKCdFeHRlbnNpb24gXCInICsgZXh0ICsgJ1wiIGNvdWxkIG5vdCBiZSBsb2FkZWQuIEl0IHdhcyBlaXRoZXIgbm90IGZvdW5kIG9yIGlzIG5vdCBhIHZhbGlkIGV4dGVuc2lvbi4nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXh0ID0gZXh0KCk7XG4gICAgfVxuXG4gICAgaWYgKCFzaG93ZG93bi5oZWxwZXIuaXNBcnJheShleHQpKSB7XG4gICAgICBleHQgPSBbZXh0XTtcbiAgICB9XG5cbiAgICB2YXIgdmFsaWRFeHQgPSB2YWxpZGF0ZShleHQsIG5hbWUpO1xuICAgIGlmICghdmFsaWRFeHQudmFsaWQpIHtcbiAgICAgIHRocm93IEVycm9yKHZhbGlkRXh0LmVycm9yKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4dC5sZW5ndGg7ICsraSkge1xuICAgICAgc3dpdGNoIChleHRbaV0udHlwZSkge1xuXG4gICAgICAgIGNhc2UgJ2xhbmcnOlxuICAgICAgICAgIGxhbmdFeHRlbnNpb25zLnB1c2goZXh0W2ldKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdvdXRwdXQnOlxuICAgICAgICAgIG91dHB1dE1vZGlmaWVycy5wdXNoKGV4dFtpXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoZXh0W2ldLmhhc093blByb3BlcnR5KCdsaXN0ZW5lcnMnKSkge1xuICAgICAgICBmb3IgKHZhciBsbiBpbiBleHRbaV0ubGlzdGVuZXJzKSB7XG4gICAgICAgICAgaWYgKGV4dFtpXS5saXN0ZW5lcnMuaGFzT3duUHJvcGVydHkobG4pKSB7XG4gICAgICAgICAgICBsaXN0ZW4obG4sIGV4dFtpXS5saXN0ZW5lcnNbbG5dKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBMRUdBQ1lfU1VQUE9SVFxuICAgKiBAcGFyYW0geyp9IGV4dFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKi9cbiAgZnVuY3Rpb24gbGVnYWN5RXh0ZW5zaW9uTG9hZGluZyAoZXh0LCBuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBleHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGV4dCA9IGV4dChuZXcgc2hvd2Rvd24uQ29udmVydGVyKCkpO1xuICAgIH1cbiAgICBpZiAoIXNob3dkb3duLmhlbHBlci5pc0FycmF5KGV4dCkpIHtcbiAgICAgIGV4dCA9IFtleHRdO1xuICAgIH1cbiAgICB2YXIgdmFsaWQgPSB2YWxpZGF0ZShleHQsIG5hbWUpO1xuXG4gICAgaWYgKCF2YWxpZC52YWxpZCkge1xuICAgICAgdGhyb3cgRXJyb3IodmFsaWQuZXJyb3IpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXh0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBzd2l0Y2ggKGV4dFtpXS50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2xhbmcnOlxuICAgICAgICAgIGxhbmdFeHRlbnNpb25zLnB1c2goZXh0W2ldKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnb3V0cHV0JzpcbiAgICAgICAgICBvdXRwdXRNb2RpZmllcnMucHVzaChleHRbaV0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0Oi8vIHNob3VsZCBuZXZlciByZWFjaCBoZXJlXG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ0V4dGVuc2lvbiBsb2FkZXIgZXJyb3I6IFR5cGUgdW5yZWNvZ25pemVkISEhJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byBhbiBldmVudFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgZnVuY3Rpb24gbGlzdGVuIChuYW1lLCBjYWxsYmFjaykge1xuICAgIGlmICghc2hvd2Rvd24uaGVscGVyLmlzU3RyaW5nKG5hbWUpKSB7XG4gICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBhcmd1bWVudCBpbiBjb252ZXJ0ZXIubGlzdGVuKCkgbWV0aG9kOiBuYW1lIG11c3QgYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIG5hbWUgKyAnIGdpdmVuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQgaW4gY29udmVydGVyLmxpc3RlbigpIG1ldGhvZDogY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uLCBidXQgJyArIHR5cGVvZiBjYWxsYmFjayArICcgZ2l2ZW4nKTtcbiAgICB9XG5cbiAgICBpZiAoIWxpc3RlbmVycy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgbGlzdGVuZXJzW25hbWVdID0gW107XG4gICAgfVxuICAgIGxpc3RlbmVyc1tuYW1lXS5wdXNoKGNhbGxiYWNrKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJUcmltSW5wdXRUZXh0ICh0ZXh0KSB7XG4gICAgdmFyIHJzcCA9IHRleHQubWF0Y2goL15cXHMqLylbMF0ubGVuZ3RoLFxuICAgICAgICByZ3ggPSBuZXcgUmVnRXhwKCdeXFxcXHN7MCwnICsgcnNwICsgJ30nLCAnZ20nKTtcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKHJneCwgJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIGFuIGV2ZW50XG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnROYW1lIEV2ZW50IG5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgVGV4dFxuICAgKiBAcGFyYW0ge3t9fSBvcHRpb25zIENvbnZlcnRlciBPcHRpb25zXG4gICAqIEBwYXJhbSB7e319IGdsb2JhbHNcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHRoaXMuX2Rpc3BhdGNoID0gZnVuY3Rpb24gZGlzcGF0Y2ggKGV2dE5hbWUsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgICBpZiAobGlzdGVuZXJzLmhhc093blByb3BlcnR5KGV2dE5hbWUpKSB7XG4gICAgICBmb3IgKHZhciBlaSA9IDA7IGVpIDwgbGlzdGVuZXJzW2V2dE5hbWVdLmxlbmd0aDsgKytlaSkge1xuICAgICAgICB2YXIgblRleHQgPSBsaXN0ZW5lcnNbZXZ0TmFtZV1bZWldKGV2dE5hbWUsIHRleHQsIHRoaXMsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgICAgICBpZiAoblRleHQgJiYgdHlwZW9mIG5UZXh0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRleHQgPSBuVGV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGV4dDtcbiAgfTtcblxuICAvKipcbiAgICogTGlzdGVuIHRvIGFuIGV2ZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAqIEByZXR1cm5zIHtzaG93ZG93bi5Db252ZXJ0ZXJ9XG4gICAqL1xuICB0aGlzLmxpc3RlbiA9IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgIGxpc3RlbihuYW1lLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgbWFya2Rvd24gc3RyaW5nIGludG8gSFRNTFxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIHRoaXMubWFrZUh0bWwgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgIC8vY2hlY2sgaWYgdGV4dCBpcyBub3QgZmFsc3lcbiAgICBpZiAoIXRleHQpIHtcbiAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cblxuICAgIHZhciBnbG9iYWxzID0ge1xuICAgICAgZ0h0bWxCbG9ja3M6ICAgICBbXSxcbiAgICAgIGdIdG1sTWRCbG9ja3M6ICAgW10sXG4gICAgICBnSHRtbFNwYW5zOiAgICAgIFtdLFxuICAgICAgZ1VybHM6ICAgICAgICAgICB7fSxcbiAgICAgIGdUaXRsZXM6ICAgICAgICAge30sXG4gICAgICBnRGltZW5zaW9uczogICAgIHt9LFxuICAgICAgZ0xpc3RMZXZlbDogICAgICAwLFxuICAgICAgaGFzaExpbmtDb3VudHM6ICB7fSxcbiAgICAgIGxhbmdFeHRlbnNpb25zOiAgbGFuZ0V4dGVuc2lvbnMsXG4gICAgICBvdXRwdXRNb2RpZmllcnM6IG91dHB1dE1vZGlmaWVycyxcbiAgICAgIGNvbnZlcnRlcjogICAgICAgdGhpcyxcbiAgICAgIGdoQ29kZUJsb2NrczogICAgW10sXG4gICAgICBtZXRhZGF0YToge1xuICAgICAgICBwYXJzZWQ6IHt9LFxuICAgICAgICByYXc6ICcnLFxuICAgICAgICBmb3JtYXQ6ICcnXG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIFRoaXMgbGV0cyB1cyB1c2UgwqggdHJlbWEgYXMgYW4gZXNjYXBlIGNoYXIgdG8gYXZvaWQgbWQ1IGhhc2hlc1xuICAgIC8vIFRoZSBjaG9pY2Ugb2YgY2hhcmFjdGVyIGlzIGFyYml0cmFyeTsgYW55dGhpbmcgdGhhdCBpc24ndFxuICAgIC8vIG1hZ2ljIGluIE1hcmtkb3duIHdpbGwgd29yay5cbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC/CqC9nLCAnwqhUJyk7XG5cbiAgICAvLyBSZXBsYWNlICQgd2l0aCDCqERcbiAgICAvLyBSZWdFeHAgaW50ZXJwcmV0cyAkIGFzIGEgc3BlY2lhbCBjaGFyYWN0ZXJcbiAgICAvLyB3aGVuIGl0J3MgaW4gYSByZXBsYWNlbWVudCBzdHJpbmdcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXCQvZywgJ8KoRCcpO1xuXG4gICAgLy8gU3RhbmRhcmRpemUgbGluZSBlbmRpbmdzXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxyXFxuL2csICdcXG4nKTsgLy8gRE9TIHRvIFVuaXhcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHIvZywgJ1xcbicpOyAvLyBNYWMgdG8gVW5peFxuXG4gICAgLy8gU3RhcmRhcmRpemUgbGluZSBzcGFjZXNcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHUwMEEwL2csICcmbmJzcDsnKTtcblxuICAgIGlmIChvcHRpb25zLnNtYXJ0SW5kZW50YXRpb25GaXgpIHtcbiAgICAgIHRleHQgPSByVHJpbUlucHV0VGV4dCh0ZXh0KTtcbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgdGV4dCBiZWdpbnMgYW5kIGVuZHMgd2l0aCBhIGNvdXBsZSBvZiBuZXdsaW5lczpcbiAgICB0ZXh0ID0gJ1xcblxcbicgKyB0ZXh0ICsgJ1xcblxcbic7XG5cbiAgICAvLyBkZXRhYlxuICAgIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2RldGFiJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgICAvKipcbiAgICAgKiBTdHJpcCBhbnkgbGluZXMgY29uc2lzdGluZyBvbmx5IG9mIHNwYWNlcyBhbmQgdGFicy5cbiAgICAgKiBUaGlzIG1ha2VzIHN1YnNlcXVlbnQgcmVnZXhzIGVhc2llciB0byB3cml0ZSwgYmVjYXVzZSB3ZSBjYW5cbiAgICAgKiBtYXRjaCBjb25zZWN1dGl2ZSBibGFuayBsaW5lcyB3aXRoIC9cXG4rLyBpbnN0ZWFkIG9mIHNvbWV0aGluZ1xuICAgICAqIGNvbnRvcnRlZCBsaWtlIC9bIFxcdF0qXFxuKy9cbiAgICAgKi9cbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9eWyBcXHRdKyQvbWcsICcnKTtcblxuICAgIC8vcnVuIGxhbmd1YWdlRXh0ZW5zaW9uc1xuICAgIHNob3dkb3duLmhlbHBlci5mb3JFYWNoKGxhbmdFeHRlbnNpb25zLCBmdW5jdGlvbiAoZXh0KSB7XG4gICAgICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdydW5FeHRlbnNpb24nKShleHQsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgIH0pO1xuXG4gICAgLy8gcnVuIHRoZSBzdWIgcGFyc2Vyc1xuICAgIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ldGFkYXRhJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignaGFzaFByZUNvZGVUYWdzJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignZ2l0aHViQ29kZUJsb2NrcycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hIVE1MQmxvY2tzJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignaGFzaENvZGVUYWdzJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignc3RyaXBMaW5rRGVmaW5pdGlvbnMnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdibG9ja0dhbXV0JykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcigndW5oYXNoSFRNTFNwYW5zJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcigndW5lc2NhcGVTcGVjaWFsQ2hhcnMnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAgIC8vIGF0dGFja2xhYjogUmVzdG9yZSBkb2xsYXIgc2lnbnNcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC/CqEQvZywgJyQkJyk7XG5cbiAgICAvLyBhdHRhY2tsYWI6IFJlc3RvcmUgdHJlbWFzXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvwqhUL2csICfCqCcpO1xuXG4gICAgLy8gcmVuZGVyIGEgY29tcGxldGUgaHRtbCBkb2N1bWVudCBpbnN0ZWFkIG9mIGEgcGFydGlhbCBpZiB0aGUgb3B0aW9uIGlzIGVuYWJsZWRcbiAgICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdjb21wbGV0ZUhUTUxEb2N1bWVudCcpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gICAgLy8gUnVuIG91dHB1dCBtb2RpZmllcnNcbiAgICBzaG93ZG93bi5oZWxwZXIuZm9yRWFjaChvdXRwdXRNb2RpZmllcnMsIGZ1bmN0aW9uIChleHQpIHtcbiAgICAgIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ3J1bkV4dGVuc2lvbicpKGV4dCwgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgfSk7XG5cbiAgICAvLyB1cGRhdGUgbWV0YWRhdGFcbiAgICBtZXRhZGF0YSA9IGdsb2JhbHMubWV0YWRhdGE7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGFuIEhUTUwgc3RyaW5nIGludG8gYSBtYXJrZG93biBzdHJpbmdcbiAgICogQHBhcmFtIHNyY1xuICAgKiBAcGFyYW0gW0hUTUxQYXJzZXJdIEEgV0hBVFdHIERPTSBhbmQgSFRNTCBwYXJzZXIsIHN1Y2ggYXMgSlNET00uIElmIG5vbmUgaXMgc3VwcGxpZWQsIHdpbmRvdy5kb2N1bWVudCB3aWxsIGJlIHVzZWQuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICB0aGlzLm1ha2VNYXJrZG93biA9IHRoaXMubWFrZU1kID0gZnVuY3Rpb24gKHNyYywgSFRNTFBhcnNlcikge1xuXG4gICAgLy8gcmVwbGFjZSBcXHJcXG4gd2l0aCBcXG5cbiAgICBzcmMgPSBzcmMucmVwbGFjZSgvXFxyXFxuL2csICdcXG4nKTtcbiAgICBzcmMgPSBzcmMucmVwbGFjZSgvXFxyL2csICdcXG4nKTsgLy8gb2xkIG1hY3NcblxuICAgIC8vIGR1ZSB0byBhbiBlZGdlIGNhc2UsIHdlIG5lZWQgdG8gZmluZCB0aGlzOiA+IDxcbiAgICAvLyB0byBwcmV2ZW50IHJlbW92aW5nIG9mIG5vbiBzaWxlbnQgd2hpdGUgc3BhY2VzXG4gICAgLy8gZXg6IDxlbT50aGlzIGlzPC9lbT4gPHN0cm9uZz5zcGFydGE8L3N0cm9uZz5cbiAgICBzcmMgPSBzcmMucmVwbGFjZSgvPlsgXFx0XSs8LywgJz7CqE5CU1A7PCcpO1xuXG4gICAgaWYgKCFIVE1MUGFyc2VyKSB7XG4gICAgICBpZiAod2luZG93ICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgICBIVE1MUGFyc2VyID0gd2luZG93LmRvY3VtZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdIVE1MUGFyc2VyIGlzIHVuZGVmaW5lZC4gSWYgaW4gYSB3ZWJ3b3JrZXIgb3Igbm9kZWpzIGVudmlyb25tZW50LCB5b3UgbmVlZCB0byBwcm92aWRlIGEgV0hBVFdHIERPTSBhbmQgSFRNTCBzdWNoIGFzIEpTRE9NJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGRvYyA9IEhUTUxQYXJzZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZG9jLmlubmVySFRNTCA9IHNyYztcblxuICAgIHZhciBnbG9iYWxzID0ge1xuICAgICAgcHJlTGlzdDogc3Vic3RpdHV0ZVByZUNvZGVUYWdzKGRvYylcbiAgICB9O1xuXG4gICAgLy8gcmVtb3ZlIGFsbCBuZXdsaW5lcyBhbmQgY29sbGFwc2Ugc3BhY2VzXG4gICAgY2xlYW4oZG9jKTtcblxuICAgIC8vIHNvbWUgc3R1ZmYsIGxpa2UgYWNjaWRlbnRhbCByZWZlcmVuY2UgbGlua3MgbXVzdCBub3cgYmUgZXNjYXBlZFxuICAgIC8vIFRPRE9cbiAgICAvLyBkb2MuaW5uZXJIVE1MID0gZG9jLmlubmVySFRNTC5yZXBsYWNlKC9cXFtbXFxTXFx0IF1dLyk7XG5cbiAgICB2YXIgbm9kZXMgPSBkb2MuY2hpbGROb2RlcyxcbiAgICAgICAgbWREb2MgPSAnJztcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG1kRG9jICs9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLm5vZGUnKShub2Rlc1tpXSwgZ2xvYmFscyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW4gKG5vZGUpIHtcbiAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgbm9kZS5jaGlsZE5vZGVzLmxlbmd0aDsgKytuKSB7XG4gICAgICAgIHZhciBjaGlsZCA9IG5vZGUuY2hpbGROb2Rlc1tuXTtcbiAgICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgICAgaWYgKCEvXFxTLy50ZXN0KGNoaWxkLm5vZGVWYWx1ZSkpIHtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgLS1uO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGlsZC5ub2RlVmFsdWUgPSBjaGlsZC5ub2RlVmFsdWUuc3BsaXQoJ1xcbicpLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIGNoaWxkLm5vZGVWYWx1ZSA9IGNoaWxkLm5vZGVWYWx1ZS5yZXBsYWNlKC8oXFxzKSsvZywgJyQxJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgICAgY2xlYW4oY2hpbGQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmluZCBhbGwgcHJlIHRhZ3MgYW5kIHJlcGxhY2UgY29udGVudHMgd2l0aCBwbGFjZWhvbGRlclxuICAgIC8vIHdlIG5lZWQgdGhpcyBzbyB0aGF0IHdlIGNhbiByZW1vdmUgYWxsIGluZGVudGF0aW9uIGZyb20gaHRtbFxuICAgIC8vIHRvIGVhc2UgdXAgcGFyc2luZ1xuICAgIGZ1bmN0aW9uIHN1YnN0aXR1dGVQcmVDb2RlVGFncyAoZG9jKSB7XG5cbiAgICAgIHZhciBwcmVzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ3ByZScpLFxuICAgICAgICAgIHByZXNQSCA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByZXMubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBpZiAocHJlc1tpXS5jaGlsZEVsZW1lbnRDb3VudCA9PT0gMSAmJiBwcmVzW2ldLmZpcnN0Q2hpbGQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnY29kZScpIHtcbiAgICAgICAgICB2YXIgY29udGVudCA9IHByZXNbaV0uZmlyc3RDaGlsZC5pbm5lckhUTUwudHJpbSgpLFxuICAgICAgICAgICAgICBsYW5ndWFnZSA9IHByZXNbaV0uZmlyc3RDaGlsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGFuZ3VhZ2UnKSB8fCAnJztcblxuICAgICAgICAgIC8vIGlmIGRhdGEtbGFuZ3VhZ2UgYXR0cmlidXRlIGlzIG5vdCBkZWZpbmVkLCB0aGVuIHdlIGxvb2sgZm9yIGNsYXNzIGxhbmd1YWdlLSpcbiAgICAgICAgICBpZiAobGFuZ3VhZ2UgPT09ICcnKSB7XG4gICAgICAgICAgICB2YXIgY2xhc3NlcyA9IHByZXNbaV0uZmlyc3RDaGlsZC5jbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgY2xhc3Nlcy5sZW5ndGg7ICsrYykge1xuICAgICAgICAgICAgICB2YXIgbWF0Y2hlcyA9IGNsYXNzZXNbY10ubWF0Y2goL15sYW5ndWFnZS0oLispJC8pO1xuICAgICAgICAgICAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxhbmd1YWdlID0gbWF0Y2hlc1sxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHVuZXNjYXBlIGh0bWwgZW50aXRpZXMgaW4gY29udGVudFxuICAgICAgICAgIGNvbnRlbnQgPSBzaG93ZG93bi5oZWxwZXIudW5lc2NhcGVIVE1MRW50aXRpZXMoY29udGVudCk7XG5cbiAgICAgICAgICBwcmVzUEgucHVzaChjb250ZW50KTtcbiAgICAgICAgICBwcmVzW2ldLm91dGVySFRNTCA9ICc8cHJlY29kZSBsYW5ndWFnZT1cIicgKyBsYW5ndWFnZSArICdcIiBwcmVjb2RlbnVtPVwiJyArIGkudG9TdHJpbmcoKSArICdcIj48L3ByZWNvZGU+JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcmVzUEgucHVzaChwcmVzW2ldLmlubmVySFRNTCk7XG4gICAgICAgICAgcHJlc1tpXS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICBwcmVzW2ldLnNldEF0dHJpYnV0ZSgncHJlbnVtJywgaS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHByZXNQSDtcbiAgICB9XG5cbiAgICByZXR1cm4gbWREb2M7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldCBhbiBvcHRpb24gb2YgdGhpcyBDb252ZXJ0ZXIgaW5zdGFuY2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqL1xuICB0aGlzLnNldE9wdGlvbiA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgb3B0aW9uc1trZXldID0gdmFsdWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgb3B0aW9uIG9mIHRoaXMgQ29udmVydGVyIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICB0aGlzLmdldE9wdGlvbiA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gb3B0aW9uc1trZXldO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG9wdGlvbnMgb2YgdGhpcyBDb252ZXJ0ZXIgaW5zdGFuY2VcbiAgICogQHJldHVybnMge3t9fVxuICAgKi9cbiAgdGhpcy5nZXRPcHRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgZXh0ZW5zaW9uIHRvIFRISVMgY29udmVydGVyXG4gICAqIEBwYXJhbSB7e319IGV4dGVuc2lvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gW25hbWU9bnVsbF1cbiAgICovXG4gIHRoaXMuYWRkRXh0ZW5zaW9uID0gZnVuY3Rpb24gKGV4dGVuc2lvbiwgbmFtZSkge1xuICAgIG5hbWUgPSBuYW1lIHx8IG51bGw7XG4gICAgX3BhcnNlRXh0ZW5zaW9uKGV4dGVuc2lvbiwgbmFtZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVzZSBhIGdsb2JhbCByZWdpc3RlcmVkIGV4dGVuc2lvbiB3aXRoIFRISVMgY29udmVydGVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBleHRlbnNpb25OYW1lIE5hbWUgb2YgdGhlIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCBleHRlbnNpb25cbiAgICovXG4gIHRoaXMudXNlRXh0ZW5zaW9uID0gZnVuY3Rpb24gKGV4dGVuc2lvbk5hbWUpIHtcbiAgICBfcGFyc2VFeHRlbnNpb24oZXh0ZW5zaW9uTmFtZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZmxhdm9yIFRISVMgY29udmVydGVyIHNob3VsZCB1c2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICovXG4gIHRoaXMuc2V0Rmxhdm9yID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAoIWZsYXZvci5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgdGhyb3cgRXJyb3IobmFtZSArICcgZmxhdm9yIHdhcyBub3QgZm91bmQnKTtcbiAgICB9XG4gICAgdmFyIHByZXNldCA9IGZsYXZvcltuYW1lXTtcbiAgICBzZXRDb252Rmxhdm9yID0gbmFtZTtcbiAgICBmb3IgKHZhciBvcHRpb24gaW4gcHJlc2V0KSB7XG4gICAgICBpZiAocHJlc2V0Lmhhc093blByb3BlcnR5KG9wdGlvbikpIHtcbiAgICAgICAgb3B0aW9uc1tvcHRpb25dID0gcHJlc2V0W29wdGlvbl07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnRseSBzZXQgZmxhdm9yIG9mIHRoaXMgY29udmVydGVyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICB0aGlzLmdldEZsYXZvciA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gc2V0Q29udkZsYXZvcjtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGV4dGVuc2lvbiBmcm9tIFRISVMgY29udmVydGVyLlxuICAgKiBOb3RlOiBUaGlzIGlzIGEgY29zdGx5IG9wZXJhdGlvbi4gSXQncyBiZXR0ZXIgdG8gaW5pdGlhbGl6ZSBhIG5ldyBjb252ZXJ0ZXJcbiAgICogYW5kIHNwZWNpZnkgdGhlIGV4dGVuc2lvbnMgeW91IHdpc2ggdG8gdXNlXG4gICAqIEBwYXJhbSB7QXJyYXl9IGV4dGVuc2lvblxuICAgKi9cbiAgdGhpcy5yZW1vdmVFeHRlbnNpb24gPSBmdW5jdGlvbiAoZXh0ZW5zaW9uKSB7XG4gICAgaWYgKCFzaG93ZG93bi5oZWxwZXIuaXNBcnJheShleHRlbnNpb24pKSB7XG4gICAgICBleHRlbnNpb24gPSBbZXh0ZW5zaW9uXTtcbiAgICB9XG4gICAgZm9yICh2YXIgYSA9IDA7IGEgPCBleHRlbnNpb24ubGVuZ3RoOyArK2EpIHtcbiAgICAgIHZhciBleHQgPSBleHRlbnNpb25bYV07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhbmdFeHRlbnNpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChsYW5nRXh0ZW5zaW9uc1tpXSA9PT0gZXh0KSB7XG4gICAgICAgICAgbGFuZ0V4dGVuc2lvbnNbaV0uc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgb3V0cHV0TW9kaWZpZXJzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChvdXRwdXRNb2RpZmllcnNbaWldID09PSBleHQpIHtcbiAgICAgICAgICBvdXRwdXRNb2RpZmllcnNbaWldLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogR2V0IGFsbCBleHRlbnNpb24gb2YgVEhJUyBjb252ZXJ0ZXJcbiAgICogQHJldHVybnMge3tsYW5ndWFnZTogQXJyYXksIG91dHB1dDogQXJyYXl9fVxuICAgKi9cbiAgdGhpcy5nZXRBbGxFeHRlbnNpb25zID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsYW5ndWFnZTogbGFuZ0V4dGVuc2lvbnMsXG4gICAgICBvdXRwdXQ6IG91dHB1dE1vZGlmaWVyc1xuICAgIH07XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWV0YWRhdGEgb2YgdGhlIHByZXZpb3VzbHkgcGFyc2VkIGRvY3VtZW50XG4gICAqIEBwYXJhbSByYXdcbiAgICogQHJldHVybnMge3N0cmluZ3x7fX1cbiAgICovXG4gIHRoaXMuZ2V0TWV0YWRhdGEgPSBmdW5jdGlvbiAocmF3KSB7XG4gICAgaWYgKHJhdykge1xuICAgICAgcmV0dXJuIG1ldGFkYXRhLnJhdztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1ldGFkYXRhLnBhcnNlZDtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWV0YWRhdGEgZm9ybWF0IG9mIHRoZSBwcmV2aW91c2x5IHBhcnNlZCBkb2N1bWVudFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgdGhpcy5nZXRNZXRhZGF0YUZvcm1hdCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbWV0YWRhdGEuZm9ybWF0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBQcml2YXRlOiBzZXQgYSBzaW5nbGUga2V5LCB2YWx1ZSBtZXRhZGF0YSBwYWlyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqL1xuICB0aGlzLl9zZXRNZXRhZGF0YVBhaXIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgIG1ldGFkYXRhLnBhcnNlZFtrZXldID0gdmFsdWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIFByaXZhdGU6IHNldCBtZXRhZGF0YSBmb3JtYXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdFxuICAgKi9cbiAgdGhpcy5fc2V0TWV0YWRhdGFGb3JtYXQgPSBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgbWV0YWRhdGEuZm9ybWF0ID0gZm9ybWF0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBQcml2YXRlOiBzZXQgbWV0YWRhdGEgcmF3IHRleHRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJhd1xuICAgKi9cbiAgdGhpcy5fc2V0TWV0YWRhdGFSYXcgPSBmdW5jdGlvbiAocmF3KSB7XG4gICAgbWV0YWRhdGEucmF3ID0gcmF3O1xuICB9O1xufTtcblxyXG4vKipcbiAqIFR1cm4gTWFya2Rvd24gbGluayBzaG9ydGN1dHMgaW50byBYSFRNTCA8YT4gdGFncy5cbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCdhbmNob3JzJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2FuY2hvcnMuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgdmFyIHdyaXRlQW5jaG9yVGFnID0gZnVuY3Rpb24gKHdob2xlTWF0Y2gsIGxpbmtUZXh0LCBsaW5rSWQsIHVybCwgbTUsIG02LCB0aXRsZSkge1xuICAgIGlmIChzaG93ZG93bi5oZWxwZXIuaXNVbmRlZmluZWQodGl0bGUpKSB7XG4gICAgICB0aXRsZSA9ICcnO1xuICAgIH1cbiAgICBsaW5rSWQgPSBsaW5rSWQudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgZXhwbGljaXQgZW1wdHkgdXJsXG4gICAgaWYgKHdob2xlTWF0Y2guc2VhcmNoKC9cXCg8P1xccyo+PyA/KFsnXCJdLipbJ1wiXSk/XFwpJC9tKSA+IC0xKSB7XG4gICAgICB1cmwgPSAnJztcbiAgICB9IGVsc2UgaWYgKCF1cmwpIHtcbiAgICAgIGlmICghbGlua0lkKSB7XG4gICAgICAgIC8vIGxvd2VyLWNhc2UgYW5kIHR1cm4gZW1iZWRkZWQgbmV3bGluZXMgaW50byBzcGFjZXNcbiAgICAgICAgbGlua0lkID0gbGlua1RleHQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gP1xcbi9nLCAnICcpO1xuICAgICAgfVxuICAgICAgdXJsID0gJyMnICsgbGlua0lkO1xuXG4gICAgICBpZiAoIXNob3dkb3duLmhlbHBlci5pc1VuZGVmaW5lZChnbG9iYWxzLmdVcmxzW2xpbmtJZF0pKSB7XG4gICAgICAgIHVybCA9IGdsb2JhbHMuZ1VybHNbbGlua0lkXTtcbiAgICAgICAgaWYgKCFzaG93ZG93bi5oZWxwZXIuaXNVbmRlZmluZWQoZ2xvYmFscy5nVGl0bGVzW2xpbmtJZF0pKSB7XG4gICAgICAgICAgdGl0bGUgPSBnbG9iYWxzLmdUaXRsZXNbbGlua0lkXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHdob2xlTWF0Y2g7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy91cmwgPSBzaG93ZG93bi5oZWxwZXIuZXNjYXBlQ2hhcmFjdGVycyh1cmwsICcqXycsIGZhbHNlKTsgLy8gcmVwbGFjZWQgbGluZSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXG4gICAgdXJsID0gdXJsLnJlcGxhY2Uoc2hvd2Rvd24uaGVscGVyLnJlZ2V4ZXMuYXN0ZXJpc2tEYXNoQW5kQ29sb24sIHNob3dkb3duLmhlbHBlci5lc2NhcGVDaGFyYWN0ZXJzQ2FsbGJhY2spO1xuXG4gICAgdmFyIHJlc3VsdCA9ICc8YSBocmVmPVwiJyArIHVybCArICdcIic7XG5cbiAgICBpZiAodGl0bGUgIT09ICcnICYmIHRpdGxlICE9PSBudWxsKSB7XG4gICAgICB0aXRsZSA9IHRpdGxlLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKTtcbiAgICAgIC8vdGl0bGUgPSBzaG93ZG93bi5oZWxwZXIuZXNjYXBlQ2hhcmFjdGVycyh0aXRsZSwgJypfJywgZmFsc2UpOyAvLyByZXBsYWNlZCBsaW5lIHRvIGltcHJvdmUgcGVyZm9ybWFuY2VcbiAgICAgIHRpdGxlID0gdGl0bGUucmVwbGFjZShzaG93ZG93bi5oZWxwZXIucmVnZXhlcy5hc3Rlcmlza0Rhc2hBbmRDb2xvbiwgc2hvd2Rvd24uaGVscGVyLmVzY2FwZUNoYXJhY3RlcnNDYWxsYmFjayk7XG4gICAgICByZXN1bHQgKz0gJyB0aXRsZT1cIicgKyB0aXRsZSArICdcIic7XG4gICAgfVxuXG4gICAgLy8gb3B0aW9uTGlua3NJbk5ld1dpbmRvdyBvbmx5IGFwcGxpZXNcbiAgICAvLyB0byBleHRlcm5hbCBsaW5rcy4gSGFzaCBsaW5rcyAoIykgb3BlbiBpbiBzYW1lIHBhZ2VcbiAgICBpZiAob3B0aW9ucy5vcGVuTGlua3NJbk5ld1dpbmRvdyAmJiAhL14jLy50ZXN0KHVybCkpIHtcbiAgICAgIC8vIGVzY2FwZWQgX1xuICAgICAgcmVzdWx0ICs9ICcgdGFyZ2V0PVwiwqhFOTVFYmxhbmtcIic7XG4gICAgfVxuXG4gICAgcmVzdWx0ICs9ICc+JyArIGxpbmtUZXh0ICsgJzwvYT4nO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBGaXJzdCwgaGFuZGxlIHJlZmVyZW5jZS1zdHlsZSBsaW5rczogW2xpbmsgdGV4dF0gW2lkXVxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXFsoKD86XFxbW15cXF1dKl18W15cXFtcXF1dKSopXSA/KD86XFxuICopP1xcWyguKj8pXSgpKCkoKSgpL2csIHdyaXRlQW5jaG9yVGFnKTtcblxuICAvLyBOZXh0LCBpbmxpbmUtc3R5bGUgbGlua3M6IFtsaW5rIHRleHRdKHVybCBcIm9wdGlvbmFsIHRpdGxlXCIpXG4gIC8vIGNhc2VzIHdpdGggY3JhenkgdXJscyBsaWtlIC4vaW1hZ2UvY2F0MSkucG5nXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcWygoPzpcXFtbXlxcXV0qXXxbXlxcW1xcXV0pKildKClbIFxcdF0qXFwoWyBcXHRdPzwoW14+XSopPig/OlsgXFx0XSooKFtcIiddKShbXlwiXSo/KVxcNSkpP1sgXFx0XT9cXCkvZyxcbiAgICB3cml0ZUFuY2hvclRhZyk7XG5cbiAgLy8gbm9ybWFsIGNhc2VzXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcWygoPzpcXFtbXlxcXV0qXXxbXlxcW1xcXV0pKildKClbIFxcdF0qXFwoWyBcXHRdPzw/KFtcXFNdKz8oPzpcXChbXFxTXSo/XFwpW1xcU10qPyk/KT4/KD86WyBcXHRdKigoW1wiJ10pKFteXCJdKj8pXFw1KSk/WyBcXHRdP1xcKS9nLFxuICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQW5jaG9yVGFnKTtcblxuICAvLyBoYW5kbGUgcmVmZXJlbmNlLXN0eWxlIHNob3J0Y3V0czogW2xpbmsgdGV4dF1cbiAgLy8gVGhlc2UgbXVzdCBjb21lIGxhc3QgaW4gY2FzZSB5b3UndmUgYWxzbyBnb3QgW2xpbmsgdGVzdF1bMV1cbiAgLy8gb3IgW2xpbmsgdGVzdF0oL2ZvbylcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxbKFteXFxbXFxdXSspXSgpKCkoKSgpKCkvZywgd3JpdGVBbmNob3JUYWcpO1xuXG4gIC8vIExhc3RseSBoYW5kbGUgR2l0aHViTWVudGlvbnMgaWYgb3B0aW9uIGlzIGVuYWJsZWRcbiAgaWYgKG9wdGlvbnMuZ2hNZW50aW9ucykge1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoLyhefFxccykoXFxcXCk/KEAoW2EtelxcZF0rKD86W2EtelxcZC4tXSs/W2EtelxcZF0rKSopKS9nbWksIGZ1bmN0aW9uICh3bSwgc3QsIGVzY2FwZSwgbWVudGlvbnMsIHVzZXJuYW1lKSB7XG4gICAgICBpZiAoZXNjYXBlID09PSAnXFxcXCcpIHtcbiAgICAgICAgcmV0dXJuIHN0ICsgbWVudGlvbnM7XG4gICAgICB9XG5cbiAgICAgIC8vY2hlY2sgaWYgb3B0aW9ucy5naE1lbnRpb25zTGluayBpcyBhIHN0cmluZ1xuICAgICAgaWYgKCFzaG93ZG93bi5oZWxwZXIuaXNTdHJpbmcob3B0aW9ucy5naE1lbnRpb25zTGluaykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnaE1lbnRpb25zTGluayBvcHRpb24gbXVzdCBiZSBhIHN0cmluZycpO1xuICAgICAgfVxuICAgICAgdmFyIGxuayA9IG9wdGlvbnMuZ2hNZW50aW9uc0xpbmsucmVwbGFjZSgvXFx7dX0vZywgdXNlcm5hbWUpLFxuICAgICAgICAgIHRhcmdldCA9ICcnO1xuICAgICAgaWYgKG9wdGlvbnMub3BlbkxpbmtzSW5OZXdXaW5kb3cpIHtcbiAgICAgICAgdGFyZ2V0ID0gJyB0YXJnZXQ9XCLCqEU5NUVibGFua1wiJztcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdCArICc8YSBocmVmPVwiJyArIGxuayArICdcIicgKyB0YXJnZXQgKyAnPicgKyBtZW50aW9ucyArICc8L2E+JztcbiAgICB9KTtcbiAgfVxuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2FuY2hvcnMuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG4vLyB1cmwgYWxsb3dlZCBjaGFycyBbYS16XFxkXy5+Oi8/I1tdQCEkJicoKSorLDs9LV1cblxudmFyIHNpbXBsZVVSTFJlZ2V4ICA9IC8oWyp+X10rfFxcYikoKChodHRwcz98ZnRwfGRpY3QpOlxcL1xcL3x3d3dcXC4pW14nXCI+XFxzXSs/XFwuW14nXCI+XFxzXSs/KSgpKFxcMSk/KD89XFxzfCQpKD8hW1wiPD5dKS9naSxcbiAgICBzaW1wbGVVUkxSZWdleDIgPSAvKFsqfl9dK3xcXGIpKCgoaHR0cHM/fGZ0cHxkaWN0KTpcXC9cXC98d3d3XFwuKVteJ1wiPlxcc10rXFwuW14nXCI+XFxzXSs/KShbLiE/LCgpXFxbXFxdXSk/KFxcMSk/KD89XFxzfCQpKD8hW1wiPD5dKS9naSxcbiAgICBkZWxpbVVybFJlZ2V4ICAgPSAvKCk8KCgoaHR0cHM/fGZ0cHxkaWN0KTpcXC9cXC98d3d3XFwuKVteJ1wiPlxcc10rKSgpPigpL2dpLFxuICAgIHNpbXBsZU1haWxSZWdleCA9IC8oXnxcXHMpKD86bWFpbHRvOik/KFtBLVphLXowLTkhIyQlJicqKy0vPT9eX2B7fH1+Ll0rQFstYS16MC05XSsoXFwuWy1hLXowLTldKykqXFwuW2Etel0rKSg/PSR8XFxzKS9nbWksXG4gICAgZGVsaW1NYWlsUmVnZXggID0gLzwoKSg/Om1haWx0bzopPyhbLS5cXHddK0BbLWEtejAtOV0rKFxcLlstYS16MC05XSspKlxcLlthLXpdKyk+L2dpLFxuXG4gICAgcmVwbGFjZUxpbmsgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh3bSwgbGVhZGluZ01hZ2ljQ2hhcnMsIGxpbmssIG0yLCBtMywgdHJhaWxpbmdQdW5jdHVhdGlvbiwgdHJhaWxpbmdNYWdpY0NoYXJzKSB7XG4gICAgICAgIGxpbmsgPSBsaW5rLnJlcGxhY2Uoc2hvd2Rvd24uaGVscGVyLnJlZ2V4ZXMuYXN0ZXJpc2tEYXNoQW5kQ29sb24sIHNob3dkb3duLmhlbHBlci5lc2NhcGVDaGFyYWN0ZXJzQ2FsbGJhY2spO1xuICAgICAgICB2YXIgbG5rVHh0ID0gbGluayxcbiAgICAgICAgICAgIGFwcGVuZCA9ICcnLFxuICAgICAgICAgICAgdGFyZ2V0ID0gJycsXG4gICAgICAgICAgICBsbWMgICAgPSBsZWFkaW5nTWFnaWNDaGFycyB8fCAnJyxcbiAgICAgICAgICAgIHRtYyAgICA9IHRyYWlsaW5nTWFnaWNDaGFycyB8fCAnJztcbiAgICAgICAgaWYgKC9ed3d3XFwuL2kudGVzdChsaW5rKSkge1xuICAgICAgICAgIGxpbmsgPSBsaW5rLnJlcGxhY2UoL153d3dcXC4vaSwgJ2h0dHA6Ly93d3cuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuZXhjbHVkZVRyYWlsaW5nUHVuY3R1YXRpb25Gcm9tVVJMcyAmJiB0cmFpbGluZ1B1bmN0dWF0aW9uKSB7XG4gICAgICAgICAgYXBwZW5kID0gdHJhaWxpbmdQdW5jdHVhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5vcGVuTGlua3NJbk5ld1dpbmRvdykge1xuICAgICAgICAgIHRhcmdldCA9ICcgdGFyZ2V0PVwiwqhFOTVFYmxhbmtcIic7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxtYyArICc8YSBocmVmPVwiJyArIGxpbmsgKyAnXCInICsgdGFyZ2V0ICsgJz4nICsgbG5rVHh0ICsgJzwvYT4nICsgYXBwZW5kICsgdG1jO1xuICAgICAgfTtcbiAgICB9LFxuXG4gICAgcmVwbGFjZU1haWwgPSBmdW5jdGlvbiAob3B0aW9ucywgZ2xvYmFscykge1xuICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh3aG9sZU1hdGNoLCBiLCBtYWlsKSB7XG4gICAgICAgIHZhciBocmVmID0gJ21haWx0bzonO1xuICAgICAgICBiID0gYiB8fCAnJztcbiAgICAgICAgbWFpbCA9IHNob3dkb3duLnN1YlBhcnNlcigndW5lc2NhcGVTcGVjaWFsQ2hhcnMnKShtYWlsLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZW5jb2RlRW1haWxzKSB7XG4gICAgICAgICAgaHJlZiA9IHNob3dkb3duLmhlbHBlci5lbmNvZGVFbWFpbEFkZHJlc3MoaHJlZiArIG1haWwpO1xuICAgICAgICAgIG1haWwgPSBzaG93ZG93bi5oZWxwZXIuZW5jb2RlRW1haWxBZGRyZXNzKG1haWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhyZWYgPSBocmVmICsgbWFpbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYiArICc8YSBocmVmPVwiJyArIGhyZWYgKyAnXCI+JyArIG1haWwgKyAnPC9hPic7XG4gICAgICB9O1xuICAgIH07XG5cbnNob3dkb3duLnN1YlBhcnNlcignYXV0b0xpbmtzJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2F1dG9MaW5rcy5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKGRlbGltVXJsUmVnZXgsIHJlcGxhY2VMaW5rKG9wdGlvbnMpKTtcbiAgdGV4dCA9IHRleHQucmVwbGFjZShkZWxpbU1haWxSZWdleCwgcmVwbGFjZU1haWwob3B0aW9ucywgZ2xvYmFscykpO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2F1dG9MaW5rcy5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIHJldHVybiB0ZXh0O1xufSk7XG5cbnNob3dkb3duLnN1YlBhcnNlcignc2ltcGxpZmllZEF1dG9MaW5rcycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBpZiAoIW9wdGlvbnMuc2ltcGxpZmllZEF1dG9MaW5rKSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdzaW1wbGlmaWVkQXV0b0xpbmtzLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIGlmIChvcHRpb25zLmV4Y2x1ZGVUcmFpbGluZ1B1bmN0dWF0aW9uRnJvbVVSTHMpIHtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHNpbXBsZVVSTFJlZ2V4MiwgcmVwbGFjZUxpbmsob3B0aW9ucykpO1xuICB9IGVsc2Uge1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2Uoc2ltcGxlVVJMUmVnZXgsIHJlcGxhY2VMaW5rKG9wdGlvbnMpKTtcbiAgfVxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHNpbXBsZU1haWxSZWdleCwgcmVwbGFjZU1haWwob3B0aW9ucywgZ2xvYmFscykpO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ3NpbXBsaWZpZWRBdXRvTGlua3MuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbi8qKlxuICogVGhlc2UgYXJlIGFsbCB0aGUgdHJhbnNmb3JtYXRpb25zIHRoYXQgZm9ybSBibG9jay1sZXZlbFxuICogdGFncyBsaWtlIHBhcmFncmFwaHMsIGhlYWRlcnMsIGFuZCBsaXN0IGl0ZW1zLlxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2Jsb2NrR2FtdXQnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnYmxvY2tHYW11dC5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAvLyB3ZSBwYXJzZSBibG9ja3F1b3RlcyBmaXJzdCBzbyB0aGF0IHdlIGNhbiBoYXZlIGhlYWRpbmdzIGFuZCBocnNcbiAgLy8gaW5zaWRlIGJsb2NrcXVvdGVzXG4gIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2Jsb2NrUXVvdGVzJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2hlYWRlcnMnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAvLyBEbyBIb3Jpem9udGFsIFJ1bGVzOlxuICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdob3Jpem9udGFsUnVsZScpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2xpc3RzJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2NvZGVCbG9ja3MnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcigndGFibGVzJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgLy8gV2UgYWxyZWFkeSByYW4gX0hhc2hIVE1MQmxvY2tzKCkgYmVmb3JlLCBpbiBNYXJrZG93bigpLCBidXQgdGhhdFxuICAvLyB3YXMgdG8gZXNjYXBlIHJhdyBIVE1MIGluIHRoZSBvcmlnaW5hbCBNYXJrZG93biBzb3VyY2UuIFRoaXMgdGltZSxcbiAgLy8gd2UncmUgZXNjYXBpbmcgdGhlIG1hcmt1cCB3ZSd2ZSBqdXN0IGNyZWF0ZWQsIHNvIHRoYXQgd2UgZG9uJ3Qgd3JhcFxuICAvLyA8cD4gdGFncyBhcm91bmQgYmxvY2stbGV2ZWwgdGFncy5cbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignaGFzaEhUTUxCbG9ja3MnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcigncGFyYWdyYXBocycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2Jsb2NrR2FtdXQuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcignYmxvY2tRdW90ZXMnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnYmxvY2tRdW90ZXMuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgLy8gYWRkIGEgY291cGxlIGV4dHJhIGxpbmVzIGFmdGVyIHRoZSB0ZXh0IGFuZCBlbmR0ZXh0IG1hcmtcbiAgdGV4dCA9IHRleHQgKyAnXFxuXFxuJztcblxuICB2YXIgcmd4ID0gLyheIHswLDN9PlsgXFx0XT8uK1xcbiguK1xcbikqXFxuKikrL2dtO1xuXG4gIGlmIChvcHRpb25zLnNwbGl0QWRqYWNlbnRCbG9ja3F1b3Rlcykge1xuICAgIHJneCA9IC9eIHswLDN9PltcXHNcXFNdKj8oPzpcXG5cXG4pL2dtO1xuICB9XG5cbiAgdGV4dCA9IHRleHQucmVwbGFjZShyZ3gsIGZ1bmN0aW9uIChicSkge1xuICAgIC8vIGF0dGFja2xhYjogaGFjayBhcm91bmQgS29ucXVlcm9yIDMuNS40IGJ1ZzpcbiAgICAvLyBcIi0tLS0tLS0tLS1idWdcIi5yZXBsYWNlKC9eLS9nLFwiXCIpID09IFwiYnVnXCJcbiAgICBicSA9IGJxLnJlcGxhY2UoL15bIFxcdF0qPlsgXFx0XT8vZ20sICcnKTsgLy8gdHJpbSBvbmUgbGV2ZWwgb2YgcXVvdGluZ1xuXG4gICAgLy8gYXR0YWNrbGFiOiBjbGVhbiB1cCBoYWNrXG4gICAgYnEgPSBicS5yZXBsYWNlKC/CqDAvZywgJycpO1xuXG4gICAgYnEgPSBicS5yZXBsYWNlKC9eWyBcXHRdKyQvZ20sICcnKTsgLy8gdHJpbSB3aGl0ZXNwYWNlLW9ubHkgbGluZXNcbiAgICBicSA9IHNob3dkb3duLnN1YlBhcnNlcignZ2l0aHViQ29kZUJsb2NrcycpKGJxLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICBicSA9IHNob3dkb3duLnN1YlBhcnNlcignYmxvY2tHYW11dCcpKGJxLCBvcHRpb25zLCBnbG9iYWxzKTsgLy8gcmVjdXJzZVxuXG4gICAgYnEgPSBicS5yZXBsYWNlKC8oXnxcXG4pL2csICckMSAgJyk7XG4gICAgLy8gVGhlc2UgbGVhZGluZyBzcGFjZXMgc2NyZXcgd2l0aCA8cHJlPiBjb250ZW50LCBzbyB3ZSBuZWVkIHRvIGZpeCB0aGF0OlxuICAgIGJxID0gYnEucmVwbGFjZSgvKFxccyo8cHJlPlteXFxyXSs/PFxcL3ByZT4pL2dtLCBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbTEpIHtcbiAgICAgIHZhciBwcmUgPSBtMTtcbiAgICAgIC8vIGF0dGFja2xhYjogaGFjayBhcm91bmQgS29ucXVlcm9yIDMuNS40IGJ1ZzpcbiAgICAgIHByZSA9IHByZS5yZXBsYWNlKC9eICAvbWcsICfCqDAnKTtcbiAgICAgIHByZSA9IHByZS5yZXBsYWNlKC/CqDAvZywgJycpO1xuICAgICAgcmV0dXJuIHByZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hCbG9jaycpKCc8YmxvY2txdW90ZT5cXG4nICsgYnEgKyAnXFxuPC9ibG9ja3F1b3RlPicsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICB9KTtcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdibG9ja1F1b3Rlcy5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbi8qKlxuICogUHJvY2VzcyBNYXJrZG93biBgPHByZT48Y29kZT5gIGJsb2Nrcy5cbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCdjb2RlQmxvY2tzJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2NvZGVCbG9ja3MuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgLy8gc2VudGluZWwgd29ya2Fyb3VuZHMgZm9yIGxhY2sgb2YgXFxBIGFuZCBcXFosIHNhZmFyaVxca2h0bWwgYnVnXG4gIHRleHQgKz0gJ8KoMCc7XG5cbiAgdmFyIHBhdHRlcm4gPSAvKD86XFxuXFxufF4pKCg/Oig/OlsgXXs0fXxcXHQpLipcXG4rKSspKFxcbipbIF17MCwzfVteIFxcdFxcbl18KD89wqgwKSkvZztcbiAgdGV4dCA9IHRleHQucmVwbGFjZShwYXR0ZXJuLCBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbTEsIG0yKSB7XG4gICAgdmFyIGNvZGVibG9jayA9IG0xLFxuICAgICAgICBuZXh0Q2hhciA9IG0yLFxuICAgICAgICBlbmQgPSAnXFxuJztcblxuICAgIGNvZGVibG9jayA9IHNob3dkb3duLnN1YlBhcnNlcignb3V0ZGVudCcpKGNvZGVibG9jaywgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgY29kZWJsb2NrID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdlbmNvZGVDb2RlJykoY29kZWJsb2NrLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICBjb2RlYmxvY2sgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2RldGFiJykoY29kZWJsb2NrLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICBjb2RlYmxvY2sgPSBjb2RlYmxvY2sucmVwbGFjZSgvXlxcbisvZywgJycpOyAvLyB0cmltIGxlYWRpbmcgbmV3bGluZXNcbiAgICBjb2RlYmxvY2sgPSBjb2RlYmxvY2sucmVwbGFjZSgvXFxuKyQvZywgJycpOyAvLyB0cmltIHRyYWlsaW5nIG5ld2xpbmVzXG5cbiAgICBpZiAob3B0aW9ucy5vbWl0RXh0cmFXTEluQ29kZUJsb2Nrcykge1xuICAgICAgZW5kID0gJyc7XG4gICAgfVxuXG4gICAgY29kZWJsb2NrID0gJzxwcmU+PGNvZGU+JyArIGNvZGVibG9jayArIGVuZCArICc8L2NvZGU+PC9wcmU+JztcblxuICAgIHJldHVybiBzaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hCbG9jaycpKGNvZGVibG9jaywgb3B0aW9ucywgZ2xvYmFscykgKyBuZXh0Q2hhcjtcbiAgfSk7XG5cbiAgLy8gc3RyaXAgc2VudGluZWxcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvwqgwLywgJycpO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2NvZGVCbG9ja3MuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG4vKipcbiAqXG4gKiAgICogIEJhY2t0aWNrIHF1b3RlcyBhcmUgdXNlZCBmb3IgPGNvZGU+PC9jb2RlPiBzcGFucy5cbiAqXG4gKiAgICogIFlvdSBjYW4gdXNlIG11bHRpcGxlIGJhY2t0aWNrcyBhcyB0aGUgZGVsaW1pdGVycyBpZiB5b3Ugd2FudCB0b1xuICogICAgIGluY2x1ZGUgbGl0ZXJhbCBiYWNrdGlja3MgaW4gdGhlIGNvZGUgc3Bhbi4gU28sIHRoaXMgaW5wdXQ6XG4gKlxuICogICAgICAgICBKdXN0IHR5cGUgYGBmb28gYGJhcmAgYmF6YGAgYXQgdGhlIHByb21wdC5cbiAqXG4gKiAgICAgICBXaWxsIHRyYW5zbGF0ZSB0bzpcbiAqXG4gKiAgICAgICAgIDxwPkp1c3QgdHlwZSA8Y29kZT5mb28gYGJhcmAgYmF6PC9jb2RlPiBhdCB0aGUgcHJvbXB0LjwvcD5cbiAqXG4gKiAgICBUaGVyZSdzIG5vIGFyYml0cmFyeSBsaW1pdCB0byB0aGUgbnVtYmVyIG9mIGJhY2t0aWNrcyB5b3VcbiAqICAgIGNhbiB1c2UgYXMgZGVsaW10ZXJzLiBJZiB5b3UgbmVlZCB0aHJlZSBjb25zZWN1dGl2ZSBiYWNrdGlja3NcbiAqICAgIGluIHlvdXIgY29kZSwgdXNlIGZvdXIgZm9yIGRlbGltaXRlcnMsIGV0Yy5cbiAqXG4gKiAgKiAgWW91IGNhbiB1c2Ugc3BhY2VzIHRvIGdldCBsaXRlcmFsIGJhY2t0aWNrcyBhdCB0aGUgZWRnZXM6XG4gKlxuICogICAgICAgICAuLi4gdHlwZSBgYCBgYmFyYCBgYCAuLi5cbiAqXG4gKiAgICAgICBUdXJucyB0bzpcbiAqXG4gKiAgICAgICAgIC4uLiB0eXBlIDxjb2RlPmBiYXJgPC9jb2RlPiAuLi5cbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCdjb2RlU3BhbnMnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnY29kZVNwYW5zLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIGlmICh0eXBlb2YodGV4dCkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGV4dCA9ICcnO1xuICB9XG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoLyhefFteXFxcXF0pKGArKShbXlxccl0qP1teYF0pXFwyKD8hYCkvZ20sXG4gICAgZnVuY3Rpb24gKHdob2xlTWF0Y2gsIG0xLCBtMiwgbTMpIHtcbiAgICAgIHZhciBjID0gbTM7XG4gICAgICBjID0gYy5yZXBsYWNlKC9eKFsgXFx0XSopL2csICcnKTtcdC8vIGxlYWRpbmcgd2hpdGVzcGFjZVxuICAgICAgYyA9IGMucmVwbGFjZSgvWyBcXHRdKiQvZywgJycpO1x0Ly8gdHJhaWxpbmcgd2hpdGVzcGFjZVxuICAgICAgYyA9IHNob3dkb3duLnN1YlBhcnNlcignZW5jb2RlQ29kZScpKGMsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgICAgYyA9IG0xICsgJzxjb2RlPicgKyBjICsgJzwvY29kZT4nO1xuICAgICAgYyA9IHNob3dkb3duLnN1YlBhcnNlcignaGFzaEhUTUxTcGFucycpKGMsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgICAgcmV0dXJuIGM7XG4gICAgfVxuICApO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2NvZGVTcGFucy5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbi8qKlxuICogQ3JlYXRlIGEgZnVsbCBIVE1MIGRvY3VtZW50IGZyb20gdGhlIHByb2Nlc3NlZCBtYXJrZG93blxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2NvbXBsZXRlSFRNTERvY3VtZW50JywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGlmICghb3B0aW9ucy5jb21wbGV0ZUhUTUxEb2N1bWVudCkge1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnY29tcGxldGVIVE1MRG9jdW1lbnQuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgdmFyIGRvY3R5cGUgPSAnaHRtbCcsXG4gICAgICBkb2N0eXBlUGFyc2VkID0gJzwhRE9DVFlQRSBIVE1MPlxcbicsXG4gICAgICB0aXRsZSA9ICcnLFxuICAgICAgY2hhcnNldCA9ICc8bWV0YSBjaGFyc2V0PVwidXRmLThcIj5cXG4nLFxuICAgICAgbGFuZyA9ICcnLFxuICAgICAgbWV0YWRhdGEgPSAnJztcblxuICBpZiAodHlwZW9mIGdsb2JhbHMubWV0YWRhdGEucGFyc2VkLmRvY3R5cGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZG9jdHlwZVBhcnNlZCA9ICc8IURPQ1RZUEUgJyArICBnbG9iYWxzLm1ldGFkYXRhLnBhcnNlZC5kb2N0eXBlICsgJz5cXG4nO1xuICAgIGRvY3R5cGUgPSBnbG9iYWxzLm1ldGFkYXRhLnBhcnNlZC5kb2N0eXBlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoZG9jdHlwZSA9PT0gJ2h0bWwnIHx8IGRvY3R5cGUgPT09ICdodG1sNScpIHtcbiAgICAgIGNoYXJzZXQgPSAnPG1ldGEgY2hhcnNldD1cInV0Zi04XCI+JztcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBtZXRhIGluIGdsb2JhbHMubWV0YWRhdGEucGFyc2VkKSB7XG4gICAgaWYgKGdsb2JhbHMubWV0YWRhdGEucGFyc2VkLmhhc093blByb3BlcnR5KG1ldGEpKSB7XG4gICAgICBzd2l0Y2ggKG1ldGEudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICBjYXNlICdkb2N0eXBlJzpcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICd0aXRsZSc6XG4gICAgICAgICAgdGl0bGUgPSAnPHRpdGxlPicgKyAgZ2xvYmFscy5tZXRhZGF0YS5wYXJzZWQudGl0bGUgKyAnPC90aXRsZT5cXG4nO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2NoYXJzZXQnOlxuICAgICAgICAgIGlmIChkb2N0eXBlID09PSAnaHRtbCcgfHwgZG9jdHlwZSA9PT0gJ2h0bWw1Jykge1xuICAgICAgICAgICAgY2hhcnNldCA9ICc8bWV0YSBjaGFyc2V0PVwiJyArIGdsb2JhbHMubWV0YWRhdGEucGFyc2VkLmNoYXJzZXQgKyAnXCI+XFxuJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hhcnNldCA9ICc8bWV0YSBuYW1lPVwiY2hhcnNldFwiIGNvbnRlbnQ9XCInICsgZ2xvYmFscy5tZXRhZGF0YS5wYXJzZWQuY2hhcnNldCArICdcIj5cXG4nO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdsYW5ndWFnZSc6XG4gICAgICAgIGNhc2UgJ2xhbmcnOlxuICAgICAgICAgIGxhbmcgPSAnIGxhbmc9XCInICsgZ2xvYmFscy5tZXRhZGF0YS5wYXJzZWRbbWV0YV0gKyAnXCInO1xuICAgICAgICAgIG1ldGFkYXRhICs9ICc8bWV0YSBuYW1lPVwiJyArIG1ldGEgKyAnXCIgY29udGVudD1cIicgKyBnbG9iYWxzLm1ldGFkYXRhLnBhcnNlZFttZXRhXSArICdcIj5cXG4nO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbWV0YWRhdGEgKz0gJzxtZXRhIG5hbWU9XCInICsgbWV0YSArICdcIiBjb250ZW50PVwiJyArIGdsb2JhbHMubWV0YWRhdGEucGFyc2VkW21ldGFdICsgJ1wiPlxcbic7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGV4dCA9IGRvY3R5cGVQYXJzZWQgKyAnPGh0bWwnICsgbGFuZyArICc+XFxuPGhlYWQ+XFxuJyArIHRpdGxlICsgY2hhcnNldCArIG1ldGFkYXRhICsgJzwvaGVhZD5cXG48Ym9keT5cXG4nICsgdGV4dC50cmltKCkgKyAnXFxuPC9ib2R5PlxcbjwvaHRtbD4nO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2NvbXBsZXRlSFRNTERvY3VtZW50LmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuLyoqXG4gKiBDb252ZXJ0IGFsbCB0YWJzIHRvIHNwYWNlc1xuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2RldGFiJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdkZXRhYi5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAvLyBleHBhbmQgZmlyc3Qgbi0xIHRhYnNcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFx0KD89XFx0KS9nLCAnICAgICcpOyAvLyBnX3RhYl93aWR0aFxuXG4gIC8vIHJlcGxhY2UgdGhlIG50aCB3aXRoIHR3byBzZW50aW5lbHNcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFx0L2csICfCqEHCqEInKTtcblxuICAvLyB1c2UgdGhlIHNlbnRpbmVsIHRvIGFuY2hvciBvdXIgcmVnZXggc28gaXQgZG9lc24ndCBleHBsb2RlXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL8KoQiguKz8pwqhBL2csIGZ1bmN0aW9uICh3aG9sZU1hdGNoLCBtMSkge1xuICAgIHZhciBsZWFkaW5nVGV4dCA9IG0xLFxuICAgICAgICBudW1TcGFjZXMgPSA0IC0gbGVhZGluZ1RleHQubGVuZ3RoICUgNDsgIC8vIGdfdGFiX3dpZHRoXG5cbiAgICAvLyB0aGVyZSAqbXVzdCogYmUgYSBiZXR0ZXIgd2F5IHRvIGRvIHRoaXM6XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1TcGFjZXM7IGkrKykge1xuICAgICAgbGVhZGluZ1RleHQgKz0gJyAnO1xuICAgIH1cblxuICAgIHJldHVybiBsZWFkaW5nVGV4dDtcbiAgfSk7XG5cbiAgLy8gY2xlYW4gdXAgc2VudGluZWxzXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL8KoQS9nLCAnICAgICcpOyAgLy8gZ190YWJfd2lkdGhcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvwqhCL2csICcnKTtcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdkZXRhYi5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcignZWxsaXBzaXMnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnZWxsaXBzaXMuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFwuXFwuXFwuL2csICfigKYnKTtcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdlbGxpcHNpcy5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuLyoqXG4gKiBUdXJuIGVtb2ppIGNvZGVzIGludG8gZW1vamlzXG4gKlxuICogTGlzdCBvZiBzdXBwb3J0ZWQgZW1vamlzOiBodHRwczovL2dpdGh1Yi5jb20vc2hvd2Rvd25qcy9zaG93ZG93bi93aWtpL0Vtb2ppc1xuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2Vtb2ppJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGlmICghb3B0aW9ucy5lbW9qaSkge1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnZW1vamkuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgdmFyIGVtb2ppUmd4ID0gLzooW1xcU10rPyk6L2c7XG5cbiAgdGV4dCA9IHRleHQucmVwbGFjZShlbW9qaVJneCwgZnVuY3Rpb24gKHdtLCBlbW9qaUNvZGUpIHtcbiAgICBpZiAoc2hvd2Rvd24uaGVscGVyLmVtb2ppcy5oYXNPd25Qcm9wZXJ0eShlbW9qaUNvZGUpKSB7XG4gICAgICByZXR1cm4gc2hvd2Rvd24uaGVscGVyLmVtb2ppc1tlbW9qaUNvZGVdO1xuICAgIH1cbiAgICByZXR1cm4gd207XG4gIH0pO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2Vtb2ppLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG4vKipcbiAqIFNtYXJ0IHByb2Nlc3NpbmcgZm9yIGFtcGVyc2FuZHMgYW5kIGFuZ2xlIGJyYWNrZXRzIHRoYXQgbmVlZCB0byBiZSBlbmNvZGVkLlxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2VuY29kZUFtcHNBbmRBbmdsZXMnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2VuY29kZUFtcHNBbmRBbmdsZXMuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgLy8gQW1wZXJzYW5kLWVuY29kaW5nIGJhc2VkIGVudGlyZWx5IG9uIE5hdCBJcm9ucydzIEFtcHV0YXRvciBNVCBwbHVnaW46XG4gIC8vIGh0dHA6Ly9idW1wcG8ubmV0L3Byb2plY3RzL2FtcHV0YXRvci9cbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvJig/ISM/W3hYXT8oPzpbMC05YS1mQS1GXSt8XFx3Kyk7KS9nLCAnJmFtcDsnKTtcblxuICAvLyBFbmNvZGUgbmFrZWQgPCdzXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoLzwoPyFbYS16XFwvPyQhXSkvZ2ksICcmbHQ7Jyk7XG5cbiAgLy8gRW5jb2RlIDxcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvPC9nLCAnJmx0OycpO1xuXG4gIC8vIEVuY29kZSA+XG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoLz4vZywgJyZndDsnKTtcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdlbmNvZGVBbXBzQW5kQW5nbGVzLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzdHJpbmcsIHdpdGggYWZ0ZXIgcHJvY2Vzc2luZyB0aGUgZm9sbG93aW5nIGJhY2tzbGFzaCBlc2NhcGUgc2VxdWVuY2VzLlxuICpcbiAqIGF0dGFja2xhYjogVGhlIHBvbGl0ZSB3YXkgdG8gZG8gdGhpcyBpcyB3aXRoIHRoZSBuZXcgZXNjYXBlQ2hhcmFjdGVycygpIGZ1bmN0aW9uOlxuICpcbiAqICAgIHRleHQgPSBlc2NhcGVDaGFyYWN0ZXJzKHRleHQsXCJcXFxcXCIsdHJ1ZSk7XG4gKiAgICB0ZXh0ID0gZXNjYXBlQ2hhcmFjdGVycyh0ZXh0LFwiYCpfe31bXSgpPiMrLS4hXCIsdHJ1ZSk7XG4gKlxuICogLi4uYnV0IHdlJ3JlIHNpZGVzdGVwcGluZyBpdHMgdXNlIG9mIHRoZSAoc2xvdykgUmVnRXhwIGNvbnN0cnVjdG9yXG4gKiBhcyBhbiBvcHRpbWl6YXRpb24gZm9yIEZpcmVmb3guICBUaGlzIGZ1bmN0aW9uIGdldHMgY2FsbGVkIGEgTE9ULlxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2VuY29kZUJhY2tzbGFzaEVzY2FwZXMnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2VuY29kZUJhY2tzbGFzaEVzY2FwZXMuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxcXChcXFxcKS9nLCBzaG93ZG93bi5oZWxwZXIuZXNjYXBlQ2hhcmFjdGVyc0NhbGxiYWNrKTtcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxcXChbYCpfe31cXFtcXF0oKT4jKy4hfj18LV0pL2csIHNob3dkb3duLmhlbHBlci5lc2NhcGVDaGFyYWN0ZXJzQ2FsbGJhY2spO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2VuY29kZUJhY2tzbGFzaEVzY2FwZXMuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG4vKipcbiAqIEVuY29kZS9lc2NhcGUgY2VydGFpbiBjaGFyYWN0ZXJzIGluc2lkZSBNYXJrZG93biBjb2RlIHJ1bnMuXG4gKiBUaGUgcG9pbnQgaXMgdGhhdCBpbiBjb2RlLCB0aGVzZSBjaGFyYWN0ZXJzIGFyZSBsaXRlcmFscyxcbiAqIGFuZCBsb3NlIHRoZWlyIHNwZWNpYWwgTWFya2Rvd24gbWVhbmluZ3MuXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignZW5jb2RlQ29kZScsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdlbmNvZGVDb2RlLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIC8vIEVuY29kZSBhbGwgYW1wZXJzYW5kczsgSFRNTCBlbnRpdGllcyBhcmUgbm90XG4gIC8vIGVudGl0aWVzIHdpdGhpbiBhIE1hcmtkb3duIGNvZGUgc3Bhbi5cbiAgdGV4dCA9IHRleHRcbiAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAvLyBEbyB0aGUgYW5nbGUgYnJhY2tldCBzb25nIGFuZCBkYW5jZTpcbiAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAvLyBOb3csIGVzY2FwZSBjaGFyYWN0ZXJzIHRoYXQgYXJlIG1hZ2ljIGluIE1hcmtkb3duOlxuICAgIC5yZXBsYWNlKC8oWypfe31cXFtcXF1cXFxcPX4tXSkvZywgc2hvd2Rvd24uaGVscGVyLmVzY2FwZUNoYXJhY3RlcnNDYWxsYmFjayk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnZW5jb2RlQ29kZS5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbi8qKlxuICogV2l0aGluIHRhZ3MgLS0gbWVhbmluZyBiZXR3ZWVuIDwgYW5kID4gLS0gZW5jb2RlIFtcXCBgICogXyB+ID1dIHNvIHRoZXlcbiAqIGRvbid0IGNvbmZsaWN0IHdpdGggdGhlaXIgdXNlIGluIE1hcmtkb3duIGZvciBjb2RlLCBpdGFsaWNzIGFuZCBzdHJvbmcuXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignZXNjYXBlU3BlY2lhbENoYXJzV2l0aGluVGFnQXR0cmlidXRlcycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnZXNjYXBlU3BlY2lhbENoYXJzV2l0aGluVGFnQXR0cmlidXRlcy5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAvLyBCdWlsZCBhIHJlZ2V4IHRvIGZpbmQgSFRNTCB0YWdzLlxuICB2YXIgdGFncyAgICAgPSAvPFxcLz9bYS16XFxkXzotXSsoPzpbXFxzXStbXFxzXFxTXSs/KT8+L2dpLFxuICAgICAgY29tbWVudHMgPSAvPCEoLS0oPzooPzpbXj4tXXwtW14+XSkoPzpbXi1dfC1bXi1dKSopLS0pPi9naTtcblxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHRhZ3MsIGZ1bmN0aW9uICh3aG9sZU1hdGNoKSB7XG4gICAgcmV0dXJuIHdob2xlTWF0Y2hcbiAgICAgIC5yZXBsYWNlKC8oLik8XFwvP2NvZGU+KD89LikvZywgJyQxYCcpXG4gICAgICAucmVwbGFjZSgvKFtcXFxcYCpffj18XSkvZywgc2hvd2Rvd24uaGVscGVyLmVzY2FwZUNoYXJhY3RlcnNDYWxsYmFjayk7XG4gIH0pO1xuXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoY29tbWVudHMsIGZ1bmN0aW9uICh3aG9sZU1hdGNoKSB7XG4gICAgcmV0dXJuIHdob2xlTWF0Y2hcbiAgICAgIC5yZXBsYWNlKC8oW1xcXFxgKl9+PXxdKS9nLCBzaG93ZG93bi5oZWxwZXIuZXNjYXBlQ2hhcmFjdGVyc0NhbGxiYWNrKTtcbiAgfSk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnZXNjYXBlU3BlY2lhbENoYXJzV2l0aGluVGFnQXR0cmlidXRlcy5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbi8qKlxuICogSGFuZGxlIGdpdGh1YiBjb2RlYmxvY2tzIHByaW9yIHRvIHJ1bm5pbmcgSGFzaEhUTUwgc28gdGhhdFxuICogSFRNTCBjb250YWluZWQgd2l0aGluIHRoZSBjb2RlYmxvY2sgZ2V0cyBlc2NhcGVkIHByb3Blcmx5XG4gKiBFeGFtcGxlOlxuICogYGBgcnVieVxuICogICAgIGRlZiBoZWxsb193b3JsZCh4KVxuICogICAgICAgcHV0cyBcIkhlbGxvLCAje3h9XCJcbiAqICAgICBlbmRcbiAqIGBgYFxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2dpdGh1YkNvZGVCbG9ja3MnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gZWFybHkgZXhpdCBpZiBvcHRpb24gaXMgbm90IGVuYWJsZWRcbiAgaWYgKCFvcHRpb25zLmdoQ29kZUJsb2Nrcykge1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnZ2l0aHViQ29kZUJsb2Nrcy5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICB0ZXh0ICs9ICfCqDAnO1xuXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoLyg/Ol58XFxuKSg/OiB7MCwzfSkoYGBgK3x+fn4rKSg/OiAqKShbXlxcc2B+XSopXFxuKFtcXHNcXFNdKj8pXFxuKD86IHswLDN9KVxcMS9nLCBmdW5jdGlvbiAod2hvbGVNYXRjaCwgZGVsaW0sIGxhbmd1YWdlLCBjb2RlYmxvY2spIHtcbiAgICB2YXIgZW5kID0gKG9wdGlvbnMub21pdEV4dHJhV0xJbkNvZGVCbG9ja3MpID8gJycgOiAnXFxuJztcblxuICAgIC8vIEZpcnN0IHBhcnNlIHRoZSBnaXRodWIgY29kZSBibG9ja1xuICAgIGNvZGVibG9jayA9IHNob3dkb3duLnN1YlBhcnNlcignZW5jb2RlQ29kZScpKGNvZGVibG9jaywgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgY29kZWJsb2NrID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdkZXRhYicpKGNvZGVibG9jaywgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgY29kZWJsb2NrID0gY29kZWJsb2NrLnJlcGxhY2UoL15cXG4rL2csICcnKTsgLy8gdHJpbSBsZWFkaW5nIG5ld2xpbmVzXG4gICAgY29kZWJsb2NrID0gY29kZWJsb2NrLnJlcGxhY2UoL1xcbiskL2csICcnKTsgLy8gdHJpbSB0cmFpbGluZyB3aGl0ZXNwYWNlXG5cbiAgICBjb2RlYmxvY2sgPSAnPHByZT48Y29kZScgKyAobGFuZ3VhZ2UgPyAnIGNsYXNzPVwiJyArIGxhbmd1YWdlICsgJyBsYW5ndWFnZS0nICsgbGFuZ3VhZ2UgKyAnXCInIDogJycpICsgJz4nICsgY29kZWJsb2NrICsgZW5kICsgJzwvY29kZT48L3ByZT4nO1xuXG4gICAgY29kZWJsb2NrID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdoYXNoQmxvY2snKShjb2RlYmxvY2ssIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gICAgLy8gU2luY2UgR0hDb2RlYmxvY2tzIGNhbiBiZSBmYWxzZSBwb3NpdGl2ZXMsIHdlIG5lZWQgdG9cbiAgICAvLyBzdG9yZSB0aGUgcHJpbWl0aXZlIHRleHQgYW5kIHRoZSBwYXJzZWQgdGV4dCBpbiBhIGdsb2JhbCB2YXIsXG4gICAgLy8gYW5kIHRoZW4gcmV0dXJuIGEgdG9rZW5cbiAgICByZXR1cm4gJ1xcblxcbsKoRycgKyAoZ2xvYmFscy5naENvZGVCbG9ja3MucHVzaCh7dGV4dDogd2hvbGVNYXRjaCwgY29kZWJsb2NrOiBjb2RlYmxvY2t9KSAtIDEpICsgJ0dcXG5cXG4nO1xuICB9KTtcblxuICAvLyBhdHRhY2tsYWI6IHN0cmlwIHNlbnRpbmVsXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL8KoMC8sICcnKTtcblxuICByZXR1cm4gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdnaXRodWJDb2RlQmxvY2tzLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG59KTtcblxyXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hCbG9jaycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnaGFzaEJsb2NrLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oXlxcbit8XFxuKyQpL2csICcnKTtcbiAgdGV4dCA9ICdcXG5cXG7CqEsnICsgKGdsb2JhbHMuZ0h0bWxCbG9ja3MucHVzaCh0ZXh0KSAtIDEpICsgJ0tcXG5cXG4nO1xuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdoYXNoQmxvY2suYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG4vKipcbiAqIEhhc2ggYW5kIGVzY2FwZSA8Y29kZT4gZWxlbWVudHMgdGhhdCBzaG91bGQgbm90IGJlIHBhcnNlZCBhcyBtYXJrZG93blxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hDb2RlVGFncycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnaGFzaENvZGVUYWdzLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIHZhciByZXBGdW5jID0gZnVuY3Rpb24gKHdob2xlTWF0Y2gsIG1hdGNoLCBsZWZ0LCByaWdodCkge1xuICAgIHZhciBjb2RlYmxvY2sgPSBsZWZ0ICsgc2hvd2Rvd24uc3ViUGFyc2VyKCdlbmNvZGVDb2RlJykobWF0Y2gsIG9wdGlvbnMsIGdsb2JhbHMpICsgcmlnaHQ7XG4gICAgcmV0dXJuICfCqEMnICsgKGdsb2JhbHMuZ0h0bWxTcGFucy5wdXNoKGNvZGVibG9jaykgLSAxKSArICdDJztcbiAgfTtcblxuICAvLyBIYXNoIG5ha2VkIDxjb2RlPlxuICB0ZXh0ID0gc2hvd2Rvd24uaGVscGVyLnJlcGxhY2VSZWN1cnNpdmVSZWdFeHAodGV4dCwgcmVwRnVuYywgJzxjb2RlXFxcXGJbXj5dKj4nLCAnPC9jb2RlPicsICdnaW0nKTtcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdoYXNoQ29kZVRhZ3MuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hFbGVtZW50JywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHJldHVybiBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbTEpIHtcbiAgICB2YXIgYmxvY2tUZXh0ID0gbTE7XG5cbiAgICAvLyBVbmRvIGRvdWJsZSBsaW5lc1xuICAgIGJsb2NrVGV4dCA9IGJsb2NrVGV4dC5yZXBsYWNlKC9cXG5cXG4vZywgJ1xcbicpO1xuICAgIGJsb2NrVGV4dCA9IGJsb2NrVGV4dC5yZXBsYWNlKC9eXFxuLywgJycpO1xuXG4gICAgLy8gc3RyaXAgdHJhaWxpbmcgYmxhbmsgbGluZXNcbiAgICBibG9ja1RleHQgPSBibG9ja1RleHQucmVwbGFjZSgvXFxuKyQvZywgJycpO1xuXG4gICAgLy8gUmVwbGFjZSB0aGUgZWxlbWVudCB0ZXh0IHdpdGggYSBtYXJrZXIgKFwiwqhLeEtcIiB3aGVyZSB4IGlzIGl0cyBrZXkpXG4gICAgYmxvY2tUZXh0ID0gJ1xcblxcbsKoSycgKyAoZ2xvYmFscy5nSHRtbEJsb2Nrcy5wdXNoKGJsb2NrVGV4dCkgLSAxKSArICdLXFxuXFxuJztcblxuICAgIHJldHVybiBibG9ja1RleHQ7XG4gIH07XG59KTtcblxyXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hIVE1MQmxvY2tzJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdoYXNoSFRNTEJsb2Nrcy5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICB2YXIgYmxvY2tUYWdzID0gW1xuICAgICAgICAncHJlJyxcbiAgICAgICAgJ2RpdicsXG4gICAgICAgICdoMScsXG4gICAgICAgICdoMicsXG4gICAgICAgICdoMycsXG4gICAgICAgICdoNCcsXG4gICAgICAgICdoNScsXG4gICAgICAgICdoNicsXG4gICAgICAgICdibG9ja3F1b3RlJyxcbiAgICAgICAgJ3RhYmxlJyxcbiAgICAgICAgJ2RsJyxcbiAgICAgICAgJ29sJyxcbiAgICAgICAgJ3VsJyxcbiAgICAgICAgJ3NjcmlwdCcsXG4gICAgICAgICdub3NjcmlwdCcsXG4gICAgICAgICdmb3JtJyxcbiAgICAgICAgJ2ZpZWxkc2V0JyxcbiAgICAgICAgJ2lmcmFtZScsXG4gICAgICAgICdtYXRoJyxcbiAgICAgICAgJ3N0eWxlJyxcbiAgICAgICAgJ3NlY3Rpb24nLFxuICAgICAgICAnaGVhZGVyJyxcbiAgICAgICAgJ2Zvb3RlcicsXG4gICAgICAgICduYXYnLFxuICAgICAgICAnYXJ0aWNsZScsXG4gICAgICAgICdhc2lkZScsXG4gICAgICAgICdhZGRyZXNzJyxcbiAgICAgICAgJ2F1ZGlvJyxcbiAgICAgICAgJ2NhbnZhcycsXG4gICAgICAgICdmaWd1cmUnLFxuICAgICAgICAnaGdyb3VwJyxcbiAgICAgICAgJ291dHB1dCcsXG4gICAgICAgICd2aWRlbycsXG4gICAgICAgICdwJ1xuICAgICAgXSxcbiAgICAgIHJlcEZ1bmMgPSBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbWF0Y2gsIGxlZnQsIHJpZ2h0KSB7XG4gICAgICAgIHZhciB0eHQgPSB3aG9sZU1hdGNoO1xuICAgICAgICAvLyBjaGVjayBpZiB0aGlzIGh0bWwgZWxlbWVudCBpcyBtYXJrZWQgYXMgbWFya2Rvd25cbiAgICAgICAgLy8gaWYgc28sIGl0J3MgY29udGVudHMgc2hvdWxkIGJlIHBhcnNlZCBhcyBtYXJrZG93blxuICAgICAgICBpZiAobGVmdC5zZWFyY2goL1xcYm1hcmtkb3duXFxiLykgIT09IC0xKSB7XG4gICAgICAgICAgdHh0ID0gbGVmdCArIGdsb2JhbHMuY29udmVydGVyLm1ha2VIdG1sKG1hdGNoKSArIHJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnXFxuXFxuwqhLJyArIChnbG9iYWxzLmdIdG1sQmxvY2tzLnB1c2godHh0KSAtIDEpICsgJ0tcXG5cXG4nO1xuICAgICAgfTtcblxuICBpZiAob3B0aW9ucy5iYWNrc2xhc2hFc2NhcGVzSFRNTFRhZ3MpIHtcbiAgICAvLyBlbmNvZGUgYmFja3NsYXNoIGVzY2FwZWQgSFRNTCB0YWdzXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxcXDwoXFwvP1tePl0rPyk+L2csIGZ1bmN0aW9uICh3bSwgaW5zaWRlKSB7XG4gICAgICByZXR1cm4gJyZsdDsnICsgaW5zaWRlICsgJyZndDsnO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gaGFzaCBIVE1MIEJsb2Nrc1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJsb2NrVGFncy5sZW5ndGg7ICsraSkge1xuXG4gICAgdmFyIG9wVGFnUG9zLFxuICAgICAgICByZ3gxICAgICA9IG5ldyBSZWdFeHAoJ14gezAsM30oPCcgKyBibG9ja1RhZ3NbaV0gKyAnXFxcXGJbXj5dKj4pJywgJ2ltJyksXG4gICAgICAgIHBhdExlZnQgID0gJzwnICsgYmxvY2tUYWdzW2ldICsgJ1xcXFxiW14+XSo+JyxcbiAgICAgICAgcGF0UmlnaHQgPSAnPC8nICsgYmxvY2tUYWdzW2ldICsgJz4nO1xuICAgIC8vIDEuIExvb2sgZm9yIHRoZSBmaXJzdCBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb3BlbmluZyBIVE1MIHRhZyBpbiB0aGUgdGV4dFxuICAgIHdoaWxlICgob3BUYWdQb3MgPSBzaG93ZG93bi5oZWxwZXIucmVnZXhJbmRleE9mKHRleHQsIHJneDEpKSAhPT0gLTEpIHtcblxuICAgICAgLy8gaWYgdGhlIEhUTUwgdGFnIGlzIFxcIGVzY2FwZWQsIHdlIG5lZWQgdG8gZXNjYXBlIGl0IGFuZCBicmVha1xuXG5cbiAgICAgIC8vMi4gU3BsaXQgdGhlIHRleHQgaW4gdGhhdCBwb3NpdGlvblxuICAgICAgdmFyIHN1YlRleHRzID0gc2hvd2Rvd24uaGVscGVyLnNwbGl0QXRJbmRleCh0ZXh0LCBvcFRhZ1BvcyksXG4gICAgICAvLzMuIE1hdGNoIHJlY3Vyc2l2ZWx5XG4gICAgICAgICAgbmV3U3ViVGV4dDEgPSBzaG93ZG93bi5oZWxwZXIucmVwbGFjZVJlY3Vyc2l2ZVJlZ0V4cChzdWJUZXh0c1sxXSwgcmVwRnVuYywgcGF0TGVmdCwgcGF0UmlnaHQsICdpbScpO1xuXG4gICAgICAvLyBwcmV2ZW50IGFuIGluZmluaXRlIGxvb3BcbiAgICAgIGlmIChuZXdTdWJUZXh0MSA9PT0gc3ViVGV4dHNbMV0pIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB0ZXh0ID0gc3ViVGV4dHNbMF0uY29uY2F0KG5ld1N1YlRleHQxKTtcbiAgICB9XG4gIH1cbiAgLy8gSFIgU1BFQ0lBTCBDQVNFXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoLyhcXG4gezAsM30oPChocilcXGIoW148Pl0pKj9cXC8/PilbIFxcdF0qKD89XFxuezIsfSkpL2csXG4gICAgc2hvd2Rvd24uc3ViUGFyc2VyKCdoYXNoRWxlbWVudCcpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpKTtcblxuICAvLyBTcGVjaWFsIGNhc2UgZm9yIHN0YW5kYWxvbmUgSFRNTCBjb21tZW50c1xuICB0ZXh0ID0gc2hvd2Rvd24uaGVscGVyLnJlcGxhY2VSZWN1cnNpdmVSZWdFeHAodGV4dCwgZnVuY3Rpb24gKHR4dCkge1xuICAgIHJldHVybiAnXFxuXFxuwqhLJyArIChnbG9iYWxzLmdIdG1sQmxvY2tzLnB1c2godHh0KSAtIDEpICsgJ0tcXG5cXG4nO1xuICB9LCAnXiB7MCwzfTwhLS0nLCAnLS0+JywgJ2dtJyk7XG5cbiAgLy8gUEhQIGFuZCBBU1Atc3R5bGUgcHJvY2Vzc29yIGluc3RydWN0aW9ucyAoPD8uLi4/PiBhbmQgPCUuLi4lPilcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvKD86XFxuXFxuKSggezAsM30oPzo8KFs/JV0pW15cXHJdKj9cXDI+KVsgXFx0XSooPz1cXG57Mix9KSkvZyxcbiAgICBzaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hFbGVtZW50JykodGV4dCwgb3B0aW9ucywgZ2xvYmFscykpO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2hhc2hIVE1MQmxvY2tzLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuLyoqXG4gKiBIYXNoIHNwYW4gZWxlbWVudHMgdGhhdCBzaG91bGQgbm90IGJlIHBhcnNlZCBhcyBtYXJrZG93blxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hIVE1MU3BhbnMnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2hhc2hIVE1MU3BhbnMuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgZnVuY3Rpb24gaGFzaEhUTUxTcGFuIChodG1sKSB7XG4gICAgcmV0dXJuICfCqEMnICsgKGdsb2JhbHMuZ0h0bWxTcGFucy5wdXNoKGh0bWwpIC0gMSkgKyAnQyc7XG4gIH1cblxuICAvLyBIYXNoIFNlbGYgQ2xvc2luZyB0YWdzXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoLzxbXj5dKz9cXC8+L2dpLCBmdW5jdGlvbiAod20pIHtcbiAgICByZXR1cm4gaGFzaEhUTUxTcGFuKHdtKTtcbiAgfSk7XG5cbiAgLy8gSGFzaCB0YWdzIHdpdGhvdXQgcHJvcGVydGllc1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC88KFtePl0rPyk+W1xcc1xcU10qPzxcXC9cXDE+L2csIGZ1bmN0aW9uICh3bSkge1xuICAgIHJldHVybiBoYXNoSFRNTFNwYW4od20pO1xuICB9KTtcblxuICAvLyBIYXNoIHRhZ3Mgd2l0aCBwcm9wZXJ0aWVzXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoLzwoW14+XSs/KVxcc1tePl0rPz5bXFxzXFxTXSo/PFxcL1xcMT4vZywgZnVuY3Rpb24gKHdtKSB7XG4gICAgcmV0dXJuIGhhc2hIVE1MU3Bhbih3bSk7XG4gIH0pO1xuXG4gIC8vIEhhc2ggc2VsZiBjbG9zaW5nIHRhZ3Mgd2l0aG91dCAvPlxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC88W14+XSs/Pi9naSwgZnVuY3Rpb24gKHdtKSB7XG4gICAgcmV0dXJuIGhhc2hIVE1MU3Bhbih3bSk7XG4gIH0pO1xuXG4gIC8qc2hvd2Rvd24uaGVscGVyLm1hdGNoUmVjdXJzaXZlUmVnRXhwKHRleHQsICc8Y29kZVxcXFxiW14+XSo+JywgJzwvY29kZT4nLCAnZ2knKTsqL1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2hhc2hIVE1MU3BhbnMuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxuLyoqXG4gKiBVbmhhc2ggSFRNTCBzcGFuc1xuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ3VuaGFzaEhUTUxTcGFucycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgndW5oYXNoSFRNTFNwYW5zLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZ2xvYmFscy5nSHRtbFNwYW5zLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHJlcFRleHQgPSBnbG9iYWxzLmdIdG1sU3BhbnNbaV0sXG4gICAgICAgIC8vIGxpbWl0ZXIgdG8gcHJldmVudCBpbmZpbml0ZSBsb29wIChhc3N1bWUgMTAgYXMgbGltaXQgZm9yIHJlY3Vyc2UpXG4gICAgICAgIGxpbWl0ID0gMDtcblxuICAgIHdoaWxlICgvwqhDKFxcZCspQy8udGVzdChyZXBUZXh0KSkge1xuICAgICAgdmFyIG51bSA9IFJlZ0V4cC4kMTtcbiAgICAgIHJlcFRleHQgPSByZXBUZXh0LnJlcGxhY2UoJ8KoQycgKyBudW0gKyAnQycsIGdsb2JhbHMuZ0h0bWxTcGFuc1tudW1dKTtcbiAgICAgIGlmIChsaW1pdCA9PT0gMTApIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignbWF4aW11bSBuZXN0aW5nIG9mIDEwIHNwYW5zIHJlYWNoZWQhISEnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICArK2xpbWl0O1xuICAgIH1cbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKCfCqEMnICsgaSArICdDJywgcmVwVGV4dCk7XG4gIH1cblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCd1bmhhc2hIVE1MU3BhbnMuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG4vKipcbiAqIEhhc2ggYW5kIGVzY2FwZSA8cHJlPjxjb2RlPiBlbGVtZW50cyB0aGF0IHNob3VsZCBub3QgYmUgcGFyc2VkIGFzIG1hcmtkb3duXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignaGFzaFByZUNvZGVUYWdzJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdoYXNoUHJlQ29kZVRhZ3MuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgdmFyIHJlcEZ1bmMgPSBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbWF0Y2gsIGxlZnQsIHJpZ2h0KSB7XG4gICAgLy8gZW5jb2RlIGh0bWwgZW50aXRpZXNcbiAgICB2YXIgY29kZWJsb2NrID0gbGVmdCArIHNob3dkb3duLnN1YlBhcnNlcignZW5jb2RlQ29kZScpKG1hdGNoLCBvcHRpb25zLCBnbG9iYWxzKSArIHJpZ2h0O1xuICAgIHJldHVybiAnXFxuXFxuwqhHJyArIChnbG9iYWxzLmdoQ29kZUJsb2Nrcy5wdXNoKHt0ZXh0OiB3aG9sZU1hdGNoLCBjb2RlYmxvY2s6IGNvZGVibG9ja30pIC0gMSkgKyAnR1xcblxcbic7XG4gIH07XG5cbiAgLy8gSGFzaCA8cHJlPjxjb2RlPlxuICB0ZXh0ID0gc2hvd2Rvd24uaGVscGVyLnJlcGxhY2VSZWN1cnNpdmVSZWdFeHAodGV4dCwgcmVwRnVuYywgJ14gezAsM308cHJlXFxcXGJbXj5dKj5cXFxccyo8Y29kZVxcXFxiW14+XSo+JywgJ14gezAsM308L2NvZGU+XFxcXHMqPC9wcmU+JywgJ2dpbScpO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2hhc2hQcmVDb2RlVGFncy5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcignaGVhZGVycycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdoZWFkZXJzLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIHZhciBoZWFkZXJMZXZlbFN0YXJ0ID0gKGlzTmFOKHBhcnNlSW50KG9wdGlvbnMuaGVhZGVyTGV2ZWxTdGFydCkpKSA/IDEgOiBwYXJzZUludChvcHRpb25zLmhlYWRlckxldmVsU3RhcnQpLFxuXG4gIC8vIFNldCB0ZXh0LXN0eWxlIGhlYWRlcnM6XG4gIC8vXHRIZWFkZXIgMVxuICAvL1x0PT09PT09PT1cbiAgLy9cbiAgLy9cdEhlYWRlciAyXG4gIC8vXHQtLS0tLS0tLVxuICAvL1xuICAgICAgc2V0ZXh0UmVnZXhIMSA9IChvcHRpb25zLnNtb290aExpdmVQcmV2aWV3KSA/IC9eKC4rKVsgXFx0XSpcXG49ezIsfVsgXFx0XSpcXG4rL2dtIDogL14oLispWyBcXHRdKlxcbj0rWyBcXHRdKlxcbisvZ20sXG4gICAgICBzZXRleHRSZWdleEgyID0gKG9wdGlvbnMuc21vb3RoTGl2ZVByZXZpZXcpID8gL14oLispWyBcXHRdKlxcbi17Mix9WyBcXHRdKlxcbisvZ20gOiAvXiguKylbIFxcdF0qXFxuLStbIFxcdF0qXFxuKy9nbTtcblxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHNldGV4dFJlZ2V4SDEsIGZ1bmN0aW9uICh3aG9sZU1hdGNoLCBtMSkge1xuXG4gICAgdmFyIHNwYW5HYW11dCA9IHNob3dkb3duLnN1YlBhcnNlcignc3BhbkdhbXV0JykobTEsIG9wdGlvbnMsIGdsb2JhbHMpLFxuICAgICAgICBoSUQgPSAob3B0aW9ucy5ub0hlYWRlcklkKSA/ICcnIDogJyBpZD1cIicgKyBoZWFkZXJJZChtMSkgKyAnXCInLFxuICAgICAgICBoTGV2ZWwgPSBoZWFkZXJMZXZlbFN0YXJ0LFxuICAgICAgICBoYXNoQmxvY2sgPSAnPGgnICsgaExldmVsICsgaElEICsgJz4nICsgc3BhbkdhbXV0ICsgJzwvaCcgKyBoTGV2ZWwgKyAnPic7XG4gICAgcmV0dXJuIHNob3dkb3duLnN1YlBhcnNlcignaGFzaEJsb2NrJykoaGFzaEJsb2NrLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgfSk7XG5cbiAgdGV4dCA9IHRleHQucmVwbGFjZShzZXRleHRSZWdleEgyLCBmdW5jdGlvbiAobWF0Y2hGb3VuZCwgbTEpIHtcbiAgICB2YXIgc3BhbkdhbXV0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdzcGFuR2FtdXQnKShtMSwgb3B0aW9ucywgZ2xvYmFscyksXG4gICAgICAgIGhJRCA9IChvcHRpb25zLm5vSGVhZGVySWQpID8gJycgOiAnIGlkPVwiJyArIGhlYWRlcklkKG0xKSArICdcIicsXG4gICAgICAgIGhMZXZlbCA9IGhlYWRlckxldmVsU3RhcnQgKyAxLFxuICAgICAgICBoYXNoQmxvY2sgPSAnPGgnICsgaExldmVsICsgaElEICsgJz4nICsgc3BhbkdhbXV0ICsgJzwvaCcgKyBoTGV2ZWwgKyAnPic7XG4gICAgcmV0dXJuIHNob3dkb3duLnN1YlBhcnNlcignaGFzaEJsb2NrJykoaGFzaEJsb2NrLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgfSk7XG5cbiAgLy8gYXR4LXN0eWxlIGhlYWRlcnM6XG4gIC8vICAjIEhlYWRlciAxXG4gIC8vICAjIyBIZWFkZXIgMlxuICAvLyAgIyMgSGVhZGVyIDIgd2l0aCBjbG9zaW5nIGhhc2hlcyAjI1xuICAvLyAgLi4uXG4gIC8vICAjIyMjIyMgSGVhZGVyIDZcbiAgLy9cbiAgdmFyIGF0eFN0eWxlID0gKG9wdGlvbnMucmVxdWlyZVNwYWNlQmVmb3JlSGVhZGluZ1RleHQpID8gL14oI3sxLDZ9KVsgXFx0XSsoLis/KVsgXFx0XSojKlxcbisvZ20gOiAvXigjezEsNn0pWyBcXHRdKiguKz8pWyBcXHRdKiMqXFxuKy9nbTtcblxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKGF0eFN0eWxlLCBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbTEsIG0yKSB7XG4gICAgdmFyIGhUZXh0ID0gbTI7XG4gICAgaWYgKG9wdGlvbnMuY3VzdG9taXplZEhlYWRlcklkKSB7XG4gICAgICBoVGV4dCA9IG0yLnJlcGxhY2UoL1xccz9cXHsoW157XSs/KX1cXHMqJC8sICcnKTtcbiAgICB9XG5cbiAgICB2YXIgc3BhbiA9IHNob3dkb3duLnN1YlBhcnNlcignc3BhbkdhbXV0JykoaFRleHQsIG9wdGlvbnMsIGdsb2JhbHMpLFxuICAgICAgICBoSUQgPSAob3B0aW9ucy5ub0hlYWRlcklkKSA/ICcnIDogJyBpZD1cIicgKyBoZWFkZXJJZChtMikgKyAnXCInLFxuICAgICAgICBoTGV2ZWwgPSBoZWFkZXJMZXZlbFN0YXJ0IC0gMSArIG0xLmxlbmd0aCxcbiAgICAgICAgaGVhZGVyID0gJzxoJyArIGhMZXZlbCArIGhJRCArICc+JyArIHNwYW4gKyAnPC9oJyArIGhMZXZlbCArICc+JztcblxuICAgIHJldHVybiBzaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hCbG9jaycpKGhlYWRlciwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGhlYWRlcklkIChtKSB7XG4gICAgdmFyIHRpdGxlLFxuICAgICAgICBwcmVmaXg7XG5cbiAgICAvLyBJdCBpcyBzZXBhcmF0ZSBmcm9tIG90aGVyIG9wdGlvbnMgdG8gYWxsb3cgY29tYmluaW5nIHByZWZpeCBhbmQgY3VzdG9taXplZFxuICAgIGlmIChvcHRpb25zLmN1c3RvbWl6ZWRIZWFkZXJJZCkge1xuICAgICAgdmFyIG1hdGNoID0gbS5tYXRjaCgvXFx7KFtee10rPyl9XFxzKiQvKTtcbiAgICAgIGlmIChtYXRjaCAmJiBtYXRjaFsxXSkge1xuICAgICAgICBtID0gbWF0Y2hbMV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGl0bGUgPSBtO1xuXG4gICAgLy8gUHJlZml4IGlkIHRvIHByZXZlbnQgY2F1c2luZyBpbmFkdmVydGVudCBwcmUtZXhpc3Rpbmcgc3R5bGUgbWF0Y2hlcy5cbiAgICBpZiAoc2hvd2Rvd24uaGVscGVyLmlzU3RyaW5nKG9wdGlvbnMucHJlZml4SGVhZGVySWQpKSB7XG4gICAgICBwcmVmaXggPSBvcHRpb25zLnByZWZpeEhlYWRlcklkO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5wcmVmaXhIZWFkZXJJZCA9PT0gdHJ1ZSkge1xuICAgICAgcHJlZml4ID0gJ3NlY3Rpb24tJztcbiAgICB9IGVsc2Uge1xuICAgICAgcHJlZml4ID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLnJhd1ByZWZpeEhlYWRlcklkKSB7XG4gICAgICB0aXRsZSA9IHByZWZpeCArIHRpdGxlO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmdoQ29tcGF0aWJsZUhlYWRlcklkKSB7XG4gICAgICB0aXRsZSA9IHRpdGxlXG4gICAgICAgIC5yZXBsYWNlKC8gL2csICctJylcbiAgICAgICAgLy8gcmVwbGFjZSBwcmV2aW91c2x5IGVzY2FwZWQgY2hhcnMgKCYsIMKoIGFuZCAkKVxuICAgICAgICAucmVwbGFjZSgvJmFtcDsvZywgJycpXG4gICAgICAgIC5yZXBsYWNlKC/CqFQvZywgJycpXG4gICAgICAgIC5yZXBsYWNlKC/CqEQvZywgJycpXG4gICAgICAgIC8vIHJlcGxhY2UgcmVzdCBvZiB0aGUgY2hhcnMgKCZ+JCBhcmUgcmVwZWF0ZWQgYXMgdGhleSBtaWdodCBoYXZlIGJlZW4gZXNjYXBlZClcbiAgICAgICAgLy8gYm9ycm93ZWQgZnJvbSBnaXRodWIncyByZWRjYXJwZXQgKHNvbWUgdGhleSBzaG91bGQgcHJvZHVjZSBzaW1pbGFyIHJlc3VsdHMpXG4gICAgICAgIC5yZXBsYWNlKC9bJiskLFxcLzo7PT9AXCIje318XsKoflxcW1xcXWBcXFxcKikoJS4hJzw+XS9nLCAnJylcbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLnJhd0hlYWRlcklkKSB7XG4gICAgICB0aXRsZSA9IHRpdGxlXG4gICAgICAgIC5yZXBsYWNlKC8gL2csICctJylcbiAgICAgICAgLy8gcmVwbGFjZSBwcmV2aW91c2x5IGVzY2FwZWQgY2hhcnMgKCYsIMKoIGFuZCAkKVxuICAgICAgICAucmVwbGFjZSgvJmFtcDsvZywgJyYnKVxuICAgICAgICAucmVwbGFjZSgvwqhUL2csICfCqCcpXG4gICAgICAgIC5yZXBsYWNlKC/CqEQvZywgJyQnKVxuICAgICAgICAvLyByZXBsYWNlIFwiIGFuZCAnXG4gICAgICAgIC5yZXBsYWNlKC9bXCInXS9nLCAnLScpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aXRsZSA9IHRpdGxlXG4gICAgICAgIC5yZXBsYWNlKC9bXlxcd10vZywgJycpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnJhd1ByZWZpeEhlYWRlcklkKSB7XG4gICAgICB0aXRsZSA9IHByZWZpeCArIHRpdGxlO1xuICAgIH1cblxuICAgIGlmIChnbG9iYWxzLmhhc2hMaW5rQ291bnRzW3RpdGxlXSkge1xuICAgICAgdGl0bGUgPSB0aXRsZSArICctJyArIChnbG9iYWxzLmhhc2hMaW5rQ291bnRzW3RpdGxlXSsrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2xvYmFscy5oYXNoTGlua0NvdW50c1t0aXRsZV0gPSAxO1xuICAgIH1cbiAgICByZXR1cm4gdGl0bGU7XG4gIH1cblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdoZWFkZXJzLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuLyoqXG4gKiBUdXJuIE1hcmtkb3duIGxpbmsgc2hvcnRjdXRzIGludG8gWEhUTUwgPGE+IHRhZ3MuXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignaG9yaXpvbnRhbFJ1bGUnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2hvcml6b250YWxSdWxlLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIHZhciBrZXkgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hCbG9jaycpKCc8aHIgLz4nLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXiB7MCwyfSggPy0pezMsfVsgXFx0XSokL2dtLCBrZXkpO1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9eIHswLDJ9KCA/XFwqKXszLH1bIFxcdF0qJC9nbSwga2V5KTtcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXiB7MCwyfSggP18pezMsfVsgXFx0XSokL2dtLCBrZXkpO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2hvcml6b250YWxSdWxlLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuLyoqXG4gKiBUdXJuIE1hcmtkb3duIGltYWdlIHNob3J0Y3V0cyBpbnRvIDxpbWc+IHRhZ3MuXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignaW1hZ2VzJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2ltYWdlcy5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICB2YXIgaW5saW5lUmVnRXhwICAgICAgPSAvIVxcWyhbXlxcXV0qPyldWyBcXHRdKigpXFwoWyBcXHRdPzw/KFtcXFNdKz8oPzpcXChbXFxTXSo/XFwpW1xcU10qPyk/KT4/KD86ID0oWypcXGRdK1tBLVphLXolXXswLDR9KXgoWypcXGRdK1tBLVphLXolXXswLDR9KSk/WyBcXHRdKig/OihbXCInXSkoW15cIl0qPylcXDYpP1sgXFx0XT9cXCkvZyxcbiAgICAgIGNyYXp5UmVnRXhwICAgICAgID0gLyFcXFsoW15cXF1dKj8pXVsgXFx0XSooKVxcKFsgXFx0XT88KFtePl0qKT4oPzogPShbKlxcZF0rW0EtWmEteiVdezAsNH0peChbKlxcZF0rW0EtWmEteiVdezAsNH0pKT9bIFxcdF0qKD86KD86KFtcIiddKShbXlwiXSo/KVxcNikpP1sgXFx0XT9cXCkvZyxcbiAgICAgIGJhc2U2NFJlZ0V4cCAgICAgID0gLyFcXFsoW15cXF1dKj8pXVsgXFx0XSooKVxcKFsgXFx0XT88PyhkYXRhOi4rP1xcLy4rPztiYXNlNjQsW0EtWmEtejAtOSsvPVxcbl0rPyk+Pyg/OiA9KFsqXFxkXStbQS1aYS16JV17MCw0fSl4KFsqXFxkXStbQS1aYS16JV17MCw0fSkpP1sgXFx0XSooPzooW1wiJ10pKFteXCJdKj8pXFw2KT9bIFxcdF0/XFwpL2csXG4gICAgICByZWZlcmVuY2VSZWdFeHAgICA9IC8hXFxbKFteXFxdXSo/KV0gPyg/OlxcbiAqKT9cXFsoW1xcc1xcU10qPyldKCkoKSgpKCkoKS9nLFxuICAgICAgcmVmU2hvcnRjdXRSZWdFeHAgPSAvIVxcWyhbXlxcW1xcXV0rKV0oKSgpKCkoKSgpL2c7XG5cbiAgZnVuY3Rpb24gd3JpdGVJbWFnZVRhZ0Jhc2U2NCAod2hvbGVNYXRjaCwgYWx0VGV4dCwgbGlua0lkLCB1cmwsIHdpZHRoLCBoZWlnaHQsIG01LCB0aXRsZSkge1xuICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgIHJldHVybiB3cml0ZUltYWdlVGFnICh3aG9sZU1hdGNoLCBhbHRUZXh0LCBsaW5rSWQsIHVybCwgd2lkdGgsIGhlaWdodCwgbTUsIHRpdGxlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlSW1hZ2VUYWcgKHdob2xlTWF0Y2gsIGFsdFRleHQsIGxpbmtJZCwgdXJsLCB3aWR0aCwgaGVpZ2h0LCBtNSwgdGl0bGUpIHtcblxuICAgIHZhciBnVXJscyAgID0gZ2xvYmFscy5nVXJscyxcbiAgICAgICAgZ1RpdGxlcyA9IGdsb2JhbHMuZ1RpdGxlcyxcbiAgICAgICAgZ0RpbXMgICA9IGdsb2JhbHMuZ0RpbWVuc2lvbnM7XG5cbiAgICBsaW5rSWQgPSBsaW5rSWQudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmICghdGl0bGUpIHtcbiAgICAgIHRpdGxlID0gJyc7XG4gICAgfVxuICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgZXhwbGljaXQgZW1wdHkgdXJsXG4gICAgaWYgKHdob2xlTWF0Y2guc2VhcmNoKC9cXCg8P1xccyo+PyA/KFsnXCJdLipbJ1wiXSk/XFwpJC9tKSA+IC0xKSB7XG4gICAgICB1cmwgPSAnJztcblxuICAgIH0gZWxzZSBpZiAodXJsID09PSAnJyB8fCB1cmwgPT09IG51bGwpIHtcbiAgICAgIGlmIChsaW5rSWQgPT09ICcnIHx8IGxpbmtJZCA9PT0gbnVsbCkge1xuICAgICAgICAvLyBsb3dlci1jYXNlIGFuZCB0dXJuIGVtYmVkZGVkIG5ld2xpbmVzIGludG8gc3BhY2VzXG4gICAgICAgIGxpbmtJZCA9IGFsdFRleHQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gP1xcbi9nLCAnICcpO1xuICAgICAgfVxuICAgICAgdXJsID0gJyMnICsgbGlua0lkO1xuXG4gICAgICBpZiAoIXNob3dkb3duLmhlbHBlci5pc1VuZGVmaW5lZChnVXJsc1tsaW5rSWRdKSkge1xuICAgICAgICB1cmwgPSBnVXJsc1tsaW5rSWRdO1xuICAgICAgICBpZiAoIXNob3dkb3duLmhlbHBlci5pc1VuZGVmaW5lZChnVGl0bGVzW2xpbmtJZF0pKSB7XG4gICAgICAgICAgdGl0bGUgPSBnVGl0bGVzW2xpbmtJZF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzaG93ZG93bi5oZWxwZXIuaXNVbmRlZmluZWQoZ0RpbXNbbGlua0lkXSkpIHtcbiAgICAgICAgICB3aWR0aCA9IGdEaW1zW2xpbmtJZF0ud2lkdGg7XG4gICAgICAgICAgaGVpZ2h0ID0gZ0RpbXNbbGlua0lkXS5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB3aG9sZU1hdGNoO1xuICAgICAgfVxuICAgIH1cblxuICAgIGFsdFRleHQgPSBhbHRUZXh0XG4gICAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgLy9hbHRUZXh0ID0gc2hvd2Rvd24uaGVscGVyLmVzY2FwZUNoYXJhY3RlcnMoYWx0VGV4dCwgJypfJywgZmFsc2UpO1xuICAgICAgLnJlcGxhY2Uoc2hvd2Rvd24uaGVscGVyLnJlZ2V4ZXMuYXN0ZXJpc2tEYXNoQW5kQ29sb24sIHNob3dkb3duLmhlbHBlci5lc2NhcGVDaGFyYWN0ZXJzQ2FsbGJhY2spO1xuICAgIC8vdXJsID0gc2hvd2Rvd24uaGVscGVyLmVzY2FwZUNoYXJhY3RlcnModXJsLCAnKl8nLCBmYWxzZSk7XG4gICAgdXJsID0gdXJsLnJlcGxhY2Uoc2hvd2Rvd24uaGVscGVyLnJlZ2V4ZXMuYXN0ZXJpc2tEYXNoQW5kQ29sb24sIHNob3dkb3duLmhlbHBlci5lc2NhcGVDaGFyYWN0ZXJzQ2FsbGJhY2spO1xuICAgIHZhciByZXN1bHQgPSAnPGltZyBzcmM9XCInICsgdXJsICsgJ1wiIGFsdD1cIicgKyBhbHRUZXh0ICsgJ1wiJztcblxuICAgIGlmICh0aXRsZSAmJiBzaG93ZG93bi5oZWxwZXIuaXNTdHJpbmcodGl0bGUpKSB7XG4gICAgICB0aXRsZSA9IHRpdGxlXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAgIC8vdGl0bGUgPSBzaG93ZG93bi5oZWxwZXIuZXNjYXBlQ2hhcmFjdGVycyh0aXRsZSwgJypfJywgZmFsc2UpO1xuICAgICAgICAucmVwbGFjZShzaG93ZG93bi5oZWxwZXIucmVnZXhlcy5hc3Rlcmlza0Rhc2hBbmRDb2xvbiwgc2hvd2Rvd24uaGVscGVyLmVzY2FwZUNoYXJhY3RlcnNDYWxsYmFjayk7XG4gICAgICByZXN1bHQgKz0gJyB0aXRsZT1cIicgKyB0aXRsZSArICdcIic7XG4gICAgfVxuXG4gICAgaWYgKHdpZHRoICYmIGhlaWdodCkge1xuICAgICAgd2lkdGggID0gKHdpZHRoID09PSAnKicpID8gJ2F1dG8nIDogd2lkdGg7XG4gICAgICBoZWlnaHQgPSAoaGVpZ2h0ID09PSAnKicpID8gJ2F1dG8nIDogaGVpZ2h0O1xuXG4gICAgICByZXN1bHQgKz0gJyB3aWR0aD1cIicgKyB3aWR0aCArICdcIic7XG4gICAgICByZXN1bHQgKz0gJyBoZWlnaHQ9XCInICsgaGVpZ2h0ICsgJ1wiJztcbiAgICB9XG5cbiAgICByZXN1bHQgKz0gJyAvPic7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gRmlyc3QsIGhhbmRsZSByZWZlcmVuY2Utc3R5bGUgbGFiZWxlZCBpbWFnZXM6ICFbYWx0IHRleHRdW2lkXVxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHJlZmVyZW5jZVJlZ0V4cCwgd3JpdGVJbWFnZVRhZyk7XG5cbiAgLy8gTmV4dCwgaGFuZGxlIGlubGluZSBpbWFnZXM6ICAhW2FsdCB0ZXh0XSh1cmwgPTx3aWR0aD54PGhlaWdodD4gXCJvcHRpb25hbCB0aXRsZVwiKVxuXG4gIC8vIGJhc2U2NCBlbmNvZGVkIGltYWdlc1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKGJhc2U2NFJlZ0V4cCwgd3JpdGVJbWFnZVRhZ0Jhc2U2NCk7XG5cbiAgLy8gY2FzZXMgd2l0aCBjcmF6eSB1cmxzIGxpa2UgLi9pbWFnZS9jYXQxKS5wbmdcbiAgdGV4dCA9IHRleHQucmVwbGFjZShjcmF6eVJlZ0V4cCwgd3JpdGVJbWFnZVRhZyk7XG5cbiAgLy8gbm9ybWFsIGNhc2VzXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoaW5saW5lUmVnRXhwLCB3cml0ZUltYWdlVGFnKTtcblxuICAvLyBoYW5kbGUgcmVmZXJlbmNlLXN0eWxlIHNob3J0Y3V0czogIVtpbWcgdGV4dF1cbiAgdGV4dCA9IHRleHQucmVwbGFjZShyZWZTaG9ydGN1dFJlZ0V4cCwgd3JpdGVJbWFnZVRhZyk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnaW1hZ2VzLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuc2hvd2Rvd24uc3ViUGFyc2VyKCdpdGFsaWNzQW5kQm9sZCcsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdpdGFsaWNzQW5kQm9sZC5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAvLyBpdCdzIGZhc3RlciB0byBoYXZlIDMgc2VwYXJhdGUgcmVnZXhlcyBmb3IgZWFjaCBjYXNlIHRoYW4gaGF2ZSBqdXN0IG9uZVxuICAvLyBiZWNhdXNlIG9mIGJhY2t0cmFjaW5nLCBpbiBzb21lIGNhc2VzLCBpdCBjb3VsZCBsZWFkIHRvIGFuIGV4cG9uZW50aWFsIGVmZmVjdFxuICAvLyBjYWxsZWQgXCJjYXRhc3Ryb3BoaWMgYmFja3RyYWNlXCIuIE9taW5vdXMhXG5cbiAgZnVuY3Rpb24gcGFyc2VJbnNpZGUgKHR4dCwgbGVmdCwgcmlnaHQpIHtcbiAgICAvKlxuICAgIGlmIChvcHRpb25zLnNpbXBsaWZpZWRBdXRvTGluaykge1xuICAgICAgdHh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdzaW1wbGlmaWVkQXV0b0xpbmtzJykodHh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICB9XG4gICAgKi9cbiAgICByZXR1cm4gbGVmdCArIHR4dCArIHJpZ2h0O1xuICB9XG5cbiAgLy8gUGFyc2UgdW5kZXJzY29yZXNcbiAgaWYgKG9wdGlvbnMubGl0ZXJhbE1pZFdvcmRVbmRlcnNjb3Jlcykge1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcYl9fXyhcXFNbXFxzXFxTXSo/KV9fX1xcYi9nLCBmdW5jdGlvbiAod20sIHR4dCkge1xuICAgICAgcmV0dXJuIHBhcnNlSW5zaWRlICh0eHQsICc8c3Ryb25nPjxlbT4nLCAnPC9lbT48L3N0cm9uZz4nKTtcbiAgICB9KTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXGJfXyhcXFNbXFxzXFxTXSo/KV9fXFxiL2csIGZ1bmN0aW9uICh3bSwgdHh0KSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnNpZGUgKHR4dCwgJzxzdHJvbmc+JywgJzwvc3Ryb25nPicpO1xuICAgIH0pO1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcYl8oXFxTW1xcc1xcU10qPylfXFxiL2csIGZ1bmN0aW9uICh3bSwgdHh0KSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnNpZGUgKHR4dCwgJzxlbT4nLCAnPC9lbT4nKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9fX18oXFxTW1xcc1xcU10qPylfX18vZywgZnVuY3Rpb24gKHdtLCBtKSB7XG4gICAgICByZXR1cm4gKC9cXFMkLy50ZXN0KG0pKSA/IHBhcnNlSW5zaWRlIChtLCAnPHN0cm9uZz48ZW0+JywgJzwvZW0+PC9zdHJvbmc+JykgOiB3bTtcbiAgICB9KTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9fXyhcXFNbXFxzXFxTXSo/KV9fL2csIGZ1bmN0aW9uICh3bSwgbSkge1xuICAgICAgcmV0dXJuICgvXFxTJC8udGVzdChtKSkgPyBwYXJzZUluc2lkZSAobSwgJzxzdHJvbmc+JywgJzwvc3Ryb25nPicpIDogd207XG4gICAgfSk7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXyhbXlxcc19dW1xcc1xcU10qPylfL2csIGZ1bmN0aW9uICh3bSwgbSkge1xuICAgICAgLy8gIS9eX1teX10vLnRlc3QobSkgLSB0ZXN0IGlmIGl0IGRvZXNuJ3Qgc3RhcnQgd2l0aCBfXyAoc2luY2UgaXQgc2VlbXMgcmVkdW5kYW50LCB3ZSByZW1vdmVkIGl0KVxuICAgICAgcmV0dXJuICgvXFxTJC8udGVzdChtKSkgPyBwYXJzZUluc2lkZSAobSwgJzxlbT4nLCAnPC9lbT4nKSA6IHdtO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gTm93IHBhcnNlIGFzdGVyaXNrc1xuICBpZiAob3B0aW9ucy5saXRlcmFsTWlkV29yZEFzdGVyaXNrcykge1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoLyhbXipdfF4pXFxCXFwqXFwqXFwqKFxcU1tcXHNcXFNdKj8pXFwqXFwqXFwqXFxCKD8hXFwqKS9nLCBmdW5jdGlvbiAod20sIGxlYWQsIHR4dCkge1xuICAgICAgcmV0dXJuIHBhcnNlSW5zaWRlICh0eHQsIGxlYWQgKyAnPHN0cm9uZz48ZW0+JywgJzwvZW0+PC9zdHJvbmc+Jyk7XG4gICAgfSk7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvKFteKl18XilcXEJcXCpcXCooXFxTW1xcc1xcU10qPylcXCpcXCpcXEIoPyFcXCopL2csIGZ1bmN0aW9uICh3bSwgbGVhZCwgdHh0KSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnNpZGUgKHR4dCwgbGVhZCArICc8c3Ryb25nPicsICc8L3N0cm9uZz4nKTtcbiAgICB9KTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oW14qXXxeKVxcQlxcKihcXFNbXFxzXFxTXSo/KVxcKlxcQig/IVxcKikvZywgZnVuY3Rpb24gKHdtLCBsZWFkLCB0eHQpIHtcbiAgICAgIHJldHVybiBwYXJzZUluc2lkZSAodHh0LCBsZWFkICsgJzxlbT4nLCAnPC9lbT4nKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXCpcXCpcXCooXFxTW1xcc1xcU10qPylcXCpcXCpcXCovZywgZnVuY3Rpb24gKHdtLCBtKSB7XG4gICAgICByZXR1cm4gKC9cXFMkLy50ZXN0KG0pKSA/IHBhcnNlSW5zaWRlIChtLCAnPHN0cm9uZz48ZW0+JywgJzwvZW0+PC9zdHJvbmc+JykgOiB3bTtcbiAgICB9KTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXCpcXCooXFxTW1xcc1xcU10qPylcXCpcXCovZywgZnVuY3Rpb24gKHdtLCBtKSB7XG4gICAgICByZXR1cm4gKC9cXFMkLy50ZXN0KG0pKSA/IHBhcnNlSW5zaWRlIChtLCAnPHN0cm9uZz4nLCAnPC9zdHJvbmc+JykgOiB3bTtcbiAgICB9KTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXCooW15cXHMqXVtcXHNcXFNdKj8pXFwqL2csIGZ1bmN0aW9uICh3bSwgbSkge1xuICAgICAgLy8gIS9eXFwqW14qXS8udGVzdChtKSAtIHRlc3QgaWYgaXQgZG9lc24ndCBzdGFydCB3aXRoICoqIChzaW5jZSBpdCBzZWVtcyByZWR1bmRhbnQsIHdlIHJlbW92ZWQgaXQpXG4gICAgICByZXR1cm4gKC9cXFMkLy50ZXN0KG0pKSA/IHBhcnNlSW5zaWRlIChtLCAnPGVtPicsICc8L2VtPicpIDogd207XG4gICAgfSk7XG4gIH1cblxuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2l0YWxpY3NBbmRCb2xkLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuLyoqXG4gKiBGb3JtIEhUTUwgb3JkZXJlZCAobnVtYmVyZWQpIGFuZCB1bm9yZGVyZWQgKGJ1bGxldGVkKSBsaXN0cy5cbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCdsaXN0cycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogUHJvY2VzcyB0aGUgY29udGVudHMgb2YgYSBzaW5nbGUgb3JkZXJlZCBvciB1bm9yZGVyZWQgbGlzdCwgc3BsaXR0aW5nIGl0XG4gICAqIGludG8gaW5kaXZpZHVhbCBsaXN0IGl0ZW1zLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGlzdFN0clxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHRyaW1UcmFpbGluZ1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gcHJvY2Vzc0xpc3RJdGVtcyAobGlzdFN0ciwgdHJpbVRyYWlsaW5nKSB7XG4gICAgLy8gVGhlICRnX2xpc3RfbGV2ZWwgZ2xvYmFsIGtlZXBzIHRyYWNrIG9mIHdoZW4gd2UncmUgaW5zaWRlIGEgbGlzdC5cbiAgICAvLyBFYWNoIHRpbWUgd2UgZW50ZXIgYSBsaXN0LCB3ZSBpbmNyZW1lbnQgaXQ7IHdoZW4gd2UgbGVhdmUgYSBsaXN0LFxuICAgIC8vIHdlIGRlY3JlbWVudC4gSWYgaXQncyB6ZXJvLCB3ZSdyZSBub3QgaW4gYSBsaXN0IGFueW1vcmUuXG4gICAgLy9cbiAgICAvLyBXZSBkbyB0aGlzIGJlY2F1c2Ugd2hlbiB3ZSdyZSBub3QgaW5zaWRlIGEgbGlzdCwgd2Ugd2FudCB0byB0cmVhdFxuICAgIC8vIHNvbWV0aGluZyBsaWtlIHRoaXM6XG4gICAgLy9cbiAgICAvLyAgICBJIHJlY29tbWVuZCB1cGdyYWRpbmcgdG8gdmVyc2lvblxuICAgIC8vICAgIDguIE9vcHMsIG5vdyB0aGlzIGxpbmUgaXMgdHJlYXRlZFxuICAgIC8vICAgIGFzIGEgc3ViLWxpc3QuXG4gICAgLy9cbiAgICAvLyBBcyBhIHNpbmdsZSBwYXJhZ3JhcGgsIGRlc3BpdGUgdGhlIGZhY3QgdGhhdCB0aGUgc2Vjb25kIGxpbmUgc3RhcnRzXG4gICAgLy8gd2l0aCBhIGRpZ2l0LXBlcmlvZC1zcGFjZSBzZXF1ZW5jZS5cbiAgICAvL1xuICAgIC8vIFdoZXJlYXMgd2hlbiB3ZSdyZSBpbnNpZGUgYSBsaXN0IChvciBzdWItbGlzdCksIHRoYXQgbGluZSB3aWxsIGJlXG4gICAgLy8gdHJlYXRlZCBhcyB0aGUgc3RhcnQgb2YgYSBzdWItbGlzdC4gV2hhdCBhIGtsdWRnZSwgaHVoPyBUaGlzIGlzXG4gICAgLy8gYW4gYXNwZWN0IG9mIE1hcmtkb3duJ3Mgc3ludGF4IHRoYXQncyBoYXJkIHRvIHBhcnNlIHBlcmZlY3RseVxuICAgIC8vIHdpdGhvdXQgcmVzb3J0aW5nIHRvIG1pbmQtcmVhZGluZy4gUGVyaGFwcyB0aGUgc29sdXRpb24gaXMgdG9cbiAgICAvLyBjaGFuZ2UgdGhlIHN5bnRheCBydWxlcyBzdWNoIHRoYXQgc3ViLWxpc3RzIG11c3Qgc3RhcnQgd2l0aCBhXG4gICAgLy8gc3RhcnRpbmcgY2FyZGluYWwgbnVtYmVyOyBlLmcuIFwiMS5cIiBvciBcImEuXCIuXG4gICAgZ2xvYmFscy5nTGlzdExldmVsKys7XG5cbiAgICAvLyB0cmltIHRyYWlsaW5nIGJsYW5rIGxpbmVzOlxuICAgIGxpc3RTdHIgPSBsaXN0U3RyLnJlcGxhY2UoL1xcbnsyLH0kLywgJ1xcbicpO1xuXG4gICAgLy8gYXR0YWNrbGFiOiBhZGQgc2VudGluZWwgdG8gZW11bGF0ZSBcXHpcbiAgICBsaXN0U3RyICs9ICfCqDAnO1xuXG4gICAgdmFyIHJneCA9IC8oXFxuKT8oXiB7MCwzfSkoWyorLV18XFxkK1suXSlbIFxcdF0rKChcXFsoeHxYfCApP10pP1sgXFx0XSpbXlxccl0rPyhcXG57MSwyfSkpKD89XFxuKijCqDB8IHswLDN9KFsqKy1dfFxcZCtbLl0pWyBcXHRdKykpL2dtLFxuICAgICAgICBpc1BhcmFncmFwaGVkID0gKC9cXG5bIFxcdF0qXFxuKD8hwqgwKS8udGVzdChsaXN0U3RyKSk7XG5cbiAgICAvLyBTaW5jZSB2ZXJzaW9uIDEuNSwgbmVzdGluZyBzdWJsaXN0cyByZXF1aXJlcyA0IHNwYWNlcyAob3IgMSB0YWIpIGluZGVudGF0aW9uLFxuICAgIC8vIHdoaWNoIGlzIGEgc3ludGF4IGJyZWFraW5nIGNoYW5nZVxuICAgIC8vIGFjdGl2YXRpbmcgdGhpcyBvcHRpb24gcmV2ZXJ0cyB0byBvbGQgYmVoYXZpb3JcbiAgICBpZiAob3B0aW9ucy5kaXNhYmxlRm9yY2VkNFNwYWNlc0luZGVudGVkU3VibGlzdHMpIHtcbiAgICAgIHJneCA9IC8oXFxuKT8oXiB7MCwzfSkoWyorLV18XFxkK1suXSlbIFxcdF0rKChcXFsoeHxYfCApP10pP1sgXFx0XSpbXlxccl0rPyhcXG57MSwyfSkpKD89XFxuKijCqDB8XFwyKFsqKy1dfFxcZCtbLl0pWyBcXHRdKykpL2dtO1xuICAgIH1cblxuICAgIGxpc3RTdHIgPSBsaXN0U3RyLnJlcGxhY2Uocmd4LCBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbTEsIG0yLCBtMywgbTQsIHRhc2tidG4sIGNoZWNrZWQpIHtcbiAgICAgIGNoZWNrZWQgPSAoY2hlY2tlZCAmJiBjaGVja2VkLnRyaW0oKSAhPT0gJycpO1xuXG4gICAgICB2YXIgaXRlbSA9IHNob3dkb3duLnN1YlBhcnNlcignb3V0ZGVudCcpKG00LCBvcHRpb25zLCBnbG9iYWxzKSxcbiAgICAgICAgICBidWxsZXRTdHlsZSA9ICcnO1xuXG4gICAgICAvLyBTdXBwb3J0IGZvciBnaXRodWIgdGFza2xpc3RzXG4gICAgICBpZiAodGFza2J0biAmJiBvcHRpb25zLnRhc2tsaXN0cykge1xuICAgICAgICBidWxsZXRTdHlsZSA9ICcgY2xhc3M9XCJ0YXNrLWxpc3QtaXRlbVwiIHN0eWxlPVwibGlzdC1zdHlsZS10eXBlOiBub25lO1wiJztcbiAgICAgICAgaXRlbSA9IGl0ZW0ucmVwbGFjZSgvXlsgXFx0XSpcXFsoeHxYfCApP10vbSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBvdHAgPSAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGRpc2FibGVkIHN0eWxlPVwibWFyZ2luOiAwcHggMC4zNWVtIDAuMjVlbSAtMS42ZW07IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XCInO1xuICAgICAgICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgICAgICBvdHAgKz0gJyBjaGVja2VkJztcbiAgICAgICAgICB9XG4gICAgICAgICAgb3RwICs9ICc+JztcbiAgICAgICAgICByZXR1cm4gb3RwO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gSVNTVUUgIzMxMlxuICAgICAgLy8gVGhpcyBpbnB1dDogLSAtIC0gYVxuICAgICAgLy8gY2F1c2VzIHRyb3VibGUgdG8gdGhlIHBhcnNlciwgc2luY2UgaXQgaW50ZXJwcmV0cyBpdCBhczpcbiAgICAgIC8vIDx1bD48bGk+PGxpPjxsaT5hPC9saT48L2xpPjwvbGk+PC91bD5cbiAgICAgIC8vIGluc3RlYWQgb2Y6XG4gICAgICAvLyA8dWw+PGxpPi0gLSBhPC9saT48L3VsPlxuICAgICAgLy8gU28sIHRvIHByZXZlbnQgaXQsIHdlIHdpbGwgcHV0IGEgbWFya2VyICjCqEEpaW4gdGhlIGJlZ2lubmluZyBvZiB0aGUgbGluZVxuICAgICAgLy8gS2luZCBvZiBoYWNraXNoL21vbmtleSBwYXRjaGluZywgYnV0IHNlZW1zIG1vcmUgZWZmZWN0aXZlIHRoYW4gb3ZlcmNvbXBsaWNhdGluZyB0aGUgbGlzdCBwYXJzZXJcbiAgICAgIGl0ZW0gPSBpdGVtLnJlcGxhY2UoL14oWy0qK118XFxkXFwuKVsgXFx0XStbXFxTXFxuIF0qL2csIGZ1bmN0aW9uICh3bTIpIHtcbiAgICAgICAgcmV0dXJuICfCqEEnICsgd20yO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIG0xIC0gTGVhZGluZyBsaW5lIG9yXG4gICAgICAvLyBIYXMgYSBkb3VibGUgcmV0dXJuIChtdWx0aSBwYXJhZ3JhcGgpIG9yXG4gICAgICAvLyBIYXMgc3VibGlzdFxuICAgICAgaWYgKG0xIHx8IChpdGVtLnNlYXJjaCgvXFxuezIsfS8pID4gLTEpKSB7XG4gICAgICAgIGl0ZW0gPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2dpdGh1YkNvZGVCbG9ja3MnKShpdGVtLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICAgICAgaXRlbSA9IHNob3dkb3duLnN1YlBhcnNlcignYmxvY2tHYW11dCcpKGl0ZW0sIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVjdXJzaW9uIGZvciBzdWItbGlzdHM6XG4gICAgICAgIGl0ZW0gPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2xpc3RzJykoaXRlbSwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgICAgIGl0ZW0gPSBpdGVtLnJlcGxhY2UoL1xcbiQvLCAnJyk7IC8vIGNob21wKGl0ZW0pXG4gICAgICAgIGl0ZW0gPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hIVE1MQmxvY2tzJykoaXRlbSwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgICAgICAgLy8gQ29sYXBzZSBkb3VibGUgbGluZWJyZWFrc1xuICAgICAgICBpdGVtID0gaXRlbS5yZXBsYWNlKC9cXG5cXG4rL2csICdcXG5cXG4nKTtcbiAgICAgICAgaWYgKGlzUGFyYWdyYXBoZWQpIHtcbiAgICAgICAgICBpdGVtID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdwYXJhZ3JhcGhzJykoaXRlbSwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbSA9IHNob3dkb3duLnN1YlBhcnNlcignc3BhbkdhbXV0JykoaXRlbSwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gbm93IHdlIG5lZWQgdG8gcmVtb3ZlIHRoZSBtYXJrZXIgKMKoQSlcbiAgICAgIGl0ZW0gPSBpdGVtLnJlcGxhY2UoJ8KoQScsICcnKTtcbiAgICAgIC8vIHdlIGNhbiBmaW5hbGx5IHdyYXAgdGhlIGxpbmUgaW4gbGlzdCBpdGVtIHRhZ3NcbiAgICAgIGl0ZW0gPSAgJzxsaScgKyBidWxsZXRTdHlsZSArICc+JyArIGl0ZW0gKyAnPC9saT5cXG4nO1xuXG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9KTtcblxuICAgIC8vIGF0dGFja2xhYjogc3RyaXAgc2VudGluZWxcbiAgICBsaXN0U3RyID0gbGlzdFN0ci5yZXBsYWNlKC/CqDAvZywgJycpO1xuXG4gICAgZ2xvYmFscy5nTGlzdExldmVsLS07XG5cbiAgICBpZiAodHJpbVRyYWlsaW5nKSB7XG4gICAgICBsaXN0U3RyID0gbGlzdFN0ci5yZXBsYWNlKC9cXHMrJC8sICcnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGlzdFN0cjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0eWxlU3RhcnROdW1iZXIgKGxpc3QsIGxpc3RUeXBlKSB7XG4gICAgLy8gY2hlY2sgaWYgb2wgYW5kIHN0YXJ0cyBieSBhIG51bWJlciBkaWZmZXJlbnQgdGhhbiAxXG4gICAgaWYgKGxpc3RUeXBlID09PSAnb2wnKSB7XG4gICAgICB2YXIgcmVzID0gbGlzdC5tYXRjaCgvXiAqKFxcZCspXFwuLyk7XG4gICAgICBpZiAocmVzICYmIHJlc1sxXSAhPT0gJzEnKSB7XG4gICAgICAgIHJldHVybiAnIHN0YXJ0PVwiJyArIHJlc1sxXSArICdcIic7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBhbmQgcGFyc2UgY29uc2VjdXRpdmUgbGlzdHMgKGJldHRlciBmaXggZm9yIGlzc3VlICMxNDIpXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsaXN0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsaXN0VHlwZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHRyaW1UcmFpbGluZ1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gcGFyc2VDb25zZWN1dGl2ZUxpc3RzIChsaXN0LCBsaXN0VHlwZSwgdHJpbVRyYWlsaW5nKSB7XG4gICAgLy8gY2hlY2sgaWYgd2UgY2F1Z2h0IDIgb3IgbW9yZSBjb25zZWN1dGl2ZSBsaXN0cyBieSBtaXN0YWtlXG4gICAgLy8gd2UgdXNlIHRoZSBjb3VudGVyUmd4LCBtZWFuaW5nIGlmIGxpc3RUeXBlIGlzIFVMIHdlIGxvb2sgZm9yIE9MIGFuZCB2aWNlIHZlcnNhXG4gICAgdmFyIG9sUmd4ID0gKG9wdGlvbnMuZGlzYWJsZUZvcmNlZDRTcGFjZXNJbmRlbnRlZFN1Ymxpc3RzKSA/IC9eID9cXGQrXFwuWyBcXHRdL2dtIDogL14gezAsM31cXGQrXFwuWyBcXHRdL2dtLFxuICAgICAgICB1bFJneCA9IChvcHRpb25zLmRpc2FibGVGb3JjZWQ0U3BhY2VzSW5kZW50ZWRTdWJsaXN0cykgPyAvXiA/WyorLV1bIFxcdF0vZ20gOiAvXiB7MCwzfVsqKy1dWyBcXHRdL2dtLFxuICAgICAgICBjb3VudGVyUnhnID0gKGxpc3RUeXBlID09PSAndWwnKSA/IG9sUmd4IDogdWxSZ3gsXG4gICAgICAgIHJlc3VsdCA9ICcnO1xuXG4gICAgaWYgKGxpc3Quc2VhcmNoKGNvdW50ZXJSeGcpICE9PSAtMSkge1xuICAgICAgKGZ1bmN0aW9uIHBhcnNlQ0wgKHR4dCkge1xuICAgICAgICB2YXIgcG9zID0gdHh0LnNlYXJjaChjb3VudGVyUnhnKSxcbiAgICAgICAgICAgIHN0eWxlID0gc3R5bGVTdGFydE51bWJlcihsaXN0LCBsaXN0VHlwZSk7XG4gICAgICAgIGlmIChwb3MgIT09IC0xKSB7XG4gICAgICAgICAgLy8gc2xpY2VcbiAgICAgICAgICByZXN1bHQgKz0gJ1xcblxcbjwnICsgbGlzdFR5cGUgKyBzdHlsZSArICc+XFxuJyArIHByb2Nlc3NMaXN0SXRlbXModHh0LnNsaWNlKDAsIHBvcyksICEhdHJpbVRyYWlsaW5nKSArICc8LycgKyBsaXN0VHlwZSArICc+XFxuJztcblxuICAgICAgICAgIC8vIGludmVydCBjb3VudGVyVHlwZSBhbmQgbGlzdFR5cGVcbiAgICAgICAgICBsaXN0VHlwZSA9IChsaXN0VHlwZSA9PT0gJ3VsJykgPyAnb2wnIDogJ3VsJztcbiAgICAgICAgICBjb3VudGVyUnhnID0gKGxpc3RUeXBlID09PSAndWwnKSA/IG9sUmd4IDogdWxSZ3g7XG5cbiAgICAgICAgICAvL3JlY3Vyc2VcbiAgICAgICAgICBwYXJzZUNMKHR4dC5zbGljZShwb3MpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHQgKz0gJ1xcblxcbjwnICsgbGlzdFR5cGUgKyBzdHlsZSArICc+XFxuJyArIHByb2Nlc3NMaXN0SXRlbXModHh0LCAhIXRyaW1UcmFpbGluZykgKyAnPC8nICsgbGlzdFR5cGUgKyAnPlxcbic7XG4gICAgICAgIH1cbiAgICAgIH0pKGxpc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc3R5bGUgPSBzdHlsZVN0YXJ0TnVtYmVyKGxpc3QsIGxpc3RUeXBlKTtcbiAgICAgIHJlc3VsdCA9ICdcXG5cXG48JyArIGxpc3RUeXBlICsgc3R5bGUgKyAnPlxcbicgKyBwcm9jZXNzTGlzdEl0ZW1zKGxpc3QsICEhdHJpbVRyYWlsaW5nKSArICc8LycgKyBsaXN0VHlwZSArICc+XFxuJztcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqIFN0YXJ0IG9mIGxpc3QgcGFyc2luZyAqKi9cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnbGlzdHMuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIC8vIGFkZCBzZW50aW5lbCB0byBoYWNrIGFyb3VuZCBraHRtbC9zYWZhcmkgYnVnOlxuICAvLyBodHRwOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMTIzMVxuICB0ZXh0ICs9ICfCqDAnO1xuXG4gIGlmIChnbG9iYWxzLmdMaXN0TGV2ZWwpIHtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9eKCggezAsM30oWyorLV18XFxkK1suXSlbIFxcdF0rKVteXFxyXSs/KMKoMHxcXG57Mix9KD89XFxTKSg/IVsgXFx0XSooPzpbKistXXxcXGQrWy5dKVsgXFx0XSspKSkvZ20sXG4gICAgICBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbGlzdCwgbTIpIHtcbiAgICAgICAgdmFyIGxpc3RUeXBlID0gKG0yLnNlYXJjaCgvWyorLV0vZykgPiAtMSkgPyAndWwnIDogJ29sJztcbiAgICAgICAgcmV0dXJuIHBhcnNlQ29uc2VjdXRpdmVMaXN0cyhsaXN0LCBsaXN0VHlwZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oXFxuXFxufF5cXG4/KSgoIHswLDN9KFsqKy1dfFxcZCtbLl0pWyBcXHRdKylbXlxccl0rPyjCqDB8XFxuezIsfSg/PVxcUykoPyFbIFxcdF0qKD86WyorLV18XFxkK1suXSlbIFxcdF0rKSkpL2dtLFxuICAgICAgZnVuY3Rpb24gKHdob2xlTWF0Y2gsIG0xLCBsaXN0LCBtMykge1xuICAgICAgICB2YXIgbGlzdFR5cGUgPSAobTMuc2VhcmNoKC9bKistXS9nKSA+IC0xKSA/ICd1bCcgOiAnb2wnO1xuICAgICAgICByZXR1cm4gcGFyc2VDb25zZWN1dGl2ZUxpc3RzKGxpc3QsIGxpc3RUeXBlLCBmYWxzZSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIC8vIHN0cmlwIHNlbnRpbmVsXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL8KoMC8sICcnKTtcbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnbGlzdHMuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG4vKipcbiAqIFBhcnNlIG1ldGFkYXRhIGF0IHRoZSB0b3Agb2YgdGhlIGRvY3VtZW50XG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignbWV0YWRhdGEnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKCFvcHRpb25zLm1ldGFkYXRhKSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdtZXRhZGF0YS5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICBmdW5jdGlvbiBwYXJzZU1ldGFkYXRhQ29udGVudHMgKGNvbnRlbnQpIHtcbiAgICAvLyByYXcgaXMgcmF3IHNvIGl0J3Mgbm90IGNoYW5nZWQgaW4gYW55IHdheVxuICAgIGdsb2JhbHMubWV0YWRhdGEucmF3ID0gY29udGVudDtcblxuICAgIC8vIGVzY2FwZSBjaGFycyBmb3JiaWRkZW4gaW4gaHRtbCBhdHRyaWJ1dGVzXG4gICAgLy8gZG91YmxlIHF1b3Rlc1xuICAgIGNvbnRlbnQgPSBjb250ZW50XG4gICAgICAvLyBhbXBlcnNhbmQgZmlyc3RcbiAgICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXG4gICAgICAvLyBkb3VibGUgcXVvdGVzXG4gICAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xuXG4gICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvXFxuIHs0fS9nLCAnICcpO1xuICAgIGNvbnRlbnQucmVwbGFjZSgvXihbXFxTIF0rKTogKyhbXFxzXFxTXSs/KSQvZ20sIGZ1bmN0aW9uICh3bSwga2V5LCB2YWx1ZSkge1xuICAgICAgZ2xvYmFscy5tZXRhZGF0YS5wYXJzZWRba2V5XSA9IHZhbHVlO1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0pO1xuICB9XG5cbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXlxccyrCq8KrwqsrKFxcUyo/KVxcbihbXFxzXFxTXSs/KVxcbsK7wrvCuytcXG4vLCBmdW5jdGlvbiAod2hvbGVtYXRjaCwgZm9ybWF0LCBjb250ZW50KSB7XG4gICAgcGFyc2VNZXRhZGF0YUNvbnRlbnRzKGNvbnRlbnQpO1xuICAgIHJldHVybiAnwqhNJztcbiAgfSk7XG5cbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXlxccyotLS0rKFxcUyo/KVxcbihbXFxzXFxTXSs/KVxcbi0tLStcXG4vLCBmdW5jdGlvbiAod2hvbGVtYXRjaCwgZm9ybWF0LCBjb250ZW50KSB7XG4gICAgaWYgKGZvcm1hdCkge1xuICAgICAgZ2xvYmFscy5tZXRhZGF0YS5mb3JtYXQgPSBmb3JtYXQ7XG4gICAgfVxuICAgIHBhcnNlTWV0YWRhdGFDb250ZW50cyhjb250ZW50KTtcbiAgICByZXR1cm4gJ8KoTSc7XG4gIH0pO1xuXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL8KoTS9nLCAnJyk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnbWV0YWRhdGEuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG4vKipcbiAqIFJlbW92ZSBvbmUgbGV2ZWwgb2YgbGluZS1sZWFkaW5nIHRhYnMgb3Igc3BhY2VzXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignb3V0ZGVudCcsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnb3V0ZGVudC5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAvLyBhdHRhY2tsYWI6IGhhY2sgYXJvdW5kIEtvbnF1ZXJvciAzLjUuNCBidWc6XG4gIC8vIFwiLS0tLS0tLS0tLWJ1Z1wiLnJlcGxhY2UoL14tL2csXCJcIikgPT0gXCJidWdcIlxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9eKFxcdHxbIF17MSw0fSkvZ20sICfCqDAnKTsgLy8gYXR0YWNrbGFiOiBnX3RhYl93aWR0aFxuXG4gIC8vIGF0dGFja2xhYjogY2xlYW4gdXAgaGFja1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC/CqDAvZywgJycpO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ291dGRlbnQuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG4vKipcbiAqXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcigncGFyYWdyYXBocycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdwYXJhZ3JhcGhzLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAvLyBTdHJpcCBsZWFkaW5nIGFuZCB0cmFpbGluZyBsaW5lczpcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXlxcbisvZywgJycpO1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXG4rJC9nLCAnJyk7XG5cbiAgdmFyIGdyYWZzID0gdGV4dC5zcGxpdCgvXFxuezIsfS9nKSxcbiAgICAgIGdyYWZzT3V0ID0gW10sXG4gICAgICBlbmQgPSBncmFmcy5sZW5ndGg7IC8vIFdyYXAgPHA+IHRhZ3NcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgdmFyIHN0ciA9IGdyYWZzW2ldO1xuICAgIC8vIGlmIHRoaXMgaXMgYW4gSFRNTCBtYXJrZXIsIGNvcHkgaXRcbiAgICBpZiAoc3RyLnNlYXJjaCgvwqgoS3xHKShcXGQrKVxcMS9nKSA+PSAwKSB7XG4gICAgICBncmFmc091dC5wdXNoKHN0cik7XG5cbiAgICAvLyB0ZXN0IGZvciBwcmVzZW5jZSBvZiBjaGFyYWN0ZXJzIHRvIHByZXZlbnQgZW1wdHkgbGluZXMgYmVpbmcgcGFyc2VkXG4gICAgLy8gYXMgcGFyYWdyYXBocyAocmVzdWx0aW5nIGluIHVuZGVzaXJlZCBleHRyYSBlbXB0eSBwYXJhZ3JhcGhzKVxuICAgIH0gZWxzZSBpZiAoc3RyLnNlYXJjaCgvXFxTLykgPj0gMCkge1xuICAgICAgc3RyID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdzcGFuR2FtdXQnKShzdHIsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL14oWyBcXHRdKikvZywgJzxwPicpO1xuICAgICAgc3RyICs9ICc8L3A+JztcbiAgICAgIGdyYWZzT3V0LnB1c2goc3RyKTtcbiAgICB9XG4gIH1cblxuICAvKiogVW5oYXNoaWZ5IEhUTUwgYmxvY2tzICovXG4gIGVuZCA9IGdyYWZzT3V0Lmxlbmd0aDtcbiAgZm9yIChpID0gMDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgdmFyIGJsb2NrVGV4dCA9ICcnLFxuICAgICAgICBncmFmc091dEl0ID0gZ3JhZnNPdXRbaV0sXG4gICAgICAgIGNvZGVGbGFnID0gZmFsc2U7XG4gICAgLy8gaWYgdGhpcyBpcyBhIG1hcmtlciBmb3IgYW4gaHRtbCBibG9jay4uLlxuICAgIC8vIHVzZSBSZWdFeHAudGVzdCBpbnN0ZWFkIG9mIHN0cmluZy5zZWFyY2ggYmVjYXVzZSBvZiBRTUwgYnVnXG4gICAgd2hpbGUgKC/CqChLfEcpKFxcZCspXFwxLy50ZXN0KGdyYWZzT3V0SXQpKSB7XG4gICAgICB2YXIgZGVsaW0gPSBSZWdFeHAuJDEsXG4gICAgICAgICAgbnVtICAgPSBSZWdFeHAuJDI7XG5cbiAgICAgIGlmIChkZWxpbSA9PT0gJ0snKSB7XG4gICAgICAgIGJsb2NrVGV4dCA9IGdsb2JhbHMuZ0h0bWxCbG9ja3NbbnVtXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHdlIG5lZWQgdG8gY2hlY2sgaWYgZ2hCbG9jayBpcyBhIGZhbHNlIHBvc2l0aXZlXG4gICAgICAgIGlmIChjb2RlRmxhZykge1xuICAgICAgICAgIC8vIHVzZSBlbmNvZGVkIHZlcnNpb24gb2YgYWxsIHRleHRcbiAgICAgICAgICBibG9ja1RleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2VuY29kZUNvZGUnKShnbG9iYWxzLmdoQ29kZUJsb2Nrc1tudW1dLnRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJsb2NrVGV4dCA9IGdsb2JhbHMuZ2hDb2RlQmxvY2tzW251bV0uY29kZWJsb2NrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBibG9ja1RleHQgPSBibG9ja1RleHQucmVwbGFjZSgvXFwkL2csICckJCQkJyk7IC8vIEVzY2FwZSBhbnkgZG9sbGFyIHNpZ25zXG5cbiAgICAgIGdyYWZzT3V0SXQgPSBncmFmc091dEl0LnJlcGxhY2UoLyhcXG5cXG4pP8KoKEt8RylcXGQrXFwyKFxcblxcbik/LywgYmxvY2tUZXh0KTtcbiAgICAgIC8vIENoZWNrIGlmIGdyYWZzT3V0SXQgaXMgYSBwcmUtPmNvZGVcbiAgICAgIGlmICgvXjxwcmVcXGJbXj5dKj5cXHMqPGNvZGVcXGJbXj5dKj4vLnRlc3QoZ3JhZnNPdXRJdCkpIHtcbiAgICAgICAgY29kZUZsYWcgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBncmFmc091dFtpXSA9IGdyYWZzT3V0SXQ7XG4gIH1cbiAgdGV4dCA9IGdyYWZzT3V0LmpvaW4oJ1xcbicpO1xuICAvLyBTdHJpcCBsZWFkaW5nIGFuZCB0cmFpbGluZyBsaW5lczpcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXlxcbisvZywgJycpO1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXG4rJC9nLCAnJyk7XG4gIHJldHVybiBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ3BhcmFncmFwaHMuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbn0pO1xuXHJcbi8qKlxuICogUnVuIGV4dGVuc2lvblxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ3J1bkV4dGVuc2lvbicsIGZ1bmN0aW9uIChleHQsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGlmIChleHQuZmlsdGVyKSB7XG4gICAgdGV4dCA9IGV4dC5maWx0ZXIodGV4dCwgZ2xvYmFscy5jb252ZXJ0ZXIsIG9wdGlvbnMpO1xuXG4gIH0gZWxzZSBpZiAoZXh0LnJlZ2V4KSB7XG4gICAgLy8gVE9ETyByZW1vdmUgdGhpcyB3aGVuIG9sZCBleHRlbnNpb24gbG9hZGluZyBtZWNoYW5pc20gaXMgZGVwcmVjYXRlZFxuICAgIHZhciByZSA9IGV4dC5yZWdleDtcbiAgICBpZiAoIShyZSBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcbiAgICAgIHJlID0gbmV3IFJlZ0V4cChyZSwgJ2cnKTtcbiAgICB9XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZShyZSwgZXh0LnJlcGxhY2UpO1xuICB9XG5cbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG4vKipcbiAqIFRoZXNlIGFyZSBhbGwgdGhlIHRyYW5zZm9ybWF0aW9ucyB0aGF0IG9jY3VyICp3aXRoaW4qIGJsb2NrLWxldmVsXG4gKiB0YWdzIGxpa2UgcGFyYWdyYXBocywgaGVhZGVycywgYW5kIGxpc3QgaXRlbXMuXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignc3BhbkdhbXV0JywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ3NwYW5HYW11dC5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignY29kZVNwYW5zJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2VzY2FwZVNwZWNpYWxDaGFyc1dpdGhpblRhZ0F0dHJpYnV0ZXMnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignZW5jb2RlQmFja3NsYXNoRXNjYXBlcycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIC8vIFByb2Nlc3MgYW5jaG9yIGFuZCBpbWFnZSB0YWdzLiBJbWFnZXMgbXVzdCBjb21lIGZpcnN0LFxuICAvLyBiZWNhdXNlICFbZm9vXVtmXSBsb29rcyBsaWtlIGFuIGFuY2hvci5cbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignaW1hZ2VzJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2FuY2hvcnMnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAvLyBNYWtlIGxpbmtzIG91dCBvZiB0aGluZ3MgbGlrZSBgPGh0dHA6Ly9leGFtcGxlLmNvbS8+YFxuICAvLyBNdXN0IGNvbWUgYWZ0ZXIgYW5jaG9ycywgYmVjYXVzZSB5b3UgY2FuIHVzZSA8IGFuZCA+XG4gIC8vIGRlbGltaXRlcnMgaW4gaW5saW5lIGxpbmtzIGxpa2UgW3RoaXNdKDx1cmw+KS5cbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignYXV0b0xpbmtzJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ3NpbXBsaWZpZWRBdXRvTGlua3MnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignZW1vamknKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcigndW5kZXJsaW5lJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2l0YWxpY3NBbmRCb2xkJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ3N0cmlrZXRocm91Z2gnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignZWxsaXBzaXMnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAvLyB3ZSBuZWVkIHRvIGhhc2ggSFRNTCB0YWdzIGluc2lkZSBzcGFuc1xuICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdoYXNoSFRNTFNwYW5zJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgLy8gbm93IHdlIGVuY29kZSBhbXBzIGFuZCBhbmdsZXNcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignZW5jb2RlQW1wc0FuZEFuZ2xlcycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIC8vIERvIGhhcmQgYnJlYWtzXG4gIGlmIChvcHRpb25zLnNpbXBsZUxpbmVCcmVha3MpIHtcbiAgICAvLyBHRk0gc3R5bGUgaGFyZCBicmVha3NcbiAgICAvLyBvbmx5IGFkZCBsaW5lIGJyZWFrcyBpZiB0aGUgdGV4dCBkb2VzIG5vdCBjb250YWluIGEgYmxvY2sgKHNwZWNpYWwgY2FzZSBmb3IgbGlzdHMpXG4gICAgaWYgKCEvXFxuXFxuwqhLLy50ZXN0KHRleHQpKSB7XG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXG4rL2csICc8YnIgLz5cXG4nKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gVmFuaWxsYSBoYXJkIGJyZWFrc1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoLyAgK1xcbi9nLCAnPGJyIC8+XFxuJyk7XG4gIH1cblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdzcGFuR2FtdXQuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG5zaG93ZG93bi5zdWJQYXJzZXIoJ3N0cmlrZXRocm91Z2gnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgZnVuY3Rpb24gcGFyc2VJbnNpZGUgKHR4dCkge1xuICAgIGlmIChvcHRpb25zLnNpbXBsaWZpZWRBdXRvTGluaykge1xuICAgICAgdHh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdzaW1wbGlmaWVkQXV0b0xpbmtzJykodHh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICB9XG4gICAgcmV0dXJuICc8ZGVsPicgKyB0eHQgKyAnPC9kZWw+JztcbiAgfVxuXG4gIGlmIChvcHRpb25zLnN0cmlrZXRocm91Z2gpIHtcbiAgICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdzdHJpa2V0aHJvdWdoLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoLyg/On4pezJ9KFtcXHNcXFNdKz8pKD86fil7Mn0vZywgZnVuY3Rpb24gKHdtLCB0eHQpIHsgcmV0dXJuIHBhcnNlSW5zaWRlKHR4dCk7IH0pO1xuICAgIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ3N0cmlrZXRocm91Z2guYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgfVxuXG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuLyoqXG4gKiBTdHJpcHMgbGluayBkZWZpbml0aW9ucyBmcm9tIHRleHQsIHN0b3JlcyB0aGUgVVJMcyBhbmQgdGl0bGVzIGluXG4gKiBoYXNoIHJlZmVyZW5jZXMuXG4gKiBMaW5rIGRlZnMgYXJlIGluIHRoZSBmb3JtOiBeW2lkXTogdXJsIFwib3B0aW9uYWwgdGl0bGVcIlxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ3N0cmlwTGlua0RlZmluaXRpb25zJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciByZWdleCAgICAgICA9IC9eIHswLDN9XFxbKC4rKV06WyBcXHRdKlxcbj9bIFxcdF0qPD8oW14+XFxzXSspPj8oPzogPShbKlxcZF0rW0EtWmEteiVdezAsNH0peChbKlxcZF0rW0EtWmEteiVdezAsNH0pKT9bIFxcdF0qXFxuP1sgXFx0XSooPzooXFxuKilbXCJ8JyhdKC4rPylbXCJ8JyldWyBcXHRdKik/KD86XFxuK3woPz3CqDApKS9nbSxcbiAgICAgIGJhc2U2NFJlZ2V4ID0gL14gezAsM31cXFsoLispXTpbIFxcdF0qXFxuP1sgXFx0XSo8PyhkYXRhOi4rP1xcLy4rPztiYXNlNjQsW0EtWmEtejAtOSsvPVxcbl0rPyk+Pyg/OiA9KFsqXFxkXStbQS1aYS16JV17MCw0fSl4KFsqXFxkXStbQS1aYS16JV17MCw0fSkpP1sgXFx0XSpcXG4/WyBcXHRdKig/OihcXG4qKVtcInwnKF0oLis/KVtcInwnKV1bIFxcdF0qKT8oPzpcXG5cXG58KD89wqgwKXwoPz1cXG5cXFspKS9nbTtcblxuICAvLyBhdHRhY2tsYWI6IHNlbnRpbmVsIHdvcmthcm91bmRzIGZvciBsYWNrIG9mIFxcQSBhbmQgXFxaLCBzYWZhcmlcXGtodG1sIGJ1Z1xuICB0ZXh0ICs9ICfCqDAnO1xuXG4gIHZhciByZXBsYWNlRnVuYyA9IGZ1bmN0aW9uICh3aG9sZU1hdGNoLCBsaW5rSWQsIHVybCwgd2lkdGgsIGhlaWdodCwgYmxhbmtMaW5lcywgdGl0bGUpIHtcbiAgICBsaW5rSWQgPSBsaW5rSWQudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAodXJsLm1hdGNoKC9eZGF0YTouKz9cXC8uKz87YmFzZTY0LC8pKSB7XG4gICAgICAvLyByZW1vdmUgbmV3bGluZXNcbiAgICAgIGdsb2JhbHMuZ1VybHNbbGlua0lkXSA9IHVybC5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnbG9iYWxzLmdVcmxzW2xpbmtJZF0gPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2VuY29kZUFtcHNBbmRBbmdsZXMnKSh1cmwsIG9wdGlvbnMsIGdsb2JhbHMpOyAgLy8gTGluayBJRHMgYXJlIGNhc2UtaW5zZW5zaXRpdmVcbiAgICB9XG5cbiAgICBpZiAoYmxhbmtMaW5lcykge1xuICAgICAgLy8gT29wcywgZm91bmQgYmxhbmsgbGluZXMsIHNvIGl0J3Mgbm90IGEgdGl0bGUuXG4gICAgICAvLyBQdXQgYmFjayB0aGUgcGFyZW50aGV0aWNhbCBzdGF0ZW1lbnQgd2Ugc3RvbGUuXG4gICAgICByZXR1cm4gYmxhbmtMaW5lcyArIHRpdGxlO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICBnbG9iYWxzLmdUaXRsZXNbbGlua0lkXSA9IHRpdGxlLnJlcGxhY2UoL1wifCcvZywgJyZxdW90OycpO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMucGFyc2VJbWdEaW1lbnNpb25zICYmIHdpZHRoICYmIGhlaWdodCkge1xuICAgICAgICBnbG9iYWxzLmdEaW1lbnNpb25zW2xpbmtJZF0gPSB7XG4gICAgICAgICAgd2lkdGg6ICB3aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBDb21wbGV0ZWx5IHJlbW92ZSB0aGUgZGVmaW5pdGlvbiBmcm9tIHRoZSB0ZXh0XG4gICAgcmV0dXJuICcnO1xuICB9O1xuXG4gIC8vIGZpcnN0IHdlIHRyeSB0byBmaW5kIGJhc2U2NCBsaW5rIHJlZmVyZW5jZXNcbiAgdGV4dCA9IHRleHQucmVwbGFjZShiYXNlNjRSZWdleCwgcmVwbGFjZUZ1bmMpO1xuXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UocmVnZXgsIHJlcGxhY2VGdW5jKTtcblxuICAvLyBhdHRhY2tsYWI6IHN0cmlwIHNlbnRpbmVsXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL8KoMC8sICcnKTtcblxuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcigndGFibGVzJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGlmICghb3B0aW9ucy50YWJsZXMpIHtcbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIHZhciB0YWJsZVJneCAgICAgICA9IC9eIHswLDN9XFx8Py4rXFx8LitcXG4gezAsM31cXHw/WyBcXHRdKjo/WyBcXHRdKig/OlstPV0pezIsfVsgXFx0XSo6P1sgXFx0XSpcXHxbIFxcdF0qOj9bIFxcdF0qKD86Wy09XSl7Mix9W1xcc1xcU10rPyg/OlxcblxcbnzCqDApL2dtLFxuICAgIC8vc2luZ2VDb2xUYmxSZ3ggPSAvXiB7MCwzfVxcfC4rXFx8XFxuIHswLDN9XFx8WyBcXHRdKjo/WyBcXHRdKig/OlstPV0pezIsfVsgXFx0XSo6P1sgXFx0XSpcXHxbIFxcdF0qXFxuKD86IHswLDN9XFx8LitcXHxcXG4pKyg/OlxcblxcbnzCqDApL2dtO1xuICAgICAgc2luZ2VDb2xUYmxSZ3ggPSAvXiB7MCwzfVxcfC4rXFx8WyBcXHRdKlxcbiB7MCwzfVxcfFsgXFx0XSo6P1sgXFx0XSooPzpbLT1dKXsyLH1bIFxcdF0qOj9bIFxcdF0qXFx8WyBcXHRdKlxcbiggezAsM31cXHwuK1xcfFsgXFx0XSpcXG4pKig/OlxcbnzCqDApL2dtO1xuXG4gIGZ1bmN0aW9uIHBhcnNlU3R5bGVzIChzTGluZSkge1xuICAgIGlmICgvXjpbIFxcdF0qLS0qJC8udGVzdChzTGluZSkpIHtcbiAgICAgIHJldHVybiAnIHN0eWxlPVwidGV4dC1hbGlnbjpsZWZ0O1wiJztcbiAgICB9IGVsc2UgaWYgKC9eLS0qWyBcXHRdKjpbIFxcdF0qJC8udGVzdChzTGluZSkpIHtcbiAgICAgIHJldHVybiAnIHN0eWxlPVwidGV4dC1hbGlnbjpyaWdodDtcIic7XG4gICAgfSBlbHNlIGlmICgvXjpbIFxcdF0qLS0qWyBcXHRdKjokLy50ZXN0KHNMaW5lKSkge1xuICAgICAgcmV0dXJuICcgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjtcIic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUhlYWRlcnMgKGhlYWRlciwgc3R5bGUpIHtcbiAgICB2YXIgaWQgPSAnJztcbiAgICBoZWFkZXIgPSBoZWFkZXIudHJpbSgpO1xuICAgIC8vIHN1cHBvcnQgYm90aCB0YWJsZXNIZWFkZXJJZCBhbmQgdGFibGVIZWFkZXJJZCBkdWUgdG8gZXJyb3IgaW4gZG9jdW1lbnRhdGlvbiBzbyB3ZSBkb24ndCBicmVhayBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgIGlmIChvcHRpb25zLnRhYmxlc0hlYWRlcklkIHx8IG9wdGlvbnMudGFibGVIZWFkZXJJZCkge1xuICAgICAgaWQgPSAnIGlkPVwiJyArIGhlYWRlci5yZXBsYWNlKC8gL2csICdfJykudG9Mb3dlckNhc2UoKSArICdcIic7XG4gICAgfVxuICAgIGhlYWRlciA9IHNob3dkb3duLnN1YlBhcnNlcignc3BhbkdhbXV0JykoaGVhZGVyLCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAgIHJldHVybiAnPHRoJyArIGlkICsgc3R5bGUgKyAnPicgKyBoZWFkZXIgKyAnPC90aD5cXG4nO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VDZWxscyAoY2VsbCwgc3R5bGUpIHtcbiAgICB2YXIgc3ViVGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignc3BhbkdhbXV0JykoY2VsbCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgcmV0dXJuICc8dGQnICsgc3R5bGUgKyAnPicgKyBzdWJUZXh0ICsgJzwvdGQ+XFxuJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1aWxkVGFibGUgKGhlYWRlcnMsIGNlbGxzKSB7XG4gICAgdmFyIHRiID0gJzx0YWJsZT5cXG48dGhlYWQ+XFxuPHRyPlxcbicsXG4gICAgICAgIHRibExnbiA9IGhlYWRlcnMubGVuZ3RoO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YmxMZ247ICsraSkge1xuICAgICAgdGIgKz0gaGVhZGVyc1tpXTtcbiAgICB9XG4gICAgdGIgKz0gJzwvdHI+XFxuPC90aGVhZD5cXG48dGJvZHk+XFxuJztcblxuICAgIGZvciAoaSA9IDA7IGkgPCBjZWxscy5sZW5ndGg7ICsraSkge1xuICAgICAgdGIgKz0gJzx0cj5cXG4nO1xuICAgICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IHRibExnbjsgKytpaSkge1xuICAgICAgICB0YiArPSBjZWxsc1tpXVtpaV07XG4gICAgICB9XG4gICAgICB0YiArPSAnPC90cj5cXG4nO1xuICAgIH1cbiAgICB0YiArPSAnPC90Ym9keT5cXG48L3RhYmxlPlxcbic7XG4gICAgcmV0dXJuIHRiO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VUYWJsZSAocmF3VGFibGUpIHtcbiAgICB2YXIgaSwgdGFibGVMaW5lcyA9IHJhd1RhYmxlLnNwbGl0KCdcXG4nKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCB0YWJsZUxpbmVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAvLyBzdHJpcCB3cm9uZyBmaXJzdCBhbmQgbGFzdCBjb2x1bW4gaWYgd3JhcHBlZCB0YWJsZXMgYXJlIHVzZWRcbiAgICAgIGlmICgvXiB7MCwzfVxcfC8udGVzdCh0YWJsZUxpbmVzW2ldKSkge1xuICAgICAgICB0YWJsZUxpbmVzW2ldID0gdGFibGVMaW5lc1tpXS5yZXBsYWNlKC9eIHswLDN9XFx8LywgJycpO1xuICAgICAgfVxuICAgICAgaWYgKC9cXHxbIFxcdF0qJC8udGVzdCh0YWJsZUxpbmVzW2ldKSkge1xuICAgICAgICB0YWJsZUxpbmVzW2ldID0gdGFibGVMaW5lc1tpXS5yZXBsYWNlKC9cXHxbIFxcdF0qJC8sICcnKTtcbiAgICAgIH1cbiAgICAgIC8vIHBhcnNlIGNvZGUgc3BhbnMgZmlyc3QsIGJ1dCB3ZSBvbmx5IHN1cHBvcnQgb25lIGxpbmUgY29kZSBzcGFuc1xuICAgICAgdGFibGVMaW5lc1tpXSA9IHNob3dkb3duLnN1YlBhcnNlcignY29kZVNwYW5zJykodGFibGVMaW5lc1tpXSwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgfVxuXG4gICAgdmFyIHJhd0hlYWRlcnMgPSB0YWJsZUxpbmVzWzBdLnNwbGl0KCd8JykubWFwKGZ1bmN0aW9uIChzKSB7IHJldHVybiBzLnRyaW0oKTt9KSxcbiAgICAgICAgcmF3U3R5bGVzID0gdGFibGVMaW5lc1sxXS5zcGxpdCgnfCcpLm1hcChmdW5jdGlvbiAocykgeyByZXR1cm4gcy50cmltKCk7fSksXG4gICAgICAgIHJhd0NlbGxzID0gW10sXG4gICAgICAgIGhlYWRlcnMgPSBbXSxcbiAgICAgICAgc3R5bGVzID0gW10sXG4gICAgICAgIGNlbGxzID0gW107XG5cbiAgICB0YWJsZUxpbmVzLnNoaWZ0KCk7XG4gICAgdGFibGVMaW5lcy5zaGlmdCgpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHRhYmxlTGluZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmICh0YWJsZUxpbmVzW2ldLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICByYXdDZWxscy5wdXNoKFxuICAgICAgICB0YWJsZUxpbmVzW2ldXG4gICAgICAgICAgLnNwbGl0KCd8JylcbiAgICAgICAgICAubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICByZXR1cm4gcy50cmltKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHJhd0hlYWRlcnMubGVuZ3RoIDwgcmF3U3R5bGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHJhd1RhYmxlO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCByYXdTdHlsZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHN0eWxlcy5wdXNoKHBhcnNlU3R5bGVzKHJhd1N0eWxlc1tpXSkpO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCByYXdIZWFkZXJzLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAoc2hvd2Rvd24uaGVscGVyLmlzVW5kZWZpbmVkKHN0eWxlc1tpXSkpIHtcbiAgICAgICAgc3R5bGVzW2ldID0gJyc7XG4gICAgICB9XG4gICAgICBoZWFkZXJzLnB1c2gocGFyc2VIZWFkZXJzKHJhd0hlYWRlcnNbaV0sIHN0eWxlc1tpXSkpO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCByYXdDZWxscy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIHJvdyA9IFtdO1xuICAgICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IGhlYWRlcnMubGVuZ3RoOyArK2lpKSB7XG4gICAgICAgIGlmIChzaG93ZG93bi5oZWxwZXIuaXNVbmRlZmluZWQocmF3Q2VsbHNbaV1baWldKSkge1xuXG4gICAgICAgIH1cbiAgICAgICAgcm93LnB1c2gocGFyc2VDZWxscyhyYXdDZWxsc1tpXVtpaV0sIHN0eWxlc1tpaV0pKTtcbiAgICAgIH1cbiAgICAgIGNlbGxzLnB1c2gocm93KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVpbGRUYWJsZShoZWFkZXJzLCBjZWxscyk7XG4gIH1cblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCd0YWJsZXMuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgLy8gZmluZCBlc2NhcGVkIHBpcGUgY2hhcmFjdGVyc1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXFxcKFxcfCkvZywgc2hvd2Rvd24uaGVscGVyLmVzY2FwZUNoYXJhY3RlcnNDYWxsYmFjayk7XG5cbiAgLy8gcGFyc2UgbXVsdGkgY29sdW1uIHRhYmxlc1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHRhYmxlUmd4LCBwYXJzZVRhYmxlKTtcblxuICAvLyBwYXJzZSBvbmUgY29sdW1uIHRhYmxlc1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHNpbmdlQ29sVGJsUmd4LCBwYXJzZVRhYmxlKTtcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCd0YWJsZXMuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcigndW5kZXJsaW5lJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGlmICghb3B0aW9ucy51bmRlcmxpbmUpIHtcbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ3VuZGVybGluZS5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICBpZiAob3B0aW9ucy5saXRlcmFsTWlkV29yZFVuZGVyc2NvcmVzKSB7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxiX19fKFxcU1tcXHNcXFNdKj8pX19fXFxiL2csIGZ1bmN0aW9uICh3bSwgdHh0KSB7XG4gICAgICByZXR1cm4gJzx1PicgKyB0eHQgKyAnPC91Pic7XG4gICAgfSk7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxiX18oXFxTW1xcc1xcU10qPylfX1xcYi9nLCBmdW5jdGlvbiAod20sIHR4dCkge1xuICAgICAgcmV0dXJuICc8dT4nICsgdHh0ICsgJzwvdT4nO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL19fXyhcXFNbXFxzXFxTXSo/KV9fXy9nLCBmdW5jdGlvbiAod20sIG0pIHtcbiAgICAgIHJldHVybiAoL1xcUyQvLnRlc3QobSkpID8gJzx1PicgKyBtICsgJzwvdT4nIDogd207XG4gICAgfSk7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvX18oXFxTW1xcc1xcU10qPylfXy9nLCBmdW5jdGlvbiAod20sIG0pIHtcbiAgICAgIHJldHVybiAoL1xcUyQvLnRlc3QobSkpID8gJzx1PicgKyBtICsgJzwvdT4nIDogd207XG4gICAgfSk7XG4gIH1cblxuICAvLyBlc2NhcGUgcmVtYWluaW5nIHVuZGVyc2NvcmVzIHRvIHByZXZlbnQgdGhlbSBiZWluZyBwYXJzZWQgYnkgaXRhbGljIGFuZCBib2xkXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoLyhfKS9nLCBzaG93ZG93bi5oZWxwZXIuZXNjYXBlQ2hhcmFjdGVyc0NhbGxiYWNrKTtcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCd1bmRlcmxpbmUuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbi8qKlxuICogU3dhcCBiYWNrIGluIGFsbCB0aGUgc3BlY2lhbCBjaGFyYWN0ZXJzIHdlJ3ZlIGhpZGRlbi5cbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCd1bmVzY2FwZVNwZWNpYWxDaGFycycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgndW5lc2NhcGVTcGVjaWFsQ2hhcnMuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvwqhFKFxcZCspRS9nLCBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbTEpIHtcbiAgICB2YXIgY2hhckNvZGVUb1JlcGxhY2UgPSBwYXJzZUludChtMSk7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoY2hhckNvZGVUb1JlcGxhY2UpO1xuICB9KTtcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCd1bmVzY2FwZVNwZWNpYWxDaGFycy5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLmJsb2NrcXVvdGUnLCBmdW5jdGlvbiAobm9kZSwgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHR4dCA9ICcnO1xuICBpZiAobm9kZS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkTm9kZXMsXG4gICAgICAgIGNoaWxkcmVuTGVuZ3RoID0gY2hpbGRyZW4ubGVuZ3RoO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgaW5uZXJUeHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5ub2RlJykoY2hpbGRyZW5baV0sIGdsb2JhbHMpO1xuXG4gICAgICBpZiAoaW5uZXJUeHQgPT09ICcnKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdHh0ICs9IGlubmVyVHh0O1xuICAgIH1cbiAgfVxuICAvLyBjbGVhbnVwXG4gIHR4dCA9IHR4dC50cmltKCk7XG4gIHR4dCA9ICc+ICcgKyB0eHQuc3BsaXQoJ1xcbicpLmpvaW4oJ1xcbj4gJyk7XG4gIHJldHVybiB0eHQ7XG59KTtcblxyXG5zaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5jb2RlQmxvY2snLCBmdW5jdGlvbiAobm9kZSwgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGxhbmcgPSBub2RlLmdldEF0dHJpYnV0ZSgnbGFuZ3VhZ2UnKSxcbiAgICAgIG51bSAgPSBub2RlLmdldEF0dHJpYnV0ZSgncHJlY29kZW51bScpO1xuICByZXR1cm4gJ2BgYCcgKyBsYW5nICsgJ1xcbicgKyBnbG9iYWxzLnByZUxpc3RbbnVtXSArICdcXG5gYGAnO1xufSk7XG5cclxuc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24uY29kZVNwYW4nLCBmdW5jdGlvbiAobm9kZSkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgcmV0dXJuICdgJyArIG5vZGUuaW5uZXJIVE1MICsgJ2AnO1xufSk7XG5cclxuc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24uZW1waGFzaXMnLCBmdW5jdGlvbiAobm9kZSwgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHR4dCA9ICcnO1xuICBpZiAobm9kZS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICB0eHQgKz0gJyonO1xuICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGROb2RlcyxcbiAgICAgICAgY2hpbGRyZW5MZW5ndGggPSBjaGlsZHJlbi5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgKytpKSB7XG4gICAgICB0eHQgKz0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24ubm9kZScpKGNoaWxkcmVuW2ldLCBnbG9iYWxzKTtcbiAgICB9XG4gICAgdHh0ICs9ICcqJztcbiAgfVxuICByZXR1cm4gdHh0O1xufSk7XG5cclxuc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24uaGVhZGVyJywgZnVuY3Rpb24gKG5vZGUsIGdsb2JhbHMsIGhlYWRlckxldmVsKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgaGVhZGVyTWFyayA9IG5ldyBBcnJheShoZWFkZXJMZXZlbCArIDEpLmpvaW4oJyMnKSxcbiAgICAgIHR4dCA9ICcnO1xuXG4gIGlmIChub2RlLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgIHR4dCA9IGhlYWRlck1hcmsgKyAnICc7XG4gICAgdmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZE5vZGVzLFxuICAgICAgICBjaGlsZHJlbkxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7ICsraSkge1xuICAgICAgdHh0ICs9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLm5vZGUnKShjaGlsZHJlbltpXSwgZ2xvYmFscyk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0eHQ7XG59KTtcblxyXG5zaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5ocicsIGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHJldHVybiAnLS0tJztcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLmltYWdlJywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0eHQgPSAnJztcbiAgaWYgKG5vZGUuaGFzQXR0cmlidXRlKCdzcmMnKSkge1xuICAgIHR4dCArPSAnIVsnICsgbm9kZS5nZXRBdHRyaWJ1dGUoJ2FsdCcpICsgJ10oJztcbiAgICB0eHQgKz0gJzwnICsgbm9kZS5nZXRBdHRyaWJ1dGUoJ3NyYycpICsgJz4nO1xuICAgIGlmIChub2RlLmhhc0F0dHJpYnV0ZSgnd2lkdGgnKSAmJiBub2RlLmhhc0F0dHJpYnV0ZSgnaGVpZ2h0JykpIHtcbiAgICAgIHR4dCArPSAnID0nICsgbm9kZS5nZXRBdHRyaWJ1dGUoJ3dpZHRoJykgKyAneCcgKyBub2RlLmdldEF0dHJpYnV0ZSgnaGVpZ2h0Jyk7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuaGFzQXR0cmlidXRlKCd0aXRsZScpKSB7XG4gICAgICB0eHQgKz0gJyBcIicgKyBub2RlLmdldEF0dHJpYnV0ZSgndGl0bGUnKSArICdcIic7XG4gICAgfVxuICAgIHR4dCArPSAnKSc7XG4gIH1cbiAgcmV0dXJuIHR4dDtcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLmxpbmtzJywgZnVuY3Rpb24gKG5vZGUsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0eHQgPSAnJztcbiAgaWYgKG5vZGUuaGFzQ2hpbGROb2RlcygpICYmIG5vZGUuaGFzQXR0cmlidXRlKCdocmVmJykpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkTm9kZXMsXG4gICAgICAgIGNoaWxkcmVuTGVuZ3RoID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgIHR4dCA9ICdbJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyArK2kpIHtcbiAgICAgIHR4dCArPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5ub2RlJykoY2hpbGRyZW5baV0sIGdsb2JhbHMpO1xuICAgIH1cbiAgICB0eHQgKz0gJ10oJztcbiAgICB0eHQgKz0gJzwnICsgbm9kZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSArICc+JztcbiAgICBpZiAobm9kZS5oYXNBdHRyaWJ1dGUoJ3RpdGxlJykpIHtcbiAgICAgIHR4dCArPSAnIFwiJyArIG5vZGUuZ2V0QXR0cmlidXRlKCd0aXRsZScpICsgJ1wiJztcbiAgICB9XG4gICAgdHh0ICs9ICcpJztcbiAgfVxuICByZXR1cm4gdHh0O1xufSk7XG5cclxuc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24ubGlzdCcsIGZ1bmN0aW9uIChub2RlLCBnbG9iYWxzLCB0eXBlKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgdHh0ID0gJyc7XG4gIGlmICghbm9kZS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgdmFyIGxpc3RJdGVtcyAgICAgICA9IG5vZGUuY2hpbGROb2RlcyxcbiAgICAgIGxpc3RJdGVtc0xlbmdodCA9IGxpc3RJdGVtcy5sZW5ndGgsXG4gICAgICBsaXN0TnVtID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ3N0YXJ0JykgfHwgMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RJdGVtc0xlbmdodDsgKytpKSB7XG4gICAgaWYgKHR5cGVvZiBsaXN0SXRlbXNbaV0udGFnTmFtZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbGlzdEl0ZW1zW2ldLnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2xpJykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gZGVmaW5lIHRoZSBidWxsZXQgdG8gdXNlIGluIGxpc3RcbiAgICB2YXIgYnVsbGV0ID0gJyc7XG4gICAgaWYgKHR5cGUgPT09ICdvbCcpIHtcbiAgICAgIGJ1bGxldCA9IGxpc3ROdW0udG9TdHJpbmcoKSArICcuICc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1bGxldCA9ICctICc7XG4gICAgfVxuXG4gICAgLy8gcGFyc2UgbGlzdCBpdGVtXG4gICAgdHh0ICs9IGJ1bGxldCArIHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLmxpc3RJdGVtJykobGlzdEl0ZW1zW2ldLCBnbG9iYWxzKTtcbiAgICArK2xpc3ROdW07XG4gIH1cblxuICAvLyBhZGQgY29tbWVudCBhdCB0aGUgZW5kIHRvIHByZXZlbnQgY29uc2VjdXRpdmUgbGlzdHMgdG8gYmUgcGFyc2VkIGFzIG9uZVxuICB0eHQgKz0gJ1xcbjwhLS0gLS0+XFxuJztcbiAgcmV0dXJuIHR4dC50cmltKCk7XG59KTtcblxyXG5zaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5saXN0SXRlbScsIGZ1bmN0aW9uIChub2RlLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbGlzdEl0ZW1UeHQgPSAnJztcblxuICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkTm9kZXMsXG4gICAgICBjaGlsZHJlbkxlbmdodCA9IGNoaWxkcmVuLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ2h0OyArK2kpIHtcbiAgICBsaXN0SXRlbVR4dCArPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5ub2RlJykoY2hpbGRyZW5baV0sIGdsb2JhbHMpO1xuICB9XG4gIC8vIGlmIGl0J3Mgb25seSBvbmUgbGluZXIsIHdlIG5lZWQgdG8gYWRkIGEgbmV3bGluZSBhdCB0aGUgZW5kXG4gIGlmICghL1xcbiQvLnRlc3QobGlzdEl0ZW1UeHQpKSB7XG4gICAgbGlzdEl0ZW1UeHQgKz0gJ1xcbic7XG4gIH0gZWxzZSB7XG4gICAgLy8gaXQncyBtdWx0aXBhcmFncmFwaCwgc28gd2UgbmVlZCB0byBpbmRlbnRcbiAgICBsaXN0SXRlbVR4dCA9IGxpc3RJdGVtVHh0XG4gICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAuam9pbignXFxuICAgICcpXG4gICAgICAucmVwbGFjZSgvXiB7NH0kL2dtLCAnJylcbiAgICAgIC5yZXBsYWNlKC9cXG5cXG4rL2csICdcXG5cXG4nKTtcbiAgfVxuXG4gIHJldHVybiBsaXN0SXRlbVR4dDtcbn0pO1xuXHJcblxuXG5zaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5ub2RlJywgZnVuY3Rpb24gKG5vZGUsIGdsb2JhbHMsIHNwYW5zT25seSkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgc3BhbnNPbmx5ID0gc3BhbnNPbmx5IHx8IGZhbHNlO1xuXG4gIHZhciB0eHQgPSAnJztcblxuICAvLyBlZGdlIGNhc2Ugb2YgdGV4dCB3aXRob3V0IHdyYXBwZXIgcGFyYWdyYXBoXG4gIGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgcmV0dXJuIHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLnR4dCcpKG5vZGUsIGdsb2JhbHMpO1xuICB9XG5cbiAgLy8gSFRNTCBjb21tZW50XG4gIGlmIChub2RlLm5vZGVUeXBlID09PSA4KSB7XG4gICAgcmV0dXJuICc8IS0tJyArIG5vZGUuZGF0YSArICctLT5cXG5cXG4nO1xuICB9XG5cbiAgLy8gcHJvY2VzcyBvbmx5IG5vZGUgZWxlbWVudHNcbiAgaWYgKG5vZGUubm9kZVR5cGUgIT09IDEpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICB2YXIgdGFnTmFtZSA9IG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gIHN3aXRjaCAodGFnTmFtZSkge1xuXG4gICAgLy9cbiAgICAvLyBCTE9DS1NcbiAgICAvL1xuICAgIGNhc2UgJ2gxJzpcbiAgICAgIGlmICghc3BhbnNPbmx5KSB7IHR4dCA9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLmhlYWRlcicpKG5vZGUsIGdsb2JhbHMsIDEpICsgJ1xcblxcbic7IH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2gyJzpcbiAgICAgIGlmICghc3BhbnNPbmx5KSB7IHR4dCA9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLmhlYWRlcicpKG5vZGUsIGdsb2JhbHMsIDIpICsgJ1xcblxcbic7IH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2gzJzpcbiAgICAgIGlmICghc3BhbnNPbmx5KSB7IHR4dCA9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLmhlYWRlcicpKG5vZGUsIGdsb2JhbHMsIDMpICsgJ1xcblxcbic7IH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2g0JzpcbiAgICAgIGlmICghc3BhbnNPbmx5KSB7IHR4dCA9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLmhlYWRlcicpKG5vZGUsIGdsb2JhbHMsIDQpICsgJ1xcblxcbic7IH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2g1JzpcbiAgICAgIGlmICghc3BhbnNPbmx5KSB7IHR4dCA9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLmhlYWRlcicpKG5vZGUsIGdsb2JhbHMsIDUpICsgJ1xcblxcbic7IH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2g2JzpcbiAgICAgIGlmICghc3BhbnNPbmx5KSB7IHR4dCA9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLmhlYWRlcicpKG5vZGUsIGdsb2JhbHMsIDYpICsgJ1xcblxcbic7IH1cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAncCc6XG4gICAgICBpZiAoIXNwYW5zT25seSkgeyB0eHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5wYXJhZ3JhcGgnKShub2RlLCBnbG9iYWxzKSArICdcXG5cXG4nOyB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2Jsb2NrcXVvdGUnOlxuICAgICAgaWYgKCFzcGFuc09ubHkpIHsgdHh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24uYmxvY2txdW90ZScpKG5vZGUsIGdsb2JhbHMpICsgJ1xcblxcbic7IH1cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnaHInOlxuICAgICAgaWYgKCFzcGFuc09ubHkpIHsgdHh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24uaHInKShub2RlLCBnbG9iYWxzKSArICdcXG5cXG4nOyB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ29sJzpcbiAgICAgIGlmICghc3BhbnNPbmx5KSB7IHR4dCA9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLmxpc3QnKShub2RlLCBnbG9iYWxzLCAnb2wnKSArICdcXG5cXG4nOyB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3VsJzpcbiAgICAgIGlmICghc3BhbnNPbmx5KSB7IHR4dCA9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLmxpc3QnKShub2RlLCBnbG9iYWxzLCAndWwnKSArICdcXG5cXG4nOyB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3ByZWNvZGUnOlxuICAgICAgaWYgKCFzcGFuc09ubHkpIHsgdHh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24uY29kZUJsb2NrJykobm9kZSwgZ2xvYmFscykgKyAnXFxuXFxuJzsgfVxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdwcmUnOlxuICAgICAgaWYgKCFzcGFuc09ubHkpIHsgdHh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24ucHJlJykobm9kZSwgZ2xvYmFscykgKyAnXFxuXFxuJzsgfVxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICd0YWJsZSc6XG4gICAgICBpZiAoIXNwYW5zT25seSkgeyB0eHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi50YWJsZScpKG5vZGUsIGdsb2JhbHMpICsgJ1xcblxcbic7IH1cbiAgICAgIGJyZWFrO1xuXG4gICAgLy9cbiAgICAvLyBTUEFOU1xuICAgIC8vXG4gICAgY2FzZSAnY29kZSc6XG4gICAgICB0eHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5jb2RlU3BhbicpKG5vZGUsIGdsb2JhbHMpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdlbSc6XG4gICAgY2FzZSAnaSc6XG4gICAgICB0eHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5lbXBoYXNpcycpKG5vZGUsIGdsb2JhbHMpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdzdHJvbmcnOlxuICAgIGNhc2UgJ2InOlxuICAgICAgdHh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24uc3Ryb25nJykobm9kZSwgZ2xvYmFscyk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2RlbCc6XG4gICAgICB0eHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5zdHJpa2V0aHJvdWdoJykobm9kZSwgZ2xvYmFscyk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2EnOlxuICAgICAgdHh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24ubGlua3MnKShub2RlLCBnbG9iYWxzKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnaW1nJzpcbiAgICAgIHR4dCA9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLmltYWdlJykobm9kZSwgZ2xvYmFscyk7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICB0eHQgPSBub2RlLm91dGVySFRNTCArICdcXG5cXG4nO1xuICB9XG5cbiAgLy8gY29tbW9uIG5vcm1hbGl6YXRpb25cbiAgLy8gVE9ETyBldmVudHVhbGx5XG5cbiAgcmV0dXJuIHR4dDtcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLnBhcmFncmFwaCcsIGZ1bmN0aW9uIChub2RlLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgdHh0ID0gJyc7XG4gIGlmIChub2RlLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGROb2RlcyxcbiAgICAgICAgY2hpbGRyZW5MZW5ndGggPSBjaGlsZHJlbi5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgKytpKSB7XG4gICAgICB0eHQgKz0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24ubm9kZScpKGNoaWxkcmVuW2ldLCBnbG9iYWxzKTtcbiAgICB9XG4gIH1cblxuICAvLyBzb21lIHRleHQgbm9ybWFsaXphdGlvblxuICB0eHQgPSB0eHQudHJpbSgpO1xuXG4gIHJldHVybiB0eHQ7XG59KTtcblxyXG5zaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5wcmUnLCBmdW5jdGlvbiAobm9kZSwgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG51bSAgPSBub2RlLmdldEF0dHJpYnV0ZSgncHJlbnVtJyk7XG4gIHJldHVybiAnPHByZT4nICsgZ2xvYmFscy5wcmVMaXN0W251bV0gKyAnPC9wcmU+Jztcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLnN0cmlrZXRocm91Z2gnLCBmdW5jdGlvbiAobm9kZSwgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHR4dCA9ICcnO1xuICBpZiAobm9kZS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICB0eHQgKz0gJ35+JztcbiAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkTm9kZXMsXG4gICAgICAgIGNoaWxkcmVuTGVuZ3RoID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7ICsraSkge1xuICAgICAgdHh0ICs9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLm5vZGUnKShjaGlsZHJlbltpXSwgZ2xvYmFscyk7XG4gICAgfVxuICAgIHR4dCArPSAnfn4nO1xuICB9XG4gIHJldHVybiB0eHQ7XG59KTtcblxyXG5zaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5zdHJvbmcnLCBmdW5jdGlvbiAobm9kZSwgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHR4dCA9ICcnO1xuICBpZiAobm9kZS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICB0eHQgKz0gJyoqJztcbiAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkTm9kZXMsXG4gICAgICAgIGNoaWxkcmVuTGVuZ3RoID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7ICsraSkge1xuICAgICAgdHh0ICs9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLm5vZGUnKShjaGlsZHJlbltpXSwgZ2xvYmFscyk7XG4gICAgfVxuICAgIHR4dCArPSAnKionO1xuICB9XG4gIHJldHVybiB0eHQ7XG59KTtcblxyXG5zaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi50YWJsZScsIGZ1bmN0aW9uIChub2RlLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgdHh0ID0gJycsXG4gICAgICB0YWJsZUFycmF5ID0gW1tdLCBbXV0sXG4gICAgICBoZWFkaW5ncyAgID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKCd0aGVhZD50cj50aCcpLFxuICAgICAgcm93cyAgICAgICA9IG5vZGUucXVlcnlTZWxlY3RvckFsbCgndGJvZHk+dHInKSxcbiAgICAgIGksIGlpO1xuICBmb3IgKGkgPSAwOyBpIDwgaGVhZGluZ3MubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgaGVhZENvbnRlbnQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi50YWJsZUNlbGwnKShoZWFkaW5nc1tpXSwgZ2xvYmFscyksXG4gICAgICAgIGFsbGlnbiA9ICctLS0nO1xuXG4gICAgaWYgKGhlYWRpbmdzW2ldLmhhc0F0dHJpYnV0ZSgnc3R5bGUnKSkge1xuICAgICAgdmFyIHN0eWxlID0gaGVhZGluZ3NbaV0uZ2V0QXR0cmlidXRlKCdzdHlsZScpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICAgIHN3aXRjaCAoc3R5bGUpIHtcbiAgICAgICAgY2FzZSAndGV4dC1hbGlnbjpsZWZ0Oyc6XG4gICAgICAgICAgYWxsaWduID0gJzotLS0nO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0ZXh0LWFsaWduOnJpZ2h0Oyc6XG4gICAgICAgICAgYWxsaWduID0gJy0tLTonO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0ZXh0LWFsaWduOmNlbnRlcjsnOlxuICAgICAgICAgIGFsbGlnbiA9ICc6LS0tOic7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHRhYmxlQXJyYXlbMF1baV0gPSBoZWFkQ29udGVudC50cmltKCk7XG4gICAgdGFibGVBcnJheVsxXVtpXSA9IGFsbGlnbjtcbiAgfVxuXG4gIGZvciAoaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHIgPSB0YWJsZUFycmF5LnB1c2goW10pIC0gMSxcbiAgICAgICAgY29scyA9IHJvd3NbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RkJyk7XG5cbiAgICBmb3IgKGlpID0gMDsgaWkgPCBoZWFkaW5ncy5sZW5ndGg7ICsraWkpIHtcbiAgICAgIHZhciBjZWxsQ29udGVudCA9ICcgJztcbiAgICAgIGlmICh0eXBlb2YgY29sc1tpaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNlbGxDb250ZW50ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24udGFibGVDZWxsJykoY29sc1tpaV0sIGdsb2JhbHMpO1xuICAgICAgfVxuICAgICAgdGFibGVBcnJheVtyXS5wdXNoKGNlbGxDb250ZW50KTtcbiAgICB9XG4gIH1cblxuICB2YXIgY2VsbFNwYWNlc0NvdW50ID0gMztcbiAgZm9yIChpID0gMDsgaSA8IHRhYmxlQXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICBmb3IgKGlpID0gMDsgaWkgPCB0YWJsZUFycmF5W2ldLmxlbmd0aDsgKytpaSkge1xuICAgICAgdmFyIHN0ckxlbiA9IHRhYmxlQXJyYXlbaV1baWldLmxlbmd0aDtcbiAgICAgIGlmIChzdHJMZW4gPiBjZWxsU3BhY2VzQ291bnQpIHtcbiAgICAgICAgY2VsbFNwYWNlc0NvdW50ID0gc3RyTGVuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAoaSA9IDA7IGkgPCB0YWJsZUFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgZm9yIChpaSA9IDA7IGlpIDwgdGFibGVBcnJheVtpXS5sZW5ndGg7ICsraWkpIHtcbiAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgIGlmICh0YWJsZUFycmF5W2ldW2lpXS5zbGljZSgtMSkgPT09ICc6Jykge1xuICAgICAgICAgIHRhYmxlQXJyYXlbaV1baWldID0gc2hvd2Rvd24uaGVscGVyLnBhZEVuZCh0YWJsZUFycmF5W2ldW2lpXS5zbGljZSgtMSksIGNlbGxTcGFjZXNDb3VudCAtIDEsICctJykgKyAnOic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFibGVBcnJheVtpXVtpaV0gPSBzaG93ZG93bi5oZWxwZXIucGFkRW5kKHRhYmxlQXJyYXlbaV1baWldLCBjZWxsU3BhY2VzQ291bnQsICctJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhYmxlQXJyYXlbaV1baWldID0gc2hvd2Rvd24uaGVscGVyLnBhZEVuZCh0YWJsZUFycmF5W2ldW2lpXSwgY2VsbFNwYWNlc0NvdW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdHh0ICs9ICd8ICcgKyB0YWJsZUFycmF5W2ldLmpvaW4oJyB8ICcpICsgJyB8XFxuJztcbiAgfVxuXG4gIHJldHVybiB0eHQudHJpbSgpO1xufSk7XG5cclxuc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24udGFibGVDZWxsJywgZnVuY3Rpb24gKG5vZGUsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0eHQgPSAnJztcbiAgaWYgKCFub2RlLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkTm9kZXMsXG4gICAgICBjaGlsZHJlbkxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyArK2kpIHtcbiAgICB0eHQgKz0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24ubm9kZScpKGNoaWxkcmVuW2ldLCBnbG9iYWxzLCB0cnVlKTtcbiAgfVxuICByZXR1cm4gdHh0LnRyaW0oKTtcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLnR4dCcsIGZ1bmN0aW9uIChub2RlKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgdHh0ID0gbm9kZS5ub2RlVmFsdWU7XG5cbiAgLy8gbXVsdGlwbGUgc3BhY2VzIGFyZSBjb2xsYXBzZWRcbiAgdHh0ID0gdHh0LnJlcGxhY2UoLyArL2csICcgJyk7XG5cbiAgLy8gcmVwbGFjZSB0aGUgY3VzdG9tIMKoTkJTUDsgd2l0aCBhIHNwYWNlXG4gIHR4dCA9IHR4dC5yZXBsYWNlKC/CqE5CU1A7L2csICcgJyk7XG5cbiAgLy8gXCIsIDwsID4gYW5kICYgc2hvdWxkIHJlcGxhY2UgZXNjYXBlZCBodG1sIGVudGl0aWVzXG4gIHR4dCA9IHNob3dkb3duLmhlbHBlci51bmVzY2FwZUhUTUxFbnRpdGllcyh0eHQpO1xuXG4gIC8vIGVzY2FwZSBtYXJrZG93biBtYWdpYyBjaGFyYWN0ZXJzXG4gIC8vIGVtcGhhc2lzLCBzdHJvbmcgYW5kIHN0cmlrZXRocm91Z2ggLSBjYW4gYXBwZWFyIGV2ZXJ5d2hlcmVcbiAgLy8gd2UgYWxzbyBlc2NhcGUgcGlwZSAofCkgYmVjYXVzZSBvZiB0YWJsZXNcbiAgLy8gYW5kIGVzY2FwZSBgIGJlY2F1c2Ugb2YgY29kZSBibG9ja3MgYW5kIHNwYW5zXG4gIHR4dCA9IHR4dC5yZXBsYWNlKC8oWypffnxgXSkvZywgJ1xcXFwkMScpO1xuXG4gIC8vIGVzY2FwZSA+IGJlY2F1c2Ugb2YgYmxvY2txdW90ZXNcbiAgdHh0ID0gdHh0LnJlcGxhY2UoL14oXFxzKik+L2csICdcXFxcJDE+Jyk7XG5cbiAgLy8gaGFzaCBjaGFyYWN0ZXIsIG9ubHkgdHJvdWJsZXNvbWUgYXQgdGhlIGJlZ2lubmluZyBvZiBhIGxpbmUgYmVjYXVzZSBvZiBoZWFkZXJzXG4gIHR4dCA9IHR4dC5yZXBsYWNlKC9eIy9nbSwgJ1xcXFwjJyk7XG5cbiAgLy8gaG9yaXpvbnRhbCBydWxlc1xuICB0eHQgPSB0eHQucmVwbGFjZSgvXihcXHMqKShbLT1dezMsfSkoXFxzKikkLywgJyQxXFxcXCQyJDMnKTtcblxuICAvLyBkb3QsIGJlY2F1c2Ugb2Ygb3JkZXJlZCBsaXN0cywgb25seSB0cm91Ymxlc29tZSBhdCB0aGUgYmVnaW5uaW5nIG9mIGEgbGluZSB3aGVuIHByZWNlZGVkIGJ5IGFuIGludGVnZXJcbiAgdHh0ID0gdHh0LnJlcGxhY2UoL14oIHswLDN9XFxkKylcXC4vZ20sICckMVxcXFwuJyk7XG5cbiAgLy8gKywgKiBhbmQgLSwgYXQgdGhlIGJlZ2lubmluZyBvZiBhIGxpbmUgYmVjb21lcyBhIGxpc3QsIHNvIHdlIG5lZWQgdG8gZXNjYXBlIHRoZW0gYWxzbyAoYXN0ZXJpc2sgd2FzIGFscmVhZHkgZXNjYXBlZClcbiAgdHh0ID0gdHh0LnJlcGxhY2UoL14oIHswLDN9KShbKy1dKS9nbSwgJyQxXFxcXCQyJyk7XG5cbiAgLy8gaW1hZ2VzIGFuZCBsaW5rcywgXSBmb2xsb3dlZCBieSAoIGlzIHByb2JsZW1hdGljLCBzbyB3ZSBlc2NhcGUgaXRcbiAgdHh0ID0gdHh0LnJlcGxhY2UoL10oW1xcc10qKVxcKC9nLCAnXFxcXF0kMVxcXFwoJyk7XG5cbiAgLy8gcmVmZXJlbmNlIFVSSXMgbXVzdCBhbHNvIGJlIGVzY2FwZWRcbiAgdHh0ID0gdHh0LnJlcGxhY2UoL14gezAsM31cXFsoW1xcUyBcXHRdKj8pXTovZ20sICdcXFxcWyQxXTonKTtcblxuICByZXR1cm4gdHh0O1xufSk7XG5cclxudmFyIHJvb3QgPSB0aGlzO1xuXG4vLyBBTUQgTG9hZGVyXG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHJldHVybiBzaG93ZG93bjtcbiAgfSk7XG5cbi8vIENvbW1vbkpTL25vZGVKUyBMb2FkZXJcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBzaG93ZG93bjtcblxuLy8gUmVndWxhciBCcm93c2VyIGxvYWRlclxufSBlbHNlIHtcbiAgcm9vdC5zaG93ZG93biA9IHNob3dkb3duO1xufVxufSkuY2FsbCh0aGlzKTtcclxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaG93ZG93bi5qcy5tYXBcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==