<template>
    <Navbar />
    <RouterView v-slot="{ Component, route }">
        <transition name="slide" mode="out-in">
            <component :is="Component" :key="route.path" />
        </transition>
    </RouterView>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted } from "vue";

import { useDeviceStore } from "@/store/deviceStore";

const deviceStore = useDeviceStore();

onMounted(() => {
    deviceStore.initialize();
});
</script>

<style></style>
