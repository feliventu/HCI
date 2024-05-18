import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NewDeviceView from '@/views/NewDeviceView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/Dispositivos/NuevoDispositivo',
            name: 'NuevoDispositivo',
            component: NewDeviceView
        },

    ]
})

export default router
