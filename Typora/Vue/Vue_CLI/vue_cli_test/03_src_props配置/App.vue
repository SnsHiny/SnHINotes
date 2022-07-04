<template>
    <div>
        <h1 v-text="msg" ref="title"></h1>
        <!-- 属性如果不使用v-bind动态绑定，将默认为字符串类型 -->
        <Person name = '张三' :age = '18' :weight = '50' :height = '180'></Person>
        <Person name = '李四' :age = '19' :weight = '60' :height = '170'></Person>
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
               msg: 'props属性' 
            }
        },
    }
</script>