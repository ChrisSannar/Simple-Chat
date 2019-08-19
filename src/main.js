import Vue from 'vue';
import App from './App.vue';

// Enable app to server communication
import axios from 'axios';
import VueAxios from 'vue-axios';

// Enable socket programming for the chatting
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

// Include Socket.io plugin into the the application
Vue.use(new VueSocketIO({
  debug:true,
  connection: socketio('http://localhost:8080')
}))




// ***

/*
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { dom } from '@fortawesome/fontawesome-svg-core'

dom.watch()

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)
*/

// Include Axios plugin into the application
Vue.use(VueAxios, axios);
Vue.prototype.$axios = axios

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
