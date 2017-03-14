import factory from './factory'
import {DEFAULTS} from './consts'
import logger from './logger'
/* jshint ignore:start */
/**
* nflow library
* @class flow
*
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
/* jshint ignore:end */
var flow = factory(DEFAULTS, 'flow', [])
logger.init(flow)
export default flow
