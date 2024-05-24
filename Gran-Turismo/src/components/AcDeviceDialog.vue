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
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useDeviceStore } from '@/store/deviceStore';

  const props = defineProps({
    id: String,
  });

  const deviceStore = useDeviceStore();
  const device = ref(null);
  onMounted(async () => {
  device.value = await deviceStore.getDeviceById(props.id);
});




const emit = defineEmits(["update:modelValue"]);

  const updateDialog = (value) => {
    emit("update:modelValue", value);
  };

  const closeDialog = () => {
    emit("update:modelValue", false);
  };
</script>

  