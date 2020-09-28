<template>
  <div>
    <div class="empty-room" v-if="!isChat">
      <span>Please select a chat to start messaging</span>
    </div>
    <div class="room-chat" v-else>
      <div class="room-navbar">
        <b-row class="container">
          <b-col class="room-desc">
            <div class="room-img-profile" @click="setFriendProfile(roomChat.getter_id)">
              <img :src="SRC_URL + roomChat.room_img" alt="" v-if="roomChat.room_img !== null">
              <img src="../../assets/default-user.png" alt="" v-else>
            </div>
            <div class="room-name">
              <span>{{ roomChat.room_name }}</span><br>
              <p v-if="typing">
                <small><em>{{ typing }} is typing...</em></small>
              </p>
              <small v-else>Online</small>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="room-body">
        <b-container>
          <div class="chat-collection">
            <div v-for="(v, i) in roomChat.messages" :key="i">
              <div v-if="v.user_id == user.user_id">
                <div class="chat-item" style="float: right;">
                  <div class="chat-text own">
                    <span>{{ v.message_text }}</span>
                  </div>
                  <div class="chat-img-profile">
                    <img :src="SRC_URL + v.sender_img" alt="" v-if="v.sender_img">
                    <img src="../../assets/default-user.png" alt="" v-else>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
              <div v-else>
                <div class="chat-item">
                  <div class="chat-img-profile">
                    <img :src="SRC_URL + v.sender_img" alt="" v-if="v.sender_img">
                    <img src="../../assets/default-user.png" alt="" v-else>
                  </div>
                  <div class="chat-text">
                    <span>{{ v.message_text }}</span>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
            </div>
          </div>
        </b-container>
      </div>
      <div class="room-footer">
        <form @submit.prevent="onSubmit">
          <input placeholder="Type your message..." v-model="message_text" required />
          <button type="submit">
            <font-awesome-icon class="primary" :icon="['far', 'paper-plane']" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import io from 'socket.io-client'
export default {
  data() {
    return {
      socket: io(process.env.VUE_APP_API_URL),
      room_id: '',
      message_text: '',
      typing: false,
      SRC_URL: process.env.VUE_APP_API_URL
    }
  },
  watch: {
    message_text(value) {
      value ? this.socket.emit('typing', {
        user_full_name: this.userData.user_full_name,
        room_id: this.roomChat.room_id
      }) : this.socket.emit('typing', false)
    }
  },
  mounted() {
    this.socket.on('chatMessage', (data) => {
      this.roomChat.messages.push(data)
      if (data.user_id !== this.user.user_id) {
        this.makeToast(data.sender_name, data.message_text, 'primary')
      }
    })

    this.socket.on('typingMessage', data => {
      this.typing = data
    })
  },
  computed: {
    ...mapGetters({ isChat: 'getIsChat', roomChat: 'getRoomChat', user: 'user', userData: 'getUserData' })
  },
  methods: {
    ...mapActions(['postMessage']),
    ...mapMutations(['setFriendProfile']),
    onSubmit() {
      const setData = {
        user_id: this.user.user_id,
        sender_name: this.userData.user_full_name,
        room_id: this.roomChat.room_id,
        sender_img: this.userData.user_image,
        message_text: this.message_text
      }
      console.log(setData)
      this.postMessage(setData)
        .then(() => {
          this.socket.emit('roomMessage', setData)
          this.message_text = ''
        }).catch(error => {
          console.log(error)
        })
    },
    makeToast(title = 'Hei', msg, variant = null, append = false) {
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
