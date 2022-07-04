<template>
     <div id="root">
        学生姓名：{{name}}
        学生年龄：{{age}}
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
                console.log(this.name);
            }
        },
    }
</script>

<style>
    #root {
        height: 200px;
        width: 200px;
        background-color: bisque;
    }
</style>
