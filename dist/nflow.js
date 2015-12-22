(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


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

	var _logger = __webpack_require__(7);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var flow = (0, _factory2.default)(_consts.DEFAULTS, "flow");
	_logger2.default.init(flow);

	console.log('t', undefined);
	// if (typeof define === 'function' && define.amd) {
	//         // AMD. Register as an anonymous module.
	//         define([], ()=>instance);
	//     } else if (typeof module === 'object' && module.exports) {
	//         // Node. Does not work with strict CommonJS, but
	//         // only CommonJS-like environments that support module.exports,
	//         // like Node.
	//         module.exports = instance;
	//     } else {
	//         // Browser globals ("this" is window)
	//         scope["this"].flow = instance
	//     }

	exports.default = flow;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _behaviours = __webpack_require__(3);

	var behaviours = _interopRequireWildcard(_behaviours);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.default = function (defaults, name, data) {
	  var flow = defaults.factory();

	  defaults.behaviours.forEach(function (d) {
	    behaviours[d](flow, defaults, name, data);
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

	Object.defineProperty(exports, 'cancellable', {
	  enumerable: true,
	  get: function get() {
	    return _cancellable.default;
	  }
	});

	var _connect = __webpack_require__(8);

	Object.defineProperty(exports, 'connect', {
	  enumerable: true,
	  get: function get() {
	    return _connect.default;
	  }
	});

	var _create = __webpack_require__(9);

	Object.defineProperty(exports, 'create', {
	  enumerable: true,
	  get: function get() {
	    return _create.default;
	  }
	});

	var _emit = __webpack_require__(10);

	Object.defineProperty(exports, 'emit', {
	  enumerable: true,
	  get: function get() {
	    return _emit.default;
	  }
	});

	var _identify = __webpack_require__(11);

	Object.defineProperty(exports, 'identify', {
	  enumerable: true,
	  get: function get() {
	    return _identify.default;
	  }
	});

	var _listen = __webpack_require__(12);

	Object.defineProperty(exports, 'listen', {
	  enumerable: true,
	  get: function get() {
	    return _listen.default;
	  }
	});

	var _loggable = __webpack_require__(13);

	Object.defineProperty(exports, 'loggable', {
	  enumerable: true,
	  get: function get() {
	    return _loggable.default;
	  }
	});

	var _stateful = __webpack_require__(14);

	Object.defineProperty(exports, 'stateful', {
	  enumerable: true,
	  get: function get() {
	    return _stateful.default;
	  }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _consts = __webpack_require__(5);

	var _utils = __webpack_require__(6);

	exports.default = function (flow, defaults, name) {

	  flow.cancel = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidCancelArgs);
	    (0, _utils.dispatchInternalEvent)(flow, 'cancel', true);
	    flow.status.value = _consts.STATUS.CANCELLED;
	    return flow;
	  };

	  flow.isCancelled = function () {
	    return [flow].concat(flow.parents()).some(function (e) {
	      return e.status.value == _consts.STATUS.CANCELLED;
	    });
	  };

	  flow.stopPropagation = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidStopPropagationArgs);
	    flow.status.value = _consts.STATUS.STOPPED;
	    (0, _utils.dispatchInternalEvent)(flow, 'propagationStopped', true);
	    return flow;
	  };

	  flow.propagationStopped = function () {
	    return flow.status.value == _consts.STATUS.STOPPED;
	  };
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 *  consts
	 */

	var UNSET = exports.UNSET = {};
	var DIRECTION = exports.DIRECTION = {
	  NONE: "NONE",
	  DEFAULT: "DEFAULT",
	  UPSTREAM: "UPSTREAM",
	  DOWNSTREAM: "DOWNSTREAM"
	};

	var STATUS = exports.STATUS = {
	  IDLE: "IDLE",
	  FLOWING: "FLOWING",
	  STOPPED: "STOPPED",
	  COMPLETED: "COMPLETED",
	  CANCELLED: "CANCELLED"
	};

	var DEFAULTS = exports.DEFAULTS = {
	  factory: function factory() {
	    return {};
	  },
	  behaviours: ['identify', 'stateful', 'connect', 'create', 'emit', 'listen', 'cancellable', 'loggable'],
	  direction: DIRECTION.DEFAULT
	};
	var ERRORS = exports.ERRORS = {
	  invalidGuid: 'Invalid Argument. Guid-s are immutable. Please use the .name() API to change the name of a flow object.',
	  invalidChildren: 'Invalid Argument. Please use child.parent(parent) to re-parent flow objects.',
	  invalidListener: 'Invalid Arguments. Please use .on("foo", handler) to create a listener.',
	  invalidListenerType: 'Invalid Listener function. Expected a function, got: %s',
	  invalidEventName: 'Invalid Arguments. Please use .emit("foo", payload) to emit a flow event.',
	  invalidName: 'Invalid flow Name. Expected a String value, got: %s',
	  invalidParent: 'Invalid flow parent object. Expected a flow instance, got: %s',
	  invalidParents: 'Invalid Argument. Please use the child.parent(parent) API to re-parent flow objects.',
	  invalidStatus: 'Invalid Argument. The .status() API is read only',
	  invalidCancelArgs: 'Invalid Argument. The .cancel() API requires no parameters',
	  invalidStopPropagationArgs: 'Invalid Argument. The .stopPropagation() API requires no parameters',
	  invalidRoot: 'Invalid Argument. The .parents.root() API is read only'
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.assert = assert;
	exports.isFlow = isFlow;
	exports.isInternal = isInternal;
	exports.detach = detach;
	exports.isDetached = isDetached;
	exports.flatten = flatten;
	exports.merge = merge;
	exports.dispatchInternalEvent = dispatchInternalEvent;

	var _factory = __webpack_require__(2);

	var _factory2 = _interopRequireDefault(_factory);

	var _consts = __webpack_require__(5);

	var _logger = __webpack_require__(7);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *  utils
	 */
	function assert(condition, error, val) {
	  if (condition) {
	    throw new Error(error.replace("%s", val));
	  }
	  return condition;
	}

	function isFlow(flow) {
	  return flow && flow.name && flow.name.isFlow;
	}

	function isInternal(flow) {
	  return flow && flow.name && flow.name.isInternal;
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

	function dispatchInternalEvent(flow, name, newData, oldData) {
	  var e = (0, _factory2.default)(_consts.DEFAULTS, "flow." + name);
	  e.name.isInternal = true;
	  e.data.value = [newData, oldData];
	  e.direction.value = _consts.DIRECTION.NONE;
	  e.parent.value = flow;
	  e.emit();
	  e.data.value = [flow, newData, oldData];
	  e.direction.value = _consts.DIRECTION.UPSTREAM;
	  e.name.value = "flow.children." + name;
	  e.emit();

	  e.direction.value = _consts.DIRECTION.DOWNSTREAM;
	  e.name.value = "flow.parent." + name;
	  e.emit();

	  _logger2.default.log(flow, name, newData, oldData);
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(6);

	var _consts = __webpack_require__(5);

	var _factory = __webpack_require__(2);

	var _factory2 = _interopRequireDefault(_factory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var devToolsEnabled = false;
	var loggers = [];

	function log(flow, name, newData, oldData) {
	  !(0, _utils.isInternal)(flow) && loggers.forEach(function (f) {
	    return f(flow, name, newData, oldData);
	  });

	  devToolsEnabled && debug(flow, name, newData, oldData);
	}

	function debug(flow, name, d, d0) {
	  sendToDevTools(name, {
	    name: d.name.value,
	    id: d.guid.value,
	    parentId: flow.guid.value
	  });
	}

	function sendToDevTools(action, payload) {
	  var eventDetail = {
	    action: action,
	    payload: payload
	  };
	  var flowEvent = new document.defaultView.CustomEvent("FlowEvent", { detail: eventDetail });
	  document.dispatchEvent(flowEvent);
	}

	function init(flow) {

	  flow.enableDevTools = function () {
	    var enabled = arguments.length <= 0 || arguments[0] === undefined ? _consts.UNSET : arguments[0];

	    if (enabled === _consts.UNSET) return devToolsEnabled;
	    devToolsEnabled = enabled;
	    if (enabled) {
	      sendToDevTools('start', {
	        name: flow.name.value,
	        id: flow.guid.value
	      });
	    }
	    return flow;
	  };

	  flow.logger = function () {
	    var logger = arguments.length <= 0 || arguments[0] === undefined ? _consts.UNSET : arguments[0];

	    if (logger === _consts.UNSET) return loggers;
	    loggers.push(logger);
	    return flow;
	  };
	}

	exports.default = {
	  init: init,
	  log: log,
	  sendToDevTools: sendToDevTools
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(6);

	var _consts = __webpack_require__(5);

	exports.default = function (flow) {

	  /**
	   *  .children() API
	   */
	  flow.children = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidChildren);
	    return flow.children.value.concat();
	  };
	  flow.children.value = [];

	  flow.children.has = function (matcher, recursive) {
	    return flow.children.find(matcher, recursive) != null;
	  };
	  flow.children.find = function (matcher, recursive) {
	    return flow.children.findAll(matcher, recursive).pop();
	  };
	  flow.children.findAll = function (matcher, recursive) {

	    var filter = matcher;
	    if (matcher == null) return [];
	    if (typeof matcher == "string") filter = function (f) {
	      return f.name() == matcher;
	    };else if ((0, _utils.isFlow)(matcher)) filter = function (f) {
	      return f == matcher;
	    };
	    var children = recursive ? flow.children.all() : flow.children();

	    return children.filter(filter);
	  };

	  flow.get = flow.children.find;
	  flow.getAll = flow.children.find;

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
	   *  .parent() API
	   */
	  flow.parent = function () {
	    var parent = arguments.length <= 0 || arguments[0] === undefined ? _consts.UNSET : arguments[0];

	    if (parent === _consts.UNSET) return flow.parent.value;
	    parent && (0, _utils.assert)(!(0, _utils.isFlow)(parent), _consts.ERRORS.invalidParent, parent);
	    var previousParent = flow.parent();
	    (0, _utils.detach)(flow);
	    (0, _utils.dispatchInternalEvent)(flow, 'childRemoved', previousParent);
	    attach(parent);
	    (0, _utils.dispatchInternalEvent)(flow, 'childAdded', parent, previousParent);
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

	  flow.parents.find = function (matcher) {
	    return flow.parents().filter(typeof matcher == "string" ? function (f) {
	      return f.name() == matcher;
	    } : matcher).pop();
	  };

	  flow.parents.root = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidRoot);
	    return flow.parents().pop();
	  };

	  flow.children.detach = function (child) {
	    flow.children.value = flow.children.value.filter(function (f) {
	      return f != child;
	    });
	  };

	  function attach(parent) {
	    parent && parent.children.value.push(flow);
	    flow.parent.value = parent;
	  }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _factory = __webpack_require__(2);

	var _factory2 = _interopRequireDefault(_factory);

	var _logger = __webpack_require__(7);

	var _logger2 = _interopRequireDefault(_logger);

	var _utils = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (flow, defaults) {

	  flow.create = function (name) {
	    for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      data[_key - 1] = arguments[_key];
	    }

	    var instance = flow.get(name);
	    if (instance) {
	      var _instance;

	      (_instance = instance).data.apply(_instance, data);
	      return instance;
	    }
	    instance = (0, _factory2.default)(flow.create.defaults, name, data);
	    instance.parent.value = flow;
	    flow.children.value.push(instance);
	    (0, _utils.dispatchInternalEvent)(flow, 'create', instance);
	    return instance;
	  };

	  flow.create.defaults = {
	    factory: defaults.factory,
	    behaviours: defaults.behaviours.concat(),
	    direction: defaults.direction

	  };
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _consts = __webpack_require__(5);

	var _utils = __webpack_require__(6);

	var _logger = __webpack_require__(7);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var log = _logger2.default.log;

	exports.default = function (flow) {

	  flow.status = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidStatus);
	    return flow.status.value;
	  };
	  flow.status.value = _consts.STATUS.IDLE;
	  (0, _utils.merge)(_consts.STATUS, flow.status);

	  flow.direction = function () {
	    var direction = arguments.length <= 0 || arguments[0] === undefined ? _consts.UNSET : arguments[0];

	    if (direction === _consts.UNSET) return flow.direction.value;
	    flow.direction.value = direction;
	    return flow;
	  };
	  flow.direction.value = flow.create.defaults.direction;
	  (0, _utils.merge)(_consts.DIRECTION, flow.direction);

	  flow.emit = function () {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var name = arguments.length <= 0 || arguments[0] === undefined ? _consts.UNSET : arguments[0];

	    if (name == _consts.UNSET) {
	      // emit current flow object
	      (0, _utils.detach)(flow);
	      log(flow, 'emit', flow);
	      flow.emit.route(flow);
	      log(flow, 'emitted', flow);
	      return flow;
	    }
	    if ((0, _utils.isFlow)(name)) {
	      //1. reparent the passed in flow object where it's emitted from
	      name.parent(flow);

	      //2.  emit the passed in flow object
	      (0, _utils.detach)(flow);
	      log(name, 'emit', name);
	      flow.emit.route(name);
	      log(name, 'emitted', name);
	      return flow;
	    }

	    (0, _utils.assert)(typeof name != 'string', _consts.ERRORS.invalidEventName);

	    var event = flow.create.apply(flow, [name].concat(args));
	    (0, _utils.detach)(event);
	    log(event, 'emit', event);
	    flow.emit.route(event);
	    log(event, 'emitted', event);
	    return event;
	  };

	  flow.emit.route = function (flow) {
	    // 2. reset status
	    flow.emit.recipients = [];
	    flow.emit.recipientsMap = {};

	    flow.status.value = _consts.STATUS.FLOWING;

	    // only keep unique recipients
	    flow.emit.targets = flow.emit.route[flow.direction()](flow).filter(function (f) {
	      if (flow.emit.recipientsMap[f.guid()]) return false;
	      return flow.emit.recipientsMap[f.guid()] = true;
	    });

	    while (flow.emit.targets.length) {
	      var destination = flow.emit.targets.shift();
	      if (flow.isCancelled()) break;
	      if (flow.propagationStopped()) break;
	      notify(flow, destination);
	    }
	  };

	  flow.emit.route.DEFAULT = function (flow) {
	    return (0, _utils.flatten)([flow].concat(flow.parents()).map(function (node) {
	      if ((0, _utils.isDetached)(node) || !node.parent()) return [node].concat(node.children.all());
	      //TODO check circular deps
	      return [node];
	    }));
	  };

	  flow.emit.route.UPSTREAM = function (flow) {
	    return [flow].concat(flow.parents());
	  };

	  flow.emit.route.DOWNSTREAM = function (flow) {
	    return (0, _utils.flatten)([flow].concat(flow.parent()).concat(flow.parent().children.all()).filter(Boolean));
	  };

	  flow.emit.route.NONE = function (flow) {
	    return [flow, flow.parent()];
	  };

	  function notify(flow, currentNode) {
	    if (currentNode.on.notifyListeners(flow)) {
	      flow.emit.recipientsMap[currentNode.guid()] = flow.direction();
	      flow.emit.recipients.push(currentNode);
	    }
	  }

	  function getNextFlowDestination(currentNode, direction) {
	    return ({
	      NONE: [currentNode],
	      UPSTREAM: [currentNode.parent()],
	      DEFAULT: [currentNode.parent()],
	      DOWNSTREAM: currentNode.children()
	    })[direction];
	  }
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _consts = __webpack_require__(5);

	var _logger = __webpack_require__(7);

	var _logger2 = _interopRequireDefault(_logger);

	var _utils = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var guid = 0;

	exports.default = function (flow, defaults, name) {

	  flow.guid = function () {
	    (0, _utils.assert)(arguments.length, _consts.ERRORS.invalidGuid);
	    return flow.guid.value;
	  };
	  flow.guid.value = "" + guid++;

	  flow.name = function () {
	    var name = arguments.length <= 0 || arguments[0] === undefined ? _consts.UNSET : arguments[0];

	    if (name === _consts.UNSET) return flow.name.value;
	    (0, _utils.assert)(typeof name != "string", _consts.ERRORS.invalidName, name);
	    var previousName = flow.name.value;
	    flow.name.value = name;
	    _logger2.default.dispatchInternalEvent(flow, 'name', name, previousName);
	    return flow;
	  };
	  flow.name.value = name || flow.guid();
	  flow.name.isFlow = true;
	  flow.name.isInternal = false;

	  flow.call = function () {
	    for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
	      functions[_key] = arguments[_key];
	    }

	    functions.filter(function (f) {
	      return typeof f == 'function';
	    }).forEach(function (f) {
	      return f(flow);
	    });
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _consts = __webpack_require__(5);

	var _utils = __webpack_require__(6);

	var _logger = __webpack_require__(7);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	exports.default = function (flow) {
	  var listenerMap = {};
	  flow.on = function () {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var name = arguments.length <= 0 || arguments[0] === undefined ? _consts.UNSET : arguments[0];

	    if (name == _consts.UNSET) return listenerMap; //TODO clone this!
	    (0, _utils.assert)(typeof name != 'string', _consts.ERRORS.invalidListener);

	    if (!args.length) {
	      return listenerMap[name];
	    }

	    if (args.length == 1 && args[0] == null) {
	      delete listenerMap[name];
	      return flow;
	    }
	    listenerMap[name] = args.filter(function (l) {
	      return !(0, _utils.assert)(typeof l != 'function', _consts.ERRORS.invalidListenerType, (typeof l === 'undefined' ? 'undefined' : _typeof(l)) + ": " + l);
	    });
	    return flow;
	  };

	  flow.on.notifyListeners = function (event) {
	    if (listenerMap[event.name()]) {
	      event.target = flow;
	      listenerMap[event.name()].every(function (listener) {
	        listener.apply(event, event.data.value);
	        return event.status() == _consts.STATUS.FLOWING;
	      });
	      return true;
	    }
	  };
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (flow) {
	  flow.toString = function () {
	    return "{ Object Flow, name:%name }".replace("%name", flow.name());
	  };

	  flow.toObj = function () {
	    return {
	      name: flow.name(),
	      guid: flow.guid(),
	      parentName: flow.parent() && flow.parent().name(),
	      parentGuid: flow.parent() && flow.parent().guid(),
	      status: flow.status(),
	      listeners: Object.keys(flow.on()),
	      children: flow.children().map(function (f) {
	        return { name: f.name(), guid: f.guid() };
	      })
	    };
	  };
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _logger = __webpack_require__(7);

	var _logger2 = _interopRequireDefault(_logger);

	var _utils = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (flow, defaults, name, data) {
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

/***/ }
/******/ ])));