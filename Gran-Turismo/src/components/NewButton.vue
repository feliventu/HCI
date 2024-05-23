
<template>  
<v-btn class="custom-button" variant="outlined" height="40px"  @click="dialog = true">+ Nuevo</v-btn>


<v-dialog
        
        v-model="dialog"
        max-width="480"
      >
        <v-card title="Crear nuevo"
		class="border-radius">
          <v-card-text>

            <router-link to="/dispositivos/nuevo">
            <v-btn
			class="custom-button"
			elevation="0"
              text="Dispositivo"
              @click="dialog2 = true"
            ></v-btn>

          </router-link>
            <v-btn
			class="custom-button"
			elevation="0"
              text="Rutina"
              @click="dialog2 = true"
            ></v-btn>
            <router-link to="/hogares/nuevo">

            <v-btn
			class="custom-button"
			elevation="0"
              text="Hogar"
              @click="dialog2 = true"
            ></v-btn>
            </router-link>
          </v-card-text>
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              text="Cancelar"
              variant="text"
              @click="dialog = false"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

</template>

<style>
 .custom-button {
  background-color: white !important;
  border-radius: 10px !important;
  border-color: rgba(0, 0, 0, 0.15) !important; 
  border-width: 3px !important;
  color: black !important;
  font-weight: bold !important;

}

.v-btn {
    margin-right: 15px;/* Add space to the left and right of the button */
}



.border-radius {
    border-radius: 10px !important;
}

</style>

<script>
  import { shallowRef } from 'vue'
  
  const dialog = shallowRef(false)
  const dialog2 = shallowRef(false)

  export default {
    data () {
      return {
        dialog: false,
        dialog2: false,
        dialog3: false,
      }
    },
  }
</script>
