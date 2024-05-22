import { ref } from "vue";
import { defineStore } from "pinia";
import { Room, RoomApi } from "@/api/room";
import { RoomDeviceApi } from "@/api/roomDevice";

export const useRoomStore = defineStore("room", () => {
  const rooms = ref([]);

  async function add(room) {
    console.log("hola chavales");
    const result = await RoomApi.add(room);
    await updateRooms();
    return Object.assign(new Room(), result);
  }

  async function get() {
    const result = await RoomApi.get();
    updateRooms();
    return result;
  }

  async function updateRooms() {
    const result = await RoomApi.get();
    rooms.value = result.map((room) => Object.assign(new Room(), room));
  }

  async function addDeviceToRoom(room, device) {
    const result = await RoomDeviceApi.add(room, device);
    return result;
  }

    function getRoomByName(roomName) {
    const result = rooms.value.find((room) => room.name === roomName);
    return result;
  }

  async function getDevicesFromRoom(roomName) {
    await updateRooms()
    const auxRoom =  getRoomByName(roomName);
    const result = await RoomDeviceApi.get(auxRoom);
    return result;
  }

  return {
    rooms,
    add,
    get,
    addDeviceToRoom,
    getDevicesFromRoom,
  };
});
