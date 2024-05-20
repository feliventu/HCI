<template>
	<div class="px-12 pt-5">
		<h2>Nuevo Hogar</h2>
		<form>
			<v-text-field
				class="pt-5"
				label="Nombre"
				style="max-width: 300px"
				variant="outlined"
				v-model="name"
			></v-text-field>
			<v-btn
				class="custom-button"
				variant="outlined"
				height="40px"
				@click="addHome()"
				:disabled="!canCreate"
				>Crear</v-btn
			>

			<v-btn
				class="custom-button"
				variant="outlined"
				height="40px"
				@click="getHomes()"
				
				>Listar</v-btn
			>			
			
			<v-btn
				class="custom-button"
				variant="outlined"
				height="40px"
				@click="deleteHome()"
				
				>Borrar</v-btn
			>
		</form>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { Home } from "@/api/home";
import { Room } from "@/api/room";
import { useHomeStore } from "@/store/homeStore";
import { computed } from "vue";
import { useRoomStore } from "@/store/roomStore";

const homeStore = useHomeStore();
const roomStore = useRoomStore();

const home = ref(null);
const room = ref(null);

const name = ref(null);

const canCreate = computed(() => {
		return name.value != null && name.value.length > 0;
});



async function addHome() {

	const newRoom = new Room(null, `${name.value} Room`);
	room.value = await roomStore.add(newRoom);

	const newHome = new Home(null, name.value);
	home.value = await homeStore.add(newHome);
	
	
	await useHomeStore().addRoomtoHome(home.value, room.value);

	name.value = null;
}

async function deleteHome() {
       await useHomeStore().remove();
}

async function getHomes() {
	await useHomeStore().get();
}


</script>



<style>
.custom-button {
	background-color: white !important;
	border-radius: 10px !important;
	border-color: rgba(0, 0, 0, 0.15) !important;
	border-width: 3px !important;
	color: black !important;
	font-weight: bold !important;
}
</style>
