<template>
  <div id="app">
    <router-view />
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'App',
  created() {
    console.log(this.user.user_id)
    this.interceptorRequest()
    this.interceptorResponse()
    this.socket.emit('start', { user_id: this.user.user_id })
  },
  mounted() {
    this.socket.on('chatMessage', (data) => {
      this.setMessage(data)
      console.log(data)
    })
    this.socket.on('notifMessage', (data) => {
      if (this.roomChat.room_id !== data.room_id) {
        this.makeNotif(data.sender_name, data.message_text, 'primary')
      }
    })
  },
  computed: {
    ...mapGetters({
      socket: 'getSocket',
      user: 'user',
      roomChat: 'getRoomChat'
    })
  },
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse']),
    ...mapMutations(['setMessage']),
    makeNotif(title = 'Hei', msg, variant = null, append = false) {
      this.$bvToast.toast(`${msg}`, {
        title: title,
        autoHideDelay: 10000,
        appendToast: append,
        variant: variant,
        solid: true
      })
    }
  }
}

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap');

body {
  background: #E5E5E5 !important;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: Rubik, sans-serif;
}

</style>
