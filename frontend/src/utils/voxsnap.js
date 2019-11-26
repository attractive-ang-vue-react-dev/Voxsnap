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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 91);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LogTags = undefined;

var _getPrototypeOf = __webpack_require__(7);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = __webpack_require__(9);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = __webpack_require__(12);

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VOXSNAP_PLAYER_BUILD =  true ? 74 : "DEVELOPMENT-UNDEFINED";

var VoxConsole = function () {
    function VoxConsole() {
        (0, _classCallCheck3.default)(this, VoxConsole);
    }
    /**
     * @param {any} message to be logged
     */


    (0, _createClass3.default)(VoxConsole, [{
        key: "log",
        value: function log(message) {}
        /**
         * @param {any} message to be logged
         */

    }, {
        key: "info",
        value: function info(message) {}
        /**
         * @param {any} message to be logged
         */

    }, {
        key: "warn",
        value: function warn(message) {}
        /**
         * @param {any} message to be logged
         */

    }, {
        key: "error",
        value: function error(message) {}
        /**
         * @param {any} message to be logged
         */

    }, {
        key: "trace",
        value: function trace(message) {}
        /**
         * Builds log argument array from given arguments
         * This mostly involves transforming tags into string
         * @param {array} inputArguments
         */

    }, {
        key: "buildLogArguments",
        value: function buildLogArguments(inputArguments) {
            if (inputArguments.length > 0) {
                if (inputArguments[0] instanceof LogTags) {
                    inputArguments[0] = inputArguments[0] + "";
                }
            }
            return inputArguments;
        }
    }]);
    return VoxConsole;
}();

/** @type {{log:function,warn:function,error:function,trace:function}} **/


VoxConsole.console = null;

Object.defineProperty(VoxConsole, "console", {
    get: function get() {
        if (this.__console) {
            return this.__console;
        } else if (VOXSNAP_PLAYER_BUILD == "DEVELOPMENT-UNDEFINED") {
            if ((typeof console === "undefined" ? "undefined" : (0, _typeof3.default)(console)) == "object") {
                return this.__console = console;
            } else {
                throw new Error("Console not available!");
            }
        } else {
            return this.__console = new VoxConsoleRelease();
        }
    },
    enumerable: true
});

/**
 * Log tags can be used to further filter out the logs
 */

var LogTags = function (_String) {
    (0, _inherits3.default)(LogTags, _String);

    /**
     * @param {...string} tag names
     */
    function LogTags(taglist) {
        (0, _classCallCheck3.default)(this, LogTags);

        var taglistIsArray = (typeof taglist === "undefined" ? "undefined" : (0, _typeof3.default)(taglist)) == "object" && !!(taglist.callee || arguments.splice);
        var tags = taglistIsArray ? taglist : [];
        if (!taglistIsArray) {
            tags.push.apply(tags, arguments);
            for (var i = 0, l = tags.length; i < l; ++i) {
                tags[i] = tags[i].toUpperCase();
            }
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (LogTags.__proto__ || (0, _getPrototypeOf2.default)(LogTags)).call(this, "[" + tags.join("][") + "]"));

        _this.tags = tags;
        return _this;
    }

    (0, _createClass3.default)(LogTags, [{
        key: "toString",
        value: function toString() {
            return "[" + this.tags.join("][") + "]";
        }
    }, {
        key: "valueOf",
        value: function valueOf() {
            return this.toString();
        }
    }]);
    return LogTags;
}(String);

VoxConsole.Tags = function () {
    return new LogTags(arguments);
};

var VoxConsoleDebug = function (_VoxConsole) {
    (0, _inherits3.default)(VoxConsoleDebug, _VoxConsole);

    function VoxConsoleDebug() {
        (0, _classCallCheck3.default)(this, VoxConsoleDebug);
        return (0, _possibleConstructorReturn3.default)(this, (VoxConsoleDebug.__proto__ || (0, _getPrototypeOf2.default)(VoxConsoleDebug)).call(this));
    }

    (0, _createClass3.default)(VoxConsoleDebug, [{
        key: "log",
        value: function log() {
            return console.log.apply(console, this.buildLogArguments(arguments));
        }
    }, {
        key: "info",
        value: function info() {
            return console.info.apply(console, this.buildLogArguments(arguments));
        }
    }, {
        key: "warn",
        value: function warn() {
            return console.warn.apply(console, this.buildLogArguments(arguments));
        }
    }, {
        key: "error",
        value: function error() {
            return console.error.apply(console, this.buildLogArguments(arguments));
        }
    }, {
        key: "trace",
        value: function trace() {
            return console.trace.apply(console, this.buildLogArguments(arguments));
        }
    }]);
    return VoxConsoleDebug;
}(VoxConsole);

var VoxConsoleRelease = function (_VoxConsole2) {
    (0, _inherits3.default)(VoxConsoleRelease, _VoxConsole2);

    function VoxConsoleRelease() {
        (0, _classCallCheck3.default)(this, VoxConsoleRelease);
        return (0, _possibleConstructorReturn3.default)(this, (VoxConsoleRelease.__proto__ || (0, _getPrototypeOf2.default)(VoxConsoleRelease)).call(this));
    }

    (0, _createClass3.default)(VoxConsoleRelease, [{
        key: "log",
        value: function log() {}
    }, {
        key: "info",
        value: function info() {}
    }, {
        key: "warn",
        value: function warn() {}
    }, {
        key: "error",
        value: function error() {}
    }, {
        key: "trace",
        value: function trace() {}
    }]);
    return VoxConsoleRelease;
}(VoxConsole);

exports.default = VoxConsole;
exports.LogTags = LogTags;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(38);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(47)('wks');
var uid = __webpack_require__(33);
var Symbol = __webpack_require__(4).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var core = __webpack_require__(1);
var ctx = __webpack_require__(24);
var hide = __webpack_require__(18);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(103), __esModule: true };

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(62);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(61);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(12);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(12);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(20);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(149);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(95);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(94);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(21)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(13);
var IE8_DOM_DEFINE = __webpack_require__(65);
var toPrimitive = __webpack_require__(50);
var dP = Object.defineProperty;

exports.f = __webpack_require__(14) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(16);
var createDesc = __webpack_require__(31);
module.exports = __webpack_require__(14) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(115);
var defined = __webpack_require__(28);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Waveform = exports.External = exports.VoxsnapJson = exports.VoxsnapPlayerJson = exports.VOXSNAP_HTML = exports.VOXSNAP_PLAYER_HTML = exports.XHRJSON = exports.DocumentReady = exports.XHR = exports.Script = undefined;

var _regenerator = __webpack_require__(11);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(10);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__(20);

var _promise2 = _interopRequireDefault(_promise);

/**
 *
 * @param {String} VOXSNAP_DATA optional, defautls to https://data.voxsnap.com
 * @param {number|string} narration_id id of the naration, this is a number
 * @returns {Promise<WaveformData>}
 */
var VoxsnapWaveform = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(narration_id) {
        var VOXSNAP_DATA = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "https://data.voxsnap.com";
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return VoxsnapJson(VOXSNAP_DATA + "/waveform/" + narration_id);

                    case 2:
                        return _context.abrupt("return", _context.sent);

                    case 3:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function VoxsnapWaveform(_x3) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * Loads main player container.
 * @param {string} RESOURCE_BASE_PATH Base URL for voxsnap resources
 * @param {"basic"|"pro"} version
 */
var voxsnap_player_html = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(RESOURCE_BASE_PATH) {
        var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "basic";
        var node, versions, selector;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return voxsnap_html(RESOURCE_BASE_PATH);

                    case 2:
                        node = _context2.sent;
                        versions = {
                            basic: "div#player-basic .player_container,div.player_container",
                            pro: "div#player-pro .player_container"
                            //    {
                            //    toString: function () { throw new Error("Add pro version selector."); }
                            //}

                            //voxole.log("[VOXSNAP] Fetching player version: ", version, new Error().stack)
                        };
                        selector = version && versions[version] ? versions[version] : versions.basic;
                        return _context2.abrupt("return", node.querySelector(selector));

                    case 6:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function voxsnap_player_html(_x5) {
        return _ref2.apply(this, arguments);
    };
}();
/**
 * Creates promise that can be resolved or rejected outside it's own scope
 * using resolveWith and rejectWith callbacks
 */


var _VoxConsole = __webpack_require__(0);

var _VoxConsole2 = _interopRequireDefault(_VoxConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voxole = _VoxConsole2.default.console;

function PromiseScript(url) {
    return new _promise2.default(function (resolve, reject) {
        var script = document.createElement("script");
        script.addEventListener("load", resolve);
        script.addEventListener("error", reject);
        script.setAttribute("async", "async");
        script.setAttribute("src", url);
        document.documentElement.appendChild(script);
    });
}

function PromiseXHR(URL, method) {
    if (typeof method != "string") method = "GET";
    return new _promise2.default(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open(method, URL);
        req.addEventListener("load", function (e) {
            try {
                resolve(this.responseText);
            } catch (e) {
                reject(e);
            }
        });
        req.addEventListener("error", function (e) {
            reject(e);
        });
        req.send();
    });
}

(function () {
    document.ready = new _promise2.default(function (resolve) {
        if (document.readyState === 'complete') {
            resolve();
        } else {
            var onReady = function onReady() {
                resolve();
                document.removeEventListener('DOMContentLoaded', onReady, true);
                window.removeEventListener('load', onReady, true);
            };

            document.addEventListener('DOMContentLoaded', onReady, true);
            window.addEventListener('load', onReady, true);
        }
    });
})();

function XHRJSON(url) {
    return PromiseXHR(url).then(function (result) {
        return JSON.parse(result);
    });
}
/**
 * Load JSON info about a track
 * @param {String} company
 * @param {String} track
 * @param {String} VOXSNAP_DATA optional, defautls to https://data.voxsnap.com
 */
var voxsnap_library_cache = {};
function VoxsnapPlayerJson(company, track) {
    var VOXSNAP_DATA = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "https://data.voxsnap.com";

    var url = VOXSNAP_DATA + "/library/v1/" + company + "/" + track + "/library.json";
    return VoxsnapJson(url);
}
function VoxsnapJson(url) {
    // testing @todo remove this
    //return new Promise(function (resolve) {
    //    resolve({
    //        narrations: [
    //            {
    //                twitter: "",
    //                audio_length: 5,
    //                audio_url: "soundtrack1.mp3",
    //                title: "Localhost debug"
    //            }
    //        ]
    //    });
    //});
    if (voxsnap_library_cache[url]) return voxsnap_library_cache[url];else return voxsnap_library_cache[url] = XHRJSON(url).then(function (result) {
        return result;
    });
}

var voxsnap_html_cache = null;
function voxsnap_html(RESOURCE_BASE_PATH, selector) {
    if (!voxsnap_html_cache) voxsnap_html_cache = PromiseXHR(RESOURCE_BASE_PATH + "player.html");

    return voxsnap_html_cache.then(function (result) {
        var parser = new DOMParser();
        var domobj = parser.parseFromString(result, "text/html");

        if (typeof selector == "string") {
            var foundElement = domobj.querySelector(selector);
            if (!foundElement) voxole.warn("[VOXSNAP] Cannot find DOM node by selector '" + selector + "'!");
            return foundElement;
        } else {
            return domobj;
        }
    });
}function ExternalResolvable() {
    var callback;
    var resolveCb;
    var rejectCb;
    var promise = new _promise2.default(callback = function callback(resolve, reject) {
        resolveCb = resolve;
        rejectCb = reject;
    });
    // assign callback to the promise object
    promise.resolveWith = resolveCb;
    promise.rejectWith = rejectCb;

    return promise;
}
var readyPrivate = document.ready;
exports.Script = PromiseScript;
exports.XHR = PromiseXHR;
exports.DocumentReady = readyPrivate;
exports.XHRJSON = XHRJSON;
exports.VOXSNAP_PLAYER_HTML = voxsnap_player_html;
exports.VOXSNAP_HTML = voxsnap_html;
exports.VoxsnapPlayerJson = VoxsnapPlayerJson;
exports.VoxsnapJson = VoxsnapJson;
exports.External = ExternalResolvable;
exports.Waveform = VoxsnapWaveform;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(27);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(7);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(92);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(70);
var enumBugKeys = __webpack_require__(40);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(16).f;
var has = __webpack_require__(17);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CustomEvent = exports.URL = undefined;

var _create = __webpack_require__(61);

var _create2 = _interopRequireDefault(_create);

var _VoxConsole = __webpack_require__(0);

var _VoxConsole2 = _interopRequireDefault(_VoxConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voxole = _VoxConsole2.default.console;

var URL = window.URL;
/** Polyfill URL for IE **/
try {
    new URL("http://example.net");
} catch (error) {
    exports.URL = URL = function URL(url) {
        var link = document.createElement('a');
        this.href = link.href = url;
        this.host = link.host;
        this.hash = link.hash;
        this.protocol = link.protocol;
        this.pathname = link.pathname;
        this.port = link.port;
        this.search = link.search;
    };
    URL.prototype = (0, _create2.default)(window.URL);
}
/**
 *  Polyfill CustomEvent for IE
 */
var CustomEvent = window.CustomEvent;
try {
    var evt = new CustomEvent("test", { 'detail': "test" });
} catch (error) {
    exports.CustomEvent = CustomEvent = function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    };
    CustomEvent.prototype = typeof window.CustomEvent == "function" ? window.CustomEvent.prototype : window.Event.prototype;
}
exports.URL = URL;
exports.CustomEvent = CustomEvent;

// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
// We need this until Indians get their shit together

if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
        value: function value(predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                // d. If testResult is true, return k.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return k;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return -1.
            return -1;
        },
        configurable: true,
        writable: true,
        enumerable: false
    });
}

// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function value(predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return undefined.
            return undefined;
        },
        configurable: true,
        writable: true
    });
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.path = undefined;

var _VoxConsole = __webpack_require__(0);

var _VoxConsole2 = _interopRequireDefault(_VoxConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voxole = _VoxConsole2.default.console;

/** Path to resources (scripts, html, css) includes trailing slash if necessary **/
var RESOURCE_BASE_PATH = location.hostname == "localhost" || location.protocol == "file:" ? "" : "https://data.voxsnap.com/player/";

window.VOXSNAP_BASE_RESOURCE_PATH = RESOURCE_BASE_PATH;
exports.path = RESOURCE_BASE_PATH;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(97), __esModule: true };

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JSONMetadataItem = exports.default = undefined;

var _getPrototypeOf = __webpack_require__(7);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(9);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _VoxConsole = __webpack_require__(0);

var _VoxConsole2 = _interopRequireDefault(_VoxConsole);

var _DynamicStylesheet = __webpack_require__(58);

var _DynamicStylesheet2 = _interopRequireDefault(_DynamicStylesheet);

var _eventEmitter = __webpack_require__(60);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voxole = _VoxConsole2.default.console;

var JSONMetadataItem = function (_EventEmitter) {
    (0, _inherits3.default)(JSONMetadataItem, _EventEmitter);

    function JSONMetadataItem() {
        (0, _classCallCheck3.default)(this, JSONMetadataItem);

        var _this = (0, _possibleConstructorReturn3.default)(this, (JSONMetadataItem.__proto__ || (0, _getPrototypeOf2.default)(JSONMetadataItem)).call(this));

        _this.dynamicStyle = new _DynamicStylesheet2.default(true);
        _this.dynamicStyle.debugName = "JSONMetadataItem";
        //s
        return _this;
    }

    (0, _createClass3.default)(JSONMetadataItem, [{
        key: "getFBShareURL",
        value: function getFBShareURL() {
            if (this.LIBRARY_ITEM) {
                return 'https://www.facebook.com/dialog/share?app_id=620074461518868&display=popup' + '&href=' + encodeURIComponent(this.LIBRARY_ITEM.article_url) + '&redirect_uri=' + encodeURIComponent(this.LIBRARY_ITEM.article_url);
            }
        }
    }, {
        key: "getTwitterShareURL",
        value: function getTwitterShareURL() {
            var href_tw = this.LIBRARY_ITEM.twitter.length > 0 ? 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('Listen to this awesome post by ' + this.LIBRARY_ITEM.twitter + ' Check it out!') + '&via=voxsnap&url=' + encodeURIComponent(this.LIBRARY_ITEM.article_url) : 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('I found this awesome blog post you can listen to. Check it out!') + '&via=voxsnap&url=' + encodeURIComponent(this.LIBRARY_ITEM.article_url);
            return href_tw;
        }
    }, {
        key: "getLinkedInShareURL",
        value: function getLinkedInShareURL() {
            if (this.LIBRARY_ITEM) {
                return 'https://www.linkedin.com/shareArticle?mini=true' + '&url=' + encodeURIComponent(this.LIBRARY_ITEM.article_url) + '&title=' + encodeURIComponent(this.LIBRARY_ITEM.title.substr(0, 200)) + '&source=VoxSnap';
            }
        }
    }, {
        key: "getMailShareURL",
        value: function getMailShareURL() {
            return 'mailto:?body=' + encodeURIComponent('I found this awesome blog post you can listen to. Check it out! ') + encodeURIComponent(this.LIBRARY_ITEM.blog_url) + '&subject=' + encodeURIComponent('Listen to this Story: ' + this.LIBRARY_ITEM.title);
        }
    }, {
        key: "getPlayerEmbed",
        value: function getPlayerEmbed(RESOURCE_BASE_PATH) {
            return '<div id="voxsnap-player"></div><script async type="text/javascript" src="' + RESOURCE_BASE_PATH + 'v1/' + this.LIBRARY_ITEM.username + '/voxsnap.js" data-username="' + this.LIBRARY_ITEM.username + '" data-narration="' + this.LIBRARY_ITEM.narration_id + '"></script>';
        }
    }, {
        key: "renderLibrary",
        value: function renderLibrary() {
            var RESOURCE_BASE_PATH = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "https://data.voxsnap.com/player/";

            var node = null;
            if (node = this.html.querySelector(".sharing_media_icons .icon_facebook")) node.href = this.getFBShareURL();

            if (node = this.html.querySelector(".sharing_media_icons .icon_twitter")) node.href = this.getTwitterShareURL();

            if (node = this.html.querySelector(".sharing_media_icons .icon_linkedin")) node.href = this.getLinkedInShareURL();

            if (node = this.html.querySelector(".sharing_media_icons .icon_link")) node.href = this.LIBRARY_ITEM.blog_url;

            if (node = this.html.querySelector(".sharing_media_icons .icon_mail")) node.href = this.getMailShareURL();

            var sharingCodeArea = this.html.querySelector(".sharing_code-text");
            if (sharingCodeArea) sharingCodeArea.value = this.getPlayerEmbed(RESOURCE_BASE_PATH);

            // set song title etc
            this.html.voxsnap_render(".player-title_name", this.LIBRARY_ITEM.title, undefined, undefined, true);
            this.html.voxsnap_render(".card-link", { href: this.LIBRARY_ITEM.blog_url, text: this.LIBRARY_ITEM.title }, undefined, undefined, true);
            this.html.voxsnap_render(".card-company", { href: this.LIBRARY_ITEM.customer_url, text: this.LIBRARY_ITEM.customer_display }, undefined, undefined, true);

            this.html.voxsnap_render(".player_pht-url", { href: this.LIBRARY_ITEM.blog_url || this.LIBRARY_ITEM.article_url, text: this.LIBRARY_ITEM.display_url }, undefined, undefined, true);

            this.html.voxsnap_render(".card-ctg_lnk", this.LIBRARY_ITEM.genre instanceof Array ? this.LIBRARY_ITEM.genre.join(", ") : "");

            // PRO player
            this.html.voxsnap_render(".player-title a", { href: this.LIBRARY_ITEM.blog_url }, undefined, undefined, true);
            try {
                if (typeof this.LIBRARY.playlist_name == "string") this.html.voxsnap_render(".player-category", this.LIBRARY.playlist_name, undefined, undefined, true);
            } catch (e) {}

            if (typeof this.LIBRARY_ITEM.image == "string") {
                //var url = this.LIBRARY_ITEM.image;
                //if (url.lastIndexOf("https:") != 0) {
                //    url = url.substr(url.lastIndexOf("https:"));
                //}
                this.html.voxsnap_render(".card-img", { src: this.LIBRARY_ITEM.image });
            }
        }
        /** @type {CSSStyleSheet} **/

    }, {
        key: "voxsnapStylesheet",
        get: function get() {
            return this.dynamicStyle.sheet;
        }
    }]);
    return JSONMetadataItem;
}(_eventEmitter2.default);

exports.default = JSONMetadataItem;
exports.JSONMetadataItem = JSONMetadataItem;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(101), __esModule: true };

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15);
var document = __webpack_require__(4).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(27);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(13);
var dPs = __webpack_require__(124);
var enumBugKeys = __webpack_require__(40);
var IE_PROTO = __webpack_require__(46)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(39)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(64).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(44);
var createDesc = __webpack_require__(31);
var toIObject = __webpack_require__(19);
var toPrimitive = __webpack_require__(50);
var has = __webpack_require__(17);
var IE8_DOM_DEFINE = __webpack_require__(65);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(14) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 44 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(6);
var core = __webpack_require__(1);
var fails = __webpack_require__(21);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(47)('keys');
var uid = __webpack_require__(33);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(28);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(15);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var core = __webpack_require__(1);
var LIBRARY = __webpack_require__(29);
var wksExt = __webpack_require__(52);
var defineProperty = __webpack_require__(16).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FeaturedItem = exports.LibraryItem = exports.AudioItem = exports.IntroductionItem = exports.Introduction = exports.Featured = exports.Library = exports.LibraryInterface = undefined;

var _get2 = __webpack_require__(26);

var _get3 = _interopRequireDefault(_get2);

var _getPrototypeOf = __webpack_require__(7);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = __webpack_require__(9);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _regenerator = __webpack_require__(11);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(10);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = __webpack_require__(12);

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = __webpack_require__(20);

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _VoxConsole = __webpack_require__(0);

var _VoxConsole2 = _interopRequireDefault(_VoxConsole);

var _ResourcePath = __webpack_require__(35);

var _Promises = __webpack_require__(22);

var Promises = _interopRequireWildcard(_Promises);

var _JSONMetadataItem = __webpack_require__(37);

var _JSONMetadataItem2 = _interopRequireDefault(_JSONMetadataItem);

var _FilterMenu = __webpack_require__(84);

var _FilterMenu2 = _interopRequireDefault(_FilterMenu);

var _AudioItem2 = __webpack_require__(56);

var _AudioItem3 = _interopRequireDefault(_AudioItem2);

var _DynamicStylesheet = __webpack_require__(58);

var _DynamicStylesheet2 = _interopRequireDefault(_DynamicStylesheet);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voxole = _VoxConsole2.default.console;

//define(["./VoxsnapDOMMethods", "./Promises", "./JSONMetadataItem", "./VoxsnapPlayer", "./FilterMenu"],
//function (VoxsnapDOMMethods, Promises, JSONMetadataItem, VoxsnapPlayer, FilterMenu) {

/**
 * @property LibraryInterface.narrations {Array}
 */
var LibraryInterface = function () {
    /**
     *
     * @param {string|LIBRARY_JSON} libraryURL
     */
    function LibraryInterface() {
        var _this = this;

        var libraryURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "https://data.voxsnap.com/library/v1/library.json";
        var player_version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        (0, _classCallCheck3.default)(this, LibraryInterface);

        /** @type {AudioItem} **/
        this.playingEntry = null;

        /** @type {Promise<HTMLElement>} **/
        this.html_promise = null;
        /** @type {HTMLElement} this.html **/
        this.html = null;
        this.dynamicStyle = new _DynamicStylesheet2.default(true);
        this.dynamicStyle.debugName = "LibraryInterface";

        this.player_version = player_version || "basic";

        /** @type {HTMLElement|string|DocumentFragment} **/
        var html_provider = this.getContainerSelector();
        if (html_provider instanceof HTMLElement || html_provider instanceof DocumentFragment) {
            this.html_promise = new _promise2.default(function (resolve) {
                return resolve(html_provider);
            });
        } else if (typeof html_provider == "string") {
            if (this.player_version == "pro") {
                // this feels absolutely retarded
                this.html_promise = Promises.VOXSNAP_HTML(_ResourcePath.path, "div#player-pro " + html_provider);
            } else {
                this.html_promise = Promises.VOXSNAP_HTML(_ResourcePath.path, html_provider);
            }
        } else {
            this.html_promise = new _promise2.default(function () {
                return document.createElement("div");
            });
            voxole.warn("[VOXSNAP LIBRARY] Invalid HTML container node descriptor provided:", html_provider);
        }
        /**
        @description list of items that are to be rendered and eventually played
        @type {Array<LIBRARY_ITEM>} **/
        this.narrations = [];
        if (typeof libraryURL == "string") {
            /** @type {LIBRARY_JSON} **/
            this.LIBRARY = null;

            this.LIBRARY_PROMISE = Promises.VoxsnapJson(libraryURL).then(function (LIBRARY) {
                /** @type {LIBRARY_JSON} **/
                _this.LIBRARY = LIBRARY;
                _this.processLibrary(_this.LIBRARY);
                _this.loadNarrations();
                return _this.LIBRARY;
            }).catch(function (e) {
                voxole.error("Loading library failed: ", e, e.message, e.stack);
                if (_this.player) {
                    _this.player.destroyPlayer();
                }
            });
        } else if ((typeof libraryURL === "undefined" ? "undefined" : (0, _typeof3.default)(libraryURL)) == "object" && libraryURL.narrations) {
            /** @type {LIBRARY_JSON} **/
            this.LIBRARY = libraryURL;
            this.LIBRARY_PROMISE = new _promise2.default(function (resolve) {
                resolve(_this.LIBRARY);
            });
            this.processLibrary(this.LIBRARY);
            this.loadNarrations();
        }
        /** @type {FilterMenu} **/
        this.filterMenu = null;

        /** @type {Array<AudioItem>} **/
        this.items = [];
        this.genres = [];

        this.player = null;
        this.analyticDetails = {};
    }

    (0, _createClass3.default)(LibraryInterface, [{
        key: "initHTML",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!this.html) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt("return", this.html);

                            case 2:
                                _context.next = 4;
                                return this.html_promise;

                            case 4:
                                this.html = _context.sent;

                                // remnove any id, ids are only used to get the correct element
                                this.html.id = "";
                                this.html_item_container = this.getItemContainer();
                                if (!this.html_item_container) voxole.warn("[VOXSNAP] Cannot find the container for library items!");
                                return _context.abrupt("return", this.html);

                            case 9:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function initHTML() {
                return _ref.apply(this, arguments);
            }

            return initHTML;
        }()
        /**
         * Returns node which should contain library items. This should either be
         * this.html or one of its child nodes.
         * @private
         * @returns {HTMLElement}
         */

    }, {
        key: "getItemContainer",
        value: function getItemContainer() {
            return this.html.querySelector(".row.item-row");
        }
    }, {
        key: "appendTo",
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(element) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.initHTML();

                            case 2:
                                element.appendChild(this.html);
                                this.renderHTMLItems();

                            case 4:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function appendTo(_x3) {
                return _ref2.apply(this, arguments);
            }

            return appendTo;
        }()
        /**
         * CSS selector to container that contains
         * this library's HTML in template
         * @returns {HTMLElement|string}
         */

    }, {
        key: "getContainerSelector",
        value: function getContainerSelector() {
            throw new Error("Pure virtual method call!");
        }
        /**
         *
         * @param {Object} JSON_DATA the ROOT element of standard json library
         */

    }, {
        key: "processLibrary",
        value: function processLibrary(JSON_DATA) {}
        /**
         * Returns constructor for one item class representation
         */

    }, {
        key: "getItemConstructor",
        value: function getItemConstructor() {
            throw new Error("Pure virtual method call!");
        }
        /**
         * Loads narrations from narrations and
         * uses getItemConstructor() to fill items
         * with item instances
          * JSON data must be loaded already
         * DO NOT CALL. CALLED AUTOMATICALLY AFTER DATA IS LOADED!!!
         */

    }, {
        key: "loadNarrations",
        value: function loadNarrations() {
            var _this2 = this;

            var ItemConstructor = this.getItemConstructor(this.player_version);
            if (this.items.length > 0) voxole.warn("[VOXSNAP] Initializing narrations multiple times. That's a bad thing(TM)!");
            //voxole.info("[VOXSNAP] Linrary", this, "is loading narrations from", this.narrations);
            this.items.length = 0;
            this.genres.length = 0;
            this.narrations.forEach(function (item) {
                // @Darker, there has to be a better way
                if (_this2.player_version) {
                    item.player_version = _this2.player_version;
                }
                var itemObject = new ItemConstructor(item);
                _this2.items.push(itemObject);
                _this2.addGenres(item.genre);
                itemObject.onplay = function (item) {
                    _this2.playEntry(item);
                };
                itemObject.index = _this2.items.length;
            });
            if (this.filterMenu) this.filterMenu.addGenreFilters(this.genres);
        }
        /**
         * Add any genres that are not added yet
         * @param {Array<string>} genres
         */

    }, {
        key: "addGenres",
        value: function addGenres(genres) {
            if (genres instanceof Array) {
                for (var i = 0; i < genres.length; i++) {
                    if (this.genres.indexOf(genres[i]) < 0) {
                        this.genres.push(genres[i]);
                    }
                }
            }
        }
    }, {
        key: "renderHTMLItems",
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
                var i, l, item, domNode;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.LIBRARY_PROMISE;

                            case 2:
                                _context3.next = 4;
                                return this.initHTML();

                            case 4:
                                this.html_item_container.innerHTML = "";
                                //voxole.info("[VOXSNAP] Library", this, "rendering narrations", this.items, "into", this.html_item_container);
                                // wait and append
                                i = 0, l = this.items.length;

                            case 6:
                                if (!(i < l)) {
                                    _context3.next = 16;
                                    break;
                                }

                                item = this.items[i];
                                _context3.next = 10;
                                return item.getDOMObject();

                            case 10:
                                domNode = _context3.sent;

                                //voxole.log("Add", item, "'s dom node", domNode);
                                this.html_item_container.appendChild(domNode);
                                if (this instanceof Introduction) voxole.log(this.html_item_container, domNode);

                            case 13:
                                ++i;
                                _context3.next = 6;
                                break;

                            case 16:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function renderHTMLItems() {
                return _ref3.apply(this, arguments);
            }

            return renderHTMLItems;
        }()
        /**
         * Binds player to this audio library
         * @param {VoxsnapPlayer} player
         */

    }, {
        key: "usePlayer",
        value: function usePlayer(player) {
            var _this3 = this;

            this.player = player;
            this.changePlayerHTML(this.player);
            player.addEventListener("play", function () {
                _this3.playerPlaying();
            });
            player.addEventListener("pause", function () {
                if (_this3.playingEntry) {
                    var playingNow = _this3.player.LIBRARY_ITEM;
                    if (playingNow == _this3.playingEntry.LIBRARY_ITEM) {
                        _this3.playingEntry.setPlaying(false);
                    }
                }
            });
        }
        /**
         * @description Changes player HTML in order to fit it in the library.
         *              override to add or remove changes done.
         * @private
         * @param {VoxsnapPlayer} player
         */

    }, {
        key: "changePlayerHTML",
        value: function changePlayerHTML(player) {
            player.showLibraryImage();
        }
        /**
         * @description Called via an event the player starts playing
         * @private
         */

    }, {
        key: "playerPlaying",
        value: function playerPlaying() {
            //voxole.info("[VOXSNAP] Library captured play event.");
            if (this.playingEntry) {
                var playingNow = this.player.LIBRARY_ITEM;
                if (playingNow != this.playingEntry.LIBRARY_ITEM) {
                    this.setPlayingState(this.playingEntry, false);
                    //voxole.info("[VOXSNAP] Entry for playing switched in background.");
                } else {
                    this.playingEntry = this.findEntry(this.player.LIBRARY_ITEM);
                    if (this.playingEntry) this.playingEntry.setPlaying(true);
                }
            } else {
                this.setPlayingState(null, false);
            }
        }
        /**
         *
         * @param {AudioItem} entryObject
         */

    }, {
        key: "playEntry",
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(entryObject) {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!this.player) {
                                    _context4.next = 18;
                                    break;
                                }

                                if (!(entryObject == this.playingEntry)) {
                                    _context4.next = 7;
                                    break;
                                }

                                this.player.pause();
                                entryObject.setPlaying(false);
                                this.playingEntry = null;
                                _context4.next = 18;
                                break;

                            case 7:
                                if (!this.playingEntry) {
                                    _context4.next = 14;
                                    break;
                                }

                                if (!(entryObject == this.playingEntry)) {
                                    _context4.next = 12;
                                    break;
                                }

                                return _context4.abrupt("return");

                            case 12:
                                this.playingEntry.setPlaying(false);
                                this.playingEntry = null;

                            case 14:

                                this.setPlayingState(entryObject, true);
                                _context4.next = 17;
                                return this.reloadPlayerNarration(entryObject);

                            case 17:
                                this.player.play();

                            case 18:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function playEntry(_x4) {
                return _ref4.apply(this, arguments);
            }

            return playEntry;
        }()
    }, {
        key: "reloadPlayerNarration",
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(entryObject) {
                var narrationArray;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return this.LIBRARY_PROMISE;

                            case 2:
                                narrationArray = this.getNarrationArrayKey();
                                _context5.next = 5;
                                return this.player.reloadJSON(this.LIBRARY, entryObject.LIBRARY_ITEM.narration_id, narrationArray);

                            case 5:
                                return _context5.abrupt("return", _context5.sent);

                            case 6:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function reloadPlayerNarration(_x5) {
                return _ref5.apply(this, arguments);
            }

            return reloadPlayerNarration;
        }()
    }, {
        key: "getNarrationArrayKey",
        value: function getNarrationArrayKey() {
            return "narrations";
        }
        /**
         * @private
         * @param {AudioItem} entryObject
         */

    }, {
        key: "setPlayingState",
        value: function setPlayingState(entryObject, state) {
            if (state) {
                this.playingEntry = entryObject;
                this.playingEntry.setPlaying(true);
                this.player.analyticInfo.addObject(this.analyticDetails);
            } else {
                this.playingEntry = null;
                if (entryObject) entryObject.setPlaying(false);
                this.player.analyticInfo.removeObject(this.analyticDetails);
            }
        }
        /**
         *
         * @param {AudioFilter} filter
         */

    }, {
        key: "applyFilter",
        value: function applyFilter(filter) {
            //voxole.log("Apply filter: ", filter);
            this.items.forEach(function (audioItem) {
                if (!audioItem.html) return;
                if (filter.satisfies(audioItem.LIBRARY_ITEM)) {
                    audioItem.html.style.display = "";
                } else {
                    audioItem.html.style.display = "none";
                }
            });
        }
        /**
         * @param {LIBRARY_ITEM} jsonData
         * @returns {AudioItem}
         */

    }, {
        key: "findEntry",
        value: function findEntry(jsonData) {
            var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (strict) {
                return this.items.find(function (item) {
                    return item.LIBRARY_ITEM == jsonData;
                });
            } else {
                return this.items.find(function (item) {
                    return item.LIBRARY_ITEM.username == jsonData.username && item.LIBRARY_ITEM.narration_id == jsonData.narration_id;
                });
            }
        }
        /**
         * @param {LIBRARY_ITEM} jsonData
         * @returns {number}
         */

    }, {
        key: "findEntryIndex",
        value: function findEntryIndex(jsonData) {
            var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (strict) {
                return this.items.findIndex(function (item) {
                    return item.LIBRARY_ITEM == jsonData;
                });
            } else {
                return this.items.findIndex(function (item) {
                    return item.LIBRARY_ITEM.username == jsonData.username && item.LIBRARY_ITEM.narration_id == jsonData.narration_id;
                });
            }
        }
    }]);
    return LibraryInterface;
}();

var Featured = function (_LibraryInterface) {
    (0, _inherits3.default)(Featured, _LibraryInterface);

    function Featured(url) {
        (0, _classCallCheck3.default)(this, Featured);

        var _this4 = (0, _possibleConstructorReturn3.default)(this, (Featured.__proto__ || (0, _getPrototypeOf2.default)(Featured)).call(this, url));

        _this4.analyticDetails.libraryType = "Featured";
        return _this4;
    }

    (0, _createClass3.default)(Featured, [{
        key: "getContainerSelector",
        value: function getContainerSelector() {
            return "div#featured-items";
        }
    }, {
        key: "getItemConstructor",
        value: function getItemConstructor() {
            return FeaturedItem;
        }
    }, {
        key: "processLibrary",
        value: function processLibrary(JSON_DATA) {
            this.narrations = JSON_DATA.featured;
        }
    }, {
        key: "getNarrationArrayKey",
        value: function getNarrationArrayKey() {
            return "featured";
        }
    }]);
    return Featured;
}(LibraryInterface);

var Library = function (_LibraryInterface2) {
    (0, _inherits3.default)(Library, _LibraryInterface2);

    function Library(url) {
        (0, _classCallCheck3.default)(this, Library);

        /** @type {FilterMenu} **/
        var _this5 = (0, _possibleConstructorReturn3.default)(this, (Library.__proto__ || (0, _getPrototypeOf2.default)(Library)).call(this, url));

        _this5.filterMenu = new _FilterMenu2.default(_this5);
        _this5.analyticDetails.libraryType = "Library";
        Object.defineProperty(_this5.analyticDetails, "genre", {
            enumerable: true,
            configurable: true,
            get: function get() {
                if (_this5.filterMenu.lastMenuItem) {
                    return _this5.filterMenu.lastMenuItem.title;
                } else return "All";
            }
        });
        return _this5;
    }

    (0, _createClass3.default)(Library, [{
        key: "getContainerSelector",
        value: function getContainerSelector() {
            return "div#library-items";
        }
    }, {
        key: "getItemConstructor",
        value: function getItemConstructor() {
            return LibraryItem;
        }
    }, {
        key: "processLibrary",
        value: function processLibrary(JSON_DATA) {
            /** @type {LIBRARY_ITEM[]} **/
            this.narrations = JSON_DATA.narrations;
        }

        /**
         * Binds player to this audio library
         * @param {VoxsnapPlayer} player
         */

    }, {
        key: "usePlayer",
        value: function usePlayer(player) {
            var _this6 = this;

            (0, _get3.default)(Library.prototype.__proto__ || (0, _getPrototypeOf2.default)(Library.prototype), "usePlayer", this).call(this, player);
            // try to find next audio to play on end
            player.addEventListener("ended", function () {
                /** @type {LIBRARY_ITEM} **/
                var oldPlaying = _this6.player.LIBRARY_ITEM;

                if ((typeof oldPlaying === "undefined" ? "undefined" : (0, _typeof3.default)(oldPlaying)) != "object" || oldPlaying == null) {
                    voxole.log("Player ended playing entry - but it's null!");
                    return;
                }

                voxole.log("Player ended playing entry", oldPlaying.title, " finding next entry in", oldPlaying.genre);
                // find this item's index
                var startIndex = _this6.findEntryIndex(oldPlaying, false);
                // Entry not found, give up
                if (startIndex == -1) {
                    voxole.log("Cannot find ", oldPlaying, " in libraries narations");
                    return;
                }

                var found = false;
                // find the next audio that has the same genre
                for (var i = startIndex + 1; i != startIndex; ++i) {
                    // wrap over, but give up if no more items are found
                    if (i >= _this6.narrations.length) i = 0;
                    var item = _this6.narrations[i];

                    var intersection = genreIntersection(item.genre, oldPlaying.genre);

                    if (intersection.length > 0) {
                        // must find the AudioItem for the LIBRARY_ITEM
                        // maybe I could loop over audio items? Not sure.
                        _this6.playEntry(_this6.findEntry(item));
                        voxole.log("Chosen", item, "for next audio.");
                        found = true;
                        break;
                    } else {
                        voxole.log("No genre match for ", item.title, item.genre);
                    }
                }
                if (!found) voxole.error("Cannot find next recording for audio ", oldPlaying.title);
            });
        }
    }]);
    return Library;
}(LibraryInterface);

var Introduction = function (_LibraryInterface3) {
    (0, _inherits3.default)(Introduction, _LibraryInterface3);

    function Introduction(url) {
        (0, _classCallCheck3.default)(this, Introduction);

        var _this7 = (0, _possibleConstructorReturn3.default)(this, (Introduction.__proto__ || (0, _getPrototypeOf2.default)(Introduction)).call(this, url));

        _this7.analyticDetails.libraryType = "Introduction";
        return _this7;
    }

    (0, _createClass3.default)(Introduction, [{
        key: "getContainerSelector",
        value: function getContainerSelector() {
            return document.createElement("div");
        }
    }, {
        key: "getItemConstructor",
        value: function getItemConstructor() {
            return IntroductionItem;
        }
    }, {
        key: "processLibrary",
        value: function processLibrary(JSON_DATA) {
            this.narrations = [JSON_DATA.narrations[Math.floor(Math.random() * JSON_DATA.narrations.length)]];
        }
    }, {
        key: "initHTML",
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                if (!this.html) {
                                    _context6.next = 2;
                                    break;
                                }

                                return _context6.abrupt("return", this.html);

                            case 2:
                                _context6.next = 4;
                                return this.html_promise;

                            case 4:
                                this.html = _context6.sent;

                                // remove any id, ids are only used to get the correct element
                                this.html.id = "";
                                this.html_item_container = this.html;
                                return _context6.abrupt("return", this.html);

                            case 8:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function initHTML() {
                return _ref6.apply(this, arguments);
            }

            return initHTML;
        }()
    }]);
    return Introduction;
}(LibraryInterface);

var LibraryAudioItem = function (_AudioItem) {
    (0, _inherits3.default)(LibraryAudioItem, _AudioItem);

    function LibraryAudioItem() {
        (0, _classCallCheck3.default)(this, LibraryAudioItem);
        return (0, _possibleConstructorReturn3.default)(this, (LibraryAudioItem.__proto__ || (0, _getPrototypeOf2.default)(LibraryAudioItem)).apply(this, arguments));
    }

    (0, _createClass3.default)(LibraryAudioItem, [{
        key: "setPlaying",

        /**
         * Configure whether the audio is playing or not
         * @param {Boolean} state
         */
        value: function setPlaying(state) {
            if (!this.playButton) {
                if (!this.html) {
                    voxole.warn("[VOXSNAP] Changing state of unitialized entry.");
                    return;
                }
                // for easy access
                this.playButton = this.html.querySelector(".card-pl");
                this.listeningButton = this.html.querySelector(".card-ps");
            }
            if (state) {
                this.playButton.classList.remove("card-ctl_show");
                this.playButton.classList.add("card-ctl_hide");

                this.listeningButton.classList.remove("card-ctl_hide");
                this.listeningButton.classList.add("card-ctl_show");
            } else {
                this.listeningButton.classList.remove("card-ctl_show");
                this.listeningButton.classList.add("card-ctl_hide");

                this.playButton.classList.remove("card-ctl_hide");
                this.playButton.classList.add("card-ctl_show");
            }
        }
    }, {
        key: "initHTML",
        value: function initHTML() {
            var _this9 = this;

            (0, _get3.default)(LibraryAudioItem.prototype.__proto__ || (0, _getPrototypeOf2.default)(LibraryAudioItem.prototype), "initHTML", this).call(this);
            this.html.querySelector(".card-cntr").addEventListener("click", function () {
                _this9.onplay(_this9);
            });
            try {
                this.html.querySelector(".card-shr").addEventListener("click", function () {
                    _this9.showShare(true);
                });
            } catch (e) {
                voxole.warn("[VOXSNAP LIBRARY] Cannot bind the click event for share icons.");
            }
        }
        /**
         * tell this item to display sharing dialog, if available
         * @param {any} state
         */

    }, {
        key: "showShare",
        value: function showShare(state) {
            if (typeof state != "boolean" || state) {
                this.html.querySelector(".card-shr").style.display = "none";
                this.html.querySelector(".card-media").classList.add("card-media_open");
            } else {
                // cannot hide yet
            }
        }
    }]);
    return LibraryAudioItem;
}(_AudioItem3.default);

var LibraryItem = function (_LibraryAudioItem) {
    (0, _inherits3.default)(LibraryItem, _LibraryAudioItem);

    function LibraryItem() {
        (0, _classCallCheck3.default)(this, LibraryItem);
        return (0, _possibleConstructorReturn3.default)(this, (LibraryItem.__proto__ || (0, _getPrototypeOf2.default)(LibraryItem)).apply(this, arguments));
    }

    (0, _createClass3.default)(LibraryItem, [{
        key: "getContainerSelector",
        value: function getContainerSelector() {
            return "div.library_item";
        }
    }]);
    return LibraryItem;
}(LibraryAudioItem);

var FeaturedItem = function (_LibraryAudioItem2) {
    (0, _inherits3.default)(FeaturedItem, _LibraryAudioItem2);

    function FeaturedItem() {
        (0, _classCallCheck3.default)(this, FeaturedItem);
        return (0, _possibleConstructorReturn3.default)(this, (FeaturedItem.__proto__ || (0, _getPrototypeOf2.default)(FeaturedItem)).apply(this, arguments));
    }

    (0, _createClass3.default)(FeaturedItem, [{
        key: "getContainerSelector",
        value: function getContainerSelector() {
            return "div.featured_item";
        }
    }]);
    return FeaturedItem;
}(LibraryAudioItem);

var IntroductionItem = function (_LibraryAudioItem3) {
    (0, _inherits3.default)(IntroductionItem, _LibraryAudioItem3);

    function IntroductionItem() {
        (0, _classCallCheck3.default)(this, IntroductionItem);
        return (0, _possibleConstructorReturn3.default)(this, (IntroductionItem.__proto__ || (0, _getPrototypeOf2.default)(IntroductionItem)).apply(this, arguments));
    }

    (0, _createClass3.default)(IntroductionItem, [{
        key: "getContainerSelector",
        value: function getContainerSelector() {
            return "div#introduction-item div";
        }
    }, {
        key: "renderLibrary",
        value: function renderLibrary() {
            if (typeof this.LIBRARY_ITEM.image == "string") {
                var styleValue = { style: { 'background-image': "url('" + this.LIBRARY_ITEM.image + "')" } };
                this.html.voxsnap_render(null, styleValue);
                // @TODO dirty hack
                try {
                    document.querySelector(".lbr-slc_bg").voxsnap_render(null, styleValue);
                } catch (e) {}
            }
            (0, _get3.default)(IntroductionItem.prototype.__proto__ || (0, _getPrototypeOf2.default)(IntroductionItem.prototype), "renderLibrary", this).call(this);
        }
    }]);
    return IntroductionItem;
}(LibraryAudioItem);
/**
 * Intersects two genres and returns the intersection
 * @param {string[]} genreArrayA
 * @param {string[]} genreArrayB
 * @returns {string[]}
 */


function genreIntersection(genreArrayA, genreArrayB) {
    if (!(genreArrayA instanceof Array) || !(genreArrayB instanceof Array)) {
        return [];
    }
    if (genreArrayA.length == 0 || genreArrayB.length == 0) {
        return [];
    }
    var result = [];
    for (var i = 0, l = genreArrayA.length; i < l; ++i) {
        var item = genreArrayA[i];
        if (genreArrayB.indexOf(item) != -1) {
            result.push(item);
        }
    }
    return result;
}

exports.LibraryInterface = LibraryInterface;
exports.Library = Library;
exports.Featured = Featured;
exports.Introduction = Introduction;
exports.IntroductionItem = IntroductionItem;
exports.AudioItem = _AudioItem3.default;
exports.LibraryItem = LibraryItem;
exports.FeaturedItem = FeaturedItem;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(98), __esModule: true };

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AudioItem = undefined;

var _regenerator = __webpack_require__(11);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(10);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__(20);

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = __webpack_require__(7);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(9);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(26);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _VoxConsole = __webpack_require__(0);

var _VoxConsole2 = _interopRequireDefault(_VoxConsole);

var _JSONMetadataItem2 = __webpack_require__(37);

var _JSONMetadataItem3 = _interopRequireDefault(_JSONMetadataItem2);

var _Promises = __webpack_require__(22);

var Promises = _interopRequireWildcard(_Promises);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voxole = _VoxConsole2.default.console;

/**
  An abstract class used to represent VISUAL and PLAYABLE object. The object must be linked to
  a player through onplay method, which should be overriden directly on an instance.
  @example var item = new AudioItem({ ... });
           item.onplay = function() {player.reloadJSON(this.LIBRARY_ITEM);}
  However note that AudioItem does not have the full audio context, that should be provided
  for global settings (google analytics) to work. 
**/
var AudioItem = function (_JSONMetadataItem) {
    (0, _inherits3.default)(AudioItem, _JSONMetadataItem);

    /**
     * 
     * @param {LIBRARY_ITEM} json
     */
    function AudioItem(json) {
        (0, _classCallCheck3.default)(this, AudioItem);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AudioItem.__proto__ || (0, _getPrototypeOf2.default)(AudioItem)).call(this));

        _this.LIBRARY_ITEM = json;

        var selector = _this.getContainerSelector();
        if (selector instanceof HTMLElement) {
            voxole.log("HTML element passed instead of selector...", selector);
            /** @type {HTMLElement} **/
            _this.html = selector;
            _this.initHTML();
            _this.html_promise = new _promise2.default(function (r) {
                r(_this.html);
            });
        } else if (selector instanceof _promise2.default) {
            voxole.log("Promise passed instead of selector...");
            _this.html_promise = selector;
        } else {
            _this.html_promise = Promises.VOXSNAP_HTML(VOXSNAP_BASE_RESOURCE_PATH, selector);
        }

        return _this;
    }
    /**
     * @returns {HTMLElement|Promise<HTMLElement>|string}
     */


    (0, _createClass3.default)(AudioItem, [{
        key: "getContainerSelector",
        value: function getContainerSelector() {
            throw new Error("Pure virtual method call!");
        }
        /**
         * Returns duration time of this audio rounded to nearest minute,
         * minumun is 1. Appends minto the end.
         * @returns {string}
         */

    }, {
        key: "timeAsMinutes",
        value: function timeAsMinutes() {
            var minutes = Math.max(1, Math.round(this.LIBRARY_ITEM.audio_length / 60));
            return minutes + " min";
        }
    }, {
        key: "getDOMObject",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (this.html) {
                                    _context.next = 5;
                                    break;
                                }

                                _context.next = 3;
                                return this.html_promise;

                            case 3:
                                this.html = _context.sent;

                                this.initHTML();

                            case 5:
                                // do this every time for sure
                                // it's a fast operation
                                this.renderLibrary();
                                return _context.abrupt("return", this.html);

                            case 7:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getDOMObject() {
                return _ref.apply(this, arguments);
            }

            return getDOMObject;
        }()
    }, {
        key: "initHTML",
        value: function initHTML() {
            this.html.itemClass = this;

            // add params for html
            this.html.setAttribute("data-username", this.LIBRARY_ITEM.username);
            this.html.setAttribute("data-narration", this.LIBRARY_ITEM.narration_id);

            // this is dirty but has worked for me for decades (actually about one decade to be precise)
            this.html.VOXSNAP_ITEM_ID = this;
        }
        /**
         * For specific HTML stuff, override this method, but remember to call super method
         * Renders properties from the library json onto given object
         * using the class names
         * @property this.html {HTMLElement} must be set
         */

    }, {
        key: "renderLibrary",
        value: function renderLibrary() {
            this.html.voxsnap_render(".card-time-mins", this.timeAsMinutes());
            (0, _get3.default)(AudioItem.prototype.__proto__ || (0, _getPrototypeOf2.default)(AudioItem.prototype), "renderLibrary", this).call(this);
        }
        /**
         * Configure whether the audio is playing or not
         * @param {Boolean} state
         */

    }, {
        key: "setPlaying",
        value: function setPlaying(state) {

            throw new Error("Pure virtual method call!");
        }
        /**
         * tell this item to display sharing dialog, if available
         * @param {any} state
         */

    }, {
        key: "showShare",
        value: function showShare(state) {}
        /**
         * Replace this method with your method that should be called when play button is clicked
         * @param item {AudioItem} item that was clicked
         * @TODO: implement EventEmitter, now that we have webpack it's a must have library'
         */

    }, {
        key: "onplay",
        value: function onplay(item) {}
    }]);
    return AudioItem;
}(_JSONMetadataItem3.default);

exports.default = AudioItem;
exports.AudioItem = AudioItem;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(11);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(10);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _VoxConsole = __webpack_require__(0);

var _VoxConsole2 = _interopRequireDefault(_VoxConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voxole = _VoxConsole2.default.console;

var Clipboard = function () {
    function Clipboard() {
        (0, _classCallCheck3.default)(this, Clipboard);
    }

    (0, _createClass3.default)(Clipboard, [{
        key: "writeText",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(text) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function writeText(_x) {
                return _ref.apply(this, arguments);
            }

            return writeText;
        }()
        /**
         * @param {string} text
         * @returns {Promise}
         */

    }, {
        key: "writeTextDirect",
        value: function writeTextDirect(text) {}

        /**
         * MUST BE CALLED DIRECTLY FROM CLICK EVENT!!!
         * @param {string} text
         * @returns {true|false} true on success
         */

    }, {
        key: "writeTextTextarea",
        value: function writeTextTextarea(text) {
            var area = document.createElement("textarea");
            area.style.position = "fixed";
            area.style.top = "0px";
            area.style.opacity = "0";
            area.style.pointerEvents = "none";
            area.value = text;
            document.body.appendChild(area);
            area.focus();
            area.select();
            voxole.log("Copy text: ", text, area.value);
            var success = false;
            try {
                success = document.execCommand("copy");
                if (!success) {
                    voxole.warn("[VOXSNAP] Copy failed for unknown reason (method returned false)");
                }
            } catch (e) {
                voxole.error("[VOXSNAP] ERROR WHEN COPYING: ", e);
            }
            document.body.removeChild(area);
            return success;
        }
    }]);
    return Clipboard;
}();

Clipboard.INSTANCE = new Clipboard();
exports.default = Clipboard;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DynamicStylesheet = function () {
    function DynamicStylesheet() {
        var lazy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        (0, _classCallCheck3.default)(this, DynamicStylesheet);

        this.lazy = true;
        this._debugName = "dynamic_sheet";
        if (!lazy) {
            this.init();
        }
    }

    (0, _createClass3.default)(DynamicStylesheet, [{
        key: "init",
        value: function init() {
            if (this.lazy) {
                console.log("Stylesheet init!");
                this.style = document.createElement("style");
                this.style.setAttribute("voxsnap-player", this._debugName);
                document.head.appendChild(this.style);
                this.lazy = false;
            }
        }
        /** @type {CSSStyleSheet} **/

    }, {
        key: "clear",
        value: function clear() {
            if (this.lazy) this.init();
            /** @type {CSSStyleSheet} **/
            var sheet = this.sheet;
            while (sheet.cssRules.length > 0) {
                sheet.deleteRule(0);
            }
        }
    }, {
        key: "sheet",
        get: function get() {
            if (this.lazy) this.init();
            return this.style.sheet;
        }
    }, {
        key: "styleElement",
        get: function get() {
            if (this.lazy) this.init();
            return this.style;
        }
        /** @type {string} **/

    }, {
        key: "debugName",
        get: function get() {
            return this._debugName;
        },
        set: function set(value) {
            this._debugName = value;
            if (this.style) this.style.setAttribute("voxsnap-player", value);
        }
    }]);
    return DynamicStylesheet;
}();

exports.default = DynamicStylesheet;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _VoxConsole = __webpack_require__(0);

var _VoxConsole2 = _interopRequireDefault(_VoxConsole);

var _Clipboard = __webpack_require__(57);

var _Clipboard2 = _interopRequireDefault(_Clipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voxole = _VoxConsole2.default.console;

/** @TODO: create classes for this! **/

function assignProSharingEvents(element) {
    /** @type {HTMLAnchorElement} **/
    var btnShare = element.querySelector(".btn_playlist_sharing,.btn_sharing");
    var shareVisible = false;
    var shareHideable = false;
    /**
     * If called, hides the sharing list again
     * @param {MouseEvent} e
     */
    function hideElListener(e) {
        if (shareHideable) {
            var list = element.querySelector(".playlist_share-list");
            list.style.maxHeight = "0px";
            shareHideable = shareVisible = false;
            document.removeEventListener("click", hideElListener);
        }
    }
    /**
     * 
     * @param {MouseEvent} e
     */
    function shareClicked(e) {
        e.preventDefault();
        if (!shareVisible) {
            shareVisible = true;

            /** @type {HTMLDivElement} **/
            var list = element.querySelector(".playlist_share-list");
            list.style.maxHeight = list.scrollHeight + 'px';

            document.addEventListener("click", hideElListener);
            // without this, the click event from here is caught again in the new listener
            setTimeout(function () {
                shareHideable = true;
            }, 0);
            return false;
        }
    }
    btnShare.addEventListener("click", shareClicked);
    var parent = btnShare.parentElement;

    /** @type {HTMLAnchorElement} **/
    var copyLink = parent.querySelector(".icon_link");
    copyLink.addEventListener("click", function (e) {
        _Clipboard2.default.INSTANCE.writeTextTextarea(this.href);
        e.preventDefault();
        e.cancelBubble = true;
        successBubble(copyLink);
        setTimeout(hideElListener, 1400);
        return false;
    });

    parent.addEventListener("click", function (e) {
        e.cancelBubble = true;
        if (shareVisible) hideElListener();
    });
}
/**
 * 
 * @param {HTMLElement} stickTo
 */
function successBubble(stickTo) {
    var bubble = document.createElement("div");
    //bubble.style.boxSizing = "border-box"
    bubble.style.position = "absolute";
    bubble.style.height = "1em";
    bubble.style.display = "inline-block";
    bubble.style.zIndex = "11";

    var clipPath = "polygon(0% 0%, 100% 0%, 100% ARROW_HEIGHT, 60% ARROW_HEIGHT, 50% 100%, 40% ARROW_HEIGHT, 0 ARROW_HEIGHT)";

    bubble.style.webkitClipPath = "polygon(0% 0%, 100% 0%, 100% 90%, 60% 90%, 50% 100%, 40% 90%, 0 90%)";
    bubble.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 90%, 60% 90%, 50% 100%, 40% 90%, 0 90%)";
    bubble.style.padding = "5px";
    bubble.style.paddingBottom = "15px";
    bubble.style.backgroundColor = "#ccc";

    var stickRect = stickTo.getBoundingClientRect();

    bubble.appendChild(document.createTextNode("Copied!"));

    document.body.appendChild(bubble);

    var bubRect = bubble.getBoundingClientRect();

    var scrollRect = document.body.parentNode.getBoundingClientRect();

    bubble.style.clipPath = bubble.style.webkitClipPath = clipPath.replace(/ARROW_HEIGHT/g, bubRect.height - 10 + "px");

    bubble.style.left = stickRect.left + stickRect.width / 2 - bubRect.width / 2 + "px";
    bubble.style.top = stickRect.top - bubRect.height - scrollRect.top + "px";

    setTimeout(function () {
        document.body.removeChild(bubble);
    }, 1300);
}
exports.default = { pro: assignProSharingEvents };

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventEmitter = exports.default = undefined;

var _defineProperty = __webpack_require__(38);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;(0, _defineProperty2.default)(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var DEFAULT_VALUES = {
    emitDelay: 10,
    strictMode: false
};

/**
 * @typedef {object} EventEmitterListenerFunc
 * @property {boolean} once
 * @property {function} fn
 */

/**
 * @class EventEmitter
 *
 * @private
 * @property {Object.<string, EventEmitterListenerFunc[]>} _listeners
 * @property {string[]} events
 */

var EventEmitter = function () {

    /**
     * @constructor
     * @param {{}}      [opts]
     * @param {number}  [opts.emitDelay = 10] - Number in ms. Specifies whether emit will be sync or async. By default - 10ms. If 0 - fires sync
     * @param {boolean} [opts.strictMode = false] - is true, Emitter throws error on emit error with no listeners
     */

    function EventEmitter() {
        var opts = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_VALUES : arguments[0];

        _classCallCheck(this, EventEmitter);

        var emitDelay = void 0,
            strictMode = void 0;

        if (opts.hasOwnProperty('emitDelay')) {
            emitDelay = opts.emitDelay;
        } else {
            emitDelay = DEFAULT_VALUES.emitDelay;
        }
        this._emitDelay = emitDelay;

        if (opts.hasOwnProperty('strictMode')) {
            strictMode = opts.strictMode;
        } else {
            strictMode = DEFAULT_VALUES.strictMode;
        }
        this._strictMode = strictMode;

        this._listeners = {};
        this.events = [];
    }

    /**
     * @protected
     * @param {string} type
     * @param {function} listener
     * @param {boolean} [once = false]
     */

    _createClass(EventEmitter, [{
        key: '_addListenner',
        value: function _addListenner(type, listener, once) {
            if (typeof listener !== 'function') {
                throw TypeError('listener must be a function');
            }

            if (this.events.indexOf(type) === -1) {
                this._listeners[type] = [{
                    once: once,
                    fn: listener
                }];
                this.events.push(type);
            } else {
                this._listeners[type].push({
                    once: once,
                    fn: listener
                });
            }
        }

        /**
         * Subscribes on event type specified function
         * @param {string} type
         * @param {function} listener
         */

    }, {
        key: 'on',
        value: function on(type, listener) {
            this._addListenner(type, listener, false);
        }

        /**
         * Subscribes on event type specified function to fire only once
         * @param {string} type
         * @param {function} listener
         */

    }, {
        key: 'once',
        value: function once(type, listener) {
            this._addListenner(type, listener, true);
        }

        /**
         * Removes event with specified type. If specified listenerFunc - deletes only one listener of specified type
         * @param {string} eventType
         * @param {function} [listenerFunc]
         */

    }, {
        key: 'off',
        value: function off(eventType, listenerFunc) {
            var _this = this;

            var typeIndex = this.events.indexOf(eventType);
            var hasType = eventType && typeIndex !== -1;

            if (hasType) {
                if (!listenerFunc) {
                    delete this._listeners[eventType];
                    this.events.splice(typeIndex, 1);
                } else {
                    (function () {
                        var removedEvents = [];
                        var typeListeners = _this._listeners[eventType];

                        typeListeners.forEach(
                        /**
                         * @param {EventEmitterListenerFunc} fn
                         * @param {number} idx
                         */
                        function (fn, idx) {
                            if (fn.fn === listenerFunc) {
                                removedEvents.unshift(idx);
                            }
                        });

                        removedEvents.forEach(function (idx) {
                            typeListeners.splice(idx, 1);
                        });

                        if (!typeListeners.length) {
                            _this.events.splice(typeIndex, 1);
                            delete _this._listeners[eventType];
                        }
                    })();
                }
            }
        }

        /**
         * Applies arguments to specified event type
         * @param {string} eventType
         * @param {*[]} eventArguments
         * @protected
         */

    }, {
        key: '_applyEvents',
        value: function _applyEvents(eventType, eventArguments) {
            var typeListeners = this._listeners[eventType];

            if (!typeListeners || !typeListeners.length) {
                if (this._strictMode) {
                    throw 'No listeners specified for event: ' + eventType;
                } else {
                    return;
                }
            }

            var removableListeners = [];
            typeListeners.forEach(function (eeListener, idx) {
                eeListener.fn.apply(null, eventArguments);
                if (eeListener.once) {
                    removableListeners.unshift(idx);
                }
            });

            removableListeners.forEach(function (idx) {
                typeListeners.splice(idx, 1);
            });
        }

        /**
         * Emits event with specified type and params.
         * @param {string} type
         * @param eventArgs
         */

    }, {
        key: 'emit',
        value: function emit(type) {
            var _this2 = this;

            for (var _len = arguments.length, eventArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                eventArgs[_key - 1] = arguments[_key];
            }

            if (this._emitDelay) {
                setTimeout(function () {
                    _this2._applyEvents.call(_this2, type, eventArgs);
                }, this._emitDelay);
            } else {
                this._applyEvents(type, eventArgs);
            }
        }

        /**
         * Emits event with specified type and params synchronously.
         * @param {string} type
         * @param eventArgs
         */

    }, {
        key: 'emitSync',
        value: function emitSync(type) {
            for (var _len2 = arguments.length, eventArgs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                eventArgs[_key2 - 1] = arguments[_key2];
            }

            this._applyEvents(type, eventArgs);
        }

        /**
         * Destroys EventEmitter
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this._listeners = {};
            this.events = [];
        }
    }]);

    return EventEmitter;
}();

exports.default = EventEmitter;
exports.EventEmitter = EventEmitter;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(100), __esModule: true };

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(105), __esModule: true };

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(23);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(4).document;
module.exports = document && document.documentElement;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(14) && !__webpack_require__(21)(function () {
  return Object.defineProperty(__webpack_require__(39)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(29);
var $export = __webpack_require__(6);
var redefine = __webpack_require__(73);
var hide = __webpack_require__(18);
var has = __webpack_require__(17);
var Iterators = __webpack_require__(25);
var $iterCreate = __webpack_require__(119);
var setToStringTag = __webpack_require__(32);
var getPrototypeOf = __webpack_require__(69);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(70);
var hiddenKeys = __webpack_require__(40).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 68 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(17);
var toObject = __webpack_require__(49);
var IE_PROTO = __webpack_require__(46)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(17);
var toIObject = __webpack_require__(19);
var arrayIndexOf = __webpack_require__(111)(false);
var IE_PROTO = __webpack_require__(46)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(13);
var isObject = __webpack_require__(15);
var newPromiseCapability = __webpack_require__(41);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(13);
var aFunction = __webpack_require__(27);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(24);
var invoke = __webpack_require__(114);
var html = __webpack_require__(64);
var cel = __webpack_require__(39);
var global = __webpack_require__(4);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(23)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(48);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 78 */
/***/ (function(module, exports) {



/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(130)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(66)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(134);
var global = __webpack_require__(4);
var hide = __webpack_require__(18);
var Iterators = __webpack_require__(25);
var TO_STRING_TAG = __webpack_require__(5)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Playlist = undefined;

var _regenerator = __webpack_require__(11);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(10);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(7);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(9);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(26);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _VoxConsole = __webpack_require__(0);

var _VoxConsole2 = _interopRequireDefault(_VoxConsole);

var _Library = __webpack_require__(53);

var _AudioItem2 = __webpack_require__(56);

var _SharingDialog = __webpack_require__(59);

var _SharingDialog2 = _interopRequireDefault(_SharingDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voxole = _VoxConsole2.default.console;

function makePlaylistURL(url, num) {
    if (typeof num != "undefined") {
        return "https://data.voxsnap.com/library/v1/" + url + "/playlist/" + num + "/library.json";
    } else {
        return url;
    }
}

var Playlist = function (_LibraryInterface) {
    (0, _inherits3.default)(Playlist, _LibraryInterface);

    /**
     * @param {string} libraryUrl url or customerID
     * @param {number} playlistNum number of playlist
     */
    function Playlist(libraryUrl, playlistNum, player_version) {
        (0, _classCallCheck3.default)(this, Playlist);

        /** @type {HTMLDivElement} **/
        var _this = (0, _possibleConstructorReturn3.default)(this, (Playlist.__proto__ || (0, _getPrototypeOf2.default)(Playlist)).call(this, makePlaylistURL(libraryUrl, playlistNum), player_version));

        _this.html;
        _this.currentIndex = 0;
        _this.loop = false;

        if (!(window.VOXSNAP_PLAYLISTS instanceof Array)) {
            window.VOXSNAP_PLAYLISTS = [];
        }

        window.VOXSNAP_PLAYLISTS.push(_this);
        if (typeof playlistNum != "undefined") {
            _this.playlistNumber = playlistNum * 1;
        } else {
            _this.playlistNumber = libraryUrl.match(/playlist\/([0-9]+)/i)[1] * 1;
        }

        _this.dynamicStyle.debugName = "Playlist";
        return _this;
    }
    /**
     *
     * @param {VoxsnapPlayer} player
     */


    (0, _createClass3.default)(Playlist, [{
        key: "usePlayer",
        value: function usePlayer(player) {
            var _this2 = this;

            (0, _get3.default)(Playlist.prototype.__proto__ || (0, _getPrototypeOf2.default)(Playlist.prototype), "usePlayer", this).call(this, player);
            this.LIBRARY_PROMISE.then(function () {
                if (_this2.currentItem) _this2.player.reloadJSON(_this2.LIBRARY, _this2.currentItem.LIBRARY_ITEM.narration_id, "narrations");
                _this2.player.analyticInfo.addValue("playlist", _this2.playlistNumber);
            });
            this.player.on("ended", function () {
                _this2.playerFinished();
            });
        }
        /**
         * @description Called via an event the player starts playing
         * @private
         */

    }, {
        key: "playerPlaying",
        value: function playerPlaying() {
            /// nothing to do
        }
    }, {
        key: "getContainerSelector",
        value: function getContainerSelector() {
            return "div.playlist";
        }
    }, {
        key: "getItemContainer",
        value: function getItemContainer() {
            return this.html.firstElementChild;
        }
        /** @type {string} Name of this playlist, returns number if name not available **/

    }, {
        key: "getItemConstructor",

        /**
         * Returns constructor for one item class representation
         */
        value: function getItemConstructor() {
            return PlaylistItem;
        }
        /**
         *
         * @param {LIBRARY_JSON} JSON_DATA the ROOT element of standard json library
         */

    }, {
        key: "processLibrary",
        value: function processLibrary(JSON_DATA) {
            this.narrations = JSON_DATA.narrations;
            var stylesheet = this.dynamicStyle.sheet;
            this.dynamicStyle.clear();
            /// Apply CSS color
            if (this.player_version == "basic" && typeof JSON_DATA.color == "string") {
                stylesheet.insertRule("div#voxsnap-player div.playlist_item.playlist_item--active span.playlist_item-ttl.player-title_name {color:" + this.LIBRARY.color + "}", stylesheet.cssRules.length);
                stylesheet.insertRule("div#voxsnap-player div.playlist_item.playlist_item--active span.playlist_item-drtn {color:" + this.LIBRARY.color + "}", stylesheet.cssRules.length);
            }

            if (this.player_version == "pro") {
                stylesheet.insertRule("div#voxsnap-player div.playlist_item.playlist_item--active h3.playlist_item-ttl.player-title_name {font-weight: bold;}", stylesheet.cssRules.length);
                stylesheet.insertRule("div#voxsnap-player div.playlist_item.playlist_item--active button.btn_playlist_sharing {font-weight: bold; color: #5b6ceb}", stylesheet.cssRules.length);
                stylesheet.insertRule("div#voxsnap-player div.playlist_item.playlist_item--active span.playlist_item-drtn {font-weight: bold;}", stylesheet.cssRules.length);
                stylesheet.insertRule("div#voxsnap-player div.playlist_item.playlist_item--active span.playlist_item__num {display: none;}", stylesheet.cssRules.length);
                stylesheet.insertRule("div#voxsnap-player div.playlist_item.playlist_item--active img.playlist_item__indicator {display: block;}", stylesheet.cssRules.length);
            }
        }
        /**
         * Calls super class' load narrations and then highlights the first narration
         */

    }, {
        key: "loadNarrations",
        value: function loadNarrations() {
            (0, _get3.default)(Playlist.prototype.__proto__ || (0, _getPrototypeOf2.default)(Playlist.prototype), "loadNarrations", this).call(this);
            if (this.items.length > 0) {
                this.currentItem = this.items[0];
            }
        }
    }, {
        key: "getItem",
        value: function getItem(index) {
            if (index >= this.items.length || index < 0) {
                return null;
            } else {
                return this.items[index];
            }
        }
        /**
          @type {AudioItem}
          @returns {AudioItem}
        **/

    }, {
        key: "next",

        /**
         * Moves to the next recording.
         */
        value: function next() {
            this.currentIndex = this.nextIndex;
            this.playEntry(this.currentItem);
        }
    }, {
        key: "prev",
        value: function prev() {
            this.currentIndex = this.nextIndex;
            this.playEntry(this.currentItem);
        }
    }, {
        key: "peekNext",
        value: function peekNext() {
            var oldIndex = this.currentIndex;
            var item = this.nextItem;
            this.currentIndex = oldIndex;
            return item;
        }
        /**
         *
         * @param {AudioItem} entryObject
         */

    }, {
        key: "playEntry",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(entryObject) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(this.playingEntry == entryObject)) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 2:
                                if (this.playingEntry) {
                                    this.playingEntry.setPlaying(false);
                                    this.playingEntry.setActive(false);
                                }

                                if (entryObject && this.currentIndex != entryObject) this.currentItem = entryObject;

                                if (!this.player) {
                                    _context.next = 14;
                                    break;
                                }

                                if (!(entryObject == null)) {
                                    _context.next = 8;
                                    break;
                                }

                                this.player.pause();
                                return _context.abrupt("return");

                            case 8:
                                this.playingEntry = entryObject;
                                entryObject.setPlaying(true);
                                entryObject.setActive(true);
                                _context.next = 13;
                                return this.player.reloadJSON(this.LIBRARY, entryObject.LIBRARY_ITEM.narration_id);

                            case 13:
                                this.player.play();

                            case 14:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function playEntry(_x) {
                return _ref.apply(this, arguments);
            }

            return playEntry;
        }()
        /**
         * This is internally called when player reaches audio end. It's used to play
         * the next audio.
         * @private
         */

    }, {
        key: "playerFinished",
        value: function playerFinished() {
            var next = this.nextItem;
            if (this.playingEntry) {
                this.playingEntry.setPlaying(false);
                this.playingEntry = null;
            }

            if (next) {
                this.playEntry(next);
            }
        }
    }, {
        key: "changePlayerHTML",
        value: function changePlayerHTML(player) {}
    }, {
        key: "playlistName",
        get: function get() {
            if (this.LIBRARY && typeof this.LIBRARY.playlist_name == "string") {
                return this.LIBRARY.playlist_name;
            } else return this.playlistNumber + "";
        }
    }, {
        key: "currentItem",
        get: function get() {
            return this.getItem(this.currentIndex);
        }
        /**
         * @param {PlaylistItem} value
         * @returns {number}
        */
        ,
        set: function set(value) {
            var narration_id = value.LIBRARY_ITEM.narration_id;
            var index = this.items.findIndex(function (x) {
                return x.LIBRARY_ITEM.narration_id == narration_id;
            });
            if (index != -1) {
                this.items[this.currentIndex].setActive(false);
                value.setActive(true);
                //this.currentItem = this.items[this.currentIndex];
                return this.currentIndex = index;
            } else {
                throw new Error("No such narration in this playlist!");
            }
        }
    }, {
        key: "nextItem",
        get: function get() {
            return this.getItem(this.nextIndex);
        }
    }, {
        key: "previousItem",
        get: function get() {
            return this.getItem(this.previousIndex);
        }
    }, {
        key: "previousIndex",
        get: function get() {
            var index = this.currentIndex - 1;
            if (this.loop && index < 0) {
                index = this.items.length - 1;
            }
            return index;
        }
    }, {
        key: "nextIndex",
        get: function get() {
            var index = this.currentIndex + 1;
            if (this.loop && index >= this.items.length) {
                index = 0;
            }
            return index;
        }
    }, {
        key: "hasNext",
        get: function get() {
            return this.currentIndex + 1 < this.items.length;
        }
    }]);
    return Playlist;
}(_Library.LibraryInterface);

var PlaylistItem = function (_AudioItem) {
    (0, _inherits3.default)(PlaylistItem, _AudioItem);

    function PlaylistItem() {
        (0, _classCallCheck3.default)(this, PlaylistItem);
        return (0, _possibleConstructorReturn3.default)(this, (PlaylistItem.__proto__ || (0, _getPrototypeOf2.default)(PlaylistItem)).apply(this, arguments));
    }

    (0, _createClass3.default)(PlaylistItem, [{
        key: "getContainerSelector",
        value: function getContainerSelector() {
            if (this.LIBRARY_ITEM.player_version == "pro") {
                return "div#player-pro div.playlist_item";
            } else {
                return "div.playlist_item";
            }
        }
    }, {
        key: "initHTML",
        value: function initHTML() {
            var _this4 = this;

            (0, _get3.default)(PlaylistItem.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlaylistItem.prototype), "initHTML", this).call(this);
            this.html.addEventListener("click", function (e) {
                if (!e.defaultPrevented) _this4.onplay(_this4);
            });

            try {
                _SharingDialog2.default.pro(this.html);
            } catch (e) {}
        }
    }, {
        key: "renderLibrary",
        value: function renderLibrary() {
            //this.html.voxsnap_render(".playlist_item-drtn", )
            this.html.voxsnap_render(".playlist_item-drtn", formatTime(this.LIBRARY_ITEM.audio_length));
            this.html.voxsnap_render(".playlist_item__num", this.index + "");
            /// load remembered active state
            /// this is used to allow selection of first item even before HTML is initialized
            if (typeof this.activeRemember == "boolean") {
                this.setActive(this.activeRemember);
                delete this.activeRemember;
            }
            (0, _get3.default)(PlaylistItem.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlaylistItem.prototype), "renderLibrary", this).call(this);
        }
        /**
         * Determine whether this item is actuve, that means selected within the playlist
         * @param {boolean} state
         */

    }, {
        key: "setActive",
        value: function setActive(state) {
            if (this.html) {
                /** @type {HTMLElement} this.html**/
                this.html.classList.toggle("playlist_item--active", state);
            } else {
                this.activeRemember = state;
            }
        }
    }, {
        key: "setPlaying",
        value: function setPlaying(state) {
            // no action yet
        }
    }]);
    return PlaylistItem;
}(_AudioItem2.AudioItem);

exports.Playlist = Playlist;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VoxsnapPlayer = exports.default = undefined;

var _isNan = __webpack_require__(54);

var _isNan2 = _interopRequireDefault(_isNan);

var _stringify = __webpack_require__(36);

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = __webpack_require__(11);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(10);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__(20);

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = __webpack_require__(12);

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = __webpack_require__(7);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(9);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(26);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _VoxConsole = __webpack_require__(0);

var _VoxConsole2 = _interopRequireDefault(_VoxConsole);

var _Polyfill = __webpack_require__(34);

var Polyfill = _interopRequireWildcard(_Polyfill);

var _JSONMetadataItem2 = __webpack_require__(37);

var _JSONMetadataItem3 = _interopRequireDefault(_JSONMetadataItem2);

var _VoxsnapEvents = __webpack_require__(89);

var VoxsnapEvents = _interopRequireWildcard(_VoxsnapEvents);

var _Promises = __webpack_require__(22);

var Promises = _interopRequireWildcard(_Promises);

var _VoxsnapDOMMethods = __webpack_require__(88);

var VoxsnapDOMMethods = _interopRequireWildcard(_VoxsnapDOMMethods);

var _JSONTypedefs = __webpack_require__(85);

var NOT_USED = _interopRequireWildcard(_JSONTypedefs);

var _ResourcePath = __webpack_require__(35);

var _WaveformRenderer = __webpack_require__(90);

var _WaveformRenderer2 = _interopRequireDefault(_WaveformRenderer);

var _SeekBar = __webpack_require__(87);

var _EventThrottler = __webpack_require__(83);

var _EventThrottler2 = _interopRequireDefault(_EventThrottler);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voxole = _VoxConsole2.default.console;

/**

**/

/**
 * @module VoxsnapPlayer
**/
///define(["./JSONMetadataItem", "./Polyfill", "./VoxsnapEvents", "./Promises", "./VoxsnapDOMMethods"], function (JSONMetadataItem, Polyfill, VoxsnapEvents, Promises, VoxsnapDOMMethods) {
// Require path - empty for webpack, path to directory for XHR
var REQUIRE_PATH =  true ? "./" : "./voxsnap/";
// do not use return value of this promise
// you'd get same DOM object for every player
Promises.VOXSNAP_HTML(_ResourcePath.path);
if (typeof VOXSNAP_DATA != "string") var VOXSNAP_DATA = "https://data.voxsnap.com";
var audio_events = ["play", "pause", "timeupdate"];

var VoxsnapPlayer = function (_JSONMetadataItem) {
    (0, _inherits3.default)(VoxsnapPlayer, _JSONMetadataItem);

    /**
     * @param username {String} id of user/client that owns the narration
     * @param narration {String|Number} id of the narration itself
     * @param username {Object} root of the standard JSON library object
     * @param narration=0 {Number} index of the narration
     * @param {string|undefined} player_version version of HTML for player, basic is implicit
     * @property {Promise} html_promise resolves when HTML is loaded and parsed
     */
    function VoxsnapPlayer(username, narration, player_version) {
        (0, _classCallCheck3.default)(this, VoxsnapPlayer);

        /** @type {LIBRARY_JSON} **/
        var _this2 = (0, _possibleConstructorReturn3.default)(this, (VoxsnapPlayer.__proto__ || (0, _getPrototypeOf2.default)(VoxsnapPlayer)).call(this));

        _this2.LIBRARY = null;
        _this2.html = null;
        _this2.wavedraw = null;

        _this2.analyticInfo = new VoxsnapEvents.AdditionalEventInfoGroup();

        _this2.version = typeof player_version == "string" ? player_version : "basic";

        _this2.html_promise = Promises.VOXSNAP_PLAYER_HTML(_ResourcePath.path, _this2.version);
        _this2.html_init_promise = Promises.External();
        // time when player was first loaded
        _this2.loadTime = new Date().getTime();
        // this variable is used to prevent loading multiple JSON info
        // better solution should be implemented
        _this2.loadingJSON = false;
        _this2.playPercent = 0;

        if ((typeof username === "undefined" ? "undefined" : (0, _typeof3.default)(username)) == "object" && (0, _typeof3.default)(username.narrations) == "object") {
            /** @type {LIBRARY_JSON} **/
            var JSON_INFO = username;
            /** @type {LIBRARY_JSON} **/
            _this2.LIBRARY = JSON_INFO;
            /** @type {LIBRARY_ITEM} **/
            _this2.LIBRARY_ITEM = JSON_INFO.narrations[narration || 0];
            _this2.USERNAME = _this2.LIBRARY_ITEM.username;
            _this2.NARRATION = _this2.LIBRARY_ITEM.narration_id;
            /** @type {Promise<LIBRARY_JSON>} **/
            _this2.LIBRARY_PROMISE = new _promise2.default(function (resolve) {
                resolve(JSON_INFO);
            });
        } else if (typeof username == "string" && (typeof narration == "string" || typeof narration == "number")) {
            _this2.USERNAME = username;
            _this2.NARRATION = narration;
            _this2.loadingJSON = true;
            /** @type {Promise<LIBRARY_JSON>} **/
            _this2.LIBRARY_PROMISE = Promises.VoxsnapPlayerJson(username, narration, VOXSNAP_DATA).then(function (result) {
                _this2.loadingJSON = false;
                _this2.LIBRARY_ITEM = result.narrations[0];
                return _this2.LIBRARY = result;
            }).catch(function (error) {
                voxole.warn("[VOXSNAP] Cannot download library json!");
                _this2.loadingJSON = false;
                if (_this2.html) {
                    _this2.html.parentNode.innerHTML = "";
                }
            });
        } else {
            // the player is not initialized, therefore HTML will be hidden until it is
        }
        _this2.createAudio();

        _this2.startGoogleAnalytics();
        _this2.startNormalAnalytics();

        _this2.animateLoading = false;
        _this2.on("loading",
        /** @param {VoxsnapEvents.VoxsnapEventLoading} event **/
        function (event) {
            //voxole.log("Loading event!!!", event, this.html);
            if (_this2.html) {
                var play_button = _this2.html.querySelector('.play-pause');
                if (event.isLoading) {
                    play_button.classList.add("cnt_btn--load");
                } else {
                    play_button.classList.remove("cnt_btn--load");
                }
            }
        });
        //this.timeUpdateEventThrottler = new EventThrottler((e) => {
        //    this.emitEvent(new VoxsnapEvents.VoxsnapEventTimeUpdateThrottled(this));
        //})
        //this.on("time_update", (e) => {
        //voxole.log(e);
        //    this.timeUpdateEventThrottler.eventOccured(e);
        //});
        /// Create some basic events:
        //this.on("request-play", this.play.bind(this));
        //this.on("request-pause", this.pause.bind(this));

        _this2.dynamicStyle.debugName = "VoxsnapPlayer";
        return _this2;
    }

    (0, _createClass3.default)(VoxsnapPlayer, [{
        key: "createAudio",
        value: function createAudio() {
            var _this3 = this;

            if (this.audio) return this.audio;
            var VOXSNAP_AUDIO = this.audio = new Audio();
            this.audio.preload = "none";
            var lastTime = 0;
            this.audio.addEventListener("timeupdate", function (e) {
                _this3.playPercent = _this3.audio.currentTime / _this3.duration * 100;
                _this3.updateSeekBar();
                lastTime = _this3.audio.currentTime;
                //this.emitEvent("time-update", { audioTime: this.audio.currentTime, currentTimePercent: this.playPercent });
                _this3.emitEvent(new _VoxsnapEvents.VoxsnapEventTimeUpdate(_this3));
            });
            this.audio.addEventListener("loadedmetadata", function (e) {
                _this3.metadataLoaded();
                _this3.updateSeekBar();
            });
            //this.audio.addEventListener("seeking", (e) => {

            //});

            this.linkAudioEvent("play");
            this.linkAudioEvent("seeking", "seek");
            this.linkAudioEvent("ended");
            this.linkAudioEvent("pause");

            this.audio.addEventListener("pause", function () {
                if (_this3.html) {
                    _this3.html.voxsnap_render(".play-pause", null, "paused", "playing");
                }
            });
            this.audio.addEventListener("play", function () {
                if (_this3.html) {
                    _this3.html.voxsnap_render(".play-pause", null, "playing", "paused");
                }
            });
            /// Keep these events here, we might use them later to
            /// refine progress reporting
            //this.audio.addEventListener("loadstart",
            //    /** @param {ProgressEvent} event **/
            //    (event) => {
            //        voxole.log("[VOXSNAP LOADING] Load start ["+event.type+"]: ", event.loaded, "/", event.total);
            //        this.emitEvent(new VoxsnapEvents.VoxsnapEventLoading(this, true));
            //    }
            //);
            //this.audio.addEventListener("suspend",
            //    /** @param {Event} event **/
            //    (event) => {
            //        voxole.log("[VOXSNAP LOADING] Stop loading. ");
            //        this.emitEvent(new VoxsnapEvents.VoxsnapEventLoading(this, false));
            //    }
            //);
            //this.audio.addEventListener("stalled",
            //    /** @param {Event} event **/
            //    (event) => {
            //        voxole.log("[VOXSNAP LOADING] Stalled loading! Cannot get the data from server, what now?");
            //        this.emitEvent(new VoxsnapEvents.VoxsnapEventLoading(this, false));
            //    }
            //);
            this.audio.addEventListener("playing",
            /** @param {Event} event **/
            function (event) {
                //voxole.log("[VOXSNAP LOADING] Can play now, so let's assume we're not streaming any more",event);
                _this3.emitEvent(new VoxsnapEvents.VoxsnapEventLoading(_this3, false));
            });
            this.audio.addEventListener("waiting",
            /** @param {Event} event **/
            function (event) {
                //voxole.log("[VOXSNAP LOADING] Waiting, so let's assume that's because we're loading stuff.", event);
                _this3.emitEvent(new VoxsnapEvents.VoxsnapEventLoading(_this3, true));
            });

            if (this.LIBRARY_PROMISE) this.loadAudioFile();
            return this.audio;
        }
        /**
         * Links event given by this name from audio to event emitter
         * @param {string} name
         */

    }, {
        key: "linkAudioEvent",
        value: function linkAudioEvent(name, alias) {
            var _this4 = this;

            if (typeof alias != "string") alias = name;
            this.audio.addEventListener(name, function () {
                var evt = { audioTime: _this4.audio.currentTime };
                _this4.emitEvent(alias, evt);
            });
        }
        /**
           @type {number}
        **/

    }, {
        key: "loadAudioFile",

        /**
         * Loads the first narration from the json library into the HTML5 audio node
         */
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var LIBRARY_JSON;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.LIBRARY_PROMISE;

                            case 2:
                                LIBRARY_JSON = _context.sent;

                                this.audio.src = this.LIBRARY_ITEM.audio_url;

                            case 4:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function loadAudioFile() {
                return _ref.apply(this, arguments);
            }

            return loadAudioFile;
        }()
        /**
         *
         * @param {String} name
         * @param {Function} callback
         * @param {boolean} once whether the callback should be removed after first dispatch
         */

    }, {
        key: "addEventListener",
        value: function addEventListener(name, callback, once) {
            // for some reason, this didn't work, even though it should: https://jsfiddle.net/Darker/wgzd91ng/3/
            // leave for future investigation
            //(once===true ? this.once : this.on)(name, callback);

            // ackwards compatibility against old voxsnap prefix
            while (name.indexOf("voxsnap-") == 0) {
                name = name.substr(8);
            }
            if (once) this.once(name, callback);else this.on(name, callback);
        }
    }, {
        key: "removeEventListener",
        value: function removeEventListener(name, callback) {
            this.off.removeEventListener(name, callback);
        }
        /**
         * Creates the HTML. Does not append it, use @appendTo to do that
         */

    }, {
        key: "createHTML",
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                var _this5 = this;

                var VOXSNAP_PLAYER, _this, progressBar, dragProgressBar, _seekEnd, SEEK_START_TIME, tmp, drag;

                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!this.html) {
                                    _context4.next = 2;
                                    break;
                                }

                                return _context4.abrupt("return", this.html);

                            case 2:
                                _context4.next = 4;
                                return this.html_promise;

                            case 4:
                                VOXSNAP_PLAYER = _context4.sent;

                                //hope to get rid of this in the future
                                _this = this;
                                // dark side of async behavior is that we need to check if someone changed
                                // the HTML variable, eg. in case of multiple calls

                                if (!this.html) {
                                    _context4.next = 8;
                                    break;
                                }

                                return _context4.abrupt("return", this.html);

                            case 8:
                                this.html = VOXSNAP_PLAYER;

                                try {
                                    VOXSNAP_PLAYER.querySelector(".btn_rewind").addEventListener("click", function () {
                                        _this5.currentTime -= 15;
                                        _this5.emitEvent("skip-backwards");
                                    });
                                } catch (e) {
                                    voxole.error("Cannot add callback on back button.", e);
                                }
                                try {
                                    VOXSNAP_PLAYER.querySelector(".btn_fastforward").addEventListener("click", function () {
                                        _this5.currentTime += 15;
                                        _this5.emitEvent("skip-forward");
                                    });
                                } catch (e) {
                                    voxole.error("Cannot add callback on forward button.", e);
                                }
                                /** Player seeking function **/
                                try {
                                    progressBar = VOXSNAP_PLAYER.querySelector(".player_timeline");

                                    if (progressBar != null) {
                                        dragProgressBar = function dragProgressBar(event) {
                                            var rect = this.getBoundingClientRect();
                                            //Recalculate mouse offsets to relative offsets
                                            var x = event.clientX - rect.left;
                                            //const y = event.clientY - rect.top;
                                            // convert to fraction <=1
                                            var fraction = x / (rect.right - rect.left);
                                            // calculate required time offset
                                            var time = _this.duration * fraction;
                                            // set requested time
                                            if (SEEK_START_TIME == -1) SEEK_START_TIME = _this.audio.currentTime;
                                            _this.currentTime = time;
                                            _this.updateSeekBar();
                                        };

                                        // only executes if seek start time is set to nonzero
                                        _seekEnd = function _seekEnd() {
                                            if (SEEK_START_TIME >= 0) {
                                                _this.emitEvent("seek", { from: SEEK_START_TIME });
                                                SEEK_START_TIME = -1;
                                            }
                                        };

                                        SEEK_START_TIME = -1;

                                        progressBar.addEventListener("mousedown", function (event) {
                                            this.removeEventListener("mousemove", dragProgressBar);
                                            this.addEventListener("mousemove", dragProgressBar);
                                            dragProgressBar.call(this, event);
                                        });
                                        progressBar.addEventListener("mouseup", function () {
                                            this.removeEventListener("mousemove", dragProgressBar);
                                            _seekEnd();
                                        });
                                        progressBar.addEventListener("mouseleave", function (event) {
                                            // keeping this for future refference
                                            /*var to = event.toElement || event.relatedTarget || event.target;
                                            while (to.parentNode != null) {
                                                if (to == this)
                                                    return;
                                                to = to.parentNode;
                                            }*/
                                            _seekEnd();
                                            this.removeEventListener("mousemove", dragProgressBar);
                                        });
                                    }
                                } catch (e) {
                                    voxole.error("Cannot add callback on seek bar!", e);
                                }

                                if (tmp = VOXSNAP_PLAYER.querySelector(".player_waves canvas.player-canvas")) {
                                    // add callback for mouse drag
                                    drag = new _SeekBar.SeekBarWaveform(tmp);

                                    drag.on("seek", function (fraction) {
                                        var time = _this5.duration * fraction;
                                        _this5.currentTime = time;
                                    });
                                    this.on("time_update", function () {
                                        drag.seek(_this5.playPercent / 100);
                                    });

                                    (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                                        var BAR_WIDTH, SPACE_WIDTH, settings_color, settings_gray, canvas, data;
                                        return _regenerator2.default.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _this5.wavedraw = new _WaveformRenderer2.default();

                                                        BAR_WIDTH = 2;
                                                        SPACE_WIDTH = 3;
                                                        settings_color = {
                                                            bar_size: BAR_WIDTH, space_size: SPACE_WIDTH, /*color:"rgba(255,255,255,0.31)"*/color: "#eb922b", color2: "#fd45ad", animate: true
                                                        };
                                                        settings_gray = {
                                                            bar_size: BAR_WIDTH, space_size: SPACE_WIDTH, color: "rgba(255,255,255,0.31)", animate: true
                                                        };
                                                        canvas = VOXSNAP_PLAYER.querySelector(".player_waves canvas.player-canvas");

                                                        _this5.wavedraw.bindToCanvas(canvas, settings_color);
                                                        _this5.wavedraw.bindToCanvas(VOXSNAP_PLAYER.querySelector(".player_waves canvas.player-canvas-white"), settings_gray);
                                                        //voxole.log(canvas);

                                                        if (!_this5.LIBRARY_PROMISE) {
                                                            _context2.next = 17;
                                                            break;
                                                        }

                                                        _context2.next = 11;
                                                        return _this5.LIBRARY_PROMISE;

                                                    case 11:
                                                        _context2.next = 13;
                                                        return _this5.loadWaveformData();

                                                    case 13:
                                                        data = _context2.sent;

                                                        //voxole.log(data, wavedraw);
                                                        _this5.wavedraw.data = data;
                                                        _context2.next = 18;
                                                        break;

                                                    case 17:
                                                        voxole.warn("No main audio for waveform!");

                                                    case 18:
                                                    case "end":
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this5);
                                    }))();
                                }

                                try {
                                    VOXSNAP_PLAYER.querySelector(".play-pause").addEventListener("click", function () {
                                        if (_this.audio.paused) {
                                            _this.audio.play();
                                            this.voxsnap_render(null, null, "playing", "paused");
                                        } else {
                                            _this.audio.pause();
                                            this.voxsnap_render(null, null, "paused", "playing");
                                        }
                                    });
                                } catch (e) {}

                                VoxsnapDOMMethods.setupShareButtons(this, _ResourcePath.path, this.version);
                                if (this.LIBRARY_PROMISE instanceof _promise2.default) {
                                    (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
                                        return _regenerator2.default.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        _context3.next = 2;
                                                        return _this5.LIBRARY_PROMISE;

                                                    case 2:

                                                        _this5.renderLibrary();

                                                    case 3:
                                                    case "end":
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, _this5);
                                    }))();
                                }
                                this.html_init_promise.resolveWith(this.html);

                                if (this.LIBRARY_PROMISE == null) {
                                    this.setParentNodeVisibility(false);
                                }

                            case 18:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function createHTML() {
                return _ref2.apply(this, arguments);
            }

            return createHTML;
        }()

        /**
         * Metadata loaded event listener.
         */

    }, {
        key: "metadataLoaded",
        value: function metadataLoaded() {
            if (this.playPercent != 0 || this.audio.forcedLoading) {
                this.audio.pause();
                //voxole.log(this.duration, this.playPercent);
                this.currentTime = this.duration * (this.playPercent / 100);

                delete this.audio.forcedLoading;
            }
        }
        /**
         * Updats seek bar location
         */

    }, {
        key: "updateSeekBar",
        value: function updateSeekBar() {
            try {
                if (this.html) {
                    /** PLAY PERCENT DISPLAYER **/
                    var playPercent = this.playPercent;
                    var percentDiv = this.html.querySelector(".player_timeline-value");
                    if (percentDiv) {
                        percentDiv.style.width = playPercent + "%";
                        // andjust seek button
                        var box = percentDiv.getBoundingClientRect();
                        this.html.querySelector(".timeline_indicator").style.left = box.right - box.left - 9 + "px";
                    }

                    // display duration
                    this.html.voxsnap_render(".info_time-duration", formatTime(this.duration));
                    this.html.voxsnap_render(".info_time-current", formatTime(this.audio.currentTime || this.duration * (playPercent / 100)));
                }
            } catch (e) {
                voxole.error("Failure during time update rendering: ", e.message, e.stack);
            }
        }
        // @TODO GUI should update per audio events, not like that

    }, {
        key: "play",
        value: function play() {
            if (this.audio.paused) {
                this.audio.play();
            }
        }
    }, {
        key: "pause",
        value: function pause() {
            if (!this.audio.paused) {
                this.audio.pause();
            }
        }
    }, {
        key: "renderLibrary",
        value: function renderLibrary() {
            this.html.voxsnap_render(".info_time-duration", formatTime(this.duration));
            //if (typeof this.LIBRARY_ITEM.image == "string") {
            //    this.html.querySelector(".player_pht").style.display = "";
            //}
            if (typeof this.LIBRARY.color == "string" && this.LIBRARY.color.length > 0 && this.version == "basic") {

                var stylesheet = this.voxsnapStylesheet;
                this.dynamicStyle.clear();
                stylesheet.insertRule("div#voxsnap-player .player_controls button.play-pause.cnt_btn {background-image: none; background-color:" + this.LIBRARY.color + "}", stylesheet.cssRules.length);

                stylesheet.insertRule("div#voxsnap-player .player_timeline-value {background-color:" + this.LIBRARY.color + "}", stylesheet.cssRules.length);
                stylesheet.insertRule("div#voxsnap-player .btn_sharing { color:" + this.LIBRARY.color + "}", stylesheet.cssRules.length);
                stylesheet.insertRule("#voxsnap-player .cnt_btn--load::before { border-top-color:" + this.LIBRARY.color + " !important;border-bottom-color:" + this.LIBRARY.color + " !important}", stylesheet.cssRules.length);
            }

            if (this.LIBRARY.player_size == "compact") this.html.classList.add("player_sm");
            // @TODO: this should be driven by CSS class, not by script element hiding!!!
            if (this.LIBRARY.enterprise == true) {
                try {
                    this.html.querySelector("a.player_link").style.display = "none";
                } catch (e) {};
                try {
                    this.html.querySelector("a.player_link-logo").style.display = "none";
                } catch (e) {};
                if (this.version == "basic") try {
                    this.html.querySelector("div#voxsnap-player .btn_sharing").style.right = "15px";
                } catch (e) {};
            } else {
                try {
                    this.html.querySelector("a.player_link").style.display = "";
                } catch (e) {};
                try {
                    this.html.querySelector("a.player_link-logo").style.display = "";
                } catch (e) {};
                if (this.version == "basic") try {
                    this.html.querySelector("div#voxsnap-player .btn_sharing").style.right = "80px";
                } catch (e) {};
            }
            this.html.classList.toggle("enterprise", this.LIBRARY.enterprise == true);

            return (0, _get3.default)(VoxsnapPlayer.prototype.__proto__ || (0, _getPrototypeOf2.default)(VoxsnapPlayer.prototype), "renderLibrary", this).call(this);
        }
    }, {
        key: "destroyPlayer",
        value: function destroyPlayer() {
            voxole.warn("[VOXSNAP] Request was sent to destroy the player.", new Error().stack);
            if (this.html && this.html.parentNode) {
                this.html.parentNode.innerHTML = "";
            }
        }
    }, {
        key: "showLibraryImage",
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return this.createHTML();

                            case 2:
                                this.html.querySelector(".player_pht").style.display = "";

                            case 3:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function showLibraryImage() {
                return _ref5.apply(this, arguments);
            }

            return showLibraryImage;
        }()
        /**
        * Appends the HTML to given element.
        * @param {HTMLElement} parent parent node for player
        */

    }, {
        key: "appendTo",
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(parentNode) {
                var elements, child;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return this.html_init_promise;

                            case 2:
                                if (!(parentNode == null || !(parentNode instanceof HTMLElement))) {
                                    _context6.next = 5;
                                    break;
                                }

                                voxole.warn("[VOXSNAP] Invalid html element passed as parent container.");
                                return _context6.abrupt("return");

                            case 5:
                                elements = 0;

                                while (parentNode.firstChild) {
                                    child = parentNode.firstChild;

                                    parentNode.removeChild(child);
                                    // do not complain about \n and space and tab
                                    if (!(child instanceof Text) || child.data.match(/^[\n \t]+$/) == null) ++elements;
                                }
                                if (elements > 0) voxole.warn("[VOXSNAP] I had to remove", elements, "unexpected elements from container div! Please do not put any HTML into that div.");

                                parentNode.appendChild(this.html);

                            case 9:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function appendTo(_x) {
                return _ref6.apply(this, arguments);
            }

            return appendTo;
        }()
        /**
         *
         * @param {String|VoxsnapEvents.VoxsnapEvent} name
         * @param {Object} data (optional)
         */

    }, {
        key: "emitEvent",
        value: function () {
            var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(name, data) {
                var evt, className, i;
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                /** @type {VoxsnapEvents.VoxsnapEvent} **/
                                evt = null;

                                if (!(typeof name == "string")) {
                                    _context7.next = 6;
                                    break;
                                }

                                className = "VoxsnapEvent" + name.replace(/(^[a-z]|[_\-][a-z])/g, function (letter) {
                                    return letter[letter.length - 1].toUpperCase();
                                });

                                if (!VoxsnapEvents[className]) {
                                    voxole.warn("[VOXASNAP] Event class named " + className + " for event called \"" + name + "\" does not exist.");
                                    evt = new VoxsnapEvents.VoxsnapEvent(name, this);
                                } else {
                                    evt = new VoxsnapEvents[className](this);
                                }
                                _context7.next = 13;
                                break;

                            case 6:
                                if (!((typeof name === "undefined" ? "undefined" : (0, _typeof3.default)(name)) == "object" && name != null && name instanceof VoxsnapEvents.VoxsnapEvent)) {
                                    _context7.next = 11;
                                    break;
                                }

                                evt = name;
                                name = evt.eventName;
                                _context7.next = 13;
                                break;

                            case 11:
                                voxole.warn("[VOXASNAP] Illegal parameter to emit event: ", name);
                                return _context7.abrupt("return");

                            case 13:

                                // set custom additional properties
                                if ((typeof data === "undefined" ? "undefined" : (0, _typeof3.default)(data)) == "object" && data != null) {
                                    for (i in data) {
                                        if (data.hasOwnProperty(i)) {
                                            evt[i] = data[i];
                                        }
                                    }
                                }
                                // Emit the events
                                this.emit(name, evt);
                                this.emit("*", evt);

                            case 16:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function emitEvent(_x2, _x3) {
                return _ref7.apply(this, arguments);
            }

            return emitEvent;
        }()
        /**
         * Shows or hides any parent elements with class "hidden-with-voxsnap"
         * @private
         * @param {boolean} state
         */

    }, {
        key: "setParentNodeVisibility",
        value: function setParentNodeVisibility(state) {
            if (!this.html) return;
            var parentNode = this.html;
            while (parentNode instanceof HTMLElement) {
                if (parentNode.classList && parentNode.classList.contains("hidden-with-voxsnap")) {
                    parentNode.style.display = state ? "" : "none";
                }
                parentNode = parentNode.parentNode;
            }
        }
        /**
         * This function takes following possible argunents:
         *   RAW json data (the library object as it is) - in this case loading will be ptretty much instant
         *   Index of narration that should be opened in the JSON (@TODO: change to narration_id)
         *   OPTIONAL STRING name of the jsonDATA key that contains the desired narration list
         * OR
         *   STRING first paramenter - track ID. In this case the track will be loaded
         *   OPTIONAL STRING second paramenter - comapny ID, if not used, the current company is selected
         * @param {LIBRARY_JSON|LIBRARY_ITEM|number|string} jsonData
         * @param {string|number} username
         * @param {string} narrationArrayName
        */

    }, {
        key: "reloadJSON",
        value: function () {
            var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(jsonDATA, username, narrationArrayName) {
                var _this6 = this;

                var JSON_RESULT, narration_id, user, narration_index, _narration_id, array, narration;

                return _regenerator2.default.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                if (!this.loadingJSON) {
                                    _context10.next = 3;
                                    break;
                                }

                                voxole.log("[VOXSNAP] Cancelled loading json - previous request still processed!");
                                return _context10.abrupt("return");

                            case 3:

                                //voxole.log("[VOXSNAP] Start loading JSON", arguments);
                                this.loadingJSON = true;
                                _context10.prev = 4;

                                /** @type {{0:boolean,25:boolean,50:boolean,75:boolean,100:boolean}} **/
                                this.ga_played = {};

                                /** @type {LIBRARY_ITEM} **/
                                this.LIBRARY_ITEM = null;

                                if (!(typeof jsonDATA == "number" || typeof jsonDATA == "string")) {
                                    _context10.next = 15;
                                    break;
                                }

                                narration_id = jsonDATA;
                                user = typeof username == "string" ? username : this.USERNAME;
                                /** @type {Promise<LIBRARY_JSON>} **/

                                this.LIBRARY_PROMISE = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
                                    var i, l;
                                    return _regenerator2.default.wrap(function _callee8$(_context8) {
                                        while (1) {
                                            switch (_context8.prev = _context8.next) {
                                                case 0:
                                                    _context8.next = 2;
                                                    return Promises.VoxsnapPlayerJson(user, narration_id, VOXSNAP_DATA);

                                                case 2:
                                                    JSON_RESULT = _this6.LIBRARY = _context8.sent;
                                                    i = 0, l = _this6.LIBRARY.narrations.length;

                                                case 4:
                                                    if (!(i < l)) {
                                                        _context8.next = 11;
                                                        break;
                                                    }

                                                    if (!(_this6.LIBRARY.narrations[i].username == user && _this6.LIBRARY.narrations[i].narration_id == narration_id)) {
                                                        _context8.next = 8;
                                                        break;
                                                    }

                                                    _this6.LIBRARY_ITEM = _this6.LIBRARY.narrations[i];
                                                    return _context8.abrupt("break", 11);

                                                case 8:
                                                    ++i;
                                                    _context8.next = 4;
                                                    break;

                                                case 11:
                                                    if (_this6.LIBRARY_ITEM == null) {
                                                        voxole.warn("[VOXSNAP] No matching narration found at json data for user:", user, "and narration:", narration_id);
                                                        _this6.LIBRARY_ITEM = _this6.LIBRARY.narrations[0];
                                                    }
                                                    return _context8.abrupt("return", _this6.LIBRARY);

                                                case 13:
                                                case "end":
                                                    return _context8.stop();
                                            }
                                        }
                                    }, _callee8, _this6);
                                }))();
                                _context10.next = 13;
                                return this.LIBRARY_PROMISE;

                            case 13:
                                _context10.next = 35;
                                break;

                            case 15:
                                if (!((typeof jsonDATA === "undefined" ? "undefined" : (0, _typeof3.default)(jsonDATA)) == "object")) {
                                    _context10.next = 35;
                                    break;
                                }

                                if (!(typeof username == "number" && typeof jsonDATA.narration_id != "undefined")) {
                                    _context10.next = 26;
                                    break;
                                }

                                narration_index = username;
                                ///TODO:
                                /// rework this so that the player instead receives root of the JSON
                                /// and path to the narration

                                // this is a single narration

                                narration_index = 0;
                                // enforce given narrations index
                                jsonDATA = { narrations: [jsonDATA] };
                                if ((0, _typeof3.default)(jsonDATA.narrations[0].googleAnalytics) == "object") {
                                    jsonDATA.googleAnalytics = jsonDATA.narrations[0].googleAnalytics;
                                    delete jsonDATA.narrations[0].googleAnalytics;
                                }

                                this.LIBRARY = jsonDATA;
                                this.LIBRARY_ITEM = this.LIBRARY.narrations[narration_index];
                                this.LIBRARY_PROMISE = new _promise2.default(function (r) {
                                    r(this.LIBRARY);
                                });
                                _context10.next = 35;
                                break;

                            case 26:
                                if (!(typeof username == "string" || typeof username == "number")) {
                                    _context10.next = 35;
                                    break;
                                }

                                _narration_id = username * 1;
                                /** @type {Array} **/

                                array = typeof narrationArrayName == "string" && (0, _typeof3.default)(jsonDATA[narrationArrayName]) == "object" ? jsonDATA[narrationArrayName] : jsonDATA.narrations;
                                narration = array.find(function (x) {
                                    return x.narration_id == _narration_id;
                                });

                                if (narration) {
                                    _context10.next = 32;
                                    break;
                                }

                                throw new Error("Narration with ID " + _narration_id + " not found!");

                            case 32:
                                this.LIBRARY = jsonDATA;
                                this.LIBRARY_ITEM = narration;
                                this.LIBRARY_PROMISE = new _promise2.default(function (r) {
                                    r(jsonDATA);
                                });

                            case 35:

                                this.USERNAME = this.LIBRARY_ITEM.username;
                                this.NARRATION = this.LIBRARY_ITEM.narration_id;

                                if (this.wavedraw) {
                                    (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
                                        var data;
                                        return _regenerator2.default.wrap(function _callee9$(_context9) {
                                            while (1) {
                                                switch (_context9.prev = _context9.next) {
                                                    case 0:
                                                        _context9.next = 2;
                                                        return _this6.loadWaveformData();

                                                    case 2:
                                                        data = _context9.sent;

                                                        _this6.wavedraw.data = data;

                                                    case 4:
                                                    case "end":
                                                        return _context9.stop();
                                                }
                                            }
                                        }, _callee9, _this6);
                                    }))();
                                }

                                this.playPercent = 0;
                                delete this.audio.forcedLoading;

                                this.setParentNodeVisibility(true);

                                _context10.next = 43;
                                return this.loadAudioFile();

                            case 43:
                                _context10.next = 45;
                                return this.renderLibrary();

                            case 45:
                                _context10.next = 51;
                                break;

                            case 47:
                                _context10.prev = 47;
                                _context10.t0 = _context10["catch"](4);

                                voxole.warn("[VOXSNAP] Error loading library: ", _context10.t0);
                                throw _context10.t0;

                            case 51:
                                _context10.prev = 51;

                                this.loadingJSON = false;
                                return _context10.finish(51);

                            case 54:
                                return _context10.abrupt("return", this);

                            case 55:
                            case "end":
                                return _context10.stop();
                        }
                    }
                }, _callee10, this, [[4, 47, 51, 54]]);
            }));

            function reloadJSON(_x4, _x5, _x6) {
                return _ref8.apply(this, arguments);
            }

            return reloadJSON;
        }()
    }, {
        key: "loadWaveformData",
        value: function () {
            var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
                var json_data;
                return _regenerator2.default.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                _context11.prev = 0;
                                _context11.next = 3;
                                return Promises.Waveform(this.NARRATION);

                            case 3:
                                json_data = _context11.sent;
                                return _context11.abrupt("return", json_data);

                            case 7:
                                _context11.prev = 7;
                                _context11.t0 = _context11["catch"](0);

                                voxole.error("[VOXSNAP] ERROR LOADING WAVEFORM: " + this.NARRATION);
                                throw new Error("[VOXSNAP] ERROR LOADING WAVEFORM: " + this.NARRATION);

                            case 11:
                            case "end":
                                return _context11.stop();
                        }
                    }
                }, _callee11, this, [[0, 7]]);
            }));

            function loadWaveformData() {
                return _ref11.apply(this, arguments);
            }

            return loadWaveformData;
        }()
    }, {
        key: "emitEventShare",
        value: function () {
            var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(type, data) {
                return _regenerator2.default.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                return _context12.abrupt("return", this.emitEvent(new VoxsnapEvents.VoxsnapEventShare(this, type), data));

                            case 1:
                            case "end":
                                return _context12.stop();
                        }
                    }
                }, _callee12, this);
            }));

            function emitEventShare(_x7, _x8) {
                return _ref12.apply(this, arguments);
            }

            return emitEventShare;
        }()
    }, {
        key: "percentTime",
        value: function percentTime(timeNow, timeTotal) {
            if (typeof timeTotal != "number") timeTotal = this.duration;
            if (typeof timeTotal != "number" || timeTotal <= 0) return 0;
            var fraction = timeNow / timeTotal;
            return fraction;
        }
        /**
         * Time rounded to closest 25%
         * @param {number} timeNow
         * @param {number} timeTotal
         */

    }, {
        key: "percentTimeRounded",
        value: function percentTimeRounded(timeNow, timeTotal) {
            var fragments = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;

            var fraction = this.percentTime(timeNow, timeTotal);
            return Math.round(fraction * fragments) * (100 / fragments);
        }
        /**
         * Time rounded down to nearest 25%. But returns 100% for 90% and more
         * @param {number} timeNow
         * @param {number} timeTotal
         * @param {number} fragments number of fragments to floor to. Default of 4 results in 25% fragments, still 90% up results in 100 returned no matter what value you pass
         */

    }, {
        key: "percentTimeFloor",
        value: function percentTimeFloor(timeNow, timeTotal) {
            var fragments = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;

            var fraction = this.percentTime(timeNow, timeTotal);
            if (fraction >= 0.9) return 100;
            return Math.floor(fraction * fragments) * (100 / fragments);
        }
        /**
         * @TODO: move this into plugin
         */

    }, {
        key: "startGoogleAnalytics",
        value: function () {
            var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
                var _this7 = this;

                return _regenerator2.default.wrap(function _callee14$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                //voxole.info("[VOXSNAP] Google analytics ENABLED!");
                                // will contain info about intevals played
                                /** @type {{0:boolean,25:boolean,50:boolean,75:boolean,100:boolean}} **/
                                this.ga_played = {};
                                this.on("*", function () {
                                    var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(event) {
                                        var LIBRARY_JSON, ga_settings, ga_funcname, voxevent, audioEvent, value, time, gaevent;
                                        return _regenerator2.default.wrap(function _callee13$(_context13) {
                                            while (1) {
                                                switch (_context13.prev = _context13.next) {
                                                    case 0:
                                                        if (!_this7.LIBRARY_PROMISE) {
                                                            _context13.next = 6;
                                                            break;
                                                        }

                                                        _context13.next = 3;
                                                        return _this7.LIBRARY_PROMISE;

                                                    case 3:
                                                        _context13.t0 = _context13.sent;
                                                        _context13.next = 7;
                                                        break;

                                                    case 6:
                                                        _context13.t0 = {};

                                                    case 7:
                                                        LIBRARY_JSON = _context13.t0;

                                                        //voxole.log(LIBRARY_JSON);
                                                        ga_settings = LIBRARY_JSON.googleAnalytics;

                                                        if (!((typeof ga_settings === "undefined" ? "undefined" : (0, _typeof3.default)(ga_settings)) != "object")) {
                                                            _context13.next = 11;
                                                            break;
                                                        }

                                                        return _context13.abrupt("return");

                                                    case 11:
                                                        ga_funcname = "";

                                                        if (!(typeof window[ga_settings.funcname] == "function")) {
                                                            _context13.next = 16;
                                                            break;
                                                        }

                                                        if (window[ga_settings.funcname].answer == 42) ga_funcname = ga_settings.funcname;
                                                        _context13.next = 21;
                                                        break;

                                                    case 16:
                                                        if (!(typeof window['ga'] == "function")) {
                                                            _context13.next = 20;
                                                            break;
                                                        }

                                                        if (window['ga'].answer == 42) ga_funcname = "ga";
                                                        _context13.next = 21;
                                                        break;

                                                    case 20:
                                                        return _context13.abrupt("return");

                                                    case 21:
                                                        //if (typeof ga != "function"/* && !VOXSNAP_DEBUG*/)
                                                        //    return;
                                                        /** @type {VoxsnapEvents.VoxsnapEvent} **/
                                                        voxevent = event;
                                                        // value depends on event

                                                        if (voxevent instanceof VoxsnapEvents.VoxsnapEventAudio) {
                                                            _context13.next = 24;
                                                            break;
                                                        }

                                                        return _context13.abrupt("return");

                                                    case 24:
                                                        /** @type {VoxsnapEvents.VoxsnapEventAudio} **/
                                                        audioEvent = voxevent;
                                                        value = "";
                                                        //if (voxevent.eventName == "seek")
                                                        //    value = this.percentTimeRounded(voxevent.from) + "% -> " + formatTime(voxevent.audioTime);
                                                        //if (voxevent.eventName.indexOf("skip_") == 0)
                                                        //    value = formatTime(voxevent.audioTime) + " -> " + formatTime((voxevent.eventName.indexOf("back") == -1 ? 15 : -15) + voxevent.audioTime);
                                                        //if (voxevent.eventName == "play" || voxevent.eventName == "pause")
                                                        //    value = formatTime(voxevent.audioTime);

                                                        time = _this7.percentTimeFloor(voxevent.audioTime, _this7.duration);

                                                        if (_this7.ga_played[time] != true) {
                                                            _this7.ga_played[time] = true;
                                                            gaevent = {
                                                                hitType: 'event',
                                                                eventCategory: "voxsnap",
                                                                eventAction: "play" + " " + LIBRARY_JSON.narrations[0].slug + " - " + time + "%",
                                                                /*eventLabel: LIBRARY_JSON.narrations[0].slug,
                                                                eventValue: value, INTEGER ONLY */
                                                                transport: 'beacon'
                                                            };
                                                            //voxole.info("[VOXSNAP GA]", gaevent);

                                                            window[ga_funcname]('send', gaevent);
                                                        }

                                                    case 28:
                                                    case "end":
                                                        return _context13.stop();
                                                }
                                            }
                                        }, _callee13, _this7);
                                    }));

                                    return function (_x11) {
                                        return _ref14.apply(this, arguments);
                                    };
                                }());

                            case 2:
                            case "end":
                                return _context14.stop();
                        }
                    }
                }, _callee14, this);
            }));

            function startGoogleAnalytics() {
                return _ref13.apply(this, arguments);
            }

            return startGoogleAnalytics;
        }()
        /**
         * @TODO: Move this into voxsnap plugin
         */

    }, {
        key: "startNormalAnalytics",
        value: function () {
            var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15() {
                var _this8 = this;

                return _regenerator2.default.wrap(function _callee15$(_context15) {
                    while (1) {
                        switch (_context15.prev = _context15.next) {
                            case 0:
                                this.on("*",
                                /**
                                 * @param {VoxsnapEvents.VoxsnapEvent} e
                                 ***/
                                function (e) {
                                    if (e.send) {
                                        voxole.info("[VOXSNAP EVENT] " + e.eventName, e);
                                        if (e.buildNumber != "DEVELOPMENT-UNDEFINED") {
                                            var xhr = new XMLHttpRequest();
                                            xhr.open("POST", "https://data.voxsnap.com/events/");
                                            //xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                                            xhr.send((0, _stringify2.default)([e]));
                                        }
                                    }
                                });
                                /// The unload event info
                                window.addEventListener("unload", function () {
                                    //voxole.log("[VOXSNAP] Unload event, logging the time played.")
                                    var event = new VoxsnapEvents.VoxsnapEventSessionEnd(_this8);
                                    if (typeof navigator.sendBeacon == "function") {
                                        navigator.sendBeacon("https://data.voxsnap.com/events/", (0, _stringify2.default)([event]));
                                    } else {
                                        var xhr = new XMLHttpRequest();
                                        xhr.open("POST", "https://data.voxsnap.com/events/", false);
                                        //xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                                        xhr.send((0, _stringify2.default)([event]));
                                    }
                                });

                            case 2:
                            case "end":
                                return _context15.stop();
                        }
                    }
                }, _callee15, this);
            }));

            function startNormalAnalytics() {
                return _ref15.apply(this, arguments);
            }

            return startNormalAnalytics;
        }()
    }, {
        key: "initEmbedly",
        value: function () {
            var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(receiver) {
                var _this9 = this;

                var linkEvent;
                return _regenerator2.default.wrap(function _callee16$(_context16) {
                    while (1) {
                        switch (_context16.prev = _context16.next) {
                            case 0:
                                receiver.on("play", this.play.bind(this));
                                receiver.on("pause", this.pause.bind(this));
                                receiver.on("getPaused", function (callback) {
                                    return callback(_this9.audio.paused);
                                });

                                receiver.on('getDuration', function (callback) {
                                    return callback(_this9.duration);
                                });

                                receiver.on("getCurrentTime", function (callback) {
                                    return callback(_this9.audio.currentTime);
                                });
                                receiver.on('setCurrentTime', function (time) {
                                    time = Math.min(Math.max(time, 0), _this9.duration);
                                    if (_this9.audio) _this9.audio.currentTime = time;
                                });
                                receiver.on('getVolume', function (callback) {
                                    return callback(_this9.audio.volume * 100);
                                });
                                receiver.on('setVolume', function (value) {
                                    return _this9.audio.volume = value / 100;
                                });
                                receiver.on('mute', function () {
                                    return _this9.audio.muted = true;
                                });
                                receiver.on('unmute', function () {
                                    return _this9.audio.muted = false;
                                });
                                receiver.on('getMuted', function (callback) {
                                    return callback(_this9.audio.muted);
                                });
                                receiver.on('getLoop', function (callback) {
                                    return callback(_this9.audio.loop);
                                });
                                receiver.on('setLoop', function (value) {
                                    return _this9.audio.loop = value;
                                });

                                linkEvent = function linkEvent(name) {
                                    _this9.audio.addEventListener(name, function () {
                                        receiver.emit(name);
                                    });
                                };

                                this.audio.addEventListener("timeupdate", function () {
                                    receiver.emit("timeupdate", { seconds: _this9.audio.currentTime, duration: _this9.audio.duration });
                                });
                                linkEvent("play");
                                linkEvent("pause");
                                linkEvent("ended");

                                // forward voxsnap specific events
                                this.on("*", function (e) {
                                    receiver.emit("voxsnap-" + e.name, e);
                                    //voxole.log("Forward event: ", e);
                                });

                                this.embedlyReceiver = receiver;
                                _context16.next = 22;
                                return this.LIBRARY_PROMISE;

                            case 22:
                                receiver.ready();

                            case 23:
                            case "end":
                                return _context16.stop();
                        }
                    }
                }, _callee16, this);
            }));

            function initEmbedly(_x12) {
                return _ref16.apply(this, arguments);
            }

            return initEmbedly;
        }()
    }, {
        key: "duration",
        get: function get() {
            /** @type {LIBRARY_ITEM} this.LIBRARY_ITEM **/

            if (this.audio && !(0, _isNan2.default)(this.audio.duration)) {
                return this.audio.duration;
            } else if (this.LIBRARY_ITEM && typeof this.LIBRARY_ITEM.audio_length == "number") {
                return this.LIBRARY_ITEM.audio_length;
            } else {
                return 0;
            }
        }
    }, {
        key: "currentTime",
        get: function get() {
            if (this.audio && !(0, _isNan2.default)(this.audio.currentTime)) {
                return this.audio.currentTime;
            } else if (this.LIBRARY_ITEM && typeof this.LIBRARY_ITEM.audio_length == "number") {
                return this.LIBRARY_ITEM.audio_length * (this.playPercent / 100);
            } else {
                return 0;
            }
        },
        set: function set(value) {
            if (this.audio && !(0, _isNan2.default)(this.audio.duration)) {
                if ((0, _isNan2.default)(value)) {
                    value = 0;
                    voxole.error("Tried to assign NaN as current time. ", new Error().stack);
                }
                return this.audio.currentTime = value;
            } else if (this.LIBRARY_ITEM && typeof this.LIBRARY_ITEM.audio_length == "number") {
                this.playPercent = value / this.LIBRARY_ITEM.audio_length * 100;
                //force loading
                if (!this.audio.forcedLoading) {
                    this.audio.forcedLoading = true;
                    // may not work outside click events on mobile devices
                    this.audio.play();
                }
                return value;
            } else {
                return 0;
            }
        }
    }, {
        key: "paused",
        get: function get() {
            return this.audio.paused;
        }
    }, {
        key: "playing",
        get: function get() {
            return !this.audio.paused;
        }
    }]);
    return VoxsnapPlayer;
}(_JSONMetadataItem3.default);

//voxole.log("VoxsnapPlayer: ", VoxsnapPlayer);


exports.default = VoxsnapPlayer;
exports.VoxsnapPlayer = VoxsnapPlayer;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _VoxConsole = __webpack_require__(0);

var _VoxConsole2 = _interopRequireDefault(_VoxConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voxole = _VoxConsole2.default.console;

var EventThrottler = function () {
    /**
     * 
     * @param {function} eventCallback will be called when event is being dispatched
     */
    function EventThrottler(eventCallback) {
        (0, _classCallCheck3.default)(this, EventThrottler);

        this.lastValue = null;
        this.lastDispatch = 0;
        this.dispatchTimeout = null;

        this.maxDispatchInterval = 5000;
        this.dispatchTimeoutDuration = 500;

        this.callback = eventCallback;
    }

    (0, _createClass3.default)(EventThrottler, [{
        key: "eventOccured",
        value: function eventOccured(evtData) {
            this.lastValue = evtData;
            this.resetTimeout();
        }
    }, {
        key: "resetTimeout",
        value: function resetTimeout() {
            var _this = this;

            clearTimeout(this.dispatchTimeout);
            var nextTimeout = this.timeToForcedDispatch;
            //voxole.log("[VOXSNAP] Reset timeout, remaining: ", nextTimeout);
            if (nextTimeout <= 0) {
                this.dispatchEvent();
            } else {
                this.dispatchTimeout = setTimeout(function () {
                    _this.dispatchEvent();
                }, nextTimeout);
            }
        }
    }, {
        key: "dispatchEvent",
        value: function dispatchEvent() {
            this.lastDispatch = new Date().getTime();
            this.dispatchValue();
        }
    }, {
        key: "dispatchValue",
        value: function dispatchValue() {
            this.callback(this.lastValue);
        }
    }, {
        key: "timeToForcedDispatch",
        get: function get() {
            var toForced = this.maxDispatchInterval - (new Date().getTime() - this.lastDispatch);
            // If the remaining time is negative
            // cap it to zero since it's not possible
            // to send the event back in time
            if (toForced < 0) {
                return 0;
            }
            // If the remaining time is larger than
            // dispatch timeout, then use dispatch timeout
            // The dispatch timeout resets with multiple event calls,
            // so only if the time accumulated by resets is > maxDispatchInterval
            // should the forced dispatch occur
            else if (toForced > this.dispatchTimeoutDuration) {
                    return this.dispatchTimeoutDuration;
                } else {
                    return toForced;
                }
        }
    }]);
    return EventThrottler;
}();

exports.default = EventThrottler;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.FilterMenu = undefined;

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _VoxConsole = __webpack_require__(0);

var _VoxConsole2 = _interopRequireDefault(_VoxConsole);

var _LibraryFilter = __webpack_require__(86);

var AudioFilter = _interopRequireWildcard(_LibraryFilter);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voxole = _VoxConsole2.default.console;

/**
 *  Plan for tomorow:
 *   use data-attributes to link HTML entries to json entries. Can be useful and is easy
 *   In library interface, make a method setItemVisible(string USERNAME, string NARRATION, bool isVisible)
 *   Use filters for each button, set item visibility based on those filters
 *   
 */
var ITEM_ACTIVE_CLASS = "fltr-itm_act";

var FilterMenu = function () {
    /**
     * @param {LibraryInterface} parentView should be an instance of LibraryInterface
     */
    function FilterMenu(parentView) {
        var _this = this;

        (0, _classCallCheck3.default)(this, FilterMenu);

        this.parent = parentView;
        this.html = document.createElement("nav");
        this.html.className = "fltr-nav";

        this.more = document.createElement("button");
        this.more.type = "button";
        this.more.className = "fltr-itm fltr-btn hidden";
        this.more.appendChild(document.createTextNode("More"));
        this.more.addEventListener("click", function () {
            _this.ulHidden.classList.toggle("hidden");
        });

        this.ul = document.createElement("ul");
        this.ul.className = "fltr-lst fltr-lst--visible";

        this.ulHidden = document.createElement("ul");
        this.ulHidden.className = "fltr-lst fltr-lst--hidden hidden";

        this.html.appendChild(this.more);
        this.html.appendChild(this.ul);
        this.html.appendChild(this.ulHidden);

        this.itemAll = new FilterMenuItem("All", new AudioFilter.All(), this);
        // rest of the items
        /** @type {Array<FilterMenuItem>} **/
        this.items = [];
        this.lastMenuItem = null;
        this.addItem(this.itemAll);
        this.activateItem(this.itemAll);
        // used as lookup to prevent duplicate buttons
        this.genreFilters = {};

        window.addEventListener("resize", function () {
            _this.adjustSize();
        });
        document.addEventListener("click", function (e) {
            var elm = e.target;
            while (elm != null && elm != _this.html) {
                // if click originates from more button or the list of hidden items
                if ( /*elm == this.ulHidden || */elm == _this.more) return;
                elm = elm.parentNode;
            }
            // the function didn't return so ulHidden nor it's child was clicked
            // therefore hide it
            _this.ulHidden.classList.add("hidden");
        });
    }
    /**
     * Append the menu to the given element (at the end)
     * @param {HTMLElement} element
     */


    (0, _createClass3.default)(FilterMenu, [{
        key: "appendTo",
        value: function appendTo(element) {
            if (element instanceof HTMLElement) {
                element.appendChild(this.html);
                this.adjustSize();
            } else {
                throw new Error("FilterMenu needs valid element to append to.");
            }
        }
        /**
         * Add genres to the button menu
         * @param {Array<string>} genres
         */

    }, {
        key: "addGenreFilters",
        value: function addGenreFilters(genres) {
            for (var i = 0, l = genres.length; i < l; ++i) {
                var genre = genres[i];
                // skip if exists already
                if (this.genreFilters[genre]) continue;
                var filter = new AudioFilter.Genre(genre);
                this.genreFilters[genre] = filter;
                this.addFilter(genre, filter);
            }
        }
        /**
         * Add item created from filter
         * @param {string} title
         * @param {AudioFilter} filter
         */

    }, {
        key: "addFilter",
        value: function addFilter(title, filter) {
            this.addItem(new FilterMenuItem(title, filter, this));
        }
        /**
         * Add item to the button list
         * @param {FilterMenuItem} item
         */

    }, {
        key: "addItem",
        value: function addItem(item) {
            //var prevItem = this.items.length>0?this.items[this.items.length - 1]:null;
            this.items.push(item);
            //this.ul.insertBefore(item.html, prevItem ? prevItem.html.nextSibling : null);
            this.ul.appendChild(item.html);
            if (this.html.parentNode) this.adjustSize();
        }

        /**
         * 
         * @param {FilterMenuItem} menuItem
         */

    }, {
        key: "filterItemActivated",
        value: function filterItemActivated(menuItem) {
            this.activateItem(menuItem);
            this.applyFilter(menuItem.filter);
        }
        /**
         * Focuses given item, but does not aplly filters. For internal use
         * @private
         * @param {FilterMenuItem} menuItem
         */

    }, {
        key: "activateItem",
        value: function activateItem(menuItem) {
            if (this.lastMenuItem) {
                this.lastMenuItem.setActive(false);
            }
            menuItem.setActive(true);
            this.lastMenuItem = menuItem;
        }
    }, {
        key: "applyFilter",
        value: function applyFilter(filter) {
            this.parent.applyFilter(filter);
        }
    }, {
        key: "getHTML",
        value: function getHTML() {
            return this.html;
        }
    }, {
        key: "adjustSize",
        value: function adjustSize() {
            var _this2 = this;

            var element = this.html.parentNode;
            // start tracking the size
            if (element && document.body.contains(element)) {
                /// Move hidden items to visible items if possible
                var hiddenItems = this.items.filter(function (item) {
                    return item.html.parentNode == _this2.ulHidden;
                });
                var maxSize = this.ul.getBoundingClientRect().right - 10;
                for (var i = 0, l = hiddenItems.length; i < l; ++i) {
                    var lastVisible = this.ul.lastElementChild;
                    var hiddenItem = hiddenItems[i];
                    var itemRect = hiddenItem.html.getBoundingClientRect();
                    if (lastVisible.getBoundingClientRect().right + itemRect.width < maxSize) {
                        hiddenItem.html.parentNode.removeChild(hiddenItem.html);
                        this.ul.appendChild(hiddenItem.html);
                    }
                }
                if (this.ulHidden.firstElementChild == null) {
                    this.more.classList.add("hidden");
                }
                ///// move extra visible items ho hidden
                //var lastItemIndex = this.items.length - 1;
                //var firstItemTop = this.items[0].html.getBoundingClientRect().top + 5;
                ///** @type {FilterMenuItem} **/
                //var lastItem = this.items[lastItemIndex];
                //voxole.log(firstItemTop, lastItem.html.getBoundingClientRect().top, lastItem);
                //while (lastItem && lastItem.html.getBoundingClientRect().top > firstItemTop) {
                //    voxole.log("Remove item ", lastItem);
                //    lastItem.html.parentNode.removeChild(lastItem.html);
                //    this.ulHidden.insertBefore(lastItem.html, this.ulHidden.firstChild);

                //    // make the more button visible
                //    this.more.classList.remove("hidden");
                //    lastItem = this.items[--lastItemIndex];
                //}

                var firstItemTop = this.itemAll.html.getBoundingClientRect().top + 5;
                for (var _i = 0, _l = this.items.length; _i < _l; ++_i) {
                    var item = this.items[_i];
                    if (item == this.itemAll) continue;
                    if (item.html.getBoundingClientRect().top > firstItemTop) {
                        item.html.parentNode.removeChild(item.html);
                        this.ulHidden.insertBefore(item.html, this.ulHidden.firstChild);
                        // make the more button visible
                        this.more.classList.remove("hidden");
                    }
                }
            }
        }
    }]);
    return FilterMenu;
}();

var FilterMenuItem = function () {
    /**
     * 
     * @param {String} title
     * @param {AudioFilter} filter
     * @param {FilterMenu} parentMenu
     */
    function FilterMenuItem(title, filter, parentMenu) {
        var _this3 = this;

        (0, _classCallCheck3.default)(this, FilterMenuItem);

        this.html = document.createElement("li");

        this.link = document.createElement("a");
        this.link.classList.add("fltr-itm");
        this.link.appendChild(document.createTextNode(title));
        this.link.href = "#";
        this.html.appendChild(this.link);

        this.parent = parentMenu;
        this.filter = filter;

        this.title = title;
        this.link.addEventListener("click", function () {
            _this3.parent.filterItemActivated(_this3);
        });
    }
    /**
     * Set active or not active
     * @param {Boolean} state
     */


    (0, _createClass3.default)(FilterMenuItem, [{
        key: "setActive",
        value: function setActive(state) {
            if (state) {
                this.link.classList.add(ITEM_ACTIVE_CLASS);
            } else {
                this.link.classList.remove(ITEM_ACTIVE_CLASS);
            }
        }
    }]);
    return FilterMenuItem;
}();

exports.FilterMenu = FilterMenu;
exports.default = FilterMenu;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**  
  * @typedef {Object} LIBRARY_ITEM 
  * @property {string} customer_display
  * @property {string} audio_url URL to the narration MP3
  * @property {string} customer_url
  * @property {number} audio_length in seconds
  * @property {string} title human readable title, shortened
  * @property {string} blog_url link to the article, if applicable
  * @property {string} image link to the image related to the article
  * @property {string} display_url URL displayed to the user, without clutter
  * @property {string} post_time Mon DD YYYY format
  * @property {string} username of the client, this os the first part of narration URL
  * @property {string} article_url link to article on voxnap website
  * @property {string} narration_id internal number, second part of narration URL
  * @property {Array<string>} genre list of genres
  * @property {string} twitter includes leading @
  * @property {string} slug - not sure, but it looks like URL fragment
  */

/**
 * @typedef {string} Color
 * **/

/**
  * @typedef {Object} LIBRARY_JSON 
  * @property {object} googleAnalytics Google analytics settings
  * @property {Array<String>} genres list of genres for filtering, if applicable
  * @property {Array<LIBRARY_ITEM>} narrations list of narrations
  * @property {Array<LIBRARY_ITEM>} featured
  * @property {string} playlist_name Name of the playlist, if applicable
  * @property {Color} color Color theme for the player
  * @property {boolean|"True"|"False"} enterprise If true, Voxnam logo should be hidden from the player
  */

/**
 * @param {LIBRARY_JSON} lib
**/
function test(lib) {}
/** @type {LIBRARY_ITEM} **/
var dd;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Genre = exports.None = exports.All = undefined;

var _typeof2 = __webpack_require__(12);

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = __webpack_require__(7);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = __webpack_require__(9);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _VoxConsole = __webpack_require__(0);

var _VoxConsole2 = _interopRequireDefault(_VoxConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voxole = _VoxConsole2.default.console;

var AudioFilter = function () {
    function AudioFilter() {
        (0, _classCallCheck3.default)(this, AudioFilter);
    }

    (0, _createClass3.default)(AudioFilter, [{
        key: "satisfies",

        /**
         * @returns {Boolean} true if the narration should be shown,
                              false if it dasn't satisfy filter'
         * @param {any} narration one item from the narrayions or featured array
         */
        value: function satisfies(narration) {
            return true;
        }
        /**
         * Just an inverse of the above method
         * @param {any} narration
         */

    }, {
        key: "notSatisfies",
        value: function notSatisfies(narration) {
            return !satisfies(narration);
        }
        /**
         * Convenience method.
         * @param {Array} narrayions List of narrations
         * @returns {Array} List of narrations that should be hidden
         */

    }, {
        key: "filteredItems",
        value: function filteredItems(narrayions) {
            return narrations.filter(this.notSatisfies.bind(this));
        }
    }]);
    return AudioFilter;
}();

var Genre = function (_AudioFilter) {
    (0, _inherits3.default)(Genre, _AudioFilter);

    function Genre(genres) {
        (0, _classCallCheck3.default)(this, Genre);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Genre.__proto__ || (0, _getPrototypeOf2.default)(Genre)).call(this));

        _this.genres = genres instanceof Array ? genres : [genres];
        return _this;
    }

    (0, _createClass3.default)(Genre, [{
        key: "satisfies",
        value: function satisfies(narration) {
            if ((0, _typeof3.default)(narration.genre) != "object" || narration.genre.length == 0) {
                voxole.warn("[VOXSNAP] Note that recording", narration.title, "has no genres.");
                return false;
            }
            for (var i = 0, l = this.genres.length; i < l; ++i) {
                if (narration.genre.indexOf(this.genres[i]) >= 0) {
                    return true;
                }
            }
            return false;
        }
    }]);
    return Genre;
}(AudioFilter);

AudioFilter.Genre = Genre;

var All = function (_AudioFilter2) {
    (0, _inherits3.default)(All, _AudioFilter2);

    function All() {
        (0, _classCallCheck3.default)(this, All);
        return (0, _possibleConstructorReturn3.default)(this, (All.__proto__ || (0, _getPrototypeOf2.default)(All)).call(this));
    }

    (0, _createClass3.default)(All, [{
        key: "satisfies",
        value: function satisfies(narration) {
            return true;
        }
    }]);
    return All;
}(AudioFilter);

AudioFilter.All = All;

exports.All = All;
exports.None = AudioFilter;
exports.Genre = Genre;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SeekBarWaveform = exports.SeekBarBasic = undefined;

var _getPrototypeOf = __webpack_require__(7);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(9);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _VoxConsole = __webpack_require__(0);

var _VoxConsole2 = _interopRequireDefault(_VoxConsole);

var _eventEmitter = __webpack_require__(60);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voxole = _VoxConsole2.default.console;

/**
 * @event seek emitted when user tries to seek on this bar
 * @event seekstart emitted when user starts seeking
 * @event seekend emitted when seeking operation ends (eg. mouse leaves the bar)
 */
var SeekBar = function (_EventEmitter) {
    (0, _inherits3.default)(SeekBar, _EventEmitter);

    function SeekBar() {
        (0, _classCallCheck3.default)(this, SeekBar);
        return (0, _possibleConstructorReturn3.default)(this, (SeekBar.__proto__ || (0, _getPrototypeOf2.default)(SeekBar)).call(this));
    }
    /**
     * Seek at given fraction, range 0-1
     * @param {number} fraction
     */


    (0, _createClass3.default)(SeekBar, [{
        key: "seek",
        value: function seek(fraction) {
            throw new Error("Pure virtual method call!");
        }
    }, {
        key: "currentPosition",
        get: function get() {
            return 0;
        }
    }]);
    return SeekBar;
}(_eventEmitter2.default);

var SeekBarMouse = function (_SeekBar) {
    (0, _inherits3.default)(SeekBarMouse, _SeekBar);

    function SeekBarMouse(seekArea) {
        (0, _classCallCheck3.default)(this, SeekBarMouse);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (SeekBarMouse.__proto__ || (0, _getPrototypeOf2.default)(SeekBarMouse)).call(this));

        _this2.seekArea = seekArea;
        _this2.mouseDown = false;
        seekArea.addEventListener("mousedown", function (event) {
            _this2.mouseDown = true;
            _this2.dragEvent(event);
        });
        seekArea.addEventListener("mouseup", function (event) {
            _this2.seekEnd();
            _this2.mouseDown = false;
        });
        seekArea.addEventListener("mouseleave", function (event) {
            _this2.seekEnd();
            _this2.mouseDown = false;
        });
        seekArea.addEventListener("mousemove", function (event) {
            if (_this2.mouseDown) {
                _this2.dragEvent(event);
            }
        });
        return _this2;
    }

    /**
     * Called to update seek bar when user drags the mouse
     * @private
     * @param {MouseEvent} event
     */


    (0, _createClass3.default)(SeekBarMouse, [{
        key: "dragEvent",
        value: function dragEvent(event) {
            var rect = this.seekArea.getBoundingClientRect();
            //Recalculate mouse offsets to relative offsets
            var x = event.clientX - rect.left;
            //const y = event.clientY - rect.top;
            // convert to fraction <=1
            var fraction = x / (rect.right - rect.left);

            this.emit("seek", fraction);
        }
    }, {
        key: "seekEnd",
        value: function seekEnd() {
            if (this.mouseDown) {
                this.emit("seekend");
            }
        }
    }]);
    return SeekBarMouse;
}(SeekBar);

var SeekBarBasic = function (_SeekBarMouse) {
    (0, _inherits3.default)(SeekBarBasic, _SeekBarMouse);

    /**
     *
     * @param {HTMLDivElement} basicHTML
     */
    function SeekBarBasic(progressBar) {
        (0, _classCallCheck3.default)(this, SeekBarBasic);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (SeekBarBasic.__proto__ || (0, _getPrototypeOf2.default)(SeekBarBasic)).call(this, progressBar));

        _this3.progressBar = progressBar;

        return _this3;
    }

    (0, _createClass3.default)(SeekBarBasic, [{
        key: "currentPosition",
        get: function get() {
            return 0;
        }
    }]);
    return SeekBarBasic;
}(SeekBarMouse);

var SeekBarWaveform = function (_SeekBarMouse2) {
    (0, _inherits3.default)(SeekBarWaveform, _SeekBarMouse2);

    /**
     *
     * @param {HTMLCanvasElement} canvas
     */
    function SeekBarWaveform(canvas) {
        (0, _classCallCheck3.default)(this, SeekBarWaveform);

        var _this4 = (0, _possibleConstructorReturn3.default)(this, (SeekBarWaveform.__proto__ || (0, _getPrototypeOf2.default)(SeekBarWaveform)).call(this, canvas.parentElement));

        _this4.canvas = canvas;
        return _this4;
    }

    (0, _createClass3.default)(SeekBarWaveform, [{
        key: "seek",
        value: function seek(fraction) {
            var perc = fraction * 100 + "%";
            this.canvas.style.clipPath = "polygon(0 0, " + perc + " 0%, " + perc + " 100%, 0 100%)";
            this.canvas.style.webkitClipPath = "polygon(0 0, " + perc + " 0%, " + perc + " 100%, 0 100%)";
        }
    }, {
        key: "currentPosition",
        get: function get() {
            var path = this.canvas.style.clipPath;

            var fraction = 0;
            if (typeof path == "string") {
                var REGEX_PATH = /polygon\([0-9 %]+,\s*([0-9\.]+)\s*%/i;
                var match;
                if (match = REGEX_PATH.exec(path)) {
                    fraction = 1 * path[1];
                };
            }
            return fraction;
        }
    }]);
    return SeekBarWaveform;
}(SeekBarMouse);

exports.default = SeekBar;
exports.SeekBarBasic = SeekBarBasic;
exports.SeekBarWaveform = SeekBarWaveform;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.voxsnapRender = exports.setupShareButtons = undefined;

var _regenerator = __webpack_require__(11);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(10);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = __webpack_require__(12);

var _typeof3 = _interopRequireDefault(_typeof2);

/** various methods extracted from the main script **/
// all related to setting up HTML

/**
 * Sets up the share features.
 * @param {VoxsnapPlayer} player
 * @param {String} RESOURCE_BASE_PATH path to the directory with player js and css and html files


**/
var setupShareButtons = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(player, RESOURCE_BASE_PATH, player_version) {
        var VOXSNAP_PLAYER, sharingButton;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        /** @type {HTMLDivElement} **/
                        VOXSNAP_PLAYER = player.html;

                        try {
                            sharingButton = VOXSNAP_PLAYER.querySelector(".btn_sharing");


                            if (player_version == "pro") {
                                _SharingDialog2.default.pro(VOXSNAP_PLAYER);
                            } else if (player_version == "basic") {
                                sharingButton.addEventListener("click", function () {
                                    voxsnapSafeSelector(VOXSNAP_PLAYER, ".sharing_code", function (elm) {
                                        elm.classList.remove('showOut');
                                        elm.classList.add('showIn');
                                    }, false);
                                    voxsnapSafeSelector(VOXSNAP_PLAYER, ".sharing_media", function (elm) {
                                        elm.classList.remove('showOut');
                                        elm.classList.add('showIn');
                                    }, false);
                                });
                                /** clipboard handling here **/
                                sharingButton.addEventListener("click", function () {
                                    player.emitEvent("sharing-dialog", {});
                                    voxsnapSafeSelector(VOXSNAP_PLAYER, ".sharing_media_icons .icon_link", function (elm) {
                                        elm.addEventListener("click", function (e) {
                                            player.emitEventShare("url");
                                            if (_Clipboard2.default.INSTANCE.writeTextTextarea(VOXSNAP_PLAYER.querySelector('.sharing_media_icons .icon_link').href)) {
                                                var res1 = VOXSNAP_PLAYER.querySelector('.sharing_clipboard-res1');
                                                res1.classList.add('shw-fade');
                                                setTimeout(function () {
                                                    res1.classList.remove('shw-fade');
                                                }, 3100);
                                            }
                                        }, { once: true });
                                    }, false);
                                    voxsnapSafeSelector(VOXSNAP_PLAYER, ".sharing_code-copy", function (elm) {
                                        elm.addEventListener("click", function (e) {
                                            player.emitEventShare("embed");
                                            if (_Clipboard2.default.INSTANCE.writeTextTextarea(player.getPlayerEmbed(RESOURCE_BASE_PATH))) {
                                                var res2 = VOXSNAP_PLAYER.querySelector('.sharing_clipboard-res2');
                                                res2.classList.add('shw-fade');
                                                setTimeout(function () {
                                                    res2.classList.remove('shw-fade');
                                                }, 3100);
                                            }
                                        }, { once: true });
                                    }, false);
                                }, { once: true });
                            }
                        } catch (e) {
                            voxole.error("Cannot add callback to share media button.", e);
                        }

                        if (player_version == "basic") {
                            try {
                                VOXSNAP_PLAYER.querySelector(".sharing_media-close").addEventListener("click", function () {
                                    VOXSNAP_PLAYER.querySelector(".sharing_media").classList.add('showOut');
                                    VOXSNAP_PLAYER.querySelector(".sharing_code").classList.add('showOut');
                                    setTimeout(function () {
                                        VOXSNAP_PLAYER.querySelector(".sharing_media").classList.remove('showIn');
                                        VOXSNAP_PLAYER.querySelector(".sharing_code").classList.remove('showIn');
                                    }, 450);

                                    // hide any "copied" messages
                                    VOXSNAP_PLAYER.querySelector('.sharing_clipboard-res1').style.display = "none";
                                    VOXSNAP_PLAYER.querySelector('.sharing_clipboard-res2').style.display = "none";
                                });
                            } catch (e) {
                                voxole.error("Cannot add callback to share media close button.", e);
                            }
                        }

                        // analytics events
                        VOXSNAP_PLAYER.querySelector(".sharing_media_icons .icon_facebook").addEventListener("click", function () {
                            player.emitEventShare("facebook");
                        }, { once: true });

                        VOXSNAP_PLAYER.querySelector(".sharing_media_icons .icon_twitter").addEventListener("click", function () {
                            player.emitEventShare("twitter");
                        }, { once: true });

                        VOXSNAP_PLAYER.querySelector(".sharing_media_icons .icon_linkedin").addEventListener("click", function () {
                            player.emitEventShare("linkedin");
                        }, { once: true });

                        VOXSNAP_PLAYER.querySelector(".sharing_media_icons .icon_mail").addEventListener("click", function () {
                            player.emitEventShare("mail");
                        }, { once: true });

                        // do not let the user click through the link accidentally
                        VOXSNAP_PLAYER.querySelector('.sharing_media_icons .icon_link').addEventListener("click", function (e) {
                            e.preventDefault();
                            return false;
                        });

                    case 8:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function setupShareButtons(_x2, _x3, _x4) {
        return _ref.apply(this, arguments);
    };
}();

var _VoxConsole = __webpack_require__(0);

var _VoxConsole2 = _interopRequireDefault(_VoxConsole);

var _Promises = __webpack_require__(22);

var Promises = _interopRequireWildcard(_Promises);

var _SharingDialog = __webpack_require__(59);

var _SharingDialog2 = _interopRequireDefault(_SharingDialog);

var _Clipboard = __webpack_require__(57);

var _Clipboard2 = _interopRequireDefault(_Clipboard);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voxole = _VoxConsole2.default.console;

/**
  Renders text information into a html node(s) **/
function voxsnapRender(selector, text, classNames, removeClassNames, silent) {
    var elements = typeof selector == "string" && selector.length > 0 ? this.querySelectorAll(selector) : [this];
    if (!(elements instanceof Array)) {
        var tmp = [];
        tmp.push.apply(tmp, elements);
        elements = tmp;
    }

    if (typeof classNames == "string") {
        classNames = [classNames];
    }
    if (typeof removeClassNames == "string") {
        removeClassNames = [removeClassNames];
    }
    // for every element found, set all required values
    elements.forEach(function (element) {
        if (text) {
            var htmlText = typeof text == "string" ? text : text.text;
            // set or change text contents
            if (htmlText != null) {
                if (element.childNodes.length != 1 || !(element.childNodes[0] instanceof Text)) {
                    element.innerHTML = "";
                    element.appendChild(document.createTextNode(htmlText));
                } else {
                    element.childNodes[0].data = htmlText;
                }
            }

            if ((typeof text === "undefined" ? "undefined" : (0, _typeof3.default)(text)) == "object") {
                for (var i in text) {
                    if (text.hasOwnProperty(i)) {
                        var value = text[i];
                        // copy styles recursively
                        if (i == "style") {
                            if (typeof value == "string") element.style = value;else if ((typeof value === "undefined" ? "undefined" : (0, _typeof3.default)(value)) == "object") {
                                for (var j in value) {
                                    element.style[j] = value[j];
                                }
                            }
                        } else {
                            element[i] = text[i];
                        }
                    }
                }
            }
        }

        var classList = element.classList;
        // set classes
        if (classNames instanceof Array) {
            classNames.forEach(function (className) {
                classList.add(className);
            });
        }
        // remove classes
        if (removeClassNames instanceof Array) {
            removeClassNames.forEach(function (className) {
                classList.remove(className);
            });
        }
    });

    if (elements.length == 0 && silent !== true) {
        voxole.warn("No renderable elements found for selector: ", selector);
    }
}
HTMLElement.prototype.voxsnap_render = voxsnapRender;
/**
 *
 * @param {HTMLElement} node
 * @param {string} selector
 * @param {function(HTMLElement):void} callback
 * @param {boolean} all if true, callback will be called for all matches
 */
function voxsnapSafeSelector(node, selector, callback) {
    var all = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (node instanceof Element) {
        try {
            var results = all ? node.querySelectorAll(selector) : [node.querySelector(selector)];
            if (results.length == 0 || results.length == 1 && results[0] == null) {
                voxole.warn("[VOXSNAP] No nodes found with selector ", selector, " called from:", new Error().stack);
            }
            for (var i = 0, l = results.length; i < l; ++i) {
                var item = results[i];
                try {
                    callback(item);
                } catch (e) {
                    voxole.warn("Callback error: ", callback, e);
                }
            }
        } catch (e) {
            voxole.warn("[VOXSNAP] Invalid selector: ", selector, e.message);
        }
    } else {
        voxole.warn("[VOXSNAP] Invalid node param passed to voxsnapSafeSelector()!");
    }
}
// Require path - empty for webpack, path to directory for XHR
var REQUIRE_PATH =  true ? "./" : "./voxsnap/";exports.setupShareButtons = setupShareButtons;
exports.voxsnapRender = voxsnapRender;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AdditionalEventInfoGroup = exports.VoxsnapEventSessionEnd = exports.VoxsnapEventSkipBackwards = exports.VoxsnapEventSkipForward = exports.VoxsnapEventLoading = exports.VoxsnapEventSeek = exports.VoxsnapEventPlay = exports.VoxsnapEventPause = exports.VoxsnapEventTimeUpdateThrottled = exports.VoxsnapEventTimeUpdate = exports.VoxsnapEventAudio = exports.VoxsnapEventShare = exports.VoxsnapEvent = undefined;

var _stringify = __webpack_require__(36);

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = __webpack_require__(93);

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = __webpack_require__(12);

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = __webpack_require__(96);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(7);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = __webpack_require__(9);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _VoxConsole = __webpack_require__(0);

var _VoxConsole2 = _interopRequireDefault(_VoxConsole);

var _Polyfill = __webpack_require__(34);

var Polyfill = _interopRequireWildcard(_Polyfill);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voxole = _VoxConsole2.default.console;

var APPROXIMATE_PAGE_LOAD_TIME = new Date().getTime();
/**
  @module VoxsnapEvents
**/

// Require path - empty for webpack, path to directory for XHR
var REQUIRE_PATH =  true ? "./" : "./voxsnap/";
var VOXSNAP_PLAYER_BUILD =  true ? 74 : "DEVELOPMENT-UNDEFINED";
/**
 * @property {boolean} VoxsnapEvent.prototype.send sets whether the event should be sent to remote server
 */

var VoxsnapEvent = function () {
    /**
     * @param {String} name of the event
     * @param {VoxsnapPlayer} player that caused the event
     */
    function VoxsnapEvent(name, player) {
        (0, _classCallCheck3.default)(this, VoxsnapEvent);

        this.eventName = name;
        this.USERNAME = player.USERNAME;
        this.NARRATION = player.NARRATION;
        this.buildNumber = VOXSNAP_PLAYER_BUILD;
        this.deltaTime = new Date().getTime() - player.loadTime;
        this.referrer = window.location != window.parent.location ? document.referrer : document.location.href;

        this.send = true;

        if (player.analyticInfo && !player.analyticInfo.isEmpty) {
            this.details = player.analyticInfo.details;
        }
        // Although it would be interesting to see the difference between player and page load time
        /// this.pageDeltaTime = new Date().getTime() - APPROXIMATE_PAGE_LOAD_TIME;
    }
    /**
     *
     * @param {String} nameOverride (optional) different name than this event's name. Usually used with *
     */


    (0, _createClass3.default)(VoxsnapEvent, [{
        key: "toCustomEvent",
        value: function toCustomEvent(nameOverride) {
            var name = typeof nameOverride == "string" ? nameOverride : this.eventName;
            var evt = new Polyfill.CustomEvent("voxsnap-" + name, { detail: this });
            return evt;
        }
    }]);
    return VoxsnapEvent;
}();

var VoxsnapEventShare = function (_VoxsnapEvent) {
    (0, _inherits3.default)(VoxsnapEventShare, _VoxsnapEvent);

    function VoxsnapEventShare(player, type) {
        (0, _classCallCheck3.default)(this, VoxsnapEventShare);

        var _this = (0, _possibleConstructorReturn3.default)(this, (VoxsnapEventShare.__proto__ || (0, _getPrototypeOf2.default)(VoxsnapEventShare)).call(this, "share", player));

        _this.type = type;
        return _this;
    }

    return VoxsnapEventShare;
}(VoxsnapEvent);

var VoxsnapEventAudio = function (_VoxsnapEvent2) {
    (0, _inherits3.default)(VoxsnapEventAudio, _VoxsnapEvent2);

    function VoxsnapEventAudio(name, player) {
        (0, _classCallCheck3.default)(this, VoxsnapEventAudio);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (VoxsnapEventAudio.__proto__ || (0, _getPrototypeOf2.default)(VoxsnapEventAudio)).call(this, name, player));

        _this2.audioTime = player.audio.currentTime;
        return _this2;
    }

    return VoxsnapEventAudio;
}(VoxsnapEvent);

var VoxsnapEventTimeUpdate = function (_VoxsnapEventAudio) {
    (0, _inherits3.default)(VoxsnapEventTimeUpdate, _VoxsnapEventAudio);

    function VoxsnapEventTimeUpdate(player) {
        var evtname = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "time_update";
        (0, _classCallCheck3.default)(this, VoxsnapEventTimeUpdate);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (VoxsnapEventTimeUpdate.__proto__ || (0, _getPrototypeOf2.default)(VoxsnapEventTimeUpdate)).call(this, evtname, player));

        _this3.send = false;
        _this3.playing = !player.audio.paused;
        _this3.currentTimePercent = player.playPercent;
        return _this3;
    }

    return VoxsnapEventTimeUpdate;
}(VoxsnapEventAudio);

var VoxsnapEventTimeUpdateThrottled = function (_VoxsnapEventTimeUpda) {
    (0, _inherits3.default)(VoxsnapEventTimeUpdateThrottled, _VoxsnapEventTimeUpda);

    function VoxsnapEventTimeUpdateThrottled(player) {
        (0, _classCallCheck3.default)(this, VoxsnapEventTimeUpdateThrottled);

        var _this4 = (0, _possibleConstructorReturn3.default)(this, (VoxsnapEventTimeUpdateThrottled.__proto__ || (0, _getPrototypeOf2.default)(VoxsnapEventTimeUpdateThrottled)).call(this, player, "time_update_throttled"));

        _this4.send = true;
        return _this4;
    }

    return VoxsnapEventTimeUpdateThrottled;
}(VoxsnapEventTimeUpdate);

var VoxsnapEventPlay = function (_VoxsnapEventAudio2) {
    (0, _inherits3.default)(VoxsnapEventPlay, _VoxsnapEventAudio2);

    function VoxsnapEventPlay(player) {
        (0, _classCallCheck3.default)(this, VoxsnapEventPlay);
        return (0, _possibleConstructorReturn3.default)(this, (VoxsnapEventPlay.__proto__ || (0, _getPrototypeOf2.default)(VoxsnapEventPlay)).call(this, "play", player));
    }

    return VoxsnapEventPlay;
}(VoxsnapEventAudio);

var VoxsnapEventPause = function (_VoxsnapEventAudio3) {
    (0, _inherits3.default)(VoxsnapEventPause, _VoxsnapEventAudio3);

    function VoxsnapEventPause(player) {
        (0, _classCallCheck3.default)(this, VoxsnapEventPause);
        return (0, _possibleConstructorReturn3.default)(this, (VoxsnapEventPause.__proto__ || (0, _getPrototypeOf2.default)(VoxsnapEventPause)).call(this, "pause", player));
    }

    return VoxsnapEventPause;
}(VoxsnapEventAudio);

var VoxsnapEventSeek = function (_VoxsnapEventAudio4) {
    (0, _inherits3.default)(VoxsnapEventSeek, _VoxsnapEventAudio4);

    function VoxsnapEventSeek(player, from) {
        (0, _classCallCheck3.default)(this, VoxsnapEventSeek);

        var _this7 = (0, _possibleConstructorReturn3.default)(this, (VoxsnapEventSeek.__proto__ || (0, _getPrototypeOf2.default)(VoxsnapEventSeek)).call(this, "seek", player));

        _this7.from = from || 0;
        return _this7;
    }

    return VoxsnapEventSeek;
}(VoxsnapEventAudio);

var VoxsnapEventSkipForward = function (_VoxsnapEventAudio5) {
    (0, _inherits3.default)(VoxsnapEventSkipForward, _VoxsnapEventAudio5);

    function VoxsnapEventSkipForward(player) {
        (0, _classCallCheck3.default)(this, VoxsnapEventSkipForward);
        return (0, _possibleConstructorReturn3.default)(this, (VoxsnapEventSkipForward.__proto__ || (0, _getPrototypeOf2.default)(VoxsnapEventSkipForward)).call(this, "skip_forward", player));
    }

    return VoxsnapEventSkipForward;
}(VoxsnapEventAudio);

var VoxsnapEventSkipBackwards = function (_VoxsnapEventAudio6) {
    (0, _inherits3.default)(VoxsnapEventSkipBackwards, _VoxsnapEventAudio6);

    function VoxsnapEventSkipBackwards(player) {
        (0, _classCallCheck3.default)(this, VoxsnapEventSkipBackwards);
        return (0, _possibleConstructorReturn3.default)(this, (VoxsnapEventSkipBackwards.__proto__ || (0, _getPrototypeOf2.default)(VoxsnapEventSkipBackwards)).call(this, "skip_backwards", player));
    }

    return VoxsnapEventSkipBackwards;
}(VoxsnapEventAudio);
/**
 * @class VoxsnapEventLoading
   @description Emitted when player starts or stops loading audio. The actial state is found in this.isLoading
   @property {boolean} isLoading if true, then the player is loading more audio
 */


var VoxsnapEventLoading = function (_VoxsnapEventAudio7) {
    (0, _inherits3.default)(VoxsnapEventLoading, _VoxsnapEventAudio7);

    function VoxsnapEventLoading(player) {
        var isLoading = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        (0, _classCallCheck3.default)(this, VoxsnapEventLoading);

        var _this10 = (0, _possibleConstructorReturn3.default)(this, (VoxsnapEventLoading.__proto__ || (0, _getPrototypeOf2.default)(VoxsnapEventLoading)).call(this, "loading", player));

        _this10.isLoading = isLoading;
        _this10.send = false;
        return _this10;
    }

    return VoxsnapEventLoading;
}(VoxsnapEventAudio);

var VoxsnapEventSessionEnd = function (_VoxsnapEventAudio8) {
    (0, _inherits3.default)(VoxsnapEventSessionEnd, _VoxsnapEventAudio8);

    /**
     * 
     * @param {VoxsnapPlayer} player
     */
    function VoxsnapEventSessionEnd(player) {
        (0, _classCallCheck3.default)(this, VoxsnapEventSessionEnd);

        /** @type {Array<Array<number>>} **/
        var _this11 = (0, _possibleConstructorReturn3.default)(this, (VoxsnapEventSessionEnd.__proto__ || (0, _getPrototypeOf2.default)(VoxsnapEventSessionEnd)).call(this, "session_end", player));

        var ranges = [];
        try {
            /** @type {TimeRanges} **/
            var played = player.audio.played;
            for (var i = 0, l = played.length; i < l; ++i) {
                ranges.push([played.start(i), played.end(i)]);
            }
        } catch (e) {
            // audio.played not supported
            _this11.playRangesNotSupported = e.message;
        }
        _this11.playRanges = ranges;
        return _this11;
    }

    return VoxsnapEventSessionEnd;
}(VoxsnapEventAudio);

var AdditionalEventInfoGroup = function () {
    function AdditionalEventInfoGroup() {
        (0, _classCallCheck3.default)(this, AdditionalEventInfoGroup);

        /** @type {Array<Object>} **/
        this.infos = [];
        Object.defineProperty(this, "infos", { enumerable: false });
    }
    /**
     * Adds new value to the info array
     * @param {string} key
     * @param {object|string|number} value
     */


    (0, _createClass3.default)(AdditionalEventInfoGroup, [{
        key: "addValue",
        value: function addValue(key, value) {
            this.addObject((0, _defineProperty3.default)({}, key, value));
        }
    }, {
        key: "addObject",
        value: function addObject(object) {
            if (object instanceof Array) {
                throw new Error("Arrays not allowed in param root.");
            }
            this.infos.push(object);
        }
        /**
         * Removes key from all registered info blocks. The key can be string or chain of strings. This allows you to remove nested keys.
         * @param {Array<string>} namePath
         */

    }, {
        key: "removeKey",
        value: function removeKey(namePath) {
            if (typeof namePath == "string") {
                namePath = [namePath];
            }
            // empty entries will be deleted
            var deleteIndexes = [];
            this.infos.forEach(function (entry, index) {
                var topEntry = entry;
                var parentChain = null;
                var parentChainStep = parentChain;
                for (var i = 0, l = namePath.length - 1; i < l && (typeof entry === "undefined" ? "undefined" : (0, _typeof3.default)(entry)) == "object"; ++i) {
                    var name = namePath[i];
                    parentChainStep[name] = { parentStep: parentChainStep, realParent: entry, realChild: entry[name], childName: name };
                    parentChainStep = parentChainStep[name];
                    entry = entry[name];
                }
                if (typeof entry == "undefined" || entry == null) {
                    return;
                }
                delete entry[namePath[namePath.length - 1]];
                // try to find out if there are remaining entries
                if (typeof _keys2.default == "function") {
                    while (entry != null && parentChainStep != null) {
                        if ((0, _keys2.default)(entry).length == 0) {
                            var parentObj = parentChainStep.realParent;
                            var _name = parentChainStep.childName;
                            delete parentObj[_name];
                            parentChainStep = parentChainStep.parentStep;
                            entry = parentObj;
                        } else {
                            break;
                        }
                    }
                    if ((0, _keys2.default)(topEntry).length == 0) {
                        deleteIndexes.push(index);
                    }
                }
            });
            deleteIndexes.sort();

            for (var i = deleteIndexes.length - 1; i >= 0; --i) {
                voxole.log(i, deleteIndexes);
                this.infos.splice(deleteIndexes[i], 1);
            }
        }
        /**
         * Removes all instances of object from info. The object must be root object
         * @param {any} object
         */

    }, {
        key: "removeObject",
        value: function removeObject(object) {
            for (var i = 0, l = this.infos.length; i < l; ++i) {
                if (this.infos[i] == object) {
                    this.infos.splice(i, 1);
                    --i;--l;
                }
            }
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return (0, _stringify2.default)(this.details);
        }
    }, {
        key: "details",
        get: function get() {
            var concatObj = {};
            for (var i = 0, l = this.infos.length; i < l; ++i) {
                /** @type {Object} **/
                var info = this.infos[i];
                cloneInto(null, info, concatObj);
            }
            return concatObj;
        }
    }, {
        key: "isEmpty",
        get: function get() {
            if (this.infos.length == 0) return true;else if (typeof _keys2.default == "function" && (0, _keys2.default)(this.details).length == 0) {
                return true;
            }
            return false;
        }
    }]);
    return AdditionalEventInfoGroup;
}();

function cloneInto(name, sourceObject, targetObject) {
    if (name == null) {
        for (var i in sourceObject) {
            cloneInto(i, sourceObject, targetObject);
        }
        return;
    }

    var prop = sourceObject[name];
    if (prop instanceof Array) {
        /** @type {Array} **/
        var array = targetObject[name] instanceof Array ? targetObject[name] : [];
        targetObject[name] = array;

        var tmpSrc = { name: null };
        for (var _i = 0, l = prop.length; _i < l; ++_i) {
            tmpSrc.name = prop[_i];
            var tmpDst = {};
            cloneInto("name", tmpSrc, tmpDst);
            if (typeof tmpDst.name != "undefined" && tmpDst.name != null) {
                array.push(tmpDst.name);
            }
        }
    } else if ((typeof prop === "undefined" ? "undefined" : (0, _typeof3.default)(prop)) == "object") {
        var object = {};
        if ((0, _typeof3.default)(targetObject[name]) != "object") {
            var ctor = Object;
            if (typeof prop.constructor == "function") ctor = prop.constructor;

            try {
                targetObject[name] = object = new ctor();
            } catch (e) {
                voxole.warn("Failed to clone object", prop);
                targetObject[name] = object;
            }
        } else {
            object = targetObject[name];
        }

        for (var name in prop) {
            if (prop.hasOwnProperty(name)) {
                cloneInto(name, prop, object);
            }
        }
    } else {
        targetObject[name] = prop;
    }
}
exports.VoxsnapEvent = VoxsnapEvent;
exports.VoxsnapEventShare = VoxsnapEventShare;
exports.VoxsnapEventAudio = VoxsnapEventAudio;
exports.VoxsnapEventTimeUpdate = VoxsnapEventTimeUpdate;
exports.VoxsnapEventTimeUpdateThrottled = VoxsnapEventTimeUpdateThrottled;
exports.VoxsnapEventPause = VoxsnapEventPause;
exports.VoxsnapEventPlay = VoxsnapEventPlay;
exports.VoxsnapEventSeek = VoxsnapEventSeek;
exports.VoxsnapEventLoading = VoxsnapEventLoading;
exports.VoxsnapEventSkipForward = VoxsnapEventSkipForward;
exports.VoxsnapEventSkipBackwards = VoxsnapEventSkipBackwards;
exports.VoxsnapEventSessionEnd = VoxsnapEventSessionEnd;
exports.AdditionalEventInfoGroup = AdditionalEventInfoGroup;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _setPrototypeOf = __webpack_require__(62);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _typeof2 = __webpack_require__(12);

var _typeof3 = _interopRequireDefault(_typeof2);

var _parseInt = __webpack_require__(55);

var _parseInt2 = _interopRequireDefault(_parseInt);

var _getPrototypeOf = __webpack_require__(7);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = __webpack_require__(9);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _regenerator = __webpack_require__(11);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = __webpack_require__(20);

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = __webpack_require__(10);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _VoxConsole = __webpack_require__(0);

var _VoxConsole2 = _interopRequireDefault(_VoxConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voxole = _VoxConsole2.default.console;

var AsyncAnimationFrame = function () {
    function AsyncAnimationFrame() {
        (0, _classCallCheck3.default)(this, AsyncAnimationFrame);

        /** @type {function(Error):void} **/
        this.rejectCallback = null;
        /** @type {Promise<void>} **/
        this.promise = null;
        /** @type {function():void} **/
        this.resolveCallback = null;
    }

    (0, _createClass3.default)(AsyncAnimationFrame, [{
        key: "next",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var _this = this;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (this.blocked) {
                                    new ErrorFrameCanceled("Frame generator blocked!");
                                }

                                if (!this.promise) {
                                    this.promise = new _promise2.default(function (resolve, reject) {
                                        _this.rejectCallback = reject;
                                        _this.resolveCallback = resolve;
                                    });
                                    this.frameId = requestAnimationFrame(function () {
                                        _this.frameReceived();
                                    });
                                }
                                _context.next = 4;
                                return this.promise;

                            case 4:
                                return _context.abrupt("return", _context.sent);

                            case 5:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function next() {
                return _ref.apply(this, arguments);
            }

            return next;
        }()
    }, {
        key: "frameReceived",
        value: function frameReceived() {
            this.resolveCallback();

            this.rejectCallback = null;
            this.promise = null;
            this.resolveCallback = null;
        }
        /**
         *
         * @param {boolean} forever if true, any further .next calls willt hrow error as well
         */

    }, {
        key: "cancel",
        value: function cancel(forever) {
            cancelAnimationFrame(this.frameId);
            if (this.rejectCallback) {
                this.rejectCallback(new ErrorFrameCanceled("Frame cancelled!"));
            }
            this.rejectCallback = null;
            this.promise = null;
            this.resolveCallback = null;

            if (forever) {
                this.blocked = true;
            }
        }
    }]);
    return AsyncAnimationFrame;
}();

var ErrorFrameCanceled = function (_Error) {
    (0, _inherits3.default)(ErrorFrameCanceled, _Error);

    function ErrorFrameCanceled() {
        (0, _classCallCheck3.default)(this, ErrorFrameCanceled);
        return (0, _possibleConstructorReturn3.default)(this, (ErrorFrameCanceled.__proto__ || (0, _getPrototypeOf2.default)(ErrorFrameCanceled)).apply(this, arguments));
    }

    return ErrorFrameCanceled;
}(Error);

/**
 * @typedef {number[]} WaveformArray an aray of pairs of signed bytes, each pair is max and min amplitude in sample
 */
/**
 * @typedef {Object} WaveformData
 * @property {WaveformArray} data
 */

/**
 * @typedef {Object} WaveformCanvasSettings
 * @property {number|3} bar_size
 * @property {number|3} space_size
 * @property {string} color Color of the bars, if second color is specified, gradient will be created
 * @property {string} color2 Second color, if this is set, gradient will be drawn
 * @property {boolean} animate If true, once a set of values is received, it will be animated.
 * @property {boolean} animate If this is true it also means that 50% waveform will be drawn immediatelly
 * @property {AsyncAnimationFrame} animation this is used to tell the rest of the program that the canvas is animating.
 *
 **/
/** @type {WaveformCanvasSettings} **/


var SETTINGS_DEFAULT = {
    bar_size: 3,
    space_size: 3,
    animate: false,
    color: "rgb(255, 0, 0)"
    //https://regex101.com/r/qWoasr/1
};var COLOR_HELPER_REGEX = /(?:(\#)([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})|(rgba?)\(([0-9]{1,3}), *([0-9]{1,3}), *([0-9]{1,3})(?:, *([0-9]{1,3}))?\))/i;

var ColorHelper = function () {
    /**
     *
     * @param {string|[number, number, number, number]} color
     */
    function ColorHelper(color) {
        (0, _classCallCheck3.default)(this, ColorHelper);

        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.alpha = 1;

        if (typeof color == "string") {
            var match = COLOR_HELPER_REGEX.exec(color);
            if (!match) {
                throw new Error("Invalid color: " + color + "!");
            }

            switch (match[1]) {
                case "#":
                    {
                        this.r = (0, _parseInt2.default)(match[2], 16);
                        this.g = (0, _parseInt2.default)(match[3], 16);
                        this.b = (0, _parseInt2.default)(match[4], 16);
                        break;
                    }
                case "rgba":
                case "rgb":
                    {
                        this.r = 1 * match[6];
                        this.g = 1 * match[7];
                        this.b = 1 * match[8];
                        if (match[1] == "rgba") {
                            this.alpha = 1 * match[9];
                        }
                        break;
                    }
                default:
                    {
                        voxole.error(color, match[1], match);
                        throw new Error("Invalid color: " + color);
                    }
            }
        } else if (color instanceof Array && color.length > 2) {
            this.r = color[0];
            this.g = color[1];
            this.b = color[2];
            if (color.length > 3) this.alpha = color[3];
        } else {
            throw new Error("Invalid color!");
        }
    }

    (0, _createClass3.default)(ColorHelper, [{
        key: "toString",
        value: function toString() {
            return "rgba(" + ~~this.r + ", " + ~~this.g + ", " + ~~this.b + ", " + this.alpha + ")";
        }
    }]);
    return ColorHelper;
}();

var LinearGradientHelper = function () {
    /**
     *
     * @param {ColorHelper} color1
     * @param {ColorHelper} color2
     */
    function LinearGradientHelper(color1, color2) {
        (0, _classCallCheck3.default)(this, LinearGradientHelper);

        this.color1 = color1;
        this.color2 = color2;
    }
    /**
     * Returns color at fraction from 0 (0%) to 1 (100%)
     * @param {number} fraction
     * @returns {ColorHelper}
     */


    (0, _createClass3.default)(LinearGradientHelper, [{
        key: "colorAt",
        value: function colorAt(fraction) {
            var antiFrac = 1 - fraction;
            return new ColorHelper([this.color1.r * fraction + this.color2.r * antiFrac, this.color1.g * fraction + this.color2.g * antiFrac, this.color1.b * fraction + this.color2.b * antiFrac, this.color1.alpha * fraction + this.color2.alpha * antiFrac]);
        }
    }]);
    return LinearGradientHelper;
}();

var ResampledCache =
/**
 *
 * @param {number} width
 * @param {number} barWidth
 * @param {number} spaceWidth
 * @param {Float32Array} data
 */
function ResampledCache(width, barWidth, spaceWidth, data) {
    (0, _classCallCheck3.default)(this, ResampledCache);

    this.width = width;
    this.data = data;
    this.bar = barWidth;
    this.space = spaceWidth;
};

var ResampledData = function () {
    /**
     *
     * @param {Uint8Array} sourceData
     */
    function ResampledData(sourceData) {
        (0, _classCallCheck3.default)(this, ResampledData);

        this.source = sourceData;
        /** @type {ResampledCache[]} **/
        this.cache = [];

        this.maxCache = 3;
        this.hysteresis = 1;
    }
    /**
     *
     * @param {WaveformRenderer} renderer
     * @param {number} targetWidth
     * @param {WaveformCanvasSettings} settings
     */


    (0, _createClass3.default)(ResampledData, [{
        key: "getResampled",
        value: function getResampled(renderer, targetWidth, settings) {
            var index = this.cache.findIndex(function (cacheItem) {
                return cacheItem.width == targetWidth && cacheItem.space == settings.space_size && cacheItem.bar == settings.bar_size;
            });
            if (index >= 0) {
                var result = this.cache[index];
                if (index != 0) {
                    this.cache.splice(index, 1);
                    this.cache.unshift(result);
                }
                return result.data;
            } else {
                var data = renderer.recalculateDataForWidth(this.source, targetWidth, settings.bar_size, settings.space_size);
                var item = new ResampledCache(targetWidth, settings.bar_size, settings.space_size, data);
                this.cache.unshift(item);
                if (this.cache.length > this.maxCache + this.hysteresis) {
                    this.cache.splice(this.maxCache + 1);
                }
                return data;
            }
        }
    }]);
    return ResampledData;
}();

/**
 * @description Renders waveform data on canvas
 */


var WaveformRenderer = function () {
    /**
     *
     * @param {WaveformData|Int8Array} waveform_data
     */
    function WaveformRenderer(waveform_data) {
        var normalize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        (0, _classCallCheck3.default)(this, WaveformRenderer);

        this._data = null;
        if (waveform_data) {
            this.data = waveform_data;
        }
        this.normalized = !!normalize || true;
        /** @type {{canvas:HTMLCanvasElement,settings:WaveformCanvasSettings}[]} **/
        this.targets = [];
        this.cachedData = {
            data: null,
            width: NaN
        };
    }
    /**
     *
     * @param {WaveformData|Int8Array} waveform_data
     */


    (0, _createClass3.default)(WaveformRenderer, [{
        key: "getDataAsync",
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!this.data) {
                                    _context2.next = 4;
                                    break;
                                }

                                return _context2.abrupt("return", this.data);

                            case 4:
                                if (!this.dataPromise) {
                                    _context2.next = 9;
                                    break;
                                }

                                _context2.next = 7;
                                return this.dataPromise;

                            case 7:
                                this.data = _context2.sent;
                                return _context2.abrupt("return", this.data);

                            case 9:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getDataAsync() {
                return _ref2.apply(this, arguments);
            }

            return getDataAsync;
        }()
        /**
         *
         * @param {ResampledData} oldData
         */

    }, {
        key: "redrawAll",
        value: function redrawAll(oldData) {
            for (var i = 0, l = this.targets.length; i < l; ++i) {
                var item = this.targets[i];
                this.drawOnCanvas(item.canvas, item.settings, oldData);
            }
        }
        /**
         *
         * @param {HTMLCanvasElement} canvas
         * @param {WaveformCanvasSettings} settings
         * @param {ResampledData} oldData
         */

    }, {
        key: "drawOnCanvas",
        value: function drawOnCanvas(canvas, settings, oldData) {
            canvas.width = canvas.getBoundingClientRect().width;

            if (!this._data && !settings.animate) {
                voxole.warn("No render. No data.");
                return;
            }
            var data;
            if (this._data) {
                data = this._data.getResampled(this, canvas.width, settings);
            }
            //voxole.log(data, oldData);
            if (typeof oldData != "undefined" && settings.animate) {
                voxole.info("Animation mode.");
                if (settings.animation) {
                    settings.animation.cancel(true);
                }
                var resampledOldData = 127;
                if (oldData instanceof Uint8Array) {
                    resampledOldData = this.recalculateDataForWidth(oldData, canvas.width, settings.bar_size, settings.space_size);
                } else if (oldData instanceof ResampledData) {
                    resampledOldData = oldData.getResampled(this, canvas.width, settings);
                }

                this.animateCanvasToNewData(canvas, settings, resampledOldData, data);
            } else {
                this.drawDataOnContext(canvas.getContext("2d"), data, settings);
            }
        }
        /**
         *
         * @param {CanvasRenderingContext2D} ctx
         * @param {Float32Array} data
         * @param {WaveformCanvasSettings} settings
         * @param {{progress:number,oldData:Float32Array}} animation
         */

    }, {
        key: "drawDataOnContext",
        value: function drawDataOnContext(ctx, data, settings, animation) {
            var maxbars = (ctx.canvas.width + settings.space_size) / (settings.bar_size + settings.space_size);
            var length = data ? data.length : Math.floor(maxbars);
            var maxHeight = ctx.canvas.height;
            var maxAmplitude = 255;

            //voxole.log("Draw data: ", data?data.length:null,length);

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            ctx.fillStyle = settings.color;

            var gradient = null;
            if (settings.color2) {
                gradient = new LinearGradientHelper(new ColorHelper(settings.color), new ColorHelper(settings.color2));
            }

            var animationOldData = animation && animation.oldData instanceof Float32Array ? animation.oldData : null;

            for (var i = 0; i < length; ++i) {
                if (gradient) {
                    ctx.fillStyle = gradient.colorAt(1 - i / length) + "";
                }
                var item = data ? data[i] : 127;
                // Creates linear transition value between old and new values
                if (animation) {
                    var oldDataValue = 127;
                    if (animationOldData) {
                        if (animationOldData.length > i) {
                            oldDataValue = animationOldData[i];
                        } else {
                            oldDataValue = item;
                        }
                    }

                    item = item * animation.progress + oldDataValue * (1 - animation.progress);
                }

                var drawStartX = i * settings.bar_size + i * settings.space_size;
                var height = item / maxAmplitude * maxHeight;
                ctx.fillRect(drawStartX, maxHeight - height, settings.bar_size, height);
            }
        }
        /**
         *
         * @param {HTMLCanvasElement|CanvasRenderingContext2D} canvas
         * @param {WaveformCanvasSettings} settings
         * @param {Float32Array|null} oldData
         * @param {Float32Array} newData
         */

    }, {
        key: "animateCanvasToNewData",
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(canvas, settings, oldData, newData) {
                var animation, timeStart, progress, duration, ctx, animationSettings, timeNow, delta;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                animation = new AsyncAnimationFrame();

                                settings.animation = animation;
                                //voxole.log("Animation started!", oldData, newData);
                                _context3.prev = 2;
                                timeStart = new Date().getTime();
                                progress = 0;
                                duration = 800; //ms

                                ctx = canvas instanceof CanvasRenderingContext2D ? canvas : canvas.getContext("2d");

                                canvas = canvas instanceof HTMLCanvasElement ? canvas : ctx.canvas;

                                animationSettings = {
                                    progress: 0
                                };

                                if (oldData instanceof Float32Array) {
                                    animationSettings.oldData = oldData;
                                }

                                //voxole.log("ANIMATION DATA LENGTH: old:", oldData ? animationSettings.oldData.length:null," new: ", newData.length)

                            case 10:
                                if (!(animationSettings.progress < 1)) {
                                    _context3.next = 20;
                                    break;
                                }

                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                this.drawDataOnContext(ctx, newData, settings, animationSettings);

                                _context3.next = 15;
                                return animation.next();

                            case 15:
                                timeNow = new Date().getTime();
                                delta = timeNow - timeStart;

                                animationSettings.progress = delta / duration;
                                _context3.next = 10;
                                break;

                            case 20:
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                this.drawDataOnContext(ctx, newData, settings);
                                _context3.next = 30;
                                break;

                            case 24:
                                _context3.prev = 24;
                                _context3.t0 = _context3["catch"](2);

                                voxole.log("Animation error: ", _context3.t0);

                                if (_context3.t0 instanceof ErrorFrameCanceled) {
                                    _context3.next = 30;
                                    break;
                                }

                                if (settings.animation == animation) {
                                    settings.animation = null;
                                }
                                throw _context3.t0;

                            case 30:
                                if (settings.animation == animation) {
                                    settings.animation = null;
                                }

                            case 31:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[2, 24]]);
            }));

            function animateCanvasToNewData(_x2, _x3, _x4, _x5) {
                return _ref3.apply(this, arguments);
            }

            return animateCanvasToNewData;
        }()
        /**
         *
         * @param {HTMLCanvasElement} canvas
         * @param {WaveformCanvasSettings} settings
         */

    }, {
        key: "bindToCanvas",
        value: function bindToCanvas(canvas, settings) {
            if ((typeof settings === "undefined" ? "undefined" : (0, _typeof3.default)(settings)) != "object") {
                settings = SETTINGS_DEFAULT;
            } else {
                (0, _setPrototypeOf2.default)(settings, SETTINGS_DEFAULT);
            }
            this.targets.push({
                canvas: canvas,
                settings: settings
            });
            this.drawOnCanvas(canvas, settings);
        }
        /**
         * Recalculates waveform data for given width of canvas
         * @param {number} canvasWidth Image width in pixels
         * @param {number} barWidth Width of waveform bars
         * @param {number} spaceWidth Width of spaces between bars
         * @returns {Float32Array} recalculated bytes
         */

    }, {
        key: "recalculateForWidth",
        value: function recalculateForWidth(canvasWidth, barWidth, spaceWidth) {
            return this.recalculateDataForWidth(this.data, canvasWidth, barWidth, spaceWidth);
        }

        /**
         * Recalculates waveform data for given width of canvas
         * @param {Uint8Array} data
         * @param {number} canvasWidth Image width in pixels
         * @param {number} barWidth Width of waveform bars
         * @param {number} spaceWidth Width of spaces between bars
         * @returns {Float32Array} recalculated bytes
         */

    }, {
        key: "recalculateDataForWidth",
        value: function recalculateDataForWidth(data, canvasWidth, barWidth, spaceWidth) {
            var no_items = Math.floor((canvasWidth + spaceWidth) / (barWidth + spaceWidth));
            var result = new Float32Array(no_items);
            var ratio = data.length / no_items;

            var smooth_mod = 1 + 1 / ratio;

            var debug = false;

            for (var i = 0, l = result.length; i < l; ++i) {
                var truePosition = i * ratio;
                var translatedIndexStart = Math.max(0, Math.floor((i - smooth_mod) * ratio));
                var translatedIndexStop = Math.min(data.length - 1, Math.ceil((i + smooth_mod) * ratio));
                if (debug) voxole.log("Generating sample from ", truePosition, " which is between", translatedIndexStart, "and", translatedIndexStop);
                var range = translatedIndexStop - translatedIndexStart;
                var halfRange = Math.ceil(range / 2);

                var sum = 0;
                var count = 0;
                var dbgSamples = [];
                var dbgSamplesFactored = [];

                for (var j = translatedIndexStart, lj = translatedIndexStop; j <= lj; ++j) {
                    var item = data[j];
                    var distance = Math.abs(j - truePosition);
                    //const distanceSq = distance * distance;
                    if (distance > halfRange) {
                        distance = halfRange;
                        //voxole.error("ble  " + distance + ">" + halfRange + "  (range:" + range + "; pos:" + truePosition + ")");
                    }
                    var distanceFactor = 1 - distance / halfRange;

                    var itemFactored = item * distanceFactor;

                    if (debug) {
                        dbgSamples.push(item);
                        dbgSamplesFactored.push(itemFactored);
                    }

                    sum += itemFactored;
                    count += 1 * distanceFactor;
                }
                var resultValue = sum / count;
                result[i] = resultValue;
                if (debug) voxole.log("Factored ", dbgSamples.length, "samples into one sample: ", resultValue, ". Inputs before and after factoring: ", dbgSamples, dbgSamplesFactored, "\n");
            }
            return result;
        }
        /**
         * Calculates amplitudes from amplitude ranges.
         * @param {Int8Array} ranges
         * @returns {Uint8Array}
         */

    }, {
        key: "calculateAmplitudes",
        value: function calculateAmplitudes(ranges) {
            if (ranges.length % 2 != 0) {
                throw new Error("Provided range array does not contain even count of values!");
            }
            var result = new Uint8Array(ranges.length / 2);
            var min = Infinity;
            var max = -Infinity;
            for (var i = 0, l = ranges.length; i < l; i += 2) {
                var index = i / 2;
                var value = Math.abs(ranges[i] - ranges[i + 1]);
                if (value > max) {
                    max = value;
                }
                if (value < min) {
                    min = value;
                }
                result[index] = value;
            }

            if (this.normalized) {
                var range = max - min;
                voxole.log("[VOXSNAP][WAVEFORM] Normalizing range |<", min, ",", max, ">|=", range);
                for (var _i = 0, _l = result.length; _i < _l; ++_i) {
                    var item = result[_i];
                    result[_i] = ~~((item - min) / range * 255);
                }
            }
            return result;
        }
    }, {
        key: "data",
        set: function set(waveform_data) {
            var oldData = this._data;
            if (waveform_data.data) {
                this._data = new ResampledData(this.calculateAmplitudes(waveform_data.data));
            } else if (waveform_data instanceof Int8Array) {
                this._data = new ResampledData(this.calculateAmplitudes(waveform_data));
            } else {
                throw new Error("Invalid data passed to WaveformRenderer!");
            }
            this.cachedData.width = NaN;

            voxole.info("Data update", oldData, "->", waveform_data);
            this.redrawAll(oldData);
        }
        /**
         * @type {ResampledData}
         * */
        ,
        get: function get() {
            return this._data;
        }
    }]);
    return WaveformRenderer;
}();

exports.default = WaveformRenderer;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(11);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(10);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _parseInt = __webpack_require__(55);

var _parseInt2 = _interopRequireDefault(_parseInt);

var _isNan = __webpack_require__(54);

var _isNan2 = _interopRequireDefault(_isNan);

var _stringify = __webpack_require__(36);

var _stringify2 = _interopRequireDefault(_stringify);

var _VoxConsole = __webpack_require__(0);

var _VoxConsole2 = _interopRequireDefault(_VoxConsole);

var _VoxsnapPlayer = __webpack_require__(82);

var _VoxsnapPlayer2 = _interopRequireDefault(_VoxsnapPlayer);

var _Library = __webpack_require__(53);

var LibraryAPI = _interopRequireWildcard(_Library);

var _Promises = __webpack_require__(22);

var Promises = _interopRequireWildcard(_Promises);

var _Polyfill = __webpack_require__(34);

var Polyfill = _interopRequireWildcard(_Polyfill);

var _Playlist = __webpack_require__(81);

var _ResourcePath = __webpack_require__(35);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voxole = _VoxConsole2.default.console;

var VOXSNAP_PLAYER_BUILD =  true ? 74 : "DEVELOPMENT-UNDEFINED";
var VOXSNAP_IS_WEBPACKED = "number" != "undefined";
// old script loader defined at the top of the document, as to increase
// odds that it will work upon error
// @TODO: set correct player URL here
var OLD_PLAYER_URL = "https://data.voxsnap.com/player/v1/voxsnap_compat.js";
var VOXSNAP_DATA = "https://data.voxsnap.com";
window.VOXSNAP_DATA = VOXSNAP_DATA;
function loadOldPlayer(error) {
    // try to clear up any HTML bloat
    {
        var player_container = document.getElementById("voxsnap-player");
        if (player_container != null) player_container.innerHTML = "";
    }
    function logError(error) {
        console.warn("[VOXSNAP] Error ", error.message, "\n", error.stack);
        try {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://data.voxsnap.com/events/");
            // @TODO add useful info
            xhr.send((0, _stringify2.default)([{
                eventName: "error",
                message: error.message,
                userAgent: navigator.userAgent,
                buildNumber: VOXSNAP_PLAYER_BUILD,
                fatal: true
            }]));
        } catch (exception) {
            /** cannot do anything if even reporting the error fails **/
            // @TODO make this message more useful
            console.error("[VOXSNAP] Failed to report error to the server. If you see this message please tell someone.");
        }
    }
    logError(error);
    // Load the player
    var script = document.createElement("script");
    //script.addEventListener("load", resolve);
    // @TODO: report failure to load old player
    //script.addEventListener("error", reject);
    script.setAttribute("async", "async");

    // pass data params
    try {
        var params = getVoxsnapParams();
        script.setAttribute("data-username", params.USERNAME);
        script.setAttribute("data-narration", params.NARRATION);
    } catch (e) {
        e.message = "CANNOT PASS DATA PARAMETERS. Error: " + e.message;
        logError(e);
    }
    script.setAttribute("src", OLD_PLAYER_URL);
    document.documentElement.appendChild(script);
}
// crude error detection that should load the old player in case of runtime error (after the player is loaded)
window.addEventListener("error", function (error) {
    //console.log("IE ERROR: ", error);
    if (typeof error.filename == "string" && error.filename.indexOf("voxsnap") != -1) {
        var realError = error.error || new Error("UNKNOWN");
        console.log("Error ", realError.error, " happened in voxsnap file: ", error.filename, "\n", realError.stack);

        loadOldPlayer(realError);
    }
});

function getCurrentScript() {
    var script;
    if (getCurrentScript.cache) {
        return getCurrentScript.cache;
    } else if (document.currentScript) {
        script = document.currentScript;
    } else {
        var i = document.scripts.length;
        while (i-- > 0) {
            if (/\/voxsnap(\.min|_player_fast|.oop|_player_oop)?\.js/i.exec(document.scripts[i].src)) {
                script = document.scripts[i];
                break;
            }
        }
    }
    return script;
}
getCurrentScript.cache = getCurrentScript();

var SCRIPT_PARAMS_REGEX = /\/v[0-9\.]+\/([^\/]+)\/([^\/]+)\//i;
/**
  * @typedef {Object} VoxsnapParams
  * @property {string} USERNAME
  * @property {string} NARRATION
  * @property {string} username
  * @property {string} narration
  * @property {number|string} playlist
  * @property {""} pro If set, this is the pro version player
**/
/**
 * @returns {VoxsnapParams}
 */
function getVoxsnapParams() {
    var CURRENT_SCRIPT = getCurrentScript();
    /** @type {VoxsnapParams} **/
    var result = {};
    var match;
    if (match = SCRIPT_PARAMS_REGEX.exec(CURRENT_SCRIPT.src)) {

        result.USERNAME = match[1];
        result.NARRATION = match[2];
    }
    {
        for (var i = 0; i < CURRENT_SCRIPT.attributes.length; i++) {
            var attrib = CURRENT_SCRIPT.attributes[i];
            //console.log(attrib.name + " = " + attrib.value);
            if (attrib.name.indexOf("data-") == 0) {
                result[attrib.name.substr(5)] = attrib.value;
            }
        }
        if (result.username) result.USERNAME = result.username;
        if (result.narration) result.NARRATION = result.narration;

        return result;
    }
}

function loadCSS() {
    var player_version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "basic";


    var CSS_FILES = {
        pro: "player_style_pro.css",
        basic: "player_style_amp.css"
    };
    if (typeof CSS_FILES[player_version] != "string") {
        player_version = "basic";
    }

    if (!document.querySelector("#voxsnap-player-css")) {
        var link = document.createElement("link");
        link.id = "voxsnap-player-css";
        link.href = _ResourcePath.path + "css/" + CSS_FILES[player_version];
        link.rel = "stylesheet";

        document.head.appendChild(link);
    }
}

function formatTime(secDuration) {
    secDuration = Math.round(secDuration);
    var seconds = new String(secDuration % 60);
    var minutes = new String(Math.floor(secDuration / 60));
    if (seconds.length == 1) seconds = "0" + seconds;
    if (minutes.length == 1) minutes = "0" + minutes;
    return minutes + ":" + seconds;
}
window.formatTime = formatTime;

function requireMain() {

    //console.log("Starting voxsnap main!");

    var PARAMS_URL = getVoxsnapParams();

    loadCSS(PARAMS_URL.pro ? "pro" : "basic");
    //console.info("[VOXSNAP] Configuration from URL and data tags: ", PARAMS_URL);
    if (PARAMS_URL.playlist) {
        playlistMain(PARAMS_URL);
    } else if (PARAMS_URL.libraryurl) {
        libraryMain(PARAMS_URL);
    } else {
        //require.ensure(["voxsnap/VoxsnapPlayer", "voxsnap/Polyfill", "voxsnap/Promises"], voxsnapMain);
        voxsnapMain(PARAMS_URL);
    }
}
requireMain();
/**
 *
 * @param {VoxsnapParams} PARAMS_URL
 */
function voxsnapMain(PARAMS_URL) {
    try {
        var VOXSNAP_DEBUG = false;

        var USERNAME = PARAMS_URL.USERNAME;
        var NARRATION = PARAMS_URL.NARRATION;

        if (typeof USERNAME != "string" || USERNAME.length == 0 || typeof NARRATION != "string" || NARRATION.length == 0) {
            throw new Error("Company id (" + USERNAME + ") or article (" + NARRATION + ") is invalid.");
        }

        var default_container = document.querySelector("#voxsnap-player");
        if (default_container) {
            //console.log(VoxsnapPlayer);
            var player = new _VoxsnapPlayer2.default(USERNAME, NARRATION, PARAMS_URL.pro ? "pro" : null);
            player.createHTML();
            //await document.ready;
            player.appendTo(default_container);
            window.VOXSNAP_GLOBAL_INSTANCE = player;
            window.dispatchEvent(new Polyfill.CustomEvent("voxsnap-ready", { detail: player }));

            //(async function () {
            //    const LIBRARY = await player.LIBRARY_PROMISE;
            //    if (LIBRARY.narrations.length > 1) {
            //        const playlist = window.VOXSNAP_PLAYLIST = new Playlist(LIBRARY);
            //        playlist.usePlayer(player);
            //    }
            //})();
        }
    } catch (anyException) {
        loadOldPlayer(anyException);
    }
}
function libraryMain(PARAMS_URL) {
    try {
        var library = window.VOXSNAP_FEATURED = new LibraryAPI.Library(PARAMS_URL.libraryurl);
        var featured = window.VOXSNAP_LIBRARY = new LibraryAPI.Featured(PARAMS_URL.libraryurl);
        var introduction = window.VOXSNAP_INTRODUCTION = new LibraryAPI.Introduction(PARAMS_URL.libraryurl);
        var player = window.VOXSNAP_GLOBAL_INSTANCE = new _VoxsnapPlayer2.default();
        // note that these two methods act assynchronously
        player.createHTML();
        player.appendTo(document.querySelector("#voxsnap-player"));
        // player is not ready at this point

        library.usePlayer(player);
        featured.usePlayer(player);
        introduction.usePlayer(player);

        library.appendTo(document.querySelector("#voxsnap-library-items"));
        library.filterMenu.appendTo(document.querySelector("#voxsnap-library-filters"));
        featured.appendTo(document.querySelector("#voxsnap-featured-items"));
        introduction.appendTo(document.querySelector("#voxsnap-introduction-item"));
        /*** @TODO: this is dirty workaround **/
        library.filterMenu.html.addEventListener("click", function (event) {
            // try to find the <a> element
            /** @type {HTMLElement} **/
            var elm = event.target;
            while (elm != null && elm.classList) {
                if (elm.classList.contains("fltr-lst")) {
                    elm = null;
                    break;
                } else if (elm.classList.contains("fltr-itm") && !elm.classList.contains("fltr-btn")) {
                    break;
                }
                // without this this used to be an endless loop
                elm = elm.parentNode;
            }
            if (elm != null && elm.nodeType == 1) {
                if (elm.innerHTML.toLowerCase().replace(/[^a-z]/g, "") == "all") {
                    //document.querySelector(".lbr-ftd").style.display = "";
                    featured.html.parentNode.parentNode.style.display = "";
                    document.body.querySelector(".lbr-slc").style.display = "";
                } else {
                    //document.querySelector(".lbr-ftd").style.display = "none";
                    featured.html.parentNode.parentNode.style.display = "none";
                    document.body.querySelector(".lbr-slc").style.display = "none";
                }
            }
        });
    } catch (anyException) {
        throw anyException;
    }
}
/**
 *
 * @param {VoxsnapParams} PARAMS_URL
 */
function playlistMain(PARAMS_URL) {
    var _this = this;

    var player = window.VOXSNAP_GLOBAL_INSTANCE = new _VoxsnapPlayer2.default(undefined, undefined, PARAMS_URL.pro ? "pro" : null);
    // note that these two methods act assynchronously
    player.createHTML();
    player.appendTo(document.querySelector("#voxsnap-player"));

    var name, number;
    if (!(0, _isNan2.default)(number = (0, _parseInt2.default)(PARAMS_URL.playlist))) {
        name = PARAMS_URL.USERNAME;
    } else {
        number = undefined;
        name = PARAMS_URL.playlist;
    }

    var playlist = window.VOXSNAP_PLAYLIST = new _Playlist.Playlist(name, number, PARAMS_URL.pro ? "pro" : "basic");
    playlist.usePlayer(player);
    (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.t0 = playlist;
                        _context.next = 3;
                        return player.html_init_promise;

                    case 3:
                        _context.t1 = _context.sent.parentNode;

                        _context.t0.appendTo.call(_context.t0, _context.t1);

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }))();
}

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(104), __esModule: true };

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(38);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(1);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(135);
module.exports = __webpack_require__(1).Number.isNaN;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(136);
module.exports = parseInt;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(137);
var $Object = __webpack_require__(1).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(138);
var $Object = __webpack_require__(1).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(139);
var $Object = __webpack_require__(1).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(140);
module.exports = __webpack_require__(1).Object.getPrototypeOf;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(141);
module.exports = __webpack_require__(1).Object.keys;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(142);
module.exports = __webpack_require__(1).Object.setPrototypeOf;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(78);
__webpack_require__(79);
__webpack_require__(80);
__webpack_require__(143);
__webpack_require__(145);
__webpack_require__(146);
module.exports = __webpack_require__(1).Promise;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(144);
__webpack_require__(78);
__webpack_require__(147);
__webpack_require__(148);
module.exports = __webpack_require__(1).Symbol;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(79);
__webpack_require__(80);
module.exports = __webpack_require__(52).f('iterator');


/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(19);
var toLength = __webpack_require__(77);
var toAbsoluteIndex = __webpack_require__(132);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(30);
var gOPS = __webpack_require__(68);
var pIE = __webpack_require__(44);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(24);
var call = __webpack_require__(118);
var isArrayIter = __webpack_require__(116);
var anObject = __webpack_require__(13);
var toLength = __webpack_require__(77);
var getIterFn = __webpack_require__(133);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 114 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(23);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(25);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(23);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(13);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(42);
var descriptor = __webpack_require__(31);
var setToStringTag = __webpack_require__(32);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(18)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(33)('meta');
var isObject = __webpack_require__(15);
var has = __webpack_require__(17);
var setDesc = __webpack_require__(16).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(21)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var macrotask = __webpack_require__(76).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(23)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(16);
var anObject = __webpack_require__(13);
var getKeys = __webpack_require__(30);

module.exports = __webpack_require__(14) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(19);
var gOPN = __webpack_require__(67).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(4).parseInt;
var $trim = __webpack_require__(131).trim;
var ws = __webpack_require__(75);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(18);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(15);
var anObject = __webpack_require__(13);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(24)(Function.call, __webpack_require__(43).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(4);
var core = __webpack_require__(1);
var dP = __webpack_require__(16);
var DESCRIPTORS = __webpack_require__(14);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(48);
var defined = __webpack_require__(28);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
var defined = __webpack_require__(28);
var fails = __webpack_require__(21);
var spaces = __webpack_require__(75);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(48);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(63);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(25);
module.exports = __webpack_require__(1).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(109);
var step = __webpack_require__(121);
var Iterators = __webpack_require__(25);
var toIObject = __webpack_require__(19);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(66)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(6);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
var $parseInt = __webpack_require__(126);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(42) });


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(14), 'Object', { defineProperty: __webpack_require__(16).f });


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(19);
var $getOwnPropertyDescriptor = __webpack_require__(43).f;

__webpack_require__(45)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(49);
var $getPrototypeOf = __webpack_require__(69);

__webpack_require__(45)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(49);
var $keys = __webpack_require__(30);

__webpack_require__(45)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(6);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(128).set });


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(29);
var global = __webpack_require__(4);
var ctx = __webpack_require__(24);
var classof = __webpack_require__(63);
var $export = __webpack_require__(6);
var isObject = __webpack_require__(15);
var aFunction = __webpack_require__(27);
var anInstance = __webpack_require__(110);
var forOf = __webpack_require__(113);
var speciesConstructor = __webpack_require__(74);
var task = __webpack_require__(76).set;
var microtask = __webpack_require__(123)();
var newPromiseCapabilityModule = __webpack_require__(41);
var perform = __webpack_require__(71);
var promiseResolve = __webpack_require__(72);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(127)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(32)($Promise, PROMISE);
__webpack_require__(129)(PROMISE);
Wrapper = __webpack_require__(1)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(120)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(4);
var has = __webpack_require__(17);
var DESCRIPTORS = __webpack_require__(14);
var $export = __webpack_require__(6);
var redefine = __webpack_require__(73);
var META = __webpack_require__(122).KEY;
var $fails = __webpack_require__(21);
var shared = __webpack_require__(47);
var setToStringTag = __webpack_require__(32);
var uid = __webpack_require__(33);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(52);
var wksDefine = __webpack_require__(51);
var enumKeys = __webpack_require__(112);
var isArray = __webpack_require__(117);
var anObject = __webpack_require__(13);
var isObject = __webpack_require__(15);
var toIObject = __webpack_require__(19);
var toPrimitive = __webpack_require__(50);
var createDesc = __webpack_require__(31);
var _create = __webpack_require__(42);
var gOPNExt = __webpack_require__(125);
var $GOPD = __webpack_require__(43);
var $DP = __webpack_require__(16);
var $keys = __webpack_require__(30);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(67).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(44).f = $propertyIsEnumerable;
  __webpack_require__(68).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(29)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(18)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(6);
var core = __webpack_require__(1);
var global = __webpack_require__(4);
var speciesConstructor = __webpack_require__(74);
var promiseResolve = __webpack_require__(72);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(6);
var newPromiseCapability = __webpack_require__(41);
var perform = __webpack_require__(71);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51)('asyncIterator');


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51)('observable');


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(150);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 150 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
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
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
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

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
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
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
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

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

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
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
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

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
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
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

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
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ })
/******/ ]);