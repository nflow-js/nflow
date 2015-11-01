"use strict";

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

(function (scope) {

  var create = function (defaults, name, data) {
    var flow = defaults.factory();

    defaults.behaviours.forEach(function (d) {
      return d(flow, defaults, name, data);
    });

    return flow;
  };

  var behaviours = {};
  behaviours.carry = function (flow, defaults, name, data) {
    flow.data = function () {
      for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
        data[_key] = arguments[_key];
      }

      if (!data.length) {
        return flow.data.value.length <= 1 ? flow.data.value[0] : flow.data.value;
      }
      return (flow.data.value = data, flow);
    };
    flow.data.value = data;
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
      if (typeof matcher == "string") filter = function (f) {
        return f.name() == matcher;
      };else if (isFlow(matcher)) filter = function (f) {
        return f == matcher;
      };
      var children = recursive ? flow.children.all() : flow.children();

      return children.filter(filter);
    };

    /**
     *  return all children recursively
     */
    flow.children.all = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      assert(args.length, ERRORS.invalidChildren);
      //TODO handle circular deps
      return getChildren(flow);

      function getChildren(flow) {
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
      flow.parent() && flow.parent().children.detach(flow);
      attach(parent);
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

      var instance = create(flow.create.defaults, name, data);
      instance.parent(flow);
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

    flow.direction = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      assert(args.length, ERRORS.invalidStatus);
      return flow.direction.value;
    };
    flow.direction.value = flow.create.defaults.direction;

    flow.emit = function () {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var name = arguments[0] === undefined ? UNSET : arguments[0];

      if (name == UNSET) {
        // emit current flow object
        emit(flow);
        return flow;
      }
      if (isFlow(name)) {
        //1. reparent the passed in flow object where it's emitted from
        name.parent(flow);

        //2.  emit the passed in flow object
        emit(name);
        return flow;
      }

      assert(typeof name != "string", ERRORS.invalidEventName);

      var event = flow.create.apply(flow, [name].concat(args));
      emit(event);
      return event;
    };

    function emit(flow) {
      // 1. detach from parent
      //console.log("emitting", flow.name())
      flow.parent() && flow.parent().children.detach(flow);

      // 2. reset status
      flow.emit.recipients = [];
      flow.emit.recipientsMap = {};

      if (flow.direction() == DIRECTION.DEFAULT) flow.emit.targets = flatten([flow].concat(flow.parents()).map(function (node) {
        if (isDetached(node) || !node.parent()) return [node].concat(node.children.all());
        //TODO check circular deps
        return [node];
      }));
      flow.status.value = STATUS.FLOWING;

      while (flow.emit.targets.length) {
        var destination = flow.emit.targets.shift();
        notify(flow, destination);
      }
    }

    function notify(flow, currentNode) {
      if (flow.emit.recipientsMap[currentNode.guid()] == flow.direction()) {
        // we already checked this node
        return;
      }
      flow.emit.recipients.push(currentNode);
      flow.emit.recipientsMap[currentNode.guid()] = flow.direction();
      currentNode.on.notifyListeners(flow);
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
      return (flow.name.value = name, flow);
    };
    flow.name(name || flow.guid());
    flow.name.isFlow = true;
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
        return listenerMap[name] //TODO clone this
        ;
      }

      if (args.length == 1 && args[0] == null) {
        delete listenerMap[name];
        return flow;
      }
      listenerMap[name] = args.filter(function (l) {
        return !assert(typeof l != "function", ERRORS.invalidListener);
      });
      //console.log("adding listener", name, 'to', flow.name(), flow.guid())
      return flow;
    };

    flow.on.notifyListeners = function (event) {
      //console.log("notifying", event.name(), 'to', flow.name(), flow.guid())
      if (listenerMap[event.name()]) {
        listenerMap[event.name()].every(function (listener) {
          listener.apply(undefined, _toConsumableArray(event.data.value));
          return flow.status() == STATUS.FLOWING;
        });
      }
    }

    //TODO cache listeners
    ;
  };
  behaviours.log = function (flow) {

    flow.toString = function () {
      return "{ Object Flow }";
    };
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
    behaviours: [behaviours.identify, behaviours.carry, behaviours.connect, behaviours.create, behaviours.emit, behaviours.listen, behaviours.log],
    direction: DIRECTION.DEFAULT
  };
  var ERRORS = {
    invalidGuid: "Invalid Argument. Guid-s are immutable. Please use the .name() API to change the name of a flow object.",
    invalidChildren: "Invalid Argument. Please use child.parent(parent) to re-parent flow objects.",
    invalidListener: "Invalid Arguments. Please use .on(\"foo\", handler) to create a listener.",
    invalidEventName: "Invalid Arguments. Please use .emit(\"foo\", payload) to emit a flow event.",
    invalidName: "Invalid flow Name. Expected a String value, got: %s",
    invalidParent: "Invalid flow parent object. Expected a flow instance, got: %s",
    invalidParents: "Invalid Argument. Please use the child.parent(parent) API to re-parent flow objects.",
    invalidStatus: "Invalid Argument. The .status() API is read only",
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

  function isDetached(flow) {
    return flow.parent() && !flow.parent().children.has(flow);
  }

  function flatten(array) {
    return [].concat.apply([], array);
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