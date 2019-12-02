<template>
  <div>
    <div class="relative">
      <v-card
        color="rgba(0, 0, 0, 0)"
        class="ma-auto pa-4"
        max-width="400"
      >
        <h1>
          Easy analyst tools built by IT professionals.
        </h1>
        <p>
          DataGrate is the most effortless solution for simplifying complex data migrations.
        </p>
        <v-row
          justify="space-around"
        >
          <v-btn
            color="blue"
            class="mr-4"
            width="40%"
          >
            Download
          </v-btn>
          <v-btn
            color="light-blue"
            width="40%"
          >
            Learn More
          </v-btn>
        </v-row>
      </v-card>
    </div>
    <v-content>
      <v-container>
        <v-row justify="space-around">
          <v-col>
            <p style="text-align: center;">
            <!--<img style="width:50px; height: auto;" src="datagrate/data.png" alt="icon"/>-->
            </p>
            <p style="padding-top: 20px;">
            <b>Migration</b>
            <br>
            Using our solution data can move from database to database with our simple pipelining framework.
            </p>
          </v-col>
          <v-col>
            <p style="text-align: center;">
            <!--<img style="width:50px; height: auto;" src="datagrate/data.png" alt="icon"/>-->
            </p>
            <p style="padding-top: 20px;">
            <b>Integration</b>
            <br>
            By combining datasets, DataGrate allows to transform segmented data into a single cohesive unit that allows for simple management and analytics.
            </p>
            <br><br><br>
            <button class="button1">View Use Cases</button>
          </v-col>
          <v-col>
            <p style="text-align: center;">
            <!--<img style="width:50px; height: auto;" src="datagrate/data.png" alt="icon"/>-->
            </p>
            <p style="padding-top: 20px;">
            <b>Management</b>
            <br>
            The in-built suite of analytics tools slows for pulling and organizing data for all of your business needs.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<style scoped lang="scss">
ul {
  list-style-type: none;
  margin: 0;
  padding-right: 100px;
  padding-left: 100px;
  padding-top:50px;
  font-size: 12px;
  overflow: hidden;
  background-color: none;
}

li {
  float: right;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #052C95;
}

.greeting {
  padding-left: 300px;
  line-height: 28px;
  padding-top: 200px;
  position: absolute;
  width: 330px;
  color: white;
}

.greeting h1{
  text-align: left;
  font-size:22px;
  letter-spacing: 1px;
}

.greeting p{
  font-size:16px;
  line-height: 24px;
}

.button1 {
  background-color: #4DA6FF;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 10px;
}

.button2 {
  background-color: #E0EBFF;
  border: none;
  color: #365FD0;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 10px;
}

#column {
  float: left;
  width: 220px;
  margin: 45px;
  color: #555555;
  line-height: 18px;
  letter-spacing: 0.5px;
  text-align: left;
}

#column:after {
    clear: both;
    content: "";
    display: block;
}

.main-container {
 min-height: 100vh; /* will cover the 100% of viewport */
 overflow: hidden;
 display: block;
 position: relative;
 padding-bottom: 100px; /* height of your footer */
}

footer{
  position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    background: #113EB5;
  color: white;
  text-align: center;
  font-size:8px;
  padding-top: 10px;
  padding-bottom:10px;

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
