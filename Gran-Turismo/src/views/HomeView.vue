<template>
	<v-app>
	  <v-main class="px-12 pt-5">
		<div>
		  <v-row class="d-flex justify-space-between">
			<DropButton :items="homes" v-model="actualHome" />
			<NewButton />
		  </v-row>
		</div>
  
		<div>
		  <v-row>
			<h2>Alarmas recientes</h2>
		  </v-row>
		  <v-row class="pt-2"> 
			<v-col
			cols="12"
            sm="6"
            md="4"
            lg="3"
            class="d-flex justify-space-between"
			v-for="device in devicesAlarm"
			:key="device.id"
			>
			<AlarmCard
			  		  
			  
			  :name="device.name"
			/>
			</v-col>
		  </v-row>
		</div>
  
		<div>
		  <v-row class="pt-3">
			<h2>Rutinas recientes</h2>
		  </v-row>
  
		  <!-- First row -->
		  <v-row class="pt-2"> </v-row>
		</div>
  
		<div>
		  <!-- First row -->
		  <v-row class="pt-8">

			<h2>Dispositivos recientes</h2>
		  </v-row>
		  <v-row >
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
              :room="device.room"
              :isOn="device.isOn"
              :isFavorite="device.isFavorite"
              :isLocked="device.isLocked"
            />
          </v-col>
        </v-row>
		</div>
	  </v-main>
	</v-app>
  </template>
  
  <script setup>
  import AlarmCard from "@/components/AlarmCard.vue";
  import DropButton from "@/components/DropButton.vue";
  import { useHomeStore } from "@/store/homeStore";
  import { useRoomStore } from "@/store/roomStore";
  import { ref, onMounted } from "vue";
  import { watch } from "vue";
  
  const actualHome = ref();
  
  const homeStore = useHomeStore();
  const roomStore = useRoomStore();
  
  const homes = ref([]);
  
  const devices = ref([]);
  let devicesAlarm = ref([]);
  let devicesNoAlarm = ref([]);
  
  onMounted(async () => {
	homes.value = (await homeStore.get()).map((home) => home.name);
	if (homes.value != null) {
	  actualHome.value = homes.value[0];
	}
  });
  
  watch(() => actualHome.value, async (newValue) => {
	  const roomName = `${actualHome.value} Room`;
	  devices.value = await roomStore.getDevicesFromRoom(roomName);
	 
	  devicesAlarm.value= devices.value.filter(device => device.type.name === 'alarm');
	  devicesNoAlarm.value= devices.value.filter(device => device.type.name !== 'alarm');

    console.log(devicesNoAlarm.value)
	}
  );
  
  
  
  //console.log(devices)
  </script>
  
  <style>
    .no-padding-margin-right {
      padding-right: 0 !important;
      margin-right: 0 !important;
    }
</style>