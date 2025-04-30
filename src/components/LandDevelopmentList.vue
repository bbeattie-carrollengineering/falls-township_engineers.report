<script setup>
import { storeToRefs } from "pinia";

import { formatDateUnix } from "@/composables/date.js"

import { useDataStore } from "@/stores/data";
const dataStore = useDataStore()
const { landDevelopmentProjects } = storeToRefs(dataStore);

</script>

<template>

<ol>
        <li v-for="project in landDevelopmentProjects">
          <p class="projectTitle"><span>{{ project.attributes.project_name }} </span> | {{ project.attributes.project_address ? project.attributes.project_address : "No Address Provided" }}</p>
          <calcite-table scale="s" layout="fixed">
            <calcite-table-row>
              <calcite-table-cell col-span="1" alignment="center"><b>JEA#:</b></calcite-table-cell>
              <calcite-table-cell col-span="1" alignment="center">{{ project.attributes.JEA_number ? project.attributes.JEA_number : "Not Provided" }}</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell col-span="1" alignment="center"><b>Submitted:</b></calcite-table-cell>
              <calcite-table-cell col-span="1" alignment="center">{{ project.attributes.date_submitted ? formatDateUnix(project.attributes.date_submitted) : "Not Provided" }}</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell col-span="1" alignment="center"><b>PC Approval:</b></calcite-table-cell>
              <calcite-table-cell col-span="1" alignment="center">{{ project.attributes.pc_review_date ? formatDateUnix(project.attributes.pc_review_date) : "Not Provided" }}</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell col-span="1" alignment="center"><b>BOS Approval:</b></calcite-table-cell>
              <calcite-table-cell col-span="1" alignment="center">{{ project.attributes.bos_review_date ? formatDateUnix(project.attributes.bos_review_date) : "Not Provided" }}</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell col-span="1" alignment="center"><b>Start of Construction:</b></calcite-table-cell>
              <calcite-table-cell col-span="1" alignment="center">{{ project.attributes.start_of_construction_date ? formatDateUnix(project.attributes.start_of_construction_date) : "Not Provided" }}</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>
          <p class="projectNarrative">
            <span>Narrative:</span>
            <br>
            {{ project.attributes.project_narrative ? project.attributes.project_narrative : "Not Provided"}}
          </p>
          <p class="projectNarrative">
            <span>Updates:</span>
            <br>
            {{ project.attributes.public_project_updates ? project.attributes.public_project_updates : "Not Provided" }}
          </p>
        </li>
      </ol>


</template>
