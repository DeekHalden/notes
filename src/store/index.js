import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import categories from './categories'
import notes from './notes'
import labels from './labels'

export default new Vuex.Store({
  modules: {
    categories,
    notes,
    labels
  }
})
