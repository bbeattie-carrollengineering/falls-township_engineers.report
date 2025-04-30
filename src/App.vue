<script setup>
import "@esri/calcite-components/dist/components/calcite-shell";

import CardPanel from "@/components/Card Panel/CardPanel.vue";
import MapPanel from "@/components/Map Panel/MapPanel.vue";
import Navbar from "@/components/Navigation/Navbar.vue";
import EditPanel from "@/components/Edit Panel/EditPanel.vue";


</script>

<template>
  <calcite-shell>
    <Navbar/>
<!--    <EditPanel/>-->
    <MapPanel/>
    <CardPanel/>
  </calcite-shell>

</template>

<style>

</style>
