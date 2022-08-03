import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  const idTopath = ['/login', '/404']
  if (token) {
    // 页面刷新获取用户信息
    if (!store.state.user.userInfo.userId) {
      store.dispatch('user/getUserInfo')
    }
    //1.登录
    // 是否进入登录页
    to.path === '/login' ? next('/') : next()
    // 1.1 是跳到首页
    // 1.2不是直接进入
  } else {
    // 2.未登陆
    // 访问的是否在白名单(未登录也能访向的页面
    idTopath.includes(to.path) ? next() : next('/login')
    // 2.1在白名单 放行
    // 2.2不在白名单(不登录不能访问） 跳到登录页
  }
})
