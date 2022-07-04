// 定义插件
export default {
    install(Vue) {
        // 全局过滤器
        Vue.filter("mySlice", function(value) {
            return value.slice(0, 4)
        })
        // 全局指令
        Vue.directive("big", function(element, binding){
            element.innerText = binding.value * 10
        })
        // 全局混入
        Vue.mixin({
            data() {
                return {
                    x: 10,
                    y: 20
                }
            },
        })
    }
}