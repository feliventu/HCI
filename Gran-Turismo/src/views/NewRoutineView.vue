<template>
  <div class="px-12 pt-5">
    <h2>Nueva rutina</h2>
    <form>
      <v-text-field
        class="pt-5"
        label="Nombre"
        style="max-width: 300px"
        variant="outlined"
        v-model="name"
      ></v-text-field>
      <v-text-field
        label="Descripcion"
        style="max-width: 300px"
        variant="outlined"
        v-model="description"
      ></v-text-field>
      <v-select
        label="Hogar"
        style="max-width: 300px"
        :items="homes"
        variant="outlined"
        v-model="home"
      ></v-select>

      <v-select
        label="Color"
        style="max-width: 300px"
        :items="supportedColors.map((color) => color.name)"
        variant="outlined"
        v-model="color"
      ></v-select>

      <v-sheet class="mb-4 ml-n2 mt-n2" max-width="1000">
        <v-slide-group v-model="selectedIcon">
          <v-slide-group-item
            v-for="n in 8"
            :key="n"
            v-slot="{ isSelected, toggle }"
          >
            <v-btn
              :color="isSelected ? 'primary' : undefined"
              class="ma-2 custom-button"
              elevation="0"
              rounded
              @click="toggle"
            >
              <v-icon>{{ icons[n % icons.length].icon }}</v-icon>
            </v-btn>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>

      <v-btn
        class="custom-button"
        variant="outlined"
        height="40px"
        @click="navigateToActions()"
        :disabled="!canCreate"
        >Continuar</v-btn
      >
    </form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useHomeStore } from "@/store/homeStore";
import { useRouter } from "vue-router";

const name = ref("");
const description = ref("");
const home = ref(null);
const deviceTypeId = ref(null);
const homes = ref([]);
const homeDevices = ref([]);
const icon = ref(null);
const color = ref(null);
const homeStore = useHomeStore();

const selectedIcon = ref(null);

const icons = [
  { icon: "mdi-bed", name: "Bed" },
  { icon: "mdi-white-balance-sunny", name: "Sun" },
  { icon: "mdi-party-popper", name: "Party" },
  { icon: "mdi-food-apple", name: "Apple" },
  { icon: "mdi-shower-head", name: "Shower" },
  { icon: "mdi-lightbulb", name: "Light" },
  { icon: "mdi-music", name: "Music" },
  { icon: "mdi-briefcase", name: "Work" },
  { icon: "mdi-clock-time-three", name: "Clock" },
];

const supportedColors = [
  { name: "Rojo", color: "#FB9F9E" },
  { name: "Rosa", color: "#FFC9EA" },
  { name: "Azul", color: "#C2C5FF" },
  { name: "Naranja", color: "#FFD09E" },
  { name: "Celeste", color: "#A5D8EA" },
  { name: "Verde", color: "#A5EAA5" },
];

const router = useRouter();
onMounted(async () => {
  try {
    const fetchedHomes = await homeStore.get();
    homes.value = fetchedHomes.map((home) => home.name);
  } catch (e) {
    console.error("Failed to load homes: ", e);
  }
});

const canCreate = computed(() => {
  return name.value && description.value && home.value;
});



const navigateToActions = () => {
  if (canCreate.value) {
    router.push({
      name: "actions",
      query: {
        home: home.value,
        name: name.value,
        description: description.value,
        icon: icons[selectedIcon.value+1].icon,
        color: color.value,
      },
    });
  }
};
</script>
