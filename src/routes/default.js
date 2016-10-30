import {isDetached} from '../utils'
import {DIRECTION} from '../consts'

export default (flow) => {
  var visitedNodesMap = {}
  var route = []
  var parents = [flow].concat(flow.parents())
    .map((flow, i, arr) => ({
      flow,
      route: arr.slice(0, i + 1)
        .map(f => ({
          flow: f,
          direction: DIRECTION.UPSTREAM
        }))
    }))

  parents.forEach(f => {
      // traverse downstream on detached nodes:
    visitedNodesMap[f.flow.guid()] = true
    route.push(f)

    if (isDetached(f.flow)) {
      route = route.concat(getChildren(f.flow, f.route))
    }
  })
  return route

  function getChildren (flow, route) {
    var visited = (visitedNodesMap[flow.guid()])
    visitedNodesMap[flow.guid()] = true
    // route = route
    var nodes = visited ? [] : [{ flow, route }]
    flow.children()
      .forEach(f => {
        nodes = nodes
          .concat(getChildren(f, route
            .concat([{flow: f, direction: DIRECTION.DOWNSTREAM}]
          )))
      })
    return nodes
  }
}
