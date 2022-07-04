<template>
    <div>
    </div>
</template>
           
<script>
    export default {
        name: 'Error',
        created() {
            this.$alert("登录信息失效", "提示", {
                confirmButtonText: '确定'
            }).then(() => {
                window.sessionStorage.removeItem('token')
                this.$router.replace({path: '/Login'})
            })
        }
    }
</script>
         
<style>
       
</style>