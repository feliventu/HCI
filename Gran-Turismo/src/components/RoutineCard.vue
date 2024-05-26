<template>
    <v-card
        v-if="expanded == false"
        class="d-flex border-radius flex-column h-100 justify-space-between ma-0"
        height="115"
        width="350"
        max-height="300"
        elevation="0"
        color="card"
    >
        <v-row no-gutters>
            <v-col class="routine-color" cols="4">
                <v-row class="mt-4 mb-0 d-flex justify-center align-center">
                    <v-icon class="" color="icon" :icon="icon"></v-icon>
                </v-row>
                <v-row class="mt-0 mb-1 d-flex justify-center align-center">
                    <v-card-title class="routine-title text-body-1">{{
                        routine
                    }}</v-card-title>
                </v-row>
            </v-col>

            <v-col class="" cols="7">
                <v-card-item class="mb-0 wrap">
                    <p class="subtitle">{{ description }}</p>
                </v-card-item>
            </v-col>

            <v-col
                cols="1"
                class="d-flex flex-column justify-end align-end pr-3"
            >
                <v-row class="my-4">
                    <v-icon
                        class="mr-5"
                        color="icon"
                        icon="mdi-heart-outline"
                    ></v-icon>
                </v-row>
            </v-col>
        </v-row>
    </v-card>
    <v-card
        v-if="expanded == true"
        class="d-flex border-radius flex-column h-10000 justify-space-between ma-3"
        height="200"
        width="350"
        max-height="300"
        elevation="0"
        color="card"
    >
        <v-row no-gutters>
            <v-col :class="colorR" cols="4">
                <v-row class="mt-15 mb-0 d-flex justify-center align-center">
                    <v-icon class="" color="icon" :icon="icon"></v-icon>
                </v-row>
                <v-row class="mt-0 mb-1 d-flex justify-center align-center">
                    <v-card-title class="routine-title text-body-1">{{
                        routine
                    }}</v-card-title>
                </v-row>
            </v-col>

            <v-col class="" cols="7">
                <v-card-item class="mb-0 wrap">
                    <p class="subtitle">{{ description }}</p>
                    <p class="mt-4 subtitle">Acciones:</p>
                    <p class="subtitle" v-for="action in devicesActions">
                        {{}} {{ action.actionName }}
                    </p>
                </v-card-item>
            </v-col>

            <v-col
                cols="1"
                class="d-flex flex-column justify-end align-end pr-3"
            >
                <v-row class="my-4">
                    <v-icon
                        class="mr-5"
                        color="icon"
                        icon="mdi-heart-outline"
                    ></v-icon>
                </v-row>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup>
const props = defineProps({
    id: String,
    description: String,
    routine: String,
    devices: Object,
    icon: String,
    color: String,
    devicesActions: {
        type: Array,
        default: () => [],
    },
    expanded: Boolean,
});

console.log(props.devicesActions.actionName);
const colorR = `bg-${props.color}`;
</script>

<script>
export default {
    name: "RutineCard",
    props: {
        id: String,
        description: String,
        routine: String,
        device: Object,
        icon: String,
        color: String,
        devicesActions: {
            type: Array,
            default: () => [],
        },
        expanded: Boolean,
    },
};
</script>

<style scoped>
.v-card.border-radius {
    border-radius: 10px;
}

.v-card-item .subtitle {
    color: #000000;
    /* remove opacity in the subitile */
    opacity: 1;
}

.routine-title {
    /* remove opacity in the subitile */
    opacity: 1;
    color: #000000;
}
.routine-color {
    background-color: #fb9f9e;
}
</style>
