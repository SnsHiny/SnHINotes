/*
  引入Vue
    在main.js中引入Vue时引入的是vue.runtime.xxx.js，它是运行版的Vue，其中只包含核心功能但不包含模板解析器（只有vue.js两者都包含），所以不能使用template配置项，需要使用render函数接收到的createElement（可缩写为h）函数去指定具体内容
*/
import Vue from 'vue'
// 引入App组件，是所有组件的父组件
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  el: "#app",
  // 将App组件放入容器中
  render: h => h(App),
})