import upstream from  './upstream'
import current from  './current'
import downstream from  './downstream'
import _default from  './default'

export default {
  upstream,
  downstream,
  none:current, // deprecated
  current,
  "default": _default // IE8 compatibility fix
}