(()=>{

  var create = (defaults, name, ...data)=>{
    var flow = defaults.constructor()

    defaults
      .behaviours
      .forEach((d)=>d(flow))

    return flow
  }
  


   /**
   *  behaviours
   */
  var behaviours = {}
  
  /**
   *  behaviours.identity
   */
  var guid = 0
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

    flow.name.isFlow = true
  }

  defaultBehaviours.stateful = (flow)=>{
    var _data;
    flow.data = (...data) => {
    if (!data.length) {
      return (_data.length<=1)
        ? _data[0]
        : _data
      }
    return _data = data, flow
    }
  }

  /**
   *  behaviours.connection
   */
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
  
  /**
   *  behaviours.listener
   */
  defaultBehaviours.listener = (flow)=>{
    var _listeners;
    flow.on = (name=UNSET, ...args) => {
      if (name==UNSET) return _listeners.concat()
      assert(typeof(name)!='string'
        , ERRORS.invalidListener)
      
      if (!args.length) {
        delete _listeners[name]
        return;
      }
      
      _listeners[name] = args
        .filter(l=>!assert(typeof(l)!='function'
          , ERRORS.invalidListener)
        )
    }
  }
  

  /**
   *  behaviours.dispatcher
   */
  defaultBehaviours.dispatcher = (flow)=>{
    
    flow.emit = (name=UNSET, ...args) => {
      if (name==UNSET) {
        //TODO emit current flow object
      }
      if (isFlow(name))

      assert(typeof(name)!='string'
        , ERRORS.invalidEventName)
      
      if (args.length) {
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


  /**
   *  utils
   */
  function assert(condition, error){
    if (condition) {
      throw new Error(error)
    }
    return condition
  }


  /**
   *  consts
   */
  const UNSET = {}
  const DEFAULTS = {
    proto: ()=>{},
    constructor:[
      behaviours.identity,
      behaviours.stateful,
      behaviours.connection,
      behaviours.dispatcher,
      behaviours.listener
    ]
  }
  const ERRORS = {
    invalidGuid:     'Invalid Argument. Guid-s are immutable. Please use the .name() API to change the name of a flow object',
    invalidChildren: 'Invalid Argument. Please use child.parent(parent) to re-parent flow objects',
    invalidListener: 'Invalid Arguments. Please use .on("foo", handler) to create a listener'
    invalidEventName:'Invalid Arguments. Please use .emit("foo", payload) to emit a flow event'
  }

  module.exports = create(DEFAULTS, "flow")
})()
