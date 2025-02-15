import { createRouter, createWebHistory } from "vue-router";

import Home from './views/Home.vue'
import DetailedList from './views/DetailedList.vue'

const routes = [
    {
        path: '/',
        name: "Home",
        component: Home
    },
    {
        path: '/favoritos',
        name: "DetailedList",
        component: DetailedList
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router