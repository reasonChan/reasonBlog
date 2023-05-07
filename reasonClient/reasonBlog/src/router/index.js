import {createRouter, createWebHistory} from 'vue-router'
import {user, store} from "../store/index.js";
const userStore = user(store)

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
    },
    {
        path: '/system',
        name: '后台管理',
        component: () => import('../views/System/dashboard.vue'),
        redirect: '/system/add',
        children: [
            {
                path: '/system/add',
                name: '发布文章',
                icon: "DocumentAdd",
                component: () => import('../views/System/add.vue')
            },
            {
                path: '/system/update',
                name: '修改文章列表',
                icon: "Document",
                component: () => import('../views/System/update/index.vue'),
                children: [
                    {
                        path: '/system/update/:articleId',
                        name: '修改文章',
                        component: () => import('../views/System/update/update.vue'),
                    },
                ]
            },
            {
                path: '/system/analysis',
                name: '访问数据',
                icon: "Histogram",
                component: () => import('../views/System/analysis.vue')
            }
        ]
    },
    {
        path: '/article01',
        name: userStore.articleTag.keys()[0],
        component: () => import('../views/Article/article01/index.vue'),
        redirect: '/article01/catalogue',
        children: [
            {
                path: '/article01/catalogue',
                name: userStore.articleTag.keys()[0] + '目录',
                component: () => import('../views/Article/article01/catalogue.vue'),
                props: true,
                meta: 'ca'
            },
            {
                path: '/article01/:articleId',
                name: userStore.articleTag.keys()[0] + 'js文章详情',
                component: () => import('../views/Article/article01/detail.vue'),
                props: true,
                meta: 'con'
            },
        ]
    },
]

export default createRouter({
    history: createWebHistory(),
    routes
})
