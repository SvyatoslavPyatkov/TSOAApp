<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
            <input
                type="text"
                class="form-control"
                placeholder="Search by title"
                v-model="searchProgram"
            />
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button"
                    @click="page = 1; retrieveEduPrograms();">
                    Search
                </button>
            </div>
            </div>
        </div>
  
      <div class="col-md-12">
        <div class="mb-3">
          Items per Page:
          <select v-model="pageSize" @change="handlePageSizeChange($event)">
            <option v-for="size in pageSizes" :key="size" :value="size">
              {{ size }}
            </option>
          </select>
        </div>
  
        <b-pagination
          v-model="page"
          :total-rows="count"
          :per-page="pageSize"
          prev-text="Prev"
          next-text="Next"
          @change="handlePageChange"
        ></b-pagination>
      </div>
  
      <div class="col-md-6">
        <h4>EduPrograms List</h4>
        <ul class="list-group" id="programs-list">
          <li
            class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(program, index) in rows"
            :key="index"
            @click="setActiveEduProgram(program, index)"
          >
            {{ program.text }}
          </li>
        </ul>
  
        <button class="m-3 btn btn-sm btn-danger" @click="removeAllEduPrograms">
          Remove All
        </button>
      </div>
  
        <div class="col-md-6">
            <div v-if="currentEduProgram">
                <h4>EduProgram</h4>
                <div>
                    <label><strong>Name:</strong></label> {{ currentEduProgram.text }}
                </div>
                <div>
                    <label><strong>Description:</strong></label>
                    {{ currentEduProgram.description }}
                </div>
                <div>
                    <label><strong>Status:</strong></label>
                    {{ currentEduProgram.published ? "Published" : "Pending" }}
                </div>
        
                <a class="badge badge-warning" :href="'/programs/' + currentEduProgram.id">
                    Edit
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a EduProgram...</p>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import EduProgramDataService from "../../services/EduProgramsDataService.js";
  
  export default {
    name: "programs-list",
    data() {
        return {
            rows: [],
            currentEduProgram: null,
            currentIndex: -1,
            searchProgram: "",
    
            page: 1,
            count: 0,
            pageSize: 9,
    
            pageSizes: [3, 6, 9],
        };
    },
    methods: {
        getRequestParams(searchProgram, page, pageSize) {
            let params = {};
    
            if (searchProgram) {
            params["text"] = searchProgram;
            }
    
            if (page) {
            params["page"] = page - 1;
            }
    
            if (pageSize) {
            params["size"] = pageSize;
            }
    
            return params;
        },
  
    retrieveEduPrograms() {
        const params = this.getRequestParams(
            this.searchProgram,
            this.page,
            this.pageSize
        );
  
        EduProgramDataService.getAll(params)
        .then((response) => {
            const { rows, totalItems } = response.data;
            this.rows = rows;
            this.count = totalItems;
  
            console.log(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
    },
  
    handlePageChange(value) {
        this.page = value;
        this.retrieveEduPrograms();
    },
  
    handlePageSizeChange(event) {
        this.pageSize = event.target.value;
        this.page = 1;
        this.retrieveEduPrograms();
    },
  
    refreshList() {
        this.retrieveEduPrograms();
        this.currentEduProgram = null;
        this.currentIndex = -1;
    },
  
    setActiveEduProgram(program, index) {
        this.currentEduProgram = program;
        this.currentIndex = index;
    }
    },
    mounted() {
      this.retrieveEduPrograms();
    },
  };
</script>
  
<style>
    .list {
        text-align: left;
        max-width: 750px;
        margin: auto;
    }
</style>
  