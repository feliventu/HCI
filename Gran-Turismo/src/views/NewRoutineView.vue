<template>
    <div class="px-12 pt-5">
        <h2>Nueva rutina</h2>
        <form>
            <v-text-field
                class="pt-5"
                label="Nombre"
                style="max-width: 300px"
                variant="outlined"
                v-model="name"
            ></v-text-field>
            <v-text-field
                class="pt-5"
                label="Descripcion"
                style="max-width: 300px"
                variant="outlined"
                v-model="description"
            ></v-text-field>
            <v-select
                label="Hogar"
                style="max-width: 300px"
                :items="homes"
                variant="outlined"
                v-model="home"
            ></v-select>

            <v-btn
                class="custom-button"
                variant="outlined"
                height="40px"
                @click="navigateToActions()"
                :disabled="!canCreate"
                >Agregar</v-btn
            >
        </form>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useHomeStore } from "@/store/homeStore";
import { useRouter } from "vue-router";

const name = ref("");
const description = ref("");
const home = ref("");
const deviceTypeId = ref(null);
const homes = ref([]);
const homeDevices = ref([]);

const homeStore = useHomeStore();

const router = useRouter();
onMounted(async () => {
    try {
        const fetchedHomes = await homeStore.get();
        homes.value = fetchedHomes.map((home) => home.name);
    } catch (e) {
        console.error("Failed to load homes: ", e);
    }
});

const canCreate = computed(() => {
    return name.value && description.value && home.value;
});

const navigateToActions = () => {
    if (canCreate.value) {
        router.push({
            name: "actions",
            query: {
                home: home.value,
                name: name.value,
                description: description.value,
            },
        });
    }
};
</script>
