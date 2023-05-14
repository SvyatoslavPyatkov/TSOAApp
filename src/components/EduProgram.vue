<template>
    <div v-if="currentEduProgram" class="edit-form">
        <h4>Программа обучения</h4>
        <form>
            <div class="form-group">
                <label for="education_program">Программа обучения</label>
                <input type="text" class="form-control" id="education_program"
                    v-model="currentEduProgram.education_program"
                />
            </div>
            <div class="form-group">
                <label for="training_duration">Продолжительность обучения</label>
                <input type="text" class="form-control" id="training_duration"
                    v-model="currentEduProgram.training_duration"
                />
            </div>
    
            <div class="form-group">
                <label><strong>Статус:</strong></label>
                {{ currentEduProgram.published ? "Published" : "Pending" }}
            </div>
        </form>
    
        <button class="badge badge-primary mr-2"
            v-if="currentEduProgram.published"
            @click="updatePublished(false)"
        >
            UnPublish
        </button>
        <button v-else class="badge badge-primary mr-2"
            @click="updatePublished(true)"
        >
            Publish
        </button>
    
        <button class="badge badge-danger mr-2"
            @click="deleteEduProgram"
        >
            Delete
        </button>
    
        <button type="submit" class="badge badge-success"
            @click="updateEduProgram"
        >
            Update
        </button>
        <p>{{ message }}</p>
    </div>
  
        <div v-else>
            <br />
            <p>Please click on a EduProgram...</p>
        </div>
  </template>
  
<script>
    import EduProgramsDataService from "../services/EduProgramsDataService.js";
    
    export default {
        name: "EduProgRecord",
        data() {
            return {
                currentEduProgram: null,
                message: ''
            };
        },
        methods: {
            getEduProgram(id) {
                EduProgramsDataService.get(id)
                .then(response => {
                    this.currentEduProgram = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
            },
        
            updatePublished(status) {
                var data = {
                    id: this.currentEduProgram.id,
                    education_program: this.currentEduProgram.education_program,
                    training_duration: this.currentEduProgram.training_duration,
                    published: status
                };
        
                EduProgramsDataService.update(this.currentEduProgram.id, data)
                .then(response => {
                    console.log(response.data);
                    this.currentEduProgram.published = status;
                    this.message = 'The status was updated successfully!';
                })
                .catch(e => {
                    console.log(e);
                });
            },
        
            updateEduProgram() {
                EduProgramsDataService.update(this.currentEduProgram.id, this.currentEduProgram)
                .then(response => {
                    console.log(response.data);
                    this.message = 'The education program was updated successfully!';
                })
                .catch(e => {
                    console.log(e);
                });
            },
        
            deleteEduProgram() {
                EduProgramsDataService.delete(this.currentEduProgram.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "EduProgRecords" });
                })
                .catch(e => {
                    console.log(e);
                });
            }
        },
        mounted() {
            this.message = '';
            this.getEduProgram(this.$route.params.id);
        }
    };
</script>
  
<style>
    .edit-form {
        max-width: 300px;
        margin: auto;
    }
</style>
  