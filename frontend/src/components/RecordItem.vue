<template>
    <div class="record">
        <div>
            <div><strong>Название</strong>{{ record.title }}</div>
            <div><strong>Описание</strong>{{ record.body }}</div>
        </div>
        <div class="record__btns">
            <simple-button @click="$emit('remove', record)">Удалить</simple-button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            record: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style>
.record {
    padding: 15px;
    margin-top: 15px;
    border: 2px solid teal;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>