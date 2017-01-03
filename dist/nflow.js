(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:5000/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _nflow = __webpack_require__(1);
	
	var _nflow2 = _interopRequireDefault(_nflow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	if (global) global.nflow = global.nFlow = _nflow2['default']; // nFlow is now deprecated
	module.exports = _nflow2['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _factory = __webpack_require__(2);
	
	var _factory2 = _interopRequireDefault(_factory);
	
	var _consts = __webpack_require__(5);
	
	var _logger = __webpack_require__(8);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/**
	 * The nflow API is designed to be simple and easy to use.<br><br>
	 * Essentially, the heart of nflow is only 3 methods :<br>
	 *  - {@link flow.create|create},<br>
	 *  - {@link flow.on} and<br>
	 *  - {@link flow.emit}.<br><br>
	 * Since in nflow there is only one type of object, the same API applies to every object created or emitted.<br>
	 * Whether they are used as dispatchers, events, stores or controllers - they are the same type of objects and share the same API.<br>
	 * @namespace
	 * @type flow
	 * @name flow
	 *
	 */
	var root = (0, _factory2['default'])(_consts.DEFAULTS, 'flow', []);
	_logger2['default'].init(root);
	exports['default'] = root;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _behaviours = __webpack_require__(3);
	
	var _behaviours2 = _interopRequireDefault(_behaviours);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	exports['default'] = function (defaults, name, data) {
	  var flow = defaults.factory();
	
	  defaults.behaviours.forEach(function (d) {
	    _behaviours2['default'][d](flow, defaults, name, data);
	  });
	  return flow;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _cancellable = __webpack_require__(4);
	
	var _cancellable2 = _interopRequireDefault(_cancellable);
	
	var _connect = __webpack_require__(9);
	
	var _connect2 = _interopRequireDefault(_connect);
	
	var _create = __webpack_require__(10);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _emit = __webpack_require__(11);
	
	var _emit2 = _interopRequireDefault(_emit);
	
	var _identify = __webpack_require__(17);
	
	var _identify2 = _interopRequireDefault(_identify);
	
	var _listen = __webpack_require__(18);
	
	var _listen2 = _interopRequireDefault(_listen);
	
	var _loggable = __webpack_require__(19);
	
	var _loggable2 = _interopRequireDefault(_loggable);
	
	var _stateful = __webpack_require__(20);
	
	var _stateful2 = _interopRequireDefault(_stateful);
	
	var _stats = __webpack_require__(21);
	
	var _stats2 = _interopRequireDefault(_stats);
	
	var _disposable = __webpack_require__(22);
	
	var _disposable2 = _interopRequireDefault(_disposable);
	
	var _namespace = __webpack_require__(23);
	
	var _namespace2 = _interopRequireDefault(_namespace);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	exports['default'] = {
	  cancellable: _cancellable2['default'],
	  connect: _connect2['default'],
	  create: _create2['default'],
	  disposable: _disposable2['default'],
	  emit: _emit2['default'],
	  identify: _identify2['default'],
	  listen: _listen2['default'],
	  loggable: _loggable2['default'],
	  stateful: _stateful2['default'],
	  stats: _stats2['default'],
	  namespace: _namespace2['default']
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _consts = __webpack_require__(5);
	
	var _utils = __webpack_require__(6);
	
	exports['default'] = function (flow, defaults, name) {
	  /**
	   *
	   * Cancels the current {@link flow} node.<br><br>
	   *
	   * Cancelling has the following effects:<br>
	   *  - <b>All</b> child nodes of a cancelled node are also cancelled <b>recursively</b>.<br>
	   *  - Cancelled nodes cannot receive events.<br>
	   *  - Cancelled nodes cannot emit events.<br>
	   *  - Cancelled nodes cannot propagate events.<br>
	   *
	   * test
	   *  @codepen GjRaYQ
	   * @return {flow} flow - the current flow node
	   *
	   */
	  flow.cancel = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidCancelArgs);
	    var previousValue = flow.cancel.value;
	    flow.cancel.value = true;
	    (0, _utils.dispatchInternalEvent)(flow, 'cancel', true, previousValue);
	    return flow;
	  };
	  flow.cancel.value = false;
	
	  flow.isCancelled = function () {
	    return [flow].concat(flow.parents()).some(function (e) {
	      return e.status() === _consts.STATUS.CANCELLED || e.status() === _consts.STATUS.DISPOSED;
	    });
	  };
	
	  flow.stopPropagation = function () {
	    var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _consts.UNSET;
	
	    direction !== _consts.UNSET && (0, _utils.assert)(!_consts.DIRECTION[direction.toUpperCase()], _consts.ERRORS.invalidStopPropagationArgs);
	
	    if (direction === _consts.UNSET) {
	      flow.status.set(_consts.STATUS.STOPPED);
	      flow.emit.targets = [];
	      flow.stopPropagation.value = true;
	      flow.stopPropagation.modifiers[flow.target.guid] = -1; // bitmask fill
	      (0, _utils.dispatchInternalEvent)(flow, 'propagationStopped', true);
	    } else {
	      var d = _consts.DIRECTION[direction.toUpperCase()];
	      (0, _utils.dispatchInternalEvent)(flow, 'propagationAugmented', {
	        direction: d,
	        target: flow.target.toObj('name', 'guid')
	      });
	      flow.stopPropagation.modifiers[flow.target.guid.value] |= _consts.DIRECTION_BITMASK[d];
	    }
	    return flow;
	  };
	
	  flow.stopPropagation.value = false;
	  flow.stopPropagation.modifiers = {};
	  createStopPropagationModifiers(flow);
	
	  flow.propagationStopped = function () {
	    return flow.stopPropagation.value;
	  };
	};
	/*
	 *  create directional (eg. `flow.stopPropagation.dowsntream(...)`) API
	 */
	
	
	function createStopPropagationModifiers(flow) {
	  Object.keys(_consts.DIRECTION).forEach(function (direction) {
	    flow.stopPropagation[direction] = flow.stopPropagation[direction.toLowerCase()] = function () {
	      return flow.stopPropagation(direction);
	    };
	  });
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var UNSET = exports.UNSET = {};
	var DIRECTION = exports.DIRECTION = {
	  CURRENT: 'CURRENT',
	  NONE: 'CURRENT', // deprecated
	  DEFAULT: 'DEFAULT',
	  UPSTREAM: 'UPSTREAM',
	  DOWNSTREAM: 'DOWNSTREAM'
	};
	
	var DIRECTION_BITMASK = exports.DIRECTION_BITMASK = {
	  CURRENT: 1 << 0,
	  NONE: 1 << 0, // 1 deprecated
	  DEFAULT: 1 << 1, // 2
	  UPSTREAM: 1 << 2, // 4
	  DOWNSTREAM: 1 << 3 // 8
	};
	
	var STATUS = exports.STATUS = {
	  IDLE: 'IDLE',
	  FLOWING: 'FLOWING',
	  STOPPED: 'STOPPED',
	  COMPLETED: 'COMPLETED',
	  CANCELLED: 'CANCELLED',
	  DISPOSED: 'DISPOSED'
	};
	
	var DEFAULTS = exports.DEFAULTS = {
	  factory: function factory() {
	    return {};
	  },
	  behaviours: ['identify', 'stateful', 'connect', 'create', 'disposable', 'emit', 'listen', 'cancellable', 'loggable', 'stats', 'namespace'],
	  direction: DIRECTION.DEFAULT
	};
	var ERRORS = exports.ERRORS = {
	  invalidGuid: 'Invalid Argument. Guid-s are immutable. Please use the .name() API to change the name of a flow object.',
	  invalidChildren: 'Invalid Argument. Please use child.parent(parent) to re-parent flow objects.',
	  invalidListener: 'Invalid Arguments. Expected a String as the listenerName, got: %s',
	  invalidListenerType: 'Invalid Listener function. Expected a function, got: %s',
	  invalidEventName: 'Invalid Arguments. Please use .emit("foo", payload) to emit a flow event.',
	  invalidName: 'Invalid flow Name. Expected a String value, got: %s',
	  invalidParent: 'Invalid flow parent object. Expected a flow instance, got: %s',
	  invalidParents: 'Invalid Argument. Please use the child.parent(parent) API to re-parent flow objects.',
	  invalidStatus: 'Invalid Argument. The .status() API is read only',
	  invalidNamespaceArgs: 'Invalid Argument. The .namespace() API is read only',
	  invalidFullNamespace: 'Invalid Argument. The .namespace.match(full_ns) requires a full namespace array, got: %s',
	  invalidDisposeArgs: 'Invalid Argument. The .dispose() API requires no parameters',
	  invalidCancelArgs: 'Invalid Argument. The .cancel() API requires no parameters',
	  invalidStopPropagationArgs: 'Invalid Argument. The .stopPropagation(direction) API requires either no parameters or a valid flow direction(eg. flow.direction.UPSTREAM)',
	  invalidStopPropagationAugmentation: 'Invalid Argument. The .stopPropagation(direction) API can only be used on emitted events.',
	  invalidRoot: 'Invalid Argument. The .parents.root() API is read only',
	  invalidStatsArgs: 'Invalid Argument. The .stats() API requires an object'
	};
	
	var NS_SEPARATOR = exports.NS_SEPARATOR = ':';

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.serialise = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _serialiser = __webpack_require__(7);
	
	Object.defineProperty(exports, 'serialise', {
	  enumerable: true,
	  get: function get() {
	    return _serialiser.serialise;
	  }
	});
	exports.assert = assert;
	exports.isFlow = isFlow;
	exports.isInternal = isInternal;
	exports.createMatcher = createMatcher;
	exports.getLocalName = getLocalName;
	exports.detach = detach;
	exports.isDetached = isDetached;
	exports.flatten = flatten;
	exports.merge = merge;
	exports.invalidateListenerCache = invalidateListenerCache;
	exports.dispatchInternalEvent = dispatchInternalEvent;
	
	var _factory = __webpack_require__(2);
	
	var _factory2 = _interopRequireDefault(_factory);
	
	var _consts = __webpack_require__(5);
	
	var _logger = __webpack_require__(8);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	 *  utils
	 */
	function assert(condition, error, val) {
	  if (condition) {
	    throw new Error(error.replace('%s', val));
	  }
	  return condition;
	}
	
	function isFlow(flow) {
	  return flow && flow.name && flow.name.isFlow;
	}
	
	function isInternal(flow) {
	  return flow && flow.name && flow.name.isInternal;
	}
	
	function createMatcher(matcher) {
	  // match ALL
	  if (matcher === true) return function () {
	    return true;
	  };
	  // match NONE
	  if (matcher === null || matcher === undefined || matcher === false) return function () {
	    return false;
	  };
	  // match by name
	  if (typeof matcher === 'string') {
	    return function (f) {
	      return f.name() === matcher;
	    };
	  }
	  // match by regex
	  if ((typeof matcher === 'undefined' ? 'undefined' : _typeof(matcher)) === 'object' && matcher.test) return function (f) {
	    return matcher.test(f.name());
	  };
	  // match by instance
	  if (isFlow(matcher)) return function (f) {
	    return f === matcher;
	  };
	  // custom matcher
	  return matcher;
	}
	
	/**
	 * returns the Local Name fragment of a namespaced listener or node name.
	 * @example
	 * 'a:b:foo' -> 'foo'
	 * @param  {String} name Listener or node name
	 * @return {String} the local name segment
	 */
	function getLocalName(name) {
	  return name.split(_consts.NS_SEPARATOR).pop();
	}
	
	function detach(flow) {
	  flow.parent() && flow.parent().children.detach(flow);
	}
	
	function isDetached(flow) {
	  return !flow.parent() || !flow.parent().children.has(flow);
	}
	
	function flatten(array) {
	  return [].concat.apply([], array);
	}
	
	function merge(source, target) {
	  Object.keys(source).forEach(function (key) {
	    target[key] = source[key];
	  });
	}
	
	function invalidateListenerCache(flow) {
	  if (!flow) return;
	  updateListenerCache(flow);
	  flow.parents().forEach(updateListenerCache);
	}
	
	function updateListenerCache(node) {
	  node.on.listenerCache = {};
	  for (var key in node.on.listenerMap) {
	    node.on.listenerCache[getLocalName(key)] = true;
	  }
	  node.children().forEach(function (f) {
	    for (var _key in f.on.listenerCache) {
	      node.on.listenerCache[getLocalName(_key)] = true;
	    }
	  });
	}
	
	function dispatchInternalEvent(flow, name, newData, oldData) {
	  if (isIgnored(flow)) return;
	  if (isFlow(newData) && newData.name.isInternal) return;
	
	  var current = (0, _factory2['default'])(_consts.DEFAULTS, 'flow.' + name);
	  current.name.isInternal = true;
	  current.data.value = [newData, oldData];
	  current.parent.value = flow;
	  current.emit.current();
	
	  var up = (0, _factory2['default'])(_consts.DEFAULTS, 'flow.children.' + name);
	  up.name.isInternal = true;
	  up.data.value = [flow, newData, oldData];
	  up.parent.value = flow.parent();
	  up.emit.upstream();
	
	  var down = (0, _factory2['default'])(_consts.DEFAULTS, 'flow.parent.' + name);
	  down.name.isInternal = true;
	  down.data.value = [flow, newData, oldData];
	  flow.children().forEach(function (f) {
	    return f.emit.downstream(down);
	  });
	
	  _logger2['default'].log(flow, name, newData, oldData);
	}
	
	function isIgnored(flow) {
	  return flow.name.isInternal || [flow].concat(flow.parents()).some(function (e) {
	    return e.stats.value.ignore;
	  });
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var serialise = exports.serialise = function serialise(o) {
	  return JSON.stringify(o, replacer());
	};
	
	var RECURSION_LIMIT = 1024;
	
	function replacer() {
	  var stack = [];
	  var r = 0;
	  var i = void 0;
	  return function replacer(key, value) {
	    if (key === '') {
	      stack = [];
	      r = 0;
	    }
	    var val = parseValue(value);
	    if (val !== undefined) return val;
	    if (!value || RECURSION_LIMIT < ++r) return undefined;
	    i = stack.indexOf(value);
	    if (i < 0) return stack.push(value) && value;
	    return '*Recursive' + i;
	  };
	}
	
	function parseValue(value) {
	  switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
	    case 'function':
	      return ''.concat('function ', value.name || 'anonymous', '(', Array(value.length + 1).join(',arg').slice(1), ')');
	    case 'boolean':
	    case 'number':
	    case 'string':
	      return value;
	  }
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(6);
	
	var _consts = __webpack_require__(5);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var loggers = [];
	
	function log(flow, name, newData, oldData) {
	  if (!(0, _utils.isInternal)(flow)) {
	    loggers.forEach(function (f) {
	      f.isRemote ? f.logger(remoteLog(flow, name, newData, oldData), flow) : f.logger(flow, name, newData, oldData);
	    });
	    debug(flow, name, newData, oldData);
	  }
	}
	
	function debug(flow, name, newData, oldData) {
	  typeof global !== 'undefined' && global.__nflow_devtools_hook__ && global.__nflow_devtools_hook__(remoteLog(flow, name, newData, oldData), flow);
	}
	
	var propMap = {
	  'start': ['version', 'status'],
	  'cancel': ['status'],
	  'create': ['status'],
	  'emitted': ['recipients']
	};
	/*
	 *  Converts a local log message(direct references) to a remote one(unmarshallable)
	 */
	function remoteLog(flow, name, d, d0) {
	  var o = {
	    flow: flow.toObj('name', 'guid'),
	    action: name
	  };
	  var props = ['name', 'guid'];
	  propMap[name] && props.push.apply(props, _toConsumableArray(propMap[name]));
	  if (name === 'create' && d.data() !== undefined) props.push('data');
	  var newData = d && d.toObj ? d.toObj.apply(d, props) : (0, _utils.serialise)(d);
	  var oldData = d0 && d0.toObj ? d0.toObj.apply(d0, props) : (0, _utils.serialise)(d0);
	  if (newData !== undefined) o.d = newData;
	  if (oldData !== undefined) o.d0 = oldData;
	  return o;
	}
	
	function init(flow) {
	  flow.enableDevTools = function () {
	    var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	    console.warn('flow.enableDevtools() is now deprecated. nflow-devtools will automatically start logging when Chrome devtools is open');
	    return flow;
	  };
	
	  flow.logger = function () {
	    var logger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _consts.UNSET;
	    var isRemote = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	    if (logger === _consts.UNSET) return loggers;else loggers.push({ logger: logger, isRemote: isRemote });
	    return flow;
	  };
	  flow.logger.reset = function () {
	    loggers = [];
	  };
	  debug(flow, 'start', flow);
	}
	
	exports['default'] = {
	  init: init,
	  log: log
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(6);
	
	var _consts = __webpack_require__(5);
	
	exports['default'] = function (flow) {
	  /**
	   * [children description]
	   * @parameters  none
	   * @return {flow[]} children - Array of child nodes
	   */
	  flow.children = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidChildren);
	    return flow.children.value.concat();
	  };
	  flow.children.value = [];
	
	  flow.children.has = function (matcher, recursive) {
	    return flow.children.find(matcher, recursive) !== undefined;
	  };
	  flow.children.find = function (matcher) {
	    var recursive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	    return flow.children.findAll(matcher, recursive).pop();
	  };
	  flow.children.findAll = function (matcher, recursive) {
	    var filter = (0, _utils.createMatcher)(matcher);
	    var children = recursive ? flow.children.all() : flow.children();
	    return children.filter(filter);
	  };
	
	  flow.get = flow.children.find;
	  flow.getAll = flow.children.findAll;
	
	  /**
	   *  return all children recursively
	   */
	  flow.children.all = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidChildren);
	    var childMap = {};
	    return getChildren(flow);
	
	    function getChildren(flow) {
	      if (childMap[flow.guid()]) return [];
	      childMap[flow.guid()] = true;
	      var c = flow.children.value;
	      var gc = flow.children.value.map(getChildren);
	
	      return c.concat.apply(c, gc);
	    }
	  };
	
	  /**
	   * Get the parent of the node
	   * @returns {Flow} parent the current date
	   */
	  /**
	   * Set the parent of the node
	   * @param {Flow} parent the new parent node
	   * @returns {Flow} flow the current flow node
	   * @example
	   * let a = nflow.create('a')
	   * let b = nflow.create('b')
	   * a.parent(b) // reparent a onto b
	   */
	  flow.parent = function () {
	    // TODO: accept an index parameter for attaching the flow node as the nth child
	    if (!arguments.length) return flow.parent.value;
	    var parent = arguments.length <= 0 ? undefined : arguments[0];
	    parent && (0, _utils.assert)(!(0, _utils.isFlow)(parent), _consts.ERRORS.invalidParent, parent);
	    var previousParent = flow.parent();
	    (0, _utils.detach)(flow);
	    (0, _utils.dispatchInternalEvent)(flow, 'parent', parent, previousParent);
	    attach(parent);
	    (0, _utils.dispatchInternalEvent)(flow, 'parented', parent, previousParent);
	    return flow;
	  };
	
	  flow.parents = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidParents);
	    var parentMap = {};
	    var parents = [];
	    var p = flow.parent();
	    while (p && !parentMap[p.guid()]) {
	      parents.push(p);
	      parentMap[p.guid()] = true;
	      p = p.parent();
	    }
	    return parents;
	  };
	
	  flow.parents.get = flow.parents.find = function (matcher) {
	    if (matcher === null) return null;
	    var filter = matcher;
	    if (typeof matcher === 'string') filter = function filter(f) {
	      return f.name() === matcher;
	    };else if ((0, _utils.isFlow)(matcher)) filter = function filter(f) {
	      return f === matcher;
	    };
	
	    return flow.parents().filter(filter).pop();
	  };
	  flow.parents.has = function (matcher) {
	    return !!flow.parents.find(matcher);
	  };
	
	  flow.parents.root = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidRoot);
	    return flow.parents().pop();
	  };
	
	  flow.children.detach = function (child) {
	    flow.children.value = flow.children.value.filter(function (f) {
	      return f !== child;
	    });
	    (0, _utils.invalidateListenerCache)(flow);
	  };
	
	  flow.target = flow;
	
	  function attach(parent) {
	    flow.parent.value = parent;
	    if (parent) {
	      parent.children.value.push(flow);
	      (0, _utils.invalidateListenerCache)(parent);
	    }
	  }
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _factory = __webpack_require__(2);
	
	var _factory2 = _interopRequireDefault(_factory);
	
	var _utils = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	exports['default'] = function (flow, defaults) {
	  /**
	   * Create a new flow node.
	   * @memberof flow
	   * @param {string} name The name of the new node
	   * @param {...object} [data] optional data stored in the node
	   * @returns {flow} a new flow instance
	   * @codepen
	   * flow.create('user', {
	   *   id: 12345,
	   *   userName: 'jsmith'
	   *   })
	   *
	   */
	  flow.create = function (name) {
	    for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      data[_key - 1] = arguments[_key];
	    }
	
	    var instance = (0, _factory2['default'])(flow.create.defaults, name, data);
	    instance.parent.value = flow;
	    flow.children.value.push(instance);
	    inheritStats(instance);
	    (0, _utils.dispatchInternalEvent)(flow, 'create', instance);
	
	    return instance;
	  };
	
	  flow.create.defaults = {
	    factory: defaults.factory,
	    behaviours: defaults.behaviours.concat(),
	    direction: defaults.direction
	  };
	};
	
	function inheritStats(flow) {
	  var p = flow.parent();
	  if (p) {
	    var defaults = p.stats.value.defaults || {};
	    var nodeDefaults = defaults[flow.name.value] || {};
	    /* jshint ignore:start */
	    flow.stats.value = _extends({}, nodeDefaults);
	    /* jshint ignore:end */
	  }
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _consts = __webpack_require__(5);
	
	var _utils = __webpack_require__(6);
	
	var _routes = __webpack_require__(12);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	exports['default'] = function (flow) {
	  flow.status = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidStatus);
	    if (flow.cancel.value) return _consts.STATUS.CANCELLED;
	    if (flow.dispose.value) return _consts.STATUS.DISPOSED;
	    return flow.status.value;
	  };
	  flow.status.set = function (status) {
	    if (status === flow.status.value) return;
	    !flow.name.isInternal && (0, _utils.dispatchInternalEvent)(flow, 'status', status, flow.status.value);
	    flow.status.value = status;
	  };
	  flow.status.value = _consts.STATUS.IDLE;
	  (0, _utils.merge)(_consts.STATUS, flow.status);
	
	  flow.direction = function () {
	    var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _consts.UNSET;
	
	    if (direction === _consts.UNSET) return flow.direction.value;
	    var oldDirection = flow.direction.value;
	    flow.direction.value = direction;
	    (0, _utils.dispatchInternalEvent)(flow, 'direction', direction, oldDirection);
	    return flow;
	  };
	  flow.direction.value = flow.create.defaults.direction;
	  (0, _utils.merge)(_consts.DIRECTION, flow.direction);
	
	  flow.emit = function () {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }
	
	    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _consts.UNSET;
	
	    return emit(name, args);
	  };
	  flow.emit.recipients = [];
	  flow.emit.recipientsMap = {};
	  createEmitAPI(flow);
	
	  function emit() {
	    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _consts.UNSET;
	    var args = arguments[1];
	    var direction = arguments[2];
	
	    if (name === _consts.UNSET) {
	      // emit current flow object
	      (0, _utils.detach)(flow);
	      var p = flow.parent() || flow;
	      direction && flow.direction(direction);
	      (0, _utils.dispatchInternalEvent)(p, 'emit', flow);
	      p.emit.route(flow);
	      (0, _utils.dispatchInternalEvent)(p, 'emitted', flow);
	      return flow;
	    }
	    if ((0, _utils.isFlow)(name)) {
	      // 1. reparent the passed in flow object where it's emitted from
	      name.parent(flow);
	      // 2.  emit the passed in flow object
	      (0, _utils.detach)(name);
	      direction && name.direction(direction);
	      args.length && name.data.apply(name, _toConsumableArray(args));
	      (0, _utils.dispatchInternalEvent)(flow, 'emit', name);
	      flow.emit.route(name);
	      (0, _utils.dispatchInternalEvent)(flow, 'emitted', name);
	      return flow;
	    }
	
	    // create and emit a new event
	    (0, _utils.assert)(typeof name !== 'string', _consts.ERRORS.invalidEventName);
	
	    var event = flow.create.apply(flow, [name].concat(_toConsumableArray(args)));
	    (0, _utils.detach)(event);
	    if (direction) event.direction.value = direction;
	    (0, _utils.dispatchInternalEvent)(flow, 'emit', event);
	    flow.emit.route(event);
	    (0, _utils.dispatchInternalEvent)(flow, 'emitted', event);
	    return event;
	  }
	
	  flow.emit.route = function (event) {
	    event.stopPropagation.value = false;
	    event.status.set(_consts.STATUS.FLOWING);
	    var localName = (0, _utils.getLocalName)(event.name());
	    var matcher = function matcher(f) {
	      return f.on.listenerCache[localName];
	    };
	    event.emit.targets = flow.emit.route[event.direction()](event, matcher).concat(event.emit.targets || []);
	
	    while (event.emit.targets.length) {
	      var destination = event.emit.targets.shift();
	      if (event.isCancelled()) break;
	      if (event.propagationStopped()) break;
	      if (destination.flow.isCancelled()) continue;
	      notify(event, destination);
	    }
	    if (!event.isCancelled() && !event.propagationStopped()) {
	      event.status.set(_consts.STATUS.COMPLETED);
	    }
	  };
	
	  Object.keys(_routes2['default']).forEach(function (route) {
	    flow.emit.route[route] = flow.emit.route[route.toUpperCase()] = _routes2['default'][route];
	  });
	
	  function notify(flow, currentNode) {
	    // only deliver once per node
	    if (flow.emit.recipientsMap[currentNode.flow.guid()]) return;
	    if (isUnreachable(flow, currentNode)) return;
	    flow.emit.recipientsMap[currentNode.flow.guid()] = flow.direction();
	    var result = currentNode.flow.on.notifyListeners(flow);
	    if (result) {
	      result.route = currentNode.route;
	      result.direction = flow.direction();
	      flow.emit.recipients.push(result);
	    }
	  }
	
	  function isUnreachable(flow, destination) {
	    var modifiers = Object.keys(flow.stopPropagation.modifiers);
	    if (!modifiers.length) return false;
	
	    var routeMap = destination.route.reduce(function (i, route) {
	      i[route.flow.guid()] |= _consts.DIRECTION_BITMASK[route.direction];
	      return i;
	    }, {});
	
	    return modifiers.some(function (guid) {
	      return routeMap[guid] === flow.stopPropagation.modifiers[guid];
	    });
	  }
	
	  /*!
	   *  create directional (eg. `flow.emit.dowsntream(...)`) API
	   */
	  function createEmitAPI(flow) {
	    Object.keys(_consts.DIRECTION).forEach(function (direction) {
	      flow.emit[direction] = flow.emit[direction.toLowerCase()] = function (name) {
	        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	          args[_key2 - 1] = arguments[_key2];
	        }
	
	        return emit(name, args, direction);
	      };
	    });
	  }
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _upstream = __webpack_require__(13);
	
	var _upstream2 = _interopRequireDefault(_upstream);
	
	var _current = __webpack_require__(14);
	
	var _current2 = _interopRequireDefault(_current);
	
	var _downstream = __webpack_require__(15);
	
	var _downstream2 = _interopRequireDefault(_downstream);
	
	var _default2 = __webpack_require__(16);
	
	var _default3 = _interopRequireDefault(_default2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	exports['default'] = {
	  upstream: _upstream2['default'],
	  downstream: _downstream2['default'],
	  none: _current2['default'], // deprecated
	  current: _current2['default'],
	  'default': _default3['default'] // IE8 compatibility fix
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(6);
	
	var _consts = __webpack_require__(5);
	
	/*
	 *  returns: all parent nodes
	 */
	exports['default'] = function (flow, matcher) {
	  var match = (0, _utils.createMatcher)(matcher);
	  return [flow].concat(flow.parents()).map(function (flow, i, arr) {
	    return {
	      flow: flow,
	      route: arr.slice(0, i + 1).map(function (f) {
	        return {
	          flow: f,
	          direction: _consts.DIRECTION.UPSTREAM
	        };
	      })
	    };
	  }).filter(function (f) {
	    return match(f.flow);
	  });
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(6);
	
	var _consts = __webpack_require__(5);
	
	/*
	 *  returns: only itself and the node emitting it
	 */
	exports['default'] = function (flow, matcher) {
	  var match = (0, _utils.createMatcher)(matcher);
	  return [flow].concat(flow.parent()).map(function (flow, i, arr) {
	    return {
	      flow: flow,
	      route: arr.slice(0, i + 1).map(function (f, i) {
	        return {
	          flow: f,
	          direction: i ? _consts.DIRECTION.UPSTREAM : _consts.DIRECTION.CURRENT
	        };
	      })
	    };
	  }).filter(function (f) {
	    return match(f.flow);
	  });
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _consts = __webpack_require__(5);
	
	exports['default'] = function (flow) {
	  var visitedNodesMap = {};
	  var parent = flow.parent();
	  var dir = function dir(f) {
	    if (f === flow) return _consts.DIRECTION.CURRENT;
	    if (f === parent) return _consts.DIRECTION.UPSTREAM;
	    return _consts.DIRECTION.DOWNSTREAM;
	  };
	  var route = getChildren(flow, []).concat(getChildren(flow.parent(), [{ flow: flow, direction: dir(flow) }]));
	
	  return route;
	  function getChildren(flow, route) {
	    if (visitedNodesMap[flow.guid()]) return [];
	    visitedNodesMap[flow.guid()] = true;
	    route = route.concat([{ flow: flow, direction: dir(flow) }]);
	    var nodes = [{ flow: flow, route: route }];
	    flow.children().forEach(function (f) {
	      return nodes = nodes.concat(getChildren(f, route));
	    });
	    return nodes;
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(6);
	
	var _consts = __webpack_require__(5);
	
	exports['default'] = function (flow, matcher) {
	  var match = (0, _utils.createMatcher)(matcher);
	  var visitedNodesMap = {};
	  var route = [];
	  var parents = [flow].concat(flow.parents()).map(function (flow, i, arr) {
	    return {
	      flow: flow,
	      route: arr.slice(0, i + 1).map(function (f) {
	        return {
	          flow: f,
	          direction: _consts.DIRECTION.UPSTREAM
	        };
	      })
	    };
	  });
	
	  parents.forEach(function (f) {
	    // traverse downstream on detached nodes:
	    visitedNodesMap[f.flow.guid()] = true;
	    match(f.flow) && route.push(f);
	
	    if ((0, _utils.isDetached)(f.flow)) {
	      route = route.concat(getChildren(f.flow, f.route));
	    }
	  });
	  return route;
	
	  function getChildren(flow, route) {
	    var visited = visitedNodesMap[flow.guid()];
	    visitedNodesMap[flow.guid()] = true;
	    if (!match(flow)) return [];
	    var nodes = visited ? [] : [{ flow: flow, route: route }];
	    flow.children().forEach(function (f) {
	      nodes = nodes.concat(getChildren(f, route.concat([{ flow: f, direction: _consts.DIRECTION.DOWNSTREAM }])));
	    });
	    return nodes;
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _consts = __webpack_require__(5);
	
	var _utils = __webpack_require__(6);
	
	exports['default'] = function (flow, defaults, name) {
	  flow.guid = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidGuid);
	    return flow.guid.value;
	  };
	  flow.guid.value = createGuid();
	
	  flow.name = function () {
	    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _consts.UNSET;
	
	    if (name === _consts.UNSET) return flow.name.value;
	    (0, _utils.assert)(typeof name !== 'string', _consts.ERRORS.invalidName, name);
	    var previousName = flow.name.value;
	    flow.name.value = name;
	    (0, _utils.dispatchInternalEvent)(flow, 'name', name, previousName);
	    return flow;
	  };
	  flow.name.value = name || '';
	  flow.name.isFlow = true;
	  flow.name.isInternal = false;
	
	  flow.call = function () {
	    for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
	      functions[_key] = arguments[_key];
	    }
	
	    functions.filter(function (f) {
	      return typeof f === 'function';
	    }).forEach(function (f) {
	      return f.call(flow, flow);
	    });
	    return flow;
	  };
	};
	
	function createGuid() {
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	    var r = Math.random() * 16 | 0;
	    var v = c === 'x' ? r : r & 0x3 | 0x8;
	    return v.toString(16);
	  });
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _consts = __webpack_require__(5);
	
	var _utils = __webpack_require__(6);
	
	exports['default'] = function (flow) {
	  flow.on = function () {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }
	
	    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _consts.UNSET;
	
	    if (name === _consts.UNSET) return flow.on.listenerMap;
	    (0, _utils.assert)(typeof name !== 'string', _consts.ERRORS.invalidListener);
	
	    if (!args.length) {
	      return flow.on.listenerMap[name];
	    }
	
	    if (args.length === 1 && args[0] === null) {
	      delete flow.on.listenerMap[name];
	      (0, _utils.invalidateListenerCache)(flow);
	      (0, _utils.dispatchInternalEvent)(flow, 'listenerRemoved', { name: name });
	      return flow;
	    }
	    var oldListeners = flow.on.listenerMap[name];
	    flow.on.listenerMap[name] = args.filter(function (l) {
	      return !(0, _utils.assert)(typeof l !== 'function', _consts.ERRORS.invalidListenerType, (typeof l === 'undefined' ? 'undefined' : _typeof(l)) + ': ' + l);
	    });
	    (0, _utils.invalidateListenerCache)(flow);
	    (0, _utils.dispatchInternalEvent)(flow, oldListeners ? 'listenerChanged' : 'listenerAdded', { name: name, handlers: args.map(function (d) {
	        return d.name || 'function';
	      }) });
	    return flow;
	  };
	  flow.on.listenerMap = {};
	  flow.on.listenerCache = {};
	
	  flow.on.notifyListeners = function (event) {
	    var keys = Object.keys(flow.on.listenerMap);
	    var listeners = [];
	    event.target = flow;
	    keys.forEach(function (listenerName) {
	      var shouldDeliver = event.namespace.match(flow, listenerName);
	      if (shouldDeliver) {
	        var handlers = flow.on.listenerMap[listenerName];
	        listeners.push({
	          name: listenerName,
	          handlers: deliverToHandlers(event, handlers, flow)
	        });
	      }
	    });
	    delete event.target;
	    return listeners.length ? { flow: flow, listeners: listeners } : null;
	  };
	};
	
	function deliverToHandlers(event, handlers, flow) {
	  return handlers.map(function (listener) {
	    var l = {
	      listener: listener
	    };
	    if (event.status() !== _consts.STATUS.FLOWING) {
	      l.status = event.status();
	      return l;
	    }
	    if (event.stopPropagation.modifiers[flow.guid.value] & _consts.DIRECTION_BITMASK.CURRENT) {
	      l.status = 'SKIPPED';
	      return l;
	    }
	    l.status = 'DELIVERED';
	    listener.apply(event, event.data.value);
	    return l;
	  });
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(6);
	
	exports['default'] = function (flow) {
	  flow.toString = function () {
	    return JSON.stringify(flow.toObj());
	  };
	
	  flow.toObj = function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var props = args.reduce(function (a, b) {
	      a[b] = 1;return a;
	    }, {});
	    var hasProp = function hasProp(prop) {
	      return !args.length || props[prop];
	    };
	    var add = function add(name, valueF) {
	      if (hasProp(name)) obj[name] = valueF();
	    };
	    var obj = {};
	
	    add('name', flow.name);
	    add('guid', flow.guid);
	    add('version', function () {
	      return flow.version;
	    });
	    add('status', flow.status);
	    add('data', function () {
	      return (0, _utils.serialise)(flow.data());
	    });
	    add('parent', function () {
	      return {
	        name: flow.parent.value && flow.parent.value.name.value,
	        guid: flow.parent.value && flow.parent.value.guid.value
	      };
	    });
	    add('listeners', function () {
	      var l = flow.on();
	      var o = {};
	      Object.keys(l).forEach(function (key) {
	        o[key] = l[key].map(function (f) {
	          return f.name || 'function';
	        });
	      });
	      return o;
	    });
	    add('children', function () {
	      return flow.children().map(function (f) {
	        return f.toObj('name', 'guid');
	      });
	    });
	
	    add('recipients', function () {
	      return flow.emit.recipients && flow.emit.recipients.map(function (f) {
	        return {
	          direction: f.direction,
	          flow: f.flow.toObj('name', 'guid'),
	          route: f.route.map(function (f) {
	            return {
	              flow: f.flow.toObj('name', 'guid'),
	              direction: f.direction
	            };
	          }),
	          listeners: f.listeners.map(function (l) {
	            return {
	              name: l.name,
	              handlers: l.handlers.map(function (h) {
	                return {
	                  status: h.status,
	                  listener: (0, _utils.serialise)(h.listener)
	                };
	              })
	            };
	          })
	        };
	      });
	    });
	    return obj;
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(6);
	
	exports['default'] = function (flow, defaults, name, data) {
	  flow.data = function () {
	    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
	      data[_key] = arguments[_key];
	    }
	
	    if (!data.length) {
	      return flow.data.value.length <= 1 ? flow.data.value[0] : flow.data.value;
	    }
	    var oldData = flow.data.value;
	    flow.data.value = data;
	    (0, _utils.dispatchInternalEvent)(flow, 'data', data.length > 1 ? data : data[0], oldData.length > 1 ? oldData : oldData[0]);
	    return flow;
	  };
	  flow.data.value = data;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* globals VERSION */
	
	
	var _utils = __webpack_require__(6);
	
	var _consts = __webpack_require__(5);
	
	exports['default'] = function (flow, defaults) {
	  flow.stats = function (d) {
	    if (d === undefined) return flow.stats.value;
	    (0, _utils.assert)((typeof d === 'undefined' ? 'undefined' : _typeof(d)) !== 'object', _consts.ERRORS.invalidStatsArgs);
	    var previousStats = flow.stats.value;
	    /* jshint ignore:start */
	    flow.stats.value = _extends({}, flow.stats.value, d);
	    /* jshint ignore:end */
	    (0, _utils.dispatchInternalEvent)(flow, 'stats', flow.stats.value, previousStats);
	    return flow;
	  };
	
	  flow.stats.value = {
	    ignore: false, // do not track this node
	    collapsed: false
	  };
	
	  flow.version = ("0.2.12");
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(6);
	
	var _consts = __webpack_require__(5);
	
	exports['default'] = function (flow, defaults) {
	  /**
	   * [dispose description]
	   * @return {flow} flow - the current node
	   */
	  flow.dispose = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidDisposeArgs);
	    if (flow.dispose.value === true) return;
	
	    // recursively(depth first) dispose all downstream nodes
	    flow.children().forEach(function (f) {
	      return f.dispose();
	    });
	
	    (0, _utils.dispatchInternalEvent)(flow, 'dispose', true);
	    flow.parent(null);
	    flow.dispose.value = true;
	    flow.on.listenerMap = {};
	
	    return flow;
	  };
	  flow.dispose.value = false;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(6);
	
	var _consts = __webpack_require__(5);
	
	exports['default'] = function (flow, defaults, name, data) {
	  flow.namespace = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidNamespaceArgs);
	    return flow.namespace.path().map(function (f) {
	      return f.name();
	    }).join(_consts.NS_SEPARATOR);
	  };
	
	  flow.namespace.path = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidNamespaceArgs);
	    return flow.parents().reverse().concat(flow);
	  };
	
	  /**
	   * The Implicit namespace part of the node is defined by its parents.
	   * For example:
	   * If the node's parent is `a` and `a`'s parent is `b`:
	   * The node's implicit namespace is `a:b`
	   * @param  none
	   * @return {String[]} The implicit namespace segment of the node
	   */
	  flow.namespace.implicit = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidNamespaceArgs);
	    return flow.parents().reverse().map(function (f) {
	      return f.name();
	    });
	  };
	  /**
	   * The Explicit namespace identifier is defined as part of the node's name
	   * For example:
	   * If the node's name is `x:y:foo`
	   * The node's explicit namespace is `x:y`
	   * @param  none
	   * @return {String[]} The explicit namespace identifier of the node
	   */
	  flow.namespace.explicit = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidNamespaceArgs);
	    var ns = flow.name().split(_consts.NS_SEPARATOR);
	    ns.pop();
	    return ns;
	  };
	
	  /**
	   * The local name segment of the full namespace
	   * @example
	   * let foo = flow.create('x:y:foo')
	   * foo.namespace.localName() // -> foo'
	   * @param  none
	   * @return {String} The local name of the node
	   */
	  flow.namespace.localName = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidNamespaceArgs);
	    return flow.name().split(_consts.NS_SEPARATOR).pop();
	  };
	  /**
	   * The full namespace of the node including the:
	   *  - implicit ns identifiers,
	   *  - explicit namespace identifiers
	   *  - and the local name.
	   * @example
	   * let foo = flow.create('a').create('b').create('x:y:foo')
	   * foo.namespace.full() // -> ['a','b','x','y','foo']
	   * @param  none
	   * @return {Array} The full namespace of the node
	   */
	  flow.namespace.full = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidNamespaceArgs);
	    return flow.namespace.implicit().concat(flow.name().split(_consts.NS_SEPARATOR));
	  };
	
	  /**
	   * Checks if the emitted event and the receiving node are in compatible namespaces.
	   * An event can be delivered if the following checks pass:
	   *  - the local names are the same
	   *  - the full NS of the sender contains the explicit NS of the receiver
	   *  - the full NS of the receiver contains the explicit NS of the sender
	   * @param  {flow} listenerNode The node receiving the event
	   * @param  {[type]} listenerName the name of the event, optionally including the explicit namespace, eg.:`x:y:foo`
	   * @return {[type]} true if the event can be delivered to the receiving node
	   */
	  flow.namespace.match = function (listenerNode, listenerName) {
	    (0, _utils.assert)(typeof listenerName !== 'string', _consts.ERRORS.invalidListener, listenerName);
	
	    // 1. Check that the local names match
	    if (!isLocalNameMatch({ id: (0, _utils.getLocalName)(flow.name()), f: flow }, listenerName)) return false;
	    // 2. Check that the receiver's explicit NS matches the sender's NS
	    if (!isNamespaceMatch(flow, flow.name(), listenerNode.namespace.localise(listenerName))) return false;
	    // 2. Check that the sender's explicit NS matches the receiver's NS
	    if (!isNamespaceMatch(listenerNode, listenerName, flow.namespace.localise(flow.name()))) return false;
	    return true;
	  };
	
	  /**
	   * Checks if the node's FULL NS matches the name's explicit identifiers
	   * @param  {[type]}  node the node to get the full NS from
	   * @param  {[type]}  localisedNameTo The node name to get the explicit identifiers from
	   * @return {Boolean} true if the name's explicit identifiers sit inside the node's NS
	   */
	  function isNamespaceMatch(node, nameFrom, localisedNameTo) {
	    var fullIDs = nameFrom.split(_consts.NS_SEPARATOR).map(function (id) {
	      return { id: id, f: node };
	    }).reverse().concat(node.parents().map(function (f) {
	      return { id: f.name(), f: f };
	    }));
	
	    var explicitIDs = localisedNameTo.split(_consts.NS_SEPARATOR).reverse();
	    return explicitIDs.every(function (segment) {
	      var foundSegment = false;
	      while (fullIDs.length) {
	        var p = fullIDs.shift();
	        if (isLocalNameMatch(p, segment)) {
	          foundSegment = true;
	          break;
	        }
	      }
	      return foundSegment;
	    });
	  }
	
	  /**
	   * Resolves a listener name(ie. explicit ns + local name) to a localised one,
	   * replacing generic namespace identifiers with explicit guid-s
	   * @example
	   * let foo = flow
	   *  .create('x')
	   *  .create('y')
	   *  .create('x:z:foo')
	   *  foo.namespace.localise() // -> '{guid-of-x}:z:foo'
	   * @param  {String} listenerName The name of the listener, optionally including the explicit ns
	   * @return {String} The localised Namespace
	   */
	  flow.namespace.localise = function (ns) {
	    (0, _utils.assert)(typeof ns !== 'string', _consts.ERRORS.invalidListener, ns);
	
	    var segments = ns.split(_consts.NS_SEPARATOR);
	    if (segments.length > 1 && flow.parents.has(segments[0])) {
	      segments[0] = flow.parents.get(segments[0]).guid();
	    }
	
	    return segments.join(_consts.NS_SEPARATOR);
	  };
	};
	
	/**
	 * Checks if the local name of the sender and receiver nodes are the same
	 * @param  {String}  senderLocalName    The name of the emitted event
	 * @param  {String}  receiverLocalName The name of the listener
	 * @return {Boolean} true if the local names are the same
	 */
	
	
	function isLocalNameMatch(_ref, receiverName) {
	  var id = _ref.id,
	      f = _ref.f;
	
	  var receiverLocalName = (0, _utils.getLocalName)(receiverName);
	
	  var match = id === '*' || receiverLocalName === '*' || f.guid() === receiverLocalName || id === receiverLocalName;
	
	  return match;
	}

/***/ }
/******/ ])));
//# sourceMappingURL=nflow.js.map