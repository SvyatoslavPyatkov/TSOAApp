import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/programs",
      name: "programs",
      component: () => import("./components/EduPrograms/EduProgramList.vue")
    },
    {
      path: "/programs/:id",
      name: "program-details",
      component: () => import("./components/EduPrograms/EduProgram.vue")
    },
    {
      path: "programs/add",
      name: "programs-add",
      component: () => import("./components/EduPrograms/AddEduProgram.vue")
    }
  ]
});
