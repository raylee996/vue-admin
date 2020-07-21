import Vue from 'vue'
import Vuex from 'vuex'
import rootState from "./rootState"
import rootMutations from "./rootMutations"

Vue.use(Vuex)

export default new Vuex.Store({
  state: rootState,
  mutations: rootMutations,
  actions: {
  },
  modules: {
  }
})
