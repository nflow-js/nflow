import { ERRORS
       , STATUS
       , DIRECTION
       , DIRECTION_BITMASK
       , UNSET } from '../consts'
import { assert, dispatchInternalEvent } from '../utils'

export default (flow, defaults, name) => {
  /**
   *
   * Cancels the current {@link flow} node.<br><br>
   *
   * Cancelling has the following effects:<br>
   *  - <b>All</b> child nodes of a cancelled node are also cancelled <b>recursively</b>.<br>
   *  - Cancelled nodes cannot receive events.<br>
   *  - Cancelled nodes cannot emit events.<br>
   *  - Cancelled nodes cannot propagate events.<br>
   *
   * test
   *  @codepen GjRaYQ
   * @return {flow} flow - the current flow node
   *
   */
  flow.cancel = (...args) => {
    assert(args.length
         , ERRORS.invalidCancelArgs)
    let previousValue = flow.cancel.value
    flow.cancel.value = true
    dispatchInternalEvent(flow, 'cancel', true, previousValue)
    return flow
  }
  flow.cancel.value = false

  flow.isCancelled = () => {
    return [flow]
      .concat(flow.parents())
      .some(e => e.status() === STATUS.CANCELLED ||
         e.status() === STATUS.DISPOSED)
  }

  flow.stopPropagation = (direction = UNSET) => {
    direction !== UNSET && assert(!DIRECTION[direction.toUpperCase()]
         , ERRORS.invalidStopPropagationArgs)

    if (direction === UNSET) {
      flow.status.set(STATUS.STOPPED)
      flow.emit.targets = []
      flow.stopPropagation.value = true
      flow.stopPropagation.modifiers[flow.target.guid] = -1 // bitmask fill
      dispatchInternalEvent(flow, 'propagationStopped', true)
    } else {
      let d = DIRECTION[direction.toUpperCase()]
      dispatchInternalEvent(flow, 'propagationAugmented', {
        direction: d,
        target: flow.target.toObj('name', 'guid')
      })
      flow.stopPropagation.modifiers[flow.target.guid.value] |= DIRECTION_BITMASK[d]
    }
    return flow
  }

  flow.stopPropagation.value = false
  flow.stopPropagation.modifiers = {}
  createStopPropagationModifiers(flow)

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
