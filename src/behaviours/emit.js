import { ERRORS
       , STATUS
       , DIRECTION
       , DIRECTION_BITMASK
       , UNSET } from '../consts'
import { merge
       , detach
       , assert
       , isFlow
       , dispatchInternalEvent } from '../utils'
import routes from '../routes'

export default (flow) => {
  flow.status = (...args) => {
    assert(args.length
         , ERRORS.invalidStatus)
    if (flow.cancel.value) return STATUS.CANCELLED
    if (flow.dispose.value) return STATUS.DISPOSED
    return flow.status.value
  }
  flow.status.set = (status) => {
    if (status === flow.status.value) return
    !flow.name.isInternal && dispatchInternalEvent(flow, 'status', status, flow.status.value)
    flow.status.value = status
  }
  flow.status.value = STATUS.IDLE
  merge(STATUS, flow.status)

  flow.direction = (direction = UNSET) => {
    if (direction === UNSET) return flow.direction.value
    let oldDirection = flow.direction.value
    flow.direction.value = direction
    dispatchInternalEvent(flow, 'direction', direction, oldDirection)
    return flow
  }
  flow.direction.value = flow.create.defaults.direction
  merge(DIRECTION, flow.direction)

  flow.emit = (name = UNSET, ...args) => {
    return emit(name, args)
  }
  flow.emit.recipients = []
  flow.emit.recipientsMap = {}
  createEmitAPI(flow)

  function emit (name = UNSET, args, direction) {
    if (name === UNSET) {
      // emit current flow object
      detach(flow)
      let p = flow.parent() || flow
      direction && flow.direction(direction)
      !flow.name.isInternal && dispatchInternalEvent(p, 'emit', flow)
      p.emit.route(flow)
      !flow.name.isInternal && dispatchInternalEvent(p, 'emitted', flow)
      return flow
    }
    if (isFlow(name)) {
      // 1. reparent the passed in flow object where it's emitted from
      name.parent(flow)
      // 2.  emit the passed in flow object
      detach(name)
      direction && name.direction(direction)
      args.length && name.data(...args)
      dispatchInternalEvent(flow, 'emit', name)
      flow.emit.route(name)
      dispatchInternalEvent(flow, 'emitted', name)
      return flow
    }

    // create and emit a new event
    assert(typeof (name) !== 'string'
      , ERRORS.invalidEventName)

    var event = flow.create(name, ...args)
    detach(event)
    if (direction) event.direction.value = direction
    dispatchInternalEvent(flow, 'emit', event)
    flow.emit.route(event)
    dispatchInternalEvent(flow, 'emitted', event)
    return event
  }

  flow.emit.route = (event) => {
    event.stopPropagation.value = false
    event.status.set(STATUS.FLOWING)

    event.emit.targets = flow.emit.route[event.direction()](event)
      .concat(event.emit.targets || [])

    while (event.emit.targets.length) {
      var destination = event.emit.targets.shift()
      if (event.isCancelled()) break
      if (event.propagationStopped()) break
      if (destination.flow.isCancelled()) continue
      notify(event, destination)
    }
    if (!event.isCancelled() && !event.propagationStopped()) {
      event.status.set(STATUS.COMPLETED)
    }
  }

  Object.keys(routes).forEach(route => {
    flow.emit.route[route] =
    flow.emit.route[route.toUpperCase()] =
      routes[route]
  })

  function notify (flow, currentNode) {
    // only deliver once per node
    if (flow.emit.recipientsMap[currentNode.flow.guid()]) return
    if (isUnreachable(flow, currentNode)) return
    flow.emit.recipientsMap[currentNode.flow.guid()] = flow.direction()
    let result = currentNode.flow.on.notifyListeners(flow)
    if (result) {
      result.route = currentNode.route
      result.direction = flow.direction()
      flow.emit.recipients.push(result)
    }
  }

  function isUnreachable (flow, destination) {
    let modifiers = Object.keys(flow.stopPropagation.modifiers)
    if (!modifiers.length) return false

    let routeMap = destination.route.reduce((i, route) => {
      i[route.flow.guid()] |= DIRECTION_BITMASK[route.direction]
      return i
    }, {})

    return modifiers.some(guid => {
      return routeMap[guid] === flow.stopPropagation.modifiers[guid]
    })
  }

/*!
 *  create directional (eg. `flow.emit.dowsntream(...)`) API
 */
  function createEmitAPI (flow) {
    Object.keys(DIRECTION)
    .forEach(direction => {
      flow.emit[direction] =
      flow.emit[direction.toLowerCase()] =
        (name, ...args) => emit(name, args, direction)
    })
  }
}
