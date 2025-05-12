<script setup>
import { onMounted, ref} from "vue";

import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-navigation";
import "@esri/calcite-components/dist/components/calcite-navigation-logo";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-dropdown-group";
import "@esri/calcite-components/dist/components/calcite-dropdown";
import "@esri/calcite-components/dist/components/calcite-dropdown-item";
import "@esri/calcite-components/dist/components/calcite-chip";
import "@esri/calcite-components/dist/components/calcite-table";
import "@esri/calcite-components/dist/components/calcite-table-row";
import "@esri/calcite-components/dist/components/calcite-table-cell";

import OAuthInfo from "@arcgis/core/identity/OAuthInfo";
import IdentityManager from "@arcgis/core/identity/IdentityManager";

import { formatDateTimeUnix } from "@/composables/date.js"
import { triggerItemExport, isDownloading, checkJobStatus, intervalPollingID } from "./composables/export";

import LandDevelopmentList from "./components/LandDevelopmentList.vue";
import EarthDisturbanceList from "./components/EarthDisturbanceList.vue";
import CapitalProjectsList from "./components/CapitalProjectsList.vue";

import { useDataStore } from "@/stores/data";
const { fetchCapitalProjects, fetchLandDevelopmentProjects, fetchEarthDisturbanceProjects } = useDataStore();

// START OAUTH SECTION ----------------

const successfulLogin = ref(false)
const info = new OAuthInfo({
  appId: "wqLbRsh5jse6I5wu",
  portalUrl: "https://fallstwp.maps.arcgis.com/"
});

IdentityManager.registerOAuthInfos([info]);

let credential;

// END OAUTH SECTION ----------------


// START DATA FETCH SECTION ----------------

onMounted(async () => {
    try {
      credential = await IdentityManager.checkSignInStatus(info.portalUrl + "/sharing");

      if (credential) {
        successfulLogin.value = true
      }

      Promise.all([
        fetchCapitalProjects(credential.token),
        fetchLandDevelopmentProjects(credential.token),
        fetchEarthDisturbanceProjects(credential.token)
      ]);
    } catch (error) {
      await IdentityManager.getCredential(info.portalUrl + "/sharing")
    }
  })

  // END DATA FETCH SECTION ----------------

function generatePDF () {
  window.print()
}


async function exportManager({target}) {

  let itemID;
  let exportResponseObject;

  isDownloading.value = true

  if (target.textContent === "Land Development & Permit Records.xlsx") {
    itemID = "56609ef326e7464fa61ba17e08739529"
    exportResponseObject = await triggerItemExport(itemID, credential.userId, credential.token)
    intervalPollingID.value = setInterval(() => {checkJobStatus(exportResponseObject, credential.userId, credential.token)}, 1500)
  }
  if (target.textContent === "Capital Project & Road Records.xlsx") {
    itemID = "886e4d0686d94855b89e5952f71337a4"
    exportResponseObject = await triggerItemExport(itemID, credential.userId, credential.token)
    intervalPollingID.value = setInterval(() => {checkJobStatus(exportResponseObject, credential.userId, credential.token)}, 1500)
  }
}

</script>

<template>
  <calcite-shell v-if="successfulLogin">
    <calcite-navigation slot="header">
      <calcite-navigation-logo slot="logo" icon="file-report-generic" heading="Engineer's Report"
        description="Township of Falls | Bucks County, PA"></calcite-navigation-logo>
      <div slot="user">
        <calcite-dropdown class="hideOnPrint" width="m">
          <calcite-button :loading="isDownloading" slot="trigger" appearance="outline" icon-start="table"
            icon-end="chevron-down" class="export-green">Export Data</calcite-button>
          <calcite-dropdown-group group-title="Files" class="export-green" selection-mode="none">
            <calcite-dropdown-item icon-start="file-excel" @calciteDropdownItemSelect="exportManager">Land Development &
              Permit Records.xlsx</calcite-dropdown-item>
            <calcite-dropdown-item icon-start="file-excel" @calciteDropdownItemSelect="exportManager">Capital Project &
              Road Records.xlsx</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
        <calcite-button class="hideOnPrint" @click="generatePDF" icon-start="download">Generate Report</calcite-button>
        <calcite-chip class="showOnPrint">As of {{ formatDateTimeUnix(Date.now()) }}</calcite-chip>
      </div>
      <calcite-navigation class="hideOnPrint" slot="navigation-secondary">
        <p slot="content-center"><i>As of {{ formatDateTimeUnix(Date.now()) }}</i></p>
      </calcite-navigation>
    </calcite-navigation>
    <div id="reportWrapper">
      <h2>Land Development Projects</h2>
      <LandDevelopmentList></LandDevelopmentList>
      <hr>
      <h2>Earth Disturbance Projects</h2>
      <EarthDisturbanceList></EarthDisturbanceList>
      <hr>
      <h2>Capital Projects</h2>
      <CapitalProjectsList></CapitalProjectsList>
    </div>
  </calcite-shell>

</template>

<style>
:root {
  --excel-green: #008000
}


.showOnPrint {
  display: none;
}


@media print {
  .hideOnPrint {
    display: none;
  }
  .showOnPrint {
  display:contents;
}
}

.export-green {
  --calcite-color-brand: var(--excel-green);
  --calcite-color-brand-press: var(--excel-green);
  --calcite-color-brand-hover: var(--excel-green);
  --calcite-color-focus: var(--excel-green);
}

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


li {
  margin-bottom: 2rem;
}

ol li::marker {
  font-size: 1rem;
  font-weight: 500;
}

calcite-table {
  width: 50%;
}

calcite-table {
  --calcite-color-border-3: white;
}

calcite-shell {
  height: fit-content;
}

#reportWrapper {
  padding: 1rem;
}

div[slot="user"] {
  display: flex;
  align-items: center;

  & calcite-button {
    padding-right: 1rem;
  }

}

h2 {
  margin: 0px;
}

hr {
  width: 80%;
  margin-inline: auto;
  margin-bottom: 1.25rem;
}

  calcite-shell {
    margin-inline: auto;
    max-width: 800px;
  }

</style>
