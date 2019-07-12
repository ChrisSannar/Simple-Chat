import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
/*
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { dom } from '@fortawesome/fontawesome-svg-core'

dom.watch()

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)
*/

Vue.use(VueAxios, axios);
Vue.prototype.$axios = axios

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
