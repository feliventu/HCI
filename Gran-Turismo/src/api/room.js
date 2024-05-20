import { Api } from "./api";


class RoomApi extends Api {

    static async add(room, controller) {

        return await Api.post(`${Api.baseUrl}/rooms`, room, controller);
/*
        const response = await Api.get(`${Api.baseUrl}/rooms`, controller);
        console.log(response);*/
    }

    static async get(controller) {
        return await Api.get(`${Api.baseUrl}/rooms`, controller);
    }
}

class Room {
    constructor(id, name) {
        if (id) {
            this.id = id;
        }
        this.name = name;
    }
}

export {RoomApi, Room}