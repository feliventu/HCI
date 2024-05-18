<template>
    <v-sheet>
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
        <v-toolbar dense flat color="primary" class="px-9">
            <router-link to="/" class="xd" exact>
                <div class="lefti"></div>
                <div class="righti"></div>
                <div>   </div> 
                <v-btn class="text">Mi casa</v-btn>
            </router-link>
            <router-link to="/a">
                <v-btn class="text">Dispositivos</v-btn>
            </router-link>
            <router-link to="/b">
                <v-btn class="text">Rutinas</v-btn>
            </router-link>
            <router-link to="/c">
                <v-btn class="text">Historial</v-btn>
            </router-link>
        </v-toolbar>
    </v-sheet>
</template>

<style scoped>

.text{
    color: black;
}

.router-link-exact-active v-btn {
    color: white;
    background-color: #1976d2;
}
.xd {
    position: relative;
    background-color: white;
    height: 100%;
    padding: 10px;
    text-align: center;
    align-content: center;
    /* clip-path: polygon(0 0, 100% 0, 100% 85%, 75% 100%, 50% 85%, 25% 100%, 0 85%); */
}

.lefti,
.righti {
    content: "";
    position: absolute;
    width: 100px;
    height: 80px;
    background-color: #70e;
    clip-path: ellipse(41% 62% at 36% 39%);
}

.lefti {
    /* left: 12%; adjust as needed */
    transform: translate(-88%, -33%) scaleX(-1);
}

.righti {
    transform: translate(88%, -33%);
    /* right: 10%; */
    /* right: -50px; /* adjust as needed */
}
</style>

<script>
export default {
    name: "Navbar",
};
</script>
