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