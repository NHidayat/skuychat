<template>
  <div>
    <b-row>
      <b-col md="4">
        <Sidebar />
      </b-col>
      <b-col md="8">
        <RoomChat />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Sidebar from '../components/_base/Sidebar.vue'
import RoomChat from '../components/_base/Room_chat.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    RoomChat
  }
}

</script>
<style src="../assets/style/style.css"></style>
<style src="../assets/style/scrollbar.css"></style>
