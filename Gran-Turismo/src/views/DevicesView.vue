<template>
    <v-app>
      <img v-if="loading" class="loading" :src="getImageUrl('loader.gif')" />
      <v-main v-if="!loading" class="px-12 pt-5">

        <div v-if="apiError" class="">
        <v-alert
          class=""
          color="error"
          icon="mdi-alert-circle"
          width="400px"
          title="Error"
          text="Ha ocurrido un error al cargar los datos, por favor intenta de nuevo."
          rounded="lg"
        ></v-alert>
      </div>

      <div v-if="!apiError">
        <div>
            <v-row class="d-flex justify-space-between mb-n6">
                <v-col>
                    <DropButton :items="homes" v-model="actualHome"
                /></v-col>
                <v-col class="text-end"><NewButton /></v-col>
            </v-row>
        </div>
  
        <div v-if="devicesAlarm.length === 0 && devicesNoAlarm.length === 0"> 
          <WelcomeWaifu :title="'Agrega tu primer dispositivo!'" :waifu="'Devices'"/>
        </div>
        <div v-if="devicesAlarm && devicesAlarm.length > 0">
          <v-row >
              <v-col>	<h2>Alarmas</h2></v-col>
            
          </v-row>
          <v-row class="mt-n4">
            <v-col
              cols="12"
              sm="6"
              md="4"
              lg="2"
              class="d-flex justify-space-between"
              v-for="device in devicesAlarm"
              :key="device.id"
            >
            <AlarmCard :id="device.id" :name="device.name" :isArmed="device.state.status" :meta="device.meta"/>
            </v-col>
          </v-row>
        </div>

        <div v-if="devicesNoAlarm && devicesNoAlarm.length > 0">
          
          <v-row class="pt-4">
            <v-col><h2> Dispositivos</h2></v-col>
          </v-row>
          <v-row class="mt-n4">
            <v-col
  
              v-for="device in devicesNoAlarm"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              class="d-flex justify-space-between"
            >
              <DeviceCard
              :key="device.id"
              :id="device.id"
              :name="device.name"
              :type="device.type.name"
              :state="device.state"
              :room="device.room"
              :isOn="device.state.status" 
              :isFavorite="device.isFavorite"
              :isLocked="device.isLocked"
              />
            </v-col>
          </v-row>
        </div>
      </div>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import AlarmCard from "@/components/AlarmCard.vue";
  import DropButton from "@/components/DropButton.vue";
import WelcomeWaifu from "@/components/WelcomeWaifu.vue";
  import { useHomeStore } from "@/store/homeStore";
  import { useRoomStore } from "@/store/roomStore";
  import { ref, onMounted } from "vue";
  import { watch } from "vue";
  
  const actualHome = ref();
  
  const homeStore = useHomeStore();
  const roomStore = useRoomStore();
  const apiError = ref(false);
  
  const homes = ref([]);
  
  const devicesByRoom = ref([]);
  let devicesAlarm = ref([]);
  let devicesNoAlarm = ref([]);

  const loading = ref(true);

  onMounted(async () => {
    loading.value = true;

    try{
    homes.value = (await homeStore.get()).map((home) => home.name);


    if (homes.value != null) {
        actualHome.value = homes.value[0];
    }

    
  }catch(error){
      
      apiError.value = true;
    }
    setTimeout(() => {loading.value = false}, 260);

  
  });


  function getImageUrl(name) {
    return new URL(`../assets/${name}`, import.meta.url).href
}
 
  
  watch(
    () => actualHome.value,
    async (newValue) => {
        const roomName = `${actualHome.value} Room`;
        devicesByRoom.value = await roomStore.getDevicesFromRoom(roomName);

        devicesAlarm.value = devicesByRoom.value.filter(
            (device) => device.type.name === "alarm",
        );
        devicesNoAlarm.value = devicesByRoom.value.filter(
            (device) => device.type.name !== "alarm",
        );
    },
);
</script>

<style>
.no-padding-margin-right {
    padding-right: 0 !important;
    margin-right: 0 !important;
  }

  .loading{
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
}

  </style>
  