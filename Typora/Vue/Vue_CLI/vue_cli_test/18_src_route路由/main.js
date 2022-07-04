import Vue from 'vue'
import App from './App.vue'
// 引入vue-router
import vueRouter from 'vue-router'
// 引入路由器
import router from './router/index'

Vue.use(vueRouter)
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    render: h => h(App),
})