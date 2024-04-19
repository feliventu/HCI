<template>
    <v-card class="d-flex border-radius flex-column h-100 justify-space-between ma-3" height="115" width="350"
        max-height="300" elevation=0 color="card">
        <v-row no-gutters>

            <v-col class="routine-color" cols="4">


                <v-row class="mt-4 mb-0 d-flex justify-center align-center">

                    <v-icon class="" color="icon" icon="mdi-shower-head"></v-icon>


                </v-row>
                <v-row class="mt-0 mb-1 d-flex justify-center align-center">



                    <v-card-title class="routine-title text-body-1">{{ routine }}</v-card-title>
                </v-row>



            </v-col>


            <v-col class="" cols="7">
                <v-card-item class="mb-0 wrap">

                    <p class="subtitle">{{ description }}</p>

                </v-card-item>
            </v-col>

            <v-col cols="1" class="d-flex flex-column justify-end align-end pr-3">
                <v-row class="my-4">

                    <v-icon class="mr-5" color="icon" icon="mdi-heart-outline"></v-icon>
                </v-row>

            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    name: 'RutineCard',
    props: {
        description: String,
        routine: String,
        devices: String,
    }
}
</script>

<style>
.v-card.border-radius {

    border-radius: 10px;
}

.v-card-item .subtitle {
    color: #000000;
    font-size: 0.8em;
    /* remove opacity in the subitile */
    opacity: 1;

}

.routine-title {
    font-size: 0.5em;
    /* remove opacity in the subitile */
    opacity: 1;
    color: #000000;
}

.routine-color {
    background-color: #FB9F9E;
}
</style>