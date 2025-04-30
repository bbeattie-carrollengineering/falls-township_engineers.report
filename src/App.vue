<script setup>
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-navigation";
import "@esri/calcite-components/dist/components/calcite-navigation-logo";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-chip";
import "@esri/calcite-components/dist/components/calcite-table";
import "@esri/calcite-components/dist/components/calcite-table-row";
import "@esri/calcite-components/dist/components/calcite-table-cell";

import { onMounted} from "vue";
import { storeToRefs } from "pinia";

import { useDataStore } from "@/stores/data";
const dataStore = useDataStore()
const { fetchCapitalProjects, fetchLandDevelopmentProjects, fetchEarthDisturbanceProjects } = useDataStore();
const { landDevelopmentProjects, earthDisturbaceProjects, capitalProjects } = storeToRefs(dataStore);


onMounted(async () => {
  try {
    await Promise.all([
      fetchCapitalProjects(),
      fetchLandDevelopmentProjects(),
      fetchEarthDisturbanceProjects()
    ])
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>
  <calcite-shell>
    <calcite-navigation slot="header">
      <calcite-navigation-logo slot="logo" icon="file-report-generic" heading="Engineer's Report" description="Township of Falls | Bucks County, PA"></calcite-navigation-logo>
      <div slot="user">
        <calcite-button icon-start="download">Download Report</calcite-button>
      </div>
    </calcite-navigation>
    <div id="reportWrapper">
      <h2>Land Development Projects</h2>
      <ol>
        <li v-for="project in landDevelopmentProjects">
          <p class="projectTitle"><span>{{ project.attributes.project_name }} </span> | {{ project.attributes.project_address }}</p>
          <calcite-table striped="" scale="s" layout="fixed">
            <calcite-table-row>
              <calcite-table-cell col-span="1" alignment="center"><b>JEA#:</b></calcite-table-cell>
              <calcite-table-cell col-span="1" alignment="center">{{ project.attributes.JEA_number }}</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell col-span="1" alignment="center"><b>Submitted:</b></calcite-table-cell>
              <calcite-table-cell col-span="1" alignment="center">{{ project.attributes.JEA_number }}</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell col-span="1" alignment="center"><b>PC Approval:</b></calcite-table-cell>
              <calcite-table-cell col-span="1" alignment="center">{{ project.attributes.JEA_number }}</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell col-span="1" alignment="center"><b>BOS Approval:</b></calcite-table-cell>
              <calcite-table-cell col-span="1" alignment="center">{{ project.attributes.JEA_number }}</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell col-span="1" alignment="center"><b>Start of Construction:</b></calcite-table-cell>
              <calcite-table-cell col-span="1" alignment="center">{{ project.attributes.JEA_number }}</calcite-table-cell>
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
      <!-- <h2>Earth Disturbance Projects</h2>
      <ol>
        <li v-for="project in earthDisturbaceProjects">
          <h3>{{ project.attributes.project_name }}</h3>
          <br>
          <br>
        </li>
      </ol>
      <h2>Capital Projects</h2>
      <ol>
        <li v-for="project in capitalProjects">
          <h3>{{ project.attributes.project_name }}</h3>
          {{ project.attributes.project_address }}
          <br>
          Narrative: {{ project.attributes.project_narrative }}
          <br>
          <br>
          Updates: {{ project.attributes.public_project_updates }}
          <br>
          <br>
        </li>
      </ol> -->
    </div>
  </calcite-shell>

</template>

<style>

.projectTitle {
  font-size: 1rem;

  & span {
    font-weight: 500;
  }

}

.projectNarrative {
  text-decoration: none;

  & span {
    text-decoration: underline;
    text-underline-offset: 3px;
    font-weight: 500;
    
  }
}

calcite-table {
  width: 50%;
}

#reportWrapper {
  padding: 1rem;
}

div[slot="user"] {
  display: flex;
  align-items: center;
}

h1,h2,h3 {
  margin: 0px;
}

  calcite-shell {
    margin-inline: auto;
    max-width: 816px;
  }

</style>
