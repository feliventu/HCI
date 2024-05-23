<template>
    <v-dialog
      
      :model-value="dialogVisible"
      @update:modelValue="updateDialog"
      max-width="480"
    >
      <v-card class="border-radius">
        <v-card-title>Hola</v-card-title>
  
        <v-card-actions>
          <v-spacer></v-spacer>
  
          <v-btn text="Cerrar" variant="text" @click="closeDialog"></v-btn>
        </v-card-actions>
  
        <!-- You can add more content here -->
      </v-card>
    </v-dialog>
  </template>
  
  <style>
  
  
  .border-radius {
    border-radius: 10px !important;
  }
  </style>
  
  <script>
  export default {
    name: "BlindsDeviceDialog",
    props: {
      typeId: String,
      id: String,  
      dialogVisible: Boolean,
    },
    methods: {
      updateDialog(value) {
        this.$emit("update:modelValue", value);
      },
      closeDialog() {
        this.$emit("update:modelValue", false);
      },
    },
  };
  </script>
