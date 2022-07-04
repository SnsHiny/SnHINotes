<template>
    <div>
        <div class=" col-md-6 panel panel-default">
            <div class="panel-heading">
                <banner></banner>
            </div>
            <div class="panel-body">
                <div class="col-md-3 list-group">
                    <!-- vue中借助router-link实现路由的切换；active-class用于控制高亮样式 -->
                    <router-link class="list-group-item" active-class="active" to="/About">About</router-link>
                    <router-link class="list-group-item" active-class="active" to="/Home">Home</router-link>
                </div>
                <!-- 指定组件的呈现位置 -->
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import './assets/bootstrap/css/bootstrap.min.css'
    import banner from './components/banner.vue'

    export default {
        name: 'App',
        components: {
            banner
        },
        data() {
            return {
            }
        },
    }
</script>