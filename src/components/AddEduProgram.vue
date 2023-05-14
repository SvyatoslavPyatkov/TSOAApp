<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
            <label for="education_program">Программа обучения</label>
            <input
                type="text"
                class="form-control"
                id="education_program"
                required
                v-model="EduProgRecord.education_program"
                name="education_program"
            />
            </div>
    
            <div class="form-group">
            <label for="training_duration">Продолжительность обучения</label>
            <input
                class="form-control"
                id="training_duration"
                required
                v-model="EduProgRecord.training_duration"
                name="training_duration"
            />
            </div>
    
            <button @click="saveEduProgram" class="btn btn-success">Submit</button>
        </div>
    
        <div v-else>
            <h4>You submitted successfully!</h4>
            <button class="btn btn-success" @click="newEduProgram">Add</button>
        </div>
    </div>
</template>
  
<script>
    import EduProgramsDataService from "../../services/EduProgramsDataService.js";
    
    export default {
        name: "add-EduProgRecord",
        data() {
        return {
            EduProgRecord: {
                id: null,
                education_program: "",
                training_duration: "",
                published: false
            },
            submitted: false
        };
        },
        methods: {
            saveEduProgram() {
                var data = {
                    education_program: this.EduProgRecord.education_program,
                    training_duration: this.EduProgRecord.training_duration
                };
    
                EduProgramsDataService.create(data)
                .then(response => {
                    this.EduProgRecord.id = response.data.id;
                    console.log(response.data);
                    this.submitted = true;
                })
                .catch(e => {
                    console.log(e);
                });
            },
        
            newEduProgram() {
                this.submitted = false;
                this.EduProgRecord = {};
            }
        }
    };
</script>
  
<style>
    .submit-form {
        max-width: 300px;
        margin: auto;
    }
</style>
  