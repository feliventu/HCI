<template>
    <div class="px-12 pt-5">
        <div>
            <v-row class="d-flex justify-space-between">
                <DropButton />
                <NewButton />
            </v-row>
        </div>
        <div>
            <v-row class="pt-5"><h2 >Dispositivos</h2></v-row>
            
            <v-row class="pt-2">
                <DeviceCard
                    class="mr-5 mb-5"
                    v-for="device in devices"
                    :key="device.id"
                    :name="device.name"
                    :type="device.type"
                    :room="device.room"
                    :isOn="device.isOn"
                    :isFavorite="device.isFavorite"
                    :isLocked="device.isLocked"
                />
            </v-row>
        </div>
    </div>
</template>

<script>
import DeviceCard from "@/components/DeviceCard.vue";
export default {
    name: "Devices",
    components: {
        DeviceCard,
    },
    data() {
        return {
            devices: [
                {
                    id: 1,
                    name: "Auto mama",
                    type: "parlante",
                    room: "cuarto mama",
                    isOn: true,
                    isFavorite: false,
                    isLocked: true,
                },
                {
                    id: 2,
                    name: "Banio ducha",
                    type: "grifo",
                    room: "banito",
                    isOn: true,
                    isFavorite: true,
                    isLocked: false,
                },
                {
                    id: 2,
                    name: "Felipe",
                    type: "luz",
                    room: "cuarto felipe",
                    isOn: false,
                    isFavorite: true,
                    isLocked: true,
                },
            ],
        };
    },
};
</script>
