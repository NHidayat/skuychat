<template>
  <div class="sidebar-profile">
    <div class="side-header">
      <b-row class="side-nav">
        <b-col cols="2" class="icon-section">
          <router-link to="/app">
            <font-awesome-icon icon="chevron-left" class="text-link primary" />
          </router-link>
        </b-col>
        <b-col cols="8" class="side-title">
          <span>{{ userData.user_name }}</span>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
      <div class="user-profile">
      <div class="user-img">
        <img :src="api_url + userData.user_image" alt="" v-if="userData.user_image !== null">
        <img src="../../assets/default-user.png" alt="" v-else>
      </div>
      <div class="user-full-name">
        <span>{{ userData.user_full_name }}</span>
      </div>
      <div class="user-name">
        <span>{{ userData.user_name }}</span>
      </div>
    </div>
    <div class="user-account">
      <div class="title">
        Account
      </div>
      <div class="account-item user-phone">
        <span>{{ userData.user_phone }}</span>
        <div>
          <small class="primary">Tap to change phone number</small>
        </div>
      </div>
      <div class="account-item user-bio">
        <span>{{ userData.user_bio }}</span>
        <div><small>Bio</small></div>
      </div>
    </div>
    <div class="user-setting">
      <div class="title">
        <span>Setting</span>
      </div>
      <div class="setting-collection">
        <div class="setting-item row">
          <b-col cols="1">
            <b-icon icon="pencil"></b-icon>
          </b-col>
          <b-col cols="8">Edit Profile</b-col>
          <b-col cols="2" align="right">
            <font-awesome-icon icon="chevron-right"></font-awesome-icon>
          </b-col>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {},
  data() {
    return {
      api_url: process.env.VUE_APP_API_URL
    }
  },
  created() {
    this.getUserById(this.user.user_id)
  },
  computed: {
    ...mapGetters({ user: 'user', userData: 'getUserData' })
  },
  methods: {
    ...mapActions(['getUserById'])
  }
}

</script>
<style src="../../assets/style/sidebar_profile.css" scoped></style>
