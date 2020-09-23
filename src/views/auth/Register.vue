<template>
  <div>
    <b-container>
      <div class="auth-wrapper">
        <div class="auth-header row">
          <b-col cols="2" class="icon-section">
            <router-link to="/login">
              <b-icon-chevron-left class="text-left"></b-icon-chevron-left>
            </router-link>
          </b-col>
          <b-col cols="8">
            <span>Register</span>
          </b-col>
          <b-col cols="2"></b-col>
        </div>
        <div class="auth-body">
          <span>Let’s create your account</span>
          <div class="auth-form">
            <div class="input-g">
              <label for="">Name</label>
              <input type="name" />
            </div>
            <div class="input-g">
              <label for="">Email</label>
              <input type="email" />
            </div>
            <div class="input-g">
              <label for="">Password</label>
              <input type="password" />
            </div>
          </div>
          <div class="auth-footer">
            <button class="primary">Register</button>
            <div class="text-center or">
              <span>Register With</span>
            </div>
            <button class="primary-outline"><img src="../../assets/google-icon.png" alt=""> Login</button>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>
<style src="../../assets/style/auth.css" scoped></style>
