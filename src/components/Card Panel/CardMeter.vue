<script setup>
import "@esri/calcite-components/dist/components/calcite-meter";
import "@esri/calcite-components/dist/components/calcite-label";

const props = defineProps({
  label: String,
  unit: String,
  count: Number,
  max: Number,
})

</script>

<template>
  <calcite-label>
    {{ props.label }}
    <calcite-meter
        :value="props.count"
        :max="props.max"
        value-label
        value-label-type="units"
        :unit-label="props.unit"
        scale="s"
    ></calcite-meter>
  </calcite-label>

</template>

<style scoped>

</style>