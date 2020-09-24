<template>
  <div>
    <b-row>
      <b-col md="4">
        <Sidebar />
      </b-col>
      <!-- <b-col md="8"></b-col> -->
    </b-row>
  </div>
</template>
<script>
import Sidebar from '../components/_base/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Sidebar
  }
}

</script>
<style src="../assets/style/style.css"></style>
