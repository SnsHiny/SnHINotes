<template>
    <div>
        <h2>我是Home的内容</h2>
        <div>
            <ul class="nav nav-tabs">
                <li>
                    <!-- 多级路由要写完整路径 -->
                    <router-link class="list-group-item" active-class="active" to="/Home/News">News</router-link>
                </li>
                <li>
                    <router-link class="list-group-item" active-class="active" to="/Home/Messages">Messages</router-link>
                </li>
            </ul>
            <!-- 让不展示的路由组件保持挂载，不被销毁，include：使哪些组件不被销毁；多个组件需要保持挂载，使用数组写法-->
            <keep-alive include="News">
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
           
<script>
    export default {
        name: 'Home',
    }
</script>