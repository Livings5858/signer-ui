//引入路由对象
import { createRouter, createWebHistory } from 'vue-router'

// 每个路由都需要映射到一个组件。
const routes = [
    {
        path: '/',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/signer',
        component: () => import('@/views/Signer.vue'),
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

//导出router
export default router
