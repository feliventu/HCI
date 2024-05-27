<template>
  <v-dialog
    :model-value="dialogVisible"
    @update:modelValue="updateDialog"
    max-width="480"
  >
    <v-card class="border-radius">
      <v-card-title>{{ device.name }}</v-card-title>
      <div class="d-flex">
        <span class="subtitle-c ml-4" v-if="device.state.status === 'closed'"
          >Cortina abierta</span
        >
        <span class="subtitle-c ml-4" v-if="device.state.status === 'opened'"
          >Cortina cerrada</span
        >
        <span class="subtitle-c ml-4" v-if="device.state.status === 'closing'"
          >Abriendo cortina</span
        >
        <span class="subtitle-c ml-4" v-if="device.state.status === 'opening'"
          >Cerrando cortina</span
        >
      </div>
      <span class="d-flex ml-4 subtitle-c"
        >Apertura max.: {{ device.state.level }}%</span
      >

      <div class="justify-content-center mt-3 mb-1">
        <v-divider length="400px"></v-divider>
      </div>

      <div class="d-flex flex-column mt-4">
        <div class="d-flex">
          <!-- Wrap "Apertura Maxima" and "Cambiar" button in a flex row div -->
          <v-text-field
            class="ml-4"
            type="input"
            label="Apertura Maxima"
            style="max-width: 180px"
            variant="outlined"
            v-model="newLevel"
          ></v-text-field>
          <v-btn
            class="custom-button mt-2 ml-3"
            variant="outlined"
            height="40px"
            @click="changeLevel()"
            :disabled="!canChange"
            >Cambiar</v-btn
          >
        </div>

        <div class="justify-content-center mb-4">
          <v-divider length="400px"></v-divider>
        </div>

        <div class="d-flex mt-1">
          <!-- Wrap "Action" button in a div -->
          <v-btn
            density="default"
            class="custom-button ml-4 mb-5"
            elevation="0"
            variant="outlined"
            height="40px"
            :disabled="!canOpen"
            @click.stop="openDevice"
          >
            Abrir</v-btn
          >

          <v-btn
            density="default"
            class="custom-button ml-1 mb-5"
            elevation="0"
            variant="outlined"
            height="40px"
            @click.stop="closeDevice"
            :disabled="!canClose"
          >
            Cerrar</v-btn
          >
        </div>
      </div>
      <v-card-actions>
        <v-spacer>
          <v-btn
            class="ml-2"
            color="red"
            rounded
            variant="text"
            @click="dialogVisibleDelete = true"
            text="Borrar"
          >
          </v-btn>
        </v-spacer>
        <v-btn text="Cerrar" variant="text" @click="closeDialog"></v-btn>
      </v-card-actions>

      <!-- You can add more content here -->
    </v-card>

    <v-dialog max-width="500" v-model="dialogVisibleDelete">
      <template v-slot:default="{ isActive }">
        <v-card title="Borrar dispositivo" class="border-radius">
          <v-card-text> Seguro que desea borrar el dispositivo? </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="Borrar" class="bg-red border-radius" @click="deleteDevice"></v-btn>
            <v-btn text="Cancelar" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <div>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="primary">
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
  </v-dialog>

 
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDeviceStore } from "@/store/deviceStore";
import { computed } from "vue";
import { onUnmounted } from "vue";

const props = defineProps({
  id: String,
  canDelete: Boolean,
});

const snackbar = ref(false);
const timeout = ref(4000);
const text = ref("Dispositivo agregado");
const dialogVisibleDelete = ref(false);

const deviceStore = useDeviceStore();
const device = ref(null);
const newLevel = ref(null);
onMounted(async () => {
  device.value = await deviceStore.getDeviceById(props.id);
});

async function changeLevel() {
  await deviceStore.actionDevice(device.value, "setLevel", [newLevel.value]);
  newLevel.value = null;
  text.value = "Nivel de cortina cambiado";
  snackbar.value = true;
}

async function deleteDevice() {
  await deviceStore.deleteDevice(device.value, "delete");
  closeDialog();
  
}

const fetchBlindState = async () => {
  device.value = await deviceStore.getDeviceById(props.id);
};

onMounted(async () => {
  fetchBlindState();
  const interval = setInterval(fetchBlindState, 1500); // Poll every 5 seconds

  // Cleanup interval on unmount
  onUnmounted(() => {
    clearInterval(interval);
  });
});

const canChange = computed(() => {
  return (
    newLevel.value &&
    newLevel.value != device.value.state.level &&
    newLevel.value >= 0 &&
    newLevel.value <= 100
  );
});

const canOpen = computed(() => {
  return 0 === device.value.state.currentLevel;
});

const canClose = computed(() => {
  return (
    device.value.state.currentLevel === device.value.state.level &&
    device.value.state.status !== "opening" &&
    device.value.state.status !== "closing"
  );
});

const emit = defineEmits(["update:modelValue"]);

const updateDialog = (value) => {
  emit("update:modelValue", value);
};

const closeDialog = () => {
  
  emit("update:modelValue", false);
};

async function openDevice() {
  await deviceStore.actionDevice(device.value, "close");
  text.value = "Abriendo cortina";
  snackbar.value = true;
}

async function closeDevice() {
  await deviceStore.actionDevice(device.value, "open");
  text.value = "Cerrando cortina";
  snackbar.value = true;
}
</script>

<style>
.border-radius {
  border-radius: 10px !important;
}

.custom-button-card {
  border-radius: 10px !important;
  background-color: lightgray !important;
  color: white !important;
}
</style>
