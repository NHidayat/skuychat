import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Auth from './modules/auth'
import Friend from './modules/friend'
import Chat from './modules/chat'
import User from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    Friend,
    Chat,
    User
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  plugins: [
    createPersistedState({
      paths: ['Auth.user'],
      storage: window.sessionStorage
    })
  ]
})
