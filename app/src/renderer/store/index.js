import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const mutations = {
  getLogin (state, payload) {
    state.email = payload.email
    state.password = payload.password
    state.SecretKey = payload.SecretKey
  },
  setDbPath (state, payload) {
    state.dbPath = payload.dbPath
  },
  getDbData (state, payload) {
    state.dbData = payload.dbData
  },
  setChosedPwd (state, payload) {
    state.chosedPwd = payload.chosedPwd
  },
  setVAK (state, payload) {
    state.vaultAccessKey = payload.VAK
  },
  setIfCover (state, payload) {
    state.ifCover = payload.ifCover
  }
}
export default new Vuex.Store({
  state: {
    email: '',
    password: '',
    SecretKey: '',
    dbPath: '',
    dbData: '',
    chosedPwd: '',
    vaultAccessKey: '',
    ifCover: ''
  },
  getters,
  mutations,
  actions,
  strict: true,
  plugins: debug ? [createLogger()] : []
})

// import Vue from 'vue'
// import Vuex from 'vuex'

// import modules from './modules'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   modules,
//   strict: process.env.NODE_ENV !== 'production'
// })
