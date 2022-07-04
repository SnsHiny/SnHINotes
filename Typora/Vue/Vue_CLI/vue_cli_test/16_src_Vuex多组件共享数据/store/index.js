// 该文件用于创建Vuex中最为核心的store

// 引入Vue
import Vue from "vue"
// 引入Vuex
import Vuex from "vuex"
// 准备actions，用于响应组件中的动作
const actions = {
    addOdd(context, value) {
        if(context.state.sum % 2) {
            context.commit("ADD", value);
        }
    },
    addWait(context, value) {
        setTimeout(() => {
            context.commit("ADD", value);
        }, 500)
    },
    
}
// 准备mutations，用于操作数据
const mutations = {
    ADD(state, value) {
        state.sum += value;
    },
    SUBTRACT(state, value) {
        state.sum -= value;
    },
    ADD_PERSON(state, value) {
        state.personList.unshift(value);
    }
}
// 准备state，用于存储数据
const state = {
    sum: 0,
    personList: [
        // {id: "001", name: "张三"}
    ]
}
// 准备getters，用于将state中的数据进行加工
const getters = {
    bigSum(state) {
        return state.sum * 10;
    }
}

// 使用Vuex插件
Vue.use(Vuex)
// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
})