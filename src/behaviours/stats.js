import logger from '../logger'
import {assert, dispatchInternalEvent} from '../utils'
import { DEFAULTS
       , ERRORS
       , DIRECTION
       , UNSET } from '../consts'


export default (flow, defaults)=>{

  flow.stats = (d) => {
    if (d===undefined) return flow.stats.value
    assert(typeof(d)!=='object'
         , ERRORS.invalidStatsArgs)
    flow.stats.value = {...flow.stats.value, ...d}
    return flow
  }

  flow.stats.value = {
    ignore: false, // do not track this node
    collapsed: false
  }

  flow.version = VERSION


}
