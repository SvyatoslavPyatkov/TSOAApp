import http from "../http-common.js";

class EduProgramsDataService {
    getAll() {
        return http.get("/api/education_programs/");
    }

    get(id) {
        return http.get(`/api/education_programs/${id}`);
    }
    
    create(data) {
        return http.post("/api/education_programs/", data);
    }
    
    update(id, data) {
        return http.put(`/api/education_programs/${id}`, data);
    }
    
    delete(id) {
        return http.delete(`/api/education_programs/${id}`);
    }
    
    deleteAll() {
        return http.delete(`/api/education_programs`);
    }
    
    findByTitle(title) {
        return http.get(`/api/education_programs?title=${title}`);
    }
}

export default new EduProgramsDataService();