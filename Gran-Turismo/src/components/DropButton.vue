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

v-select.custom-select {
	border: 4px solid #000000 !important;
	background-color: #000000;

}
</style>