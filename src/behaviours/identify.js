import { ERRORS
       , UNSET } from '../consts'
import { assert, dispatchInternalEvent } from '../utils'

export default (flow, defaults, name) => {
  flow.guid = (...args) => {
    assert(args.length
         , ERRORS.invalidGuid)
    return flow.guid.value
  }
  flow.guid.value = createGuid()

  flow.name = (name = UNSET) => {
    if (name === UNSET) return flow.name.value
    assert(typeof (name) !== 'string'
         , ERRORS.invalidName, name)
    var previousName = flow.name.value
    flow.name.value = name
    dispatchInternalEvent(flow, 'name', name, previousName)
    return flow
  }
  flow.name.value = name || ''
  flow.name.isFlow = true
  flow.name.isInternal = false

  flow.call = (...functions) => {
    functions
      .filter(f => typeof (f) === 'function')
      .forEach(f => f.call(flow, flow))
    return flow
  }
}

function createGuid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, c => {
      let r = Math.random() * 16 | 0
      let v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
}
