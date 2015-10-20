(()={
  const UNSET = {}

  var create = (flow, name, ...data)=>{
    
    // behaviours
    var behaviours = {}
    behaviours.core = {}
    behaviours.flow = {}

    // public API
    flow.create = (name, ...data)=>{}
    flow.parent = (parent=UNSET)=>{}

  }
  module.exports = create("flow")
})()