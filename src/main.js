import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './vuex';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyAntJMq5VF19vr9Ypy0uWOTq4CwSVBgdME',
  authDomain: 'platzi-rooms-66798.firebaseapp.com',
  databaseURL: 'https://platzi-rooms-66798.firebaseio.com',
  projectId: 'platzi-rooms-66798',
  storageBucket: 'platzi-rooms-66798.appspot.com',
  messagingSenderId: '579947730913',
  appId: '1:579947730913:web:45d70f8f1ad8b509',
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('FETCH_AUTH_USER');
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    if (store.state.authId) {
      this.$store.dispatch('FETCH_USER', { id: store.state.authId });
    }
  },
}).$mount('#app');
