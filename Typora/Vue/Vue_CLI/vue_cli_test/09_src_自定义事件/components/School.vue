<template>
    <div id="school">
        <h1>名称：{{name}}</h1>
        <h1>地址：{{address}}</h1>
        <button @click="sendSchoolName">点我获取学校名称</button>
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
        props: ['getSchoolName'],
        methods: {
            sendSchoolName() {
                this.getSchoolName(this.name);
            }
        },
    }
</script>

<style scoped>
    #school {
        background-color: aqua;
    }
</style>