import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'

Vue.use(Vuex)

const store = Vuex.store({
  modules: {
    auth
  }
})

export default store