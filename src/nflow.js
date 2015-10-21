(()=>{
  const UNSET = {}
  var create = (parent, name, ...data)=>{
    
    var flow = parent.create.defaultConstructor
    
    parent.create
      .defaultBehaviours
      .forEach((d)=>d(flow))

    return flow
  }
  
  /**
   *  behaviours
   */
  var guid = 0
  var defaultBehaviours = {}
  defaultBehaviours.identity = (flow)=>{
    var _name;
    flow.name = (name=UNSET) => {
      if (name===UNSET) return _name
      return _name = name, flow
    }
    
    var _guid = guid++
    flow.guid = (...args) => {
      if (args.length) {
        throw new Error(ERRORS.invalidGuid)
      }
      return _guid
    }
  }

  defaultBehaviours.connection = (flow)=>{
    var _parent;
    flow.parent = (parent=UNSET) => {
      if (parent===UNSET) return _parent
      //detach(flow)
      //attach(flow, parent)  
      return _parent = parent, flow
    }
    
    var _children;
    flow.children = (...args) => {
      assert(args.length, ERRORS.invalidGuid)
      return _children.concat()
    }

  }
  
  defaultBehaviours.interaction = (flow)=>{
    var _listeners;
    flow.on = (name=UNSET, ...args) => {
      if (name==UNSET) return _listeners.concat()
      assert(typeof(name)!='string'
        , ERRORS.invalidListener)
      
      if (!args.length) {
        delete _listeners[name]
        return;
      }
      args.some(
        (l)=>assert(typeof(l)!='function'
          , ERRORS.invalidListener)
      )
      _listeners[name] = args
    }
  }

  function assert(condition, error){
    if (condition) {
      throw new Error(error)
    }
    return condition
  }

  const ERRORS = {
    invalidGuid:     'Invalid Argument. Guid-s are immutable. Please use the .name() API to change the name of a flow object',
    invalidChildren: 'Invalid Argument. Please use child.parent(parent) to re-parent flow objects',
    invalidListener: 'Invalid Arguments. Please use .on("foo", handler) to create a listener'
  }

  module.exports = create(null, "flow", {})
})()
