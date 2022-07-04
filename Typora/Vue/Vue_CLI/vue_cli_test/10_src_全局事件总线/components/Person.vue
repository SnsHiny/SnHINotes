<template>
    <div id="person">
        <h1>姓名：{{name}}</h1>
        <h1>年龄：{{age}}</h1>
        <h1>体重：{{weight}}</h1>
        <h1>身高：{{height}}</h1>
        <button @click="sendStudentName">点我传递学生姓名给学校</button>
    </div>
</template>

<script>
    export default {
        name: 'Person',
        data() {
            return {
                name: '张三abc',
                age: 18,
                weight: 50,
                height: 180
            }
        },
        methods: {
            sendStudentName() {
                // 触发自定义事件并传递数据
                this.$bus.$emit("sendName", this.name);
            }
        },
    }
</script>

<style scoped>
    #person {
        background-color: orange;
    }
</style>