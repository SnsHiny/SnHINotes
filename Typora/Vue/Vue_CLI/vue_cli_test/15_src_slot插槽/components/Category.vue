<template>
    <div id="demo">
        <h2>{{title}}</h2>
        <!-- 插槽，组件被使用时动态填充 -->
        <slot :games="games" name="slot1">默认值</slot>
    </div>
</template>
           
<script>
    export default {
        name: 'Category',
        props : ["title"],
        data() {
            return {
                games: ["马里奥", "我的世界", "明日之后"]
            }
        },
    }
</script>
         
<style>
    #demo {
        width: 200px;
        height: 300px;
        background-color: aqua;
        float: left;
        margin-left: 50px;
    }

    h2 {
        font-weight: 700;
        background-color: orange;
        text-align: center;
    }
</style>