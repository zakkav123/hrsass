// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTokenTume } from '@/utils/auth'
import router from '@/router'

const timeTokens = function () {
  const tokenTime = getTokenTume()
  const tokenNow = Date.now()
  const timerOut = 2 * 60 * 60 * 1000
  return tokenNow - tokenTime > timerOut
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例
service.interceptors.request.use(async (res) => {
  // 判断有token添加tokane
  if (store.state.user.token) {
    if (timeTokens()) {
      console.log('登录')
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录过期'))
    } else {
      res.headers.Authorization = 'Bearer ' + store.state.user.token
    }
  }
  return res
}) // 请求拦截器
service.interceptors.response.use(
  (res) => {
    console.log(res)
    const { data, message, success } = res.data
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  async function (error) {
    if (error?.response?.status === 401) {
      await store.dispatch('user/logout')
      Message.error('登录过期')
      router.push('/login')
    } else {
      Message.error(error.message)
    }

    return Promise.reject(error)
  }
) // 响应拦截器
export default service // 导出axios实例
