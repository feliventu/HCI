<template>
    <div class="px-12 pt-5">
        <h2>Nuevo Dispositivo</h2>
        <form>
            <v-text-field
                class="pt-5"
                label="Nombre"
                style="max-width: 300px"
                variant="outlined"
                v-model="name"
            ></v-text-field>
            <v-text-field
                label="Contraseña (Opcional)"
                style="max-width: 300px"
                variant="outlined"
            ></v-text-field>
            <v-select
                label="Dispositivo"
                style="max-width: 300px"
                :items="formattedDeviceTypes"
                item-value="id"
                item-title="name"
                variant="outlined"
                v-model="deviceTypeId"
            >
            </v-select>
            <v-select
                label="Hogar"
                style="max-width: 300px"
                :items="homes"
                variant="outlined"
                v-model="home1"
            ></v-select>
            <v-btn
                class="custom-button"
                variant="outlined"
                height="40px"
                @click="addDeviceToHome()"
                :disabled="!canCreate"
                >Agregar</v-btn
            >
        </form>
    </div>
</template>

<script setup>
import DropButton from "@/components/DropButton.vue";
import { useDeviceStore } from "@/store/deviceStore";
import { useHomeStore } from "@/store/homeStore";
import { Device } from "@/api/devices.js";
import { ref, onMounted } from "vue";
import { computed } from "vue";
import { reactive } from "vue";

const states = ["Parlante", "Cortina", "Aire acondicionado", "Alarma"];
const homeStore = useHomeStore();
const deviceStore = useDeviceStore();

const homes = ref([]);
const formattedDeviceTypes = ref([]);
const name = ref(null);
const home1 = ref(null);
const deviceTypeId = ref(null);

onMounted(async () => {
    try {
        const homeData = await homeStore.get();
        homes.value = homeData.map((home) => home.name);

        const deviceTypesMap = deviceStore.deviceTypes;
        formattedDeviceTypes.value = Array.from(deviceTypesMap.entries()).map(
            ([name, id]) => ({ name: name.toString(), id: id.toString() }),
        );

        // Debugging logs
        console.log("Device Types Map:", deviceTypesMap);
        console.log("Formatted Device Types:", formattedDeviceTypes.value);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

const canCreate = computed(() => {
    return name.value && home1.value && deviceTypeId.value;
});

function addDeviceToHome() {
    deviceStore.add(new Device(name.value, deviceTypeId.value, home1.value));
}
// TEMP (type has to be an object with id)
</script>

<!-- <script>
export default {
    data() {
        return {
            states: ["Parlante", "Cortina", "Aire acondicionado", "Alarma"],
        };
    },
};
</script> -->
