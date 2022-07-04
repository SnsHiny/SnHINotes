<template>
    <div>
        <h1 v-text='msg'></h1>
        <h3>Count组件求和为：{{sum}}</h3>
        <input type="text" placeholder="请输入人员..." v-model="name">
        <button @click="addPerson()">提交</button>
        <button @click="addPersonFromServer()">随机产生一个人名</button>
        <ul>
            <li v-for="person in personList" :key="person.id">{{person.name}}</li>
        </ul>
    </div>
</template>
           
<script>
    import {mapState} from "vuex"
    import {nanoid} from 'nanoid'
    export default {
        name: 'Person',
        components: {
                     
        },
        data() {
            return {
                msg: '人员列表' ,
                name: ''
            }
        },
        computed: {
            ...mapState('countOptions', ['sum']),
            ...mapState('personOptions', ['personList'])
        },
        methods: {
            addPerson() {
                const person = {id: nanoid(), name: this.name}
                // 当不使用map生成getters/mutations/actions时，注意方法前缀要加上命名空间
                this.$store.commit("personOptions/ADD_PERSON", person)
                this.name = ''
            },
            addPersonFromServer() {
                this.$store.dispatch("personOptions/addPersonFromServer")
                this.name = ''
            }
        },
    }
</script>
         
<style>
       
</style>