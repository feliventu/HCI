<template>
    <v-card
        class="d-flex border-radius flex-column h-100 justify-space-between ma-0"
        height="115"
        width="350"
        elevation="0"
        color="card"
    >
        <v-row no-gutters>
            <v-col cols="8">
                <v-card-item :title="name" class="mb-0">
                    <template v-slot:subtitle>
                        <span class="subtitle-c">{{ room }}</span>
                    </template>
                </v-card-item>
            </v-col>

            <v-col
                cols="4"
                class="d-flex flex-column justify-end align-end pr-3"
            >
                <v-row class="my-4">
                    <v-icon
                        v-if="isLocked"
                        class="mr-3"
                        color="icon"
                        icon="mdi-lock-outline"
                    ></v-icon>
                    <v-icon
                        v-if="isFavorite"
                        class="mr-5"
                        color="icon"
                        icon="mdi-heart-outline"
                    ></v-icon>
                </v-row>
                <v-switch
                    inset
                    hide-details
                    :model-value="isOn"
                    color="success"
                    base-color="secondary"
                    flat
                    inline
                ></v-switch>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    name: "DeviceCard",
    props: {
        id: Number,
        name: String,
        type: String,
        room: String,
        isLocked: Boolean,
        isFavorite: Boolean,
        isOn: Boolean,
    },
};
</script>

<style>
.v-card.border-radius {
    border-radius: 10px;
}

.subtitle-c {
    color: black !important; /* Change the color here */
    font-size: 13px; /* Change the font size here */
    opacity: 1; /* Change the opacity here */
}
</style>
