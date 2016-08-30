import {assert, isListenerNameMatch } from '../utils'
import { ERRORS , NS_SEPARATOR} from '../consts'

export default (flow, defaults, name, data)=>{
  flow.namespace = (...args) => {
    assert(args.length, ERRORS.invalidNamespaceArgs)
    return flow.namespace.path()
      .map(f=>f.name())
      .join(NS_SEPARATOR)
  }

  flow.namespace.path = (...args)=>{
    assert(args.length, ERRORS.invalidNamespaceArgs)
    return flow
      .parents()
      .reverse()
      .concat(flow)
  }

 /*
  * Checks if the current node is within the localised ns
  */
 flow.namespace.match = (localisedNS)=>{
   assert(
       typeof(localisedNS)!='string'
     , ERRORS.invalidListener
     , localisedNS)

   let path = flow.namespace.path().reverse()
   let segments = localisedNS.split(NS_SEPARATOR).reverse()

   // early return: if the event names differ there is
   // no need to check the path
   if (!isListenerNameMatch(path[0], segments[0])) return false;

   return segments.every(segment=>{
     let foundSegment = false;
     while (path.length){
       let p = path.shift()
       if (isListenerNameMatch(p,segment)) {
          foundSegment = true
          break;
        }
     }
     return foundSegment
   })
 }

 /*
  *  resolves a global namespace to a local one, replacing
  *  generic names with specific guid-s
  */
 flow.namespace.localise = (ns)=>{
   assert(
       typeof(ns)!='string'
     , ERRORS.invalidListener
     , ns)

   let segments = ns.split(NS_SEPARATOR)
   if (segments.length>1
     && flow.parents.has(segments[0])){
     segments[0] = flow.parents.get(segments[0]).guid()
   }

   return segments.join(NS_SEPARATOR)
 }
}
