import './utils/activeX'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import Vant from 'vant'
import VueLazyload from 'vue-lazyload'
import 'vant/lib/index.css'
import './utils/rem'
import 'babel-polyfill'

import "@/style/one.less";
import './style/common.css'
import cookie from './utils/cookie'
import { getUrlParam } from './utils/commonApi'
// import MapLoader from "@/api/map.js";
import wechat from "@/utils/wechat"

import fixBox from "@/components/fixBox";
Vue.use(Vant)
Vue.use(VueLazyload)
Vue.config.productionTip = false
// Vue.prototype.MapLoader = MapLoader
Vue.prototype.$cookie = cookie
Vue.prototype.$baseUrl = "https://carpool.w121.guoji.biz"
Vue.prototype.wechat = wechat;
Vue.prototype.getUrlParam = getUrlParam;
// wxsdk.initConfig(location.href.split('#')[0]);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})

Vue.component('fixBox', fixBox)
Vue.filter("textSlice", function (value) {
  return value.replace(
    /浙江省温州市/,
    ""
  );
})
router.beforeEach((to, from, next) => {

  window.scrollTo(0, 0)
  document.title = to.meta.title
  // let isLogin = store.getters("isLogin");
  // if (!isLogin) {
  //   store.dispatch(getWechatLoginAction);
  // } else {

  // }
  next()

})
router.afterEach((to, from) => {
  // to and from are both route objects.
  store.commit('SET_LOADING', true)
})
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
