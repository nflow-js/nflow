behaviours.listen = (flow)=>{
  var listenerMap = {};
  flow.on = (name=UNSET, ...args) => {
    if (name==UNSET) return listenerMap //TODO clone this!
    assert(typeof(name)!='string'
      , ERRORS.invalidListener)
    
    if (!args.length) {
      return listenerMap[name]
    }

    if (args.length==1 && args[0]==null) {
      delete listenerMap[name]
      return flow;
    }
    listenerMap[name] = args
      .filter(l=>!assert(typeof(l)!='function'
        , ERRORS.invalidListenerType, typeof(l)+": "+l)
      )
    return flow
  }

  flow.on.notifyListeners = (event)=>{
    if (listenerMap[event.name()]) {
      event.target = flow
      listenerMap[event.name()]
        .every(listener=>{
          listener.apply(event, event.data.value)
          return (event.status() == STATUS.FLOWING)
        })
      return true
    }
  }
}