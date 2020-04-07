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
          <div v-for="table in migrateColumns" :key="table.id">
            <v-card
              class="mx-4 mt-4 pa-4"
            >
              <v-card-title>
                {{ table.tableName }}
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
            Destination: {{ type }}
          </h1>
          <v-card>
            <v-card-title
              class="justify-center"
            >
              Desination Database Tables
            </v-card-title>
          </v-card>
          <div v-if="type !== 'None'">
            <div v-for="table in destDBTables" :key="table.id">
              <v-card
                class="ma-4"
              >
                <v-card-title>
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
          class="text-center"
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
                  <span>{{ type }}</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in migrateTypes"
                  :key="index"
                  @click="type = item"
                >
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
          <v-btn
            color="success"
            class="my-4"
            @click="startMigration(type)"
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
    type: 'MySQL'
  }),
  mounted () {
    // this.readSrcTables()
    this.readDestTables(this.type)
    // this.readDestColumns(this.type)
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
    type: function () {
      console.log(this.type)
      this.readDestTables(this.type)
      // this.readDestColumns(this.type)
    }
  }
}
</script>
