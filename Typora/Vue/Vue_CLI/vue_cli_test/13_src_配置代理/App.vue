<template>
    <div>
        <h1 v-text="msg"></h1>
        <button @click="getChatRoom()">获取聊天室登录页面源码</button>
        <button @click="getDormitory()">获取宿舍管理系统登录页面源码</button>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: 'App',
        components: {
        },
        data() {
            return {
               msg: '配置代理' 
            }
        },
        methods: {
            getChatRoom() {
                // 通过axios向后台发送get请求
                axios.get("http://localhost:8080/SnHI1/Login").then(
                    // 访问成功的回调函数
                    response => {
                        console.log("请求成功了", response.data);
                    },
                    // 访问失败的回调函数
                    error => {
                        console.log("请求失败了", error.message);
                    }
                )
            },
            getDormitory() {
                axios.get("http://localhost:8080/SnHI2/Login").then(
                    // 访问成功的回调函数
                    response => {
                        console.log("请求成功了", response.data);
                    },
                    // 访问失败的回调函数
                    error => {
                        console.log("请求失败了", error.message);
                    }
                )
            },
        },
    }
</script>