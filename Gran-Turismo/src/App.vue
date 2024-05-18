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
</script>

<style></style>
