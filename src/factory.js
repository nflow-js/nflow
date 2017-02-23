import behaviours from './behaviours'
export default (defaults, name, data) => {
    /* jshint ignore:start */
  /**
   * nflow library
   * @class flow
   *
   * @example
   * let a = nflow.create('a')
   * let b = nflow.create('b')
   *
   * let c = a.create('c')
   * let d = a.create('d')
   */
    /* jshint ignore:end */
  var flow = defaults.factory()

  defaults
    .behaviours
    .forEach((d) => {
      behaviours[d](flow, defaults, name, data)
    })
  return flow
}
