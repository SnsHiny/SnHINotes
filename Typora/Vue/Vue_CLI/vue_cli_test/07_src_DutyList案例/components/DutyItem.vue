<template>
    <li class="list-group-item">
        <label>
            <!-- :checked：控制复选框是否选中 -->
            <input type="checkbox" :checked="duty.completed" @change="checkCompleted(duty.id)">
            <span v-show="!duty.isEdit" style="margin-left: 10px; font-size: 16px">{{duty.dutyName}}</span>
            <input ref="inputTitle" v-show="duty.isEdit" style="margin-left: 10px" type="text" :value="duty.dutyName" @blur="handleBlur(duty, $event)">
        </label>
        <button style="float: right" type="button" class="btn btn-danger btn-sm" @click="handleDuty(duty.id)">删除</button>
        <button v-show="!duty.isEdit" style="float: right" type="button" class="btn btn-info btn-sm" @click="EditDuty(duty)">编辑</button>
    </li>
</template>

<script>
    export default {
        name: 'DutyItem',
        props: ['duty'],
        methods: {
            // 更新选中状态
            checkCompleted(id) {
                // this.updateCompleted(id);
                this.$bus.$emit("updateCompleted", id);
            },
            // 删除Duty
            handleDuty(id) {
                if(confirm('确认删除吗？')) {
                    // this.deleteDuty(id)
                    this.$bus.$emit("deleteDuty", id);
                }
            },
            // 编辑Duty
            EditDuty(duty) {
                if("isEdit" in duty) {
                    duty.isEdit = true;
                } else {
                    this.$set(duty, "isEdit", true);
                }
                // $nextTick：在下一次DOM更新结束后执行指定的回调
                this.$nextTick(function() {
                    this.$refs.inputTitle.focus();
                })
            },
            // 编辑框失去焦点并触发修改事件
            handleBlur(duty, e) {
                duty.isEdit = false;
                if(!e.target.value.trim()) return alert("输入不能为空");
                this.$bus.$emit("updateDuty", duty.id, e.target.value);
            }
        },
    }
</script>

<style>
    li:hover {
        background-color: azure;
    }
</style>
