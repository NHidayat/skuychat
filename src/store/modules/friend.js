import axios from 'axios'
// import Vue from 'vue'
// import router from '../../router/index'

export default {
  state: {
    friendsList: []
  },
  mutations: {
    setFriendList(state, payload) {
      state.friendsList = payload
    }
  },
  actions: {
    getFriendByUser(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + `friend/${payload}`)
          .then(response => {
            console.log(response.data.data)
            context.commit('setFriendList', response.data.data)
            resolve(response.data)
          }).catch(error => {
            reject(error.response)
          })
      })
    },
    addFriend(context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_API_URL + 'friend/add-friend', payload)
          .then(response => {
            context.commit('setFriendList', response.data.data)
            resolve(response.data)
          }).catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getFriendList(state) {
      return state.friendsList
    }
  }
}
