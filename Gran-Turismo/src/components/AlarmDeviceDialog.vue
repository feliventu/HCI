<template>
  <v-dialog :model-value="dialogVisible" @update:modelValue="updateDialog" max-width="480">
    <v-card class="border-radius">
      <v-card-title>{{ device.name }}</v-card-title>

      <span class="subtitle-c ml-4" v-if="device.state.status == 'disarmed'">Estado: Desactivada</span>
      <span class="subtitle-c ml-4" v-if="device.state.status == 'armedStay'">Estado: Armed Stay</span>
      <span class="subtitle-c ml-4" v-if="device.state.status == 'armedAway'">Estado: Armed Away</span>


      <div class="d-flex">
        <v-text-field class="ml-4 mt-2" label="Contraseña" type="password" style="max-width: 180px" variant="outlined"
          v-model="password"></v-text-field>
        <v-btn v-if="device.state.status == 'disarmed' || device.state.status == 'armedAway'"
          class="custom-button mt-4 ml-3" variant="outlined" height="40px" :text="'Arm Stay'" @click="armStayAlarm()"
          :disabled="!canArm"></v-btn>
        <v-btn v-if="device.state.status == 'disarmed' || device.state.status == 'armedStay'"
          class="custom-button mt-4 ml-3" variant="outlined" height="40px" :text="'Arm Away'" @click="armAwayAlarm()"
          :disabled="!canArm"></v-btn>
        <v-btn v-if="device.state.status == 'armedStay' || device.state.status == 'armedAway'"
          class="custom-button mt-4 " variant="outlined" height="40px" :text="'Desactivar'" @click="disarmAlarm()"
          :disabled="!canArm"></v-btn>
      </div>
      <v-card-actions>
        <v-spacer>
          <v-btn class="ml-2" color="red" variant="text" @click="dialogVisibleDelete = true" text="Borrar">
          </v-btn>
        </v-spacer>
        <v-btn text="Cerrar" variant="text" @click="closeDialog"></v-btn>
      </v-card-actions>


    </v-card>

    <v-dialog max-width="500" v-model="dialogVisibleDelete">
      <template v-slot:default="{ isActive }">
        <v-card title="Borrar dispositivo" class="border-radius">
          <v-card-text> Seguro que desea borrar el dispositivo? </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="Borrar" class="bg-red" @click="deleteDevice"></v-btn>
            <v-btn text="Cancelar" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>


    <div>
      <v-snackbar v-model="snackbar" :timeout="timeout" color="primary">
        {{ text }}
        <template v-slot:actions>
          <v-btn class="mr-n1" color="black" variant="text" @click="snackbar = false">
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
  meta: Object,
  canDelete: Boolean,
});

const deviceStore = useDeviceStore();
const device = ref(null);
const password = ref(null);

const dialogVisibleDelete = ref(false);

const snackbar = ref(false);
const timeout = ref(4000);
const text = ref("Dispositivo agregado");

const currentPassword = ref(props.meta.password.password);

onMounted(async () => {
  device.value = await deviceStore.getDeviceById(props.id);

});



async function deleteDevice() {
  await deviceStore.deleteDevice(device.value, "delete");
  closeDialog();
}

// La contraseña tiene que ser igual a la contraseña de la alarma
const canArm = computed(() => {
  return password.value == currentPassword.value;
});


async function armStayAlarm() {
  await deviceStore.actionDevice(device.value, "armStay", [`${password.value}`]);
  password.value = null
  text.value = "Alarma activada";
  snackbar.value = true;
}

async function armAwayAlarm() {
  await deviceStore.actionDevice(device.value, "armAway", [`${password.value}`]);
  password.value = null
  text.value = "Alarma activada";
  snackbar.value = true;
}

async function disarmAlarm() {
  await deviceStore.actionDevice(device.value, "disarm", [`${password.value}`]);
  password.value = null
  text.value = "Alarma desactivada";
  snackbar.value = true;
}

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