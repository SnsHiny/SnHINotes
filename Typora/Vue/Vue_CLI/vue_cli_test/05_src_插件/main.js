import Vue from 'vue'
import App from './App.vue'

// 引入插件
import Plugin from './plugins'
// 使用插件
Vue.use(Plugin)

new Vue({
    el: '#app',
    render: h => h(App)
})