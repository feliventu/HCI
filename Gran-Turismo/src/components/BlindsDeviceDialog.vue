<template>
  <v-dialog
    :model-value="dialogVisible"
    @update:modelValue="updateDialog"
    max-width="480"
  >
    <v-card class="border-radius">
      <v-card-title>{{ device.name }}</v-card-title>
      <div class="d-flex">
      <span class="subtitle-c ml-4 " v-if="device.state.status === 'closed'">Cortina cerrada</span> 
      <span class="subtitle-c ml-4" v-if="device.state.status === 'opened'">Cortina abierta</span> 
      <span class="subtitle-c ml-4" v-if="device.state.status === 'closing'">Cerrando cortina</span> 
      <span class="subtitle-c ml-4 " v-if="device.state.status === 'opening'">Abriendo cortina</span> 
      </div>


      <div class="d-flex flex-column mt-4">
        
        <div class="d-flex">  <!-- Wrap "Apertura Maxima" and "Cambiar" button in a flex row div -->
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
            :disabled="!canCreate"
            >Cambiar</v-btn
          >
        </div>

        <div class="justify-content-center mb-4">
      <v-divider length="400px"></v-divider>
      </div>

        <div class="d-flex">  <!-- Wrap "Action" button in a div -->
          <v-btn
            density="default"
            class="custom-button ml-4 mb-5"
            elevation="0"
            variant="outlined"
            max-width="80px"
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
            max-width="80px"
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
          class="bg-red"
          variant= "text" 
          @click="deleteDevice()"
          text="Borrar"
          >
          </v-btn>
        </v-spacer>
        <v-btn text="Cerrar" variant="text" @click="closeDialog"></v-btn>
      </v-card-actions>

      <!-- You can add more content here -->
    </v-card>
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

const deviceStore = useDeviceStore();
const device = ref(null);
const newLevel = ref(null);
onMounted(async () => {
  device.value = await deviceStore.getDeviceById(props.id);
});

async function changeLevel() {
  await deviceStore.actionDevice(device.value, "setLevel", [newLevel.value]);
  newLevel.value = null;
  closeDialog();
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

const canCreate = computed(() => {
  return newLevel.value;
});

const canOpen = computed(() => {
  return 0 === device.value.state.currentLevel ;
});

const canClose = computed(() => {
  return device.value.state.currentLevel === device.value.state.level && (device.value.state.status !== "opening" && device.value.state.status !== "closing"); 
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
}

async function closeDevice() {
  await deviceStore.actionDevice(device.value, "open");
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
