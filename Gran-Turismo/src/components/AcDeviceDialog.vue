<template>
  <v-dialog
    :model-value="dialogVisible"
    @update:modelValue="updateDialog"
    max-width="480"
  >
    <v-card class="border-radius">
      <v-card-title>{{ device.name }}</v-card-title>
      <span class="subtitle-c ml-4" v-if="device.state.status =='off'">Apagado</span>
      <span class="subtitle-c ml-4" v-if="device.state.status =='on'">Prendido</span>
      <span class="subtitle-c ml-4">Temperatura: {{ device.state.temperature }}°C</span> 
      <span class="d-flex subtitle-c ml-4">Modo: {{ device.state.mode }}</span>
      <span class="d-flex subtitle-c ml-4">Vertical swing: {{ device.state.verticalSwing }}</span>
      <span class="d-flex subtitle-c ml-4">Horizontal swing: {{ device.state.horizontalSwing }}</span>
      <span class="d-flex subtitle-c ml-4">Velocidad del Ventilador: {{ device.state.fanSpeed }}</span>
      
      <div class="justify-content-center my-3">
      <v-divider length="400px"></v-divider>
      </div>

      <div class="d-flex">
        <v-text-field
          class="ml-4 mt-2"
          type="input"
          label="Temperatura"
          style="max-width: 180px"
          variant="outlined"
          v-model="newTemperature"
        ></v-text-field>
        <v-btn
          class="custom-button mt-4 ml-3"
          variant="outlined"
          height="40px"
          @click="changeTemperature()"
          :disabled="!canChange"
          >Cambiar</v-btn
        >
      </div>
      <div class="d-flex">
        <v-select
                class="ml-4 mt-0"
                label="Modo"
                style="max-width: 180px"
                :items="supportedModeValues"   
                v-model="newMode"
                variant="outlined"
            >
            </v-select>
        <v-btn
          class="custom-button mt-2 ml-3"
          variant="outlined"
          height="40px"
          @click="changeMode()"
          :disabled="!canChangeMode"
          >Cambiar</v-btn
        >
      </div>
      
      <div class="justify-content-center mb-4">
      <v-divider length="400px"></v-divider>
      </div>
      
      <div class="d-flex">
        <v-select
                class="ml-4 mt-2"
                label="Vertical Swing"
                style="max-width: 240px"
                :items="supportedVsValues"   
                v-model="newVSwing"
                variant="outlined"
            >
            </v-select>
        <v-btn
          class="custom-button mt-4 ml-3"
          variant="outlined"
          height="40px"
          @click="changeVerticalSwing()"
          :disabled="!canChangeVs"
          >Cambiar</v-btn
        >
      </div>
      <div class="d-flex">
        <v-select
                class="ml-4 mt-0"
                label="Horizontal Swing"
                style="max-width: 240px"
                :items="supportedHsValues"   
                v-model="newHSwing"
                variant="outlined"
            >
            </v-select>
        <v-btn
          class="custom-button mt-2 ml-3"
          variant="outlined"
          height="40px"
          @click="changeHorizontalSwing()"
          :disabled="!canChangeHs"
          >Cambiar</v-btn
        >
      </div>

      <div class="justify-content-center mb-4">
      <v-divider length="400px"></v-divider>
      </div>

       <div class="d-flex">
        <v-select
                class="ml-4 mt-2"
                label="Velocidad del ventilador"
                style="max-width: 240px"
                :items="supportedFanValues"   
                v-model="newFanSpeed"
                variant="outlined"
            >
            </v-select>
        <v-btn
          class="custom-button mt-4 ml-3"
          variant="outlined"
          height="40px"
          @click="changeFanSpeed()"
          :disabled="!canChangeFs"
          >Cambiar</v-btn
        >
      </div>
      
      <v-card-actions>
        <v-spacer>
          <v-btn 
          class="bg-red "
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
const newTemperature = ref(null);
const newMode = ref(null);
const newVSwing = ref(null);
const newHSwing = ref(null);
const newFanSpeed = ref(null);

const constModeValues =[
                "cool",
                "heat",
                "fan"
]
let supportedModeValues

const constVsValues =[
                "auto",
                "22",
                "45",
                "67",
                "90"
]
let supportedVsValues

const constHsValues =[
                "auto",
                "-90",
                "-45",
                "0",
                "45",
                "90"
]
let supportedHsValues

const constFanValues =[
                "auto",
                "25",
                "50",
                "75",
                "100"
]
let supportedFanValues

const fetchAcState = async () => {
  device.value = await deviceStore.getDeviceById(props.id);
  supportedModeValues = constModeValues.filter((value) => value !== device.value.state.mode);
  supportedVsValues = constVsValues.filter((value) => value !== device.value.state.verticalSwing);
  supportedHsValues = constHsValues.filter((value) => value !== device.value.state.horizontalSwing);
  supportedFanValues = constFanValues.filter((value) => value !== device.value.state.fanSpeed);
};




  
onMounted(async () => {
  fetchAcState();
  const interval = setInterval(fetchAcState, 1500); // Poll every 5 seconds
  
  // Cleanup interval on unmount
  onUnmounted(() => {
    clearInterval(interval);
  });
});


async function changeTemperature() {
  await deviceStore.actionDevice(device.value,'setTemperature', [newTemperature.value]);
  newTemperature.value = null;
}

async function changeMode() {
  await deviceStore.actionDevice(device.value,'setMode', [newMode.value]);
  newMode.value = null;
}

async function changeVerticalSwing() {
  await deviceStore.actionDevice(device.value,'setVerticalSwing', [newVSwing.value]);
  newVSwing.value = null;
}

async function changeHorizontalSwing() {
  await deviceStore.actionDevice(device.value,'setHorizontalSwing', [newHSwing.value]);
  newHSwing.value = null;
}

async function changeFanSpeed() {
  await deviceStore.actionDevice(device.value,'setFanSpeed', [newFanSpeed.value]);
  newFanSpeed.value = null;
}

async function deleteDevice() {
  await deviceStore.deleteDevice(device.value,'delete');
  closeDialog();
}

const canChange = computed(() => {
    return newTemperature.value && newTemperature.value != device.value.state.temperature && newTemperature.value >= 17 && newTemperature.value <= 34;
});

const canChangeMode = computed(() => {
    return newMode.value 
});

const canChangeVs = computed(() => {
    return newVSwing.value 
});

const canChangeHs = computed(() => {
    return newHSwing.value 
});

const canChangeFs = computed(() => {
    return newFanSpeed.value 
});

const emit = defineEmits(["update:modelValue"]);

const updateDialog = (value) => {
  emit("update:modelValue", value);
};

const closeDialog = () => {
  emit("update:modelValue", false);
};
</script>

<style>
.border-radius {
  border-radius: 10px !important;
}


</style>
