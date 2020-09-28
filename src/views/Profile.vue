<template>
  <div>
    <b-row>
      <b-col md="4">
        <SidebarProfile />
      </b-col>
      <b-col md="8">
        <RoomChat />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import SidebarProfile from '../components/_base/Sidebar_profile.vue'
import RoomChat from '../components/_base/Room_chat.vue'

export default {
  name: 'App',
  components: {
    SidebarProfile,
    RoomChat
  },
  created() {}
}

</script>
<style src="../assets/style/style.css"></style>
