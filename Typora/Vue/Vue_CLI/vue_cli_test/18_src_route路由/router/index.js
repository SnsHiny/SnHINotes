// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Messages from '../pages/Messages'
import Detail from '../pages/Detail'

// 创建一个路由器
const router = new VueRouter({
    routes: [
        {
            path: '/About',
            component: About,
            // meta中存放自定义配置属性
            meta: {
                title: "关于"
            },
        },
        {
            path: '/Home',
            component: Home,
            meta: {
                title: "主页"
            },
            // 嵌套路由
            children: [
                {
                    // 二级路由不要写斜杠
                    path: 'News',
                    component: News,
                    meta: {
                        // 控制当前组件是否需要鉴定权限，是则要经过路由守卫控制
                        isAuth: true,
                        title: "新闻",
                    },
                    // 独享路由守卫
                    beforeEnter: (to, from, next) => {
                        if(to.meta.isAuth) {
                            if(localStorage.getItem("school") === "湖北师范大学") {
                                next()
                            } else {
                                alert("学校名称不对，无法查阅")
                            }
                        } else {
                            next()
                        }
                    },
                },
                {
                    path: 'Messages',
                    component: Messages,
                    meta: {
                        isAuth: true,
                        title: "消息",
                    },
                    children: [
                        {
                            // 命名路由
                            name: 'detail',
                            path: 'Detail',
                            component: Detail, 
                            meta: {
                                title: "详情"
                            },
                            // 第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
                            // props: {a: 900},

                            // 第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件 
                            // props: true,

                            // 第三种写法：props值为函数，该函数返回的对象中每一组key-value最终都会通过props传给Detail组件
                            props($route) {
                                return {
                                    id: $route.query.id,
                                    title: $route.query.title
                                }
                            }
                        }
                    ]
                }
            ]
        },
    ]
})

// 全局前置路由守卫，在初始化和组件切换之前被调用；to：前往哪个组件；from：从哪个组件来；next：放行
router.beforeEach((to, from ,next) => {
    // if(to.path === '/Home/News' || to.path === '/Home/Messages') {
    if(to.meta.isAuth) {
        if(localStorage.getItem("school") === "湖北师范大学") {
            next()
        } else {
            alert("学校名称不对，无法查阅")
        }
    } else {
        next()
    }
})

// 全局后置路由守卫，在初始化和组件切换之后被调用
router.afterEach((to)=> {
    document.title = to.meta.title || 'vue_cli_test'
})

// 暴露路由器
export default router;