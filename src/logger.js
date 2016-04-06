import {isInternal} from './utils'
import { DEFAULTS
       , ERRORS
       , STATUS
       , DIRECTION
       , UNSET } from './consts'
import factory from './factory'

var loggers = []

function log(flow, name, newData, oldData){
  if (!isInternal(flow)){
    loggers.forEach(f=>f(flow, name, newData, oldData))
    debug(flow, name, newData, oldData)
  }
}

function debug(flow, name, d, d0){
  global.__nflow_devtools_hook__ &&
  global.__nflow_devtools_hook__(
    {
      flow: flow.toObj(),
      name: name,
      d: d && (d.toObj? d.toObj():d),
      d0: d0 && (d0.toObj? d0.toObj():d0)
    })
}

function init(flow){
  
  flow.enableDevTools = (enabled=true)=>{
    debug(flow, 'start', flow, flow)
    
    console.warn('flow.enableDevtools() is now deprecated. nflow-devtools will automatically start logging when Chrome devtools is open')
    return flow
  }
  

  flow.logger = (logger=UNSET) => {
    if (logger===UNSET) return loggers
    loggers.push(logger)
    return flow
  }

}


export default { 
  init
, log
  }
