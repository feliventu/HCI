<template>
	<div class="px-12 pt-5">
		<h2>Nuevo Dispositivo</h2>
		<form>
			<v-text-field class="pt-5" label="Nombre" style="max-width: 300px" variant="outlined" v-model="name"></v-text-field>
			<v-text-field label="Contraseña (Opcional)" style="max-width: 300px" variant="outlined"></v-text-field>
			<v-select label="Dispositivo" style="max-width: 300px" :items="states" variant="outlined" v-model="device1"></v-select>
			<v-select label="Hogar" style="max-width: 300px" :items="homes" variant="outlined" v-model="home1"></v-select>
			<v-btn
				class="custom-button"
				variant="outlined"
				height="40px"
				@click="addDeviceToHome()"
				:disabled="!canCreate"
				>Agregar</v-btn
			>
		</form>
	</div>
</template>

<script setup>

import DropButton from "@/components/DropButton.vue";
import { useHomeStore } from "@/store/homeStore";
import { ref, onMounted } from "vue";
import { computed } from "vue";

const states = ["Parlante", "Cortina", "Aire acondicionado", "Alarma"];



const homeStore = useHomeStore(); 

const homes = ref([]);

const name = ref(null);
const home1 = ref(null);
const device1 = ref(null);




onMounted(async () => {
  homes.value = (await homeStore.get()).map((home) => home.name);
});

const canCreate = computed(() => {
		  return name.value && home1.value && device1.value;
});

</script>

<script>
export default {
	data() {
		return {
			states: ["Parlante", "Cortina", "Aire acondicionado", "Alarma"],
		};
	},
};
</script>
