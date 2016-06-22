import {isInternal, serialise} from './utils'
import { DEFAULTS
       , ERRORS
       , STATUS
       , DIRECTION
       , UNSET } from './consts'
import factory from './factory'

var loggers = []

function log(flow, name, newData, oldData){
  if (!isInternal(flow)){
    loggers.forEach(f=>{
      f.isRemote
        ? f.logger(remoteLog(flow, name, newData, oldData))
        : f.logger(flow, name, newData, oldData)
    })
    debug(flow, name, newData, oldData)
  }
}

function debug(flow, name, newData, oldData){
  global.__nflow_devtools_hook__ &&
  global.__nflow_devtools_hook__(
    remoteLog(flow, name, newData, oldData))
}

/**
 *  Converts a local log message(direct references) to a remote one(unmarshallable)
 */
function remoteLog(flow, name, d, d0){
  let o = {
      flow: flow.toObj('name','guid'),
      action: name
    }
  let props = ['name', 'guid']
  if (name=='start') props.push('version', 'status')
  if (name=='create') props.push('status')
  if (name=='create' && d.data()!==undefined) props.push('data')
  if (name=='emitted' ) props.push('recipients')
  let newData = (d && d.toObj? d.toObj(...props):serialise(d))
  let oldData = (d0 && d0.toObj? d0.toObj(...props):serialise(d0))
  if (newData!==undefined) o.d=newData
  if (oldData!==undefined) o.d0=oldData
  return o
}

function init(flow){
  flow.enableDevTools = (enabled=true)=>{
    console.warn('flow.enableDevtools() is now deprecated. nflow-devtools will automatically start logging when Chrome devtools is open')
    return flow
  }
  
  flow.logger = (logger=UNSET, isRemote=false) => {
    if (logger===UNSET) return loggers
    else loggers.push({logger,isRemote})
    return flow
  }
  flow.logger.reset = ()=>loggers=[];
  debug(flow, 'start', flow)
}

export default { 
  init
, log
  }
