<template>
    <v-card class="d-flex border-radius flex-column h-100 justify-space-between ma-0" 
        height="115" 
        width="350"
        elevation=0 
        color="card"
        @click="dialogVisible1 = true"
        >
        <v-row no-gutters>
            
                <v-icon v-if="localIsOn =='disarmed'" class="ml-4 mt-4" color="icon" icon="mdi-alarm-light-off" size="20"></v-icon>
                <v-icon v-if="localIsOn !='disarmed'" class="ml-4 mt-4" color="icon" icon="mdi-alarm-light" size="20"></v-icon>

                <v-col cols="8" class="">
                <v-card-item :title="name" class="mb-0">
                    <template v-slot:subtitle>
                <span class="subtitle-c" v-if="localIsOn == 'disarmed'">Desactivada</span>
                <span class="subtitle-c" v-if="localIsOn == 'armedAway'">Armed away</span>
                <span class="subtitle-c" v-if="localIsOn == 'armedStay'">Armed stay</span>
                </template>
                </v-card-item>
            </v-col>

            <v-col cols="4" class="d-flex flex-column justify-end align-end pr-3">
               
         
              
            </v-col>
        </v-row>
    </v-card>

   <AlarmDeviceDialog v-model="dialogVisible1" :id="id" :meta="meta"/>
</template>

<script setup>
import { useDeviceStore } from "@/store/deviceStore";
import { ref, onMounted, onUnmounted, computed } from "vue";
import AlarmDeviceDialog from "./AlarmDeviceDialog.vue";

const props = defineProps({
  id: String,
  name: String,
  meta: Object,
  isArmed: Object,
});


const dialogVisible1 = ref(false);
const deviceStore = useDeviceStore();

let localIsOn = ref(props.isArmed);
console.log("primer",localIsOn.value)


const fetchAlarmState = async () => {
  const device = await deviceStore.getDeviceById(props.id);
    localIsOn.value = device.state.status;

};

onMounted(() => {
  fetchAlarmState();
  const interval = setInterval(fetchAlarmState, 1500); // Poll every 5 seconds

  // Cleanup interval on unmount
  onUnmounted(() => {
    clearInterval(interval);
  });
});



</script>


<style>
.v-card.border-radius {

    border-radius: 10px;
}
</style>