import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    alertStatus: false,
    loadingStatus: false,
    migrateTypes: [
      'MySQL',
      'PostgreSQL'
    ],
    currentDB: 'datagrate',
    currentTable: '',
    sourceDBs: '',
    data: '',
    migrateColumns: [],
    srcTableColumns: 'lol',
    srcDBTables: [],
    destDBTables: [],
    destDBColumns: []
  },
  mutations: {
    SET_LOADING_STATUS (state, status) {
      state.loadingStatus = status
    },
    SET_ALERT_STATUS (state, data) {
      state.alertStatus = data
    },
    GET_SOURCE_DB (state, data) {
      state.sourceDBs = data
    },
    GET_DATA (state, data) {
      state.data = data
      console.log(data)
    },
    GET_COLUMNS (state, data) {
      state.srcTableColumns = data
    },
    SET_MIGRATE_COLUMNS (state, data) {
      console.log(data.motherObj)
      state.migrateColumns.push(data)
    },
    GET_TABLES (state, data) {
      state.srcDBTables = data
    },
    SET_DEST_TABLES (state, data) {
      state.destDBTables = data
    },
    SET_DEST_COLUMNS (state, data) {
      state.destDBColumns = data
    }
  },
  actions: {
    initReadDB (context) {
      context.commit('SET_LOADING_STATUS', true)
      axios.get('/api/source/init').then(response => {
        var tables = response.data
        context.commit('GET_SOURCE_DB', tables)
        console.log('got data for init')
        // will show the current available databases
        console.log(tables)
        context.commit('SET_LOADING_STATUS', false)
      })
    },
    readSrcColumns ({ commit, dispatch }, tableName) {
      commit('SET_LOADING_STATUS', true)
      var motherObj = []
      var jsonObj = {}
      axios.post('/api/source/readcolumns', {
        table: tableName
      })
        .then(response => {
          var columns = response.data
          for (var c = 0; c < columns.length; ++c) {
            var colName = columns[c].COLUMN_NAME
            jsonObj[c] = colName
            motherObj.push(colName)
          }
          // console.log(jsonObj)
          // console.log(motherObj)
          commit('SET_MIGRATE_COLUMNS', { tableName, motherObj })
          // console.log(columns)
          commit('GET_COLUMNS', columns)
          commit('SET_LOADING_STATUS', false)
        })
    },
    readSrcTables ({ commit, dispatch }) {
      commit('SET_LOADING_STATUS', true)
      axios.get('/api/source/readtables').then(response => {
        commit('GET_TABLES', response.data)
        commit('SET_LOADING_STATUS', false)
      })
    },
    readDestTables ({ commit, dispatch }) {
      commit('SET_LOADING_STATUS', true)
      axios.get(`/api/dest/readtables`).then(response => {
        commit('SET_DEST_TABLES', response.data)
        commit('SET_LOADING_STATUS', false)
      })
    },
    readDestColumns ({ commit, dispatch }) {
      commit('SET_LOADING_STATUS', true)
      axios.get('/api/dest/readcolumns').then(response => {
        commit('SET_DEST_COLUMNS', response.data)
        commit('SET_LOADING_STATUS', false)
      })
    },
    getData ({ commit, dispatch }, data) {
      commit('SET_LOADING_STATUS', true)
      axios.post('/api/source/all_data', {
        table: data.table,
        column: data.col
      })
        .then(response => {
          commit('GET_DATA', response.data)
          commit('SET_LOADING_STATUS', false)
        })
    },
    startMigration ({ commit, dispatch }, type) {
      console.log('starting migration...')
      commit('SET_LOADING_STATUS', true)
      axios.post('/api/source/startmigration', {
        dbType: type
      }).then(response => {
        console.log(response.data)
        dispatch('readDestTables')
        commit('SET_ALERT_STATUS', true)
        commit('SET_LOADING_STATUS', false)
      })
    }
  },
  modules: {
  }
})
