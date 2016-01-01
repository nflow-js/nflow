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
    children: flow.children().map(f=>({ name: f.name(), guid: f.guid() })),
    recipients: flow.emit.recipients && flow.emit.recipients.map(f=>({
      flow: {
        guid: f.flow.guid(),
        name: f.flow.name() },
      route: f.route.map(f=>({
        guid: f.guid(),
        name: f.name() }))
    }))
  })
}
