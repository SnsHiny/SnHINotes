<template>
    <div id="school">
        <h1>名称：{{name}}</h1>
        <h1>地址：{{address}}</h1>
    </div>
</template>

<script>
    export default {
        name: 'School',
        data() {
            return {
                name: '浙江大学',
                address: '浙江',
            }
        },
        methods: {
            sendName(data) {
                console.log("School组件接收到学生姓名：", data);
            }
        },
        mounted() {
            // 绑定自定义事件
            this.$bus.$on("sendName", this.sendName);
        },
        beforeDestroy() {
            this.$bus.$off("sendName");
        }
    }
</script>

<style scoped>
    #school {
        background-color: aqua;
    }
</style>