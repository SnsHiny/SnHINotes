export const show = {
    // 混入的数据与组件原有的数据进行合并，若有重复属性以组件原有属性数据为准
    data() {
        return {
            x: 10,
            y: 20
        }
    },
    methods: {
        showName() {
            alert(this.name)
        }
    },
}