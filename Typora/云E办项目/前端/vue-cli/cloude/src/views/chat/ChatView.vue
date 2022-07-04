<template>
    <div id="app">
        <div class="sidebar">
            <Card></Card>
            <List></List>
        </div>
        <div class="main">
            <Message></Message>
            <Usertext></Usertext>
        </div>
    </div>
</template>

<script>
    import Card from '../../components/chat/Card'
    import List from '../../components/chat/List'
    import Message from '../../components/chat/Message'
    import Usertext from '../../components/chat/Usertext'

    export default {
        name: 'ChatView',
        data () {
            return {
            
            }
        },
        mounted:function() {
            this.$store.dispatch('initData');
        },
        components:{
            Card,
            List,
            Message,
            Usertext
        }
    }
</script>

<style lang="scss" scoped>
    #app {
        margin: 0px auto;
        width: 800px;
        height: 550px;
        overflow: hidden;
        border-radius: 10px;

        .sidebar, .main {
            height: 100%;
        }

        .sidebar {
            float: left;
            color: #f4f4f4;
            background-color: #2e3238;
            width: 200px;
        }

        .main {
            position: relative;
            overflow: hidden;
            background-color: #eee;
        }
    }
</style>
