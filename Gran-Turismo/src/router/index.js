import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import DevicesView from "@/views/DevicesView.vue";
import NewDeviceView from "@/views/NewDeviceView.vue";
import NewHomeView from "@/views/NewHomeView.vue";
import NewRoutineView from "@/views/NewRoutineView.vue";
import RoutineActionsView from "@/views/RoutineActionsView.vue";
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
            path: "/rutinas/nuevo",
            name: "new routine",
            component: NewRoutineView,
        },
        {
            path: "/rutinas/acciones",
            name: "actions",
            component: RoutineActionsView,
            props: (route) => ({
                home: route.query.home,
                name: route.query.name,
                description: route.query.description,
            }),
        },
        {
            path: "/hogares/nuevo",
            name: "new homes",
            component: NewHomeView,
        },
    ],
});

export default router;
