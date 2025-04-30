<script setup>
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-input-text";
import "@esri/calcite-components/dist/components/calcite-loader";

import Card from "@/components/Card Panel/Card.vue";

import {useSchoolsStore} from "@/stores/schools";
import {computed, ref} from "vue";

const schoolsStore = useSchoolsStore();
const inputText = ref("")
const filteredSchoolsCount = ref(0)

const filterSchools = computed(() => {
  if (inputText !== "") {
    const filteredSchools = schoolsStore.schools.filter(school =>
        school.NAME.toUpperCase().includes(inputText.value.toUpperCase())
        ||
        school.districtName.toUpperCase().includes(inputText.value.toUpperCase())
    );
    filteredSchoolsCount.value = filteredSchools.length;
    return filteredSchools
  } else {
    filteredSchoolsCount.value = schoolsStore.length;
    return schoolsStore.schools
  }
})


</script>

<template>

  <calcite-shell-panel slot="panel-end">
    <calcite-panel
        :heading="`Schools Panel Results (${filteredSchoolsCount} Showing)`"
    >
      <calcite-input-text
          placeholder="Find a school..."
          icon="search"
          v-model.trim="inputText"
      >
      </calcite-input-text>
      <calcite-loader v-if="schoolsStore.schools.length === 0"></calcite-loader>
      <div
          id="calcite-card-group"
      >
        <Card
            v-for="feature in filterSchools"
            :key="feature.OBJECTID"
            :school-name="feature.NAME"
            :school-location="feature.CITY + ', ' + feature.STATE + ' ' + feature.ZIP"
            :website="feature.WEBSITE"
            :district-name="feature.districtName"
            :district-school-count="feature.districtSchoolCount"
            :district-student-count="feature.districtStudentCount"
            :district-teacher-count="feature.districtTeacherCount"
            :district-student-teacher-ratio="feature.districtStudentTeacherRatio.toString()"
            :student-count="feature.ENROLLMENT"
            :teacher-count="feature.FT_TEACHERS"
        />
      </div>
    </calcite-panel>
  </calcite-shell-panel>

</template>

<style scoped>

calcite-shell-panel {
  --calcite-shell-panel-min-width: 50vw
}

calcite-card {
  --calcite-card-shadow: 3px 2px 4px rgba(0, 0, 0, 0.12);
  scale: 1;
  transition: scale 0.5s ease-in-out;
}

calcite-card:hover {
  scale: 1.02;
}


calcite-input-text {
  padding: 10px;
}

#calcite-card-group {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(370px, 1fr));
  gap: 10px;
  overflow-x: hidden;
  padding-top: 5px;
  padding-bottom: 10px;
}

</style>