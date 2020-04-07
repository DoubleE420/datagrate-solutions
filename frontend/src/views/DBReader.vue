<template>
  <div>
    <v-img
      src="../../public/img/Subpage_backgrounds.png"
      class="tw-absolute"
      max-height="100%"
    ></v-img>
    <v-container>
      <v-content>
        <v-card
          class="text-center pb-6"
        >
          <div class="tw-flex tw-flex-wrap justify-center align-center">
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
          <div
            v-show="selectedTable"
          >
            <hr class="mx-8 mt-4 tw-border-1 tw-border-gray-400"/>
            <v-card-title
              class="justify-center"
            >
              Select the column:
            </v-card-title>
            <div
              class="tw-flex tw-flex-wrap justify-center"
            >
              <v-btn
                class="ma-2"
                @click="getData({
                  table: currentTable,
                  col: '*'
                }); clickedData()"
              >*</v-btn>
              <div
                v-for="(item, index) in srcTableColumns"
                :key="index"
                @click="selColumn(item)"
                class="text-center"
              >
                <v-btn
                  class="ma-2"
                  @click="getData({
                    table: currentTable,
                    col: item.COLUMN_NAME
                  }); clickedData()"
                >
                  {{ item.COLUMN_NAME }} Data
                </v-btn>
              </div>
            </div>
          </div>
        </v-card>
        <v-card
          v-if="selected"
        >
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="ma-4"
          ></v-text-field>
          <v-data-table
            :items="data"
            :headers="getHeaders(data)"
            :items-per-page="5"
            :search="search"
            class="mt-4"
          ></v-data-table>
        </v-card>
        <download-csv
          v-show="data"
          :data   = "data"
          class="text-center mt-8"
        >
          <v-btn
            color="success"
          >
            Download Data
          </v-btn>
        </download-csv>
      </v-content>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
export default {
  name: 'DBReader',
  components: {
  },
  data: () => ({
    firstStatement: 'None',
    secondStatement: '',
    currentTable: 'None',
    tableName: 'None',
    selectedTable: false,
    selected: false,
    search: ''
  }),
  mounted () {
    this.readSrcTables()
  },
  methods: {
    ...mapActions([
      'readSrcColumns',
      'readSrcTables',
      'getData'
    ]),
    selFirstStatement (item) {
      this.firstStatement = item
    },
    selColumn (col) {
      this.secondStatement = col.COLUMN_NAME
    },
    selTable (table) {
      var name = Object.values(table)[0]
      this.currentTable = name
      this.selectedTable = true
    },
    getTableName (item) {
      return Object.values(item)[0]
    },
    clickedData () {
      this.selected = true
    },
    getHeaders (data) {
      var head = []
      if (data) {
        var keys = Object.keys(data[0])
        for (var i = 0; i < keys.length; ++i) {
          head.push(
            {
              'text': keys[i],
              'value': keys[i]
            }
          )
        }
      }
      console.log(head)
      return head
    }
  },
  computed: {
    ...mapState([
      'data',
      'currentDB',
      'srcTableColumns',
      'srcDBTables'
    ])
  },
  watch: {
    currentTable: function (val) {
      this.readSrcColumns(val)
    }
  }
}
</script>
