import { ref } from "vue";
import { defineStore } from "pinia";
import { HomeApi, Home } from "@/api/home";
import { useRoomStore } from "./roomStore";

export const useHomeStore = defineStore("home", () => {
    const homes = ref([]);

    async function add(home) {
        const result = await HomeApi.add(home);
        await updateHomes();
        return Object.assign(new Home(), result);
    }

    async function remove() {
        if (homes.value.length === 0) {
            return;
        }
        const result = await HomeApi.remove(getLast());
        updateHomes();
        return result;
    }

    async function get() {
        const result = await HomeApi.get();
        updateHomes();
        return result;
    }

    function getLast() {
        return homes.value[homes.value.length - 1];
    }

    async function updateHomes() {
        const result = await HomeApi.get();
        homes.value = result.map((home) => Object.assign(new Home(), home));
    }

    async function addRoomtoHome(home, room) {
        const result = await HomeApi.addRoomtoHome(home, room);
    }

    function getHomeByName(name) {
        const result = homes.value.find((home) => home.name === name);
        return result;
    }

    async function getRoomsFromHome(home) {
        const result = await HomeApi.getRoomsFromHome(home);
        return result;
    }

    return {
        homes,
        add,
        remove,
        get,
        updateHomes,
        addRoomtoHome,
        getHomeByName,
        getRoomsFromHome,
    };
});
