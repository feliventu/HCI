<template>
  <v-app>
    <Navbar />
    <v-main class="">
      <h1>GranTurismo 5.0</h1>
      <div class="d-flex"> <!-- First row -->
        <DeviceCard device="Parlante" room="Cuarto mama" />
        <DeviceCard device="Cortina" room="Living Room" />
        <AlarmCard alarm="Porton Garage" />
        <RoutineCard routine="Ducha" description="Para poner musica y llenar la bañera." condition="minimizado"/>
        <RoutineCard routine="asdasd" description="sdff" :devices="['parlante 1', 'parlante 2', 'buee cuantos tenia']" condition="grande"/>
      </div>
      <div class="d-flex"> <!-- Second row -->
        <NewButton />
        <DropButton class="" />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
//
</script>

<style>

</style>