<script setup>
import { storeToRefs } from "pinia";

import { useDataStore } from "@/stores/data";
const dataStore = useDataStore()
const { capitalProjects } = storeToRefs(dataStore);

</script>

<template>

<ol>
        <li v-for="project in capitalProjects">
          <p class="projectTitle"><span>{{ project.attributes.project_name }} </span> | {{ project.attributes.project_address ? project.attributes.project_address : "No Address Provided" }}</p>
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