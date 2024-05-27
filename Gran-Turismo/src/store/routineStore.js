import { ref } from "vue";
import { defineStore } from "pinia";
import { RoutineApi, Routine } from "@/api/routine";

export const useRoutineStore = defineStore("routine", () => {
    const routines = ref([]);

    async function initialize() {
        await get();
    }

    async function get() {
        const result = await RoutineApi.getRoutines();
        routines.value = result.map((r) => {
            Object.assign(new Routine(), r);
        });
        return result;
    }

    async function add(routine) {
        const result = await RoutineApi.postRoutine(routine);
        const r = Object.assign(new Routine(), result);
        routines.value.push(r);
    }

    async function executeRoutine(routineId){
        await RoutineApi.putRoutine(routineId);
    }

    return {
        routines,
        initialize,
        get,
        add,
        executeRoutine,
    };
});
