import logger from '../logger'
import {assert, dispatchInternalEvent} from '../utils'
import { DEFAULTS
       , ERRORS
       , STATUS
       , DIRECTION
       , UNSET } from '../consts'


export default (flow, defaults)=>{

  flow.stats = (...args) => {
    assert(args.length
         , ERRORS.invalidStatsArgs)
    
    return flow.stats.value
  }
  flow.stats.value = {
    
  }

  flow.version = VERSION


}