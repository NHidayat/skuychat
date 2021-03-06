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
import VueGeolocation from 'vue-browser-geolocation'
import VueTimeago from 'vue-timeago'

library.add(faBars, faChevronLeft, faChevronRight, faPlus, faSearch, faUser, faBookmark, faUserPlus, faPaperPlane, faPowerOff)

Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MAPS_KEY,
    libraries: 'places'
  }
})
Vue.use(VueGeolocation)

Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'en',
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    ja: require('date-fns/locale/ja')
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
