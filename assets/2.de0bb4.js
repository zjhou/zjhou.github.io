(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "9tPo":
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "I1BE":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


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


/***/ }),

/***/ "aET+":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__("9tPo");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2hvd2Rvd24vZGlzdC9zaG93ZG93bi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVcsRUFBRTtBQUNyRCx3Q0FBd0MsV0FBVyxFQUFFOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHNDQUFzQztBQUN0QyxHQUFHO0FBQ0g7QUFDQSw4REFBOEQ7QUFDOUQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOzs7Ozs7OztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGdCQUFnQjtBQUNuRCxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0JBQW9CO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxjQUFjOztBQUVsRTtBQUNBOzs7Ozs7OztBQzNFQSxtQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFtQixJQUFJO0FBQ2xILHlFQUF5RSxrREFBa0QsSUFBSSxtQkFBbUIsSUFBSTtBQUN0SjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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OztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDs7QUFFQSw2QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBIiwiZmlsZSI6IjIuZGUwYmI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC98XFxzKiQpL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG4iLCI7LyohIHNob3dkb3duIHYgMS45LjAgLSAxMC0xMS0yMDE4ICovXHJcbihmdW5jdGlvbigpe1xyXG4vKipcbiAqIENyZWF0ZWQgYnkgVGl2aWUgb24gMTMtMDctMjAxNS5cbiAqL1xuXG5mdW5jdGlvbiBnZXREZWZhdWx0T3B0cyAoc2ltcGxlKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgb21pdEV4dHJhV0xJbkNvZGVCbG9ja3M6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmliZTogJ09taXQgdGhlIGRlZmF1bHQgZXh0cmEgd2hpdGVsaW5lIGFkZGVkIHRvIGNvZGUgYmxvY2tzJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgbm9IZWFkZXJJZDoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaWJlOiAnVHVybiBvbi9vZmYgZ2VuZXJhdGVkIGhlYWRlciBpZCcsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIHByZWZpeEhlYWRlcklkOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpYmU6ICdBZGQgYSBwcmVmaXggdG8gdGhlIGdlbmVyYXRlZCBoZWFkZXIgaWRzLiBQYXNzaW5nIGEgc3RyaW5nIHdpbGwgcHJlZml4IHRoYXQgc3RyaW5nIHRvIHRoZSBoZWFkZXIgaWQuIFNldHRpbmcgdG8gdHJ1ZSB3aWxsIGFkZCBhIGdlbmVyaWMgXFwnc2VjdGlvbi1cXCcgcHJlZml4JyxcbiAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSxcbiAgICByYXdQcmVmaXhIZWFkZXJJZDoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaWJlOiAnU2V0dGluZyB0aGlzIG9wdGlvbiB0byB0cnVlIHdpbGwgcHJldmVudCBzaG93ZG93biBmcm9tIG1vZGlmeWluZyB0aGUgcHJlZml4LiBUaGlzIG1pZ2h0IHJlc3VsdCBpbiBtYWxmb3JtZWQgSURzIChpZiwgZm9yIGluc3RhbmNlLCB0aGUgXCIgY2hhciBpcyB1c2VkIGluIHRoZSBwcmVmaXgpJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgZ2hDb21wYXRpYmxlSGVhZGVySWQ6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmliZTogJ0dlbmVyYXRlIGhlYWRlciBpZHMgY29tcGF0aWJsZSB3aXRoIGdpdGh1YiBzdHlsZSAoc3BhY2VzIGFyZSByZXBsYWNlZCB3aXRoIGRhc2hlcywgYSBidW5jaCBvZiBub24gYWxwaGFudW1lcmljIGNoYXJzIGFyZSByZW1vdmVkKScsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIHJhd0hlYWRlcklkOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpYmU6ICdSZW1vdmUgb25seSBzcGFjZXMsIFxcJyBhbmQgXCIgZnJvbSBnZW5lcmF0ZWQgaGVhZGVyIGlkcyAoaW5jbHVkaW5nIHByZWZpeGVzKSwgcmVwbGFjaW5nIHRoZW0gd2l0aCBkYXNoZXMgKC0pLiBXQVJOSU5HOiBUaGlzIG1pZ2h0IHJlc3VsdCBpbiBtYWxmb3JtZWQgaWRzJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgaGVhZGVyTGV2ZWxTdGFydDoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaWJlOiAnVGhlIGhlYWRlciBibG9ja3MgbGV2ZWwgc3RhcnQnLFxuICAgICAgdHlwZTogJ2ludGVnZXInXG4gICAgfSxcbiAgICBwYXJzZUltZ0RpbWVuc2lvbnM6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmliZTogJ1R1cm4gb24vb2ZmIGltYWdlIGRpbWVuc2lvbiBwYXJzaW5nJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgc2ltcGxpZmllZEF1dG9MaW5rOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpYmU6ICdUdXJuIG9uL29mZiBHRk0gYXV0b2xpbmsgc3R5bGUnLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICBleGNsdWRlVHJhaWxpbmdQdW5jdHVhdGlvbkZyb21VUkxzOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpYmU6ICdFeGNsdWRlcyB0cmFpbGluZyBwdW5jdHVhdGlvbiBmcm9tIGxpbmtzIGdlbmVyYXRlZCB3aXRoIGF1dG9MaW5raW5nJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgbGl0ZXJhbE1pZFdvcmRVbmRlcnNjb3Jlczoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaWJlOiAnUGFyc2UgbWlkd29yZCB1bmRlcnNjb3JlcyBhcyBsaXRlcmFsIHVuZGVyc2NvcmVzJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgbGl0ZXJhbE1pZFdvcmRBc3Rlcmlza3M6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmliZTogJ1BhcnNlIG1pZHdvcmQgYXN0ZXJpc2tzIGFzIGxpdGVyYWwgYXN0ZXJpc2tzJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgc3RyaWtldGhyb3VnaDoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaWJlOiAnVHVybiBvbi9vZmYgc3RyaWtldGhyb3VnaCBzdXBwb3J0JyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgdGFibGVzOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpYmU6ICdUdXJuIG9uL29mZiB0YWJsZXMgc3VwcG9ydCcsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIHRhYmxlc0hlYWRlcklkOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpYmU6ICdBZGQgYW4gaWQgdG8gdGFibGUgaGVhZGVycycsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIGdoQ29kZUJsb2Nrczoge1xuICAgICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgICAgZGVzY3JpYmU6ICdUdXJuIG9uL29mZiBHRk0gZmVuY2VkIGNvZGUgYmxvY2tzIHN1cHBvcnQnLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICB0YXNrbGlzdHM6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmliZTogJ1R1cm4gb24vb2ZmIEdGTSB0YXNrbGlzdCBzdXBwb3J0JyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgc21vb3RoTGl2ZVByZXZpZXc6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmliZTogJ1ByZXZlbnRzIHdlaXJkIGVmZmVjdHMgaW4gbGl2ZSBwcmV2aWV3cyBkdWUgdG8gaW5jb21wbGV0ZSBpbnB1dCcsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIHNtYXJ0SW5kZW50YXRpb25GaXg6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmlwdGlvbjogJ1RyaWVzIHRvIHNtYXJ0bHkgZml4IGluZGVudGF0aW9uIGluIGVzNiBzdHJpbmdzJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgZGlzYWJsZUZvcmNlZDRTcGFjZXNJbmRlbnRlZFN1Ymxpc3RzOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpcHRpb246ICdEaXNhYmxlcyB0aGUgcmVxdWlyZW1lbnQgb2YgaW5kZW50aW5nIG5lc3RlZCBzdWJsaXN0cyBieSA0IHNwYWNlcycsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIHNpbXBsZUxpbmVCcmVha3M6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmlwdGlvbjogJ1BhcnNlcyBzaW1wbGUgbGluZSBicmVha3MgYXMgPGJyPiAoR0ZNIFN0eWxlKScsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIHJlcXVpcmVTcGFjZUJlZm9yZUhlYWRpbmdUZXh0OiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpcHRpb246ICdNYWtlcyBhZGRpbmcgYSBzcGFjZSBiZXR3ZWVuIGAjYCBhbmQgdGhlIGhlYWRlciB0ZXh0IG1hbmRhdG9yeSAoR0ZNIFN0eWxlKScsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIGdoTWVudGlvbnM6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmlwdGlvbjogJ0VuYWJsZXMgZ2l0aHViIEBtZW50aW9ucycsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIGdoTWVudGlvbnNMaW5rOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6ICdodHRwczovL2dpdGh1Yi5jb20ve3V9JyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ2hhbmdlcyB0aGUgbGluayBnZW5lcmF0ZWQgYnkgQG1lbnRpb25zLiBPbmx5IGFwcGxpZXMgaWYgZ2hNZW50aW9ucyBvcHRpb24gaXMgZW5hYmxlZC4nLFxuICAgICAgdHlwZTogJ3N0cmluZydcbiAgICB9LFxuICAgIGVuY29kZUVtYWlsczoge1xuICAgICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgICAgZGVzY3JpcHRpb246ICdFbmNvZGUgZS1tYWlsIGFkZHJlc3NlcyB0aHJvdWdoIHRoZSB1c2Ugb2YgQ2hhcmFjdGVyIEVudGl0aWVzLCB0cmFuc2Zvcm1pbmcgQVNDSUkgZS1tYWlsIGFkZHJlc3NlcyBpbnRvIGl0cyBlcXVpdmFsZW50IGRlY2ltYWwgZW50aXRpZXMnLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICBvcGVuTGlua3NJbk5ld1dpbmRvdzoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnT3BlbiBhbGwgbGlua3MgaW4gbmV3IHdpbmRvd3MnLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICBiYWNrc2xhc2hFc2NhcGVzSFRNTFRhZ3M6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmlwdGlvbjogJ1N1cHBvcnQgZm9yIEhUTUwgVGFnIGVzY2FwaW5nLiBleDogXFw8ZGl2PmZvb1xcPC9kaXY+JyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgZW1vamk6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmlwdGlvbjogJ0VuYWJsZSBlbW9qaSBzdXBwb3J0LiBFeDogYHRoaXMgaXMgYSA6c21pbGU6IGVtb2ppYCcsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIHVuZGVybGluZToge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnRW5hYmxlIHN1cHBvcnQgZm9yIHVuZGVybGluZS4gU3ludGF4IGlzIGRvdWJsZSBvciB0cmlwbGUgdW5kZXJzY29yZXM6IGBfX3VuZGVybGluZSB3b3JkX19gLiBXaXRoIHRoaXMgb3B0aW9uIGVuYWJsZWQsIHVuZGVyc2NvcmVzIG5vIGxvbmdlciBwYXJzZXMgaW50byBgPGVtPmAgYW5kIGA8c3Ryb25nPmAnLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICBjb21wbGV0ZUhUTUxEb2N1bWVudDoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnT3V0cHV0cyBhIGNvbXBsZXRlIGh0bWwgZG9jdW1lbnQsIGluY2x1ZGluZyBgPGh0bWw+YCwgYDxoZWFkPmAgYW5kIGA8Ym9keT5gIHRhZ3MnLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICBtZXRhZGF0YToge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnRW5hYmxlIHN1cHBvcnQgZm9yIGRvY3VtZW50IG1ldGFkYXRhIChkZWZpbmVkIGF0IHRoZSB0b3Agb2YgdGhlIGRvY3VtZW50IGJldHdlZW4gYMKrwqvCq2AgYW5kIGDCu8K7wrtgIG9yIGJldHdlZW4gYC0tLWAgYW5kIGAtLS1gKS4nLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICBzcGxpdEFkamFjZW50QmxvY2txdW90ZXM6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmlwdGlvbjogJ1NwbGl0IGFkamFjZW50IGJsb2NrcXVvdGUgYmxvY2tzJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH1cbiAgfTtcbiAgaWYgKHNpbXBsZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkZWZhdWx0T3B0aW9ucykpO1xuICB9XG4gIHZhciByZXQgPSB7fTtcbiAgZm9yICh2YXIgb3B0IGluIGRlZmF1bHRPcHRpb25zKSB7XG4gICAgaWYgKGRlZmF1bHRPcHRpb25zLmhhc093blByb3BlcnR5KG9wdCkpIHtcbiAgICAgIHJldFtvcHRdID0gZGVmYXVsdE9wdGlvbnNbb3B0XS5kZWZhdWx0VmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIGFsbE9wdGlvbnNPbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG9wdGlvbnMgPSBnZXREZWZhdWx0T3B0cyh0cnVlKSxcbiAgICAgIHJldCA9IHt9O1xuICBmb3IgKHZhciBvcHQgaW4gb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KG9wdCkpIHtcbiAgICAgIHJldFtvcHRdID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxyXG4vKipcbiAqIENyZWF0ZWQgYnkgVGl2aWUgb24gMDYtMDEtMjAxNS5cbiAqL1xuXG4vLyBQcml2YXRlIHByb3BlcnRpZXNcbnZhciBzaG93ZG93biA9IHt9LFxuICAgIHBhcnNlcnMgPSB7fSxcbiAgICBleHRlbnNpb25zID0ge30sXG4gICAgZ2xvYmFsT3B0aW9ucyA9IGdldERlZmF1bHRPcHRzKHRydWUpLFxuICAgIHNldEZsYXZvciA9ICd2YW5pbGxhJyxcbiAgICBmbGF2b3IgPSB7XG4gICAgICBnaXRodWI6IHtcbiAgICAgICAgb21pdEV4dHJhV0xJbkNvZGVCbG9ja3M6ICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICBzaW1wbGlmaWVkQXV0b0xpbms6ICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgIGV4Y2x1ZGVUcmFpbGluZ1B1bmN0dWF0aW9uRnJvbVVSTHM6ICAgdHJ1ZSxcbiAgICAgICAgbGl0ZXJhbE1pZFdvcmRVbmRlcnNjb3JlczogICAgICAgICAgICB0cnVlLFxuICAgICAgICBzdHJpa2V0aHJvdWdoOiAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgIHRhYmxlczogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgdGFibGVzSGVhZGVySWQ6ICAgICAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICBnaENvZGVCbG9ja3M6ICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgIHRhc2tsaXN0czogICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgZGlzYWJsZUZvcmNlZDRTcGFjZXNJbmRlbnRlZFN1Ymxpc3RzOiB0cnVlLFxuICAgICAgICBzaW1wbGVMaW5lQnJlYWtzOiAgICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgIHJlcXVpcmVTcGFjZUJlZm9yZUhlYWRpbmdUZXh0OiAgICAgICAgdHJ1ZSxcbiAgICAgICAgZ2hDb21wYXRpYmxlSGVhZGVySWQ6ICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICBnaE1lbnRpb25zOiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgIGJhY2tzbGFzaEVzY2FwZXNIVE1MVGFnczogICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgZW1vamk6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICBzcGxpdEFkamFjZW50QmxvY2txdW90ZXM6ICAgICAgICAgICAgIHRydWVcbiAgICAgIH0sXG4gICAgICBvcmlnaW5hbDoge1xuICAgICAgICBub0hlYWRlcklkOiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgIGdoQ29kZUJsb2NrczogICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgIH0sXG4gICAgICBnaG9zdDoge1xuICAgICAgICBvbWl0RXh0cmFXTEluQ29kZUJsb2NrczogICAgICAgICAgICAgIHRydWUsXG4gICAgICAgIHBhcnNlSW1nRGltZW5zaW9uczogICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgc2ltcGxpZmllZEF1dG9MaW5rOiAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICBleGNsdWRlVHJhaWxpbmdQdW5jdHVhdGlvbkZyb21VUkxzOiAgIHRydWUsXG4gICAgICAgIGxpdGVyYWxNaWRXb3JkVW5kZXJzY29yZXM6ICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgc3RyaWtldGhyb3VnaDogICAgICAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICB0YWJsZXM6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgIHRhYmxlc0hlYWRlcklkOiAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgZ2hDb2RlQmxvY2tzOiAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICB0YXNrbGlzdHM6ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgIHNtb290aExpdmVQcmV2aWV3OiAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgc2ltcGxlTGluZUJyZWFrczogICAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICByZXF1aXJlU3BhY2VCZWZvcmVIZWFkaW5nVGV4dDogICAgICAgIHRydWUsXG4gICAgICAgIGdoTWVudGlvbnM6ICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgIGVuY29kZUVtYWlsczogICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgfSxcbiAgICAgIHZhbmlsbGE6IGdldERlZmF1bHRPcHRzKHRydWUpLFxuICAgICAgYWxsT246IGFsbE9wdGlvbnNPbigpXG4gICAgfTtcblxuLyoqXG4gKiBoZWxwZXIgbmFtZXNwYWNlXG4gKiBAdHlwZSB7e319XG4gKi9cbnNob3dkb3duLmhlbHBlciA9IHt9O1xuXG4vKipcbiAqIFRPRE8gTEVHQUNZIFNVUFBPUlQgQ09ERVxuICogQHR5cGUge3t9fVxuICovXG5zaG93ZG93bi5leHRlbnNpb25zID0ge307XG5cbi8qKlxuICogU2V0IGEgZ2xvYmFsIG9wdGlvblxuICogQHN0YXRpY1xuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybnMge3Nob3dkb3dufVxuICovXG5zaG93ZG93bi5zZXRPcHRpb24gPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAndXNlIHN0cmljdCc7XG4gIGdsb2JhbE9wdGlvbnNba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogR2V0IGEgZ2xvYmFsIG9wdGlvblxuICogQHN0YXRpY1xuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICogQHJldHVybnMgeyp9XG4gKi9cbnNob3dkb3duLmdldE9wdGlvbiA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICByZXR1cm4gZ2xvYmFsT3B0aW9uc1trZXldO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIGdsb2JhbCBvcHRpb25zXG4gKiBAc3RhdGljXG4gKiBAcmV0dXJucyB7e319XG4gKi9cbnNob3dkb3duLmdldE9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgcmV0dXJuIGdsb2JhbE9wdGlvbnM7XG59O1xuXG4vKipcbiAqIFJlc2V0IGdsb2JhbCBvcHRpb25zIHRvIHRoZSBkZWZhdWx0IHZhbHVlc1xuICogQHN0YXRpY1xuICovXG5zaG93ZG93bi5yZXNldE9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgZ2xvYmFsT3B0aW9ucyA9IGdldERlZmF1bHRPcHRzKHRydWUpO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGZsYXZvciBzaG93ZG93biBzaG91bGQgdXNlIGFzIGRlZmF1bHRcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKi9cbnNob3dkb3duLnNldEZsYXZvciA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgaWYgKCFmbGF2b3IuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICB0aHJvdyBFcnJvcihuYW1lICsgJyBmbGF2b3Igd2FzIG5vdCBmb3VuZCcpO1xuICB9XG4gIHNob3dkb3duLnJlc2V0T3B0aW9ucygpO1xuICB2YXIgcHJlc2V0ID0gZmxhdm9yW25hbWVdO1xuICBzZXRGbGF2b3IgPSBuYW1lO1xuICBmb3IgKHZhciBvcHRpb24gaW4gcHJlc2V0KSB7XG4gICAgaWYgKHByZXNldC5oYXNPd25Qcm9wZXJ0eShvcHRpb24pKSB7XG4gICAgICBnbG9iYWxPcHRpb25zW29wdGlvbl0gPSBwcmVzZXRbb3B0aW9uXTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogR2V0IHRoZSBjdXJyZW50bHkgc2V0IGZsYXZvclxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuc2hvd2Rvd24uZ2V0Rmxhdm9yID0gZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHJldHVybiBzZXRGbGF2b3I7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgb3B0aW9ucyBvZiBhIHNwZWNpZmllZCBmbGF2b3IuIFJldHVybnMgdW5kZWZpbmVkIGlmIHRoZSBmbGF2b3Igd2FzIG5vdCBmb3VuZFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgZmxhdm9yXG4gKiBAcmV0dXJucyB7e318dW5kZWZpbmVkfVxuICovXG5zaG93ZG93bi5nZXRGbGF2b3JPcHRpb25zID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBpZiAoZmxhdm9yLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgcmV0dXJuIGZsYXZvcltuYW1lXTtcbiAgfVxufTtcblxuLyoqXG4gKiBHZXQgdGhlIGRlZmF1bHQgb3B0aW9uc1xuICogQHN0YXRpY1xuICogQHBhcmFtIHtib29sZWFufSBbc2ltcGxlPXRydWVdXG4gKiBAcmV0dXJucyB7e319XG4gKi9cbnNob3dkb3duLmdldERlZmF1bHRPcHRpb25zID0gZnVuY3Rpb24gKHNpbXBsZSkge1xuICAndXNlIHN0cmljdCc7XG4gIHJldHVybiBnZXREZWZhdWx0T3B0cyhzaW1wbGUpO1xufTtcblxuLyoqXG4gKiBHZXQgb3Igc2V0IGEgc3ViUGFyc2VyXG4gKlxuICogc3ViUGFyc2VyKG5hbWUpICAgICAgIC0gR2V0IGEgcmVnaXN0ZXJlZCBzdWJQYXJzZXJcbiAqIHN1YlBhcnNlcihuYW1lLCBmdW5jKSAtIFJlZ2lzdGVyIGEgc3ViUGFyc2VyXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gW2Z1bmNdXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyID0gZnVuY3Rpb24gKG5hbWUsIGZ1bmMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBpZiAoc2hvd2Rvd24uaGVscGVyLmlzU3RyaW5nKG5hbWUpKSB7XG4gICAgaWYgKHR5cGVvZiBmdW5jICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcGFyc2Vyc1tuYW1lXSA9IGZ1bmM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwYXJzZXJzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHJldHVybiBwYXJzZXJzW25hbWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1N1YlBhcnNlciBuYW1lZCAnICsgbmFtZSArICcgbm90IHJlZ2lzdGVyZWQhJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEdldHMgb3IgcmVnaXN0ZXJzIGFuIGV4dGVuc2lvblxuICogQHN0YXRpY1xuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9uPX0gZXh0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuc2hvd2Rvd24uZXh0ZW5zaW9uID0gZnVuY3Rpb24gKG5hbWUsIGV4dCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKCFzaG93ZG93bi5oZWxwZXIuaXNTdHJpbmcobmFtZSkpIHtcbiAgICB0aHJvdyBFcnJvcignRXh0ZW5zaW9uIFxcJ25hbWVcXCcgbXVzdCBiZSBhIHN0cmluZycpO1xuICB9XG5cbiAgbmFtZSA9IHNob3dkb3duLmhlbHBlci5zdGRFeHROYW1lKG5hbWUpO1xuXG4gIC8vIEdldHRlclxuICBpZiAoc2hvd2Rvd24uaGVscGVyLmlzVW5kZWZpbmVkKGV4dCkpIHtcbiAgICBpZiAoIWV4dGVuc2lvbnMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIHRocm93IEVycm9yKCdFeHRlbnNpb24gbmFtZWQgJyArIG5hbWUgKyAnIGlzIG5vdCByZWdpc3RlcmVkIScpO1xuICAgIH1cbiAgICByZXR1cm4gZXh0ZW5zaW9uc1tuYW1lXTtcblxuICAgIC8vIFNldHRlclxuICB9IGVsc2Uge1xuICAgIC8vIEV4cGFuZCBleHRlbnNpb24gaWYgaXQncyB3cmFwcGVkIGluIGEgZnVuY3Rpb25cbiAgICBpZiAodHlwZW9mIGV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXh0ID0gZXh0KCk7XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIGV4dGVuc2lvbiBpcyBhbiBhcnJheVxuICAgIGlmICghc2hvd2Rvd24uaGVscGVyLmlzQXJyYXkoZXh0KSkge1xuICAgICAgZXh0ID0gW2V4dF07XG4gICAgfVxuXG4gICAgdmFyIHZhbGlkRXh0ZW5zaW9uID0gdmFsaWRhdGUoZXh0LCBuYW1lKTtcblxuICAgIGlmICh2YWxpZEV4dGVuc2lvbi52YWxpZCkge1xuICAgICAgZXh0ZW5zaW9uc1tuYW1lXSA9IGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IodmFsaWRFeHRlbnNpb24uZXJyb3IpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBHZXRzIGFsbCBleHRlbnNpb25zIHJlZ2lzdGVyZWRcbiAqIEByZXR1cm5zIHt7fX1cbiAqL1xuc2hvd2Rvd24uZ2V0QWxsRXh0ZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICByZXR1cm4gZXh0ZW5zaW9ucztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGV4dGVuc2lvblxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqL1xuc2hvd2Rvd24ucmVtb3ZlRXh0ZW5zaW9uID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBkZWxldGUgZXh0ZW5zaW9uc1tuYW1lXTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwgZXh0ZW5zaW9uc1xuICovXG5zaG93ZG93bi5yZXNldEV4dGVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgZXh0ZW5zaW9ucyA9IHt9O1xufTtcblxuLyoqXG4gKiBWYWxpZGF0ZSBleHRlbnNpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGV4dGVuc2lvblxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEByZXR1cm5zIHt7dmFsaWQ6IGJvb2xlYW4sIGVycm9yOiBzdHJpbmd9fVxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZSAoZXh0ZW5zaW9uLCBuYW1lKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgZXJyTXNnID0gKG5hbWUpID8gJ0Vycm9yIGluICcgKyBuYW1lICsgJyBleHRlbnNpb24tPicgOiAnRXJyb3IgaW4gdW5uYW1lZCBleHRlbnNpb24nLFxuICAgICAgcmV0ID0ge1xuICAgICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgICAgZXJyb3I6ICcnXG4gICAgICB9O1xuXG4gIGlmICghc2hvd2Rvd24uaGVscGVyLmlzQXJyYXkoZXh0ZW5zaW9uKSkge1xuICAgIGV4dGVuc2lvbiA9IFtleHRlbnNpb25dO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHRlbnNpb24ubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYmFzZU1zZyA9IGVyck1zZyArICcgc3ViLWV4dGVuc2lvbiAnICsgaSArICc6ICcsXG4gICAgICAgIGV4dCA9IGV4dGVuc2lvbltpXTtcbiAgICBpZiAodHlwZW9mIGV4dCAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldC52YWxpZCA9IGZhbHNlO1xuICAgICAgcmV0LmVycm9yID0gYmFzZU1zZyArICdtdXN0IGJlIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgZXh0ICsgJyBnaXZlbic7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIGlmICghc2hvd2Rvd24uaGVscGVyLmlzU3RyaW5nKGV4dC50eXBlKSkge1xuICAgICAgcmV0LnZhbGlkID0gZmFsc2U7XG4gICAgICByZXQuZXJyb3IgPSBiYXNlTXNnICsgJ3Byb3BlcnR5IFwidHlwZVwiIG11c3QgYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGV4dC50eXBlICsgJyBnaXZlbic7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIHZhciB0eXBlID0gZXh0LnR5cGUgPSBleHQudHlwZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gbm9ybWFsaXplIGV4dGVuc2lvbiB0eXBlXG4gICAgaWYgKHR5cGUgPT09ICdsYW5ndWFnZScpIHtcbiAgICAgIHR5cGUgPSBleHQudHlwZSA9ICdsYW5nJztcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ2h0bWwnKSB7XG4gICAgICB0eXBlID0gZXh0LnR5cGUgPSAnb3V0cHV0JztcbiAgICB9XG5cbiAgICBpZiAodHlwZSAhPT0gJ2xhbmcnICYmIHR5cGUgIT09ICdvdXRwdXQnICYmIHR5cGUgIT09ICdsaXN0ZW5lcicpIHtcbiAgICAgIHJldC52YWxpZCA9IGZhbHNlO1xuICAgICAgcmV0LmVycm9yID0gYmFzZU1zZyArICd0eXBlICcgKyB0eXBlICsgJyBpcyBub3QgcmVjb2duaXplZC4gVmFsaWQgdmFsdWVzOiBcImxhbmcvbGFuZ3VhZ2VcIiwgXCJvdXRwdXQvaHRtbFwiIG9yIFwibGlzdGVuZXJcIic7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIGlmICh0eXBlID09PSAnbGlzdGVuZXInKSB7XG4gICAgICBpZiAoc2hvd2Rvd24uaGVscGVyLmlzVW5kZWZpbmVkKGV4dC5saXN0ZW5lcnMpKSB7XG4gICAgICAgIHJldC52YWxpZCA9IGZhbHNlO1xuICAgICAgICByZXQuZXJyb3IgPSBiYXNlTXNnICsgJy4gRXh0ZW5zaW9ucyBvZiB0eXBlIFwibGlzdGVuZXJcIiBtdXN0IGhhdmUgYSBwcm9wZXJ0eSBjYWxsZWQgXCJsaXN0ZW5lcnNcIic7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzaG93ZG93bi5oZWxwZXIuaXNVbmRlZmluZWQoZXh0LmZpbHRlcikgJiYgc2hvd2Rvd24uaGVscGVyLmlzVW5kZWZpbmVkKGV4dC5yZWdleCkpIHtcbiAgICAgICAgcmV0LnZhbGlkID0gZmFsc2U7XG4gICAgICAgIHJldC5lcnJvciA9IGJhc2VNc2cgKyB0eXBlICsgJyBleHRlbnNpb25zIG11c3QgZGVmaW5lIGVpdGhlciBhIFwicmVnZXhcIiBwcm9wZXJ0eSBvciBhIFwiZmlsdGVyXCIgbWV0aG9kJztcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZXh0Lmxpc3RlbmVycykge1xuICAgICAgaWYgKHR5cGVvZiBleHQubGlzdGVuZXJzICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXQudmFsaWQgPSBmYWxzZTtcbiAgICAgICAgcmV0LmVycm9yID0gYmFzZU1zZyArICdcImxpc3RlbmVyc1wiIHByb3BlcnR5IG11c3QgYmUgYW4gb2JqZWN0IGJ1dCAnICsgdHlwZW9mIGV4dC5saXN0ZW5lcnMgKyAnIGdpdmVuJztcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGxuIGluIGV4dC5saXN0ZW5lcnMpIHtcbiAgICAgICAgaWYgKGV4dC5saXN0ZW5lcnMuaGFzT3duUHJvcGVydHkobG4pKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBleHQubGlzdGVuZXJzW2xuXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0LnZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICByZXQuZXJyb3IgPSBiYXNlTXNnICsgJ1wibGlzdGVuZXJzXCIgcHJvcGVydHkgbXVzdCBiZSBhbiBoYXNoIG9mIFtldmVudCBuYW1lXTogW2NhbGxiYWNrXS4gbGlzdGVuZXJzLicgKyBsbiArXG4gICAgICAgICAgICAgICcgbXVzdCBiZSBhIGZ1bmN0aW9uIGJ1dCAnICsgdHlwZW9mIGV4dC5saXN0ZW5lcnNbbG5dICsgJyBnaXZlbic7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChleHQuZmlsdGVyKSB7XG4gICAgICBpZiAodHlwZW9mIGV4dC5maWx0ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0LnZhbGlkID0gZmFsc2U7XG4gICAgICAgIHJldC5lcnJvciA9IGJhc2VNc2cgKyAnXCJmaWx0ZXJcIiBtdXN0IGJlIGEgZnVuY3Rpb24sIGJ1dCAnICsgdHlwZW9mIGV4dC5maWx0ZXIgKyAnIGdpdmVuJztcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGV4dC5yZWdleCkge1xuICAgICAgaWYgKHNob3dkb3duLmhlbHBlci5pc1N0cmluZyhleHQucmVnZXgpKSB7XG4gICAgICAgIGV4dC5yZWdleCA9IG5ldyBSZWdFeHAoZXh0LnJlZ2V4LCAnZycpO1xuICAgICAgfVxuICAgICAgaWYgKCEoZXh0LnJlZ2V4IGluc3RhbmNlb2YgUmVnRXhwKSkge1xuICAgICAgICByZXQudmFsaWQgPSBmYWxzZTtcbiAgICAgICAgcmV0LmVycm9yID0gYmFzZU1zZyArICdcInJlZ2V4XCIgcHJvcGVydHkgbXVzdCBlaXRoZXIgYmUgYSBzdHJpbmcgb3IgYSBSZWdFeHAgb2JqZWN0LCBidXQgJyArIHR5cGVvZiBleHQucmVnZXggKyAnIGdpdmVuJztcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICAgIGlmIChzaG93ZG93bi5oZWxwZXIuaXNVbmRlZmluZWQoZXh0LnJlcGxhY2UpKSB7XG4gICAgICAgIHJldC52YWxpZCA9IGZhbHNlO1xuICAgICAgICByZXQuZXJyb3IgPSBiYXNlTXNnICsgJ1wicmVnZXhcIiBleHRlbnNpb25zIG11c3QgaW1wbGVtZW50IGEgcmVwbGFjZSBzdHJpbmcgb3IgZnVuY3Rpb24nO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG4vKipcbiAqIFZhbGlkYXRlIGV4dGVuc2lvblxuICogQHBhcmFtIHtvYmplY3R9IGV4dFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbnNob3dkb3duLnZhbGlkYXRlRXh0ZW5zaW9uID0gZnVuY3Rpb24gKGV4dCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHZhbGlkYXRlRXh0ZW5zaW9uID0gdmFsaWRhdGUoZXh0LCBudWxsKTtcbiAgaWYgKCF2YWxpZGF0ZUV4dGVuc2lvbi52YWxpZCkge1xuICAgIGNvbnNvbGUud2Fybih2YWxpZGF0ZUV4dGVuc2lvbi5lcnJvcik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxyXG4vKipcbiAqIHNob3dkb3duanMgaGVscGVyIGZ1bmN0aW9uc1xuICovXG5cbmlmICghc2hvd2Rvd24uaGFzT3duUHJvcGVydHkoJ2hlbHBlcicpKSB7XG4gIHNob3dkb3duLmhlbHBlciA9IHt9O1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHZhciBpcyBzdHJpbmdcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7c3RyaW5nfSBhXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuc2hvd2Rvd24uaGVscGVyLmlzU3RyaW5nID0gZnVuY3Rpb24gKGEpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICByZXR1cm4gKHR5cGVvZiBhID09PSAnc3RyaW5nJyB8fCBhIGluc3RhbmNlb2YgU3RyaW5nKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdmFyIGlzIGEgZnVuY3Rpb25cbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7Kn0gYVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbnNob3dkb3duLmhlbHBlci5pc0Z1bmN0aW9uID0gZnVuY3Rpb24gKGEpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgZ2V0VHlwZSA9IHt9O1xuICByZXR1cm4gYSAmJiBnZXRUeXBlLnRvU3RyaW5nLmNhbGwoYSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59O1xuXG4vKipcbiAqIGlzQXJyYXkgaGVscGVyIGZ1bmN0aW9uXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0geyp9IGFcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5zaG93ZG93bi5oZWxwZXIuaXNBcnJheSA9IGZ1bmN0aW9uIChhKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYSk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHZhbHVlIGlzIHVuZGVmaW5lZFxuICogQHN0YXRpY1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBgdW5kZWZpbmVkYCwgZWxzZSBgZmFsc2VgLlxuICovXG5zaG93ZG93bi5oZWxwZXIuaXNVbmRlZmluZWQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcbn07XG5cbi8qKlxuICogRm9yRWFjaCBoZWxwZXIgZnVuY3Rpb25cbiAqIEl0ZXJhdGVzIG92ZXIgQXJyYXlzIGFuZCBPYmplY3RzIChvd24gcHJvcGVydGllcyBvbmx5KVxuICogQHN0YXRpY1xuICogQHBhcmFtIHsqfSBvYmpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEFjY2VwdHMgMyBwYXJhbXM6IDEuIHZhbHVlLCAyLiBrZXksIDMuIHRoZSBvcmlnaW5hbCBhcnJheS9vYmplY3RcbiAqL1xuc2hvd2Rvd24uaGVscGVyLmZvckVhY2ggPSBmdW5jdGlvbiAob2JqLCBjYWxsYmFjaykge1xuICAndXNlIHN0cmljdCc7XG4gIC8vIGNoZWNrIGlmIG9iaiBpcyBkZWZpbmVkXG4gIGlmIChzaG93ZG93bi5oZWxwZXIuaXNVbmRlZmluZWQob2JqKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignb2JqIHBhcmFtIGlzIHJlcXVpcmVkJyk7XG4gIH1cblxuICBpZiAoc2hvd2Rvd24uaGVscGVyLmlzVW5kZWZpbmVkKGNhbGxiYWNrKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2FsbGJhY2sgcGFyYW0gaXMgcmVxdWlyZWQnKTtcbiAgfVxuXG4gIGlmICghc2hvd2Rvd24uaGVscGVyLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjYWxsYmFjayBwYXJhbSBtdXN0IGJlIGEgZnVuY3Rpb24vY2xvc3VyZScpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmouZm9yRWFjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9iai5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgfSBlbHNlIGlmIChzaG93ZG93bi5oZWxwZXIuaXNBcnJheShvYmopKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNhbGxiYWNrKG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIChvYmopID09PSAnb2JqZWN0Jykge1xuICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgIGNhbGxiYWNrKG9ialtwcm9wXSwgcHJvcCwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdvYmogZG9lcyBub3Qgc2VlbSB0byBiZSBhbiBhcnJheSBvciBhbiBpdGVyYWJsZSBvYmplY3QnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTdGFuZGFyZGlkaXplIGV4dGVuc2lvbiBuYW1lXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge3N0cmluZ30gcyBleHRlbnNpb24gbmFtZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuc2hvd2Rvd24uaGVscGVyLnN0ZEV4dE5hbWUgPSBmdW5jdGlvbiAocykge1xuICAndXNlIHN0cmljdCc7XG4gIHJldHVybiBzLnJlcGxhY2UoL1tfPyorXFwvXFxcXC5eLV0vZywgJycpLnJlcGxhY2UoL1xccy9nLCAnJykudG9Mb3dlckNhc2UoKTtcbn07XG5cbmZ1bmN0aW9uIGVzY2FwZUNoYXJhY3RlcnNDYWxsYmFjayAod2hvbGVNYXRjaCwgbTEpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgY2hhckNvZGVUb0VzY2FwZSA9IG0xLmNoYXJDb2RlQXQoMCk7XG4gIHJldHVybiAnwqhFJyArIGNoYXJDb2RlVG9Fc2NhcGUgKyAnRSc7XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgdXNlZCB0byBlc2NhcGUgY2hhcmFjdGVycyB3aGVuIHBhc3NpbmcgdGhyb3VnaCBTdHJpbmcucmVwbGFjZVxuICogQHN0YXRpY1xuICogQHBhcmFtIHtzdHJpbmd9IHdob2xlTWF0Y2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBtMVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuc2hvd2Rvd24uaGVscGVyLmVzY2FwZUNoYXJhY3RlcnNDYWxsYmFjayA9IGVzY2FwZUNoYXJhY3RlcnNDYWxsYmFjaztcblxuLyoqXG4gKiBFc2NhcGUgY2hhcmFjdGVycyBpbiBhIHN0cmluZ1xuICogQHN0YXRpY1xuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaGFyc1RvRXNjYXBlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFmdGVyQmFja3NsYXNoXG4gKiBAcmV0dXJucyB7WE1MfHN0cmluZ3x2b2lkfCp9XG4gKi9cbnNob3dkb3duLmhlbHBlci5lc2NhcGVDaGFyYWN0ZXJzID0gZnVuY3Rpb24gKHRleHQsIGNoYXJzVG9Fc2NhcGUsIGFmdGVyQmFja3NsYXNoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgLy8gRmlyc3Qgd2UgaGF2ZSB0byBlc2NhcGUgdGhlIGVzY2FwZSBjaGFyYWN0ZXJzIHNvIHRoYXRcbiAgLy8gd2UgY2FuIGJ1aWxkIGEgY2hhcmFjdGVyIGNsYXNzIG91dCBvZiB0aGVtXG4gIHZhciByZWdleFN0cmluZyA9ICcoWycgKyBjaGFyc1RvRXNjYXBlLnJlcGxhY2UoLyhbXFxbXFxdXFxcXF0pL2csICdcXFxcJDEnKSArICddKSc7XG5cbiAgaWYgKGFmdGVyQmFja3NsYXNoKSB7XG4gICAgcmVnZXhTdHJpbmcgPSAnXFxcXFxcXFwnICsgcmVnZXhTdHJpbmc7XG4gIH1cblxuICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKHJlZ2V4U3RyaW5nLCAnZycpO1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHJlZ2V4LCBlc2NhcGVDaGFyYWN0ZXJzQ2FsbGJhY2spO1xuXG4gIHJldHVybiB0ZXh0O1xufTtcblxuLyoqXG4gKiBVbmVzY2FwZSBIVE1MIGVudGl0aWVzXG4gKiBAcGFyYW0gdHh0XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5zaG93ZG93bi5oZWxwZXIudW5lc2NhcGVIVE1MRW50aXRpZXMgPSBmdW5jdGlvbiAodHh0KSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICByZXR1cm4gdHh0XG4gICAgLnJlcGxhY2UoLyZxdW90Oy9nLCAnXCInKVxuICAgIC5yZXBsYWNlKC8mbHQ7L2csICc8JylcbiAgICAucmVwbGFjZSgvJmd0Oy9nLCAnPicpXG4gICAgLnJlcGxhY2UoLyZhbXA7L2csICcmJyk7XG59O1xuXG52YXIgcmd4RmluZE1hdGNoUG9zID0gZnVuY3Rpb24gKHN0ciwgbGVmdCwgcmlnaHQsIGZsYWdzKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIGYgPSBmbGFncyB8fCAnJyxcbiAgICAgIGcgPSBmLmluZGV4T2YoJ2cnKSA+IC0xLFxuICAgICAgeCA9IG5ldyBSZWdFeHAobGVmdCArICd8JyArIHJpZ2h0LCAnZycgKyBmLnJlcGxhY2UoL2cvZywgJycpKSxcbiAgICAgIGwgPSBuZXcgUmVnRXhwKGxlZnQsIGYucmVwbGFjZSgvZy9nLCAnJykpLFxuICAgICAgcG9zID0gW10sXG4gICAgICB0LCBzLCBtLCBzdGFydCwgZW5kO1xuXG4gIGRvIHtcbiAgICB0ID0gMDtcbiAgICB3aGlsZSAoKG0gPSB4LmV4ZWMoc3RyKSkpIHtcbiAgICAgIGlmIChsLnRlc3QobVswXSkpIHtcbiAgICAgICAgaWYgKCEodCsrKSkge1xuICAgICAgICAgIHMgPSB4Lmxhc3RJbmRleDtcbiAgICAgICAgICBzdGFydCA9IHMgLSBtWzBdLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0KSB7XG4gICAgICAgIGlmICghLS10KSB7XG4gICAgICAgICAgZW5kID0gbS5pbmRleCArIG1bMF0ubGVuZ3RoO1xuICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICBsZWZ0OiB7c3RhcnQ6IHN0YXJ0LCBlbmQ6IHN9LFxuICAgICAgICAgICAgbWF0Y2g6IHtzdGFydDogcywgZW5kOiBtLmluZGV4fSxcbiAgICAgICAgICAgIHJpZ2h0OiB7c3RhcnQ6IG0uaW5kZXgsIGVuZDogZW5kfSxcbiAgICAgICAgICAgIHdob2xlTWF0Y2g6IHtzdGFydDogc3RhcnQsIGVuZDogZW5kfVxuICAgICAgICAgIH07XG4gICAgICAgICAgcG9zLnB1c2gob2JqKTtcbiAgICAgICAgICBpZiAoIWcpIHtcbiAgICAgICAgICAgIHJldHVybiBwb3M7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IHdoaWxlICh0ICYmICh4Lmxhc3RJbmRleCA9IHMpKTtcblxuICByZXR1cm4gcG9zO1xufTtcblxuLyoqXG4gKiBtYXRjaFJlY3Vyc2l2ZVJlZ0V4cFxuICpcbiAqIChjKSAyMDA3IFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBBY2NlcHRzIGEgc3RyaW5nIHRvIHNlYXJjaCwgYSBsZWZ0IGFuZCByaWdodCBmb3JtYXQgZGVsaW1pdGVyXG4gKiBhcyByZWdleCBwYXR0ZXJucywgYW5kIG9wdGlvbmFsIHJlZ2V4IGZsYWdzLiBSZXR1cm5zIGFuIGFycmF5XG4gKiBvZiBtYXRjaGVzLCBhbGxvd2luZyBuZXN0ZWQgaW5zdGFuY2VzIG9mIGxlZnQvcmlnaHQgZGVsaW1pdGVycy5cbiAqIFVzZSB0aGUgXCJnXCIgZmxhZyB0byByZXR1cm4gYWxsIG1hdGNoZXMsIG90aGVyd2lzZSBvbmx5IHRoZVxuICogZmlyc3QgaXMgcmV0dXJuZWQuIEJlIGNhcmVmdWwgdG8gZW5zdXJlIHRoYXQgdGhlIGxlZnQgYW5kXG4gKiByaWdodCBmb3JtYXQgZGVsaW1pdGVycyBwcm9kdWNlIG11dHVhbGx5IGV4Y2x1c2l2ZSBtYXRjaGVzLlxuICogQmFja3JlZmVyZW5jZXMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aGluIHRoZSByaWdodCBkZWxpbWl0ZXJcbiAqIGR1ZSB0byBob3cgaXQgaXMgaW50ZXJuYWxseSBjb21iaW5lZCB3aXRoIHRoZSBsZWZ0IGRlbGltaXRlci5cbiAqIFdoZW4gbWF0Y2hpbmcgc3RyaW5ncyB3aG9zZSBmb3JtYXQgZGVsaW1pdGVycyBhcmUgdW5iYWxhbmNlZFxuICogdG8gdGhlIGxlZnQgb3IgcmlnaHQsIHRoZSBvdXRwdXQgaXMgaW50ZW50aW9uYWxseSBhcyBhXG4gKiBjb252ZW50aW9uYWwgcmVnZXggbGlicmFyeSB3aXRoIHJlY3Vyc2lvbiBzdXBwb3J0IHdvdWxkXG4gKiBwcm9kdWNlLCBlLmcuIFwiPDx4PlwiIGFuZCBcIjx4Pj5cIiBib3RoIHByb2R1Y2UgW1wieFwiXSB3aGVuIHVzaW5nXG4gKiBcIjxcIiBhbmQgXCI+XCIgYXMgdGhlIGRlbGltaXRlcnMgKGJvdGggc3RyaW5ncyBjb250YWluIGEgc2luZ2xlLFxuICogYmFsYW5jZWQgaW5zdGFuY2Ugb2YgXCI8eD5cIikuXG4gKlxuICogZXhhbXBsZXM6XG4gKiBtYXRjaFJlY3Vyc2l2ZVJlZ0V4cChcInRlc3RcIiwgXCJcXFxcKFwiLCBcIlxcXFwpXCIpXG4gKiByZXR1cm5zOiBbXVxuICogbWF0Y2hSZWN1cnNpdmVSZWdFeHAoXCI8dDw8ZT4+PHM+PnQ8PlwiLCBcIjxcIiwgXCI+XCIsIFwiZ1wiKVxuICogcmV0dXJuczogW1widDw8ZT4+PHM+XCIsIFwiXCJdXG4gKiBtYXRjaFJlY3Vyc2l2ZVJlZ0V4cChcIjxkaXYgaWQ9XFxcInhcXFwiPnRlc3Q8L2Rpdj5cIiwgXCI8ZGl2XFxcXGJbXj5dKj5cIiwgXCI8L2Rpdj5cIiwgXCJnaVwiKVxuICogcmV0dXJuczogW1widGVzdFwiXVxuICovXG5zaG93ZG93bi5oZWxwZXIubWF0Y2hSZWN1cnNpdmVSZWdFeHAgPSBmdW5jdGlvbiAoc3RyLCBsZWZ0LCByaWdodCwgZmxhZ3MpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtYXRjaFBvcyA9IHJneEZpbmRNYXRjaFBvcyAoc3RyLCBsZWZ0LCByaWdodCwgZmxhZ3MpLFxuICAgICAgcmVzdWx0cyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbWF0Y2hQb3MubGVuZ3RoOyArK2kpIHtcbiAgICByZXN1bHRzLnB1c2goW1xuICAgICAgc3RyLnNsaWNlKG1hdGNoUG9zW2ldLndob2xlTWF0Y2guc3RhcnQsIG1hdGNoUG9zW2ldLndob2xlTWF0Y2guZW5kKSxcbiAgICAgIHN0ci5zbGljZShtYXRjaFBvc1tpXS5tYXRjaC5zdGFydCwgbWF0Y2hQb3NbaV0ubWF0Y2guZW5kKSxcbiAgICAgIHN0ci5zbGljZShtYXRjaFBvc1tpXS5sZWZ0LnN0YXJ0LCBtYXRjaFBvc1tpXS5sZWZ0LmVuZCksXG4gICAgICBzdHIuc2xpY2UobWF0Y2hQb3NbaV0ucmlnaHQuc3RhcnQsIG1hdGNoUG9zW2ldLnJpZ2h0LmVuZClcbiAgICBdKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7c3RyaW5nfGZ1bmN0aW9ufSByZXBsYWNlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IGxlZnRcbiAqIEBwYXJhbSB7c3RyaW5nfSByaWdodFxuICogQHBhcmFtIHtzdHJpbmd9IGZsYWdzXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5zaG93ZG93bi5oZWxwZXIucmVwbGFjZVJlY3Vyc2l2ZVJlZ0V4cCA9IGZ1bmN0aW9uIChzdHIsIHJlcGxhY2VtZW50LCBsZWZ0LCByaWdodCwgZmxhZ3MpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGlmICghc2hvd2Rvd24uaGVscGVyLmlzRnVuY3Rpb24ocmVwbGFjZW1lbnQpKSB7XG4gICAgdmFyIHJlcFN0ciA9IHJlcGxhY2VtZW50O1xuICAgIHJlcGxhY2VtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHJlcFN0cjtcbiAgICB9O1xuICB9XG5cbiAgdmFyIG1hdGNoUG9zID0gcmd4RmluZE1hdGNoUG9zKHN0ciwgbGVmdCwgcmlnaHQsIGZsYWdzKSxcbiAgICAgIGZpbmFsU3RyID0gc3RyLFxuICAgICAgbG5nID0gbWF0Y2hQb3MubGVuZ3RoO1xuXG4gIGlmIChsbmcgPiAwKSB7XG4gICAgdmFyIGJpdHMgPSBbXTtcbiAgICBpZiAobWF0Y2hQb3NbMF0ud2hvbGVNYXRjaC5zdGFydCAhPT0gMCkge1xuICAgICAgYml0cy5wdXNoKHN0ci5zbGljZSgwLCBtYXRjaFBvc1swXS53aG9sZU1hdGNoLnN0YXJ0KSk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG5nOyArK2kpIHtcbiAgICAgIGJpdHMucHVzaChcbiAgICAgICAgcmVwbGFjZW1lbnQoXG4gICAgICAgICAgc3RyLnNsaWNlKG1hdGNoUG9zW2ldLndob2xlTWF0Y2guc3RhcnQsIG1hdGNoUG9zW2ldLndob2xlTWF0Y2guZW5kKSxcbiAgICAgICAgICBzdHIuc2xpY2UobWF0Y2hQb3NbaV0ubWF0Y2guc3RhcnQsIG1hdGNoUG9zW2ldLm1hdGNoLmVuZCksXG4gICAgICAgICAgc3RyLnNsaWNlKG1hdGNoUG9zW2ldLmxlZnQuc3RhcnQsIG1hdGNoUG9zW2ldLmxlZnQuZW5kKSxcbiAgICAgICAgICBzdHIuc2xpY2UobWF0Y2hQb3NbaV0ucmlnaHQuc3RhcnQsIG1hdGNoUG9zW2ldLnJpZ2h0LmVuZClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGlmIChpIDwgbG5nIC0gMSkge1xuICAgICAgICBiaXRzLnB1c2goc3RyLnNsaWNlKG1hdGNoUG9zW2ldLndob2xlTWF0Y2guZW5kLCBtYXRjaFBvc1tpICsgMV0ud2hvbGVNYXRjaC5zdGFydCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobWF0Y2hQb3NbbG5nIC0gMV0ud2hvbGVNYXRjaC5lbmQgPCBzdHIubGVuZ3RoKSB7XG4gICAgICBiaXRzLnB1c2goc3RyLnNsaWNlKG1hdGNoUG9zW2xuZyAtIDFdLndob2xlTWF0Y2guZW5kKSk7XG4gICAgfVxuICAgIGZpbmFsU3RyID0gYml0cy5qb2luKCcnKTtcbiAgfVxuICByZXR1cm4gZmluYWxTdHI7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGluZGV4IHdpdGhpbiB0aGUgcGFzc2VkIFN0cmluZyBvYmplY3Qgb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCByZWdleCxcbiAqIHN0YXJ0aW5nIHRoZSBzZWFyY2ggYXQgZnJvbUluZGV4LiBSZXR1cm5zIC0xIGlmIHRoZSB2YWx1ZSBpcyBub3QgZm91bmQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBzdHJpbmcgdG8gc2VhcmNoXG4gKiBAcGFyYW0ge1JlZ0V4cH0gcmVnZXggUmVndWxhciBleHByZXNzaW9uIHRvIHNlYXJjaFxuICogQHBhcmFtIHtpbnR9IFtmcm9tSW5kZXggPSAwXSBJbmRleCB0byBzdGFydCB0aGUgc2VhcmNoXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICogQHRocm93cyBJbnZhbGlkQXJndW1lbnRFcnJvclxuICovXG5zaG93ZG93bi5oZWxwZXIucmVnZXhJbmRleE9mID0gZnVuY3Rpb24gKHN0ciwgcmVnZXgsIGZyb21JbmRleCkge1xuICAndXNlIHN0cmljdCc7XG4gIGlmICghc2hvd2Rvd24uaGVscGVyLmlzU3RyaW5nKHN0cikpIHtcbiAgICB0aHJvdyAnSW52YWxpZEFyZ3VtZW50RXJyb3I6IGZpcnN0IHBhcmFtZXRlciBvZiBzaG93ZG93bi5oZWxwZXIucmVnZXhJbmRleE9mIGZ1bmN0aW9uIG11c3QgYmUgYSBzdHJpbmcnO1xuICB9XG4gIGlmIChyZWdleCBpbnN0YW5jZW9mIFJlZ0V4cCA9PT0gZmFsc2UpIHtcbiAgICB0aHJvdyAnSW52YWxpZEFyZ3VtZW50RXJyb3I6IHNlY29uZCBwYXJhbWV0ZXIgb2Ygc2hvd2Rvd24uaGVscGVyLnJlZ2V4SW5kZXhPZiBmdW5jdGlvbiBtdXN0IGJlIGFuIGluc3RhbmNlIG9mIFJlZ0V4cCc7XG4gIH1cbiAgdmFyIGluZGV4T2YgPSBzdHIuc3Vic3RyaW5nKGZyb21JbmRleCB8fCAwKS5zZWFyY2gocmVnZXgpO1xuICByZXR1cm4gKGluZGV4T2YgPj0gMCkgPyAoaW5kZXhPZiArIChmcm9tSW5kZXggfHwgMCkpIDogaW5kZXhPZjtcbn07XG5cbi8qKlxuICogU3BsaXRzIHRoZSBwYXNzZWQgc3RyaW5nIG9iamVjdCBhdCB0aGUgZGVmaW5lZCBpbmRleCwgYW5kIHJldHVybnMgYW4gYXJyYXkgY29tcG9zZWQgb2YgdGhlIHR3byBzdWJzdHJpbmdzXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIHN0cmluZyB0byBzcGxpdFxuICogQHBhcmFtIHtpbnR9IGluZGV4IGluZGV4IHRvIHNwbGl0IHN0cmluZyBhdFxuICogQHJldHVybnMge1tzdHJpbmcsc3RyaW5nXX1cbiAqIEB0aHJvd3MgSW52YWxpZEFyZ3VtZW50RXJyb3JcbiAqL1xuc2hvd2Rvd24uaGVscGVyLnNwbGl0QXRJbmRleCA9IGZ1bmN0aW9uIChzdHIsIGluZGV4KSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgaWYgKCFzaG93ZG93bi5oZWxwZXIuaXNTdHJpbmcoc3RyKSkge1xuICAgIHRocm93ICdJbnZhbGlkQXJndW1lbnRFcnJvcjogZmlyc3QgcGFyYW1ldGVyIG9mIHNob3dkb3duLmhlbHBlci5yZWdleEluZGV4T2YgZnVuY3Rpb24gbXVzdCBiZSBhIHN0cmluZyc7XG4gIH1cbiAgcmV0dXJuIFtzdHIuc3Vic3RyaW5nKDAsIGluZGV4KSwgc3RyLnN1YnN0cmluZyhpbmRleCldO1xufTtcblxuLyoqXG4gKiBPYmZ1c2NhdGUgYW4gZS1tYWlsIGFkZHJlc3MgdGhyb3VnaCB0aGUgdXNlIG9mIENoYXJhY3RlciBFbnRpdGllcyxcbiAqIHRyYW5zZm9ybWluZyBBU0NJSSBjaGFyYWN0ZXJzIGludG8gdGhlaXIgZXF1aXZhbGVudCBkZWNpbWFsIG9yIGhleCBlbnRpdGllcy5cbiAqXG4gKiBTaW5jZSBpdCBoYXMgYSByYW5kb20gY29tcG9uZW50LCBzdWJzZXF1ZW50IGNhbGxzIHRvIHRoaXMgZnVuY3Rpb24gcHJvZHVjZSBkaWZmZXJlbnQgcmVzdWx0c1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtYWlsXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5zaG93ZG93bi5oZWxwZXIuZW5jb2RlRW1haWxBZGRyZXNzID0gZnVuY3Rpb24gKG1haWwpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgZW5jb2RlID0gW1xuICAgIGZ1bmN0aW9uIChjaCkge1xuICAgICAgcmV0dXJuICcmIycgKyBjaC5jaGFyQ29kZUF0KDApICsgJzsnO1xuICAgIH0sXG4gICAgZnVuY3Rpb24gKGNoKSB7XG4gICAgICByZXR1cm4gJyYjeCcgKyBjaC5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSArICc7JztcbiAgICB9LFxuICAgIGZ1bmN0aW9uIChjaCkge1xuICAgICAgcmV0dXJuIGNoO1xuICAgIH1cbiAgXTtcblxuICBtYWlsID0gbWFpbC5yZXBsYWNlKC8uL2csIGZ1bmN0aW9uIChjaCkge1xuICAgIGlmIChjaCA9PT0gJ0AnKSB7XG4gICAgICAvLyB0aGlzICptdXN0KiBiZSBlbmNvZGVkLiBJIGluc2lzdC5cbiAgICAgIGNoID0gZW5jb2RlW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXShjaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciByID0gTWF0aC5yYW5kb20oKTtcbiAgICAgIC8vIHJvdWdobHkgMTAlIHJhdywgNDUlIGhleCwgNDUlIGRlY1xuICAgICAgY2ggPSAoXG4gICAgICAgIHIgPiAwLjkgPyBlbmNvZGVbMl0oY2gpIDogciA+IDAuNDUgPyBlbmNvZGVbMV0oY2gpIDogZW5jb2RlWzBdKGNoKVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGNoO1xuICB9KTtcblxuICByZXR1cm4gbWFpbDtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBzdHJcbiAqIEBwYXJhbSB0YXJnZXRMZW5ndGhcbiAqIEBwYXJhbSBwYWRTdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbnNob3dkb3duLmhlbHBlci5wYWRFbmQgPSBmdW5jdGlvbiBwYWRFbmQgKHN0ciwgdGFyZ2V0TGVuZ3RoLCBwYWRTdHJpbmcpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAvKmpzaGludCBiaXR3aXNlOiBmYWxzZSovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBzcGFjZS1pbmZpeC1vcHNcbiAgdGFyZ2V0TGVuZ3RoID0gdGFyZ2V0TGVuZ3RoPj4wOyAvL2Zsb29yIGlmIG51bWJlciBvciBjb252ZXJ0IG5vbi1udW1iZXIgdG8gMDtcbiAgLypqc2hpbnQgYml0d2lzZTogdHJ1ZSovXG4gIHBhZFN0cmluZyA9IFN0cmluZyhwYWRTdHJpbmcgfHwgJyAnKTtcbiAgaWYgKHN0ci5sZW5ndGggPiB0YXJnZXRMZW5ndGgpIHtcbiAgICByZXR1cm4gU3RyaW5nKHN0cik7XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0TGVuZ3RoID0gdGFyZ2V0TGVuZ3RoIC0gc3RyLmxlbmd0aDtcbiAgICBpZiAodGFyZ2V0TGVuZ3RoID4gcGFkU3RyaW5nLmxlbmd0aCkge1xuICAgICAgcGFkU3RyaW5nICs9IHBhZFN0cmluZy5yZXBlYXQodGFyZ2V0TGVuZ3RoIC8gcGFkU3RyaW5nLmxlbmd0aCk7IC8vYXBwZW5kIHRvIG9yaWdpbmFsIHRvIGVuc3VyZSB3ZSBhcmUgbG9uZ2VyIHRoYW4gbmVlZGVkXG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcoc3RyKSArIHBhZFN0cmluZy5zbGljZSgwLHRhcmdldExlbmd0aCk7XG4gIH1cbn07XG5cbi8qKlxuICogUE9MWUZJTExTXG4gKi9cbi8vIHVzZSB0aGlzIGluc3RlYWQgb2YgYnVpbHRpbiBpcyB1bmRlZmluZWQgZm9yIElFOCBjb21wYXRpYmlsaXR5XG5pZiAodHlwZW9mKGNvbnNvbGUpID09PSAndW5kZWZpbmVkJykge1xuICBjb25zb2xlID0ge1xuICAgIHdhcm46IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgIGFsZXJ0KG1zZyk7XG4gICAgfSxcbiAgICBsb2c6IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgIGFsZXJ0KG1zZyk7XG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKG1zZykge1xuICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgdGhyb3cgbXNnO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBDb21tb24gcmVnZXhlcy5cbiAqIFdlIGRlY2xhcmUgc29tZSBjb21tb24gcmVnZXhlcyB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXG4gKi9cbnNob3dkb3duLmhlbHBlci5yZWdleGVzID0ge1xuICBhc3Rlcmlza0Rhc2hBbmRDb2xvbjogLyhbKl86fl0pL2dcbn07XG5cbi8qKlxuICogRU1PSklTIExJU1RcbiAqL1xuc2hvd2Rvd24uaGVscGVyLmVtb2ppcyA9IHtcbiAgJysxJzonXFx1ZDgzZFxcdWRjNGQnLFxuICAnLTEnOidcXHVkODNkXFx1ZGM0ZScsXG4gICcxMDAnOidcXHVkODNkXFx1ZGNhZicsXG4gICcxMjM0JzonXFx1ZDgzZFxcdWRkMjInLFxuICAnMXN0X3BsYWNlX21lZGFsJzonXFx1ZDgzZVxcdWRkNDcnLFxuICAnMm5kX3BsYWNlX21lZGFsJzonXFx1ZDgzZVxcdWRkNDgnLFxuICAnM3JkX3BsYWNlX21lZGFsJzonXFx1ZDgzZVxcdWRkNDknLFxuICAnOGJhbGwnOidcXHVkODNjXFx1ZGZiMScsXG4gICdhJzonXFx1ZDgzY1xcdWRkNzBcXHVmZTBmJyxcbiAgJ2FiJzonXFx1ZDgzY1xcdWRkOGUnLFxuICAnYWJjJzonXFx1ZDgzZFxcdWRkMjQnLFxuICAnYWJjZCc6J1xcdWQ4M2RcXHVkZDIxJyxcbiAgJ2FjY2VwdCc6J1xcdWQ4M2NcXHVkZTUxJyxcbiAgJ2FlcmlhbF90cmFtd2F5JzonXFx1ZDgzZFxcdWRlYTEnLFxuICAnYWlycGxhbmUnOidcXHUyNzA4XFx1ZmUwZicsXG4gICdhbGFybV9jbG9jayc6J1xcdTIzZjAnLFxuICAnYWxlbWJpYyc6J1xcdTI2OTdcXHVmZTBmJyxcbiAgJ2FsaWVuJzonXFx1ZDgzZFxcdWRjN2QnLFxuICAnYW1idWxhbmNlJzonXFx1ZDgzZFxcdWRlOTEnLFxuICAnYW1waG9yYSc6J1xcdWQ4M2NcXHVkZmZhJyxcbiAgJ2FuY2hvcic6J1xcdTI2OTNcXHVmZTBmJyxcbiAgJ2FuZ2VsJzonXFx1ZDgzZFxcdWRjN2MnLFxuICAnYW5nZXInOidcXHVkODNkXFx1ZGNhMicsXG4gICdhbmdyeSc6J1xcdWQ4M2RcXHVkZTIwJyxcbiAgJ2FuZ3Vpc2hlZCc6J1xcdWQ4M2RcXHVkZTI3JyxcbiAgJ2FudCc6J1xcdWQ4M2RcXHVkYzFjJyxcbiAgJ2FwcGxlJzonXFx1ZDgzY1xcdWRmNGUnLFxuICAnYXF1YXJpdXMnOidcXHUyNjUyXFx1ZmUwZicsXG4gICdhcmllcyc6J1xcdTI2NDhcXHVmZTBmJyxcbiAgJ2Fycm93X2JhY2t3YXJkJzonXFx1MjVjMFxcdWZlMGYnLFxuICAnYXJyb3dfZG91YmxlX2Rvd24nOidcXHUyM2VjJyxcbiAgJ2Fycm93X2RvdWJsZV91cCc6J1xcdTIzZWInLFxuICAnYXJyb3dfZG93bic6J1xcdTJiMDdcXHVmZTBmJyxcbiAgJ2Fycm93X2Rvd25fc21hbGwnOidcXHVkODNkXFx1ZGQzZCcsXG4gICdhcnJvd19mb3J3YXJkJzonXFx1MjViNlxcdWZlMGYnLFxuICAnYXJyb3dfaGVhZGluZ19kb3duJzonXFx1MjkzNVxcdWZlMGYnLFxuICAnYXJyb3dfaGVhZGluZ191cCc6J1xcdTI5MzRcXHVmZTBmJyxcbiAgJ2Fycm93X2xlZnQnOidcXHUyYjA1XFx1ZmUwZicsXG4gICdhcnJvd19sb3dlcl9sZWZ0JzonXFx1MjE5OVxcdWZlMGYnLFxuICAnYXJyb3dfbG93ZXJfcmlnaHQnOidcXHUyMTk4XFx1ZmUwZicsXG4gICdhcnJvd19yaWdodCc6J1xcdTI3YTFcXHVmZTBmJyxcbiAgJ2Fycm93X3JpZ2h0X2hvb2snOidcXHUyMWFhXFx1ZmUwZicsXG4gICdhcnJvd191cCc6J1xcdTJiMDZcXHVmZTBmJyxcbiAgJ2Fycm93X3VwX2Rvd24nOidcXHUyMTk1XFx1ZmUwZicsXG4gICdhcnJvd191cF9zbWFsbCc6J1xcdWQ4M2RcXHVkZDNjJyxcbiAgJ2Fycm93X3VwcGVyX2xlZnQnOidcXHUyMTk2XFx1ZmUwZicsXG4gICdhcnJvd191cHBlcl9yaWdodCc6J1xcdTIxOTdcXHVmZTBmJyxcbiAgJ2Fycm93c19jbG9ja3dpc2UnOidcXHVkODNkXFx1ZGQwMycsXG4gICdhcnJvd3NfY291bnRlcmNsb2Nrd2lzZSc6J1xcdWQ4M2RcXHVkZDA0JyxcbiAgJ2FydCc6J1xcdWQ4M2NcXHVkZmE4JyxcbiAgJ2FydGljdWxhdGVkX2xvcnJ5JzonXFx1ZDgzZFxcdWRlOWInLFxuICAnYXJ0aWZpY2lhbF9zYXRlbGxpdGUnOidcXHVkODNkXFx1ZGVmMCcsXG4gICdhc3RvbmlzaGVkJzonXFx1ZDgzZFxcdWRlMzInLFxuICAnYXRobGV0aWNfc2hvZSc6J1xcdWQ4M2RcXHVkYzVmJyxcbiAgJ2F0bSc6J1xcdWQ4M2NcXHVkZmU3JyxcbiAgJ2F0b21fc3ltYm9sJzonXFx1MjY5YlxcdWZlMGYnLFxuICAnYXZvY2Fkbyc6J1xcdWQ4M2VcXHVkZDUxJyxcbiAgJ2InOidcXHVkODNjXFx1ZGQ3MVxcdWZlMGYnLFxuICAnYmFieSc6J1xcdWQ4M2RcXHVkYzc2JyxcbiAgJ2JhYnlfYm90dGxlJzonXFx1ZDgzY1xcdWRmN2MnLFxuICAnYmFieV9jaGljayc6J1xcdWQ4M2RcXHVkYzI0JyxcbiAgJ2JhYnlfc3ltYm9sJzonXFx1ZDgzZFxcdWRlYmMnLFxuICAnYmFjayc6J1xcdWQ4M2RcXHVkZDE5JyxcbiAgJ2JhY29uJzonXFx1ZDgzZVxcdWRkNTMnLFxuICAnYmFkbWludG9uJzonXFx1ZDgzY1xcdWRmZjgnLFxuICAnYmFnZ2FnZV9jbGFpbSc6J1xcdWQ4M2RcXHVkZWM0JyxcbiAgJ2JhZ3VldHRlX2JyZWFkJzonXFx1ZDgzZVxcdWRkNTYnLFxuICAnYmFsYW5jZV9zY2FsZSc6J1xcdTI2OTZcXHVmZTBmJyxcbiAgJ2JhbGxvb24nOidcXHVkODNjXFx1ZGY4OCcsXG4gICdiYWxsb3RfYm94JzonXFx1ZDgzZFxcdWRkZjMnLFxuICAnYmFsbG90X2JveF93aXRoX2NoZWNrJzonXFx1MjYxMVxcdWZlMGYnLFxuICAnYmFtYm9vJzonXFx1ZDgzY1xcdWRmOGQnLFxuICAnYmFuYW5hJzonXFx1ZDgzY1xcdWRmNGMnLFxuICAnYmFuZ2JhbmcnOidcXHUyMDNjXFx1ZmUwZicsXG4gICdiYW5rJzonXFx1ZDgzY1xcdWRmZTYnLFxuICAnYmFyX2NoYXJ0JzonXFx1ZDgzZFxcdWRjY2EnLFxuICAnYmFyYmVyJzonXFx1ZDgzZFxcdWRjODgnLFxuICAnYmFzZWJhbGwnOidcXHUyNmJlXFx1ZmUwZicsXG4gICdiYXNrZXRiYWxsJzonXFx1ZDgzY1xcdWRmYzAnLFxuICAnYmFza2V0YmFsbF9tYW4nOidcXHUyNmY5XFx1ZmUwZicsXG4gICdiYXNrZXRiYWxsX3dvbWFuJzonXFx1MjZmOVxcdWZlMGYmendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ2JhdCc6J1xcdWQ4M2VcXHVkZDg3JyxcbiAgJ2JhdGgnOidcXHVkODNkXFx1ZGVjMCcsXG4gICdiYXRodHViJzonXFx1ZDgzZFxcdWRlYzEnLFxuICAnYmF0dGVyeSc6J1xcdWQ4M2RcXHVkZDBiJyxcbiAgJ2JlYWNoX3VtYnJlbGxhJzonXFx1ZDgzY1xcdWRmZDYnLFxuICAnYmVhcic6J1xcdWQ4M2RcXHVkYzNiJyxcbiAgJ2JlZCc6J1xcdWQ4M2RcXHVkZWNmJyxcbiAgJ2JlZSc6J1xcdWQ4M2RcXHVkYzFkJyxcbiAgJ2JlZXInOidcXHVkODNjXFx1ZGY3YScsXG4gICdiZWVycyc6J1xcdWQ4M2NcXHVkZjdiJyxcbiAgJ2JlZXRsZSc6J1xcdWQ4M2RcXHVkYzFlJyxcbiAgJ2JlZ2lubmVyJzonXFx1ZDgzZFxcdWRkMzAnLFxuICAnYmVsbCc6J1xcdWQ4M2RcXHVkZDE0JyxcbiAgJ2JlbGxob3BfYmVsbCc6J1xcdWQ4M2RcXHVkZWNlJyxcbiAgJ2JlbnRvJzonXFx1ZDgzY1xcdWRmNzEnLFxuICAnYmlraW5nX21hbic6J1xcdWQ4M2RcXHVkZWI0JyxcbiAgJ2Jpa2UnOidcXHVkODNkXFx1ZGViMicsXG4gICdiaWtpbmdfd29tYW4nOidcXHVkODNkXFx1ZGViNCZ6d2o7XFx1MjY0MFxcdWZlMGYnLFxuICAnYmlraW5pJzonXFx1ZDgzZFxcdWRjNTknLFxuICAnYmlvaGF6YXJkJzonXFx1MjYyM1xcdWZlMGYnLFxuICAnYmlyZCc6J1xcdWQ4M2RcXHVkYzI2JyxcbiAgJ2JpcnRoZGF5JzonXFx1ZDgzY1xcdWRmODInLFxuICAnYmxhY2tfY2lyY2xlJzonXFx1MjZhYlxcdWZlMGYnLFxuICAnYmxhY2tfZmxhZyc6J1xcdWQ4M2NcXHVkZmY0JyxcbiAgJ2JsYWNrX2hlYXJ0JzonXFx1ZDgzZFxcdWRkYTQnLFxuICAnYmxhY2tfam9rZXInOidcXHVkODNjXFx1ZGNjZicsXG4gICdibGFja19sYXJnZV9zcXVhcmUnOidcXHUyYjFiXFx1ZmUwZicsXG4gICdibGFja19tZWRpdW1fc21hbGxfc3F1YXJlJzonXFx1MjVmZVxcdWZlMGYnLFxuICAnYmxhY2tfbWVkaXVtX3NxdWFyZSc6J1xcdTI1ZmNcXHVmZTBmJyxcbiAgJ2JsYWNrX25pYic6J1xcdTI3MTJcXHVmZTBmJyxcbiAgJ2JsYWNrX3NtYWxsX3NxdWFyZSc6J1xcdTI1YWFcXHVmZTBmJyxcbiAgJ2JsYWNrX3NxdWFyZV9idXR0b24nOidcXHVkODNkXFx1ZGQzMicsXG4gICdibG9uZGVfbWFuJzonXFx1ZDgzZFxcdWRjNzEnLFxuICAnYmxvbmRlX3dvbWFuJzonXFx1ZDgzZFxcdWRjNzEmendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ2Jsb3Nzb20nOidcXHVkODNjXFx1ZGYzYycsXG4gICdibG93ZmlzaCc6J1xcdWQ4M2RcXHVkYzIxJyxcbiAgJ2JsdWVfYm9vayc6J1xcdWQ4M2RcXHVkY2Q4JyxcbiAgJ2JsdWVfY2FyJzonXFx1ZDgzZFxcdWRlOTknLFxuICAnYmx1ZV9oZWFydCc6J1xcdWQ4M2RcXHVkYzk5JyxcbiAgJ2JsdXNoJzonXFx1ZDgzZFxcdWRlMGEnLFxuICAnYm9hcic6J1xcdWQ4M2RcXHVkYzE3JyxcbiAgJ2JvYXQnOidcXHUyNmY1XFx1ZmUwZicsXG4gICdib21iJzonXFx1ZDgzZFxcdWRjYTMnLFxuICAnYm9vayc6J1xcdWQ4M2RcXHVkY2Q2JyxcbiAgJ2Jvb2ttYXJrJzonXFx1ZDgzZFxcdWRkMTYnLFxuICAnYm9va21hcmtfdGFicyc6J1xcdWQ4M2RcXHVkY2QxJyxcbiAgJ2Jvb2tzJzonXFx1ZDgzZFxcdWRjZGEnLFxuICAnYm9vbSc6J1xcdWQ4M2RcXHVkY2E1JyxcbiAgJ2Jvb3QnOidcXHVkODNkXFx1ZGM2MicsXG4gICdib3VxdWV0JzonXFx1ZDgzZFxcdWRjOTAnLFxuICAnYm93aW5nX21hbic6J1xcdWQ4M2RcXHVkZTQ3JyxcbiAgJ2Jvd19hbmRfYXJyb3cnOidcXHVkODNjXFx1ZGZmOScsXG4gICdib3dpbmdfd29tYW4nOidcXHVkODNkXFx1ZGU0NyZ6d2o7XFx1MjY0MFxcdWZlMGYnLFxuICAnYm93bGluZyc6J1xcdWQ4M2NcXHVkZmIzJyxcbiAgJ2JveGluZ19nbG92ZSc6J1xcdWQ4M2VcXHVkZDRhJyxcbiAgJ2JveSc6J1xcdWQ4M2RcXHVkYzY2JyxcbiAgJ2JyZWFkJzonXFx1ZDgzY1xcdWRmNWUnLFxuICAnYnJpZGVfd2l0aF92ZWlsJzonXFx1ZDgzZFxcdWRjNzAnLFxuICAnYnJpZGdlX2F0X25pZ2h0JzonXFx1ZDgzY1xcdWRmMDknLFxuICAnYnJpZWZjYXNlJzonXFx1ZDgzZFxcdWRjYmMnLFxuICAnYnJva2VuX2hlYXJ0JzonXFx1ZDgzZFxcdWRjOTQnLFxuICAnYnVnJzonXFx1ZDgzZFxcdWRjMWInLFxuICAnYnVpbGRpbmdfY29uc3RydWN0aW9uJzonXFx1ZDgzY1xcdWRmZDcnLFxuICAnYnVsYic6J1xcdWQ4M2RcXHVkY2ExJyxcbiAgJ2J1bGxldHRyYWluX2Zyb250JzonXFx1ZDgzZFxcdWRlODUnLFxuICAnYnVsbGV0dHJhaW5fc2lkZSc6J1xcdWQ4M2RcXHVkZTg0JyxcbiAgJ2J1cnJpdG8nOidcXHVkODNjXFx1ZGYyZicsXG4gICdidXMnOidcXHVkODNkXFx1ZGU4YycsXG4gICdidXNpbmVzc19zdWl0X2xldml0YXRpbmcnOidcXHVkODNkXFx1ZGQ3NCcsXG4gICdidXNzdG9wJzonXFx1ZDgzZFxcdWRlOGYnLFxuICAnYnVzdF9pbl9zaWxob3VldHRlJzonXFx1ZDgzZFxcdWRjNjQnLFxuICAnYnVzdHNfaW5fc2lsaG91ZXR0ZSc6J1xcdWQ4M2RcXHVkYzY1JyxcbiAgJ2J1dHRlcmZseSc6J1xcdWQ4M2VcXHVkZDhiJyxcbiAgJ2NhY3R1cyc6J1xcdWQ4M2NcXHVkZjM1JyxcbiAgJ2Nha2UnOidcXHVkODNjXFx1ZGY3MCcsXG4gICdjYWxlbmRhcic6J1xcdWQ4M2RcXHVkY2M2JyxcbiAgJ2NhbGxfbWVfaGFuZCc6J1xcdWQ4M2VcXHVkZDE5JyxcbiAgJ2NhbGxpbmcnOidcXHVkODNkXFx1ZGNmMicsXG4gICdjYW1lbCc6J1xcdWQ4M2RcXHVkYzJiJyxcbiAgJ2NhbWVyYSc6J1xcdWQ4M2RcXHVkY2Y3JyxcbiAgJ2NhbWVyYV9mbGFzaCc6J1xcdWQ4M2RcXHVkY2Y4JyxcbiAgJ2NhbXBpbmcnOidcXHVkODNjXFx1ZGZkNScsXG4gICdjYW5jZXInOidcXHUyNjRiXFx1ZmUwZicsXG4gICdjYW5kbGUnOidcXHVkODNkXFx1ZGQ2ZicsXG4gICdjYW5keSc6J1xcdWQ4M2NcXHVkZjZjJyxcbiAgJ2Nhbm9lJzonXFx1ZDgzZFxcdWRlZjYnLFxuICAnY2FwaXRhbF9hYmNkJzonXFx1ZDgzZFxcdWRkMjAnLFxuICAnY2Fwcmljb3JuJzonXFx1MjY1MVxcdWZlMGYnLFxuICAnY2FyJzonXFx1ZDgzZFxcdWRlOTcnLFxuICAnY2FyZF9maWxlX2JveCc6J1xcdWQ4M2RcXHVkZGMzJyxcbiAgJ2NhcmRfaW5kZXgnOidcXHVkODNkXFx1ZGNjNycsXG4gICdjYXJkX2luZGV4X2RpdmlkZXJzJzonXFx1ZDgzZFxcdWRkYzInLFxuICAnY2Fyb3VzZWxfaG9yc2UnOidcXHVkODNjXFx1ZGZhMCcsXG4gICdjYXJyb3QnOidcXHVkODNlXFx1ZGQ1NScsXG4gICdjYXQnOidcXHVkODNkXFx1ZGMzMScsXG4gICdjYXQyJzonXFx1ZDgzZFxcdWRjMDgnLFxuICAnY2QnOidcXHVkODNkXFx1ZGNiZicsXG4gICdjaGFpbnMnOidcXHUyNmQzJyxcbiAgJ2NoYW1wYWduZSc6J1xcdWQ4M2NcXHVkZjdlJyxcbiAgJ2NoYXJ0JzonXFx1ZDgzZFxcdWRjYjknLFxuICAnY2hhcnRfd2l0aF9kb3dud2FyZHNfdHJlbmQnOidcXHVkODNkXFx1ZGNjOScsXG4gICdjaGFydF93aXRoX3Vwd2FyZHNfdHJlbmQnOidcXHVkODNkXFx1ZGNjOCcsXG4gICdjaGVja2VyZWRfZmxhZyc6J1xcdWQ4M2NcXHVkZmMxJyxcbiAgJ2NoZWVzZSc6J1xcdWQ4M2VcXHVkZGMwJyxcbiAgJ2NoZXJyaWVzJzonXFx1ZDgzY1xcdWRmNTInLFxuICAnY2hlcnJ5X2Jsb3Nzb20nOidcXHVkODNjXFx1ZGYzOCcsXG4gICdjaGVzdG51dCc6J1xcdWQ4M2NcXHVkZjMwJyxcbiAgJ2NoaWNrZW4nOidcXHVkODNkXFx1ZGMxNCcsXG4gICdjaGlsZHJlbl9jcm9zc2luZyc6J1xcdWQ4M2RcXHVkZWI4JyxcbiAgJ2NoaXBtdW5rJzonXFx1ZDgzZFxcdWRjM2YnLFxuICAnY2hvY29sYXRlX2Jhcic6J1xcdWQ4M2NcXHVkZjZiJyxcbiAgJ2NocmlzdG1hc190cmVlJzonXFx1ZDgzY1xcdWRmODQnLFxuICAnY2h1cmNoJzonXFx1MjZlYVxcdWZlMGYnLFxuICAnY2luZW1hJzonXFx1ZDgzY1xcdWRmYTYnLFxuICAnY2lyY3VzX3RlbnQnOidcXHVkODNjXFx1ZGZhYScsXG4gICdjaXR5X3N1bnJpc2UnOidcXHVkODNjXFx1ZGYwNycsXG4gICdjaXR5X3N1bnNldCc6J1xcdWQ4M2NcXHVkZjA2JyxcbiAgJ2NpdHlzY2FwZSc6J1xcdWQ4M2NcXHVkZmQ5JyxcbiAgJ2NsJzonXFx1ZDgzY1xcdWRkOTEnLFxuICAnY2xhbXAnOidcXHVkODNkXFx1ZGRkYycsXG4gICdjbGFwJzonXFx1ZDgzZFxcdWRjNGYnLFxuICAnY2xhcHBlcic6J1xcdWQ4M2NcXHVkZmFjJyxcbiAgJ2NsYXNzaWNhbF9idWlsZGluZyc6J1xcdWQ4M2NcXHVkZmRiJyxcbiAgJ2NsaW5raW5nX2dsYXNzZXMnOidcXHVkODNlXFx1ZGQ0MicsXG4gICdjbGlwYm9hcmQnOidcXHVkODNkXFx1ZGNjYicsXG4gICdjbG9jazEnOidcXHVkODNkXFx1ZGQ1MCcsXG4gICdjbG9jazEwJzonXFx1ZDgzZFxcdWRkNTknLFxuICAnY2xvY2sxMDMwJzonXFx1ZDgzZFxcdWRkNjUnLFxuICAnY2xvY2sxMSc6J1xcdWQ4M2RcXHVkZDVhJyxcbiAgJ2Nsb2NrMTEzMCc6J1xcdWQ4M2RcXHVkZDY2JyxcbiAgJ2Nsb2NrMTInOidcXHVkODNkXFx1ZGQ1YicsXG4gICdjbG9jazEyMzAnOidcXHVkODNkXFx1ZGQ2NycsXG4gICdjbG9jazEzMCc6J1xcdWQ4M2RcXHVkZDVjJyxcbiAgJ2Nsb2NrMic6J1xcdWQ4M2RcXHVkZDUxJyxcbiAgJ2Nsb2NrMjMwJzonXFx1ZDgzZFxcdWRkNWQnLFxuICAnY2xvY2szJzonXFx1ZDgzZFxcdWRkNTInLFxuICAnY2xvY2szMzAnOidcXHVkODNkXFx1ZGQ1ZScsXG4gICdjbG9jazQnOidcXHVkODNkXFx1ZGQ1MycsXG4gICdjbG9jazQzMCc6J1xcdWQ4M2RcXHVkZDVmJyxcbiAgJ2Nsb2NrNSc6J1xcdWQ4M2RcXHVkZDU0JyxcbiAgJ2Nsb2NrNTMwJzonXFx1ZDgzZFxcdWRkNjAnLFxuICAnY2xvY2s2JzonXFx1ZDgzZFxcdWRkNTUnLFxuICAnY2xvY2s2MzAnOidcXHVkODNkXFx1ZGQ2MScsXG4gICdjbG9jazcnOidcXHVkODNkXFx1ZGQ1NicsXG4gICdjbG9jazczMCc6J1xcdWQ4M2RcXHVkZDYyJyxcbiAgJ2Nsb2NrOCc6J1xcdWQ4M2RcXHVkZDU3JyxcbiAgJ2Nsb2NrODMwJzonXFx1ZDgzZFxcdWRkNjMnLFxuICAnY2xvY2s5JzonXFx1ZDgzZFxcdWRkNTgnLFxuICAnY2xvY2s5MzAnOidcXHVkODNkXFx1ZGQ2NCcsXG4gICdjbG9zZWRfYm9vayc6J1xcdWQ4M2RcXHVkY2Q1JyxcbiAgJ2Nsb3NlZF9sb2NrX3dpdGhfa2V5JzonXFx1ZDgzZFxcdWRkMTAnLFxuICAnY2xvc2VkX3VtYnJlbGxhJzonXFx1ZDgzY1xcdWRmMDInLFxuICAnY2xvdWQnOidcXHUyNjAxXFx1ZmUwZicsXG4gICdjbG91ZF93aXRoX2xpZ2h0bmluZyc6J1xcdWQ4M2NcXHVkZjI5JyxcbiAgJ2Nsb3VkX3dpdGhfbGlnaHRuaW5nX2FuZF9yYWluJzonXFx1MjZjOCcsXG4gICdjbG91ZF93aXRoX3JhaW4nOidcXHVkODNjXFx1ZGYyNycsXG4gICdjbG91ZF93aXRoX3Nub3cnOidcXHVkODNjXFx1ZGYyOCcsXG4gICdjbG93bl9mYWNlJzonXFx1ZDgzZVxcdWRkMjEnLFxuICAnY2x1YnMnOidcXHUyNjYzXFx1ZmUwZicsXG4gICdjb2NrdGFpbCc6J1xcdWQ4M2NcXHVkZjc4JyxcbiAgJ2NvZmZlZSc6J1xcdTI2MTVcXHVmZTBmJyxcbiAgJ2NvZmZpbic6J1xcdTI2YjBcXHVmZTBmJyxcbiAgJ2NvbGRfc3dlYXQnOidcXHVkODNkXFx1ZGUzMCcsXG4gICdjb21ldCc6J1xcdTI2MDRcXHVmZTBmJyxcbiAgJ2NvbXB1dGVyJzonXFx1ZDgzZFxcdWRjYmInLFxuICAnY29tcHV0ZXJfbW91c2UnOidcXHVkODNkXFx1ZGRiMScsXG4gICdjb25mZXR0aV9iYWxsJzonXFx1ZDgzY1xcdWRmOGEnLFxuICAnY29uZm91bmRlZCc6J1xcdWQ4M2RcXHVkZTE2JyxcbiAgJ2NvbmZ1c2VkJzonXFx1ZDgzZFxcdWRlMTUnLFxuICAnY29uZ3JhdHVsYXRpb25zJzonXFx1MzI5N1xcdWZlMGYnLFxuICAnY29uc3RydWN0aW9uJzonXFx1ZDgzZFxcdWRlYTcnLFxuICAnY29uc3RydWN0aW9uX3dvcmtlcl9tYW4nOidcXHVkODNkXFx1ZGM3NycsXG4gICdjb25zdHJ1Y3Rpb25fd29ya2VyX3dvbWFuJzonXFx1ZDgzZFxcdWRjNzcmendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ2NvbnRyb2xfa25vYnMnOidcXHVkODNjXFx1ZGY5YicsXG4gICdjb252ZW5pZW5jZV9zdG9yZSc6J1xcdWQ4M2NcXHVkZmVhJyxcbiAgJ2Nvb2tpZSc6J1xcdWQ4M2NcXHVkZjZhJyxcbiAgJ2Nvb2wnOidcXHVkODNjXFx1ZGQ5MicsXG4gICdwb2xpY2VtYW4nOidcXHVkODNkXFx1ZGM2ZScsXG4gICdjb3B5cmlnaHQnOidcXHUwMGE5XFx1ZmUwZicsXG4gICdjb3JuJzonXFx1ZDgzY1xcdWRmM2QnLFxuICAnY291Y2hfYW5kX2xhbXAnOidcXHVkODNkXFx1ZGVjYicsXG4gICdjb3VwbGUnOidcXHVkODNkXFx1ZGM2YicsXG4gICdjb3VwbGVfd2l0aF9oZWFydF93b21hbl9tYW4nOidcXHVkODNkXFx1ZGM5MScsXG4gICdjb3VwbGVfd2l0aF9oZWFydF9tYW5fbWFuJzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdTI3NjRcXHVmZTBmJnp3ajtcXHVkODNkXFx1ZGM2OCcsXG4gICdjb3VwbGVfd2l0aF9oZWFydF93b21hbl93b21hbic6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHUyNzY0XFx1ZmUwZiZ6d2o7XFx1ZDgzZFxcdWRjNjknLFxuICAnY291cGxla2lzc19tYW5fbWFuJzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdTI3NjRcXHVmZTBmJnp3ajtcXHVkODNkXFx1ZGM4YiZ6d2o7XFx1ZDgzZFxcdWRjNjgnLFxuICAnY291cGxla2lzc19tYW5fd29tYW4nOidcXHVkODNkXFx1ZGM4ZicsXG4gICdjb3VwbGVraXNzX3dvbWFuX3dvbWFuJzonXFx1ZDgzZFxcdWRjNjkmendqO1xcdTI3NjRcXHVmZTBmJnp3ajtcXHVkODNkXFx1ZGM4YiZ6d2o7XFx1ZDgzZFxcdWRjNjknLFxuICAnY293JzonXFx1ZDgzZFxcdWRjMmUnLFxuICAnY293Mic6J1xcdWQ4M2RcXHVkYzA0JyxcbiAgJ2Nvd2JveV9oYXRfZmFjZSc6J1xcdWQ4M2VcXHVkZDIwJyxcbiAgJ2NyYWInOidcXHVkODNlXFx1ZGQ4MCcsXG4gICdjcmF5b24nOidcXHVkODNkXFx1ZGQ4ZCcsXG4gICdjcmVkaXRfY2FyZCc6J1xcdWQ4M2RcXHVkY2IzJyxcbiAgJ2NyZXNjZW50X21vb24nOidcXHVkODNjXFx1ZGYxOScsXG4gICdjcmlja2V0JzonXFx1ZDgzY1xcdWRmY2YnLFxuICAnY3JvY29kaWxlJzonXFx1ZDgzZFxcdWRjMGEnLFxuICAnY3JvaXNzYW50JzonXFx1ZDgzZVxcdWRkNTAnLFxuICAnY3Jvc3NlZF9maW5nZXJzJzonXFx1ZDgzZVxcdWRkMWUnLFxuICAnY3Jvc3NlZF9mbGFncyc6J1xcdWQ4M2NcXHVkZjhjJyxcbiAgJ2Nyb3NzZWRfc3dvcmRzJzonXFx1MjY5NFxcdWZlMGYnLFxuICAnY3Jvd24nOidcXHVkODNkXFx1ZGM1MScsXG4gICdjcnknOidcXHVkODNkXFx1ZGUyMicsXG4gICdjcnlpbmdfY2F0X2ZhY2UnOidcXHVkODNkXFx1ZGUzZicsXG4gICdjcnlzdGFsX2JhbGwnOidcXHVkODNkXFx1ZGQyZScsXG4gICdjdWN1bWJlcic6J1xcdWQ4M2VcXHVkZDUyJyxcbiAgJ2N1cGlkJzonXFx1ZDgzZFxcdWRjOTgnLFxuICAnY3VybHlfbG9vcCc6J1xcdTI3YjAnLFxuICAnY3VycmVuY3lfZXhjaGFuZ2UnOidcXHVkODNkXFx1ZGNiMScsXG4gICdjdXJyeSc6J1xcdWQ4M2NcXHVkZjViJyxcbiAgJ2N1c3RhcmQnOidcXHVkODNjXFx1ZGY2ZScsXG4gICdjdXN0b21zJzonXFx1ZDgzZFxcdWRlYzMnLFxuICAnY3ljbG9uZSc6J1xcdWQ4M2NcXHVkZjAwJyxcbiAgJ2RhZ2dlcic6J1xcdWQ4M2RcXHVkZGUxJyxcbiAgJ2RhbmNlcic6J1xcdWQ4M2RcXHVkYzgzJyxcbiAgJ2RhbmNpbmdfd29tZW4nOidcXHVkODNkXFx1ZGM2ZicsXG4gICdkYW5jaW5nX21lbic6J1xcdWQ4M2RcXHVkYzZmJnp3ajtcXHUyNjQyXFx1ZmUwZicsXG4gICdkYW5nbyc6J1xcdWQ4M2NcXHVkZjYxJyxcbiAgJ2Rhcmtfc3VuZ2xhc3Nlcyc6J1xcdWQ4M2RcXHVkZDc2JyxcbiAgJ2RhcnQnOidcXHVkODNjXFx1ZGZhZicsXG4gICdkYXNoJzonXFx1ZDgzZFxcdWRjYTgnLFxuICAnZGF0ZSc6J1xcdWQ4M2RcXHVkY2M1JyxcbiAgJ2RlY2lkdW91c190cmVlJzonXFx1ZDgzY1xcdWRmMzMnLFxuICAnZGVlcic6J1xcdWQ4M2VcXHVkZDhjJyxcbiAgJ2RlcGFydG1lbnRfc3RvcmUnOidcXHVkODNjXFx1ZGZlYycsXG4gICdkZXJlbGljdF9ob3VzZSc6J1xcdWQ4M2NcXHVkZmRhJyxcbiAgJ2Rlc2VydCc6J1xcdWQ4M2NcXHVkZmRjJyxcbiAgJ2Rlc2VydF9pc2xhbmQnOidcXHVkODNjXFx1ZGZkZCcsXG4gICdkZXNrdG9wX2NvbXB1dGVyJzonXFx1ZDgzZFxcdWRkYTUnLFxuICAnbWFsZV9kZXRlY3RpdmUnOidcXHVkODNkXFx1ZGQ3NVxcdWZlMGYnLFxuICAnZGlhbW9uZF9zaGFwZV93aXRoX2FfZG90X2luc2lkZSc6J1xcdWQ4M2RcXHVkY2EwJyxcbiAgJ2RpYW1vbmRzJzonXFx1MjY2NlxcdWZlMGYnLFxuICAnZGlzYXBwb2ludGVkJzonXFx1ZDgzZFxcdWRlMWUnLFxuICAnZGlzYXBwb2ludGVkX3JlbGlldmVkJzonXFx1ZDgzZFxcdWRlMjUnLFxuICAnZGl6enknOidcXHVkODNkXFx1ZGNhYicsXG4gICdkaXp6eV9mYWNlJzonXFx1ZDgzZFxcdWRlMzUnLFxuICAnZG9fbm90X2xpdHRlcic6J1xcdWQ4M2RcXHVkZWFmJyxcbiAgJ2RvZyc6J1xcdWQ4M2RcXHVkYzM2JyxcbiAgJ2RvZzInOidcXHVkODNkXFx1ZGMxNScsXG4gICdkb2xsYXInOidcXHVkODNkXFx1ZGNiNScsXG4gICdkb2xscyc6J1xcdWQ4M2NcXHVkZjhlJyxcbiAgJ2RvbHBoaW4nOidcXHVkODNkXFx1ZGMyYycsXG4gICdkb29yJzonXFx1ZDgzZFxcdWRlYWEnLFxuICAnZG91Z2hudXQnOidcXHVkODNjXFx1ZGY2OScsXG4gICdkb3ZlJzonXFx1ZDgzZFxcdWRkNGEnLFxuICAnZHJhZ29uJzonXFx1ZDgzZFxcdWRjMDknLFxuICAnZHJhZ29uX2ZhY2UnOidcXHVkODNkXFx1ZGMzMicsXG4gICdkcmVzcyc6J1xcdWQ4M2RcXHVkYzU3JyxcbiAgJ2Ryb21lZGFyeV9jYW1lbCc6J1xcdWQ4M2RcXHVkYzJhJyxcbiAgJ2Ryb29saW5nX2ZhY2UnOidcXHVkODNlXFx1ZGQyNCcsXG4gICdkcm9wbGV0JzonXFx1ZDgzZFxcdWRjYTcnLFxuICAnZHJ1bSc6J1xcdWQ4M2VcXHVkZDQxJyxcbiAgJ2R1Y2snOidcXHVkODNlXFx1ZGQ4NicsXG4gICdkdmQnOidcXHVkODNkXFx1ZGNjMCcsXG4gICdlLW1haWwnOidcXHVkODNkXFx1ZGNlNycsXG4gICdlYWdsZSc6J1xcdWQ4M2VcXHVkZDg1JyxcbiAgJ2Vhcic6J1xcdWQ4M2RcXHVkYzQyJyxcbiAgJ2Vhcl9vZl9yaWNlJzonXFx1ZDgzY1xcdWRmM2UnLFxuICAnZWFydGhfYWZyaWNhJzonXFx1ZDgzY1xcdWRmMGQnLFxuICAnZWFydGhfYW1lcmljYXMnOidcXHVkODNjXFx1ZGYwZScsXG4gICdlYXJ0aF9hc2lhJzonXFx1ZDgzY1xcdWRmMGYnLFxuICAnZWdnJzonXFx1ZDgzZVxcdWRkNWEnLFxuICAnZWdncGxhbnQnOidcXHVkODNjXFx1ZGY0NicsXG4gICdlaWdodF9wb2ludGVkX2JsYWNrX3N0YXInOidcXHUyNzM0XFx1ZmUwZicsXG4gICdlaWdodF9zcG9rZWRfYXN0ZXJpc2snOidcXHUyNzMzXFx1ZmUwZicsXG4gICdlbGVjdHJpY19wbHVnJzonXFx1ZDgzZFxcdWRkMGMnLFxuICAnZWxlcGhhbnQnOidcXHVkODNkXFx1ZGMxOCcsXG4gICdlbWFpbCc6J1xcdTI3MDlcXHVmZTBmJyxcbiAgJ2VuZCc6J1xcdWQ4M2RcXHVkZDFhJyxcbiAgJ2VudmVsb3BlX3dpdGhfYXJyb3cnOidcXHVkODNkXFx1ZGNlOScsXG4gICdldXJvJzonXFx1ZDgzZFxcdWRjYjYnLFxuICAnZXVyb3BlYW5fY2FzdGxlJzonXFx1ZDgzY1xcdWRmZjAnLFxuICAnZXVyb3BlYW5fcG9zdF9vZmZpY2UnOidcXHVkODNjXFx1ZGZlNCcsXG4gICdldmVyZ3JlZW5fdHJlZSc6J1xcdWQ4M2NcXHVkZjMyJyxcbiAgJ2V4Y2xhbWF0aW9uJzonXFx1Mjc1N1xcdWZlMGYnLFxuICAnZXhwcmVzc2lvbmxlc3MnOidcXHVkODNkXFx1ZGUxMScsXG4gICdleWUnOidcXHVkODNkXFx1ZGM0MScsXG4gICdleWVfc3BlZWNoX2J1YmJsZSc6J1xcdWQ4M2RcXHVkYzQxJnp3ajtcXHVkODNkXFx1ZGRlOCcsXG4gICdleWVnbGFzc2VzJzonXFx1ZDgzZFxcdWRjNTMnLFxuICAnZXllcyc6J1xcdWQ4M2RcXHVkYzQwJyxcbiAgJ2ZhY2Vfd2l0aF9oZWFkX2JhbmRhZ2UnOidcXHVkODNlXFx1ZGQxNScsXG4gICdmYWNlX3dpdGhfdGhlcm1vbWV0ZXInOidcXHVkODNlXFx1ZGQxMicsXG4gICdmaXN0X29uY29taW5nJzonXFx1ZDgzZFxcdWRjNGEnLFxuICAnZmFjdG9yeSc6J1xcdWQ4M2NcXHVkZmVkJyxcbiAgJ2ZhbGxlbl9sZWFmJzonXFx1ZDgzY1xcdWRmNDInLFxuICAnZmFtaWx5X21hbl93b21hbl9ib3knOidcXHVkODNkXFx1ZGM2YScsXG4gICdmYW1pbHlfbWFuX2JveSc6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNkXFx1ZGM2NicsXG4gICdmYW1pbHlfbWFuX2JveV9ib3knOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzZFxcdWRjNjYmendqO1xcdWQ4M2RcXHVkYzY2JyxcbiAgJ2ZhbWlseV9tYW5fZ2lybCc6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNkXFx1ZGM2NycsXG4gICdmYW1pbHlfbWFuX2dpcmxfYm95JzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2RcXHVkYzY3Jnp3ajtcXHVkODNkXFx1ZGM2NicsXG4gICdmYW1pbHlfbWFuX2dpcmxfZ2lybCc6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNkXFx1ZGM2NyZ6d2o7XFx1ZDgzZFxcdWRjNjcnLFxuICAnZmFtaWx5X21hbl9tYW5fYm95JzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNkXFx1ZGM2NicsXG4gICdmYW1pbHlfbWFuX21hbl9ib3lfYm95JzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNkXFx1ZGM2NiZ6d2o7XFx1ZDgzZFxcdWRjNjYnLFxuICAnZmFtaWx5X21hbl9tYW5fZ2lybCc6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzZFxcdWRjNjcnLFxuICAnZmFtaWx5X21hbl9tYW5fZ2lybF9ib3knOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2RcXHVkYzY3Jnp3ajtcXHVkODNkXFx1ZGM2NicsXG4gICdmYW1pbHlfbWFuX21hbl9naXJsX2dpcmwnOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2RcXHVkYzY3Jnp3ajtcXHVkODNkXFx1ZGM2NycsXG4gICdmYW1pbHlfbWFuX3dvbWFuX2JveV9ib3knOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2RcXHVkYzY2Jnp3ajtcXHVkODNkXFx1ZGM2NicsXG4gICdmYW1pbHlfbWFuX3dvbWFuX2dpcmwnOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2RcXHVkYzY3JyxcbiAgJ2ZhbWlseV9tYW5fd29tYW5fZ2lybF9ib3knOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2RcXHVkYzY3Jnp3ajtcXHVkODNkXFx1ZGM2NicsXG4gICdmYW1pbHlfbWFuX3dvbWFuX2dpcmxfZ2lybCc6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzZFxcdWRjNjcmendqO1xcdWQ4M2RcXHVkYzY3JyxcbiAgJ2ZhbWlseV93b21hbl9ib3knOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzZFxcdWRjNjYnLFxuICAnZmFtaWx5X3dvbWFuX2JveV9ib3knOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzZFxcdWRjNjYmendqO1xcdWQ4M2RcXHVkYzY2JyxcbiAgJ2ZhbWlseV93b21hbl9naXJsJzonXFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2RcXHVkYzY3JyxcbiAgJ2ZhbWlseV93b21hbl9naXJsX2JveSc6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNkXFx1ZGM2NyZ6d2o7XFx1ZDgzZFxcdWRjNjYnLFxuICAnZmFtaWx5X3dvbWFuX2dpcmxfZ2lybCc6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNkXFx1ZGM2NyZ6d2o7XFx1ZDgzZFxcdWRjNjcnLFxuICAnZmFtaWx5X3dvbWFuX3dvbWFuX2JveSc6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzZFxcdWRjNjYnLFxuICAnZmFtaWx5X3dvbWFuX3dvbWFuX2JveV9ib3knOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2RcXHVkYzY2Jnp3ajtcXHVkODNkXFx1ZGM2NicsXG4gICdmYW1pbHlfd29tYW5fd29tYW5fZ2lybCc6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzZFxcdWRjNjcnLFxuICAnZmFtaWx5X3dvbWFuX3dvbWFuX2dpcmxfYm95JzonXFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNkXFx1ZGM2NyZ6d2o7XFx1ZDgzZFxcdWRjNjYnLFxuICAnZmFtaWx5X3dvbWFuX3dvbWFuX2dpcmxfZ2lybCc6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzZFxcdWRjNjcmendqO1xcdWQ4M2RcXHVkYzY3JyxcbiAgJ2Zhc3RfZm9yd2FyZCc6J1xcdTIzZTknLFxuICAnZmF4JzonXFx1ZDgzZFxcdWRjZTAnLFxuICAnZmVhcmZ1bCc6J1xcdWQ4M2RcXHVkZTI4JyxcbiAgJ2ZlZXQnOidcXHVkODNkXFx1ZGMzZScsXG4gICdmZW1hbGVfZGV0ZWN0aXZlJzonXFx1ZDgzZFxcdWRkNzVcXHVmZTBmJnp3ajtcXHUyNjQwXFx1ZmUwZicsXG4gICdmZXJyaXNfd2hlZWwnOidcXHVkODNjXFx1ZGZhMScsXG4gICdmZXJyeSc6J1xcdTI2ZjQnLFxuICAnZmllbGRfaG9ja2V5JzonXFx1ZDgzY1xcdWRmZDEnLFxuICAnZmlsZV9jYWJpbmV0JzonXFx1ZDgzZFxcdWRkYzQnLFxuICAnZmlsZV9mb2xkZXInOidcXHVkODNkXFx1ZGNjMScsXG4gICdmaWxtX3Byb2plY3Rvcic6J1xcdWQ4M2RcXHVkY2ZkJyxcbiAgJ2ZpbG1fc3RyaXAnOidcXHVkODNjXFx1ZGY5ZScsXG4gICdmaXJlJzonXFx1ZDgzZFxcdWRkMjUnLFxuICAnZmlyZV9lbmdpbmUnOidcXHVkODNkXFx1ZGU5MicsXG4gICdmaXJld29ya3MnOidcXHVkODNjXFx1ZGY4NicsXG4gICdmaXJzdF9xdWFydGVyX21vb24nOidcXHVkODNjXFx1ZGYxMycsXG4gICdmaXJzdF9xdWFydGVyX21vb25fd2l0aF9mYWNlJzonXFx1ZDgzY1xcdWRmMWInLFxuICAnZmlzaCc6J1xcdWQ4M2RcXHVkYzFmJyxcbiAgJ2Zpc2hfY2FrZSc6J1xcdWQ4M2NcXHVkZjY1JyxcbiAgJ2Zpc2hpbmdfcG9sZV9hbmRfZmlzaCc6J1xcdWQ4M2NcXHVkZmEzJyxcbiAgJ2Zpc3RfcmFpc2VkJzonXFx1MjcwYScsXG4gICdmaXN0X2xlZnQnOidcXHVkODNlXFx1ZGQxYicsXG4gICdmaXN0X3JpZ2h0JzonXFx1ZDgzZVxcdWRkMWMnLFxuICAnZmxhZ3MnOidcXHVkODNjXFx1ZGY4ZicsXG4gICdmbGFzaGxpZ2h0JzonXFx1ZDgzZFxcdWRkMjYnLFxuICAnZmxldXJfZGVfbGlzJzonXFx1MjY5Y1xcdWZlMGYnLFxuICAnZmxpZ2h0X2Fycml2YWwnOidcXHVkODNkXFx1ZGVlYycsXG4gICdmbGlnaHRfZGVwYXJ0dXJlJzonXFx1ZDgzZFxcdWRlZWInLFxuICAnZmxvcHB5X2Rpc2snOidcXHVkODNkXFx1ZGNiZScsXG4gICdmbG93ZXJfcGxheWluZ19jYXJkcyc6J1xcdWQ4M2NcXHVkZmI0JyxcbiAgJ2ZsdXNoZWQnOidcXHVkODNkXFx1ZGUzMycsXG4gICdmb2cnOidcXHVkODNjXFx1ZGYyYicsXG4gICdmb2dneSc6J1xcdWQ4M2NcXHVkZjAxJyxcbiAgJ2Zvb3RiYWxsJzonXFx1ZDgzY1xcdWRmYzgnLFxuICAnZm9vdHByaW50cyc6J1xcdWQ4M2RcXHVkYzYzJyxcbiAgJ2ZvcmtfYW5kX2tuaWZlJzonXFx1ZDgzY1xcdWRmNzQnLFxuICAnZm91bnRhaW4nOidcXHUyNmYyXFx1ZmUwZicsXG4gICdmb3VudGFpbl9wZW4nOidcXHVkODNkXFx1ZGQ4YicsXG4gICdmb3VyX2xlYWZfY2xvdmVyJzonXFx1ZDgzY1xcdWRmNDAnLFxuICAnZm94X2ZhY2UnOidcXHVkODNlXFx1ZGQ4YScsXG4gICdmcmFtZWRfcGljdHVyZSc6J1xcdWQ4M2RcXHVkZGJjJyxcbiAgJ2ZyZWUnOidcXHVkODNjXFx1ZGQ5MycsXG4gICdmcmllZF9lZ2cnOidcXHVkODNjXFx1ZGY3MycsXG4gICdmcmllZF9zaHJpbXAnOidcXHVkODNjXFx1ZGY2NCcsXG4gICdmcmllcyc6J1xcdWQ4M2NcXHVkZjVmJyxcbiAgJ2Zyb2cnOidcXHVkODNkXFx1ZGMzOCcsXG4gICdmcm93bmluZyc6J1xcdWQ4M2RcXHVkZTI2JyxcbiAgJ2Zyb3duaW5nX2ZhY2UnOidcXHUyNjM5XFx1ZmUwZicsXG4gICdmcm93bmluZ19tYW4nOidcXHVkODNkXFx1ZGU0ZCZ6d2o7XFx1MjY0MlxcdWZlMGYnLFxuICAnZnJvd25pbmdfd29tYW4nOidcXHVkODNkXFx1ZGU0ZCcsXG4gICdtaWRkbGVfZmluZ2VyJzonXFx1ZDgzZFxcdWRkOTUnLFxuICAnZnVlbHB1bXAnOidcXHUyNmZkXFx1ZmUwZicsXG4gICdmdWxsX21vb24nOidcXHVkODNjXFx1ZGYxNScsXG4gICdmdWxsX21vb25fd2l0aF9mYWNlJzonXFx1ZDgzY1xcdWRmMWQnLFxuICAnZnVuZXJhbF91cm4nOidcXHUyNmIxXFx1ZmUwZicsXG4gICdnYW1lX2RpZSc6J1xcdWQ4M2NcXHVkZmIyJyxcbiAgJ2dlYXInOidcXHUyNjk5XFx1ZmUwZicsXG4gICdnZW0nOidcXHVkODNkXFx1ZGM4ZScsXG4gICdnZW1pbmknOidcXHUyNjRhXFx1ZmUwZicsXG4gICdnaG9zdCc6J1xcdWQ4M2RcXHVkYzdiJyxcbiAgJ2dpZnQnOidcXHVkODNjXFx1ZGY4MScsXG4gICdnaWZ0X2hlYXJ0JzonXFx1ZDgzZFxcdWRjOWQnLFxuICAnZ2lybCc6J1xcdWQ4M2RcXHVkYzY3JyxcbiAgJ2dsb2JlX3dpdGhfbWVyaWRpYW5zJzonXFx1ZDgzY1xcdWRmMTAnLFxuICAnZ29hbF9uZXQnOidcXHVkODNlXFx1ZGQ0NScsXG4gICdnb2F0JzonXFx1ZDgzZFxcdWRjMTAnLFxuICAnZ29sZic6J1xcdTI2ZjNcXHVmZTBmJyxcbiAgJ2dvbGZpbmdfbWFuJzonXFx1ZDgzY1xcdWRmY2NcXHVmZTBmJyxcbiAgJ2dvbGZpbmdfd29tYW4nOidcXHVkODNjXFx1ZGZjY1xcdWZlMGYmendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ2dvcmlsbGEnOidcXHVkODNlXFx1ZGQ4ZCcsXG4gICdncmFwZXMnOidcXHVkODNjXFx1ZGY0NycsXG4gICdncmVlbl9hcHBsZSc6J1xcdWQ4M2NcXHVkZjRmJyxcbiAgJ2dyZWVuX2Jvb2snOidcXHVkODNkXFx1ZGNkNycsXG4gICdncmVlbl9oZWFydCc6J1xcdWQ4M2RcXHVkYzlhJyxcbiAgJ2dyZWVuX3NhbGFkJzonXFx1ZDgzZVxcdWRkNTcnLFxuICAnZ3JleV9leGNsYW1hdGlvbic6J1xcdTI3NTUnLFxuICAnZ3JleV9xdWVzdGlvbic6J1xcdTI3NTQnLFxuICAnZ3JpbWFjaW5nJzonXFx1ZDgzZFxcdWRlMmMnLFxuICAnZ3Jpbic6J1xcdWQ4M2RcXHVkZTAxJyxcbiAgJ2dyaW5uaW5nJzonXFx1ZDgzZFxcdWRlMDAnLFxuICAnZ3VhcmRzbWFuJzonXFx1ZDgzZFxcdWRjODInLFxuICAnZ3VhcmRzd29tYW4nOidcXHVkODNkXFx1ZGM4MiZ6d2o7XFx1MjY0MFxcdWZlMGYnLFxuICAnZ3VpdGFyJzonXFx1ZDgzY1xcdWRmYjgnLFxuICAnZ3VuJzonXFx1ZDgzZFxcdWRkMmInLFxuICAnaGFpcmN1dF93b21hbic6J1xcdWQ4M2RcXHVkYzg3JyxcbiAgJ2hhaXJjdXRfbWFuJzonXFx1ZDgzZFxcdWRjODcmendqO1xcdTI2NDJcXHVmZTBmJyxcbiAgJ2hhbWJ1cmdlcic6J1xcdWQ4M2NcXHVkZjU0JyxcbiAgJ2hhbW1lcic6J1xcdWQ4M2RcXHVkZDI4JyxcbiAgJ2hhbW1lcl9hbmRfcGljayc6J1xcdTI2OTInLFxuICAnaGFtbWVyX2FuZF93cmVuY2gnOidcXHVkODNkXFx1ZGVlMCcsXG4gICdoYW1zdGVyJzonXFx1ZDgzZFxcdWRjMzknLFxuICAnaGFuZCc6J1xcdTI3MGInLFxuICAnaGFuZGJhZyc6J1xcdWQ4M2RcXHVkYzVjJyxcbiAgJ2hhbmRzaGFrZSc6J1xcdWQ4M2VcXHVkZDFkJyxcbiAgJ2hhbmtleSc6J1xcdWQ4M2RcXHVkY2E5JyxcbiAgJ2hhdGNoZWRfY2hpY2snOidcXHVkODNkXFx1ZGMyNScsXG4gICdoYXRjaGluZ19jaGljayc6J1xcdWQ4M2RcXHVkYzIzJyxcbiAgJ2hlYWRwaG9uZXMnOidcXHVkODNjXFx1ZGZhNycsXG4gICdoZWFyX25vX2V2aWwnOidcXHVkODNkXFx1ZGU0OScsXG4gICdoZWFydCc6J1xcdTI3NjRcXHVmZTBmJyxcbiAgJ2hlYXJ0X2RlY29yYXRpb24nOidcXHVkODNkXFx1ZGM5ZicsXG4gICdoZWFydF9leWVzJzonXFx1ZDgzZFxcdWRlMGQnLFxuICAnaGVhcnRfZXllc19jYXQnOidcXHVkODNkXFx1ZGUzYicsXG4gICdoZWFydGJlYXQnOidcXHVkODNkXFx1ZGM5MycsXG4gICdoZWFydHB1bHNlJzonXFx1ZDgzZFxcdWRjOTcnLFxuICAnaGVhcnRzJzonXFx1MjY2NVxcdWZlMGYnLFxuICAnaGVhdnlfY2hlY2tfbWFyayc6J1xcdTI3MTRcXHVmZTBmJyxcbiAgJ2hlYXZ5X2RpdmlzaW9uX3NpZ24nOidcXHUyNzk3JyxcbiAgJ2hlYXZ5X2RvbGxhcl9zaWduJzonXFx1ZDgzZFxcdWRjYjInLFxuICAnaGVhdnlfaGVhcnRfZXhjbGFtYXRpb24nOidcXHUyNzYzXFx1ZmUwZicsXG4gICdoZWF2eV9taW51c19zaWduJzonXFx1Mjc5NicsXG4gICdoZWF2eV9tdWx0aXBsaWNhdGlvbl94JzonXFx1MjcxNlxcdWZlMGYnLFxuICAnaGVhdnlfcGx1c19zaWduJzonXFx1Mjc5NScsXG4gICdoZWxpY29wdGVyJzonXFx1ZDgzZFxcdWRlODEnLFxuICAnaGVyYic6J1xcdWQ4M2NcXHVkZjNmJyxcbiAgJ2hpYmlzY3VzJzonXFx1ZDgzY1xcdWRmM2EnLFxuICAnaGlnaF9icmlnaHRuZXNzJzonXFx1ZDgzZFxcdWRkMDYnLFxuICAnaGlnaF9oZWVsJzonXFx1ZDgzZFxcdWRjNjAnLFxuICAnaG9jaG8nOidcXHVkODNkXFx1ZGQyYScsXG4gICdob2xlJzonXFx1ZDgzZFxcdWRkNzMnLFxuICAnaG9uZXlfcG90JzonXFx1ZDgzY1xcdWRmNmYnLFxuICAnaG9yc2UnOidcXHVkODNkXFx1ZGMzNCcsXG4gICdob3JzZV9yYWNpbmcnOidcXHVkODNjXFx1ZGZjNycsXG4gICdob3NwaXRhbCc6J1xcdWQ4M2NcXHVkZmU1JyxcbiAgJ2hvdF9wZXBwZXInOidcXHVkODNjXFx1ZGYzNicsXG4gICdob3Rkb2cnOidcXHVkODNjXFx1ZGYyZCcsXG4gICdob3RlbCc6J1xcdWQ4M2NcXHVkZmU4JyxcbiAgJ2hvdHNwcmluZ3MnOidcXHUyNjY4XFx1ZmUwZicsXG4gICdob3VyZ2xhc3MnOidcXHUyMzFiXFx1ZmUwZicsXG4gICdob3VyZ2xhc3NfZmxvd2luZ19zYW5kJzonXFx1MjNmMycsXG4gICdob3VzZSc6J1xcdWQ4M2NcXHVkZmUwJyxcbiAgJ2hvdXNlX3dpdGhfZ2FyZGVuJzonXFx1ZDgzY1xcdWRmZTEnLFxuICAnaG91c2VzJzonXFx1ZDgzY1xcdWRmZDgnLFxuICAnaHVncyc6J1xcdWQ4M2VcXHVkZDE3JyxcbiAgJ2h1c2hlZCc6J1xcdWQ4M2RcXHVkZTJmJyxcbiAgJ2ljZV9jcmVhbSc6J1xcdWQ4M2NcXHVkZjY4JyxcbiAgJ2ljZV9ob2NrZXknOidcXHVkODNjXFx1ZGZkMicsXG4gICdpY2Vfc2thdGUnOidcXHUyNmY4JyxcbiAgJ2ljZWNyZWFtJzonXFx1ZDgzY1xcdWRmNjYnLFxuICAnaWQnOidcXHVkODNjXFx1ZGQ5NCcsXG4gICdpZGVvZ3JhcGhfYWR2YW50YWdlJzonXFx1ZDgzY1xcdWRlNTAnLFxuICAnaW1wJzonXFx1ZDgzZFxcdWRjN2YnLFxuICAnaW5ib3hfdHJheSc6J1xcdWQ4M2RcXHVkY2U1JyxcbiAgJ2luY29taW5nX2VudmVsb3BlJzonXFx1ZDgzZFxcdWRjZTgnLFxuICAndGlwcGluZ19oYW5kX3dvbWFuJzonXFx1ZDgzZFxcdWRjODEnLFxuICAnaW5mb3JtYXRpb25fc291cmNlJzonXFx1MjEzOVxcdWZlMGYnLFxuICAnaW5ub2NlbnQnOidcXHVkODNkXFx1ZGUwNycsXG4gICdpbnRlcnJvYmFuZyc6J1xcdTIwNDlcXHVmZTBmJyxcbiAgJ2lwaG9uZSc6J1xcdWQ4M2RcXHVkY2YxJyxcbiAgJ2l6YWtheWFfbGFudGVybic6J1xcdWQ4M2NcXHVkZmVlJyxcbiAgJ2phY2tfb19sYW50ZXJuJzonXFx1ZDgzY1xcdWRmODMnLFxuICAnamFwYW4nOidcXHVkODNkXFx1ZGRmZScsXG4gICdqYXBhbmVzZV9jYXN0bGUnOidcXHVkODNjXFx1ZGZlZicsXG4gICdqYXBhbmVzZV9nb2JsaW4nOidcXHVkODNkXFx1ZGM3YScsXG4gICdqYXBhbmVzZV9vZ3JlJzonXFx1ZDgzZFxcdWRjNzknLFxuICAnamVhbnMnOidcXHVkODNkXFx1ZGM1NicsXG4gICdqb3knOidcXHVkODNkXFx1ZGUwMicsXG4gICdqb3lfY2F0JzonXFx1ZDgzZFxcdWRlMzknLFxuICAnam95c3RpY2snOidcXHVkODNkXFx1ZGQ3OScsXG4gICdrYWFiYSc6J1xcdWQ4M2RcXHVkZDRiJyxcbiAgJ2tleSc6J1xcdWQ4M2RcXHVkZDExJyxcbiAgJ2tleWJvYXJkJzonXFx1MjMyOFxcdWZlMGYnLFxuICAna2V5Y2FwX3Rlbic6J1xcdWQ4M2RcXHVkZDFmJyxcbiAgJ2tpY2tfc2Nvb3Rlcic6J1xcdWQ4M2RcXHVkZWY0JyxcbiAgJ2tpbW9ubyc6J1xcdWQ4M2RcXHVkYzU4JyxcbiAgJ2tpc3MnOidcXHVkODNkXFx1ZGM4YicsXG4gICdraXNzaW5nJzonXFx1ZDgzZFxcdWRlMTcnLFxuICAna2lzc2luZ19jYXQnOidcXHVkODNkXFx1ZGUzZCcsXG4gICdraXNzaW5nX2Nsb3NlZF9leWVzJzonXFx1ZDgzZFxcdWRlMWEnLFxuICAna2lzc2luZ19oZWFydCc6J1xcdWQ4M2RcXHVkZTE4JyxcbiAgJ2tpc3Npbmdfc21pbGluZ19leWVzJzonXFx1ZDgzZFxcdWRlMTknLFxuICAna2l3aV9mcnVpdCc6J1xcdWQ4M2VcXHVkZDVkJyxcbiAgJ2tvYWxhJzonXFx1ZDgzZFxcdWRjMjgnLFxuICAna29rbyc6J1xcdWQ4M2NcXHVkZTAxJyxcbiAgJ2xhYmVsJzonXFx1ZDgzY1xcdWRmZjcnLFxuICAnbGFyZ2VfYmx1ZV9jaXJjbGUnOidcXHVkODNkXFx1ZGQzNScsXG4gICdsYXJnZV9ibHVlX2RpYW1vbmQnOidcXHVkODNkXFx1ZGQzNycsXG4gICdsYXJnZV9vcmFuZ2VfZGlhbW9uZCc6J1xcdWQ4M2RcXHVkZDM2JyxcbiAgJ2xhc3RfcXVhcnRlcl9tb29uJzonXFx1ZDgzY1xcdWRmMTcnLFxuICAnbGFzdF9xdWFydGVyX21vb25fd2l0aF9mYWNlJzonXFx1ZDgzY1xcdWRmMWMnLFxuICAnbGF0aW5fY3Jvc3MnOidcXHUyNzFkXFx1ZmUwZicsXG4gICdsYXVnaGluZyc6J1xcdWQ4M2RcXHVkZTA2JyxcbiAgJ2xlYXZlcyc6J1xcdWQ4M2NcXHVkZjQzJyxcbiAgJ2xlZGdlcic6J1xcdWQ4M2RcXHVkY2QyJyxcbiAgJ2xlZnRfbHVnZ2FnZSc6J1xcdWQ4M2RcXHVkZWM1JyxcbiAgJ2xlZnRfcmlnaHRfYXJyb3cnOidcXHUyMTk0XFx1ZmUwZicsXG4gICdsZWZ0d2FyZHNfYXJyb3dfd2l0aF9ob29rJzonXFx1MjFhOVxcdWZlMGYnLFxuICAnbGVtb24nOidcXHVkODNjXFx1ZGY0YicsXG4gICdsZW8nOidcXHUyNjRjXFx1ZmUwZicsXG4gICdsZW9wYXJkJzonXFx1ZDgzZFxcdWRjMDYnLFxuICAnbGV2ZWxfc2xpZGVyJzonXFx1ZDgzY1xcdWRmOWEnLFxuICAnbGlicmEnOidcXHUyNjRlXFx1ZmUwZicsXG4gICdsaWdodF9yYWlsJzonXFx1ZDgzZFxcdWRlODgnLFxuICAnbGluayc6J1xcdWQ4M2RcXHVkZDE3JyxcbiAgJ2xpb24nOidcXHVkODNlXFx1ZGQ4MScsXG4gICdsaXBzJzonXFx1ZDgzZFxcdWRjNDQnLFxuICAnbGlwc3RpY2snOidcXHVkODNkXFx1ZGM4NCcsXG4gICdsaXphcmQnOidcXHVkODNlXFx1ZGQ4ZScsXG4gICdsb2NrJzonXFx1ZDgzZFxcdWRkMTInLFxuICAnbG9ja193aXRoX2lua19wZW4nOidcXHVkODNkXFx1ZGQwZicsXG4gICdsb2xsaXBvcCc6J1xcdWQ4M2NcXHVkZjZkJyxcbiAgJ2xvb3AnOidcXHUyN2JmJyxcbiAgJ2xvdWRfc291bmQnOidcXHVkODNkXFx1ZGQwYScsXG4gICdsb3Vkc3BlYWtlcic6J1xcdWQ4M2RcXHVkY2UyJyxcbiAgJ2xvdmVfaG90ZWwnOidcXHVkODNjXFx1ZGZlOScsXG4gICdsb3ZlX2xldHRlcic6J1xcdWQ4M2RcXHVkYzhjJyxcbiAgJ2xvd19icmlnaHRuZXNzJzonXFx1ZDgzZFxcdWRkMDUnLFxuICAnbHlpbmdfZmFjZSc6J1xcdWQ4M2VcXHVkZDI1JyxcbiAgJ20nOidcXHUyNGMyXFx1ZmUwZicsXG4gICdtYWcnOidcXHVkODNkXFx1ZGQwZCcsXG4gICdtYWdfcmlnaHQnOidcXHVkODNkXFx1ZGQwZScsXG4gICdtYWhqb25nJzonXFx1ZDgzY1xcdWRjMDRcXHVmZTBmJyxcbiAgJ21haWxib3gnOidcXHVkODNkXFx1ZGNlYicsXG4gICdtYWlsYm94X2Nsb3NlZCc6J1xcdWQ4M2RcXHVkY2VhJyxcbiAgJ21haWxib3hfd2l0aF9tYWlsJzonXFx1ZDgzZFxcdWRjZWMnLFxuICAnbWFpbGJveF93aXRoX25vX21haWwnOidcXHVkODNkXFx1ZGNlZCcsXG4gICdtYW4nOidcXHVkODNkXFx1ZGM2OCcsXG4gICdtYW5fYXJ0aXN0JzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2NcXHVkZmE4JyxcbiAgJ21hbl9hc3Ryb25hdXQnOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzZFxcdWRlODAnLFxuICAnbWFuX2NhcnR3aGVlbGluZyc6J1xcdWQ4M2VcXHVkZDM4Jnp3ajtcXHUyNjQyXFx1ZmUwZicsXG4gICdtYW5fY29vayc6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNjXFx1ZGY3MycsXG4gICdtYW5fZGFuY2luZyc6J1xcdWQ4M2RcXHVkZDdhJyxcbiAgJ21hbl9mYWNlcGFsbWluZyc6J1xcdWQ4M2VcXHVkZDI2Jnp3ajtcXHUyNjQyXFx1ZmUwZicsXG4gICdtYW5fZmFjdG9yeV93b3JrZXInOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzY1xcdWRmZWQnLFxuICAnbWFuX2Zhcm1lcic6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHVkODNjXFx1ZGYzZScsXG4gICdtYW5fZmlyZWZpZ2h0ZXInOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzZFxcdWRlOTInLFxuICAnbWFuX2hlYWx0aF93b3JrZXInOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1MjY5NVxcdWZlMGYnLFxuICAnbWFuX2luX3R1eGVkbyc6J1xcdWQ4M2VcXHVkZDM1JyxcbiAgJ21hbl9qdWRnZSc6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHUyNjk2XFx1ZmUwZicsXG4gICdtYW5fanVnZ2xpbmcnOidcXHVkODNlXFx1ZGQzOSZ6d2o7XFx1MjY0MlxcdWZlMGYnLFxuICAnbWFuX21lY2hhbmljJzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2RcXHVkZDI3JyxcbiAgJ21hbl9vZmZpY2Vfd29ya2VyJzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2RcXHVkY2JjJyxcbiAgJ21hbl9waWxvdCc6J1xcdWQ4M2RcXHVkYzY4Jnp3ajtcXHUyNzA4XFx1ZmUwZicsXG4gICdtYW5fcGxheWluZ19oYW5kYmFsbCc6J1xcdWQ4M2VcXHVkZDNlJnp3ajtcXHUyNjQyXFx1ZmUwZicsXG4gICdtYW5fcGxheWluZ193YXRlcl9wb2xvJzonXFx1ZDgzZVxcdWRkM2QmendqO1xcdTI2NDJcXHVmZTBmJyxcbiAgJ21hbl9zY2llbnRpc3QnOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzZFxcdWRkMmMnLFxuICAnbWFuX3NocnVnZ2luZyc6J1xcdWQ4M2VcXHVkZDM3Jnp3ajtcXHUyNjQyXFx1ZmUwZicsXG4gICdtYW5fc2luZ2VyJzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2NcXHVkZmE0JyxcbiAgJ21hbl9zdHVkZW50JzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2NcXHVkZjkzJyxcbiAgJ21hbl90ZWFjaGVyJzonXFx1ZDgzZFxcdWRjNjgmendqO1xcdWQ4M2NcXHVkZmViJyxcbiAgJ21hbl90ZWNobm9sb2dpc3QnOidcXHVkODNkXFx1ZGM2OCZ6d2o7XFx1ZDgzZFxcdWRjYmInLFxuICAnbWFuX3dpdGhfZ3VhX3BpX21hbyc6J1xcdWQ4M2RcXHVkYzcyJyxcbiAgJ21hbl93aXRoX3R1cmJhbic6J1xcdWQ4M2RcXHVkYzczJyxcbiAgJ3RhbmdlcmluZSc6J1xcdWQ4M2NcXHVkZjRhJyxcbiAgJ21hbnNfc2hvZSc6J1xcdWQ4M2RcXHVkYzVlJyxcbiAgJ21hbnRlbHBpZWNlX2Nsb2NrJzonXFx1ZDgzZFxcdWRkNzAnLFxuICAnbWFwbGVfbGVhZic6J1xcdWQ4M2NcXHVkZjQxJyxcbiAgJ21hcnRpYWxfYXJ0c191bmlmb3JtJzonXFx1ZDgzZVxcdWRkNGInLFxuICAnbWFzayc6J1xcdWQ4M2RcXHVkZTM3JyxcbiAgJ21hc3NhZ2Vfd29tYW4nOidcXHVkODNkXFx1ZGM4NicsXG4gICdtYXNzYWdlX21hbic6J1xcdWQ4M2RcXHVkYzg2Jnp3ajtcXHUyNjQyXFx1ZmUwZicsXG4gICdtZWF0X29uX2JvbmUnOidcXHVkODNjXFx1ZGY1NicsXG4gICdtZWRhbF9taWxpdGFyeSc6J1xcdWQ4M2NcXHVkZjk2JyxcbiAgJ21lZGFsX3Nwb3J0cyc6J1xcdWQ4M2NcXHVkZmM1JyxcbiAgJ21lZ2EnOidcXHVkODNkXFx1ZGNlMycsXG4gICdtZWxvbic6J1xcdWQ4M2NcXHVkZjQ4JyxcbiAgJ21lbW8nOidcXHVkODNkXFx1ZGNkZCcsXG4gICdtZW5fd3Jlc3RsaW5nJzonXFx1ZDgzZVxcdWRkM2MmendqO1xcdTI2NDJcXHVmZTBmJyxcbiAgJ21lbm9yYWgnOidcXHVkODNkXFx1ZGQ0ZScsXG4gICdtZW5zJzonXFx1ZDgzZFxcdWRlYjknLFxuICAnbWV0YWwnOidcXHVkODNlXFx1ZGQxOCcsXG4gICdtZXRybyc6J1xcdWQ4M2RcXHVkZTg3JyxcbiAgJ21pY3JvcGhvbmUnOidcXHVkODNjXFx1ZGZhNCcsXG4gICdtaWNyb3Njb3BlJzonXFx1ZDgzZFxcdWRkMmMnLFxuICAnbWlsa19nbGFzcyc6J1xcdWQ4M2VcXHVkZDViJyxcbiAgJ21pbGt5X3dheSc6J1xcdWQ4M2NcXHVkZjBjJyxcbiAgJ21pbmlidXMnOidcXHVkODNkXFx1ZGU5MCcsXG4gICdtaW5pZGlzYyc6J1xcdWQ4M2RcXHVkY2JkJyxcbiAgJ21vYmlsZV9waG9uZV9vZmYnOidcXHVkODNkXFx1ZGNmNCcsXG4gICdtb25leV9tb3V0aF9mYWNlJzonXFx1ZDgzZVxcdWRkMTEnLFxuICAnbW9uZXlfd2l0aF93aW5ncyc6J1xcdWQ4M2RcXHVkY2I4JyxcbiAgJ21vbmV5YmFnJzonXFx1ZDgzZFxcdWRjYjAnLFxuICAnbW9ua2V5JzonXFx1ZDgzZFxcdWRjMTInLFxuICAnbW9ua2V5X2ZhY2UnOidcXHVkODNkXFx1ZGMzNScsXG4gICdtb25vcmFpbCc6J1xcdWQ4M2RcXHVkZTlkJyxcbiAgJ21vb24nOidcXHVkODNjXFx1ZGYxNCcsXG4gICdtb3J0YXJfYm9hcmQnOidcXHVkODNjXFx1ZGY5MycsXG4gICdtb3NxdWUnOidcXHVkODNkXFx1ZGQ0YycsXG4gICdtb3Rvcl9ib2F0JzonXFx1ZDgzZFxcdWRlZTUnLFxuICAnbW90b3Jfc2Nvb3Rlcic6J1xcdWQ4M2RcXHVkZWY1JyxcbiAgJ21vdG9yY3ljbGUnOidcXHVkODNjXFx1ZGZjZCcsXG4gICdtb3RvcndheSc6J1xcdWQ4M2RcXHVkZWUzJyxcbiAgJ21vdW50X2Z1amknOidcXHVkODNkXFx1ZGRmYicsXG4gICdtb3VudGFpbic6J1xcdTI2ZjAnLFxuICAnbW91bnRhaW5fYmlraW5nX21hbic6J1xcdWQ4M2RcXHVkZWI1JyxcbiAgJ21vdW50YWluX2Jpa2luZ193b21hbic6J1xcdWQ4M2RcXHVkZWI1Jnp3ajtcXHUyNjQwXFx1ZmUwZicsXG4gICdtb3VudGFpbl9jYWJsZXdheSc6J1xcdWQ4M2RcXHVkZWEwJyxcbiAgJ21vdW50YWluX3JhaWx3YXknOidcXHVkODNkXFx1ZGU5ZScsXG4gICdtb3VudGFpbl9zbm93JzonXFx1ZDgzY1xcdWRmZDQnLFxuICAnbW91c2UnOidcXHVkODNkXFx1ZGMyZCcsXG4gICdtb3VzZTInOidcXHVkODNkXFx1ZGMwMScsXG4gICdtb3ZpZV9jYW1lcmEnOidcXHVkODNjXFx1ZGZhNScsXG4gICdtb3lhaSc6J1xcdWQ4M2RcXHVkZGZmJyxcbiAgJ21yc19jbGF1cyc6J1xcdWQ4M2VcXHVkZDM2JyxcbiAgJ211c2NsZSc6J1xcdWQ4M2RcXHVkY2FhJyxcbiAgJ211c2hyb29tJzonXFx1ZDgzY1xcdWRmNDQnLFxuICAnbXVzaWNhbF9rZXlib2FyZCc6J1xcdWQ4M2NcXHVkZmI5JyxcbiAgJ211c2ljYWxfbm90ZSc6J1xcdWQ4M2NcXHVkZmI1JyxcbiAgJ211c2ljYWxfc2NvcmUnOidcXHVkODNjXFx1ZGZiYycsXG4gICdtdXRlJzonXFx1ZDgzZFxcdWRkMDcnLFxuICAnbmFpbF9jYXJlJzonXFx1ZDgzZFxcdWRjODUnLFxuICAnbmFtZV9iYWRnZSc6J1xcdWQ4M2RcXHVkY2RiJyxcbiAgJ25hdGlvbmFsX3BhcmsnOidcXHVkODNjXFx1ZGZkZScsXG4gICduYXVzZWF0ZWRfZmFjZSc6J1xcdWQ4M2VcXHVkZDIyJyxcbiAgJ25lY2t0aWUnOidcXHVkODNkXFx1ZGM1NCcsXG4gICduZWdhdGl2ZV9zcXVhcmVkX2Nyb3NzX21hcmsnOidcXHUyNzRlJyxcbiAgJ25lcmRfZmFjZSc6J1xcdWQ4M2VcXHVkZDEzJyxcbiAgJ25ldXRyYWxfZmFjZSc6J1xcdWQ4M2RcXHVkZTEwJyxcbiAgJ25ldyc6J1xcdWQ4M2NcXHVkZDk1JyxcbiAgJ25ld19tb29uJzonXFx1ZDgzY1xcdWRmMTEnLFxuICAnbmV3X21vb25fd2l0aF9mYWNlJzonXFx1ZDgzY1xcdWRmMWEnLFxuICAnbmV3c3BhcGVyJzonXFx1ZDgzZFxcdWRjZjAnLFxuICAnbmV3c3BhcGVyX3JvbGwnOidcXHVkODNkXFx1ZGRkZScsXG4gICduZXh0X3RyYWNrX2J1dHRvbic6J1xcdTIzZWQnLFxuICAnbmcnOidcXHVkODNjXFx1ZGQ5NicsXG4gICdub19nb29kX21hbic6J1xcdWQ4M2RcXHVkZTQ1Jnp3ajtcXHUyNjQyXFx1ZmUwZicsXG4gICdub19nb29kX3dvbWFuJzonXFx1ZDgzZFxcdWRlNDUnLFxuICAnbmlnaHRfd2l0aF9zdGFycyc6J1xcdWQ4M2NcXHVkZjAzJyxcbiAgJ25vX2JlbGwnOidcXHVkODNkXFx1ZGQxNScsXG4gICdub19iaWN5Y2xlcyc6J1xcdWQ4M2RcXHVkZWIzJyxcbiAgJ25vX2VudHJ5JzonXFx1MjZkNFxcdWZlMGYnLFxuICAnbm9fZW50cnlfc2lnbic6J1xcdWQ4M2RcXHVkZWFiJyxcbiAgJ25vX21vYmlsZV9waG9uZXMnOidcXHVkODNkXFx1ZGNmNScsXG4gICdub19tb3V0aCc6J1xcdWQ4M2RcXHVkZTM2JyxcbiAgJ25vX3BlZGVzdHJpYW5zJzonXFx1ZDgzZFxcdWRlYjcnLFxuICAnbm9fc21va2luZyc6J1xcdWQ4M2RcXHVkZWFkJyxcbiAgJ25vbi1wb3RhYmxlX3dhdGVyJzonXFx1ZDgzZFxcdWRlYjEnLFxuICAnbm9zZSc6J1xcdWQ4M2RcXHVkYzQzJyxcbiAgJ25vdGVib29rJzonXFx1ZDgzZFxcdWRjZDMnLFxuICAnbm90ZWJvb2tfd2l0aF9kZWNvcmF0aXZlX2NvdmVyJzonXFx1ZDgzZFxcdWRjZDQnLFxuICAnbm90ZXMnOidcXHVkODNjXFx1ZGZiNicsXG4gICdudXRfYW5kX2JvbHQnOidcXHVkODNkXFx1ZGQyOScsXG4gICdvJzonXFx1MmI1NVxcdWZlMGYnLFxuICAnbzInOidcXHVkODNjXFx1ZGQ3ZVxcdWZlMGYnLFxuICAnb2NlYW4nOidcXHVkODNjXFx1ZGYwYScsXG4gICdvY3RvcHVzJzonXFx1ZDgzZFxcdWRjMTknLFxuICAnb2Rlbic6J1xcdWQ4M2NcXHVkZjYyJyxcbiAgJ29mZmljZSc6J1xcdWQ4M2NcXHVkZmUyJyxcbiAgJ29pbF9kcnVtJzonXFx1ZDgzZFxcdWRlZTInLFxuICAnb2snOidcXHVkODNjXFx1ZGQ5NycsXG4gICdva19oYW5kJzonXFx1ZDgzZFxcdWRjNGMnLFxuICAnb2tfbWFuJzonXFx1ZDgzZFxcdWRlNDYmendqO1xcdTI2NDJcXHVmZTBmJyxcbiAgJ29rX3dvbWFuJzonXFx1ZDgzZFxcdWRlNDYnLFxuICAnb2xkX2tleSc6J1xcdWQ4M2RcXHVkZGRkJyxcbiAgJ29sZGVyX21hbic6J1xcdWQ4M2RcXHVkYzc0JyxcbiAgJ29sZGVyX3dvbWFuJzonXFx1ZDgzZFxcdWRjNzUnLFxuICAnb20nOidcXHVkODNkXFx1ZGQ0OScsXG4gICdvbic6J1xcdWQ4M2RcXHVkZDFiJyxcbiAgJ29uY29taW5nX2F1dG9tb2JpbGUnOidcXHVkODNkXFx1ZGU5OCcsXG4gICdvbmNvbWluZ19idXMnOidcXHVkODNkXFx1ZGU4ZCcsXG4gICdvbmNvbWluZ19wb2xpY2VfY2FyJzonXFx1ZDgzZFxcdWRlOTQnLFxuICAnb25jb21pbmdfdGF4aSc6J1xcdWQ4M2RcXHVkZTk2JyxcbiAgJ29wZW5fZmlsZV9mb2xkZXInOidcXHVkODNkXFx1ZGNjMicsXG4gICdvcGVuX2hhbmRzJzonXFx1ZDgzZFxcdWRjNTAnLFxuICAnb3Blbl9tb3V0aCc6J1xcdWQ4M2RcXHVkZTJlJyxcbiAgJ29wZW5fdW1icmVsbGEnOidcXHUyNjAyXFx1ZmUwZicsXG4gICdvcGhpdWNodXMnOidcXHUyNmNlJyxcbiAgJ29yYW5nZV9ib29rJzonXFx1ZDgzZFxcdWRjZDknLFxuICAnb3J0aG9kb3hfY3Jvc3MnOidcXHUyNjI2XFx1ZmUwZicsXG4gICdvdXRib3hfdHJheSc6J1xcdWQ4M2RcXHVkY2U0JyxcbiAgJ293bCc6J1xcdWQ4M2VcXHVkZDg5JyxcbiAgJ294JzonXFx1ZDgzZFxcdWRjMDInLFxuICAncGFja2FnZSc6J1xcdWQ4M2RcXHVkY2U2JyxcbiAgJ3BhZ2VfZmFjaW5nX3VwJzonXFx1ZDgzZFxcdWRjYzQnLFxuICAncGFnZV93aXRoX2N1cmwnOidcXHVkODNkXFx1ZGNjMycsXG4gICdwYWdlcic6J1xcdWQ4M2RcXHVkY2RmJyxcbiAgJ3BhaW50YnJ1c2gnOidcXHVkODNkXFx1ZGQ4YycsXG4gICdwYWxtX3RyZWUnOidcXHVkODNjXFx1ZGYzNCcsXG4gICdwYW5jYWtlcyc6J1xcdWQ4M2VcXHVkZDVlJyxcbiAgJ3BhbmRhX2ZhY2UnOidcXHVkODNkXFx1ZGMzYycsXG4gICdwYXBlcmNsaXAnOidcXHVkODNkXFx1ZGNjZScsXG4gICdwYXBlcmNsaXBzJzonXFx1ZDgzZFxcdWRkODcnLFxuICAncGFyYXNvbF9vbl9ncm91bmQnOidcXHUyNmYxJyxcbiAgJ3BhcmtpbmcnOidcXHVkODNjXFx1ZGQ3ZlxcdWZlMGYnLFxuICAncGFydF9hbHRlcm5hdGlvbl9tYXJrJzonXFx1MzAzZFxcdWZlMGYnLFxuICAncGFydGx5X3N1bm55JzonXFx1MjZjNVxcdWZlMGYnLFxuICAncGFzc2VuZ2VyX3NoaXAnOidcXHVkODNkXFx1ZGVmMycsXG4gICdwYXNzcG9ydF9jb250cm9sJzonXFx1ZDgzZFxcdWRlYzInLFxuICAncGF1c2VfYnV0dG9uJzonXFx1MjNmOCcsXG4gICdwZWFjZV9zeW1ib2wnOidcXHUyNjJlXFx1ZmUwZicsXG4gICdwZWFjaCc6J1xcdWQ4M2NcXHVkZjUxJyxcbiAgJ3BlYW51dHMnOidcXHVkODNlXFx1ZGQ1YycsXG4gICdwZWFyJzonXFx1ZDgzY1xcdWRmNTAnLFxuICAncGVuJzonXFx1ZDgzZFxcdWRkOGEnLFxuICAncGVuY2lsMic6J1xcdTI3MGZcXHVmZTBmJyxcbiAgJ3Blbmd1aW4nOidcXHVkODNkXFx1ZGMyNycsXG4gICdwZW5zaXZlJzonXFx1ZDgzZFxcdWRlMTQnLFxuICAncGVyZm9ybWluZ19hcnRzJzonXFx1ZDgzY1xcdWRmYWQnLFxuICAncGVyc2V2ZXJlJzonXFx1ZDgzZFxcdWRlMjMnLFxuICAncGVyc29uX2ZlbmNpbmcnOidcXHVkODNlXFx1ZGQzYScsXG4gICdwb3V0aW5nX3dvbWFuJzonXFx1ZDgzZFxcdWRlNGUnLFxuICAncGhvbmUnOidcXHUyNjBlXFx1ZmUwZicsXG4gICdwaWNrJzonXFx1MjZjZicsXG4gICdwaWcnOidcXHVkODNkXFx1ZGMzNycsXG4gICdwaWcyJzonXFx1ZDgzZFxcdWRjMTYnLFxuICAncGlnX25vc2UnOidcXHVkODNkXFx1ZGMzZCcsXG4gICdwaWxsJzonXFx1ZDgzZFxcdWRjOGEnLFxuICAncGluZWFwcGxlJzonXFx1ZDgzY1xcdWRmNGQnLFxuICAncGluZ19wb25nJzonXFx1ZDgzY1xcdWRmZDMnLFxuICAncGlzY2VzJzonXFx1MjY1M1xcdWZlMGYnLFxuICAncGl6emEnOidcXHVkODNjXFx1ZGY1NScsXG4gICdwbGFjZV9vZl93b3JzaGlwJzonXFx1ZDgzZFxcdWRlZDAnLFxuICAncGxhdGVfd2l0aF9jdXRsZXJ5JzonXFx1ZDgzY1xcdWRmN2QnLFxuICAncGxheV9vcl9wYXVzZV9idXR0b24nOidcXHUyM2VmJyxcbiAgJ3BvaW50X2Rvd24nOidcXHVkODNkXFx1ZGM0NycsXG4gICdwb2ludF9sZWZ0JzonXFx1ZDgzZFxcdWRjNDgnLFxuICAncG9pbnRfcmlnaHQnOidcXHVkODNkXFx1ZGM0OScsXG4gICdwb2ludF91cCc6J1xcdTI2MWRcXHVmZTBmJyxcbiAgJ3BvaW50X3VwXzInOidcXHVkODNkXFx1ZGM0NicsXG4gICdwb2xpY2VfY2FyJzonXFx1ZDgzZFxcdWRlOTMnLFxuICAncG9saWNld29tYW4nOidcXHVkODNkXFx1ZGM2ZSZ6d2o7XFx1MjY0MFxcdWZlMGYnLFxuICAncG9vZGxlJzonXFx1ZDgzZFxcdWRjMjknLFxuICAncG9wY29ybic6J1xcdWQ4M2NcXHVkZjdmJyxcbiAgJ3Bvc3Rfb2ZmaWNlJzonXFx1ZDgzY1xcdWRmZTMnLFxuICAncG9zdGFsX2hvcm4nOidcXHVkODNkXFx1ZGNlZicsXG4gICdwb3N0Ym94JzonXFx1ZDgzZFxcdWRjZWUnLFxuICAncG90YWJsZV93YXRlcic6J1xcdWQ4M2RcXHVkZWIwJyxcbiAgJ3BvdGF0byc6J1xcdWQ4M2VcXHVkZDU0JyxcbiAgJ3BvdWNoJzonXFx1ZDgzZFxcdWRjNWQnLFxuICAncG91bHRyeV9sZWcnOidcXHVkODNjXFx1ZGY1NycsXG4gICdwb3VuZCc6J1xcdWQ4M2RcXHVkY2I3JyxcbiAgJ3JhZ2UnOidcXHVkODNkXFx1ZGUyMScsXG4gICdwb3V0aW5nX2NhdCc6J1xcdWQ4M2RcXHVkZTNlJyxcbiAgJ3BvdXRpbmdfbWFuJzonXFx1ZDgzZFxcdWRlNGUmendqO1xcdTI2NDJcXHVmZTBmJyxcbiAgJ3ByYXknOidcXHVkODNkXFx1ZGU0ZicsXG4gICdwcmF5ZXJfYmVhZHMnOidcXHVkODNkXFx1ZGNmZicsXG4gICdwcmVnbmFudF93b21hbic6J1xcdWQ4M2VcXHVkZDMwJyxcbiAgJ3ByZXZpb3VzX3RyYWNrX2J1dHRvbic6J1xcdTIzZWUnLFxuICAncHJpbmNlJzonXFx1ZDgzZVxcdWRkMzQnLFxuICAncHJpbmNlc3MnOidcXHVkODNkXFx1ZGM3OCcsXG4gICdwcmludGVyJzonXFx1ZDgzZFxcdWRkYTgnLFxuICAncHVycGxlX2hlYXJ0JzonXFx1ZDgzZFxcdWRjOWMnLFxuICAncHVyc2UnOidcXHVkODNkXFx1ZGM1YicsXG4gICdwdXNocGluJzonXFx1ZDgzZFxcdWRjY2MnLFxuICAncHV0X2xpdHRlcl9pbl9pdHNfcGxhY2UnOidcXHVkODNkXFx1ZGVhZScsXG4gICdxdWVzdGlvbic6J1xcdTI3NTMnLFxuICAncmFiYml0JzonXFx1ZDgzZFxcdWRjMzAnLFxuICAncmFiYml0Mic6J1xcdWQ4M2RcXHVkYzA3JyxcbiAgJ3JhY2Vob3JzZSc6J1xcdWQ4M2RcXHVkYzBlJyxcbiAgJ3JhY2luZ19jYXInOidcXHVkODNjXFx1ZGZjZScsXG4gICdyYWRpbyc6J1xcdWQ4M2RcXHVkY2ZiJyxcbiAgJ3JhZGlvX2J1dHRvbic6J1xcdWQ4M2RcXHVkZDE4JyxcbiAgJ3JhZGlvYWN0aXZlJzonXFx1MjYyMlxcdWZlMGYnLFxuICAncmFpbHdheV9jYXInOidcXHVkODNkXFx1ZGU4MycsXG4gICdyYWlsd2F5X3RyYWNrJzonXFx1ZDgzZFxcdWRlZTQnLFxuICAncmFpbmJvdyc6J1xcdWQ4M2NcXHVkZjA4JyxcbiAgJ3JhaW5ib3dfZmxhZyc6J1xcdWQ4M2NcXHVkZmYzXFx1ZmUwZiZ6d2o7XFx1ZDgzY1xcdWRmMDgnLFxuICAncmFpc2VkX2JhY2tfb2ZfaGFuZCc6J1xcdWQ4M2VcXHVkZDFhJyxcbiAgJ3JhaXNlZF9oYW5kX3dpdGhfZmluZ2Vyc19zcGxheWVkJzonXFx1ZDgzZFxcdWRkOTAnLFxuICAncmFpc2VkX2hhbmRzJzonXFx1ZDgzZFxcdWRlNGMnLFxuICAncmFpc2luZ19oYW5kX3dvbWFuJzonXFx1ZDgzZFxcdWRlNGInLFxuICAncmFpc2luZ19oYW5kX21hbic6J1xcdWQ4M2RcXHVkZTRiJnp3ajtcXHUyNjQyXFx1ZmUwZicsXG4gICdyYW0nOidcXHVkODNkXFx1ZGMwZicsXG4gICdyYW1lbic6J1xcdWQ4M2NcXHVkZjVjJyxcbiAgJ3JhdCc6J1xcdWQ4M2RcXHVkYzAwJyxcbiAgJ3JlY29yZF9idXR0b24nOidcXHUyM2ZhJyxcbiAgJ3JlY3ljbGUnOidcXHUyNjdiXFx1ZmUwZicsXG4gICdyZWRfY2lyY2xlJzonXFx1ZDgzZFxcdWRkMzQnLFxuICAncmVnaXN0ZXJlZCc6J1xcdTAwYWVcXHVmZTBmJyxcbiAgJ3JlbGF4ZWQnOidcXHUyNjNhXFx1ZmUwZicsXG4gICdyZWxpZXZlZCc6J1xcdWQ4M2RcXHVkZTBjJyxcbiAgJ3JlbWluZGVyX3JpYmJvbic6J1xcdWQ4M2NcXHVkZjk3JyxcbiAgJ3JlcGVhdCc6J1xcdWQ4M2RcXHVkZDAxJyxcbiAgJ3JlcGVhdF9vbmUnOidcXHVkODNkXFx1ZGQwMicsXG4gICdyZXNjdWVfd29ya2VyX2hlbG1ldCc6J1xcdTI2ZDEnLFxuICAncmVzdHJvb20nOidcXHVkODNkXFx1ZGViYicsXG4gICdyZXZvbHZpbmdfaGVhcnRzJzonXFx1ZDgzZFxcdWRjOWUnLFxuICAncmV3aW5kJzonXFx1MjNlYScsXG4gICdyaGlub2Nlcm9zJzonXFx1ZDgzZVxcdWRkOGYnLFxuICAncmliYm9uJzonXFx1ZDgzY1xcdWRmODAnLFxuICAncmljZSc6J1xcdWQ4M2NcXHVkZjVhJyxcbiAgJ3JpY2VfYmFsbCc6J1xcdWQ4M2NcXHVkZjU5JyxcbiAgJ3JpY2VfY3JhY2tlcic6J1xcdWQ4M2NcXHVkZjU4JyxcbiAgJ3JpY2Vfc2NlbmUnOidcXHVkODNjXFx1ZGY5MScsXG4gICdyaWdodF9hbmdlcl9idWJibGUnOidcXHVkODNkXFx1ZGRlZicsXG4gICdyaW5nJzonXFx1ZDgzZFxcdWRjOGQnLFxuICAncm9ib3QnOidcXHVkODNlXFx1ZGQxNicsXG4gICdyb2NrZXQnOidcXHVkODNkXFx1ZGU4MCcsXG4gICdyb2ZsJzonXFx1ZDgzZVxcdWRkMjMnLFxuICAncm9sbF9leWVzJzonXFx1ZDgzZFxcdWRlNDQnLFxuICAncm9sbGVyX2NvYXN0ZXInOidcXHVkODNjXFx1ZGZhMicsXG4gICdyb29zdGVyJzonXFx1ZDgzZFxcdWRjMTMnLFxuICAncm9zZSc6J1xcdWQ4M2NcXHVkZjM5JyxcbiAgJ3Jvc2V0dGUnOidcXHVkODNjXFx1ZGZmNScsXG4gICdyb3RhdGluZ19saWdodCc6J1xcdWQ4M2RcXHVkZWE4JyxcbiAgJ3JvdW5kX3B1c2hwaW4nOidcXHVkODNkXFx1ZGNjZCcsXG4gICdyb3dpbmdfbWFuJzonXFx1ZDgzZFxcdWRlYTMnLFxuICAncm93aW5nX3dvbWFuJzonXFx1ZDgzZFxcdWRlYTMmendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ3J1Z2J5X2Zvb3RiYWxsJzonXFx1ZDgzY1xcdWRmYzknLFxuICAncnVubmluZ19tYW4nOidcXHVkODNjXFx1ZGZjMycsXG4gICdydW5uaW5nX3NoaXJ0X3dpdGhfc2FzaCc6J1xcdWQ4M2NcXHVkZmJkJyxcbiAgJ3J1bm5pbmdfd29tYW4nOidcXHVkODNjXFx1ZGZjMyZ6d2o7XFx1MjY0MFxcdWZlMGYnLFxuICAnc2EnOidcXHVkODNjXFx1ZGUwMlxcdWZlMGYnLFxuICAnc2FnaXR0YXJpdXMnOidcXHUyNjUwXFx1ZmUwZicsXG4gICdzYWtlJzonXFx1ZDgzY1xcdWRmNzYnLFxuICAnc2FuZGFsJzonXFx1ZDgzZFxcdWRjNjEnLFxuICAnc2FudGEnOidcXHVkODNjXFx1ZGY4NScsXG4gICdzYXRlbGxpdGUnOidcXHVkODNkXFx1ZGNlMScsXG4gICdzYXhvcGhvbmUnOidcXHVkODNjXFx1ZGZiNycsXG4gICdzY2hvb2wnOidcXHVkODNjXFx1ZGZlYicsXG4gICdzY2hvb2xfc2F0Y2hlbCc6J1xcdWQ4M2NcXHVkZjkyJyxcbiAgJ3NjaXNzb3JzJzonXFx1MjcwMlxcdWZlMGYnLFxuICAnc2NvcnBpb24nOidcXHVkODNlXFx1ZGQ4MicsXG4gICdzY29ycGl1cyc6J1xcdTI2NGZcXHVmZTBmJyxcbiAgJ3NjcmVhbSc6J1xcdWQ4M2RcXHVkZTMxJyxcbiAgJ3NjcmVhbV9jYXQnOidcXHVkODNkXFx1ZGU0MCcsXG4gICdzY3JvbGwnOidcXHVkODNkXFx1ZGNkYycsXG4gICdzZWF0JzonXFx1ZDgzZFxcdWRjYmEnLFxuICAnc2VjcmV0JzonXFx1MzI5OVxcdWZlMGYnLFxuICAnc2VlX25vX2V2aWwnOidcXHVkODNkXFx1ZGU0OCcsXG4gICdzZWVkbGluZyc6J1xcdWQ4M2NcXHVkZjMxJyxcbiAgJ3NlbGZpZSc6J1xcdWQ4M2VcXHVkZDMzJyxcbiAgJ3NoYWxsb3dfcGFuX29mX2Zvb2QnOidcXHVkODNlXFx1ZGQ1OCcsXG4gICdzaGFtcm9jayc6J1xcdTI2MThcXHVmZTBmJyxcbiAgJ3NoYXJrJzonXFx1ZDgzZVxcdWRkODgnLFxuICAnc2hhdmVkX2ljZSc6J1xcdWQ4M2NcXHVkZjY3JyxcbiAgJ3NoZWVwJzonXFx1ZDgzZFxcdWRjMTEnLFxuICAnc2hlbGwnOidcXHVkODNkXFx1ZGMxYScsXG4gICdzaGllbGQnOidcXHVkODNkXFx1ZGVlMScsXG4gICdzaGludG9fc2hyaW5lJzonXFx1MjZlOScsXG4gICdzaGlwJzonXFx1ZDgzZFxcdWRlYTInLFxuICAnc2hpcnQnOidcXHVkODNkXFx1ZGM1NScsXG4gICdzaG9wcGluZyc6J1xcdWQ4M2RcXHVkZWNkJyxcbiAgJ3Nob3BwaW5nX2NhcnQnOidcXHVkODNkXFx1ZGVkMicsXG4gICdzaG93ZXInOidcXHVkODNkXFx1ZGViZicsXG4gICdzaHJpbXAnOidcXHVkODNlXFx1ZGQ5MCcsXG4gICdzaWduYWxfc3RyZW5ndGgnOidcXHVkODNkXFx1ZGNmNicsXG4gICdzaXhfcG9pbnRlZF9zdGFyJzonXFx1ZDgzZFxcdWRkMmYnLFxuICAnc2tpJzonXFx1ZDgzY1xcdWRmYmYnLFxuICAnc2tpZXInOidcXHUyNmY3JyxcbiAgJ3NrdWxsJzonXFx1ZDgzZFxcdWRjODAnLFxuICAnc2t1bGxfYW5kX2Nyb3NzYm9uZXMnOidcXHUyNjIwXFx1ZmUwZicsXG4gICdzbGVlcGluZyc6J1xcdWQ4M2RcXHVkZTM0JyxcbiAgJ3NsZWVwaW5nX2JlZCc6J1xcdWQ4M2RcXHVkZWNjJyxcbiAgJ3NsZWVweSc6J1xcdWQ4M2RcXHVkZTJhJyxcbiAgJ3NsaWdodGx5X2Zyb3duaW5nX2ZhY2UnOidcXHVkODNkXFx1ZGU0MScsXG4gICdzbGlnaHRseV9zbWlsaW5nX2ZhY2UnOidcXHVkODNkXFx1ZGU0MicsXG4gICdzbG90X21hY2hpbmUnOidcXHVkODNjXFx1ZGZiMCcsXG4gICdzbWFsbF9haXJwbGFuZSc6J1xcdWQ4M2RcXHVkZWU5JyxcbiAgJ3NtYWxsX2JsdWVfZGlhbW9uZCc6J1xcdWQ4M2RcXHVkZDM5JyxcbiAgJ3NtYWxsX29yYW5nZV9kaWFtb25kJzonXFx1ZDgzZFxcdWRkMzgnLFxuICAnc21hbGxfcmVkX3RyaWFuZ2xlJzonXFx1ZDgzZFxcdWRkM2EnLFxuICAnc21hbGxfcmVkX3RyaWFuZ2xlX2Rvd24nOidcXHVkODNkXFx1ZGQzYicsXG4gICdzbWlsZSc6J1xcdWQ4M2RcXHVkZTA0JyxcbiAgJ3NtaWxlX2NhdCc6J1xcdWQ4M2RcXHVkZTM4JyxcbiAgJ3NtaWxleSc6J1xcdWQ4M2RcXHVkZTAzJyxcbiAgJ3NtaWxleV9jYXQnOidcXHVkODNkXFx1ZGUzYScsXG4gICdzbWlsaW5nX2ltcCc6J1xcdWQ4M2RcXHVkZTA4JyxcbiAgJ3NtaXJrJzonXFx1ZDgzZFxcdWRlMGYnLFxuICAnc21pcmtfY2F0JzonXFx1ZDgzZFxcdWRlM2MnLFxuICAnc21va2luZyc6J1xcdWQ4M2RcXHVkZWFjJyxcbiAgJ3NuYWlsJzonXFx1ZDgzZFxcdWRjMGMnLFxuICAnc25ha2UnOidcXHVkODNkXFx1ZGMwZCcsXG4gICdzbmVlemluZ19mYWNlJzonXFx1ZDgzZVxcdWRkMjcnLFxuICAnc25vd2JvYXJkZXInOidcXHVkODNjXFx1ZGZjMicsXG4gICdzbm93Zmxha2UnOidcXHUyNzQ0XFx1ZmUwZicsXG4gICdzbm93bWFuJzonXFx1MjZjNFxcdWZlMGYnLFxuICAnc25vd21hbl93aXRoX3Nub3cnOidcXHUyNjAzXFx1ZmUwZicsXG4gICdzb2InOidcXHVkODNkXFx1ZGUyZCcsXG4gICdzb2NjZXInOidcXHUyNmJkXFx1ZmUwZicsXG4gICdzb29uJzonXFx1ZDgzZFxcdWRkMWMnLFxuICAnc29zJzonXFx1ZDgzY1xcdWRkOTgnLFxuICAnc291bmQnOidcXHVkODNkXFx1ZGQwOScsXG4gICdzcGFjZV9pbnZhZGVyJzonXFx1ZDgzZFxcdWRjN2UnLFxuICAnc3BhZGVzJzonXFx1MjY2MFxcdWZlMGYnLFxuICAnc3BhZ2hldHRpJzonXFx1ZDgzY1xcdWRmNWQnLFxuICAnc3BhcmtsZSc6J1xcdTI3NDdcXHVmZTBmJyxcbiAgJ3NwYXJrbGVyJzonXFx1ZDgzY1xcdWRmODcnLFxuICAnc3BhcmtsZXMnOidcXHUyNzI4JyxcbiAgJ3NwYXJrbGluZ19oZWFydCc6J1xcdWQ4M2RcXHVkYzk2JyxcbiAgJ3NwZWFrX25vX2V2aWwnOidcXHVkODNkXFx1ZGU0YScsXG4gICdzcGVha2VyJzonXFx1ZDgzZFxcdWRkMDgnLFxuICAnc3BlYWtpbmdfaGVhZCc6J1xcdWQ4M2RcXHVkZGUzJyxcbiAgJ3NwZWVjaF9iYWxsb29uJzonXFx1ZDgzZFxcdWRjYWMnLFxuICAnc3BlZWRib2F0JzonXFx1ZDgzZFxcdWRlYTQnLFxuICAnc3BpZGVyJzonXFx1ZDgzZFxcdWRkNzcnLFxuICAnc3BpZGVyX3dlYic6J1xcdWQ4M2RcXHVkZDc4JyxcbiAgJ3NwaXJhbF9jYWxlbmRhcic6J1xcdWQ4M2RcXHVkZGQzJyxcbiAgJ3NwaXJhbF9ub3RlcGFkJzonXFx1ZDgzZFxcdWRkZDInLFxuICAnc3Bvb24nOidcXHVkODNlXFx1ZGQ0NCcsXG4gICdzcXVpZCc6J1xcdWQ4M2VcXHVkZDkxJyxcbiAgJ3N0YWRpdW0nOidcXHVkODNjXFx1ZGZkZicsXG4gICdzdGFyJzonXFx1MmI1MFxcdWZlMGYnLFxuICAnc3RhcjInOidcXHVkODNjXFx1ZGYxZicsXG4gICdzdGFyX2FuZF9jcmVzY2VudCc6J1xcdTI2MmFcXHVmZTBmJyxcbiAgJ3N0YXJfb2ZfZGF2aWQnOidcXHUyNzIxXFx1ZmUwZicsXG4gICdzdGFycyc6J1xcdWQ4M2NcXHVkZjIwJyxcbiAgJ3N0YXRpb24nOidcXHVkODNkXFx1ZGU4OScsXG4gICdzdGF0dWVfb2ZfbGliZXJ0eSc6J1xcdWQ4M2RcXHVkZGZkJyxcbiAgJ3N0ZWFtX2xvY29tb3RpdmUnOidcXHVkODNkXFx1ZGU4MicsXG4gICdzdGV3JzonXFx1ZDgzY1xcdWRmNzInLFxuICAnc3RvcF9idXR0b24nOidcXHUyM2Y5JyxcbiAgJ3N0b3Bfc2lnbic6J1xcdWQ4M2RcXHVkZWQxJyxcbiAgJ3N0b3B3YXRjaCc6J1xcdTIzZjEnLFxuICAnc3RyYWlnaHRfcnVsZXInOidcXHVkODNkXFx1ZGNjZicsXG4gICdzdHJhd2JlcnJ5JzonXFx1ZDgzY1xcdWRmNTMnLFxuICAnc3R1Y2tfb3V0X3Rvbmd1ZSc6J1xcdWQ4M2RcXHVkZTFiJyxcbiAgJ3N0dWNrX291dF90b25ndWVfY2xvc2VkX2V5ZXMnOidcXHVkODNkXFx1ZGUxZCcsXG4gICdzdHVja19vdXRfdG9uZ3VlX3dpbmtpbmdfZXllJzonXFx1ZDgzZFxcdWRlMWMnLFxuICAnc3R1ZGlvX21pY3JvcGhvbmUnOidcXHVkODNjXFx1ZGY5OScsXG4gICdzdHVmZmVkX2ZsYXRicmVhZCc6J1xcdWQ4M2VcXHVkZDU5JyxcbiAgJ3N1bl9iZWhpbmRfbGFyZ2VfY2xvdWQnOidcXHVkODNjXFx1ZGYyNScsXG4gICdzdW5fYmVoaW5kX3JhaW5fY2xvdWQnOidcXHVkODNjXFx1ZGYyNicsXG4gICdzdW5fYmVoaW5kX3NtYWxsX2Nsb3VkJzonXFx1ZDgzY1xcdWRmMjQnLFxuICAnc3VuX3dpdGhfZmFjZSc6J1xcdWQ4M2NcXHVkZjFlJyxcbiAgJ3N1bmZsb3dlcic6J1xcdWQ4M2NcXHVkZjNiJyxcbiAgJ3N1bmdsYXNzZXMnOidcXHVkODNkXFx1ZGUwZScsXG4gICdzdW5ueSc6J1xcdTI2MDBcXHVmZTBmJyxcbiAgJ3N1bnJpc2UnOidcXHVkODNjXFx1ZGYwNScsXG4gICdzdW5yaXNlX292ZXJfbW91bnRhaW5zJzonXFx1ZDgzY1xcdWRmMDQnLFxuICAnc3VyZmluZ19tYW4nOidcXHVkODNjXFx1ZGZjNCcsXG4gICdzdXJmaW5nX3dvbWFuJzonXFx1ZDgzY1xcdWRmYzQmendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ3N1c2hpJzonXFx1ZDgzY1xcdWRmNjMnLFxuICAnc3VzcGVuc2lvbl9yYWlsd2F5JzonXFx1ZDgzZFxcdWRlOWYnLFxuICAnc3dlYXQnOidcXHVkODNkXFx1ZGUxMycsXG4gICdzd2VhdF9kcm9wcyc6J1xcdWQ4M2RcXHVkY2E2JyxcbiAgJ3N3ZWF0X3NtaWxlJzonXFx1ZDgzZFxcdWRlMDUnLFxuICAnc3dlZXRfcG90YXRvJzonXFx1ZDgzY1xcdWRmNjAnLFxuICAnc3dpbW1pbmdfbWFuJzonXFx1ZDgzY1xcdWRmY2EnLFxuICAnc3dpbW1pbmdfd29tYW4nOidcXHVkODNjXFx1ZGZjYSZ6d2o7XFx1MjY0MFxcdWZlMGYnLFxuICAnc3ltYm9scyc6J1xcdWQ4M2RcXHVkZDIzJyxcbiAgJ3N5bmFnb2d1ZSc6J1xcdWQ4M2RcXHVkZDRkJyxcbiAgJ3N5cmluZ2UnOidcXHVkODNkXFx1ZGM4OScsXG4gICd0YWNvJzonXFx1ZDgzY1xcdWRmMmUnLFxuICAndGFkYSc6J1xcdWQ4M2NcXHVkZjg5JyxcbiAgJ3RhbmFiYXRhX3RyZWUnOidcXHVkODNjXFx1ZGY4YicsXG4gICd0YXVydXMnOidcXHUyNjQ5XFx1ZmUwZicsXG4gICd0YXhpJzonXFx1ZDgzZFxcdWRlOTUnLFxuICAndGVhJzonXFx1ZDgzY1xcdWRmNzUnLFxuICAndGVsZXBob25lX3JlY2VpdmVyJzonXFx1ZDgzZFxcdWRjZGUnLFxuICAndGVsZXNjb3BlJzonXFx1ZDgzZFxcdWRkMmQnLFxuICAndGVubmlzJzonXFx1ZDgzY1xcdWRmYmUnLFxuICAndGVudCc6J1xcdTI2ZmFcXHVmZTBmJyxcbiAgJ3RoZXJtb21ldGVyJzonXFx1ZDgzY1xcdWRmMjEnLFxuICAndGhpbmtpbmcnOidcXHVkODNlXFx1ZGQxNCcsXG4gICd0aG91Z2h0X2JhbGxvb24nOidcXHVkODNkXFx1ZGNhZCcsXG4gICd0aWNrZXQnOidcXHVkODNjXFx1ZGZhYicsXG4gICd0aWNrZXRzJzonXFx1ZDgzY1xcdWRmOWYnLFxuICAndGlnZXInOidcXHVkODNkXFx1ZGMyZicsXG4gICd0aWdlcjInOidcXHVkODNkXFx1ZGMwNScsXG4gICd0aW1lcl9jbG9jayc6J1xcdTIzZjInLFxuICAndGlwcGluZ19oYW5kX21hbic6J1xcdWQ4M2RcXHVkYzgxJnp3ajtcXHUyNjQyXFx1ZmUwZicsXG4gICd0aXJlZF9mYWNlJzonXFx1ZDgzZFxcdWRlMmInLFxuICAndG0nOidcXHUyMTIyXFx1ZmUwZicsXG4gICd0b2lsZXQnOidcXHVkODNkXFx1ZGViZCcsXG4gICd0b2t5b190b3dlcic6J1xcdWQ4M2RcXHVkZGZjJyxcbiAgJ3RvbWF0byc6J1xcdWQ4M2NcXHVkZjQ1JyxcbiAgJ3Rvbmd1ZSc6J1xcdWQ4M2RcXHVkYzQ1JyxcbiAgJ3RvcCc6J1xcdWQ4M2RcXHVkZDFkJyxcbiAgJ3RvcGhhdCc6J1xcdWQ4M2NcXHVkZmE5JyxcbiAgJ3Rvcm5hZG8nOidcXHVkODNjXFx1ZGYyYScsXG4gICd0cmFja2JhbGwnOidcXHVkODNkXFx1ZGRiMicsXG4gICd0cmFjdG9yJzonXFx1ZDgzZFxcdWRlOWMnLFxuICAndHJhZmZpY19saWdodCc6J1xcdWQ4M2RcXHVkZWE1JyxcbiAgJ3RyYWluJzonXFx1ZDgzZFxcdWRlOGInLFxuICAndHJhaW4yJzonXFx1ZDgzZFxcdWRlODYnLFxuICAndHJhbSc6J1xcdWQ4M2RcXHVkZThhJyxcbiAgJ3RyaWFuZ3VsYXJfZmxhZ19vbl9wb3N0JzonXFx1ZDgzZFxcdWRlYTknLFxuICAndHJpYW5ndWxhcl9ydWxlcic6J1xcdWQ4M2RcXHVkY2QwJyxcbiAgJ3RyaWRlbnQnOidcXHVkODNkXFx1ZGQzMScsXG4gICd0cml1bXBoJzonXFx1ZDgzZFxcdWRlMjQnLFxuICAndHJvbGxleWJ1cyc6J1xcdWQ4M2RcXHVkZThlJyxcbiAgJ3Ryb3BoeSc6J1xcdWQ4M2NcXHVkZmM2JyxcbiAgJ3Ryb3BpY2FsX2RyaW5rJzonXFx1ZDgzY1xcdWRmNzknLFxuICAndHJvcGljYWxfZmlzaCc6J1xcdWQ4M2RcXHVkYzIwJyxcbiAgJ3RydWNrJzonXFx1ZDgzZFxcdWRlOWEnLFxuICAndHJ1bXBldCc6J1xcdWQ4M2NcXHVkZmJhJyxcbiAgJ3R1bGlwJzonXFx1ZDgzY1xcdWRmMzcnLFxuICAndHVtYmxlcl9nbGFzcyc6J1xcdWQ4M2VcXHVkZDQzJyxcbiAgJ3R1cmtleSc6J1xcdWQ4M2VcXHVkZDgzJyxcbiAgJ3R1cnRsZSc6J1xcdWQ4M2RcXHVkYzIyJyxcbiAgJ3R2JzonXFx1ZDgzZFxcdWRjZmEnLFxuICAndHdpc3RlZF9yaWdodHdhcmRzX2Fycm93cyc6J1xcdWQ4M2RcXHVkZDAwJyxcbiAgJ3R3b19oZWFydHMnOidcXHVkODNkXFx1ZGM5NScsXG4gICd0d29fbWVuX2hvbGRpbmdfaGFuZHMnOidcXHVkODNkXFx1ZGM2YycsXG4gICd0d29fd29tZW5faG9sZGluZ19oYW5kcyc6J1xcdWQ4M2RcXHVkYzZkJyxcbiAgJ3U1MjcyJzonXFx1ZDgzY1xcdWRlMzknLFxuICAndTU0MDgnOidcXHVkODNjXFx1ZGUzNCcsXG4gICd1NTViNic6J1xcdWQ4M2NcXHVkZTNhJyxcbiAgJ3U2MzA3JzonXFx1ZDgzY1xcdWRlMmZcXHVmZTBmJyxcbiAgJ3U2NzA4JzonXFx1ZDgzY1xcdWRlMzdcXHVmZTBmJyxcbiAgJ3U2NzA5JzonXFx1ZDgzY1xcdWRlMzYnLFxuICAndTZlODAnOidcXHVkODNjXFx1ZGUzNScsXG4gICd1NzEyMSc6J1xcdWQ4M2NcXHVkZTFhXFx1ZmUwZicsXG4gICd1NzUzMyc6J1xcdWQ4M2NcXHVkZTM4JyxcbiAgJ3U3OTgxJzonXFx1ZDgzY1xcdWRlMzInLFxuICAndTdhN2EnOidcXHVkODNjXFx1ZGUzMycsXG4gICd1bWJyZWxsYSc6J1xcdTI2MTRcXHVmZTBmJyxcbiAgJ3VuYW11c2VkJzonXFx1ZDgzZFxcdWRlMTInLFxuICAndW5kZXJhZ2UnOidcXHVkODNkXFx1ZGQxZScsXG4gICd1bmljb3JuJzonXFx1ZDgzZVxcdWRkODQnLFxuICAndW5sb2NrJzonXFx1ZDgzZFxcdWRkMTMnLFxuICAndXAnOidcXHVkODNjXFx1ZGQ5OScsXG4gICd1cHNpZGVfZG93bl9mYWNlJzonXFx1ZDgzZFxcdWRlNDMnLFxuICAndic6J1xcdTI3MGNcXHVmZTBmJyxcbiAgJ3ZlcnRpY2FsX3RyYWZmaWNfbGlnaHQnOidcXHVkODNkXFx1ZGVhNicsXG4gICd2aHMnOidcXHVkODNkXFx1ZGNmYycsXG4gICd2aWJyYXRpb25fbW9kZSc6J1xcdWQ4M2RcXHVkY2YzJyxcbiAgJ3ZpZGVvX2NhbWVyYSc6J1xcdWQ4M2RcXHVkY2Y5JyxcbiAgJ3ZpZGVvX2dhbWUnOidcXHVkODNjXFx1ZGZhZScsXG4gICd2aW9saW4nOidcXHVkODNjXFx1ZGZiYicsXG4gICd2aXJnbyc6J1xcdTI2NGRcXHVmZTBmJyxcbiAgJ3ZvbGNhbm8nOidcXHVkODNjXFx1ZGYwYicsXG4gICd2b2xsZXliYWxsJzonXFx1ZDgzY1xcdWRmZDAnLFxuICAndnMnOidcXHVkODNjXFx1ZGQ5YScsXG4gICd2dWxjYW5fc2FsdXRlJzonXFx1ZDgzZFxcdWRkOTYnLFxuICAnd2Fsa2luZ19tYW4nOidcXHVkODNkXFx1ZGViNicsXG4gICd3YWxraW5nX3dvbWFuJzonXFx1ZDgzZFxcdWRlYjYmendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ3dhbmluZ19jcmVzY2VudF9tb29uJzonXFx1ZDgzY1xcdWRmMTgnLFxuICAnd2FuaW5nX2dpYmJvdXNfbW9vbic6J1xcdWQ4M2NcXHVkZjE2JyxcbiAgJ3dhcm5pbmcnOidcXHUyNmEwXFx1ZmUwZicsXG4gICd3YXN0ZWJhc2tldCc6J1xcdWQ4M2RcXHVkZGQxJyxcbiAgJ3dhdGNoJzonXFx1MjMxYVxcdWZlMGYnLFxuICAnd2F0ZXJfYnVmZmFsbyc6J1xcdWQ4M2RcXHVkYzAzJyxcbiAgJ3dhdGVybWVsb24nOidcXHVkODNjXFx1ZGY0OScsXG4gICd3YXZlJzonXFx1ZDgzZFxcdWRjNGInLFxuICAnd2F2eV9kYXNoJzonXFx1MzAzMFxcdWZlMGYnLFxuICAnd2F4aW5nX2NyZXNjZW50X21vb24nOidcXHVkODNjXFx1ZGYxMicsXG4gICd3Yyc6J1xcdWQ4M2RcXHVkZWJlJyxcbiAgJ3dlYXJ5JzonXFx1ZDgzZFxcdWRlMjknLFxuICAnd2VkZGluZyc6J1xcdWQ4M2RcXHVkYzkyJyxcbiAgJ3dlaWdodF9saWZ0aW5nX21hbic6J1xcdWQ4M2NcXHVkZmNiXFx1ZmUwZicsXG4gICd3ZWlnaHRfbGlmdGluZ193b21hbic6J1xcdWQ4M2NcXHVkZmNiXFx1ZmUwZiZ6d2o7XFx1MjY0MFxcdWZlMGYnLFxuICAnd2hhbGUnOidcXHVkODNkXFx1ZGMzMycsXG4gICd3aGFsZTInOidcXHVkODNkXFx1ZGMwYicsXG4gICd3aGVlbF9vZl9kaGFybWEnOidcXHUyNjM4XFx1ZmUwZicsXG4gICd3aGVlbGNoYWlyJzonXFx1MjY3ZlxcdWZlMGYnLFxuICAnd2hpdGVfY2hlY2tfbWFyayc6J1xcdTI3MDUnLFxuICAnd2hpdGVfY2lyY2xlJzonXFx1MjZhYVxcdWZlMGYnLFxuICAnd2hpdGVfZmxhZyc6J1xcdWQ4M2NcXHVkZmYzXFx1ZmUwZicsXG4gICd3aGl0ZV9mbG93ZXInOidcXHVkODNkXFx1ZGNhZScsXG4gICd3aGl0ZV9sYXJnZV9zcXVhcmUnOidcXHUyYjFjXFx1ZmUwZicsXG4gICd3aGl0ZV9tZWRpdW1fc21hbGxfc3F1YXJlJzonXFx1MjVmZFxcdWZlMGYnLFxuICAnd2hpdGVfbWVkaXVtX3NxdWFyZSc6J1xcdTI1ZmJcXHVmZTBmJyxcbiAgJ3doaXRlX3NtYWxsX3NxdWFyZSc6J1xcdTI1YWJcXHVmZTBmJyxcbiAgJ3doaXRlX3NxdWFyZV9idXR0b24nOidcXHVkODNkXFx1ZGQzMycsXG4gICd3aWx0ZWRfZmxvd2VyJzonXFx1ZDgzZVxcdWRkNDAnLFxuICAnd2luZF9jaGltZSc6J1xcdWQ4M2NcXHVkZjkwJyxcbiAgJ3dpbmRfZmFjZSc6J1xcdWQ4M2NcXHVkZjJjJyxcbiAgJ3dpbmVfZ2xhc3MnOidcXHVkODNjXFx1ZGY3NycsXG4gICd3aW5rJzonXFx1ZDgzZFxcdWRlMDknLFxuICAnd29sZic6J1xcdWQ4M2RcXHVkYzNhJyxcbiAgJ3dvbWFuJzonXFx1ZDgzZFxcdWRjNjknLFxuICAnd29tYW5fYXJ0aXN0JzonXFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2NcXHVkZmE4JyxcbiAgJ3dvbWFuX2FzdHJvbmF1dCc6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNkXFx1ZGU4MCcsXG4gICd3b21hbl9jYXJ0d2hlZWxpbmcnOidcXHVkODNlXFx1ZGQzOCZ6d2o7XFx1MjY0MFxcdWZlMGYnLFxuICAnd29tYW5fY29vayc6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNjXFx1ZGY3MycsXG4gICd3b21hbl9mYWNlcGFsbWluZyc6J1xcdWQ4M2VcXHVkZDI2Jnp3ajtcXHUyNjQwXFx1ZmUwZicsXG4gICd3b21hbl9mYWN0b3J5X3dvcmtlcic6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNjXFx1ZGZlZCcsXG4gICd3b21hbl9mYXJtZXInOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzY1xcdWRmM2UnLFxuICAnd29tYW5fZmlyZWZpZ2h0ZXInOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzZFxcdWRlOTInLFxuICAnd29tYW5faGVhbHRoX3dvcmtlcic6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHUyNjk1XFx1ZmUwZicsXG4gICd3b21hbl9qdWRnZSc6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHUyNjk2XFx1ZmUwZicsXG4gICd3b21hbl9qdWdnbGluZyc6J1xcdWQ4M2VcXHVkZDM5Jnp3ajtcXHUyNjQwXFx1ZmUwZicsXG4gICd3b21hbl9tZWNoYW5pYyc6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNkXFx1ZGQyNycsXG4gICd3b21hbl9vZmZpY2Vfd29ya2VyJzonXFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2RcXHVkY2JjJyxcbiAgJ3dvbWFuX3BpbG90JzonXFx1ZDgzZFxcdWRjNjkmendqO1xcdTI3MDhcXHVmZTBmJyxcbiAgJ3dvbWFuX3BsYXlpbmdfaGFuZGJhbGwnOidcXHVkODNlXFx1ZGQzZSZ6d2o7XFx1MjY0MFxcdWZlMGYnLFxuICAnd29tYW5fcGxheWluZ193YXRlcl9wb2xvJzonXFx1ZDgzZVxcdWRkM2QmendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ3dvbWFuX3NjaWVudGlzdCc6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNkXFx1ZGQyYycsXG4gICd3b21hbl9zaHJ1Z2dpbmcnOidcXHVkODNlXFx1ZGQzNyZ6d2o7XFx1MjY0MFxcdWZlMGYnLFxuICAnd29tYW5fc2luZ2VyJzonXFx1ZDgzZFxcdWRjNjkmendqO1xcdWQ4M2NcXHVkZmE0JyxcbiAgJ3dvbWFuX3N0dWRlbnQnOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzY1xcdWRmOTMnLFxuICAnd29tYW5fdGVhY2hlcic6J1xcdWQ4M2RcXHVkYzY5Jnp3ajtcXHVkODNjXFx1ZGZlYicsXG4gICd3b21hbl90ZWNobm9sb2dpc3QnOidcXHVkODNkXFx1ZGM2OSZ6d2o7XFx1ZDgzZFxcdWRjYmInLFxuICAnd29tYW5fd2l0aF90dXJiYW4nOidcXHVkODNkXFx1ZGM3MyZ6d2o7XFx1MjY0MFxcdWZlMGYnLFxuICAnd29tYW5zX2Nsb3RoZXMnOidcXHVkODNkXFx1ZGM1YScsXG4gICd3b21hbnNfaGF0JzonXFx1ZDgzZFxcdWRjNTInLFxuICAnd29tZW5fd3Jlc3RsaW5nJzonXFx1ZDgzZVxcdWRkM2MmendqO1xcdTI2NDBcXHVmZTBmJyxcbiAgJ3dvbWVucyc6J1xcdWQ4M2RcXHVkZWJhJyxcbiAgJ3dvcmxkX21hcCc6J1xcdWQ4M2RcXHVkZGZhJyxcbiAgJ3dvcnJpZWQnOidcXHVkODNkXFx1ZGUxZicsXG4gICd3cmVuY2gnOidcXHVkODNkXFx1ZGQyNycsXG4gICd3cml0aW5nX2hhbmQnOidcXHUyNzBkXFx1ZmUwZicsXG4gICd4JzonXFx1Mjc0YycsXG4gICd5ZWxsb3dfaGVhcnQnOidcXHVkODNkXFx1ZGM5YicsXG4gICd5ZW4nOidcXHVkODNkXFx1ZGNiNCcsXG4gICd5aW5feWFuZyc6J1xcdTI2MmZcXHVmZTBmJyxcbiAgJ3l1bSc6J1xcdWQ4M2RcXHVkZTBiJyxcbiAgJ3phcCc6J1xcdTI2YTFcXHVmZTBmJyxcbiAgJ3ppcHBlcl9tb3V0aF9mYWNlJzonXFx1ZDgzZVxcdWRkMTAnLFxuICAnenp6JzonXFx1ZDgzZFxcdWRjYTQnLFxuXG4gIC8qIHNwZWNpYWwgZW1vamlzIDpQICovXG4gICdvY3RvY2F0JzogICc8aW1nIGFsdD1cIjpvY3RvY2F0OlwiIGhlaWdodD1cIjIwXCIgd2lkdGg9XCIyMFwiIGFsaWduPVwiYWJzbWlkZGxlXCIgc3JjPVwiaHR0cHM6Ly9hc3NldHMtY2RuLmdpdGh1Yi5jb20vaW1hZ2VzL2ljb25zL2Vtb2ppL29jdG9jYXQucG5nXCI+JyxcbiAgJ3Nob3dkb3duJzogJzxzcGFuIHN0eWxlPVwiZm9udC1mYW1pbHk6IFxcJ0Fub255bW91cyBQcm9cXCcsIG1vbm9zcGFjZTsgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IHRleHQtZGVjb3JhdGlvbi1zdHlsZTogZGFzaGVkOyB0ZXh0LWRlY29yYXRpb24tY29sb3I6ICMzZThiOGE7dGV4dC11bmRlcmxpbmUtcG9zaXRpb246IHVuZGVyO1wiPlM8L3NwYW4+J1xufTtcblxyXG4vKipcbiAqIENyZWF0ZWQgYnkgRXN0ZXZhbyBvbiAzMS0wNS0yMDE1LlxuICovXG5cbi8qKlxuICogU2hvd2Rvd24gQ29udmVydGVyIGNsYXNzXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSBbY29udmVydGVyT3B0aW9uc11cbiAqIEByZXR1cm5zIHtDb252ZXJ0ZXJ9XG4gKi9cbnNob3dkb3duLkNvbnZlcnRlciA9IGZ1bmN0aW9uIChjb252ZXJ0ZXJPcHRpb25zKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXJcbiAgICAgIC8qKlxuICAgICAgICogT3B0aW9ucyB1c2VkIGJ5IHRoaXMgY29udmVydGVyXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQHR5cGUge3t9fVxuICAgICAgICovXG4gICAgICBvcHRpb25zID0ge30sXG5cbiAgICAgIC8qKlxuICAgICAgICogTGFuZ3VhZ2UgZXh0ZW5zaW9ucyB1c2VkIGJ5IHRoaXMgY29udmVydGVyXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICovXG4gICAgICBsYW5nRXh0ZW5zaW9ucyA9IFtdLFxuXG4gICAgICAvKipcbiAgICAgICAqIE91dHB1dCBtb2RpZmllcnMgZXh0ZW5zaW9ucyB1c2VkIGJ5IHRoaXMgY29udmVydGVyXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICovXG4gICAgICBvdXRwdXRNb2RpZmllcnMgPSBbXSxcblxuICAgICAgLyoqXG4gICAgICAgKiBFdmVudCBsaXN0ZW5lcnNcbiAgICAgICAqIEBwcml2YXRlXG4gICAgICAgKiBAdHlwZSB7e319XG4gICAgICAgKi9cbiAgICAgIGxpc3RlbmVycyA9IHt9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFRoZSBmbGF2b3Igc2V0IGluIHRoaXMgY29udmVydGVyXG4gICAgICAgKi9cbiAgICAgIHNldENvbnZGbGF2b3IgPSBzZXRGbGF2b3IsXG5cbiAgICAvKipcbiAgICAgKiBNZXRhZGF0YSBvZiB0aGUgZG9jdW1lbnRcbiAgICAgKiBAdHlwZSB7e3BhcnNlZDoge30sIHJhdzogc3RyaW5nLCBmb3JtYXQ6IHN0cmluZ319XG4gICAgICovXG4gICAgICBtZXRhZGF0YSA9IHtcbiAgICAgICAgcGFyc2VkOiB7fSxcbiAgICAgICAgcmF3OiAnJyxcbiAgICAgICAgZm9ybWF0OiAnJ1xuICAgICAgfTtcblxuICBfY29uc3RydWN0b3IoKTtcblxuICAvKipcbiAgICogQ29udmVydGVyIGNvbnN0cnVjdG9yXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBfY29uc3RydWN0b3IgKCkge1xuICAgIGNvbnZlcnRlck9wdGlvbnMgPSBjb252ZXJ0ZXJPcHRpb25zIHx8IHt9O1xuXG4gICAgZm9yICh2YXIgZ09wdCBpbiBnbG9iYWxPcHRpb25zKSB7XG4gICAgICBpZiAoZ2xvYmFsT3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShnT3B0KSkge1xuICAgICAgICBvcHRpb25zW2dPcHRdID0gZ2xvYmFsT3B0aW9uc1tnT3B0XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNZXJnZSBvcHRpb25zXG4gICAgaWYgKHR5cGVvZiBjb252ZXJ0ZXJPcHRpb25zID09PSAnb2JqZWN0Jykge1xuICAgICAgZm9yICh2YXIgb3B0IGluIGNvbnZlcnRlck9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGNvbnZlcnRlck9wdGlvbnMuaGFzT3duUHJvcGVydHkob3B0KSkge1xuICAgICAgICAgIG9wdGlvbnNbb3B0XSA9IGNvbnZlcnRlck9wdGlvbnNbb3B0XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignQ29udmVydGVyIGV4cGVjdHMgdGhlIHBhc3NlZCBwYXJhbWV0ZXIgdG8gYmUgYW4gb2JqZWN0LCBidXQgJyArIHR5cGVvZiBjb252ZXJ0ZXJPcHRpb25zICtcbiAgICAgICcgd2FzIHBhc3NlZCBpbnN0ZWFkLicpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmV4dGVuc2lvbnMpIHtcbiAgICAgIHNob3dkb3duLmhlbHBlci5mb3JFYWNoKG9wdGlvbnMuZXh0ZW5zaW9ucywgX3BhcnNlRXh0ZW5zaW9uKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGFyc2UgZXh0ZW5zaW9uXG4gICAqIEBwYXJhbSB7Kn0gZXh0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZT0nJ11cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIF9wYXJzZUV4dGVuc2lvbiAoZXh0LCBuYW1lKSB7XG5cbiAgICBuYW1lID0gbmFtZSB8fCBudWxsO1xuICAgIC8vIElmIGl0J3MgYSBzdHJpbmcsIHRoZSBleHRlbnNpb24gd2FzIHByZXZpb3VzbHkgbG9hZGVkXG4gICAgaWYgKHNob3dkb3duLmhlbHBlci5pc1N0cmluZyhleHQpKSB7XG4gICAgICBleHQgPSBzaG93ZG93bi5oZWxwZXIuc3RkRXh0TmFtZShleHQpO1xuICAgICAgbmFtZSA9IGV4dDtcblxuICAgICAgLy8gTEVHQUNZX1NVUFBPUlQgQ09ERVxuICAgICAgaWYgKHNob3dkb3duLmV4dGVuc2lvbnNbZXh0XSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0RFUFJFQ0FUSU9OIFdBUk5JTkc6ICcgKyBleHQgKyAnIGlzIGFuIG9sZCBleHRlbnNpb24gdGhhdCB1c2VzIGEgZGVwcmVjYXRlZCBsb2FkaW5nIG1ldGhvZC4nICtcbiAgICAgICAgICAnUGxlYXNlIGluZm9ybSB0aGUgZGV2ZWxvcGVyIHRoYXQgdGhlIGV4dGVuc2lvbiBzaG91bGQgYmUgdXBkYXRlZCEnKTtcbiAgICAgICAgbGVnYWN5RXh0ZW5zaW9uTG9hZGluZyhzaG93ZG93bi5leHRlbnNpb25zW2V4dF0sIGV4dCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIC8vIEVORCBMRUdBQ1kgU1VQUE9SVCBDT0RFXG5cbiAgICAgIH0gZWxzZSBpZiAoIXNob3dkb3duLmhlbHBlci5pc1VuZGVmaW5lZChleHRlbnNpb25zW2V4dF0pKSB7XG4gICAgICAgIGV4dCA9IGV4dGVuc2lvbnNbZXh0XTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0V4dGVuc2lvbiBcIicgKyBleHQgKyAnXCIgY291bGQgbm90IGJlIGxvYWRlZC4gSXQgd2FzIGVpdGhlciBub3QgZm91bmQgb3IgaXMgbm90IGEgdmFsaWQgZXh0ZW5zaW9uLicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBleHQgPSBleHQoKTtcbiAgICB9XG5cbiAgICBpZiAoIXNob3dkb3duLmhlbHBlci5pc0FycmF5KGV4dCkpIHtcbiAgICAgIGV4dCA9IFtleHRdO1xuICAgIH1cblxuICAgIHZhciB2YWxpZEV4dCA9IHZhbGlkYXRlKGV4dCwgbmFtZSk7XG4gICAgaWYgKCF2YWxpZEV4dC52YWxpZCkge1xuICAgICAgdGhyb3cgRXJyb3IodmFsaWRFeHQuZXJyb3IpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXh0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBzd2l0Y2ggKGV4dFtpXS50eXBlKSB7XG5cbiAgICAgICAgY2FzZSAnbGFuZyc6XG4gICAgICAgICAgbGFuZ0V4dGVuc2lvbnMucHVzaChleHRbaV0pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ291dHB1dCc6XG4gICAgICAgICAgb3V0cHV0TW9kaWZpZXJzLnB1c2goZXh0W2ldKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChleHRbaV0uaGFzT3duUHJvcGVydHkoJ2xpc3RlbmVycycpKSB7XG4gICAgICAgIGZvciAodmFyIGxuIGluIGV4dFtpXS5saXN0ZW5lcnMpIHtcbiAgICAgICAgICBpZiAoZXh0W2ldLmxpc3RlbmVycy5oYXNPd25Qcm9wZXJ0eShsbikpIHtcbiAgICAgICAgICAgIGxpc3RlbihsbiwgZXh0W2ldLmxpc3RlbmVyc1tsbl0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIExFR0FDWV9TVVBQT1JUXG4gICAqIEBwYXJhbSB7Kn0gZXh0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqL1xuICBmdW5jdGlvbiBsZWdhY3lFeHRlbnNpb25Mb2FkaW5nIChleHQsIG5hbWUpIHtcbiAgICBpZiAodHlwZW9mIGV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXh0ID0gZXh0KG5ldyBzaG93ZG93bi5Db252ZXJ0ZXIoKSk7XG4gICAgfVxuICAgIGlmICghc2hvd2Rvd24uaGVscGVyLmlzQXJyYXkoZXh0KSkge1xuICAgICAgZXh0ID0gW2V4dF07XG4gICAgfVxuICAgIHZhciB2YWxpZCA9IHZhbGlkYXRlKGV4dCwgbmFtZSk7XG5cbiAgICBpZiAoIXZhbGlkLnZhbGlkKSB7XG4gICAgICB0aHJvdyBFcnJvcih2YWxpZC5lcnJvcik7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHQubGVuZ3RoOyArK2kpIHtcbiAgICAgIHN3aXRjaCAoZXh0W2ldLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnbGFuZyc6XG4gICAgICAgICAgbGFuZ0V4dGVuc2lvbnMucHVzaChleHRbaV0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdvdXRwdXQnOlxuICAgICAgICAgIG91dHB1dE1vZGlmaWVycy5wdXNoKGV4dFtpXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6Ly8gc2hvdWxkIG5ldmVyIHJlYWNoIGhlcmVcbiAgICAgICAgICB0aHJvdyBFcnJvcignRXh0ZW5zaW9uIGxvYWRlciBlcnJvcjogVHlwZSB1bnJlY29nbml6ZWQhISEnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIHRvIGFuIGV2ZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBmdW5jdGlvbiBsaXN0ZW4gKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFzaG93ZG93bi5oZWxwZXIuaXNTdHJpbmcobmFtZSkpIHtcbiAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50IGluIGNvbnZlcnRlci5saXN0ZW4oKSBtZXRob2Q6IG5hbWUgbXVzdCBiZSBhIHN0cmluZywgYnV0ICcgKyB0eXBlb2YgbmFtZSArICcgZ2l2ZW4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBhcmd1bWVudCBpbiBjb252ZXJ0ZXIubGlzdGVuKCkgbWV0aG9kOiBjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24sIGJ1dCAnICsgdHlwZW9mIGNhbGxiYWNrICsgJyBnaXZlbicpO1xuICAgIH1cblxuICAgIGlmICghbGlzdGVuZXJzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBsaXN0ZW5lcnNbbmFtZV0gPSBbXTtcbiAgICB9XG4gICAgbGlzdGVuZXJzW25hbWVdLnB1c2goY2FsbGJhY2spO1xuICB9XG5cbiAgZnVuY3Rpb24gclRyaW1JbnB1dFRleHQgKHRleHQpIHtcbiAgICB2YXIgcnNwID0gdGV4dC5tYXRjaCgvXlxccyovKVswXS5sZW5ndGgsXG4gICAgICAgIHJneCA9IG5ldyBSZWdFeHAoJ15cXFxcc3swLCcgKyByc3AgKyAnfScsICdnbScpO1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2Uocmd4LCAnJyk7XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2ggYW4gZXZlbnRcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dE5hbWUgRXZlbnQgbmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBUZXh0XG4gICAqIEBwYXJhbSB7e319IG9wdGlvbnMgQ29udmVydGVyIE9wdGlvbnNcbiAgICogQHBhcmFtIHt7fX0gZ2xvYmFsc1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgdGhpcy5fZGlzcGF0Y2ggPSBmdW5jdGlvbiBkaXNwYXRjaCAoZXZ0TmFtZSwgdGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAgIGlmIChsaXN0ZW5lcnMuaGFzT3duUHJvcGVydHkoZXZ0TmFtZSkpIHtcbiAgICAgIGZvciAodmFyIGVpID0gMDsgZWkgPCBsaXN0ZW5lcnNbZXZ0TmFtZV0ubGVuZ3RoOyArK2VpKSB7XG4gICAgICAgIHZhciBuVGV4dCA9IGxpc3RlbmVyc1tldnROYW1lXVtlaV0oZXZ0TmFtZSwgdGV4dCwgdGhpcywgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgICAgIGlmIChuVGV4dCAmJiB0eXBlb2YgblRleHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGV4dCA9IG5UZXh0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gYW4gZXZlbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICogQHJldHVybnMge3Nob3dkb3duLkNvbnZlcnRlcn1cbiAgICovXG4gIHRoaXMubGlzdGVuID0gZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgbGlzdGVuKG5hbWUsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogQ29udmVydHMgYSBtYXJrZG93biBzdHJpbmcgaW50byBIVE1MXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgdGhpcy5tYWtlSHRtbCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgLy9jaGVjayBpZiB0ZXh0IGlzIG5vdCBmYWxzeVxuICAgIGlmICghdGV4dCkge1xuICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuXG4gICAgdmFyIGdsb2JhbHMgPSB7XG4gICAgICBnSHRtbEJsb2NrczogICAgIFtdLFxuICAgICAgZ0h0bWxNZEJsb2NrczogICBbXSxcbiAgICAgIGdIdG1sU3BhbnM6ICAgICAgW10sXG4gICAgICBnVXJsczogICAgICAgICAgIHt9LFxuICAgICAgZ1RpdGxlczogICAgICAgICB7fSxcbiAgICAgIGdEaW1lbnNpb25zOiAgICAge30sXG4gICAgICBnTGlzdExldmVsOiAgICAgIDAsXG4gICAgICBoYXNoTGlua0NvdW50czogIHt9LFxuICAgICAgbGFuZ0V4dGVuc2lvbnM6ICBsYW5nRXh0ZW5zaW9ucyxcbiAgICAgIG91dHB1dE1vZGlmaWVyczogb3V0cHV0TW9kaWZpZXJzLFxuICAgICAgY29udmVydGVyOiAgICAgICB0aGlzLFxuICAgICAgZ2hDb2RlQmxvY2tzOiAgICBbXSxcbiAgICAgIG1ldGFkYXRhOiB7XG4gICAgICAgIHBhcnNlZDoge30sXG4gICAgICAgIHJhdzogJycsXG4gICAgICAgIGZvcm1hdDogJydcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gVGhpcyBsZXRzIHVzIHVzZSDCqCB0cmVtYSBhcyBhbiBlc2NhcGUgY2hhciB0byBhdm9pZCBtZDUgaGFzaGVzXG4gICAgLy8gVGhlIGNob2ljZSBvZiBjaGFyYWN0ZXIgaXMgYXJiaXRyYXJ5OyBhbnl0aGluZyB0aGF0IGlzbid0XG4gICAgLy8gbWFnaWMgaW4gTWFya2Rvd24gd2lsbCB3b3JrLlxuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL8KoL2csICfCqFQnKTtcblxuICAgIC8vIFJlcGxhY2UgJCB3aXRoIMKoRFxuICAgIC8vIFJlZ0V4cCBpbnRlcnByZXRzICQgYXMgYSBzcGVjaWFsIGNoYXJhY3RlclxuICAgIC8vIHdoZW4gaXQncyBpbiBhIHJlcGxhY2VtZW50IHN0cmluZ1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcJC9nLCAnwqhEJyk7XG5cbiAgICAvLyBTdGFuZGFyZGl6ZSBsaW5lIGVuZGluZ3NcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHJcXG4vZywgJ1xcbicpOyAvLyBET1MgdG8gVW5peFxuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcci9nLCAnXFxuJyk7IC8vIE1hYyB0byBVbml4XG5cbiAgICAvLyBTdGFyZGFyZGl6ZSBsaW5lIHNwYWNlc1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcdTAwQTAvZywgJyZuYnNwOycpO1xuXG4gICAgaWYgKG9wdGlvbnMuc21hcnRJbmRlbnRhdGlvbkZpeCkge1xuICAgICAgdGV4dCA9IHJUcmltSW5wdXRUZXh0KHRleHQpO1xuICAgIH1cblxuICAgIC8vIE1ha2Ugc3VyZSB0ZXh0IGJlZ2lucyBhbmQgZW5kcyB3aXRoIGEgY291cGxlIG9mIG5ld2xpbmVzOlxuICAgIHRleHQgPSAnXFxuXFxuJyArIHRleHQgKyAnXFxuXFxuJztcblxuICAgIC8vIGRldGFiXG4gICAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignZGV0YWInKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAgIC8qKlxuICAgICAqIFN0cmlwIGFueSBsaW5lcyBjb25zaXN0aW5nIG9ubHkgb2Ygc3BhY2VzIGFuZCB0YWJzLlxuICAgICAqIFRoaXMgbWFrZXMgc3Vic2VxdWVudCByZWdleHMgZWFzaWVyIHRvIHdyaXRlLCBiZWNhdXNlIHdlIGNhblxuICAgICAqIG1hdGNoIGNvbnNlY3V0aXZlIGJsYW5rIGxpbmVzIHdpdGggL1xcbisvIGluc3RlYWQgb2Ygc29tZXRoaW5nXG4gICAgICogY29udG9ydGVkIGxpa2UgL1sgXFx0XSpcXG4rL1xuICAgICAqL1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL15bIFxcdF0rJC9tZywgJycpO1xuXG4gICAgLy9ydW4gbGFuZ3VhZ2VFeHRlbnNpb25zXG4gICAgc2hvd2Rvd24uaGVscGVyLmZvckVhY2gobGFuZ0V4dGVuc2lvbnMsIGZ1bmN0aW9uIChleHQpIHtcbiAgICAgIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ3J1bkV4dGVuc2lvbicpKGV4dCwgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgfSk7XG5cbiAgICAvLyBydW4gdGhlIHN1YiBwYXJzZXJzXG4gICAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignbWV0YWRhdGEnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdoYXNoUHJlQ29kZVRhZ3MnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdnaXRodWJDb2RlQmxvY2tzJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignaGFzaEhUTUxCbG9ja3MnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdoYXNoQ29kZVRhZ3MnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdzdHJpcExpbmtEZWZpbml0aW9ucycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2Jsb2NrR2FtdXQnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCd1bmhhc2hIVE1MU3BhbnMnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCd1bmVzY2FwZVNwZWNpYWxDaGFycycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gICAgLy8gYXR0YWNrbGFiOiBSZXN0b3JlIGRvbGxhciBzaWduc1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL8KoRC9nLCAnJCQnKTtcblxuICAgIC8vIGF0dGFja2xhYjogUmVzdG9yZSB0cmVtYXNcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC/CqFQvZywgJ8KoJyk7XG5cbiAgICAvLyByZW5kZXIgYSBjb21wbGV0ZSBodG1sIGRvY3VtZW50IGluc3RlYWQgb2YgYSBwYXJ0aWFsIGlmIHRoZSBvcHRpb24gaXMgZW5hYmxlZFxuICAgIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2NvbXBsZXRlSFRNTERvY3VtZW50JykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgICAvLyBSdW4gb3V0cHV0IG1vZGlmaWVyc1xuICAgIHNob3dkb3duLmhlbHBlci5mb3JFYWNoKG91dHB1dE1vZGlmaWVycywgZnVuY3Rpb24gKGV4dCkge1xuICAgICAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcigncnVuRXh0ZW5zaW9uJykoZXh0LCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICB9KTtcblxuICAgIC8vIHVwZGF0ZSBtZXRhZGF0YVxuICAgIG1ldGFkYXRhID0gZ2xvYmFscy5tZXRhZGF0YTtcbiAgICByZXR1cm4gdGV4dDtcbiAgfTtcblxuICAvKipcbiAgICogQ29udmVydHMgYW4gSFRNTCBzdHJpbmcgaW50byBhIG1hcmtkb3duIHN0cmluZ1xuICAgKiBAcGFyYW0gc3JjXG4gICAqIEBwYXJhbSBbSFRNTFBhcnNlcl0gQSBXSEFUV0cgRE9NIGFuZCBIVE1MIHBhcnNlciwgc3VjaCBhcyBKU0RPTS4gSWYgbm9uZSBpcyBzdXBwbGllZCwgd2luZG93LmRvY3VtZW50IHdpbGwgYmUgdXNlZC5cbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHRoaXMubWFrZU1hcmtkb3duID0gdGhpcy5tYWtlTWQgPSBmdW5jdGlvbiAoc3JjLCBIVE1MUGFyc2VyKSB7XG5cbiAgICAvLyByZXBsYWNlIFxcclxcbiB3aXRoIFxcblxuICAgIHNyYyA9IHNyYy5yZXBsYWNlKC9cXHJcXG4vZywgJ1xcbicpO1xuICAgIHNyYyA9IHNyYy5yZXBsYWNlKC9cXHIvZywgJ1xcbicpOyAvLyBvbGQgbWFjc1xuXG4gICAgLy8gZHVlIHRvIGFuIGVkZ2UgY2FzZSwgd2UgbmVlZCB0byBmaW5kIHRoaXM6ID4gPFxuICAgIC8vIHRvIHByZXZlbnQgcmVtb3Zpbmcgb2Ygbm9uIHNpbGVudCB3aGl0ZSBzcGFjZXNcbiAgICAvLyBleDogPGVtPnRoaXMgaXM8L2VtPiA8c3Ryb25nPnNwYXJ0YTwvc3Ryb25nPlxuICAgIHNyYyA9IHNyYy5yZXBsYWNlKC8+WyBcXHRdKzwvLCAnPsKoTkJTUDs8Jyk7XG5cbiAgICBpZiAoIUhUTUxQYXJzZXIpIHtcbiAgICAgIGlmICh3aW5kb3cgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICAgIEhUTUxQYXJzZXIgPSB3aW5kb3cuZG9jdW1lbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0hUTUxQYXJzZXIgaXMgdW5kZWZpbmVkLiBJZiBpbiBhIHdlYndvcmtlciBvciBub2RlanMgZW52aXJvbm1lbnQsIHlvdSBuZWVkIHRvIHByb3ZpZGUgYSBXSEFUV0cgRE9NIGFuZCBIVE1MIHN1Y2ggYXMgSlNET00nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZG9jID0gSFRNTFBhcnNlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkb2MuaW5uZXJIVE1MID0gc3JjO1xuXG4gICAgdmFyIGdsb2JhbHMgPSB7XG4gICAgICBwcmVMaXN0OiBzdWJzdGl0dXRlUHJlQ29kZVRhZ3MoZG9jKVxuICAgIH07XG5cbiAgICAvLyByZW1vdmUgYWxsIG5ld2xpbmVzIGFuZCBjb2xsYXBzZSBzcGFjZXNcbiAgICBjbGVhbihkb2MpO1xuXG4gICAgLy8gc29tZSBzdHVmZiwgbGlrZSBhY2NpZGVudGFsIHJlZmVyZW5jZSBsaW5rcyBtdXN0IG5vdyBiZSBlc2NhcGVkXG4gICAgLy8gVE9ET1xuICAgIC8vIGRvYy5pbm5lckhUTUwgPSBkb2MuaW5uZXJIVE1MLnJlcGxhY2UoL1xcW1tcXFNcXHQgXV0vKTtcblxuICAgIHZhciBub2RlcyA9IGRvYy5jaGlsZE5vZGVzLFxuICAgICAgICBtZERvYyA9ICcnO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbWREb2MgKz0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24ubm9kZScpKG5vZGVzW2ldLCBnbG9iYWxzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhbiAobm9kZSkge1xuICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBub2RlLmNoaWxkTm9kZXMubGVuZ3RoOyArK24pIHtcbiAgICAgICAgdmFyIGNoaWxkID0gbm9kZS5jaGlsZE5vZGVzW25dO1xuICAgICAgICBpZiAoY2hpbGQubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICBpZiAoIS9cXFMvLnRlc3QoY2hpbGQubm9kZVZhbHVlKSkge1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICAtLW47XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoaWxkLm5vZGVWYWx1ZSA9IGNoaWxkLm5vZGVWYWx1ZS5zcGxpdCgnXFxuJykuam9pbignICcpO1xuICAgICAgICAgICAgY2hpbGQubm9kZVZhbHVlID0gY2hpbGQubm9kZVZhbHVlLnJlcGxhY2UoLyhcXHMpKy9nLCAnJDEnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICBjbGVhbihjaGlsZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaW5kIGFsbCBwcmUgdGFncyBhbmQgcmVwbGFjZSBjb250ZW50cyB3aXRoIHBsYWNlaG9sZGVyXG4gICAgLy8gd2UgbmVlZCB0aGlzIHNvIHRoYXQgd2UgY2FuIHJlbW92ZSBhbGwgaW5kZW50YXRpb24gZnJvbSBodG1sXG4gICAgLy8gdG8gZWFzZSB1cCBwYXJzaW5nXG4gICAgZnVuY3Rpb24gc3Vic3RpdHV0ZVByZUNvZGVUYWdzIChkb2MpIHtcblxuICAgICAgdmFyIHByZXMgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgncHJlJyksXG4gICAgICAgICAgcHJlc1BIID0gW107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJlcy5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIGlmIChwcmVzW2ldLmNoaWxkRWxlbWVudENvdW50ID09PSAxICYmIHByZXNbaV0uZmlyc3RDaGlsZC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdjb2RlJykge1xuICAgICAgICAgIHZhciBjb250ZW50ID0gcHJlc1tpXS5maXJzdENoaWxkLmlubmVySFRNTC50cmltKCksXG4gICAgICAgICAgICAgIGxhbmd1YWdlID0gcHJlc1tpXS5maXJzdENoaWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1sYW5ndWFnZScpIHx8ICcnO1xuXG4gICAgICAgICAgLy8gaWYgZGF0YS1sYW5ndWFnZSBhdHRyaWJ1dGUgaXMgbm90IGRlZmluZWQsIHRoZW4gd2UgbG9vayBmb3IgY2xhc3MgbGFuZ3VhZ2UtKlxuICAgICAgICAgIGlmIChsYW5ndWFnZSA9PT0gJycpIHtcbiAgICAgICAgICAgIHZhciBjbGFzc2VzID0gcHJlc1tpXS5maXJzdENoaWxkLmNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBjbGFzc2VzLmxlbmd0aDsgKytjKSB7XG4gICAgICAgICAgICAgIHZhciBtYXRjaGVzID0gY2xhc3Nlc1tjXS5tYXRjaCgvXmxhbmd1YWdlLSguKykkLyk7XG4gICAgICAgICAgICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2UgPSBtYXRjaGVzWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gdW5lc2NhcGUgaHRtbCBlbnRpdGllcyBpbiBjb250ZW50XG4gICAgICAgICAgY29udGVudCA9IHNob3dkb3duLmhlbHBlci51bmVzY2FwZUhUTUxFbnRpdGllcyhjb250ZW50KTtcblxuICAgICAgICAgIHByZXNQSC5wdXNoKGNvbnRlbnQpO1xuICAgICAgICAgIHByZXNbaV0ub3V0ZXJIVE1MID0gJzxwcmVjb2RlIGxhbmd1YWdlPVwiJyArIGxhbmd1YWdlICsgJ1wiIHByZWNvZGVudW09XCInICsgaS50b1N0cmluZygpICsgJ1wiPjwvcHJlY29kZT4nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByZXNQSC5wdXNoKHByZXNbaV0uaW5uZXJIVE1MKTtcbiAgICAgICAgICBwcmVzW2ldLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgIHByZXNbaV0uc2V0QXR0cmlidXRlKCdwcmVudW0nLCBpLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJlc1BIO1xuICAgIH1cblxuICAgIHJldHVybiBtZERvYztcbiAgfTtcblxuICAvKipcbiAgICogU2V0IGFuIG9wdGlvbiBvZiB0aGlzIENvbnZlcnRlciBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICovXG4gIHRoaXMuc2V0T3B0aW9uID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICBvcHRpb25zW2tleV0gPSB2YWx1ZTtcbiAgfTtcblxuICAvKipcbiAgICogR2V0IHRoZSBvcHRpb24gb2YgdGhpcyBDb252ZXJ0ZXIgaW5zdGFuY2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIHRoaXMuZ2V0T3B0aW9uID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBvcHRpb25zW2tleV07XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgb3B0aW9ucyBvZiB0aGlzIENvbnZlcnRlciBpbnN0YW5jZVxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICB0aGlzLmdldE9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBleHRlbnNpb24gdG8gVEhJUyBjb252ZXJ0ZXJcbiAgICogQHBhcmFtIHt7fX0gZXh0ZW5zaW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZT1udWxsXVxuICAgKi9cbiAgdGhpcy5hZGRFeHRlbnNpb24gPSBmdW5jdGlvbiAoZXh0ZW5zaW9uLCBuYW1lKSB7XG4gICAgbmFtZSA9IG5hbWUgfHwgbnVsbDtcbiAgICBfcGFyc2VFeHRlbnNpb24oZXh0ZW5zaW9uLCBuYW1lKTtcbiAgfTtcblxuICAvKipcbiAgICogVXNlIGEgZ2xvYmFsIHJlZ2lzdGVyZWQgZXh0ZW5zaW9uIHdpdGggVEhJUyBjb252ZXJ0ZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV4dGVuc2lvbk5hbWUgTmFtZSBvZiB0aGUgcHJldmlvdXNseSByZWdpc3RlcmVkIGV4dGVuc2lvblxuICAgKi9cbiAgdGhpcy51c2VFeHRlbnNpb24gPSBmdW5jdGlvbiAoZXh0ZW5zaW9uTmFtZSkge1xuICAgIF9wYXJzZUV4dGVuc2lvbihleHRlbnNpb25OYW1lKTtcbiAgfTtcblxuICAvKipcbiAgICogU2V0IHRoZSBmbGF2b3IgVEhJUyBjb252ZXJ0ZXIgc2hvdWxkIHVzZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKi9cbiAgdGhpcy5zZXRGbGF2b3IgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmICghZmxhdm9yLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICB0aHJvdyBFcnJvcihuYW1lICsgJyBmbGF2b3Igd2FzIG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgICB2YXIgcHJlc2V0ID0gZmxhdm9yW25hbWVdO1xuICAgIHNldENvbnZGbGF2b3IgPSBuYW1lO1xuICAgIGZvciAodmFyIG9wdGlvbiBpbiBwcmVzZXQpIHtcbiAgICAgIGlmIChwcmVzZXQuaGFzT3duUHJvcGVydHkob3B0aW9uKSkge1xuICAgICAgICBvcHRpb25zW29wdGlvbl0gPSBwcmVzZXRbb3B0aW9uXTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudGx5IHNldCBmbGF2b3Igb2YgdGhpcyBjb252ZXJ0ZXJcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHRoaXMuZ2V0Rmxhdm9yID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBzZXRDb252Rmxhdm9yO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gZXh0ZW5zaW9uIGZyb20gVEhJUyBjb252ZXJ0ZXIuXG4gICAqIE5vdGU6IFRoaXMgaXMgYSBjb3N0bHkgb3BlcmF0aW9uLiBJdCdzIGJldHRlciB0byBpbml0aWFsaXplIGEgbmV3IGNvbnZlcnRlclxuICAgKiBhbmQgc3BlY2lmeSB0aGUgZXh0ZW5zaW9ucyB5b3Ugd2lzaCB0byB1c2VcbiAgICogQHBhcmFtIHtBcnJheX0gZXh0ZW5zaW9uXG4gICAqL1xuICB0aGlzLnJlbW92ZUV4dGVuc2lvbiA9IGZ1bmN0aW9uIChleHRlbnNpb24pIHtcbiAgICBpZiAoIXNob3dkb3duLmhlbHBlci5pc0FycmF5KGV4dGVuc2lvbikpIHtcbiAgICAgIGV4dGVuc2lvbiA9IFtleHRlbnNpb25dO1xuICAgIH1cbiAgICBmb3IgKHZhciBhID0gMDsgYSA8IGV4dGVuc2lvbi5sZW5ndGg7ICsrYSkge1xuICAgICAgdmFyIGV4dCA9IGV4dGVuc2lvblthXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFuZ0V4dGVuc2lvbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKGxhbmdFeHRlbnNpb25zW2ldID09PSBleHQpIHtcbiAgICAgICAgICBsYW5nRXh0ZW5zaW9uc1tpXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCBvdXRwdXRNb2RpZmllcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKG91dHB1dE1vZGlmaWVyc1tpaV0gPT09IGV4dCkge1xuICAgICAgICAgIG91dHB1dE1vZGlmaWVyc1tpaV0uc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgYWxsIGV4dGVuc2lvbiBvZiBUSElTIGNvbnZlcnRlclxuICAgKiBAcmV0dXJucyB7e2xhbmd1YWdlOiBBcnJheSwgb3V0cHV0OiBBcnJheX19XG4gICAqL1xuICB0aGlzLmdldEFsbEV4dGVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhbmd1YWdlOiBsYW5nRXh0ZW5zaW9ucyxcbiAgICAgIG91dHB1dDogb3V0cHV0TW9kaWZpZXJzXG4gICAgfTtcbiAgfTtcblxuICAvKipcbiAgICogR2V0IHRoZSBtZXRhZGF0YSBvZiB0aGUgcHJldmlvdXNseSBwYXJzZWQgZG9jdW1lbnRcbiAgICogQHBhcmFtIHJhd1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfHt9fVxuICAgKi9cbiAgdGhpcy5nZXRNZXRhZGF0YSA9IGZ1bmN0aW9uIChyYXcpIHtcbiAgICBpZiAocmF3KSB7XG4gICAgICByZXR1cm4gbWV0YWRhdGEucmF3O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbWV0YWRhdGEucGFyc2VkO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogR2V0IHRoZSBtZXRhZGF0YSBmb3JtYXQgb2YgdGhlIHByZXZpb3VzbHkgcGFyc2VkIGRvY3VtZW50XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICB0aGlzLmdldE1ldGFkYXRhRm9ybWF0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBtZXRhZGF0YS5mb3JtYXQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIFByaXZhdGU6IHNldCBhIHNpbmdsZSBrZXksIHZhbHVlIG1ldGFkYXRhIHBhaXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHRoaXMuX3NldE1ldGFkYXRhUGFpciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgbWV0YWRhdGEucGFyc2VkW2tleV0gPSB2YWx1ZTtcbiAgfTtcblxuICAvKipcbiAgICogUHJpdmF0ZTogc2V0IG1ldGFkYXRhIGZvcm1hdFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZm9ybWF0XG4gICAqL1xuICB0aGlzLl9zZXRNZXRhZGF0YUZvcm1hdCA9IGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICBtZXRhZGF0YS5mb3JtYXQgPSBmb3JtYXQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIFByaXZhdGU6IHNldCBtZXRhZGF0YSByYXcgdGV4dFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmF3XG4gICAqL1xuICB0aGlzLl9zZXRNZXRhZGF0YVJhdyA9IGZ1bmN0aW9uIChyYXcpIHtcbiAgICBtZXRhZGF0YS5yYXcgPSByYXc7XG4gIH07XG59O1xuXHJcbi8qKlxuICogVHVybiBNYXJrZG93biBsaW5rIHNob3J0Y3V0cyBpbnRvIFhIVE1MIDxhPiB0YWdzLlxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2FuY2hvcnMnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnYW5jaG9ycy5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICB2YXIgd3JpdGVBbmNob3JUYWcgPSBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbGlua1RleHQsIGxpbmtJZCwgdXJsLCBtNSwgbTYsIHRpdGxlKSB7XG4gICAgaWYgKHNob3dkb3duLmhlbHBlci5pc1VuZGVmaW5lZCh0aXRsZSkpIHtcbiAgICAgIHRpdGxlID0gJyc7XG4gICAgfVxuICAgIGxpbmtJZCA9IGxpbmtJZC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIGZvciBleHBsaWNpdCBlbXB0eSB1cmxcbiAgICBpZiAod2hvbGVNYXRjaC5zZWFyY2goL1xcKDw/XFxzKj4/ID8oWydcIl0uKlsnXCJdKT9cXCkkL20pID4gLTEpIHtcbiAgICAgIHVybCA9ICcnO1xuICAgIH0gZWxzZSBpZiAoIXVybCkge1xuICAgICAgaWYgKCFsaW5rSWQpIHtcbiAgICAgICAgLy8gbG93ZXItY2FzZSBhbmQgdHVybiBlbWJlZGRlZCBuZXdsaW5lcyBpbnRvIHNwYWNlc1xuICAgICAgICBsaW5rSWQgPSBsaW5rVGV4dC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyA/XFxuL2csICcgJyk7XG4gICAgICB9XG4gICAgICB1cmwgPSAnIycgKyBsaW5rSWQ7XG5cbiAgICAgIGlmICghc2hvd2Rvd24uaGVscGVyLmlzVW5kZWZpbmVkKGdsb2JhbHMuZ1VybHNbbGlua0lkXSkpIHtcbiAgICAgICAgdXJsID0gZ2xvYmFscy5nVXJsc1tsaW5rSWRdO1xuICAgICAgICBpZiAoIXNob3dkb3duLmhlbHBlci5pc1VuZGVmaW5lZChnbG9iYWxzLmdUaXRsZXNbbGlua0lkXSkpIHtcbiAgICAgICAgICB0aXRsZSA9IGdsb2JhbHMuZ1RpdGxlc1tsaW5rSWRdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gd2hvbGVNYXRjaDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL3VybCA9IHNob3dkb3duLmhlbHBlci5lc2NhcGVDaGFyYWN0ZXJzKHVybCwgJypfJywgZmFsc2UpOyAvLyByZXBsYWNlZCBsaW5lIHRvIGltcHJvdmUgcGVyZm9ybWFuY2VcbiAgICB1cmwgPSB1cmwucmVwbGFjZShzaG93ZG93bi5oZWxwZXIucmVnZXhlcy5hc3Rlcmlza0Rhc2hBbmRDb2xvbiwgc2hvd2Rvd24uaGVscGVyLmVzY2FwZUNoYXJhY3RlcnNDYWxsYmFjayk7XG5cbiAgICB2YXIgcmVzdWx0ID0gJzxhIGhyZWY9XCInICsgdXJsICsgJ1wiJztcblxuICAgIGlmICh0aXRsZSAhPT0gJycgJiYgdGl0bGUgIT09IG51bGwpIHtcbiAgICAgIHRpdGxlID0gdGl0bGUucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xuICAgICAgLy90aXRsZSA9IHNob3dkb3duLmhlbHBlci5lc2NhcGVDaGFyYWN0ZXJzKHRpdGxlLCAnKl8nLCBmYWxzZSk7IC8vIHJlcGxhY2VkIGxpbmUgdG8gaW1wcm92ZSBwZXJmb3JtYW5jZVxuICAgICAgdGl0bGUgPSB0aXRsZS5yZXBsYWNlKHNob3dkb3duLmhlbHBlci5yZWdleGVzLmFzdGVyaXNrRGFzaEFuZENvbG9uLCBzaG93ZG93bi5oZWxwZXIuZXNjYXBlQ2hhcmFjdGVyc0NhbGxiYWNrKTtcbiAgICAgIHJlc3VsdCArPSAnIHRpdGxlPVwiJyArIHRpdGxlICsgJ1wiJztcbiAgICB9XG5cbiAgICAvLyBvcHRpb25MaW5rc0luTmV3V2luZG93IG9ubHkgYXBwbGllc1xuICAgIC8vIHRvIGV4dGVybmFsIGxpbmtzLiBIYXNoIGxpbmtzICgjKSBvcGVuIGluIHNhbWUgcGFnZVxuICAgIGlmIChvcHRpb25zLm9wZW5MaW5rc0luTmV3V2luZG93ICYmICEvXiMvLnRlc3QodXJsKSkge1xuICAgICAgLy8gZXNjYXBlZCBfXG4gICAgICByZXN1bHQgKz0gJyB0YXJnZXQ9XCLCqEU5NUVibGFua1wiJztcbiAgICB9XG5cbiAgICByZXN1bHQgKz0gJz4nICsgbGlua1RleHQgKyAnPC9hPic7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIEZpcnN0LCBoYW5kbGUgcmVmZXJlbmNlLXN0eWxlIGxpbmtzOiBbbGluayB0ZXh0XSBbaWRdXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcWygoPzpcXFtbXlxcXV0qXXxbXlxcW1xcXV0pKildID8oPzpcXG4gKik/XFxbKC4qPyldKCkoKSgpKCkvZywgd3JpdGVBbmNob3JUYWcpO1xuXG4gIC8vIE5leHQsIGlubGluZS1zdHlsZSBsaW5rczogW2xpbmsgdGV4dF0odXJsIFwib3B0aW9uYWwgdGl0bGVcIilcbiAgLy8gY2FzZXMgd2l0aCBjcmF6eSB1cmxzIGxpa2UgLi9pbWFnZS9jYXQxKS5wbmdcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxbKCg/OlxcW1teXFxdXSpdfFteXFxbXFxdXSkqKV0oKVsgXFx0XSpcXChbIFxcdF0/PChbXj5dKik+KD86WyBcXHRdKigoW1wiJ10pKFteXCJdKj8pXFw1KSk/WyBcXHRdP1xcKS9nLFxuICAgIHdyaXRlQW5jaG9yVGFnKTtcblxuICAvLyBub3JtYWwgY2FzZXNcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxbKCg/OlxcW1teXFxdXSpdfFteXFxbXFxdXSkqKV0oKVsgXFx0XSpcXChbIFxcdF0/PD8oW1xcU10rPyg/OlxcKFtcXFNdKj9cXClbXFxTXSo/KT8pPj8oPzpbIFxcdF0qKChbXCInXSkoW15cIl0qPylcXDUpKT9bIFxcdF0/XFwpL2csXG4gICAgICAgICAgICAgICAgICAgICAgd3JpdGVBbmNob3JUYWcpO1xuXG4gIC8vIGhhbmRsZSByZWZlcmVuY2Utc3R5bGUgc2hvcnRjdXRzOiBbbGluayB0ZXh0XVxuICAvLyBUaGVzZSBtdXN0IGNvbWUgbGFzdCBpbiBjYXNlIHlvdSd2ZSBhbHNvIGdvdCBbbGluayB0ZXN0XVsxXVxuICAvLyBvciBbbGluayB0ZXN0XSgvZm9vKVxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXFsoW15cXFtcXF1dKyldKCkoKSgpKCkoKS9nLCB3cml0ZUFuY2hvclRhZyk7XG5cbiAgLy8gTGFzdGx5IGhhbmRsZSBHaXRodWJNZW50aW9ucyBpZiBvcHRpb24gaXMgZW5hYmxlZFxuICBpZiAob3B0aW9ucy5naE1lbnRpb25zKSB7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvKF58XFxzKShcXFxcKT8oQChbYS16XFxkXSsoPzpbYS16XFxkLi1dKz9bYS16XFxkXSspKikpL2dtaSwgZnVuY3Rpb24gKHdtLCBzdCwgZXNjYXBlLCBtZW50aW9ucywgdXNlcm5hbWUpIHtcbiAgICAgIGlmIChlc2NhcGUgPT09ICdcXFxcJykge1xuICAgICAgICByZXR1cm4gc3QgKyBtZW50aW9ucztcbiAgICAgIH1cblxuICAgICAgLy9jaGVjayBpZiBvcHRpb25zLmdoTWVudGlvbnNMaW5rIGlzIGEgc3RyaW5nXG4gICAgICBpZiAoIXNob3dkb3duLmhlbHBlci5pc1N0cmluZyhvcHRpb25zLmdoTWVudGlvbnNMaW5rKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2doTWVudGlvbnNMaW5rIG9wdGlvbiBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgICB9XG4gICAgICB2YXIgbG5rID0gb3B0aW9ucy5naE1lbnRpb25zTGluay5yZXBsYWNlKC9cXHt1fS9nLCB1c2VybmFtZSksXG4gICAgICAgICAgdGFyZ2V0ID0gJyc7XG4gICAgICBpZiAob3B0aW9ucy5vcGVuTGlua3NJbk5ld1dpbmRvdykge1xuICAgICAgICB0YXJnZXQgPSAnIHRhcmdldD1cIsKoRTk1RWJsYW5rXCInO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0ICsgJzxhIGhyZWY9XCInICsgbG5rICsgJ1wiJyArIHRhcmdldCArICc+JyArIG1lbnRpb25zICsgJzwvYT4nO1xuICAgIH0pO1xuICB9XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnYW5jaG9ycy5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbi8vIHVybCBhbGxvd2VkIGNoYXJzIFthLXpcXGRfLn46Lz8jW11AISQmJygpKissOz0tXVxuXG52YXIgc2ltcGxlVVJMUmVnZXggID0gLyhbKn5fXSt8XFxiKSgoKGh0dHBzP3xmdHB8ZGljdCk6XFwvXFwvfHd3d1xcLilbXidcIj5cXHNdKz9cXC5bXidcIj5cXHNdKz8pKCkoXFwxKT8oPz1cXHN8JCkoPyFbXCI8Pl0pL2dpLFxuICAgIHNpbXBsZVVSTFJlZ2V4MiA9IC8oWyp+X10rfFxcYikoKChodHRwcz98ZnRwfGRpY3QpOlxcL1xcL3x3d3dcXC4pW14nXCI+XFxzXStcXC5bXidcIj5cXHNdKz8pKFsuIT8sKClcXFtcXF1dKT8oXFwxKT8oPz1cXHN8JCkoPyFbXCI8Pl0pL2dpLFxuICAgIGRlbGltVXJsUmVnZXggICA9IC8oKTwoKChodHRwcz98ZnRwfGRpY3QpOlxcL1xcL3x3d3dcXC4pW14nXCI+XFxzXSspKCk+KCkvZ2ksXG4gICAgc2ltcGxlTWFpbFJlZ2V4ID0gLyhefFxccykoPzptYWlsdG86KT8oW0EtWmEtejAtOSEjJCUmJyorLS89P15fYHt8fX4uXStAWy1hLXowLTldKyhcXC5bLWEtejAtOV0rKSpcXC5bYS16XSspKD89JHxcXHMpL2dtaSxcbiAgICBkZWxpbU1haWxSZWdleCAgPSAvPCgpKD86bWFpbHRvOik/KFstLlxcd10rQFstYS16MC05XSsoXFwuWy1hLXowLTldKykqXFwuW2Etel0rKT4vZ2ksXG5cbiAgICByZXBsYWNlTGluayA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAndXNlIHN0cmljdCc7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHdtLCBsZWFkaW5nTWFnaWNDaGFycywgbGluaywgbTIsIG0zLCB0cmFpbGluZ1B1bmN0dWF0aW9uLCB0cmFpbGluZ01hZ2ljQ2hhcnMpIHtcbiAgICAgICAgbGluayA9IGxpbmsucmVwbGFjZShzaG93ZG93bi5oZWxwZXIucmVnZXhlcy5hc3Rlcmlza0Rhc2hBbmRDb2xvbiwgc2hvd2Rvd24uaGVscGVyLmVzY2FwZUNoYXJhY3RlcnNDYWxsYmFjayk7XG4gICAgICAgIHZhciBsbmtUeHQgPSBsaW5rLFxuICAgICAgICAgICAgYXBwZW5kID0gJycsXG4gICAgICAgICAgICB0YXJnZXQgPSAnJyxcbiAgICAgICAgICAgIGxtYyAgICA9IGxlYWRpbmdNYWdpY0NoYXJzIHx8ICcnLFxuICAgICAgICAgICAgdG1jICAgID0gdHJhaWxpbmdNYWdpY0NoYXJzIHx8ICcnO1xuICAgICAgICBpZiAoL153d3dcXC4vaS50ZXN0KGxpbmspKSB7XG4gICAgICAgICAgbGluayA9IGxpbmsucmVwbGFjZSgvXnd3d1xcLi9pLCAnaHR0cDovL3d3dy4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5leGNsdWRlVHJhaWxpbmdQdW5jdHVhdGlvbkZyb21VUkxzICYmIHRyYWlsaW5nUHVuY3R1YXRpb24pIHtcbiAgICAgICAgICBhcHBlbmQgPSB0cmFpbGluZ1B1bmN0dWF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLm9wZW5MaW5rc0luTmV3V2luZG93KSB7XG4gICAgICAgICAgdGFyZ2V0ID0gJyB0YXJnZXQ9XCLCqEU5NUVibGFua1wiJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG1jICsgJzxhIGhyZWY9XCInICsgbGluayArICdcIicgKyB0YXJnZXQgKyAnPicgKyBsbmtUeHQgKyAnPC9hPicgKyBhcHBlbmQgKyB0bWM7XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICByZXBsYWNlTWFpbCA9IGZ1bmN0aW9uIChvcHRpb25zLCBnbG9iYWxzKSB7XG4gICAgICAndXNlIHN0cmljdCc7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHdob2xlTWF0Y2gsIGIsIG1haWwpIHtcbiAgICAgICAgdmFyIGhyZWYgPSAnbWFpbHRvOic7XG4gICAgICAgIGIgPSBiIHx8ICcnO1xuICAgICAgICBtYWlsID0gc2hvd2Rvd24uc3ViUGFyc2VyKCd1bmVzY2FwZVNwZWNpYWxDaGFycycpKG1haWwsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgICAgICBpZiAob3B0aW9ucy5lbmNvZGVFbWFpbHMpIHtcbiAgICAgICAgICBocmVmID0gc2hvd2Rvd24uaGVscGVyLmVuY29kZUVtYWlsQWRkcmVzcyhocmVmICsgbWFpbCk7XG4gICAgICAgICAgbWFpbCA9IHNob3dkb3duLmhlbHBlci5lbmNvZGVFbWFpbEFkZHJlc3MobWFpbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaHJlZiA9IGhyZWYgKyBtYWlsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiICsgJzxhIGhyZWY9XCInICsgaHJlZiArICdcIj4nICsgbWFpbCArICc8L2E+JztcbiAgICAgIH07XG4gICAgfTtcblxuc2hvd2Rvd24uc3ViUGFyc2VyKCdhdXRvTGlua3MnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnYXV0b0xpbmtzLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoZGVsaW1VcmxSZWdleCwgcmVwbGFjZUxpbmsob3B0aW9ucykpO1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKGRlbGltTWFpbFJlZ2V4LCByZXBsYWNlTWFpbChvcHRpb25zLCBnbG9iYWxzKSk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnYXV0b0xpbmtzLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgcmV0dXJuIHRleHQ7XG59KTtcblxuc2hvd2Rvd24uc3ViUGFyc2VyKCdzaW1wbGlmaWVkQXV0b0xpbmtzJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGlmICghb3B0aW9ucy5zaW1wbGlmaWVkQXV0b0xpbmspIHtcbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ3NpbXBsaWZpZWRBdXRvTGlua3MuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgaWYgKG9wdGlvbnMuZXhjbHVkZVRyYWlsaW5nUHVuY3R1YXRpb25Gcm9tVVJMcykge1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2Uoc2ltcGxlVVJMUmVnZXgyLCByZXBsYWNlTGluayhvcHRpb25zKSk7XG4gIH0gZWxzZSB7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZShzaW1wbGVVUkxSZWdleCwgcmVwbGFjZUxpbmsob3B0aW9ucykpO1xuICB9XG4gIHRleHQgPSB0ZXh0LnJlcGxhY2Uoc2ltcGxlTWFpbFJlZ2V4LCByZXBsYWNlTWFpbChvcHRpb25zLCBnbG9iYWxzKSk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnc2ltcGxpZmllZEF1dG9MaW5rcy5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuLyoqXG4gKiBUaGVzZSBhcmUgYWxsIHRoZSB0cmFuc2Zvcm1hdGlvbnMgdGhhdCBmb3JtIGJsb2NrLWxldmVsXG4gKiB0YWdzIGxpa2UgcGFyYWdyYXBocywgaGVhZGVycywgYW5kIGxpc3QgaXRlbXMuXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignYmxvY2tHYW11dCcsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdibG9ja0dhbXV0LmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIC8vIHdlIHBhcnNlIGJsb2NrcXVvdGVzIGZpcnN0IHNvIHRoYXQgd2UgY2FuIGhhdmUgaGVhZGluZ3MgYW5kIGhyc1xuICAvLyBpbnNpZGUgYmxvY2txdW90ZXNcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignYmxvY2tRdW90ZXMnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignaGVhZGVycycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIC8vIERvIEhvcml6b250YWwgUnVsZXM6XG4gIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2hvcml6b250YWxSdWxlJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignbGlzdHMnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignY29kZUJsb2NrcycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCd0YWJsZXMnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAvLyBXZSBhbHJlYWR5IHJhbiBfSGFzaEhUTUxCbG9ja3MoKSBiZWZvcmUsIGluIE1hcmtkb3duKCksIGJ1dCB0aGF0XG4gIC8vIHdhcyB0byBlc2NhcGUgcmF3IEhUTUwgaW4gdGhlIG9yaWdpbmFsIE1hcmtkb3duIHNvdXJjZS4gVGhpcyB0aW1lLFxuICAvLyB3ZSdyZSBlc2NhcGluZyB0aGUgbWFya3VwIHdlJ3ZlIGp1c3QgY3JlYXRlZCwgc28gdGhhdCB3ZSBkb24ndCB3cmFwXG4gIC8vIDxwPiB0YWdzIGFyb3VuZCBibG9jay1sZXZlbCB0YWdzLlxuICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdoYXNoSFRNTEJsb2NrcycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdwYXJhZ3JhcGhzJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnYmxvY2tHYW11dC5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuc2hvd2Rvd24uc3ViUGFyc2VyKCdibG9ja1F1b3RlcycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdibG9ja1F1b3Rlcy5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAvLyBhZGQgYSBjb3VwbGUgZXh0cmEgbGluZXMgYWZ0ZXIgdGhlIHRleHQgYW5kIGVuZHRleHQgbWFya1xuICB0ZXh0ID0gdGV4dCArICdcXG5cXG4nO1xuXG4gIHZhciByZ3ggPSAvKF4gezAsM30+WyBcXHRdPy4rXFxuKC4rXFxuKSpcXG4qKSsvZ207XG5cbiAgaWYgKG9wdGlvbnMuc3BsaXRBZGphY2VudEJsb2NrcXVvdGVzKSB7XG4gICAgcmd4ID0gL14gezAsM30+W1xcc1xcU10qPyg/OlxcblxcbikvZ207XG4gIH1cblxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHJneCwgZnVuY3Rpb24gKGJxKSB7XG4gICAgLy8gYXR0YWNrbGFiOiBoYWNrIGFyb3VuZCBLb25xdWVyb3IgMy41LjQgYnVnOlxuICAgIC8vIFwiLS0tLS0tLS0tLWJ1Z1wiLnJlcGxhY2UoL14tL2csXCJcIikgPT0gXCJidWdcIlxuICAgIGJxID0gYnEucmVwbGFjZSgvXlsgXFx0XSo+WyBcXHRdPy9nbSwgJycpOyAvLyB0cmltIG9uZSBsZXZlbCBvZiBxdW90aW5nXG5cbiAgICAvLyBhdHRhY2tsYWI6IGNsZWFuIHVwIGhhY2tcbiAgICBicSA9IGJxLnJlcGxhY2UoL8KoMC9nLCAnJyk7XG5cbiAgICBicSA9IGJxLnJlcGxhY2UoL15bIFxcdF0rJC9nbSwgJycpOyAvLyB0cmltIHdoaXRlc3BhY2Utb25seSBsaW5lc1xuICAgIGJxID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdnaXRodWJDb2RlQmxvY2tzJykoYnEsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgIGJxID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdibG9ja0dhbXV0JykoYnEsIG9wdGlvbnMsIGdsb2JhbHMpOyAvLyByZWN1cnNlXG5cbiAgICBicSA9IGJxLnJlcGxhY2UoLyhefFxcbikvZywgJyQxICAnKTtcbiAgICAvLyBUaGVzZSBsZWFkaW5nIHNwYWNlcyBzY3JldyB3aXRoIDxwcmU+IGNvbnRlbnQsIHNvIHdlIG5lZWQgdG8gZml4IHRoYXQ6XG4gICAgYnEgPSBicS5yZXBsYWNlKC8oXFxzKjxwcmU+W15cXHJdKz88XFwvcHJlPikvZ20sIGZ1bmN0aW9uICh3aG9sZU1hdGNoLCBtMSkge1xuICAgICAgdmFyIHByZSA9IG0xO1xuICAgICAgLy8gYXR0YWNrbGFiOiBoYWNrIGFyb3VuZCBLb25xdWVyb3IgMy41LjQgYnVnOlxuICAgICAgcHJlID0gcHJlLnJlcGxhY2UoL14gIC9tZywgJ8KoMCcpO1xuICAgICAgcHJlID0gcHJlLnJlcGxhY2UoL8KoMC9nLCAnJyk7XG4gICAgICByZXR1cm4gcHJlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNob3dkb3duLnN1YlBhcnNlcignaGFzaEJsb2NrJykoJzxibG9ja3F1b3RlPlxcbicgKyBicSArICdcXG48L2Jsb2NrcXVvdGU+Jywgb3B0aW9ucywgZ2xvYmFscyk7XG4gIH0pO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2Jsb2NrUXVvdGVzLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuLyoqXG4gKiBQcm9jZXNzIE1hcmtkb3duIGA8cHJlPjxjb2RlPmAgYmxvY2tzLlxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2NvZGVCbG9ja3MnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnY29kZUJsb2Nrcy5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAvLyBzZW50aW5lbCB3b3JrYXJvdW5kcyBmb3IgbGFjayBvZiBcXEEgYW5kIFxcWiwgc2FmYXJpXFxraHRtbCBidWdcbiAgdGV4dCArPSAnwqgwJztcblxuICB2YXIgcGF0dGVybiA9IC8oPzpcXG5cXG58XikoKD86KD86WyBdezR9fFxcdCkuKlxcbispKykoXFxuKlsgXXswLDN9W14gXFx0XFxuXXwoPz3CqDApKS9nO1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHBhdHRlcm4sIGZ1bmN0aW9uICh3aG9sZU1hdGNoLCBtMSwgbTIpIHtcbiAgICB2YXIgY29kZWJsb2NrID0gbTEsXG4gICAgICAgIG5leHRDaGFyID0gbTIsXG4gICAgICAgIGVuZCA9ICdcXG4nO1xuXG4gICAgY29kZWJsb2NrID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdvdXRkZW50JykoY29kZWJsb2NrLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICBjb2RlYmxvY2sgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2VuY29kZUNvZGUnKShjb2RlYmxvY2ssIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgIGNvZGVibG9jayA9IHNob3dkb3duLnN1YlBhcnNlcignZGV0YWInKShjb2RlYmxvY2ssIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgIGNvZGVibG9jayA9IGNvZGVibG9jay5yZXBsYWNlKC9eXFxuKy9nLCAnJyk7IC8vIHRyaW0gbGVhZGluZyBuZXdsaW5lc1xuICAgIGNvZGVibG9jayA9IGNvZGVibG9jay5yZXBsYWNlKC9cXG4rJC9nLCAnJyk7IC8vIHRyaW0gdHJhaWxpbmcgbmV3bGluZXNcblxuICAgIGlmIChvcHRpb25zLm9taXRFeHRyYVdMSW5Db2RlQmxvY2tzKSB7XG4gICAgICBlbmQgPSAnJztcbiAgICB9XG5cbiAgICBjb2RlYmxvY2sgPSAnPHByZT48Y29kZT4nICsgY29kZWJsb2NrICsgZW5kICsgJzwvY29kZT48L3ByZT4nO1xuXG4gICAgcmV0dXJuIHNob3dkb3duLnN1YlBhcnNlcignaGFzaEJsb2NrJykoY29kZWJsb2NrLCBvcHRpb25zLCBnbG9iYWxzKSArIG5leHRDaGFyO1xuICB9KTtcblxuICAvLyBzdHJpcCBzZW50aW5lbFxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC/CqDAvLCAnJyk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnY29kZUJsb2Nrcy5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbi8qKlxuICpcbiAqICAgKiAgQmFja3RpY2sgcXVvdGVzIGFyZSB1c2VkIGZvciA8Y29kZT48L2NvZGU+IHNwYW5zLlxuICpcbiAqICAgKiAgWW91IGNhbiB1c2UgbXVsdGlwbGUgYmFja3RpY2tzIGFzIHRoZSBkZWxpbWl0ZXJzIGlmIHlvdSB3YW50IHRvXG4gKiAgICAgaW5jbHVkZSBsaXRlcmFsIGJhY2t0aWNrcyBpbiB0aGUgY29kZSBzcGFuLiBTbywgdGhpcyBpbnB1dDpcbiAqXG4gKiAgICAgICAgIEp1c3QgdHlwZSBgYGZvbyBgYmFyYCBiYXpgYCBhdCB0aGUgcHJvbXB0LlxuICpcbiAqICAgICAgIFdpbGwgdHJhbnNsYXRlIHRvOlxuICpcbiAqICAgICAgICAgPHA+SnVzdCB0eXBlIDxjb2RlPmZvbyBgYmFyYCBiYXo8L2NvZGU+IGF0IHRoZSBwcm9tcHQuPC9wPlxuICpcbiAqICAgIFRoZXJlJ3Mgbm8gYXJiaXRyYXJ5IGxpbWl0IHRvIHRoZSBudW1iZXIgb2YgYmFja3RpY2tzIHlvdVxuICogICAgY2FuIHVzZSBhcyBkZWxpbXRlcnMuIElmIHlvdSBuZWVkIHRocmVlIGNvbnNlY3V0aXZlIGJhY2t0aWNrc1xuICogICAgaW4geW91ciBjb2RlLCB1c2UgZm91ciBmb3IgZGVsaW1pdGVycywgZXRjLlxuICpcbiAqICAqICBZb3UgY2FuIHVzZSBzcGFjZXMgdG8gZ2V0IGxpdGVyYWwgYmFja3RpY2tzIGF0IHRoZSBlZGdlczpcbiAqXG4gKiAgICAgICAgIC4uLiB0eXBlIGBgIGBiYXJgIGBgIC4uLlxuICpcbiAqICAgICAgIFR1cm5zIHRvOlxuICpcbiAqICAgICAgICAgLi4uIHR5cGUgPGNvZGU+YGJhcmA8L2NvZGU+IC4uLlxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2NvZGVTcGFucycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdjb2RlU3BhbnMuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgaWYgKHR5cGVvZih0ZXh0KSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0ZXh0ID0gJyc7XG4gIH1cbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvKF58W15cXFxcXSkoYCspKFteXFxyXSo/W15gXSlcXDIoPyFgKS9nbSxcbiAgICBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbTEsIG0yLCBtMykge1xuICAgICAgdmFyIGMgPSBtMztcbiAgICAgIGMgPSBjLnJlcGxhY2UoL14oWyBcXHRdKikvZywgJycpO1x0Ly8gbGVhZGluZyB3aGl0ZXNwYWNlXG4gICAgICBjID0gYy5yZXBsYWNlKC9bIFxcdF0qJC9nLCAnJyk7XHQvLyB0cmFpbGluZyB3aGl0ZXNwYWNlXG4gICAgICBjID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdlbmNvZGVDb2RlJykoYywgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgICBjID0gbTEgKyAnPGNvZGU+JyArIGMgKyAnPC9jb2RlPic7XG4gICAgICBjID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdoYXNoSFRNTFNwYW5zJykoYywgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgICByZXR1cm4gYztcbiAgICB9XG4gICk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnY29kZVNwYW5zLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuLyoqXG4gKiBDcmVhdGUgYSBmdWxsIEhUTUwgZG9jdW1lbnQgZnJvbSB0aGUgcHJvY2Vzc2VkIG1hcmtkb3duXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignY29tcGxldGVIVE1MRG9jdW1lbnQnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKCFvcHRpb25zLmNvbXBsZXRlSFRNTERvY3VtZW50KSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdjb21wbGV0ZUhUTUxEb2N1bWVudC5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICB2YXIgZG9jdHlwZSA9ICdodG1sJyxcbiAgICAgIGRvY3R5cGVQYXJzZWQgPSAnPCFET0NUWVBFIEhUTUw+XFxuJyxcbiAgICAgIHRpdGxlID0gJycsXG4gICAgICBjaGFyc2V0ID0gJzxtZXRhIGNoYXJzZXQ9XCJ1dGYtOFwiPlxcbicsXG4gICAgICBsYW5nID0gJycsXG4gICAgICBtZXRhZGF0YSA9ICcnO1xuXG4gIGlmICh0eXBlb2YgZ2xvYmFscy5tZXRhZGF0YS5wYXJzZWQuZG9jdHlwZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBkb2N0eXBlUGFyc2VkID0gJzwhRE9DVFlQRSAnICsgIGdsb2JhbHMubWV0YWRhdGEucGFyc2VkLmRvY3R5cGUgKyAnPlxcbic7XG4gICAgZG9jdHlwZSA9IGdsb2JhbHMubWV0YWRhdGEucGFyc2VkLmRvY3R5cGUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChkb2N0eXBlID09PSAnaHRtbCcgfHwgZG9jdHlwZSA9PT0gJ2h0bWw1Jykge1xuICAgICAgY2hhcnNldCA9ICc8bWV0YSBjaGFyc2V0PVwidXRmLThcIj4nO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIG1ldGEgaW4gZ2xvYmFscy5tZXRhZGF0YS5wYXJzZWQpIHtcbiAgICBpZiAoZ2xvYmFscy5tZXRhZGF0YS5wYXJzZWQuaGFzT3duUHJvcGVydHkobWV0YSkpIHtcbiAgICAgIHN3aXRjaCAobWV0YS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgIGNhc2UgJ2RvY3R5cGUnOlxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3RpdGxlJzpcbiAgICAgICAgICB0aXRsZSA9ICc8dGl0bGU+JyArICBnbG9iYWxzLm1ldGFkYXRhLnBhcnNlZC50aXRsZSArICc8L3RpdGxlPlxcbic7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnY2hhcnNldCc6XG4gICAgICAgICAgaWYgKGRvY3R5cGUgPT09ICdodG1sJyB8fCBkb2N0eXBlID09PSAnaHRtbDUnKSB7XG4gICAgICAgICAgICBjaGFyc2V0ID0gJzxtZXRhIGNoYXJzZXQ9XCInICsgZ2xvYmFscy5tZXRhZGF0YS5wYXJzZWQuY2hhcnNldCArICdcIj5cXG4nO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGFyc2V0ID0gJzxtZXRhIG5hbWU9XCJjaGFyc2V0XCIgY29udGVudD1cIicgKyBnbG9iYWxzLm1ldGFkYXRhLnBhcnNlZC5jaGFyc2V0ICsgJ1wiPlxcbic7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2xhbmd1YWdlJzpcbiAgICAgICAgY2FzZSAnbGFuZyc6XG4gICAgICAgICAgbGFuZyA9ICcgbGFuZz1cIicgKyBnbG9iYWxzLm1ldGFkYXRhLnBhcnNlZFttZXRhXSArICdcIic7XG4gICAgICAgICAgbWV0YWRhdGEgKz0gJzxtZXRhIG5hbWU9XCInICsgbWV0YSArICdcIiBjb250ZW50PVwiJyArIGdsb2JhbHMubWV0YWRhdGEucGFyc2VkW21ldGFdICsgJ1wiPlxcbic7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBtZXRhZGF0YSArPSAnPG1ldGEgbmFtZT1cIicgKyBtZXRhICsgJ1wiIGNvbnRlbnQ9XCInICsgZ2xvYmFscy5tZXRhZGF0YS5wYXJzZWRbbWV0YV0gKyAnXCI+XFxuJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0ZXh0ID0gZG9jdHlwZVBhcnNlZCArICc8aHRtbCcgKyBsYW5nICsgJz5cXG48aGVhZD5cXG4nICsgdGl0bGUgKyBjaGFyc2V0ICsgbWV0YWRhdGEgKyAnPC9oZWFkPlxcbjxib2R5PlxcbicgKyB0ZXh0LnRyaW0oKSArICdcXG48L2JvZHk+XFxuPC9odG1sPic7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnY29tcGxldGVIVE1MRG9jdW1lbnQuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG4vKipcbiAqIENvbnZlcnQgYWxsIHRhYnMgdG8gc3BhY2VzXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignZGV0YWInLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2RldGFiLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIC8vIGV4cGFuZCBmaXJzdCBuLTEgdGFic1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHQoPz1cXHQpL2csICcgICAgJyk7IC8vIGdfdGFiX3dpZHRoXG5cbiAgLy8gcmVwbGFjZSB0aGUgbnRoIHdpdGggdHdvIHNlbnRpbmVsc1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHQvZywgJ8KoQcKoQicpO1xuXG4gIC8vIHVzZSB0aGUgc2VudGluZWwgdG8gYW5jaG9yIG91ciByZWdleCBzbyBpdCBkb2Vzbid0IGV4cGxvZGVcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvwqhCKC4rPynCqEEvZywgZnVuY3Rpb24gKHdob2xlTWF0Y2gsIG0xKSB7XG4gICAgdmFyIGxlYWRpbmdUZXh0ID0gbTEsXG4gICAgICAgIG51bVNwYWNlcyA9IDQgLSBsZWFkaW5nVGV4dC5sZW5ndGggJSA0OyAgLy8gZ190YWJfd2lkdGhcblxuICAgIC8vIHRoZXJlICptdXN0KiBiZSBhIGJldHRlciB3YXkgdG8gZG8gdGhpczpcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVNwYWNlczsgaSsrKSB7XG4gICAgICBsZWFkaW5nVGV4dCArPSAnICc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxlYWRpbmdUZXh0O1xuICB9KTtcblxuICAvLyBjbGVhbiB1cCBzZW50aW5lbHNcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvwqhBL2csICcgICAgJyk7ICAvLyBnX3RhYl93aWR0aFxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC/CqEIvZywgJycpO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2RldGFiLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuc2hvd2Rvd24uc3ViUGFyc2VyKCdlbGxpcHNpcycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdlbGxpcHNpcy5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXC5cXC5cXC4vZywgJ+KApicpO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2VsbGlwc2lzLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG4vKipcbiAqIFR1cm4gZW1vamkgY29kZXMgaW50byBlbW9qaXNcbiAqXG4gKiBMaXN0IG9mIHN1cHBvcnRlZCBlbW9qaXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9zaG93ZG93bmpzL3Nob3dkb3duL3dpa2kvRW1vamlzXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignZW1vamknLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKCFvcHRpb25zLmVtb2ppKSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdlbW9qaS5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICB2YXIgZW1vamlSZ3ggPSAvOihbXFxTXSs/KTovZztcblxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKGVtb2ppUmd4LCBmdW5jdGlvbiAod20sIGVtb2ppQ29kZSkge1xuICAgIGlmIChzaG93ZG93bi5oZWxwZXIuZW1vamlzLmhhc093blByb3BlcnR5KGVtb2ppQ29kZSkpIHtcbiAgICAgIHJldHVybiBzaG93ZG93bi5oZWxwZXIuZW1vamlzW2Vtb2ppQ29kZV07XG4gICAgfVxuICAgIHJldHVybiB3bTtcbiAgfSk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnZW1vamkuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbi8qKlxuICogU21hcnQgcHJvY2Vzc2luZyBmb3IgYW1wZXJzYW5kcyBhbmQgYW5nbGUgYnJhY2tldHMgdGhhdCBuZWVkIHRvIGJlIGVuY29kZWQuXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignZW5jb2RlQW1wc0FuZEFuZ2xlcycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnZW5jb2RlQW1wc0FuZEFuZ2xlcy5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAvLyBBbXBlcnNhbmQtZW5jb2RpbmcgYmFzZWQgZW50aXJlbHkgb24gTmF0IElyb25zJ3MgQW1wdXRhdG9yIE1UIHBsdWdpbjpcbiAgLy8gaHR0cDovL2J1bXBwby5uZXQvcHJvamVjdHMvYW1wdXRhdG9yL1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8mKD8hIz9beFhdPyg/OlswLTlhLWZBLUZdK3xcXHcrKTspL2csICcmYW1wOycpO1xuXG4gIC8vIEVuY29kZSBuYWtlZCA8J3NcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvPCg/IVthLXpcXC8/JCFdKS9naSwgJyZsdDsnKTtcblxuICAvLyBFbmNvZGUgPFxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC88L2csICcmbHQ7Jyk7XG5cbiAgLy8gRW5jb2RlID5cbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2VuY29kZUFtcHNBbmRBbmdsZXMuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG4vKipcbiAqIFJldHVybnMgdGhlIHN0cmluZywgd2l0aCBhZnRlciBwcm9jZXNzaW5nIHRoZSBmb2xsb3dpbmcgYmFja3NsYXNoIGVzY2FwZSBzZXF1ZW5jZXMuXG4gKlxuICogYXR0YWNrbGFiOiBUaGUgcG9saXRlIHdheSB0byBkbyB0aGlzIGlzIHdpdGggdGhlIG5ldyBlc2NhcGVDaGFyYWN0ZXJzKCkgZnVuY3Rpb246XG4gKlxuICogICAgdGV4dCA9IGVzY2FwZUNoYXJhY3RlcnModGV4dCxcIlxcXFxcIix0cnVlKTtcbiAqICAgIHRleHQgPSBlc2NhcGVDaGFyYWN0ZXJzKHRleHQsXCJgKl97fVtdKCk+IystLiFcIix0cnVlKTtcbiAqXG4gKiAuLi5idXQgd2UncmUgc2lkZXN0ZXBwaW5nIGl0cyB1c2Ugb2YgdGhlIChzbG93KSBSZWdFeHAgY29uc3RydWN0b3JcbiAqIGFzIGFuIG9wdGltaXphdGlvbiBmb3IgRmlyZWZveC4gIFRoaXMgZnVuY3Rpb24gZ2V0cyBjYWxsZWQgYSBMT1QuXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignZW5jb2RlQmFja3NsYXNoRXNjYXBlcycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnZW5jb2RlQmFja3NsYXNoRXNjYXBlcy5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXFxcKFxcXFwpL2csIHNob3dkb3duLmhlbHBlci5lc2NhcGVDaGFyYWN0ZXJzQ2FsbGJhY2spO1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXFxcKFtgKl97fVxcW1xcXSgpPiMrLiF+PXwtXSkvZywgc2hvd2Rvd24uaGVscGVyLmVzY2FwZUNoYXJhY3RlcnNDYWxsYmFjayk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnZW5jb2RlQmFja3NsYXNoRXNjYXBlcy5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbi8qKlxuICogRW5jb2RlL2VzY2FwZSBjZXJ0YWluIGNoYXJhY3RlcnMgaW5zaWRlIE1hcmtkb3duIGNvZGUgcnVucy5cbiAqIFRoZSBwb2ludCBpcyB0aGF0IGluIGNvZGUsIHRoZXNlIGNoYXJhY3RlcnMgYXJlIGxpdGVyYWxzLFxuICogYW5kIGxvc2UgdGhlaXIgc3BlY2lhbCBNYXJrZG93biBtZWFuaW5ncy5cbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCdlbmNvZGVDb2RlJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2VuY29kZUNvZGUuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgLy8gRW5jb2RlIGFsbCBhbXBlcnNhbmRzOyBIVE1MIGVudGl0aWVzIGFyZSBub3RcbiAgLy8gZW50aXRpZXMgd2l0aGluIGEgTWFya2Rvd24gY29kZSBzcGFuLlxuICB0ZXh0ID0gdGV4dFxuICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXG4gIC8vIERvIHRoZSBhbmdsZSBicmFja2V0IHNvbmcgYW5kIGRhbmNlOlxuICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gIC8vIE5vdywgZXNjYXBlIGNoYXJhY3RlcnMgdGhhdCBhcmUgbWFnaWMgaW4gTWFya2Rvd246XG4gICAgLnJlcGxhY2UoLyhbKl97fVxcW1xcXVxcXFw9fi1dKS9nLCBzaG93ZG93bi5oZWxwZXIuZXNjYXBlQ2hhcmFjdGVyc0NhbGxiYWNrKTtcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdlbmNvZGVDb2RlLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuLyoqXG4gKiBXaXRoaW4gdGFncyAtLSBtZWFuaW5nIGJldHdlZW4gPCBhbmQgPiAtLSBlbmNvZGUgW1xcIGAgKiBfIH4gPV0gc28gdGhleVxuICogZG9uJ3QgY29uZmxpY3Qgd2l0aCB0aGVpciB1c2UgaW4gTWFya2Rvd24gZm9yIGNvZGUsIGl0YWxpY3MgYW5kIHN0cm9uZy5cbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCdlc2NhcGVTcGVjaWFsQ2hhcnNXaXRoaW5UYWdBdHRyaWJ1dGVzJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdlc2NhcGVTcGVjaWFsQ2hhcnNXaXRoaW5UYWdBdHRyaWJ1dGVzLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIC8vIEJ1aWxkIGEgcmVnZXggdG8gZmluZCBIVE1MIHRhZ3MuXG4gIHZhciB0YWdzICAgICA9IC88XFwvP1thLXpcXGRfOi1dKyg/OltcXHNdK1tcXHNcXFNdKz8pPz4vZ2ksXG4gICAgICBjb21tZW50cyA9IC88ISgtLSg/Oig/OltePi1dfC1bXj5dKSg/OlteLV18LVteLV0pKiktLSk+L2dpO1xuXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UodGFncywgZnVuY3Rpb24gKHdob2xlTWF0Y2gpIHtcbiAgICByZXR1cm4gd2hvbGVNYXRjaFxuICAgICAgLnJlcGxhY2UoLyguKTxcXC8/Y29kZT4oPz0uKS9nLCAnJDFgJylcbiAgICAgIC5yZXBsYWNlKC8oW1xcXFxgKl9+PXxdKS9nLCBzaG93ZG93bi5oZWxwZXIuZXNjYXBlQ2hhcmFjdGVyc0NhbGxiYWNrKTtcbiAgfSk7XG5cbiAgdGV4dCA9IHRleHQucmVwbGFjZShjb21tZW50cywgZnVuY3Rpb24gKHdob2xlTWF0Y2gpIHtcbiAgICByZXR1cm4gd2hvbGVNYXRjaFxuICAgICAgLnJlcGxhY2UoLyhbXFxcXGAqX349fF0pL2csIHNob3dkb3duLmhlbHBlci5lc2NhcGVDaGFyYWN0ZXJzQ2FsbGJhY2spO1xuICB9KTtcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdlc2NhcGVTcGVjaWFsQ2hhcnNXaXRoaW5UYWdBdHRyaWJ1dGVzLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuLyoqXG4gKiBIYW5kbGUgZ2l0aHViIGNvZGVibG9ja3MgcHJpb3IgdG8gcnVubmluZyBIYXNoSFRNTCBzbyB0aGF0XG4gKiBIVE1MIGNvbnRhaW5lZCB3aXRoaW4gdGhlIGNvZGVibG9jayBnZXRzIGVzY2FwZWQgcHJvcGVybHlcbiAqIEV4YW1wbGU6XG4gKiBgYGBydWJ5XG4gKiAgICAgZGVmIGhlbGxvX3dvcmxkKHgpXG4gKiAgICAgICBwdXRzIFwiSGVsbG8sICN7eH1cIlxuICogICAgIGVuZFxuICogYGBgXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignZ2l0aHViQ29kZUJsb2NrcycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBlYXJseSBleGl0IGlmIG9wdGlvbiBpcyBub3QgZW5hYmxlZFxuICBpZiAoIW9wdGlvbnMuZ2hDb2RlQmxvY2tzKSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdnaXRodWJDb2RlQmxvY2tzLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIHRleHQgKz0gJ8KoMCc7XG5cbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvKD86XnxcXG4pKD86IHswLDN9KShgYGArfH5+fispKD86ICopKFteXFxzYH5dKilcXG4oW1xcc1xcU10qPylcXG4oPzogezAsM30pXFwxL2csIGZ1bmN0aW9uICh3aG9sZU1hdGNoLCBkZWxpbSwgbGFuZ3VhZ2UsIGNvZGVibG9jaykge1xuICAgIHZhciBlbmQgPSAob3B0aW9ucy5vbWl0RXh0cmFXTEluQ29kZUJsb2NrcykgPyAnJyA6ICdcXG4nO1xuXG4gICAgLy8gRmlyc3QgcGFyc2UgdGhlIGdpdGh1YiBjb2RlIGJsb2NrXG4gICAgY29kZWJsb2NrID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdlbmNvZGVDb2RlJykoY29kZWJsb2NrLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICBjb2RlYmxvY2sgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2RldGFiJykoY29kZWJsb2NrLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICBjb2RlYmxvY2sgPSBjb2RlYmxvY2sucmVwbGFjZSgvXlxcbisvZywgJycpOyAvLyB0cmltIGxlYWRpbmcgbmV3bGluZXNcbiAgICBjb2RlYmxvY2sgPSBjb2RlYmxvY2sucmVwbGFjZSgvXFxuKyQvZywgJycpOyAvLyB0cmltIHRyYWlsaW5nIHdoaXRlc3BhY2VcblxuICAgIGNvZGVibG9jayA9ICc8cHJlPjxjb2RlJyArIChsYW5ndWFnZSA/ICcgY2xhc3M9XCInICsgbGFuZ3VhZ2UgKyAnIGxhbmd1YWdlLScgKyBsYW5ndWFnZSArICdcIicgOiAnJykgKyAnPicgKyBjb2RlYmxvY2sgKyBlbmQgKyAnPC9jb2RlPjwvcHJlPic7XG5cbiAgICBjb2RlYmxvY2sgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hCbG9jaycpKGNvZGVibG9jaywgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgICAvLyBTaW5jZSBHSENvZGVibG9ja3MgY2FuIGJlIGZhbHNlIHBvc2l0aXZlcywgd2UgbmVlZCB0b1xuICAgIC8vIHN0b3JlIHRoZSBwcmltaXRpdmUgdGV4dCBhbmQgdGhlIHBhcnNlZCB0ZXh0IGluIGEgZ2xvYmFsIHZhcixcbiAgICAvLyBhbmQgdGhlbiByZXR1cm4gYSB0b2tlblxuICAgIHJldHVybiAnXFxuXFxuwqhHJyArIChnbG9iYWxzLmdoQ29kZUJsb2Nrcy5wdXNoKHt0ZXh0OiB3aG9sZU1hdGNoLCBjb2RlYmxvY2s6IGNvZGVibG9ja30pIC0gMSkgKyAnR1xcblxcbic7XG4gIH0pO1xuXG4gIC8vIGF0dGFja2xhYjogc3RyaXAgc2VudGluZWxcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvwqgwLywgJycpO1xuXG4gIHJldHVybiBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2dpdGh1YkNvZGVCbG9ja3MuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcignaGFzaEJsb2NrJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdoYXNoQmxvY2suYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoLyheXFxuK3xcXG4rJCkvZywgJycpO1xuICB0ZXh0ID0gJ1xcblxcbsKoSycgKyAoZ2xvYmFscy5nSHRtbEJsb2Nrcy5wdXNoKHRleHQpIC0gMSkgKyAnS1xcblxcbic7XG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2hhc2hCbG9jay5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbi8qKlxuICogSGFzaCBhbmQgZXNjYXBlIDxjb2RlPiBlbGVtZW50cyB0aGF0IHNob3VsZCBub3QgYmUgcGFyc2VkIGFzIG1hcmtkb3duXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignaGFzaENvZGVUYWdzJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdoYXNoQ29kZVRhZ3MuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgdmFyIHJlcEZ1bmMgPSBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbWF0Y2gsIGxlZnQsIHJpZ2h0KSB7XG4gICAgdmFyIGNvZGVibG9jayA9IGxlZnQgKyBzaG93ZG93bi5zdWJQYXJzZXIoJ2VuY29kZUNvZGUnKShtYXRjaCwgb3B0aW9ucywgZ2xvYmFscykgKyByaWdodDtcbiAgICByZXR1cm4gJ8KoQycgKyAoZ2xvYmFscy5nSHRtbFNwYW5zLnB1c2goY29kZWJsb2NrKSAtIDEpICsgJ0MnO1xuICB9O1xuXG4gIC8vIEhhc2ggbmFrZWQgPGNvZGU+XG4gIHRleHQgPSBzaG93ZG93bi5oZWxwZXIucmVwbGFjZVJlY3Vyc2l2ZVJlZ0V4cCh0ZXh0LCByZXBGdW5jLCAnPGNvZGVcXFxcYltePl0qPicsICc8L2NvZGU+JywgJ2dpbScpO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2hhc2hDb2RlVGFncy5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcignaGFzaEVsZW1lbnQnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICh3aG9sZU1hdGNoLCBtMSkge1xuICAgIHZhciBibG9ja1RleHQgPSBtMTtcblxuICAgIC8vIFVuZG8gZG91YmxlIGxpbmVzXG4gICAgYmxvY2tUZXh0ID0gYmxvY2tUZXh0LnJlcGxhY2UoL1xcblxcbi9nLCAnXFxuJyk7XG4gICAgYmxvY2tUZXh0ID0gYmxvY2tUZXh0LnJlcGxhY2UoL15cXG4vLCAnJyk7XG5cbiAgICAvLyBzdHJpcCB0cmFpbGluZyBibGFuayBsaW5lc1xuICAgIGJsb2NrVGV4dCA9IGJsb2NrVGV4dC5yZXBsYWNlKC9cXG4rJC9nLCAnJyk7XG5cbiAgICAvLyBSZXBsYWNlIHRoZSBlbGVtZW50IHRleHQgd2l0aCBhIG1hcmtlciAoXCLCqEt4S1wiIHdoZXJlIHggaXMgaXRzIGtleSlcbiAgICBibG9ja1RleHQgPSAnXFxuXFxuwqhLJyArIChnbG9iYWxzLmdIdG1sQmxvY2tzLnB1c2goYmxvY2tUZXh0KSAtIDEpICsgJ0tcXG5cXG4nO1xuXG4gICAgcmV0dXJuIGJsb2NrVGV4dDtcbiAgfTtcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcignaGFzaEhUTUxCbG9ja3MnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2hhc2hIVE1MQmxvY2tzLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIHZhciBibG9ja1RhZ3MgPSBbXG4gICAgICAgICdwcmUnLFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgJ2gxJyxcbiAgICAgICAgJ2gyJyxcbiAgICAgICAgJ2gzJyxcbiAgICAgICAgJ2g0JyxcbiAgICAgICAgJ2g1JyxcbiAgICAgICAgJ2g2JyxcbiAgICAgICAgJ2Jsb2NrcXVvdGUnLFxuICAgICAgICAndGFibGUnLFxuICAgICAgICAnZGwnLFxuICAgICAgICAnb2wnLFxuICAgICAgICAndWwnLFxuICAgICAgICAnc2NyaXB0JyxcbiAgICAgICAgJ25vc2NyaXB0JyxcbiAgICAgICAgJ2Zvcm0nLFxuICAgICAgICAnZmllbGRzZXQnLFxuICAgICAgICAnaWZyYW1lJyxcbiAgICAgICAgJ21hdGgnLFxuICAgICAgICAnc3R5bGUnLFxuICAgICAgICAnc2VjdGlvbicsXG4gICAgICAgICdoZWFkZXInLFxuICAgICAgICAnZm9vdGVyJyxcbiAgICAgICAgJ25hdicsXG4gICAgICAgICdhcnRpY2xlJyxcbiAgICAgICAgJ2FzaWRlJyxcbiAgICAgICAgJ2FkZHJlc3MnLFxuICAgICAgICAnYXVkaW8nLFxuICAgICAgICAnY2FudmFzJyxcbiAgICAgICAgJ2ZpZ3VyZScsXG4gICAgICAgICdoZ3JvdXAnLFxuICAgICAgICAnb3V0cHV0JyxcbiAgICAgICAgJ3ZpZGVvJyxcbiAgICAgICAgJ3AnXG4gICAgICBdLFxuICAgICAgcmVwRnVuYyA9IGZ1bmN0aW9uICh3aG9sZU1hdGNoLCBtYXRjaCwgbGVmdCwgcmlnaHQpIHtcbiAgICAgICAgdmFyIHR4dCA9IHdob2xlTWF0Y2g7XG4gICAgICAgIC8vIGNoZWNrIGlmIHRoaXMgaHRtbCBlbGVtZW50IGlzIG1hcmtlZCBhcyBtYXJrZG93blxuICAgICAgICAvLyBpZiBzbywgaXQncyBjb250ZW50cyBzaG91bGQgYmUgcGFyc2VkIGFzIG1hcmtkb3duXG4gICAgICAgIGlmIChsZWZ0LnNlYXJjaCgvXFxibWFya2Rvd25cXGIvKSAhPT0gLTEpIHtcbiAgICAgICAgICB0eHQgPSBsZWZ0ICsgZ2xvYmFscy5jb252ZXJ0ZXIubWFrZUh0bWwobWF0Y2gpICsgcmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdcXG5cXG7CqEsnICsgKGdsb2JhbHMuZ0h0bWxCbG9ja3MucHVzaCh0eHQpIC0gMSkgKyAnS1xcblxcbic7XG4gICAgICB9O1xuXG4gIGlmIChvcHRpb25zLmJhY2tzbGFzaEVzY2FwZXNIVE1MVGFncykge1xuICAgIC8vIGVuY29kZSBiYWNrc2xhc2ggZXNjYXBlZCBIVE1MIHRhZ3NcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXFxcPChcXC8/W14+XSs/KT4vZywgZnVuY3Rpb24gKHdtLCBpbnNpZGUpIHtcbiAgICAgIHJldHVybiAnJmx0OycgKyBpbnNpZGUgKyAnJmd0Oyc7XG4gICAgfSk7XG4gIH1cblxuICAvLyBoYXNoIEhUTUwgQmxvY2tzXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYmxvY2tUYWdzLmxlbmd0aDsgKytpKSB7XG5cbiAgICB2YXIgb3BUYWdQb3MsXG4gICAgICAgIHJneDEgICAgID0gbmV3IFJlZ0V4cCgnXiB7MCwzfSg8JyArIGJsb2NrVGFnc1tpXSArICdcXFxcYltePl0qPiknLCAnaW0nKSxcbiAgICAgICAgcGF0TGVmdCAgPSAnPCcgKyBibG9ja1RhZ3NbaV0gKyAnXFxcXGJbXj5dKj4nLFxuICAgICAgICBwYXRSaWdodCA9ICc8LycgKyBibG9ja1RhZ3NbaV0gKyAnPic7XG4gICAgLy8gMS4gTG9vayBmb3IgdGhlIGZpcnN0IHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvcGVuaW5nIEhUTUwgdGFnIGluIHRoZSB0ZXh0XG4gICAgd2hpbGUgKChvcFRhZ1BvcyA9IHNob3dkb3duLmhlbHBlci5yZWdleEluZGV4T2YodGV4dCwgcmd4MSkpICE9PSAtMSkge1xuXG4gICAgICAvLyBpZiB0aGUgSFRNTCB0YWcgaXMgXFwgZXNjYXBlZCwgd2UgbmVlZCB0byBlc2NhcGUgaXQgYW5kIGJyZWFrXG5cblxuICAgICAgLy8yLiBTcGxpdCB0aGUgdGV4dCBpbiB0aGF0IHBvc2l0aW9uXG4gICAgICB2YXIgc3ViVGV4dHMgPSBzaG93ZG93bi5oZWxwZXIuc3BsaXRBdEluZGV4KHRleHQsIG9wVGFnUG9zKSxcbiAgICAgIC8vMy4gTWF0Y2ggcmVjdXJzaXZlbHlcbiAgICAgICAgICBuZXdTdWJUZXh0MSA9IHNob3dkb3duLmhlbHBlci5yZXBsYWNlUmVjdXJzaXZlUmVnRXhwKHN1YlRleHRzWzFdLCByZXBGdW5jLCBwYXRMZWZ0LCBwYXRSaWdodCwgJ2ltJyk7XG5cbiAgICAgIC8vIHByZXZlbnQgYW4gaW5maW5pdGUgbG9vcFxuICAgICAgaWYgKG5ld1N1YlRleHQxID09PSBzdWJUZXh0c1sxXSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHRleHQgPSBzdWJUZXh0c1swXS5jb25jYXQobmV3U3ViVGV4dDEpO1xuICAgIH1cbiAgfVxuICAvLyBIUiBTUEVDSUFMIENBU0VcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvKFxcbiB7MCwzfSg8KGhyKVxcYihbXjw+XSkqP1xcLz8+KVsgXFx0XSooPz1cXG57Mix9KSkvZyxcbiAgICBzaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hFbGVtZW50JykodGV4dCwgb3B0aW9ucywgZ2xvYmFscykpO1xuXG4gIC8vIFNwZWNpYWwgY2FzZSBmb3Igc3RhbmRhbG9uZSBIVE1MIGNvbW1lbnRzXG4gIHRleHQgPSBzaG93ZG93bi5oZWxwZXIucmVwbGFjZVJlY3Vyc2l2ZVJlZ0V4cCh0ZXh0LCBmdW5jdGlvbiAodHh0KSB7XG4gICAgcmV0dXJuICdcXG5cXG7CqEsnICsgKGdsb2JhbHMuZ0h0bWxCbG9ja3MucHVzaCh0eHQpIC0gMSkgKyAnS1xcblxcbic7XG4gIH0sICdeIHswLDN9PCEtLScsICctLT4nLCAnZ20nKTtcblxuICAvLyBQSFAgYW5kIEFTUC1zdHlsZSBwcm9jZXNzb3IgaW5zdHJ1Y3Rpb25zICg8Py4uLj8+IGFuZCA8JS4uLiU+KVxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oPzpcXG5cXG4pKCB7MCwzfSg/OjwoWz8lXSlbXlxccl0qP1xcMj4pWyBcXHRdKig/PVxcbnsyLH0pKS9nLFxuICAgIHNob3dkb3duLnN1YlBhcnNlcignaGFzaEVsZW1lbnQnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnaGFzaEhUTUxCbG9ja3MuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG4vKipcbiAqIEhhc2ggc3BhbiBlbGVtZW50cyB0aGF0IHNob3VsZCBub3QgYmUgcGFyc2VkIGFzIG1hcmtkb3duXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignaGFzaEhUTUxTcGFucycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnaGFzaEhUTUxTcGFucy5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICBmdW5jdGlvbiBoYXNoSFRNTFNwYW4gKGh0bWwpIHtcbiAgICByZXR1cm4gJ8KoQycgKyAoZ2xvYmFscy5nSHRtbFNwYW5zLnB1c2goaHRtbCkgLSAxKSArICdDJztcbiAgfVxuXG4gIC8vIEhhc2ggU2VsZiBDbG9zaW5nIHRhZ3NcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvPFtePl0rP1xcLz4vZ2ksIGZ1bmN0aW9uICh3bSkge1xuICAgIHJldHVybiBoYXNoSFRNTFNwYW4od20pO1xuICB9KTtcblxuICAvLyBIYXNoIHRhZ3Mgd2l0aG91dCBwcm9wZXJ0aWVzXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoLzwoW14+XSs/KT5bXFxzXFxTXSo/PFxcL1xcMT4vZywgZnVuY3Rpb24gKHdtKSB7XG4gICAgcmV0dXJuIGhhc2hIVE1MU3Bhbih3bSk7XG4gIH0pO1xuXG4gIC8vIEhhc2ggdGFncyB3aXRoIHByb3BlcnRpZXNcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvPChbXj5dKz8pXFxzW14+XSs/PltcXHNcXFNdKj88XFwvXFwxPi9nLCBmdW5jdGlvbiAod20pIHtcbiAgICByZXR1cm4gaGFzaEhUTUxTcGFuKHdtKTtcbiAgfSk7XG5cbiAgLy8gSGFzaCBzZWxmIGNsb3NpbmcgdGFncyB3aXRob3V0IC8+XG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoLzxbXj5dKz8+L2dpLCBmdW5jdGlvbiAod20pIHtcbiAgICByZXR1cm4gaGFzaEhUTUxTcGFuKHdtKTtcbiAgfSk7XG5cbiAgLypzaG93ZG93bi5oZWxwZXIubWF0Y2hSZWN1cnNpdmVSZWdFeHAodGV4dCwgJzxjb2RlXFxcXGJbXj5dKj4nLCAnPC9jb2RlPicsICdnaScpOyovXG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnaGFzaEhUTUxTcGFucy5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXG4vKipcbiAqIFVuaGFzaCBIVE1MIHNwYW5zXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcigndW5oYXNoSFRNTFNwYW5zJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCd1bmhhc2hIVE1MU3BhbnMuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBnbG9iYWxzLmdIdG1sU3BhbnMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgcmVwVGV4dCA9IGdsb2JhbHMuZ0h0bWxTcGFuc1tpXSxcbiAgICAgICAgLy8gbGltaXRlciB0byBwcmV2ZW50IGluZmluaXRlIGxvb3AgKGFzc3VtZSAxMCBhcyBsaW1pdCBmb3IgcmVjdXJzZSlcbiAgICAgICAgbGltaXQgPSAwO1xuXG4gICAgd2hpbGUgKC/CqEMoXFxkKylDLy50ZXN0KHJlcFRleHQpKSB7XG4gICAgICB2YXIgbnVtID0gUmVnRXhwLiQxO1xuICAgICAgcmVwVGV4dCA9IHJlcFRleHQucmVwbGFjZSgnwqhDJyArIG51bSArICdDJywgZ2xvYmFscy5nSHRtbFNwYW5zW251bV0pO1xuICAgICAgaWYgKGxpbWl0ID09PSAxMCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdtYXhpbXVtIG5lc3Rpbmcgb2YgMTAgc3BhbnMgcmVhY2hlZCEhIScpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgICsrbGltaXQ7XG4gICAgfVxuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoJ8KoQycgKyBpICsgJ0MnLCByZXBUZXh0KTtcbiAgfVxuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ3VuaGFzaEhUTUxTcGFucy5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbi8qKlxuICogSGFzaCBhbmQgZXNjYXBlIDxwcmU+PGNvZGU+IGVsZW1lbnRzIHRoYXQgc2hvdWxkIG5vdCBiZSBwYXJzZWQgYXMgbWFya2Rvd25cbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCdoYXNoUHJlQ29kZVRhZ3MnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2hhc2hQcmVDb2RlVGFncy5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICB2YXIgcmVwRnVuYyA9IGZ1bmN0aW9uICh3aG9sZU1hdGNoLCBtYXRjaCwgbGVmdCwgcmlnaHQpIHtcbiAgICAvLyBlbmNvZGUgaHRtbCBlbnRpdGllc1xuICAgIHZhciBjb2RlYmxvY2sgPSBsZWZ0ICsgc2hvd2Rvd24uc3ViUGFyc2VyKCdlbmNvZGVDb2RlJykobWF0Y2gsIG9wdGlvbnMsIGdsb2JhbHMpICsgcmlnaHQ7XG4gICAgcmV0dXJuICdcXG5cXG7CqEcnICsgKGdsb2JhbHMuZ2hDb2RlQmxvY2tzLnB1c2goe3RleHQ6IHdob2xlTWF0Y2gsIGNvZGVibG9jazogY29kZWJsb2NrfSkgLSAxKSArICdHXFxuXFxuJztcbiAgfTtcblxuICAvLyBIYXNoIDxwcmU+PGNvZGU+XG4gIHRleHQgPSBzaG93ZG93bi5oZWxwZXIucmVwbGFjZVJlY3Vyc2l2ZVJlZ0V4cCh0ZXh0LCByZXBGdW5jLCAnXiB7MCwzfTxwcmVcXFxcYltePl0qPlxcXFxzKjxjb2RlXFxcXGJbXj5dKj4nLCAnXiB7MCwzfTwvY29kZT5cXFxccyo8L3ByZT4nLCAnZ2ltJyk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnaGFzaFByZUNvZGVUYWdzLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuc2hvd2Rvd24uc3ViUGFyc2VyKCdoZWFkZXJzJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2hlYWRlcnMuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgdmFyIGhlYWRlckxldmVsU3RhcnQgPSAoaXNOYU4ocGFyc2VJbnQob3B0aW9ucy5oZWFkZXJMZXZlbFN0YXJ0KSkpID8gMSA6IHBhcnNlSW50KG9wdGlvbnMuaGVhZGVyTGV2ZWxTdGFydCksXG5cbiAgLy8gU2V0IHRleHQtc3R5bGUgaGVhZGVyczpcbiAgLy9cdEhlYWRlciAxXG4gIC8vXHQ9PT09PT09PVxuICAvL1xuICAvL1x0SGVhZGVyIDJcbiAgLy9cdC0tLS0tLS0tXG4gIC8vXG4gICAgICBzZXRleHRSZWdleEgxID0gKG9wdGlvbnMuc21vb3RoTGl2ZVByZXZpZXcpID8gL14oLispWyBcXHRdKlxcbj17Mix9WyBcXHRdKlxcbisvZ20gOiAvXiguKylbIFxcdF0qXFxuPStbIFxcdF0qXFxuKy9nbSxcbiAgICAgIHNldGV4dFJlZ2V4SDIgPSAob3B0aW9ucy5zbW9vdGhMaXZlUHJldmlldykgPyAvXiguKylbIFxcdF0qXFxuLXsyLH1bIFxcdF0qXFxuKy9nbSA6IC9eKC4rKVsgXFx0XSpcXG4tK1sgXFx0XSpcXG4rL2dtO1xuXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2Uoc2V0ZXh0UmVnZXhIMSwgZnVuY3Rpb24gKHdob2xlTWF0Y2gsIG0xKSB7XG5cbiAgICB2YXIgc3BhbkdhbXV0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdzcGFuR2FtdXQnKShtMSwgb3B0aW9ucywgZ2xvYmFscyksXG4gICAgICAgIGhJRCA9IChvcHRpb25zLm5vSGVhZGVySWQpID8gJycgOiAnIGlkPVwiJyArIGhlYWRlcklkKG0xKSArICdcIicsXG4gICAgICAgIGhMZXZlbCA9IGhlYWRlckxldmVsU3RhcnQsXG4gICAgICAgIGhhc2hCbG9jayA9ICc8aCcgKyBoTGV2ZWwgKyBoSUQgKyAnPicgKyBzcGFuR2FtdXQgKyAnPC9oJyArIGhMZXZlbCArICc+JztcbiAgICByZXR1cm4gc2hvd2Rvd24uc3ViUGFyc2VyKCdoYXNoQmxvY2snKShoYXNoQmxvY2ssIG9wdGlvbnMsIGdsb2JhbHMpO1xuICB9KTtcblxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHNldGV4dFJlZ2V4SDIsIGZ1bmN0aW9uIChtYXRjaEZvdW5kLCBtMSkge1xuICAgIHZhciBzcGFuR2FtdXQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ3NwYW5HYW11dCcpKG0xLCBvcHRpb25zLCBnbG9iYWxzKSxcbiAgICAgICAgaElEID0gKG9wdGlvbnMubm9IZWFkZXJJZCkgPyAnJyA6ICcgaWQ9XCInICsgaGVhZGVySWQobTEpICsgJ1wiJyxcbiAgICAgICAgaExldmVsID0gaGVhZGVyTGV2ZWxTdGFydCArIDEsXG4gICAgICAgIGhhc2hCbG9jayA9ICc8aCcgKyBoTGV2ZWwgKyBoSUQgKyAnPicgKyBzcGFuR2FtdXQgKyAnPC9oJyArIGhMZXZlbCArICc+JztcbiAgICByZXR1cm4gc2hvd2Rvd24uc3ViUGFyc2VyKCdoYXNoQmxvY2snKShoYXNoQmxvY2ssIG9wdGlvbnMsIGdsb2JhbHMpO1xuICB9KTtcblxuICAvLyBhdHgtc3R5bGUgaGVhZGVyczpcbiAgLy8gICMgSGVhZGVyIDFcbiAgLy8gICMjIEhlYWRlciAyXG4gIC8vICAjIyBIZWFkZXIgMiB3aXRoIGNsb3NpbmcgaGFzaGVzICMjXG4gIC8vICAuLi5cbiAgLy8gICMjIyMjIyBIZWFkZXIgNlxuICAvL1xuICB2YXIgYXR4U3R5bGUgPSAob3B0aW9ucy5yZXF1aXJlU3BhY2VCZWZvcmVIZWFkaW5nVGV4dCkgPyAvXigjezEsNn0pWyBcXHRdKyguKz8pWyBcXHRdKiMqXFxuKy9nbSA6IC9eKCN7MSw2fSlbIFxcdF0qKC4rPylbIFxcdF0qIypcXG4rL2dtO1xuXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoYXR4U3R5bGUsIGZ1bmN0aW9uICh3aG9sZU1hdGNoLCBtMSwgbTIpIHtcbiAgICB2YXIgaFRleHQgPSBtMjtcbiAgICBpZiAob3B0aW9ucy5jdXN0b21pemVkSGVhZGVySWQpIHtcbiAgICAgIGhUZXh0ID0gbTIucmVwbGFjZSgvXFxzP1xceyhbXntdKz8pfVxccyokLywgJycpO1xuICAgIH1cblxuICAgIHZhciBzcGFuID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdzcGFuR2FtdXQnKShoVGV4dCwgb3B0aW9ucywgZ2xvYmFscyksXG4gICAgICAgIGhJRCA9IChvcHRpb25zLm5vSGVhZGVySWQpID8gJycgOiAnIGlkPVwiJyArIGhlYWRlcklkKG0yKSArICdcIicsXG4gICAgICAgIGhMZXZlbCA9IGhlYWRlckxldmVsU3RhcnQgLSAxICsgbTEubGVuZ3RoLFxuICAgICAgICBoZWFkZXIgPSAnPGgnICsgaExldmVsICsgaElEICsgJz4nICsgc3BhbiArICc8L2gnICsgaExldmVsICsgJz4nO1xuXG4gICAgcmV0dXJuIHNob3dkb3duLnN1YlBhcnNlcignaGFzaEJsb2NrJykoaGVhZGVyLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gaGVhZGVySWQgKG0pIHtcbiAgICB2YXIgdGl0bGUsXG4gICAgICAgIHByZWZpeDtcblxuICAgIC8vIEl0IGlzIHNlcGFyYXRlIGZyb20gb3RoZXIgb3B0aW9ucyB0byBhbGxvdyBjb21iaW5pbmcgcHJlZml4IGFuZCBjdXN0b21pemVkXG4gICAgaWYgKG9wdGlvbnMuY3VzdG9taXplZEhlYWRlcklkKSB7XG4gICAgICB2YXIgbWF0Y2ggPSBtLm1hdGNoKC9cXHsoW157XSs/KX1cXHMqJC8pO1xuICAgICAgaWYgKG1hdGNoICYmIG1hdGNoWzFdKSB7XG4gICAgICAgIG0gPSBtYXRjaFsxXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aXRsZSA9IG07XG5cbiAgICAvLyBQcmVmaXggaWQgdG8gcHJldmVudCBjYXVzaW5nIGluYWR2ZXJ0ZW50IHByZS1leGlzdGluZyBzdHlsZSBtYXRjaGVzLlxuICAgIGlmIChzaG93ZG93bi5oZWxwZXIuaXNTdHJpbmcob3B0aW9ucy5wcmVmaXhIZWFkZXJJZCkpIHtcbiAgICAgIHByZWZpeCA9IG9wdGlvbnMucHJlZml4SGVhZGVySWQ7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLnByZWZpeEhlYWRlcklkID09PSB0cnVlKSB7XG4gICAgICBwcmVmaXggPSAnc2VjdGlvbi0nO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmVmaXggPSAnJztcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMucmF3UHJlZml4SGVhZGVySWQpIHtcbiAgICAgIHRpdGxlID0gcHJlZml4ICsgdGl0bGU7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuZ2hDb21wYXRpYmxlSGVhZGVySWQpIHtcbiAgICAgIHRpdGxlID0gdGl0bGVcbiAgICAgICAgLnJlcGxhY2UoLyAvZywgJy0nKVxuICAgICAgICAvLyByZXBsYWNlIHByZXZpb3VzbHkgZXNjYXBlZCBjaGFycyAoJiwgwqggYW5kICQpXG4gICAgICAgIC5yZXBsYWNlKC8mYW1wOy9nLCAnJylcbiAgICAgICAgLnJlcGxhY2UoL8KoVC9nLCAnJylcbiAgICAgICAgLnJlcGxhY2UoL8KoRC9nLCAnJylcbiAgICAgICAgLy8gcmVwbGFjZSByZXN0IG9mIHRoZSBjaGFycyAoJn4kIGFyZSByZXBlYXRlZCBhcyB0aGV5IG1pZ2h0IGhhdmUgYmVlbiBlc2NhcGVkKVxuICAgICAgICAvLyBib3Jyb3dlZCBmcm9tIGdpdGh1YidzIHJlZGNhcnBldCAoc29tZSB0aGV5IHNob3VsZCBwcm9kdWNlIHNpbWlsYXIgcmVzdWx0cylcbiAgICAgICAgLnJlcGxhY2UoL1smKyQsXFwvOjs9P0BcIiN7fXxewqh+XFxbXFxdYFxcXFwqKSglLiEnPD5dL2csICcnKVxuICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMucmF3SGVhZGVySWQpIHtcbiAgICAgIHRpdGxlID0gdGl0bGVcbiAgICAgICAgLnJlcGxhY2UoLyAvZywgJy0nKVxuICAgICAgICAvLyByZXBsYWNlIHByZXZpb3VzbHkgZXNjYXBlZCBjaGFycyAoJiwgwqggYW5kICQpXG4gICAgICAgIC5yZXBsYWNlKC8mYW1wOy9nLCAnJicpXG4gICAgICAgIC5yZXBsYWNlKC/CqFQvZywgJ8KoJylcbiAgICAgICAgLnJlcGxhY2UoL8KoRC9nLCAnJCcpXG4gICAgICAgIC8vIHJlcGxhY2UgXCIgYW5kICdcbiAgICAgICAgLnJlcGxhY2UoL1tcIiddL2csICctJylcbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpdGxlID0gdGl0bGVcbiAgICAgICAgLnJlcGxhY2UoL1teXFx3XS9nLCAnJylcbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMucmF3UHJlZml4SGVhZGVySWQpIHtcbiAgICAgIHRpdGxlID0gcHJlZml4ICsgdGl0bGU7XG4gICAgfVxuXG4gICAgaWYgKGdsb2JhbHMuaGFzaExpbmtDb3VudHNbdGl0bGVdKSB7XG4gICAgICB0aXRsZSA9IHRpdGxlICsgJy0nICsgKGdsb2JhbHMuaGFzaExpbmtDb3VudHNbdGl0bGVdKyspO1xuICAgIH0gZWxzZSB7XG4gICAgICBnbG9iYWxzLmhhc2hMaW5rQ291bnRzW3RpdGxlXSA9IDE7XG4gICAgfVxuICAgIHJldHVybiB0aXRsZTtcbiAgfVxuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2hlYWRlcnMuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG4vKipcbiAqIFR1cm4gTWFya2Rvd24gbGluayBzaG9ydGN1dHMgaW50byBYSFRNTCA8YT4gdGFncy5cbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCdob3Jpem9udGFsUnVsZScsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnaG9yaXpvbnRhbFJ1bGUuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgdmFyIGtleSA9IHNob3dkb3duLnN1YlBhcnNlcignaGFzaEJsb2NrJykoJzxociAvPicsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9eIHswLDJ9KCA/LSl7Myx9WyBcXHRdKiQvZ20sIGtleSk7XG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL14gezAsMn0oID9cXCopezMsfVsgXFx0XSokL2dtLCBrZXkpO1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9eIHswLDJ9KCA/Xyl7Myx9WyBcXHRdKiQvZ20sIGtleSk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnaG9yaXpvbnRhbFJ1bGUuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG4vKipcbiAqIFR1cm4gTWFya2Rvd24gaW1hZ2Ugc2hvcnRjdXRzIGludG8gPGltZz4gdGFncy5cbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCdpbWFnZXMnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnaW1hZ2VzLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIHZhciBpbmxpbmVSZWdFeHAgICAgICA9IC8hXFxbKFteXFxdXSo/KV1bIFxcdF0qKClcXChbIFxcdF0/PD8oW1xcU10rPyg/OlxcKFtcXFNdKj9cXClbXFxTXSo/KT8pPj8oPzogPShbKlxcZF0rW0EtWmEteiVdezAsNH0peChbKlxcZF0rW0EtWmEteiVdezAsNH0pKT9bIFxcdF0qKD86KFtcIiddKShbXlwiXSo/KVxcNik/WyBcXHRdP1xcKS9nLFxuICAgICAgY3JhenlSZWdFeHAgICAgICAgPSAvIVxcWyhbXlxcXV0qPyldWyBcXHRdKigpXFwoWyBcXHRdPzwoW14+XSopPig/OiA9KFsqXFxkXStbQS1aYS16JV17MCw0fSl4KFsqXFxkXStbQS1aYS16JV17MCw0fSkpP1sgXFx0XSooPzooPzooW1wiJ10pKFteXCJdKj8pXFw2KSk/WyBcXHRdP1xcKS9nLFxuICAgICAgYmFzZTY0UmVnRXhwICAgICAgPSAvIVxcWyhbXlxcXV0qPyldWyBcXHRdKigpXFwoWyBcXHRdPzw/KGRhdGE6Lis/XFwvLis/O2Jhc2U2NCxbQS1aYS16MC05Ky89XFxuXSs/KT4/KD86ID0oWypcXGRdK1tBLVphLXolXXswLDR9KXgoWypcXGRdK1tBLVphLXolXXswLDR9KSk/WyBcXHRdKig/OihbXCInXSkoW15cIl0qPylcXDYpP1sgXFx0XT9cXCkvZyxcbiAgICAgIHJlZmVyZW5jZVJlZ0V4cCAgID0gLyFcXFsoW15cXF1dKj8pXSA/KD86XFxuICopP1xcWyhbXFxzXFxTXSo/KV0oKSgpKCkoKSgpL2csXG4gICAgICByZWZTaG9ydGN1dFJlZ0V4cCA9IC8hXFxbKFteXFxbXFxdXSspXSgpKCkoKSgpKCkvZztcblxuICBmdW5jdGlvbiB3cml0ZUltYWdlVGFnQmFzZTY0ICh3aG9sZU1hdGNoLCBhbHRUZXh0LCBsaW5rSWQsIHVybCwgd2lkdGgsIGhlaWdodCwgbTUsIHRpdGxlKSB7XG4gICAgdXJsID0gdXJsLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgcmV0dXJuIHdyaXRlSW1hZ2VUYWcgKHdob2xlTWF0Y2gsIGFsdFRleHQsIGxpbmtJZCwgdXJsLCB3aWR0aCwgaGVpZ2h0LCBtNSwgdGl0bGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGVJbWFnZVRhZyAod2hvbGVNYXRjaCwgYWx0VGV4dCwgbGlua0lkLCB1cmwsIHdpZHRoLCBoZWlnaHQsIG01LCB0aXRsZSkge1xuXG4gICAgdmFyIGdVcmxzICAgPSBnbG9iYWxzLmdVcmxzLFxuICAgICAgICBnVGl0bGVzID0gZ2xvYmFscy5nVGl0bGVzLFxuICAgICAgICBnRGltcyAgID0gZ2xvYmFscy5nRGltZW5zaW9ucztcblxuICAgIGxpbmtJZCA9IGxpbmtJZC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKCF0aXRsZSkge1xuICAgICAgdGl0bGUgPSAnJztcbiAgICB9XG4gICAgLy8gU3BlY2lhbCBjYXNlIGZvciBleHBsaWNpdCBlbXB0eSB1cmxcbiAgICBpZiAod2hvbGVNYXRjaC5zZWFyY2goL1xcKDw/XFxzKj4/ID8oWydcIl0uKlsnXCJdKT9cXCkkL20pID4gLTEpIHtcbiAgICAgIHVybCA9ICcnO1xuXG4gICAgfSBlbHNlIGlmICh1cmwgPT09ICcnIHx8IHVybCA9PT0gbnVsbCkge1xuICAgICAgaWYgKGxpbmtJZCA9PT0gJycgfHwgbGlua0lkID09PSBudWxsKSB7XG4gICAgICAgIC8vIGxvd2VyLWNhc2UgYW5kIHR1cm4gZW1iZWRkZWQgbmV3bGluZXMgaW50byBzcGFjZXNcbiAgICAgICAgbGlua0lkID0gYWx0VGV4dC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyA/XFxuL2csICcgJyk7XG4gICAgICB9XG4gICAgICB1cmwgPSAnIycgKyBsaW5rSWQ7XG5cbiAgICAgIGlmICghc2hvd2Rvd24uaGVscGVyLmlzVW5kZWZpbmVkKGdVcmxzW2xpbmtJZF0pKSB7XG4gICAgICAgIHVybCA9IGdVcmxzW2xpbmtJZF07XG4gICAgICAgIGlmICghc2hvd2Rvd24uaGVscGVyLmlzVW5kZWZpbmVkKGdUaXRsZXNbbGlua0lkXSkpIHtcbiAgICAgICAgICB0aXRsZSA9IGdUaXRsZXNbbGlua0lkXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNob3dkb3duLmhlbHBlci5pc1VuZGVmaW5lZChnRGltc1tsaW5rSWRdKSkge1xuICAgICAgICAgIHdpZHRoID0gZ0RpbXNbbGlua0lkXS53aWR0aDtcbiAgICAgICAgICBoZWlnaHQgPSBnRGltc1tsaW5rSWRdLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHdob2xlTWF0Y2g7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWx0VGV4dCA9IGFsdFRleHRcbiAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAvL2FsdFRleHQgPSBzaG93ZG93bi5oZWxwZXIuZXNjYXBlQ2hhcmFjdGVycyhhbHRUZXh0LCAnKl8nLCBmYWxzZSk7XG4gICAgICAucmVwbGFjZShzaG93ZG93bi5oZWxwZXIucmVnZXhlcy5hc3Rlcmlza0Rhc2hBbmRDb2xvbiwgc2hvd2Rvd24uaGVscGVyLmVzY2FwZUNoYXJhY3RlcnNDYWxsYmFjayk7XG4gICAgLy91cmwgPSBzaG93ZG93bi5oZWxwZXIuZXNjYXBlQ2hhcmFjdGVycyh1cmwsICcqXycsIGZhbHNlKTtcbiAgICB1cmwgPSB1cmwucmVwbGFjZShzaG93ZG93bi5oZWxwZXIucmVnZXhlcy5hc3Rlcmlza0Rhc2hBbmRDb2xvbiwgc2hvd2Rvd24uaGVscGVyLmVzY2FwZUNoYXJhY3RlcnNDYWxsYmFjayk7XG4gICAgdmFyIHJlc3VsdCA9ICc8aW1nIHNyYz1cIicgKyB1cmwgKyAnXCIgYWx0PVwiJyArIGFsdFRleHQgKyAnXCInO1xuXG4gICAgaWYgKHRpdGxlICYmIHNob3dkb3duLmhlbHBlci5pc1N0cmluZyh0aXRsZSkpIHtcbiAgICAgIHRpdGxlID0gdGl0bGVcbiAgICAgICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxuICAgICAgLy90aXRsZSA9IHNob3dkb3duLmhlbHBlci5lc2NhcGVDaGFyYWN0ZXJzKHRpdGxlLCAnKl8nLCBmYWxzZSk7XG4gICAgICAgIC5yZXBsYWNlKHNob3dkb3duLmhlbHBlci5yZWdleGVzLmFzdGVyaXNrRGFzaEFuZENvbG9uLCBzaG93ZG93bi5oZWxwZXIuZXNjYXBlQ2hhcmFjdGVyc0NhbGxiYWNrKTtcbiAgICAgIHJlc3VsdCArPSAnIHRpdGxlPVwiJyArIHRpdGxlICsgJ1wiJztcbiAgICB9XG5cbiAgICBpZiAod2lkdGggJiYgaGVpZ2h0KSB7XG4gICAgICB3aWR0aCAgPSAod2lkdGggPT09ICcqJykgPyAnYXV0bycgOiB3aWR0aDtcbiAgICAgIGhlaWdodCA9IChoZWlnaHQgPT09ICcqJykgPyAnYXV0bycgOiBoZWlnaHQ7XG5cbiAgICAgIHJlc3VsdCArPSAnIHdpZHRoPVwiJyArIHdpZHRoICsgJ1wiJztcbiAgICAgIHJlc3VsdCArPSAnIGhlaWdodD1cIicgKyBoZWlnaHQgKyAnXCInO1xuICAgIH1cblxuICAgIHJlc3VsdCArPSAnIC8+JztcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBGaXJzdCwgaGFuZGxlIHJlZmVyZW5jZS1zdHlsZSBsYWJlbGVkIGltYWdlczogIVthbHQgdGV4dF1baWRdXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UocmVmZXJlbmNlUmVnRXhwLCB3cml0ZUltYWdlVGFnKTtcblxuICAvLyBOZXh0LCBoYW5kbGUgaW5saW5lIGltYWdlczogICFbYWx0IHRleHRdKHVybCA9PHdpZHRoPng8aGVpZ2h0PiBcIm9wdGlvbmFsIHRpdGxlXCIpXG5cbiAgLy8gYmFzZTY0IGVuY29kZWQgaW1hZ2VzXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoYmFzZTY0UmVnRXhwLCB3cml0ZUltYWdlVGFnQmFzZTY0KTtcblxuICAvLyBjYXNlcyB3aXRoIGNyYXp5IHVybHMgbGlrZSAuL2ltYWdlL2NhdDEpLnBuZ1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKGNyYXp5UmVnRXhwLCB3cml0ZUltYWdlVGFnKTtcblxuICAvLyBub3JtYWwgY2FzZXNcbiAgdGV4dCA9IHRleHQucmVwbGFjZShpbmxpbmVSZWdFeHAsIHdyaXRlSW1hZ2VUYWcpO1xuXG4gIC8vIGhhbmRsZSByZWZlcmVuY2Utc3R5bGUgc2hvcnRjdXRzOiAhW2ltZyB0ZXh0XVxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHJlZlNob3J0Y3V0UmVnRXhwLCB3cml0ZUltYWdlVGFnKTtcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdpbWFnZXMuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2l0YWxpY3NBbmRCb2xkJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2l0YWxpY3NBbmRCb2xkLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIC8vIGl0J3MgZmFzdGVyIHRvIGhhdmUgMyBzZXBhcmF0ZSByZWdleGVzIGZvciBlYWNoIGNhc2UgdGhhbiBoYXZlIGp1c3Qgb25lXG4gIC8vIGJlY2F1c2Ugb2YgYmFja3RyYWNpbmcsIGluIHNvbWUgY2FzZXMsIGl0IGNvdWxkIGxlYWQgdG8gYW4gZXhwb25lbnRpYWwgZWZmZWN0XG4gIC8vIGNhbGxlZCBcImNhdGFzdHJvcGhpYyBiYWNrdHJhY2VcIi4gT21pbm91cyFcblxuICBmdW5jdGlvbiBwYXJzZUluc2lkZSAodHh0LCBsZWZ0LCByaWdodCkge1xuICAgIC8qXG4gICAgaWYgKG9wdGlvbnMuc2ltcGxpZmllZEF1dG9MaW5rKSB7XG4gICAgICB0eHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ3NpbXBsaWZpZWRBdXRvTGlua3MnKSh0eHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgIH1cbiAgICAqL1xuICAgIHJldHVybiBsZWZ0ICsgdHh0ICsgcmlnaHQ7XG4gIH1cblxuICAvLyBQYXJzZSB1bmRlcnNjb3Jlc1xuICBpZiAob3B0aW9ucy5saXRlcmFsTWlkV29yZFVuZGVyc2NvcmVzKSB7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxiX19fKFxcU1tcXHNcXFNdKj8pX19fXFxiL2csIGZ1bmN0aW9uICh3bSwgdHh0KSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnNpZGUgKHR4dCwgJzxzdHJvbmc+PGVtPicsICc8L2VtPjwvc3Ryb25nPicpO1xuICAgIH0pO1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcYl9fKFxcU1tcXHNcXFNdKj8pX19cXGIvZywgZnVuY3Rpb24gKHdtLCB0eHQpIHtcbiAgICAgIHJldHVybiBwYXJzZUluc2lkZSAodHh0LCAnPHN0cm9uZz4nLCAnPC9zdHJvbmc+Jyk7XG4gICAgfSk7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxiXyhcXFNbXFxzXFxTXSo/KV9cXGIvZywgZnVuY3Rpb24gKHdtLCB0eHQpIHtcbiAgICAgIHJldHVybiBwYXJzZUluc2lkZSAodHh0LCAnPGVtPicsICc8L2VtPicpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL19fXyhcXFNbXFxzXFxTXSo/KV9fXy9nLCBmdW5jdGlvbiAod20sIG0pIHtcbiAgICAgIHJldHVybiAoL1xcUyQvLnRlc3QobSkpID8gcGFyc2VJbnNpZGUgKG0sICc8c3Ryb25nPjxlbT4nLCAnPC9lbT48L3N0cm9uZz4nKSA6IHdtO1xuICAgIH0pO1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL19fKFxcU1tcXHNcXFNdKj8pX18vZywgZnVuY3Rpb24gKHdtLCBtKSB7XG4gICAgICByZXR1cm4gKC9cXFMkLy50ZXN0KG0pKSA/IHBhcnNlSW5zaWRlIChtLCAnPHN0cm9uZz4nLCAnPC9zdHJvbmc+JykgOiB3bTtcbiAgICB9KTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9fKFteXFxzX11bXFxzXFxTXSo/KV8vZywgZnVuY3Rpb24gKHdtLCBtKSB7XG4gICAgICAvLyAhL15fW15fXS8udGVzdChtKSAtIHRlc3QgaWYgaXQgZG9lc24ndCBzdGFydCB3aXRoIF9fIChzaW5jZSBpdCBzZWVtcyByZWR1bmRhbnQsIHdlIHJlbW92ZWQgaXQpXG4gICAgICByZXR1cm4gKC9cXFMkLy50ZXN0KG0pKSA/IHBhcnNlSW5zaWRlIChtLCAnPGVtPicsICc8L2VtPicpIDogd207XG4gICAgfSk7XG4gIH1cblxuICAvLyBOb3cgcGFyc2UgYXN0ZXJpc2tzXG4gIGlmIChvcHRpb25zLmxpdGVyYWxNaWRXb3JkQXN0ZXJpc2tzKSB7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvKFteKl18XilcXEJcXCpcXCpcXCooXFxTW1xcc1xcU10qPylcXCpcXCpcXCpcXEIoPyFcXCopL2csIGZ1bmN0aW9uICh3bSwgbGVhZCwgdHh0KSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnNpZGUgKHR4dCwgbGVhZCArICc8c3Ryb25nPjxlbT4nLCAnPC9lbT48L3N0cm9uZz4nKTtcbiAgICB9KTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oW14qXXxeKVxcQlxcKlxcKihcXFNbXFxzXFxTXSo/KVxcKlxcKlxcQig/IVxcKikvZywgZnVuY3Rpb24gKHdtLCBsZWFkLCB0eHQpIHtcbiAgICAgIHJldHVybiBwYXJzZUluc2lkZSAodHh0LCBsZWFkICsgJzxzdHJvbmc+JywgJzwvc3Ryb25nPicpO1xuICAgIH0pO1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoLyhbXipdfF4pXFxCXFwqKFxcU1tcXHNcXFNdKj8pXFwqXFxCKD8hXFwqKS9nLCBmdW5jdGlvbiAod20sIGxlYWQsIHR4dCkge1xuICAgICAgcmV0dXJuIHBhcnNlSW5zaWRlICh0eHQsIGxlYWQgKyAnPGVtPicsICc8L2VtPicpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcKlxcKlxcKihcXFNbXFxzXFxTXSo/KVxcKlxcKlxcKi9nLCBmdW5jdGlvbiAod20sIG0pIHtcbiAgICAgIHJldHVybiAoL1xcUyQvLnRlc3QobSkpID8gcGFyc2VJbnNpZGUgKG0sICc8c3Ryb25nPjxlbT4nLCAnPC9lbT48L3N0cm9uZz4nKSA6IHdtO1xuICAgIH0pO1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcKlxcKihcXFNbXFxzXFxTXSo/KVxcKlxcKi9nLCBmdW5jdGlvbiAod20sIG0pIHtcbiAgICAgIHJldHVybiAoL1xcUyQvLnRlc3QobSkpID8gcGFyc2VJbnNpZGUgKG0sICc8c3Ryb25nPicsICc8L3N0cm9uZz4nKSA6IHdtO1xuICAgIH0pO1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcKihbXlxccypdW1xcc1xcU10qPylcXCovZywgZnVuY3Rpb24gKHdtLCBtKSB7XG4gICAgICAvLyAhL15cXCpbXipdLy50ZXN0KG0pIC0gdGVzdCBpZiBpdCBkb2Vzbid0IHN0YXJ0IHdpdGggKiogKHNpbmNlIGl0IHNlZW1zIHJlZHVuZGFudCwgd2UgcmVtb3ZlZCBpdClcbiAgICAgIHJldHVybiAoL1xcUyQvLnRlc3QobSkpID8gcGFyc2VJbnNpZGUgKG0sICc8ZW0+JywgJzwvZW0+JykgOiB3bTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnaXRhbGljc0FuZEJvbGQuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG4vKipcbiAqIEZvcm0gSFRNTCBvcmRlcmVkIChudW1iZXJlZCkgYW5kIHVub3JkZXJlZCAoYnVsbGV0ZWQpIGxpc3RzLlxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2xpc3RzJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBQcm9jZXNzIHRoZSBjb250ZW50cyBvZiBhIHNpbmdsZSBvcmRlcmVkIG9yIHVub3JkZXJlZCBsaXN0LCBzcGxpdHRpbmcgaXRcbiAgICogaW50byBpbmRpdmlkdWFsIGxpc3QgaXRlbXMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsaXN0U3RyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdHJpbVRyYWlsaW5nXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiBwcm9jZXNzTGlzdEl0ZW1zIChsaXN0U3RyLCB0cmltVHJhaWxpbmcpIHtcbiAgICAvLyBUaGUgJGdfbGlzdF9sZXZlbCBnbG9iYWwga2VlcHMgdHJhY2sgb2Ygd2hlbiB3ZSdyZSBpbnNpZGUgYSBsaXN0LlxuICAgIC8vIEVhY2ggdGltZSB3ZSBlbnRlciBhIGxpc3QsIHdlIGluY3JlbWVudCBpdDsgd2hlbiB3ZSBsZWF2ZSBhIGxpc3QsXG4gICAgLy8gd2UgZGVjcmVtZW50LiBJZiBpdCdzIHplcm8sIHdlJ3JlIG5vdCBpbiBhIGxpc3QgYW55bW9yZS5cbiAgICAvL1xuICAgIC8vIFdlIGRvIHRoaXMgYmVjYXVzZSB3aGVuIHdlJ3JlIG5vdCBpbnNpZGUgYSBsaXN0LCB3ZSB3YW50IHRvIHRyZWF0XG4gICAgLy8gc29tZXRoaW5nIGxpa2UgdGhpczpcbiAgICAvL1xuICAgIC8vICAgIEkgcmVjb21tZW5kIHVwZ3JhZGluZyB0byB2ZXJzaW9uXG4gICAgLy8gICAgOC4gT29wcywgbm93IHRoaXMgbGluZSBpcyB0cmVhdGVkXG4gICAgLy8gICAgYXMgYSBzdWItbGlzdC5cbiAgICAvL1xuICAgIC8vIEFzIGEgc2luZ2xlIHBhcmFncmFwaCwgZGVzcGl0ZSB0aGUgZmFjdCB0aGF0IHRoZSBzZWNvbmQgbGluZSBzdGFydHNcbiAgICAvLyB3aXRoIGEgZGlnaXQtcGVyaW9kLXNwYWNlIHNlcXVlbmNlLlxuICAgIC8vXG4gICAgLy8gV2hlcmVhcyB3aGVuIHdlJ3JlIGluc2lkZSBhIGxpc3QgKG9yIHN1Yi1saXN0KSwgdGhhdCBsaW5lIHdpbGwgYmVcbiAgICAvLyB0cmVhdGVkIGFzIHRoZSBzdGFydCBvZiBhIHN1Yi1saXN0LiBXaGF0IGEga2x1ZGdlLCBodWg/IFRoaXMgaXNcbiAgICAvLyBhbiBhc3BlY3Qgb2YgTWFya2Rvd24ncyBzeW50YXggdGhhdCdzIGhhcmQgdG8gcGFyc2UgcGVyZmVjdGx5XG4gICAgLy8gd2l0aG91dCByZXNvcnRpbmcgdG8gbWluZC1yZWFkaW5nLiBQZXJoYXBzIHRoZSBzb2x1dGlvbiBpcyB0b1xuICAgIC8vIGNoYW5nZSB0aGUgc3ludGF4IHJ1bGVzIHN1Y2ggdGhhdCBzdWItbGlzdHMgbXVzdCBzdGFydCB3aXRoIGFcbiAgICAvLyBzdGFydGluZyBjYXJkaW5hbCBudW1iZXI7IGUuZy4gXCIxLlwiIG9yIFwiYS5cIi5cbiAgICBnbG9iYWxzLmdMaXN0TGV2ZWwrKztcblxuICAgIC8vIHRyaW0gdHJhaWxpbmcgYmxhbmsgbGluZXM6XG4gICAgbGlzdFN0ciA9IGxpc3RTdHIucmVwbGFjZSgvXFxuezIsfSQvLCAnXFxuJyk7XG5cbiAgICAvLyBhdHRhY2tsYWI6IGFkZCBzZW50aW5lbCB0byBlbXVsYXRlIFxcelxuICAgIGxpc3RTdHIgKz0gJ8KoMCc7XG5cbiAgICB2YXIgcmd4ID0gLyhcXG4pPyheIHswLDN9KShbKistXXxcXGQrWy5dKVsgXFx0XSsoKFxcWyh4fFh8ICk/XSk/WyBcXHRdKlteXFxyXSs/KFxcbnsxLDJ9KSkoPz1cXG4qKMKoMHwgezAsM30oWyorLV18XFxkK1suXSlbIFxcdF0rKSkvZ20sXG4gICAgICAgIGlzUGFyYWdyYXBoZWQgPSAoL1xcblsgXFx0XSpcXG4oPyHCqDApLy50ZXN0KGxpc3RTdHIpKTtcblxuICAgIC8vIFNpbmNlIHZlcnNpb24gMS41LCBuZXN0aW5nIHN1Ymxpc3RzIHJlcXVpcmVzIDQgc3BhY2VzIChvciAxIHRhYikgaW5kZW50YXRpb24sXG4gICAgLy8gd2hpY2ggaXMgYSBzeW50YXggYnJlYWtpbmcgY2hhbmdlXG4gICAgLy8gYWN0aXZhdGluZyB0aGlzIG9wdGlvbiByZXZlcnRzIHRvIG9sZCBiZWhhdmlvclxuICAgIGlmIChvcHRpb25zLmRpc2FibGVGb3JjZWQ0U3BhY2VzSW5kZW50ZWRTdWJsaXN0cykge1xuICAgICAgcmd4ID0gLyhcXG4pPyheIHswLDN9KShbKistXXxcXGQrWy5dKVsgXFx0XSsoKFxcWyh4fFh8ICk/XSk/WyBcXHRdKlteXFxyXSs/KFxcbnsxLDJ9KSkoPz1cXG4qKMKoMHxcXDIoWyorLV18XFxkK1suXSlbIFxcdF0rKSkvZ207XG4gICAgfVxuXG4gICAgbGlzdFN0ciA9IGxpc3RTdHIucmVwbGFjZShyZ3gsIGZ1bmN0aW9uICh3aG9sZU1hdGNoLCBtMSwgbTIsIG0zLCBtNCwgdGFza2J0biwgY2hlY2tlZCkge1xuICAgICAgY2hlY2tlZCA9IChjaGVja2VkICYmIGNoZWNrZWQudHJpbSgpICE9PSAnJyk7XG5cbiAgICAgIHZhciBpdGVtID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdvdXRkZW50JykobTQsIG9wdGlvbnMsIGdsb2JhbHMpLFxuICAgICAgICAgIGJ1bGxldFN0eWxlID0gJyc7XG5cbiAgICAgIC8vIFN1cHBvcnQgZm9yIGdpdGh1YiB0YXNrbGlzdHNcbiAgICAgIGlmICh0YXNrYnRuICYmIG9wdGlvbnMudGFza2xpc3RzKSB7XG4gICAgICAgIGJ1bGxldFN0eWxlID0gJyBjbGFzcz1cInRhc2stbGlzdC1pdGVtXCIgc3R5bGU9XCJsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XCInO1xuICAgICAgICBpdGVtID0gaXRlbS5yZXBsYWNlKC9eWyBcXHRdKlxcWyh4fFh8ICk/XS9tLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIG90cCA9ICc8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgZGlzYWJsZWQgc3R5bGU9XCJtYXJnaW46IDBweCAwLjM1ZW0gMC4yNWVtIC0xLjZlbTsgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcIic7XG4gICAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICAgIG90cCArPSAnIGNoZWNrZWQnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvdHAgKz0gJz4nO1xuICAgICAgICAgIHJldHVybiBvdHA7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBJU1NVRSAjMzEyXG4gICAgICAvLyBUaGlzIGlucHV0OiAtIC0gLSBhXG4gICAgICAvLyBjYXVzZXMgdHJvdWJsZSB0byB0aGUgcGFyc2VyLCBzaW5jZSBpdCBpbnRlcnByZXRzIGl0IGFzOlxuICAgICAgLy8gPHVsPjxsaT48bGk+PGxpPmE8L2xpPjwvbGk+PC9saT48L3VsPlxuICAgICAgLy8gaW5zdGVhZCBvZjpcbiAgICAgIC8vIDx1bD48bGk+LSAtIGE8L2xpPjwvdWw+XG4gICAgICAvLyBTbywgdG8gcHJldmVudCBpdCwgd2Ugd2lsbCBwdXQgYSBtYXJrZXIgKMKoQSlpbiB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaW5lXG4gICAgICAvLyBLaW5kIG9mIGhhY2tpc2gvbW9ua2V5IHBhdGNoaW5nLCBidXQgc2VlbXMgbW9yZSBlZmZlY3RpdmUgdGhhbiBvdmVyY29tcGxpY2F0aW5nIHRoZSBsaXN0IHBhcnNlclxuICAgICAgaXRlbSA9IGl0ZW0ucmVwbGFjZSgvXihbLSorXXxcXGRcXC4pWyBcXHRdK1tcXFNcXG4gXSovZywgZnVuY3Rpb24gKHdtMikge1xuICAgICAgICByZXR1cm4gJ8KoQScgKyB3bTI7XG4gICAgICB9KTtcblxuICAgICAgLy8gbTEgLSBMZWFkaW5nIGxpbmUgb3JcbiAgICAgIC8vIEhhcyBhIGRvdWJsZSByZXR1cm4gKG11bHRpIHBhcmFncmFwaCkgb3JcbiAgICAgIC8vIEhhcyBzdWJsaXN0XG4gICAgICBpZiAobTEgfHwgKGl0ZW0uc2VhcmNoKC9cXG57Mix9LykgPiAtMSkpIHtcbiAgICAgICAgaXRlbSA9IHNob3dkb3duLnN1YlBhcnNlcignZ2l0aHViQ29kZUJsb2NrcycpKGl0ZW0sIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgICAgICBpdGVtID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdibG9ja0dhbXV0JykoaXRlbSwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZWN1cnNpb24gZm9yIHN1Yi1saXN0czpcbiAgICAgICAgaXRlbSA9IHNob3dkb3duLnN1YlBhcnNlcignbGlzdHMnKShpdGVtLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICAgICAgaXRlbSA9IGl0ZW0ucmVwbGFjZSgvXFxuJC8sICcnKTsgLy8gY2hvbXAoaXRlbSlcbiAgICAgICAgaXRlbSA9IHNob3dkb3duLnN1YlBhcnNlcignaGFzaEhUTUxCbG9ja3MnKShpdGVtLCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAgICAgICAvLyBDb2xhcHNlIGRvdWJsZSBsaW5lYnJlYWtzXG4gICAgICAgIGl0ZW0gPSBpdGVtLnJlcGxhY2UoL1xcblxcbisvZywgJ1xcblxcbicpO1xuICAgICAgICBpZiAoaXNQYXJhZ3JhcGhlZCkge1xuICAgICAgICAgIGl0ZW0gPSBzaG93ZG93bi5zdWJQYXJzZXIoJ3BhcmFncmFwaHMnKShpdGVtLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdzcGFuR2FtdXQnKShpdGVtLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBub3cgd2UgbmVlZCB0byByZW1vdmUgdGhlIG1hcmtlciAowqhBKVxuICAgICAgaXRlbSA9IGl0ZW0ucmVwbGFjZSgnwqhBJywgJycpO1xuICAgICAgLy8gd2UgY2FuIGZpbmFsbHkgd3JhcCB0aGUgbGluZSBpbiBsaXN0IGl0ZW0gdGFnc1xuICAgICAgaXRlbSA9ICAnPGxpJyArIGJ1bGxldFN0eWxlICsgJz4nICsgaXRlbSArICc8L2xpPlxcbic7XG5cbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH0pO1xuXG4gICAgLy8gYXR0YWNrbGFiOiBzdHJpcCBzZW50aW5lbFxuICAgIGxpc3RTdHIgPSBsaXN0U3RyLnJlcGxhY2UoL8KoMC9nLCAnJyk7XG5cbiAgICBnbG9iYWxzLmdMaXN0TGV2ZWwtLTtcblxuICAgIGlmICh0cmltVHJhaWxpbmcpIHtcbiAgICAgIGxpc3RTdHIgPSBsaXN0U3RyLnJlcGxhY2UoL1xccyskLywgJycpO1xuICAgIH1cblxuICAgIHJldHVybiBsaXN0U3RyO1xuICB9XG5cbiAgZnVuY3Rpb24gc3R5bGVTdGFydE51bWJlciAobGlzdCwgbGlzdFR5cGUpIHtcbiAgICAvLyBjaGVjayBpZiBvbCBhbmQgc3RhcnRzIGJ5IGEgbnVtYmVyIGRpZmZlcmVudCB0aGFuIDFcbiAgICBpZiAobGlzdFR5cGUgPT09ICdvbCcpIHtcbiAgICAgIHZhciByZXMgPSBsaXN0Lm1hdGNoKC9eICooXFxkKylcXC4vKTtcbiAgICAgIGlmIChyZXMgJiYgcmVzWzFdICE9PSAnMScpIHtcbiAgICAgICAgcmV0dXJuICcgc3RhcnQ9XCInICsgcmVzWzFdICsgJ1wiJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGFuZCBwYXJzZSBjb25zZWN1dGl2ZSBsaXN0cyAoYmV0dGVyIGZpeCBmb3IgaXNzdWUgIzE0MilcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxpc3RcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxpc3RUeXBlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdHJpbVRyYWlsaW5nXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiBwYXJzZUNvbnNlY3V0aXZlTGlzdHMgKGxpc3QsIGxpc3RUeXBlLCB0cmltVHJhaWxpbmcpIHtcbiAgICAvLyBjaGVjayBpZiB3ZSBjYXVnaHQgMiBvciBtb3JlIGNvbnNlY3V0aXZlIGxpc3RzIGJ5IG1pc3Rha2VcbiAgICAvLyB3ZSB1c2UgdGhlIGNvdW50ZXJSZ3gsIG1lYW5pbmcgaWYgbGlzdFR5cGUgaXMgVUwgd2UgbG9vayBmb3IgT0wgYW5kIHZpY2UgdmVyc2FcbiAgICB2YXIgb2xSZ3ggPSAob3B0aW9ucy5kaXNhYmxlRm9yY2VkNFNwYWNlc0luZGVudGVkU3VibGlzdHMpID8gL14gP1xcZCtcXC5bIFxcdF0vZ20gOiAvXiB7MCwzfVxcZCtcXC5bIFxcdF0vZ20sXG4gICAgICAgIHVsUmd4ID0gKG9wdGlvbnMuZGlzYWJsZUZvcmNlZDRTcGFjZXNJbmRlbnRlZFN1Ymxpc3RzKSA/IC9eID9bKistXVsgXFx0XS9nbSA6IC9eIHswLDN9WyorLV1bIFxcdF0vZ20sXG4gICAgICAgIGNvdW50ZXJSeGcgPSAobGlzdFR5cGUgPT09ICd1bCcpID8gb2xSZ3ggOiB1bFJneCxcbiAgICAgICAgcmVzdWx0ID0gJyc7XG5cbiAgICBpZiAobGlzdC5zZWFyY2goY291bnRlclJ4ZykgIT09IC0xKSB7XG4gICAgICAoZnVuY3Rpb24gcGFyc2VDTCAodHh0KSB7XG4gICAgICAgIHZhciBwb3MgPSB0eHQuc2VhcmNoKGNvdW50ZXJSeGcpLFxuICAgICAgICAgICAgc3R5bGUgPSBzdHlsZVN0YXJ0TnVtYmVyKGxpc3QsIGxpc3RUeXBlKTtcbiAgICAgICAgaWYgKHBvcyAhPT0gLTEpIHtcbiAgICAgICAgICAvLyBzbGljZVxuICAgICAgICAgIHJlc3VsdCArPSAnXFxuXFxuPCcgKyBsaXN0VHlwZSArIHN0eWxlICsgJz5cXG4nICsgcHJvY2Vzc0xpc3RJdGVtcyh0eHQuc2xpY2UoMCwgcG9zKSwgISF0cmltVHJhaWxpbmcpICsgJzwvJyArIGxpc3RUeXBlICsgJz5cXG4nO1xuXG4gICAgICAgICAgLy8gaW52ZXJ0IGNvdW50ZXJUeXBlIGFuZCBsaXN0VHlwZVxuICAgICAgICAgIGxpc3RUeXBlID0gKGxpc3RUeXBlID09PSAndWwnKSA/ICdvbCcgOiAndWwnO1xuICAgICAgICAgIGNvdW50ZXJSeGcgPSAobGlzdFR5cGUgPT09ICd1bCcpID8gb2xSZ3ggOiB1bFJneDtcblxuICAgICAgICAgIC8vcmVjdXJzZVxuICAgICAgICAgIHBhcnNlQ0wodHh0LnNsaWNlKHBvcykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdCArPSAnXFxuXFxuPCcgKyBsaXN0VHlwZSArIHN0eWxlICsgJz5cXG4nICsgcHJvY2Vzc0xpc3RJdGVtcyh0eHQsICEhdHJpbVRyYWlsaW5nKSArICc8LycgKyBsaXN0VHlwZSArICc+XFxuJztcbiAgICAgICAgfVxuICAgICAgfSkobGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzdHlsZSA9IHN0eWxlU3RhcnROdW1iZXIobGlzdCwgbGlzdFR5cGUpO1xuICAgICAgcmVzdWx0ID0gJ1xcblxcbjwnICsgbGlzdFR5cGUgKyBzdHlsZSArICc+XFxuJyArIHByb2Nlc3NMaXN0SXRlbXMobGlzdCwgISF0cmltVHJhaWxpbmcpICsgJzwvJyArIGxpc3RUeXBlICsgJz5cXG4nO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKiogU3RhcnQgb2YgbGlzdCBwYXJzaW5nICoqL1xuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdsaXN0cy5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgLy8gYWRkIHNlbnRpbmVsIHRvIGhhY2sgYXJvdW5kIGtodG1sL3NhZmFyaSBidWc6XG4gIC8vIGh0dHA6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTExMjMxXG4gIHRleHQgKz0gJ8KoMCc7XG5cbiAgaWYgKGdsb2JhbHMuZ0xpc3RMZXZlbCkge1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL14oKCB7MCwzfShbKistXXxcXGQrWy5dKVsgXFx0XSspW15cXHJdKz8owqgwfFxcbnsyLH0oPz1cXFMpKD8hWyBcXHRdKig/OlsqKy1dfFxcZCtbLl0pWyBcXHRdKykpKS9nbSxcbiAgICAgIGZ1bmN0aW9uICh3aG9sZU1hdGNoLCBsaXN0LCBtMikge1xuICAgICAgICB2YXIgbGlzdFR5cGUgPSAobTIuc2VhcmNoKC9bKistXS9nKSA+IC0xKSA/ICd1bCcgOiAnb2wnO1xuICAgICAgICByZXR1cm4gcGFyc2VDb25zZWN1dGl2ZUxpc3RzKGxpc3QsIGxpc3RUeXBlLCB0cnVlKTtcbiAgICAgIH1cbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoLyhcXG5cXG58Xlxcbj8pKCggezAsM30oWyorLV18XFxkK1suXSlbIFxcdF0rKVteXFxyXSs/KMKoMHxcXG57Mix9KD89XFxTKSg/IVsgXFx0XSooPzpbKistXXxcXGQrWy5dKVsgXFx0XSspKSkvZ20sXG4gICAgICBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbTEsIGxpc3QsIG0zKSB7XG4gICAgICAgIHZhciBsaXN0VHlwZSA9IChtMy5zZWFyY2goL1sqKy1dL2cpID4gLTEpID8gJ3VsJyA6ICdvbCc7XG4gICAgICAgIHJldHVybiBwYXJzZUNvbnNlY3V0aXZlTGlzdHMobGlzdCwgbGlzdFR5cGUsIGZhbHNlKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgLy8gc3RyaXAgc2VudGluZWxcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvwqgwLywgJycpO1xuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdsaXN0cy5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbi8qKlxuICogUGFyc2UgbWV0YWRhdGEgYXQgdGhlIHRvcCBvZiB0aGUgZG9jdW1lbnRcbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCdtZXRhZGF0YScsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBpZiAoIW9wdGlvbnMubWV0YWRhdGEpIHtcbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ21ldGFkYXRhLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIGZ1bmN0aW9uIHBhcnNlTWV0YWRhdGFDb250ZW50cyAoY29udGVudCkge1xuICAgIC8vIHJhdyBpcyByYXcgc28gaXQncyBub3QgY2hhbmdlZCBpbiBhbnkgd2F5XG4gICAgZ2xvYmFscy5tZXRhZGF0YS5yYXcgPSBjb250ZW50O1xuXG4gICAgLy8gZXNjYXBlIGNoYXJzIGZvcmJpZGRlbiBpbiBodG1sIGF0dHJpYnV0ZXNcbiAgICAvLyBkb3VibGUgcXVvdGVzXG4gICAgY29udGVudCA9IGNvbnRlbnRcbiAgICAgIC8vIGFtcGVyc2FuZCBmaXJzdFxuICAgICAgLnJlcGxhY2UoLyYvZywgJyZhbXA7JylcbiAgICAgIC8vIGRvdWJsZSBxdW90ZXNcbiAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7Jyk7XG5cbiAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9cXG4gezR9L2csICcgJyk7XG4gICAgY29udGVudC5yZXBsYWNlKC9eKFtcXFMgXSspOiArKFtcXHNcXFNdKz8pJC9nbSwgZnVuY3Rpb24gKHdtLCBrZXksIHZhbHVlKSB7XG4gICAgICBnbG9iYWxzLm1ldGFkYXRhLnBhcnNlZFtrZXldID0gdmFsdWU7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSk7XG4gIH1cblxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9eXFxzKsKrwqvCqysoXFxTKj8pXFxuKFtcXHNcXFNdKz8pXFxuwrvCu8K7K1xcbi8sIGZ1bmN0aW9uICh3aG9sZW1hdGNoLCBmb3JtYXQsIGNvbnRlbnQpIHtcbiAgICBwYXJzZU1ldGFkYXRhQ29udGVudHMoY29udGVudCk7XG4gICAgcmV0dXJuICfCqE0nO1xuICB9KTtcblxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9eXFxzKi0tLSsoXFxTKj8pXFxuKFtcXHNcXFNdKz8pXFxuLS0tK1xcbi8sIGZ1bmN0aW9uICh3aG9sZW1hdGNoLCBmb3JtYXQsIGNvbnRlbnQpIHtcbiAgICBpZiAoZm9ybWF0KSB7XG4gICAgICBnbG9iYWxzLm1ldGFkYXRhLmZvcm1hdCA9IGZvcm1hdDtcbiAgICB9XG4gICAgcGFyc2VNZXRhZGF0YUNvbnRlbnRzKGNvbnRlbnQpO1xuICAgIHJldHVybiAnwqhNJztcbiAgfSk7XG5cbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvwqhNL2csICcnKTtcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdtZXRhZGF0YS5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbi8qKlxuICogUmVtb3ZlIG9uZSBsZXZlbCBvZiBsaW5lLWxlYWRpbmcgdGFicyBvciBzcGFjZXNcbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCdvdXRkZW50JywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdvdXRkZW50LmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIC8vIGF0dGFja2xhYjogaGFjayBhcm91bmQgS29ucXVlcm9yIDMuNS40IGJ1ZzpcbiAgLy8gXCItLS0tLS0tLS0tYnVnXCIucmVwbGFjZSgvXi0vZyxcIlwiKSA9PSBcImJ1Z1wiXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL14oXFx0fFsgXXsxLDR9KS9nbSwgJ8KoMCcpOyAvLyBhdHRhY2tsYWI6IGdfdGFiX3dpZHRoXG5cbiAgLy8gYXR0YWNrbGFiOiBjbGVhbiB1cCBoYWNrXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL8KoMC9nLCAnJyk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnb3V0ZGVudC5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbi8qKlxuICpcbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCdwYXJhZ3JhcGhzJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ3BhcmFncmFwaHMuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIC8vIFN0cmlwIGxlYWRpbmcgYW5kIHRyYWlsaW5nIGxpbmVzOlxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9eXFxuKy9nLCAnJyk7XG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcbiskL2csICcnKTtcblxuICB2YXIgZ3JhZnMgPSB0ZXh0LnNwbGl0KC9cXG57Mix9L2cpLFxuICAgICAgZ3JhZnNPdXQgPSBbXSxcbiAgICAgIGVuZCA9IGdyYWZzLmxlbmd0aDsgLy8gV3JhcCA8cD4gdGFnc1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZW5kOyBpKyspIHtcbiAgICB2YXIgc3RyID0gZ3JhZnNbaV07XG4gICAgLy8gaWYgdGhpcyBpcyBhbiBIVE1MIG1hcmtlciwgY29weSBpdFxuICAgIGlmIChzdHIuc2VhcmNoKC/CqChLfEcpKFxcZCspXFwxL2cpID49IDApIHtcbiAgICAgIGdyYWZzT3V0LnB1c2goc3RyKTtcblxuICAgIC8vIHRlc3QgZm9yIHByZXNlbmNlIG9mIGNoYXJhY3RlcnMgdG8gcHJldmVudCBlbXB0eSBsaW5lcyBiZWluZyBwYXJzZWRcbiAgICAvLyBhcyBwYXJhZ3JhcGhzIChyZXN1bHRpbmcgaW4gdW5kZXNpcmVkIGV4dHJhIGVtcHR5IHBhcmFncmFwaHMpXG4gICAgfSBlbHNlIGlmIChzdHIuc2VhcmNoKC9cXFMvKSA+PSAwKSB7XG4gICAgICBzdHIgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ3NwYW5HYW11dCcpKHN0ciwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgICBzdHIgPSBzdHIucmVwbGFjZSgvXihbIFxcdF0qKS9nLCAnPHA+Jyk7XG4gICAgICBzdHIgKz0gJzwvcD4nO1xuICAgICAgZ3JhZnNPdXQucHVzaChzdHIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBVbmhhc2hpZnkgSFRNTCBibG9ja3MgKi9cbiAgZW5kID0gZ3JhZnNPdXQubGVuZ3RoO1xuICBmb3IgKGkgPSAwOyBpIDwgZW5kOyBpKyspIHtcbiAgICB2YXIgYmxvY2tUZXh0ID0gJycsXG4gICAgICAgIGdyYWZzT3V0SXQgPSBncmFmc091dFtpXSxcbiAgICAgICAgY29kZUZsYWcgPSBmYWxzZTtcbiAgICAvLyBpZiB0aGlzIGlzIGEgbWFya2VyIGZvciBhbiBodG1sIGJsb2NrLi4uXG4gICAgLy8gdXNlIFJlZ0V4cC50ZXN0IGluc3RlYWQgb2Ygc3RyaW5nLnNlYXJjaCBiZWNhdXNlIG9mIFFNTCBidWdcbiAgICB3aGlsZSAoL8KoKEt8RykoXFxkKylcXDEvLnRlc3QoZ3JhZnNPdXRJdCkpIHtcbiAgICAgIHZhciBkZWxpbSA9IFJlZ0V4cC4kMSxcbiAgICAgICAgICBudW0gICA9IFJlZ0V4cC4kMjtcblxuICAgICAgaWYgKGRlbGltID09PSAnSycpIHtcbiAgICAgICAgYmxvY2tUZXh0ID0gZ2xvYmFscy5nSHRtbEJsb2Nrc1tudW1dO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gd2UgbmVlZCB0byBjaGVjayBpZiBnaEJsb2NrIGlzIGEgZmFsc2UgcG9zaXRpdmVcbiAgICAgICAgaWYgKGNvZGVGbGFnKSB7XG4gICAgICAgICAgLy8gdXNlIGVuY29kZWQgdmVyc2lvbiBvZiBhbGwgdGV4dFxuICAgICAgICAgIGJsb2NrVGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignZW5jb2RlQ29kZScpKGdsb2JhbHMuZ2hDb2RlQmxvY2tzW251bV0udGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYmxvY2tUZXh0ID0gZ2xvYmFscy5naENvZGVCbG9ja3NbbnVtXS5jb2RlYmxvY2s7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJsb2NrVGV4dCA9IGJsb2NrVGV4dC5yZXBsYWNlKC9cXCQvZywgJyQkJCQnKTsgLy8gRXNjYXBlIGFueSBkb2xsYXIgc2lnbnNcblxuICAgICAgZ3JhZnNPdXRJdCA9IGdyYWZzT3V0SXQucmVwbGFjZSgvKFxcblxcbik/wqgoS3xHKVxcZCtcXDIoXFxuXFxuKT8vLCBibG9ja1RleHQpO1xuICAgICAgLy8gQ2hlY2sgaWYgZ3JhZnNPdXRJdCBpcyBhIHByZS0+Y29kZVxuICAgICAgaWYgKC9ePHByZVxcYltePl0qPlxccyo8Y29kZVxcYltePl0qPi8udGVzdChncmFmc091dEl0KSkge1xuICAgICAgICBjb2RlRmxhZyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGdyYWZzT3V0W2ldID0gZ3JhZnNPdXRJdDtcbiAgfVxuICB0ZXh0ID0gZ3JhZnNPdXQuam9pbignXFxuJyk7XG4gIC8vIFN0cmlwIGxlYWRpbmcgYW5kIHRyYWlsaW5nIGxpbmVzOlxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9eXFxuKy9nLCAnJyk7XG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcbiskL2csICcnKTtcbiAgcmV0dXJuIGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgncGFyYWdyYXBocy5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xufSk7XG5cclxuLyoqXG4gKiBSdW4gZXh0ZW5zaW9uXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcigncnVuRXh0ZW5zaW9uJywgZnVuY3Rpb24gKGV4dCwgdGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKGV4dC5maWx0ZXIpIHtcbiAgICB0ZXh0ID0gZXh0LmZpbHRlcih0ZXh0LCBnbG9iYWxzLmNvbnZlcnRlciwgb3B0aW9ucyk7XG5cbiAgfSBlbHNlIGlmIChleHQucmVnZXgpIHtcbiAgICAvLyBUT0RPIHJlbW92ZSB0aGlzIHdoZW4gb2xkIGV4dGVuc2lvbiBsb2FkaW5nIG1lY2hhbmlzbSBpcyBkZXByZWNhdGVkXG4gICAgdmFyIHJlID0gZXh0LnJlZ2V4O1xuICAgIGlmICghKHJlIGluc3RhbmNlb2YgUmVnRXhwKSkge1xuICAgICAgcmUgPSBuZXcgUmVnRXhwKHJlLCAnZycpO1xuICAgIH1cbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHJlLCBleHQucmVwbGFjZSk7XG4gIH1cblxuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbi8qKlxuICogVGhlc2UgYXJlIGFsbCB0aGUgdHJhbnNmb3JtYXRpb25zIHRoYXQgb2NjdXIgKndpdGhpbiogYmxvY2stbGV2ZWxcbiAqIHRhZ3MgbGlrZSBwYXJhZ3JhcGhzLCBoZWFkZXJzLCBhbmQgbGlzdCBpdGVtcy5cbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCdzcGFuR2FtdXQnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnc3BhbkdhbXV0LmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdjb2RlU3BhbnMnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignZXNjYXBlU3BlY2lhbENoYXJzV2l0aGluVGFnQXR0cmlidXRlcycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdlbmNvZGVCYWNrc2xhc2hFc2NhcGVzJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgLy8gUHJvY2VzcyBhbmNob3IgYW5kIGltYWdlIHRhZ3MuIEltYWdlcyBtdXN0IGNvbWUgZmlyc3QsXG4gIC8vIGJlY2F1c2UgIVtmb29dW2ZdIGxvb2tzIGxpa2UgYW4gYW5jaG9yLlxuICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdpbWFnZXMnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignYW5jaG9ycycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIC8vIE1ha2UgbGlua3Mgb3V0IG9mIHRoaW5ncyBsaWtlIGA8aHR0cDovL2V4YW1wbGUuY29tLz5gXG4gIC8vIE11c3QgY29tZSBhZnRlciBhbmNob3JzLCBiZWNhdXNlIHlvdSBjYW4gdXNlIDwgYW5kID5cbiAgLy8gZGVsaW1pdGVycyBpbiBpbmxpbmUgbGlua3MgbGlrZSBbdGhpc10oPHVybD4pLlxuICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdhdXRvTGlua3MnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignc2ltcGxpZmllZEF1dG9MaW5rcycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdlbW9qaScpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCd1bmRlcmxpbmUnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignaXRhbGljc0FuZEJvbGQnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignc3RyaWtldGhyb3VnaCcpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdlbGxpcHNpcycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIC8vIHdlIG5lZWQgdG8gaGFzaCBIVE1MIHRhZ3MgaW5zaWRlIHNwYW5zXG4gIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hIVE1MU3BhbnMnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAvLyBub3cgd2UgZW5jb2RlIGFtcHMgYW5kIGFuZ2xlc1xuICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdlbmNvZGVBbXBzQW5kQW5nbGVzJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgLy8gRG8gaGFyZCBicmVha3NcbiAgaWYgKG9wdGlvbnMuc2ltcGxlTGluZUJyZWFrcykge1xuICAgIC8vIEdGTSBzdHlsZSBoYXJkIGJyZWFrc1xuICAgIC8vIG9ubHkgYWRkIGxpbmUgYnJlYWtzIGlmIHRoZSB0ZXh0IGRvZXMgbm90IGNvbnRhaW4gYSBibG9jayAoc3BlY2lhbCBjYXNlIGZvciBsaXN0cylcbiAgICBpZiAoIS9cXG5cXG7CqEsvLnRlc3QodGV4dCkpIHtcbiAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcbisvZywgJzxiciAvPlxcbicpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBWYW5pbGxhIGhhcmQgYnJlYWtzXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvICArXFxuL2csICc8YnIgLz5cXG4nKTtcbiAgfVxuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ3NwYW5HYW11dC5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcignc3RyaWtldGhyb3VnaCcsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBwYXJzZUluc2lkZSAodHh0KSB7XG4gICAgaWYgKG9wdGlvbnMuc2ltcGxpZmllZEF1dG9MaW5rKSB7XG4gICAgICB0eHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ3NpbXBsaWZpZWRBdXRvTGlua3MnKSh0eHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgIH1cbiAgICByZXR1cm4gJzxkZWw+JyArIHR4dCArICc8L2RlbD4nO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuc3RyaWtldGhyb3VnaCkge1xuICAgIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ3N0cmlrZXRocm91Z2guYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvKD86fil7Mn0oW1xcc1xcU10rPykoPzp+KXsyfS9nLCBmdW5jdGlvbiAod20sIHR4dCkgeyByZXR1cm4gcGFyc2VJbnNpZGUodHh0KTsgfSk7XG4gICAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnc3RyaWtldGhyb3VnaC5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICB9XG5cbiAgcmV0dXJuIHRleHQ7XG59KTtcblxyXG4vKipcbiAqIFN0cmlwcyBsaW5rIGRlZmluaXRpb25zIGZyb20gdGV4dCwgc3RvcmVzIHRoZSBVUkxzIGFuZCB0aXRsZXMgaW5cbiAqIGhhc2ggcmVmZXJlbmNlcy5cbiAqIExpbmsgZGVmcyBhcmUgaW4gdGhlIGZvcm06IF5baWRdOiB1cmwgXCJvcHRpb25hbCB0aXRsZVwiXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignc3RyaXBMaW5rRGVmaW5pdGlvbnMnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHJlZ2V4ICAgICAgID0gL14gezAsM31cXFsoLispXTpbIFxcdF0qXFxuP1sgXFx0XSo8PyhbXj5cXHNdKyk+Pyg/OiA9KFsqXFxkXStbQS1aYS16JV17MCw0fSl4KFsqXFxkXStbQS1aYS16JV17MCw0fSkpP1sgXFx0XSpcXG4/WyBcXHRdKig/OihcXG4qKVtcInwnKF0oLis/KVtcInwnKV1bIFxcdF0qKT8oPzpcXG4rfCg/PcKoMCkpL2dtLFxuICAgICAgYmFzZTY0UmVnZXggPSAvXiB7MCwzfVxcWyguKyldOlsgXFx0XSpcXG4/WyBcXHRdKjw/KGRhdGE6Lis/XFwvLis/O2Jhc2U2NCxbQS1aYS16MC05Ky89XFxuXSs/KT4/KD86ID0oWypcXGRdK1tBLVphLXolXXswLDR9KXgoWypcXGRdK1tBLVphLXolXXswLDR9KSk/WyBcXHRdKlxcbj9bIFxcdF0qKD86KFxcbiopW1wifCcoXSguKz8pW1wifCcpXVsgXFx0XSopPyg/OlxcblxcbnwoPz3CqDApfCg/PVxcblxcWykpL2dtO1xuXG4gIC8vIGF0dGFja2xhYjogc2VudGluZWwgd29ya2Fyb3VuZHMgZm9yIGxhY2sgb2YgXFxBIGFuZCBcXFosIHNhZmFyaVxca2h0bWwgYnVnXG4gIHRleHQgKz0gJ8KoMCc7XG5cbiAgdmFyIHJlcGxhY2VGdW5jID0gZnVuY3Rpb24gKHdob2xlTWF0Y2gsIGxpbmtJZCwgdXJsLCB3aWR0aCwgaGVpZ2h0LCBibGFua0xpbmVzLCB0aXRsZSkge1xuICAgIGxpbmtJZCA9IGxpbmtJZC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh1cmwubWF0Y2goL15kYXRhOi4rP1xcLy4rPztiYXNlNjQsLykpIHtcbiAgICAgIC8vIHJlbW92ZSBuZXdsaW5lc1xuICAgICAgZ2xvYmFscy5nVXJsc1tsaW5rSWRdID0gdXJsLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdsb2JhbHMuZ1VybHNbbGlua0lkXSA9IHNob3dkb3duLnN1YlBhcnNlcignZW5jb2RlQW1wc0FuZEFuZ2xlcycpKHVybCwgb3B0aW9ucywgZ2xvYmFscyk7ICAvLyBMaW5rIElEcyBhcmUgY2FzZS1pbnNlbnNpdGl2ZVxuICAgIH1cblxuICAgIGlmIChibGFua0xpbmVzKSB7XG4gICAgICAvLyBPb3BzLCBmb3VuZCBibGFuayBsaW5lcywgc28gaXQncyBub3QgYSB0aXRsZS5cbiAgICAgIC8vIFB1dCBiYWNrIHRoZSBwYXJlbnRoZXRpY2FsIHN0YXRlbWVudCB3ZSBzdG9sZS5cbiAgICAgIHJldHVybiBibGFua0xpbmVzICsgdGl0bGU7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRpdGxlKSB7XG4gICAgICAgIGdsb2JhbHMuZ1RpdGxlc1tsaW5rSWRdID0gdGl0bGUucmVwbGFjZSgvXCJ8Jy9nLCAnJnF1b3Q7Jyk7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9ucy5wYXJzZUltZ0RpbWVuc2lvbnMgJiYgd2lkdGggJiYgaGVpZ2h0KSB7XG4gICAgICAgIGdsb2JhbHMuZ0RpbWVuc2lvbnNbbGlua0lkXSA9IHtcbiAgICAgICAgICB3aWR0aDogIHdpZHRoLFxuICAgICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICAgIC8vIENvbXBsZXRlbHkgcmVtb3ZlIHRoZSBkZWZpbml0aW9uIGZyb20gdGhlIHRleHRcbiAgICByZXR1cm4gJyc7XG4gIH07XG5cbiAgLy8gZmlyc3Qgd2UgdHJ5IHRvIGZpbmQgYmFzZTY0IGxpbmsgcmVmZXJlbmNlc1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKGJhc2U2NFJlZ2V4LCByZXBsYWNlRnVuYyk7XG5cbiAgdGV4dCA9IHRleHQucmVwbGFjZShyZWdleCwgcmVwbGFjZUZ1bmMpO1xuXG4gIC8vIGF0dGFja2xhYjogc3RyaXAgc2VudGluZWxcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvwqgwLywgJycpO1xuXG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuc2hvd2Rvd24uc3ViUGFyc2VyKCd0YWJsZXMnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKCFvcHRpb25zLnRhYmxlcykge1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgdmFyIHRhYmxlUmd4ICAgICAgID0gL14gezAsM31cXHw/LitcXHwuK1xcbiB7MCwzfVxcfD9bIFxcdF0qOj9bIFxcdF0qKD86Wy09XSl7Mix9WyBcXHRdKjo/WyBcXHRdKlxcfFsgXFx0XSo6P1sgXFx0XSooPzpbLT1dKXsyLH1bXFxzXFxTXSs/KD86XFxuXFxufMKoMCkvZ20sXG4gICAgLy9zaW5nZUNvbFRibFJneCA9IC9eIHswLDN9XFx8LitcXHxcXG4gezAsM31cXHxbIFxcdF0qOj9bIFxcdF0qKD86Wy09XSl7Mix9WyBcXHRdKjo/WyBcXHRdKlxcfFsgXFx0XSpcXG4oPzogezAsM31cXHwuK1xcfFxcbikrKD86XFxuXFxufMKoMCkvZ207XG4gICAgICBzaW5nZUNvbFRibFJneCA9IC9eIHswLDN9XFx8LitcXHxbIFxcdF0qXFxuIHswLDN9XFx8WyBcXHRdKjo/WyBcXHRdKig/OlstPV0pezIsfVsgXFx0XSo6P1sgXFx0XSpcXHxbIFxcdF0qXFxuKCB7MCwzfVxcfC4rXFx8WyBcXHRdKlxcbikqKD86XFxufMKoMCkvZ207XG5cbiAgZnVuY3Rpb24gcGFyc2VTdHlsZXMgKHNMaW5lKSB7XG4gICAgaWYgKC9eOlsgXFx0XSotLSokLy50ZXN0KHNMaW5lKSkge1xuICAgICAgcmV0dXJuICcgc3R5bGU9XCJ0ZXh0LWFsaWduOmxlZnQ7XCInO1xuICAgIH0gZWxzZSBpZiAoL14tLSpbIFxcdF0qOlsgXFx0XSokLy50ZXN0KHNMaW5lKSkge1xuICAgICAgcmV0dXJuICcgc3R5bGU9XCJ0ZXh0LWFsaWduOnJpZ2h0O1wiJztcbiAgICB9IGVsc2UgaWYgKC9eOlsgXFx0XSotLSpbIFxcdF0qOiQvLnRlc3Qoc0xpbmUpKSB7XG4gICAgICByZXR1cm4gJyBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO1wiJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlSGVhZGVycyAoaGVhZGVyLCBzdHlsZSkge1xuICAgIHZhciBpZCA9ICcnO1xuICAgIGhlYWRlciA9IGhlYWRlci50cmltKCk7XG4gICAgLy8gc3VwcG9ydCBib3RoIHRhYmxlc0hlYWRlcklkIGFuZCB0YWJsZUhlYWRlcklkIGR1ZSB0byBlcnJvciBpbiBkb2N1bWVudGF0aW9uIHNvIHdlIGRvbid0IGJyZWFrIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gICAgaWYgKG9wdGlvbnMudGFibGVzSGVhZGVySWQgfHwgb3B0aW9ucy50YWJsZUhlYWRlcklkKSB7XG4gICAgICBpZCA9ICcgaWQ9XCInICsgaGVhZGVyLnJlcGxhY2UoLyAvZywgJ18nKS50b0xvd2VyQ2FzZSgpICsgJ1wiJztcbiAgICB9XG4gICAgaGVhZGVyID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdzcGFuR2FtdXQnKShoZWFkZXIsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gICAgcmV0dXJuICc8dGgnICsgaWQgKyBzdHlsZSArICc+JyArIGhlYWRlciArICc8L3RoPlxcbic7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUNlbGxzIChjZWxsLCBzdHlsZSkge1xuICAgIHZhciBzdWJUZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdzcGFuR2FtdXQnKShjZWxsLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICByZXR1cm4gJzx0ZCcgKyBzdHlsZSArICc+JyArIHN1YlRleHQgKyAnPC90ZD5cXG4nO1xuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGRUYWJsZSAoaGVhZGVycywgY2VsbHMpIHtcbiAgICB2YXIgdGIgPSAnPHRhYmxlPlxcbjx0aGVhZD5cXG48dHI+XFxuJyxcbiAgICAgICAgdGJsTGduID0gaGVhZGVycy5sZW5ndGg7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRibExnbjsgKytpKSB7XG4gICAgICB0YiArPSBoZWFkZXJzW2ldO1xuICAgIH1cbiAgICB0YiArPSAnPC90cj5cXG48L3RoZWFkPlxcbjx0Ym9keT5cXG4nO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGNlbGxzLmxlbmd0aDsgKytpKSB7XG4gICAgICB0YiArPSAnPHRyPlxcbic7XG4gICAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgdGJsTGduOyArK2lpKSB7XG4gICAgICAgIHRiICs9IGNlbGxzW2ldW2lpXTtcbiAgICAgIH1cbiAgICAgIHRiICs9ICc8L3RyPlxcbic7XG4gICAgfVxuICAgIHRiICs9ICc8L3Rib2R5PlxcbjwvdGFibGU+XFxuJztcbiAgICByZXR1cm4gdGI7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVRhYmxlIChyYXdUYWJsZSkge1xuICAgIHZhciBpLCB0YWJsZUxpbmVzID0gcmF3VGFibGUuc3BsaXQoJ1xcbicpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHRhYmxlTGluZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIC8vIHN0cmlwIHdyb25nIGZpcnN0IGFuZCBsYXN0IGNvbHVtbiBpZiB3cmFwcGVkIHRhYmxlcyBhcmUgdXNlZFxuICAgICAgaWYgKC9eIHswLDN9XFx8Ly50ZXN0KHRhYmxlTGluZXNbaV0pKSB7XG4gICAgICAgIHRhYmxlTGluZXNbaV0gPSB0YWJsZUxpbmVzW2ldLnJlcGxhY2UoL14gezAsM31cXHwvLCAnJyk7XG4gICAgICB9XG4gICAgICBpZiAoL1xcfFsgXFx0XSokLy50ZXN0KHRhYmxlTGluZXNbaV0pKSB7XG4gICAgICAgIHRhYmxlTGluZXNbaV0gPSB0YWJsZUxpbmVzW2ldLnJlcGxhY2UoL1xcfFsgXFx0XSokLywgJycpO1xuICAgICAgfVxuICAgICAgLy8gcGFyc2UgY29kZSBzcGFucyBmaXJzdCwgYnV0IHdlIG9ubHkgc3VwcG9ydCBvbmUgbGluZSBjb2RlIHNwYW5zXG4gICAgICB0YWJsZUxpbmVzW2ldID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdjb2RlU3BhbnMnKSh0YWJsZUxpbmVzW2ldLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICB9XG5cbiAgICB2YXIgcmF3SGVhZGVycyA9IHRhYmxlTGluZXNbMF0uc3BsaXQoJ3wnKS5tYXAoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMudHJpbSgpO30pLFxuICAgICAgICByYXdTdHlsZXMgPSB0YWJsZUxpbmVzWzFdLnNwbGl0KCd8JykubWFwKGZ1bmN0aW9uIChzKSB7IHJldHVybiBzLnRyaW0oKTt9KSxcbiAgICAgICAgcmF3Q2VsbHMgPSBbXSxcbiAgICAgICAgaGVhZGVycyA9IFtdLFxuICAgICAgICBzdHlsZXMgPSBbXSxcbiAgICAgICAgY2VsbHMgPSBbXTtcblxuICAgIHRhYmxlTGluZXMuc2hpZnQoKTtcbiAgICB0YWJsZUxpbmVzLnNoaWZ0KCk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgdGFibGVMaW5lcy5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKHRhYmxlTGluZXNbaV0udHJpbSgpID09PSAnJykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHJhd0NlbGxzLnB1c2goXG4gICAgICAgIHRhYmxlTGluZXNbaV1cbiAgICAgICAgICAuc3BsaXQoJ3wnKVxuICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgICAgIHJldHVybiBzLnRyaW0oKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAocmF3SGVhZGVycy5sZW5ndGggPCByYXdTdHlsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gcmF3VGFibGU7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IHJhd1N0eWxlcy5sZW5ndGg7ICsraSkge1xuICAgICAgc3R5bGVzLnB1c2gocGFyc2VTdHlsZXMocmF3U3R5bGVzW2ldKSk7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IHJhd0hlYWRlcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmIChzaG93ZG93bi5oZWxwZXIuaXNVbmRlZmluZWQoc3R5bGVzW2ldKSkge1xuICAgICAgICBzdHlsZXNbaV0gPSAnJztcbiAgICAgIH1cbiAgICAgIGhlYWRlcnMucHVzaChwYXJzZUhlYWRlcnMocmF3SGVhZGVyc1tpXSwgc3R5bGVzW2ldKSk7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IHJhd0NlbGxzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgcm93ID0gW107XG4gICAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgaGVhZGVycy5sZW5ndGg7ICsraWkpIHtcbiAgICAgICAgaWYgKHNob3dkb3duLmhlbHBlci5pc1VuZGVmaW5lZChyYXdDZWxsc1tpXVtpaV0pKSB7XG5cbiAgICAgICAgfVxuICAgICAgICByb3cucHVzaChwYXJzZUNlbGxzKHJhd0NlbGxzW2ldW2lpXSwgc3R5bGVzW2lpXSkpO1xuICAgICAgfVxuICAgICAgY2VsbHMucHVzaChyb3cpO1xuICAgIH1cblxuICAgIHJldHVybiBidWlsZFRhYmxlKGhlYWRlcnMsIGNlbGxzKTtcbiAgfVxuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ3RhYmxlcy5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAvLyBmaW5kIGVzY2FwZWQgcGlwZSBjaGFyYWN0ZXJzXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcXFwoXFx8KS9nLCBzaG93ZG93bi5oZWxwZXIuZXNjYXBlQ2hhcmFjdGVyc0NhbGxiYWNrKTtcblxuICAvLyBwYXJzZSBtdWx0aSBjb2x1bW4gdGFibGVzXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UodGFibGVSZ3gsIHBhcnNlVGFibGUpO1xuXG4gIC8vIHBhcnNlIG9uZSBjb2x1bW4gdGFibGVzXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2Uoc2luZ2VDb2xUYmxSZ3gsIHBhcnNlVGFibGUpO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ3RhYmxlcy5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuc2hvd2Rvd24uc3ViUGFyc2VyKCd1bmRlcmxpbmUnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKCFvcHRpb25zLnVuZGVybGluZSkge1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgndW5kZXJsaW5lLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIGlmIChvcHRpb25zLmxpdGVyYWxNaWRXb3JkVW5kZXJzY29yZXMpIHtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXGJfX18oXFxTW1xcc1xcU10qPylfX19cXGIvZywgZnVuY3Rpb24gKHdtLCB0eHQpIHtcbiAgICAgIHJldHVybiAnPHU+JyArIHR4dCArICc8L3U+JztcbiAgICB9KTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXGJfXyhcXFNbXFxzXFxTXSo/KV9fXFxiL2csIGZ1bmN0aW9uICh3bSwgdHh0KSB7XG4gICAgICByZXR1cm4gJzx1PicgKyB0eHQgKyAnPC91Pic7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvX19fKFxcU1tcXHNcXFNdKj8pX19fL2csIGZ1bmN0aW9uICh3bSwgbSkge1xuICAgICAgcmV0dXJuICgvXFxTJC8udGVzdChtKSkgPyAnPHU+JyArIG0gKyAnPC91PicgOiB3bTtcbiAgICB9KTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9fXyhcXFNbXFxzXFxTXSo/KV9fL2csIGZ1bmN0aW9uICh3bSwgbSkge1xuICAgICAgcmV0dXJuICgvXFxTJC8udGVzdChtKSkgPyAnPHU+JyArIG0gKyAnPC91PicgOiB3bTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGVzY2FwZSByZW1haW5pbmcgdW5kZXJzY29yZXMgdG8gcHJldmVudCB0aGVtIGJlaW5nIHBhcnNlZCBieSBpdGFsaWMgYW5kIGJvbGRcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvKF8pL2csIHNob3dkb3duLmhlbHBlci5lc2NhcGVDaGFyYWN0ZXJzQ2FsbGJhY2spO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ3VuZGVybGluZS5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuLyoqXG4gKiBTd2FwIGJhY2sgaW4gYWxsIHRoZSBzcGVjaWFsIGNoYXJhY3RlcnMgd2UndmUgaGlkZGVuLlxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ3VuZXNjYXBlU3BlY2lhbENoYXJzJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCd1bmVzY2FwZVNwZWNpYWxDaGFycy5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC/CqEUoXFxkKylFL2csIGZ1bmN0aW9uICh3aG9sZU1hdGNoLCBtMSkge1xuICAgIHZhciBjaGFyQ29kZVRvUmVwbGFjZSA9IHBhcnNlSW50KG0xKTtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyQ29kZVRvUmVwbGFjZSk7XG4gIH0pO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ3VuZXNjYXBlU3BlY2lhbENoYXJzLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHJldHVybiB0ZXh0O1xufSk7XG5cclxuc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24uYmxvY2txdW90ZScsIGZ1bmN0aW9uIChub2RlLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgdHh0ID0gJyc7XG4gIGlmIChub2RlLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGROb2RlcyxcbiAgICAgICAgY2hpbGRyZW5MZW5ndGggPSBjaGlsZHJlbi5sZW5ndGg7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBpbm5lclR4dCA9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLm5vZGUnKShjaGlsZHJlbltpXSwgZ2xvYmFscyk7XG5cbiAgICAgIGlmIChpbm5lclR4dCA9PT0gJycpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB0eHQgKz0gaW5uZXJUeHQ7XG4gICAgfVxuICB9XG4gIC8vIGNsZWFudXBcbiAgdHh0ID0gdHh0LnRyaW0oKTtcbiAgdHh0ID0gJz4gJyArIHR4dC5zcGxpdCgnXFxuJykuam9pbignXFxuPiAnKTtcbiAgcmV0dXJuIHR4dDtcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLmNvZGVCbG9jaycsIGZ1bmN0aW9uIChub2RlLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbGFuZyA9IG5vZGUuZ2V0QXR0cmlidXRlKCdsYW5ndWFnZScpLFxuICAgICAgbnVtICA9IG5vZGUuZ2V0QXR0cmlidXRlKCdwcmVjb2RlbnVtJyk7XG4gIHJldHVybiAnYGBgJyArIGxhbmcgKyAnXFxuJyArIGdsb2JhbHMucHJlTGlzdFtudW1dICsgJ1xcbmBgYCc7XG59KTtcblxyXG5zaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5jb2RlU3BhbicsIGZ1bmN0aW9uIChub2RlKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICByZXR1cm4gJ2AnICsgbm9kZS5pbm5lckhUTUwgKyAnYCc7XG59KTtcblxyXG5zaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5lbXBoYXNpcycsIGZ1bmN0aW9uIChub2RlLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgdHh0ID0gJyc7XG4gIGlmIChub2RlLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgIHR4dCArPSAnKic7XG4gICAgdmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZE5vZGVzLFxuICAgICAgICBjaGlsZHJlbkxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyArK2kpIHtcbiAgICAgIHR4dCArPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5ub2RlJykoY2hpbGRyZW5baV0sIGdsb2JhbHMpO1xuICAgIH1cbiAgICB0eHQgKz0gJyonO1xuICB9XG4gIHJldHVybiB0eHQ7XG59KTtcblxyXG5zaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5oZWFkZXInLCBmdW5jdGlvbiAobm9kZSwgZ2xvYmFscywgaGVhZGVyTGV2ZWwpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBoZWFkZXJNYXJrID0gbmV3IEFycmF5KGhlYWRlckxldmVsICsgMSkuam9pbignIycpLFxuICAgICAgdHh0ID0gJyc7XG5cbiAgaWYgKG5vZGUuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgdHh0ID0gaGVhZGVyTWFyayArICcgJztcbiAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkTm9kZXMsXG4gICAgICAgIGNoaWxkcmVuTGVuZ3RoID0gY2hpbGRyZW4ubGVuZ3RoO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgKytpKSB7XG4gICAgICB0eHQgKz0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24ubm9kZScpKGNoaWxkcmVuW2ldLCBnbG9iYWxzKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHR4dDtcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLmhyJywgZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgcmV0dXJuICctLS0nO1xufSk7XG5cclxuc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24uaW1hZ2UnLCBmdW5jdGlvbiAobm9kZSkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHR4dCA9ICcnO1xuICBpZiAobm9kZS5oYXNBdHRyaWJ1dGUoJ3NyYycpKSB7XG4gICAgdHh0ICs9ICchWycgKyBub2RlLmdldEF0dHJpYnV0ZSgnYWx0JykgKyAnXSgnO1xuICAgIHR4dCArPSAnPCcgKyBub2RlLmdldEF0dHJpYnV0ZSgnc3JjJykgKyAnPic7XG4gICAgaWYgKG5vZGUuaGFzQXR0cmlidXRlKCd3aWR0aCcpICYmIG5vZGUuaGFzQXR0cmlidXRlKCdoZWlnaHQnKSkge1xuICAgICAgdHh0ICs9ICcgPScgKyBub2RlLmdldEF0dHJpYnV0ZSgnd2lkdGgnKSArICd4JyArIG5vZGUuZ2V0QXR0cmlidXRlKCdoZWlnaHQnKTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5oYXNBdHRyaWJ1dGUoJ3RpdGxlJykpIHtcbiAgICAgIHR4dCArPSAnIFwiJyArIG5vZGUuZ2V0QXR0cmlidXRlKCd0aXRsZScpICsgJ1wiJztcbiAgICB9XG4gICAgdHh0ICs9ICcpJztcbiAgfVxuICByZXR1cm4gdHh0O1xufSk7XG5cclxuc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24ubGlua3MnLCBmdW5jdGlvbiAobm9kZSwgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHR4dCA9ICcnO1xuICBpZiAobm9kZS5oYXNDaGlsZE5vZGVzKCkgJiYgbm9kZS5oYXNBdHRyaWJ1dGUoJ2hyZWYnKSkge1xuICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGROb2RlcyxcbiAgICAgICAgY2hpbGRyZW5MZW5ndGggPSBjaGlsZHJlbi5sZW5ndGg7XG4gICAgdHh0ID0gJ1snO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7ICsraSkge1xuICAgICAgdHh0ICs9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLm5vZGUnKShjaGlsZHJlbltpXSwgZ2xvYmFscyk7XG4gICAgfVxuICAgIHR4dCArPSAnXSgnO1xuICAgIHR4dCArPSAnPCcgKyBub2RlLmdldEF0dHJpYnV0ZSgnaHJlZicpICsgJz4nO1xuICAgIGlmIChub2RlLmhhc0F0dHJpYnV0ZSgndGl0bGUnKSkge1xuICAgICAgdHh0ICs9ICcgXCInICsgbm9kZS5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykgKyAnXCInO1xuICAgIH1cbiAgICB0eHQgKz0gJyknO1xuICB9XG4gIHJldHVybiB0eHQ7XG59KTtcblxyXG5zaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5saXN0JywgZnVuY3Rpb24gKG5vZGUsIGdsb2JhbHMsIHR5cGUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0eHQgPSAnJztcbiAgaWYgKCFub2RlLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICB2YXIgbGlzdEl0ZW1zICAgICAgID0gbm9kZS5jaGlsZE5vZGVzLFxuICAgICAgbGlzdEl0ZW1zTGVuZ2h0ID0gbGlzdEl0ZW1zLmxlbmd0aCxcbiAgICAgIGxpc3ROdW0gPSBub2RlLmdldEF0dHJpYnV0ZSgnc3RhcnQnKSB8fCAxO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdEl0ZW1zTGVuZ2h0OyArK2kpIHtcbiAgICBpZiAodHlwZW9mIGxpc3RJdGVtc1tpXS50YWdOYW1lID09PSAndW5kZWZpbmVkJyB8fCBsaXN0SXRlbXNbaV0udGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnbGknKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBkZWZpbmUgdGhlIGJ1bGxldCB0byB1c2UgaW4gbGlzdFxuICAgIHZhciBidWxsZXQgPSAnJztcbiAgICBpZiAodHlwZSA9PT0gJ29sJykge1xuICAgICAgYnVsbGV0ID0gbGlzdE51bS50b1N0cmluZygpICsgJy4gJztcbiAgICB9IGVsc2Uge1xuICAgICAgYnVsbGV0ID0gJy0gJztcbiAgICB9XG5cbiAgICAvLyBwYXJzZSBsaXN0IGl0ZW1cbiAgICB0eHQgKz0gYnVsbGV0ICsgc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24ubGlzdEl0ZW0nKShsaXN0SXRlbXNbaV0sIGdsb2JhbHMpO1xuICAgICsrbGlzdE51bTtcbiAgfVxuXG4gIC8vIGFkZCBjb21tZW50IGF0IHRoZSBlbmQgdG8gcHJldmVudCBjb25zZWN1dGl2ZSBsaXN0cyB0byBiZSBwYXJzZWQgYXMgb25lXG4gIHR4dCArPSAnXFxuPCEtLSAtLT5cXG4nO1xuICByZXR1cm4gdHh0LnRyaW0oKTtcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLmxpc3RJdGVtJywgZnVuY3Rpb24gKG5vZGUsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBsaXN0SXRlbVR4dCA9ICcnO1xuXG4gIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGROb2RlcyxcbiAgICAgIGNoaWxkcmVuTGVuZ2h0ID0gY2hpbGRyZW4ubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5naHQ7ICsraSkge1xuICAgIGxpc3RJdGVtVHh0ICs9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLm5vZGUnKShjaGlsZHJlbltpXSwgZ2xvYmFscyk7XG4gIH1cbiAgLy8gaWYgaXQncyBvbmx5IG9uZSBsaW5lciwgd2UgbmVlZCB0byBhZGQgYSBuZXdsaW5lIGF0IHRoZSBlbmRcbiAgaWYgKCEvXFxuJC8udGVzdChsaXN0SXRlbVR4dCkpIHtcbiAgICBsaXN0SXRlbVR4dCArPSAnXFxuJztcbiAgfSBlbHNlIHtcbiAgICAvLyBpdCdzIG11bHRpcGFyYWdyYXBoLCBzbyB3ZSBuZWVkIHRvIGluZGVudFxuICAgIGxpc3RJdGVtVHh0ID0gbGlzdEl0ZW1UeHRcbiAgICAgIC5zcGxpdCgnXFxuJylcbiAgICAgIC5qb2luKCdcXG4gICAgJylcbiAgICAgIC5yZXBsYWNlKC9eIHs0fSQvZ20sICcnKVxuICAgICAgLnJlcGxhY2UoL1xcblxcbisvZywgJ1xcblxcbicpO1xuICB9XG5cbiAgcmV0dXJuIGxpc3RJdGVtVHh0O1xufSk7XG5cclxuXG5cbnNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLm5vZGUnLCBmdW5jdGlvbiAobm9kZSwgZ2xvYmFscywgc3BhbnNPbmx5KSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBzcGFuc09ubHkgPSBzcGFuc09ubHkgfHwgZmFsc2U7XG5cbiAgdmFyIHR4dCA9ICcnO1xuXG4gIC8vIGVkZ2UgY2FzZSBvZiB0ZXh0IHdpdGhvdXQgd3JhcHBlciBwYXJhZ3JhcGhcbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICByZXR1cm4gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24udHh0Jykobm9kZSwgZ2xvYmFscyk7XG4gIH1cblxuICAvLyBIVE1MIGNvbW1lbnRcbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDgpIHtcbiAgICByZXR1cm4gJzwhLS0nICsgbm9kZS5kYXRhICsgJy0tPlxcblxcbic7XG4gIH1cblxuICAvLyBwcm9jZXNzIG9ubHkgbm9kZSBlbGVtZW50c1xuICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gMSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHZhciB0YWdOYW1lID0gbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgc3dpdGNoICh0YWdOYW1lKSB7XG5cbiAgICAvL1xuICAgIC8vIEJMT0NLU1xuICAgIC8vXG4gICAgY2FzZSAnaDEnOlxuICAgICAgaWYgKCFzcGFuc09ubHkpIHsgdHh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24uaGVhZGVyJykobm9kZSwgZ2xvYmFscywgMSkgKyAnXFxuXFxuJzsgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaDInOlxuICAgICAgaWYgKCFzcGFuc09ubHkpIHsgdHh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24uaGVhZGVyJykobm9kZSwgZ2xvYmFscywgMikgKyAnXFxuXFxuJzsgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaDMnOlxuICAgICAgaWYgKCFzcGFuc09ubHkpIHsgdHh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24uaGVhZGVyJykobm9kZSwgZ2xvYmFscywgMykgKyAnXFxuXFxuJzsgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaDQnOlxuICAgICAgaWYgKCFzcGFuc09ubHkpIHsgdHh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24uaGVhZGVyJykobm9kZSwgZ2xvYmFscywgNCkgKyAnXFxuXFxuJzsgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaDUnOlxuICAgICAgaWYgKCFzcGFuc09ubHkpIHsgdHh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24uaGVhZGVyJykobm9kZSwgZ2xvYmFscywgNSkgKyAnXFxuXFxuJzsgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaDYnOlxuICAgICAgaWYgKCFzcGFuc09ubHkpIHsgdHh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24uaGVhZGVyJykobm9kZSwgZ2xvYmFscywgNikgKyAnXFxuXFxuJzsgfVxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdwJzpcbiAgICAgIGlmICghc3BhbnNPbmx5KSB7IHR4dCA9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLnBhcmFncmFwaCcpKG5vZGUsIGdsb2JhbHMpICsgJ1xcblxcbic7IH1cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnYmxvY2txdW90ZSc6XG4gICAgICBpZiAoIXNwYW5zT25seSkgeyB0eHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5ibG9ja3F1b3RlJykobm9kZSwgZ2xvYmFscykgKyAnXFxuXFxuJzsgfVxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdocic6XG4gICAgICBpZiAoIXNwYW5zT25seSkgeyB0eHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5ocicpKG5vZGUsIGdsb2JhbHMpICsgJ1xcblxcbic7IH1cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnb2wnOlxuICAgICAgaWYgKCFzcGFuc09ubHkpIHsgdHh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24ubGlzdCcpKG5vZGUsIGdsb2JhbHMsICdvbCcpICsgJ1xcblxcbic7IH1cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAndWwnOlxuICAgICAgaWYgKCFzcGFuc09ubHkpIHsgdHh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24ubGlzdCcpKG5vZGUsIGdsb2JhbHMsICd1bCcpICsgJ1xcblxcbic7IH1cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAncHJlY29kZSc6XG4gICAgICBpZiAoIXNwYW5zT25seSkgeyB0eHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5jb2RlQmxvY2snKShub2RlLCBnbG9iYWxzKSArICdcXG5cXG4nOyB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3ByZSc6XG4gICAgICBpZiAoIXNwYW5zT25seSkgeyB0eHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5wcmUnKShub2RlLCBnbG9iYWxzKSArICdcXG5cXG4nOyB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3RhYmxlJzpcbiAgICAgIGlmICghc3BhbnNPbmx5KSB7IHR4dCA9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLnRhYmxlJykobm9kZSwgZ2xvYmFscykgKyAnXFxuXFxuJzsgfVxuICAgICAgYnJlYWs7XG5cbiAgICAvL1xuICAgIC8vIFNQQU5TXG4gICAgLy9cbiAgICBjYXNlICdjb2RlJzpcbiAgICAgIHR4dCA9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLmNvZGVTcGFuJykobm9kZSwgZ2xvYmFscyk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2VtJzpcbiAgICBjYXNlICdpJzpcbiAgICAgIHR4dCA9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLmVtcGhhc2lzJykobm9kZSwgZ2xvYmFscyk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3N0cm9uZyc6XG4gICAgY2FzZSAnYic6XG4gICAgICB0eHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5zdHJvbmcnKShub2RlLCBnbG9iYWxzKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnZGVsJzpcbiAgICAgIHR4dCA9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLnN0cmlrZXRocm91Z2gnKShub2RlLCBnbG9iYWxzKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnYSc6XG4gICAgICB0eHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5saW5rcycpKG5vZGUsIGdsb2JhbHMpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdpbWcnOlxuICAgICAgdHh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24uaW1hZ2UnKShub2RlLCBnbG9iYWxzKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHR4dCA9IG5vZGUub3V0ZXJIVE1MICsgJ1xcblxcbic7XG4gIH1cblxuICAvLyBjb21tb24gbm9ybWFsaXphdGlvblxuICAvLyBUT0RPIGV2ZW50dWFsbHlcblxuICByZXR1cm4gdHh0O1xufSk7XG5cclxuc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24ucGFyYWdyYXBoJywgZnVuY3Rpb24gKG5vZGUsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0eHQgPSAnJztcbiAgaWYgKG5vZGUuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgdmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZE5vZGVzLFxuICAgICAgICBjaGlsZHJlbkxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyArK2kpIHtcbiAgICAgIHR4dCArPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5ub2RlJykoY2hpbGRyZW5baV0sIGdsb2JhbHMpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHNvbWUgdGV4dCBub3JtYWxpemF0aW9uXG4gIHR4dCA9IHR4dC50cmltKCk7XG5cbiAgcmV0dXJuIHR4dDtcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLnByZScsIGZ1bmN0aW9uIChub2RlLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbnVtICA9IG5vZGUuZ2V0QXR0cmlidXRlKCdwcmVudW0nKTtcbiAgcmV0dXJuICc8cHJlPicgKyBnbG9iYWxzLnByZUxpc3RbbnVtXSArICc8L3ByZT4nO1xufSk7XG5cclxuc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24uc3RyaWtldGhyb3VnaCcsIGZ1bmN0aW9uIChub2RlLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgdHh0ID0gJyc7XG4gIGlmIChub2RlLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgIHR4dCArPSAnfn4nO1xuICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGROb2RlcyxcbiAgICAgICAgY2hpbGRyZW5MZW5ndGggPSBjaGlsZHJlbi5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgKytpKSB7XG4gICAgICB0eHQgKz0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24ubm9kZScpKGNoaWxkcmVuW2ldLCBnbG9iYWxzKTtcbiAgICB9XG4gICAgdHh0ICs9ICd+fic7XG4gIH1cbiAgcmV0dXJuIHR4dDtcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLnN0cm9uZycsIGZ1bmN0aW9uIChub2RlLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgdHh0ID0gJyc7XG4gIGlmIChub2RlLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgIHR4dCArPSAnKionO1xuICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGROb2RlcyxcbiAgICAgICAgY2hpbGRyZW5MZW5ndGggPSBjaGlsZHJlbi5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgKytpKSB7XG4gICAgICB0eHQgKz0gc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24ubm9kZScpKGNoaWxkcmVuW2ldLCBnbG9iYWxzKTtcbiAgICB9XG4gICAgdHh0ICs9ICcqKic7XG4gIH1cbiAgcmV0dXJuIHR4dDtcbn0pO1xuXHJcbnNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLnRhYmxlJywgZnVuY3Rpb24gKG5vZGUsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0eHQgPSAnJyxcbiAgICAgIHRhYmxlQXJyYXkgPSBbW10sIFtdXSxcbiAgICAgIGhlYWRpbmdzICAgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RoZWFkPnRyPnRoJyksXG4gICAgICByb3dzICAgICAgID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keT50cicpLFxuICAgICAgaSwgaWk7XG4gIGZvciAoaSA9IDA7IGkgPCBoZWFkaW5ncy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBoZWFkQ29udGVudCA9IHNob3dkb3duLnN1YlBhcnNlcignbWFrZU1hcmtkb3duLnRhYmxlQ2VsbCcpKGhlYWRpbmdzW2ldLCBnbG9iYWxzKSxcbiAgICAgICAgYWxsaWduID0gJy0tLSc7XG5cbiAgICBpZiAoaGVhZGluZ3NbaV0uaGFzQXR0cmlidXRlKCdzdHlsZScpKSB7XG4gICAgICB2YXIgc3R5bGUgPSBoZWFkaW5nc1tpXS5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgc3dpdGNoIChzdHlsZSkge1xuICAgICAgICBjYXNlICd0ZXh0LWFsaWduOmxlZnQ7JzpcbiAgICAgICAgICBhbGxpZ24gPSAnOi0tLSc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3RleHQtYWxpZ246cmlnaHQ7JzpcbiAgICAgICAgICBhbGxpZ24gPSAnLS0tOic7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3RleHQtYWxpZ246Y2VudGVyOyc6XG4gICAgICAgICAgYWxsaWduID0gJzotLS06JztcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgdGFibGVBcnJheVswXVtpXSA9IGhlYWRDb250ZW50LnRyaW0oKTtcbiAgICB0YWJsZUFycmF5WzFdW2ldID0gYWxsaWduO1xuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgciA9IHRhYmxlQXJyYXkucHVzaChbXSkgLSAxLFxuICAgICAgICBjb2xzID0gcm93c1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGQnKTtcblxuICAgIGZvciAoaWkgPSAwOyBpaSA8IGhlYWRpbmdzLmxlbmd0aDsgKytpaSkge1xuICAgICAgdmFyIGNlbGxDb250ZW50ID0gJyAnO1xuICAgICAgaWYgKHR5cGVvZiBjb2xzW2lpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY2VsbENvbnRlbnQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi50YWJsZUNlbGwnKShjb2xzW2lpXSwgZ2xvYmFscyk7XG4gICAgICB9XG4gICAgICB0YWJsZUFycmF5W3JdLnB1c2goY2VsbENvbnRlbnQpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjZWxsU3BhY2VzQ291bnQgPSAzO1xuICBmb3IgKGkgPSAwOyBpIDwgdGFibGVBcnJheS5sZW5ndGg7ICsraSkge1xuICAgIGZvciAoaWkgPSAwOyBpaSA8IHRhYmxlQXJyYXlbaV0ubGVuZ3RoOyArK2lpKSB7XG4gICAgICB2YXIgc3RyTGVuID0gdGFibGVBcnJheVtpXVtpaV0ubGVuZ3RoO1xuICAgICAgaWYgKHN0ckxlbiA+IGNlbGxTcGFjZXNDb3VudCkge1xuICAgICAgICBjZWxsU3BhY2VzQ291bnQgPSBzdHJMZW47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IHRhYmxlQXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICBmb3IgKGlpID0gMDsgaWkgPCB0YWJsZUFycmF5W2ldLmxlbmd0aDsgKytpaSkge1xuICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgaWYgKHRhYmxlQXJyYXlbaV1baWldLnNsaWNlKC0xKSA9PT0gJzonKSB7XG4gICAgICAgICAgdGFibGVBcnJheVtpXVtpaV0gPSBzaG93ZG93bi5oZWxwZXIucGFkRW5kKHRhYmxlQXJyYXlbaV1baWldLnNsaWNlKC0xKSwgY2VsbFNwYWNlc0NvdW50IC0gMSwgJy0nKSArICc6JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YWJsZUFycmF5W2ldW2lpXSA9IHNob3dkb3duLmhlbHBlci5wYWRFbmQodGFibGVBcnJheVtpXVtpaV0sIGNlbGxTcGFjZXNDb3VudCwgJy0nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFibGVBcnJheVtpXVtpaV0gPSBzaG93ZG93bi5oZWxwZXIucGFkRW5kKHRhYmxlQXJyYXlbaV1baWldLCBjZWxsU3BhY2VzQ291bnQpO1xuICAgICAgfVxuICAgIH1cbiAgICB0eHQgKz0gJ3wgJyArIHRhYmxlQXJyYXlbaV0uam9pbignIHwgJykgKyAnIHxcXG4nO1xuICB9XG5cbiAgcmV0dXJuIHR4dC50cmltKCk7XG59KTtcblxyXG5zaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi50YWJsZUNlbGwnLCBmdW5jdGlvbiAobm9kZSwgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHR4dCA9ICcnO1xuICBpZiAoIW5vZGUuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGROb2RlcyxcbiAgICAgIGNoaWxkcmVuTGVuZ3RoID0gY2hpbGRyZW4ubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7ICsraSkge1xuICAgIHR4dCArPSBzaG93ZG93bi5zdWJQYXJzZXIoJ21ha2VNYXJrZG93bi5ub2RlJykoY2hpbGRyZW5baV0sIGdsb2JhbHMsIHRydWUpO1xuICB9XG4gIHJldHVybiB0eHQudHJpbSgpO1xufSk7XG5cclxuc2hvd2Rvd24uc3ViUGFyc2VyKCdtYWtlTWFya2Rvd24udHh0JywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0eHQgPSBub2RlLm5vZGVWYWx1ZTtcblxuICAvLyBtdWx0aXBsZSBzcGFjZXMgYXJlIGNvbGxhcHNlZFxuICB0eHQgPSB0eHQucmVwbGFjZSgvICsvZywgJyAnKTtcblxuICAvLyByZXBsYWNlIHRoZSBjdXN0b20gwqhOQlNQOyB3aXRoIGEgc3BhY2VcbiAgdHh0ID0gdHh0LnJlcGxhY2UoL8KoTkJTUDsvZywgJyAnKTtcblxuICAvLyBcIiwgPCwgPiBhbmQgJiBzaG91bGQgcmVwbGFjZSBlc2NhcGVkIGh0bWwgZW50aXRpZXNcbiAgdHh0ID0gc2hvd2Rvd24uaGVscGVyLnVuZXNjYXBlSFRNTEVudGl0aWVzKHR4dCk7XG5cbiAgLy8gZXNjYXBlIG1hcmtkb3duIG1hZ2ljIGNoYXJhY3RlcnNcbiAgLy8gZW1waGFzaXMsIHN0cm9uZyBhbmQgc3RyaWtldGhyb3VnaCAtIGNhbiBhcHBlYXIgZXZlcnl3aGVyZVxuICAvLyB3ZSBhbHNvIGVzY2FwZSBwaXBlICh8KSBiZWNhdXNlIG9mIHRhYmxlc1xuICAvLyBhbmQgZXNjYXBlIGAgYmVjYXVzZSBvZiBjb2RlIGJsb2NrcyBhbmQgc3BhbnNcbiAgdHh0ID0gdHh0LnJlcGxhY2UoLyhbKl9+fGBdKS9nLCAnXFxcXCQxJyk7XG5cbiAgLy8gZXNjYXBlID4gYmVjYXVzZSBvZiBibG9ja3F1b3Rlc1xuICB0eHQgPSB0eHQucmVwbGFjZSgvXihcXHMqKT4vZywgJ1xcXFwkMT4nKTtcblxuICAvLyBoYXNoIGNoYXJhY3Rlciwgb25seSB0cm91Ymxlc29tZSBhdCB0aGUgYmVnaW5uaW5nIG9mIGEgbGluZSBiZWNhdXNlIG9mIGhlYWRlcnNcbiAgdHh0ID0gdHh0LnJlcGxhY2UoL14jL2dtLCAnXFxcXCMnKTtcblxuICAvLyBob3Jpem9udGFsIHJ1bGVzXG4gIHR4dCA9IHR4dC5yZXBsYWNlKC9eKFxccyopKFstPV17Myx9KShcXHMqKSQvLCAnJDFcXFxcJDIkMycpO1xuXG4gIC8vIGRvdCwgYmVjYXVzZSBvZiBvcmRlcmVkIGxpc3RzLCBvbmx5IHRyb3VibGVzb21lIGF0IHRoZSBiZWdpbm5pbmcgb2YgYSBsaW5lIHdoZW4gcHJlY2VkZWQgYnkgYW4gaW50ZWdlclxuICB0eHQgPSB0eHQucmVwbGFjZSgvXiggezAsM31cXGQrKVxcLi9nbSwgJyQxXFxcXC4nKTtcblxuICAvLyArLCAqIGFuZCAtLCBhdCB0aGUgYmVnaW5uaW5nIG9mIGEgbGluZSBiZWNvbWVzIGEgbGlzdCwgc28gd2UgbmVlZCB0byBlc2NhcGUgdGhlbSBhbHNvIChhc3RlcmlzayB3YXMgYWxyZWFkeSBlc2NhcGVkKVxuICB0eHQgPSB0eHQucmVwbGFjZSgvXiggezAsM30pKFsrLV0pL2dtLCAnJDFcXFxcJDInKTtcblxuICAvLyBpbWFnZXMgYW5kIGxpbmtzLCBdIGZvbGxvd2VkIGJ5ICggaXMgcHJvYmxlbWF0aWMsIHNvIHdlIGVzY2FwZSBpdFxuICB0eHQgPSB0eHQucmVwbGFjZSgvXShbXFxzXSopXFwoL2csICdcXFxcXSQxXFxcXCgnKTtcblxuICAvLyByZWZlcmVuY2UgVVJJcyBtdXN0IGFsc28gYmUgZXNjYXBlZFxuICB0eHQgPSB0eHQucmVwbGFjZSgvXiB7MCwzfVxcWyhbXFxTIFxcdF0qPyldOi9nbSwgJ1xcXFxbJDFdOicpO1xuXG4gIHJldHVybiB0eHQ7XG59KTtcblxyXG52YXIgcm9vdCA9IHRoaXM7XG5cbi8vIEFNRCBMb2FkZXJcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgcmV0dXJuIHNob3dkb3duO1xuICB9KTtcblxuLy8gQ29tbW9uSlMvbm9kZUpTIExvYWRlclxufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHNob3dkb3duO1xuXG4vLyBSZWd1bGFyIEJyb3dzZXIgbG9hZGVyXG59IGVsc2Uge1xuICByb290LnNob3dkb3duID0gc2hvd2Rvd247XG59XG59KS5jYWxsKHRoaXMpO1xyXG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNob3dkb3duLmpzLm1hcFxyXG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHBhc3NpbmcgZnVuY3Rpb24gaW4gb3B0aW9ucywgdGhlbiB1c2UgaXQgZm9yIHJlc29sdmUgXCJoZWFkXCIgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAvLyBVc2VmdWwgZm9yIFNoYWRvdyBSb290IHN0eWxlIGkuZVxuICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAvLyAgIGluc2VydEludG86IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9vXCIpLnNoYWRvd1Jvb3QgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZ2V0VGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3RhcmdldF1cblx0fTtcbn0pKCk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG4gICAgICAgIGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9