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
      <v-text-field
        v-if="deviceTypeId == 'mxztsyjzsrq7iaqc'"
        class=" "
        label="Contraseña"
        style="max-width: 300px"
        variant="outlined"
        v-model="password"
       
      >
      </v-text-field>
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
  


      <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="primary"
    >
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
import DropButton from "@/components/DropButton.vue";
import { useRoomStore } from "@/store/roomStore";
import { useHomeStore } from "@/store/homeStore";
import { useDeviceStore } from "@/store/deviceStore";
import { Device } from "@/api/devices.js";
import { ref, onMounted } from "vue";
import { computed } from "vue";
import { reactive } from "vue";

const snackbar = ref(false);
const timeout = ref(4000);
const text = ref("Dispositivo agregado");
const alarmId = "mxztsyjzsrq7iaqc";

const homeStore = useHomeStore();
const deviceStore = useDeviceStore();
const roomStore = useRoomStore();

const homes = ref([]);
const formattedDeviceTypes = ref([]);
const name = ref(null);
const home1 = ref(null);
const deviceTypeId = ref(null);
const password = ref(null);


onMounted(async () => {
  try {
    const homeData = await homeStore.get();
    homes.value = homeData.map((home) => home.name);

    const deviceTypesMap = deviceStore.deviceTypes;
    formattedDeviceTypes.value = Array.from(deviceTypesMap.entries()).map(
      ([name, id]) => ({ name: name.toString(), id: id.toString() })
    );

    const allowedTypes = ["speaker", "blinds", "ac", "alarm"];
    formattedDeviceTypes.value = formattedDeviceTypes.value.filter(
      (deviceType) => allowedTypes.includes(deviceType.name)
    );

    // Debugging logs
    //  console.log("Device Types Map:", deviceTypesMap);
    //  console.log("Formatted Device Types:", formattedDeviceTypes.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

function checkPasswordValue() {
  const passwordValue = parseInt(password.value);
  return !isNaN(passwordValue) && passwordValue > 0 && passwordValue < 10000;
}


const canCreate = computed(() => {
  if(deviceTypeId.value == alarmId) {
    return name.value && home1.value && deviceTypeId.value && checkPasswordValue();
  }
  return name.value && home1.value && deviceTypeId.value;
});

async function addDeviceToHome() {

  let newDevice

  if(deviceTypeId.value == alarmId) {
    newDevice = await deviceStore.add(
    new Device(name.value, null, deviceTypeId.value, {password: password.value})
    )
    await deviceStore.actionDevice(newDevice,"changeSecurityCode",['1234',`${password.value}`])
  }
  else{
    newDevice = await deviceStore.add(
    new Device(name.value, null, deviceTypeId.value)
  );
  }
  const home = await homeStore.getHomeByName(home1.value);

  //dice room pero en realidad es a home xD
  const room = await homeStore.getRoomsFromHome(home);

  await roomStore.addDeviceToRoom(room[0], newDevice);
  name.value = null;
  home1.value = null;
  deviceTypeId.value = null;
  password.value = null;
  snackbar.value = true;
  
}

</script>
