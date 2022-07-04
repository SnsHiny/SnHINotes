import Vue from 'vue'
import App from './App.vue'

// 全局混合
// import {show} from './mixin'
// Vue.mixin(show)

new Vue({
    el: '#app',
    render: h => h(App)
})