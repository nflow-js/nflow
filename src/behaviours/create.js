import factory from '../factory'
import logger from '../logger'
import {assert, dispatchInternalEvent} from '../utils'
import { DEFAULTS
       , ERRORS
       , STATUS
       , DIRECTION
       , UNSET } from '../consts'


export default (flow, defaults)=>{

  flow.create = (name, ...data) => {
    
    var instance = flow.get(name)
    if (instance){
      instance.data(...data)
      return instance
    }
    instance = factory(flow.create.defaults, name, data)
    instance.parent.value = flow
    flow.children.value.push(instance)
    dispatchInternalEvent(flow, 'create', instance)
    return instance
  }

  flow.create.defaults = {
    factory: defaults.factory,
    behaviours: defaults.behaviours.concat(),
    direction: defaults.direction

  }

  flow.dispose = (...args) => {
    assert(args.length
         , ERRORS.invalidDisposeArgs)
    if (flow.status.value == STATUS.DISPOSED) return;
    
    dispatchInternalEvent(flow, 'dispose', true)
    flow.parent(null)
    flow.status.value = STATUS.DISPOSED
    flow.on.listenerMap = {}
    
    //recursively dispose all downstream nodes
    flow.children().forEach(f=>f.dispose())
    return flow
  }


}