behaviours.emit = (flow)=>{
  
  flow.status = (...args) => {
    assert(args.length
         , ERRORS.invalidStatus)
    return flow.status.value
  }
  flow.status.value = STATUS.IDLE

  flow.direction = (...args) => {
    assert(args.length
         , ERRORS.invalidStatus)
    return flow.direction.value
  }
  flow.direction.value = flow.create.defaults.direction

  flow.emit = (name=UNSET, ...args) => {
    if (name==UNSET) {
      // emit current flow object
      emit(flow)
      return flow
    }
    if (isFlow(name)) {
      //1. reparent the passed in flow object where it's emitted from
      name.parent(flow)

      //2.  emit the passed in flow object
      emit(name)
      return flow
    }

    assert(typeof(name)!='string'
      , ERRORS.invalidEventName)
    
    var event = flow.create(name, ...args)
    emit(event)
    return event
  }

  function emit(flow){
    // 1. detach from parent
    //console.log("emitting", flow.name())
    flow.parent() 
      && flow.parent().children.detach(flow)

    // 2. reset status
    flow.emit.recipients = []
    flow.emit.recipientsMap = {}
    
    flow.emit.targets = calculateTargetList(flow, flow.direction())


    flow.status.value = STATUS.FLOWING;
    //
  }

  /**
   *  return an array of 
   */
  function calculateTargetList(flow, direction){
    //if (flow.parent() &&
      //&& !flow.parent().children.has


    var targets = getNextFlowDestination(flow, direction)


    return targets
  }

  //function get

  function flowTo(flow, destination){
    if (flow.status() != STATUS.FLOWING) return;
    notify(flow, destination)
    //console.log('next:', getNextFlowDestination(flow, destination))
    getNextFlowDestination(flow, destination)
      //.filter(f=>flow.emit.recipientMap[f.guid()]) //only deliver to a node once
      .filter(Boolean) //ignore null parents
      //TODO filter by cached listeners
      .forEach(destination=>{flowTo(flow, destination)})
  }

  function notify(flow, currentNode){
    if (flow.emit.recipientMap[currentNode.guid()] == flow.direction()) {
      // we already checked this node
      return;
    }
    flow.emit.recipients.push(currentNode)
    flow.emit.recipientMap[currentNode.guid()] = flow.direction()
    currentNode.on.notifyListeners(flow)
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
