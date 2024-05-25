<template>
    <div class="px-12 pt-5">
        <h2>Acciones para rutina: {{ name }} (hogar '{{ home }}')</h2>
        <v-btn @click="openDialog(null)" class="mt-4">Agregar accion</v-btn>
        <v-dialog v-model="showDialog" max-width="600px">
            <v-card>
                <v-card-title>Crear nueva accion</v-card-title>
                <v-card-text>
                    <v-select
                        label="Dispositivo"
                        style="max-width: 300px"
                        :items="homeDevices"
                        item-title="name"
                        item-value="id"
                        variant="outlined"
                        v-model="selectedDeviceId"
                    >
                    </v-select>
                    <component
                        v-if="selectedDevice != null"
                        :is="currentComponent"
                        :device="selectedDevice"
                        @close="showDialog = false"
                    >
                    </component>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="addAction">Agregar</v-btn>
                    <v-btn color="secondary" @click="showDialog = false"
                        >Cancelar</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { defineProps, ref, shallowRef, onMounted, watch } from "vue";
import { useRoomStore } from "@/store/roomStore";
import BlindsDeviceAction from "@/components/actions/BlindsDeviceAction.vue";

const props = defineProps({
    home: String,
    name: String,
    description: String,
});

const showDialog = ref(false);
const homeDevices = ref([]);
const deviceTypeId = ref("");
const selectedDevice = ref(null);
const selectedDeviceId = ref(null);
const currentComponent = shallowRef(null);
const actions = ref([]);

const roomStore = useRoomStore();

onMounted(async () => {
    await loadDevices();
});

const loadDevices = async () => {
    if (props.home) {
        try {
            homeDevices.value = await roomStore.getDevicesFromRoom(
                `${props.home} Room`,
            );
            console.log("asd");
            console.log(homeDevices.value);
        } catch (error) {
            console.error("Failed to load devices: ", error);
        }
    }
};
const addAction = () => {
    if (selectedDevice.value) {
        console.log("Adding action for device:", selectedDevice.value);
        showDialog.value = false;
        selectedDevice.value = null;
    }
};

const openDialog = (device) => {
    showDialog.value = true;
};

const getDeviceById = (deviceId) => {
    return homeDevices.value.find((device) => device.id === deviceId) || null;
};

watch(selectedDeviceId, (dev) => {
    if (dev) {
        selectedDevice.value = getDeviceById(selectedDeviceId.value);
        // @TEMP device is only blinds, have to handle device type

        switch (selectedDevice.value.type.name) {
            case "blinds":
                currentComponent.value = BlindsDeviceAction;
                break;
            case "ac":
            default:
                currentComponent.value = null;
        }
    }
});
watch(showDialog, (v) => {
    if (!v) {
        selectedDeviceId.value = null;
    }
});
</script>
