<script setup>
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-legend";
import "@arcgis/map-components/dist/components/arcgis-editor";

import {useSchoolsStore} from "@/stores/schools";

const schoolsStore = useSchoolsStore();

const fetchSchools = async ({target}) => {
  const {extent, map} = await target
  const schoolsFeatureLayer = await map.layers.items.find((layer) => layer.title === "Public Schools")

  if (!schoolsFeatureLayer) return


  try {
    const results = await schoolsFeatureLayer.queryFeatures({
      where: '1=1',
      geometry: extent,
      outFields:'*',
      orderByFields: 'NAME ASC',
      start: 0,
      num: 25,
    })
    schoolsStore.clearSchoolsStore()
    for (let feature of results.features) {
      schoolsStore.addSchool(feature.attributes)
    }
  } catch (error) {
    console.error(error)
  }
}


</script>

<template>
  <arcgis-map
      @arcgisViewChange="fetchSchools"
      item-id="5010b78f7a8d46b0ab7b4c10b46bdc87"
      id="map"
  >
<!--    <arcgis-editor position="top-left" allowed-workflows="update" />-->
    <arcgis-legend position="bottom-left" />
  </arcgis-map>
</template>

<style scoped>
arcgis-map {
  width: 100%;
  height: 100%;
}
</style>