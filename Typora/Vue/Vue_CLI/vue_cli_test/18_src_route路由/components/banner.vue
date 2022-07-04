<template>
    <div>
        <h3 class="panel-title" v-text="msg"></h3>
        <button @click="back()">后退</button>
        <button @click="forward()">前进</button>
        <button @click="go()">go</button>
    </div>
</template>
           
<script>
    export default {
        name: 'banner',
        data() {
            return {
                msg: '路由'
            }
        },
        methods: {
            back() {
                // 后退一步历史记录
                this.$router.back()
            },
            forward() {
                // 前进一步历史记录
                this.$router.forward()
            },
            go() {
                // 前进或后退指定步数
                this.$router.go(2);
            }
        },  
    }
</script>