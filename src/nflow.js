import factory from './factory'
import {DEFAULTS} from './consts'
import logger from './logger'

var root = factory(DEFAULTS, "flow", [])
logger.init(root)
export default root
