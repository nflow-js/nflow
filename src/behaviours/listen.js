import { ERRORS, UNSET, STATUS, DIRECTION_BITMASK } from '../consts'
import {assert, dispatchInternalEvent, isListenerNameMatch} from '../utils'
import logger from '../logger'

export default (flow)=>{
  flow.on = (name=UNSET, ...args) => {
    if (name===UNSET) return flow.on.listenerMap //TODO clone this!
    assert(typeof(name)!='string'
      , ERRORS.invalidListener)

    if (!args.length) {
      return flow.on.listenerMap[name]
    }

    if (args.length==1 && args[0]===null) {
      dispatchInternalEvent(flow, 'listenerRemoved', {name})
      delete flow.on.listenerMap[name]
      return flow;
    }
    var oldListeners = flow.on.listenerMap[name]
    flow.on.listenerMap[name] = args
      .filter(l=>!assert(typeof(l)!='function'
        , ERRORS.invalidListenerType, typeof(l)+": "+l)
      )
    dispatchInternalEvent(flow, oldListeners
      ? 'listenerChanged'
      : 'listenerAdded'
      , {name, handlers:args.map( d=>d.name||'function' )})
    return flow
  }
  flow.on.listenerMap = {};

  flow.on.notifyListeners = (event)=>{
    let keys = Object.keys(flow.on.listenerMap)
    let listeners = []
    event.target = flow
    keys.forEach(listenerName=>{
      let localisedListenerName = flow.namespace.localise(listenerName)
      let shouldDeliver = event.namespace.match(localisedListenerName)
      if (shouldDeliver){
        let handlers = flow.on.listenerMap[listenerName]
        listeners.push({
          name: listenerName,
          handlers: deliverToHandlers(event, handlers, flow)
        })
      }
    })
    delete event.target
    return listeners.length
      ? { flow, listeners }
      : null

  }
}

function deliverToHandlers(event, handlers, flow){
  return handlers
    .map(listener=>{
      let l = {
        listener
      }
      if (event.status() !== STATUS.FLOWING) {
        l.status = event.status()
        return l;
      }
      if (event.stopPropagation.modifiers[flow.guid.value]
        & DIRECTION_BITMASK.CURRENT) {
        l.status = 'SKIPPED'
        return l;
      }
      l.status='DELIVERED'
      listener.apply(event, event.data.value)
      return l
    })
}
