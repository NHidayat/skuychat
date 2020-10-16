<template>
  <div>
    <div class="empty-room" v-if="!isChat">
      <span>Please select a chat to start messaging</span>
    </div>
    <div class="room-chat" :style="istStyle" v-else>
      <div class="room-navbar">
        <b-row class="container">
          <b-col class="room-desc">
            <div class="nav-back" @click="closeRoom">
              <font-awesome-icon icon="chevron-left" class="icon-back text-link primary" />
            </div>
            <div class="room-img-profile" @click="set_friendProfile(roomChat.getter_id)">
              <img :src="SRC_URL + roomChat.room_img" alt="" v-if="roomChat.room_img !== null">
              <img src="../../assets/default-user.png" alt="" v-else>
            </div>
            <div class="room-name">
              <span>{{ roomChat.room_name }}</span><br>
              <small v-if="typing"><em>{{ typing }} is typing...</em></small>
              <small v-else>{{ friendStatus === "1" ? 'Online' : 'Offline' }}</small>
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
export default {
  data() {
    return {
      room_id: '',
      message_text: '',
      SRC_URL: process.env.VUE_APP_API_URL,
      typing: false
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
    this.socket.on('typingMessage', data => {
      console.log(data)
      this.typing = data
    })
  },
  computed: {
    ...mapGetters({
      isChat: 'getIsChat',
      roomChat: 'getRoomChat',
      user: 'user',
      userData: 'getUserData',
      istStyle: 'getListStyle',
      socket: 'getSocket',
      friendStatus: 'getFriendStatus'
    })
  },
  methods: {
    ...mapActions(['postMessage']),
    ...mapMutations(['setFriendProfile', 'setListStyle', 'setRoomChat']),
    async onSubmit() {
      const setData = {
        user_id: this.user.user_id,
        sender_name: this.userData.user_full_name,
        room_id: this.roomChat.room_id,
        sender_img: this.userData.user_image,
        message_text: this.message_text,
        getter_id: this.roomChat.getter_id
      }
      await this.socket.emit('roomMessage', setData)
      await this.socket.emit('notif', setData)
      this.postMessage(setData)
        .then(() => {
          this.message_text = ''
        }).catch(error => {
          this.makeToast('Hei', error.data.msg, 'danger')
        })
    },
    set_friendProfile(data) {
      this.setFriendProfile(data)
      this.setListStyle(0)
    },
    closeRoom() {
      this.setListStyle(0)
      this.setRoomChat({
        room_id: '',
        messages: []
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
