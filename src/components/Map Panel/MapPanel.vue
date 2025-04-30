<script setup>
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-panel";
import Map from "@/components/Map Panel/Map.vue";
</script>

<template>
    <calcite-panel heading="Map Panel:">
    <Map/>
    </calcite-panel>
</template>

<style scoped>

calcite-shell-panel {
  flex-grow: 1;
}

calcite-panel {
  width: 100%;
}

</style>