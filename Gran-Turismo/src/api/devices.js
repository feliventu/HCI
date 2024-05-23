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
}

class Device {
    constructor(name, id, typeId, isLocked = false, isFavorite = false) {
        this.name = name;
        if(id) {
            this.id = id;
        }
        this.type = new DeviceType(typeId); //"go46xmbqeomjrsjr"); // TEMP

        this.meta = {
          
            isLocked: isLocked,
            isFavorite: isFavorite,
        };
    }
}

// temp
export { DeviceApi, Device };
