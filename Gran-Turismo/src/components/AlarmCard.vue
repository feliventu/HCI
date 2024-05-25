<template>
    <v-card class="d-flex border-radius flex-column h-100 justify-space-between ma-0" 
        height="115" 
        width="350"
        elevation=0 
        color="card"
        @click="dialogVisible1 = true"
        >
        <v-row no-gutters>
            <v-col cols="8">
                <v-card-item :title="name" class="mb-0">

                </v-card-item>
            </v-col>

            <v-col cols="4" class="d-flex flex-column justify-end align-end pr-3">
                <span v-if="localIsOn ==='armedStay'">Activada</span>
                <span v-if="localIsOn ==='armedAway'">Descativada</span>
            </v-col>
        </v-row>
    </v-card>

   <AlarmDeviceDialog v-model="dialogVisible1" :id="id"/>
</template>

<script setup>
import { useDeviceStore } from "@/store/deviceStore";
import { ref, onMounted, onUnmounted, computed } from "vue";
import AlarmDeviceDialog from "./AlarmDeviceDialog.vue";

const props = defineProps({
  id: String,
  name: String,
  isArmed: Object,
});


const dialogVisible1 = ref(false);
const deviceStore = useDeviceStore();

let localIsOn = ref(props.isArmed);





</script>


<style>
.v-card.border-radius {

    border-radius: 10px;
}
</style>