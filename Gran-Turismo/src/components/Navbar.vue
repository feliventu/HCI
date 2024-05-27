<template>
  <nav>
    <!-- Second row -->
    <v-toolbar dense flat color="primary" class="px-9 mb-3">

      <v-toolbar-title class="">HomeAPP
       
        <v-btn
          light
          text
          to="/"
          :ripple="false"
          rounded
          active-class="selected"
          class="ml-15"
         
        >
          Hogar
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
        <v-btn light rounded text to="/rutinas" active-class="bg-white h-100">
          Rutinas
        </v-btn>
        

      

        
      </v-toolbar-title>
      
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
