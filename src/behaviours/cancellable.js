import { ERRORS
       , STATUS
       , DIRECTION
       , DIRECTION_BITMASK
       , UNSET } from '../consts'
import { assert, dispatchInternalEvent } from '../utils'

export default (flow, defaults, name) => {
  /**
   * Cancel the current {@link flow} node.
   *
   * Cancelling has the following effects:
   *  - Cancelled nodes cannot receive events.
   *  - Cancelled nodes cannot emit events.
   *  - Cancelled nodes cannot propagate events.
   *  - <b>All</b> child nodes of a cancelled node <b>are also cancelled recursively</b>.<br>
   *
   * Cancellation is final, cancelled nodes cannot be un-cancelled.
   * @method
   * @memberof module:flow
   * @return {flow} flow - the current {@link flow} node
   * @liveexample
   * let foo = nflow.create('foo')
   *   .on('hello', cb)
   *
   * foo.cancel()
   * @emits 'flow.cancel'
   * @emits 'flow.children.cancel'
   * @emits 'flow.parent.cancel'
   */
  flow.cancel = (...args) => {
    assert(args.length
         , ERRORS.invalidCancelArgs)
    let previousValue = flow.cancel.value
    flow.cancel.value = true
    /**
     *
     * Dispatched when a node has been cancelled.
     * @event 'flow.cancel'
     * @property {flow} flow - the node to be cancelled.
     * @see flow.cancel
     * @example
     * nflow.create('timer-service')
     *   .on('flow.cancel', stopTimer)
     */
    /**
     *
     * Dispatched when one of the node's parents has been cancelled.
     * @event 'flow.parent.cancel'
     * @property {flow} flow - the node to be cancelled.
     * @see flow.cancel
     */
    /**
     *
     * Dispatched when one of the node's children(recursive) has been cancelled.
     * @internal
     * @event 'flow.children.cancel'
     * @property {flow} flow - the node to be cancelled.
     * @see flow.cancel
     */
    dispatchInternalEvent(flow, 'cancel', true, previousValue)
    return flow
  }
  flow.cancel.value = false

  /**
   * @memberof module:flow
   * @readonly
   * @return {Boolean} `true` if the node or any of the node's parents have been cancelled, else `false`
   */
  flow.isCancelled = () => {
    return [flow]
      .concat(flow.parents())
      .some(e => e.status() === STATUS.CANCELLED ||
         e.status() === STATUS.DISPOSED)
  }

  /**
   * Stop or augments propagation of the emitted event.
   *
   * If the method is called with no parameters, the event will not be delivered to other listeners.
   * ```
   * .on('price-update', function(){
   *   this.stopPropagation() // no further listeners will receive the event
   * })
   * ```
   * If a {@link flow.DIRECTION|direction} is given, the event propagation gets restricted in the given direction.
   * ```
   * foo.on('price-update', function(){
   *    // child nodes of `foo` will not receive the `price-update` event
   *    this.stopPropagation('DOWNSTREAM')
   * })
   * ```
   * @tutorial propagation
   * @see flow.propagationStopped
   * @param  {DIRECTION} [direction] Optional direction for augmenting the event propagation
   * @return {flow} flow - the current {@link flow} node
   * @emits 'flow.propagationStopped'
   * @emits 'flow.children.propagationStopped'
   * @emits 'flow.parent.propagationStopped'
   * @emits 'flow.propagationAugmented'
   * @emits 'flow.children.propagationAugmented'
   * @emits 'flow.parent.propagationAugmented'
   */
  flow.stopPropagation = (direction = UNSET) => {
    direction !== UNSET && assert(!DIRECTION[direction.toUpperCase()]
         , ERRORS.invalidStopPropagationArgs)

    if (direction === UNSET) {
      flow.status.set(STATUS.STOPPED)
      flow.emit.targets = []
      flow.stopPropagation.value = true
      flow.stopPropagation.modifiers[flow.target.guid] = -1 // bitmask fill
      /**
       *
       * Dispatched when a dispatched event's propagation has been stopped.
       * @event 'flow.propagationStopped'
       * @property {flow} flow - the node that has stopped propagating
       * @see flow.stopPropagation
       * @example
       * nflow.create('timer-service')
       *   .on('flow.propagationStopped', cb)
       */
      /**
       *
       * Dispatched when one of the node's parents' propagation has been stopped.
       * @event 'flow.parent.propagationStopped'
       * @property {flow} flow - the node that has stopped propagating.
       * @see flow.stopPropagation
       */
      /**
       *
       * Dispatched when one of the node's children(recursive) has stopped propagating.
       * @internal
       * @event 'flow.children.propagationStopped'
       * @property {flow} flow - the node that has stopped propagating
       * @see flow.stopPropagation
       */
      dispatchInternalEvent(flow, 'propagationStopped', true)
    } else {
      let d = DIRECTION[direction.toUpperCase()]
      /**
       *
       * Dispatched when a dispatched event's propagation has been augmented.
       * @event 'flow.propagationAugmented'
       * @property {flow} flow - the affected node
       * @property {object} changes - The changes applied to the emitted event
       * @property {DIRECTION} changes.direction - The changes applied to the emitted event
       * @property {flow} changes.target - The node that augmented the event flow
       * @see flow.stopPropagation
       *
       */
      /**
       *
       * Dispatched when one of the node's parents' propagation has been augmented.
       * @event 'flow.parent.propagationAugmented'
       * @property {flow} flow - the affected node.
       * @property {object} changes - The changes applied to the emitted event
       * @property {DIRECTION} changes.direction - The changes applied to the emitted event
       * @property {flow} changes.target - The node that augmented the event flow
       * @see flow.stopPropagation
       */
      /**
       *
       * Dispatched when the propagation of one of the node's children(recursive) has been augmented.
       * @internal
       * @event 'flow.children.propagationAugmented'
       * @property {flow} flow - the affected node.
       * @property {object} changes - The changes applied to the emitted event
       * @property {DIRECTION} changes.direction - The changes applied to the emitted event
       * @property {flow} changes.target - The node that augmented the event flow
       * @see flow.stopPropagation
       */
      dispatchInternalEvent(flow, 'propagationAugmented', {
        direction: d,
        target: flow.target
      })
      flow.stopPropagation.modifiers[flow.target.guid.value] |= DIRECTION_BITMASK[d]
    }
    return flow
  }

  flow.stopPropagation.value = false
  flow.stopPropagation.modifiers = {}
  createStopPropagationModifiers(flow)

  /**
   * @readonly
   * @tutorial propagation
   * @see flow.stopPropagation
   * @return {Boolean} `true` if the propagation was completely stopped, else `false` (even if the propagation was augmented).
   *
   */
  flow.propagationStopped = () => {
    return flow.stopPropagation.value
  }
}
/*
 *  create directional (eg. `flow.stopPropagation.dowsntream(...)`) API
 */
function createStopPropagationModifiers (flow) {
  Object.keys(DIRECTION)
    .forEach(direction => {
      flow.stopPropagation[direction] =
      flow.stopPropagation[direction.toLowerCase()] =
        () => flow.stopPropagation(direction)
    })
}
