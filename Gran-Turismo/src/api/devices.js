import { Api } from "./api";
import { DeviceTypeApi, DeviceType } from "./deviceTypes";

class DeviceApi extends Api {
    static async postDevice(device, controller) {
        return Api.post(`${Api.baseUrl}/devices`, device, controller);
    }

    static async getDevice(id, controller) {
        return Api.get(
            `${Api.baseUrl}/devices/${id}`,
            controller,
        );
    }
    static async getDevices(controller) {
        return Api.get(`${Api.baseUrl}/devices`, controller);
    }

    static async actionDevice(device, action, params = [], controller){
        return Api.put(`${Api.baseUrl}/devices/${device.id}/${action}`, params ,controller);
    }

    static async deleteDevice(device, controller) {
        return Api.delete(`${Api.baseUrl}/devices/${device.id}`, controller);
    }
}

class Device {
    constructor(name, id, typeId, password='', isFavorite = false) {
        this.name = name;
        if(id) {
            this.id = id;
        }
        this.type = new DeviceType(typeId); //"go46xmbqeomjrsjr"); // TEMP

        this.meta = {
          
            password: password,
            isFavorite: isFavorite,
        };
    }
}

// temp
export { DeviceApi, Device };
