  behaviours.carry = (flow, defaults, name, data)=>{
    flow.data = (...data) => {
    if (!data.length) {
      return (flow.data.value.length<=1)
        ? flow.data.value[0]
        : flow.data.value
      }
    var oldData = flow.data.value
    flow.data.value = data
    dispatchInternalEvent(flow, 'data'
      , (data.length>1?data:data[0])
      , (oldData.length>1?oldData:oldData[0]))
    return flow
    }
    flow.data.value = data
  }