<template>
    <div id="school">
        <h1>名称：{{name}}</h1>
        <h1>地址：{{address}}</h1>
    </div>
</template>

<script>
    export default {
        name: 'School',
        data() {
            return {
                name: '浙江大学',
                address: '浙江',
            }
        },
    }
</script>

<style scoped>
    #school {
        background-color: aqua;
    }
</style>