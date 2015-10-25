behaviours.create = (flow, defaults)=>{

  flow.create = (name, ...data) => {
    var instance = create(flow.create.defaults, name, data)
    instance.parent(flow)
    return instance
  }

  flow.create.defaults = {
    factory: defaults.factory,
    behaviours: defaults.behaviours.concat(),
    direction: defaults.direction

  }

}