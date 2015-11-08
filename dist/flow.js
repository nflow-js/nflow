"use strict";

(function (scope) {

  var create = function (defaults, name, data) {
    var flow = defaults.factory();

    defaults.behaviours.forEach(function (d) {
      return d(flow, defaults, name, data);
    });

    return flow;
  };

  var behaviours = {};
  behaviours.cancellable = function (flow, defaults, name) {

    flow.cancel = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      assert(args.length, ERRORS.invalidCancelArgs);
      dispatchInternalEvent(flow, "cancel", true);
      flow.status.value = STATUS.CANCELLED;
      return flow;
    };

    flow.isCancelled = function () {
      return [flow].concat(flow.parents()).some(function (e) {
        return e.status.value == STATUS.CANCELLED;
      });
    };
  };
  behaviours.connect = function (flow) {

    /**
     *  .children() API
     */
    flow.children = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      assert(args.length, ERRORS.invalidChildren);
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
      };else if (isFlow(matcher)) filter = function (f) {
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
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      assert(args.length, ERRORS.invalidChildren);
      var childMap = {};
      return getChildren(flow);

      function getChildren(flow) {
        if (childMap[flow.guid()]) {
          return [];
        }childMap[flow.guid()] = true;
        var c = flow.children.value;
        var gc = flow.children.value.map(getChildren);

        return c.concat.apply(c, gc);
      }
    };

    /**
     *  .parent() API
     */
    flow.parent = function () {
      var parent = arguments[0] === undefined ? UNSET : arguments[0];

      if (parent === UNSET) return flow.parent.value;
      parent && assert(!isFlow(parent), ERRORS.invalidParent, parent);
      var previousParent = flow.parent();
      detach(flow);
      dispatchInternalEvent(flow, "childRemoved", previousParent);
      attach(parent);
      dispatchInternalEvent(flow, "childAdded", parent, previousParent);
      return flow;
    };

    flow.parents = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      assert(args.length, ERRORS.invalidParents);
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
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      assert(args.length, ERRORS.invalidRoot);
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

  behaviours.create = function (flow, defaults) {

    flow.create = function (name) {
      for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        data[_key - 1] = arguments[_key];
      }

      var instance = flow.get(name);
      if (instance) {
        instance.data.apply(instance, data);
        return instance;
      }
      instance = create(flow.create.defaults, name, data);
      instance.parent.value = flow;
      flow.children.value.push(instance);
      dispatchInternalEvent(flow, "create", instance);
      return instance;
    };

    flow.create.defaults = {
      factory: defaults.factory,
      behaviours: defaults.behaviours.concat(),
      direction: defaults.direction

    };
  };
  behaviours.emit = function (flow) {

    flow.status = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      assert(args.length, ERRORS.invalidStatus);
      return flow.status.value;
    };
    flow.status.value = STATUS.IDLE;
    merge(STATUS, flow.status);

    flow.direction = function () {
      var direction = arguments[0] === undefined ? UNSET : arguments[0];

      if (direction === UNSET) return flow.direction.value;
      flow.direction.value = direction;
      return flow;
    };
    flow.direction.value = flow.create.defaults.direction;
    merge(DIRECTION, flow.direction);

    flow.emit = function () {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var name = arguments[0] === undefined ? UNSET : arguments[0];

      if (name == UNSET) {
        // emit current flow object
        detach(flow);
        log(flow, "emit", flow);
        flow.emit.route(flow);
        log(flow, "emitted", flow);
        return flow;
      }
      if (isFlow(name)) {
        //1. reparent the passed in flow object where it's emitted from
        name.parent(flow);

        //2.  emit the passed in flow object
        detach(flow);
        log(name, "emit", name);
        flow.emit.route(name);
        log(name, "emitted", name);
        return flow;
      }

      assert(typeof name != "string", ERRORS.invalidEventName);

      var event = flow.create.apply(flow, [name].concat(args));
      detach(event);
      log(event, "emit", event);
      flow.emit.route(event);
      log(event, "emitted", event);
      return event;
    };

    flow.emit.route = function (flow) {
      // 2. reset status
      flow.emit.recipients = [];
      flow.emit.recipientsMap = {};

      flow.status.value = STATUS.FLOWING;

      // only keep unique recipients
      flow.emit.targets = flow.emit.route[flow.direction()](flow).filter(function (f) {
        if (flow.emit.recipientsMap[f.guid()]) return false;
        return flow.emit.recipientsMap[f.guid()] = true;
      });

      while (flow.emit.targets.length) {
        var destination = flow.emit.targets.shift();
        notify(flow, destination);
      }
    };

    flow.emit.route.DEFAULT = function (flow) {
      return flatten([flow].concat(flow.parents()).map(function (node) {
        if (isDetached(node) || !node.parent()) return [node].concat(node.children.all());
        //TODO check circular deps
        return [node];
      }));
    };

    flow.emit.route.UPSTREAM = function (flow) {
      return [flow].concat(flow.parents());
    };

    flow.emit.route.DOWNSTREAM = function (flow) {
      return flatten([flow].concat(flow.parent()).concat(flow.parent().children.all()).filter(Boolean));
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

  var guid = 0;
  behaviours.identify = function (flow, defaults, name) {

    flow.guid = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      assert(args.length, ERRORS.invalidGuid);
      return flow.guid.value;
    };
    flow.guid.value = "" + guid++;

    flow.name = function () {
      var name = arguments[0] === undefined ? UNSET : arguments[0];

      if (name === UNSET) return flow.name.value;
      assert(typeof name != "string", ERRORS.invalidName, name);
      var previousName = flow.name.value;
      flow.name.value = name;
      dispatchInternalEvent(flow, "name", name, previousName);
      return flow;
    };
    flow.name.value = name || flow.guid();
    flow.name.isFlow = true;
    flow.name.isInternal = false;
  };
  behaviours.listen = function (flow) {
    var listenerMap = {};
    flow.on = function () {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var name = arguments[0] === undefined ? UNSET : arguments[0];

      if (name == UNSET) return listenerMap; //TODO clone this!
      assert(typeof name != "string", ERRORS.invalidListener);

      if (!args.length) {
        return listenerMap[name];
      }

      if (args.length == 1 && args[0] == null) {
        delete listenerMap[name];
        return flow;
      }
      listenerMap[name] = args.filter(function (l) {
        return !assert(typeof l != "function", ERRORS.invalidListenerType, typeof l + ": " + l);
      });
      return flow;
    };

    flow.on.notifyListeners = function (event) {
      if (listenerMap[event.name()]) {
        event.target = flow;
        listenerMap[event.name()].every(function (listener) {
          listener.apply(event, event.data.value);
          return event.status() == STATUS.FLOWING;
        });
        return true;
      }
    };
  };
  behaviours.loggable = function (flow) {
    flow.toString = function () {
      return "{ Object Flow, name:%name }".replace("%name", flow.name());
    };
  };

  function log(flow, name, newData, oldData) {
    instance.logger && !isInternal(flow) && instance.logger(flow, name, newData, oldData);
  }
  behaviours.stateful = function (flow, defaults, name, data) {
    flow.data = function () {
      for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
        data[_key] = arguments[_key];
      }

      if (!data.length) {
        return flow.data.value.length <= 1 ? flow.data.value[0] : flow.data.value;
      }
      var oldData = flow.data.value;
      flow.data.value = data;
      dispatchInternalEvent(flow, "data", data.length > 1 ? data : data[0], oldData.length > 1 ? oldData : oldData[0]);
      return flow;
    };
    flow.data.value = data;
  };
  /**
   *  consts
   */
  var UNSET = {};
  var DIRECTION = {
    NONE: "NONE",
    DEFAULT: "DEFAULT",
    UPSTREAM: "UPSTREAM",
    DOWNSTREAM: "DOWNSTREAM"
  };

  var STATUS = {
    IDLE: "IDLE",
    FLOWING: "FLOWING",
    STOPPED: "STOPPED",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED"
  };

  var DEFAULTS = {
    factory: function () {
      return {};
    },
    behaviours: [behaviours.identify, behaviours.stateful, behaviours.connect, behaviours.create, behaviours.emit, behaviours.listen, behaviours.cancellable, behaviours.loggable, behaviours.loggable],
    direction: DIRECTION.DEFAULT
  };
  var ERRORS = {
    invalidGuid: "Invalid Argument. Guid-s are immutable. Please use the .name() API to change the name of a flow object.",
    invalidChildren: "Invalid Argument. Please use child.parent(parent) to re-parent flow objects.",
    invalidListener: "Invalid Arguments. Please use .on(\"foo\", handler) to create a listener.",
    invalidListenerType: "Invalid Listener function. Expected a function, got: %s",
    invalidEventName: "Invalid Arguments. Please use .emit(\"foo\", payload) to emit a flow event.",
    invalidName: "Invalid flow Name. Expected a String value, got: %s",
    invalidParent: "Invalid flow parent object. Expected a flow instance, got: %s",
    invalidParents: "Invalid Argument. Please use the child.parent(parent) API to re-parent flow objects.",
    invalidStatus: "Invalid Argument. The .status() API is read only",
    invalidCancelArgs: "Invalid Argument. The .cancel() API requires no parameters",
    invalidRoot: "Invalid Argument. The .parents.root() API is read only"
  };

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
    var e = create(DEFAULTS, "flow." + name);
    e.name.isInternal = true;
    e.data.value = [newData, oldData];
    e.direction.value = DIRECTION.NONE;
    e.parent.value = flow;
    e.emit();
    e.data.value = [flow, newData, oldData];
    e.direction.value = DIRECTION.UPSTREAM;
    e.name.value = "flow.children." + name;
    e.emit();

    e.direction.value = DIRECTION.DOWNSTREAM;
    e.name.value = "flow.parent." + name;
    e.emit();

    log(flow, name, newData, oldData);
  }

  var instance = create(DEFAULTS, "flow");

  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return instance;
    });
  } else if (typeof module === "object" && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = instance;
  } else {
    // Browser globals ("this" is window)
    scope["this"].flow = instance;
  }
})({ "this": this });
//# sourceMappingURL=flow.js.map