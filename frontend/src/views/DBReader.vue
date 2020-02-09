<template>
  <v-container>
    <v-content>
      <v-btn
        @click="getData(sourceDBName)"
      >
        ALL DATA
      </v-btn>

      <v-btn
        @click="getuseridData(); useridSQL() "
      >
        user_id data
      </v-btn>

      <v-btn
        @click="getgenderData(); genderSQL() "
      >
        gender data
      </v-btn>

      <v-btn
        @click="getnameData(); namesSQL() "
      >
        name data
      </v-btn>
        <v-btn
        @click="getmaleData()"
      >
        Only Males
      </v-btn>
      <v-menu
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            outlined
            v-on="on"
          >
            <span>{{ firstStatement.name }}</span>
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in firstStatementTypes"
            :key="index"
            @click="selFirstStatement(item)"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            outlined
            v-on="on"
          >
            <span>{{ secondStatement }}</span>
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in secondStatementColumns"
            :key="index"
            @click="selColumn(item)"
          >
            <v-list-item-title>{{ item.COLUMN_NAME }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        outlined
        disabled
      >
        {{ getThirdStatement }}
      </v-btn>
      <v-menu
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            outlined
            v-on="on"
          >
            <span>{{ fourthStatement }}</span>
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in fourthStatementTables"
            :key="index"
            @click="selTable(item)"
          >
            <v-list-item-title>{{ getTableName(item) }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        color="success"
        @click="executeQuery()"
      >Execute</v-btn>
      <v-row>
        <v-col>
          <div v-for="dataItem in data" v-bind:key="dataItem.id" class="mt-4">
            <v-card>
              <v-card-title>
                Username: {{ dataItem.username }}
                <br>
                ID: {{ dataItem.user_id }}
              </v-card-title>
              <v-card-subtitle>
                {{ alldataSQL }}
              </v-card-subtitle>
              <v-card-text>
                First Name: {{ dataItem.first_name }}
                <br>
                Last Name: {{ dataItem.last_name }}
                <br>
                Gender: {{ dataItem.gender }}
                <br>
                Password: {{ dataItem.password }}
              </v-card-text>
            </v-card>
          </div>
        </v-col>
        <v-col>
          <div v-for="dataItem in data" v-bind:key="dataItem.id" class="mt-4">
            <v-card>
              <v-card-title>
                Username: {{ dataItem.username }}
                <br>
                ID: {{ dataItem.user_id }}
              </v-card-title>
              <v-card-subtitle>
                {{ alldataSQL }}
              </v-card-subtitle>
              <v-card-text>
                First Name: {{ dataItem.first_name }}
                <br>
                Last Name: {{ dataItem.last_name }}
                <br>
                Gender: {{ dataItem.gender }}
                <br>
                Password: {{ dataItem.password }}
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-content>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
import JQuery from 'jquery'
let $ = JQuery
export default {
  name: 'DBReader',
  components: {
  },
  data: () => ({
    firstStatement: 'None',
    secondStatement: '',
    fourthStatement: 'None',
    tableName: 'None'
  }),
  mounted () {
    this.readColumns()
    this.readTables()
  },
  methods: {
    ...mapActions([
      'readColumns',
      'readTables'
    ]),
    getData () {
      this.$store.dispatch('getData')
      console.log(this.data)
    },
    getuseridData () {
      this.$store.dispatch('getuseridData')
      console.log(this.data)
    },
    getgenderData () {
      this.$store.dispatch('getgenderData')
      console.log(this.data)
    },
    getnameData () {
      this.$store.dispatch('getnameData')
      console.log(this.data)
    },
    getmaleData () {
      this.$store.dispatch('getmaleData')
      console.log(this.data)
    },
    selFirstStatement (item) {
      this.firstStatement = item
    },
    selColumn (col) {
      console.log('selected column: ' + col.COLUMN_NAME)
      this.secondStatement = col.COLUMN_NAME
    },
    selTable (table) {
      var tableName = Object.values(table)[0]
      this.fourthStatement = tableName
    },
    getTableName (item) {
      var name = Object.values(item)[0]
      var val = Object.keys(item)[0]
      console.log(name, val)
      this.tableName = name
      var data = `{
        ` + val + ': ' + name + ` 
      }`
      var obj = JSON.parse(data)
      var result = $.parseJSON(obj)
      $.each(result, function (k, v) {
        alert(k + ' is ' + v)
      })
    },
    executeQuery () {
      var query = 'yay'
      console.log(query)
    }
  },
  computed: {
    alldataSQL () {
      return 'test sql statement return'
    },
    ...mapState([
      'data',
      'currentDB',
      'firstStatementTypes',
      'secondStatementColumns',
      'fourthStatementTables'
    ]),
    getThirdStatement () {
      if (this.firstStatement.id === 1 && this.secondStatement) {
        return 'FROM'
      }
      return 'NONE'
    }
  }
}
</script>
