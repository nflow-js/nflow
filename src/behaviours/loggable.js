behaviours.loggable = (flow)=>{
  flow.toString = () => {
    return "{ Object Flow, name:%name }"
      .replace("%name", flow.name())
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

function log(flow, name, newData, oldData){
  !isInternal(flow)
    && instance.logger.value.forEach(f=>f(flow, name, newData, oldData))
  
  instance.enableDevTools.value
    && debug(flow, name, newData, oldData)
}

function debug(flow, name, d, d0){
  sendToDevTools(name, 
    {
      name: d.name.value, 
      id: d.guid.value,
      parentId: flow.guid.value
    })
}