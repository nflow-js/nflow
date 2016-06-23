import {assert, detach, dispatchInternalEvent, isFlow} from '../utils'
import { ERRORS, UNSET } from '../consts'

export default (flow)=>{
  
  /**
   *  .children() API
   */
  flow.children = (...args) => {
    assert(args.length, ERRORS.invalidChildren)
    return flow.children.value.concat()
  }
  flow.children.value = []

  flow.children.has = (matcher, recursive)=>flow.children.find(matcher, recursive)!=null
  flow.children.find = (matcher, recursive)=>flow.children.findAll(matcher, recursive).pop()
  flow.children.findAll = (matcher, recursive)=>{

    var filter = matcher;
    if (matcher==null) return []
    if (typeof(matcher)=="string") filter = f=>f.name()==matcher
    else if (isFlow(matcher)) filter = f=>f==matcher
    var children = recursive 
      ? flow.children.all()
      : flow.children()
    
    return children.filter(filter)
  }

  flow.get = flow.children.find
  flow.getAll = flow.children.find

  /**
   *  return all children recursively
   */
  flow.children.all = (...args)=>{
    assert(args.length, ERRORS.invalidChildren)
    var childMap = {}
    return getChildren(flow)

    function getChildren(flow){
      if (childMap[flow.guid()]) return [];
      childMap[flow.guid()] = true
      var c = flow.children.value
      var gc = flow.children.value.map(getChildren)
      
      return c.concat.apply(c, gc);
    }

  }

  /**
   *  .parent() API
   */
  flow.parent = (...parentArgs) => {
    if (!parentArgs.length) return flow.parent.value;
    var parent = parentArgs[0]
    parent && assert(!isFlow(parent), ERRORS.invalidParent, parent)
    var previousParent = flow.parent() 
    detach(flow)
    dispatchInternalEvent(flow, 'parent', parent, previousParent)
    attach(parent)
    dispatchInternalEvent(flow, 'parented', parent, previousParent)
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

  flow.parents.find = (matcher)=>{
    if (matcher==null) return null
    var filter = matcher
    if (typeof(matcher)=="string") filter = f=>f.name()==matcher
    else if (isFlow(matcher)) filter = f=>f==matcher

    return flow.parents()
      .filter(filter)
      .pop()
  }
  flow.parents.has = (matcher)=>(
    !!flow.parents.find(matcher)
  )

  flow.parents.root = (...args)=>{
    assert(args.length, ERRORS.invalidRoot)
    return flow
      .parents()
      .pop()
  }

  flow.children.detach = (child)=>{
    flow.children.value = 
      flow.children.value
        .filter(f=>f!=child)
  }
  
  flow.target = flow

  function attach(parent) {
    parent && parent.children.value.push(flow)
    flow.parent.value = parent
  }

}
