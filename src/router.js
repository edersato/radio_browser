import { createRouter, createWebHistory } from "vue-router";

import Home from './views/Home.vue'
import DetailedList from './views/DetailedList.vue'
import Player from './views/Player.vue'

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
    {
        path: '/player',
        name: "Player",
        component: Player
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router