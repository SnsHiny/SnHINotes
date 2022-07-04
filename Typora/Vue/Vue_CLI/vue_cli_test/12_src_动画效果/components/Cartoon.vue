<template>
    <div id="demo">
        <button @click="isShow = !isShow">显示/隐藏动画</button>
        <transition appear>
            <h1 v-show="isShow">SnHI</h1>
        </transition>
        <!-- 多个元素同时展示动画 -->
        <transition-group appear>
            <h1 v-show="isShow" key="1">SnHI1</h1>
            <h1 v-show="isShow" key="2">SnHI2</h1>
        </transition-group>
    </div>
</template>

<script>
    export default {
        name: 'Cartoon',
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

    /* 进入时要激活的动画 */
    .v-enter-active {
        animation: SnHI 1s;
    }
    
	/* 离开时要激活的动画 */
    .v-leave-active {
        animation: SnHI 1s reverse;
    }
    
	/* 动画效果 */
    @keyframes SnHI {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(0px);
        }
    }
</style>