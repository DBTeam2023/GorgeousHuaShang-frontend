import { createStore } from 'vuex'
import ModuleUser from './user'
import ModuleHomepage from './homepage'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: ModuleUser,
    homepage: ModuleHomepage,
  }
})
