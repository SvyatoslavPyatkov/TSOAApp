import http from "../http-common.js";

class GroupsDataService {
    getAll() {
        return http.get("/api/groups/");
    }

    get(id) {
        return http.get(`/api/groups/${id}`);
    }
    
    create(data) {
        return http.post("/api/groups/", data);
    }
    
    update(id, data) {
        return http.put(`/api/groups/${id}`, data);
    }
    
    delete(id) {
        return http.delete(`/api/groups/${id}`);
    }
    
    deleteAll() {
        return http.delete(`/api/groups`);
    }
    
    findByTitle(title) {
        return http.get(`/api/groups?title=${title}`);
    }
}

export default new GroupsDataService();