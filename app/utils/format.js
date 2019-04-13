const config = require('../../utils/config')

export const formatDate = (date, type = 'Y-M-D h:m:s') => {
  let timestamp = parseInt(new Date(date).getTime(), 10)
  let myDate
  let hour
  let time
  if (date) {
    if (timestamp < 10000) {
      timestamp = date
    }
    if (typeof timestamp === 'number') {
      myDate = new Date(timestamp)
    } else {
      myDate = new Date(timestamp.replace(/-/g, '/'))
    }
    hour = myDate.getHours()
  } else {
    myDate = new Date()
    hour = myDate.getHours()
  }
  const Y = myDate.getFullYear()
  const M = myDate.getMonth() + 1 < 10 ? `0${myDate.getMonth() + 1}` : myDate.getMonth() + 1
  const D = myDate.getDate() < 10 ? `0${myDate.getDate()}` : myDate.getDate()
  const h = hour < 10 ? `0${hour}` : hour
  const m = myDate.getMinutes() < 10 ? `0${myDate.getMinutes()}` : myDate.getMinutes()
  const s = myDate.getSeconds() < 10 ? `0${myDate.getSeconds()}` : myDate.getSeconds()
  time = type.replace('Y', Y)
  time = time.replace('M', M)
  time = time.replace('D', D)
  time = time.replace('h', h)
  time = time.replace('m', m)
  time = time.replace('s', s)
  return time
}

const isUrlRule = /^((?:http:)?\/\/www\.|(?:https:)?\/\/www\.|(?:http:)?\/\/|(?:https:)?\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?((\/.*)|.*)?$/

export const formatPath = (path) => {
  return isUrlRule.test(path) ? path : `${config.baseUrl}${path}`
}