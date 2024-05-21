import { ref } from "vue";
import { defineStore } from "pinia";
import { DeviceApi, Device } from "@/api/devices";
import { DeviceType, DeviceTypeApi } from "@/api/deviceTypes";

export const useDeviceStore = defineStore("device", () => {
    const devices = ref([]);
    const deviceTypes = ref(new Map());

    async function initialize() {
        await getDeviceTypes();
        await getDevices();
    }
    // Add device -> (luego) -> asocio device a un home? (en homeStore hago
    // un set de devices?)
    async function add(device) {
        const result = await DeviceApi.postDevice(device);
        // -> update devices (TODO getDevices)
        // devices.value = result.map((dev) => Object.assign(new Device(), dev));
        console.log("Device added:", result);
        const dev = Object.assign(new Device(), result);
        devices.value.push(dev);

        console.log("Current device types map:");
        deviceTypes.value.forEach((value, key) => {
            console.log(`Name: ${key}, ID: ${value}`);
        });

        return dev;
    }

    async function getDevices() {
        const result = await DeviceApi.getDevices();
        devices.value = result.map((dev) => Object.assign(new Device(), dev));
    }

    async function getDeviceTypes() {
        const result = await DeviceTypeApi.getDeviceTypes();
        result.forEach((type) => {
            deviceTypes.value.set(type.name, type.id);
        });
    }

    return {
        devices,
        deviceTypes,
        initialize,
        getDevices,
        getDeviceTypes,
        add,
    };
});
