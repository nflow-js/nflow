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
}