import { assert, dispatchInternalEvent } from '../utils'
import { ERRORS } from '../consts'

export default (flow, defaults) => {
  /* jshint ignore:start */
  /**
   * Dispose the current {@link flow} node.
   * Use this operation if the node is no longer needed.
   *
   * Disposing a node has the following effects:
   *  - Disposed nodes cannot receive events.
   *  - Disposed nodes cannot emit events.
   *  - Disposed nodes cannot propagate events.
   *  - Disposed nodes are unparented
   *  - <b>All child nodes</b> of a disposed node <b>are also disposed recursively</b>.<br>
   *
   * Unless the application holds a reference to the node, disposed nodes are **eligible for garbage collection**.
   *
   * This operation is final, disposed nodes cannot be re-activated.
   *  @return {flow} the disposed node
   *  @emits 'flow.dispose'
   *  @emits 'flow.children.dispose'
   *  @emits 'flow.parent.dispose'
   */
    /* jshint ignore:end */
  flow.dispose = (...args) => {
    assert(args.length
         , ERRORS.invalidDisposeArgs)
    if (flow.dispose.value === true) return

    // recursively(depth first) dispose all downstream nodes
    flow.children.value.forEach(f => f.dispose())
    /**
     *
     * Dispatched when a node is about to be disposed.
     * @event 'flow.dispose'
     * @property {flow} flow - the node to be disposed.
     * @see flow.dispose
     * @example
     * nflow.create('timer-service')
     *   .on('flow.dispose', stopTimer)
     */
    /**
     *
     * Dispatched when one of the node's parents is about to be disposed.
     * @event 'flow.parent.dispose'
     * @property {flow} flow - the node to be disposed.
     * @see flow.dispose
     */
    /**
     *
     * Dispatched when ove of the node's children(recursive) is about to be disposed.
     * @internal
     * @event 'flow.children.dispose'
     * @property {flow} flow - the node to be disposed.
     * @see flow.dispose
     */
    dispatchInternalEvent(flow, 'dispose', true)
    flow.parent(null)
    flow.dispose.value = true
    flow.on.listenerMap = {}

    return flow
  }
  flow.dispose.value = false
}
