import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import moment from 'moment'
//import momentTz from 'moment-timezone'

Vue.filter('formatDate', function(value) {
  if (value) {
    //return moment(String(value)).format('MMMM Do YYYY, hh:mm a')
    return moment(String(value)).format('MMMM Do YYYY, hh:mm a')
  }
})


Vue.config.productionTip = false

// bus event
export const bus = new Vue();

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
