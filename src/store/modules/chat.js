// import axios from 'axios'

export default {
  state: {
    isChat: true
  },
  mutations: {
    setIsChat(state, payload) {
      state.isChat = payload
    }
  },
  actions: {},
  getters: {
    getIsChat(state) {
      return state.isChat
    }
  }
}
