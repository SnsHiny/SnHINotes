<template>
    <div class="row">
        <div class="card col-md-3 col-md-offset-1" v-for="user in users" :key="user.login">
            <a :href="user.html_url" target="_blank">
                <img :src="user.avatar_url" alt="..." style="width: 100px">
            </a>
            <p>{{user.login}}</p>
        </div>
    </div>
</template>
           
<script>
    export default {
        name: 'List',
        data() {
            return {
                users: []
            }
        },
        methods: {
            getUsers(users) {
                this.users = users;
            }
        },
        mounted() {
            this.$bus.$on("sendUsers", this.getUsers);
        },
        beforeDestroy() {
            this.$bus.$off("sendUsers");
        }
    }
</script>
         
<style>
    a {
        width: 100px;
        height: 100px;
    }
</style>