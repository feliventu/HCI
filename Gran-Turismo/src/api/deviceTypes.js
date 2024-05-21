import { Api } from "./api";

class DeviceTypeApi extends Api {
    static async getDeviceTypes(controller) {
        return Api.get(`${Api.baseUrl}/devicetypes`, controller);
    }

    static async getDeviceType(id, controller) {
        return Api.get(`${Api.baseUrl}/devicetypes/${id}`, controller);
    }
}

class DeviceType {
    constructor(id, name) {
        // TODO validate id
        this.id = id;
        if (name) this.name = name;
    }
}

export { DeviceTypeApi, DeviceType };
