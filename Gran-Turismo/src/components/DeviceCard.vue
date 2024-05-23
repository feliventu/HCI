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
        <v-card-item :title="name" class="mt-n1">
            
          <template v-slot:subtitle>
            <div style="display: flex; flex-direction: column">
            
            <span class="subtitle-c" v-if="type === 'ac'">{{ state.temperature}}°C</span>
            <span class="subtitle-c" v-if="type === 'speaker'">{{ state.volume}}%</span>
			      <span class="subtitle-c" v-if="type === 'blinds'">Apertura maxima: {{ setLevel }}%</span>
                  <span class="subtitle-c" v-if="type === 'blinds'">Apertura actual: {{ localCurrentLevel}}%</span>
          </div>
          </template>
        </v-card-item>

		
      </v-col>
	 

      <v-col cols="4" class="d-flex flex-column justify-end align-end pr-3 ">
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
		
		<v-row class="mb-0">
		<v-btn 
		v-if="type == 'blinds'"
		density="compact" 
		class="custom-button-card "
		elevation="0"
		@click.stop="openBlids"
        
        
		 > Action</v-btn>

		</v-row>
		

        <v-switch
		v-if="type !== 'blinds'"
          inset
          hide-details
          :model-value="switchIsOn"
          :v-model="localIsOn"
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
import { watch } from "vue";

const props = defineProps({
  id: String,
  name: String,
  type: String,
  state: Object,
  room: String,
  isOn: String,
  isLocked: Boolean,
  isFavorite: Boolean,
});

const dialogVisible1 = ref(false);

const deviceStore = useDeviceStore();

let localIsOn = ref(props.isOn)
let switchIsOn

if(localIsOn.value === "on" || localIsOn.value === "playing" ){
  switchIsOn = true;
}
else{
  switchIsOn = false;
}

let localCurrentLevel = ref(0);
let setLevel = ref(0);

if(props.type === 'blinds'){
localCurrentLevel = ref(props.state.currentLevel);
setLevel = ref(props.state.level)
}
/*
watch(localCurrentLevel, async (newLevel) => {
    localCurrentLevel.value = newLevel;

});
//0% es cerrado
async function openCloseBlinds(){
  const device = await deviceStore.getDeviceById(props.id);
  //abre
  if(localCurrentLevel.value === 0){
    await deviceStore.actionDevice(device,'open');
  }
  else if(localCurrentLevel.value === setLevel.value){
    await deviceStore.actionDevice(device,'close');
  }
  return;

}*/


async function toggleDevice() {

  const device = await deviceStore.getDeviceById(props.id);
  if(switchIsOn === false){
    switchIsOn = true;
    const startAction = (props.type === "speaker") ? 'play' : (props.type === "ac") ? 'turnOn' : '';

    await deviceStore.actionDevice(device,startAction);
  }
  else if(switchIsOn === true){
    localIsOn = false;
    const stopAction = (props.type === "speaker") ? 'stop' : (props.type === "ac") ? 'turnOff' : '';
    await deviceStore.actionDevice(device,stopAction);
  }
  return;
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


<style>
.v-card.border-radius {
  border-radius: 10px;
}

.subtitle-c {
  color: black !important; /* Change the color here */
  font-size: 13px; /* Change the font size here */
  opacity: 1; /* Change the opacity here */
}


.custom-button-card {
	border-radius: 10px !important;
	background-color: lightgray !important;
	color: white !important;
	
}
</style>
