<template>
  <div>
    <v-img
      src="../../public/img/Subpage_backgrounds.png"
      class="tw-absolute"
      max-height="100%"
    ></v-img>
    <v-content>
      <v-container>
        <v-row
          justify="space-around"
          class="custom-y-margin"
        >
          <v-card
            flat
            max-width="500"
            color="rgba(0,0,0,0)"
          >
            <v-card-title>
              <h1 class="tw-text-4xl">Who We Are</h1>
            </v-card-title>
            <v-card-text>
              Datagrate was conceived to provide data solutions to both the technology professional and the end user.
              By having a uniquely created pipeline, our solution allows for extracting, transforming and loading into
              user data stores which then allow for easy management and integration.
            </v-card-text>
          </v-card>
          <v-spacer></v-spacer>
        </v-row>
        <v-row
          justify="space-around"
        >
          <h1 class="tw-text-2xl tw-font-thin mb-8">Meet Our Executive Team</h1>
        </v-row>
        <v-row
          justify="space-around"
        >
          <v-card
            class="mb-8"
            max-width="1200"
            elevation="7"
          >
            <div class="tw-flex">
              <div class="tw-w-1/3">
                <v-img
                  src="../../public/img/portraits/nayan_test.png"
                  width="300px"
                  class="tw-rounded"
                ></v-img>
              </div>
              <div class="tw-p-8">
                <v-card-title>Nayan Patel</v-card-title>
                <v-card-subtitle>data migrations - cofounder</v-card-subtitle>
                <v-card-text>
                  Hi, my name is Nayan Patel. I am an experienced data analyst with a demonstrated history
                  of working in the information technology and professional services industry.
                  Leveraging my experience working in the cutting edge field of big data, coming up with
                  this idea and executing upon it will allow for my graduation from the University of Cincinnati.
                </v-card-text>
              </div>
            </div>
          </v-card>
          <v-card
            class="mb-8"
            max-width="1200"
            elevation="7"
          >
            <div class="tw-flex">
              <div class="tw-p-8">
                <v-card-title>Sean Batt</v-card-title>
                <v-card-subtitle>data migrations - cofounder</v-card-subtitle>
                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.
                </v-card-text>
              </div>
              <div class="tw-w-1/3">
                <v-img
                  src="../../public/img/portraits/sean_test.png"
                  width="300px"
                  class="tw-rounded"
                ></v-img>
              </div>
            </div>
          </v-card>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<style scoped>
.custom-y-margin {
  margin-top: 15%;
  margin-bottom: 15%;
}
</style>
