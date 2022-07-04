<template>
    <div id="demo">
        <button @click="isShow = !isShow">显示/隐藏动画</button>
        <transition
         appear
         name="animate__animated animate__bounce"
         enter-active-class="animate__wobble"
         leave-active-class="animate__backOutUp">
            <h1 v-show="isShow">SnHI3</h1>
        </transition>
    </div>
</template>

<script>
    import 'animate.css'

    export default {
        name: 'myAnimate',
        data() {
            return {
                isShow: true
            }
        },
    }
</script>

<style scoped>
    h1 {
        background-color: aqua;
    }
</style>