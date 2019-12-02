import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary_button: '#4DA6FF',
        secondary_button: '#E0EBFF'
      }
    }
  }
})
