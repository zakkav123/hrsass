import { getUserInfoApi, login, getUserDetailById } from '@/api/user'
import { setTokenTume } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    async getToken({ commit }, payload) {
      const res = await login(payload)
      commit('setToken', res)
      setTokenTume()
    },
    async getUserInfo({ commit }) {
      const userBaesInfo = await getUserInfoApi()
      const userInfo = await getUserDetailById(userBaesInfo.userId)
      commit('setUserInfo', { ...userBaesInfo, ...userInfo })
    },
    logout({ commit }) {
      commit('setToken', '')
      commit('setUserInfo', '')
    }
  }
}
