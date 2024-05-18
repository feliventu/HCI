<template>
    <nav>
        <!-- First row -->
        <v-toolbar dense flat>
            <v-toolbar-title class="mr-auto">Gran Turismo 6.0</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-account</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
        </v-toolbar>

        <!-- Second row -->
        <v-toolbar dense flat color="primary" class="px-9 mb-3">
            <v-btn light text to="/" :ripple="false" active-class="selected">
                Mi casa
            </v-btn>
            <v-btn
                light
                rounded
                text
                to="devices"
                active-class="bg-white h-100"
            >
                Dispositivos
            </v-btn>
            <v-btn
                light
                rounded
                text
                to="rutines"
                active-class="bg-white h-100"
            >
                Rutinas
            </v-btn>
            <v-btn light rounded text to="logs" active-class="bg-white h-100">
                Historial
            </v-btn>
        </v-toolbar>
    </nav>
</template>

<style scoped></style>

<script>
export default {
    name: "Navbar",
};
</script>
