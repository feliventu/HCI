<template>
  <nav>
    <!-- Second row -->
    <v-toolbar dense flat color="primary" class="px-9 mb-3">
      <v-toolbar-title class="">HomeAPP</v-toolbar-title>
      <div class="">
        <v-btn
          light
          text
          to="/"
          :ripple="false"
          rounded
          active-class="selected"
         
        >
          Mi hogar
        </v-btn>
        <v-btn
          light
          rounded
          text
          to="/dispositivos"
          active-class="selected"
        >
          Dispositivos
        </v-btn>
        <v-btn light rounded text to="rutinas" active-class="bg-white h-100">
          Rutinas
        </v-btn>
        <v-btn light rounded text to="logs" active-class="bg-white h-100">
          Acerca de
        </v-btn>

     
      </div>
    </v-toolbar>
  </nav>
</template>

<style scoped>
</style>

<script>
export default {
  name: "Navbar",
};
</script>
