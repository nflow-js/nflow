  var instance = create(DEFAULTS, "flow")

  instance.enableDevTools = (enableDevTools=UNSET) => {
    if (direction===UNSET) return instance.enableDevTools.value
    instance.enableDevTools.value = enableDevTools
    if (enableDevTools) {
      sendToDevTools('start', {
        name: flow.name.value, 
        id: flow.guid.value
      })
    }
    return flow
  }
  instance.enableDevTools.value = false

  instance.logger = (logger) => {
    instance.logger.value.push(logger)
  }
  instance.logger.value = []

  if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], ()=>instance);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = instance;
    } else {
        // Browser globals ("this" is window)
        scope["this"].flow = instance
    }
}({this}))