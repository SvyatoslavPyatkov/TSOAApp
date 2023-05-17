<template>
    <div class="col-md-6 navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto flex-column">
                <li class="nav-item">
                    <router-link to="/api/education_programs" class="nav-link">Программы обучения</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/api/education_programs/add" class="nav-link">Добавление программ обучения</router-link>
                </li>
              </ul>
            </div>
    <div class="list row">
        <!-- <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Поиск по образовательной программе"
                    v-model="education_program"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button"
                        @click="searchEduProgram"
                    >
                        Поиск
                    </button>
                </div>
            </div>
        </div> -->
        
        <div class="col-md-6">
            <h4>Программы обучения</h4>
            <ul class="list-group">
                <li class="list-group-item"
                    :class="{ active: index == currentIndex }"
                    v-for="(education_programs, index) in education_programs"
                    :key="index"
                    @click="setEduProgram(education_programs, index)"
                >
                    {{ education_programs.education_program }}
                </li>
            </ul>
    
            <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllEduPrograms">
                Remove All
            </button> -->
        </div>
        <div class="col-md-6">
            <div v-if="currentEduProgram">
                <h4>Программа обучения</h4>
            <div>
                <label><strong>Программа:</strong></label> {{ currentEduProgram.education_program }}
            </div>
            <div>
                <label><strong>Продолжительность обучения:</strong></label> {{ currentEduProgram.training_duration }}
            </div>
            <!-- <div>
                <label><strong>Статус:</strong></label> {{ currentEduProgram.published ? "Published" : "Pending" }}
            </div> -->
    
            <router-link :to="'/api/education_programs/' + currentEduProgram.id" class="badge badge-warning">Изменить</router-link>
            </div>
            <div v-else>
                <br />
                <p>Пожалуйста, нажмите на программу...</p>
            </div>
        </div>
    </div>
</template>
  
<script>
    import EduProgramsDataService from "../../services/EduProgramsDataService.js";
  
    export default {
        name: "EduProgRecord-list",
        data() {
        return {
            education_programs: [],
            currentEduProgram: null,
            currentIndex: -1,
            education_program: ""
        };
        },
        methods: {
            retrieveEduPrograms() {
                EduProgramsDataService.getAll()
                .then(response => {
                    this.education_programs = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
            },
        
            refreshList() {
                this.retrieveEduPrograms();
                this.currentEduProgram = null;
                this.currentIndex = -1;
            },
        
            setEduProgram(education_programs, index) {
                this.currentEduProgram = education_programs;
                this.currentIndex = education_programs ? index : -1;
            },
        
            removeAllEduPrograms() {
                EduProgramsDataService.deleteAll()
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });
            },
            
            searchEduProgram() {
                EduProgramsDataService.findByTitle(this.education_program)
                .then(response => {
                    this.education_programs = response.data;
                    this.setEduProgram(null);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
            }
        },
        mounted() {
            this.retrieveEduPrograms();
        }
    };
</script>
  
<style>
    .list {
        text-align: left;
        max-width: 750px;
        margin: auto;
    }
</style>
  