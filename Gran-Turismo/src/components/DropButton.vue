<template>
    <v-select
		class="selector"
        variant="outlined"
        :items="states"
		density="compact"
        label="Hogar"
        persistent-hint
        style="max-width: 150px;" 
        rounded="lg"
		id="mySelect"
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

.v-field__outline {
    --v-field-border-width: 3px !important; /* Change the border width here */
	--v-field-border-opacity: 0.15;
}


.selector {


	color: black;
	font-weight: bold;

}
</style>