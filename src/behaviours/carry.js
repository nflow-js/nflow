  behaviours.carry = (flow, defaults, name, data)=>{
    flow.data = (...data) => {
    if (!data.length) {
      return (flow.data.value.length<=1)
        ? flow.data.value[0]
        : flow.data.value
      }
    return flow.data.value = data, flow
    }
    flow.data.value = data
  }