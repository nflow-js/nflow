import factory from './factory'
import {DEFAULTS} from './consts'
import logger from './logger'
/**
 * The nflow API is designed to be simple and easy to use.<br><br>
 * Essentially, the heart of nflow is only 3 methods :<br>
 *  - {@link flow.create|create},<br>
 *  - {@link flow.on} and<br>
 *  - {@link flow.emit}.<br><br>
 * Since in nflow there is only one type of object, the same API applies to every object created or emitted.<br>
 * Whether they are used as dispatchers, events, stores or controllers - they are the same type of objects and share the same API.<br>
 * @namespace
 * @type flow
 * @name flow
 *
 */
var root = factory(DEFAULTS, 'flow', [])
logger.init(root)
export default root
