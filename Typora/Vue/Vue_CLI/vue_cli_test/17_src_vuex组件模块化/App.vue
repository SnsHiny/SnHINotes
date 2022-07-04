<template>
    <div>
        <h1 v-text="msg"></h1>
        <Count></Count>
        <hr>
        <Person></Person>
    </div>
</template>

<script>
    import Count from "./components/Count"
    import Person from "./components/Person"

    export default {
        name: 'App',
        components: {
            Count,
            Person
        },
        data() {
            return {
               msg: 'Vuex',
            }
        },
    }
</script>