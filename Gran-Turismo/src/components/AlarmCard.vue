<template>
    <v-card class="d-flex border-radius flex-column h-100 justify-space-between ma-0" height="115" width="350"
        elevation=0 color="card">
        <v-row no-gutters>
            <v-col cols="8">
                <v-card-item :title="name" class="mb-0">

                </v-card-item>
            </v-col>

            <v-col cols="4" class="d-flex flex-column justify-end align-end pr-3">

                <v-switch inset hide-details :model-value="false" color="success" base-color="secondary" flat
                    inline></v-switch>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    name: 'AlarmCard',
    props: {
        id: Number,
        name: String,
    }
}
</script>

<style>
.v-card.border-radius {

    border-radius: 10px;
}
</style>