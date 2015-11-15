behaviours.loggable = (flow)=>{
  flow.toString = () => {
    return "{ Object Flow, name:%name }"
      .replace("%name", flow.name())
  }
}

function log(flow, name, newData, oldData){
  instance.logger 
    && !isInternal(flow)
    && instance.logger(flow, name, newData, oldData)
  
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