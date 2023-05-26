import http from "../http-common.js";

class EduProgramsDataService {
    getAll(params) {
        return http.get("/api/programs/", { params });
    }

    get(id) {
        return http.get(`/api/programs/${id}`);
    }
    
    create(data) {
        return http.post("/api/programs/", data);
    }
    
    update(id, data) {
        return http.put(`/api/programs/${id}`, data);
    }
    
    delete(id) {
        return http.delete(`/api/programs/${id}`);
    }
    
    findByText(text) {
        return http.get(`/api/programs?text=${text}`);
    }
}

export default new EduProgramsDataService();