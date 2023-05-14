import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ThanksView from '../views/ThanksView.vue'

const routes = [
    {  
        path: '/',
        name: 'home',
        component: HomeView
    },
    {  
        path: '/api/records',
        name: 'records',
        component: HomeView
    },
    {
        path: '/thanks',
        name: 'thanks',
        component: ThanksView
    }
]

const routerRecord = createRouter({
    history: createWebHashHistory(),
    routes
})

export default routerRecord
