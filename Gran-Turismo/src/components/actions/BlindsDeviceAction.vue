<template>
    <div>
        <v-select
            v-model="selectedAction"
            :items="actions"
            item-value="id"
            item-title="name"
            label="Actions"
        ></v-select>
        <template v-if="selectedAction && selectedAction.requiresLevel">
            <v-text-field
                v-model="actionLevel"
                label="Set Level"
                type="number"
                min="0"
                max="100"
            ></v-text-field>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { defineProps } from "vue";

const props = defineProps({
    device: Object,
});

const emits = defineEmits(["close"]);

const selectedAction = ref(null);
const actionLevel = ref(null);

const actions = ref([
    { id: "open", name: "Open", requiresLevel: false },
    { id: "close", name: "Close", requiresLevel: false },
    { id: "setLevel", name: "Set Level", requiresLevel: true },
]);

const performAction = () => {
    if (selectedAction.value) {
        console.log(
            `Performing ${selectedAction.value.name} on ${props.device.name}`,
        );
        if (selectedAction.value.requiresLevel) {
            console.log(`Level: ${actionLevel.value}`);
        }
        // Logic to perform the action
        emits("close");
    }
};

const closeDialog = () => {
    emits("close");
};
</script>
