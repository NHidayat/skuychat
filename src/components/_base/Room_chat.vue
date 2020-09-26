<template>
  <div>
    <div class="empty-room" v-if="!isChat">
      <span>Please select a chat to start messaging</span>
    </div>
    <div class="room-chat" v-else>
      <div class="room-navbar">
        <b-row>
          <b-col class="room-desc">
            <div class="room-img-profile">
              <img src="../../assets/selena-gomez.jpg" alt="">
            </div>
            <div class="room-name">
              <span>Selena</span><br>
              <small>Online</small>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="room-body">
        <div class="chat-collection">
          <div class="chat-item">
            <div class="chat-img-profile">
              <img src="../../assets/selena-gomez.jpg" alt="">
            </div>
            <div class="chat-text">
              <span>Hi, son, how are you doing? Today, my father and I went to buy a car, bought a cool car.</span>
            </div>
          </div>
        </div>
      </div>
      <div class="room-footer">
        <b-input placeholder="Type your message..."></b-input>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ isChat: 'getIsChat' })
  }
}

</script>
