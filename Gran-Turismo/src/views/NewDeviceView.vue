<template>
    <h2 class="mt-10">Nuevo Dispositivo</h2>
    <form>
        <v-text-field label="Nombre" style="max-width: 300px;" variant="underlined"></v-text-field>
        <v-text-field label="Contraseña (Opcional)" style="max-width: 300px;" variant="underlined"></v-text-field>
        <v-select
        label="Dispositivo"
        style="max-width: 300px;"
        :items="states"
        variant="underlined"
        ></v-select>
    </form>
  </template>
  
  <script setup>
   const states = [
    'Parlante', 'Cortina', 'Aire acondicionado', 'Alarma',
    ]
  </script>


<script> 

export default {
      data () {
        return {
            states: [
    'Parlante', 'Cortina', 'Aire acondicionado', 'Alarma'
    ],
        }
      },
    }

</script>