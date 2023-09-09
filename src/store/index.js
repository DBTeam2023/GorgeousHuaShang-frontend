import { createStore } from 'vuex'
import ModuleUser from './user'
import ModuleHomepage from './homepage'
import ModuleStore from './store'

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
    store: ModuleStore,
  }
})
