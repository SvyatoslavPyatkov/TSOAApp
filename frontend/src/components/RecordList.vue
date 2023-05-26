<template>
    <div v-if="records.length > 0">
        <h3>Список слушателей</h3>
        <record-item 
            v-for="record in records"
            :record="record"
            :key="record.id"
            @remove="$emit('remove', record)"
        />
    </div>
    <h2 v-else style="color: red;">
        Список слушателей пуст
    </h2>
</template>

<script>
    import RecordItem from '@/components/RecordItem.vue'

    export default {
        components: { RecordItem },
        props: {
            records: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>