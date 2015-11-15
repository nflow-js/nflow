behaviours.cancellable = (flow, defaults, name)=>{
  
  flow.cancel = (...args) => {
    assert(args.length
         , ERRORS.invalidCancelArgs)
    dispatchInternalEvent(flow, 'cancel', true)
    flow.status.value = STATUS.CANCELLED
    return flow
  }

  flow.isCancelled = () => {
    return [flow]
      .concat(flow.parents())
      .some(e=>e.status.value == STATUS.CANCELLED)
  }

  flow.stopPropagation = (...args) => {
    assert(args.length
         , ERRORS.invalidStopPropagationArgs)
    flow.status.value = STATUS.STOPPED
    dispatchInternalEvent(flow, 'propagationStopped', true)
    return flow
  }

  flow.propagationStopped = () => {
    return flow.status.value == STATUS.STOPPED
  }


  

}