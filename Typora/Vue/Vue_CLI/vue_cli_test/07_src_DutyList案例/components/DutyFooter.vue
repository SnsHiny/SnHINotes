<template>
    <div id="DutyFooter" v-show="dutys.length">
        <input type="checkbox" :checked="completedNum === dutys.length && dutys.length > 0" @click="choseAll">
        <span style="margin-left: 10px">已完成{{completedNum}}
            <span> / 全部{{dutys.length}}</span>
        </span>
        <button style="float: right" type="button" class="btn btn-danger btn-sm" @click="deleteAll">删除已完成任务</button>
    </div>
</template>

<script>
    export default {
        name: 'DutyFooter',
        props: ['dutys', 'checkAll', 'clearAll'],
        computed: {
            // 已勾选的数量，通过reduce条件统计实现
            completedNum() {
                // reduce有两个参数，第一个为(pre, current) => {}函数，遍历几次函数便执行几次；第二个是统计的初始值；pre是上一次调用该函数的返回值；current为当前值
                return this.dutys.reduce((pre, current) => {
                    return pre + (current.completed ? 1: 0)
                }, 0)
            }
        },
        methods: {
            // 全选或取消全选
            choseAll(e) {
                this.checkAll(e.target.checked)
            },
            // 删除所有已勾选的Duty
            deleteAll() {
                if(confirm('确认删除已勾选的任务？')) {
                    this.clearAll()
                }
            }
        },
    }
</script>

<style>

</style>
