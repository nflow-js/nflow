"use strict";

(function () {
  var UNSET = {},
      PRIVATE = {},
      FLOW = {},
      DEFAULT = "DEFAULT",
      UPSTREAM = "UPSTREAM",
      DOWNSTREAM = "DOWNSTREAM";

  var matcher = function (flow, name) {
    return flow.name() == name;
  };
  var id = 0;
  var create = function (name) {
    for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      data[_key - 1] = arguments[_key];
    }

    var state = {
      children: [],
      listenerMap: {},
      matcher: matcher,
      parent: null,
      name: null,
      data: [],
      cancelled: false,
      direction: DEFAULT,
      id: id++
    },
        flow = {};

    flow.create = function (name) {
      for (var _len2 = arguments.length, data = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        data[_key2 - 1] = arguments[_key2];
      }

      var instance = create.apply(undefined, [name].concat(data));
      instance.direction(flow.direction());
      instance.parent(flow);
      return instance;
    };

    flow.parent = function () {
      var parent = arguments[0] === undefined ? UNSET : arguments[0];

      if (parent === UNSET) return state.parent;

      if (parent && !isFlow(parent)) {
        throw new Error("Invalid Argument. flow.parent(arg) accepts a flow object or null");
        return;
      }

      detach(flow);
      attach(flow, parent);
      return flow;
    };

    flow.parents = function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (args.length) {
        throw new Error("Invalid Argument. Please use child.parent(parent) to re-parent flow objects");
      }
      var parentMap = {};
      var parents = [];
      var p = flow.parent();
      while (p && !parentMap[p.data(PRIVATE).id]) {
        parents.push(p);
        parentMap[p.data(PRIVATE).id] = true;
        p = p.parent();
      }
      return parents;
    };

    flow.name = function () {
      var name = arguments[0] === undefined ? UNSET : arguments[0];

      if (name === UNSET) return state.name;
      return (state.name = name, flow);
    };

    flow.matcher = function () {
      var matcher = arguments[0] === undefined ? UNSET : arguments[0];

      if (matcher === UNSET) return state.matcher;
      return (state.matcher = matcher, flow);
    };

    flow.direction = function () {
      var direction = arguments[0] === undefined ? UNSET : arguments[0];

      if (direction === UNSET) return state.direction;
      return (state.direction = direction, flow);
    };
    flow.direction.DEFAULT = DEFAULT;
    flow.direction.UPSTREAM = UPSTREAM;
    flow.direction.DOWNSTREAM = DOWNSTREAM;

    flow.children = function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (args.length) {
        throw new Error("Invalid Argument. Please use child.parent(parent) to re-parent flow objects");
      }
      return state.children.concat();
    };

    flow.data = function () {
      for (var _len2 = arguments.length, data = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        data[_key2] = arguments[_key2];
      }

      if (!data.length) {
        return state.data.length <= 1 ? state.data[0] : state.data;
      }
      if (data[0] == PRIVATE) return state;
      if (data[0] == FLOW) return FLOW;
      return (state.data = data, flow);
    };

    flow.emit = function () {
      for (var _len2 = arguments.length, data = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        data[_key2 - 1] = arguments[_key2];
      }

      var name = arguments[0] === undefined ? UNSET : arguments[0];

      var instance = name == UNSET ? flow : flow.create.apply(flow, [name].concat(data));
      emit(instance);
      return flow;
    };

    /**
     *  .on('foo', handler1, handler2, :phase)
     */
    flow.on = function () {
      for (var _len2 = arguments.length, listeners = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        listeners[_key2 - 1] = arguments[_key2];
      }

      var name = arguments[0] === undefined ? UNSET : arguments[0];

      var phaseMarker = listeners.concat().pop();
      var phase = DEFAULT;
      if (phaseMarker === DEFAULT || phaseMarker === UPSTREAM || phaseMarker === DOWNSTREAM) {
        phase = phaseMarker;
        listeners.pop();
      }

      if (name === UNSET) {
        throw new Error("Invalid Argument. Please use .on(\"name\", ...listener) to add listeners");
        return;
      }
      if (!listeners.length) {
        return state.listenerMap[name] ? state.listenerMap[name][phase].concat() : [];
      }

      if (!state.listenerMap[name]) {
        var l = state.listenerMap[name] = {};
        l[DEFAULT] = [];
        l[UPSTREAM] = [];
        l[DOWNSTREAM] = [];
      }
      state.listenerMap[name][phase] = listeners.filter(function (l) {
        return l && l.call;
      });

      return flow;
    };

    flow.cancel = function () {
      var cancelled = arguments[0] === undefined ? true : arguments[0];

      return (state.cancelled = cancelled, flow);
    };

    flow.cancelled = function () {
      var cancelled = arguments[0] === undefined ? UNSET : arguments[0];

      if (cancelled === UNSET) return state.cancelled;
      return flow.cancel(cancelled);
    };

    flow.name(name);
    flow.data.apply(flow, data);
    return flow;
  };

  /**
   *  Utils
   */
  var detach = function (flow) {
    var parent = flow.parent();
    if (!isFlow(parent)) return;

    var state = parent.data(PRIVATE);
    state.children = state.children.filter(function (f) {
      return f != flow;
    });
  };

  var attach = function (flow, parent) {

    isFlow(parent) && parent.data(PRIVATE).children.push(flow);

    flow.data(PRIVATE).parent = parent;
  };

  var isFlow = function (flow) {
    return flow && flow.data(FLOW) == FLOW;
  };

  var emit = function (flow) {
    var processed = {};
    flow.recipients = [];
    var deliver = function (direction) {
      return function (p) {
        var id = p.data(PRIVATE).id;
        //console.log('checking', p.name(), id)
        if (direction === DEFAULT && processed[id]) return;
        var dispatched = dispatch(flow, direction, p);
        if (dispatched) flow.recipients.push(p);
        processed[id] = true;
        return !flow.cancelled();
      };
    };

    var parents = flow.parents();
    //console.log('parents', parents.map(p=>p.name()))
    // 1. bubble up - only if direction is DEFAULT or upstream
    //console.log('flow.direction()', flow.direction())
    if (flow.direction() == DEFAULT || flow.direction() == UPSTREAM) {
      parents.every(deliver(DEFAULT));
      parents.every(deliver(UPSTREAM));
    }

    // 2. flow down - only if direction is DEFAULT or downstream
    if (flow.cancelled()) return;
    // create breadth first list
    if (flow.direction() == DEFAULT || flow.direction() == DOWNSTREAM) {

      var root = flow.direction() == DOWNSTREAM ? flow.parent() : parents.pop();
      var recipients = flatten([root]);
      //console.log('flattened:', recipients.map(p=>p.name()))
      recipients.every(function (node) {
        deliver(DEFAULT)(node);
        deliver(DOWNSTREAM)(node);
        return !flow.cancelled();
      });
    }
  };

  var flatten = function (node) {
    var nodes = [node];
    //console.log('nodes', nodes)
    for (var i = 0; i < nodes.length; i++) {
      var children = nodes[i];
      //console.log('children', children)
      children.forEach(function (f) {
        //console.log('f',f)
        nodes = nodes.concat([f.children()]);
      });
    }
    //console.log('nodes final:', nodes)
    return [].concat.apply([], nodes);
  };

  var dispatch = function (flow, phase, recipient) {
    var state = recipient.data(PRIVATE);
    var delivered = false;
    //console.log('dispatching on', recipient.name(),state.listenerMap)
    Object.keys(state.listenerMap).every(function (key) {
      //console.log('matching', flow.name(), '<->', key, ':', state.matcher(flow, key))
      if (!state.matcher(flow, key)) return false;
      var l = state.listenerMap[key];
      var listeners = l[phase];
      //console.log('listeners', listeners)
      return listeners.every(function (f) {

        if (flow.cancelled()) return false;

        delivered = true;
        //console.log('ok, dispatching', flow.name(),'to', recipient.name() ,'with', flow.data())
        return (f.apply(flow, flow.data(PRIVATE).data), true);
      });
    });
    return delivered;
  };

  module.exports = create("flow");
})();
//# sourceMappingURL=flow.js.map