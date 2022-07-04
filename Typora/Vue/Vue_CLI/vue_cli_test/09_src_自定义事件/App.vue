<template>
    <div>
        <h1 v-text="msg"></h1>
        <!-- 通过父组件给子组件传递函数类型的props实现子给父传递数据 -->
        <School :getSchoolName="getSchoolName"></School>
        <!-- 通过父组件给子组件绑定一个自定义事件实现子给父传递数据；如需给子组件绑定DOM原生事件，需加上.native，否则默认为自定义事件 -->
        <Person v-on:SnHI="getPersonName" @click.native="show"></Person>
    </div>
</template>

<script>
    import School from './components/School'
    import Person from './components/Person'

    export default {
        name: 'App',
        components: {
            Person,
            School
        },
        data() {
            return {
               msg: '组件自定义事件' 
            }
        },
        methods: {
            getSchoolName(name) {
                console.log("App获取到学校名称", name);
            },
            getPersonName(name) {
                console.log("App获取到学生姓名", name);
            },
            show() {
                alert(123)
            }
        },
    }
</script>