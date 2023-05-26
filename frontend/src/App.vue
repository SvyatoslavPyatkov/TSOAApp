<template>
    <div class="app">
        <h1>Страница слушателей</h1>
        <simple-button
            @click="fetchRecords"
        >
            Получить слушателей
        </simple-button>
        <simple-button
            @click="showDialog"
            style="margin: 15px 0"
        >
            Создать слушателя
        </simple-button>
        <simple-dialog v-model:show="dialogVisible">
            <record-form
                @create="createRecord"
            />
        </simple-dialog>
        
        <record-list
            :records="records" 
            @remove="removeRecord"
        />
        
    </div>
    
</template>

<script>
    import RecordForm from '@/components/RecordForm.vue';
    import RecordList from '@/components/RecordList.vue';
    import axios from 'axios';

    export default {
        components: {
            RecordForm,
            RecordList
        },
        
        data() {
            return {
                records: [
                    {id: 1, title: 'Title1', body: 'Description1'},
                    {id: 2, title: 'Title2', body: 'Description2'},
                    {id: 3, title: 'Title3', body: 'Description3'},
                    {id: 4, title: 'Title4', body: 'Description4'}
                ],
                dialogVisible: false
            }
        },
        methods: {
            createRecord(record) {
                this.records.push(record);
                this.dialogVisible = false;
            },
            removeRecord(record) {
                this.records = this.records.filter(r => r.id !== record.id)
            },
            showDialog() {
                this.dialogVisible = true
            },
            async fetchRecords() {
                try {
                    const response = await axios.get('http://localhost:3000/api/auth/users');
                    this.records.title = response.data.first_name;
                    this.records.body = response.data.last_name;
                    console.log(response);
                } catch (err) {
                    alert(err);
                }
            }
        }
    }
</script>

<style>
* {
    margin: 0;
    padding: 0px;
    box-sizing: border-box;
}

.app {
    padding: 20px;
}
</style>