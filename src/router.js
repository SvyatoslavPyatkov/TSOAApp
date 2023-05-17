import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
        path: "/",
        alias: "/api/education_programs",
        name: "EduPrograms",
        component: () => import("./components/EduPrograms/EduProgramList.vue")
    },
    {
        path: "/api/education_programs/:id",
        name: "EduProgram-details",
        component: () => import("./components/EduPrograms/EduProgram.vue")
    },
    {
        path: "/api/education_programs/add",
        name: "AddEduProgram",
        component: () => import("./components/EduPrograms/AddEduProgram.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;