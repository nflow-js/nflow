behaviours.connect = (flow)=>{
  flow.parent = (parent=UNSET) => {
    if (parent===UNSET) return flow.parent.value;
    parent && assert(!isFlow(parent), ERRORS.invalidParent, parent)
    flow.parent()
      && flow.parent().children.detach(flow)
    attach(parent)  
    return flow
  }
  
  flow.parents = (...args)=>{
    assert(args.length, ERRORS.invalidParents)
    var parentMap = {}
    var parents = []
    var p = flow.parent()
    while (p && !parentMap[p.guid()]){
      parents.push(p)
      parentMap[p.guid()]=true
      p = p.parent()
    }
    return parents 
  }

  flow.children = (...args) => {
    assert(args.length, ERRORS.invalidChildren)
    return flow.children.value.concat()
  }
  flow.children.value = []


  flow.children.detach = (child)=>{
    flow.children.value = 
      flow.children.value
        .filter(f=>f!=child)
  }

  function attach(parent) {
    parent && parent.children.value.push(flow)
    flow.parent.value = parent
  }

}