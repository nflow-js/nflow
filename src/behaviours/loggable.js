import {serialise} from '../utils'
export default (flow)=>{
  flow.toString = () => {
    return JSON.stringify(flow.toObj())
  }

  flow.toObj = (...args) => {
    const props = args.reduce((a,b)=>(a[b]=1,a),{})
    const hasProp = prop=>!args.length || props[prop]
    const add = (name, valueF)=>{if(hasProp(name)) obj[name]=valueF() }
    let obj = {}

    add('name',   flow.name)
    add('guid',   flow.guid)
    add('version',()=>flow.version)
    add('status', flow.status)
    add('data',   ()=>serialise(flow.data()))
    add('parent', ()=>({
      name: flow.parent.value && flow.parent.value.name.value,
      guid: flow.parent.value && flow.parent.value.guid.value
    }))
    add('listeners', ()=>{
      const l = flow.on()
      let o = {}
      Object.keys(l)
        .forEach(key=>o[key]=l[key]
          .map(f=>f.name||'function'))
      return o;
    })
    add('children', ()=>flow.children()
      .map(f=>f.toObj('name','guid')))

    add('recipients', ()=>{
      return flow.emit.recipients
      && flow.emit.recipients.map(f=>({
        direction: f.direction,
        flow: f.flow.toObj('name','guid'),
        route: f.route.map(f=>({
          flow: f.flow.toObj('name','guid'),
          direction: f.direction
        })),
        listeners: f.listeners.map(l=>({
          name: l.name,
          handlers:l.handlers.map(h=>({
            status:h.status,
            listener:serialise(h.listener)
          }))
        }))
      }))
    })
    return obj;
  }
}
