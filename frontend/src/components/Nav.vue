<template>
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
        src="../../public/img/logo_trans.png"
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
</template>

<script>
export default {
  name: 'Nav'
}
</script>
