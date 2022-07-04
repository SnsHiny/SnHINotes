<!-- 让组件接收外部传过来的数据 -->
<template>
    <div id="person">
        <h1>姓名：{{name}}</h1>
        <h1>年龄：{{age + 1}}</h1>
        <h1>体重：{{weight}}</h1>
        <h1>身高：{{height}}</h1>
    </div>
</template>

<script>
    export default {
        name: 'Person',
        // 简单接收
        props: ['name', 'age', 'weight', 'height'],

        // 接收的同时对类型进行限制
        // props: {
        //     name: String,
        //     age: Number,
        //     weight: Number,
        //     height: Number
        // },

        // 接收的同时设置类型、是否必需、默认值
        // props: {
        //     name: {
        //         type: String,
        //         required: true
        //     },
        //     age: {
        //         type: Number,
        //         default: 30
        //     },
        //     weight: {
        //         type: Number,
        //         required: false
        //     },
        //     height: {
        //         type: Number,
        //         required: false
        //     }
        // }
    }
</script>

<style>
    #person {
        background-color: aqua;
    }
</style>