import {createRouter, createWebHistory} from 'vue-router'
const routes = [
    {
        path: '/',
        redirect: '/home',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})