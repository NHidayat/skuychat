import Vue from 'vue'
import axios from 'axios'
import router from '../../router/index'

export default {
  state: {
    user: {},
    userData: {},
    token: localStorage.getItem('token') || null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
    },
    setUserData(state, payload) {
      state.userData = payload
    },
    delUser(state) {
      state.user = {}
      state.token = null
    }
  },
  actions: {
    getUserById(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + `user/${payload}`)
          .then(response => {
            context.commit('setUserData', response.data.data[0])
            resolve(response.data)
          }).catch(error => {
            reject(error.response)
          })
      })
    },
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_API_URL + 'user/login', payload)
          .then(response => {
            context.commit('setUser', response.data.data)
            localStorage.setItem('token', response.data.data.token)
            resolve(response.data)
          }).catch(error => {
            reject(error.response)
          })
      })
    },
    logout(context, payload) {
      Vue.$confirm({
        title: 'Are you sure?',
        message: 'Are you sure you want to logout?',
        button: {
          yes: 'Yes',
          no: 'Cancel'
        },
        callback: confirm => {
          if (confirm) {
            return new Promise((resolve, reject) => {
              axios.patch(process.env.VUE_APP_API_URL + `user/update-status/${payload.user_id}`, payload.form)
                .then(res => {
                  localStorage.removeItem('token')
                  context.commit('delUser')
                  router.push('/login')
                  resolve(res)
                })
                .catch(error => {
                  reject(error.response.data)
                })
            })
          }
        }
      })
    },
    register(context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_API_URL + 'user/register', payload)
          .then(response => {
            resolve(response)
          }).catch(error => {
            reject(error.response)
          })
      })
    },
    interceptorRequest(context) {
      console.log('interceptorRequest work')
      axios.interceptors.request.use(function(config) {
        config.headers.Authorization = `Bearer ${context.state.token}`
        return config
      }, function(error) {
        return Promise.reject(error)
      })
    },
    interceptorResponse(context) {
      axios.interceptors.response.use(function(response) {
        return response
      }, function(error) {
        if (error.response.status === 403) {
          if (error.response.data.msg === 'invalid token' || error.response.data.msg === 'invalid signature') {
            localStorage.removeItem('token')
            context.commit('delUser')
            router.push('/login')
            alert('Maaf token anda salah. Anda tidak bisa lanjut kehalaman ini')
          } else if (!error.response.data.msg === 'invalid token' || !error.response.data.msg === 'invalid signature') {
            localStorage.removeItem('token')
            context.commit('delUser')
            router.push('/login')
            alert('Maaf token session anda telah habis')
          }
        }
        return Promise.reject(error)
      })
    }
  },
  getters: {
    isLogin(state) {
      return state.token !== null
    },
    user(state) {
      return state.user
    },
    getUserData(state) {
      return state.userData
    }
  }
}
