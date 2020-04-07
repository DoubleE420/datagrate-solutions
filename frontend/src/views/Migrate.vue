<template>
  <v-container>
    <v-content>
      <v-row
        justify="space-around"
      >
        <v-col>
          <v-row
            class="justify-center"
          >
          </v-row>
          <h1
            class="text-center tw-text-2xl mb-4"
          >
            Source: MySQL
          </h1>
          <v-card>
            <v-card-title
              class="justify-center"
            >
              Origin Database Tables
            </v-card-title>
          </v-card>
          <div v-for="table in srcDBTables" :key="table.id">
            <v-card
              class="mx-4 mt-4 pa-4"
            >
              <v-card-title>
                {{ getTableName(table) }}
              </v-card-title>
              <div v-for="col in table.motherObj" :key="col.id">
                {{ col }}
              </div>
            </v-card>
          </div>
        </v-col>
        <v-icon
          large
        >mdi-arrow-right</v-icon>
        <v-col>
          <v-row
            class="justify-center"
          >
          </v-row>
          <h1
            class="text-center tw-text-2xl mb-4"
          >
            Destination: {{ dbType }}
          </h1>
          <v-card>
            <v-card-title
              class="justify-center"
            >
              Desination Database Tables
            </v-card-title>
          </v-card>
          <div v-if="dbType !== 'None'">
            <div v-for="table in destDBTables" :key="table.id">
              <v-card
                class="ma-4"
              >
                <v-card-title
                  v-if="table.Tables_in_datagrate"
                >
                  {{ table.Tables_in_datagrate }}
                </v-card-title>
                <v-card-title
                  v-else
                >
                  {{ table }}
                </v-card-title>
              </v-card>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row
        class="mx-auto"
        justify="space-around"
      >
        <v-card
          class="text-center px-4"
        >
          <v-card-title
            class="tw-text-xl"
          >
            Migrate source database to:
          </v-card-title>
          <v-row
            justify="space-around"
          >
            <v-menu
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  outlined
                  v-on="on"
                >
                  <span>{{ dbType }}</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in migrateTypes"
                  :key="index"
                  @click="dbType = item"
                >
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
          <div class="tw-flex tw-flex-wrap justify-center align-center"
            v-show="dbType === 'MySQL'"
          >
            <v-card-title class="justify-center">Select the Table:</v-card-title>
            <v-menu
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  outlined
                  v-on="on"
                >
                  <span>{{ currentTable }}</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in srcDBTables"
                  :key="index"
                  @click="selTable(item)"
                >
                  <v-list-item-title>{{ getTableName(item) }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <v-btn
            color="success"
            class="my-4"
            @click="startMigration({dbType, currentTable})"
            v-show="currentTable !== 'None' || dbType === 'PostgreSQL'"
          >
            Start Migration
          </v-btn>
        </v-card>
      </v-row>
    </v-content>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Migrate',
  components: {
  },
  data: () => ({
    dbType: 'MySQL',
    currentTable: 'None'
  }),
  mounted () {
    this.readSrcTables()
    this.readDestTables(this.dbType)
    // this.readDestColumns(this.dbType)
  },
  methods: {
    updateDBName (name) {
      this.sourceDBName = name
    },
    ...mapActions([
      'readSrcTables',
      'readDestTables',
      'readSrcColumns',
      'readDestColumns',
      'startMigration'
    ]),
    getColumns (table) {
      var name = Object.values(table)[0]
      var columns = this.readSrcColumns(name)
      // console.log(columns)
      return columns
    },
    getTableName (item) {
      return Object.values(item)[0]
    },
    selTable (table) {
      var name = Object.values(table)[0]
      this.currentTable = name
      this.selectedTable = true
    }
  },
  computed: {
    alldataSQL () {
      return 'test sql statement return'
    },
    ...mapState([
      'data',
      'srcDBTables',
      'srcTableColumns',
      'sourceLoginStatus',
      'migrateColumns',
      'destDBTables',
      'migrateTypes'
    ])
  },
  watch: {
    dbType: function () {
      console.log(this.dbType)
      this.readDestTables(this.dbType)
      // this.readDestColumns(this.dbType)
    }
  }
}
</script>
