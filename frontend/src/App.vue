<template>
  <v-app>
    <Nav/>
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
    <footer
      class="tw-bg-blue-700"
    >
      <p class="">DataGrate Solutions© 2019</p>
    </footer>
  </v-app>
</template>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

<script>
import Nav from '@/components/Nav.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'App',
  components: {
    Nav
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
  },
  methods: {
    ...mapActions([
      'initReadDB'
    ])
  },
  mounted () {
    this.initReadDB()
  }
}
</script>
