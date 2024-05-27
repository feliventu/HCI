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

        <div v-if="routines.length === 0 "> 
          <WelcomeWaifu :title="'Agrega tu primera rutina!'" :waifu="'Routine'"/>
        </div>

          <div v-if="routines && routines.length > 0">
            <v-row class="pt-3 mb-n8">
              <v-col> <h2>Rutinas</h2></v-col>
            </v-row>
            
            <v-row class="mt-n5">
              <v-col
                cols="12"
                sm="6"
                md="4"
                lg="2"
                class="d-flex justify-space-between"
                v-for="routine in routines"
                :key="routine.id"
              >
                <RoutineCard
                  :id="routine.id"
                  :routine="routine.name"
                  :description="routine.meta.description"
                  :devicesActions="routine.actions"
                  :icon="routine.meta.icon"
                  :color="routine.meta.color"
                  :expanded="true"
                />
              </v-col>
            </v-row>
          </div>
        </div>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import DropButton from "@/components/DropButton.vue";
  import { useHomeStore } from "@/store/homeStore";
  import { useRoomStore } from "@/store/roomStore";
  import { useRoutineStore } from "@/store/routineStore";
  import { ref, onMounted, computed } from "vue";
  import { watch } from "vue";
  
  const apiError = ref(false);
  
  const actualHome = ref();
  
  const routines = ref([]);
  const routineStore = useRoutineStore();

  const homeStore = useHomeStore();
  const roomStore = useRoomStore();

  
  const homes = ref([]);

  
  const loading = ref(true);
  
  onMounted(async () => {
    loading.value = true;
    try {
      homes.value = (await homeStore.get()).map((home) => home.name);
    } catch (e) {
      apiError.value = true;
    }
    if (homes.value != null) {
      actualHome.value = homes.value[0];
    }
    setTimeout(() => {
      loading.value = false;
    }, 1500);
  
    try {
      routines.value = await routineStore.get();
    } catch (e) {
      console.log(e);
      apiError.value = true;
    }
   
  });
  
  function getImageUrl(name) {
    return new URL(`../assets/${name}`, import.meta.url).href;
  }
  
  
  watch(
    () => actualHome.value,
    async (newValue) => {
      updateHomeView();
    }
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
  width: 100px !important;
  height: 100px;
  animation: spin 2s linear infinite;
}

  
  .title {
    font-size: 2rem;
    color: gray;
  }
  </style>
  