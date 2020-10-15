<template>
  <div class="sidebar">
    <SidebarHeader />
    <div class="sidebar-search">
      <b-row>
        <b-col cols="12">
          <input type="search" placeholder="Type your message...">
        </b-col>
      </b-row>
    </div>
    <div class="message-status">
      <b-row class="status-collection">
        <b-col class="status-items active">All</b-col>
        <b-col class="status-items">Important</b-col>
        <b-col class="status-items">Unread</b-col>
      </b-row>
    </div>
    <div class="card-chat-collection">
      <div align="center" v-if="isLoading">
        <b-spinner type="grow" variant="primary"></b-spinner>
      </div>
      <div class="card-chat-items" v-for="(v, i) in roomChatList" :key="i" @click="setRoom(v.room_id)">
        <div class="card-chat-image">
          <img :src="SRC_URL + v.room_img" alt="" v-if="v.room_img !== null">
          <img src="../../assets/default-user.png" alt="" v-else>
        </div>
        <div class="card-chat-wrapper">
          <div class="card-chat-top">
            <span class="card-chat-time" v-if="v.latest_message.length > 0">
              <timeago :datetime="v.latest_message[0].message_created_at" :auto-update="30"></timeago>
            </span>
            <div class="card-chat-name">{{ v.room_name }}</div>
          </div>
          <div class="card-chat-bottom">
            <div class="card-chat-text" v-if="v.latest_message.length > 0">
              <span>{{ v.latest_message[0].message_text }}</span>
            </div>
            <!-- <div>
              <span class="card-chat-count">2</span>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import SidebarHeader from './Sidebar_header'
export default {
  components: {
    SidebarHeader
  },
  data() {
    return {
      isLoading: false,
      isAlert: false,
      alertMsg: '',
      isMsg: '',
      alertVariant: '',
      roomChatList: [],
      oldRoom: '',
      SRC_URL: process.env.VUE_APP_API_URL
    }
  },
  created() {
    this.get_roomList()
    this.getUserById(this.user.user_id)
  },
  mounted() {},
  computed: {
    ...mapGetters({
      user: 'user',
      typing: 'getTyping',
      userData: 'getUserData',
      roomChat: 'getRoomChat',
      socket: 'getSocket'
    })
  },
  methods: {
    ...mapMutations(['setIsChat', 'setTyping', 'setListStyle']),
    ...mapActions(['getRoomById', 'getUserById', 'getFriendStatus']),
    setRoom(data) {
      const roomData = {
        user_id: this.user.user_id,
        room_id: data
      }
      if (this.oldRoom) {
        this.socket.emit('changeRoom', { oldRoom: this.oldRoom, newRoom: data })
        this.oldRoom = data
      } else {
        this.socket.emit('selectRoom', { room_id: data })
        this.oldRoom = data
      }
      this.setListStyle(10)
      this.getRoomById(roomData)
        .then(res => {
          this.getFriendStatus(res.data[0].getter_id)
        })
    },
    get_roomList() {
      this.isLoading = true
      axios.get(process.env.VUE_APP_API_URL + `chat/user/${this.user.user_id}`)
        .then(response => {
          this.roomChatList = response.data.data
          this.isLoading = false
        })
    }
  }
}

</script>
