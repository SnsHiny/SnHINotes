// 引入Vue
import Vue from "vue"
// 引入Vuex
import Vuex from "vuex"
import { getRequest } from "../utils/api";
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { Notification } from 'element-ui';

// 使用Vuex插件
Vue.use(Vuex)

// const now = new Date();

// 创建并暴露store
const store = new Vuex.Store({
    state: {
        routes: [],
        admins: [],
        sessions: {},
        currentAdmin: JSON.parse(window.sessionStorage.getItem('userInfo')),
        currentSession: null,
        filterKey: '',
        stomp: null,
        isDot: {},
    },
    mutations: {
        initRoutes(state, data) {
            state.routes = data;
        },
        changeCurrentSession(state, currentSession) {
            state.currentSession = currentSession;
            Vue.set(state.isDot, state.currentAdmin.username + '#' + state.currentSession.username, false);
        },
        addMessage(state, msg) {
            let mss = state.sessions[state.currentAdmin.username + '#' + msg.to];
            if (!mss) {
                Vue.set(state.sessions, state.currentAdmin.username + '#' + msg.to, []);
            }
            state.sessions[state.currentAdmin.username + '#' + msg.to].push({
                content: msg.content,
                date: new Date(),
                self: !msg.notSelf,
            })
        },
        INIT_ADMIN(state, admin) {
            state.currentAdmin = admin;
        },
        INIT_DATA(state) {
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        INIT_ADMINS(state, data) {
            state.admins = data;
        },
    },
    actions: {
        connect(context) {
            context.state.stomp = Stomp.over(new SockJS('/ws/ep'));
            let token = window.sessionStorage.getItem('token');
            // eslint-disable-next-line no-unused-vars
            context.state.stomp.connect({'Auth-Token': token}, success => {
                context.state.stomp.subscribe('/user/queue/chat', msg => {
                    let receiveMsg = JSON.parse(msg.body);
                    if (!context.state.currentSession || receiveMsg.from != context.state.currentSession.username) {
                        Notification.info({
                            title:  '【' + receiveMsg.fromNickName + '】发来一条消息',
                            message: receiveMsg.content.length > 10 ? receiveMsg.content.substr(0, 10) + '...' : receiveMsg.content,
                            position: 'bottom-right'
                        });
                        Vue.set(context.state.isDot, context.state.currentAdmin.username + '#' + receiveMsg.from, true);
                    }
                    receiveMsg.notSelf = true;
                    receiveMsg.to = receiveMsg.from;
                    context.commit('addMessage', receiveMsg);
                })
            }, error => {
                console.log(error);
            })
        },
        initData(context) {
            context.commit('INIT_DATA');
            getRequest('/chat/admin').then(resp => {
                if (resp) {
                    context.commit('INIT_ADMINS', resp);
                }
            })
        }
    }
})

store.watch(
    function (state) {
        return state.sessions
    },
    function (val) {
        console.log('CHANGE: ', val);
        localStorage.setItem('vue-chat-session', JSON.stringify(val));
    }, 
    {
        deep: true /*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
    }
)

export default store;