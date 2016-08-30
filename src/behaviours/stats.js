/* globals VERSION */
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
    let previousStats = flow.stats.value
    /*jshint ignore:start*/
    flow.stats.value = {...flow.stats.value, ...d}
    /*jshint ignore:end*/
    dispatchInternalEvent(flow, 'stats', flow.stats.value, previousStats)
    return flow
  }

  flow.stats.value = {
    ignore: false, // do not track this node
    collapsed: false
  }

  flow.version = VERSION


}
