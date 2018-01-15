// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


// mint-ui  懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  error: './static/error.png',
  loading: '../static/images/lazyload.png'
})
// import BScroll from 'better-scroll'
// 引入muse-ui

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)


import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
// 引入axios
// import axios from 'axios'
// Vue.prototype.$http = axios
import { Spinner } from 'mint-ui';

Vue.component(Spinner.name, Spinner);


import {get, post} from 'config/http'
Vue.prototype.$get = get
Vue.prototype.$post = post

// 状态管理
import store from './store'

//  回到顶部函数
import Fun from './assets/js/BackToTop'
Vue.prototype.$fun = Fun

Vue.config.productionTip = false

// 公共的样式
import './assets'

//切换路由之后  回到顶部    但是在iOS系统中,返回会出现空白页面
// router.afterEach((to, from, next) => {
//   window.scrollTo(0, 0);
// });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
