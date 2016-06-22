import { DEFAULTS
       , ERRORS
       , STATUS
       , DIRECTION
       , UNSET } from '../consts'
import factory from '../factory'
import {merge, detach, flatten, assert, isDetached, isFlow, dispatchInternalEvent} from '../utils'
import logger from '../logger'
import * as routes from '../routes'

var log = logger.log
export default (flow)=>{
  
  flow.status = (...args) => {
    assert(args.length
         , ERRORS.invalidStatus)
    if (flow.cancel.value) return STATUS.CANCELLED
    if (flow.dispose.value) return STATUS.DISPOSED
    return flow.status.value
  }
  flow.status.value = STATUS.IDLE
  merge(STATUS, flow.status)
  

  flow.direction = (direction=UNSET) => {
    if (direction===UNSET) return flow.direction.value
    let oldDirection = flow.direction.value
    flow.direction.value = direction
    dispatchInternalEvent(flow, 'direction', direction, oldDirection)
    return flow
  }
  flow.direction.value = flow.create.defaults.direction
  merge(DIRECTION, flow.direction)

  flow.emit = (name=UNSET, ...args)=>{
    return emit(name, args)
  }
  createEmitAPI(flow)

  function emit(name=UNSET, args, direction){
    if (name==UNSET) {
      // emit current flow object
      detach(flow)
      direction && flow.direction(direction)
      !flow.name.isInternal && dispatchInternalEvent(flow.parent(), 'emit', flow)
      flow.emit.route(flow)
      !flow.name.isInternal && dispatchInternalEvent(flow.parent(), 'emitted', flow)
      return flow
    }
    if (isFlow(name)) {

      //1. reparent the passed in flow object where it's emitted from
      name.parent(flow)
      //2.  emit the passed in flow object
      detach(name)
      direction && name.direction(direction)
      name.data(...args)
      dispatchInternalEvent(flow, 'emit', name)
      flow.emit.route(name)
      dispatchInternalEvent(flow, 'emitted', name)
      return flow
    }

    // create and emit a new event
    assert(typeof(name)!='string'
      , ERRORS.invalidEventName)
    

    var event = flow.create(name, ...args)    
    detach(event)
    if (direction) event.direction.value = direction
    dispatchInternalEvent(flow, 'emit', event)
    flow.emit.route(event)
    dispatchInternalEvent(flow, 'emitted', event)
    return event
  }
  
  flow.emit.route = (flow)=>{
    // 2. reset status
    flow.emit.recipients = []
    flow.emit.recipientsMap = {}
    
    flow.status.value = STATUS.FLOWING;
    
    // only keep unique recipients
    flow.emit.targets = flow.emit.route[flow.direction()](flow)
      .filter(f=>!flow.emit.recipientsMap[f.flow.guid()])

    while (flow.emit.targets.length){
      var destination = flow.emit.targets.shift()
      if (flow.isCancelled()) break;
      if (flow.propagationStopped()) break;
      if (destination.flow.isCancelled()) continue;
      notify(flow, destination)
    }
    if (!flow.isCancelled() && !flow.propagationStopped()) {
      flow.status.value = STATUS.COMPLETED
    }
  }
  
  Object.keys(routes).forEach(route=>{
    flow.emit.route[route] 
      = flow.emit.route[route.toUpperCase()] 
      = routes[route]
  })
  
  function notify(flow, currentNode){
    //if (unreachable(flow, currentNode)) return;
    let result = currentNode.flow.on.notifyListeners(flow)
    if (result){
      result.route = currentNode.route
      result.direction = flow.direction()
      flow.emit.recipientsMap[currentNode.flow.guid()] = flow.direction()
      flow.emit.recipients.push(result)
      
    }
  }

  /** 
   *  create directional (eg. `flow.emit.dowsntream(...)`) API
   */
function createEmitAPI(flow){
  Object.keys(DIRECTION)
    .forEach(direction=>{
      flow.emit[direction] 
        = flow.emit[direction.toLowerCase()]
        = (name, ...args)=>{
        return emit(name,args, direction)
      }
    })
  }

}

