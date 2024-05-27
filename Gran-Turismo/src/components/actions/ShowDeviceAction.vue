<template>
    <div>
        <div v-for="action in actionsList" :key="action.id">
            <v-btn
                v-if="!action.requiresValue"
                :class="{ 'bg-black': isSelected(action) }"
                @click="toggleAction(action)"
                variant="outlined"
                class="mt-2 custom-button"
                :disabled="isActionDisabled(action)"
                >{{ action.name }}</v-btn
            >

            <template  v-if="action.requiresValue">
                <v-text-field
                    v-model="actionValue"
                    :label="action.name"
                    type="number"
                    :min="action.min"
                    :max="action.max"
                    :rules="actionRules(action.min, action.max)"
                    class="mt-4"
                    variant="outlined"
                    style="max-width: 250px"
                ></v-text-field>
            </template>
        </div>
        <v-spacer></v-spacer>
        
        <div class="mt-8 mb-2">
        <v-btn class="custom-button-green" elevation="0" text="Agregar" @click="addActions"></v-btn>

         <v-btn text="Cancelar" variant="text" @click="closeDialog"></v-btn>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Action } from "@/api/routine";

const props = defineProps({
    deviceId: String,
    actions: Array,
    actionsList: Array,
    showDialog: Boolean,
});

const selectedActions = ref([]);
const actionValue = ref(null);

const actionRules = (min, max) => [
    v => (!isNaN(v) && v >= min && v <= max) || `El valor debe estar entre ${min} y ${max}`,
];

const emit = defineEmits(['update:showDialog']);

const closeDialog = () => {
    emit('update:showDialog', false);
}

const addActions = () => {
    selectedActions.value.forEach((action) => {
        props.actions.push(new Action(props.deviceId, action.id, []));
    });
    if (actionValue.value) {
    let actionId = '';
    for (let action of props.actionsList) {
        if (action.requiresValue) {
            actionId = action.id;
            break;
        }
    }
    if (actionId) {
        props.actions.push(new Action(props.deviceId, actionId, [actionValue.value]));
    }
}
    console.log(props.actions.length);
    
}



const isSelected = (action) => {
    return selectedActions.value.includes(action);
};

const isActionDisabled = (action) => {
    // TODO check if its the same or different device
    if (
        selectedActions.value.some(
            (selected) => selected.id === "open" && action.id === "close",
        ) ||

        selectedActions.value.some(
            (selected) => action.id === "open" && selected.id === "close",
        )
    ) {
        return true;
    }
    if (
        selectedActions.value.some(
            (selected) => selected.id === "play" && action.id === "stop",
        ) ||
        selectedActions.value.some(
            (selected) => action.id === "play" && selected.id === "stop",
        )
    ) {
        return true;
    }
    if (selectedActions.value.some(
        (selected) => selected.id === "turnOn" && action.id === "turnOff",
    ) ||
    selectedActions.value.some(
        (selected) => action.id === "turnOn" && selected.id === "turnOff",
    )) {
        return true;
    }
    return false;
};

const toggleAction = (action) => {
    const index = selectedActions.value.indexOf(action);
    if (index >= 0) {
        // Remove from selected actions and props.actions
        selectedActions.value.splice(index, 1);
        removeActionFromProps(action);
        if (action.requiresValue) {
            // actionValue.value = null;
        }
    } else {
        if (action.requiresValue) {
            // selectedActions.value = [action];
            // actionValue.value = null;
        } else {
            selectedActions.value.push(action);
        }
        // updateActions();
    }
};

watch(() => props.deviceId, () => {
    console.log("Device ID changed:", props.deviceId);
    selectedActions.value = [];
    actionValue.value = null;
});

const removeActionFromProps = (action) => {
    const index = props.actions.findIndex(
        (act) =>
            act.deviceId === props.deviceId && act.actionName === action.id,
    );
    if (index >= 0) {
        props.actions.splice(index, 1);
    }
};




</script>

<style scoped>
.custom-button {
    background-color: white;
    border-radius: 10px !important;
    border-color: rgba(0, 0, 0, 0.15) !important;
    border-width: 3px !important;
    color: black;
    font-weight: bold !important;
}
</style>
