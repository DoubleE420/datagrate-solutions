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
              By having a uniquely created pipeline, our solution allows for viewing data within any supported database
              and also allows migrating any data from a source database to a supported destination database with 0 downtime.
              Depending on how much data is in the source, a MySQL database can be migrated to PostgreSQL within a matter of seconds.
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
          <!-- Nayan About Card -->
          <v-card
            class="mb-8"
            max-width="1200"
            elevation="7"
          >
            <div class="tw-flex">
              <!-- Nayan image -->
              <div class="tw-w-1/3">
                <v-img
                  src="../../public/img/portraits/nayan_test.jpg"
                  width="300px"
                  class="tw-rounded"
                ></v-img>
              </div>
              <div class="tw-p-8">
                <v-card-title>Nayan Patel</v-card-title>
                <v-card-subtitle>datagrate - cofounder</v-card-subtitle>
                <v-card-text>
                  Hi, my name is Nayan Patel. I am an experienced data analyst with a demonstrated history
                  of working in the information technology and professional services industry.
                  Leveraging my experience working in the cutting edge field of big data, coming up with
                  this idea and executing upon it will allow for my graduation from the University of Cincinnati.
                </v-card-text>
              </div>
            </div>
          </v-card>
          <!-- Sean About Card -->
          <v-card
            class="mb-8"
            max-width="1200"
            elevation="7"
          >
            <div class="tw-flex">
              <div class="tw-p-8">
                <v-card-title>Sean Batt</v-card-title>
                <v-card-subtitle>datagrate - cofounder</v-card-subtitle>
                <v-card-text>
                  Hello, my name is Sean Batt; I attended the University of Cincinnati where I studied Information Technology,
                  specializing in Networking and Systems. As a professional, my focus has been on Network Infrastructure and System Engineering and Support.
                  I am originally from Cincinnati, Ohio, and currently work in Technology Department for the Cincinnati Reds.
                </v-card-text>
              </div>
              <!-- Sean image -->
              <div class="tw-w-1/3">
                <v-img
                  src="../../public/img/portraits/sean_test.jpg"
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
  margin-top: 5%;
  margin-bottom: 5%;
}
</style>
