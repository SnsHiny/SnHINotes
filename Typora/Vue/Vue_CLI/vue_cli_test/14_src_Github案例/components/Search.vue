<template>
    <div class="jumbotron" style="width: 1000px; margin: 0 auto;">
        <div class="container">
            <h3>Search Github Users</h3>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for..." v-model="keyWords">
                        <span class="input-group-btn">
                            <button @click="searchUsers()" class="btn btn-default" type="button">Search</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
           
<script>
    import axios from 'axios'

    export default {
        name: 'Search',
        data() {
            return {
                keyWords: ''
            }
        },
        methods: {
            searchUsers() {
                axios.get(`https://api.github.com/search/users?q=${this.keyWords}`).then(
                    response => {
                        console.log('请求成功了 :>> ', response.data.items);
                        this.$bus.$emit("sendUsers", response.data.items);
                    },
                    error => {
                        console.log("请求失败了", error.message);
                    }
                )
            }
        },
    }
</script>
         
<style>
       
</style>