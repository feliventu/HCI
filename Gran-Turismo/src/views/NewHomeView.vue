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
        >Crear hogar</v-btn
      >
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Home } from "@/api/home";
import { useHomeStore } from "@/store/homeStore";
import { computed } from "vue";

const counter = ref(0);

const name = ref(null);

const canCreate = computed(() => {
    return name.value != null && name.value.length > 0;
});


async function addHome() {
  
  const home = new Home(counter.value++, name.value);
  await useHomeStore().add(home);
  name.value = null;
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
