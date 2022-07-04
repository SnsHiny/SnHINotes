<template>
    <div id="person">
        <h1>姓名：{{name}}</h1>
        <h1>年龄：{{age}}</h1>
        <h1>体重：{{weight}}</h1>
        <h1>身高：{{height}}</h1>
        <button @click="sendPersonName">点我获取学生姓名</button>
        <button @click="unbind">点我解绑SnHI事件</button>
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
            sendPersonName() {
                // .$emit：触发Person组件实例身上的SnHI事件
                this.$emit("SnHI", this.name);
            },
            unbind() {
                // 解绑一个自定义事件
                this.$off("SnHI")
                // 解绑多个自定义事件
                this.$off(["SnHI"])
                // 解绑所有自定义事件
                this.$off()
            }
        },
    }
</script>

<style scoped>
    #person {
        background-color: orange;
    }
</style>