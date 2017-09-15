import Vue from 'vue'
import Vuex from 'vuex'

import eatup from './eatup'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    eatup: eatup,
    user: user,
    shared: shared
  }
})
