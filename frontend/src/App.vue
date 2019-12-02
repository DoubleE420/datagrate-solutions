<template>
  <v-app>
    <v-app-bar
      app
      hide-on-scroll
      flat
    >
      <div class="d-flex align-center">
        <v-img
          alt="DataGrate Logo"
          class="shrink mr-2"
          contain
          src="../public/img/logo_trans.png"
          transition="scale-transition"
          width="100"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn
        to="/"
        class="mr-4"
        color="secondary_button"
      >
        Home
      </v-btn>
      <v-btn
        to="/dbreader"
        color="secondary_button"
      >
        Database
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-overlay
        :value="loadingStatus"
      >
        <v-progress-circular
          color="primary"
          size="150"
          width="10"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
  },
  data: () => ({
    //
  }),
  computed: {
    localComputedThingy () {
      return 'something interesting'
    },
    ...mapState([
      'loadingStatus'
    ])
  }
}
</script>
