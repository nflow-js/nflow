import {isInternal} from './utils'
import { DEFAULTS
       , ERRORS
       , STATUS
       , DIRECTION
       , UNSET } from './consts'
import factory from './factory'

var devToolsEnabled = false
var loggers = []

function log(flow, name, newData, oldData){
  !isInternal(flow)
    && loggers.forEach(f=>f(flow, name, newData, oldData))
  
  devToolsEnabled
    && debug(flow, name, newData, oldData)
}

function debug(flow, name, d, d0){
  sendToDevTools(name, 
    {
      flow: flow.toObj(),
      name: name,
      d: d && (d.toObj? d.toObj():d),
      d0: d0 && (d0.toObj? d0.toObj():d0)
    })
}

function sendToDevTools(action, payload){
  var eventDetail = {
    action: action, 
    payload:payload
  };
  var flowEvent = new document.defaultView.CustomEvent("FlowEvent", {detail: eventDetail});
  document.dispatchEvent(flowEvent);
}


function init(flow){

  flow.enableDevTools = (enabled=true)=>{
    devToolsEnabled = enabled
    
    if (enabled) {
      debug(flow, 'start', flow, flow)
    }
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
, sendToDevTools
  }