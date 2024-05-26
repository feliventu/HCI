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
                    :min="action.minVal"
                    :max="action.maxVal"
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
import { ref } from "vue";
import { Action } from "@/api/routine";

const props = defineProps({
    deviceId: String,
    actions: Array,
    actionsList: Array,
});

const selectedActions = ref([]);
const actionValue = ref(null);

const addActions = () => {
    selectedActions.value.forEach((action) => {
        props.actions.push(new Action(props.deviceId, action.id, action.requiresValue ? [actionValue.value] : []));
    });
    console.log(props.actions.length);
    // close dialog
    
}



const isSelected = (action) => {
    return selectedActions.value.includes(action);
};

const isActionDisabled = (action) => {
    // TODO check if its the same or different device
    if (
        selectedActions.value.some(
            (selected) => selected.id === "open" && action.id === "close",
        )
    ) {
        return true;
    }
    if (
        selectedActions.value.some(
            (selected) => selected.id === "close" && action.id === "open",
        )
    ) {
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
            actionValue.value = null;
        }
    } else {
        if (action.requiresValue) {
            selectedActions.value = [action];
            actionValue.value = null;
        } else {
            selectedActions.value.push(action);
        }
        // updateActions();
    }
};

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
