<template>
    <div>
        <ul>
            <li v-for="message in messageList" :key="message.id">
                <!-- 跳转并携带query参数 -->
                <router-link :to="{
                    // path: '/Home/Messages/Detail',
                    // 命名路由，可以简化路由
                    name: 'detail',
                    query: {
                        id: message.id,
                        title: message.title
                    }
                }">{{message.title}}</router-link>
                <button @click="pushShow(message)">push查看</button>
                <button @click="replaceShow(message)">replace查看</button>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>
           
<script>
    export default {
        name: 'Messages',
        data() {
            return {
                messageList: [
                    {id: '001', title: '消息001'},
                    {id: '002', title: '消息002'},
                    {id: '003', title: '消息003'},
                ]
            }
        },
        methods: {
            pushShow(message) {
                // push查看，追加历史记录
                this.$router.push({
                    name: 'detail',
                    query: {
                        id: message.id,
                        title: message.title
                    }
                })
            },
            replaceShow(message) {
                // replace查看，不追加历史记录
                this.$router.replace({
                    name: 'detail',
                    query: {
                        id: message.id,
                        title: message.title
                    }
                })
            }
        },
    }
</script>