import Vue from 'vue'
import App from './App.vue'
// 引入vue-router
import vueRouter from 'vue-router'
// 引入路由器
import router from './router/index'
// 引入Element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入font-awesome
import 'font-awesome/css/font-awesome.css'
// 引入store
import store from "./store/index"

import { getRequest } from "./utils/api";
import { postRequest } from "./utils/api";
import { putRequest } from "./utils/api";
import { deleteRequest } from "./utils/api";
import { downloadRequest } from './utils/download';

Vue.config.productionTip = false
Vue.use(vueRouter)
Vue.use(ElementUI)

Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.downloadRequest = downloadRequest

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
})