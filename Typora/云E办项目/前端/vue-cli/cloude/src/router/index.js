// 该文件专门用于创建整个应用的路由器
import Login from '../views/Login'
import VueRouter from 'vue-router'
import { initMenu } from '../utils/menu'
import store from '../store'
import { getRequest } from '../utils/api'
import Home from '../views/Home'
import ChatView from '../views/chat/ChatView'
import AdminInfo from '../views/AdminInfo'

// 创建一个路由器
const router = new VueRouter({
    routes: [
        {
            name: 'login',
            path: '/Login',
            component: Login,
            hidden: true
        },
        {
            name: 'home',
            path: '/Home',
            component: Home,
            children: [
                {
                    name: '聊天',
                    path: '/ChatView',
                    component: ChatView,
                },
                {
                    name: '个人中心',
                    path: '/AdminInfo',
                    component: AdminInfo,
                },
            ]
        },
    ]
})

// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function replace (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/Login')) {
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('userInfo');
        next();
    } else {
        let token = window.sessionStorage.getItem('token');
        if (!token) {
            next('/Login');
        } else {
            initMenu(router, store);
            // 判断用户信息是否存在
            if (!window.sessionStorage.getItem('userInfo')) {
                return getRequest('/info').then(resp => {
                    if (resp) {
                        // 存入用户信息
                        window.sessionStorage.setItem('userInfo',JSON.stringify(resp));
                        next('/home');
                    }
                })
            }
            next();
        }
    }
})

export default router;