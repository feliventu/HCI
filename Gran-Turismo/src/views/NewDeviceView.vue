<template>
	<div class="px-12 pt-5">
		<h2>Nuevo Dispositivo</h2>
		<form>
			<v-text-field class="pt-5" label="Nombre" style="max-width: 300px" variant="outlined"></v-text-field>
			<v-text-field label="Contraseña (Opcional)" style="max-width: 300px" variant="outlined"></v-text-field>
			<v-select label="Dispositivo" style="max-width: 300px" :items="states" variant="outlined"></v-select>
		</form>
	</div>
</template>

<script setup>
const states = ["Parlante", "Cortina", "Aire acondicionado", "Alarma"];
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
