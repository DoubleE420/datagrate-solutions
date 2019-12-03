<template>
  <div>
    <v-img
      src="../../public/img/background_angle.png"
      width="100%"
      max-width="100%"
      max-height="100%"
      elevation="0"
    >
      <v-row
        justify="space-around"
      >
        <v-card
          class="px-12 py-4 custom-mt"
          width="500"
        >
          <h1 class="tw-text-4xl">
            Easy analyst tools built by IT professionals.
          </h1>
          <p>
            DataGrate is the most effortless solution for simplifying complex data migrations.
          </p>
          <v-row
            justify="space-around"
          >
            <v-btn
              color="primary_button"
              class="mr-4"
              width="40%"
            >
              Get Started
            </v-btn>
            <v-btn
              color="secondary_button"
              width="40%"
            >
              Learn More
            </v-btn>
          </v-row>
        </v-card>
        <v-card
        ></v-card>
      </v-row>
    </v-img>
    <v-container
      class="tw--mt-64"
    >
      <v-sheet
        class="mx-auto pa-4"
        color="secondary_button"
        elevation="24"
        max-width="1200"
      >
        <v-row
          justify="space-around"
          class=""
        >
          <v-card
            max-width="30%"
            class="pa-4"
            flat
          >
            <v-img
              src="../../public/img/data.png"
              width="50px"
              class="mx-auto"
            >
            </v-img>
                      <!--<img style="width:50px; height: auto;" src="datagrate/data.png" alt="icon"/>-->
            <v-card-title
              class="justify-center"
            >
              Migration
            </v-card-title>
            <v-card-text>
              Using our solution data can move from database to database with our simple pipelining framework.
            </v-card-text>
          </v-card>

          <v-card
            max-width="30%"
            class="pa-4"
            flat
          >
            <v-img
              src="../../public/img/data.png"
              width="50px"
              class="mx-auto"
            >
            </v-img>
            <v-card-title
              class="justify-center"
            >
              Integration
            </v-card-title>
            <v-card-text>
              By combining datasets, DataGrate allows to transform segmented data into a single cohesive unit that allows for simple management and analytics.
            </v-card-text>
          </v-card>

          <v-card
            max-width="30%"
            class="pa-4"
            flat
          >
            <v-img
              src="../../public/img/data.png"
              width="50px"
              class="mx-auto"
            >
            </v-img>
            <v-card-title
              class="justify-center"
            >
              Management
            </v-card-title>
            <v-card-text>
              The in-built suite of analytics tools slows for pulling and organizing data for all of your business needs.
            </v-card-text>
          </v-card>
        </v-row>
        <v-row
          justify="space-around"
        >
          <v-btn
            class="mt-4"
            color="primary_button"
          >
            View Use Cases
          </v-btn>
        </v-row>
      </v-sheet>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.custom-mt {
  margin-top: 15%;
  margin-right: 20%;
}
</style>

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
