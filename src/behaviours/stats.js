/* globals VERSION */
import { assert, dispatchInternalEvent } from '../utils'
import { ERRORS } from '../consts'

export default (flow, defaults) => {
  /**
   * The stats API is for configuring {@link flow} nodes for debugging.
   * ```
   * nflow.create('noisy-timer-service')
   *  .stats({ ignore: true })
   * ```
   * @param  {*} data - configuration options
   * @param  {Boolean} data.ignore - do not track this node in the debugger/visualiser
   * @param  {Boolean} data.collapsed - collapse this node by default in the visualiser
   * @param  {String} data.description - extra description of the node to show in the visualiser
   * @return {flow} the current node.
   */
  flow.stats = (d) => {
    if (d === undefined) return flow.stats.value
    assert(typeof (d) !== 'object'
         , ERRORS.invalidStatsArgs)
    let previousStats = flow.stats.value
    /* jshint ignore:start */
    flow.stats.value = {...flow.stats.value, ...d}
    /* jshint ignore:end */
    dispatchInternalEvent(flow, 'stats', flow.stats.value, previousStats)
    return flow
  }

  flow.stats.value = {
    ignore: false, // do not track this node
    collapsed: false
  }

  flow.version = VERSION
}
