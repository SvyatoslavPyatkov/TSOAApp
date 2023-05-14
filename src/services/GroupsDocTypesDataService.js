import http from "../http-common.js";

class GroupsDocTypesDataService {
    getAll() {
        return http.get("/api/groupsdoctypes/");
    }

    get(id) {
        return http.get(`/api/groupsdoctypes/${id}`);
    }
    
    create(data) {
        return http.post("/api/groupsdoctypes/", data);
    }
    
    update(id, data) {
        return http.put(`/api/groupsdoctypes/${id}`, data);
    }
    
    delete(id) {
        return http.delete(`/api/groupsdoctypes/${id}`);
    }
    
    deleteAll() {
        return http.delete(`/api/groupsdoctypes`);
    }
    
    findByTitle(title) {
        return http.get(`/api/groupsdoctypes?title=${title}`);
    }
}

export default new GroupsDocTypesDataService();