<template>
    <div>
        <h1 v-text="msg"></h1>
        <Category title="美食">
            <ul slot="slot1">
                <li v-for="(item, index) in foods" :key="index">{{item}}</li>
            </ul>
        </Category>

        <Category title="电影">
            <template v-slot:slot1>
                <ol slot="slot1">
                    <li v-for="(item, index) in movies" :key="index">{{item}}</li>
                </ol>
            </template>
        </Category>

        <Category title="游戏">
            <template slot="slot1" scope="data">
                <h4 v-for="(game, index) in data.games" :key="index">{{game}}</h4>
            </template>
        </Category>
    </div>
</template>

<script>
    import Category from "./components/Category"

    export default {
        name: 'App',
        components: {
            Category,
        },
        data() {
            return {
               msg: 'slot插槽',
               foods: ["宫保鸡丁", "鱼香肉丝", "锅包肉"],
               movies: ["钢琴家", "绿皮书", "美丽人生"],
            }
        },
    }
</script>