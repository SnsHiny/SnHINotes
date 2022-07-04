<template>
    <div id="school">
        <h1>名称：{{name}}</h1>
        <h1>地址：{{address}}</h1>
    </div>
</template>

<script>
    import pubsub from "pubsub-js"

    export default {
        name: 'School',
        data() {
            return {
                name: '浙江大学',
                address: '浙江',
            }
        },
        methods: {
            sendName(msgName, data) {
                console.log("School组件接收到学生姓名：", msgName, data);
            }
        },
        mounted() {
            // 订阅消息
            this.pubId = pubsub.subscribe("sendName", this.sendName);
        },
        beforeDestroy() {
            // 取消订阅，传入订阅消息的id
            pubsub.unsubscribe(this.pubId);
        }
    }
</script>

<style scoped>
    #school {
        background-color: aqua;
    }
</style>