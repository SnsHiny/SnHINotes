<template>
    <div id="school">
        <h1>名称：{{name}}</h1>
        <h1>地址：{{address}}</h1>
        <h1>x：{{x}}</h1>
        <h1>y：{{y}}</h1>
        <button @click="showName">点我显示名称</button>
    </div>
</template>

<script>
    import {show} from '../mixin'

    export default {
        name: 'School',
        data() {
            return {
                name: '浙江大学',
                address: '浙江',
                x: 30
            }
        },
        mixins: [show]
    }
</script>

<style>
    #school {
        background-color: aqua;
    }
</style>