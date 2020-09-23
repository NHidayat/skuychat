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
            <span>Forgot Password</span>
          </b-col>
          <b-col cols="2"></b-col>
        </div>
        <div class="auth-body">
          <span>You’ll get messages soon on your e-mail </span>
          <div class="auth-form">
            <div class="input-g">
              <label for="">Email</label>
              <input type="email" />
            </div>
          </div>
          <div class="auth-footer">
            <button class="primary">Send</button>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>
<style src="../../assets/style/auth.css" scoped></style>
