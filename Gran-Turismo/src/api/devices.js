import { Api } from "./api";
import { DeviceTypeApi, DeviceType } from "./deviceTypes";

class DeviceApi extends Api {
    static async postDevice(device, controller) {
        return Api.post(`${Api.baseUrl}/devices`, device, controller);
    }

    static async getDevice(id, controller) {
        return Api.get(
            `${Api.baseUrl}/retrieveDevice$userId=${id}`,
            controller,
        );
    }
    static async getDevices(controller) {
        return Api.get(`${Api.baseUrl}/devices`, controller);
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
