<template>
  <v-dialog
    :model-value="dialogVisible"
    @update:modelValue="updateDialog"
    max-width="480"
  >
    <v-card class="border-radius">
      <v-card-title>{{ device.name }}</v-card-title>
      <span class="subtitle-c ml-4" v-if="device.state.status == 'stopped'">Apagado</span> 
      <span class="subtitle-c ml-4" >Genero: {{device.state.genre}}</span>
      <span class="d-flex subtitle-c ml-4">Volumen: {{ device.state.volume }}/10</span>
      
      <div v-if="device.state.status != 'stopped'">
      <span class="d-flex subtitle-c ml-4">Cancion actual: {{ device.state.song.title }}</span>
      <span class="d-flex subtitle-c ml-4" v-if="device.state.status === 'paused'">Estado: Pausado</span>
      <span class="d-flex subtitle-c ml-4" v-if="device.state.status === 'playing'">Estado: Activo</span>
      </div>

      <div class="justify-content-center mt-3">
      <v-divider length="400px"></v-divider>
      </div>

      <div class="d-flex mt-4">
        <v-text-field
          class="ml-4"
          type="input"
          label="Volumen"
          style="max-width: 180px"
          variant="outlined"
          v-model="newVolume"
        ></v-text-field>
        <v-btn
          class="custom-button mt-2 ml-3"
          variant="outlined"
          height="40px"
          v-model="newVolume"
          @click="setVolume()"
          :disabled="!canCreate"
          >Cambiar</v-btn>
          
      </div>

      <div v-if="device.state.status != 'stopped'" class="justify-content-center mb-4">
      <v-divider length="400px"></v-divider>
      </div>

      <div v-if="device.state.status !='stopped'" >
        <div class="d-flex mb-4">
          <v-btn
            class="custom-button mt-0 ml-3"
            variant="outlined"
            height="40px"
            @click="previousSong()"
            icon="mdi-skip-previous"
          ></v-btn>
          <v-btn
            class="custom-button mt-0 ml-3"
            variant="outlined"
            height="40px"
            @click="resumeSong()"
            :disabled="!canPlay"
            icon="mdi-play"
          ></v-btn>
          <v-btn
            class="custom-button mt-0 ml-3"
            variant="outlined"
            height="40px"
            icon="mdi-pause"
            @click="pauseSong()"
            :disabled="!canPause"
          ></v-btn>
          <v-btn
            class="custom-button mt-0 ml-3"
            variant="outlined"
            height="40px"
            icon="mdi-skip-next"
            @click="nextSong()"
          ></v-btn>
        </div>
        <div class="d-flex mb-3">
          <v-btn
            class="custom-button mt-0 ml-3"
            variant="outlined"
            height="40px"
            icon="mdi-volume-minus"
            @click="decreaseVolume()"
            :disabled="!candecreaseVolume"
          ></v-btn>     
            <v-btn
            class="custom-button mt-0 ml-3"
            variant="outlined"
            height="40px"
            icon="mdi-volume-plus"
            @click="increaseVolume()"
            :disabled="!canincreaseVolume"
          ></v-btn>  
        </div>
      </div>

      <div class="justify-content-center mb-3 mt-1">
      <v-divider length="400px"></v-divider>
      </div>

      <div class="d-flex">
      <v-select
                class="ml-4 mt-2"
                label="Generos"
                style="max-width: 180px"
                :items="supportedValues"   
                v-model="newGenre"
                variant="outlined"
            >
            </v-select>
             <v-btn
          class="custom-button mt-6 ml-3"
          variant="outlined"
          height="40px"
          @click="changeGenre()"
          :disabled="!canChangeGenre"
          >Cambiar
          </v-btn>
      </div>
      <v-card-actions>
        <v-spacer>
          <v-btn 
          class="ml-2"
            color="red"
            variant="text"
            @click="dialogVisibleDelete = true"
            text="Borrar"
          >
          </v-btn>
        </v-spacer>
        <v-btn text="Cerrar" variant="text" @click="closeDialog"></v-btn>
      </v-card-actions>

      <!-- You can add more content here -->
    </v-card>


    <v-dialog max-width="500" v-model="dialogVisibleDelete">
      <template v-slot:default="{ isActive }">
        <v-card title="Borrar dispositivo" class="border-radius">
          <v-card-text> Seguro que desea borrar el dispositivo? </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="Borrar" class="bg-red border-radius" @click="deleteDevice"></v-btn>
            <v-btn text="Cancelar" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <div>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="primary">
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
  </v-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDeviceStore } from "@/store/deviceStore";
import { computed } from "vue";
import { onUnmounted } from "vue";


const props = defineProps({
  id: String,
});

const deviceStore = useDeviceStore();
const device = ref(null);

const snackbar = ref(false);
const timeout = ref(4000);
const text = ref("Dispositivo agregado");
const dialogVisibleDelete = ref(false);

const newVolume = ref(null);
const newGenre = ref(null);
let supportedValues

const constValues = [
                "classical",
                "country",
                "dance",
                "latina",
                "pop",
                "rock"
              ];


const fetchSpeakerState = async () => {
  device.value = await deviceStore.getDeviceById(props.id);
  supportedValues = constValues.filter((value) => value !== device.value.state.genre);
};




  
onMounted(async () => {
  fetchSpeakerState();
  const interval = setInterval(fetchSpeakerState, 1500); // Poll every 5 seconds
  
  // Cleanup interval on unmount
  onUnmounted(() => {
    clearInterval(interval);
  });
});


const canCreate = computed(() => {
  return newVolume.value && newVolume.value >=0 && newVolume.value <= 10;
});

const canPause = computed(() => {
  return device.value.state.status === 'playing';
});

const canPlay = computed(() => {
  return device.value.state.status === 'paused';
});

const candecreaseVolume = computed(() => {
  return device.value.state.volume > 0;
});

const canincreaseVolume = computed(() => {
  return device.value.state.volume < 10;
});

const canChangeGenre = computed(() => {
  return newGenre.value;
});
async function deleteDevice() {
  await deviceStore.deleteDevice(device.value,'delete');
  closeDialog();
}

async function changeGenre(){
  console.log(newGenre.value)
  await deviceStore.actionDevice(device.value, "setGenre", [newGenre.value]);
  newGenre.value = null;
  text.value = "Genero cambiado";
  snackbar.value = true;
}

async function setVolume(){
  await deviceStore.actionDevice(device.value, "setVolume", [newVolume.value]);
  newVolume.value = null;
  text.value = "Volumen cambiado";
  snackbar.value = true;
}

async function resumeSong(){
  await deviceStore.actionDevice(device.value, "resume");
}

async function pauseSong(){
  await deviceStore.actionDevice(device.value, "pause");
}

async function previousSong(){
  await deviceStore.actionDevice(device.value, "previousSong");
}

async function nextSong(){
  await deviceStore.actionDevice(device.value, "nextSong");
}

async function increaseVolume(){
  await deviceStore.actionDevice(device.value, "setVolume", [device.value.state.volume + 1]);
}

async function decreaseVolume(){
  await deviceStore.actionDevice(device.value, "setVolume", [device.value.state.volume - 1]);
}


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


</style>
