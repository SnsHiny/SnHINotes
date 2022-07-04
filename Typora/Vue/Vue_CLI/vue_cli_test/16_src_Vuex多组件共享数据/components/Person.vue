<template>
    <div>
        <h1 v-text='msg'></h1>
        <h3>Count组件求和为：{{sum}}</h3>
        <input type="text" placeholder="请输入人员..." v-model="name">
        <button @click="addPerson()">提交</button>
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
            ...mapState(['personList', 'sum'])
        },
        methods: {
            addPerson() {
                const person = {id: nanoid(), name: this.name}
                this.$store.commit("ADD_PERSON", person)
                this.name = ''
            }
        },
    }
</script>
         
<style>
       
</style>