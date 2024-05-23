<template>
  <v-select
    class="selector"
    variant="outlined"
    :items="states"
    density="compact"
    label="Hogar"
    persistent-hint
    style="max-width: 200px"
    rounded="lg"
    id="mySelect"
    single-line
  ></v-select>
</template>

<script>
export default {
  name: "DropButton",
  props: {
    states: Array,
  },
};
</script>

<style>
.v-field__outline {
  --v-field-border-width: 3px !important; /* Change the border width here */
  --v-field-border-opacity: 0.15 !important; /* Change the border opacity here */
}

.selector {
  font-weight: bold !important;
  color: black !important;
  font-weight: bold !important;
}
</style>
