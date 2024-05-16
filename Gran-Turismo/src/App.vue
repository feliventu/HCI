<template>
  <v-app>
      <Navbar />
      <v-main class="">
      <h1>GranTurismo 5.0</h1>
      <div class="d-flex">
        <DeviceCard device="Parlante" room="Cuarto mama" />
        <DeviceCard device="Cortina" room="Living Room" />
        <AlarmCard alarm="Porton Garage" />
        <RoutineCard routine="Ducha" description="Para poner musica y llenar la bañera." />
      </div>
    </v-main>

  </v-app>
</template>

<script setup>

//
</script>
