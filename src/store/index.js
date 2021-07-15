import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    saveUser(state,val){
      state.user = JSON.parse(val)
    }
  },
  actions: {
  },
  modules: {
  }
})
