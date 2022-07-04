<template>
    <div>
        <h1 v-text="msg"></h1>
        <School></School>
        <Person></Person>
    </div>
</template>

<script>
    import School from './components/School'
    import Person from './components/Person'

    export default {
        name: 'App',
        components: {
            Person,
            School
        },
        data() {
            return {
               msg: '消息订阅与发布' 
            }
        },
    }
</script>