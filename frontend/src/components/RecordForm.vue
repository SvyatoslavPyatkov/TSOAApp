<template>
    <form @submit.prevent>
        <h4>Создание записи</h4>
        <simple-input 
            v-model="record.title"
            type="text" 
            placeholder="Название записи"
        />
        <simple-input 
            v-model="record.body"
            type="text" 
            placeholder="Описание записи"
        />
        <simple-button style="align-self: flex-end; margin-top: 15px;" @click="createRecord" >Создать</simple-button>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                record: {
                    title: '',
                    body: ''
                }
            }
        },
        methods: {
            createRecord() {
                this.record.id = Date.now();
                this.$emit('create', this.record);
                this.record = {
                    title: '',
                    body: ''
                }
            }
        }
    }
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>