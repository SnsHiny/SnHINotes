<template>
    <div>
        <h2>我是About的内容</h2>
    </div>
</template>
           
<script>
    export default {
        name: 'About',
        // 组件内守卫：进入守卫，通过路由规则进入该组件时被调用
        beforeRouteEnter (to, from, next) {
            console.log(to, from ,next);
        },
        // 组件内守卫：离开守卫，通过路由规则离开该组件时被调用
        beforeRouteLeave (to, from, next) {
            console.log(to, from ,next);
        },
    }
</script>