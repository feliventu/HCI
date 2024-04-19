<template>
    <v-card class="d-flex border-radius flex-column h-100 justify-space-between ma-3" height="115" width="350"
        elevation=0 color="card">
        <v-row no-gutters>

            <v-col class="col-background" cols="3">

            
                <v-row class="mt-4 mb-0 d-flex justify-center align-center">
                   
                    <v-icon class="" color="icon" icon="mdi-shower-head"></v-icon>
                    
                  
                </v-row>
                <v-row class="mt-0 mb-1 d-flex justify-center align-center">
                   
                   
                   
                   <v-card-title class="routine-title ">{{ routine }}</v-card-title>
               </v-row>

                
                
            </v-col>


            <v-col class="" cols="7">
                <v-card-item class="mb-0">
                    <template v-slot:subtitle>
                        <span class="subtitle wrap">{{ description }}</span>
                    </template>
                </v-card-item>
            </v-col>

            <v-col cols="2" class="d-flex flex-column justify-end align-end pr-3">
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
    }
}
</script>

<style>
.v-card.border-radius {

    border-radius: 10px;
}

.v-card-item .subtitle {
    color: #000000; 
    /* remove opacity in the subitile */
    opacity: 1;
    
}

.routine-title {
    font-size: 0.8em; 
    /* remove opacity in the subitile */
    opacity: 1;
    
}

.row.row-background {
    background-color: #FFFF9E;
}

.col-background {
    background-color: #FB9F9E;
}

.wrap-text {
    word-wrap: break-word;
}
</style>