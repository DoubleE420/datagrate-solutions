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
import { mapState } from 'vuex'
export default {
  name: 'DBReader',
  components: {
  },
  methods: {
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
    }
  },
  computed: {
    alldataSQL () {
      return 'test sql statement return'
    },
    ...mapState([
      'data'
    ])
  }
}
</script>
