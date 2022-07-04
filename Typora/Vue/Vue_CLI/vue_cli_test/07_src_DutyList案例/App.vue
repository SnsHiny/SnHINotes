<template>
    <div style="width: 600px" class="panel panel-success">
        <div class="panel-heading">
            <h3 class="panel-title">备忘录</h3>
        </div>
        <div class="panel-body">
            <!-- 兄弟组件之间无法直接传递数据，因此通过共同的父组件来传递，其中一个子组件调用父组件传来的添加方法，通知父亲向另一个子组件更新数据 -->
            <DutyHeader :submitDuty="submitDuty"></DutyHeader>
            <DutyContext :dutys="dutys"></DutyContext>
            <DutyFooter :dutys="dutys" :checkAll="checkAll" :clearAll="clearAll"></DutyFooter>
        </div>
    </div>
</template>

<script>
    // 引入bootstrap，其所有子组件都可以使用
    import './assets/bootstrap/css/bootstrap.min.css'
    import DutyHeader from './components/DutyHeader'
    import DutyContext from './components/DutyContext'
    import DutyFooter from './components/DutyFooter'

    export default {
        name: 'App',
        components: {
            DutyHeader,
            DutyContext,
            DutyFooter
        },
        data() {
            return {
                // 初始数据，本地存储中没有数据时取空数组
                dutys: JSON.parse(localStorage.getItem("dutys")) || []
            }
        },
        methods: {
            // 添加duty
            submitDuty(dutyObj) {
                this.dutys.unshift(dutyObj)
            },
            // 更新选中状态
            updateCompleted(id) {
                this.dutys.forEach((duty) => {
                    if(duty.id === id) duty.completed = !duty.completed
                });
            },
            // 删除Duty
            deleteDuty(id) {
                this.dutys.forEach((duty, index) => {
                    if(duty.id === id) this.dutys.splice(index, 1)
                });
            },
            // 编辑Duty
            updateDuty(id, title) {
                this.dutys.forEach((duty) => {
                    if(duty.id === id) duty.dutyName = title
                });
            },
            // 全选或取消全选
            checkAll(checked) {
                this.dutys.forEach((duty) => {
                    duty.completed = checked
                });
            },
            // 删除所有勾选Duty
            clearAll() {
                // 过滤器不影响原数组，因此需要重新赋值
                this.dutys = this.dutys.filter((duty) => {
                    return !duty.completed
                }
            )}
        },
        // 监测dutys的变化，一旦变化将新的dutys存入本地存储
        watch: {
            dutys: {
                deep: true,
                handler(value) {
                    localStorage.setItem("dutys", JSON.stringify(value))
                }
            }
        },
        // 使用全局事件总线使app组件和item组件之间直接传递数据，而无需通过context组件逐层传递
        mounted() {
            this.$bus.$on("updateCompleted", this.updateCompleted);
            this.$bus.$on("deleteDuty", this.deleteDuty);
            this.$bus.$on("updateDuty", this.updateDuty);
        },
        beforeDestroy() {
            this.$bus.$off(["updateCompleted", "deleteDuty", "updateDuty"]);
        }
    }
</script>