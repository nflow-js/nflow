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

function isDetached(flow){
  return flow.parent()
    && !flow.parent().children.has(flow)
}

function flatten(array){
  return [].concat.apply([], array);
}