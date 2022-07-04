<template>
    <div>
        <h1 v-text="msg"></h1>
        <!-- <Cartoon></Cartoon> -->
        <myAnimate></myAnimate>
    </div>
</template>

<script>
    // import Cartoon from './components/Cartoon'
    import myAnimate from './components/myAnimate'

    export default {
        name: 'App',
        components: {
            // Cartoon,
            myAnimate
        },
        data() {
            return {
               msg: '动画效果' 
            }
        },
    }
</script>