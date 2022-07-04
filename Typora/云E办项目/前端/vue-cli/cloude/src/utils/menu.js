// 菜单工具类
import { getRequest } from "./api";

export const initMenu = (router, store) => {
    // 如果state.routes中有数据，则不进行初始化
    if (store.state.routes.length > 0) {
        return;
    }
    // 调用后端接口获取菜单内容
    getRequest('/system/menu').then(data => {
        if (data) {
            // 格式化router
            let fmtRoutes = formatRoutes(data);
            // 添加到router
            router.addRoutes(fmtRoutes);
            // 将数据存入vuex
            store.commit('initRoutes', fmtRoutes);
            // 连接webSocket
            store.dispatch('connect');
        }
    })
}

// 格式化router
export const formatRoutes = (routes) => {
    let fmtRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            name,
            iconCls,
            children,
        } = router;
        // 递归
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            children: children,
            component(resolve) {
                if (component.startsWith('Home')) {
                    require(['../views/' + component + '.vue'], resolve)
                } else if (component.startsWith('Emp')) {
                    require(['../views/emp/' + component + '.vue'], resolve)
                } else if (component.startsWith('Per')) {
                    require(['../views/per/' + component + '.vue'], resolve)
                } else if (component.startsWith('Sal')) {
                    require(['../views/sal/' + component + '.vue'], resolve)
                } else if (component.startsWith('Sta')) {
                    require(['../views/sta/' + component + '.vue'], resolve)
                } else if (component.startsWith('Sys')) {
                    require(['../views/sys/' + component + '.vue'], resolve)
                }
            } 
        }
        fmtRoutes.push(fmRouter);
    });
    return fmtRoutes;
}