<template>
    <!-- 结构 -->
     <div id="demo1">
        <h2>学校名称：{{name}}</h2>
        <h2>学校地址：{{address}}</h2>
        <button @click="showInfo">点我弹框</button>
    </div>
</template>

<script>
    // 交互
    // 默认导出
    export default {
        name: "School",
        data() {
            return {
                name: "湖北师范大学",
                address: "黄石"
            }
        },
        methods: {
            showInfo() {
                alert(this.name);
            }
        },
    }
</script>

<style>
    /* 样式 */
    #demo1 {
        height: 200px;
        width: 400px;
        background-color: aquamarine;
    }
</style>
