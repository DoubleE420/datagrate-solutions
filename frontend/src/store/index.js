import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    loadingStatus: false,
    sourceLoginStatus: true,
    destLoginStatus: false,
    currentDB: 'datagrate',
    sourceDBs: '',
    data: '',
    firstStatementTypes: [
      {
        name: 'SELECT',
        id: 1
      },
      {
        name: 'UPDATE',
        id: 2
      },
      {
        name: 'DELETE',
        id: 3
      },
      {
        name: 'INSERT INTO',
        id: 4
      },
      {
        name: 'CREATE DATABASE',
        id: 5
      },
      {
        name: 'ALTER DATABASE',
        id: 6
      }
    ],
    secondStatementColumns: [
      {
        name: '*',
        id: 1
      }
    ],
    fourthStatementTables: []
  },
  mutations: {
    SET_LOADING_STATUS (state, status) {
      state.loadingStatus = false
    },
    SET_LOGIN_SRC_STATUS (state, data) {
      state.sourceLoginStatus = data
    },
    SET_LOGIN_DEST_STATUS (state, data) {
      state.sourceLoginStatus = data
    },
    GET_SOURCE_DB (state, data) {
      state.sourceDBs = data
    },
    GET_DATA (state, data) {
      state.data = data
    },
    GET_COLUMNS (state, data) {
      state.secondStatementColumns = data
    },
    GET_TABLES (state, data) {
      state.fourthStatementTables = data
    }
  },
  actions: {
    initReadDB (context) {
      console.log('getting data for init')
      context.commit('SET_LOADING_STATUS', true)
      axios.get('/api/source/init').then(response => {
        context.commit('GET_SOURCE_DB', response.data)
        console.log('got data for init')
        console.log(response.data)
        context.commit('SET_LOADING_STATUS', false)
      })
    },
    readColumns (context) {
      context.commit('SET_LOADING_STATUS', true)
      axios.post('/api/source/readcolumns').then(response => {
        context.commit('GET_COLUMNS', response.data)
        context.commit('SET_LOADING_STATUS', false)
      })
    },
    readTables (context) {
      context.commit('SET_LOADING_STATUS', true)
      axios.post('/api/source/readtables').then(response => {
        console.log(response.data)
        context.commit('GET_TABLES', response.data)
        context.commit('SET_LOADING_STATUS', false)
      })
    },
    sourceLogin ({ commit, dispatch }, data) {
      // will handle logging into source db
      commit('SET_LOADING_STATUS', true)
      axios.post('/api/source/login', {
        server: data.server,
        username: data.username,
        password: data.password
      })
        .then(response => {
          if (response.status === 200) {
            dispatch('initReadDB')
            commit('SET_LOADING_STATUS', false)
            commit('SET_LOGIN_SRC_STATUS', true)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    destLogin (server, username, password) {
      // will handle logging into destination db
    },
    getData ({ commit, dispatch }, dbName) {
      commit('SET_LOADING_STATUS', true)
      axios.get('/api/source/all_data', {
        db: dbName
      })
        .then(response => {
          commit('GET_DATA', response.data)
          commit('SET_LOADING_STATUS', false)
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
    },
    getmaleData (context) {
      context.commit('SET_LOADING_STATUS', true)
      axios.get('/api/male_columns').then(response => {
        context.commit('GET_DATA', response.data)
        context.commit('SET_LOADING_STATUS', false)
      })
    }
  },
  modules: {
  }
})
