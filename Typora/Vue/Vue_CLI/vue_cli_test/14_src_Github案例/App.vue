<template>
    <div>
        <h1 v-text="msg"></h1>
        <search></search>
        <list></list>
    </div>
</template>

<script>
    import "./assets/bootstrap/css/bootstrap.css"
    import Search from "./components/Search"
    import List from "./components/List"

    export default {
        name: 'App',
        components: {
            Search,
            List
        },
        data() {
            return {
               msg: 'Github案例' 
            }
        },
    }
</script>