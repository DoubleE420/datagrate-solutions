<template>
  <v-container>
    <v-content>
      <v-btn
        @click="getData()"
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
      <div v-for="dataItem in data" v-bind:key="dataItem.id" class="mt-4">
        <v-card>
          <v-card-title>
            {{ dataItem.username }}
            {{ dataItem.user_id }}
          </v-card-title>
          <v-card-subtitle>
            {{ alldataSQL }}
          </v-card-subtitle>
          <v-card-text>
            {{ dataItem.first_name }}
            {{ dataItem.last_name }}
            {{ dataItem.gender }}
            {{ dataItem.password }}
          </v-card-text>
        </v-card>
      </div>
    </v-content>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
  name: 'home',
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
