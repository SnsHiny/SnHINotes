<template>
     <div id="demo2">
        <h2>学生姓名：{{name}}</h2>
        <h2>学生年龄：{{age}}</h2>
        <button @click="showInfo">点我弹框</button>
    </div>
</template>

<script>
    export default {
        name: "Student",
        data() {
            return {
                name: "SnHI",
                age: 18
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
    #demo2 {
        height: 200px;
        width: 400px;
        background-color: bisque;
    }
</style>
