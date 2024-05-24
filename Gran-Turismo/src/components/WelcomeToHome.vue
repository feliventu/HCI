<template>
<div class="image-container">
    <h1 class="title">Comencemos con tu nueva casa inteligente</h1> 
    <img src="../assets/welcomeGirl.png" alt="Welcome Image" /> 
</div>
</template>

<script setup>
    import require from "@/assets/welcomeGirl.png";
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