import * as behaviours from './behaviours'


export default (defaults, name, data)=>{
  var flow = defaults.factory()

  defaults
    .behaviours
    .forEach((d)=>{
      behaviours[d](flow, defaults, name, data)
  })

  return flow
}
