import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Room, RoomApi } from "@/api/room";


export const useRoomStore = defineStore('room', () => {
    const rooms= ref([])


    async function add(room){
        console.log("hola chavales")
        const result = await RoomApi.add(room)
        await updateRooms();
        return Object.assign(new Room(), result)
    }

    async function get(){
        const result = await RoomApi.get()
       updateRooms()
       return result
    }

    async function updateRooms(){
        const result = await RoomApi.get()
        rooms.value = result.map((room) => Object.assign(new Room(), room))
    }

    return {
        rooms,
        add,
        get
    }
})