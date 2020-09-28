<template>
  <div>
    <b-row>
      <b-col md="4">
        <div class="sidebar-profile">
          <div class="side-header">
            <b-row class="side-nav">
              <b-col cols="2" class="icon-section">
                <router-link to="/app">
                  <font-awesome-icon icon="chevron-left" class="text-link primary" />
                </router-link>
              </b-col>
              <b-col cols="8" class="side-title">
                <span>{{ friendData.user_name }}</span>
              </b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <div class="user-profile">
              <div class="user-img">
                <img :src="api_url + friendData.user_image" alt="" v-if="friendData.user_image !== null">
                <img src="../assets/default-user.png" alt="" v-else>
              </div>
              <div class="user-full-name">
                <span>{{ friendData.user_full_name }}</span>
              </div>
              <div class="user-name">
                <span>{{ friendData.user_email }}</span>
              </div>
            </div>
            <div class="user-account">
              <div class="title">
                Account
              </div>
              <div class="account-item user-phone">
                <span>{{ friendData.user_phone }}</span>
              </div>
              <div class="account-item user-bio">
                <span>{{ friendData.user_bio }}</span>
                <div><small>Bio</small></div>
              </div>
              <div class="account-item user-location">
                <div class="title">Location</div>
                <div v-if="friendData.lat !== null">
                  <GmapMap :center="coordinate" :zoom="15" map-type-id="terrain" style="width: 100%; height: 300px">
                  <GmapMarker :position="coordinate" :clickable="true" :draggable="true" />
                </GmapMap>
                </div>
                <div v-else>
                  <small>{{ friendData.user_full_name }} hasn't updated the location yet</small>
                </div>
              </div>
            </div>
            <div class="user-setting">
              <div class="title">
                <span>Setting</span>
              </div>
              <div class="setting-collection">
                <div class="setting-item row" @click="delete_friend()">
                  <b-col cols="1">
                    <b-icon icon="trash"></b-icon>
                  </b-col>
                  <b-col cols="8">Delete Friends</b-col>
                  <b-col cols="2" align="right">
                    <font-awesome-icon icon="chevron-right"></font-awesome-icon>
                  </b-col>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col md="8">
        <RoomChat />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import RoomChat from '../components/_base/Room_chat.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    RoomChat
  },
  data() {
    return {
      friendData: {},
      api_url: process.env.VUE_APP_API_URL,
      coordinate: {
        lat: 0,
        lng: 0
      }
    }
  },
  computed: {
    ...mapGetters({ friend_id: 'getFriendId', user: 'user' })
  },
  created() {
    console.log(this.friend_id)
    this.getUserById(this.friend_id)
      .then(res => {
        this.friendData = res.data[0]
        this.coordinate = {
          lat: Number(this.friendData.lat),
          lng: Number(this.friendData.lng),
        }
      }).catch(error => {
        console.log(error)
      })

    // this.$getLocation().then(coordinates => {
    //   this.coordinate = {
    //     lat: coordinates.lat,
    //     lng: coordinates.lng,
    //   }
    // }).catch(error => {
    //   alert(error)
    // })
  },
  methods: {
    ...mapActions(['getUserById', 'deleteFriend']),
    delete_friend() {
      const data = {
        user_id: this.user.user_id,
        friend_email: this.friendData.user_email
      }
      this.$confirm({
        message: `Are you sure want to delete this friend?`,
        button: {
          no: 'Cancel',
          yes: 'Yes'
        },
        callback: confirm => {
          if (confirm) {
            this.deleteFriend(data)
              .then(res => {
                this.makeToast(res.msg, 'primary')
                setTimeout(() => {
                  this.$router.push('/app')
                }, 3500)
              })
              .catch(error => {
                console.log(error)
                this.makeToast(error.data.msg, 'danger')
              })
          }
        }
      })
    },
    makeToast(msg, variant = null, append = false) {
      this.$bvToast.toast(`${msg}`, {
        title: 'Hei',
        autoHideDelay: 10000,
        appendToast: append,
        variant: variant,
        solid: true
      })
    }
  }
}

</script>
<style src="../assets/style/sidebar_profile.css" scoped></style>
