  var instance = create(DEFAULTS, "flow")

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