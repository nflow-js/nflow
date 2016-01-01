import { ERRORS, UNSET, STATUS } from '../consts'
import {assert, dispatchInternalEvent} from '../utils'
import logger from '../logger'

export default (flow)=>{
  flow.on = (name=UNSET, ...args) => {
    if (name==UNSET) return flow.on.listenerMap //TODO clone this!
    assert(typeof(name)!='string'
      , ERRORS.invalidListener)
    
    if (!args.length) {
      return flow.on.listenerMap[name]
    }

    if (args.length==1 && args[0]==null) {
      dispatchInternalEvent(flow, 'listenerRemoved', name)
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
      , name)
    return flow
  }
  flow.on.listenerMap = {};

  flow.on.notifyListeners = (event)=>{
    if (flow.on.listenerMap[event.name()]) {
      event.target = flow
      flow.on.listenerMap[event.name()]
        .every(listener=>{
          listener.apply(event, event.data.value)
          return (event.status() == STATUS.FLOWING)
        })
      return true
    }
  }
}