<script setup>

import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-button";

const props = defineProps({
  schoolName: String,
  schoolLocation: String,
})

</script>

<template>

  <div slot="description">
    <div class="icon-container">
      <calcite-icon icon="education" scale="l"></calcite-icon>
    </div>
    <div class="text-container">
      <span class="heading">{{ props.schoolName }}</span>
      <span class="description">{{ props.schoolLocation }}</span>
    </div>
  </div>

</template>

<style scoped>

div[slot="description"] {
  display: flex;
  gap: 1rem;
  margin-left: 10px;
}

div.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
div.text-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}

span.heading {
  font-size: 0.95rem;
  font-weight: bold;
  text-wrap: balance;
}

span.description {
  font-size: 0.875rem;
  font-weight: lighter;
}

</style>