// 可以把多个组件共用的配置提取成一个混入对象

<template>
    <div id="person">
        <h1>姓名：{{name}}</h1>
        <h1>年龄：{{age}}</h1>
        <h1>体重：{{weight}}</h1>
        <h1>身高：{{height}}</h1>
        <button @click="showName">点我显示名称</button>
    </div>
</template>

<script>
    // 引入混入
    import {show} from '../mixin'

    export default {
        name: 'Person',
        data() {
            return {
                name: '张三',
                age: 18,
                weight: 50,
                height: 180
            }
        },
        // 使用混入
        mixins: [show]
    }
</script>

<style>
    #person {
        background-color: aqua;
    }
</style>