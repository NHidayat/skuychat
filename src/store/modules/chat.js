import axios from 'axios'
import io from 'socket.io-client'
export default {
  state: {
    isChat: false,
    roomChat: '',
    socket: io(process.env.VUE_APP_API_URL),
    listStyle: { zIndex: 0 }
  },
  mutations: {
    setIsChat(state, payload) {
      state.isChat = payload
    },
    setRoomChat(state, payload) {
      state.roomChat = payload
    },
    setMessage(state, payload) {
      state.roomChat.messages.push(payload)
    },
    setListStyle(state, payload) {
      state.listStyle.zIndex = payload
    }
  },
  actions: {
    getRoomById(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + `chat/${payload.user_id}/${payload.room_id}`)
          .then(response => {
            context.commit('setRoomChat', response.data.data[0])
            context.commit('setIsChat', true)
            resolve(response.data)
          }).catch(error => {
            reject(error.response)
          })
      })
    },
    postMessage(context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_API_URL + 'chat/post-message', payload)
          .then(response => {
            resolve(response.data)
          }).catch(error => {
            reject(error.response)
          })
      })
    },
    postRoom(context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_API_URL + 'chat/create-room', payload)
          .then(response => {
            resolve(response.data)
          }).catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getIsChat(state) {
      return state.isChat
    },
    getRoomChat(state) {
      return state.roomChat
    },
    getTyping(state) {
      return state.typing
    },
    getListStyle(state) {
      return state.listStyle
    },
    getSocket(state) {
      return state.socket
    }
  }
}
