<template>
  <div>
    <b-container>
      <div class="auth-wrapper">
        <div class="auth-header">
          <span>Login</span>
        </div>
        <div class="auth-body">
          <span>Hi, Welcome back!</span>
          <div class="auth-form">
            <div class="input-g">
              <label for="">Email</label>
              <input type="email" />
            </div>
            <div class="input-g">
              <label for="">Password</label>
              <input type="password" />
            </div>
          </div>
          <div class="text-right">
            <router-link class="text-link primary" to="/forgot-password">Forgot password?</router-link>
          </div>
          <div class="auth-footer">
            <button class="primary">Login</button>
            <div class="text-center or">
              <span>Login With</span>
            </div>
            <button class="primary-outline"><img src="../../assets/google-icon.png" alt=""> Login</button>
            <div class="text-footer">
              <span>Don’t have an account?</span>
              <router-link class="text-link primary" to="/register"> Sign Up</router-link>
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>
<style src="../../assets/style/auth.css" scoped></style>
