const fetch = require('node-fetch')
const pagelist = ['shelters', 'timeline', 'community', 'base']
const apilist = ['shelters', 'me', 'public', 'common', 'community']
const etc = [{title:'Notifications', url: 'https://rest.shelter.id/v1.0/notifications'}, {title:'Media', url: 'https://media.shelter.id'}, {title:'Desktop APP', url:'http://cc.devflow.kr:8080'}]
let data = []

module.exports = async () => {
  data = []
  return new Promise((resolve) => {
    pagelist.forEach(async(item, index) => {
      let res = await fetch('https://shelter.id/' + item, {method:'GET'})
      let code = await res.status
      data.push({code:code, web:item, type:'page'})
    })
    apilist.forEach(async(item, index) => {
      let res = await fetch('https://rest.shelter.id/v1.0/' + item, {method:'GET'})
      let code = await res.status
      if (code === 401) code = 200
      data.push({code:code, web:item, type:'api'})
    })
    etc.forEach(async(item, index) => {
      let res = await fetch(item.url , {method:'GET'})
      let code = await res.status
      if (code === 401) code = 200
      data.push({code:code, web:item.title, type:'etc'})
    })
    setInterval(() => {
      if (pagelist.length + apilist.length + etc.length === data.length) {
        resolve(data)
      }
    }, 100)
  })
  
}