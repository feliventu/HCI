<template>
  <v-btn
    class="custom-button"
    variant="outlined"
    height="40px"
    @click="handleCreation"
    >+ Nuevo</v-btn
  >

  <v-dialog v-model="dialog" max-width="480">
    <v-card title="Crear nuevo" class="border-radius">
      <v-card-text>
        <router-link to="/dispositivos/nuevo">
          <v-btn
            v-if="canCreateDevices()"
            class="custom-button"
            elevation="0"
            height="40px"
            text="Dispositivo"
            
          ></v-btn>
        </router-link>

        <router-link to="/rutinas/nuevo">
        <v-btn
          v-if="canCreateRoutine()"
          class="custom-button"
          elevation="0"
          text="Rutina"
          height="40px"

        ></v-btn>
        </router-link>

        <router-link to="/hogares/nuevo">
          <v-btn
            class="custom-button"
            height="40px"
            elevation="0"
            text="Hogar"
            
          ></v-btn>
        </router-link>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Cancelar" variant="text" @click="dialog = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.custom-button {
  background-color: white !important;
  border-radius: 10px !important;
  border-color: rgba(0, 0, 0, 0.15) !important;
  border-width: 3px !important;
  color: black !important;
  font-weight: bold !important;
}

.v-btn {
  margin-right: 15px; /* Add space to the left and right of the button */
}

.border-radius {
  border-radius: 10px !important;
}
</style>

<script setup>
import { shallowRef, computed, onMounted, ref } from "vue";
import { useHomeStore } from "@/store/homeStore";
import { useDeviceStore } from "@/store/deviceStore";
import { useRouter } from "vue-router";

const dialog = shallowRef(false);
const dialog2 = shallowRef(false);

const homeStore = useHomeStore();
const deviceStore = useDeviceStore();

const homes = ref([]);
const devices = ref([]);

const router = useRouter();

const handleCreation = () => {
  if (!canCreateDevices()) {
    router.push('/hogares/nuevo');
    dialog.value = false;
    console.log("test");
  } else {
  dialog.value = true;
  }
}

function canCreateDevices()  {
  return homes.value.length > 0;
};

function canCreateRoutine(){
  return (canCreateDevices && devices.value.length != 0);
};


onMounted(async () => {
 
  try {
    homes.value = (await homeStore.get()).map((home) => home.name);
  } catch (e) {
  }
  try{
    devices.value = (await deviceStore.getDevices());
  } catch(e){
  }

  console.log(homes.value);
  console.log(devices.value);
  console.log(devices.value.length);
  console.log(canCreateRoutine());
});

</script>
