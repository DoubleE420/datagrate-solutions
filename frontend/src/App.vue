<template>
  <v-app>
    <Nav/>
    <v-content>
      <!--
        Loading animation
      -->
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
      <!--
        end loading animation
      -->
      <router-view></router-view>
      <!--
        completion alert
      -->
      <v-snackbar
        v-model="alert"
        color="success"
        class="text-center"
        top
        :timeout=0
      >
        Migration Complete!
        <v-btn
          @click.stop="viewDetails = true"
        >
          View Details
        </v-btn>
        <v-overlay
          :value="viewDetails"
        >
          <v-container>
            <v-card
              class="mx-auto"
            >
              <v-card-title>
                Migration Details
              </v-card-title>
              <v-card-text
              >
                {{ alertText }}
              </v-card-text>
              <v-btn
                color="error"
                @click.stop="viewDetails = false"
                class="mb-4"
              >
                Close
              </v-btn>
            </v-card>
          </v-container>
        </v-overlay>
        <v-btn
          icon
          @click.stop="alert = false"
        >X</v-btn>
      </v-snackbar>
      <!--
        end completion alert
      -->
    </v-content>
    <footer
      class="mt-4 tw-bg-blue-700 pa-4 tw-border-t tw-border-1 tw-border-gray-100"
    >
      <v-row
        justify="space-around"
        class="tw-text-white"
      >
        <ul class="text-center">
          <p class="tw-font-bold">Site Map</p>
          <li>
            <router-link tag="div" to="/" class="mb-2 tw-cursor-pointer">Home</router-link>
          </li>
          <li>
            <router-link tag="div" to="/dbreader" class="mb-2 tw-cursor-pointer">View Database</router-link>
          </li>
          <li>
            <router-link tag="div" to="/migrate" class="mb-2 tw-cursor-pointer">Migrate</router-link>
          </li>
          <li>
            <router-link tag="div" to="/about" class="mb-2 tw-cursor-pointer">About Us</router-link>
          </li>
          <li>
            <router-link tag="div" to="/adminer" class="mb-2 tw-cursor-pointer">Adminer</router-link>
          </li>
        </ul>
        <ul class="text-center">
          <p class="tw-font-bold">Supported Database Types</p>
          <li>Sources:</li>
          <li>MySQL</li>
          <li><p></p></li>
          <li>Destinations:</li>
          <li>MySQL</li>
          <li>PostgreSQL</li>
        </ul>
        <ul class="text-center">
          <p class="tw-font-bold">Meet the Founders:</p>
          <li>
            <router-link tag="div" to="/about" class="mb-2 tw-cursor-pointer">Nayan Patel</router-link>
          </li>
          <li>
            <router-link tag="div" to="/about" class="mb-2 tw-cursor-pointer">Sean Batt</router-link>
          </li>
        </ul>
      </v-row>
      <p class="text-center mt-4">DataGrate Solutions© 2019</p>
    </footer>
  </v-app>
</template>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

.router-link-exact-active {
  @apply tw-border-b tw-border-green-400
}
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
    alert: false,
    viewDetails: false
  }),
  computed: {
    localComputedThingy () {
      return 'something interesting'
    },
    ...mapState([
      'loadingStatus',
      'alertStatus',
      'alertText'
    ])
  },
  methods: {
    ...mapActions([
      'initReadDB'
    ])
  },
  mounted () {
    this.initReadDB()
  },
  watch: {
    alertStatus: function () {
      console.log('status changed')
      this.alert = true
    }
  }
}
</script>
