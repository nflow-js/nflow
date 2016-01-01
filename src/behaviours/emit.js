import { DEFAULTS
       , ERRORS
       , STATUS
       , DIRECTION
       , UNSET } from '../consts'

import {merge, detach, flatten, assert, isDetached, isFlow} from '../utils'
import logger from '../logger'
import * as routes from '../routes'

var log = logger.log
export default (flow)=>{
  
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

  flow.emit = (name=UNSET, ...args)=>{
    return emit(name, args)
  }
  createEmitAPI(flow)

  function emit(name=UNSET, args, direction){
    if (name==UNSET) {
      // emit current flow object
      detach(flow)
      direction && flow.direction(direction)
      log(flow, 'emit', flow)
      flow.emit.route(flow)
      log(flow, 'emitted', flow)
      return flow
    }
    if (isFlow(name)) {
      //1. reparent the passed in flow object where it's emitted from
      name.parent(flow)
      //2.  emit the passed in flow object
      detach(name)
      direction && name.direction(direction)
      log(name, 'emit', name)
      flow.emit.route(name)
      log(name, 'emitted', name)
      return flow
    }

    assert(typeof(name)!='string'
      , ERRORS.invalidEventName)
    
    var event = flow.create(name, ...args)
    detach(event)
    direction && event.direction(direction)
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
        if (flow.emit.recipientsMap[f.flow.guid()]) return false
        return flow.emit.recipientsMap[f.flow.guid()] = true
      })

    while (flow.emit.targets.length){
      var destination = flow.emit.targets.shift()
      if (flow.isCancelled()) break;
      if (flow.propagationStopped()) break;
      if (destination.flow.isCancelled()) continue;
      notify(flow, destination)
    }
  }
  
  flow.emit.route.DOWNSTREAM = routes.downstream
  flow.emit.route.UPSTREAM = routes.upstream
  flow.emit.route.DEFAULT = routes.default
  flow.emit.route.NONE = routes.none
  
  function notify(flow, currentNode){
    if (currentNode.flow.on.notifyListeners(flow)) {
      flow.emit.recipientsMap[currentNode.flow.guid()] = flow.direction()
      flow.emit.recipients.push(currentNode)
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

