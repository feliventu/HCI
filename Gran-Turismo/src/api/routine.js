import { Api } from "./api";

class RoutineApi extends Api {
    static getUrl(slug) {
        return `${Api.baseUrl}/routines${slug ? `/${slug}` : ""}`;
    }

    static async getRoutines(controller) {
        return Api.get(getUrl(), controller);
    }

    static async getRoutine(id, controller) {
        return Api.get(getUrl(id), controller);
    }

    static async postRoutine(routine, controller) {
        return Api.post(getUrl(), routine, controller);
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

export { RoutineApi, Routine };
