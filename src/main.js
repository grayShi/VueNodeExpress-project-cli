// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Components from './components/index';
import Mixins from './mixins/index';
// import axios from 'axios';

Vue.config.productionTip = false;

// axios.interceptors.request.use(config => {
//   debugger;
//   return config;
// }, error => {
//   // 请求错误
//   return Promise.reject(error);
// });
// axios.interceptors.response.use(
//   response => {
//     debugger;
//     return response;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );
Vue.use(Components);
Vue.use(Mixins);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
