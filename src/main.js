import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './styles/global.scss';
import './filters/filter.js';



import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueAutosize from 'vue-autosize'
Vue.use(VueAutosize)

import VCalendar from 'v-calendar';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import TextareaAutosize from 'vue-textarea-autosize';

Vue.use(TextareaAutosize);
Vue.use(ElementUI);
Vue.use(VCalendar);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
