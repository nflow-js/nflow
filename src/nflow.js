import factory from './factory'
import {DEFAULTS} from './consts'
import logger from './logger'
/* jshint ignore:start */
/**
* ## `nflow` Internal Methods.
*
* The `nflow` internal methods are a collection of utility functions used internally by the nflow library.
* Normally there is no need for a consumer app to invoke any of these methods directly, however they can be useful
* for extending `nflow` or for logging/debugging purposes.
*
* @class flow#internal
*
*/
/**
* nflow library
* @class flow
*
* @example
* <hide>
* var handler1 = ()=>{}
* var handler2 = ()=>{}
* </hide>
* <show>
* import nflow from 'nflow'
* </show>
* let a = nflow.create('a')
* let b = nflow.create('b')
*
* a.create('x')
*   .on('hello', handler1)
*
* a.create('y')
*  .on('hello', handler2)
*
*  b.emit('hello')
*/
/* jshint ignore:end */
var flow = factory(DEFAULTS, 'flow', [])
logger.init(flow)
export default flow
