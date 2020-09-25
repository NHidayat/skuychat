<template>
  <div>
    <b-container>
      <div class="auth-wrapper">
        <div class="auth-header row">
          <b-col cols="2" class="icon-section">
            <router-link to="/login">
              <font-awesome-icon icon="chevron-left" class="text-link primary" />
            </router-link>
          </b-col>
          <b-col cols="8">
            <span>Register</span>
          </b-col>
          <b-col cols="2"></b-col>
        </div>
        <div class="auth-body">
          <b-form @submit.prevent="onSubmit">
            <span>Let’s create your account</span>
            <div class="auth-form">
              <div class="input-g">
                <label for="">Username</label>
                <div style="display: flex">
                  <span style="width: 15px; border-bottom: 1px solid black">@</span>
                  <input style="width: 100%" type="name" v-model="form.user_name" required />
                </div>
              </div>
              <div class="input-g">
                <label for="">Email</label>
                <input type="email" v-model="form.user_email" required />
              </div>
              <div class="input-g">
                <label for="">Password</label>
                <input type="password" v-model="form.user_password" required />
              </div>
              <div class="input-g">
                <label for="">Password Confirmation</label>
                <input type="password" v-model="form.user_confirm_password" required />
              </div>
            </div>
            <b-alert :variant="alertVariant" :show="isAlert">{{ alertMsg }}</b-alert>
            <div class="auth-footer">
              <button class="primary">
                <b-spinner small v-show="isLoading"></b-spinner>
                <span> Register</span>
              </button>
              <div class="text-center or">
                <span>Register With</span>
              </div>
              <button class="primary-outline"><img src="../../assets/google-icon.png" alt="">
                <span> Register</span>
              </button>
            </div>
          </b-form>
        </div>
      </div>
    </b-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  title: 'Register - SkuyChat',
  name: 'Login',
  data() {
    return {
      form: {
        user_name: '',
        user_email: '',
        user_password: '',
        user_confirm_password: ''
      },
      isLoading: false,
      isAlert: false,
      alertMsg: '',
      alertVariant: ''
    }
  },
  computed: {},
  methods: {
    ...mapActions(['register']),
    onSubmit() {
      this.isLoading = true
      this.register(this.form)
        .then(result => {
          this.alertVariant = 'primary'
          this.alertMsg = 'Congratulation! Your registration is success. You will redirected to login page'
          setTimeout(() => {
            this.$router.push('/app')
          }, 8000)
          this.isAlert = true
          this.isLoading = false
          this.onReset()
        }).catch(error => {
          this.alertMsg = error.data.msg
          this.isAlert = true
          this.alertVariant = 'danger'
          this.isLoading = false
        })
    },
    onReset() {
      this.form = {
        user_name: '',
        user_email: '',
        user_password: '',
        user_confirm_password: ''
      }
    }
  }
}

</script>
<style src="../../assets/style/auth.css" scoped></style>
