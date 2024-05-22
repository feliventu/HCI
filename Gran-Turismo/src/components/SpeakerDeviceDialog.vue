<template>
    <v-dialog :v-model="dialogVisible">
        <v-card>
            <v-card-title>Hola</v-card-title>
            <!-- You can add more content here -->
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: "DeviceDialog",
  props: {
    dialogVisible: Boolean,
  },
};
</script>