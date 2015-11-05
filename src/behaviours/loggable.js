behaviours.loggable = (flow)=>{
  
  flow.toString = () => {
    return "{ Object Flow, name:%name }"
      .replace("%name", flow.name())
  }

}