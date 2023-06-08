import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuetify)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
