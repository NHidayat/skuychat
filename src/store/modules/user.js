import axios from 'axios'

export default {
  state: {},
  mutations: {},
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
    }
  },
  getters: {}
}
