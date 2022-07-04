<template>
    <div>
        <ul>
            <!-- 接收参数 -->
            <li>消息编号：{{id}}</li>
            <li>消息标题：{{title}}</li>
        </ul>
    </div>
</template>
           
<script>
    export default {
        name: 'Detail',
        // 路由的props配置
        props: ['id', 'title']
    }
</script>