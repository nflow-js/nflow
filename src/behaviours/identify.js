var guid = 0
behaviours.identify = (flow, defaults, name)=>{
  
  flow.guid = (...args) => {
    assert(args.length
         , ERRORS.invalidGuid)
    return flow.guid.value
  }
  flow.guid.value = ""+guid++

  flow.name = (name=UNSET) => {
    if (name===UNSET) return flow.name.value
    assert(typeof(name)!="string"
         , ERRORS.invalidName, name)
    return flow.name.value = name, flow
  }
  flow.name(name || flow.guid())
  flow.name.isFlow = true
  flow.name.isInternal = false

}