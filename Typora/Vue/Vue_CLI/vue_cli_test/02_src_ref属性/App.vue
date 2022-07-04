// 被用来给元素或子组件注册引用信息（id的替代者）

<template>
    <div>
        <h1 v-text="msg" ref="title"></h1>
        <Person ref="per"></Person>
        <Person id="per"></Person>
        <button @click="showDom">点我获取元素</button>
    </div>
</template>

<script>
    import Person from './components/Person'

    export default {
        name: 'App',
        components: {
            Person
        },
        data() {
            return {
               msg: 'ref属性' 
            }
        },
        methods: {
            showDom() {
                console.log(this.$refs.title); //真实DOM元素
                console.log(this.$refs.per); //组件实例对象
                console.log(document.getElementById('per')); //真实DOM元素
            }
        },
    }
</script>