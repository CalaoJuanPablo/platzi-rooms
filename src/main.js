import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';

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

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
