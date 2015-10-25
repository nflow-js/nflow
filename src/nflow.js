
var create = (defaults, name, data)=>{
  var flow = defaults.factory()

  defaults
    .behaviours
    .forEach((d)=>d(flow, defaults, name, data))

  
  return flow
}

var behaviours = {}