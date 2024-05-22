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
        <v-row class="pt-2">
          <h2>Alarmas recientes</h2>
        </v-row>
        <v-row class="pt-2"> </v-row>
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
        <v-row class="pt-2">
          <device-card class="mr-5 mb-5" v-for="device in devices" 
            :key="device.id"
            :name="device.name" 
            :type="device.type"
            :room="device.room"
            :isOn="device.isOn"
            :isFavorite="device.isFavorite"
            :isLocked="device.isLocked"/>
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

let devices = ref([]);

onMounted(async () => {
  homes.value = (await homeStore.get()).map((home) => home.name);
});

watch(() => actualHome.value, async (newValue) => {
    const roomName = `${actualHome.value} Room`;
    devices = await roomStore.getDevicesFromRoom(roomName);

  }
);

//console.log(devices)
</script>

<style></style>
