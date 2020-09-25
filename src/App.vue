<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse'])
  },
  created() {
    // console.log('hello')
    this.interceptorRequest()
    this.interceptorResponse()
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap');

body {
  background: #E5E5E5 !important;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: Rubik, sans-serif;
}

</style>
