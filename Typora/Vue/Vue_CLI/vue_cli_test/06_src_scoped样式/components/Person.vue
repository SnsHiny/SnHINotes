<template>
    <div id="school">
        <h1>姓名：{{name}}</h1>
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
                name: '张三abc',
                age: 18,
                weight: 50,
                height: 180
            }
        },
    }
</script>

<style scoped>
    #school {
        background-color: orange;
    }
</style>