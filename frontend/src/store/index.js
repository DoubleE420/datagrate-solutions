import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    loadingStatus: false,
    data: ''
  },
  mutations: {
    SET_LOADING_STATUS (state, status) {
      state.loadingStatus = status
    },
    GET_DATA (state, data) {
      state.data = data
    }
  },
  actions: {
    getData (context) {
      context.commit('SET_LOADING_STATUS', true)
      axios.get('/api/all_data').then(response => {
        context.commit('GET_DATA', response.data)
        context.commit('SET_LOADING_STATUS', false)
      })
    },
    getuseridData (context) {
      context.commit('SET_LOADING_STATUS', true)
      axios.get('/api/user_id_column').then(response => {
        context.commit('GET_DATA', response.data)
        context.commit('SET_LOADING_STATUS', false)
      })
    },
    getgenderData (context) {
      context.commit('SET_LOADING_STATUS', true)
      axios.get('/api/gender_column').then(response => {
        context.commit('GET_DATA', response.data)
        context.commit('SET_LOADING_STATUS', false)
      })
    },
    getnameData (context) {
      context.commit('SET_LOADING_STATUS', true)
      axios.get('/api/name_columns').then(response => {
        context.commit('GET_DATA', response.data)
        context.commit('SET_LOADING_STATUS', false)
      })
    }
  },
  modules: {
  }
})
