<template>
    <v-dialog
      :model-value="dialogVisible"
      @update:modelValue="updateDialog"
      max-width="480"
    >
      <v-card class="border-radius">
        <v-card-title>{{ device.name }}</v-card-title>
        <span class="subtitle-c ml-4" v-if="device.state.status =='armedAway'">Desactivada</span>
        <span class="subtitle-c ml-4" v-if="device.state.status =='armedStay'">Activada</span>


        <div class="d-flex">
        <v-text-field
          class="ml-4 mt-2"
          type="input"
          label="Contraseña"
          style="max-width: 180px"
          variant="outlined"
          v-model="Password"
        ></v-text-field>
        <v-btn
            v-if="device.state.status =='armedAway'"
          class="custom-button mt-4 ml-3"
          variant="outlined"
          height="40px"
          :text="'Activar'"
          @click="armAlarm()"
          :disabled="!canArm"
          ></v-btn
        >
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
  const Password = ref(null);

  onMounted(async () => {
    device.value = await deviceStore.getDeviceById(props.id);
   
  });
  

  async function deleteDevice() {
    await deviceStore.deleteDevice(device.value, "delete");
    closeDialog();
  }
  
  // La contraseña tiene que ser igual a la contraseña de la alarma
  const canArm = computed(() => {
    return Password.value == ['1234'];
  });
  


  
  const fetchAlarmState = async () => {
    device.value = await deviceStore.getDeviceById(props.id);
  };
  
  onMounted(async () => {
    fetchAlarmState();
    const interval = setInterval(fetchAlarmState, 1500); // Poll every 5 seconds
  
    // Cleanup interval on unmount
    onUnmounted(() => {
      clearInterval(interval);
    });
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
  
  .custom-button-card {
    border-radius: 10px !important;
    background-color: lightgray !important;
    color: white !important;
  }
  </style>
  