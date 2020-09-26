<template>
  <div class="sidebar">
    <SidebarHeader />
    <div class="sidebar-search">
      <b-row>
        <b-col cols="10">
          <input type="search" placeholder="Type your message...">
        </b-col>
        <b-col cols="2" align="right">
          <font-awesome-icon icon="plus" class="text-link" />
        </b-col>
      </b-row>
    </div>
    <div class="message-status">
      <b-row class="status-collection">
        <b-col class="status-items">All</b-col>
        <b-col class="status-items active">Important</b-col>
        <b-col class="status-items">Unread</b-col>
      </b-row>
    </div>
    <div class="card-chat-collection">
      <div class="card-chat-items">
        <div class="card-chat-image">
          <img src="../../assets/selena-gomez.jpg" alt="">
        </div>
        <div class="card-chat-wrapper">
          <div class="card-chat-top">
            <span class="card-chat-time">12.00</span>
            <div class="card-chat-name">Selena Gomez</div>
          </div>
          <div class="card-chat-bottom">
            <div class="card-chat-text">
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
            </div>
            <div>
              <span class="card-chat-count">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
      alertVariant: ''
    }
  },
  created() {},
  computed: {},
  methods: {}
}

</script>
