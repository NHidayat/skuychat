import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faChevronLeft, faChevronRight, faPlus, faSearch, faUserPlus, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { faUser, faBookmark, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueConfirmDialog from 'vue-confirm-dialog'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeolocation from 'vue-browser-geolocation';

library.add(faBars, faChevronLeft, faChevronRight, faPlus, faSearch, faUser, faBookmark, faUserPlus, faPaperPlane, faPowerOff)

Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDi7yhz1Om5L5fh8LbwAvZ5mXEEHygwJ94',
    libraries: 'places',  
  },
})
Vue.use(VueGeolocation)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
