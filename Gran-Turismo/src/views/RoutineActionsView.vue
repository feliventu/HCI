<template>
    <div class="px-12 pt-5">
        <h2>Acciones para {{ name }} de {{ home }}</h2>
        <RoutineCard
            class="mx-0"
            :id="id"
            :description="description"
            :routine="name"
            :devices="actions"
            :devicesActions="actions"
            :icon="icon"
            :color="color"
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
            class="custom-button-green mt-5 ml-5 "
            variant="outlined"
            height="40px"
            
            @click="createRoutine()"
            text="Finalizar"
            ></v-btn
        >
        <v-dialog v-model="showDialog" max-width="600px">
            <v-card class="border-radius">
                <v-card-title>Agregar nueva accion</v-card-title>
                <v-card-text>
                    <v-select
                        label="Dispositivo"
                        style="max-width: 250px"
                        :items="homeDevices"
                        item-title="name"
                        item-value="id"
                        variant="outlined"
                        v-model="selectedDeviceId"
                    >
                    </v-select>
                    <ShowDeviceAction
                        v-if="selectedDeviceId != null"
                        :deviceId="selectedDeviceId"
                        :actions="actions"
                        :actionsList="actionsList"
                        v-model:showDialog="showDialog"
                        @close="showDialog = false"
                    >
                    </ShowDeviceAction>
                </v-card-text>

            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :timeout="timeout" color="Rojo">
      {{ text }}
      <template v-slot:actions>
        <v-btn
          class="mr-n1"
          color="black"
          variant="text"
          @click="snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>

     
    </div>
</template>

<script setup>
import { defineProps, ref, onMounted, watch } from "vue";
import { useRoomStore } from "@/store/roomStore";
import { useRoutineStore } from "@/store/routineStore";
import { Routine } from "@/api/routine";
import ShowDeviceAction from "@/components/actions/ShowDeviceAction.vue";

const props = defineProps({
    home: String,
    name: String,
    description: String,
    icon: String,
    color: String,
});

const showDialog = ref(false);
const homeDevices = ref([]);
const deviceTypeId = ref("");
const selectedDevice = ref(null);
const selectedDeviceId = ref(null);
const actions = ref([]);
const createFailed = ref(false);
const actionsList = ref([]);

const snackbar = ref(false);
const timeout = ref(4000);
const text = ref("Necesitas tener minimo una accion para crear la rutina");

const roomStore = useRoomStore();
const routineStore = useRoutineStore();

onMounted(async () => {
    await loadDevices();
});

const createRoutine = async () => {
    if (actions.value.length === 0) {
        console.log("womp womp");
        createFailed.value = true;
        snackbar.value = true;
    } else {
        try {
            await routineStore.add(
                new Routine(
                    null,
                    props.name,
                    actions.value,
                    props.icon,
                    props.color,
                    props.description,
                ),
            );
            console.log(await routineStore.get());
        } catch (e) {
            console.log("Error while creating new routine: ", e);
        }
        // create routine and jump to the routines route.
    }
};
const loadDevices = async () => {
    if (props.home) {
        try {
            homeDevices.value = await roomStore.getDevicesFromRoom(
                `${props.home} Room`,
            );
        } catch (error) {
            console.error("Failed to load devices: ", error);
        }
    }
};

watch(actions, () => {
    createFailed.value = false;
    showDialog.value = false;
    selectedDevice.value = null;
}, { deep: true });


const openDialog = (device) => {
    showDialog.value = true;
};

const getDeviceById = (deviceId) => {
    return homeDevices.value.find((device) => device.id === deviceId) || null;
};

watch(selectedDeviceId, (dev) => {
    if (dev) {
        selectedDevice.value = getDeviceById(selectedDeviceId.value);

        // Handle device-type actions
        switch (selectedDevice.value.type.name) {
            case "blinds":
                actionsList.value = [
                    { id: "open", name: "Abrir", requiresValue: false },
                    { id: "close", name: "Cerrar", requiresValue: false },
                    { id: "setLevel", name: "Set Level", requiresValue: true, min: 0, max: 100 },
                ];
                break;
            case "ac":
                actionsList.value = [
                    {id: "turnOn", name: "Prender", requiresValue: false},
                    {id: "turnOff", name: "Apagar", requiresValue: false},
                    {id: "setTemperature", name: "Set Temperature", requiresValue: true, min: 17, max: 34},
                ];
                break;
                case "speaker":
                actionsList.value = [
                    { id: "play", name: "Prender", requiresValue: false },
                    { id: "stop", name: "Detener", requiresValue: false },
                    { id: "setVolume", name: "Set Volume", requiresValue: true, min: 0, max: 10 },
                ];
                break;
            default:
                actionsList.value = null;
        }
    }
});
watch(showDialog, (v) => {
    if (!v) {
        selectedDeviceId.value = null;
    }
});



</script>


<style>
.custom-button-green {
    background-color: #70DC9B;
    border-radius: 10px !important;
    border-color: #2fa550 !important;
    border-width: 3px !important;
    color: black;
    font-weight: bold !important;
}

.border-radius {
  border-radius: 10px !important;
}
</style>