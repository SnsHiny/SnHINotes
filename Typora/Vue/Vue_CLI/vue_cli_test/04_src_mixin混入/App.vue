<template>
    <div>
        <h1 v-text="msg" ref="title"></h1>
        <Person></Person>
        <School></School>
    </div>
</template>

<script>
    import Person from './components/Person'
    import School from './components/School'

    export default {
        name: 'App',
        components: {
            Person,
            School
        },
        data() {
            return {
               msg: 'mixin配置' 
            }
        },
    }
</script>