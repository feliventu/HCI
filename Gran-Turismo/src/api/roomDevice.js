import { Api } from "./api";


class RoomDeviceApi extends Api {

    static async add(room, device, controller){
        return await Api.post(`${Api.baseUrl}/rooms/${room.id}/devices/${device.id}`,room, device, controller)
    }

    static async get(room, controller){
        return await Api.get(`${Api.baseUrl}/rooms/${room.id}/devices`, controller)
    }

}

export { RoomDeviceApi }