import { ERRORS, UNSET, STATUS, DIRECTION_BITMASK } from '../consts'
import { assert, dispatchInternalEvent, invalidateListenerCache } from '../utils'

export default (flow) => {
  /**
   * Register one or more listeners on the current node.
   *
   * The listener will be invoked if an emitted flow object's name matches the listener name.
   *
   * #### How to delete event listeners
   * Simply set the handler to `null`:
   * ```js
   * f.on('price-update', null)
   * ```
   *
   * > **Note:**
   * Setting a new listener on the same event name deletes the existing listener(s):
   * ```js
   * f.on('register-user', validateName)
   * f.on('register-user', validateEmail) // this will delete validateName!
   * ```
   *
   * #### How to register multiple event handlers on the same event
   * ```js
   * flow.on('register-user', validateName
   *                        , validateEmail
   *                        , validatePassword
   *                        , registerUser)
   * ```
   * If you specify multiple listeners, they will called in sequential order.
   *
   * @param  {String} [name] the name of the listener
   * @param  {...function} [listeners] The callback function(s) to be invoked.
   * @return {flow} the current flow object
   * @tutorial propagation
   * @tutorial namespacing
   * @example
   * services
   *  .create('user-service')
   *  .on('login'   , login)
   *  .on('logout'  , logout)
   *  .on('register', validateName
   *                , validateEmail
   *                , validatePassword
   *                , register)
   *  @emits 'flow.listenerAdded'
   *  @emits 'flow.children.listenerAdded'
   *  @emits 'flow.parent.listenerAdded'
   *  @emits 'flow.listenerChanged'
   *  @emits 'flow.children.listenerChanged'
   *  @emits 'flow.parent.listenerChanged'
   *  @emits 'flow.listenerRemoved'
   *  @emits 'flow.children.listenerRemoved'
   *  @emits 'flow.parent.listenerRemoved'
   */
  flow.on = (name = UNSET, ...args) => {
    if (name === UNSET) return flow.on.listenerMap
    assert(typeof (name) !== 'string'
      , ERRORS.invalidListener)

    if (!args.length) {
      return flow.on.listenerMap[name]
    }

    if (args.length === 1 && args[0] === null) {
      delete flow.on.listenerMap[name]
      invalidateListenerCache(flow)
      /**
       *
       * Dispatched when one or more listeners have been removed from the node.
       * @event 'flow.listenerRemoved'
       * @property {flow} flow - the affected node.
       * @property {object} changes - the changes applied to the node
       * @property {object} changes.name - the name of the listener removed
       * @see flow.on
       */
      /**
       *
       * Dispatched when one or more listeners have been removed from the node's parents.
       * @event 'flow.parent.listenerRemoved'
       * @property {flow} flow - the affected node.
       * @property {object} changes - the changes applied to the node
       * @property {object} changes.name - the name of the listener removed
       * @see flow.on
       */
      /**
       *
       * Dispatched when one or more listeners have been removed from the node's children(recursive)
       * @event 'flow.children.listenerRemoved'
       * @property {flow} flow - the affected node.
       * @property {object} changes - the changes applied to the node
       * @property {object} changes.name - the name of the listener removed
       * @see flow.on
       */
      dispatchInternalEvent(flow, 'listenerRemoved', {name})
      return flow
    }
    var oldListeners = flow.on.listenerMap[name]
    flow.on.listenerMap[name] = args
      .filter(l => !assert(typeof (l) !== 'function'
        , ERRORS.invalidListenerType, typeof (l) + ': ' + l)
      )
    invalidateListenerCache(flow)
    /**
     *
     * Dispatched when one or more listeners have been added to the node.
     * @event 'flow.listenerAdded'
     * @property {flow} flow - the affected node.
     * @property {object} changes - the changes applied to the node
     * @property {object} changes.name - the name of the listener added
     * @see flow.on
     */
    /**
     *
     * Dispatched when one or more listeners have been added to the node's parents.
     * @event 'flow.parent.listenerAdded'
     * @property {flow} flow - the affected node.
     * @property {object} changes - the changes applied to the node
     * @property {object} changes.name - the name of the listener added
     * @see flow.on
     */
    /**
     *
     * Dispatched when one or more listeners have been added to the node's children(recursive)
     * @event 'flow.children.listenerAdded'
     * @property {flow} flow - the affected node.
     * @property {object} changes - the changes applied to the node
     * @property {object} changes.name - the name of the listener added
     * @see flow.on
     */
    /**
     *
     * Dispatched when one or more listeners have been changed on the node.
     * @event 'flow.listenerChanged'
     * @property {flow} flow - the affected node.
     * @property {object} changes - the changes applied to the node
     * @property {object} changes.name - the name of the changed listener
     * @see flow.on
     */
    /**
     *
     * Dispatched when one or more listeners have been changed on the node's parents.
     * @event 'flow.parent.listenerChanged'
     * @property {flow} flow - the affected node.
     * @property {object} changes - the changes applied to the node
     * @property {object} changes.name - the name of the changed listener
     * @see flow.on
     */
    /**
     *
     * Dispatched when one or more listeners have been changed on the node's children(recursive)
     * @event 'flow.children.listenerChanged'
     * @property {flow} flow - the affected node.
     * @property {object} changes - the changes applied to the node
     * @property {object} changes.name - the name of the changed listener
     * @see flow.on
     */
    dispatchInternalEvent(flow, oldListeners
      ? 'listenerChanged'
      : 'listenerAdded'
      , {name, handlers: args})
    return flow
  }
  flow.on.listenerMap = {}
  flow.on.listenerCache = {}

  flow.on.notifyListeners = (event) => {
    let keys = Object.keys(flow.on.listenerMap)
    let listeners = []
    event.target = flow
    keys.forEach(listenerName => {
      let shouldDeliver = event.namespace.match(flow, listenerName)
      if (shouldDeliver) {
        let handlers = flow.on.listenerMap[listenerName]
        listeners.push({
          name: listenerName,
          handlers: deliverToHandlers(event, handlers, flow)
        })
      }
    })
    delete event.target
    return listeners.length
      ? { flow, listeners }
      : null
  }
}

function deliverToHandlers (event, handlers, flow) {
  return handlers
    .map(listener => {
      let l = {
        listener
      }
      if (event.status() !== STATUS.FLOWING) {
        l.status = event.status()
        return l
      }
      if (event.stopPropagation.modifiers[flow.guid.value] &
        DIRECTION_BITMASK.CURRENT) {
        l.status = 'SKIPPED'
        return l
      }
      l.status = 'DELIVERED'
      listener.apply(event, event.data.value)
      return l
    })
}
