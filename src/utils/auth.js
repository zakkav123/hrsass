import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 存入token时间戳
export function setTokenTume() {
  Cookies.set('toeknTime', Date.now())
}
// 获取token时间戳
export function getTokenTume() {
  return Cookies.get('toeknTime')
}
