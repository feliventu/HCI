import { Api } from "./api";

class RoutineApi extends Api {
    static getUrl(slug) {
        return `${Api.baseUrl}/routines${slug ? `/${slug}` : ""}`;
    }

    static async getRoutines(controller) {
        return await Api.get(RoutineApi.getUrl(), controller);
    }

    static async getRoutine(id, controller) {
        return await Api.get(RoutineApi.getUrl(id), controller);
    }

    static async postRoutine(routine, controller) {
        return await Api.post(RoutineApi.getUrl(), routine, controller);
    }
}

class Routine {
    constructor(name, actions, description) {
        this.name = name;
        this.actions = actions;
        this.meta = {
            description: description,
        };
    }
}

class Action {
    constructor(deviceId, actionName, params = []) {
        this.device = {
            id: deviceId,
        };
        this.actionName = actionName;
        this.params = params;
    }
}

export { RoutineApi, Routine, Action };
