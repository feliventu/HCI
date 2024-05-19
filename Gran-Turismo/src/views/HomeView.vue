<template>
  <v-app>
    <v-main class="px-12 pt-5">
      <div>
        <v-row class="d-flex justify-space-between">
          <DropButton :items="homeStore"/>
          <NewButton />
        </v-row>
      </div>

      <div>
        <v-row class="pt-2">
          <h2>Alarmas recientes</h2>
        </v-row>
        <v-row class="pt-2">
          <AlarmCard class="mr-5 mb-5" alarm="Alarma 1" />
          <AlarmCard class="mr-5 mb-5" alarm="Alarma 2" />
        </v-row>
      </div>

      <div>
        <v-row class="pt-3">
          <h2>Rutinas recientes</h2>
        </v-row>

        <!-- First row -->
        <v-row class="pt-2">
          <RoutineCard
            routine="Ducha"
            description="Para poner musica y llenar la bañera."
            condition="minimizado"
          />
        </v-row>
      </div>

      <div>
        <!-- First row -->
        <v-row class="pt-8">
          <h2>Dispositivos recientes</h2>
        </v-row>
        <v-row class="pt-2">
          <DeviceCard class="mr-5 mb-5" device="Luz" room="Cuarto mama" />
          <DeviceCard class="mr-5 mb-5" device="Parlante" room="Cuarto mama" />
          <DeviceCard class="mr-5 mb-5" device="Cortina" room="Living Room" />
        </v-row>
      </div>
    </v-main>
  </v-app>
</template>


<script>
import AlarmCard from "@/components/AlarmCard.vue";
import DropButton from "@/components/DropButton.vue";
import { useHomeStore } from "@/store/homeStore";

export default{
  name: "Homes",
  components:{
    DropButton,
  },
  data(){
    return{
      homeStore: useHomeStore().homes.map((home) => home.name),
    }
  }
}

</script>

<style></style>
