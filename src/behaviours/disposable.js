import {assert, dispatchInternalEvent} from '../utils'
import { ERRORS } from '../consts'


export default (flow, defaults)=>{

  flow.dispose = (...args) => {
    assert(args.length
         , ERRORS.invalidDisposeArgs)
    if (flow.dispose.value == true) return;

    //recursively(depth first) dispose all downstream nodes
    flow.children().forEach(f=>f.dispose())

    dispatchInternalEvent(flow, 'dispose', true)
    flow.parent(null)
    flow.dispose.value = true
    flow.on.listenerMap = {}

    return flow
  }
  flow.dispose.value = false


}
