<template>
    <!-- 结构 -->
     <div id="root">
        学校名称：{{name}}
        学校地址：{{address}}
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
                console.log(this.name);
            }
        },
    }
</script>

<style>
    /* 样式 */
    #root {
        height: 200px;
        width: 200px;
        background-color: aquamarine;
    }
</style>
