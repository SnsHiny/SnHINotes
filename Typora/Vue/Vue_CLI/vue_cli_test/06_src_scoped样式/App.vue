<template>
    <div>
        <h1 v-text="msg" ref="title"></h1>
        <Person></Person>
        <School></School>
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
               msg: '插件' 
            }
        },
    }
</script>