<script setup>
import { storeToRefs } from "pinia";

import { formatDateUnix } from "@/composables/date.js"

import { useDataStore } from "@/stores/data";
const dataStore = useDataStore()
const { earthDisturbaceProjects } = storeToRefs(dataStore);

</script>

<template>

<ol>
        <li v-for="project in earthDisturbaceProjects">
          <p class="projectTitle"><span>{{ project.attributes.project_name }} </span> | {{ project.attributes.project_address ? project.attributes.project_address : "No Address Provided" }}</p>
          <calcite-table  scale="s" layout="fixed">
            <calcite-table-row>
              <calcite-table-cell col-span="1" alignment="left"><b>JEA#:</b></calcite-table-cell>
              <calcite-table-cell col-span="1" alignment="left">{{ project.attributes.JEA_number ? project.attributes.JEA_number : "Not Provided" }}</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell col-span="1" alignment="left"><b>Submitted:</b></calcite-table-cell>
              <calcite-table-cell col-span="1" alignment="left">{{ project.attributes.date_submitted ? formatDateUnix(project.attributes.date_submitted) : "Not Provided" }}</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell col-span="1" alignment="left"><b>Approval:</b></calcite-table-cell>
              <calcite-table-cell col-span="1" alignment="left">{{ project.attributes.jea_review_date ? formatDateUnix(project.attributes.jea_review_date) : "Not Provided" }}</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>
          <p class="projectNarrative">
            <span>Narrative:</span>
            <br>
            {{ project.attributes.project_narrative }}
          </p>
          <p class="projectNarrative">
            <span>Updates:</span>
            <br>
            {{ project.attributes.public_project_updates }}
          </p>
        </li>
      </ol>


</template>

