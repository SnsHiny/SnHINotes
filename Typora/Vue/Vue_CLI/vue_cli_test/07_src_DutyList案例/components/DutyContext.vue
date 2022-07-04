<template>
    <div id="DutyContext">
        <ul class="list-group">
            <DutyItem v-for="duty in dutys" :key="duty.id" :duty="duty"></DutyItem>
        </ul>
    </div>
</template>

<script>
    import DutyItem from './DutyItem'

    export default {
        name: 'DutyContext',
        components: {
            DutyItem
        },
        props: ['dutys']
    }
</script>

<style>

</style>
