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
        <div class="setting-item row" @click="setUser(userData)"  v-b-modal.edit-user>
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
     <b-modal id="edit-user" ref="edit-user" hide-footer title="Edit Profile">
      <form @submit.prevent="patchUser">
        <div class=" form-group row">
          <label class="col-sm-2 col-form-label">Username</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="form.user_name" required />
          </div>
        </div>
        <div class=" form-group row">
          <label class="col-sm-2 col-form-label">Full Name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="form.user_full_name" required />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Image</label>
          <div class="col-sm-10">
            <input type="file" @change="handleFile" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Phone</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" v-model="form.user_phone" required />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">About</label>
          <div class="col-sm-8">
            <textarea class="form-control" v-model="form.user_bio"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn my-danger col-md-3" @click="closeModal">Cancel</button>
          <button type="submit" class="btn my-primary col-md-3">Update</button>
        </div>
      </form>
    </b-modal>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {},
  data() {
    return {
      api_url: process.env.VUE_APP_API_URL,
      isMsg: '',
      form: {
        user_name: '',
        user_full_name: '',
        user_image: '',
        user_bio: '',
        user_phone:''
      }
    }
  },
  created() {
    this.getUserById(this.user.user_id)
  },
  computed: {
    ...mapGetters({ user: 'user', userData: 'getUserData' })
  },
  methods: {
    ...mapActions(['getUserById', 'updateUser']),
    handleFile(e) {
      this.form.user_image = e.target.files[0]
    },
    setUser(data) {
      this.form = {
        user_name: data.user_name,
        user_full_name: data.user_full_name,
        user_image: data.user_image,
        user_bio: data.user_bio,
        user_phone: data.user_phone
      }
      this.product_id = data.product_id
    },
    patchUser() {
      const data = new FormData()
      data.append('user_name', this.form.user_name)
      data.append('user_full_name', this.form.user_full_name)
      data.append('user_image', this.form.user_image)
      data.append('user_bio', this.form.user_bio)
      data.append('user_phone', this.form.user_phone)
      const setData = {
        user_id: this.user.user_id,
        form: data
      }
      this.updateUser(setData)
        .then(res => {
          this.isMsg = res.data.msg
          this.makeToast(this.isMsg, 'primary')
          this.closeModal()
          this.getUserById(this.user.user_id)
        })
        .catch(error => {
          console.log(error)
          this.isMsg = error.response.data.msg
          this.makeToast(this.isMsg, 'danger')
        })
    },
    closeModal() {
      this.$refs['edit-user'].hide()
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
  }
}

</script>
<style src="../../assets/style/sidebar_profile.css" scoped></style>
