import Cookies from 'js-cookie'

/*
* 验证传入的value是否为string类型
*/

function verifyString(str) {
  if (typeof str != 'string') {
    console.error('this parameter is not a string')
    return false
  }
  return true
}

function cookies() {
  this.dec = 'cookie 操作'
}

/*
* @set 设置本地cookie的值
* @get 获取本地cookie的值
* @remove 移除本地cookie的值
*/

cookies.prototype.set = function(key, value) {
  if (!verifyString(key)) return
  Cookies.set(key, value)
}

cookies.prototype.get = function(key) {
  if (!key) {
    Cookies.get()
    return
  }
  if (!verifyString(key)) return
  Cookies.get(key)
}

cookies.prototype.remove = function(key) {
  if (!verifyString(key)) return
  Cookies.remove(key)
}

export default new cookies()