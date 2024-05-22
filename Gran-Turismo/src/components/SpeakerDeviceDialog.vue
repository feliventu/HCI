<template>
  <v-dialog :model-value="dialogVisible" @update:modelValue="updateDialog">
      <v-card>
          <v-card-title>Hola</v-card-title>
          <!-- You can add more content here -->
      </v-card>
  </v-dialog>
</template>

<script>
export default {
name: "SpeakerDeviceDialog",
props: {
  dialogVisible: Boolean,
},
methods: {
  updateDialog(value) {
    this.$emit('update:modelValue', value);
  },
},
};
</script>