export default (flow)=>{
  flow.toString = () => {
    return JSON.stringify(flow.toObj())
  }

  flow.toObj = () => ({
    name: flow.name(),
    guid: flow.guid(),
    parentName: flow.parent() && flow.parent().name(),
    parentGuid: flow.parent() && flow.parent().guid(),
    status: flow.status(),
    listeners: Object.keys(flow.on()),
    children: flow.children().map(f=>({ name: f.name(), guid: f.guid() }))
  })
}
