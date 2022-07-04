<template>
    <div>
        <h1>当前求和为：{{sum}}</h1>
        <h1>放大十倍后是：{{bigSum}}</h1>
        <h3>Person组件人员人数为：{{personList.length}}</h3>
        <select v-model.number="number">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="ADD(number)">+</button>
        <button @click="SUBTRACT(number)">-</button>
        <button @click="addOdd(number)">当前求和为奇数再加</button>
        <button @click="addWait(number)">等一等再加</button>
    </div>
</template>
           
<script>
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
    export default {
        name: 'Count',
        data() {
            return {
                number: 1
            }
        },
        computed: {
            // 借助mapState生成计算属性，从State中获取数据
            ...mapState('countOptions', ['sum']),
            ...mapState('personOptions', ['personList']),
            ...mapGetters('countOptions', ['bigSum'])
        },
        methods: {
            // add() {
            //     // 没有逻辑判断可直接跳过dispatch执行commit操作数据
            //     this.$store.commit("ADD", this.number);
            // },
            // subtract() {
            //     this.$store.commit("SUBTRACT", this.number);
            // },
            // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations，要传入的参数在模板中绑定事件时传入
            ...mapMutations('countOptions', ['ADD', 'SUBTRACT']),

            // addOdd() {
                //     this.$store.dispatch("addOdd", this.number);
            // },
            // addWait() {
                //     this.$store.dispatch("addWait", this.number);
            // },
            // 借助mapActions生成对应的方法，方法中会调用dispatch去联系actions，要传入的参数在模板中绑定事件时传入
            ...mapActions('countOptions', ["addOdd", "addWait"])
        },  
        mounted() {
            console.log(this);
        },
    }
</script>
         
<style>
    button {
        margin-left: 5px;
    }
</style>