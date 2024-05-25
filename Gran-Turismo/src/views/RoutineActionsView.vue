<template>
    <div class="px-12 pt-5">
        <h2>Acciones para rutina: {{ name }} (hogar '{{ home }}')</h2>
        <RoutineCard
            class="mx-0"
            :description="description"
            :routine="name"
            :devices="devices"
            :expanded="true"
        />
        <v-btn
            class="custom-button mt-5"
            variant="outlined"
            height="40px"
            @click="openDialog(null)"
            >Agregar accion</v-btn
        >
        <v-btn
            class="custom-button mt-5 bg-green"
            variant="outlined"
            height="40px"
            @click="createRoutine()"
            >Crear rutina</v-btn
        >
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
        <p v-if="createFailed" class="pt-1 text-red" error>
            Necesitas tener minimo una accion para crear la rutina.
        </p>
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
const createFailed = ref(false);

const roomStore = useRoomStore();

onMounted(async () => {
    await loadDevices();
});

const createRoutine = () => {
    if (actions.value.length === 0) {
        console.log("womp womp");
        createFailed.value = true;
    } else {
        // create routine and jump to the routines route.
    }
};
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
