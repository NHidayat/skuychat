<template>
  <div class="home">
    <b-container>
      <img alt="Vue logo" src="../assets/logo.png" style="margin-top:10%; width: 130px">
      <div class="landing-title">
        Welcome to SkuyChat
      </div>
      <div class="action">
        <router-link to="/login">
          <button>Get Started</button>
        </router-link>
      </div>
    </b-container>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {}
}

</script>
<style>
.home {
  text-align: center;
}

.landing-title {
  margin-top: 50px;
  font-size: 40px;
  font-weight: 500;
}

.action {
  margin-top: 25px;
}

.action button {
  font-size: 19px;
  font-weight: 400;
  background: #7E98DF;
  border: 0;
  border-radius: 100px;
  color: #fff;
  transition: .5s;
  padding: 10px 50px 10px 50px;
}

.action button:hover {
	background: #677db9;
}

</style>
