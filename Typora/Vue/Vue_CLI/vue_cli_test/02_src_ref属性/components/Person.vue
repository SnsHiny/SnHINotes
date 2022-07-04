<template>
    <div id="person">
        <h1>姓名：{{pName}}</h1>
        <h1>年龄：{{age}}</h1>
        <h1>体重：{{weight}}</h1>
        <h1>身高：{{height}}</h1>
    </div>
</template>

<script>
    export default {
        name: 'Person',
        data() {
            return {
                pName: '张三',
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