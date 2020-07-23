import Vue from 'vue'
import App from './App.vue'
import VueBingMaps from 'waseemcake/vue-bing-maps' ///Users/mdwaseem/vue-bing-maps-master/src/index

Vue.config.productionTip = false

//console.log('Calling Vue.use', VueBingMaps);
Vue.use(VueBingMaps, { debug: true });

window.Vue = Vue;

new Vue({
  render: h => h(App),
}).$mount('#app')
