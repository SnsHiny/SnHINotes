<template>
  <div id="DutyHeader">
        <div class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <input type="text" class="form-control" v-model="title" placeholder="输入今天要完成的任务" @keyup.enter="addDuty">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //引入随机序列 （install i nanoid）
    import {nanoid} from 'nanoid'

    export default {
        name: 'DutyHeader',
        // 拿到app组件传来的添加duty方法
        props: ['submitDuty'],
        data() {
            return {
                title: '',
            }
        },
        methods: {
            addDuty() {
                // 判断是否为空值
                if(!this.title) return alert('输入不能为空！')
                // 包装对象
                const dutyObj = {id: nanoid(), dutyName: this.title, completed: false}
                // 通知app组件去添加一个duty对象
                this.submitDuty(dutyObj)
                // 清空输入框
                this.title = ''
            }
        },
    }
</script>

<style scoped>

</style>