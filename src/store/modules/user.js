import axios from 'axios'

export default {
  state: {
    friendStatus: 0
  },
  mutations: {
    setFriendStatus(state, payload) {
      state.friendStatus = payload
    }
  },
  actions: {
    updateUser(context, payload) {
      return new Promise((resolve, reject) => {
        axios.patch(process.env.VUE_APP_API_URL + `user/update/${payload.user_id}`, payload.form)
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateLocation(context, payload) {
      return new Promise((resolve, reject) => {
        axios.patch(process.env.VUE_APP_API_URL + `user/update-location/${payload.user_id}`, payload.form)
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateStatus(context, payload) {
      return new Promise((resolve, reject) => {
        axios.patch(process.env.VUE_APP_API_URL + `user/update-status/${payload.user_id}`, payload.form)
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getFriendStatus(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + `user/user-status/${payload}`)
          .then(response => {
            context.commit('setFriendStatus', response.data.data.user_status)
            resolve(response.data)
          }).catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getFriendStatus(state) {
      return state.friendStatus
    }
  }
}
