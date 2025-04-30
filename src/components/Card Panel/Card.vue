<script setup>
import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-button";

import {computed} from "vue";

import CardHeading from "@/components/Card Panel/CardHeading.vue";
import CardDescription from "@/components/Card Panel/CardDescription.vue";
import CardMeter from "@/components/Card Panel/CardMeter.vue";

const props = defineProps({
  schoolName: String,
  schoolLocation: String,
  website: String,
  districtName: String,
  districtSchoolCount: Number,
  districtStudentCount: Number,
  districtTeacherCount: Number,
  districtStudentTeacherRatio: String,
  studentCount: Number,
  teacherCount: Number,
})

const checkWebsite = computed(() => {
  return props.website !== "NOT AVAILABLE" && props.website !== "";
})


</script>

<template>
  <calcite-card>
    <CardHeading
        :district-name="props.districtName"
        :district-school-count="props.districtSchoolCount"
        :district-student-count="props.districtStudentCount"
        :district-teacher-count="props.districtTeacherCount"
        :district-student-teacher-ratio="props.districtStudentTeacherRatio.toString()"
    />
    <CardDescription :school-location="props.schoolLocation" :school-name="props.schoolName" />
    <div class="content-container">
      <CardMeter label="Estimated Students:" :max=1500 :count="studentCount" unit="Students" />
      <CardMeter label="Estimated Teachers:" :max=100 :count="teacherCount" unit="Teachers" />
    </div>
    <div slot="footer-start">
      <calcite-button v-if="checkWebsite" :href="props.website" target="_blank" round appearance="transparent" icon-start="web" >Website</calcite-button>
      <calcite-button v-else disabled round kind="neutral" appearance="transparent" >No Website Found</calcite-button>
    </div>
    <div slot="footer-end">
      <calcite-button  round appearance="outline" icon-start="phone">Call</calcite-button>
      <calcite-button round icon-end="road-sign">Directions</calcite-button>
    </div>

  </calcite-card>
</template>

<style scoped>



div.details-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}


span.detailsHeader {
  font-size: 0.875rem;
}


</style>