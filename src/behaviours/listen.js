behaviours.listen = (flow)=>{
  var listenerMap = {};
  flow.on = (name=UNSET, ...args) => {
    if (name==UNSET) return listenerMap //TODO clone this!
    assert(typeof(name)!='string'
      , ERRORS.invalidListener)
    
    if (!args.length) {
      return listenerMap[name] //TODO clone this
    }

    if (args.length==1 && args[0]==null) {
      delete listenerMap[name]
      return flow;
    }
    listenerMap[name] = args
      .filter(l=>!assert(typeof(l)!='function'
        , ERRORS.invalidListener)
      )
    //console.log("adding listener", name, 'to', flow.name(), flow.guid())
    return flow
  }

  flow.on.notifyListeners = (event)=>{
    //console.log("notifying", event.name(), 'to', flow.name(), flow.guid())
    if (listenerMap[event.name()]) {
      listenerMap[event.name()]
        .every(listener=>{
          listener(...event.data.value)
          return (flow.status() == STATUS.FLOWING)
        })
    }
  }


  //TODO cache listeners
}