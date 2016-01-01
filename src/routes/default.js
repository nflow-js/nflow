import {isDetached} from '../utils'
export default (flow)=>{
  var visitedNodesMap = {}
  var route = []
  var parents = [flow].concat(flow.parents())
    .map((flow,i,arr)=>({
      flow,
      route: arr.slice(0,i)
    }))
  
  parents.forEach(f=>{
      // traverse downstream on detached nodes:
      if (isDetached(f.flow)) {
        route = route.concat(getChildren(f.flow, f.route.reverse()))
      }
      else  {
        visitedNodesMap[f.flow.guid()] = true
        var r = [f.flow].concat(f.route.reverse())
        route.push({ flow:f.flow, route:r})
      }
    })
  return route;
  function getChildren(flow, route){
    var visited = (visitedNodesMap[flow.guid()])
    visitedNodesMap[flow.guid()] = true
    route = [flow].concat(route)
    var nodes = visited? []:[{ flow, route }]
    flow.children()
      .forEach(f=>nodes = nodes.concat(getChildren(f,route)))
    return nodes
  }
}


