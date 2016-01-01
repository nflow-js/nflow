import { DEFAULTS
       , ERRORS
       , STATUS
       , DIRECTION
       , UNSET } from '../consts'
import {assert, detach, dispatchInternalEvent} from '../utils'

export default (flow, defaults, name)=>{
  
  flow.cancel = (...args) => {
    assert(args.length
         , ERRORS.invalidCancelArgs)
    flow.status.value = STATUS.CANCELLED
    dispatchInternalEvent(flow, 'cancel', true)
    return flow
  }

  flow.isCancelled = () => {
    return [flow]
      .concat(flow.parents())
      .some(e=>e.status.value == STATUS.CANCELLED
          || e.status.value == STATUS.DISPOSED
        )
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