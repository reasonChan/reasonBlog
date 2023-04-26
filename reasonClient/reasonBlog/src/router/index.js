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
                name: '修改文章',
                icon: "Document",
                component: () => import('../views/System/update.vue')
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
        path: '/article',
        name: '文章',
        redirect: '/article/01',
        children: [
            {
                path: '/article/01',
                name: 'js基础',
                component: () => import('../views/Article/article01.vue')
            },
            {
                path: '/article/02',
                name: '动画渲染',
                component: () => import('../views/Article/article02.vue')
            },
            {
                path: '/article/03',
                name: '性能优化',
                component: () => import('../views/Article/article03.vue')
            },
            {
                path: '/article/04',
                name: '工程化和部署',
                component: () => import('../views/Article/article04.vue')
            }
        ]
    },
    // {
    //     path: '/animation',
    //     name: 'Animation',
    //     component: () => import('../views/animation.vue')
    // },
]

export default createRouter({
    history: createWebHistory(),
    routes
})
