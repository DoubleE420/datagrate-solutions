<template>
  <v-container>
    <v-content>
      <v-row
        justify="space-around"
      >
        <v-col>
          <v-card
            class="pa-4 text-center"
          >
            <v-form
            >
              <v-text-field
                v-model="serverSrc"
                :disabled="sourceLoginStatus"
                required
                type="text"
                label="Source database hostname/IP"
              ></v-text-field>
              <v-text-field
                v-model="usernameSrc"
                v-if="sourceloginStatus"
                required
                type="text"
                label="Username"
              ></v-text-field>
              <v-text-field
                v-model="passwordSrc"
                v-if="sourceloginStatus"
                required
                type="password"
                label="Password"
              ></v-text-field>
              <v-btn
                @click="submitSrc()"
                v-if="!sourceLoginStatus"
              >
                Login and Get Databases
              </v-btn>
            </v-form>
            <v-menu
              offset-y
              v-if="sourceLoginStatus"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  outlined
                  v-on="on"
                >
                  <span>{{ sourceDBName }}</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in sourceDBs"
                  :key="index"
                  @click="updateDBName(item.Database)"
                >
                  <v-list-item-title>{{ item.Database }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card>
        </v-col>
        <v-col>
          <v-card
          >
            <v-form
              class="pa-4"
            >
              <v-text-field
                v-model="serverDest"
                required
                type="text"
                label="Destination database hostname/IP"
              ></v-text-field>
              <v-text-field
                v-model="usernameDest"
                required
                type="text"
                label="Username"
              ></v-text-field>
              <v-text-field
                v-model="passwordDest"
                required
                type="password"
                label="Password"
              ></v-text-field>
              <v-btn
                @click="submitDest"
              >
                Login
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <v-row
        justify="space-around"
      >
        <v-col>
          <v-row
            class="justify-center"
          >
          </v-row>
          <v-card>
            <v-card-title
              class="justify-center"
            >
              Origin Database Tables
            </v-card-title>
          </v-card>
        </v-col>
        <v-icon
          large
        >mdi-arrow-right</v-icon>
        <v-col>
          <v-row
            class="justify-center"
          >
          </v-row>
          <v-card>
            <v-card-title
              class="justify-center"
            >
              Desination Database Tables (Expected)
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-content>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Migrate',
  components: {
  },
  data: () => ({
    sourceDBName: 'Select A Database',
    serverSrc: '',
    usernameSrc: '',
    passwordSrc: '',
    serverDest: '',
    usernameDest: '',
    passwordDest: ''
  }),
  mounted () {
    //
  },
  methods: {
    updateDBName (name) {
      this.sourceDBName = name
    },
    ...mapActions([
      'initReadDB',
      'sourceLogin',
      'destLogin'
    ]),
    submitSrc () {
      console.log('logging into src')
      this.sourceLogin({
        server: this.serverSrc,
        username: this.usernameSrc,
        password: this.passwordSrc
      })
    },
    submitDest () {
      console.log('logging into dest')
      this.destLogin({
        server: this.serverDest,
        username: this.serverDest,
        password: this.passwordDest
      })
    }
  },
  computed: {
    alldataSQL () {
      return 'test sql statement return'
    },
    ...mapState([
      'data',
      'sourceDBs',
      'sourceLoginStatus'
    ])
  }
}
</script>
