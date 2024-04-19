<template>
    <v-card class="d-flex border-radius flex-column h-100 justify-space-between ma-3" height="115" width="300" elevation=0 color="card">
        <v-row no-gutters>
            <v-col cols="8">
                <v-card-item :title="device" class="mb-0">
                    <template v-slot:subtitle>
                        {{ room }}
                    </template>
                </v-card-item>
            </v-col>

            <v-col cols="4" class="d-flex flex-column justify-end align-end pr-3">
                <v-row class="my-4">
                    <v-icon class="mr-3" color="icon" icon="mdi-lock"></v-icon>
                    <v-icon class="mr-5" color="icon" icon="mdi-heart"></v-icon>
                </v-row>
                <v-switch inset hide-details :model-value="false"
                color="success" base-color="secondary" flat inline></v-switch>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    name: 'DeviceCard',
    props: {
        device: String,
        room: String,
    }
}
</script>

<style>

.v-card.border-radius {
 
    border-radius: 10px;
}
</style>