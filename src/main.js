import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Button,
  Swipe,
  SwipeItem,
  Lazyload,
  Skeleton,
  List,

} from 'vant'
import 'vant/lib/index.css'

Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Skeleton);
Vue.use(List);

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')