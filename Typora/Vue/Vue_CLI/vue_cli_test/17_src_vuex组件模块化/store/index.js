// 该文件用于创建Vuex中最为核心的store

// 引入Vue
import Vue from "vue"
// 引入Vuex
import Vuex from "vuex"
// 引入Count模块组件
import countOptions from "./Count"
// 引入Person模块组件
import personOptions from "./Person"

// 使用Vuex插件
Vue.use(Vuex)
// 创建并暴露store
export default new Vuex.Store({
    modules: {
        countOptions,
        personOptions
    }
})