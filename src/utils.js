/**
 *  utils
 */
function assert(condition, error, val){
  if (condition) {
    throw new Error(error
      .replace("%s", val))
  }
  return condition
}


function isFlow(flow){
  return flow 
    && flow.name
    && flow.name.isFlow
}

function isInternal(flow){
  return flow 
    && flow.name
    && flow.name.isInternal
}

function detach(flow){
  flow.parent() 
    && flow.parent().children.detach(flow)
}

function isDetached(flow){
  return !flow.parent()
    || !flow.parent().children.has(flow)
}

function flatten(array){
  return [].concat.apply([], array);
}

function merge(source, target){
  Object.keys(source).forEach(key=>{
    target[key]= source[key]
  })
}

function log(flow, name, newData, oldData){
  instance.logger 
    && instance.logger(flow, name, newData, oldData)
}

function dispatchInternalEvent(flow, name, newData, oldData){
  var e= create(DEFAULTS, "flow."+name)
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
  
  log(flow, name, newData, oldData)
}







