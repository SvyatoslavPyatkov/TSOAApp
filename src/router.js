import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
        path: "/",
        alias: "/api/education_programs",
        name: "EduPrograms",
        component: () => import("./components/EduProgramList.vue")
    },
    {
        path: "/api/education_programs/:id",
        name: "EduProgram-details",
        component: () => import("./components/EduProgram.vue")
    },
    {
        path: "/api/education_programs/add",
        name: "AddEduProgram",
        component: () => import("./components/AddEduProgram.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;