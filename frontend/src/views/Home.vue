<template>
  <v-container>
    <v-content>
      <v-row align="center" justify="center">
        <v-img
          src="../../public/img/logo_trans.png"
          max-width="100%"
          transition="scale-transition"
        ></v-img>
      </v-row>
    </v-content>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    //
  },
  methods: {
    //
  },
  computed: {
    randomFunction () {
      //
      return true
    },
    ...mapState([
      //
    ])
  }
}
</script>
