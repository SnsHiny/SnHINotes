import axios from 'axios'
import { nanoid } from 'nanoid';

// 人员模块组件
export default {
    // 开启命名空间
    namespaced: true,
    actions: {
        addPersonFromServer(context) {
            axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
                response => {
                    context.commit("ADD_PERSON", {id: nanoid(), name: response.data})
                },
                error => {
                    console.log(error.message);
                }
            )
        }
    },
    mutations: {
        ADD_PERSON(state, value) {
            state.personList.unshift(value);
        }
    },
    state: {
        personList: [
            // {id: "001", name: "张三"}
        ]
    },
    getters: {}
}