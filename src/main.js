import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertComponent from './components/Shared/Alert.vue'
import EditEatupDetailsDialog from './components/Eatup/Edit/EditEatupDetailsDialog.vue'
import EditEatupDateDialog from './components/Eatup/Edit/EditEatupDateDialog.vue'
import EditEatupTimeDialog from './components/Eatup/Edit/EditEatupTimeDialog.vue'
import SignupDialog from './components/Eatup/Registration/SignupDialog.vue'
Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertComponent)
Vue.component('app-edit-eatup-details-dialog', EditEatupDetailsDialog)
Vue.component('app-edit-eatup-date-dialog', EditEatupDateDialog)
Vue.component('app-edit-eatup-time-dialog', EditEatupTimeDialog)
Vue.component('app-eatup-signup-dialog', SignupDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAJZarlHM_sOZL7KtOU0TrysVewKUgufh4',
      authDomain: 'eatup-c9d08.firebaseapp.com',
      databaseURL: 'https://eatup-c9d08.firebaseio.com',
      projectId: 'eatup-c9d08',
      storageBucket: 'gs://eatup-c9d08.appspot.com/'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLogin', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadEatups')
  }
})
