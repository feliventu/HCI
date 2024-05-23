<template>
  <v-card
    class="d-flex border-radius flex-column h-100 justify-space-between ma-0"
    height="115"
    width="350"
    elevation="0"
    color="card"
    @click="dialogVisible1 = true"
    
  >
    <v-row no-gutters>
      

      <v-col cols="8" class="d-flex">
        <v-icon 
            
            class="ml-3 mt-4" 
            color="icon"
            :icon="icon"
            size="20"
          ></v-icon>
        <v-card-item :title="name" class="mt-n4 ml-n2">
            
          <template v-slot:subtitle>
            <span class="subtitle-c">{{ type }}</span>
          </template>
        </v-card-item>
      </v-col>

      <v-col cols="4" class="d-flex flex-column justify-end align-end pr-3">
        <v-row class="my-4">
          <v-icon
            v-if="isLocked"
            class="mr-3"
            color="icon"
            icon="mdi-lock-outline"
          ></v-icon>
          <v-icon
            v-if="isFavorite"
            class="mr-5"
            color="icon"
            icon="mdi-heart-outline"
          ></v-icon>
        </v-row>
        <v-switch
          inset
          hide-details
          :model-value="isOn"
          :v-model="isOn"
          color="success"
          base-color="secondary"
          flat
          inline
          @click.stop="toggleDevice"
        ></v-switch>
      </v-col>
    </v-row>
  </v-card>

  <SpeakerDeviceDialog v-if="type === 'speaker'" v-model="dialogVisible1">
  </SpeakerDeviceDialog>
  <AcDeviceDialog v-if="type === 'ac'" v-model="dialogVisible1">
  </AcDeviceDialog>
  <BlindsDeviceDialog v-if="type === 'blinds'" v-model="dialogVisible1">
  </BlindsDeviceDialog>
</template>

<script setup>
import { useDeviceStore } from "@/store/deviceStore";
import { onMounted, ref } from "vue";

const props = defineProps({
  id: String,
  name: String,
  type: String,
  room: String,
  isOn: Boolean,
  isLocked: Boolean,
  isFavorite: Boolean,
});

const dialogVisible1 = ref(false);

const deviceStore = useDeviceStore();
let localIsOn = ref(props.isOn);

async function toggleDevice() {
   
  const device = await deviceStore.getDeviceById(props.id);

  if(localIsOn.value === false){
  localIsOn = ref(true);
  await deviceStore.actionDevice(device,'play');
  }
  else if(localIsOn.value === true){
    localIsOn = ref(false);
    await deviceStore.actionDevice(device,'stop');
  }

}

const icon = ref("mdi-speaker");

onMounted(() => {
  if (props.type === "speaker") {
    icon.value = "mdi-speaker";
  } else if (props.type === "ac") {
    icon.value = "mdi-air-filter";
  } else if (props.type === "blinds") {
    icon.value = "mdi-blinds";
  } else {
    icon.value = "mdi-tablet-cellphone";
  }
});
</script>

<script>
/*import SpeakerDeviceDialog from "@/components/SpeakerDeviceDialog.vue";
import AcDeviceDialog from "@/components/AcDeviceDialog.vue";
import BlindsDeviceDialog from "@/components/BlindsDeviceDialog.vue";



export default {
  name: "DeviceCard",
  props: {
    id: String,
    name: String,
    type: String,
    room: String,
    isLocked: Boolean,
    isFavorite: Boolean,
    isOn: Boolean,
  },
  data() {
    return {
      dialogVisible1: false,
    };
  },
  components: {
    SpeakerDeviceDialog,
    AcDeviceDialog,
    BlindsDeviceDialog,
  },
};*/
</script>

<style>
.v-card.border-radius {
  border-radius: 10px;
}

.subtitle-c {
  color: black !important; /* Change the color here */
  font-size: 13px; /* Change the font size here */
  opacity: 1; /* Change the opacity here */
}
</style>
