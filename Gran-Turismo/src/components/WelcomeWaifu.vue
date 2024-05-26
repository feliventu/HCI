<template>
<div class="image-container">
    <h1 class="title">{{ title }}</h1> 
    <img v-if="waifu=='Home'" src="../assets/welcomeGirl.png" alt="Welcome Image" /> 
    <img v-if="waifu=='Devices'" src="../assets/devicesGirl.png" alt="Device Image" />
    <img v-if="waifu=='Routines'" src="../assets/routinesGirl.png" alt="Routine Image" />
    <img v-if="waifu=='error'" src="../assets/errorGirl.png" alt="Error Image" />
</div>
</template>

<script setup>

</script>


<script>
export default {
  name: "WelcomeWaifu",
  props: {
    title: String,
    waifu: String,
  },
};
</script>

<style scoped>
.image-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  margin-bottom: 5;
}

.image-container img {
  max-width: 30%; 
  height: auto; 
}

.title {
  font-size: 2rem;
  color: gray;
}
</style>