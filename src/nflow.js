(()=>{
  const UNSET = {}
  var create = (parent, name, ...data)=>{
    
    var flow = parent && parent.create.defaultConstructor||{}
      , behaviours = parent && parent.create.defaultBehaviours||[
          identity,
          connection,
          interaction
        ]

    return flow
  }
  
  var guid = 0
  var defaultBehaviours = {}

  defaultBehaviours.identity = (flow)=>{

    var _name;
    flow.name = (name=UNSET) => {
      if (name===UNSET) return _name
      return _name = name, flow
    }
    
    var _guid = guid++
    flow.guid = (...args) => {
      if (args.length) {
        throw new Error('Invalid Argument. Guid-s are immutable. Please use the .name() API to change the name of a flow object')
      }
      return _guid
    }


  }

  defaultBehaviours.connection = (flow)=>{

    var _behaviours;
    flow.behaviours = (behaviours=UNSET) => {
      if (behaviours===UNSET) return _behaviours
      return _behaviours = behaviours, flow
    }
  }



  module.exports = create(null, "flow", {})
})()
