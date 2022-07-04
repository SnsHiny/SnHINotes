<template>
    <div id="person">
        <h1>姓名：{{name | mySlice}}</h1>
        <h1>年龄：<span v-big="age"></span></h1>
        <h1>体重：{{weight}}</h1>
        <h1>身高：{{height}}</h1>
        <h1>x：{{x}}</h1>
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
    }
</script>

<style>
    #person {
        background-color: aqua;
    }
</style>