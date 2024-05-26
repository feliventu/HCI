<template>
    <div>
        <div v-for="action in actionsList" :key="action.id">
            <v-btn
                :class="{ 'bg-black': isSelected(action) }"
                @click="toggleAction(action)"
                variant="outlined"
                class="mt-2 custom-button"
                :disabled="isActionDisabled(action)"
                >{{ action.name }}</v-btn
            >

            <template v-if="selectedActions === action && action.requiresLevel">
                <v-text-field
                    v-model="actionLevel"
                    label="Set Level"
                    type="number"
                    min="0"
                    max="100"
                    class="mt-2"
                ></v-text-field>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { Action } from "@/api/routine";

const props = defineProps({
    deviceId: String,
    actions: Array,
});

const selectedActions = ref([]);
const actionLevel = ref(null);

const actionsList = ref([
    { id: "open", name: "Abrir", requiresLevel: false },
    { id: "close", name: "Cerrar", requiresLevel: false },
    { id: "setLevel", name: "Set Level", requiresLevel: true },
]);

const isSelected = (action) => {
    return selectedActions.value.includes(action);
};

const isActionDisabled = (action) => {
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
        if (action.requiresLevel) {
            actionLevel.value = null;
        }
    } else {
        if (action.requiresLevel) {
            selectedActions.value = [action];
            actionLevel.value = null;
        } else {
            selectedActions.value.push(action);
        }
        updateActions();
    }
};

const removeActionFromProps = (action) => {
    const index = props.actions.findIndex(
        (act) =>
            act.deviceId === props.deviceId && act.actionName === action.name,
    );
    if (index >= 0) {
        props.actions.splice(index, 1);
    }
};

const updateActions = () => {
    props.actions.length = 0; // Clear the original actions array
    selectedActions.value.forEach((action) => {
        props.actions.push(
            new Action(
                props.deviceId,
                action.id,
                action.requiresLevel ? [actionLevel.value] : [],
            ),
        );
    });
};

// Watch for changes in the actionLevel to update the props.actions array accordingly
watch(actionLevel, () => {
    updateActions();
});

const closeDialog = () => {
    emits("close");
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
