<template>
  <v-app>
    <Navbar />
    <v-main class="mt-5 ml-16">
      <div class="d-flex justify-space-between">
        <DropButton />
        <NewButton class="xD" />
      </div>

      <h2>Alarmas recientes</h2>
      <div class="d-flex">
        <!-- First row -->
        <AlarmCard alarm="Alarma 1" />
      </div>

      <h2>Rutinas recientes</h2>
      <div class="d-flex">
        <!-- First row -->
        <RoutineCard
          routine="Ducha"
          description="Para poner musica y llenar la bañera."
          condition="minimizado"
        />
      </div>

      <h2>Dispositivos recientes</h2>
      <div class="d-flex">
        <!-- First row -->
        <DeviceCard device="Parlante" room="Cuarto mama" />
        <DeviceCard device="Cortina" room="Living Room" />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import AlarmCard from "@/components/AlarmCard.vue";
</script>

<style>

</style>
