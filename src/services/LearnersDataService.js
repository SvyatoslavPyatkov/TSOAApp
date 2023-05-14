import http from "../http-common.js";

class LearnersDataService {
    getAll() {
        return http.get("/api/learners/");
    }

    get(id) {
        return http.get(`/api/learners/${id}`);
    }
    
    create(data) {
        return http.post("/api/learners/", data);
    }
    
    update(id, data) {
        return http.put(`/api/learners/${id}`, data);
    }
    
    delete(id) {
        return http.delete(`/api/learners/${id}`);
    }
    
    deleteAll() {
        return http.delete(`/api/learners`);
    }
    
    findByTitle(title) {
        return http.get(`/api/learners?title=${title}`);
    }
}

export default new LearnersDataService();