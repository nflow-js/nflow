import { ERRORS
       , STATUS
       , DIRECTION
       , DIRECTION_BITMASK
       , UNSET } from '../consts'
import { merge
       , detach
       , assert
       , isFlow
       , getLocalName
       , dispatchInternalEvent } from '../utils'
import routes from '../routes'

export default (flow) => {
  /**
   * return the current status of the node
   * @readonly
   * @return {STATUS} The current status of the node
   */
  flow.status = (...args) => {
    assert(args.length
         , ERRORS.invalidStatus)
    if (flow.cancel.value) return STATUS.CANCELLED
    if (flow.dispose.value) return STATUS.DISPOSED
    return flow.status.value
  }

  /**
   * @internal
   * @param {STATUS} The new status of the node
   */
  flow.status.set = (status) => {
    if (status === flow.status.value) return
    !flow.name.isInternal && dispatchInternalEvent(flow, 'status', status, flow.status.value, true)
    flow.status.value = status
  }
  flow.status.value = STATUS.IDLE
  merge(STATUS, flow.status)

  /**
   * Set the traversal direction of the node.
   * The direction defines how the node traverses the event tree when it's emitted.
   * @param  {DIRECTION} [direction] The traversal direction
   * @return {flow} The current flow node
   * @example
   * let a = nflow.create('a')
   * a.create('x').on('hello', callback)
   * a.create('y').on('hello', callback)
   *
   * let b = nflow.create('b')
   * b.create('x').on('hello', callback)
   * b.create('y').on('hello', callback)
   *
   * a.create('hello')
   *  .direction(nflow.direction.DOWNSTREAM)
   *  .emit()
   */
  flow.direction = (direction = UNSET) => {
    if (direction === UNSET) return flow.direction.value
    let oldDirection = flow.direction.value
    flow.direction.value = direction
    dispatchInternalEvent(flow, 'direction', direction, oldDirection)
    return flow
  }
  flow.direction.value = flow.create.defaults.direction
  merge(DIRECTION, flow.direction)

  /**
   * Emit a node to traverse the flow tree.
   *
   * In nflow `nodes` and `events` are the same type of objects.
   * An event is a node that gets detached from the parent, traverses the tree (see {@tutorial propagation}) and gets delivered to all listeners (see {@tutorial namespacing}).
   * > The `.emit` API has **3 distinct behaviours**:
   * ```js
   * foo.emit() // turns foo into an event and emits it
   * foo.emit('bar') // creates bar and emits it on foo
   * foo.emit(anotherNode) // reparents anotherNode to foo and emits it
   * ```
   * Essentially, the following two operations are the same:
   * ```js
   * foo.emit('bar')
   * foo.create('bar').emit()
   * ```
   *
   * #### Listener Context
   * Listeners are always invoked in the context of the emitted event:
   * ```js
   * .on('price-update', function(d){
   *   this // refers to the emitted event
   *   this.data() // === d
   *   this.name() // === 'price-update'
   * })
   * ```
   *
   * Since **events are also flow objects**, you can dispatch further events on them! ({@tutorial event-chain})
   * @param  {String} [name] The name of the event
   * @param {...object} [data] optional data stored on the event
   * @returns {flow} the emitted event
   * @tutorial event-chain
   * @tutorial propagation
   * @tutorial namespacing
   * @emits 'flow.emit'
   * @emits 'flow.parent.emit'
   * @emits 'flow.children.emit'
   * @emits 'flow.emitted'
   * @emits 'flow.parent.emitted'
   * @emits 'flow.children.emitted'
   * @example
   * let a = nflow.create('a')
   *
   * a.create('x')
   *   .on('hello', callback)
   *
   * a.create('y')
   *   .on('hello', callback)
   *
   * let b = nflow.create('b')
   * b.emit('hello')
   */
  flow.emit = (name = UNSET, ...args) => {
    return emit(name, args)
  }
  flow.emit.recipients = []
  flow.emit.recipientsMap = {}
  createEmitAPI(flow)
  /**
   *
   * Dispatched when a node is about to be emitted.
   * @event 'flow.emit'
   * @property {flow} parent - The emitter, ie. the parent of the emitted node.
   * @property {flow} flow - the emitted node.
   * @see flow.parent
   */
  /**
   *
   * Dispatched when one of the node's parents is about to be emitted.
   * @event 'flow.parent.emit'
   * @property {flow} parent - The emitter, ie. the parent of the emitted node.
   * @property {flow} flow - the emitted node.
   * @see flow.emit
   */
  /**
   *
   * Dispatched when ove of the node's children(recursive) is about to be emitted.
   * @event 'flow.children.emit'
   * @property {flow} parent - The emitter, ie. the parent of the emitted node.
   * @property {flow} flow - the emitted node.
   * @see flow.emit
   */
  /**
   *
   * Dispatched after a node has been emitted.
   * @event 'flow.emitted'
   * @property {flow} parent - The emitter, ie. the parent of the emitted node.
   * @property {flow} flow - the emitted node.
   * @see flow.parent
   */
  /**
   *
   * Dispatched after one of the node's parents has been emitted.
   * @event 'flow.parent.emitted'
   * @property {flow} parent - The emitter, ie. the parent of the emitted node.
   * @property {flow} flow - the emitted node.
   * @see flow.emit
   */
  /**
   *
   * Dispatched after one of the node's children(recursive) has been emitted.
   * @event 'flow.children.emitted'
   * @property {flow} parent - The emitter, ie. the parent of the emitted node.
   * @property {flow} flow - the emitted node.
   * @see flow.emit
   */
  function emit (name = UNSET, args, direction) {
    if (name === UNSET) {
      // emit current flow object
      detach(flow)
      let p = flow.parent() || flow
      direction && flow.direction(direction)
      dispatchInternalEvent(p, 'emit', flow, null, true)
      p.emit.route(flow)
      dispatchInternalEvent(p, 'emitted', flow, null, true)
      return flow
    }
    if (isFlow(name)) {
      // 1. reparent the passed in flow object where it's emitted from
      name.parent(flow)
      // 2.  emit the passed in flow object
      detach(name)
      direction && name.direction(direction)
      args.length && name.data(...args)
      dispatchInternalEvent(flow, 'emit', name, null, true)
      flow.emit.route(name)
      dispatchInternalEvent(flow, 'emitted', name, null, true)
      return flow
    }

    // create and emit a new event
    assert(typeof (name) !== 'string'
      , ERRORS.invalidEventName)

    var event = flow.create(name, ...args)
    detach(event)
    if (direction) event.direction.value = direction
    dispatchInternalEvent(flow, 'emit', event, null, true)
    flow.emit.route(event)
    dispatchInternalEvent(flow, 'emitted', event, null, true)
    return event
  }

  /**
   * @internal
   */
  flow.emit.route = (event) => {
    event.stopPropagation.value = false
    event.status.set(STATUS.FLOWING)
    let localName = getLocalName(event.name())
    let matcher = f => f.on.listenerCache[localName]
    event.emit.targets = flow.emit.route[event.direction()](event, matcher)
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
    if (flow.emit.recipientsMap[currentNode.flow.guid.value]) return
    if (isUnreachable(flow, currentNode)) return
    flow.emit.recipientsMap[currentNode.flow.guid.value] = flow.direction.value
    let result = currentNode.flow.on.notifyListeners(flow)
    if (result) {
      result.route = currentNode.route
      result.direction = flow.direction.value
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
