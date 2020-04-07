<template>
  <v-app-bar
    app
    hide-on-scroll
    flat
  >
    <div class="d-flex align-center">
      <v-img
        alt="DataGrate Logo"
        class="shrink mr-2 tw-cursor-pointer"
        contain
        src="../../public/img/logo_trans.png"
        transition="scale-transition"
        width="100"
        @click="goHome()"
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
      class="mr-4"
      color="secondary_button"
    >
      View Database
    </v-btn>
    <v-btn
      to="/migrate"
      class="mr-4"
      color="secondary_button"
    >
      Migrate
    </v-btn>
    <v-btn
      to="/about"
      class="mr-4"
      color="secondary_button"
    >
      About Us
    </v-btn>
    <v-btn
      href="http://localhost:8081"
      color="secondary_button"
    >
      Adminer
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Nav',
  methods: {
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>
