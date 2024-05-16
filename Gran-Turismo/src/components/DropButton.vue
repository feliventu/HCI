<template>
    <v-select
        class="custom-select"
        variant="outlined"
        :items="states"
        label="Hogar"
        persistent-hint
        style="max-height: 20px; max-width: 150px;" 
        rounded="lg"
		base-color="text"
		item-color="text"
        single-line
    ></v-select>
  </template>
  
  <script setup>
    const states = [
      'Casa 1', 'Casa 2', 'Casa 3', 'Casa 4',
    ]
  </script>
  
  <script>
    export default {
      data () {
        return {
          states: [
            'Casa 1', 'Casa 2', 'Casa 3', 'Casa 4',
          ],
        }
      },
    }
  </script>

<style> 
.custom-select .v-input__slot {
    border: 2px solid red !important; /* Cambia el tamaño y el color del borde aquí */
}
</style>