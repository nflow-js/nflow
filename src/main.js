(() =>{
  const UNSET =   {}
      , PRIVATE = {}
      , FLOW =    {}
      , DEFAULT =     'DEFAULT'
      , UPSTREAM =    'UPSTREAM'
      , DOWNSTREAM =  'DOWNSTREAM'

  var matcher = (flow,name) => (flow.name()==name)
  var id = 0
  var create = (name, ...data) =>{
    var state = {
          children :   []
        , listenerMap: {}
        , matcher:     matcher
        , parent:      null
        , name:        null
        , data:        []
        , cancelled:   false
        , direction:   DEFAULT
        , id :         id++
      }
      , flow = {}

    flow.create = (name, ...data) => {
      var instance = create(name, ...data)
      instance.direction(flow.direction())
      instance.parent(flow)
      return instance
    }

    flow.parent = (parent=UNSET) => {
      if (parent===UNSET) return state.parent;
      
      if (parent && !isFlow(parent)){
        throw new Error('Invalid Argument. flow.parent(arg) accepts a flow object or null')
        return
      }
      
      detach(flow)
      attach(flow, parent)
      return flow
    }

    flow.parents = (...args) => {
      if (args.length) {
        throw new Error('Invalid Argument. Please use child.parent(parent) to re-parent flow objects')
      }
      var parentMap = {}
      var parents = []
      var p = flow.parent()
      while (p && !parentMap[p.data(PRIVATE).id]){
        parents.push(p)
        parentMap[p.data(PRIVATE).id]=true
        p = p.parent()
      }
      return parents
    }
    
    flow.name = (name=UNSET) => {
      if (name===UNSET) return state.name
      return state.name = name, flow
    }
    
    flow.matcher = (matcher=UNSET) => {
      if (matcher===UNSET) return state.matcher
      return state.matcher = matcher, flow
    }

    flow.direction = (direction=UNSET) => {
      if (direction===UNSET) return state.direction
      return state.direction = direction, flow
    }
    flow.direction.DEFAULT = DEFAULT
    flow.direction.UPSTREAM = UPSTREAM
    flow.direction.DOWNSTREAM = DOWNSTREAM

    flow.children = (...args) => {
      if (args.length) {
        throw new Error('Invalid Argument. Please use child.parent(parent) to re-parent flow objects')
      }
      return state.children.concat()
    }

    flow.data = (...data) => {
      if (!data.length) {
        return (state.data.length<=1)
          ? state.data[0]
          : state.data
      }
      if (data[0]==PRIVATE) return state 
      if (data[0]==FLOW) return FLOW
      return state.data = data, flow
    }

    flow.emit = (name=UNSET, ...data) => {
      var instance = (name==UNSET)
        ? flow
        : flow.create(name,...data)
      emit(instance)
      return flow
    }

    /**
     *  .on('foo', handler1, handler2, :phase)
     */ 
    flow.on = (name=UNSET, ...listeners) => {
      var phaseMarker = listeners.concat().pop()
      var phase = DEFAULT
      if (phaseMarker===DEFAULT
        || phaseMarker===UPSTREAM
        || phaseMarker===DOWNSTREAM ){
        phase = phaseMarker
        listeners.pop()
      }

      if (name===UNSET) {
        throw new Error('Invalid Argument. Please use .on("name", ...listener) to add listeners')
        return;
      }
      if (!listeners.length){
        return state.listenerMap[name]
          ? state.listenerMap[name][phase].concat()
          : []
      }
      
      if (!state.listenerMap[name]){
        var l = state.listenerMap[name] = {}
        l[DEFAULT]=  []
        l[UPSTREAM]= []
        l[DOWNSTREAM]=   []
      }
      state.listenerMap[name][phase] = listeners
        .filter(l=>l && l.call)

      return flow
    }

    flow.cancel = (cancelled=true) => {
      return state.cancelled = cancelled, flow
    }

    flow.cancelled = (cancelled=UNSET) => {
      if (cancelled===UNSET) return state.cancelled
      return flow.cancel(cancelled)
    }

    flow.name(name)
    flow.data(...data)
    return flow

  }

  /**
   *  Utils
   */
  var detach = (flow) => {
    var parent = flow.parent()
    if (!isFlow(parent)) return;
    
    var state = parent.data(PRIVATE)
    state.children = 
      state.children
        .filter(f=>f!=flow)
  }
  
  var attach = (flow, parent) => {
    
    isFlow(parent) 
      && parent.data(PRIVATE)
          .children.push(flow)
    
    flow.data(PRIVATE)
      .parent = parent
  }

  var isFlow = (flow) => (
    flow && flow.data(FLOW)==FLOW)

  var emit = (flow) => {
    var processed = {}
    flow.recipients = []
    var deliver = direction => p => {
      var id = p.data(PRIVATE).id
      //console.log('checking', p.name(), id)
      if (direction===DEFAULT && processed[id]) return;
      var dispatched = dispatch(flow, direction, p)
      if (dispatched) flow.recipients.push(p)
      processed[id] = true
      return !flow.cancelled()
    }

    var parents = flow.parents()
    //console.log('parents', parents.map(p=>p.name()))
    // 1. bubble up - only if direction is DEFAULT or upstream
    //console.log('flow.direction()', flow.direction())
    if (flow.direction()==DEFAULT
      || flow.direction()==UPSTREAM) {
      parents.every(deliver(DEFAULT))
      parents.every(deliver(UPSTREAM))
    }

    // 2. flow down - only if direction is DEFAULT or downstream
    if (flow.cancelled()) return;
    // create breadth first list
    if (flow.direction()==DEFAULT
      || flow.direction()==DOWNSTREAM) {

      var root = flow.direction()==DOWNSTREAM
        ? flow.parent()
        : parents.pop()
      var recipients = flatten([root])
      //console.log('flattened:', recipients.map(p=>p.name()))
      recipients.every(node=>{
        deliver(DEFAULT)(node)
        deliver(DOWNSTREAM)(node)
        return !flow.cancelled()
      })
    }
  }

  var flatten = node => {
    var nodes = [node]
    //console.log('nodes', nodes)
    for (var i=0;i<nodes.length;i++) {
      var children = nodes[i]
      //console.log('children', children)
      children.forEach(f=>{
        //console.log('f',f)
        nodes = nodes.concat([f.children()])
      })
    }
    //console.log('nodes final:', nodes)
    return [].concat.apply([],nodes)
  }

  var dispatch = (flow, phase, recipient) => {
    var state = recipient.data(PRIVATE)
    var delivered = false
    //console.log('dispatching on', recipient.name(),state.listenerMap)
    Object.keys(state.listenerMap)
      .every(key=>{
        //console.log('matching', flow.name(), '<->', key, ':', state.matcher(flow, key))
        if (!state.matcher(flow, key)) return false;
        var l = state.listenerMap[key]
        var listeners = l[phase]
        //console.log('listeners', listeners)
        return listeners.every(f=>{
          
          if (flow.cancelled()) return false

          delivered = true
          //console.log('ok, dispatching', flow.name(),'to', recipient.name() ,'with', flow.data())
          return f.apply(flow, flow.data(PRIVATE).data), true
        })

      })
    return delivered
  }





  module.exports = create('flow')

})()