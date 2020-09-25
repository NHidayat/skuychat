<template>
  <div>
    <b-container>
      <div class="auth-wrapper">
        <div class="auth-header">
          <span>Login</span>
        </div>
        <div class="auth-body">
          <b-form @submit.prevent="onSubmit">
            <span>Hi, Welcome back!</span>
            <div class="auth-form">
              <div class="input-g">
                <label for="">Email</label>
                <input type="email" v-model="form.user_email" required/>
              </div>
              <div class="input-g">
                <label for="">Password</label>
                <input type="password" v-model="form.user_password" required/>
              </div>
            </div>
            <b-alert variant="warning" align="center" :show="isAlert">{{ alertMsg }}</b-alert>
            <div class="text-right">
              <router-link class="text-link primary" to="/forgot-password">Forgot password?</router-link>
            </div>
            <div class="auth-footer">
              <button type="submit" class="primary">
                <b-spinner small v-show="isLoading"></b-spinner> Login
              </button>
              <div class="text-center or">
                <span>Login With</span>
              </div>
              <button class="primary-outline"><img src="../../assets/google-icon.png" alt=""> Login</button>
              <div class="text-footer">
                <span>Don’t have an account?</span>
                <router-link class="text-link primary" to="/register"> Sign Up</router-link>
              </div>
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
  title: 'Login - SkuyChat',
  name: 'Login',
  data() {
    return {
      form: {
        user_email: '',
        user_password: ''
      },
      isLoading: false,
      isAlert: false,
      alertMsg: ''
    }
  },
  created() {},
  computed: {},
  methods: {
    ...mapActions(['login']),
    onSubmit() {
      this.isLoading = true
      this.login(this.form)
        .then(result => {
          this.$router.push('/app')
        }).catch(error => {
          this.alertMsg = error.data.msg
          this.isAlert = true
          this.isLoading = false
        })
    },
    onReset() {
      this.form = {
        user_email: '',
        user_password: ''
      }
    }
  }
}

</script>
<style src="../../assets/style/auth.css" scoped></style>
