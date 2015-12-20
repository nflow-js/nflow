import { DEFAULTS
       , ERRORS
       , STATUS
       , DIRECTION
       , UNSET } from '../consts'

import logger from '../logger'
import {assert} from '../utils'

var guid = 0
export default (flow, defaults, name)=>{
  
  flow.guid = (...args) => {
    assert(args.length
         , ERRORS.invalidGuid)
    return flow.guid.value
  }
  flow.guid.value = ""+guid++

  flow.name = (name=UNSET) => {
    if (name===UNSET) return flow.name.value
    assert(typeof(name)!="string"
         , ERRORS.invalidName, name)
    var previousName = flow.name.value
    flow.name.value = name
    logger.dispatchInternalEvent(flow, 'name', name, previousName)
    return flow
  }
  flow.name.value = name || flow.guid()
  flow.name.isFlow = true
  flow.name.isInternal = false

  flow.call = (...functions)=>{
    functions
      .filter(f=>typeof(f)=='function')
      .forEach(f=>f(flow))
  }

}