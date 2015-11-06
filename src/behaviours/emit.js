behaviours.emit = (flow)=>{
  
  flow.status = (...args) => {
    assert(args.length
         , ERRORS.invalidStatus)
    return flow.status.value
  }
  flow.status.value = STATUS.IDLE
  merge(STATUS, flow.status)
  

  flow.direction = (direction=UNSET) => {
    if (direction===UNSET) return flow.direction.value
    flow.direction.value = direction
    return flow
  }
  flow.direction.value = flow.create.defaults.direction
  merge(DIRECTION, flow.direction)

  flow.emit = (name=UNSET, ...args) => {
    if (name==UNSET) {
      // emit current flow object
      detach(flow)
      log(flow, 'emit', flow)
      flow.emit.route(flow)
      log(flow, 'emitted', flow)
      return flow
    }
    if (isFlow(name)) {
      //1. reparent the passed in flow object where it's emitted from
      name.parent(flow)

      //2.  emit the passed in flow object
      detach(flow)
      log(name, 'emit', name)
      flow.emit.route(name)
      log(name, 'emitted', name)
      return flow
    }

    assert(typeof(name)!='string'
      , ERRORS.invalidEventName)
    
    var event = flow.create(name, ...args)
    detach(event)
    log(event, 'emit', event)
    flow.emit.route(event)
    log(event, 'emitted', event)
    return event
  }

  flow.emit.route = (flow)=>{
    // 2. reset status
    flow.emit.recipients = []
    flow.emit.recipientsMap = {}
    
    flow.status.value = STATUS.FLOWING;
    
    // only keep unique recipients
    flow.emit.targets = flow.emit.route[flow.direction()](flow)
      .filter(f=>{
        if (flow.emit.recipientsMap[f.guid()]) return false
        return flow.emit.recipientsMap[f.guid()] = true
      })

    while (flow.emit.targets.length){
      var destination = flow.emit.targets.shift()
      notify(flow, destination)
    }
  }

  flow.emit.route.DEFAULT = (flow)=>{
    return flatten([flow].concat(flow.parents())
      .map((node)=>{
        if (isDetached(node)
          || !node.parent()) return [node]
          .concat(node.children.all())
        //TODO check circular deps
        return [node]
    }))}

  flow.emit.route.UPSTREAM = (flow)=>{
    return [flow].concat(flow.parents())
  }

  flow.emit.route.DOWNSTREAM = (flow)=>{
    return flatten([flow]
      .concat(flow.parent())
      .concat(flow.parent().children.all())
      .filter(Boolean)
    )}

  flow.emit.route.NONE = (flow)=>[flow, flow.parent()]

  function notify(flow, currentNode){
    if (currentNode.on.notifyListeners(flow)) {
      flow.emit.recipientsMap[currentNode.guid()] = flow.direction()
      flow.emit.recipients.push(currentNode)
    }
  }


  function getNextFlowDestination(currentNode, direction){
    return {
      NONE: [currentNode],
      UPSTREAM: [currentNode.parent()],
      DEFAULT: [currentNode.parent()],
      DOWNSTREAM: currentNode.children()
    }[direction]
  }


}
