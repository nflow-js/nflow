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
/******/ 	__webpack_require__.p = "/docs/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(24);

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
	  /* jshint ignore:start */
	  /**
	   * nflow library
	   * @class flow
	   *
	   * @example
	   * let a = nflow.create('a')
	   * let b = nflow.create('b')
	   *
	   * let c = a.create('c')
	   * let d = a.create('d')
	   */
	  /* jshint ignore:end */
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
	   * Cancel the current {@link flow} node.
	   *
	   * Cancelling has the following effects:
	   *  - Cancelled nodes cannot receive events.
	   *  - Cancelled nodes cannot emit events.
	   *  - Cancelled nodes cannot propagate events.
	   *  - <b>All</b> child nodes of a cancelled node <b>are also cancelled recursively</b>.<br>
	   *
	   * Cancellation is final, cancelled nodes cannot be un-cancelled.
	   * @method
	   * @memberof module:flow
	   * @return {flow} flow - the current {@link flow} node
	   * @liveexample
	   * let foo = nflow.create('foo')
	   *   .on('hello', cb)
	   *
	   * foo.cancel()
	   * @emits 'flow.cancel'
	   * @emits 'flow.children.cancel'
	   * @emits 'flow.parent.cancel'
	   */
	  flow.cancel = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidCancelArgs);
	    var previousValue = flow.cancel.value;
	    flow.cancel.value = true;
	    /**
	     *
	     * Dispatched when a node has been cancelled.
	     * @event 'flow.cancel'
	     * @property {flow} flow - the node to be cancelled.
	     * @see flow.cancel
	     * @example
	     * nflow.create('timer-service')
	     *   .on('flow.cancel', stopTimer)
	     */
	    /**
	     *
	     * Dispatched when one of the node's parents has been cancelled.
	     * @event 'flow.parent.cancel'
	     * @property {flow} flow - the node to be cancelled.
	     * @see flow.cancel
	     */
	    /**
	     *
	     * Dispatched when one of the node's children(recursive) has been cancelled.
	     * @internal
	     * @event 'flow.children.cancel'
	     * @property {flow} flow - the node to be cancelled.
	     * @see flow.cancel
	     */
	    (0, _utils.dispatchInternalEvent)(flow, 'cancel', true, previousValue);
	    return flow;
	  };
	  flow.cancel.value = false;
	
	  /**
	   * @memberof module:flow
	   * @readonly
	   * @return {Boolean} `true` if the node or any of the node's parents have been cancelled, else `false`
	   */
	  flow.isCancelled = function () {
	    return [flow].concat(flow.parents()).some(function (e) {
	      return e.status() === _consts.STATUS.CANCELLED || e.status() === _consts.STATUS.DISPOSED;
	    });
	  };
	
	  /**
	   * Stop or augments propagation of the emitted event.
	   *
	   * If the method is called with no parameters, the event will not be delivered to other listeners.
	   * ```
	   * .on('price-update', function(){
	   *   this.stopPropagation() // no further listeners will receive the event
	   * })
	   * ```
	   * If a {@link flow.DIRECTION|direction} is given, the event propagation gets restricted in the given direction.
	   * ```
	   * foo.on('price-update', function(){
	   *    // child nodes of `foo` will not receive the `price-update` event
	   *    this.stopPropagation('DOWNSTREAM')
	   * })
	   * ```
	   * @tutorial propagation
	   * @see flow.propagationStopped
	   * @param  {DIRECTION} [direction] Optional direction for augmenting the event propagation
	   * @return {flow} flow - the current {@link flow} node
	   * @emits 'flow.propagationStopped'
	   * @emits 'flow.children.propagationStopped'
	   * @emits 'flow.parent.propagationStopped'
	   * @emits 'flow.propagationAugmented'
	   * @emits 'flow.children.propagationAugmented'
	   * @emits 'flow.parent.propagationAugmented'
	   */
	  flow.stopPropagation = function () {
	    var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _consts.UNSET;
	
	    direction !== _consts.UNSET && (0, _utils.assert)(!_consts.DIRECTION[direction.toUpperCase()], _consts.ERRORS.invalidStopPropagationArgs);
	
	    if (direction === _consts.UNSET) {
	      flow.status.set(_consts.STATUS.STOPPED);
	      flow.emit.targets = [];
	      flow.stopPropagation.value = true;
	      flow.stopPropagation.modifiers[flow.target.guid] = -1; // bitmask fill
	      /**
	       *
	       * Dispatched when a dispatched event's propagation has been stopped.
	       * @event 'flow.propagationStopped'
	       * @property {flow} flow - the node that has stopped propagating
	       * @see flow.stopPropagation
	       * @example
	       * nflow.create('timer-service')
	       *   .on('flow.propagationStopped', cb)
	       */
	      /**
	       *
	       * Dispatched when one of the node's parents' propagation has been stopped.
	       * @event 'flow.parent.propagationStopped'
	       * @property {flow} flow - the node that has stopped propagating.
	       * @see flow.stopPropagation
	       */
	      /**
	       *
	       * Dispatched when one of the node's children(recursive) has stopped propagating.
	       * @internal
	       * @event 'flow.children.propagationStopped'
	       * @property {flow} flow - the node that has stopped propagating
	       * @see flow.stopPropagation
	       */
	      (0, _utils.dispatchInternalEvent)(flow, 'propagationStopped', true);
	    } else {
	      var d = _consts.DIRECTION[direction.toUpperCase()];
	      /**
	       *
	       * Dispatched when a dispatched event's propagation has been augmented.
	       * @event 'flow.propagationAugmented'
	       * @property {flow} flow - the affected node
	       * @property {object} changes - The changes applied to the emitted event
	       * @property {DIRECTION} changes.direction - The changes applied to the emitted event
	       * @property {flow} changes.target - The node that augmented the event flow
	       * @see flow.stopPropagation
	       *
	       */
	      /**
	       *
	       * Dispatched when one of the node's parents' propagation has been augmented.
	       * @event 'flow.parent.propagationAugmented'
	       * @property {flow} flow - the affected node.
	       * @property {object} changes - The changes applied to the emitted event
	       * @property {DIRECTION} changes.direction - The changes applied to the emitted event
	       * @property {flow} changes.target - The node that augmented the event flow
	       * @see flow.stopPropagation
	       */
	      /**
	       *
	       * Dispatched when the propagation of one of the node's children(recursive) has been augmented.
	       * @internal
	       * @event 'flow.children.propagationAugmented'
	       * @property {flow} flow - the affected node.
	       * @property {object} changes - The changes applied to the emitted event
	       * @property {DIRECTION} changes.direction - The changes applied to the emitted event
	       * @property {flow} changes.target - The node that augmented the event flow
	       * @see flow.stopPropagation
	       */
	      (0, _utils.dispatchInternalEvent)(flow, 'propagationAugmented', {
	        direction: d,
	        target: flow.target
	      });
	      flow.stopPropagation.modifiers[flow.target.guid.value] |= _consts.DIRECTION_BITMASK[d];
	    }
	    return flow;
	  };
	
	  flow.stopPropagation.value = false;
	  flow.stopPropagation.modifiers = {};
	  createStopPropagationModifiers(flow);
	
	  /**
	   * @readonly
	   * @tutorial propagation
	   * @see flow.stopPropagation
	   * @return {Boolean} `true` if the propagation was completely stopped, else `false` (even if the propagation was augmented).
	   *
	   */
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
	
	/**
	 * Enum for the direction event propagation
	 * @enum {String}
	 * @readonly
	 * @name DIRECTION
	 * @property {String} CURRENT - the event is only propagated to the current node
	 * @property {String} DEFAULT - the event bubbles up to root parent(the parent that has no other parents), then traverses **depth-first** to all child nodes
	 * @property {String} UPSTREAM - The event bubbles up to the root node
	 * @property {String} DOWNSTREAM - the event traverses **depth-first** all child nodes
	 */
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
	
	/**
	 * Enum for decribing the status of a flow node.
	 *
	 * Use {@link flow.status}() to get the status of a flow instance.
	 * @enum
	 * @readonly
	 * @property {String} ACTIVE (Default) The node can emit(or be emitted), propagate or listen to events.
	 * @property {String} FLOWING The node has been emitted(so it is now treated as an event), but it hasn't been delivered to all listeners yet.
	 * @property {String} STOPPED The event propagation was stopped. See {@link flow.stopPropagation}
	 * @property {String} COMPLETED The event has been propagated to all listeners.
	 * @property {String} CANCELLED The event has been cancelled. See {@link flow.cancel}
	 * @property {String} DISPOSED The event has been disposed. See {@link flow.dispose}
	 */
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
	
	/*
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
	  node.children.value.forEach(function (f) {
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
	  flow.children.value.forEach(function (f) {
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
	   * Return the immediate child nodes of the current node.
	   * **Getter only.**
	   *
	   * To create new child nodes, use the {@link flow.create} API.
	   * To reparent existing nodes, use the {@link flow.parent} API.
	   * > **Note:**
	   * > Note: this API only returns the immediate children of the current node.
	   * > To get all downstream nodes recursively, use the {@link flow.children.all} API.
	   * @see flow.parent
	   * @see flow.create
	   * @readonly
	   * @return {flow[]} children - Array of child nodes
	   */
	  flow.children = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidChildren);
	    return flow.children.value.concat();
	  };
	  flow.children.value = [];
	
	  /**
	   * Check if the given node exists.
	   * @alias children.has
	   * @memberof flow
	   * @param  {(String|Function|RegEx|flow)} matcher Matcher expression:
	   *   ```
	   *   // function:
	   *   .has(node => node.data() === 5)
	   *
	   *   // string:
	   *   .has('foo')
	   *
	   *   // regex
	   *   .has(/$foo[a-Z]*^/)
	   *
	   *   // flow
	   *   .has(flowInstance)
	   *   ```
	   * @param  {Boolean}  [recursive=true] recursive search or immediate children only.
	   * @return {Boolean} `true` if the matcher finds at least one node, else `false`.
	   */
	  flow.children.has = function (matcher) {
	    var recursive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	    return flow.children.find(matcher, recursive) !== undefined;
	  };
	
	  /**
	   * > **Aliases:**
	   * > - `children.find`
	   * @alias children.get
	   * @memberof flow
	   * @param  {(String|Function|RegEx|flow)} matcher Matcher expression:
	   *   ```
	   *   // function:
	   *   .children.get(node => node.data() === 5)
	   *
	   *   // string:
	   *   .children.get('foo')
	   *
	   *   // regex
	   *   .children.get(/$foo[a-Z]*^/)
	   *
	   *   // flow
	   *   .children.get(flowInstance)
	   *   ```
	   * @param  {Boolean}  [recursive=true] recursive search or immediate children only.
	   * @return {flow|undefined} The first child node that matches the filter criteria, else `undefined`
	   */
	  flow.children.find = function (matcher) {
	    var recursive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	    return flow.children.find.all(matcher, recursive).pop();
	  };
	
	  /**
	   * Find a child node based on a search criteria.
	   *
	   * > **Aliases:**
	   * > - `children.find.all`
	   * > - `children.findAll` (DEPRECATED)
	   * @alias children.get.all
	   * @memberof flow
	   * @param  {(String|Function|RegEx|flow)} matcher Matcher expression:
	   *   ```
	   *   // function:
	   *   .children.get.all(node => node.data() === 5)
	   *
	   *   // string:
	   *   .children.get.all('foo')
	   *
	   *   // regex
	   *   .children.get.all(/$foo[a-Z]*^/)
	   *
	   *   // flow
	   *   .children.get.all(flowInstance)
	   *   ```
	   * @param  {Boolean}  [recursive=true] recursive search or immediate children only.
	   * @return {flow[]} All child nodes that match the filter criteria
	   */
	  flow.children.find.all = function (matcher, recursive) {
	    var filter = (0, _utils.createMatcher)(matcher);
	    var children = recursive ? flow.children.all() : flow.children.value;
	    return children.filter(filter);
	  };
	
	  flow.children.findAll = flow.children.find.all;
	  flow.get = flow.children.find;
	  flow.get.all = flow.children.find.all;
	  flow.getAll = flow.children.findAll;
	
	  /**
	   * Return all child nodes recursively.
	   *
	   * @alias children.all
	   * @memberof flow
	   * @return {flow[]} All child nodes of the current node (recursive)
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
	   * Get or set the the parent of the current node.
	   *
	   * **Reparenting:**
	   * ```
	   * let a = nflow.create('a')
	   * let b = nflow.create('b')
	   * a.parent(b) // reparent a onto b
	   * ```
	   *
	   * **Unparenting:**
	   * You can create a new standalone tree by setting the `parent` to `null`.
	   * ```
	   * let a = nflow.create('a')
	   * a.parent(null) // unparent `a` to form a new tree
	   * ```
	   *
	   * @param {(flow|null)} [parent] - the new parent node
	   * @returns {flow|null}
	   * (setter) The current flow node if a `parent` argument was given.
	   * (getter) The parent node of the current flow node if no arguments were given.
	   * (getter) `null` if no arguments were given and the current node has no parent.
	   * @emits 'flow.parent'
	   * @emits 'flow.parent.parent'
	   * @emits 'flow.children.parent'
	   * @emits 'flow.parented'
	   * @emits 'flow.parent.parented'
	   * @emits 'flow.children.parented'
	   */
	  flow.parent = function () {
	    // TODO: accept an index parameter for attaching the flow node as the nth child
	    if (!arguments.length) return flow.parent.value;
	    var parent = arguments.length <= 0 ? undefined : arguments[0];
	    parent && (0, _utils.assert)(!(0, _utils.isFlow)(parent), _consts.ERRORS.invalidParent, parent);
	    var previousParent = flow.parent();
	    (0, _utils.detach)(flow);
	    /**
	     *
	     * Dispatched when a node is about to be reparented.
	     * @event 'flow.parent'
	     * @property {flow} flow - the node to be reparented.
	     * @property {flow} newParent - the the new parent node
	     * @property {flow} oldParent - the the old parent node
	     * @see flow.parent
	     */
	    /**
	     *
	     * Dispatched when one of the node's parents is about to be reparented.
	     * @event 'flow.parent.parent'
	     * @property {flow} flow - the node to be reparented.
	     * @property {flow} newParent - the the new parent node
	     * @property {flow} oldParent - the the old parent node
	     * @see flow.parent
	     */
	    /**
	     *
	     * Dispatched when ove of the node's children(recursive) is about to be reparented.
	     * @event 'flow.children.parent'
	     * @property {flow} flow - the node to be reparented.
	     * @property {flow} newParent - the the new parent node
	     * @property {flow} oldParent - the the old parent node
	     * @see flow.parent
	     */
	    (0, _utils.dispatchInternalEvent)(flow, 'parent', parent, previousParent);
	    attach(parent);
	    /**
	     *
	     * Dispatched when a node has been reparented.
	     * @event 'flow.parented'
	     * @property {flow} flow - the reparented node.
	     * @property {flow} newParent - the the new parent node
	     * @property {flow} oldParent - the the old parent node
	     * @see flow.parent
	     */
	    /**
	     *
	     * Dispatched when one of the node's parents has been reparented.
	     * @event 'flow.parent.parented'
	     * @property {flow} flow - the reparented node.
	     * @property {flow} newParent - the the new parent node
	     * @property {flow} oldParent - the the old parent node
	     * @see flow.parent
	     */
	    /**
	     *
	     * Dispatched when ove of the node's children(recursive) has been reparented.
	     * @event 'flow.children.parented'
	     * @property {flow} flow - the reparented node.
	     * @property {flow} newParent - the the new parent node
	     * @property {flow} oldParent - the the old parent node
	     * @see flow.parent
	     */
	    (0, _utils.dispatchInternalEvent)(flow, 'parented', parent, previousParent);
	    return flow;
	  };
	
	  /**
	   * Return an array of all parent nodes, starting from the elements parent, going upstream until a root node is found.
	   * @returns {flow[]} All parent nodes starting from the immediate parent to the root
	   */
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
	
	  /**
	   * Find a parent node based on a search criteria.
	   *
	   * > **Aliases:**
	   * > - `parents.find`
	   * @alias parents.get
	   * @memberof flow
	   * @param  {(String|Function|RegEx|flow)} matcher Matcher expression:
	   *   ```
	   *   // function:
	   *   .parents.get(node => node.data() === 5)
	   *
	   *   // string:
	   *   .parents.get('foo')
	   *
	   *   // regex
	   *   .parents.get(/$foo[a-Z]*^/)
	   *
	   *   // flow
	   *   .parents.get(flowInstance)
	   *   ```
	   * @return {flow|undefined} The nearest parent node that matches the criteria, else `undefined`
	   */
	  flow.parents.find = function (matcher) {
	    if (matcher === null) return null;
	    var filter = matcher;
	    if (typeof matcher === 'string') filter = function filter(f) {
	      return f.name() === matcher;
	    };else if ((0, _utils.isFlow)(matcher)) filter = function filter(f) {
	      return f === matcher;
	    };
	
	    return flow.parents().filter(filter).pop();
	  };
	  flow.parents.get = flow.parents.find;
	
	  /**
	   * Check if the given parent node exists.
	   * @alias parents.has
	   * @memberof flow
	   * @param  {(String|Function|RegEx|flow)} matcher Matcher expression:
	   *   ```
	   *   // function:
	   *   .parents.has(node => node.data() === 5)
	   *
	   *   // string:
	   *   .parents.has('foo')
	   *
	   *   // regex
	   *   .parents.has(/$foo[a-Z]*^/)
	   *
	   *   // flow
	   *   .parents.has(flowInstance)
	   *   ```
	   * @return {Boolean} `true` if the matcher finds at least one node, else `false`.
	   */
	  flow.parents.has = function (matcher) {
	    return !!flow.parents.find(matcher);
	  };
	
	  /**
	   * Return the last node in the parent chain, ie. the node that has no further parents.
	   * @alias parents.root
	   * @memberof flow
	   * @return {flow|undefined} The root node if the current node has at least one parent, else `undefined`
	   */
	  flow.parents.root = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidRoot);
	    return flow.parents().pop();
	  };
	
	  /**
	   * @internal
	   */
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
	  /* jshint ignore:start */
	  /**
	   * Create a new flow instance.
	   * > **Note**: The parent of the newly created {@link flow} node is automatically set
	   * to the flow node it was created from.
	   * >
	   * > To create a new event tree that's not connected to existing nodes, simply unparent it after creation:
	   * > ```
	   * > let a = nflow
	   * >   .create('new-tree')
	   * >   .parent(null)
	   * > ```
	   * **Aliases**
	   * The following command chains have identical end results:
	   * - `.create('a', someData)`
	   * - `.create('a').data(someData)`
	   * - `.create().name('a').data(someData)`
	   *
	   * @memberof flow
	   * @param {string} name The name of the new node
	   * @param {...object} [data] optional data stored in the new node
	   * @returns {flow} the new flow instance
	   * @example
	   * let a = nflow.create('a')
	   * let b = nflow.create('b')
	   *
	   * let c = a.create('c')
	   * let d = a.create('d')
	   *
	   * @example <caption>second demo:</caption>
	   * let a = nflow.create('a')
	   * let b = nflow.create('b')
	   *
	   * @emits 'flow.create'
	   * @emits 'flow.parent.create'
	   * @emits 'flow.children.create'
	   */
	  /* jshint ignore:end */
	  flow.create = function (name) {
	    for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      data[_key - 1] = arguments[_key];
	    }
	
	    var instance = (0, _factory2['default'])(flow.create.defaults, name, data);
	    instance.parent.value = flow;
	    flow.children.value.push(instance);
	    inheritStats(instance);
	
	    /**
	     *
	     * Dispatched when a node has been created.
	     * @event 'flow.create'
	     * @property {flow} flow - the node where the new node was created from(ie. the parent).
	     * @property {flow} newNode - the created node.
	     * @see flow.create
	     */
	    /**
	     *
	     * Dispatched when one of the node's parents has been created.
	     * @event 'flow.parent.create'
	     * @property {flow} flow - the node where the new node was created from(ie. the parent).
	     * @property {flow} newNode - the created node.
	     * @see flow.create
	     */
	    /**
	     *
	     * Dispatched when ove of the node's children(recursive) has been created.
	     * @event 'flow.children.create'
	     * @property {flow} flow - the node where the new node was created from(ie. the parent).
	     * @property {flow} newNode - the created node.
	     * @see flow.create
	     */
	    (0, _utils.dispatchInternalEvent)(flow, 'create', instance);
	
	    return instance;
	  };
	
	  /**
	   * Create a new flow node or return the existing one if the current node already has a child with the same name.
	   * If multiple children have the same name, the first one will be returned.
	   * If `...data` parameters are given, it will also set the data on the newly created or existing node.
	   * @alias create.once
	   * @memberof flow
	   * @param {string} name The name of the new node
	   * @param {...object} [data] optional data stored in the node
	   * @returns {flow} the newly created or already existing flow instance
	   */
	  flow.create.once = function (name) {
	    var _instance;
	
	    for (var _len2 = arguments.length, data = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      data[_key2 - 1] = arguments[_key2];
	    }
	
	    var instance = flow.get(name);
	    if (instance) (_instance = instance).data.apply(_instance, data);else instance = flow.create.apply(flow, [name].concat(data));
	    return instance;
	  };
	
	  /**
	   * @internal
	   * @type {Object}
	   */
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
	  /**
	   * return the current status of the node
	   * @readonly
	   * @return {STATUS} The current status of the node
	   */
	  flow.status = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidStatus);
	    if (flow.cancel.value) return _consts.STATUS.CANCELLED;
	    if (flow.dispose.value) return _consts.STATUS.DISPOSED;
	    return flow.status.value;
	  };
	
	  /**
	   * @internal
	   * @param {STATUS} The new status of the node
	   */
	  flow.status.set = function (status) {
	    if (status === flow.status.value) return;
	    !flow.name.isInternal && (0, _utils.dispatchInternalEvent)(flow, 'status', status, flow.status.value);
	    flow.status.value = status;
	  };
	  flow.status.value = _consts.STATUS.IDLE;
	  (0, _utils.merge)(_consts.STATUS, flow.status);
	
	  /**
	   * Set the traversal direction of the node.
	   * The direction defines how the node traverses the event tree when it's emitted.
	   * @param  {DIRECTION} [direction] The traversal direction
	   * @return {flow} The current flow node
	   */
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
	
	  /**
	   * Emit a node to traverse the flow tree.
	   *
	   * In nflow `nodes` and `events` are the same type of objects.
	   * An event is a node that gets detached from the parent, traverses the tree (see {@tutorial propagation}) and gets delivered to all listeners (see {@tutorial namespacing}).
	   * > The `.emit` API has **3 distinct behaviours**:
	   * ```js
	   * foo.emit() // turns foo into an event and emits it
	   * foo.emit('bar') // creates bar and emits it on foo
	   * foo.emit(anotherNode) // reparents anotherNode to foo and emits it
	   * ```
	   * Essentially, the following two operations are the same:
	   * ```js
	   * foo.emit('bar')
	   * foo.create('bar').emit()
	   * ```
	   *
	   * #### Listener Context
	   * Listeners are always invoked in the context of the emitted event:
	   * ```js
	   * .on('price-update', function(d){
	   *   this // refers to the emitted event
	   *   this.data() // === d
	   *   this.name() // === 'price-update'
	   * })
	   * ```
	   *
	   * Since **events are also flow objects**, you can dispatch further events on them! ({@tutorial event-chain})
	   * @param  {String} [name] The name of the event
	   * @param {...object} [data] optional data stored on the event
	   * @returns {flow} the emitted event
	   * @tutorial event-chain
	   * @tutorial propagation
	   * @tutorial namespacing
	   * @emits 'flow.emit'
	   * @emits 'flow.parent.emit'
	   * @emits 'flow.children.emit'
	   * @emits 'flow.emitted'
	   * @emits 'flow.parent.emitted'
	   * @emits 'flow.children.emitted'
	   */
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
	  /**
	   *
	   * Dispatched when a node is about to be emitted.
	   * @event 'flow.emit'
	   * @property {flow} parent - The emitter, ie. the parent of the emitted node.
	   * @property {flow} flow - the emitted node.
	   * @see flow.parent
	   */
	  /**
	   *
	   * Dispatched when one of the node's parents is about to be emitted.
	   * @event 'flow.parent.emit'
	   * @property {flow} parent - The emitter, ie. the parent of the emitted node.
	   * @property {flow} flow - the emitted node.
	   * @see flow.emit
	   */
	  /**
	   *
	   * Dispatched when ove of the node's children(recursive) is about to be emitted.
	   * @event 'flow.children.emit'
	   * @property {flow} parent - The emitter, ie. the parent of the emitted node.
	   * @property {flow} flow - the emitted node.
	   * @see flow.emit
	   */
	  /**
	   *
	   * Dispatched after a node has been emitted.
	   * @event 'flow.emitted'
	   * @property {flow} parent - The emitter, ie. the parent of the emitted node.
	   * @property {flow} flow - the emitted node.
	   * @see flow.parent
	   */
	  /**
	   *
	   * Dispatched after one of the node's parents has been emitted.
	   * @event 'flow.parent.emitted'
	   * @property {flow} parent - The emitter, ie. the parent of the emitted node.
	   * @property {flow} flow - the emitted node.
	   * @see flow.emit
	   */
	  /**
	   *
	   * Dispatched after one of the node's children(recursive) has been emitted.
	   * @event 'flow.children.emitted'
	   * @property {flow} parent - The emitter, ie. the parent of the emitted node.
	   * @property {flow} flow - the emitted node.
	   * @see flow.emit
	   */
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
	
	  /**
	   * @internal
	   */
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
	
	var _utils = __webpack_require__(6);
	
	exports['default'] = function (flow, matcher) {
	  var match = (0, _utils.createMatcher)(matcher);
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
	    if (!match(flow)) return [];
	    route = route.concat([{ flow: flow, direction: dir(flow) }]);
	    var nodes = [{ flow: flow, route: route }];
	    flow.children.value.forEach(function (f) {
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
	    flow.children.value.forEach(function (f) {
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
	  /**
	   * Return the unique ID of the node.
	   *
	   * @readonly
	   * @return {String} UUID4 identifier of the current node
	   */
	  flow.guid = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidGuid);
	    return flow.guid.value;
	  };
	  flow.guid.value = createGuid();
	
	  /**
	   * Get/Set the name of a flow instance.
	   *
	   * #### Getter
	   * ```js
	   * .name() // returns the name of the current node
	   * ```
	   * #### Setter
	   * ```js
	   * .name('foo') // sets the name of the current node
	   * ```
	   * @param {string} name The name of the flow instance
	   * @returns {flow} flow (Setter) the current flow instance
	   * @returns {String} name (Getter) the name of the flow instance
	   * @emits 'flow.name'
	   * @emits 'flow.parent.name'
	   * @emits 'flow.children.name'
	   */
	  flow.name = function () {
	    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _consts.UNSET;
	
	    if (name === _consts.UNSET) return flow.name.value;
	    (0, _utils.assert)(typeof name !== 'string', _consts.ERRORS.invalidName, name);
	    var previousName = flow.name.value;
	    flow.name.value = name;
	    flow.namespace.localName.cache = null;
	    /**
	     *
	     * Dispatched when a node has been renamed.
	     * @event 'flow.name'
	     * @property {flow} flow - the renamed node.
	     * @property {flow} newName - the new name of the node
	     * @property {flow} oldName - the previous name of the node
	     * @see flow.name
	     */
	    /**
	     *
	     * Dispatched when one of the node's parents has been renamed.
	     * @event 'flow.parent.name'
	     * @property {flow} flow - the renamed node.
	     * @property {flow} newName - the new name of the node
	     * @property {flow} oldName - the previous name of the node
	     * @see flow.name
	     */
	    /**
	     *
	     * Dispatched when ove of the node's children(recursive) has been renamed.
	     * @event 'flow.children.name'
	     * @property {flow} flow - the renamed node.
	     * @property {flow} newName - the new name of the node
	     * @property {flow} oldName - the previous name of the node
	     * @see flow.name
	     */
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
	  /**
	   * Register one or more listeners on the current node.
	   *
	   * The listener will be invoked if an emitted flow object's name matches the listener name.
	   *
	   * #### How to delete event listeners
	   * Simply set the handler to `null`:
	   * ```js
	   * f.on('price-update', null)
	   * ```
	   *
	   * > **Note:**
	   * Setting a new listener on the same event name deletes the existing listener(s):
	   * ```js
	   * f.on('register-user', validateName)
	   * f.on('register-user', validateEmail) // this will delete validateName!
	   * ```
	   *
	   * #### How to register multiple event handlers on the same event
	   * ```js
	   * flow.on('register-user', validateName
	   *                        , validateEmail
	   *                        , validatePassword
	   *                        , registerUser)
	   * ```
	   * If you specify multiple listeners, they will called in sequential order.
	   *
	   * @param  {String} [name] the name of the listener
	   * @param  {...function} [listeners] The callback function(s) to be invoked.
	   * @return {flow} the current flow object
	   * @tutorial propagation
	   * @tutorial namespacing
	   * @example
	   * services
	   *  .create('user-service')
	   *  .on('login'   , login)
	   *  .on('logout'  , logout)
	   *  .on('register', validateName
	   *                , validateEmail
	   *                , validatePassword
	   *                , register)
	   *  @emits 'flow.listenerAdded'
	   *  @emits 'flow.children.listenerAdded'
	   *  @emits 'flow.parent.listenerAdded'
	   *  @emits 'flow.listenerChanged'
	   *  @emits 'flow.children.listenerChanged'
	   *  @emits 'flow.parent.listenerChanged'
	   *  @emits 'flow.listenerRemoved'
	   *  @emits 'flow.children.listenerRemoved'
	   *  @emits 'flow.parent.listenerRemoved'
	   */
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
	      /**
	       *
	       * Dispatched when one or more listeners have been removed from the node.
	       * @event 'flow.listenerRemoved'
	       * @property {flow} flow - the affected node.
	       * @property {object} changes - the changes applied to the node
	       * @property {object} changes.name - the name of the listener removed
	       * @see flow.on
	       */
	      /**
	       *
	       * Dispatched when one or more listeners have been removed from the node's parents.
	       * @event 'flow.parent.listenerRemoved'
	       * @property {flow} flow - the affected node.
	       * @property {object} changes - the changes applied to the node
	       * @property {object} changes.name - the name of the listener removed
	       * @see flow.on
	       */
	      /**
	       *
	       * Dispatched when one or more listeners have been removed from the node's children(recursive)
	       * @event 'flow.children.listenerRemoved'
	       * @property {flow} flow - the affected node.
	       * @property {object} changes - the changes applied to the node
	       * @property {object} changes.name - the name of the listener removed
	       * @see flow.on
	       */
	      (0, _utils.dispatchInternalEvent)(flow, 'listenerRemoved', { name: name });
	      return flow;
	    }
	    var oldListeners = flow.on.listenerMap[name];
	    flow.on.listenerMap[name] = args.filter(function (l) {
	      return !(0, _utils.assert)(typeof l !== 'function', _consts.ERRORS.invalidListenerType, (typeof l === 'undefined' ? 'undefined' : _typeof(l)) + ': ' + l);
	    });
	    (0, _utils.invalidateListenerCache)(flow);
	    /**
	     *
	     * Dispatched when one or more listeners have been added to the node.
	     * @event 'flow.listenerAdded'
	     * @property {flow} flow - the affected node.
	     * @property {object} changes - the changes applied to the node
	     * @property {object} changes.name - the name of the listener added
	     * @see flow.on
	     */
	    /**
	     *
	     * Dispatched when one or more listeners have been added to the node's parents.
	     * @event 'flow.parent.listenerAdded'
	     * @property {flow} flow - the affected node.
	     * @property {object} changes - the changes applied to the node
	     * @property {object} changes.name - the name of the listener added
	     * @see flow.on
	     */
	    /**
	     *
	     * Dispatched when one or more listeners have been added to the node's children(recursive)
	     * @event 'flow.children.listenerAdded'
	     * @property {flow} flow - the affected node.
	     * @property {object} changes - the changes applied to the node
	     * @property {object} changes.name - the name of the listener added
	     * @see flow.on
	     */
	    /**
	     *
	     * Dispatched when one or more listeners have been changed on the node.
	     * @event 'flow.listenerChanged'
	     * @property {flow} flow - the affected node.
	     * @property {object} changes - the changes applied to the node
	     * @property {object} changes.name - the name of the changed listener
	     * @see flow.on
	     */
	    /**
	     *
	     * Dispatched when one or more listeners have been changed on the node's parents.
	     * @event 'flow.parent.listenerChanged'
	     * @property {flow} flow - the affected node.
	     * @property {object} changes - the changes applied to the node
	     * @property {object} changes.name - the name of the changed listener
	     * @see flow.on
	     */
	    /**
	     *
	     * Dispatched when one or more listeners have been changed on the node's children(recursive)
	     * @event 'flow.children.listenerChanged'
	     * @property {flow} flow - the affected node.
	     * @property {object} changes - the changes applied to the node
	     * @property {object} changes.name - the name of the changed listener
	     * @see flow.on
	     */
	    (0, _utils.dispatchInternalEvent)(flow, oldListeners ? 'listenerChanged' : 'listenerAdded', { name: name, handlers: args });
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
	  /**
	   * JSON Stringified version of {@link flow.toObj} for logging and debugging.
	   * @see flow.toObj
	   * @memberof flow
	   * @param  {String[]} props - The {@link flow} properties to include in the serialisation.
	   * ```
	   * let counter = nflow.create('counter-service')
	   *  .data({ counter: 5 })
	   *
	   * counter.toObj('name', 'data')
	   * // -> '{ "name": "timer-service", "counter": "5"}'
	   * ```
	   * Available properties:
	   * - `"name"` - see {@link flow.name}
	   * - `"guid"` - see {@link flow.guid}
	   * - `"version"` - see {@link flow.version}
	   * - `"data"` - see {@link flow.data}
	   * - `"status"` - see {@link flow.status}
	   * - `"parent"` - see {@link flow.parent}
	   * - `"listeners"` - see {@link flow.on}
	   * - `"children"` - see {@link flow.children}
	   * - `"recipients"` - see {@link flow.emit.recipients}
	   * @return {String} Serialised and JSON Stringified representation of the current node.
	   */
	  flow.toString = function () {
	    return JSON.stringify(flow.toObj.apply(flow, arguments));
	  };
	  /**
	   * Serialise the flow node into a json object
	   * @param  {String[]} props - The {@link flow} properties to include in the serialisation.
	   * ```
	   * let counter = nflow.create('counter-service')
	   *  .data({ counter: 5 })
	   *
	   * counter.toObj('name', 'data')
	   * // -> { "name": "timer-service", "counter": "5"}
	   * ```
	   * Available properties:
	   * - `"name"` - see {@link flow.name}
	   * - `"guid"` - see {@link flow.guid}
	   * - `"version"` - see {@link flow.version}
	   * - `"data"` - see {@link flow.data}
	   * - `"status"` - see {@link flow.status}
	   * - `"parent"` - see {@link flow.parent}
	   * - `"listeners"` - see {@link flow.on}
	   * - `"children"` - see {@link flow.children}
	   * - `"recipients"` - see {@link flow.emit.recipients}
	   * @return {Object} Serialised JSON representation of the {@link flow} node
	   */
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
	      return flow.children.value.map(function (f) {
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
	  /**
	   * `Get` or `Set` the current node's data.
	   *
	   * Every {@link flow} node has an internal data storage for storing state.
	   * @param  {...object} [data] - the data to be stored in the node
	   * @return {object|object[]} (Getter) the data stored in the node.
	   * If multiple objects are stored in the node, they are returned as an array:
	   * ```js
	   * let foo = nflow.create('foo')
	   *   .data({a:5}, "somethingElse")
	   *
	   * foo.data() // [{a:5}, "somethingElse"]
	   * ```
	   * @return {flow} (Setter) The current node
	   * @emits 'flow.data'
	   * @emits 'flow.parent.data'
	   * @emits 'flow.children.data'
	   */
	  flow.data = function () {
	    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
	      data[_key] = arguments[_key];
	    }
	
	    if (!data.length) {
	      return flow.data.value.length <= 1 ? flow.data.value[0] : flow.data.value;
	    }
	    var oldData = flow.data.value;
	    flow.data.value = data;
	    /**
	     *
	     * Dispatched when the data of the node has been changed.
	     * @event 'flow.data'
	     * @property {flow} flow - the node that stores the data
	     * @property {object} newData - The new data stored in the node
	     * @property {object} oldData - The old data stored in the node
	     * @see flow.data
	     */
	    /**
	     *
	     * Dispatched when the data of a parent node has changed
	     * @event 'flow.parent.data'
	     * @property {flow} flow - the node that stores the data
	     * @property {object} newData - The new data stored in the node
	     * @property {object} oldData - The old data stored in the node
	     * @see flow.data
	     */
	    /**
	     *
	     * Dispatched when the data of a child(recursive) node has changed
	     * @event 'flow.children.data'
	     * @property {flow} flow - the node that stores the data
	     * @property {object} newData - The new data stored in the node
	     * @property {object} oldData - The old data stored in the node
	     * @see flow.data
	     */
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
	  /**
	   * The stats API is for configuring {@link flow} nodes for debugging.
	   * ```
	   * nflow.create('noisy-timer-service')
	   *  .stats({ ignore: true })
	   * ```
	   * @param  {*} data - configuration options
	   * @param  {Boolean} data.ignore - do not track this node in the debugger/visualiser
	   * @param  {Boolean} data.collapsed - collapse this node by default in the visualiser
	   * @param  {String} data.description - extra description of the node to show in the visualiser
	   * @return {flow} the current node.
	   */
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
	
	  flow.version = ("0.2.14");
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
	  /* jshint ignore:start */
	  /**
	   * Dispose the current {@link flow} node.
	   * Use this operation if the node is no longer needed.
	   *
	   * Disposing a node has the following effects:
	   *  - Disposed nodes cannot receive events.
	   *  - Disposed nodes cannot emit events.
	   *  - Disposed nodes cannot propagate events.
	   *  - Disposed nodes are unparented
	   *  - <b>All child nodes</b> of a disposed node <b>are also disposed recursively</b>.<br>
	   *
	   * Unless the application holds a reference to the node, disposed nodes are **eligible for garbage collection**.
	   *
	   * This operation is final, disposed nodes cannot be re-activated.
	   *  @return {flow} the disposed node
	   *  @emits 'flow.dispose'
	   *  @emits 'flow.children.dispose'
	   *  @emits 'flow.parent.dispose'
	   */
	  /* jshint ignore:end */
	  flow.dispose = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidDisposeArgs);
	    if (flow.dispose.value === true) return;
	
	    // recursively(depth first) dispose all downstream nodes
	    flow.children.value.forEach(function (f) {
	      return f.dispose();
	    });
	    /**
	     *
	     * Dispatched when a node is about to be disposed.
	     * @event 'flow.dispose'
	     * @property {flow} flow - the node to be disposed.
	     * @see flow.dispose
	     * @example
	     * nflow.create('timer-service')
	     *   .on('flow.dispose', stopTimer)
	     */
	    /**
	     *
	     * Dispatched when one of the node's parents is about to be disposed.
	     * @event 'flow.parent.dispose'
	     * @property {flow} flow - the node to be disposed.
	     * @see flow.dispose
	     */
	    /**
	     *
	     * Dispatched when ove of the node's children(recursive) is about to be disposed.
	     * @internal
	     * @event 'flow.children.dispose'
	     * @property {flow} flow - the node to be disposed.
	     * @see flow.dispose
	     */
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
	  /**
	   * **Getter only**.
	   * Return the full namespace of the node including:
	   *  - implicit namespace identifiers (see {@link flow.namespace.implicit}),
	   *  - explicit namespace identifiers (see {@link flow.namespace.explicit})
	   *  - and the local name. (see {@link flow.namespace.localName})
	   *
	   * ```
	   * let foo = nflow
	   *   .create('a')
	   *   .create('b')
	   *   .create('x:y:foo')
	   *
	   * foo.namespace() // -> "nflow:a:b:x:y:foo"
	   * ```
	   * @tutorial namespacing
	   * @return {String} The full namespace of the node
	   */
	  flow.namespace = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidNamespaceArgs);
	    return flow.namespace.path().map(function (f) {
	      return f.name();
	    }).join(_consts.NS_SEPARATOR);
	  };
	
	  /**
	   * **Getter only**.
	   * Return all {@link flow} nodes that form the current node's namespace
	   * ```js
	   * let a = nflow.create('a')
	   * let b = a.create('b')
	   * let foo = b.create('x:y:foo')
	   *
	   * a.namespace() // -> [nflow, a]
	   * foo.namespace() // -> [nflow, a, b, foo]
	   * ```
	   * @tutorial namespacing
	   * @alias namespace.path
	   * @memberof flow
	   * @return {flow[]} Array of nodes that make up the current node's full namespace
	   */
	  flow.namespace.path = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidNamespaceArgs);
	    return flow.parents().reverse().concat(flow);
	  };
	
	  /**
	   * Return the implicit namespace segment of the current node.
	   *
	   * A node's implicit namespace is defined by the node's parents:
	   * ```js
	   * let a = nflow.create('a')
	   * let b = a.create('b')
	   * let foo = b.create('x:y:foo')
	   *
	   * a.namespace.implicit() // -> ["nflow"]
	   * foo.namespace.implicit() // -> ["nflow", "a", "b"]
	   * ```
	   * @alias namespace.implicit
	   * @memberof flow
	   * @return {String[]} The implicit namespace segment of the node
	   */
	  flow.namespace.implicit = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidNamespaceArgs);
	    return flow.parents().reverse().map(function (f) {
	      return f.name();
	    });
	  };
	  /**
	   * Return the `explicit` namespace segment of the node.
	   * The explicit namespace segment is given as part of the node's {@link flow.name|name}
	   * ```
	   * let foo = nflow.create(a:b:foo)
	   * foo.namespace.explicit() // "a:b"
	   * ```
	   * @alias namespace.explicit
	   * @memberof flow
	   * @return {String} The explicit namespace identifier of the node
	   */
	  flow.namespace.explicit = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidNamespaceArgs);
	    var ns = flow.name().split(_consts.NS_SEPARATOR);
	    ns.pop();
	    return ns;
	  };
	
	  /**
	   * Return the `local name` segment of the node.
	   * The local name is the node's name, minus any explicit namespace given as part of the node's {@link flow.name|name}.
	   * ```
	   * let foo = nflow.create(a:b:foo)
	   * foo.namespace.localName() // "foo"
	   * ```
	   * @see flow.namespace.explicit
	   * @alias namespace.localName
	   * @memberof flow
	   * @return {String} The explicit namespace identifier of the node
	   */
	  flow.namespace.localName = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidNamespaceArgs);
	    if (flow.namespace.localName.cache === null) {
	      flow.namespace.localName.cache = flow.name().split(_consts.NS_SEPARATOR).pop();
	    }
	    return flow.namespace.localName.cache;
	  };
	  flow.namespace.localName.cache = null;
	  /**
	   * **Getter only**.
	   * Return the full namespace of the node including:
	   *  - implicit namespace identifiers (see {@link flow.namespace.implicit}),
	   *  - explicit namespace identifiers (see {@link flow.namespace.explicit})
	   *  - and the local name. (see {@link flow.namespace.localName})
	   *
	   * ```
	   * let foo = nflow
	   *   .create('a')
	   *   .create('b')
	   *   .create('x:y:foo')
	   *
	   * foo.namespace.full() // -> ["nflow", "a", "b", "x", "y", "foo"]
	   * ```
	   * @tutorial namespacing
	   * @return {String[]} The full namespace of the node
	   * @alias namespace.full
	   * @memberof flow
	   * */
	  flow.namespace.full = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidNamespaceArgs);
	    return flow.namespace().split(_consts.NS_SEPARATOR);
	  };
	
	  /**
	   * @internal
	   * Checks if the emitted event and the receiving node are in compatible namespaces.
	   * An event can be delivered if the following checks pass:
	   *  - the local names are the same
	   *  - the full NS of the sender contains the explicit NS of the receiver
	   *  - the full NS of the receiver contains the explicit NS of the sender
	   * @param  {flow} listenerNode The node receiving the event
	   * @param  {String} listenerName the name of the event, optionally including the explicit namespace, eg.:`x:y:foo`
	   * @return {Boolean} true if the event can be delivered to the receiving node
	   */
	  flow.namespace.match = function (listenerNode, listenerName) {
	    (0, _utils.assert)(typeof listenerName !== 'string', _consts.ERRORS.invalidListener, listenerName);
	
	    // 1. Check that the local names match
	    if (!isLocalNameMatch({ id: flow.namespace.localName(), f: flow }, listenerName)) return false;
	    // 2. Check that the receiver's explicit NS matches the sender's NS
	    if (!isNamespaceMatch(flow, flow.name(), listenerNode.namespace.localise(listenerName))) return false;
	    // 2. Check that the sender's explicit NS matches the receiver's NS
	    if (!isNamespaceMatch(listenerNode, listenerName, flow.namespace.localise(flow.name()))) return false;
	    return true;
	  };
	
	  /*
	   * Checks if the node's FULL NS matches the name's explicit identifiers
	   * @param  {flow}  node the node to get the full NS from
	   * @param  {String}  localisedNameTo The node name to get the explicit identifiers from
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
	
	/*
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

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(25);
	
	__webpack_require__(66);
	
	__webpack_require__(72);
	
	__webpack_require__(73);
	
	__webpack_require__(74);
	
	__webpack_require__(75);
	
	__webpack_require__(76);
	
	__webpack_require__(77);
	
	__webpack_require__(78);
	
	__webpack_require__(79);
	
	__webpack_require__(80);
	
	__webpack_require__(81);
	
	__webpack_require__(82);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _nflow = __webpack_require__(1);
	
	var _nflow2 = _interopRequireDefault(_nflow);
	
	var _chai = __webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/* globals describe, it, beforeEach */
	var sut;
	
	describe('Caching', function () {
	  beforeEach(function () {
	    sut = _nflow2['default'].create('sut').parent(null).call(tree);
	  });
	
	  /**
	   * creates a binary tree for testing:
	   *       root
	   *    a        b
	   *  w   x    y   z
	   * @param  {Flow} parent optional parent node
	   * @return {null}
	   */
	  var tree = function tree(p) {
	    var root = (p || sut).create('root');
	    var a = root.create('a');
	    var b = root.create('b');
	    a.create('w');
	    a.create('x');
	    b.create('y');
	    b.create('z');
	  };
	
	  var noop = function noop() {};
	
	  describe('Listener Cache', function () {
	    it('should cache new listeners', function () {
	      sut.get('w').on('foo', noop);
	      (0, _chai.expect)(sut.on.listenerCache).to.deep.equal({ foo: true });
	      sut.get('w').on('foo1', noop);
	      (0, _chai.expect)(sut.on.listenerCache).to.deep.equal({ foo: true, foo1: true });
	      sut.get('w').on('foo1', null);
	      sut.get('z').on('bar', noop);
	      (0, _chai.expect)(sut.on.listenerCache).to.deep.equal({ foo: true, bar: true });
	      sut.on('baz', noop);
	      (0, _chai.expect)(sut.on.listenerCache).to.deep.equal({ foo: true, bar: true, baz: true });
	    });
	
	    it('should un-cache removed listeners', function () {
	      sut.get('w').on('foo', noop);
	      sut.get('z').on('bar', noop);
	      sut.on('baz', noop);
	      (0, _chai.expect)(sut.on.listenerCache).to.deep.equal({ foo: true, bar: true, baz: true });
	      sut.get('w').on('foo', null);
	      (0, _chai.expect)(sut.on.listenerCache).to.deep.equal({ bar: true, baz: true });
	      sut.on('baz', null);
	      (0, _chai.expect)(sut.on.listenerCache).to.deep.equal({ bar: true });
	      sut.get('z').on('bar', null);
	      (0, _chai.expect)(sut.on.listenerCache).to.deep.equal({});
	    });
	
	    it('should store local names without any namespace', function () {
	      sut.get('w').on('a:foo', noop);
	      sut.get('z').on('b:bar', noop);
	      sut.on('c:x:baz', noop);
	      (0, _chai.expect)(sut.on.listenerCache).to.deep.equal({ foo: true, bar: true, baz: true });
	    });
	
	    it('should update cache after unparenting', function () {
	      sut.get('w').on('foo', noop);
	      sut.get('z').on('bar', noop);
	      sut.on('baz', noop);
	      (0, _chai.expect)(sut.on.listenerCache).to.deep.equal({ foo: true, bar: true, baz: true });
	      sut.get('z').parent(null);
	      (0, _chai.expect)(sut.on.listenerCache).to.deep.equal({ foo: true, baz: true });
	    });
	
	    it('should update cache after reparenting', function () {
	      sut.get('w').on('foo', noop);
	      sut.get('z').on('bar', noop);
	      sut.on('baz', noop);
	      (0, _chai.expect)(sut.on.listenerCache).to.deep.equal({ foo: true, bar: true, baz: true });
	      sut.get('z').parent(sut.get('w'));
	      (0, _chai.expect)(sut.on.listenerCache).to.deep.equal({ foo: true, bar: true, baz: true });
	      sut.create('newkid').parent(null).on('new', noop).parent(sut.get('x'));
	      (0, _chai.expect)(sut.on.listenerCache).to.deep.equal({ foo: true, bar: true, baz: true, 'new': true });
	    });
	
	    it('should update cache after emitting', function () {
	      sut.get('w').on('foo', noop);
	      sut.get('z').on('bar', noop);
	      sut.on('baz', noop);
	      sut.get('z').emit();
	      (0, _chai.expect)(sut.on.listenerCache).to.deep.equal({ foo: true, baz: true });
	    });
	
	    it('should update cache after disposing', function () {
	      sut.get('w').on('foo', noop);
	      sut.get('z').on('bar', noop);
	      sut.on('baz', noop);
	      sut.get('a').dispose();
	      (0, _chai.expect)(sut.on.listenerCache).to.deep.equal({ baz: true, bar: true });
	    });
	  });
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(27);


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	var used = []
	  , exports = module.exports = {};
	
	/*!
	 * Chai version
	 */
	
	exports.version = '3.5.0';
	
	/*!
	 * Assertion Error
	 */
	
	exports.AssertionError = __webpack_require__(28);
	
	/*!
	 * Utils for plugins (not exported)
	 */
	
	var util = __webpack_require__(29);
	
	/**
	 * # .use(function)
	 *
	 * Provides a way to extend the internals of Chai
	 *
	 * @param {Function}
	 * @returns {this} for chaining
	 * @api public
	 */
	
	exports.use = function (fn) {
	  if (!~used.indexOf(fn)) {
	    fn(this, util);
	    used.push(fn);
	  }
	
	  return this;
	};
	
	/*!
	 * Utility Functions
	 */
	
	exports.util = util;
	
	/*!
	 * Configuration
	 */
	
	var config = __webpack_require__(42);
	exports.config = config;
	
	/*!
	 * Primary `Assertion` prototype
	 */
	
	var assertion = __webpack_require__(61);
	exports.use(assertion);
	
	/*!
	 * Core Assertions
	 */
	
	var core = __webpack_require__(62);
	exports.use(core);
	
	/*!
	 * Expect interface
	 */
	
	var expect = __webpack_require__(63);
	exports.use(expect);
	
	/*!
	 * Should interface
	 */
	
	var should = __webpack_require__(64);
	exports.use(should);
	
	/*!
	 * Assert interface
	 */
	
	var assert = __webpack_require__(65);
	exports.use(assert);


/***/ },
/* 28 */
/***/ function(module, exports) {

	/*!
	 * assertion-error
	 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
	 * MIT Licensed
	 */
	
	/*!
	 * Return a function that will copy properties from
	 * one object to another excluding any originally
	 * listed. Returned function will create a new `{}`.
	 *
	 * @param {String} excluded properties ...
	 * @return {Function}
	 */
	
	function exclude () {
	  var excludes = [].slice.call(arguments);
	
	  function excludeProps (res, obj) {
	    Object.keys(obj).forEach(function (key) {
	      if (!~excludes.indexOf(key)) res[key] = obj[key];
	    });
	  }
	
	  return function extendExclude () {
	    var args = [].slice.call(arguments)
	      , i = 0
	      , res = {};
	
	    for (; i < args.length; i++) {
	      excludeProps(res, args[i]);
	    }
	
	    return res;
	  };
	};
	
	/*!
	 * Primary Exports
	 */
	
	module.exports = AssertionError;
	
	/**
	 * ### AssertionError
	 *
	 * An extension of the JavaScript `Error` constructor for
	 * assertion and validation scenarios.
	 *
	 * @param {String} message
	 * @param {Object} properties to include (optional)
	 * @param {callee} start stack function (optional)
	 */
	
	function AssertionError (message, _props, ssf) {
	  var extend = exclude('name', 'message', 'stack', 'constructor', 'toJSON')
	    , props = extend(_props || {});
	
	  // default values
	  this.message = message || 'Unspecified AssertionError';
	  this.showDiff = false;
	
	  // copy from properties
	  for (var key in props) {
	    this[key] = props[key];
	  }
	
	  // capture stack trace
	  ssf = ssf || arguments.callee;
	  if (ssf && Error.captureStackTrace) {
	    Error.captureStackTrace(this, ssf);
	  } else {
	    try {
	      throw new Error();
	    } catch(e) {
	      this.stack = e.stack;
	    }
	  }
	}
	
	/*!
	 * Inherit from Error.prototype
	 */
	
	AssertionError.prototype = Object.create(Error.prototype);
	
	/*!
	 * Statically set name
	 */
	
	AssertionError.prototype.name = 'AssertionError';
	
	/*!
	 * Ensure correct constructor
	 */
	
	AssertionError.prototype.constructor = AssertionError;
	
	/**
	 * Allow errors to be converted to JSON for static transfer.
	 *
	 * @param {Boolean} include stack (default: `true`)
	 * @return {Object} object that can be `JSON.stringify`
	 */
	
	AssertionError.prototype.toJSON = function (stack) {
	  var extend = exclude('constructor', 'toJSON', 'stack')
	    , props = extend({ name: this.name }, this);
	
	  // include stack if exists and not turned off
	  if (false !== stack && this.stack) {
	    props.stack = this.stack;
	  }
	
	  return props;
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * chai
	 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/*!
	 * Main exports
	 */
	
	var exports = module.exports = {};
	
	/*!
	 * test utility
	 */
	
	exports.test = __webpack_require__(30);
	
	/*!
	 * type utility
	 */
	
	exports.type = __webpack_require__(32);
	
	/*!
	 * expectTypes utility
	 */
	exports.expectTypes = __webpack_require__(34);
	
	/*!
	 * message utility
	 */
	
	exports.getMessage = __webpack_require__(35);
	
	/*!
	 * actual utility
	 */
	
	exports.getActual = __webpack_require__(36);
	
	/*!
	 * Inspect util
	 */
	
	exports.inspect = __webpack_require__(37);
	
	/*!
	 * Object Display util
	 */
	
	exports.objDisplay = __webpack_require__(41);
	
	/*!
	 * Flag utility
	 */
	
	exports.flag = __webpack_require__(31);
	
	/*!
	 * Flag transferring utility
	 */
	
	exports.transferFlags = __webpack_require__(43);
	
	/*!
	 * Deep equal utility
	 */
	
	exports.eql = __webpack_require__(44);
	
	/*!
	 * Deep path value
	 */
	
	exports.getPathValue = __webpack_require__(52);
	
	/*!
	 * Deep path info
	 */
	
	exports.getPathInfo = __webpack_require__(53);
	
	/*!
	 * Check if a property exists
	 */
	
	exports.hasProperty = __webpack_require__(54);
	
	/*!
	 * Function name
	 */
	
	exports.getName = __webpack_require__(38);
	
	/*!
	 * add Property
	 */
	
	exports.addProperty = __webpack_require__(55);
	
	/*!
	 * add Method
	 */
	
	exports.addMethod = __webpack_require__(56);
	
	/*!
	 * overwrite Property
	 */
	
	exports.overwriteProperty = __webpack_require__(57);
	
	/*!
	 * overwrite Method
	 */
	
	exports.overwriteMethod = __webpack_require__(58);
	
	/*!
	 * Add a chainable method
	 */
	
	exports.addChainableMethod = __webpack_require__(59);
	
	/*!
	 * Overwrite chainable method
	 */
	
	exports.overwriteChainableMethod = __webpack_require__(60);


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - test utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/*!
	 * Module dependancies
	 */
	
	var flag = __webpack_require__(31);
	
	/**
	 * # test(object, expression)
	 *
	 * Test and object for expression.
	 *
	 * @param {Object} object (constructed Assertion)
	 * @param {Arguments} chai.Assertion.prototype.assert arguments
	 * @namespace Utils
	 * @name test
	 */
	
	module.exports = function (obj, args) {
	  var negate = flag(obj, 'negate')
	    , expr = args[0];
	  return negate ? !expr : expr;
	};


/***/ },
/* 31 */
/***/ function(module, exports) {

	/*!
	 * Chai - flag utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * ### flag(object, key, [value])
	 *
	 * Get or set a flag value on an object. If a
	 * value is provided it will be set, else it will
	 * return the currently set value or `undefined` if
	 * the value is not set.
	 *
	 *     utils.flag(this, 'foo', 'bar'); // setter
	 *     utils.flag(this, 'foo'); // getter, returns `bar`
	 *
	 * @param {Object} object constructed Assertion
	 * @param {String} key
	 * @param {Mixed} value (optional)
	 * @namespace Utils
	 * @name flag
	 * @api private
	 */
	
	module.exports = function (obj, key, value) {
	  var flags = obj.__flags || (obj.__flags = Object.create(null));
	  if (arguments.length === 3) {
	    flags[key] = value;
	  } else {
	    return flags[key];
	  }
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(33);


/***/ },
/* 33 */
/***/ function(module, exports) {

	/*!
	 * type-detect
	 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/*!
	 * Primary Exports
	 */
	
	var exports = module.exports = getType;
	
	/**
	 * ### typeOf (obj)
	 *
	 * Use several different techniques to determine
	 * the type of object being tested.
	 *
	 *
	 * @param {Mixed} object
	 * @return {String} object type
	 * @api public
	 */
	var objectTypeRegexp = /^\[object (.*)\]$/;
	
	function getType(obj) {
	  var type = Object.prototype.toString.call(obj).match(objectTypeRegexp)[1].toLowerCase();
	  // Let "new String('')" return 'object'
	  if (typeof Promise === 'function' && obj instanceof Promise) return 'promise';
	  // PhantomJS has type "DOMWindow" for null
	  if (obj === null) return 'null';
	  // PhantomJS has type "DOMWindow" for undefined
	  if (obj === undefined) return 'undefined';
	  return type;
	}
	
	exports.Library = Library;
	
	/**
	 * ### Library
	 *
	 * Create a repository for custom type detection.
	 *
	 * ```js
	 * var lib = new type.Library;
	 * ```
	 *
	 */
	
	function Library() {
	  if (!(this instanceof Library)) return new Library();
	  this.tests = {};
	}
	
	/**
	 * #### .of (obj)
	 *
	 * Expose replacement `typeof` detection to the library.
	 *
	 * ```js
	 * if ('string' === lib.of('hello world')) {
	 *   // ...
	 * }
	 * ```
	 *
	 * @param {Mixed} object to test
	 * @return {String} type
	 */
	
	Library.prototype.of = getType;
	
	/**
	 * #### .define (type, test)
	 *
	 * Add a test to for the `.test()` assertion.
	 *
	 * Can be defined as a regular expression:
	 *
	 * ```js
	 * lib.define('int', /^[0-9]+$/);
	 * ```
	 *
	 * ... or as a function:
	 *
	 * ```js
	 * lib.define('bln', function (obj) {
	 *   if ('boolean' === lib.of(obj)) return true;
	 *   var blns = [ 'yes', 'no', 'true', 'false', 1, 0 ];
	 *   if ('string' === lib.of(obj)) obj = obj.toLowerCase();
	 *   return !! ~blns.indexOf(obj);
	 * });
	 * ```
	 *
	 * @param {String} type
	 * @param {RegExp|Function} test
	 * @api public
	 */
	
	Library.prototype.define = function(type, test) {
	  if (arguments.length === 1) return this.tests[type];
	  this.tests[type] = test;
	  return this;
	};
	
	/**
	 * #### .test (obj, test)
	 *
	 * Assert that an object is of type. Will first
	 * check natives, and if that does not pass it will
	 * use the user defined custom tests.
	 *
	 * ```js
	 * assert(lib.test('1', 'int'));
	 * assert(lib.test('yes', 'bln'));
	 * ```
	 *
	 * @param {Mixed} object
	 * @param {String} type
	 * @return {Boolean} result
	 * @api public
	 */
	
	Library.prototype.test = function(obj, type) {
	  if (type === getType(obj)) return true;
	  var test = this.tests[type];
	
	  if (test && 'regexp' === getType(test)) {
	    return test.test(obj);
	  } else if (test && 'function' === getType(test)) {
	    return test(obj);
	  } else {
	    throw new ReferenceError('Type test "' + type + '" not defined or invalid.');
	  }
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - expectTypes utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * ### expectTypes(obj, types)
	 *
	 * Ensures that the object being tested against is of a valid type.
	 *
	 *     utils.expectTypes(this, ['array', 'object', 'string']);
	 *
	 * @param {Mixed} obj constructed Assertion
	 * @param {Array} type A list of allowed types for this assertion
	 * @namespace Utils
	 * @name expectTypes
	 * @api public
	 */
	
	var AssertionError = __webpack_require__(28);
	var flag = __webpack_require__(31);
	var type = __webpack_require__(32);
	
	module.exports = function (obj, types) {
	  var obj = flag(obj, 'object');
	  types = types.map(function (t) { return t.toLowerCase(); });
	  types.sort();
	
	  // Transforms ['lorem', 'ipsum'] into 'a lirum, or an ipsum'
	  var str = types.map(function (t, index) {
	    var art = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(t.charAt(0)) ? 'an' : 'a';
	    var or = types.length > 1 && index === types.length - 1 ? 'or ' : '';
	    return or + art + ' ' + t;
	  }).join(', ');
	
	  if (!types.some(function (expected) { return type(obj) === expected; })) {
	    throw new AssertionError(
	      'object tested must be ' + str + ', but ' + type(obj) + ' given'
	    );
	  }
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - message composition utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/*!
	 * Module dependancies
	 */
	
	var flag = __webpack_require__(31)
	  , getActual = __webpack_require__(36)
	  , inspect = __webpack_require__(37)
	  , objDisplay = __webpack_require__(41);
	
	/**
	 * ### .getMessage(object, message, negateMessage)
	 *
	 * Construct the error message based on flags
	 * and template tags. Template tags will return
	 * a stringified inspection of the object referenced.
	 *
	 * Message template tags:
	 * - `#{this}` current asserted object
	 * - `#{act}` actual value
	 * - `#{exp}` expected value
	 *
	 * @param {Object} object (constructed Assertion)
	 * @param {Arguments} chai.Assertion.prototype.assert arguments
	 * @namespace Utils
	 * @name getMessage
	 * @api public
	 */
	
	module.exports = function (obj, args) {
	  var negate = flag(obj, 'negate')
	    , val = flag(obj, 'object')
	    , expected = args[3]
	    , actual = getActual(obj, args)
	    , msg = negate ? args[2] : args[1]
	    , flagMsg = flag(obj, 'message');
	
	  if(typeof msg === "function") msg = msg();
	  msg = msg || '';
	  msg = msg
	    .replace(/#\{this\}/g, function () { return objDisplay(val); })
	    .replace(/#\{act\}/g, function () { return objDisplay(actual); })
	    .replace(/#\{exp\}/g, function () { return objDisplay(expected); });
	
	  return flagMsg ? flagMsg + ': ' + msg : msg;
	};


/***/ },
/* 36 */
/***/ function(module, exports) {

	/*!
	 * Chai - getActual utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * # getActual(object, [actual])
	 *
	 * Returns the `actual` value for an Assertion
	 *
	 * @param {Object} object (constructed Assertion)
	 * @param {Arguments} chai.Assertion.prototype.assert arguments
	 * @namespace Utils
	 * @name getActual
	 */
	
	module.exports = function (obj, args) {
	  return args.length > 4 ? args[4] : obj._obj;
	};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// This is (almost) directly from Node.js utils
	// https://github.com/joyent/node/blob/f8c335d0caf47f16d31413f89aa28eda3878e3aa/lib/util.js
	
	var getName = __webpack_require__(38);
	var getProperties = __webpack_require__(39);
	var getEnumerableProperties = __webpack_require__(40);
	
	module.exports = inspect;
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Boolean} showHidden Flag that shows hidden (not enumerable)
	 *    properties of objects.
	 * @param {Number} depth Depth in which to descend in object. Default is 2.
	 * @param {Boolean} colors Flag to turn on ANSI escape codes to color the
	 *    output. Default is false (no coloring).
	 * @namespace Utils
	 * @name inspect
	 */
	function inspect(obj, showHidden, depth, colors) {
	  var ctx = {
	    showHidden: showHidden,
	    seen: [],
	    stylize: function (str) { return str; }
	  };
	  return formatValue(ctx, obj, (typeof depth === 'undefined' ? 2 : depth));
	}
	
	// Returns true if object is a DOM element.
	var isDOMElement = function (object) {
	  if (typeof HTMLElement === 'object') {
	    return object instanceof HTMLElement;
	  } else {
	    return object &&
	      typeof object === 'object' &&
	      object.nodeType === 1 &&
	      typeof object.nodeName === 'string';
	  }
	};
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (value && typeof value.inspect === 'function' &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes);
	    if (typeof ret !== 'string') {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // If this is a DOM element, try to get the outer HTML.
	  if (isDOMElement(value)) {
	    if ('outerHTML' in value) {
	      return value.outerHTML;
	      // This value does not have an outerHTML attribute,
	      //   it could still be an XML element
	    } else {
	      // Attempt to serialize it
	      try {
	        if (document.xmlVersion) {
	          var xmlSerializer = new XMLSerializer();
	          return xmlSerializer.serializeToString(value);
	        } else {
	          // Firefox 11- do not support outerHTML
	          //   It does, however, support innerHTML
	          //   Use the following to render the element
	          var ns = "http://www.w3.org/1999/xhtml";
	          var container = document.createElementNS(ns, '_');
	
	          container.appendChild(value.cloneNode(false));
	          html = container.innerHTML
	            .replace('><', '>' + value.innerHTML + '<');
	          container.innerHTML = '';
	          return html;
	        }
	      } catch (err) {
	        // This could be a non-native DOM implementation,
	        //   continue with the normal flow:
	        //   printing the element as if it is an object.
	      }
	    }
	  }
	
	  // Look up the keys of the object.
	  var visibleKeys = getEnumerableProperties(value);
	  var keys = ctx.showHidden ? getProperties(value) : visibleKeys;
	
	  // Some type of object without properties can be shortcutted.
	  // In IE, errors have a single `stack` property, or if they are vanilla `Error`,
	  // a `stack` plus `description` property; ignore those for consistency.
	  if (keys.length === 0 || (isError(value) && (
	      (keys.length === 1 && keys[0] === 'stack') ||
	      (keys.length === 2 && keys[0] === 'description' && keys[1] === 'stack')
	     ))) {
	    if (typeof value === 'function') {
	      var name = getName(value);
	      var nameSuffix = name ? ': ' + name : '';
	      return ctx.stylize('[Function' + nameSuffix + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toUTCString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (typeof value === 'function') {
	    var name = getName(value);
	    var nameSuffix = name ? ': ' + name : '';
	    base = ' [Function' + nameSuffix + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    return formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  switch (typeof value) {
	    case 'undefined':
	      return ctx.stylize('undefined', 'undefined');
	
	    case 'string':
	      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                               .replace(/'/g, "\\'")
	                                               .replace(/\\"/g, '"') + '\'';
	      return ctx.stylize(simple, 'string');
	
	    case 'number':
	      if (value === 0 && (1/value) === -Infinity) {
	        return ctx.stylize('-0', 'number');
	      }
	      return ctx.stylize('' + value, 'number');
	
	    case 'boolean':
	      return ctx.stylize('' + value, 'boolean');
	  }
	  // For some reason typeof null is "object", so special case here.
	  if (value === null) {
	    return ctx.stylize('null', 'null');
	  }
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (Object.prototype.hasOwnProperty.call(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str;
	  if (value.__lookupGetter__) {
	    if (value.__lookupGetter__(key)) {
	      if (value.__lookupSetter__(key)) {
	        str = ctx.stylize('[Getter/Setter]', 'special');
	      } else {
	        str = ctx.stylize('[Getter]', 'special');
	      }
	    } else {
	      if (value.__lookupSetter__(key)) {
	        str = ctx.stylize('[Setter]', 'special');
	      }
	    }
	  }
	  if (visibleKeys.indexOf(key) < 0) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(value[key]) < 0) {
	      if (recurseTimes === null) {
	        str = formatValue(ctx, value[key], null);
	      } else {
	        str = formatValue(ctx, value[key], recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (typeof name === 'undefined') {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	function isArray(ar) {
	  return Array.isArray(ar) ||
	         (typeof ar === 'object' && objectToString(ar) === '[object Array]');
	}
	
	function isRegExp(re) {
	  return typeof re === 'object' && objectToString(re) === '[object RegExp]';
	}
	
	function isDate(d) {
	  return typeof d === 'object' && objectToString(d) === '[object Date]';
	}
	
	function isError(e) {
	  return typeof e === 'object' && objectToString(e) === '[object Error]';
	}
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


/***/ },
/* 38 */
/***/ function(module, exports) {

	/*!
	 * Chai - getName utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * # getName(func)
	 *
	 * Gets the name of a function, in a cross-browser way.
	 *
	 * @param {Function} a function (usually a constructor)
	 * @namespace Utils
	 * @name getName
	 */
	
	module.exports = function (func) {
	  if (func.name) return func.name;
	
	  var match = /^\s?function ([^(]*)\(/.exec(func);
	  return match && match[1] ? match[1] : "";
	};


/***/ },
/* 39 */
/***/ function(module, exports) {

	/*!
	 * Chai - getProperties utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * ### .getProperties(object)
	 *
	 * This allows the retrieval of property names of an object, enumerable or not,
	 * inherited or not.
	 *
	 * @param {Object} object
	 * @returns {Array}
	 * @namespace Utils
	 * @name getProperties
	 * @api public
	 */
	
	module.exports = function getProperties(object) {
	  var result = Object.getOwnPropertyNames(object);
	
	  function addProperty(property) {
	    if (result.indexOf(property) === -1) {
	      result.push(property);
	    }
	  }
	
	  var proto = Object.getPrototypeOf(object);
	  while (proto !== null) {
	    Object.getOwnPropertyNames(proto).forEach(addProperty);
	    proto = Object.getPrototypeOf(proto);
	  }
	
	  return result;
	};


/***/ },
/* 40 */
/***/ function(module, exports) {

	/*!
	 * Chai - getEnumerableProperties utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * ### .getEnumerableProperties(object)
	 *
	 * This allows the retrieval of enumerable property names of an object,
	 * inherited or not.
	 *
	 * @param {Object} object
	 * @returns {Array}
	 * @namespace Utils
	 * @name getEnumerableProperties
	 * @api public
	 */
	
	module.exports = function getEnumerableProperties(object) {
	  var result = [];
	  for (var name in object) {
	    result.push(name);
	  }
	  return result;
	};


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - flag utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/*!
	 * Module dependancies
	 */
	
	var inspect = __webpack_require__(37);
	var config = __webpack_require__(42);
	
	/**
	 * ### .objDisplay (object)
	 *
	 * Determines if an object or an array matches
	 * criteria to be inspected in-line for error
	 * messages or should be truncated.
	 *
	 * @param {Mixed} javascript object to inspect
	 * @name objDisplay
	 * @namespace Utils
	 * @api public
	 */
	
	module.exports = function (obj) {
	  var str = inspect(obj)
	    , type = Object.prototype.toString.call(obj);
	
	  if (config.truncateThreshold && str.length >= config.truncateThreshold) {
	    if (type === '[object Function]') {
	      return !obj.name || obj.name === ''
	        ? '[Function]'
	        : '[Function: ' + obj.name + ']';
	    } else if (type === '[object Array]') {
	      return '[ Array(' + obj.length + ') ]';
	    } else if (type === '[object Object]') {
	      var keys = Object.keys(obj)
	        , kstr = keys.length > 2
	          ? keys.splice(0, 2).join(', ') + ', ...'
	          : keys.join(', ');
	      return '{ Object (' + kstr + ') }';
	    } else {
	      return str;
	    }
	  } else {
	    return str;
	  }
	};


/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = {
	
	  /**
	   * ### config.includeStack
	   *
	   * User configurable property, influences whether stack trace
	   * is included in Assertion error message. Default of false
	   * suppresses stack trace in the error message.
	   *
	   *     chai.config.includeStack = true;  // enable stack on error
	   *
	   * @param {Boolean}
	   * @api public
	   */
	
	   includeStack: false,
	
	  /**
	   * ### config.showDiff
	   *
	   * User configurable property, influences whether or not
	   * the `showDiff` flag should be included in the thrown
	   * AssertionErrors. `false` will always be `false`; `true`
	   * will be true when the assertion has requested a diff
	   * be shown.
	   *
	   * @param {Boolean}
	   * @api public
	   */
	
	  showDiff: true,
	
	  /**
	   * ### config.truncateThreshold
	   *
	   * User configurable property, sets length threshold for actual and
	   * expected values in assertion errors. If this threshold is exceeded, for
	   * example for large data structures, the value is replaced with something
	   * like `[ Array(3) ]` or `{ Object (prop1, prop2) }`.
	   *
	   * Set it to zero if you want to disable truncating altogether.
	   *
	   * This is especially userful when doing assertions on arrays: having this
	   * set to a reasonable large value makes the failure messages readily
	   * inspectable.
	   *
	   *     chai.config.truncateThreshold = 0;  // disable truncating
	   *
	   * @param {Number}
	   * @api public
	   */
	
	  truncateThreshold: 40
	
	};


/***/ },
/* 43 */
/***/ function(module, exports) {

	/*!
	 * Chai - transferFlags utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * ### transferFlags(assertion, object, includeAll = true)
	 *
	 * Transfer all the flags for `assertion` to `object`. If
	 * `includeAll` is set to `false`, then the base Chai
	 * assertion flags (namely `object`, `ssfi`, and `message`)
	 * will not be transferred.
	 *
	 *
	 *     var newAssertion = new Assertion();
	 *     utils.transferFlags(assertion, newAssertion);
	 *
	 *     var anotherAsseriton = new Assertion(myObj);
	 *     utils.transferFlags(assertion, anotherAssertion, false);
	 *
	 * @param {Assertion} assertion the assertion to transfer the flags from
	 * @param {Object} object the object to transfer the flags to; usually a new assertion
	 * @param {Boolean} includeAll
	 * @namespace Utils
	 * @name transferFlags
	 * @api private
	 */
	
	module.exports = function (assertion, object, includeAll) {
	  var flags = assertion.__flags || (assertion.__flags = Object.create(null));
	
	  if (!object.__flags) {
	    object.__flags = Object.create(null);
	  }
	
	  includeAll = arguments.length === 3 ? includeAll : true;
	
	  for (var flag in flags) {
	    if (includeAll ||
	        (flag !== 'object' && flag !== 'ssfi' && flag != 'message')) {
	      object.__flags[flag] = flags[flag];
	    }
	  }
	};


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(45);


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * deep-eql
	 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/*!
	 * Module dependencies
	 */
	
	var type = __webpack_require__(46);
	
	/*!
	 * Buffer.isBuffer browser shim
	 */
	
	var Buffer;
	try { Buffer = __webpack_require__(48).Buffer; }
	catch(ex) {
	  Buffer = {};
	  Buffer.isBuffer = function() { return false; }
	}
	
	/*!
	 * Primary Export
	 */
	
	module.exports = deepEqual;
	
	/**
	 * Assert super-strict (egal) equality between
	 * two objects of any type.
	 *
	 * @param {Mixed} a
	 * @param {Mixed} b
	 * @param {Array} memoised (optional)
	 * @return {Boolean} equal match
	 */
	
	function deepEqual(a, b, m) {
	  if (sameValue(a, b)) {
	    return true;
	  } else if ('date' === type(a)) {
	    return dateEqual(a, b);
	  } else if ('regexp' === type(a)) {
	    return regexpEqual(a, b);
	  } else if (Buffer.isBuffer(a)) {
	    return bufferEqual(a, b);
	  } else if ('arguments' === type(a)) {
	    return argumentsEqual(a, b, m);
	  } else if (!typeEqual(a, b)) {
	    return false;
	  } else if (('object' !== type(a) && 'object' !== type(b))
	  && ('array' !== type(a) && 'array' !== type(b))) {
	    return sameValue(a, b);
	  } else {
	    return objectEqual(a, b, m);
	  }
	}
	
	/*!
	 * Strict (egal) equality test. Ensures that NaN always
	 * equals NaN and `-0` does not equal `+0`.
	 *
	 * @param {Mixed} a
	 * @param {Mixed} b
	 * @return {Boolean} equal match
	 */
	
	function sameValue(a, b) {
	  if (a === b) return a !== 0 || 1 / a === 1 / b;
	  return a !== a && b !== b;
	}
	
	/*!
	 * Compare the types of two given objects and
	 * return if they are equal. Note that an Array
	 * has a type of `array` (not `object`) and arguments
	 * have a type of `arguments` (not `array`/`object`).
	 *
	 * @param {Mixed} a
	 * @param {Mixed} b
	 * @return {Boolean} result
	 */
	
	function typeEqual(a, b) {
	  return type(a) === type(b);
	}
	
	/*!
	 * Compare two Date objects by asserting that
	 * the time values are equal using `saveValue`.
	 *
	 * @param {Date} a
	 * @param {Date} b
	 * @return {Boolean} result
	 */
	
	function dateEqual(a, b) {
	  if ('date' !== type(b)) return false;
	  return sameValue(a.getTime(), b.getTime());
	}
	
	/*!
	 * Compare two regular expressions by converting them
	 * to string and checking for `sameValue`.
	 *
	 * @param {RegExp} a
	 * @param {RegExp} b
	 * @return {Boolean} result
	 */
	
	function regexpEqual(a, b) {
	  if ('regexp' !== type(b)) return false;
	  return sameValue(a.toString(), b.toString());
	}
	
	/*!
	 * Assert deep equality of two `arguments` objects.
	 * Unfortunately, these must be sliced to arrays
	 * prior to test to ensure no bad behavior.
	 *
	 * @param {Arguments} a
	 * @param {Arguments} b
	 * @param {Array} memoize (optional)
	 * @return {Boolean} result
	 */
	
	function argumentsEqual(a, b, m) {
	  if ('arguments' !== type(b)) return false;
	  a = [].slice.call(a);
	  b = [].slice.call(b);
	  return deepEqual(a, b, m);
	}
	
	/*!
	 * Get enumerable properties of a given object.
	 *
	 * @param {Object} a
	 * @return {Array} property names
	 */
	
	function enumerable(a) {
	  var res = [];
	  for (var key in a) res.push(key);
	  return res;
	}
	
	/*!
	 * Simple equality for flat iterable objects
	 * such as Arrays or Node.js buffers.
	 *
	 * @param {Iterable} a
	 * @param {Iterable} b
	 * @return {Boolean} result
	 */
	
	function iterableEqual(a, b) {
	  if (a.length !==  b.length) return false;
	
	  var i = 0;
	  var match = true;
	
	  for (; i < a.length; i++) {
	    if (a[i] !== b[i]) {
	      match = false;
	      break;
	    }
	  }
	
	  return match;
	}
	
	/*!
	 * Extension to `iterableEqual` specifically
	 * for Node.js Buffers.
	 *
	 * @param {Buffer} a
	 * @param {Mixed} b
	 * @return {Boolean} result
	 */
	
	function bufferEqual(a, b) {
	  if (!Buffer.isBuffer(b)) return false;
	  return iterableEqual(a, b);
	}
	
	/*!
	 * Block for `objectEqual` ensuring non-existing
	 * values don't get in.
	 *
	 * @param {Mixed} object
	 * @return {Boolean} result
	 */
	
	function isValue(a) {
	  return a !== null && a !== undefined;
	}
	
	/*!
	 * Recursively check the equality of two objects.
	 * Once basic sameness has been established it will
	 * defer to `deepEqual` for each enumerable key
	 * in the object.
	 *
	 * @param {Mixed} a
	 * @param {Mixed} b
	 * @return {Boolean} result
	 */
	
	function objectEqual(a, b, m) {
	  if (!isValue(a) || !isValue(b)) {
	    return false;
	  }
	
	  if (a.prototype !== b.prototype) {
	    return false;
	  }
	
	  var i;
	  if (m) {
	    for (i = 0; i < m.length; i++) {
	      if ((m[i][0] === a && m[i][1] === b)
	      ||  (m[i][0] === b && m[i][1] === a)) {
	        return true;
	      }
	    }
	  } else {
	    m = [];
	  }
	
	  try {
	    var ka = enumerable(a);
	    var kb = enumerable(b);
	  } catch (ex) {
	    return false;
	  }
	
	  ka.sort();
	  kb.sort();
	
	  if (!iterableEqual(ka, kb)) {
	    return false;
	  }
	
	  m.push([ a, b ]);
	
	  var key;
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], m)) {
	      return false;
	    }
	  }
	
	  return true;
	}


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(47);


/***/ },
/* 47 */
/***/ function(module, exports) {

	/*!
	 * type-detect
	 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/*!
	 * Primary Exports
	 */
	
	var exports = module.exports = getType;
	
	/*!
	 * Detectable javascript natives
	 */
	
	var natives = {
	    '[object Array]': 'array'
	  , '[object RegExp]': 'regexp'
	  , '[object Function]': 'function'
	  , '[object Arguments]': 'arguments'
	  , '[object Date]': 'date'
	};
	
	/**
	 * ### typeOf (obj)
	 *
	 * Use several different techniques to determine
	 * the type of object being tested.
	 *
	 *
	 * @param {Mixed} object
	 * @return {String} object type
	 * @api public
	 */
	
	function getType (obj) {
	  var str = Object.prototype.toString.call(obj);
	  if (natives[str]) return natives[str];
	  if (obj === null) return 'null';
	  if (obj === undefined) return 'undefined';
	  if (obj === Object(obj)) return 'object';
	  return typeof obj;
	}
	
	exports.Library = Library;
	
	/**
	 * ### Library
	 *
	 * Create a repository for custom type detection.
	 *
	 * ```js
	 * var lib = new type.Library;
	 * ```
	 *
	 */
	
	function Library () {
	  this.tests = {};
	}
	
	/**
	 * #### .of (obj)
	 *
	 * Expose replacement `typeof` detection to the library.
	 *
	 * ```js
	 * if ('string' === lib.of('hello world')) {
	 *   // ...
	 * }
	 * ```
	 *
	 * @param {Mixed} object to test
	 * @return {String} type
	 */
	
	Library.prototype.of = getType;
	
	/**
	 * #### .define (type, test)
	 *
	 * Add a test to for the `.test()` assertion.
	 *
	 * Can be defined as a regular expression:
	 *
	 * ```js
	 * lib.define('int', /^[0-9]+$/);
	 * ```
	 *
	 * ... or as a function:
	 *
	 * ```js
	 * lib.define('bln', function (obj) {
	 *   if ('boolean' === lib.of(obj)) return true;
	 *   var blns = [ 'yes', 'no', 'true', 'false', 1, 0 ];
	 *   if ('string' === lib.of(obj)) obj = obj.toLowerCase();
	 *   return !! ~blns.indexOf(obj);
	 * });
	 * ```
	 *
	 * @param {String} type
	 * @param {RegExp|Function} test
	 * @api public
	 */
	
	Library.prototype.define = function (type, test) {
	  if (arguments.length === 1) return this.tests[type];
	  this.tests[type] = test;
	  return this;
	};
	
	/**
	 * #### .test (obj, test)
	 *
	 * Assert that an object is of type. Will first
	 * check natives, and if that does not pass it will
	 * use the user defined custom tests.
	 *
	 * ```js
	 * assert(lib.test('1', 'int'));
	 * assert(lib.test('yes', 'bln'));
	 * ```
	 *
	 * @param {Mixed} object
	 * @param {String} type
	 * @return {Boolean} result
	 * @api public
	 */
	
	Library.prototype.test = function (obj, type) {
	  if (type === getType(obj)) return true;
	  var test = this.tests[type];
	
	  if (test && 'regexp' === getType(test)) {
	    return test.test(obj);
	  } else if (test && 'function' === getType(test)) {
	    return test(obj);
	  } else {
	    throw new ReferenceError('Type test "' + type + '" not defined or invalid.');
	  }
	};


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(49)
	var ieee754 = __webpack_require__(50)
	var isArray = __webpack_require__(51)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()
	
	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }
	
	  return that
	}
	
	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */
	
	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}
	
	Buffer.poolSize = 8192 // not used by this implementation
	
	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}
	
	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }
	
	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }
	
	  return fromObject(that, value)
	}
	
	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}
	
	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}
	
	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}
	
	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}
	
	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }
	
	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }
	
	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)
	
	  var actual = that.write(string, encoding)
	
	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }
	
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer
	
	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }
	
	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }
	
	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }
	
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}
	
	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)
	
	    if (that.length === 0) {
	      return that
	    }
	
	    obj.copy(that, 0, 0, len)
	    return that
	  }
	
	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }
	
	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }
	
	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }
	
	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }
	
	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}
	
	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.
	
	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }
	
	  if (end === undefined || end > this.length) {
	    end = this.length
	  }
	
	  if (end <= 0) {
	    return ''
	  }
	
	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0
	
	  if (end <= start) {
	    return ''
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true
	
	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}
	
	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}
	
	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}
	
	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }
	
	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }
	
	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }
	
	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }
	
	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0
	
	  if (this === target) return 0
	
	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)
	
	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)
	
	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1
	
	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }
	
	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }
	
	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }
	
	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length
	
	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }
	
	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }
	
	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }
	
	  return -1
	}
	
	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}
	
	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }
	
	  return len
	}
	
	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }
	
	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }
	
	  if (end <= start) {
	    return this
	  }
	
	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0
	
	  if (!val) val = 0
	
	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict'
	
	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray
	
	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
	
	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}
	
	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63
	
	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }
	
	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}
	
	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}
	
	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)
	
	  arr = new Arr(len * 3 / 4 - placeHolders)
	
	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len
	
	  var L = 0
	
	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  return arr
	}
	
	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}
	
	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}
	
	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3
	
	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }
	
	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }
	
	  parts.push(output)
	
	  return parts.join('')
	}


/***/ },
/* 50 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 51 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - getPathValue utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * @see https://github.com/logicalparadox/filtr
	 * MIT Licensed
	 */
	
	var getPathInfo = __webpack_require__(53);
	
	/**
	 * ### .getPathValue(path, object)
	 *
	 * This allows the retrieval of values in an
	 * object given a string path.
	 *
	 *     var obj = {
	 *         prop1: {
	 *             arr: ['a', 'b', 'c']
	 *           , str: 'Hello'
	 *         }
	 *       , prop2: {
	 *             arr: [ { nested: 'Universe' } ]
	 *           , str: 'Hello again!'
	 *         }
	 *     }
	 *
	 * The following would be the results.
	 *
	 *     getPathValue('prop1.str', obj); // Hello
	 *     getPathValue('prop1.att[2]', obj); // b
	 *     getPathValue('prop2.arr[0].nested', obj); // Universe
	 *
	 * @param {String} path
	 * @param {Object} object
	 * @returns {Object} value or `undefined`
	 * @namespace Utils
	 * @name getPathValue
	 * @api public
	 */
	module.exports = function(path, obj) {
	  var info = getPathInfo(path, obj);
	  return info.value;
	};


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - getPathInfo utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	var hasProperty = __webpack_require__(54);
	
	/**
	 * ### .getPathInfo(path, object)
	 *
	 * This allows the retrieval of property info in an
	 * object given a string path.
	 *
	 * The path info consists of an object with the
	 * following properties:
	 *
	 * * parent - The parent object of the property referenced by `path`
	 * * name - The name of the final property, a number if it was an array indexer
	 * * value - The value of the property, if it exists, otherwise `undefined`
	 * * exists - Whether the property exists or not
	 *
	 * @param {String} path
	 * @param {Object} object
	 * @returns {Object} info
	 * @namespace Utils
	 * @name getPathInfo
	 * @api public
	 */
	
	module.exports = function getPathInfo(path, obj) {
	  var parsed = parsePath(path),
	      last = parsed[parsed.length - 1];
	
	  var info = {
	    parent: parsed.length > 1 ? _getPathValue(parsed, obj, parsed.length - 1) : obj,
	    name: last.p || last.i,
	    value: _getPathValue(parsed, obj)
	  };
	  info.exists = hasProperty(info.name, info.parent);
	
	  return info;
	};
	
	
	/*!
	 * ## parsePath(path)
	 *
	 * Helper function used to parse string object
	 * paths. Use in conjunction with `_getPathValue`.
	 *
	 *      var parsed = parsePath('myobject.property.subprop');
	 *
	 * ### Paths:
	 *
	 * * Can be as near infinitely deep and nested
	 * * Arrays are also valid using the formal `myobject.document[3].property`.
	 * * Literal dots and brackets (not delimiter) must be backslash-escaped.
	 *
	 * @param {String} path
	 * @returns {Object} parsed
	 * @api private
	 */
	
	function parsePath (path) {
	  var str = path.replace(/([^\\])\[/g, '$1.[')
	    , parts = str.match(/(\\\.|[^.]+?)+/g);
	  return parts.map(function (value) {
	    var re = /^\[(\d+)\]$/
	      , mArr = re.exec(value);
	    if (mArr) return { i: parseFloat(mArr[1]) };
	    else return { p: value.replace(/\\([.\[\]])/g, '$1') };
	  });
	}
	
	
	/*!
	 * ## _getPathValue(parsed, obj)
	 *
	 * Helper companion function for `.parsePath` that returns
	 * the value located at the parsed address.
	 *
	 *      var value = getPathValue(parsed, obj);
	 *
	 * @param {Object} parsed definition from `parsePath`.
	 * @param {Object} object to search against
	 * @param {Number} object to search against
	 * @returns {Object|Undefined} value
	 * @api private
	 */
	
	function _getPathValue (parsed, obj, index) {
	  var tmp = obj
	    , res;
	
	  index = (index === undefined ? parsed.length : index);
	
	  for (var i = 0, l = index; i < l; i++) {
	    var part = parsed[i];
	    if (tmp) {
	      if ('undefined' !== typeof part.p)
	        tmp = tmp[part.p];
	      else if ('undefined' !== typeof part.i)
	        tmp = tmp[part.i];
	      if (i == (l - 1)) res = tmp;
	    } else {
	      res = undefined;
	    }
	  }
	  return res;
	}


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - hasProperty utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	var type = __webpack_require__(32);
	
	/**
	 * ### .hasProperty(object, name)
	 *
	 * This allows checking whether an object has
	 * named property or numeric array index.
	 *
	 * Basically does the same thing as the `in`
	 * operator but works properly with natives
	 * and null/undefined values.
	 *
	 *     var obj = {
	 *         arr: ['a', 'b', 'c']
	 *       , str: 'Hello'
	 *     }
	 *
	 * The following would be the results.
	 *
	 *     hasProperty('str', obj);  // true
	 *     hasProperty('constructor', obj);  // true
	 *     hasProperty('bar', obj);  // false
	 *
	 *     hasProperty('length', obj.str); // true
	 *     hasProperty(1, obj.str);  // true
	 *     hasProperty(5, obj.str);  // false
	 *
	 *     hasProperty('length', obj.arr);  // true
	 *     hasProperty(2, obj.arr);  // true
	 *     hasProperty(3, obj.arr);  // false
	 *
	 * @param {Objuect} object
	 * @param {String|Number} name
	 * @returns {Boolean} whether it exists
	 * @namespace Utils
	 * @name getPathInfo
	 * @api public
	 */
	
	var literals = {
	    'number': Number
	  , 'string': String
	};
	
	module.exports = function hasProperty(name, obj) {
	  var ot = type(obj);
	
	  // Bad Object, obviously no props at all
	  if(ot === 'null' || ot === 'undefined')
	    return false;
	
	  // The `in` operator does not work with certain literals
	  // box these before the check
	  if(literals[ot] && typeof obj !== 'object')
	    obj = new literals[ot](obj);
	
	  return name in obj;
	};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - addProperty utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	var config = __webpack_require__(42);
	var flag = __webpack_require__(31);
	
	/**
	 * ### addProperty (ctx, name, getter)
	 *
	 * Adds a property to the prototype of an object.
	 *
	 *     utils.addProperty(chai.Assertion.prototype, 'foo', function () {
	 *       var obj = utils.flag(this, 'object');
	 *       new chai.Assertion(obj).to.be.instanceof(Foo);
	 *     });
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.addProperty('foo', fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(myFoo).to.be.foo;
	 *
	 * @param {Object} ctx object to which the property is added
	 * @param {String} name of property to add
	 * @param {Function} getter function to be used for name
	 * @namespace Utils
	 * @name addProperty
	 * @api public
	 */
	
	module.exports = function (ctx, name, getter) {
	  Object.defineProperty(ctx, name,
	    { get: function addProperty() {
	        var old_ssfi = flag(this, 'ssfi');
	        if (old_ssfi && config.includeStack === false)
	          flag(this, 'ssfi', addProperty);
	
	        var result = getter.call(this);
	        return result === undefined ? this : result;
	      }
	    , configurable: true
	  });
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - addMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	var config = __webpack_require__(42);
	
	/**
	 * ### .addMethod (ctx, name, method)
	 *
	 * Adds a method to the prototype of an object.
	 *
	 *     utils.addMethod(chai.Assertion.prototype, 'foo', function (str) {
	 *       var obj = utils.flag(this, 'object');
	 *       new chai.Assertion(obj).to.be.equal(str);
	 *     });
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.addMethod('foo', fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(fooStr).to.be.foo('bar');
	 *
	 * @param {Object} ctx object to which the method is added
	 * @param {String} name of method to add
	 * @param {Function} method function to be used for name
	 * @namespace Utils
	 * @name addMethod
	 * @api public
	 */
	var flag = __webpack_require__(31);
	
	module.exports = function (ctx, name, method) {
	  ctx[name] = function () {
	    var old_ssfi = flag(this, 'ssfi');
	    if (old_ssfi && config.includeStack === false)
	      flag(this, 'ssfi', ctx[name]);
	    var result = method.apply(this, arguments);
	    return result === undefined ? this : result;
	  };
	};


/***/ },
/* 57 */
/***/ function(module, exports) {

	/*!
	 * Chai - overwriteProperty utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * ### overwriteProperty (ctx, name, fn)
	 *
	 * Overwites an already existing property getter and provides
	 * access to previous value. Must return function to use as getter.
	 *
	 *     utils.overwriteProperty(chai.Assertion.prototype, 'ok', function (_super) {
	 *       return function () {
	 *         var obj = utils.flag(this, 'object');
	 *         if (obj instanceof Foo) {
	 *           new chai.Assertion(obj.name).to.equal('bar');
	 *         } else {
	 *           _super.call(this);
	 *         }
	 *       }
	 *     });
	 *
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.overwriteProperty('foo', fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(myFoo).to.be.ok;
	 *
	 * @param {Object} ctx object whose property is to be overwritten
	 * @param {String} name of property to overwrite
	 * @param {Function} getter function that returns a getter function to be used for name
	 * @namespace Utils
	 * @name overwriteProperty
	 * @api public
	 */
	
	module.exports = function (ctx, name, getter) {
	  var _get = Object.getOwnPropertyDescriptor(ctx, name)
	    , _super = function () {};
	
	  if (_get && 'function' === typeof _get.get)
	    _super = _get.get
	
	  Object.defineProperty(ctx, name,
	    { get: function () {
	        var result = getter(_super).call(this);
	        return result === undefined ? this : result;
	      }
	    , configurable: true
	  });
	};


/***/ },
/* 58 */
/***/ function(module, exports) {

	/*!
	 * Chai - overwriteMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * ### overwriteMethod (ctx, name, fn)
	 *
	 * Overwites an already existing method and provides
	 * access to previous function. Must return function
	 * to be used for name.
	 *
	 *     utils.overwriteMethod(chai.Assertion.prototype, 'equal', function (_super) {
	 *       return function (str) {
	 *         var obj = utils.flag(this, 'object');
	 *         if (obj instanceof Foo) {
	 *           new chai.Assertion(obj.value).to.equal(str);
	 *         } else {
	 *           _super.apply(this, arguments);
	 *         }
	 *       }
	 *     });
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.overwriteMethod('foo', fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(myFoo).to.equal('bar');
	 *
	 * @param {Object} ctx object whose method is to be overwritten
	 * @param {String} name of method to overwrite
	 * @param {Function} method function that returns a function to be used for name
	 * @namespace Utils
	 * @name overwriteMethod
	 * @api public
	 */
	
	module.exports = function (ctx, name, method) {
	  var _method = ctx[name]
	    , _super = function () { return this; };
	
	  if (_method && 'function' === typeof _method)
	    _super = _method;
	
	  ctx[name] = function () {
	    var result = method(_super).apply(this, arguments);
	    return result === undefined ? this : result;
	  }
	};


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - addChainingMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/*!
	 * Module dependencies
	 */
	
	var transferFlags = __webpack_require__(43);
	var flag = __webpack_require__(31);
	var config = __webpack_require__(42);
	
	/*!
	 * Module variables
	 */
	
	// Check whether `__proto__` is supported
	var hasProtoSupport = '__proto__' in Object;
	
	// Without `__proto__` support, this module will need to add properties to a function.
	// However, some Function.prototype methods cannot be overwritten,
	// and there seems no easy cross-platform way to detect them (@see chaijs/chai/issues/69).
	var excludeNames = /^(?:length|name|arguments|caller)$/;
	
	// Cache `Function` properties
	var call  = Function.prototype.call,
	    apply = Function.prototype.apply;
	
	/**
	 * ### addChainableMethod (ctx, name, method, chainingBehavior)
	 *
	 * Adds a method to an object, such that the method can also be chained.
	 *
	 *     utils.addChainableMethod(chai.Assertion.prototype, 'foo', function (str) {
	 *       var obj = utils.flag(this, 'object');
	 *       new chai.Assertion(obj).to.be.equal(str);
	 *     });
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.addChainableMethod('foo', fn, chainingBehavior);
	 *
	 * The result can then be used as both a method assertion, executing both `method` and
	 * `chainingBehavior`, or as a language chain, which only executes `chainingBehavior`.
	 *
	 *     expect(fooStr).to.be.foo('bar');
	 *     expect(fooStr).to.be.foo.equal('foo');
	 *
	 * @param {Object} ctx object to which the method is added
	 * @param {String} name of method to add
	 * @param {Function} method function to be used for `name`, when called
	 * @param {Function} chainingBehavior function to be called every time the property is accessed
	 * @namespace Utils
	 * @name addChainableMethod
	 * @api public
	 */
	
	module.exports = function (ctx, name, method, chainingBehavior) {
	  if (typeof chainingBehavior !== 'function') {
	    chainingBehavior = function () { };
	  }
	
	  var chainableBehavior = {
	      method: method
	    , chainingBehavior: chainingBehavior
	  };
	
	  // save the methods so we can overwrite them later, if we need to.
	  if (!ctx.__methods) {
	    ctx.__methods = {};
	  }
	  ctx.__methods[name] = chainableBehavior;
	
	  Object.defineProperty(ctx, name,
	    { get: function () {
	        chainableBehavior.chainingBehavior.call(this);
	
	        var assert = function assert() {
	          var old_ssfi = flag(this, 'ssfi');
	          if (old_ssfi && config.includeStack === false)
	            flag(this, 'ssfi', assert);
	          var result = chainableBehavior.method.apply(this, arguments);
	          return result === undefined ? this : result;
	        };
	
	        // Use `__proto__` if available
	        if (hasProtoSupport) {
	          // Inherit all properties from the object by replacing the `Function` prototype
	          var prototype = assert.__proto__ = Object.create(this);
	          // Restore the `call` and `apply` methods from `Function`
	          prototype.call = call;
	          prototype.apply = apply;
	        }
	        // Otherwise, redefine all properties (slow!)
	        else {
	          var asserterNames = Object.getOwnPropertyNames(ctx);
	          asserterNames.forEach(function (asserterName) {
	            if (!excludeNames.test(asserterName)) {
	              var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
	              Object.defineProperty(assert, asserterName, pd);
	            }
	          });
	        }
	
	        transferFlags(this, assert);
	        return assert;
	      }
	    , configurable: true
	  });
	};


/***/ },
/* 60 */
/***/ function(module, exports) {

	/*!
	 * Chai - overwriteChainableMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	/**
	 * ### overwriteChainableMethod (ctx, name, method, chainingBehavior)
	 *
	 * Overwites an already existing chainable method
	 * and provides access to the previous function or
	 * property.  Must return functions to be used for
	 * name.
	 *
	 *     utils.overwriteChainableMethod(chai.Assertion.prototype, 'length',
	 *       function (_super) {
	 *       }
	 *     , function (_super) {
	 *       }
	 *     );
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.overwriteChainableMethod('foo', fn, fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(myFoo).to.have.length(3);
	 *     expect(myFoo).to.have.length.above(3);
	 *
	 * @param {Object} ctx object whose method / property is to be overwritten
	 * @param {String} name of method / property to overwrite
	 * @param {Function} method function that returns a function to be used for name
	 * @param {Function} chainingBehavior function that returns a function to be used for property
	 * @namespace Utils
	 * @name overwriteChainableMethod
	 * @api public
	 */
	
	module.exports = function (ctx, name, method, chainingBehavior) {
	  var chainableBehavior = ctx.__methods[name];
	
	  var _chainingBehavior = chainableBehavior.chainingBehavior;
	  chainableBehavior.chainingBehavior = function () {
	    var result = chainingBehavior(_chainingBehavior).call(this);
	    return result === undefined ? this : result;
	  };
	
	  var _method = chainableBehavior.method;
	  chainableBehavior.method = function () {
	    var result = method(_method).apply(this, arguments);
	    return result === undefined ? this : result;
	  };
	};


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * chai
	 * http://chaijs.com
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	var config = __webpack_require__(42);
	
	module.exports = function (_chai, util) {
	  /*!
	   * Module dependencies.
	   */
	
	  var AssertionError = _chai.AssertionError
	    , flag = util.flag;
	
	  /*!
	   * Module export.
	   */
	
	  _chai.Assertion = Assertion;
	
	  /*!
	   * Assertion Constructor
	   *
	   * Creates object for chaining.
	   *
	   * @api private
	   */
	
	  function Assertion (obj, msg, stack) {
	    flag(this, 'ssfi', stack || arguments.callee);
	    flag(this, 'object', obj);
	    flag(this, 'message', msg);
	  }
	
	  Object.defineProperty(Assertion, 'includeStack', {
	    get: function() {
	      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
	      return config.includeStack;
	    },
	    set: function(value) {
	      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
	      config.includeStack = value;
	    }
	  });
	
	  Object.defineProperty(Assertion, 'showDiff', {
	    get: function() {
	      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
	      return config.showDiff;
	    },
	    set: function(value) {
	      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
	      config.showDiff = value;
	    }
	  });
	
	  Assertion.addProperty = function (name, fn) {
	    util.addProperty(this.prototype, name, fn);
	  };
	
	  Assertion.addMethod = function (name, fn) {
	    util.addMethod(this.prototype, name, fn);
	  };
	
	  Assertion.addChainableMethod = function (name, fn, chainingBehavior) {
	    util.addChainableMethod(this.prototype, name, fn, chainingBehavior);
	  };
	
	  Assertion.overwriteProperty = function (name, fn) {
	    util.overwriteProperty(this.prototype, name, fn);
	  };
	
	  Assertion.overwriteMethod = function (name, fn) {
	    util.overwriteMethod(this.prototype, name, fn);
	  };
	
	  Assertion.overwriteChainableMethod = function (name, fn, chainingBehavior) {
	    util.overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
	  };
	
	  /**
	   * ### .assert(expression, message, negateMessage, expected, actual, showDiff)
	   *
	   * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass.
	   *
	   * @name assert
	   * @param {Philosophical} expression to be tested
	   * @param {String|Function} message or function that returns message to display if expression fails
	   * @param {String|Function} negatedMessage or function that returns negatedMessage to display if negated expression fails
	   * @param {Mixed} expected value (remember to check for negation)
	   * @param {Mixed} actual (optional) will default to `this.obj`
	   * @param {Boolean} showDiff (optional) when set to `true`, assert will display a diff in addition to the message if expression fails
	   * @api private
	   */
	
	  Assertion.prototype.assert = function (expr, msg, negateMsg, expected, _actual, showDiff) {
	    var ok = util.test(this, arguments);
	    if (true !== showDiff) showDiff = false;
	    if (true !== config.showDiff) showDiff = false;
	
	    if (!ok) {
	      var msg = util.getMessage(this, arguments)
	        , actual = util.getActual(this, arguments);
	      throw new AssertionError(msg, {
	          actual: actual
	        , expected: expected
	        , showDiff: showDiff
	      }, (config.includeStack) ? this.assert : flag(this, 'ssfi'));
	    }
	  };
	
	  /*!
	   * ### ._obj
	   *
	   * Quick reference to stored `actual` value for plugin developers.
	   *
	   * @api private
	   */
	
	  Object.defineProperty(Assertion.prototype, '_obj',
	    { get: function () {
	        return flag(this, 'object');
	      }
	    , set: function (val) {
	        flag(this, 'object', val);
	      }
	  });
	};


/***/ },
/* 62 */
/***/ function(module, exports) {

	/*!
	 * chai
	 * http://chaijs.com
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	module.exports = function (chai, _) {
	  var Assertion = chai.Assertion
	    , toString = Object.prototype.toString
	    , flag = _.flag;
	
	  /**
	   * ### Language Chains
	   *
	   * The following are provided as chainable getters to
	   * improve the readability of your assertions. They
	   * do not provide testing capabilities unless they
	   * have been overwritten by a plugin.
	   *
	   * **Chains**
	   *
	   * - to
	   * - be
	   * - been
	   * - is
	   * - that
	   * - which
	   * - and
	   * - has
	   * - have
	   * - with
	   * - at
	   * - of
	   * - same
	   *
	   * @name language chains
	   * @namespace BDD
	   * @api public
	   */
	
	  [ 'to', 'be', 'been'
	  , 'is', 'and', 'has', 'have'
	  , 'with', 'that', 'which', 'at'
	  , 'of', 'same' ].forEach(function (chain) {
	    Assertion.addProperty(chain, function () {
	      return this;
	    });
	  });
	
	  /**
	   * ### .not
	   *
	   * Negates any of assertions following in the chain.
	   *
	   *     expect(foo).to.not.equal('bar');
	   *     expect(goodFn).to.not.throw(Error);
	   *     expect({ foo: 'baz' }).to.have.property('foo')
	   *       .and.not.equal('bar');
	   *
	   * @name not
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('not', function () {
	    flag(this, 'negate', true);
	  });
	
	  /**
	   * ### .deep
	   *
	   * Sets the `deep` flag, later used by the `equal` and
	   * `property` assertions.
	   *
	   *     expect(foo).to.deep.equal({ bar: 'baz' });
	   *     expect({ foo: { bar: { baz: 'quux' } } })
	   *       .to.have.deep.property('foo.bar.baz', 'quux');
	   *
	   * `.deep.property` special characters can be escaped
	   * by adding two slashes before the `.` or `[]`.
	   *
	   *     var deepCss = { '.link': { '[target]': 42 }};
	   *     expect(deepCss).to.have.deep.property('\\.link.\\[target\\]', 42);
	   *
	   * @name deep
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('deep', function () {
	    flag(this, 'deep', true);
	  });
	
	  /**
	   * ### .any
	   *
	   * Sets the `any` flag, (opposite of the `all` flag)
	   * later used in the `keys` assertion.
	   *
	   *     expect(foo).to.have.any.keys('bar', 'baz');
	   *
	   * @name any
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('any', function () {
	    flag(this, 'any', true);
	    flag(this, 'all', false)
	  });
	
	
	  /**
	   * ### .all
	   *
	   * Sets the `all` flag (opposite of the `any` flag)
	   * later used by the `keys` assertion.
	   *
	   *     expect(foo).to.have.all.keys('bar', 'baz');
	   *
	   * @name all
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('all', function () {
	    flag(this, 'all', true);
	    flag(this, 'any', false);
	  });
	
	  /**
	   * ### .a(type)
	   *
	   * The `a` and `an` assertions are aliases that can be
	   * used either as language chains or to assert a value's
	   * type.
	   *
	   *     // typeof
	   *     expect('test').to.be.a('string');
	   *     expect({ foo: 'bar' }).to.be.an('object');
	   *     expect(null).to.be.a('null');
	   *     expect(undefined).to.be.an('undefined');
	   *     expect(new Error).to.be.an('error');
	   *     expect(new Promise).to.be.a('promise');
	   *     expect(new Float32Array()).to.be.a('float32array');
	   *     expect(Symbol()).to.be.a('symbol');
	   *
	   *     // es6 overrides
	   *     expect({[Symbol.toStringTag]:()=>'foo'}).to.be.a('foo');
	   *
	   *     // language chain
	   *     expect(foo).to.be.an.instanceof(Foo);
	   *
	   * @name a
	   * @alias an
	   * @param {String} type
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function an (type, msg) {
	    if (msg) flag(this, 'message', msg);
	    type = type.toLowerCase();
	    var obj = flag(this, 'object')
	      , article = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(type.charAt(0)) ? 'an ' : 'a ';
	
	    this.assert(
	        type === _.type(obj)
	      , 'expected #{this} to be ' + article + type
	      , 'expected #{this} not to be ' + article + type
	    );
	  }
	
	  Assertion.addChainableMethod('an', an);
	  Assertion.addChainableMethod('a', an);
	
	  /**
	   * ### .include(value)
	   *
	   * The `include` and `contain` assertions can be used as either property
	   * based language chains or as methods to assert the inclusion of an object
	   * in an array or a substring in a string. When used as language chains,
	   * they toggle the `contains` flag for the `keys` assertion.
	   *
	   *     expect([1,2,3]).to.include(2);
	   *     expect('foobar').to.contain('foo');
	   *     expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');
	   *
	   * @name include
	   * @alias contain
	   * @alias includes
	   * @alias contains
	   * @param {Object|String|Number} obj
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function includeChainingBehavior () {
	    flag(this, 'contains', true);
	  }
	
	  function include (val, msg) {
	    _.expectTypes(this, ['array', 'object', 'string']);
	
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    var expected = false;
	
	    if (_.type(obj) === 'array' && _.type(val) === 'object') {
	      for (var i in obj) {
	        if (_.eql(obj[i], val)) {
	          expected = true;
	          break;
	        }
	      }
	    } else if (_.type(val) === 'object') {
	      if (!flag(this, 'negate')) {
	        for (var k in val) new Assertion(obj).property(k, val[k]);
	        return;
	      }
	      var subset = {};
	      for (var k in val) subset[k] = obj[k];
	      expected = _.eql(subset, val);
	    } else {
	      expected = (obj != undefined) && ~obj.indexOf(val);
	    }
	    this.assert(
	        expected
	      , 'expected #{this} to include ' + _.inspect(val)
	      , 'expected #{this} to not include ' + _.inspect(val));
	  }
	
	  Assertion.addChainableMethod('include', include, includeChainingBehavior);
	  Assertion.addChainableMethod('contain', include, includeChainingBehavior);
	  Assertion.addChainableMethod('contains', include, includeChainingBehavior);
	  Assertion.addChainableMethod('includes', include, includeChainingBehavior);
	
	  /**
	   * ### .ok
	   *
	   * Asserts that the target is truthy.
	   *
	   *     expect('everything').to.be.ok;
	   *     expect(1).to.be.ok;
	   *     expect(false).to.not.be.ok;
	   *     expect(undefined).to.not.be.ok;
	   *     expect(null).to.not.be.ok;
	   *
	   * @name ok
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('ok', function () {
	    this.assert(
	        flag(this, 'object')
	      , 'expected #{this} to be truthy'
	      , 'expected #{this} to be falsy');
	  });
	
	  /**
	   * ### .true
	   *
	   * Asserts that the target is `true`.
	   *
	   *     expect(true).to.be.true;
	   *     expect(1).to.not.be.true;
	   *
	   * @name true
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('true', function () {
	    this.assert(
	        true === flag(this, 'object')
	      , 'expected #{this} to be true'
	      , 'expected #{this} to be false'
	      , this.negate ? false : true
	    );
	  });
	
	  /**
	   * ### .false
	   *
	   * Asserts that the target is `false`.
	   *
	   *     expect(false).to.be.false;
	   *     expect(0).to.not.be.false;
	   *
	   * @name false
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('false', function () {
	    this.assert(
	        false === flag(this, 'object')
	      , 'expected #{this} to be false'
	      , 'expected #{this} to be true'
	      , this.negate ? true : false
	    );
	  });
	
	  /**
	   * ### .null
	   *
	   * Asserts that the target is `null`.
	   *
	   *     expect(null).to.be.null;
	   *     expect(undefined).to.not.be.null;
	   *
	   * @name null
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('null', function () {
	    this.assert(
	        null === flag(this, 'object')
	      , 'expected #{this} to be null'
	      , 'expected #{this} not to be null'
	    );
	  });
	
	  /**
	   * ### .undefined
	   *
	   * Asserts that the target is `undefined`.
	   *
	   *     expect(undefined).to.be.undefined;
	   *     expect(null).to.not.be.undefined;
	   *
	   * @name undefined
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('undefined', function () {
	    this.assert(
	        undefined === flag(this, 'object')
	      , 'expected #{this} to be undefined'
	      , 'expected #{this} not to be undefined'
	    );
	  });
	
	  /**
	   * ### .NaN
	   * Asserts that the target is `NaN`.
	   *
	   *     expect('foo').to.be.NaN;
	   *     expect(4).not.to.be.NaN;
	   *
	   * @name NaN
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('NaN', function () {
	    this.assert(
	        isNaN(flag(this, 'object'))
	        , 'expected #{this} to be NaN'
	        , 'expected #{this} not to be NaN'
	    );
	  });
	
	  /**
	   * ### .exist
	   *
	   * Asserts that the target is neither `null` nor `undefined`.
	   *
	   *     var foo = 'hi'
	   *       , bar = null
	   *       , baz;
	   *
	   *     expect(foo).to.exist;
	   *     expect(bar).to.not.exist;
	   *     expect(baz).to.not.exist;
	   *
	   * @name exist
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('exist', function () {
	    this.assert(
	        null != flag(this, 'object')
	      , 'expected #{this} to exist'
	      , 'expected #{this} to not exist'
	    );
	  });
	
	
	  /**
	   * ### .empty
	   *
	   * Asserts that the target's length is `0`. For arrays and strings, it checks
	   * the `length` property. For objects, it gets the count of
	   * enumerable keys.
	   *
	   *     expect([]).to.be.empty;
	   *     expect('').to.be.empty;
	   *     expect({}).to.be.empty;
	   *
	   * @name empty
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('empty', function () {
	    var obj = flag(this, 'object')
	      , expected = obj;
	
	    if (Array.isArray(obj) || 'string' === typeof object) {
	      expected = obj.length;
	    } else if (typeof obj === 'object') {
	      expected = Object.keys(obj).length;
	    }
	
	    this.assert(
	        !expected
	      , 'expected #{this} to be empty'
	      , 'expected #{this} not to be empty'
	    );
	  });
	
	  /**
	   * ### .arguments
	   *
	   * Asserts that the target is an arguments object.
	   *
	   *     function test () {
	   *       expect(arguments).to.be.arguments;
	   *     }
	   *
	   * @name arguments
	   * @alias Arguments
	   * @namespace BDD
	   * @api public
	   */
	
	  function checkArguments () {
	    var obj = flag(this, 'object')
	      , type = Object.prototype.toString.call(obj);
	    this.assert(
	        '[object Arguments]' === type
	      , 'expected #{this} to be arguments but got ' + type
	      , 'expected #{this} to not be arguments'
	    );
	  }
	
	  Assertion.addProperty('arguments', checkArguments);
	  Assertion.addProperty('Arguments', checkArguments);
	
	  /**
	   * ### .equal(value)
	   *
	   * Asserts that the target is strictly equal (`===`) to `value`.
	   * Alternately, if the `deep` flag is set, asserts that
	   * the target is deeply equal to `value`.
	   *
	   *     expect('hello').to.equal('hello');
	   *     expect(42).to.equal(42);
	   *     expect(1).to.not.equal(true);
	   *     expect({ foo: 'bar' }).to.not.equal({ foo: 'bar' });
	   *     expect({ foo: 'bar' }).to.deep.equal({ foo: 'bar' });
	   *
	   * @name equal
	   * @alias equals
	   * @alias eq
	   * @alias deep.equal
	   * @param {Mixed} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertEqual (val, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'deep')) {
	      return this.eql(val);
	    } else {
	      this.assert(
	          val === obj
	        , 'expected #{this} to equal #{exp}'
	        , 'expected #{this} to not equal #{exp}'
	        , val
	        , this._obj
	        , true
	      );
	    }
	  }
	
	  Assertion.addMethod('equal', assertEqual);
	  Assertion.addMethod('equals', assertEqual);
	  Assertion.addMethod('eq', assertEqual);
	
	  /**
	   * ### .eql(value)
	   *
	   * Asserts that the target is deeply equal to `value`.
	   *
	   *     expect({ foo: 'bar' }).to.eql({ foo: 'bar' });
	   *     expect([ 1, 2, 3 ]).to.eql([ 1, 2, 3 ]);
	   *
	   * @name eql
	   * @alias eqls
	   * @param {Mixed} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertEql(obj, msg) {
	    if (msg) flag(this, 'message', msg);
	    this.assert(
	        _.eql(obj, flag(this, 'object'))
	      , 'expected #{this} to deeply equal #{exp}'
	      , 'expected #{this} to not deeply equal #{exp}'
	      , obj
	      , this._obj
	      , true
	    );
	  }
	
	  Assertion.addMethod('eql', assertEql);
	  Assertion.addMethod('eqls', assertEql);
	
	  /**
	   * ### .above(value)
	   *
	   * Asserts that the target is greater than `value`.
	   *
	   *     expect(10).to.be.above(5);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a minimum length. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.above(2);
	   *     expect([ 1, 2, 3 ]).to.have.length.above(2);
	   *
	   * @name above
	   * @alias gt
	   * @alias greaterThan
	   * @param {Number} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertAbove (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len > n
	        , 'expected #{this} to have a length above #{exp} but got #{act}'
	        , 'expected #{this} to not have a length above #{exp}'
	        , n
	        , len
	      );
	    } else {
	      this.assert(
	          obj > n
	        , 'expected #{this} to be above ' + n
	        , 'expected #{this} to be at most ' + n
	      );
	    }
	  }
	
	  Assertion.addMethod('above', assertAbove);
	  Assertion.addMethod('gt', assertAbove);
	  Assertion.addMethod('greaterThan', assertAbove);
	
	  /**
	   * ### .least(value)
	   *
	   * Asserts that the target is greater than or equal to `value`.
	   *
	   *     expect(10).to.be.at.least(10);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a minimum length. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.of.at.least(2);
	   *     expect([ 1, 2, 3 ]).to.have.length.of.at.least(3);
	   *
	   * @name least
	   * @alias gte
	   * @param {Number} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertLeast (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len >= n
	        , 'expected #{this} to have a length at least #{exp} but got #{act}'
	        , 'expected #{this} to have a length below #{exp}'
	        , n
	        , len
	      );
	    } else {
	      this.assert(
	          obj >= n
	        , 'expected #{this} to be at least ' + n
	        , 'expected #{this} to be below ' + n
	      );
	    }
	  }
	
	  Assertion.addMethod('least', assertLeast);
	  Assertion.addMethod('gte', assertLeast);
	
	  /**
	   * ### .below(value)
	   *
	   * Asserts that the target is less than `value`.
	   *
	   *     expect(5).to.be.below(10);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a maximum length. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.below(4);
	   *     expect([ 1, 2, 3 ]).to.have.length.below(4);
	   *
	   * @name below
	   * @alias lt
	   * @alias lessThan
	   * @param {Number} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertBelow (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len < n
	        , 'expected #{this} to have a length below #{exp} but got #{act}'
	        , 'expected #{this} to not have a length below #{exp}'
	        , n
	        , len
	      );
	    } else {
	      this.assert(
	          obj < n
	        , 'expected #{this} to be below ' + n
	        , 'expected #{this} to be at least ' + n
	      );
	    }
	  }
	
	  Assertion.addMethod('below', assertBelow);
	  Assertion.addMethod('lt', assertBelow);
	  Assertion.addMethod('lessThan', assertBelow);
	
	  /**
	   * ### .most(value)
	   *
	   * Asserts that the target is less than or equal to `value`.
	   *
	   *     expect(5).to.be.at.most(5);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a maximum length. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.of.at.most(4);
	   *     expect([ 1, 2, 3 ]).to.have.length.of.at.most(3);
	   *
	   * @name most
	   * @alias lte
	   * @param {Number} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertMost (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len <= n
	        , 'expected #{this} to have a length at most #{exp} but got #{act}'
	        , 'expected #{this} to have a length above #{exp}'
	        , n
	        , len
	      );
	    } else {
	      this.assert(
	          obj <= n
	        , 'expected #{this} to be at most ' + n
	        , 'expected #{this} to be above ' + n
	      );
	    }
	  }
	
	  Assertion.addMethod('most', assertMost);
	  Assertion.addMethod('lte', assertMost);
	
	  /**
	   * ### .within(start, finish)
	   *
	   * Asserts that the target is within a range.
	   *
	   *     expect(7).to.be.within(5,10);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a length range. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.within(2,4);
	   *     expect([ 1, 2, 3 ]).to.have.length.within(2,4);
	   *
	   * @name within
	   * @param {Number} start lowerbound inclusive
	   * @param {Number} finish upperbound inclusive
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addMethod('within', function (start, finish, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object')
	      , range = start + '..' + finish;
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len >= start && len <= finish
	        , 'expected #{this} to have a length within ' + range
	        , 'expected #{this} to not have a length within ' + range
	      );
	    } else {
	      this.assert(
	          obj >= start && obj <= finish
	        , 'expected #{this} to be within ' + range
	        , 'expected #{this} to not be within ' + range
	      );
	    }
	  });
	
	  /**
	   * ### .instanceof(constructor)
	   *
	   * Asserts that the target is an instance of `constructor`.
	   *
	   *     var Tea = function (name) { this.name = name; }
	   *       , Chai = new Tea('chai');
	   *
	   *     expect(Chai).to.be.an.instanceof(Tea);
	   *     expect([ 1, 2, 3 ]).to.be.instanceof(Array);
	   *
	   * @name instanceof
	   * @param {Constructor} constructor
	   * @param {String} message _optional_
	   * @alias instanceOf
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertInstanceOf (constructor, msg) {
	    if (msg) flag(this, 'message', msg);
	    var name = _.getName(constructor);
	    this.assert(
	        flag(this, 'object') instanceof constructor
	      , 'expected #{this} to be an instance of ' + name
	      , 'expected #{this} to not be an instance of ' + name
	    );
	  };
	
	  Assertion.addMethod('instanceof', assertInstanceOf);
	  Assertion.addMethod('instanceOf', assertInstanceOf);
	
	  /**
	   * ### .property(name, [value])
	   *
	   * Asserts that the target has a property `name`, optionally asserting that
	   * the value of that property is strictly equal to  `value`.
	   * If the `deep` flag is set, you can use dot- and bracket-notation for deep
	   * references into objects and arrays.
	   *
	   *     // simple referencing
	   *     var obj = { foo: 'bar' };
	   *     expect(obj).to.have.property('foo');
	   *     expect(obj).to.have.property('foo', 'bar');
	   *
	   *     // deep referencing
	   *     var deepObj = {
	   *         green: { tea: 'matcha' }
	   *       , teas: [ 'chai', 'matcha', { tea: 'konacha' } ]
	   *     };
	   *
	   *     expect(deepObj).to.have.deep.property('green.tea', 'matcha');
	   *     expect(deepObj).to.have.deep.property('teas[1]', 'matcha');
	   *     expect(deepObj).to.have.deep.property('teas[2].tea', 'konacha');
	   *
	   * You can also use an array as the starting point of a `deep.property`
	   * assertion, or traverse nested arrays.
	   *
	   *     var arr = [
	   *         [ 'chai', 'matcha', 'konacha' ]
	   *       , [ { tea: 'chai' }
	   *         , { tea: 'matcha' }
	   *         , { tea: 'konacha' } ]
	   *     ];
	   *
	   *     expect(arr).to.have.deep.property('[0][1]', 'matcha');
	   *     expect(arr).to.have.deep.property('[1][2].tea', 'konacha');
	   *
	   * Furthermore, `property` changes the subject of the assertion
	   * to be the value of that property from the original object. This
	   * permits for further chainable assertions on that property.
	   *
	   *     expect(obj).to.have.property('foo')
	   *       .that.is.a('string');
	   *     expect(deepObj).to.have.property('green')
	   *       .that.is.an('object')
	   *       .that.deep.equals({ tea: 'matcha' });
	   *     expect(deepObj).to.have.property('teas')
	   *       .that.is.an('array')
	   *       .with.deep.property('[2]')
	   *         .that.deep.equals({ tea: 'konacha' });
	   *
	   * Note that dots and bracket in `name` must be backslash-escaped when
	   * the `deep` flag is set, while they must NOT be escaped when the `deep`
	   * flag is not set.
	   *
	   *     // simple referencing
	   *     var css = { '.link[target]': 42 };
	   *     expect(css).to.have.property('.link[target]', 42);
	   *
	   *     // deep referencing
	   *     var deepCss = { '.link': { '[target]': 42 }};
	   *     expect(deepCss).to.have.deep.property('\\.link.\\[target\\]', 42);
	   *
	   * @name property
	   * @alias deep.property
	   * @param {String} name
	   * @param {Mixed} value (optional)
	   * @param {String} message _optional_
	   * @returns value of property for chaining
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addMethod('property', function (name, val, msg) {
	    if (msg) flag(this, 'message', msg);
	
	    var isDeep = !!flag(this, 'deep')
	      , descriptor = isDeep ? 'deep property ' : 'property '
	      , negate = flag(this, 'negate')
	      , obj = flag(this, 'object')
	      , pathInfo = isDeep ? _.getPathInfo(name, obj) : null
	      , hasProperty = isDeep
	        ? pathInfo.exists
	        : _.hasProperty(name, obj)
	      , value = isDeep
	        ? pathInfo.value
	        : obj[name];
	
	    if (negate && arguments.length > 1) {
	      if (undefined === value) {
	        msg = (msg != null) ? msg + ': ' : '';
	        throw new Error(msg + _.inspect(obj) + ' has no ' + descriptor + _.inspect(name));
	      }
	    } else {
	      this.assert(
	          hasProperty
	        , 'expected #{this} to have a ' + descriptor + _.inspect(name)
	        , 'expected #{this} to not have ' + descriptor + _.inspect(name));
	    }
	
	    if (arguments.length > 1) {
	      this.assert(
	          val === value
	        , 'expected #{this} to have a ' + descriptor + _.inspect(name) + ' of #{exp}, but got #{act}'
	        , 'expected #{this} to not have a ' + descriptor + _.inspect(name) + ' of #{act}'
	        , val
	        , value
	      );
	    }
	
	    flag(this, 'object', value);
	  });
	
	
	  /**
	   * ### .ownProperty(name)
	   *
	   * Asserts that the target has an own property `name`.
	   *
	   *     expect('test').to.have.ownProperty('length');
	   *
	   * @name ownProperty
	   * @alias haveOwnProperty
	   * @param {String} name
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertOwnProperty (name, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    this.assert(
	        obj.hasOwnProperty(name)
	      , 'expected #{this} to have own property ' + _.inspect(name)
	      , 'expected #{this} to not have own property ' + _.inspect(name)
	    );
	  }
	
	  Assertion.addMethod('ownProperty', assertOwnProperty);
	  Assertion.addMethod('haveOwnProperty', assertOwnProperty);
	
	  /**
	   * ### .ownPropertyDescriptor(name[, descriptor[, message]])
	   *
	   * Asserts that the target has an own property descriptor `name`, that optionally matches `descriptor`.
	   *
	   *     expect('test').to.have.ownPropertyDescriptor('length');
	   *     expect('test').to.have.ownPropertyDescriptor('length', { enumerable: false, configurable: false, writable: false, value: 4 });
	   *     expect('test').not.to.have.ownPropertyDescriptor('length', { enumerable: false, configurable: false, writable: false, value: 3 });
	   *     expect('test').ownPropertyDescriptor('length').to.have.property('enumerable', false);
	   *     expect('test').ownPropertyDescriptor('length').to.have.keys('value');
	   *
	   * @name ownPropertyDescriptor
	   * @alias haveOwnPropertyDescriptor
	   * @param {String} name
	   * @param {Object} descriptor _optional_
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertOwnPropertyDescriptor (name, descriptor, msg) {
	    if (typeof descriptor === 'string') {
	      msg = descriptor;
	      descriptor = null;
	    }
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    var actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
	    if (actualDescriptor && descriptor) {
	      this.assert(
	          _.eql(descriptor, actualDescriptor)
	        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to match ' + _.inspect(descriptor) + ', got ' + _.inspect(actualDescriptor)
	        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to not match ' + _.inspect(descriptor)
	        , descriptor
	        , actualDescriptor
	        , true
	      );
	    } else {
	      this.assert(
	          actualDescriptor
	        , 'expected #{this} to have an own property descriptor for ' + _.inspect(name)
	        , 'expected #{this} to not have an own property descriptor for ' + _.inspect(name)
	      );
	    }
	    flag(this, 'object', actualDescriptor);
	  }
	
	  Assertion.addMethod('ownPropertyDescriptor', assertOwnPropertyDescriptor);
	  Assertion.addMethod('haveOwnPropertyDescriptor', assertOwnPropertyDescriptor);
	
	  /**
	   * ### .length
	   *
	   * Sets the `doLength` flag later used as a chain precursor to a value
	   * comparison for the `length` property.
	   *
	   *     expect('foo').to.have.length.above(2);
	   *     expect([ 1, 2, 3 ]).to.have.length.above(2);
	   *     expect('foo').to.have.length.below(4);
	   *     expect([ 1, 2, 3 ]).to.have.length.below(4);
	   *     expect('foo').to.have.length.within(2,4);
	   *     expect([ 1, 2, 3 ]).to.have.length.within(2,4);
	   *
	   * *Deprecation notice:* Using `length` as an assertion will be deprecated
	   * in version 2.4.0 and removed in 3.0.0. Code using the old style of
	   * asserting for `length` property value using `length(value)` should be
	   * switched to use `lengthOf(value)` instead.
	   *
	   * @name length
	   * @namespace BDD
	   * @api public
	   */
	
	  /**
	   * ### .lengthOf(value[, message])
	   *
	   * Asserts that the target's `length` property has
	   * the expected value.
	   *
	   *     expect([ 1, 2, 3]).to.have.lengthOf(3);
	   *     expect('foobar').to.have.lengthOf(6);
	   *
	   * @name lengthOf
	   * @param {Number} length
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertLengthChain () {
	    flag(this, 'doLength', true);
	  }
	
	  function assertLength (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    new Assertion(obj, msg).to.have.property('length');
	    var len = obj.length;
	
	    this.assert(
	        len == n
	      , 'expected #{this} to have a length of #{exp} but got #{act}'
	      , 'expected #{this} to not have a length of #{act}'
	      , n
	      , len
	    );
	  }
	
	  Assertion.addChainableMethod('length', assertLength, assertLengthChain);
	  Assertion.addMethod('lengthOf', assertLength);
	
	  /**
	   * ### .match(regexp)
	   *
	   * Asserts that the target matches a regular expression.
	   *
	   *     expect('foobar').to.match(/^foo/);
	   *
	   * @name match
	   * @alias matches
	   * @param {RegExp} RegularExpression
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	  function assertMatch(re, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    this.assert(
	        re.exec(obj)
	      , 'expected #{this} to match ' + re
	      , 'expected #{this} not to match ' + re
	    );
	  }
	
	  Assertion.addMethod('match', assertMatch);
	  Assertion.addMethod('matches', assertMatch);
	
	  /**
	   * ### .string(string)
	   *
	   * Asserts that the string target contains another string.
	   *
	   *     expect('foobar').to.have.string('bar');
	   *
	   * @name string
	   * @param {String} string
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addMethod('string', function (str, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    new Assertion(obj, msg).is.a('string');
	
	    this.assert(
	        ~obj.indexOf(str)
	      , 'expected #{this} to contain ' + _.inspect(str)
	      , 'expected #{this} to not contain ' + _.inspect(str)
	    );
	  });
	
	
	  /**
	   * ### .keys(key1, [key2], [...])
	   *
	   * Asserts that the target contains any or all of the passed-in keys.
	   * Use in combination with `any`, `all`, `contains`, or `have` will affect
	   * what will pass.
	   *
	   * When used in conjunction with `any`, at least one key that is passed
	   * in must exist in the target object. This is regardless whether or not
	   * the `have` or `contain` qualifiers are used. Note, either `any` or `all`
	   * should be used in the assertion. If neither are used, the assertion is
	   * defaulted to `all`.
	   *
	   * When both `all` and `contain` are used, the target object must have at
	   * least all of the passed-in keys but may have more keys not listed.
	   *
	   * When both `all` and `have` are used, the target object must both contain
	   * all of the passed-in keys AND the number of keys in the target object must
	   * match the number of keys passed in (in other words, a target object must
	   * have all and only all of the passed-in keys).
	   *
	   *     expect({ foo: 1, bar: 2 }).to.have.any.keys('foo', 'baz');
	   *     expect({ foo: 1, bar: 2 }).to.have.any.keys('foo');
	   *     expect({ foo: 1, bar: 2 }).to.contain.any.keys('bar', 'baz');
	   *     expect({ foo: 1, bar: 2 }).to.contain.any.keys(['foo']);
	   *     expect({ foo: 1, bar: 2 }).to.contain.any.keys({'foo': 6});
	   *     expect({ foo: 1, bar: 2 }).to.have.all.keys(['bar', 'foo']);
	   *     expect({ foo: 1, bar: 2 }).to.have.all.keys({'bar': 6, 'foo': 7});
	   *     expect({ foo: 1, bar: 2, baz: 3 }).to.contain.all.keys(['bar', 'foo']);
	   *     expect({ foo: 1, bar: 2, baz: 3 }).to.contain.all.keys({'bar': 6});
	   *
	   *
	   * @name keys
	   * @alias key
	   * @param {...String|Array|Object} keys
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertKeys (keys) {
	    var obj = flag(this, 'object')
	      , str
	      , ok = true
	      , mixedArgsMsg = 'keys must be given single argument of Array|Object|String, or multiple String arguments';
	
	    switch (_.type(keys)) {
	      case "array":
	        if (arguments.length > 1) throw (new Error(mixedArgsMsg));
	        break;
	      case "object":
	        if (arguments.length > 1) throw (new Error(mixedArgsMsg));
	        keys = Object.keys(keys);
	        break;
	      default:
	        keys = Array.prototype.slice.call(arguments);
	    }
	
	    if (!keys.length) throw new Error('keys required');
	
	    var actual = Object.keys(obj)
	      , expected = keys
	      , len = keys.length
	      , any = flag(this, 'any')
	      , all = flag(this, 'all');
	
	    if (!any && !all) {
	      all = true;
	    }
	
	    // Has any
	    if (any) {
	      var intersection = expected.filter(function(key) {
	        return ~actual.indexOf(key);
	      });
	      ok = intersection.length > 0;
	    }
	
	    // Has all
	    if (all) {
	      ok = keys.every(function(key){
	        return ~actual.indexOf(key);
	      });
	      if (!flag(this, 'negate') && !flag(this, 'contains')) {
	        ok = ok && keys.length == actual.length;
	      }
	    }
	
	    // Key string
	    if (len > 1) {
	      keys = keys.map(function(key){
	        return _.inspect(key);
	      });
	      var last = keys.pop();
	      if (all) {
	        str = keys.join(', ') + ', and ' + last;
	      }
	      if (any) {
	        str = keys.join(', ') + ', or ' + last;
	      }
	    } else {
	      str = _.inspect(keys[0]);
	    }
	
	    // Form
	    str = (len > 1 ? 'keys ' : 'key ') + str;
	
	    // Have / include
	    str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;
	
	    // Assertion
	    this.assert(
	        ok
	      , 'expected #{this} to ' + str
	      , 'expected #{this} to not ' + str
	      , expected.slice(0).sort()
	      , actual.sort()
	      , true
	    );
	  }
	
	  Assertion.addMethod('keys', assertKeys);
	  Assertion.addMethod('key', assertKeys);
	
	  /**
	   * ### .throw(constructor)
	   *
	   * Asserts that the function target will throw a specific error, or specific type of error
	   * (as determined using `instanceof`), optionally with a RegExp or string inclusion test
	   * for the error's message.
	   *
	   *     var err = new ReferenceError('This is a bad function.');
	   *     var fn = function () { throw err; }
	   *     expect(fn).to.throw(ReferenceError);
	   *     expect(fn).to.throw(Error);
	   *     expect(fn).to.throw(/bad function/);
	   *     expect(fn).to.not.throw('good function');
	   *     expect(fn).to.throw(ReferenceError, /bad function/);
	   *     expect(fn).to.throw(err);
	   *
	   * Please note that when a throw expectation is negated, it will check each
	   * parameter independently, starting with error constructor type. The appropriate way
	   * to check for the existence of a type of error but for a message that does not match
	   * is to use `and`.
	   *
	   *     expect(fn).to.throw(ReferenceError)
	   *        .and.not.throw(/good function/);
	   *
	   * @name throw
	   * @alias throws
	   * @alias Throw
	   * @param {ErrorConstructor} constructor
	   * @param {String|RegExp} expected error message
	   * @param {String} message _optional_
	   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	   * @returns error for chaining (null if no error)
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertThrows (constructor, errMsg, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    new Assertion(obj, msg).is.a('function');
	
	    var thrown = false
	      , desiredError = null
	      , name = null
	      , thrownError = null;
	
	    if (arguments.length === 0) {
	      errMsg = null;
	      constructor = null;
	    } else if (constructor && (constructor instanceof RegExp || 'string' === typeof constructor)) {
	      errMsg = constructor;
	      constructor = null;
	    } else if (constructor && constructor instanceof Error) {
	      desiredError = constructor;
	      constructor = null;
	      errMsg = null;
	    } else if (typeof constructor === 'function') {
	      name = constructor.prototype.name;
	      if (!name || (name === 'Error' && constructor !== Error)) {
	        name = constructor.name || (new constructor()).name;
	      }
	    } else {
	      constructor = null;
	    }
	
	    try {
	      obj();
	    } catch (err) {
	      // first, check desired error
	      if (desiredError) {
	        this.assert(
	            err === desiredError
	          , 'expected #{this} to throw #{exp} but #{act} was thrown'
	          , 'expected #{this} to not throw #{exp}'
	          , (desiredError instanceof Error ? desiredError.toString() : desiredError)
	          , (err instanceof Error ? err.toString() : err)
	        );
	
	        flag(this, 'object', err);
	        return this;
	      }
	
	      // next, check constructor
	      if (constructor) {
	        this.assert(
	            err instanceof constructor
	          , 'expected #{this} to throw #{exp} but #{act} was thrown'
	          , 'expected #{this} to not throw #{exp} but #{act} was thrown'
	          , name
	          , (err instanceof Error ? err.toString() : err)
	        );
	
	        if (!errMsg) {
	          flag(this, 'object', err);
	          return this;
	        }
	      }
	
	      // next, check message
	      var message = 'error' === _.type(err) && "message" in err
	        ? err.message
	        : '' + err;
	
	      if ((message != null) && errMsg && errMsg instanceof RegExp) {
	        this.assert(
	            errMsg.exec(message)
	          , 'expected #{this} to throw error matching #{exp} but got #{act}'
	          , 'expected #{this} to throw error not matching #{exp}'
	          , errMsg
	          , message
	        );
	
	        flag(this, 'object', err);
	        return this;
	      } else if ((message != null) && errMsg && 'string' === typeof errMsg) {
	        this.assert(
	            ~message.indexOf(errMsg)
	          , 'expected #{this} to throw error including #{exp} but got #{act}'
	          , 'expected #{this} to throw error not including #{act}'
	          , errMsg
	          , message
	        );
	
	        flag(this, 'object', err);
	        return this;
	      } else {
	        thrown = true;
	        thrownError = err;
	      }
	    }
	
	    var actuallyGot = ''
	      , expectedThrown = name !== null
	        ? name
	        : desiredError
	          ? '#{exp}' //_.inspect(desiredError)
	          : 'an error';
	
	    if (thrown) {
	      actuallyGot = ' but #{act} was thrown'
	    }
	
	    this.assert(
	        thrown === true
	      , 'expected #{this} to throw ' + expectedThrown + actuallyGot
	      , 'expected #{this} to not throw ' + expectedThrown + actuallyGot
	      , (desiredError instanceof Error ? desiredError.toString() : desiredError)
	      , (thrownError instanceof Error ? thrownError.toString() : thrownError)
	    );
	
	    flag(this, 'object', thrownError);
	  };
	
	  Assertion.addMethod('throw', assertThrows);
	  Assertion.addMethod('throws', assertThrows);
	  Assertion.addMethod('Throw', assertThrows);
	
	  /**
	   * ### .respondTo(method)
	   *
	   * Asserts that the object or class target will respond to a method.
	   *
	   *     Klass.prototype.bar = function(){};
	   *     expect(Klass).to.respondTo('bar');
	   *     expect(obj).to.respondTo('bar');
	   *
	   * To check if a constructor will respond to a static function,
	   * set the `itself` flag.
	   *
	   *     Klass.baz = function(){};
	   *     expect(Klass).itself.to.respondTo('baz');
	   *
	   * @name respondTo
	   * @alias respondsTo
	   * @param {String} method
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function respondTo (method, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object')
	      , itself = flag(this, 'itself')
	      , context = ('function' === _.type(obj) && !itself)
	        ? obj.prototype[method]
	        : obj[method];
	
	    this.assert(
	        'function' === typeof context
	      , 'expected #{this} to respond to ' + _.inspect(method)
	      , 'expected #{this} to not respond to ' + _.inspect(method)
	    );
	  }
	
	  Assertion.addMethod('respondTo', respondTo);
	  Assertion.addMethod('respondsTo', respondTo);
	
	  /**
	   * ### .itself
	   *
	   * Sets the `itself` flag, later used by the `respondTo` assertion.
	   *
	   *     function Foo() {}
	   *     Foo.bar = function() {}
	   *     Foo.prototype.baz = function() {}
	   *
	   *     expect(Foo).itself.to.respondTo('bar');
	   *     expect(Foo).itself.not.to.respondTo('baz');
	   *
	   * @name itself
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('itself', function () {
	    flag(this, 'itself', true);
	  });
	
	  /**
	   * ### .satisfy(method)
	   *
	   * Asserts that the target passes a given truth test.
	   *
	   *     expect(1).to.satisfy(function(num) { return num > 0; });
	   *
	   * @name satisfy
	   * @alias satisfies
	   * @param {Function} matcher
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function satisfy (matcher, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    var result = matcher(obj);
	    this.assert(
	        result
	      , 'expected #{this} to satisfy ' + _.objDisplay(matcher)
	      , 'expected #{this} to not satisfy' + _.objDisplay(matcher)
	      , this.negate ? false : true
	      , result
	    );
	  }
	
	  Assertion.addMethod('satisfy', satisfy);
	  Assertion.addMethod('satisfies', satisfy);
	
	  /**
	   * ### .closeTo(expected, delta)
	   *
	   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
	   *
	   *     expect(1.5).to.be.closeTo(1, 0.5);
	   *
	   * @name closeTo
	   * @alias approximately
	   * @param {Number} expected
	   * @param {Number} delta
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function closeTo(expected, delta, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	
	    new Assertion(obj, msg).is.a('number');
	    if (_.type(expected) !== 'number' || _.type(delta) !== 'number') {
	      throw new Error('the arguments to closeTo or approximately must be numbers');
	    }
	
	    this.assert(
	        Math.abs(obj - expected) <= delta
	      , 'expected #{this} to be close to ' + expected + ' +/- ' + delta
	      , 'expected #{this} not to be close to ' + expected + ' +/- ' + delta
	    );
	  }
	
	  Assertion.addMethod('closeTo', closeTo);
	  Assertion.addMethod('approximately', closeTo);
	
	  function isSubsetOf(subset, superset, cmp) {
	    return subset.every(function(elem) {
	      if (!cmp) return superset.indexOf(elem) !== -1;
	
	      return superset.some(function(elem2) {
	        return cmp(elem, elem2);
	      });
	    })
	  }
	
	  /**
	   * ### .members(set)
	   *
	   * Asserts that the target is a superset of `set`,
	   * or that the target and `set` have the same strictly-equal (===) members.
	   * Alternately, if the `deep` flag is set, set members are compared for deep
	   * equality.
	   *
	   *     expect([1, 2, 3]).to.include.members([3, 2]);
	   *     expect([1, 2, 3]).to.not.include.members([3, 2, 8]);
	   *
	   *     expect([4, 2]).to.have.members([2, 4]);
	   *     expect([5, 2]).to.not.have.members([5, 2, 1]);
	   *
	   *     expect([{ id: 1 }]).to.deep.include.members([{ id: 1 }]);
	   *
	   * @name members
	   * @param {Array} set
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addMethod('members', function (subset, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	
	    new Assertion(obj).to.be.an('array');
	    new Assertion(subset).to.be.an('array');
	
	    var cmp = flag(this, 'deep') ? _.eql : undefined;
	
	    if (flag(this, 'contains')) {
	      return this.assert(
	          isSubsetOf(subset, obj, cmp)
	        , 'expected #{this} to be a superset of #{act}'
	        , 'expected #{this} to not be a superset of #{act}'
	        , obj
	        , subset
	      );
	    }
	
	    this.assert(
	        isSubsetOf(obj, subset, cmp) && isSubsetOf(subset, obj, cmp)
	        , 'expected #{this} to have the same members as #{act}'
	        , 'expected #{this} to not have the same members as #{act}'
	        , obj
	        , subset
	    );
	  });
	
	  /**
	   * ### .oneOf(list)
	   *
	   * Assert that a value appears somewhere in the top level of array `list`.
	   *
	   *     expect('a').to.be.oneOf(['a', 'b', 'c']);
	   *     expect(9).to.not.be.oneOf(['z']);
	   *     expect([3]).to.not.be.oneOf([1, 2, [3]]);
	   *
	   *     var three = [3];
	   *     // for object-types, contents are not compared
	   *     expect(three).to.not.be.oneOf([1, 2, [3]]);
	   *     // comparing references works
	   *     expect(three).to.be.oneOf([1, 2, three]);
	   *
	   * @name oneOf
	   * @param {Array<*>} list
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function oneOf (list, msg) {
	    if (msg) flag(this, 'message', msg);
	    var expected = flag(this, 'object');
	    new Assertion(list).to.be.an('array');
	
	    this.assert(
	        list.indexOf(expected) > -1
	      , 'expected #{this} to be one of #{exp}'
	      , 'expected #{this} to not be one of #{exp}'
	      , list
	      , expected
	    );
	  }
	
	  Assertion.addMethod('oneOf', oneOf);
	
	
	  /**
	   * ### .change(function)
	   *
	   * Asserts that a function changes an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val += 3 };
	   *     var noChangeFn = function() { return 'foo' + 'bar'; }
	   *     expect(fn).to.change(obj, 'val');
	   *     expect(noChangeFn).to.not.change(obj, 'val')
	   *
	   * @name change
	   * @alias changes
	   * @alias Change
	   * @param {String} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertChanges (object, prop, msg) {
	    if (msg) flag(this, 'message', msg);
	    var fn = flag(this, 'object');
	    new Assertion(object, msg).to.have.property(prop);
	    new Assertion(fn).is.a('function');
	
	    var initial = object[prop];
	    fn();
	
	    this.assert(
	      initial !== object[prop]
	      , 'expected .' + prop + ' to change'
	      , 'expected .' + prop + ' to not change'
	    );
	  }
	
	  Assertion.addChainableMethod('change', assertChanges);
	  Assertion.addChainableMethod('changes', assertChanges);
	
	  /**
	   * ### .increase(function)
	   *
	   * Asserts that a function increases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 15 };
	   *     expect(fn).to.increase(obj, 'val');
	   *
	   * @name increase
	   * @alias increases
	   * @alias Increase
	   * @param {String} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertIncreases (object, prop, msg) {
	    if (msg) flag(this, 'message', msg);
	    var fn = flag(this, 'object');
	    new Assertion(object, msg).to.have.property(prop);
	    new Assertion(fn).is.a('function');
	
	    var initial = object[prop];
	    fn();
	
	    this.assert(
	      object[prop] - initial > 0
	      , 'expected .' + prop + ' to increase'
	      , 'expected .' + prop + ' to not increase'
	    );
	  }
	
	  Assertion.addChainableMethod('increase', assertIncreases);
	  Assertion.addChainableMethod('increases', assertIncreases);
	
	  /**
	   * ### .decrease(function)
	   *
	   * Asserts that a function decreases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 5 };
	   *     expect(fn).to.decrease(obj, 'val');
	   *
	   * @name decrease
	   * @alias decreases
	   * @alias Decrease
	   * @param {String} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	
	  function assertDecreases (object, prop, msg) {
	    if (msg) flag(this, 'message', msg);
	    var fn = flag(this, 'object');
	    new Assertion(object, msg).to.have.property(prop);
	    new Assertion(fn).is.a('function');
	
	    var initial = object[prop];
	    fn();
	
	    this.assert(
	      object[prop] - initial < 0
	      , 'expected .' + prop + ' to decrease'
	      , 'expected .' + prop + ' to not decrease'
	    );
	  }
	
	  Assertion.addChainableMethod('decrease', assertDecreases);
	  Assertion.addChainableMethod('decreases', assertDecreases);
	
	  /**
	   * ### .extensible
	   *
	   * Asserts that the target is extensible (can have new properties added to
	   * it).
	   *
	   *     var nonExtensibleObject = Object.preventExtensions({});
	   *     var sealedObject = Object.seal({});
	   *     var frozenObject = Object.freeze({});
	   *
	   *     expect({}).to.be.extensible;
	   *     expect(nonExtensibleObject).to.not.be.extensible;
	   *     expect(sealedObject).to.not.be.extensible;
	   *     expect(frozenObject).to.not.be.extensible;
	   *
	   * @name extensible
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('extensible', function() {
	    var obj = flag(this, 'object');
	
	    // In ES5, if the argument to this method is not an object (a primitive), then it will cause a TypeError.
	    // In ES6, a non-object argument will be treated as if it was a non-extensible ordinary object, simply return false.
	    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible
	    // The following provides ES6 behavior when a TypeError is thrown under ES5.
	
	    var isExtensible;
	
	    try {
	      isExtensible = Object.isExtensible(obj);
	    } catch (err) {
	      if (err instanceof TypeError) isExtensible = false;
	      else throw err;
	    }
	
	    this.assert(
	      isExtensible
	      , 'expected #{this} to be extensible'
	      , 'expected #{this} to not be extensible'
	    );
	  });
	
	  /**
	   * ### .sealed
	   *
	   * Asserts that the target is sealed (cannot have new properties added to it
	   * and its existing properties cannot be removed).
	   *
	   *     var sealedObject = Object.seal({});
	   *     var frozenObject = Object.freeze({});
	   *
	   *     expect(sealedObject).to.be.sealed;
	   *     expect(frozenObject).to.be.sealed;
	   *     expect({}).to.not.be.sealed;
	   *
	   * @name sealed
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('sealed', function() {
	    var obj = flag(this, 'object');
	
	    // In ES5, if the argument to this method is not an object (a primitive), then it will cause a TypeError.
	    // In ES6, a non-object argument will be treated as if it was a sealed ordinary object, simply return true.
	    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed
	    // The following provides ES6 behavior when a TypeError is thrown under ES5.
	
	    var isSealed;
	
	    try {
	      isSealed = Object.isSealed(obj);
	    } catch (err) {
	      if (err instanceof TypeError) isSealed = true;
	      else throw err;
	    }
	
	    this.assert(
	      isSealed
	      , 'expected #{this} to be sealed'
	      , 'expected #{this} to not be sealed'
	    );
	  });
	
	  /**
	   * ### .frozen
	   *
	   * Asserts that the target is frozen (cannot have new properties added to it
	   * and its existing properties cannot be modified).
	   *
	   *     var frozenObject = Object.freeze({});
	   *
	   *     expect(frozenObject).to.be.frozen;
	   *     expect({}).to.not.be.frozen;
	   *
	   * @name frozen
	   * @namespace BDD
	   * @api public
	   */
	
	  Assertion.addProperty('frozen', function() {
	    var obj = flag(this, 'object');
	
	    // In ES5, if the argument to this method is not an object (a primitive), then it will cause a TypeError.
	    // In ES6, a non-object argument will be treated as if it was a frozen ordinary object, simply return true.
	    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen
	    // The following provides ES6 behavior when a TypeError is thrown under ES5.
	
	    var isFrozen;
	
	    try {
	      isFrozen = Object.isFrozen(obj);
	    } catch (err) {
	      if (err instanceof TypeError) isFrozen = true;
	      else throw err;
	    }
	
	    this.assert(
	      isFrozen
	      , 'expected #{this} to be frozen'
	      , 'expected #{this} to not be frozen'
	    );
	  });
	};


/***/ },
/* 63 */
/***/ function(module, exports) {

	/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	module.exports = function (chai, util) {
	  chai.expect = function (val, message) {
	    return new chai.Assertion(val, message);
	  };
	
	  /**
	   * ### .fail(actual, expected, [message], [operator])
	   *
	   * Throw a failure.
	   *
	   * @name fail
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @param {String} operator
	   * @namespace Expect
	   * @api public
	   */
	
	  chai.expect.fail = function (actual, expected, message, operator) {
	    message = message || 'expect.fail()';
	    throw new chai.AssertionError(message, {
	        actual: actual
	      , expected: expected
	      , operator: operator
	    }, chai.expect.fail);
	  };
	};


/***/ },
/* 64 */
/***/ function(module, exports) {

	/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	module.exports = function (chai, util) {
	  var Assertion = chai.Assertion;
	
	  function loadShould () {
	    // explicitly define this method as function as to have it's name to include as `ssfi`
	    function shouldGetter() {
	      if (this instanceof String || this instanceof Number || this instanceof Boolean ) {
	        return new Assertion(this.valueOf(), null, shouldGetter);
	      }
	      return new Assertion(this, null, shouldGetter);
	    }
	    function shouldSetter(value) {
	      // See https://github.com/chaijs/chai/issues/86: this makes
	      // `whatever.should = someValue` actually set `someValue`, which is
	      // especially useful for `global.should = require('chai').should()`.
	      //
	      // Note that we have to use [[DefineProperty]] instead of [[Put]]
	      // since otherwise we would trigger this very setter!
	      Object.defineProperty(this, 'should', {
	        value: value,
	        enumerable: true,
	        configurable: true,
	        writable: true
	      });
	    }
	    // modify Object.prototype to have `should`
	    Object.defineProperty(Object.prototype, 'should', {
	      set: shouldSetter
	      , get: shouldGetter
	      , configurable: true
	    });
	
	    var should = {};
	
	    /**
	     * ### .fail(actual, expected, [message], [operator])
	     *
	     * Throw a failure.
	     *
	     * @name fail
	     * @param {Mixed} actual
	     * @param {Mixed} expected
	     * @param {String} message
	     * @param {String} operator
	     * @namespace Should
	     * @api public
	     */
	
	    should.fail = function (actual, expected, message, operator) {
	      message = message || 'should.fail()';
	      throw new chai.AssertionError(message, {
	          actual: actual
	        , expected: expected
	        , operator: operator
	      }, should.fail);
	    };
	
	    /**
	     * ### .equal(actual, expected, [message])
	     *
	     * Asserts non-strict equality (`==`) of `actual` and `expected`.
	     *
	     *     should.equal(3, '3', '== coerces values to strings');
	     *
	     * @name equal
	     * @param {Mixed} actual
	     * @param {Mixed} expected
	     * @param {String} message
	     * @namespace Should
	     * @api public
	     */
	
	    should.equal = function (val1, val2, msg) {
	      new Assertion(val1, msg).to.equal(val2);
	    };
	
	    /**
	     * ### .throw(function, [constructor/string/regexp], [string/regexp], [message])
	     *
	     * Asserts that `function` will throw an error that is an instance of
	     * `constructor`, or alternately that it will throw an error with message
	     * matching `regexp`.
	     *
	     *     should.throw(fn, 'function throws a reference error');
	     *     should.throw(fn, /function throws a reference error/);
	     *     should.throw(fn, ReferenceError);
	     *     should.throw(fn, ReferenceError, 'function throws a reference error');
	     *     should.throw(fn, ReferenceError, /function throws a reference error/);
	     *
	     * @name throw
	     * @alias Throw
	     * @param {Function} function
	     * @param {ErrorConstructor} constructor
	     * @param {RegExp} regexp
	     * @param {String} message
	     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	     * @namespace Should
	     * @api public
	     */
	
	    should.Throw = function (fn, errt, errs, msg) {
	      new Assertion(fn, msg).to.Throw(errt, errs);
	    };
	
	    /**
	     * ### .exist
	     *
	     * Asserts that the target is neither `null` nor `undefined`.
	     *
	     *     var foo = 'hi';
	     *
	     *     should.exist(foo, 'foo exists');
	     *
	     * @name exist
	     * @namespace Should
	     * @api public
	     */
	
	    should.exist = function (val, msg) {
	      new Assertion(val, msg).to.exist;
	    }
	
	    // negation
	    should.not = {}
	
	    /**
	     * ### .not.equal(actual, expected, [message])
	     *
	     * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
	     *
	     *     should.not.equal(3, 4, 'these numbers are not equal');
	     *
	     * @name not.equal
	     * @param {Mixed} actual
	     * @param {Mixed} expected
	     * @param {String} message
	     * @namespace Should
	     * @api public
	     */
	
	    should.not.equal = function (val1, val2, msg) {
	      new Assertion(val1, msg).to.not.equal(val2);
	    };
	
	    /**
	     * ### .throw(function, [constructor/regexp], [message])
	     *
	     * Asserts that `function` will _not_ throw an error that is an instance of
	     * `constructor`, or alternately that it will not throw an error with message
	     * matching `regexp`.
	     *
	     *     should.not.throw(fn, Error, 'function does not throw');
	     *
	     * @name not.throw
	     * @alias not.Throw
	     * @param {Function} function
	     * @param {ErrorConstructor} constructor
	     * @param {RegExp} regexp
	     * @param {String} message
	     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	     * @namespace Should
	     * @api public
	     */
	
	    should.not.Throw = function (fn, errt, errs, msg) {
	      new Assertion(fn, msg).to.not.Throw(errt, errs);
	    };
	
	    /**
	     * ### .not.exist
	     *
	     * Asserts that the target is neither `null` nor `undefined`.
	     *
	     *     var bar = null;
	     *
	     *     should.not.exist(bar, 'bar does not exist');
	     *
	     * @name not.exist
	     * @namespace Should
	     * @api public
	     */
	
	    should.not.exist = function (val, msg) {
	      new Assertion(val, msg).to.not.exist;
	    }
	
	    should['throw'] = should['Throw'];
	    should.not['throw'] = should.not['Throw'];
	
	    return should;
	  };
	
	  chai.should = loadShould;
	  chai.Should = loadShould;
	};


/***/ },
/* 65 */
/***/ function(module, exports) {

	/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */
	
	
	module.exports = function (chai, util) {
	
	  /*!
	   * Chai dependencies.
	   */
	
	  var Assertion = chai.Assertion
	    , flag = util.flag;
	
	  /*!
	   * Module export.
	   */
	
	  /**
	   * ### assert(expression, message)
	   *
	   * Write your own test expressions.
	   *
	   *     assert('foo' !== 'bar', 'foo is not bar');
	   *     assert(Array.isArray([]), 'empty arrays are arrays');
	   *
	   * @param {Mixed} expression to test for truthiness
	   * @param {String} message to display on error
	   * @name assert
	   * @namespace Assert
	   * @api public
	   */
	
	  var assert = chai.assert = function (express, errmsg) {
	    var test = new Assertion(null, null, chai.assert);
	    test.assert(
	        express
	      , errmsg
	      , '[ negation message unavailable ]'
	    );
	  };
	
	  /**
	   * ### .fail(actual, expected, [message], [operator])
	   *
	   * Throw a failure. Node.js `assert` module-compatible.
	   *
	   * @name fail
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @param {String} operator
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.fail = function (actual, expected, message, operator) {
	    message = message || 'assert.fail()';
	    throw new chai.AssertionError(message, {
	        actual: actual
	      , expected: expected
	      , operator: operator
	    }, assert.fail);
	  };
	
	  /**
	   * ### .isOk(object, [message])
	   *
	   * Asserts that `object` is truthy.
	   *
	   *     assert.isOk('everything', 'everything is ok');
	   *     assert.isOk(false, 'this will fail');
	   *
	   * @name isOk
	   * @alias ok
	   * @param {Mixed} object to test
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isOk = function (val, msg) {
	    new Assertion(val, msg).is.ok;
	  };
	
	  /**
	   * ### .isNotOk(object, [message])
	   *
	   * Asserts that `object` is falsy.
	   *
	   *     assert.isNotOk('everything', 'this will fail');
	   *     assert.isNotOk(false, 'this will pass');
	   *
	   * @name isNotOk
	   * @alias notOk
	   * @param {Mixed} object to test
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotOk = function (val, msg) {
	    new Assertion(val, msg).is.not.ok;
	  };
	
	  /**
	   * ### .equal(actual, expected, [message])
	   *
	   * Asserts non-strict equality (`==`) of `actual` and `expected`.
	   *
	   *     assert.equal(3, '3', '== coerces values to strings');
	   *
	   * @name equal
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.equal = function (act, exp, msg) {
	    var test = new Assertion(act, msg, assert.equal);
	
	    test.assert(
	        exp == flag(test, 'object')
	      , 'expected #{this} to equal #{exp}'
	      , 'expected #{this} to not equal #{act}'
	      , exp
	      , act
	    );
	  };
	
	  /**
	   * ### .notEqual(actual, expected, [message])
	   *
	   * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
	   *
	   *     assert.notEqual(3, 4, 'these numbers are not equal');
	   *
	   * @name notEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.notEqual = function (act, exp, msg) {
	    var test = new Assertion(act, msg, assert.notEqual);
	
	    test.assert(
	        exp != flag(test, 'object')
	      , 'expected #{this} to not equal #{exp}'
	      , 'expected #{this} to equal #{act}'
	      , exp
	      , act
	    );
	  };
	
	  /**
	   * ### .strictEqual(actual, expected, [message])
	   *
	   * Asserts strict equality (`===`) of `actual` and `expected`.
	   *
	   *     assert.strictEqual(true, true, 'these booleans are strictly equal');
	   *
	   * @name strictEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.strictEqual = function (act, exp, msg) {
	    new Assertion(act, msg).to.equal(exp);
	  };
	
	  /**
	   * ### .notStrictEqual(actual, expected, [message])
	   *
	   * Asserts strict inequality (`!==`) of `actual` and `expected`.
	   *
	   *     assert.notStrictEqual(3, '3', 'no coercion for strict equality');
	   *
	   * @name notStrictEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.notStrictEqual = function (act, exp, msg) {
	    new Assertion(act, msg).to.not.equal(exp);
	  };
	
	  /**
	   * ### .deepEqual(actual, expected, [message])
	   *
	   * Asserts that `actual` is deeply equal to `expected`.
	   *
	   *     assert.deepEqual({ tea: 'green' }, { tea: 'green' });
	   *
	   * @name deepEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.deepEqual = function (act, exp, msg) {
	    new Assertion(act, msg).to.eql(exp);
	  };
	
	  /**
	   * ### .notDeepEqual(actual, expected, [message])
	   *
	   * Assert that `actual` is not deeply equal to `expected`.
	   *
	   *     assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });
	   *
	   * @name notDeepEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.notDeepEqual = function (act, exp, msg) {
	    new Assertion(act, msg).to.not.eql(exp);
	  };
	
	   /**
	   * ### .isAbove(valueToCheck, valueToBeAbove, [message])
	   *
	   * Asserts `valueToCheck` is strictly greater than (>) `valueToBeAbove`
	   *
	   *     assert.isAbove(5, 2, '5 is strictly greater than 2');
	   *
	   * @name isAbove
	   * @param {Mixed} valueToCheck
	   * @param {Mixed} valueToBeAbove
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isAbove = function (val, abv, msg) {
	    new Assertion(val, msg).to.be.above(abv);
	  };
	
	   /**
	   * ### .isAtLeast(valueToCheck, valueToBeAtLeast, [message])
	   *
	   * Asserts `valueToCheck` is greater than or equal to (>=) `valueToBeAtLeast`
	   *
	   *     assert.isAtLeast(5, 2, '5 is greater or equal to 2');
	   *     assert.isAtLeast(3, 3, '3 is greater or equal to 3');
	   *
	   * @name isAtLeast
	   * @param {Mixed} valueToCheck
	   * @param {Mixed} valueToBeAtLeast
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isAtLeast = function (val, atlst, msg) {
	    new Assertion(val, msg).to.be.least(atlst);
	  };
	
	   /**
	   * ### .isBelow(valueToCheck, valueToBeBelow, [message])
	   *
	   * Asserts `valueToCheck` is strictly less than (<) `valueToBeBelow`
	   *
	   *     assert.isBelow(3, 6, '3 is strictly less than 6');
	   *
	   * @name isBelow
	   * @param {Mixed} valueToCheck
	   * @param {Mixed} valueToBeBelow
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isBelow = function (val, blw, msg) {
	    new Assertion(val, msg).to.be.below(blw);
	  };
	
	   /**
	   * ### .isAtMost(valueToCheck, valueToBeAtMost, [message])
	   *
	   * Asserts `valueToCheck` is less than or equal to (<=) `valueToBeAtMost`
	   *
	   *     assert.isAtMost(3, 6, '3 is less than or equal to 6');
	   *     assert.isAtMost(4, 4, '4 is less than or equal to 4');
	   *
	   * @name isAtMost
	   * @param {Mixed} valueToCheck
	   * @param {Mixed} valueToBeAtMost
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isAtMost = function (val, atmst, msg) {
	    new Assertion(val, msg).to.be.most(atmst);
	  };
	
	  /**
	   * ### .isTrue(value, [message])
	   *
	   * Asserts that `value` is true.
	   *
	   *     var teaServed = true;
	   *     assert.isTrue(teaServed, 'the tea has been served');
	   *
	   * @name isTrue
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isTrue = function (val, msg) {
	    new Assertion(val, msg).is['true'];
	  };
	
	  /**
	   * ### .isNotTrue(value, [message])
	   *
	   * Asserts that `value` is not true.
	   *
	   *     var tea = 'tasty chai';
	   *     assert.isNotTrue(tea, 'great, time for tea!');
	   *
	   * @name isNotTrue
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotTrue = function (val, msg) {
	    new Assertion(val, msg).to.not.equal(true);
	  };
	
	  /**
	   * ### .isFalse(value, [message])
	   *
	   * Asserts that `value` is false.
	   *
	   *     var teaServed = false;
	   *     assert.isFalse(teaServed, 'no tea yet? hmm...');
	   *
	   * @name isFalse
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isFalse = function (val, msg) {
	    new Assertion(val, msg).is['false'];
	  };
	
	  /**
	   * ### .isNotFalse(value, [message])
	   *
	   * Asserts that `value` is not false.
	   *
	   *     var tea = 'tasty chai';
	   *     assert.isNotFalse(tea, 'great, time for tea!');
	   *
	   * @name isNotFalse
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotFalse = function (val, msg) {
	    new Assertion(val, msg).to.not.equal(false);
	  };
	
	  /**
	   * ### .isNull(value, [message])
	   *
	   * Asserts that `value` is null.
	   *
	   *     assert.isNull(err, 'there was no error');
	   *
	   * @name isNull
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNull = function (val, msg) {
	    new Assertion(val, msg).to.equal(null);
	  };
	
	  /**
	   * ### .isNotNull(value, [message])
	   *
	   * Asserts that `value` is not null.
	   *
	   *     var tea = 'tasty chai';
	   *     assert.isNotNull(tea, 'great, time for tea!');
	   *
	   * @name isNotNull
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotNull = function (val, msg) {
	    new Assertion(val, msg).to.not.equal(null);
	  };
	
	  /**
	   * ### .isNaN
	   * Asserts that value is NaN
	   *
	   *    assert.isNaN('foo', 'foo is NaN');
	   *
	   * @name isNaN
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNaN = function (val, msg) {
	    new Assertion(val, msg).to.be.NaN;
	  };
	
	  /**
	   * ### .isNotNaN
	   * Asserts that value is not NaN
	   *
	   *    assert.isNotNaN(4, '4 is not NaN');
	   *
	   * @name isNotNaN
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	  assert.isNotNaN = function (val, msg) {
	    new Assertion(val, msg).not.to.be.NaN;
	  };
	
	  /**
	   * ### .isUndefined(value, [message])
	   *
	   * Asserts that `value` is `undefined`.
	   *
	   *     var tea;
	   *     assert.isUndefined(tea, 'no tea defined');
	   *
	   * @name isUndefined
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isUndefined = function (val, msg) {
	    new Assertion(val, msg).to.equal(undefined);
	  };
	
	  /**
	   * ### .isDefined(value, [message])
	   *
	   * Asserts that `value` is not `undefined`.
	   *
	   *     var tea = 'cup of chai';
	   *     assert.isDefined(tea, 'tea has been defined');
	   *
	   * @name isDefined
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isDefined = function (val, msg) {
	    new Assertion(val, msg).to.not.equal(undefined);
	  };
	
	  /**
	   * ### .isFunction(value, [message])
	   *
	   * Asserts that `value` is a function.
	   *
	   *     function serveTea() { return 'cup of tea'; };
	   *     assert.isFunction(serveTea, 'great, we can have tea now');
	   *
	   * @name isFunction
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isFunction = function (val, msg) {
	    new Assertion(val, msg).to.be.a('function');
	  };
	
	  /**
	   * ### .isNotFunction(value, [message])
	   *
	   * Asserts that `value` is _not_ a function.
	   *
	   *     var serveTea = [ 'heat', 'pour', 'sip' ];
	   *     assert.isNotFunction(serveTea, 'great, we have listed the steps');
	   *
	   * @name isNotFunction
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotFunction = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('function');
	  };
	
	  /**
	   * ### .isObject(value, [message])
	   *
	   * Asserts that `value` is an object of type 'Object' (as revealed by `Object.prototype.toString`).
	   * _The assertion does not match subclassed objects._
	   *
	   *     var selection = { name: 'Chai', serve: 'with spices' };
	   *     assert.isObject(selection, 'tea selection is an object');
	   *
	   * @name isObject
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isObject = function (val, msg) {
	    new Assertion(val, msg).to.be.a('object');
	  };
	
	  /**
	   * ### .isNotObject(value, [message])
	   *
	   * Asserts that `value` is _not_ an object of type 'Object' (as revealed by `Object.prototype.toString`).
	   *
	   *     var selection = 'chai'
	   *     assert.isNotObject(selection, 'tea selection is not an object');
	   *     assert.isNotObject(null, 'null is not an object');
	   *
	   * @name isNotObject
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotObject = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('object');
	  };
	
	  /**
	   * ### .isArray(value, [message])
	   *
	   * Asserts that `value` is an array.
	   *
	   *     var menu = [ 'green', 'chai', 'oolong' ];
	   *     assert.isArray(menu, 'what kind of tea do we want?');
	   *
	   * @name isArray
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isArray = function (val, msg) {
	    new Assertion(val, msg).to.be.an('array');
	  };
	
	  /**
	   * ### .isNotArray(value, [message])
	   *
	   * Asserts that `value` is _not_ an array.
	   *
	   *     var menu = 'green|chai|oolong';
	   *     assert.isNotArray(menu, 'what kind of tea do we want?');
	   *
	   * @name isNotArray
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotArray = function (val, msg) {
	    new Assertion(val, msg).to.not.be.an('array');
	  };
	
	  /**
	   * ### .isString(value, [message])
	   *
	   * Asserts that `value` is a string.
	   *
	   *     var teaOrder = 'chai';
	   *     assert.isString(teaOrder, 'order placed');
	   *
	   * @name isString
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isString = function (val, msg) {
	    new Assertion(val, msg).to.be.a('string');
	  };
	
	  /**
	   * ### .isNotString(value, [message])
	   *
	   * Asserts that `value` is _not_ a string.
	   *
	   *     var teaOrder = 4;
	   *     assert.isNotString(teaOrder, 'order placed');
	   *
	   * @name isNotString
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotString = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('string');
	  };
	
	  /**
	   * ### .isNumber(value, [message])
	   *
	   * Asserts that `value` is a number.
	   *
	   *     var cups = 2;
	   *     assert.isNumber(cups, 'how many cups');
	   *
	   * @name isNumber
	   * @param {Number} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNumber = function (val, msg) {
	    new Assertion(val, msg).to.be.a('number');
	  };
	
	  /**
	   * ### .isNotNumber(value, [message])
	   *
	   * Asserts that `value` is _not_ a number.
	   *
	   *     var cups = '2 cups please';
	   *     assert.isNotNumber(cups, 'how many cups');
	   *
	   * @name isNotNumber
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotNumber = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('number');
	  };
	
	  /**
	   * ### .isBoolean(value, [message])
	   *
	   * Asserts that `value` is a boolean.
	   *
	   *     var teaReady = true
	   *       , teaServed = false;
	   *
	   *     assert.isBoolean(teaReady, 'is the tea ready');
	   *     assert.isBoolean(teaServed, 'has tea been served');
	   *
	   * @name isBoolean
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isBoolean = function (val, msg) {
	    new Assertion(val, msg).to.be.a('boolean');
	  };
	
	  /**
	   * ### .isNotBoolean(value, [message])
	   *
	   * Asserts that `value` is _not_ a boolean.
	   *
	   *     var teaReady = 'yep'
	   *       , teaServed = 'nope';
	   *
	   *     assert.isNotBoolean(teaReady, 'is the tea ready');
	   *     assert.isNotBoolean(teaServed, 'has tea been served');
	   *
	   * @name isNotBoolean
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotBoolean = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('boolean');
	  };
	
	  /**
	   * ### .typeOf(value, name, [message])
	   *
	   * Asserts that `value`'s type is `name`, as determined by
	   * `Object.prototype.toString`.
	   *
	   *     assert.typeOf({ tea: 'chai' }, 'object', 'we have an object');
	   *     assert.typeOf(['chai', 'jasmine'], 'array', 'we have an array');
	   *     assert.typeOf('tea', 'string', 'we have a string');
	   *     assert.typeOf(/tea/, 'regexp', 'we have a regular expression');
	   *     assert.typeOf(null, 'null', 'we have a null');
	   *     assert.typeOf(undefined, 'undefined', 'we have an undefined');
	   *
	   * @name typeOf
	   * @param {Mixed} value
	   * @param {String} name
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.typeOf = function (val, type, msg) {
	    new Assertion(val, msg).to.be.a(type);
	  };
	
	  /**
	   * ### .notTypeOf(value, name, [message])
	   *
	   * Asserts that `value`'s type is _not_ `name`, as determined by
	   * `Object.prototype.toString`.
	   *
	   *     assert.notTypeOf('tea', 'number', 'strings are not numbers');
	   *
	   * @name notTypeOf
	   * @param {Mixed} value
	   * @param {String} typeof name
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.notTypeOf = function (val, type, msg) {
	    new Assertion(val, msg).to.not.be.a(type);
	  };
	
	  /**
	   * ### .instanceOf(object, constructor, [message])
	   *
	   * Asserts that `value` is an instance of `constructor`.
	   *
	   *     var Tea = function (name) { this.name = name; }
	   *       , chai = new Tea('chai');
	   *
	   *     assert.instanceOf(chai, Tea, 'chai is an instance of tea');
	   *
	   * @name instanceOf
	   * @param {Object} object
	   * @param {Constructor} constructor
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.instanceOf = function (val, type, msg) {
	    new Assertion(val, msg).to.be.instanceOf(type);
	  };
	
	  /**
	   * ### .notInstanceOf(object, constructor, [message])
	   *
	   * Asserts `value` is not an instance of `constructor`.
	   *
	   *     var Tea = function (name) { this.name = name; }
	   *       , chai = new String('chai');
	   *
	   *     assert.notInstanceOf(chai, Tea, 'chai is not an instance of tea');
	   *
	   * @name notInstanceOf
	   * @param {Object} object
	   * @param {Constructor} constructor
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.notInstanceOf = function (val, type, msg) {
	    new Assertion(val, msg).to.not.be.instanceOf(type);
	  };
	
	  /**
	   * ### .include(haystack, needle, [message])
	   *
	   * Asserts that `haystack` includes `needle`. Works
	   * for strings and arrays.
	   *
	   *     assert.include('foobar', 'bar', 'foobar contains string "bar"');
	   *     assert.include([ 1, 2, 3 ], 3, 'array contains value');
	   *
	   * @name include
	   * @param {Array|String} haystack
	   * @param {Mixed} needle
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.include = function (exp, inc, msg) {
	    new Assertion(exp, msg, assert.include).include(inc);
	  };
	
	  /**
	   * ### .notInclude(haystack, needle, [message])
	   *
	   * Asserts that `haystack` does not include `needle`. Works
	   * for strings and arrays.
	   *
	   *     assert.notInclude('foobar', 'baz', 'string not include substring');
	   *     assert.notInclude([ 1, 2, 3 ], 4, 'array not include contain value');
	   *
	   * @name notInclude
	   * @param {Array|String} haystack
	   * @param {Mixed} needle
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.notInclude = function (exp, inc, msg) {
	    new Assertion(exp, msg, assert.notInclude).not.include(inc);
	  };
	
	  /**
	   * ### .match(value, regexp, [message])
	   *
	   * Asserts that `value` matches the regular expression `regexp`.
	   *
	   *     assert.match('foobar', /^foo/, 'regexp matches');
	   *
	   * @name match
	   * @param {Mixed} value
	   * @param {RegExp} regexp
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.match = function (exp, re, msg) {
	    new Assertion(exp, msg).to.match(re);
	  };
	
	  /**
	   * ### .notMatch(value, regexp, [message])
	   *
	   * Asserts that `value` does not match the regular expression `regexp`.
	   *
	   *     assert.notMatch('foobar', /^foo/, 'regexp does not match');
	   *
	   * @name notMatch
	   * @param {Mixed} value
	   * @param {RegExp} regexp
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.notMatch = function (exp, re, msg) {
	    new Assertion(exp, msg).to.not.match(re);
	  };
	
	  /**
	   * ### .property(object, property, [message])
	   *
	   * Asserts that `object` has a property named by `property`.
	   *
	   *     assert.property({ tea: { green: 'matcha' }}, 'tea');
	   *
	   * @name property
	   * @param {Object} object
	   * @param {String} property
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.property = function (obj, prop, msg) {
	    new Assertion(obj, msg).to.have.property(prop);
	  };
	
	  /**
	   * ### .notProperty(object, property, [message])
	   *
	   * Asserts that `object` does _not_ have a property named by `property`.
	   *
	   *     assert.notProperty({ tea: { green: 'matcha' }}, 'coffee');
	   *
	   * @name notProperty
	   * @param {Object} object
	   * @param {String} property
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.notProperty = function (obj, prop, msg) {
	    new Assertion(obj, msg).to.not.have.property(prop);
	  };
	
	  /**
	   * ### .deepProperty(object, property, [message])
	   *
	   * Asserts that `object` has a property named by `property`, which can be a
	   * string using dot- and bracket-notation for deep reference.
	   *
	   *     assert.deepProperty({ tea: { green: 'matcha' }}, 'tea.green');
	   *
	   * @name deepProperty
	   * @param {Object} object
	   * @param {String} property
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.deepProperty = function (obj, prop, msg) {
	    new Assertion(obj, msg).to.have.deep.property(prop);
	  };
	
	  /**
	   * ### .notDeepProperty(object, property, [message])
	   *
	   * Asserts that `object` does _not_ have a property named by `property`, which
	   * can be a string using dot- and bracket-notation for deep reference.
	   *
	   *     assert.notDeepProperty({ tea: { green: 'matcha' }}, 'tea.oolong');
	   *
	   * @name notDeepProperty
	   * @param {Object} object
	   * @param {String} property
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.notDeepProperty = function (obj, prop, msg) {
	    new Assertion(obj, msg).to.not.have.deep.property(prop);
	  };
	
	  /**
	   * ### .propertyVal(object, property, value, [message])
	   *
	   * Asserts that `object` has a property named by `property` with value given
	   * by `value`.
	   *
	   *     assert.propertyVal({ tea: 'is good' }, 'tea', 'is good');
	   *
	   * @name propertyVal
	   * @param {Object} object
	   * @param {String} property
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.propertyVal = function (obj, prop, val, msg) {
	    new Assertion(obj, msg).to.have.property(prop, val);
	  };
	
	  /**
	   * ### .propertyNotVal(object, property, value, [message])
	   *
	   * Asserts that `object` has a property named by `property`, but with a value
	   * different from that given by `value`.
	   *
	   *     assert.propertyNotVal({ tea: 'is good' }, 'tea', 'is bad');
	   *
	   * @name propertyNotVal
	   * @param {Object} object
	   * @param {String} property
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.propertyNotVal = function (obj, prop, val, msg) {
	    new Assertion(obj, msg).to.not.have.property(prop, val);
	  };
	
	  /**
	   * ### .deepPropertyVal(object, property, value, [message])
	   *
	   * Asserts that `object` has a property named by `property` with value given
	   * by `value`. `property` can use dot- and bracket-notation for deep
	   * reference.
	   *
	   *     assert.deepPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');
	   *
	   * @name deepPropertyVal
	   * @param {Object} object
	   * @param {String} property
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.deepPropertyVal = function (obj, prop, val, msg) {
	    new Assertion(obj, msg).to.have.deep.property(prop, val);
	  };
	
	  /**
	   * ### .deepPropertyNotVal(object, property, value, [message])
	   *
	   * Asserts that `object` has a property named by `property`, but with a value
	   * different from that given by `value`. `property` can use dot- and
	   * bracket-notation for deep reference.
	   *
	   *     assert.deepPropertyNotVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');
	   *
	   * @name deepPropertyNotVal
	   * @param {Object} object
	   * @param {String} property
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.deepPropertyNotVal = function (obj, prop, val, msg) {
	    new Assertion(obj, msg).to.not.have.deep.property(prop, val);
	  };
	
	  /**
	   * ### .lengthOf(object, length, [message])
	   *
	   * Asserts that `object` has a `length` property with the expected value.
	   *
	   *     assert.lengthOf([1,2,3], 3, 'array has length of 3');
	   *     assert.lengthOf('foobar', 6, 'string has length of 6');
	   *
	   * @name lengthOf
	   * @param {Mixed} object
	   * @param {Number} length
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.lengthOf = function (exp, len, msg) {
	    new Assertion(exp, msg).to.have.length(len);
	  };
	
	  /**
	   * ### .throws(function, [constructor/string/regexp], [string/regexp], [message])
	   *
	   * Asserts that `function` will throw an error that is an instance of
	   * `constructor`, or alternately that it will throw an error with message
	   * matching `regexp`.
	   *
	   *     assert.throws(fn, 'function throws a reference error');
	   *     assert.throws(fn, /function throws a reference error/);
	   *     assert.throws(fn, ReferenceError);
	   *     assert.throws(fn, ReferenceError, 'function throws a reference error');
	   *     assert.throws(fn, ReferenceError, /function throws a reference error/);
	   *
	   * @name throws
	   * @alias throw
	   * @alias Throw
	   * @param {Function} function
	   * @param {ErrorConstructor} constructor
	   * @param {RegExp} regexp
	   * @param {String} message
	   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.throws = function (fn, errt, errs, msg) {
	    if ('string' === typeof errt || errt instanceof RegExp) {
	      errs = errt;
	      errt = null;
	    }
	
	    var assertErr = new Assertion(fn, msg).to.throw(errt, errs);
	    return flag(assertErr, 'object');
	  };
	
	  /**
	   * ### .doesNotThrow(function, [constructor/regexp], [message])
	   *
	   * Asserts that `function` will _not_ throw an error that is an instance of
	   * `constructor`, or alternately that it will not throw an error with message
	   * matching `regexp`.
	   *
	   *     assert.doesNotThrow(fn, Error, 'function does not throw');
	   *
	   * @name doesNotThrow
	   * @param {Function} function
	   * @param {ErrorConstructor} constructor
	   * @param {RegExp} regexp
	   * @param {String} message
	   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.doesNotThrow = function (fn, type, msg) {
	    if ('string' === typeof type) {
	      msg = type;
	      type = null;
	    }
	
	    new Assertion(fn, msg).to.not.Throw(type);
	  };
	
	  /**
	   * ### .operator(val1, operator, val2, [message])
	   *
	   * Compares two values using `operator`.
	   *
	   *     assert.operator(1, '<', 2, 'everything is ok');
	   *     assert.operator(1, '>', 2, 'this will fail');
	   *
	   * @name operator
	   * @param {Mixed} val1
	   * @param {String} operator
	   * @param {Mixed} val2
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.operator = function (val, operator, val2, msg) {
	    var ok;
	    switch(operator) {
	      case '==':
	        ok = val == val2;
	        break;
	      case '===':
	        ok = val === val2;
	        break;
	      case '>':
	        ok = val > val2;
	        break;
	      case '>=':
	        ok = val >= val2;
	        break;
	      case '<':
	        ok = val < val2;
	        break;
	      case '<=':
	        ok = val <= val2;
	        break;
	      case '!=':
	        ok = val != val2;
	        break;
	      case '!==':
	        ok = val !== val2;
	        break;
	      default:
	        throw new Error('Invalid operator "' + operator + '"');
	    }
	    var test = new Assertion(ok, msg);
	    test.assert(
	        true === flag(test, 'object')
	      , 'expected ' + util.inspect(val) + ' to be ' + operator + ' ' + util.inspect(val2)
	      , 'expected ' + util.inspect(val) + ' to not be ' + operator + ' ' + util.inspect(val2) );
	  };
	
	  /**
	   * ### .closeTo(actual, expected, delta, [message])
	   *
	   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
	   *
	   *     assert.closeTo(1.5, 1, 0.5, 'numbers are close');
	   *
	   * @name closeTo
	   * @param {Number} actual
	   * @param {Number} expected
	   * @param {Number} delta
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.closeTo = function (act, exp, delta, msg) {
	    new Assertion(act, msg).to.be.closeTo(exp, delta);
	  };
	
	  /**
	   * ### .approximately(actual, expected, delta, [message])
	   *
	   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
	   *
	   *     assert.approximately(1.5, 1, 0.5, 'numbers are close');
	   *
	   * @name approximately
	   * @param {Number} actual
	   * @param {Number} expected
	   * @param {Number} delta
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.approximately = function (act, exp, delta, msg) {
	    new Assertion(act, msg).to.be.approximately(exp, delta);
	  };
	
	  /**
	   * ### .sameMembers(set1, set2, [message])
	   *
	   * Asserts that `set1` and `set2` have the same members.
	   * Order is not taken into account.
	   *
	   *     assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');
	   *
	   * @name sameMembers
	   * @param {Array} set1
	   * @param {Array} set2
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.sameMembers = function (set1, set2, msg) {
	    new Assertion(set1, msg).to.have.same.members(set2);
	  }
	
	  /**
	   * ### .sameDeepMembers(set1, set2, [message])
	   *
	   * Asserts that `set1` and `set2` have the same members - using a deep equality checking.
	   * Order is not taken into account.
	   *
	   *     assert.sameDeepMembers([ {b: 3}, {a: 2}, {c: 5} ], [ {c: 5}, {b: 3}, {a: 2} ], 'same deep members');
	   *
	   * @name sameDeepMembers
	   * @param {Array} set1
	   * @param {Array} set2
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.sameDeepMembers = function (set1, set2, msg) {
	    new Assertion(set1, msg).to.have.same.deep.members(set2);
	  }
	
	  /**
	   * ### .includeMembers(superset, subset, [message])
	   *
	   * Asserts that `subset` is included in `superset`.
	   * Order is not taken into account.
	   *
	   *     assert.includeMembers([ 1, 2, 3 ], [ 2, 1 ], 'include members');
	   *
	   * @name includeMembers
	   * @param {Array} superset
	   * @param {Array} subset
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.includeMembers = function (superset, subset, msg) {
	    new Assertion(superset, msg).to.include.members(subset);
	  }
	
	  /**
	   * ### .includeDeepMembers(superset, subset, [message])
	   *
	   * Asserts that `subset` is included in `superset` - using deep equality checking.
	   * Order is not taken into account.
	   * Duplicates are ignored.
	   *
	   *     assert.includeDeepMembers([ {a: 1}, {b: 2}, {c: 3} ], [ {b: 2}, {a: 1}, {b: 2} ], 'include deep members');
	   *
	   * @name includeDeepMembers
	   * @param {Array} superset
	   * @param {Array} subset
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.includeDeepMembers = function (superset, subset, msg) {
	    new Assertion(superset, msg).to.include.deep.members(subset);
	  }
	
	  /**
	   * ### .oneOf(inList, list, [message])
	   *
	   * Asserts that non-object, non-array value `inList` appears in the flat array `list`.
	   *
	   *     assert.oneOf(1, [ 2, 1 ], 'Not found in list');
	   *
	   * @name oneOf
	   * @param {*} inList
	   * @param {Array<*>} list
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.oneOf = function (inList, list, msg) {
	    new Assertion(inList, msg).to.be.oneOf(list);
	  }
	
	   /**
	   * ### .changes(function, object, property)
	   *
	   * Asserts that a function changes the value of a property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 22 };
	   *     assert.changes(fn, obj, 'val');
	   *
	   * @name changes
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.changes = function (fn, obj, prop) {
	    new Assertion(fn).to.change(obj, prop);
	  }
	
	   /**
	   * ### .doesNotChange(function, object, property)
	   *
	   * Asserts that a function does not changes the value of a property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { console.log('foo'); };
	   *     assert.doesNotChange(fn, obj, 'val');
	   *
	   * @name doesNotChange
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.doesNotChange = function (fn, obj, prop) {
	    new Assertion(fn).to.not.change(obj, prop);
	  }
	
	   /**
	   * ### .increases(function, object, property)
	   *
	   * Asserts that a function increases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 13 };
	   *     assert.increases(fn, obj, 'val');
	   *
	   * @name increases
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.increases = function (fn, obj, prop) {
	    new Assertion(fn).to.increase(obj, prop);
	  }
	
	   /**
	   * ### .doesNotIncrease(function, object, property)
	   *
	   * Asserts that a function does not increase object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 8 };
	   *     assert.doesNotIncrease(fn, obj, 'val');
	   *
	   * @name doesNotIncrease
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.doesNotIncrease = function (fn, obj, prop) {
	    new Assertion(fn).to.not.increase(obj, prop);
	  }
	
	   /**
	   * ### .decreases(function, object, property)
	   *
	   * Asserts that a function decreases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 5 };
	   *     assert.decreases(fn, obj, 'val');
	   *
	   * @name decreases
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.decreases = function (fn, obj, prop) {
	    new Assertion(fn).to.decrease(obj, prop);
	  }
	
	   /**
	   * ### .doesNotDecrease(function, object, property)
	   *
	   * Asserts that a function does not decreases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 15 };
	   *     assert.doesNotDecrease(fn, obj, 'val');
	   *
	   * @name doesNotDecrease
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.doesNotDecrease = function (fn, obj, prop) {
	    new Assertion(fn).to.not.decrease(obj, prop);
	  }
	
	  /*!
	   * ### .ifError(object)
	   *
	   * Asserts if value is not a false value, and throws if it is a true value.
	   * This is added to allow for chai to be a drop-in replacement for Node's
	   * assert class.
	   *
	   *     var err = new Error('I am a custom error');
	   *     assert.ifError(err); // Rethrows err!
	   *
	   * @name ifError
	   * @param {Object} object
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.ifError = function (val) {
	    if (val) {
	      throw(val);
	    }
	  };
	
	  /**
	   * ### .isExtensible(object)
	   *
	   * Asserts that `object` is extensible (can have new properties added to it).
	   *
	   *     assert.isExtensible({});
	   *
	   * @name isExtensible
	   * @alias extensible
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isExtensible = function (obj, msg) {
	    new Assertion(obj, msg).to.be.extensible;
	  };
	
	  /**
	   * ### .isNotExtensible(object)
	   *
	   * Asserts that `object` is _not_ extensible.
	   *
	   *     var nonExtensibleObject = Object.preventExtensions({});
	   *     var sealedObject = Object.seal({});
	   *     var frozenObject = Object.freese({});
	   *
	   *     assert.isNotExtensible(nonExtensibleObject);
	   *     assert.isNotExtensible(sealedObject);
	   *     assert.isNotExtensible(frozenObject);
	   *
	   * @name isNotExtensible
	   * @alias notExtensible
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotExtensible = function (obj, msg) {
	    new Assertion(obj, msg).to.not.be.extensible;
	  };
	
	  /**
	   * ### .isSealed(object)
	   *
	   * Asserts that `object` is sealed (cannot have new properties added to it
	   * and its existing properties cannot be removed).
	   *
	   *     var sealedObject = Object.seal({});
	   *     var frozenObject = Object.seal({});
	   *
	   *     assert.isSealed(sealedObject);
	   *     assert.isSealed(frozenObject);
	   *
	   * @name isSealed
	   * @alias sealed
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isSealed = function (obj, msg) {
	    new Assertion(obj, msg).to.be.sealed;
	  };
	
	  /**
	   * ### .isNotSealed(object)
	   *
	   * Asserts that `object` is _not_ sealed.
	   *
	   *     assert.isNotSealed({});
	   *
	   * @name isNotSealed
	   * @alias notSealed
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotSealed = function (obj, msg) {
	    new Assertion(obj, msg).to.not.be.sealed;
	  };
	
	  /**
	   * ### .isFrozen(object)
	   *
	   * Asserts that `object` is frozen (cannot have new properties added to it
	   * and its existing properties cannot be modified).
	   *
	   *     var frozenObject = Object.freeze({});
	   *     assert.frozen(frozenObject);
	   *
	   * @name isFrozen
	   * @alias frozen
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isFrozen = function (obj, msg) {
	    new Assertion(obj, msg).to.be.frozen;
	  };
	
	  /**
	   * ### .isNotFrozen(object)
	   *
	   * Asserts that `object` is _not_ frozen.
	   *
	   *     assert.isNotFrozen({});
	   *
	   * @name isNotFrozen
	   * @alias notFrozen
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */
	
	  assert.isNotFrozen = function (obj, msg) {
	    new Assertion(obj, msg).to.not.be.frozen;
	  };
	
	  /*!
	   * Aliases.
	   */
	
	  (function alias(name, as){
	    assert[as] = assert[name];
	    return alias;
	  })
	  ('isOk', 'ok')
	  ('isNotOk', 'notOk')
	  ('throws', 'throw')
	  ('throws', 'Throw')
	  ('isExtensible', 'extensible')
	  ('isNotExtensible', 'notExtensible')
	  ('isSealed', 'sealed')
	  ('isNotSealed', 'notSealed')
	  ('isFrozen', 'frozen')
	  ('isNotFrozen', 'notFrozen');
	};


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _nflow = __webpack_require__(1);
	
	var _nflow2 = _interopRequireDefault(_nflow);
	
	var _chai = __webpack_require__(26);
	
	var _assert = __webpack_require__(67);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var sut; /* globals describe, it, beforeEach */
	
	
	describe('Namespace API', function () {
	  beforeEach(function () {
	    sut = _nflow2['default'].create('sut').parent(null);
	  });
	
	  describe('Namespace queries', function () {
	    it('should return full namespace', function () {
	      var ns = sut.create('a').create('bb').create('ccc').create('dddd').namespace();
	
	      (0, _chai.expect)(ns).to.equal('sut:a:bb:ccc:dddd');
	    });
	
	    it('.full() API', function () {
	      var ns = sut.create('a').create('b').create('x:y:foo').namespace.full();
	      (0, _chai.expect)(ns).to.deep.equal(['sut', 'a', 'b', 'x', 'y', 'foo']);
	    });
	
	    it('.full() API should return correct NS on orphaned nodes', function () {
	      var ns = sut.create('a').create('b').create('x:y:foo').parent(null).namespace.full();
	      (0, _chai.expect)(ns).to.deep.equal(['x', 'y', 'foo']);
	    });
	
	    it('.full() API should return correct NS on re-parented nodes', function () {
	      var a = sut.create('a').create('b');
	      var ns = sut.create('x:y:foo').parent(a).namespace.full();
	      (0, _chai.expect)(ns).to.deep.equal(['sut', 'a', 'b', 'x', 'y', 'foo']);
	    });
	
	    it('.implicit() API', function () {
	      var ns = sut.create('a').create('bb').create('ccc').create('x:y:dddd').namespace.implicit();
	      (0, _chai.expect)(ns).to.deep.equal(['sut', 'a', 'bb', 'ccc']);
	    });
	
	    it('.explicit() API should return correct NS', function () {
	      var ns = sut.create('a').create('b').create('x:y:foo').namespace.explicit();
	      (0, _chai.expect)(ns).to.deep.equal(['x', 'y']);
	    });
	
	    it('.localName() API', function () {
	      var ns = sut.create('a').create('b').create('x:y:foo').namespace.localName();
	      (0, _chai.expect)(ns).to.deep.equal('foo');
	    });
	  });
	
	  describe('Namespace Resolver', function () {
	    it('should resolve global matches', function () {
	      var s = sut.create('a').create('bb').create('ccc').create('dddd');
	
	      (0, _chai.expect)(s.namespace.localise('x')).to.equal('x');
	      (0, _chai.expect)(s.namespace.localise('x:a')).to.equal('x:a');
	      (0, _chai.expect)(s.namespace.localise('x:a:bb')).to.equal('x:a:bb');
	    });
	
	    it('should resolve local matches', function () {
	      var a = sut.create('a');
	      var b = a.create('bb');
	      var c = b.create('ccc');
	      var d = c.create('dddd');
	
	      (0, _chai.expect)(d.namespace.localise('a:event')).to.equal(a.guid() + ':event');
	      (0, _chai.expect)(d.namespace.localise('ccc:someEvent')).to.equal(c.guid() + ':someEvent');
	    });
	
	    it('should not localise listeners without a namespace', function () {
	      var a = sut.create('a');
	      var b = a.create('bb');
	      var c = b.create('ccc');
	      var d = c.create('dddd');
	
	      (0, _chai.expect)(d.namespace.localise('a')).to.equal('a');
	      (0, _chai.expect)(d.namespace.localise('x')).to.equal('x');
	    });
	
	    it('should localise partial matches', function () {
	      var a = sut.create('a');
	      var b = a.create('bb');
	      var c = b.create('ccc');
	      var d = c.create('dddd');
	
	      (0, _chai.expect)(d.namespace.localise('a:x')).to.equal(a.guid() + ':x');
	      (0, _chai.expect)(d.namespace.localise('a:x:ccc')).to.equal(a.guid() + ':x:ccc');
	      (0, _chai.expect)(d.namespace.localise('a:x')).to.equal(a.guid() + ':x');
	    });
	  });
	
	  var abc = function abc(p) {
	    return (p || sut).create('a').create('b').create('c');
	  };
	
	  var xyz = function xyz(p) {
	    return (p || sut).create('x').create('y').create('z');
	  };
	
	  describe('Sender-side namespace constraints', function () {
	    it('a:event -> (a:)event', function (done) {
	      abc().on('event', function () {
	        return done();
	      });
	      xyz().emit('a:event');
	    });
	
	    it('a:event -> a:event', function (done) {
	      sut.on('a:event', function () {
	        return done();
	      });
	      xyz().emit('a:event');
	    });
	
	    it('(a:)event -> (a:b:c:)a:event', function (done) {
	      abc().on('a:event', function () {
	        return done();
	      });
	      sut.get('a').emit('event');
	    });
	
	    it('(a:)event -> (a:b:c:)a:event', function (done) {
	      abc().on('a:event', function () {
	        return done();
	      });
	      sut.get('a').emit('event');
	    });
	
	    it('a:event -X-> (x:)event', function () {
	      xyz().on('event', function () {
	        return _assert2['default'].fail('it should not deliver to nodes where the sender\'s explicit namespace is unmatched');
	      }).emit('a:event');
	    });
	    it('(x:)event -X-> a:event', function () {
	      xyz().on('a:event', function () {
	        return _assert2['default'].fail('it should not deliver to nodes where the receiver\'s explicit namespace is unmatched');
	      }).emit('event');
	    });
	
	    it('(y:a:)event -X-> (x:a:b:c:)a:event', function (done) {
	      var x = sut.create('x');
	      var y = sut.create('y');
	      abc(y).on('a:event', function () {
	        return _assert2['default'].fail('it should not deliver to `a` from a different branch');
	      });
	      abc(x).emit('event');
	      done();
	    });
	
	    it('(a:b:c):a:event -X-> a:event', function (done) {
	      abc().on('a:event', function () {
	        return _assert2['default'].fail('it should not deliver to `a` from a different branch');
	      });
	      abc().emit('a:event');
	      done();
	    });
	
	    it('(y:a:)event -X-> (x:a:b:c:)*:a:event', function (done) {
	      var x = sut.create('x');
	      var y = sut.create('y');
	      abc(y).on('*:a:event', function () {
	        return done();
	      });
	      abc(x).emit('event');
	    });
	
	    it('(a:b:c):a:event -X-> *:a:event', function (done) {
	      abc().on('*:a:event', function () {
	        return done();
	      });
	      abc().emit('a:event');
	    });
	  });
	
	  describe('Receiver-side namespace constraints', function () {
	    it('should match generic NS', function () {
	      var s = sut.create('a').create('bb').create('ccc').create('event');
	
	      (0, _chai.expect)(s.namespace.match(sut, 'bb'), 'namespace with no event name').to.be['false'];
	      (0, _chai.expect)(s.namespace.match(sut, 'xx:event', 'wrong namespace')).to.be['false'];
	      (0, _chai.expect)(s.namespace.match(sut, 'bb:bb:event'), 'duplicate context').to.be['false'];
	      (0, _chai.expect)(s.namespace.match(sut, 'ccc:bb:event'), 'reverse context').to.be['false'];
	      (0, _chai.expect)(s.namespace.match(sut, ''), 'no event name').to.be['false'];
	      (0, _chai.expect)(s.namespace.match(sut, ':'), 'no event name').to.be['false'];
	      (0, _chai.expect)(s.namespace.match(sut, 'foo'), 'wrong event name').to.be['false'];
	
	      (0, _chai.expect)(s.namespace.match(sut, 'event')).to.be['true'];
	      (0, _chai.expect)(s.namespace.match(sut, 'bb:event'), 'partial match').to.be['true'];
	      (0, _chai.expect)(s.namespace.match(sut, 'a:bb:ccc:event'), 'full match').to.be['true'];
	      (0, _chai.expect)(s.namespace.match(sut, 'a:ccc:event'), 'skipped context match').to.be['true'];
	    });
	
	    it('should match specific NS', function () {
	      var a = sut.create('a');
	      var b = a.create('bb');
	      var b1 = a.create('bb1');
	      var c = b.create('ccc');
	      var d = c.create('event');
	
	      (0, _chai.expect)(d.namespace.match(sut, a.guid() + ':event')).to.be['true'];
	      (0, _chai.expect)(d.namespace.match(sut, a.guid() + ':ccc:event'), 'skipped nodes').to.be['true'];
	      (0, _chai.expect)(d.namespace.match(sut, b1.guid() + ':event'), 'unrelated branch').to.be['false'];
	    });
	
	    it('should match wildcard(*) in NS', function () {
	      var a = sut.create('a');
	      var b = a.create('bb');
	      var b1 = a.create('bb1');
	      var c = b.create('ccc');
	      var d = c.create('event');
	
	      (0, _chai.expect)(d.namespace.match(sut, a.guid() + ':*')).to.be['true'];
	      (0, _chai.expect)(d.namespace.match(sut, b1.guid() + ':*')).to.be['false'];
	      (0, _chai.expect)(d.namespace.match(sut, a.guid() + ':*:event'), 'skipped nodes').to.be['true'];
	      (0, _chai.expect)(d.namespace.match(sut, '*:event'), 'wildcard branch').to.be['true'];
	    });
	  });
	});

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
	// original notice:
	
	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	function compare(a, b) {
	  if (a === b) {
	    return 0;
	  }
	
	  var x = a.length;
	  var y = b.length;
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }
	
	  if (x < y) {
	    return -1;
	  }
	  if (y < x) {
	    return 1;
	  }
	  return 0;
	}
	function isBuffer(b) {
	  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
	    return global.Buffer.isBuffer(b);
	  }
	  return !!(b != null && b._isBuffer);
	}
	
	// based on node assert, original notice:
	
	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var util = __webpack_require__(68);
	var hasOwn = Object.prototype.hasOwnProperty;
	var pSlice = Array.prototype.slice;
	var functionsHaveNames = (function () {
	  return function foo() {}.name === 'foo';
	}());
	function pToString (obj) {
	  return Object.prototype.toString.call(obj);
	}
	function isView(arrbuf) {
	  if (isBuffer(arrbuf)) {
	    return false;
	  }
	  if (typeof global.ArrayBuffer !== 'function') {
	    return false;
	  }
	  if (typeof ArrayBuffer.isView === 'function') {
	    return ArrayBuffer.isView(arrbuf);
	  }
	  if (!arrbuf) {
	    return false;
	  }
	  if (arrbuf instanceof DataView) {
	    return true;
	  }
	  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
	    return true;
	  }
	  return false;
	}
	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.
	
	var assert = module.exports = ok;
	
	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })
	
	var regex = /\s*function\s+([^\(\s]*)\s*/;
	// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
	function getName(func) {
	  if (!util.isFunction(func)) {
	    return;
	  }
	  if (functionsHaveNames) {
	    return func.name;
	  }
	  var str = func.toString();
	  var match = str.match(regex);
	  return match && match[1];
	}
	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;
	
	      // try to strip useless frames
	      var fn_name = getName(stackStartFunction);
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }
	
	      this.stack = out;
	    }
	  }
	};
	
	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);
	
	function truncate(s, n) {
	  if (typeof s === 'string') {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}
	function inspect(something) {
	  if (functionsHaveNames || !util.isFunction(something)) {
	    return util.inspect(something);
	  }
	  var rawname = getName(something);
	  var name = rawname ? ': ' + rawname : '';
	  return '[Function' +  name + ']';
	}
	function getMessage(self) {
	  return truncate(inspect(self.actual), 128) + ' ' +
	         self.operator + ' ' +
	         truncate(inspect(self.expected), 128);
	}
	
	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.
	
	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.
	
	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}
	
	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;
	
	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.
	
	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;
	
	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);
	
	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};
	
	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);
	
	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};
	
	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);
	
	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};
	
	assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
	  }
	};
	
	function _deepEqual(actual, expected, strict, memos) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (isBuffer(actual) && isBuffer(expected)) {
	    return compare(actual, expected) === 0;
	
	  // 7.2. If the expected value is a Date object, the actual value is
	  // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3 If the expected value is a RegExp object, the actual value is
	  // equivalent if it is also a RegExp object with the same source and
	  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source &&
	           actual.global === expected.global &&
	           actual.multiline === expected.multiline &&
	           actual.lastIndex === expected.lastIndex &&
	           actual.ignoreCase === expected.ignoreCase;
	
	  // 7.4. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if ((actual === null || typeof actual !== 'object') &&
	             (expected === null || typeof expected !== 'object')) {
	    return strict ? actual === expected : actual == expected;
	
	  // If both values are instances of typed arrays, wrap their underlying
	  // ArrayBuffers in a Buffer each to increase performance
	  // This optimization requires the arrays to have the same type as checked by
	  // Object.prototype.toString (aka pToString). Never perform binary
	  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
	  // bit patterns are not identical.
	  } else if (isView(actual) && isView(expected) &&
	             pToString(actual) === pToString(expected) &&
	             !(actual instanceof Float32Array ||
	               actual instanceof Float64Array)) {
	    return compare(new Uint8Array(actual.buffer),
	                   new Uint8Array(expected.buffer)) === 0;
	
	  // 7.5 For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else if (isBuffer(actual) !== isBuffer(expected)) {
	    return false;
	  } else {
	    memos = memos || {actual: [], expected: []};
	
	    var actualIndex = memos.actual.indexOf(actual);
	    if (actualIndex !== -1) {
	      if (actualIndex === memos.expected.indexOf(expected)) {
	        return true;
	      }
	    }
	
	    memos.actual.push(actual);
	    memos.expected.push(expected);
	
	    return objEquiv(actual, expected, strict, memos);
	  }
	}
	
	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}
	
	function objEquiv(a, b, strict, actualVisitedObjects) {
	  if (a === null || a === undefined || b === null || b === undefined)
	    return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b))
	    return a === b;
	  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
	    return false;
	  var aIsArgs = isArguments(a);
	  var bIsArgs = isArguments(b);
	  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
	    return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b, strict);
	  }
	  var ka = objectKeys(a);
	  var kb = objectKeys(b);
	  var key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length !== kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] !== kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
	      return false;
	  }
	  return true;
	}
	
	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);
	
	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};
	
	assert.notDeepStrictEqual = notDeepStrictEqual;
	function notDeepStrictEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
	  }
	}
	
	
	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);
	
	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};
	
	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
	
	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};
	
	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }
	
	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  }
	
	  try {
	    if (actual instanceof expected) {
	      return true;
	    }
	  } catch (e) {
	    // Ignore.  The instanceof check doesn't work for arrow functions.
	  }
	
	  if (Error.isPrototypeOf(expected)) {
	    return false;
	  }
	
	  return expected.call({}, actual) === true;
	}
	
	function _tryBlock(block) {
	  var error;
	  try {
	    block();
	  } catch (e) {
	    error = e;
	  }
	  return error;
	}
	
	function _throws(shouldThrow, block, expected, message) {
	  var actual;
	
	  if (typeof block !== 'function') {
	    throw new TypeError('"block" argument must be a function');
	  }
	
	  if (typeof expected === 'string') {
	    message = expected;
	    expected = null;
	  }
	
	  actual = _tryBlock(block);
	
	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
	            (message ? ' ' + message : '.');
	
	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }
	
	  var userProvidedMessage = typeof message === 'string';
	  var isUnwantedException = !shouldThrow && util.isError(actual);
	  var isUnexpectedException = !shouldThrow && actual && !expected;
	
	  if ((isUnwantedException &&
	      userProvidedMessage &&
	      expectedException(actual, expected)) ||
	      isUnexpectedException) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }
	
	  if ((shouldThrow && actual && expected &&
	      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}
	
	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);
	
	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws(true, block, error, message);
	};
	
	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
	  _throws(false, block, error, message);
	};
	
	assert.ifError = function(err) { if (err) throw err; };
	
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(70);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(71);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(69)))

/***/ },
/* 69 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 71 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _nflow = __webpack_require__(1);
	
	var _nflow2 = _interopRequireDefault(_nflow);
	
	var _chai = __webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/* globals describe, it, beforeEach */
	var sut;
	
	describe('Event Propagation', function () {
	  beforeEach(function () {
	    sut = _nflow2['default'].create('sut').parent(null);
	  });
	
	  describe('Flow stopPropagation()', function () {
	    it('should stop event delegation', function (done) {
	      function shouldCall() {
	        this.stopPropagation();
	      }
	      function shouldNotCall() {
	        done('stopped event should not call subsequent listeners');
	      }
	
	      sut.create('a') // parent
	      .on('test', shouldNotCall).create('b').on('test', shouldCall).create('c').emit('test');
	
	      setTimeout(done, 1);
	    });
	
	    it('should stop event delivery on same listener', function (done) {
	      function shouldCall() {
	        this.stopPropagation();
	      }
	      function shouldNotCall() {
	        done('stopped event should not call subsequent listeners');
	      }
	
	      sut.create('b').on('test', shouldCall, shouldNotCall).create('c').emit('test');
	
	      setTimeout(done, 1);
	    });
	
	    it('should still emit events on stopped nodes', function (done) {
	      function shouldCall() {
	        done();
	      }
	
	      sut.create('b').on('test', shouldCall).stopPropagation().create('c').stopPropagation().create('d').emit('test');
	    });
	  });
	  describe('re-dispatching()', function () {
	    it('should re-emit event on detached subtrees', function () {
	      var deliveryChain = [];
	      var process = function process() {
	        deliveryChain.push(this.target.name());
	      };
	      var subtree = sut.create('subtree').parent(null);
	      subtree.create('s-a').on('test', process);
	      subtree.create('s-b').on('test', process);
	      sut.create('a').on('test', process);
	      sut.create('b').on('test', process).on('test', process, function () {
	        subtree.emit(this);
	      });
	      sut.create('c').on('test', process);
	      sut.emit('test');
	      (0, _chai.expect)(deliveryChain.join()).to.equal('a,b,s-a,s-b,c');
	    });
	
	    it('should not re-deliver event on existing listeners', function () {
	      var deliveryChain = [];
	      var process = function process() {
	        deliveryChain.push(this.target.name());
	      };
	      sut.create('a').on('test', process);
	      sut.create('b').on('test', process);
	      sut.create('c').on('test', process);
	      sut.create('test').emit().emit().emit();
	      (0, _chai.expect)(deliveryChain.join()).to.equal('a,b,c');
	    });
	    it('should re-emit event to new listeners', function () {
	      var deliveryChain = [];
	      var process = function process() {
	        deliveryChain.push(this.target.name());
	      };
	      var reEmit = function reEmit() {
	        this.stopPropagation();
	        sut.create('d').on('test', process);
	        this.emit();
	      };
	      sut.create('a').on('test', process);
	      sut.create('b').on('test', process, reEmit);
	      sut.create('c').on('test', process);
	      sut.emit('test');
	      (0, _chai.expect)(deliveryChain.join()).to.equal('a,b,c,d');
	    });
	  });
	
	  describe('Flow stopPropagation() Modifiers', function () {
	    it('should not accept stopPropagation(invalid_directon)', function (done) {
	      try {
	        sut.stopPropagation('dog');
	      } catch (e) {
	        (0, _chai.expect)(e).to.be.an.error;
	        done();
	      }
	    });
	    it('should accept stopPropagation(valid_direction)', function (done) {
	      sut.stopPropagation(sut.direction.UPSTREAM);
	      sut.stopPropagation(sut.direction.DOWNSTREAM);
	      sut.stopPropagation(sut.direction.CURRENT);
	      done();
	    });
	    it('should stop UPSTREAM event propagation', function () {
	      var deliveryChain = [];
	      var process = function process() {
	        deliveryChain.push(this.target.name());
	      };
	      var stopUpstream = function stopUpstream() {
	        this.stopPropagation.upstream();
	      };
	      var a = sut.create('a').on('test', process);
	      var b = a.create('b').on('test', process, stopUpstream);
	      a.create('b1').on('test', process);
	      b.create('c0').on('test', process);
	      var c1 = b.create('c1').on('test', process);
	      c1.create('d').on('test', process);
	      c1.emit('test');
	
	      (0, _chai.expect)(deliveryChain.join()).to.equal('c1,b,c0,d');
	    });
	    it('should not stop UPSTREAM event propagation', function () {
	      var deliveryChain = [];
	      var process = function process() {
	        deliveryChain.push(this.target.name());
	      };
	      var stopUpstream = function stopUpstream() {
	        this.stopPropagation.upstream();
	      };
	      var a = sut.create('a').on('test', process);
	      var b = a.create('b').on('test', process, stopUpstream);
	      a.create('b1').on('test', process);
	      b.create('c0').on('test', process);
	      var c1 = b.create('c1').on('test', process);
	      c1.create('d').on('test', process);
	      c1.emit('test');
	
	      (0, _chai.expect)(deliveryChain.join()).to.equal('c1,b,c0,d');
	    });
	
	    it('should stop DOWNSTREAM propagation', function () {
	      var deliveryChain = [];
	      var process = function process() {
	        deliveryChain.push(this.target.name());
	      };
	      var stopDownstream = function stopDownstream() {
	        this.stopPropagation.downstream();
	      };
	      sut.create('a').create('a0').on('test', process);
	      sut.create('b').on('test', stopDownstream).create('b0').on('test', process);
	      sut.create('c').create('c0').on('test', process);
	      sut.emit('test');
	      (0, _chai.expect)(deliveryChain).to.deep.equal(['a0', 'c0']);
	    });
	  });
	
	  describe('Flow stopPropagation.current()', function () {
	    function stopCurrent() {
	      this.stopPropagation.current();
	    }
	
	    it('should accept stopPropagation.current()', function (done) {
	      var calls = 0;
	      function shouldCall() {
	        calls++;
	      }
	      function shouldNotCall() {
	        done('stopped event should not call subsequent listeners');
	      }
	
	      var a = sut.create('a') // parent
	      .on('test', shouldCall, shouldCall);
	      var b = a.create('b').on('test', stopCurrent, shouldNotCall, shouldNotCall);
	
	      b.create('b').on('test', shouldCall, shouldCall);
	
	      b.create('c').on('test', shouldCall, shouldCall);
	
	      sut.emit('test');
	      (0, _chai.expect)(calls).to.equal(6);
	
	      setTimeout(done, 1);
	    });
	
	    it('should accept stopPropagation("current")', function (done) {
	      var calls = 0;
	      function shouldCall() {
	        calls++;
	      }
	      function shouldNotCall() {
	        done('stopped event should not call subsequent listeners');
	      }
	
	      var a = sut.create('a') // parent
	      .on('test', shouldCall, shouldCall);
	      var b = a.create('b').on('test', function () {
	        this.stopPropagation('current');
	      }, shouldNotCall, shouldNotCall);
	
	      b.create('b').on('test', shouldCall, shouldCall);
	
	      b.create('c').on('test', shouldCall, shouldCall);
	
	      sut.emit('test');
	      (0, _chai.expect)(calls).to.equal(6);
	
	      setTimeout(done, 1);
	    });
	
	    it('stopPropagation.current() should work in the middle of the propagation chain', function (done) {
	      var calls = 0;
	      function shouldCall() {
	        calls++;
	      }
	      function shouldNotCall() {
	        done('stopped event should not call subsequent listeners');
	      }
	
	      sut.create('a') // parent
	      .on('test', shouldCall, function () {
	        this.stopPropagation('current');
	      }, shouldNotCall, shouldNotCall);
	
	      sut.emit('test');
	      (0, _chai.expect)(calls).to.equal(1);
	
	      setTimeout(done, 1);
	    });
	  });
	});

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _nflow = __webpack_require__(1);
	
	var _nflow2 = _interopRequireDefault(_nflow);
	
	var _chai = __webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/* globals describe, it, beforeEach */
	var sut;
	
	describe('Cancellation', function () {
	  beforeEach(function () {
	    sut = _nflow2['default'].create('sut').parent(null);
	  });
	  describe('Flow Cancellation', function () {
	    it('parent node should cancel all child nodes', function () {
	      var a = sut.create('a'); // parent
	      var a1 = a.create('a1'); // parent's sibling
	      var b = a.create('b'); // SUT
	      var b1 = a.create('b1'); // sibling
	      var c = b.create('c'); // child
	      var c1 = b.create('c1'); // child
	      var d = c.create('d'); // grandchild
	
	      b.cancel();
	
	      // falsy
	      (0, _chai.expect)(a.isCancelled()).to.be['false'];
	      (0, _chai.expect)(a1.isCancelled()).to.be['false'];
	      (0, _chai.expect)(sut.isCancelled()).to.be['false'];
	      (0, _chai.expect)(b1.isCancelled()).to.be['false'];
	
	      // truthy
	      (0, _chai.expect)(b.isCancelled()).to.be['true'];
	      (0, _chai.expect)(c.isCancelled()).to.be['true'];
	      (0, _chai.expect)(c1.isCancelled()).to.be['true'];
	      (0, _chai.expect)(d.isCancelled()).to.be['true'];
	    });
	
	    it('should cancel event delegation.', function (done) {
	      function shouldCall() {
	        this.cancel();
	      }
	      function shouldNotCall() {
	        done('cancelled event should not call subsequent listeners');
	      }
	
	      sut.create('a') // parent
	      .on('test', shouldNotCall).create('b').on('test', shouldCall).create('c').emit('test');
	
	      setTimeout(done, 10);
	    });
	
	    it('should cancel event delivery on same listener', function (done) {
	      function shouldCall() {
	        this.cancel();
	      }
	      function shouldNotCall() {
	        done('cancelled event should not call subsequent listeners');
	      }
	
	      sut.create('b').on('test', shouldCall, shouldNotCall).create('c').emit('test');
	
	      setTimeout(done, 10);
	    });
	
	    it('should not emit events on cancelled nodes', function (done) {
	      function shouldNotCall() {
	        done('cancelled event should not call subsequent listeners');
	      }
	
	      sut.create('b').cancel().create('c').on('test', shouldNotCall).create('d').emit('test');
	
	      setTimeout(done, 10);
	    });
	    it('should not deliver events into a cancelled subtree', function (done) {
	      function shouldCall() {
	        done();
	      }
	      function shouldNotCall() {
	        done('stopped event should not call listener');
	      }
	      var a = sut.create('a').on('test', shouldNotCall);
	      a.create('b').on('test', shouldNotCall);
	
	      var c = sut.create('c');
	      c.create('d').on('test', shouldCall);
	
	      a.cancel();
	      c.emit('test');
	    });
	  });
	});

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _nflow = __webpack_require__(1);
	
	var _nflow2 = _interopRequireDefault(_nflow);
	
	var _chai = __webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/* globals describe, it, beforeEach */
	var sut;
	
	describe('Connection', function () {
	  beforeEach(function () {
	    sut = _nflow2['default'].create('sut').parent(null);
	  });
	  describe('Children API', function () {
	    it('should remove detached nodes', function () {
	      var sut1 = sut.create('sut1');
	      var sut2 = sut1.create('sut2');
	      var sut3 = sut1.create('sut3');
	      sut2.parent(null);
	      (0, _chai.expect)(sut1.children()).to.eql([sut3]);
	    });
	
	    it('should re-parent', function () {
	      var sut1 = sut.create('sut1');
	      var sut2 = sut1.create('sut2');
	      var sut3 = sut1.create('sut3');
	      sut2.parent(sut3);
	      (0, _chai.expect)(sut3.children()).to.eql([sut2]);
	      (0, _chai.expect)(sut1.children()).to.eql([sut3]);
	    });
	
	    it('should retrieve children', function () {
	      var a = sut.create('test1');
	      var b = sut.create('test2');
	      var c = sut.create('test3');
	      (0, _chai.expect)(sut.children()).to.eql([a, b, c]);
	    });
	
	    it('should not retrieve detached children', function () {
	      var a = sut.create('test1');
	      var b = sut.create('test2');
	      var d = sut.create('detached');
	      var c = sut.create('test3');
	      d.parent(null);
	      (0, _chai.expect)(sut.children()).to.eql([a, b, c]);
	    });
	
	    it('.all() should return all children recursively', function () {
	      var a = sut.create('test1');
	      var b = a.create('test2');
	      var c = b.create('test3');
	      var children = sut.children.all();
	      (0, _chai.expect)(children).to.eql([a, b, c]);
	    });
	
	    it('.all() should handle circular dependencies', function () {
	      var a = sut.create('a');
	      var b = a.create('b');
	      var c = b.create('c');
	      b.create('c1');
	      a.parent(c);
	      var children = b.children.all();
	      (0, _chai.expect)(children.map(function (e) {
	        return e.name();
	      })).to.eql(['c', 'c1', 'a', 'b']);
	    });
	
	    it('should find child by String', function () {
	      sut.create('test1');
	      var b = sut.create('test2');
	      sut.create('test3');
	      var match = sut.children.find('test2');
	      (0, _chai.expect)(match).to.eql(b);
	    });
	
	    it('should find child by matcher function', function () {
	      sut.create('test1').data(1);
	      var b = sut.create('test2').data(2);
	      sut.create('test3').data(3);
	      var match = sut.children.find(function (f) {
	        return f.data() === 2;
	      });
	
	      (0, _chai.expect)(match).to.eql(b);
	    });
	
	    it('should find All children by matcher function', function () {
	      sut.create('test1').data(1);
	      var b = sut.create('test2').data(2);
	      var c = sut.create('test3').data(3);
	      var match = sut.children.findAll(function (f) {
	        return f.data() >= 2;
	      });
	
	      (0, _chai.expect)(match).to.eql([b, c]);
	    });
	
	    it('should find child by String recursively', function () {
	      var a = sut.create('test1');
	      var b = a.create('test2');
	      b.create('test3');
	      var match = sut.children.find('test2', true);
	      (0, _chai.expect)(match).to.eql(b);
	    });
	
	    it('should find All children by matcher function recursively', function () {
	      var a = sut.create('test1').data(1);
	      var b = a.create('test2').data(2);
	      var c = b.create('test3').data(3);
	      var match = sut.children.findAll(function (f) {
	        return f.data() >= 2;
	      }, true);
	      (0, _chai.expect)(match).to.eql([b, c]);
	    });
	
	    it('should check if child exists by matcher function', function () {
	      sut.create('test1').data(1);
	      sut.create('test2').data(2);
	      sut.create('test3').data(3);
	      var match = sut.children.has(function (f) {
	        return f.data() >= 2;
	      });
	
	      (0, _chai.expect)(match).to.be['true'];
	    });
	
	    it('should check if child exists by matcher function recursively', function () {
	      var a = sut.create('test1').data(1);
	      var b = a.create('test2').data(2);
	      b.create('test3').data(3);
	      var match1 = sut.children.has(function (f) {
	        return f.data() >= 2;
	      }, false);
	      var match2 = sut.children.has(function (f) {
	        return f.data() >= 2;
	      }, true);
	
	      (0, _chai.expect)(match1).to.be['false'];
	      (0, _chai.expect)(match2).to.be['true'];
	    });
	  });
	
	  describe('parent API', function () {
	    it('should return correct parent', function () {
	      var sut1 = sut.create('parent');
	      var sut2 = sut1.create('child');
	      (0, _chai.expect)(sut2.parent()).to.equal(sut1);
	    });
	
	    it('should detach', function () {
	      var sut1 = sut.create('sut1');
	      var sut2 = sut1.create('sut2');
	      sut2.parent(null);
	      (0, _chai.expect)(sut2.parent()).to.equal(null);
	    });
	
	    it('should re-parent', function () {
	      var sut1 = sut.create('sut1');
	      var sut2 = sut1.create('sut2');
	      var sut3 = sut1.create('sut3');
	      sut2.parent(sut3);
	      (0, _chai.expect)(sut2.parent()).to.equal(sut3);
	    });
	  });
	
	  describe('parents API', function () {
	    it('should return parent chain', function () {
	      var sut1 = sut.create('sut1');
	      var sut2 = sut1.create('sut2');
	      var sut3 = sut2.create('sut3');
	
	      (0, _chai.expect)(sut1.parents()).to.eql([sut]);
	      (0, _chai.expect)(sut2.parents()).to.eql([sut1, sut]);
	      (0, _chai.expect)(sut3.parents()).to.eql([sut2, sut1, sut]);
	    });
	
	    it('return correct chain for detached nodes', function () {
	      var sut1 = sut.create('sut1');
	      var sut2 = sut1.create('sut2');
	      sut1.create('sut3');
	      sut2.parent(null);
	      (0, _chai.expect)(sut2.parents()).to.eql([]);
	    });
	
	    it('should return correct chain for re-parented nodes', function () {
	      var sut1 = sut.create('sut1');
	      var sut2 = sut1.create('sut2');
	      var sut3 = sut1.create('sut3');
	      sut2.parent(sut3);
	      (0, _chai.expect)(sut2.parents()).to.eql([sut3, sut1, sut]);
	    });
	
	    it('should handle circular references (loop)', function () {
	      var sut1 = sut.create('sut1');
	      var sut2 = sut1.create('sut2');
	      var sut3 = sut2.create('sut3');
	      sut1.parent(sut3);
	      (0, _chai.expect)(sut3.parents()).to.eql([sut2, sut1, sut3]);
	    });
	
	    it('should handle circular references (loop + leaf)', function () {
	      var sut1 = sut.create('sut1');
	      var sut2 = sut1.create('sut2');
	      var sut3 = sut2.create('sut3');
	      sut1.parent(sut2);
	      (0, _chai.expect)(sut3.parents()).to.eql([sut2, sut1]);
	    });
	
	    it('should find parent', function () {
	      var sut1 = sut.create('sut1');
	      var sut2 = sut1.create('sut2');
	      var sut3 = sut2.create('sut3');
	      var match = sut3.parents.find('sut1');
	
	      (0, _chai.expect)(match).to.eql(sut1);
	    });
	
	    it('should find root', function () {
	      var root = sut.create('root').parent(null);
	      var sut2 = root.create('sut2');
	      var sut3 = sut2.create('sut3');
	      var match = sut3.parents.root();
	
	      (0, _chai.expect)(match).to.eql(root);
	    });
	
	    it('should not find sibling as parent', function () {
	      var sut1 = sut.create('sut1');
	      sut1.create('notparent');
	      var sut2 = sut1.create('sut2');
	      var sut3 = sut2.create('sut3');
	      var nomatch = sut3.parents.find('notparent');
	
	      (0, _chai.expect)(nomatch).to.be.undefined;
	    });
	  });
	});

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _nflow = __webpack_require__(1);
	
	var _nflow2 = _interopRequireDefault(_nflow);
	
	var _assert = __webpack_require__(67);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _chai = __webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var testFlow; /* globals describe, it, beforeEach */
	
	describe('Construction', function () {
	  beforeEach(function () {
	    testFlow = _nflow2['default'].create('sut').parent(null);
	  });
	
	  describe('guid API', function () {
	    it('should create unique guids', function () {
	      var sut1 = testFlow.create();
	      var sut2 = testFlow.create();
	      (0, _chai.expect)(sut1.guid()).to.not.equal(sut2.guid());
	    });
	  });
	
	  describe('name API', function () {
	    it('should store name', function () {
	      var sut = testFlow.create('test');
	      (0, _chai.expect)(sut.name()).to.equal('test');
	    });
	  });
	
	  describe('guid API', function () {
	    it('should have globally unique ID-s', function () {
	      var sut1 = testFlow.create('test');
	      var sut2 = testFlow.create('test');
	      (0, _chai.expect)(sut1.guid()).to.not.equal(sut2.guid());
	    });
	  });
	
	  describe('.create() API', function () {
	    it('should create new flow objects', function () {
	      var sut1 = testFlow.create('test');
	      var sut2 = testFlow.create('test');
	      (0, _chai.expect)(sut1).to.not.equal(sut2);
	    });
	
	    it('should NOT reuse existing flow objects for unnamed flow objects', function () {
	      var sut1 = testFlow.create();
	      var sut2 = testFlow.create();
	      (0, _chai.expect)(sut1).to.not.equal(sut2);
	    });
	  });
	
	  describe('.dispose() API', function () {
	    it('should detach disposed nodes', function () {
	      var sut = testFlow.create('test');
	      sut.dispose();
	      (0, _chai.expect)(sut.parent()).to.equal(null);
	    });
	
	    it('should not emit events on disposed nodes', function () {
	      var sut1 = testFlow.create().on('foo', function () {
	        _assert2['default'].fail('should not deliver message on disposed nodes');
	      });
	      sut1.dispose();
	      sut1.emit('foo');
	      _assert2['default'].ok(sut1);
	    });
	
	    it('should not emit events on children of disposed nodes', function () {
	      var sut1 = testFlow.create();
	      sut1.dispose();
	
	      sut1.on('foo', function () {
	        _assert2['default'].fail('should not deliver message on disposed nodes');
	      });
	
	      sut1.emit('foo');
	      _assert2['default'].ok(sut1);
	    });
	
	    it('should emit flow.dispose events on all disposed child nodes', function () {
	      var sut1 = testFlow.create();
	
	      var child1 = sut1.create().on('flow.dispose', function (d) {
	        child1.disposed = true;
	      });
	      var child2 = sut1.create().on('flow.dispose', function (d) {
	        child2.disposed = true;
	      });
	      var child3 = child2.create().on('flow.dispose', function (d) {
	        child3.disposed = true;
	      });
	      sut1.dispose();
	      (0, _chai.expect)(child1.disposed).to.be['true'];
	      (0, _chai.expect)(child2.disposed).to.be['true'];
	      (0, _chai.expect)(child3.disposed).to.be['true'];
	    });
	  });
	
	  describe('creating flow objects with data', function () {
	    it('should default to undefined', function () {
	      var sut = testFlow.create('test');
	      (0, _chai.expect)(sut.data()).to.equal(undefined);
	    });
	
	    it('should store null', function () {
	      var sut = testFlow.create('test', null);
	      (0, _chai.expect)(sut.data()).to.equal(null);
	    });
	
	    it('should store falsy data', function () {
	      var sut = testFlow.create('test', 0);
	      (0, _chai.expect)(sut.data()).to.equal(0);
	
	      var sut1 = testFlow.create('test', false);
	      (0, _chai.expect)(sut1.data()).to.equal(false);
	
	      var sut2 = testFlow.create('test', '');
	      (0, _chai.expect)(sut2.data()).to.equal('');
	    });
	
	    it('should store single data object', function () {
	      var data1 = {};
	      var sut = testFlow.create('test', data1);
	      (0, _chai.expect)(sut.data()).to.equal(data1);
	    });
	
	    it('should store multiple data objects', function () {
	      var data1 = {};
	      var data2 = {};
	      var data3 = {};
	      var sut = testFlow.create('test', data1, data2, data3);
	      (0, _chai.expect)(sut.data()).to.eql([data1, data2, data3]);
	    });
	  });
	});

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _nflow = __webpack_require__(1);
	
	var _nflow2 = _interopRequireDefault(_nflow);
	
	var _chai = __webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/* globals describe, it, beforeEach */
	var sut;
	
	describe('Dispatchers', function () {
	  beforeEach(function () {
	    sut = _nflow2['default'].create('sut').parent(null);
	  });
	  describe('.emit() API', function () {
	    it('emit should create a new node', function () {
	      var bar = sut.emit('bar');
	      (0, _chai.expect)(bar.parent()).to.equal(sut);
	    });
	
	    it('should detach emitted node', function () {
	      var bar = sut.emit('bar');
	      (0, _chai.expect)(bar.parent().children()).to.not.contain(bar);
	    });
	
	    it('should emit orphaned node', function (done) {
	      var orphaned = sut.create('bar').parent(null);
	      orphaned.create('a').on('bar', function () {
	        done();
	      });
	      orphaned.emit();
	    });
	
	    it('should emit new node', function (done) {
	      var payload = {};
	      var listener = function listener(data) {
	        (0, _chai.expect)(data).to.equal(payload);
	        done();
	      };
	      sut.on('bar', listener).emit('bar', payload);
	    });
	
	    it('should emit current node', function (done) {
	      var payload = {};
	      var listener = function listener(data) {
	        (0, _chai.expect)(data).to.equal(payload);
	        done();
	      };
	      sut.on('bar', listener).create('bar').data(payload).emit();
	    });
	
	    it('should deliver multiple payloads', function (done) {
	      var payload1 = {};
	      var payload2 = {};
	      var listener = function listener(data1, data2) {
	        (0, _chai.expect)(data1).to.equal(payload1);
	        (0, _chai.expect)(data2).to.equal(payload2);
	        done();
	      };
	      sut.on('bar', listener).create('bar').data(payload1, payload2).emit();
	    });
	
	    it('should deliver to multiple listeners on the same node', function (done) {
	      var payload1 = {};
	      var payload2 = {};
	      var listener1 = function listener1(data1, data2) {
	        (0, _chai.expect)(data1).to.equal(payload1);
	        (0, _chai.expect)(data2).to.equal(payload2);
	        listener1.done = true;
	        listener2.done && done();
	      };
	      var listener2 = function listener2(data1, data2) {
	        (0, _chai.expect)(data1).to.equal(payload1);
	        (0, _chai.expect)(data2).to.equal(payload2);
	        listener2.done = true;
	        listener1.done && done();
	      };
	
	      sut.on('bar', listener1, listener2).create('bar').data(payload1, payload2).emit();
	    });
	
	    it('should emit lightweight nodes', function (done) {
	      var listener = function listener(data) {
	        (0, _chai.expect)(data).to.equal(undefined);
	        done();
	      };
	      sut.on('bar', listener).create('bar').emit();
	    });
	  });
	
	  describe('Flow Direction', function () {
	    it('should flow upstream', function (done) {
	      var payload = {};
	      var listener = function listener(data) {
	        (0, _chai.expect)(data).to.equal(payload);
	        done();
	      };
	      sut.on('bar', listener).create('sut2').create('sut3').emit('bar', payload);
	    });
	
	    it('should flow downstream', function (done) {
	      var payload = {};
	      var listener = function listener(data) {
	        (0, _chai.expect)(data).to.equal(payload);
	        done();
	      };
	      sut.create('sut2').create('sut3').on('bar', listener);
	
	      sut.emit('bar', payload);
	    });
	
	    it('should flow from root', function (done) {
	      var payload = {};
	
	      var listener1 = function listener1(data) {
	        (0, _chai.expect)(data).to.equal(payload);
	        listener1.ok = true;
	      };
	      var listener2 = function listener2(data) {
	        (0, _chai.expect)(data).to.equal(payload);
	        listener1.ok && done();
	      };
	      var sut2 = sut.on('bar', listener1).create('sut2');
	
	      sut2.create('sut3').on('bar', listener2);
	
	      sut.emit('bar', payload);
	    });
	
	    it('should be unidirectional (upstream)', function (done) {
	      var payload = {};
	      var numRecipients = 0;
	      var shouldListen = function shouldListen(data) {
	        (0, _chai.expect)(data).to.equal(payload);
	        numRecipients++;
	      };
	      var shouldNotListen = function shouldNotListen(data) {
	        done(new Error('incorrect listener was called'));
	      };
	      var sut3 = sut.on('bar', shouldListen).create('sut2').on('bar', shouldListen).create('sut3').on('bar', shouldListen);
	
	      sut3.create('sut4').on('bar', shouldNotListen);
	
	      sut3.create('bar', payload).direction(sut.direction.UPSTREAM).emit();
	
	      setTimeout(function () {
	        if (numRecipients !== 3) {
	          (0, _chai.expect)(numRecipients).to.eql(3);
	          done('not all listeners got called');
	        } else done();
	      }, 10);
	    });
	
	    it('should be unidirectional (downstream)', function (done) {
	      var payload = {};
	      var numRecipients = 0;
	      var shouldListen = function shouldListen(data) {
	        (0, _chai.expect)(data).to.equal(payload);
	        numRecipients++;
	      };
	      var shouldNotListen = function shouldNotListen(data) {
	        done(new Error('incorrect listener was called'));
	      };
	      var sut3 = sut.on('bar', shouldNotListen).create('sut2').on('bar', shouldNotListen).create('sut3').on('bar', shouldListen);
	
	      sut3.create('sut4').on('bar', shouldListen);
	
	      sut3.create('sut5').on('bar', shouldListen);
	      sut3.create('sut6').on('bar', shouldListen);
	
	      sut3.create('bar', payload).direction(sut.direction.DOWNSTREAM).emit();
	
	      setTimeout(function () {
	        (0, _chai.expect)(numRecipients).to.eql(4);
	        if (numRecipients !== 4) done('not all listeners got called');else done();
	      }, 10);
	    });
	  });
	
	  describe('.matcher() API', function () {
	    it('should match by name', function (done) {
	      var payload = {};
	      var listener = function listener(data) {
	        (0, _chai.expect)(data).to.equal(payload);
	        done();
	      };
	
	      sut.on('bar', listener).create('sut2').create('sut3').emit('bar', payload);
	    });
	
	    it('should not deliver mismatching name', function (done) {
	      var payload = {};
	      var listener = function listener(data) {
	        done(new Error('incorrect listener was called'));
	      };
	      sut.on('sut1', listener).create('sut2').create('sut3').emit('bar', payload);
	
	      setTimeout(done, 10);
	    });
	  });
	});

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _nflow = __webpack_require__(1);
	
	var _nflow2 = _interopRequireDefault(_nflow);
	
	var _chai = __webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/* globals describe, it, beforeEach */
	var sut;
	
	describe('Internal Events', function () {
	  beforeEach(function () {
	    sut = _nflow2['default'].create('sut').parent(null);
	  });
	  describe('parent() API', function () {
	    it('should dispatch flow.parent internal event', function (done) {
	      var listener = function listener(newParent, oldParent) {
	        (0, _chai.expect)(newParent).to.equal(null);
	        (0, _chai.expect)(oldParent).to.equal(sut);
	        done();
	      };
	
	      sut.create('newParent');
	
	      sut.create('test').on('flow.parent', listener).parent(null);
	    });
	
	    it('should dispatch flow.parent internal event on reparenting', function (done) {
	      var listener = function listener(newParent, oldParent) {
	        (0, _chai.expect)(newParent).to.equal(sut1);
	        (0, _chai.expect)(oldParent).to.equal(sut);
	        done();
	      };
	
	      var sut1 = sut.create('newParent');
	
	      sut.create('test').on('flow.parent', listener).parent(sut1);
	    });
	
	    it('should dispatch flow.children.parent internal event', function (done) {
	      var listener = function listener(f, newParent, oldParent) {
	        (0, _chai.expect)(newParent.name()).to.equal('newParent');
	        (0, _chai.expect)(oldParent.name()).to.equal('sut');
	        done();
	      };
	
	      var sut1 = sut.create('newParent');
	
	      sut.on('flow.children.parent', listener).create('test').parent(sut1);
	    });
	
	    it('should dispatch flow.children.parent internal event upstream', function (done) {
	      var listener = function listener(f, newParent, oldParent) {
	        (0, _chai.expect)(f.name()).to.equal('test');
	        (0, _chai.expect)(newParent.name()).to.equal('newParent');
	        (0, _chai.expect)(oldParent.name()).to.equal('test2');
	        done();
	      };
	
	      var sut1 = sut.create('newParent');
	
	      sut.on('flow.children.parent', listener).create('test0').create('test1').create('test2').create('test').parent(sut1);
	    });
	  });
	
	  describe('data() API', function () {
	    it('should dispatch flow.data internal event', function (done) {
	      var listener = function listener(newData, oldData) {
	        (0, _chai.expect)(newData).to.equal(data2);
	        (0, _chai.expect)(oldData).to.equal(data1);
	        done();
	      };
	      var data1 = 1;
	      var data2 = 2;
	      sut.create('test', data1).on('flow.data', listener).data(data2);
	    });
	
	    it('should dispatch flow.children.data internal event', function (done) {
	      var listener = function listener(f, newData, oldData) {
	        (0, _chai.expect)(newData).to.equal(data2);
	        (0, _chai.expect)(oldData).to.equal(data1);
	        done();
	      };
	      var data1 = 1;
	      var data2 = 2;
	
	      sut.on('flow.children.data', listener).create('test', data1).data(data2);
	    });
	  });
	
	  describe('create() API', function () {
	    it('should dispatch flow.create internal event', function (done) {
	      sut.on('flow.create', function (f) {
	        (0, _chai.expect)(f.name()).to.equal('test');
	        done();
	      }).create('test');
	    });
	
	    it('should dispatch flow.children.create internal event', function (done) {
	      sut.on('flow.children.create', function (f, flowCreated) {
	        (0, _chai.expect)(f.name()).to.equal('test');
	        (0, _chai.expect)(flowCreated.name()).to.equal('test2');
	        done();
	      }).create('test').create('test2');
	    });
	
	    it('should dispatch flow.children.data internal event', function (done) {
	      var listener = function listener(f, newData, oldData) {
	        (0, _chai.expect)(newData).to.equal(data2);
	        (0, _chai.expect)(oldData).to.equal(data1);
	        done();
	      };
	      var data1 = 1;
	      var data2 = 2;
	
	      sut.on('flow.children.data', listener).create('test', data1).data(data2);
	    });
	  });
	});

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _nflow = __webpack_require__(1);
	
	var _nflow2 = _interopRequireDefault(_nflow);
	
	var _chai = __webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/* globals describe, it, beforeEach */
	var sut;
	
	describe('Listeners', function () {
	  beforeEach(function () {
	    sut = _nflow2['default'].create('sut').parent(null);
	  });
	  describe('on() API', function () {
	    it('should store single listener', function () {
	      var listener = function listener() {};
	      sut.on('foo', listener);
	      (0, _chai.expect)(sut.on('foo')).to.eql([listener]);
	    });
	
	    it('should store multiple listeners', function () {
	      var listener1 = function listener1() {};
	      var listener2 = function listener2() {};
	      sut.on('foo', listener1, listener2);
	      (0, _chai.expect)(sut.on('foo')).to.eql([listener1, listener2]);
	    });
	
	    it('return undefined for non-existent listeners', function () {
	      (0, _chai.expect)(sut.on('non-existent')).to.be.undefined;
	    });
	
	    it('should destroy single listener', function () {
	      var listener = function listener() {};
	      sut.on('foo', listener);
	      sut.on('foo', null);
	      (0, _chai.expect)(sut.on('foo')).to.be.undefined;
	    });
	
	    it('should destroy multiple listeners', function () {
	      var listener = function listener() {};
	      var listener1 = function listener1() {};
	      sut.on('foo', listener, listener1);
	      sut.on('foo', null);
	      (0, _chai.expect)(sut.on('foo')).to.be.undefined;
	    });
	
	    it('should store multiple listeners', function () {
	      var listener1 = function listener1() {};
	      var listener2 = function listener2() {};
	      sut.on('foo', listener1, listener2);
	      (0, _chai.expect)(sut.on('foo')).to.eql([listener1, listener2]);
	    });
	
	    it('should ignore invalid listeners', function () {
	      var listener1 = function listener1() {};
	      var listener2 = function listener2() {};
	      try {
	        sut.on('foo', listener1, 'invalid', listener2);
	      } catch (e) {
	        (0, _chai.expect)(e).to.be.an.error;
	      }
	      (0, _chai.expect)(sut.on('foo')).to.be.undefined;
	    });
	  });
	});

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _nflow = __webpack_require__(1);
	
	var _nflow2 = _interopRequireDefault(_nflow);
	
	var _assert = __webpack_require__(67);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _chai = __webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var sut; /* globals describe, it, beforeEach, VERSION */
	
	
	describe('Logging', function () {
	  beforeEach(function () {
	    _nflow2['default'].logger.reset();
	    sut = _nflow2['default'].create('sut').parent(null);
	  });
	
	  describe('Flow Logging', function () {
	    it('Should toString', function () {
	      (0, _chai.expect)(String(sut)).to.be.contain('sut');
	    });
	
	    it('Should expose version', function () {
	      (0, _chai.expect)(sut.version).to.exist;
	      (0, _chai.expect)(sut.version).to.equal(("0.2.14"));
	    });
	
	    it('Should use global logger', function (done) {
	      var test = sut.create('test');
	      _nflow2['default'].logger(function (flow, name, newData, oldData) {
	        if (test.done) return;
	        test.done = true;
	        (0, _chai.expect)(flow).to.eql(test);
	        done();
	      });
	      test.parent(null);
	    });
	  });
	  describe('toObj() API', function () {
	    it('Should log all properties', function () {
	      (0, _chai.expect)(sut.toObj()).to.have.property('name', 'sut');
	      (0, _chai.expect)(sut.toObj()).to.have.property('guid', sut.guid());
	      (0, _chai.expect)(sut.toObj()).to.have.property('status', sut.status());
	    });
	    it('Should log listeners', function () {
	      sut.on('foo', function () {}).on('bar', function () {}, function namedFunction() {});
	
	      (0, _chai.expect)(sut.toObj()).to.have.deep.property('listeners.foo');
	      (0, _chai.expect)(sut.toObj()).to.have.deep.property('listeners.bar');
	
	      (0, _chai.expect)(sut.toObj().listeners.bar).to.contain('function');
	      (0, _chai.expect)(sut.toObj().listeners.bar).to.contain('namedFunction');
	    });
	    it('Should log filtered properties', function () {
	      (0, _chai.expect)(sut.toObj('name', 'guid')).to.have.property('name', 'sut');
	      (0, _chai.expect)(sut.toObj('name', 'guid')).to.have.property('guid', sut.guid());
	      (0, _chai.expect)(sut.toObj('name', 'guid')).not.to.have.property('status');
	    });
	  });
	  describe('Remote Logger API', function () {
	    it('Should use remote logger', function (done) {
	      var test = sut.create('test');
	      _nflow2['default'].logger(function (log) {
	        if (test.done) return;
	        test.done = true;
	        (0, _chai.expect)(log.flow.guid).to.eql(test.guid());
	        done();
	      }, true);
	      test.parent(null);
	    });
	
	    it('Should log .create() API', function (done) {
	      var test = sut.create('test');
	      _nflow2['default'].logger(function (log) {
	        (0, _chai.expect)(log.action).to.equal('create');
	        (0, _chai.expect)(log.flow.name).to.equal('test');
	        (0, _chai.expect)(log.d.name).to.equal('bar');
	        done();
	      }, true);
	      test.create('bar');
	    });
	
	    it('Should log .create() API with data', function (done) {
	      var test = sut.create('test');
	      _nflow2['default'].logger(function (log) {
	        (0, _chai.expect)(log.d.name).to.equal('bar');
	        (0, _chai.expect)(log.d.data).to.equal('"data1"');
	        done();
	      }, true);
	      test.create('bar', 'data1');
	    });
	
	    it('Should log .create() API with multi data', function (done) {
	      var test = sut.create('test');
	      _nflow2['default'].logger(function (log) {
	        (0, _chai.expect)(log.d.name).to.equal('bar');
	        (0, _chai.expect)(log.d.data).to.equal('["data1","data2"]');
	        done();
	      }, true);
	      test.create('bar', 'data1', 'data2');
	    });
	
	    it('Should log .name() API', function (done) {
	      var test = sut.create('test');
	      _nflow2['default'].logger(function (log) {
	        (0, _chai.expect)(log.action).to.equal('name');
	        (0, _chai.expect)(log.d).to.equal('"bar"');
	        (0, _chai.expect)(log.d0).to.equal('"test"');
	        done();
	      }, true);
	      test.name('bar');
	    });
	
	    it('Should not log ignored nodes', function () {
	      var test = sut.create('test').stats({ ignore: true });
	      _nflow2['default'].logger(function (log) {
	        _assert2['default'].fail('should not log ignored nodes');
	      }, true);
	      test.name('bar');
	    });
	    it('Should not log children of ignored nodes', function () {
	      var test = sut.create('test').stats({ ignore: true }).create('test1');
	      _nflow2['default'].logger(function (log) {
	        _assert2['default'].fail('should not log ignored nodes');
	      }, true);
	      test.name('bar');
	    });
	
	    it('Should log .data(x) API', function (done) {
	      var test = sut.create('test', 'foo');
	      _nflow2['default'].logger(function (log) {
	        (0, _chai.expect)(log.action).to.equal('data');
	        (0, _chai.expect)(log.d).to.equal('"bar"');
	        (0, _chai.expect)(log.d0).to.equal('"foo"');
	        done();
	      }, true);
	      test.data('bar');
	    });
	    it('Should log .data(...args) API', function (done) {
	      var test = sut.create('test', 'foo', 'bar');
	      _nflow2['default'].logger(function (log) {
	        (0, _chai.expect)(log.action).to.equal('data');
	        (0, _chai.expect)(log.d).to.equal('["dog","cat"]');
	        (0, _chai.expect)(log.d0).to.equal('["foo","bar"]');
	        _nflow2['default'].logger.reset();
	        done();
	      }, true);
	      test.data('dog', 'cat');
	    });
	    it('Should log unparenting (.parent(null))', function (done) {
	      var test = sut.create('test', 'foo');
	      _nflow2['default'].logger(function (log) {
	        (0, _chai.expect)(log.action).to.equal('parent');
	        (0, _chai.expect)(log.d).to.equal(undefined);
	        (0, _chai.expect)(log.d0.name).to.equal('sut');
	        _nflow2['default'].logger.reset();
	        done();
	      }, true);
	      test.parent(null);
	    });
	
	    it('Should log reparenting (.parent(node))', function (done) {
	      var test = sut.create('test', 'foo');
	      var test2 = sut.create('test2');
	      _nflow2['default'].logger(function (log) {
	        (0, _chai.expect)(log.action).to.equal('parent');
	        (0, _chai.expect)(log.d.name).to.equal('test2');
	        (0, _chai.expect)(log.d0.name).to.equal('sut');
	        _nflow2['default'].logger.reset();
	        done();
	      }, true);
	      test.parent(test2);
	    });
	    it('Should log .emit() API', function (done) {
	      var test = sut.create('test');
	      _nflow2['default'].logger(function (log) {
	        (0, _chai.expect)(log.action).to.equal('emit');
	        (0, _chai.expect)(log.flow.name).to.equal('sut');
	        (0, _chai.expect)(log.d.name).to.equal('test');
	        _nflow2['default'].logger.reset();
	        done();
	      }, true);
	      test.emit();
	    });
	    it('Should log .emit("foo") API', function (done) {
	      var test = sut.create('test');
	      _nflow2['default'].logger(function (log) {
	        if (log.action === 'create') return;
	        (0, _chai.expect)(log.action).to.equal('emit');
	        (0, _chai.expect)(log.flow.name).to.equal('test');
	        (0, _chai.expect)(log.d.name).to.equal('foo');
	        _nflow2['default'].logger.reset();
	        done();
	      }, true);
	      test.emit('foo');
	    });
	
	    it('Should log .emitted("foo") API', function (done) {
	      _nflow2['default'].logger(function (log) {
	        if (log.action !== 'emitted') return;
	
	        var recipient = log.d.recipients[0];
	        (0, _chai.expect)(log.flow.name).to.equal('test');
	        (0, _chai.expect)(log.d.name).to.equal('foo');
	
	        (0, _chai.expect)(recipient.flow.name).to.equal('test');
	        (0, _chai.expect)(recipient.route.map(function (f) {
	          return f.flow.name;
	        }).join()).to.equal('foo,test');
	        _nflow2['default'].logger.reset();
	        done();
	      }, true);
	      var test = sut.create('test').on('foo', function () {});
	      test.emit('foo');
	    });
	
	    it('Should log .direction("foo") API', function (done) {
	      var test = sut.create('test');
	      _nflow2['default'].logger(function (log) {
	        (0, _chai.expect)(log.action).to.equal('direction');
	        (0, _chai.expect)(log.flow.name).to.equal('test');
	        (0, _chai.expect)(log.d).to.equal('"UPSTREAM"');
	        (0, _chai.expect)(log.d0).to.equal('"DEFAULT"');
	        _nflow2['default'].logger.reset();
	        done();
	      }, true);
	      test.direction('UPSTREAM');
	    });
	  });
	  describe('Remote Log Serialiser', function () {
	    it('Should serialise number', function (done) {
	      var test = sut.create('test');
	      _nflow2['default'].logger(function (log) {
	        if (test.done) return;
	        test.done = true;
	        (0, _chai.expect)(log.d).to.eql('55');
	        done();
	      }, true);
	      test.data(55);
	    });
	    it('Should serialise String', function (done) {
	      var test = sut.create('test');
	      _nflow2['default'].logger(function (log) {
	        if (test.done) return;
	        test.done = true;
	        (0, _chai.expect)(log.d).to.eql('"hello"');
	        done();
	      }, true);
	      test.data('hello');
	    });
	    it('Should serialise Object', function (done) {
	      var test = sut.create('test');
	      _nflow2['default'].logger(function (log) {
	        if (test.done) return;
	        test.done = true;
	        (0, _chai.expect)(log.d).to.eql('{"foo":"bar"}');
	        done();
	      }, true);
	      test.data({ foo: 'bar' });
	    });
	    it('Should serialise recursive Objects', function (done) {
	      var test = sut.create('test');
	      _nflow2['default'].logger(function (log) {
	        if (test.done) return;
	        test.done = true;
	        (0, _chai.expect)(log.d).to.eql('{"foo":{"o":"*Recursive0"}}');
	        done();
	      }, true);
	      var o = { foo: {} };
	      o.foo.o = o;
	      test.data(o);
	    });
	    it('Should serialise duplicate Objects', function (done) {
	      var test = sut.create('test');
	      _nflow2['default'].logger(function (log) {
	        if (test.done) return;
	        test.done = true;
	        (0, _chai.expect)(log.d).to.eql('{"foo":{},"bar":"*Recursive1"}');
	        done();
	      }, true);
	      var o = { foo: {} };
	      o.bar = o.foo;
	
	      test.data(o);
	    });
	    it('Should serialise Array', function (done) {
	      var test = sut.create('test');
	      _nflow2['default'].logger(function (log) {
	        if (test.done) return;
	        test.done = true;
	        (0, _chai.expect)(log.d).to.eql('[3,"four",5]');
	        done();
	      }, true);
	      test.data([3, 'four', 5]);
	    });
	    it('Should serialise named Function', function (done) {
	      var test = sut.create('test');
	      _nflow2['default'].logger(function (log) {
	        if (test.done) return;
	        test.done = true;
	        (0, _chai.expect)(log.d).to.eql('"function foo(arg,arg)"');
	        done();
	      }, true);
	      test.data(function foo(a, b) {});
	    });
	    it('Should serialise Date', function (done) {
	      var test = sut.create('test');
	      _nflow2['default'].logger(function (log) {
	        if (test.done) return;
	        test.done = true;
	        (0, _chai.expect)(log.d).to.eql('"1970-01-01T00:00:00.000Z"');
	        done();
	      }, true);
	      test.data(new Date(0));
	    });
	  });
	});

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _nflow = __webpack_require__(1);
	
	var _nflow2 = _interopRequireDefault(_nflow);
	
	var _chai = __webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/* globals describe, it, beforeEach */
	var noop = function noop() {};
	var sut;
	
	describe('Routes', function () {
	  beforeEach(function () {
	    sut = _nflow2['default'].create('sut').parent(null);
	  });
	  describe('route.upstream() API', function () {
	    it('should return all upstream nodes', function () {
	      var f = sut.create('a').create('b').create('c').create('d');
	
	      var route = f.emit.route.UPSTREAM(f, true);
	      var map = route.map(function (f) {
	        return f.flow.name();
	      });
	      (0, _chai.expect)(map).to.eql(['d', 'c', 'b', 'a', 'sut']);
	    });
	
	    it('should not return unrelated nodes', function () {
	      var b = sut.create('a').create('b');
	
	      b.create('x');
	      var f = b.create('c').create('d');
	
	      f.create('z');
	
	      var route = f.emit.route.UPSTREAM(f, true);
	      var map = route.map(function (f) {
	        return f.flow.name();
	      });
	      (0, _chai.expect)(map).to.eql(['d', 'c', 'b', 'a', 'sut']);
	    });
	
	    it('should record route to recipients', function () {
	      sut.on('test', noop);
	      var a = sut.create('a');
	      var b = sut.create('b');
	      a.create('c');
	      b.create('e');
	
	      var d = b.emit.upstream('test');
	
	      var recipient = d.emit.recipients[0];
	      var recipientMap = recipient.route.map(function (f) {
	        return f.flow.name();
	      });
	      (0, _chai.expect)(recipient.flow).to.eql(sut);
	      (0, _chai.expect)(recipientMap.join()).to.eql('test,b,sut');
	    });
	
	    it('should not deliver to unreachable recipients', function () {
	      sut;
	      var a = sut.create('a');
	      var b = sut.create('b');
	      a.create('c').on('test', noop);
	      b.create('e').on('test', noop);
	
	      var d = b.emit.upstream('test');
	
	      var recipients = d.emit.recipients;
	      (0, _chai.expect)(recipients.length).to.equal(0);
	    });
	  });
	
	  describe('route.current() API', function () {
	    it('should return event and current node', function () {
	      var f = sut.create('a').create('b').create('c').emit('d');
	
	      var route = f.emit.route.CURRENT(f, true);
	      var map = route.map(function (f) {
	        return f.flow.name();
	      });
	      (0, _chai.expect)(map).to.eql(['d', 'c']);
	    });
	
	    it('should not return unrelated nodes', function () {
	      var b = sut.create('a').create('b');
	
	      b.create('x');
	      var f = b.create('c').emit('d');
	
	      f.create('z');
	
	      var route = f.emit.route.CURRENT(f, true);
	      var map = route.map(function (f) {
	        return f.flow.name();
	      });
	      (0, _chai.expect)(map).to.eql(['d', 'c']);
	    });
	
	    it('should record route to recipients', function () {
	      sut.on('test', noop);
	      var a = sut.create('a').on('test', noop);
	      var d = a.emit.current('test');
	
	      var recipient = d.emit.recipients[0];
	      var recipientMap = recipient.route.map(function (f) {
	        return f.flow.name();
	      });
	      (0, _chai.expect)(recipient.flow).to.eql(a);
	      (0, _chai.expect)(recipientMap.join()).to.eql('test,a');
	    });
	  });
	
	  describe('route.downstream() API', function () {
	    it('should return child nodes', function () {
	      var f = sut.create('a');
	
	      var g = f.emit('x');
	
	      g.create('x0');
	
	      f.create('b').create('c').emit('d');
	      f.create('e');
	
	      var route = g.emit.route.DOWNSTREAM(g, true);
	      var map = route.map(function (f) {
	        return f.flow.name();
	      });
	      (0, _chai.expect)(map).to.eql(['x', 'x0', 'a', 'b', 'c', 'e']);
	    });
	
	    it('should not return unrelated nodes', function () {
	      var b = sut.create('a').create('b');
	
	      b.create('b0');
	      var f = b.create('b1').emit('c');
	
	      f.create('z');
	
	      var route = f.emit.route.DOWNSTREAM(f, true);
	      var map = route.map(function (f) {
	        return f.flow.name();
	      });
	      (0, _chai.expect)(map).to.eql(['c', 'z', 'b1']);
	    });
	    it('should record route to recipients', function () {
	      var a = sut.create('a');
	      var b = sut.create('b');
	      var c = a.create('c').on('test', noop);
	      var e = b.create('e').on('test', noop);
	      var d = sut.emit.downstream('test');
	
	      var cTest = d.emit.recipients[0];
	      var eTest = d.emit.recipients[1];
	      var cMap = cTest.route.map(function (f) {
	        return f.flow.name();
	      });
	      var eMap = eTest.route.map(function (f) {
	        return f.flow.name();
	      });
	      (0, _chai.expect)(cTest.flow).to.eql(c);
	      (0, _chai.expect)(eTest.flow).to.eql(e);
	      (0, _chai.expect)(cMap.join()).to.eql('test,sut,a,c');
	      (0, _chai.expect)(eMap.join()).to.eql('test,sut,b,e');
	    });
	  });
	
	  describe('route.default() API', function () {
	    it('should return child nodes', function () {
	      var a = sut.create('a');
	      var b = sut.create('b');
	      a.create('c');
	      b.create('e');
	      var d = b.create('d');
	
	      var route = d.emit.route.DEFAULT(d, true);
	      var map = route.map(function (f) {
	        return f.flow.name();
	      });
	      (0, _chai.expect)(map).to.deep.eql(['d', 'b', 'sut', 'a', 'c', 'e']);
	    });
	
	    it('should not return unrelated nodes', function () {
	      var a = sut.create('a');
	      var b = sut.create('b');
	      b.parent(null);
	      var route = a.emit.route.DEFAULT(a, true);
	      var map = route.map(function (f) {
	        return f.flow.name();
	      });
	      (0, _chai.expect)(map).to.eql(['a', 'sut']);
	    });
	    it('should record upstream route to recipients', function () {
	      var a = sut.create('a');
	      var b = a.create('b').on('test', function () {});
	      var c = b.create('c');
	      var d = c.create('d');
	
	      var test = d.emit('test');
	
	      var testRecipients = test.emit.recipients[0];
	      var map = testRecipients.route.map(function (f) {
	        return f.flow.name();
	      });
	      (0, _chai.expect)(testRecipients.flow).to.eql(b);
	      (0, _chai.expect)(map.join()).to.eql('test,d,c,b');
	    });
	
	    it('should record route to recipients', function () {
	      var a = sut.create('a');
	      var b = a.create('b');
	      var c0 = b.create('c0').on('test', noop);
	      var c = b.create('c');
	      var d = c.create('d');
	
	      var test = d.emit('test');
	
	      var testRecipients = test.emit.recipients[0];
	      var map = testRecipients.route.map(function (f) {
	        return f.flow.name();
	      });
	      (0, _chai.expect)(testRecipients.flow).to.eql(c0);
	      (0, _chai.expect)(map.join()).to.eql('test,d,c,b,a,sut,a,b,c0');
	    });
	
	    it('should record route to detached recipients', function () {
	      var a = sut.create('a').on('test', noop);
	      var b = a.create('b').emit();
	      b.create('c0').on('test', noop);
	      var c = b.create('c');
	      var d = c.create('d');
	
	      var test = d.emit('test');
	
	      var testRecipients0 = test.emit.recipients[0];
	      var testRecipients1 = test.emit.recipients[1];
	      var map0 = testRecipients0.route.map(function (f) {
	        return f.flow.name();
	      });
	      var map1 = testRecipients1.route.map(function (f) {
	        return f.flow.name();
	      });
	      (0, _chai.expect)(testRecipients0.flow.name()).to.eql('c0');
	      (0, _chai.expect)(testRecipients1.flow.name()).to.eql('a');
	      (0, _chai.expect)(map0.join()).to.eql('test,d,c,b,c0');
	      (0, _chai.expect)(map1.join()).to.eql('test,d,c,b,a');
	    });
	  });
	});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _nflow = __webpack_require__(1);
	
	var _nflow2 = _interopRequireDefault(_nflow);
	
	var _chai = __webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/* globals describe, it, beforeEach */
	var sut;
	
	describe('Stats API', function () {
	  beforeEach(function () {
	    sut = _nflow2['default'].create('sut').parent(null);
	  });
	
	  describe('stats configuration', function () {
	    it('should merge stats', function () {
	      sut.stats({ foo: 'bar' });
	      sut.stats({ foo1: 'bar1' });
	      (0, _chai.expect)(sut.stats().foo).to.equal('bar');
	      (0, _chai.expect)(sut.stats().foo1).to.equal('bar1');
	    });
	
	    it('should inherit default stats', function () {
	      sut.stats({
	        defaults: {
	          'child': {
	            foo: 'xyz'
	          }
	        }
	      });
	      var child = sut.create('child');
	
	      (0, _chai.expect)(child.stats().foo).to.equal('xyz');
	    });
	  });
	});

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "tests.html";

/***/ }
/******/ ])));
//# sourceMappingURL=node-test.js.map