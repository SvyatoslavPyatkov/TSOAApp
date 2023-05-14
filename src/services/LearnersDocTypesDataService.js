import http from "../http-common.js";

class LearnersDocTypesDataService {
    getAll() {
        return http.get("/api/learnersdoctypes/");
    }

    get(id) {
        return http.get(`/api/learnersdoctypes/${id}`);
    }
    
    create(data) {
        return http.post("/api/learnersdoctypes/", data);
    }
    
    update(id, data) {
        return http.put(`/api/learnersdoctypes/${id}`, data);
    }
    
    delete(id) {
        return http.delete(`/api/learnersdoctypes/${id}`);
    }
    
    deleteAll() {
        return http.delete(`/api/learnersdoctypes`);
    }
    
    findByTitle(title) {
        return http.get(`/api/learnersdoctypes?title=${title}`);
    }
}

export default new LearnersDocTypesDataService();