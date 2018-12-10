import Vue from 'vue'
import { mapActions } from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VModal from 'vue-js-modal'

import VeeValidate from 'vee-validate'

Vue.use(VModal, { dynamic: true })
Vue.use(VeeValidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  methods: {
    ...mapActions('categories', [
      'fetch',
    ]),
  },
  created() {
    this.fetch()
  },
}).$mount('#app')
