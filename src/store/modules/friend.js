import axios from 'axios'
import router from '../../router/index'

export default {
  state: {
    friendsList: [],
    friendId: ''
  },
  mutations: {
    setFriendList(state, payload) {
      state.friendsList = payload
    },
    setFriendId(state, payload) {
      state.friendId = payload
    },
    setFriendProfile(state, payload) {
      state.friendId = payload
      router.push('/friend-profile')
    }
  },
  actions: {
    getFriendByUser(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + `friend/${payload}`)
          .then(response => {
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
    },
    deleteFriend(context, payload) {
      return new Promise((resolve, reject) => {
        axios.delete(process.env.VUE_APP_API_URL + `friend/delete-friend/${payload.user_id}/${payload.friend_email}`)
          .then(response => {
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
    },
    getFriendId(state) {
      return state.friendId
    }
  }
}
