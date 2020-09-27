<template>
  <div class="sidebar-header">
    <b-row>
      <b-col cols="9">
        <span>Skuychat</span>
      </b-col>
      <b-col cols="3" align="right">
        <b-dropdown size="lg" variant="link" right toggle-class="text-decoration-none" no-caret>
          <template v-slot:button-content>
            <font-awesome-icon icon="bars" class="text-link bar-icon" />
          </template>
          <b-dropdown-item href="#" @click="get_friendList" v-b-modal.friend-modal>
            <font-awesome-icon :icon="['far', 'user']" class="list-icon" />
            <span>Contacts</span>
          </b-dropdown-item>
          <b-dropdown-item href="#">
            <font-awesome-icon :icon="['far', 'bookmark']" class="list-icon" />
            <span>Save Messages</span>
          </b-dropdown-item>
          <b-dropdown-item href="#" v-b-modal.add-friend-modal>
            <font-awesome-icon icon="user-plus" class="list-icon" />
            <span>Invite Fiends</span>
          </b-dropdown-item>
          <b-dropdown-item href="#" @click="logout">
            <font-awesome-icon icon="power-off" class="list-icon" />
            <span>Logout</span>
          </b-dropdown-item>
        </b-dropdown>
      </b-col>
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
    <b-modal id="add-friend-modal" ref="add-friend-modal" header-bg-variant="info" header-text-variant="light" centered hide-footer title="Add Friend">
      <p class="my-4">Insert your friend email</p>
      <b-form inline @submit.prevent="add_friend">
        <b-input placeholder="Email" v-model="form.friend_email" required />
        <b-button variant="info" class="ml-2" type="submit">
          <font-awesome-icon icon="user-plus" class="list-icon" />
        </b-button>
      </b-form>
      <b-alert class="mt-3" :variant="alertVariant" :show="isAlert">{{ alertMsg }}</b-alert>
    </b-modal>
    <b-modal id="friend-modal" ref="friend-modal" header-bg-variant="info" header-text-variant="light" centered hide-footer title="Contacts">
      <b-row v-for="(v, i) in friendList" :key="i" class="card-chat-items">
        <b-col cols="2">
          <img :src="api_url + v.friend_img" alt="" style="width: 50px;border-radius: 10px" v-if="v.friend_img !== null">
          <img src="../../assets/default-user.png" alt="" style="width: 50px;border-radius: 10px" v-else>
        </b-col>
        <b-col cols="8"><span>{{ v.friend_name }}</span></b-col>
        <b-col cols="2">
          <font-awesome-icon @click="post_room(v.friend_id)" class="primary" :icon="['far', 'paper-plane']"></font-awesome-icon>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      isLoading: false,
      isAlert: false,
      alertMsg: '',
      isMsg: '',
      alertVariant: '',
      api_url: process.env.VUE_APP_API_URL,
      form: {
        user_id: '',
        friend_email: ''
      }
    }
  },
  created() {},
  computed: {
    ...mapGetters({
      friendList: 'getFriendList',
      user: 'user',
      userData: 'getUserData'
    })
  },
  methods: {
    ...mapActions(['getFriendByUser', 'addFriend', 'logout', 'postRoom', 'getRoomById']),
    get_friendList() {
      this.getFriendByUser(this.user.user_id)
    },
    post_room(data) {
      const setData = {
        sender_id: this.user.user_id,
        getter_id: data
      }
      this.postRoom(setData)
      .then(res => {
        if (res.status == 255) {
          const setData = {
            user_id: this.user.user_id,
            room_id: res.data.room_id
          }
          this.getRoomById(setData)
          this.closeModal('friend-modal')
        } else {
          const setData = {
            user_id: this.user.user_id,
            room_id: res.data.result_a.room_id
          }
          this.getRoomById(setData)
          this.closeModal('friend-modal')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    add_friend() {
      this.isLoading = true
      this.form.user_id = this.user.user_id
      this.addFriend(this.form)
        .then(result => {
          this.isLoading = false
          this.makeToast(result.msg, 'primary')
          this.onReset()
          this.closeModal('add-friend-modal')
        }).catch(error => {
          this.alertMsg = error.data.msg
          this.isAlert = true
          this.alertVariant = 'danger'
          this.isLoading = false
        })
    },
    onReset() {
      this.form = {
        friend_email: ''
      }
    },
    makeToast(msg, variant = null, append = false) {
      this.$bvToast.toast(`${msg}`, {
        title: 'Hei',
        autoHideDelay: 10000,
        appendToast: append,
        variant: variant,
        solid: true
      })
    },
    closeModal(modalId) {
      this.$refs[modalId].hide()
    }
  }
}

</script>
