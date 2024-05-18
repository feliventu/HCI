import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import DevicesView from "@/views/DevicesView.vue";
import NewDeviceView from "@/views/NewDeviceView.vue";
import NewHomeView from "@/views/NewHomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/dispositivos",
            name: "devices",
            component: DevicesView,
        },
        { 
            path: "/dispositivos/nuevo",
            name: "new devices",
            component: NewDeviceView,
        },
        {
            path: "/hogares/nuevo",
            name: "new homes",
            component: NewHomeView,
        }
    ],
});

export default router;
