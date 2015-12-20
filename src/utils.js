import factory from './factory'
import { DEFAULTS
       , ERRORS
       , STATUS
       , DIRECTION
       , UNSET } from './consts'
import logger from './logger'
/**
 *  utils
 */
export function assert(condition, error, val){
  if (condition) {
    throw new Error(error
      .replace("%s", val))
  }
  return condition
}

export function isFlow(flow){
  return flow 
    && flow.name
    && flow.name.isFlow
}

export function isInternal(flow){
  return flow 
    && flow.name
    && flow.name.isInternal
}

export function detach(flow){
  flow.parent() 
    && flow.parent().children.detach(flow)
}

export function isDetached(flow){
  return !flow.parent()
    || !flow.parent().children.has(flow)
}

export function flatten(array){
  return [].concat.apply([], array);
}

export function merge(source, target){
  Object.keys(source).forEach(key=>{
    target[key]= source[key]
  })
}

export function dispatchInternalEvent(flow, name, newData, oldData){
  var e= factory(DEFAULTS, "flow."+name)
  e.name.isInternal = true
  e.data.value = [newData, oldData]
  e.direction.value= DIRECTION.NONE
  e.parent.value = flow
  e.emit()
  e.data.value = [flow, newData, oldData]
  e.direction.value= DIRECTION.UPSTREAM
  e.name.value="flow.children."+name
  e.emit()
  
  e.direction.value= DIRECTION.DOWNSTREAM
  e.name.value="flow.parent."+name
  e.emit()
  
  logger.log(flow, name, newData, oldData)
}